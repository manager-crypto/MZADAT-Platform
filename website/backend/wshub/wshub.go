// Package wshub manages WebSocket connections for live auction broadcasts.
//
// Architecture:
//   - One Hub instance, started in main()
//   - Each auction is a "room" — clients subscribe to /ws/auction/{id}
//   - Bid events flow: HTTP /api/bids → bidengine.PlaceBid() → hub.Broadcast(auctionID, event)
//   - Heartbeat ping/pong every 30s; clients that miss 2 pongs are dropped
//
// Connection authentication:
//   - Client sends `?token=<session_token>` in URL or Authorization header
//   - Hub validates token against user_sessions table on connect
//   - Token-less connections allowed in READ-ONLY mode (public auction viewing)
//
// Concurrency:
//   - Hub runs a single goroutine that owns the rooms map (no shared mutexes)
//   - All state changes flow through channels: register, unregister, broadcast
//   - Per-client send goroutine drains a buffered channel (drops on overflow)
package wshub

import (
	"context"
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"strings"
	"sync"
	"time"

	"github.com/gorilla/websocket"

	"github.com/mzadat/backend/db"
)

// ─── Configuration ──────────────────────────────────────────────────────────

const (
	// Time allowed to write a message to the peer.
	writeWait = 10 * time.Second
	// Time allowed to read the next pong from the peer.
	pongWait = 60 * time.Second
	// Send pings to peer with this period. Must be less than pongWait.
	pingPeriod = (pongWait * 9) / 10
	// Maximum message size allowed from peer (we don't accept commands; only ping/pong).
	maxMessageSize = 512
	// Per-client send buffer. Broadcasts that don't fit are dropped.
	clientSendBuffer = 16
)

// ─── Types ──────────────────────────────────────────────────────────────────

// Client represents a single WebSocket connection.
type Client struct {
	hub       *Hub
	conn      *websocket.Conn
	auctionID string
	userID    string // empty for anonymous read-only viewers
	send      chan []byte
	closeOnce sync.Once
}

// Hub is the central WS message router. Started once via Run().
type Hub struct {
	// Rooms: auctionID → set of clients
	rooms map[string]map[*Client]bool

	// Channels for state mutations
	register   chan *Client
	unregister chan *Client
	broadcast  chan broadcastMsg
	shutdown   chan struct{}
}

type broadcastMsg struct {
	auctionID string
	payload   []byte
}

// NewHub creates a new Hub. Call Run() to start it.
func NewHub() *Hub {
	return &Hub{
		rooms:      make(map[string]map[*Client]bool),
		register:   make(chan *Client),
		unregister: make(chan *Client, 32),
		broadcast:  make(chan broadcastMsg, 256),
		shutdown:   make(chan struct{}),
	}
}

// Run is the hub's event loop. Blocks until Shutdown() is called.
// Should be invoked as `go hub.Run()` from main().
func (h *Hub) Run() {
	for {
		select {
		case c := <-h.register:
			h.addClient(c)

		case c := <-h.unregister:
			h.removeClient(c)

		case msg := <-h.broadcast:
			h.fanOut(msg)

		case <-h.shutdown:
			h.closeAll()
			return
		}
	}
}

// Shutdown signals Run() to exit and closes all connections.
func (h *Hub) Shutdown() {
	close(h.shutdown)
}

// Broadcast sends a message to all clients subscribed to an auction.
// Non-blocking: the message goes into the hub's queue and is fanned out asynchronously.
// If the queue is full (256), the message is dropped and an error logged.
func (h *Hub) Broadcast(auctionID string, payload []byte) {
	select {
	case h.broadcast <- broadcastMsg{auctionID: auctionID, payload: payload}:
		// queued
	default:
		log.Printf("wshub: broadcast queue full, dropping message for auction %s", auctionID)
	}
}

// BroadcastJSON marshals v to JSON and broadcasts it.
func (h *Hub) BroadcastJSON(auctionID string, v any) error {
	b, err := json.Marshal(v)
	if err != nil {
		return err
	}
	h.Broadcast(auctionID, b)
	return nil
}

