// Package audit provides a simple interface for recording admin actions
// into the audit_log table. Calls are fire-and-forget (non-blocking) so
// that a slow audit write never slows down the user-facing response.
package audit

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/mzadat/backend/db"
)

// Action constants — keep these UPPER_SNAKE_CASE and documented.
const (
	ActionLogin            = "ADMIN_LOGIN"
	ActionLogout           = "ADMIN_LOGOUT"
	ActionAuctionApprove   = "AUCTION_APPROVE"
	ActionAuctionReject    = "AUCTION_REJECT"
	ActionAuctionDelete    = "AUCTION_DELETE"
	ActionSectionToggle    = "SECTION_TOGGLE_VISIBILITY"
	ActionSectionReorder   = "SECTION_REORDER"
	ActionUserToggleActive = "USER_TOGGLE_ACTIVE"
)

// Entity types
const (
	EntityProperty = "property"
	EntitySection  = "section"
	EntityUser     = "user"
	EntitySession  = "session"
)

// Record inserts a single audit entry asynchronously.
// Returns immediately; errors are logged but not returned.
func Record(r *http.Request, adminID, adminEmail, action, entityType, entityID string, details map[string]any) {
	go func() {
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		detailsJSON, err := json.Marshal(details)
		if err != nil {
			log.Printf("audit: marshal failed: %v", err)
			detailsJSON = []byte("{}")
		}

		ip := clientIP(r)
		userAgent := r.UserAgent()
		if len(userAgent) > 500 {
			userAgent = userAgent[:500]
		}

		// Normalize empty strings to NULL for cleaner data
		var adminIDArg, adminEmailArg, entityIDArg, ipArg any
		if adminID != "" {
			adminIDArg = adminID
		}
		if adminEmail != "" {
			adminEmailArg = adminEmail
		}
		if entityID != "" {
			entityIDArg = entityID
		}
		if ip != "" {
			ipArg = ip
		}

		_, err = db.Pool.Exec(ctx, `
			INSERT INTO audit_log (
				admin_id, admin_email, action, entity_type, entity_id,
				details, ip_address, user_agent
			) VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7, $8)
		`, adminIDArg, adminEmailArg, action, entityType, entityIDArg, string(detailsJSON), ipArg, userAgent)

		if err != nil {
			log.Printf("audit: insert failed [action=%s entity=%s]: %v", action, entityType, err)
		}
	}()
}

// clientIP extracts the client IP, respecting X-Forwarded-For when set by a proxy.
func clientIP(r *http.Request) string {
	if xff := r.Header.Get("X-Forwarded-For"); xff != "" {
		// X-Forwarded-For may contain a comma-separated list; take the first
		parts := strings.Split(xff, ",")
		if len(parts) > 0 {
			return strings.TrimSpace(parts[0])
		}
	}
	if xr := r.Header.Get("X-Real-IP"); xr != "" {
		return xr
	}
	// RemoteAddr includes port — strip it
	host := r.RemoteAddr
	if idx := strings.LastIndex(host, ":"); idx > 0 {
		host = host[:idx]
	}
	// Remove IPv6 brackets
	host = strings.Trim(host, "[]")
	return host
}
