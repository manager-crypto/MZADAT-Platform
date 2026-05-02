// Package handlers — Nafath (National Single Sign-On) integration.
//
// Per Infath spec: "تسجيل الدخول في البوابة الإلكترونية (باستخدام النفاذ الوطني الموحد)"
//
// Flow:
//  1. POST /api/auth/nafath/initiate { national_id }
//     → returns { request_id, random_number } — user enters this in Nafath app
//  2. GET /api/auth/nafath/status/{request_id}
//     → returns { status: "WAITING|APPROVED|REJECTED|EXPIRED", user? }
//     → on APPROVED, creates/links a session and returns user data
//
// For DEVELOPMENT (NAFATH_MODE=mock):
//   - Returns a deterministic random_number based on national_id
//   - Auto-approves after a 3-second delay (configurable via NAFATH_MOCK_DELAY)
//
// For PRODUCTION (NAFATH_MODE=live):
//   - Calls NIC API at NAFATH_API_URL with NAFATH_API_KEY
//   - Polls for status
//   - Returns canonical name from Nafath response
//
// IMPORTANT: This file deliberately keeps the production path as a stub. The real
// NIC integration requires:
//   - Signed NDA with the National Information Center
//   - Production NAFATH_API_KEY issued by NIC
//   - Whitelisted server IP
//
// The mock mode allows full development + UAT without these blockers.
package handlers

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"math/big"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/jackc/pgx/v5"

	"github.com/mzadat/backend/audit"
	"github.com/mzadat/backend/db"
)

// ─── Types ──────────────────────────────────────────────────────────────────

type nafathInitiateRequest struct {
	NationalID string `json:"national_id"`
}

type nafathInitiateResponse struct {
	RequestID    string    `json:"request_id"`
	RandomNumber int       `json:"random_number"`
	ExpiresAt    time.Time `json:"expires_at"`
	Mode         string    `json:"mode"`
}

type nafathStatusResponse struct {
	RequestID  string    `json:"request_id"`
	Status     string    `json:"status"` // WAITING, APPROVED, REJECTED, EXPIRED
	NationalID string    `json:"national_id,omitempty"`
	FullName   string    `json:"full_name,omitempty"`
	BirthDate  string    `json:"birth_date,omitempty"`
	UserID     string    `json:"user_id,omitempty"` // set on APPROVED if user exists/created
	Token      string    `json:"token,omitempty"`   // session token, on APPROVED
	UpdatedAt  time.Time `json:"updated_at"`
}

// ─── NafathInitiate: POST /api/auth/nafath/initiate ─────────────────────────

func NafathInitiate(w http.ResponseWriter, r *http.Request) {
	var req nafathInitiateRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid JSON body", "BAD_JSON")
		return
	}

	// Validate Saudi National ID (10 digits, starts with 1 for citizens / 2 for residents)
	nid := strings.TrimSpace(req.NationalID)
	if !isValidSaudiID(nid) {
		writeJSONError(w, http.StatusUnprocessableEntity,
			"رقم الهوية غير صالح", "INVALID_NATIONAL_ID")
		return
	}

	// Generate a request ID and 2-digit random number (Nafath shows up to 99)
	requestID := generateRequestID()
	randomNum, err := secureRandomInt(100) // 0-99
	if err != nil {
		log.Printf("NafathInitiate: random failed: %v", err)
		writeJSONError(w, http.StatusInternalServerError, "internal error", "INTERNAL")
		return
	}
	expiresAt := time.Now().Add(5 * time.Minute)

	mode := nafathMode()

	// Store the request in DB so /status can poll
	ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
	defer cancel()
	_, err = db.Pool.Exec(ctx, `
		INSERT INTO nafath_requests (id, national_id, random_number, status, expires_at, mode)
		VALUES ($1, $2, $3, 'WAITING', $4, $5)
		ON CONFLICT (id) DO NOTHING`,
		requestID, nid, randomNum, expiresAt, mode)
	if err != nil {
		log.Printf("NafathInitiate insert: %v", err)
		writeJSONError(w, http.StatusInternalServerError, "internal error", "INTERNAL")
		return
	}

	// In MOCK mode, schedule auto-approval after a delay
	if mode == "mock" {
		go mockAutoApprove(requestID, nid, randomNum)
	} else {
		// In LIVE mode, kick off the call to NIC API (async)
		go callNafathLive(requestID, nid, randomNum)
	}

	writeJSON(w, http.StatusCreated, nafathInitiateResponse{
		RequestID:    requestID,
		RandomNumber: randomNum,
		ExpiresAt:    expiresAt,
		Mode:         mode,
	})
}