// SubscriberCount returns the number of clients subscribed to an auction.
// Useful for /api/auctions/{id}/stats and admin monitoring.
func (h *Hub) SubscriberCount(auctionID string) int {
	// Note: this is a snapshot; reading from another goroutine is technically a
	// race condition, but the value is just informational. For exact counts,
	// route through a channel. We accept the imprecision here for simplicity.
	return len(h.rooms[auctionID])
}

// ─── Internal hub operations ────────────────────────────────────────────────

func (h *Hub) addClient(c *Client) {
	if h.rooms[c.auctionID] == nil {
		h.rooms[c.auctionID] = make(map[*Client]bool)
	}
	h.rooms[c.auctionID][c] = true
	log.Printf("wshub: client joined auction=%s user=%q (room size: %d)",
		c.auctionID, c.userID, len(h.rooms[c.auctionID]))
}

func (h *Hub) removeClient(c *Client) {
	if room, ok := h.rooms[c.auctionID]; ok {
		if _, exists := room[c]; exists {
			delete(room, c)
			c.closeOnce.Do(func() {
				close(c.send)
			})
			if len(room) == 0 {
				delete(h.rooms, c.auctionID)
			}
		}
	}
}

func (h *Hub) fanOut(msg broadcastMsg) {
	room, ok := h.rooms[msg.auctionID]
	if !ok {
		return // no subscribers
	}
	for c := range room {
		select {
		case c.send <- msg.payload:
			// delivered
		default:
			// Client's buffer is full → it's slow or stalled. Drop the connection.
			log.Printf("wshub: dropping slow client user=%q auction=%s", c.userID, c.auctionID)
			h.removeClient(c)
		}
	}
}

func (h *Hub) closeAll() {
	for _, room := range h.rooms {
		for c := range room {
			c.closeOnce.Do(func() {
				close(c.send)
			})
		}
	}
	h.rooms = nil
}

// ─── HTTP Upgrade Handler ───────────────────────────────────────────────────

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 4096,
	// CORS check: in production, validate Origin against ALLOWED_ORIGINS.
	// Here we accept any origin and rely on the CORS middleware for HTTP routes.
	// WebSockets are not subject to CORS in the same way, so we MUST validate Origin.
	CheckOrigin: func(r *http.Request) bool {
		return checkOrigin(r)
	},
}

// ServeWS handles WebSocket upgrade requests.
//
// Route: GET /ws/auction/{id}
// Auth:  optional ?token=<session> or Authorization header
// On success, the client receives an initial snapshot of the auction state.
func (h *Hub) ServeWS(w http.ResponseWriter, r *http.Request) {
	auctionID := r.PathValue("id")
	if auctionID == "" {
		http.Error(w, "missing auction id", http.StatusBadRequest)
		return
	}

	// Optional auth — anonymous viewers allowed (read-only)
	userID := authenticateOptional(r)

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("wshub: upgrade failed: %v", err)
		return
	}

	client := &Client{
		hub:       h,
		conn:      conn,
		auctionID: auctionID,
		userID:    userID,
		send:      make(chan []byte, clientSendBuffer),
	}

	h.register <- client

	// Start read & write goroutines.
	go client.readPump()
	go client.writePump()

	// Send initial auction snapshot (best-effort).
	go client.sendInitialSnapshot()
}

// ─── Per-Client Pumps ───────────────────────────────────────────────────────

// readPump receives ping/pong frames and detects disconnects.
// We don't accept any client commands over WebSocket; bids go through HTTP POST.
func (c *Client) readPump() {
	defer func() {
		c.hub.unregister <- c
		c.conn.Close()
	}()

	c.conn.SetReadLimit(maxMessageSize)
	c.conn.SetReadDeadline(time.Now().Add(pongWait))
	c.conn.SetPongHandler(func(string) error {
		c.conn.SetReadDeadline(time.Now().Add(pongWait))
		return nil
	})

	for {
		_, _, err := c.conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("wshub: read error user=%q: %v", c.userID, err)
			}
			break
		}
		// We accept the read but ignore the content. Future: support client-side
		// ping messages or subscription updates.
	}
}

