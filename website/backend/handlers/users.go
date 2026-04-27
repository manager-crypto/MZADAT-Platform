package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/mzadat/backend/audit"
	"github.com/mzadat/backend/db"
)

type adminUserRow struct {
	ID        string  `json:"id"`
	Email     string  `json:"email"`
	FullName  string  `json:"full_name"`
	Role      string  `json:"role"`
	IsActive  bool    `json:"is_active"`
	LastLogin *string `json:"last_login"`
	CreatedAt string  `json:"created_at"`
}

// AdminGetUsers handles GET /api/admin/users
func AdminGetUsers(w http.ResponseWriter, r *http.Request) {
	adminID, adminEmail, ok := getAdminContext(r)
	if !ok {
		jsonError(w, "unauthorized", http.StatusUnauthorized)
		return
	}
	if r.Method != http.MethodGet {
		jsonError(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()

	rows, err := db.Pool.Query(ctx, `
		SELECT
			id::text,
			email,
			COALESCE(full_name, ''),
			role,
			is_active,
			TO_CHAR(last_login AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
			TO_CHAR(created_at AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"')
		FROM   admin_users
		ORDER  BY created_at DESC
		LIMIT  200
	`)
	if err != nil {
		jsonError(w, "database error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	users := []adminUserRow{}
	for rows.Next() {
		var u adminUserRow
		var lastLogin *string
		if err := rows.Scan(
			&u.ID, &u.Email, &u.FullName, &u.Role, &u.IsActive,
			&lastLogin, &u.CreatedAt,
		); err == nil {
			u.LastLogin = lastLogin
			users = append(users, u)
		}
	}

	_ = adminID    // reserved for future per-user filtering
	_ = adminEmail // reserved for future audit context

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(map[string]any{
		"data":  users,
		"total": len(users),
	})
}

// AdminToggleUserActive handles PATCH /api/admin/users/{id}/toggle-active
// SUPER_ADMIN only — regular admins can't disable other admins.
func AdminToggleUserActive(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPatch {
		jsonError(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	adminID, adminEmail, role, ok := verifyAdminTokenFull(r)
	if !ok {
		jsonError(w, "unauthorized", http.StatusUnauthorized)
		return
	}
	if role != "SUPER_ADMIN" {
		jsonError(w, "SUPER_ADMIN role required", http.StatusForbidden)
		return
	}

	id := r.PathValue("id")
	if id == "" {
		jsonError(w, "missing id", http.StatusBadRequest)
		return
	}

	// Don't allow an admin to disable themselves (avoid lockout)
	if id == adminID {
		jsonError(w, "cannot toggle your own account", http.StatusBadRequest)
		return
	}

	ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
	defer cancel()

	var newActive bool
	err := db.Pool.QueryRow(ctx, `
		UPDATE admin_users
		SET    is_active = NOT is_active, updated_at = NOW()
		WHERE  id = $1
		RETURNING is_active
	`, id).Scan(&newActive)
	if err != nil {
		jsonError(w, "user not found", http.StatusNotFound)
		return
	}

	// If we just deactivated someone, kill all their active sessions
	if !newActive {
		go func() {
			ctx2, cancel2 := context.WithTimeout(context.Background(), 5*time.Second)
			defer cancel2()
			_, _ = db.Pool.Exec(ctx2, "DELETE FROM admin_sessions WHERE admin_id = $1", id)
		}()
	}

	// Audit
	audit.Record(r, adminID, adminEmail, audit.ActionUserToggleActive,
		audit.EntityUser, id,
		map[string]any{"new_active": newActive})

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(map[string]any{
		"ok":        true,
		"id":        id,
		"is_active": newActive,
	})
}
