package handlers

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"net/http"
	"strings"
	"sync/atomic"
	"time"

	"github.com/mzadat/backend/audit"
	"github.com/mzadat/backend/db"
)

// ── Types ──────────────────────────────────────────────────────────────────

type adminLoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type adminLoginResponse struct {
	Token    string `json:"token"`
	Role     string `json:"role"`
	FullName string `json:"full_name"`
	Email    string `json:"email"`
}

type auctionRow struct {
	ID          int64   `json:"id"`
	TitleAr     string  `json:"title_ar"`
	TitleEn     string  `json:"title_en"`
	Status      string  `json:"status"`
	Type        string  `json:"type"`
	CityAr      string  `json:"city_ar"`
	CityEn      string  `json:"city_en"`
	CurrentBid  float64 `json:"current_bid"`
	StartingBid float64 `json:"starting_bid"`
	AuctionEnd  *string `json:"auction_end"`
	OwnerID     *string `json:"owner_id"`
	CreatedAt   string  `json:"created_at"`
}

// ── Helpers ────────────────────────────────────────────────────────────────

func generateToken() (string, error) {
	b := make([]byte, 32)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	return hex.EncodeToString(b), nil
}

// Rate-limit the session cleanup: at most once per hour, not per-request.
var lastCleanup atomic.Int64 // unix seconds

func cleanupExpiredSessions() {
	now := time.Now().Unix()
	last := lastCleanup.Load()
	// Only one cleanup per hour
	if now-last < 3600 {
		return
	}
	if !lastCleanup.CompareAndSwap(last, now) {
		// Another goroutine is already running cleanup
		return
	}
	go func() {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		_, _ = db.Pool.Exec(ctx,
			"DELETE FROM admin_sessions WHERE expires_at < NOW()")
	}()
}

// verifyAdminToken checks the Bearer token from the Authorization header.
// Returns (adminID, role, ok).
func verifyAdminToken(r *http.Request) (string, string, bool) {
	adminID, _, role, ok := verifyAdminTokenFull(r)
	return adminID, role, ok
}

// verifyAdminTokenFull also returns the admin's email for audit logging.
// Returns (adminID, email, role, ok).
func verifyAdminTokenFull(r *http.Request) (string, string, string, bool) {
	auth := r.Header.Get("Authorization")
	if !strings.HasPrefix(auth, "Bearer ") {
		return "", "", "", false
	}
	token := strings.TrimPrefix(auth, "Bearer ")
	if len(token) != 64 { // hex of 32 bytes
		return "", "", "", false
	}

	// Throttled background cleanup (no longer per-request)
	cleanupExpiredSessions()

	ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
	defer cancel()

	var adminID, email, role string
	err := db.Pool.QueryRow(ctx, `
		SELECT u.id::text, u.email, u.role
		FROM   admin_sessions s
		JOIN   admin_users    u ON u.id = s.admin_id
		WHERE  s.token = $1
		  AND  s.expires_at > NOW()
		  AND  u.is_active = true
	`, token).Scan(&adminID, &email, &role)

	if err != nil {
		return "", "", "", false
	}
	return adminID, email, role, true
}

// getAdminContext is a convenience wrapper for handlers that need adminID + email.
// Returns (adminID, email, ok).
func getAdminContext(r *http.Request) (string, string, bool) {
	adminID, email, _, ok := verifyAdminTokenFull(r)
	return adminID, email, ok
}

// requireAdmin is a small guard combining method check + auth check.
// Returns true if the request should proceed.
func requireAdmin(w http.ResponseWriter, r *http.Request, allowedMethod string) bool {
	if r.Method != allowedMethod {
		jsonError(w, "method not allowed", http.StatusMethodNotAllowed)
		return false
	}
	if _, _, ok := verifyAdminToken(r); !ok {
		jsonError(w, "unauthorized", http.StatusUnauthorized)
		return false
	}
	return true
}

// ── Handlers ───────────────────────────────────────────────────────────────

// AdminLogin handles POST /api/admin/login
func AdminLogin(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		jsonError(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req adminLoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		jsonError(w, "invalid request", http.StatusBadRequest)
		return
	}
	req.Email = strings.TrimSpace(strings.ToLower(req.Email))
	if req.Email == "" || req.Password == "" {
		jsonError(w, "invalid request", http.StatusBadRequest)
		return
	}

	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()

	var adminID, role, fullName string
	err := db.Pool.QueryRow(ctx, `
		SELECT id, role, COALESCE(full_name,'')
		FROM   admin_users
		WHERE  email     = $1
		  AND  password_hash = crypt($2, password_hash)
		  AND  is_active = true
	`, req.Email, req.Password).Scan(&adminID, &role, &fullName)

	if err != nil {
		// Always return the same error - don't leak whether email exists
		jsonError(w, "invalid credentials", http.StatusUnauthorized)
		return
	}

	token, err := generateToken()
	if err != nil {
		jsonError(w, "server error", http.StatusInternalServerError)
		return
	}

	// Session valid for 24 hours
	_, err = db.Pool.Exec(ctx, `
		INSERT INTO admin_sessions (admin_id, token, expires_at)
		VALUES ($1, $2, NOW() + INTERVAL '24 hours')
	`, adminID, token)
	if err != nil {
		jsonError(w, "server error", http.StatusInternalServerError)
		return
	}

	// Update last_login (fire-and-forget with timeout)
	go func() {
		ctx2, cancel2 := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel2()
		_, _ = db.Pool.Exec(ctx2,
			"UPDATE admin_users SET last_login = NOW() WHERE id = $1", adminID)
	}()

	// Audit: successful login
	audit.Record(r, adminID, req.Email, audit.ActionLogin,
		audit.EntitySession, "",
		map[string]any{"role": role})

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(adminLoginResponse{
		Token:    token,
		Role:     role,
		FullName: fullName,
		Email:    req.Email,
	})
}

