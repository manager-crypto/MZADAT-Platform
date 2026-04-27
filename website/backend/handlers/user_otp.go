package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/mzadat/backend/auth"
	"github.com/mzadat/backend/db"
	"github.com/jackc/pgx/v5"
)

// ─── OTP: send ──────────────────────────────────────────────────────────────

type otpSendRequest struct {
	Phone   string `json:"phone"`
	Purpose string `json:"purpose"` // phone_verify | password_reset
}

// UserOTPSend handles POST /api/auth/otp/send
// Rate-limited: max 3 OTPs per phone per 10 minutes.
func UserOTPSend(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		jsonError(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req otpSendRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		jsonFieldError(w, http.StatusBadRequest, "", ErrCodeInvalidInput, "invalid JSON")
		return
	}

	phone, err := auth.NormalizePhone(req.Phone)
	if err != nil {
		jsonFieldError(w, http.StatusBadRequest, "phone", ErrCodeInvalidInput, err.Error())
		return
	}

	purpose := req.Purpose
	if purpose == "" {
		purpose = "phone_verify"
	}
	switch purpose {
	case "phone_verify", "password_reset", "login_2fa":
	default:
		jsonFieldError(w, http.StatusBadRequest, "purpose", ErrCodeInvalidInput, "invalid purpose")
		return
	}

	ctx, cancel := context.WithTimeout(r.Context(), 15*time.Second)
	defer cancel()

	// ─── Rate limit: max 3 OTPs per phone per 10 minutes ───────────────────
	var recentCount int
	_ = db.Pool.QueryRow(ctx, `
		SELECT COUNT(*) FROM otp_codes
		WHERE  phone = $1
		  AND  purpose = $2
		  AND  created_at > NOW() - INTERVAL '10 minutes'
	`, phone, purpose).Scan(&recentCount)
	if recentCount >= 3 {
		jsonFieldError(w, http.StatusTooManyRequests, "", ErrCodeRateLimited,
			"too many OTP requests, please wait 10 minutes")
		return
	}

	// Look up userID if one exists for this phone (not required for phone_verify)
	var userID string
	_ = db.Pool.QueryRow(ctx, "SELECT id::text FROM users WHERE phone = $1", phone).Scan(&userID)

	// For password_reset, require that the user exists
	if purpose == "password_reset" && userID == "" {
		// Don't leak whether phone is registered — return success anyway
		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(map[string]any{
			"ok":      true,
			"message": "if a user exists with this phone, an OTP was sent",
		})
		return
	}

	if err := sendOTP(ctx, r, userID, phone, purpose); err != nil {
		jsonError(w, "failed to send OTP: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(map[string]any{
		"ok":         true,
		"phone":      phone,
		"expires_in": 600,
		"message":    "OTP sent",
	})
}

// ─── OTP: verify ────────────────────────────────────────────────────────────

type otpVerifyRequest struct {
	Phone   string `json:"phone"`
	Code    string `json:"code"`
	Purpose string `json:"purpose"`
}

