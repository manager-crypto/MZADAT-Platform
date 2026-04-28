package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	"strings"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/mzadat/backend/auth"
	"github.com/mzadat/backend/db"
	"github.com/mzadat/backend/sms"
)

// ─── Error codes ─────────────────────────────────────────────────────────────
// Frontend uses these for field-level error messages.

const (
	ErrCodeInvalidInput       = "INVALID_INPUT"
	ErrCodeEmailTaken         = "EMAIL_TAKEN"
	ErrCodePhoneTaken         = "PHONE_TAKEN"
	ErrCodeInvalidCredentials = "INVALID_CREDENTIALS"
	ErrCodeAccountLocked      = "ACCOUNT_LOCKED"
	ErrCodeAccountInactive    = "ACCOUNT_INACTIVE"
	ErrCodePhoneNotVerified   = "PHONE_NOT_VERIFIED"
	ErrCodeOtpInvalid         = "OTP_INVALID"
	ErrCodeOtpExpired         = "OTP_EXPIRED"
	ErrCodeOtpTooManyAttempts = "OTP_TOO_MANY_ATTEMPTS"
	ErrCodeRateLimited        = "RATE_LIMITED"
	ErrCodeTokenInvalid       = "TOKEN_INVALID"
)

// jsonFieldError sends a structured error with field + code.
// Frontend can then highlight the specific field that failed.
func jsonFieldError(w http.ResponseWriter, status int, field, code, message string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(map[string]any{
		"error": message,
		"field": field,
		"code":  code,
	})
}

// ─── Register ───────────────────────────────────────────────────────────────

type registerRequest struct {
	Email       string `json:"email"`
	Phone       string `json:"phone"`
	Password    string `json:"password"`
	FullName    string `json:"full_name"`
	IDNumber    string `json:"id_number"`
	Nationality string `json:"nationality"`
	City        string `json:"residence_city"`
	AccountType string `json:"account_type"`
}