// ─── NafathStatus: GET /api/auth/nafath/status/{request_id} ─────────────────

func NafathStatus(w http.ResponseWriter, r *http.Request) {
	requestID := r.PathValue("request_id")
	if requestID == "" {
		writeJSONError(w, http.StatusBadRequest, "missing request_id", "MISSING_ID")
		return
	}

	ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
	defer cancel()

	var (
		nid       string
		status    string
		fullName  *string
		birthDate *time.Time
		expiresAt time.Time
		updatedAt time.Time
	)
	err := db.Pool.QueryRow(ctx, `
		SELECT national_id, status, full_name, birth_date, expires_at, updated_at
		FROM nafath_requests
		WHERE id = $1`, requestID).Scan(
		&nid, &status, &fullName, &birthDate, &expiresAt, &updatedAt)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			writeJSONError(w, http.StatusNotFound, "request not found", "NOT_FOUND")
			return
		}
		log.Printf("NafathStatus query: %v", err)
		writeJSONError(w, http.StatusInternalServerError, "internal error", "INTERNAL")
		return
	}

	// Auto-expire if past deadline
	if status == "WAITING" && time.Now().After(expiresAt) {
		_, _ = db.Pool.Exec(ctx,
			`UPDATE nafath_requests SET status = 'EXPIRED' WHERE id = $1 AND status = 'WAITING'`,
			requestID)
		status = "EXPIRED"
	}

	resp := nafathStatusResponse{
		RequestID: requestID,
		Status:    status,
		UpdatedAt: updatedAt,
	}

	// On APPROVED: create/link user and issue session token
	if status == "APPROVED" {
		userID, token, name, bdate, err := upsertNafathUser(ctx, r, nid, fullName, birthDate)
		if err != nil {
			log.Printf("NafathStatus upsert: %v", err)
			writeJSONError(w, http.StatusInternalServerError, "user provisioning failed", "PROVISIONING_FAILED")
			return
		}
		resp.NationalID = nid
		resp.FullName = name
		resp.BirthDate = bdate
		resp.UserID = userID
		resp.Token = token
	}

	writeJSON(w, http.StatusOK, resp)
}

// ─── User upsert from Nafath response ───────────────────────────────────────

// upsertNafathUser creates or updates a user record based on Nafath data,
// then issues a fresh session token.
func upsertNafathUser(ctx context.Context, r *http.Request, nationalID string,
	fullName *string, birthDate *time.Time,
) (userID, token, name, bdate string, err error) {

	name = ""
	if fullName != nil {
		name = *fullName
	}
	bdate = ""
	if birthDate != nil {
		bdate = birthDate.Format("2006-01-02")
	}

	// Find existing user by Nafath ID, or create
	err = db.Pool.QueryRow(ctx, `
		SELECT id::TEXT FROM users WHERE nafath_id = $1`, nationalID).Scan(&userID)
	if errors.Is(err, pgx.ErrNoRows) {
		// Create new user. Email + phone are placeholders since Nafath doesn't return them.
		// Customer must complete profile after first Nafath login.
		stubEmail := fmt.Sprintf("nafath_%s@unverified.mzadat.local", nationalID)
		stubPhone := "+966" + nationalID
		err = db.Pool.QueryRow(ctx, `
			INSERT INTO users (
				email, password_hash, phone, full_name,
				nafath_id, nafath_verified_at, nafath_full_name_ar, nafath_birth_date,
				is_active, email_verified, phone_verified
			) VALUES (
				$1, '', $2, COALESCE($3, ''), $4, NOW(), $5, $6, TRUE, FALSE, FALSE
			)
			RETURNING id::TEXT`,
			stubEmail, stubPhone, fullName, nationalID, fullName, birthDate,
		).Scan(&userID)
		if err != nil {
			return "", "", "", "", fmt.Errorf("create user: %w", err)
		}

		audit.Record(r, "", "", "NAFATH_USER_CREATED", "user", userID, map[string]any{
			"national_id": nationalID,
		})
	} else if err != nil {
		return "", "", "", "", fmt.Errorf("lookup user: %w", err)
	} else {
		// Existing user — update Nafath fields (in case name changed in NIC records)
		_, err = db.Pool.Exec(ctx, `
			UPDATE users SET
				nafath_verified_at = NOW(),
				nafath_full_name_ar = COALESCE($2, nafath_full_name_ar),
				nafath_birth_date = COALESCE($3, nafath_birth_date)
			WHERE nafath_id = $1`, nationalID, fullName, birthDate)
		if err != nil {
			return "", "", "", "", fmt.Errorf("update user: %w", err)
		}
	}

	// Issue session token
	tokenBytes := make([]byte, 32)
	if _, err := rand.Read(tokenBytes); err != nil {
		return "", "", "", "", fmt.Errorf("token gen: %w", err)
	}
	token = hex.EncodeToString(tokenBytes)

	_, err = db.Pool.Exec(ctx, `
		INSERT INTO user_sessions (user_id, token, expires_at, ip_address, user_agent)
		VALUES ($1, $2, NOW() + INTERVAL '30 days', $3, $4)`,
		userID, token, clientIP(r), r.UserAgent())
	if err != nil {
		return "", "", "", "", fmt.Errorf("create session: %w", err)
	}

	audit.Record(r, "", "", "NAFATH_LOGIN", "user", userID, map[string]any{
		"national_id": nationalID,
	})

	return userID, token, name, bdate, nil
}