// UserOTPVerify handles POST /api/auth/otp/verify
// For phone_verify: marks the user's phone as verified.
// Returns ok: true when the code is accepted.
func UserOTPVerify(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		jsonError(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req otpVerifyRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		jsonFieldError(w, http.StatusBadRequest, "", ErrCodeInvalidInput, "invalid JSON")
		return
	}

	phone, err := auth.NormalizePhone(req.Phone)
	if err != nil {
		jsonFieldError(w, http.StatusBadRequest, "phone", ErrCodeInvalidInput, err.Error())
		return
	}
	if len(req.Code) != 6 {
		jsonFieldError(w, http.StatusBadRequest, "code", ErrCodeOtpInvalid, "code must be 6 digits")
		return
	}
	purpose := req.Purpose
	if purpose == "" {
		purpose = "phone_verify"
	}

	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()

	// Get the most recent unused, non-expired OTP for this phone + purpose
	var (
		otpID    string
		hash     string
		attempts int
		userID   *string
	)
	err = db.Pool.QueryRow(ctx, `
		SELECT id::text, code_hash, attempts, user_id::text
		FROM   otp_codes
		WHERE  phone = $1
		  AND  purpose = $2
		  AND  used_at IS NULL
		  AND  expires_at > NOW()
		ORDER  BY created_at DESC
		LIMIT  1
	`, phone, purpose).Scan(&otpID, &hash, &attempts, &userID)

	if err != nil {
		if err == pgx.ErrNoRows {
			jsonFieldError(w, http.StatusBadRequest, "code", ErrCodeOtpExpired,
				"no valid OTP found — please request a new one")
			return
		}
		jsonError(w, "database error", http.StatusInternalServerError)
		return
	}

	// Max 5 attempts per OTP
	if attempts >= 5 {
		_, _ = db.Pool.Exec(ctx, "UPDATE otp_codes SET used_at = NOW() WHERE id = $1", otpID)
		jsonFieldError(w, http.StatusTooManyRequests, "code", ErrCodeOtpTooManyAttempts,
			"too many failed attempts — please request a new OTP")
		return
	}

	// Verify
	if err := auth.VerifyOTPCode(hash, req.Code); err != nil {
		// Increment attempts
		_, _ = db.Pool.Exec(ctx,
			"UPDATE otp_codes SET attempts = attempts + 1 WHERE id = $1", otpID)
		jsonFieldError(w, http.StatusBadRequest, "code", ErrCodeOtpInvalid,
			"incorrect code")
		return
	}

	// Mark as used
	_, _ = db.Pool.Exec(ctx, "UPDATE otp_codes SET used_at = NOW() WHERE id = $1", otpID)

	// Execute the action tied to the purpose
	switch purpose {
	case "phone_verify":
		if userID != nil {
			_, _ = db.Pool.Exec(ctx,
				"UPDATE users SET phone_verified = true WHERE id = $1", *userID)
		}
	}

	// For password_reset, return a short-lived token the client uses with /password/reset/confirm
	if purpose == "password_reset" && userID != nil {
		rawToken, tokenHash, err := auth.GenerateResetToken()
		if err != nil {
			jsonError(w, "token generation failed", http.StatusInternalServerError)
			return
		}
		_, err = db.Pool.Exec(ctx, `
			INSERT INTO password_resets (token_hash, user_id, expires_at, ip_address)
			VALUES ($1, $2, NOW() + INTERVAL '30 minutes', NULLIF($3, '')::inet)
		`, tokenHash, *userID, clientIP(r))
		if err != nil {
			jsonError(w, "reset token insert failed", http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(map[string]any{
			"ok":          true,
			"reset_token": rawToken,
			"expires_in":  1800,
		})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(map[string]any{
		"ok":      true,
		"verified": true,
	})
}

// ─── Password reset request ─────────────────────────────────────────────────

type pwdResetRequest struct {
	Email string `json:"email"`
	Phone string `json:"phone"`
}

// UserPasswordResetRequest handles POST /api/auth/password/reset-request
// Sends an OTP via SMS when phone is provided, or an email link when email is provided.
// For this first iteration we rely on phone-OTP flow.
func UserPasswordResetRequest(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		jsonError(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req pwdResetRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		jsonFieldError(w, http.StatusBadRequest, "", ErrCodeInvalidInput, "invalid JSON")
		return
	}

	// We currently support phone-based reset; email-based requires SMTP (out of scope for v1)
	phone, err := auth.NormalizePhone(req.Phone)
	if err != nil {
		jsonFieldError(w, http.StatusBadRequest, "phone", ErrCodeInvalidInput, err.Error())
		return
	}

	ctx, cancel := context.WithTimeout(r.Context(), 15*time.Second)
	defer cancel()

	var userID string
	_ = db.Pool.QueryRow(ctx, "SELECT id::text FROM users WHERE phone = $1", phone).Scan(&userID)

	if userID == "" {
		// Don't leak — always return success
		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(map[string]any{
			"ok": true,
			"message": "if an account exists, an OTP has been sent",
		})
		return
	}

	if err := sendOTP(ctx, r, userID, phone, "password_reset"); err != nil {
		jsonError(w, "failed to send OTP", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(map[string]any{
		"ok":      true,
		"phone":   phone,
		"message": "OTP sent",
	})
}

// ─── Password reset confirm ────────────────────────────────────────────────

type pwdResetConfirmRequest struct {
	ResetToken  string `json:"reset_token"`
	NewPassword string `json:"new_password"`
}

// UserPasswordResetConfirm handles POST /api/auth/password/reset-confirm
// Requires the reset_token returned by /otp/verify (purpose: password_reset).
func UserPasswordResetConfirm(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		jsonError(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req pwdResetConfirmRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		jsonFieldError(w, http.StatusBadRequest, "", ErrCodeInvalidInput, "invalid JSON")
		return
	}

	if req.ResetToken == "" {
		jsonFieldError(w, http.StatusBadRequest, "reset_token", ErrCodeInvalidInput, "reset token required")
		return
	}
	if len(req.NewPassword) < 8 {
		jsonFieldError(w, http.StatusBadRequest, "new_password", ErrCodeInvalidInput,
			"password must be at least 8 characters")
		return
	}

	tokenHash := auth.HashResetToken(req.ResetToken)

	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()

	var userID string
	err := db.Pool.QueryRow(ctx, `
		SELECT user_id::text FROM password_resets
		WHERE  token_hash = $1
		  AND  used_at IS NULL
		  AND  expires_at > NOW()
	`, tokenHash).Scan(&userID)

	if err != nil {
		jsonFieldError(w, http.StatusBadRequest, "reset_token", ErrCodeTokenInvalid,
			"invalid or expired reset token")
		return
	}

	newHash, err := auth.HashPassword(req.NewPassword)
	if err != nil {
		jsonFieldError(w, http.StatusBadRequest, "new_password", ErrCodeInvalidInput, err.Error())
		return
	}

	// Apply change + invalidate all existing sessions + mark token used
	tx, err := db.Pool.Begin(ctx)
	if err != nil {
		jsonError(w, "transaction begin failed", http.StatusInternalServerError)
		return
	}
	defer tx.Rollback(ctx)

	if _, err := tx.Exec(ctx, "UPDATE users SET password_hash = $1, failed_login_count = 0, locked_until = NULL WHERE id = $2",
		newHash, userID); err != nil {
		jsonError(w, "password update failed", http.StatusInternalServerError)
		return
	}
	if _, err := tx.Exec(ctx, "DELETE FROM user_sessions WHERE user_id = $1", userID); err != nil {
		jsonError(w, "session cleanup failed", http.StatusInternalServerError)
		return
	}
	if _, err := tx.Exec(ctx, "UPDATE password_resets SET used_at = NOW() WHERE token_hash = $1", tokenHash); err != nil {
		jsonError(w, "token mark failed", http.StatusInternalServerError)
		return
	}

	if err := tx.Commit(ctx); err != nil {
		jsonError(w, "commit failed", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(map[string]any{
		"ok":      true,
		"message": "password updated — please log in again",
	})
}