// UserRegister handles POST /api/auth/register
func UserRegister(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		jsonError(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req registerRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		jsonFieldError(w, http.StatusBadRequest, "", ErrCodeInvalidInput, "invalid JSON body")
		return
	}

	// ─── Validate & normalize each field ────────────────────────────────────
	email, err := auth.NormalizeEmail(req.Email)
	if err != nil {
		jsonFieldError(w, http.StatusBadRequest, "email", ErrCodeInvalidInput, err.Error())
		return
	}

	phone, err := auth.NormalizePhone(req.Phone)
	if err != nil {
		jsonFieldError(w, http.StatusBadRequest, "phone", ErrCodeInvalidInput, err.Error())
		return
	}

	fullName := strings.TrimSpace(req.FullName)
	if len(fullName) < 2 || len(fullName) > 200 {
		jsonFieldError(w, http.StatusBadRequest, "full_name", ErrCodeInvalidInput,
			"full name must be 2-200 characters")
		return
	}

	if len(req.Password) < 8 {
		jsonFieldError(w, http.StatusBadRequest, "password", ErrCodeInvalidInput,
			"password must be at least 8 characters")
		return
	}

	idNumber, err := auth.NormalizeSaudiID(req.IDNumber)
	if err != nil {
		jsonFieldError(w, http.StatusBadRequest, "id_number", ErrCodeInvalidInput, err.Error())
		return
	}

	accountType := strings.ToLower(strings.TrimSpace(req.AccountType))
	if accountType == "" {
		accountType = "individual"
	}
	switch accountType {
	case "individual", "broker", "company":
	default:
		jsonFieldError(w, http.StatusBadRequest, "account_type", ErrCodeInvalidInput,
			"account_type must be individual/broker/company")
		return
	}

	// ─── Hash password ─────────────────────────────────────────────────────
	passwordHash, err := auth.HashPassword(req.Password)
	if err != nil {
		jsonError(w, "password hashing failed", http.StatusInternalServerError)
		return
	}

	// ─── Insert into DB (catches uniqueness violations) ────────────────────
	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()

	var userID string
	role := roleFromAccountType(accountType)

	err = db.Pool.QueryRow(ctx, `
		INSERT INTO users (
			email, phone, password_hash, full_name, id_number,
			nationality, residence_city, account_type, role
		) VALUES ($1, $2, $3, $4, NULLIF($5, ''), NULLIF($6, ''), NULLIF($7, ''), $8, $9)
		RETURNING id::text
	`, email, phone, passwordHash, fullName, idNumber,
		strings.TrimSpace(req.Nationality), strings.TrimSpace(req.City),
		accountType, role).Scan(&userID)

	if err != nil {
		// Distinguish constraint violations for better field errors
		msg := err.Error()
		switch {
		case strings.Contains(msg, "users_email_key"):
			jsonFieldError(w, http.StatusConflict, "email", ErrCodeEmailTaken,
				"this email is already registered")
		case strings.Contains(msg, "users_phone_key"):
			jsonFieldError(w, http.StatusConflict, "phone", ErrCodePhoneTaken,
				"this phone number is already registered")
		default:
			jsonError(w, "database error: "+msg, http.StatusInternalServerError)
		}
		return
	}

	// ─── Send phone verification OTP ───────────────────────────────────────
	if err := sendOTP(ctx, r, userID, phone, "phone_verify"); err != nil {
		// Registration succeeded; OTP failure is non-fatal (user can resend)
		// Log but return success
		_ = err
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	_ = json.NewEncoder(w).Encode(map[string]any{
		"ok":      true,
		"user_id": userID,
		"next":    "verify_phone",
		"phone":   phone,
		"message": "registration successful; verify phone via OTP",
	})
}

func roleFromAccountType(t string) string {
	switch t {
	case "broker":
		return "BROKER"
	case "company":
		return "COMPANY"
	default:
		return "USER"
	}
}

// ─── Login ──────────────────────────────────────────────────────────────────

type loginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type loginResponse struct {
	Token         string `json:"token"`
	UserID        string `json:"user_id"`
	Email         string `json:"email"`
	FullName      string `json:"full_name"`
	Role          string `json:"role"`
	PhoneVerified bool   `json:"phone_verified"`
	ExpiresAt     string `json:"expires_at"`
}

// UserLogin handles POST /api/auth/login
func UserLogin(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		jsonError(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req loginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		jsonFieldError(w, http.StatusBadRequest, "", ErrCodeInvalidInput, "invalid JSON body")
		return
	}

	email, err := auth.NormalizeEmail(req.Email)
	if err != nil {
		jsonFieldError(w, http.StatusBadRequest, "email", ErrCodeInvalidInput, err.Error())
		return
	}
	if req.Password == "" {
		jsonFieldError(w, http.StatusBadRequest, "password", ErrCodeInvalidInput, "password required")
		return
	}

	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()

	ip := clientIP(r)

	// ─── Rate limit: 5 failed attempts per IP per 5 minutes ────────────────
	if rateLimited, _ := isRateLimited(ctx, ip); rateLimited {
		_ = recordLoginAttempt(ctx, email, "", ip, false)
		jsonFieldError(w, http.StatusTooManyRequests, "", ErrCodeRateLimited,
			"too many login attempts, please wait 5 minutes")
		return
	}

	// ─── Lookup user ───────────────────────────────────────────────────────
	var (
		userID, hash, fullName, role string
		phoneVerified, isActive      bool
		lockedUntil                  *time.Time
	)
	err = db.Pool.QueryRow(ctx, `
		SELECT id::text, password_hash, full_name, role, phone_verified, is_active, locked_until
		FROM   users
		WHERE  email = $1
	`, email).Scan(&userID, &hash, &fullName, &role, &phoneVerified, &isActive, &lockedUntil)

	if err != nil {
		if err == pgx.ErrNoRows {
			_ = recordLoginAttempt(ctx, email, "", ip, false)
			// Generic error to prevent email enumeration
			jsonFieldError(w, http.StatusUnauthorized, "", ErrCodeInvalidCredentials,
				"invalid email or password")
			return
		}
		jsonError(w, "database error", http.StatusInternalServerError)
		return
	}

	// ─── Check lifecycle ───────────────────────────────────────────────────
	if !isActive {
		jsonFieldError(w, http.StatusForbidden, "", ErrCodeAccountInactive,
			"this account has been deactivated")
		return
	}
	if lockedUntil != nil && lockedUntil.After(time.Now()) {
		jsonFieldError(w, http.StatusForbidden, "", ErrCodeAccountLocked,
			"account locked due to repeated failures; try again later")
		return
	}

	// ─── Verify password ───────────────────────────────────────────────────
	if err := auth.VerifyPassword(hash, req.Password); err != nil {
		_ = recordLoginAttempt(ctx, email, "", ip, false)
		// Increment failed_login_count; lock if threshold hit
		_, _ = db.Pool.Exec(ctx, `
			UPDATE users
			SET    failed_login_count = failed_login_count + 1,
			       locked_until = CASE
			           WHEN failed_login_count + 1 >= 10 THEN NOW() + INTERVAL '30 minutes'
			           ELSE locked_until
			       END
			WHERE  id = $1
		`, userID)
		jsonFieldError(w, http.StatusUnauthorized, "", ErrCodeInvalidCredentials,
			"invalid email or password")
		return
	}

	// ─── Create session ────────────────────────────────────────────────────
	token, err := auth.GenerateSessionToken()
	if err != nil {
		jsonError(w, "token generation failed", http.StatusInternalServerError)
		return
	}
	expiresAt := time.Now().Add(30 * 24 * time.Hour) // 30-day sessions

	_, err = db.Pool.Exec(ctx, `
		INSERT INTO user_sessions (token, user_id, expires_at, ip_address, user_agent)
		VALUES ($1, $2, $3, $4, $5)
	`, token, userID, expiresAt, ip, r.UserAgent())
	if err != nil {
		jsonError(w, "session creation failed", http.StatusInternalServerError)
		return
	}

	// Reset failed_login_count + update last_login (fire-and-forget)
	go func() {
		ctx2, cancel2 := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel2()
		_, _ = db.Pool.Exec(ctx2, `
			UPDATE users
			SET    failed_login_count = 0, locked_until = NULL, last_login = NOW()
			WHERE  id = $1
		`, userID)
	}()

	_ = recordLoginAttempt(ctx, email, "", ip, true)

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(loginResponse{
		Token:         token,
		UserID:        userID,
		Email:         email,
		FullName:      fullName,
		Role:          role,
		PhoneVerified: phoneVerified,
		ExpiresAt:     expiresAt.UTC().Format(time.RFC3339),
	})
}

// ─── Logout ─────────────────────────────────────────────────────────────────

func UserLogout(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		jsonError(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	token := extractBearerToken(r)
	if token == "" {
		// Idempotent: logout always succeeds
		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(map[string]any{"ok": true})
		return
	}

	ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
	defer cancel()
	_, _ = db.Pool.Exec(ctx, "DELETE FROM user_sessions WHERE token = $1", token)

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(map[string]any{"ok": true})
}

// ─── Me (current user info) ─────────────────────────────────────────────────

func UserMe(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		jsonError(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	userID, ok := verifyUserToken(r)
	if !ok {
		jsonFieldError(w, http.StatusUnauthorized, "", ErrCodeTokenInvalid, "invalid or expired token")
		return
	}

	ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
	defer cancel()

	var (
		email, fullName, role, accountType string
		phone                              string
		phoneVerified, emailVerified       bool
		kycStatus                          string
	)
	err := db.Pool.QueryRow(ctx, `
		SELECT email, phone, full_name, role, account_type,
		       phone_verified, email_verified, kyc_status
		FROM   users
		WHERE  id = $1
	`, userID).Scan(&email, &phone, &fullName, &role, &accountType,
		&phoneVerified, &emailVerified, &kycStatus)
	if err != nil {
		jsonError(w, "user not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(map[string]any{
		"id":             userID,
		"email":          email,
		"phone":          phone,
		"full_name":      fullName,
		"role":           role,
		"account_type":   accountType,
		"phone_verified": phoneVerified,
		"email_verified": emailVerified,
		"kyc_status":     kycStatus,
	})
}

// ─── Middleware helpers ─────────────────────────────────────────────────────

func extractBearerToken(r *http.Request) string {
	auth := r.Header.Get("Authorization")
	if !strings.HasPrefix(auth, "Bearer ") {
		return ""
	}
	return strings.TrimPrefix(auth, "Bearer ")
}

// verifyUserToken returns (userID, ok).
func verifyUserToken(r *http.Request) (string, bool) {
	token := extractBearerToken(r)
	if len(token) != 64 {
		return "", false
	}

	ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
	defer cancel()

	var userID string
	err := db.Pool.QueryRow(ctx, `
		SELECT s.user_id::text
		FROM   user_sessions s
		JOIN   users u ON u.id = s.user_id
		WHERE  s.token = $1
		  AND  s.expires_at > NOW()
		  AND  u.is_active = true
	`, token).Scan(&userID)

	if err != nil {
		return "", false
	}

	// Touch last_used_at (fire-and-forget)
	go func() {
		ctx2, cancel2 := context.WithTimeout(context.Background(), 2*time.Second)
		defer cancel2()
		_, _ = db.Pool.Exec(ctx2,
			"UPDATE user_sessions SET last_used_at = NOW() WHERE token = $1", token)
	}()

	return userID, true
}

// ─── Rate limiting ──────────────────────────────────────────────────────────

// isRateLimited returns true if more than 5 failed login attempts from this IP
// in the last 5 minutes.
func isRateLimited(ctx context.Context, ip string) (bool, error) {
	if ip == "" {
		return false, nil
	}
	var count int
	err := db.Pool.QueryRow(ctx, `
		SELECT COUNT(*)
		FROM   login_attempts
		WHERE  ip_address = $1::inet
		  AND  success = false
		  AND  created_at > NOW() - INTERVAL '5 minutes'
	`, ip).Scan(&count)
	if err != nil {
		return false, err
	}
	return count >= 5, nil
}

func recordLoginAttempt(ctx context.Context, email, phone, ip string, success bool) error {
	if ip == "" {
		return nil
	}
	_, err := db.Pool.Exec(ctx, `
		INSERT INTO login_attempts (email, phone, ip_address, success)
		VALUES (NULLIF($1, ''), NULLIF($2, ''), $3::inet, $4)
	`, email, phone, ip, success)
	return err
}

// ─── clientIP helper (from request) ─────────────────────────────────────────

// Uses the same logic as audit package, duplicated here to avoid import cycle.
func clientIP(r *http.Request) string {
	if xff := r.Header.Get("X-Forwarded-For"); xff != "" {
		parts := strings.Split(xff, ",")
		if len(parts) > 0 {
			return strings.TrimSpace(parts[0])
		}
	}
	if xr := r.Header.Get("X-Real-IP"); xr != "" {
		return xr
	}
	host := r.RemoteAddr
	if idx := strings.LastIndex(host, ":"); idx > 0 {
		host = host[:idx]
	}
	return strings.Trim(host, "[]")
}

// ─── Module-level SMS provider (lazy init) ──────────────────────────────────

var smsProvider sms.Provider

func getSMSProvider() sms.Provider {
	if smsProvider == nil {
		smsProvider = sms.New()
	}
	return smsProvider
}

// sendOTP generates, hashes, stores, and sends an OTP to the given phone.
// Used both during registration (phone_verify) and password reset flows.
func sendOTP(ctx context.Context, r *http.Request, userID, phone, purpose string) error {
	code, hash, err := auth.GenerateOTPCode()
	if err != nil {
		return err
	}

	// Invalidate any previous unused OTPs for this phone+purpose
	_, _ = db.Pool.Exec(ctx, `
		UPDATE otp_codes SET used_at = NOW()
		WHERE  phone = $1 AND purpose = $2 AND used_at IS NULL
	`, phone, purpose)

	var userIDArg any
	if userID != "" {
		userIDArg = userID
	}
	ip := clientIP(r)
	var ipArg any
	if ip != "" {
		ipArg = ip
	}

	_, err = db.Pool.Exec(ctx, `
		INSERT INTO otp_codes (purpose, user_id, phone, code_hash, expires_at, ip_address)
		VALUES ($1, $2, $3, $4, NOW() + INTERVAL '10 minutes', $5)
	`, purpose, userIDArg, phone, hash, ipArg)
	if err != nil {
		return err
	}

	// Send via SMS (or log in dev)
	smsCtx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()
	message := "MZADAT: رمز التحقق " + code + " • صالح لـ 10 دقائق"
	return getSMSProvider().Send(smsCtx, phone, message)
}
