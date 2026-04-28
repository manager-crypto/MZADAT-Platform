package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/mzadat/backend/db"
)

type financeSummary struct {
	TotalProperties      int     `json:"total_properties"`
	TotalActiveAuctions  int     `json:"total_active_auctions"`
	TotalSold            int     `json:"total_sold"`
	TotalPending         int     `json:"total_pending"`
	TotalCurrentBidsSAR  float64 `json:"total_current_bids_sar"`
	TotalStartingBidsSAR float64 `json:"total_starting_bids_sar"`
	AvgPriceTotalSAR     float64 `json:"avg_price_total_sar"`
	FeaturedCount        int     `json:"featured_count"`
	GeneratedAt          string  `json:"generated_at"`
}

// AdminGetFinanceSummary handles GET /api/admin/finance/summary
func AdminGetFinanceSummary(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		jsonError(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	if _, _, ok := verifyAdminToken(r); !ok {
		jsonError(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()

	var s financeSummary
	err := db.Pool.QueryRow(ctx, `
		SELECT
			COUNT(*)::int                                                         AS total_properties,
			COUNT(*) FILTER (WHERE status = 'auction')::int                       AS active_auctions,
			COUNT(*) FILTER (WHERE status = 'sold')::int                          AS total_sold,
			COUNT(*) FILTER (WHERE status = 'pending')::int                       AS total_pending,
			COALESCE(SUM(current_bid)  FILTER (WHERE status = 'auction'), 0)::float8 AS total_current_bids,
			COALESCE(SUM(starting_bid) FILTER (WHERE status = 'auction'), 0)::float8 AS total_starting_bids,
			COALESCE(AVG(price_total), 0)::float8                                 AS avg_price_total,
			COUNT(*) FILTER (WHERE is_featured = true)::int                       AS featured_count
		FROM properties
	`).Scan(
		&s.TotalProperties,
		&s.TotalActiveAuctions,
		&s.TotalSold,
		&s.TotalPending,
		&s.TotalCurrentBidsSAR,
		&s.TotalStartingBidsSAR,
		&s.AvgPriceTotalSAR,
		&s.FeaturedCount,
	)
	if err != nil {
		jsonError(w, "database error", http.StatusInternalServerError)
		return
	}

	s.GeneratedAt = time.Now().UTC().Format(time.RFC3339)

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(s)
}
