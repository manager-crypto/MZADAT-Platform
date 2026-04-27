package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/mzadat/backend/audit"
	"github.com/mzadat/backend/db"
)

type sectionRow struct {
	ID        string  `json:"id"`
	NameAr    string  `json:"name_ar"`
	NameEn    string  `json:"name_en"`
	Page      string  `json:"page"`
	Route     *string `json:"route"`
	Icon      *string `json:"icon"`
	SortOrder int     `json:"sort_order"`
	IsVisible bool    `json:"is_visible"`
	UpdatedAt string  `json:"updated_at"`
}

type publicSection struct {
	ID        string  `json:"id"`
	NameAr    string  `json:"name_ar"`
	NameEn    string  `json:"name_en"`
	Page      string  `json:"page"`
	Route     *string `json:"route"`
	Icon      *string `json:"icon"`
	SortOrder int     `json:"sort_order"`
}

// PublicGetSections handles GET /api/sections — no auth, only visible sections
func PublicGetSections(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		jsonError(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	page := r.URL.Query().Get("page")
	if page == "" {
		page = "home"
	}

	ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
	defer cancel()

	rows, err := db.Pool.Query(ctx, `
		SELECT id, name_ar, name_en, page, route, icon, sort_order
		FROM   site_sections
		WHERE  page = $1 AND is_visible = true
		ORDER  BY sort_order ASC
	`, page)
	if err != nil {
		jsonError(w, "database error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	sections := []publicSection{}
	for rows.Next() {
		var s publicSection
		if err := rows.Scan(&s.ID, &s.NameAr, &s.NameEn, &s.Page,
			&s.Route, &s.Icon, &s.SortOrder); err == nil {
			sections = append(sections, s)
		}
	}

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(map[string]any{
		"data":  sections,
		"total": len(sections),
	})
}

// AdminGetSections handles GET /api/admin/sections
func AdminGetSections(w http.ResponseWriter, r *http.Request) {
	if !requireAdmin(w, r, http.MethodGet) {
		return
	}

	page := r.URL.Query().Get("page")
	if page == "" {
		page = "home"
	}

	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()

	rows, err := db.Pool.Query(ctx, `
		SELECT id, name_ar, name_en, page, route, icon, sort_order, is_visible,
		       TO_CHAR(updated_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"')
		FROM   site_sections
		WHERE  page = $1
		ORDER  BY sort_order ASC
	`, page)
	if err != nil {
		jsonError(w, "database error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	sections := []sectionRow{}
	for rows.Next() {
		var s sectionRow
		if err := rows.Scan(
			&s.ID, &s.NameAr, &s.NameEn, &s.Page,
			&s.Route, &s.Icon, &s.SortOrder, &s.IsVisible, &s.UpdatedAt,
		); err == nil {
			sections = append(sections, s)
		}
	}

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(map[string]any{
		"data":  sections,
		"total": len(sections),
	})
}

// AdminToggleSectionVisibility handles PATCH /api/admin/sections/{id}/visibility
func AdminToggleSectionVisibility(w http.ResponseWriter, r *http.Request) {
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

	var newVisible bool
	err := db.Pool.QueryRow(ctx, `
		UPDATE site_sections
		SET    is_visible = NOT is_visible, updated_at = NOW()
		WHERE  id = $1
		RETURNING is_visible
	`, id).Scan(&newVisible)
	if err != nil {
		jsonError(w, "not found or update failed", http.StatusNotFound)
		return
	}

	audit.Record(r, adminID, adminEmail, audit.ActionSectionToggle,
		audit.EntitySection, id,
		map[string]any{"new_visible": newVisible})

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(map[string]any{
		"ok":         true,
		"id":         id,
		"is_visible": newVisible,
	})
}

// AdminReorderSections handles POST /api/admin/sections/reorder
// Body: [{"id":"uuid","sort_order":1}, ...]
func AdminReorderSections(w http.ResponseWriter, r *http.Request) {
	if !requireAdmin(w, r, http.MethodPost) {
		return
	}

	var items []struct {
		ID        string `json:"id"`
		SortOrder int    `json:"sort_order"`
	}
	if err := json.NewDecoder(r.Body).Decode(&items); err != nil || len(items) == 0 {
		jsonError(w, "invalid request body", http.StatusBadRequest)
		return
	}

	// Reasonable cap to prevent abuse
	if len(items) > 500 {
		jsonError(w, "too many items", http.StatusBadRequest)
		return
	}

	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()

	tx, err := db.Pool.Begin(ctx)
	if err != nil {
		jsonError(w, "transaction error", http.StatusInternalServerError)
		return
	}
	defer tx.Rollback(ctx) //nolint:errcheck

	for _, item := range items {
		if item.ID == "" {
			jsonError(w, "invalid item id", http.StatusBadRequest)
			return
		}
		if _, err := tx.Exec(ctx,
			"UPDATE site_sections SET sort_order = $1, updated_at = NOW() WHERE id = $2",
			item.SortOrder, item.ID); err != nil {
			jsonError(w, "update failed", http.StatusInternalServerError)
			return
		}
	}

	if err := tx.Commit(ctx); err != nil {
		jsonError(w, "commit failed", http.StatusInternalServerError)
		return
	}

	adminID, adminEmail, _ := getAdminContext(r)
	audit.Record(r, adminID, adminEmail, audit.ActionSectionReorder,
		audit.EntitySection, "",
		map[string]any{"count": len(items)})

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(map[string]any{
		"ok":      true,
		"updated": len(items),
	})
}
