package handlers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/mzadat/backend/db"
)

// Health handles GET /health — used by Docker and monitoring.
func Health(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	dbOK := db.Healthcheck(ctx) == nil

	status := "ok"
	code := http.StatusOK
	if !dbOK {
		status = "degraded"
		code = http.StatusServiceUnavailable
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(map[string]any{
		"status":    status,
		"db":        dbOK,
		"timestamp": time.Now().UTC().Format(time.RFC3339),
	})
}