// ─── Mock implementation ────────────────────────────────────────────────────

// mockAutoApprove simulates the Nafath app approval flow.
// In real life, the user opens their Nafath app, sees the random_number,
// and approves; here we approve automatically after a delay.
func mockAutoApprove(requestID, nationalID string, randomNumber int) {
	delay := nafathMockDelay()
	time.Sleep(delay)

	// Generate a deterministic-but-realistic mock name
	mockName := generateMockName(nationalID)
	mockBirthDate := time.Date(1985+(int(nationalID[len(nationalID)-1])-'0'), 5, 15, 0, 0, 0, 0, time.UTC)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err := db.Pool.Exec(ctx, `
		UPDATE nafath_requests SET
			status     = 'APPROVED',
			full_name  = $2,
			birth_date = $3,
			updated_at = NOW()
		WHERE id = $1 AND status = 'WAITING'`,
		requestID, mockName, mockBirthDate)
	if err != nil {
		log.Printf("Nafath mock: failed to approve %s: %v", requestID, err)
	}
}

// callNafathLive is the production stub for NIC API integration.
// Replace this body with the actual API call when production credentials are available.
func callNafathLive(requestID, nationalID string, randomNumber int) {
	// PRODUCTION STUB:
	//   - POST to NAFATH_API_URL with { national_id, random_number, callback_url }
	//   - Poll for response (NIC API returns the user's name when approved)
	//   - UPDATE nafath_requests with the result
	//
	// For now, we mark these as REJECTED so the team notices it's not implemented.
	log.Printf("Nafath LIVE mode requested but not implemented for request %s", requestID)
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	_, _ = db.Pool.Exec(ctx, `
		UPDATE nafath_requests SET
			status = 'REJECTED',
			updated_at = NOW()
		WHERE id = $1 AND status = 'WAITING'`, requestID)
}

// ─── Helpers ────────────────────────────────────────────────────────────────

func nafathMode() string {
	m := strings.ToLower(os.Getenv("NAFATH_MODE"))
	if m == "live" {
		return "live"
	}
	return "mock"
}

func nafathMockDelay() time.Duration {
	if d := os.Getenv("NAFATH_MOCK_DELAY"); d != "" {
		if dur, err := time.ParseDuration(d); err == nil {
			return dur
		}
	}
	return 3 * time.Second
}

func isValidSaudiID(id string) bool {
	if len(id) != 10 {
		return false
	}
	for _, c := range id {
		if c < '0' || c > '9' {
			return false
		}
	}
	// First digit must be 1 (citizen) or 2 (resident)
	return id[0] == '1' || id[0] == '2'
}

func generateRequestID() string {
	b := make([]byte, 16)
	_, _ = rand.Read(b)
	return hex.EncodeToString(b)
}

func secureRandomInt(max int) (int, error) {
	n, err := rand.Int(rand.Reader, big.NewInt(int64(max)))
	if err != nil {
		return 0, err
	}
	return int(n.Int64()), nil
}

// generateMockName returns a deterministic Arabic name based on the National ID.
// Used only in mock mode for development / testing.
func generateMockName(nid string) string {
	firstNames := []string{"محمد", "أحمد", "عبدالله", "سعد", "خالد", "فهد", "نواف", "سلطان"}
	middleNames := []string{"بن عبدالعزيز", "بن عبدالرحمن", "بن سعود", "بن فيصل", "بن خالد"}
	lastNames := []string{"العتيبي", "الشمري", "الحربي", "القحطاني", "الدوسري", "العنزي"}

	idx1 := int(nid[len(nid)-1]-'0') % len(firstNames)
	idx2 := int(nid[len(nid)-2]-'0') % len(middleNames)
	idx3 := int(nid[len(nid)-3]-'0') % len(lastNames)
	return fmt.Sprintf("%s %s %s", firstNames[idx1], middleNames[idx2], lastNames[idx3])
}
