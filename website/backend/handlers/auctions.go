// Package handlers — Auction & Bid HTTP endpoints.
//
// Routes (registered in cmd/server/main.go):
//
//	POST   /api/auctions/{id}/bid         → PlaceBid
//	GET    /api/auctions/{id}             → GetAuction
//	GET    /api/auctions/{id}/bids        → GetBidHistory
//	GET    /api/auctions                  → ListAuctions
//	POST   /api/auctions/{id}/deposit     → CreateDeposit (placeholder for SADAD)
//	GET    /api/auctions/{id}/verify-chain → VerifyChain (admin/audit)
package handlers

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/jackc/pgx/v5"

	"github.com/mzadat/backend/audit"
	"github.com/mzadat/backend/bidengine"
	"github.com/mzadat/backend/db"
	"github.com/mzadat/backend/wshub"
)

// AuctionHub is set in main.go. Handlers broadcast bid events through it.
var AuctionHub *wshub.Hub

// ─── PlaceBid ───────────────────────────────────────────────────────────────

type placeBidRequest struct {
	Amount         float64 `json:"amount"`
	IdempotencyKey string  `json:"idempotency_key"`
}

// PlaceBid is POST /api/auctions/{id}/bid
//
// Request:  { "amount": 525000, "idempotency_key": "uuid-v4" }
// Response: 201 + bid event payload, or 4xx on validation/business error.
//
// Auth: required (session token in Authorization: Bearer <token>)
func PlaceBid(w http.ResponseWriter, r *http.Request) {
	auctionID := r.PathValue("id")
	if auctionID == "" {
		writeJSONError(w, http.StatusBadRequest, "missing auction id", "MISSING_ID")
		return
	}

	// Auth: extract user from session token
	userID, err := userFromSession(r)
	if err != nil {
		writeJSONError(w, http.StatusUnauthorized, "authentication required", "UNAUTHENTICATED")
		return
	}

	// Parse body
	var req placeBidRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid JSON body", "BAD_JSON")
		return
	}
	if req.IdempotencyKey == "" {
		writeJSONError(w, http.StatusBadRequest, "idempotency_key is required", "MISSING_KEY")
		return
	}

	// Forensics
	clientIP := extractClientIP(r)
	userAgent := r.UserAgent()
	if len(userAgent) > 1000 {
		userAgent = userAgent[:1000]
	}

	// Place the bid (transaction inside)
	ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
	defer cancel()

	result, err := bidengine.PlaceBid(ctx, bidengine.PlaceBidInput{
		AuctionID:      auctionID,
		BidderUserID:   userID,
		Amount:         req.Amount,
		IdempotencyKey: req.IdempotencyKey,
		IPAddress:      clientIP,
		UserAgent:      userAgent,
	})
	if err != nil {
		status := bidengine.MapErrorToHTTPStatus(err)
		writeJSONError(w, status, err.Error(), errCodeFor(err))
		return
	}

	// Broadcast to all WS subscribers (best-effort, async)
	if AuctionHub != nil {
		event, evErr := bidengine.ToEvent(ctx, result, userID)
		if evErr == nil {
			_ = AuctionHub.BroadcastJSON(auctionID, event)
		} else {
			log.Printf("handlers: failed to build bid event: %v", evErr)
		}
	}

	// Optional: write to audit_log for high-value bids (>1M SAR)
	if result.Amount >= 1_000_000 {
		audit.Record(r, "", "", "BID_HIGH_VALUE", "auction", auctionID, map[string]any{
			"bid_id":  result.BidID,
			"amount":  result.Amount,
			"bidder":  userID,
			"bid_seq": result.BidSeq,
		})
	}

	writeJSON(w, http.StatusCreated, result)
}

// ─── GetAuction ─────────────────────────────────────────────────────────────

// GetAuction is GET /api/auctions/{id}
// Returns a public-safe snapshot of the auction's current state.
func GetAuction(w http.ResponseWriter, r *http.Request) {
	auctionID := r.PathValue("id")
	if auctionID == "" {
		writeJSONError(w, http.StatusBadRequest, "missing id", "MISSING_ID")
		return
	}

	ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
	defer cancel()

	snap, err := bidengine.GetAuctionSnapshot(ctx, auctionID)
	if err != nil {
		if errors.Is(err, bidengine.ErrAuctionNotFound) {
			writeJSONError(w, http.StatusNotFound, "auction not found", "NOT_FOUND")
			return
		}
		writeJSONError(w, http.StatusInternalServerError, "internal error", "DB_ERROR")
		return
	}

	writeJSON(w, http.StatusOK, snap)
}

