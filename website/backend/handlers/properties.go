package handlers

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"math"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/mzadat/backend/db"
	"github.com/mzadat/backend/models"
)

// GetProperties handles GET /api/properties
// Query params: page, pageSize, type, status, city, featured, minPrice, maxPrice
func GetProperties(w http.ResponseWriter, r *http.Request) {
	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()

	q := r.URL.Query()

	page, _ := strconv.Atoi(q.Get("page"))
	if page < 1 {
		page = 1
	}
	pageSize, _ := strconv.Atoi(q.Get("pageSize"))
	if pageSize < 1 || pageSize > 100 {
		pageSize = 20
	}
	offset := (page - 1) * pageSize

	// Build dynamic WHERE clause safely (placeholders for all values)
	conditions := []string{"1=1"}
	args := []any{}
	argIdx := 1

	// Whitelist allowed type values to avoid garbage in queries
	allowedTypes := map[string]bool{
		"residential": true, "commercial": true, "land": true, "farm": true,
	}
	allowedStatuses := map[string]bool{
		"active": true, "sold": true, "auction": true, "pending": true,
	}

	if t := q.Get("type"); t != "" && allowedTypes[t] {
		conditions = append(conditions, fmt.Sprintf("type = $%d", argIdx))
		args = append(args, t)
		argIdx++
	}
	if s := q.Get("status"); s != "" && allowedStatuses[s] {
		conditions = append(conditions, fmt.Sprintf("status = $%d", argIdx))
		args = append(args, s)
		argIdx++
	}
	if c := q.Get("city"); c != "" {
		conditions = append(conditions, fmt.Sprintf("city_code = $%d", argIdx))
		args = append(args, c)
		argIdx++
	}
	if f := q.Get("featured"); f == "true" {
		conditions = append(conditions, "is_featured = TRUE")
	}
	if minP := q.Get("minPrice"); minP != "" {
		if v, err := strconv.ParseFloat(minP, 64); err == nil && v >= 0 {
			conditions = append(conditions, fmt.Sprintf("price_total >= $%d", argIdx))
			args = append(args, v)
			argIdx++
		}
	}
	if maxP := q.Get("maxPrice"); maxP != "" {
		if v, err := strconv.ParseFloat(maxP, 64); err == nil && v >= 0 {
			conditions = append(conditions, fmt.Sprintf("price_total <= $%d", argIdx))
			args = append(args, v)
			argIdx++
		}
	}

	where := strings.Join(conditions, " AND ")

	// ─── Count total ────────────────────────────────────────────────────────
	countSQL := fmt.Sprintf("SELECT COUNT(*) FROM properties WHERE %s", where)
	var total int
	if err := db.Pool.QueryRow(ctx, countSQL, args...).Scan(&total); err != nil {
		jsonError(w, "database error", http.StatusInternalServerError)
		return
	}

	// ─── Fetch rows ─────────────────────────────────────────────────────────
	dataSQL := fmt.Sprintf(`
		SELECT
			id, created_at, updated_at,
			COALESCE(deed_number,''), COALESCE(plan_number,''), COALESCE(block_number,''),
			title_ar, title_en,
			COALESCE(description_ar,''), COALESCE(description_en,''),
			city_code, city_ar, city_en,
			COALESCE(district_ar,''), COALESCE(district_en,''),
			COALESCE(latitude,0), COALESCE(longitude,0),
			type, status,
			COALESCE(area_sqm,0), COALESCE(bedrooms,0), COALESCE(bathrooms,0),
			COALESCE(floor_number,0), COALESCE(total_floors,0),
			COALESCE(price_total,0), COALESCE(price_per_sqm,0),
			auction_start, auction_end, starting_bid, current_bid, bid_increment,
			image_urls, COALESCE(video_url,''),
			owner_id, is_featured, view_count
		FROM properties
		WHERE %s
		ORDER BY is_featured DESC, created_at DESC
		LIMIT $%d OFFSET $%d
	`, where, argIdx, argIdx+1)

	// FIX: Build dataArgs as a fresh slice to avoid aliasing the original args
	// (`append` may reuse the underlying array if capacity allows, mutating args).
	dataArgs := make([]any, 0, len(args)+2)
	dataArgs = append(dataArgs, args...)
	dataArgs = append(dataArgs, pageSize, offset)

	rows, err := db.Pool.Query(ctx, dataSQL, dataArgs...)
	if err != nil {
		jsonError(w, "database error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	properties := []models.Property{}
	for rows.Next() {
		var p models.Property
		var imageURLsJSON []byte
		err := rows.Scan(
			&p.ID, &p.CreatedAt, &p.UpdatedAt,
			&p.DeedNumber, &p.PlanNumber, &p.BlockNumber,
			&p.TitleAr, &p.TitleEn,
			&p.DescriptionAr, &p.DescriptionEn,
			&p.CityCode, &p.CityAr, &p.CityEn,
			&p.DistrictAr, &p.DistrictEn,
			&p.Latitude, &p.Longitude,
			&p.Type, &p.Status,
			&p.AreaSqm, &p.Bedrooms, &p.Bathrooms,
			&p.FloorNumber, &p.TotalFloors,
			&p.PriceTotal, &p.PricePerSqm,
			&p.AuctionStart, &p.AuctionEnd, &p.StartingBid, &p.CurrentBid, &p.BidIncrement,
			&imageURLsJSON, &p.VideoURL,
			&p.OwnerID, &p.IsFeatured, &p.ViewCount,
		)
		if err != nil {
			continue
		}
		_ = json.Unmarshal(imageURLsJSON, &p.ImageURLs)
		if p.ImageURLs == nil {
			p.ImageURLs = []string{}
		}
		properties = append(properties, p)
	}

	totalPages := 0
	if pageSize > 0 {
		totalPages = int(math.Ceil(float64(total) / float64(pageSize)))
	}

	resp := models.PropertyListResponse{
		Data:       properties,
		Total:      total,
		Page:       page,
		PageSize:   pageSize,
		TotalPages: totalPages,
	}

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(resp)
}

// GetPropertyByID handles GET /api/properties/{id}
func GetPropertyByID(w http.ResponseWriter, r *http.Request) {
	ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
	defer cancel()

	idStr := r.PathValue("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil || id <= 0 {
		jsonError(w, "invalid id", http.StatusBadRequest)
		return
	}

	var p models.Property
	var imageURLsJSON []byte

	err = db.Pool.QueryRow(ctx, `
		SELECT
			id, created_at, updated_at,
			COALESCE(deed_number,''), COALESCE(plan_number,''), COALESCE(block_number,''),
			title_ar, title_en,
			COALESCE(description_ar,''), COALESCE(description_en,''),
			city_code, city_ar, city_en,
			COALESCE(district_ar,''), COALESCE(district_en,''),
			COALESCE(latitude,0), COALESCE(longitude,0),
			type, status,
			COALESCE(area_sqm,0), COALESCE(bedrooms,0), COALESCE(bathrooms,0),
			COALESCE(floor_number,0), COALESCE(total_floors,0),
			COALESCE(price_total,0), COALESCE(price_per_sqm,0),
			auction_start, auction_end, starting_bid, current_bid, bid_increment,
			image_urls, COALESCE(video_url,''),
			owner_id, is_featured, view_count
		FROM properties WHERE id = $1
	`, id).Scan(
		&p.ID, &p.CreatedAt, &p.UpdatedAt,
		&p.DeedNumber, &p.PlanNumber, &p.BlockNumber,
		&p.TitleAr, &p.TitleEn,
		&p.DescriptionAr, &p.DescriptionEn,
		&p.CityCode, &p.CityAr, &p.CityEn,
		&p.DistrictAr, &p.DistrictEn,
		&p.Latitude, &p.Longitude,
		&p.Type, &p.Status,
		&p.AreaSqm, &p.Bedrooms, &p.Bathrooms,
		&p.FloorNumber, &p.TotalFloors,
		&p.PriceTotal, &p.PricePerSqm,
		&p.AuctionStart, &p.AuctionEnd, &p.StartingBid, &p.CurrentBid, &p.BidIncrement,
		&imageURLsJSON, &p.VideoURL,
		&p.OwnerID, &p.IsFeatured, &p.ViewCount,
	)
	if err != nil {
		// Distinguish NotFound from real DB errors
		if errors.Is(err, pgx.ErrNoRows) {
			jsonError(w, "property not found", http.StatusNotFound)
			return
		}
		jsonError(w, "database error", http.StatusInternalServerError)
		return
	}

	_ = json.Unmarshal(imageURLsJSON, &p.ImageURLs)
	if p.ImageURLs == nil {
		p.ImageURLs = []string{}
	}

	// Increment view count (fire-and-forget, with timeout)
	go func() {
		ctx2, cancel2 := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel2()
		_, _ = db.Pool.Exec(ctx2,
			"UPDATE properties SET view_count = view_count + 1 WHERE id = $1", id)
	}()

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(p)
}

// jsonError writes a JSON error response with the given status code.
func jsonError(w http.ResponseWriter, msg string, code int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	_ = json.NewEncoder(w).Encode(map[string]string{"error": msg})
}
