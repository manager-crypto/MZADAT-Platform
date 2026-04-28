package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"math"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/mzadat/backend/db"
)

type auditLogRow struct {
	ID         string          `json:"id"`
	AdminID    *string         `json:"admin_id"`
	AdminEmail *string         `json:"admin_email"`
	Action     string          `json:"action"`
	EntityType string          `json:"entity_type"`
	EntityID   *string         `json:"entity_id"`
	Details    json.RawMessage `json:"details"`
	IPAddress  *string         `json:"ip_address"`
	CreatedAt  string          `json:"created_at"`
}

// AdminGetAuditLog handles GET /api/admin/audit-log
// Query: page, pageSize, action, entityType, adminId
func AdminGetAuditLog(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		jsonError(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	if _, _, ok := verifyAdminToken(r); !ok {
		jsonError(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	q := r.URL.Query()
	page, _ := strconv.Atoi(q.Get("page"))
	if page < 1 {
		page = 1
	}
	pageSize, _ := strconv.Atoi(q.Get("pageSize"))
	if pageSize < 1 || pageSize > 200 {
		pageSize = 50
	}
	offset := (page - 1) * pageSize

	// Dynamic WHERE clause with parameterized values
	conditions := []string{"1=1"}
	args := []any{}
	argIdx := 1

	if action := strings.TrimSpace(q.Get("action")); action != "" && len(action) <= 100 {
		conditions = append(conditions, fmt.Sprintf("action = $%d", argIdx))
		args = append(args, action)
		argIdx++
	}
	if et := strings.TrimSpace(q.Get("entityType")); et != "" && len(et) <= 50 {
		conditions = append(conditions, fmt.Sprintf("entity_type = $%d", argIdx))
		args = append(args, et)
		argIdx++
	}
	if aid := strings.TrimSpace(q.Get("adminId")); aid != "" {
		conditions = append(conditions, fmt.Sprintf("admin_id::text = $%d", argIdx))
		args = append(args, aid)
		argIdx++
	}

	where := strings.Join(conditions, " AND ")

	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()

	// Count total
	var total int
	countSQL := fmt.Sprintf("SELECT COUNT(*) FROM audit_log WHERE %s", where)
	if err := db.Pool.QueryRow(ctx, countSQL, args...).Scan(&total); err != nil {
		jsonError(w, "database error", http.StatusInternalServerError)
		return
	}

	// Fetch page
	dataSQL := fmt.Sprintf(`
		SELECT
			id::text,
			admin_id::text,
			admin_email,
			action,
			entity_type,
			entity_id,
			details,
			host(ip_address),
			TO_CHAR(created_at AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"')
		FROM audit_log
		WHERE %s
		ORDER BY created_at DESC
		LIMIT $%d OFFSET $%d
	`, where, argIdx, argIdx+1)

	// Avoid slice aliasing
	dataArgs := make([]any, 0, len(args)+2)
	dataArgs = append(dataArgs, args...)
	dataArgs = append(dataArgs, pageSize, offset)

	rows, err := db.Pool.Query(ctx, dataSQL, dataArgs...)
	if err != nil {
		jsonError(w, "database error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	entries := []auditLogRow{}
	for rows.Next() {
		var e auditLogRow
		if err := rows.Scan(
			&e.ID, &e.AdminID, &e.AdminEmail, &e.Action, &e.EntityType,
			&e.EntityID, &e.Details, &e.IPAddress, &e.CreatedAt,
		); err == nil {
			if len(e.Details) == 0 {
				e.Details = json.RawMessage("{}")
			}
			entries = append(entries, e)
		}
	}

	totalPages := 0
	if pageSize > 0 {
		totalPages = int(math.Ceil(float64(total) / float64(pageSize)))
	}

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(map[string]any{
		"data":        entries,
		"total":       total,
		"page":        page,
		"page_size":   pageSize,
		"total_pages": totalPages,
	})
}