// ─── GetBidHistory ──────────────────────────────────────────────────────────

type bidHistoryItem struct {
	BidSeq           int64     `json:"bid_seq"`
	Amount           float64   `json:"amount"`
	BidderMaskedName string    `json:"bidder_masked_name"`
	CreatedAt        time.Time `json:"created_at"`
	CausedExtension  bool      `json:"caused_extension"`
	Kind             string    `json:"kind"`
}

// GetBidHistory is GET /api/auctions/{id}/bids?limit=50&offset=0
// Returns bid history with masked bidder names (privacy).
func GetBidHistory(w http.ResponseWriter, r *http.Request) {
	auctionID := r.PathValue("id")
	if auctionID == "" {
		writeJSONError(w, http.StatusBadRequest, "missing id", "MISSING_ID")
		return
	}
	limit := 50
	if l := r.URL.Query().Get("limit"); l != "" {
		if n, err := strconv.Atoi(l); err == nil && n > 0 && n <= 200 {
			limit = n
		}
	}
	offset := 0
	if o := r.URL.Query().Get("offset"); o != "" {
		if n, err := strconv.Atoi(o); err == nil && n >= 0 {
			offset = n
		}
	}

	ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
	defer cancel()

	rows, err := db.Pool.Query(ctx, `
		SELECT b.bid_seq, b.amount, b.created_at, b.caused_extension, b.kind::TEXT,
		       COALESCE(u.nafath_full_name_ar, u.full_name) AS name
		FROM bids b
		JOIN users u ON u.id = b.bidder_user_id
		WHERE b.auction_id = $1
		ORDER BY b.bid_seq DESC
		LIMIT $2 OFFSET $3`, auctionID, limit, offset)
	if err != nil {
		log.Printf("GetBidHistory query: %v", err)
		writeJSONError(w, http.StatusInternalServerError, "internal error", "DB_ERROR")
		return
	}
	defer rows.Close()

	out := make([]bidHistoryItem, 0, limit)
	for rows.Next() {
		var (
			seq       int64
			amount    float64
			createdAt time.Time
			causedExt bool
			kind      string
			fullName  string
		)
		if err := rows.Scan(&seq, &amount, &createdAt, &causedExt, &kind, &fullName); err != nil {
			continue
		}
		out = append(out, bidHistoryItem{
			BidSeq:           seq,
			Amount:           amount,
			BidderMaskedName: bidengine.MaskName(fullName),
			CreatedAt:        createdAt,
			CausedExtension:  causedExt,
			Kind:             kind,
		})
	}

	writeJSON(w, http.StatusOK, map[string]any{
		"items":  out,
		"limit":  limit,
		"offset": offset,
	})
}

// ─── ListAuctions ───────────────────────────────────────────────────────────

type auctionListItem struct {
	ID               string    `json:"id"`
	Status           string    `json:"status"`
	PropertyID       int64     `json:"property_id"`
	PropertyTitle    string    `json:"property_title"`
	StartingBid      float64   `json:"starting_bid"`
	CurrentBid       *float64  `json:"current_bid"`
	BidCount         int       `json:"bid_count"`
	BidderCount      int       `json:"bidder_count"`
	ScheduledStartAt time.Time `json:"scheduled_start_at"`
	ScheduledEndAt   time.Time `json:"scheduled_end_at"`
	DepositAmount    float64   `json:"deposit_amount"`
	Mode             string    `json:"mode"`
}