// AdminLogout handles POST /api/admin/logout
func AdminLogout(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		jsonError(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	auth := r.Header.Get("Authorization")
	if strings.HasPrefix(auth, "Bearer ") {
		token := strings.TrimPrefix(auth, "Bearer ")
		go func() {
			ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
			defer cancel()
			_, _ = db.Pool.Exec(ctx,
				"DELETE FROM admin_sessions WHERE token = $1", token)
		}()
	}

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(map[string]bool{"ok": true})
}

// AdminGetAuctions handles GET /api/admin/auctions
func AdminGetAuctions(w http.ResponseWriter, r *http.Request) {
	if !requireAdmin(w, r, http.MethodGet) {
		return
	}

	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()

	rows, err := db.Pool.Query(ctx, `
		SELECT
			id, title_ar, title_en, status, type,
			city_ar, city_en,
			COALESCE(current_bid, 0),
			COALESCE(starting_bid, 0),
			TO_CHAR(auction_end, 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
			CAST(owner_id AS TEXT),
			TO_CHAR(created_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"')
		FROM properties
		ORDER BY created_at DESC
		LIMIT 200
	`)
	if err != nil {
		jsonError(w, "database error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	auctions := []auctionRow{}
	for rows.Next() {
		var a auctionRow
		if err := rows.Scan(
			&a.ID, &a.TitleAr, &a.TitleEn, &a.Status, &a.Type,
			&a.CityAr, &a.CityEn,
			&a.CurrentBid, &a.StartingBid,
			&a.AuctionEnd, &a.OwnerID, &a.CreatedAt,
		); err == nil {
			auctions = append(auctions, a)
		}
	}

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(map[string]any{
		"data":  auctions,
		"total": len(auctions),
	})
}

// AdminApproveAuction handles PATCH /api/admin/auctions/{id}/approve
func AdminApproveAuction(w http.ResponseWriter, r *http.Request) {
	if !requireAdmin(w, r, http.MethodPatch) {
		return
	}
	adminID, adminEmail, _ := getAdminContext(r)

	id := r.PathValue("id")
	if id == "" {
		jsonError(w, "missing id", http.StatusBadRequest)
		return
	}

	ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
	defer cancel()

	tag, err := db.Pool.Exec(ctx,
		"UPDATE properties SET status = 'auction', updated_at = NOW() WHERE id = $1", id)
	if err != nil {
		jsonError(w, "database error", http.StatusInternalServerError)
		return
	}
	if tag.RowsAffected() == 0 {
		jsonError(w, "not found", http.StatusNotFound)
		return
	}

	audit.Record(r, adminID, adminEmail, audit.ActionAuctionApprove,
		audit.EntityProperty, id,
		map[string]any{"new_status": "auction"})

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(map[string]any{"ok": true, "id": id, "status": "auction"})
}

// AdminRejectAuction handles PATCH /api/admin/auctions/{id}/reject
func AdminRejectAuction(w http.ResponseWriter, r *http.Request) {
	if !requireAdmin(w, r, http.MethodPatch) {
		return
	}
	adminID, adminEmail, _ := getAdminContext(r)

	id := r.PathValue("id")
	if id == "" {
		jsonError(w, "missing id", http.StatusBadRequest)
		return
	}

	ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
	defer cancel()

	tag, err := db.Pool.Exec(ctx,
		"UPDATE properties SET status = 'pending', updated_at = NOW() WHERE id = $1", id)
	if err != nil {
		jsonError(w, "database error", http.StatusInternalServerError)
		return
	}
	if tag.RowsAffected() == 0 {
		jsonError(w, "not found", http.StatusNotFound)
		return
	}

	audit.Record(r, adminID, adminEmail, audit.ActionAuctionReject,
		audit.EntityProperty, id,
		map[string]any{"new_status": "pending"})

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(map[string]any{"ok": true, "id": id, "status": "pending"})
}

// AdminDeleteAuction handles DELETE /api/admin/auctions/{id}
func AdminDeleteAuction(w http.ResponseWriter, r *http.Request) {
	if !requireAdmin(w, r, http.MethodDelete) {
		return
	}
	adminID, adminEmail, _ := getAdminContext(r)

	id := r.PathValue("id")
	if id == "" {
		jsonError(w, "missing id", http.StatusBadRequest)
		return
	}

	ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
	defer cancel()

	tag, err := db.Pool.Exec(ctx, "DELETE FROM properties WHERE id = $1", id)
	if err != nil {
		jsonError(w, "database error", http.StatusInternalServerError)
		return
	}
	if tag.RowsAffected() == 0 {
		jsonError(w, "not found", http.StatusNotFound)
		return
	}

	audit.Record(r, adminID, adminEmail, audit.ActionAuctionDelete,
		audit.EntityProperty, id,
		map[string]any{})

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(map[string]any{"ok": true, "id": id})
}