// writePump sends messages from c.send and pings periodically.
func (c *Client) writePump() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.conn.Close()
	}()

	for {
		select {
		case payload, ok := <-c.send:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if !ok {
				// Hub closed the channel.
				_ = c.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}
			if err := c.conn.WriteMessage(websocket.TextMessage, payload); err != nil {
				return
			}

		case <-ticker.C:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := c.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}

// sendInitialSnapshot fires a one-time snapshot of the auction state to a fresh client.
// Mirrors the shape of bid_placed events but with type='snapshot'.
func (c *Client) sendInitialSnapshot() {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var (
		status         string
		currentBid     *float64
		bidCount       int
		bidderCount    int
		scheduledEndAt time.Time
		extensionCount int
		startingBid    float64
		bidIncrement   float64
	)
	err := db.Pool.QueryRow(ctx, `
		SELECT status::TEXT, current_bid, bid_count, bidder_count,
		       scheduled_end_at, extension_count, starting_bid, bid_increment
		FROM auctions WHERE id = $1`, c.auctionID).Scan(
		&status, &currentBid, &bidCount, &bidderCount,
		&scheduledEndAt, &extensionCount, &startingBid, &bidIncrement,
	)
	if err != nil {
		log.Printf("wshub: snapshot load failed for auction %s: %v", c.auctionID, err)
		return
	}

	snap := map[string]any{
		"type":             "snapshot",
		"auction_id":       c.auctionID,
		"status":           status,
		"current_bid":      currentBid,
		"starting_bid":     startingBid,
		"bid_increment":    bidIncrement,
		"bid_count":        bidCount,
		"bidder_count":     bidderCount,
		"scheduled_end_at": scheduledEndAt,
		"extension_count":  extensionCount,
		"server_time":      time.Now().UTC(),
	}
	payload, err := json.Marshal(snap)
	if err != nil {
		return
	}

	// Non-blocking send (channel may be closed if client disconnected immediately)
	defer func() {
		// recover from "send on closed channel" panic
		_ = recover()
	}()
	select {
	case c.send <- payload:
	default:
		// buffer full — skip; the client will reconnect if needed
	}
}

// ─── Auth helpers ───────────────────────────────────────────────────────────

// authenticateOptional reads a session token from the request and resolves to a user ID.
// Returns "" if no token is provided or the token is invalid (anonymous mode).
func authenticateOptional(r *http.Request) string {
	token := r.URL.Query().Get("token")
	if token == "" {
		// Try Authorization header (Bearer)
		auth := r.Header.Get("Authorization")
		if strings.HasPrefix(auth, "Bearer ") {
			token = strings.TrimPrefix(auth, "Bearer ")
		}
	}
	if token == "" {
		return ""
	}

	ctx, cancel := context.WithTimeout(r.Context(), 2*time.Second)
	defer cancel()

	var userID string
	err := db.Pool.QueryRow(ctx, `
		SELECT user_id::TEXT FROM user_sessions
		WHERE token = $1 AND expires_at > NOW()`, token).Scan(&userID)
	if err != nil {
		if !errors.Is(err, context.DeadlineExceeded) {
			// Log only unexpected errors; "no rows" is normal for invalid tokens
		}
		return ""
	}
	return userID
}

// checkOrigin validates the Origin header against ALLOWED_ORIGINS env var.
func checkOrigin(r *http.Request) bool {
	origin := r.Header.Get("Origin")
	if origin == "" {
		// Non-browser clients (curl, native apps) may have no Origin; allow.
		return true
	}
	allowed := db.EnvOrDefault("ALLOWED_ORIGINS", "http://localhost:3000,http://localhost:5173")
	for _, o := range strings.Split(allowed, ",") {
		if strings.TrimSpace(o) == origin {
			return true
		}
	}
	return false
}