// ListAuctions is GET /api/auctions?status=live&limit=20
func ListAuctions(w http.ResponseWriter, r *http.Request) {
	status := r.URL.Query().Get("status")
	limit := 20
	if l := r.URL.Query().Get("limit"); l != "" {
		if n, err := strconv.Atoi(l); err == nil && n > 0 && n <= 100 {
			limit = n
		}
	}

	ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
	defer cancel()

	query := `
		SELECT a.id::TEXT, a.status::TEXT, a.property_id, COALESCE(p.title, ''),
		       a.starting_bid, a.current_bid, a.bid_count, a.bidder_count,
		       a.scheduled_start_at, a.scheduled_end_at, a.deposit_amount, a.mode::TEXT
		FROM auctions a
		LEFT JOIN properties p ON p.id = a.property_id
		WHERE ($1 = '' OR a.status::TEXT = $1)
		ORDER BY
			CASE a.status WHEN 'live' THEN 0 WHEN 'scheduled' THEN 1 ELSE 2 END,
			a.scheduled_end_at ASC
		LIMIT $2`

	rows, err := db.Pool.Query(ctx, query, status, limit)
	if err != nil {
		log.Printf("ListAuctions query: %v", err)
		writeJSONError(w, http.StatusInternalServerError, "internal error", "DB_ERROR")
		return
	}
	defer rows.Close()

	out := make([]auctionListItem, 0, limit)
	for rows.Next() {
		var item auctionListItem
		if err := rows.Scan(
			&item.ID, &item.Status, &item.PropertyID, &item.PropertyTitle,
			&item.StartingBid, &item.CurrentBid, &item.BidCount, &item.BidderCount,
			&item.ScheduledStartAt, &item.ScheduledEndAt, &item.DepositAmount, &item.Mode,
		); err != nil {
			continue
		}
		out = append(out, item)
	}

	writeJSON(w, http.StatusOK, map[string]any{
		"items":  out,
		"count":  len(out),
		"status": status,
	})
}

// ─── CreateDeposit (placeholder) ────────────────────────────────────────────

type createDepositRequest struct {
	PaymentMethod string `json:"payment_method"` // "sadad" | "mada" | "wallet"
}

type createDepositResponse struct {
	HoldID          string  `json:"hold_id"`
	Status          string  `json:"status"` // "pending" until SADAD callback
	Amount          float64 `json:"amount"`
	SadadInvoiceID  string  `json:"sadad_invoice_id,omitempty"`
	SadadBillNumber string  `json:"sadad_bill_number,omitempty"`
}

// CreateDeposit is POST /api/auctions/{id}/deposit
//
// In production this would integrate with SADAD/Moyasar to issue a real bill.
// Here we create the financial_holds row in 'pending' status and return a placeholder.
// The actual SADAD callback handler (separate file) flips status → 'active'.
func CreateDeposit(w http.ResponseWriter, r *http.Request) {
	auctionID := r.PathValue("id")
	if auctionID == "" {
		writeJSONError(w, http.StatusBadRequest, "missing id", "MISSING_ID")
		return
	}
	userID, err := userFromSession(r)
	if err != nil {
		writeJSONError(w, http.StatusUnauthorized, "authentication required", "UNAUTHENTICATED")
		return
	}

	var req createDepositRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid body", "BAD_JSON")
		return
	}
	if req.PaymentMethod == "" {
		req.PaymentMethod = "sadad"
	}

	ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
	defer cancel()

	// Load auction deposit amount
	var depositAmount float64
	err = db.Pool.QueryRow(ctx,
		`SELECT deposit_amount FROM auctions WHERE id = $1`, auctionID,
	).Scan(&depositAmount)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			writeJSONError(w, http.StatusNotFound, "auction not found", "NOT_FOUND")
			return
		}
		writeJSONError(w, http.StatusInternalServerError, "internal error", "DB_ERROR")
		return
	}

	// Insert hold (pending). The SADAD invoice number would normally come from
	// calling the SADAD bill creation API — replaced here with a placeholder.
	sadadInvoiceID := fmt.Sprintf("MZD-%s-%d", strings.ReplaceAll(auctionID, "-", "")[:12], time.Now().Unix())
	sadadBillNumber := fmt.Sprintf("%010d", time.Now().UnixNano()%10000000000)

	var holdID string
	err = db.Pool.QueryRow(ctx, `
		INSERT INTO financial_holds (
			auction_id, bidder_user_id, amount, payment_method,
			sadad_invoice_id, sadad_bill_number, status
		) VALUES ($1, $2, $3, $4::hold_payment_method, $5, $6, 'pending')
		ON CONFLICT (auction_id, bidder_user_id) DO UPDATE
		SET sadad_invoice_id  = EXCLUDED.sadad_invoice_id,
		    sadad_bill_number = EXCLUDED.sadad_bill_number,
		    payment_method    = EXCLUDED.payment_method,
		    status            = 'pending',
		    updated_at        = NOW()
		RETURNING id::TEXT`,
		auctionID, userID, depositAmount, req.PaymentMethod,
		sadadInvoiceID, sadadBillNumber,
	).Scan(&holdID)
	if err != nil {
		log.Printf("CreateDeposit insert: %v", err)
		writeJSONError(w, http.StatusInternalServerError, "could not create hold", "DB_ERROR")
		return
	}

	writeJSON(w, http.StatusCreated, createDepositResponse{
		HoldID:          holdID,
		Status:          "pending",
		Amount:          depositAmount,
		SadadInvoiceID:  sadadInvoiceID,
		SadadBillNumber: sadadBillNumber,
	})
}

