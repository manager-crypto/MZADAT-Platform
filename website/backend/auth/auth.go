// Package auth provides core authentication utilities for customer accounts:
// password hashing, session token generation, OTP creation/verification,
// and phone number normalization for KSA users.
package auth

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"fmt"
	"regexp"
	"strings"

	"golang.org/x/crypto/bcrypt"
)

// ─── Password hashing ────────────────────────────────────────────────────────

const bcryptCost = 12 // Production-grade cost factor (balance security vs speed)

// HashPassword creates a bcrypt hash of the given password.
func HashPassword(plaintext string) (string, error) {
	if len(plaintext) < 8 {
		return "", errors.New("password must be at least 8 characters")
	}
	hash, err := bcrypt.GenerateFromPassword([]byte(plaintext), bcryptCost)
	if err != nil {
		return "", fmt.Errorf("bcrypt: %w", err)
	}
	return string(hash), nil
}

// VerifyPassword returns nil if the plaintext matches the stored hash.
func VerifyPassword(hash, plaintext string) error {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(plaintext))
}

// ─── Token generation ────────────────────────────────────────────────────────

// GenerateSessionToken returns a cryptographically random 32-byte hex-encoded token.
// Length: 64 chars. Used as primary key in user_sessions.
func GenerateSessionToken() (string, error) {
	b := make([]byte, 32)
	if _, err := rand.Read(b); err != nil {
		return "", fmt.Errorf("rand: %w", err)
	}
	return hex.EncodeToString(b), nil
}

// GenerateResetToken returns a 32-byte URL-safe token for password reset links.
// Returns both the raw token (sent in email) and the hash to store in DB.
func GenerateResetToken() (raw string, hash string, err error) {
	b := make([]byte, 32)
	if _, err := rand.Read(b); err != nil {
		return "", "", fmt.Errorf("rand: %w", err)
	}
	raw = hex.EncodeToString(b)
	sum := sha256.Sum256([]byte(raw))
	hash = hex.EncodeToString(sum[:])
	return raw, hash, nil
}

// HashResetToken produces the same SHA-256 hash used in GenerateResetToken.
// Used to look up a reset token submitted by the user.
func HashResetToken(raw string) string {
	sum := sha256.Sum256([]byte(raw))
	return hex.EncodeToString(sum[:])
}

// ─── OTP (6-digit numeric code) ──────────────────────────────────────────────

// GenerateOTPCode returns a 6-digit numeric code and its bcrypt hash.
// Stored hashed to prevent rainbow-table attacks on breached DB.
func GenerateOTPCode() (code string, hash string, err error) {
	// Generate a number in [0, 1000000) using rand (uniform distribution)
	var n uint32
	b := make([]byte, 4)
	if _, err := rand.Read(b); err != nil {
		return "", "", fmt.Errorf("rand: %w", err)
	}
	n = uint32(b[0])<<24 | uint32(b[1])<<16 | uint32(b[2])<<8 | uint32(b[3])
	code = fmt.Sprintf("%06d", n%1_000_000)
	// Use lower bcrypt cost for OTPs — they're short-lived
	h, err := bcrypt.GenerateFromPassword([]byte(code), 10)
	if err != nil {
		return "", "", fmt.Errorf("bcrypt: %w", err)
	}
	return code, string(h), nil
}

// VerifyOTPCode returns nil if the plaintext code matches the stored hash.
func VerifyOTPCode(hash, plaintext string) error {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(plaintext))
}

// ─── Phone normalization ─────────────────────────────────────────────────────

var ksaDigitsOnly = regexp.MustCompile(`[^0-9]`)

// NormalizePhone converts various KSA phone formats to E.164 (+9665XXXXXXXX).
//
// Accepted input formats (spaces, dashes, parens are stripped):
//
//	+966551234567   -> +966551234567
//	00966551234567  -> +966551234567
//	966551234567    -> +966551234567
//	0551234567      -> +966551234567
//	551234567       -> +966551234567
//
// Returns an error if the final number doesn't match E.164 for KSA (+9665XXXXXXXX).
// For non-KSA numbers, pass them already in E.164 format.
func NormalizePhone(input string) (string, error) {
	trimmed := strings.TrimSpace(input)
	if trimmed == "" {
		return "", errors.New("phone is required")
	}

	// If already E.164 for any country, validate loosely and return
	if strings.HasPrefix(trimmed, "+") && trimmed != "+" {
		digits := ksaDigitsOnly.ReplaceAllString(trimmed[1:], "")
		if len(digits) < 8 || len(digits) > 15 {
			return "", errors.New("invalid international phone number")
		}
		return "+" + digits, nil
	}

	// KSA-specific normalization
	digits := ksaDigitsOnly.ReplaceAllString(trimmed, "")

	// Strip leading zeros / country code variations
	switch {
	case strings.HasPrefix(digits, "00966"):
		digits = digits[5:]
	case strings.HasPrefix(digits, "966"):
		digits = digits[3:]
	case strings.HasPrefix(digits, "0"):
		digits = digits[1:]
	}

	// KSA mobile numbers are exactly 9 digits starting with 5
	if len(digits) != 9 || !strings.HasPrefix(digits, "5") {
		return "", fmt.Errorf("invalid Saudi mobile number (expected 9 digits starting with 5, got %q)", digits)
	}

	return "+966" + digits, nil
}

// ─── Email normalization ─────────────────────────────────────────────────────

var emailRe = regexp.MustCompile(`^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$`)

// NormalizeEmail lower-cases and trims an email address, and validates its format.
func NormalizeEmail(input string) (string, error) {
	email := strings.ToLower(strings.TrimSpace(input))
	if !emailRe.MatchString(email) {
		return "", errors.New("invalid email address")
	}
	return email, nil
}

// ─── Saudi ID validation ─────────────────────────────────────────────────────

var saudiIDRe = regexp.MustCompile(`^[12][0-9]{9}$`)

// NormalizeSaudiID validates a Saudi National ID or Iqama.
// Returns empty string if input is empty (field is optional during initial signup).
// IDs starting with 1 are Saudi nationals; starting with 2 are Iqama holders.
func NormalizeSaudiID(input string) (string, error) {
	id := ksaDigitsOnly.ReplaceAllString(strings.TrimSpace(input), "")
	if id == "" {
		return "", nil
	}
	if !saudiIDRe.MatchString(id) {
		return "", errors.New("invalid Saudi ID or Iqama (must be 10 digits starting with 1 or 2)")
	}
	return id, nil
}