// ─── VerifyChain (admin) ────────────────────────────────────────────────────

// VerifyChain is GET /api/auctions/{id}/verify-chain
// Admin-only. Re-derives the bid hash chain and reports any tampering.
func VerifyChain(w http.ResponseWriter, r *http.Request) {
	// Reuse the admin verification from handlers/admin.go
	if _, _, ok := verifyAdminToken(r); !ok {
		writeJSONError(w, http.StatusForbidden, "admin only", "FORBIDDEN")
		return
	}
	auctionID := r.PathValue("id")
	if auctionID == "" {
		writeJSONError(w, http.StatusBadRequest, "missing id", "MISSING_ID")
		return
	}

	ctx, cancel := context.WithTimeout(r.Context(), 30*time.Second)
	defer cancel()

	failedSeq, err := bidengine.VerifyChain(ctx, auctionID)
	if err != nil {
		writeJSON(w, http.StatusOK, map[string]any{
			"intact":     false,
			"failed_seq": failedSeq,
			"error":      err.Error(),
		})
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{
		"intact":     true,
		"failed_seq": 0,
	})
}

// ─── helpers ────────────────────────────────────────────────────────────────

func writeJSON(w http.ResponseWriter, status int, body any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(body)
}

func writeJSONError(w http.ResponseWriter, status int, msg, code string) {
	writeJSON(w, status, map[string]string{"error": msg, "code": code})
}

func errCodeFor(err error) string {
	switch {
	case errors.Is(err, bidengine.ErrAuctionNotFound):
		return "NOT_FOUND"
	case errors.Is(err, bidengine.ErrAuctionNotLive):
		return "NOT_LIVE"
	case errors.Is(err, bidengine.ErrAuctionEnded):
		return "ENDED"
	case errors.Is(err, bidengine.ErrBidTooLow):
		return "BID_TOO_LOW"
	case errors.Is(err, bidengine.ErrBidderHasNoHold):
		return "NO_DEPOSIT"
	case errors.Is(err, bidengine.ErrBidderIsSeller):
		return "IS_SELLER"
	case errors.Is(err, bidengine.ErrDuplicateIdempotencyKey):
		return "DUPLICATE_KEY"
	case errors.Is(err, bidengine.ErrUserDisqualified):
		return "DISQUALIFIED"
	case errors.Is(err, bidengine.ErrMaxExtensionsReached):
		return "MAX_EXTENSIONS"
	default:
		return "INTERNAL"
	}
}

// userFromSession resolves the bearer/cookie session token to a user UUID.
// Returns an error if no valid session exists.
func userFromSession(r *http.Request) (string, error) {
	token := extractBearer(r)
	if token == "" {
		// Fallback: cookie-based session (set by /api/auth/login)
		if c, err := r.Cookie("mzdt_session"); err == nil {
			token = c.Value
		}
	}
	if token == "" {
		return "", errors.New("no session token")
	}

	ctx, cancel := context.WithTimeout(r.Context(), 2*time.Second)
	defer cancel()

	var userID string
	err := db.Pool.QueryRow(ctx, `
		SELECT user_id::TEXT FROM user_sessions
		WHERE token = $1 AND expires_at > NOW()`, token).Scan(&userID)
	if err != nil {
		return "", err
	}
	return userID, nil
}

func extractBearer(r *http.Request) string {
	auth := r.Header.Get("Authorization")
	if strings.HasPrefix(auth, "Bearer ") {
		return strings.TrimPrefix(auth, "Bearer ")
	}
	return ""
}

func extractClientIP(r *http.Request) string {
	// Trust X-Forwarded-For only behind a reverse proxy. In production, set
	// TRUST_PROXY=1 and configure Nginx to set this header correctly.
	if db.EnvOrDefault("TRUST_PROXY", "0") == "1" {
		if xff := r.Header.Get("X-Forwarded-For"); xff != "" {
			// Take the first IP in the chain (left-most = original client)
			if i := strings.Index(xff, ","); i > 0 {
				return strings.TrimSpace(xff[:i])
			}
			return strings.TrimSpace(xff)
		}
	}
	// Fall back to the connection's remote address (strip port)
	addr := r.RemoteAddr
	if i := strings.LastIndex(addr, ":"); i > 0 {
		addr = addr[:i]
	}
	return addr
}
