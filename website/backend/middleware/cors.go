package middleware

import (
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/rs/cors"
)

// CORS returns a handler that applies safe CORS rules.
// Allowed origins are read from the ALLOWED_ORIGINS env var (comma-separated).
func CORS(next http.Handler) http.Handler {
	raw := os.Getenv("ALLOWED_ORIGINS")
	var origins []string

	// Defensive parsing: split, trim whitespace, drop empty entries
	for _, o := range strings.Split(raw, ",") {
		o = strings.TrimSpace(o)
		if o != "" {
			origins = append(origins, o)
		}
	}

	// Sensible defaults for local development
	if len(origins) == 0 {
		origins = []string{
			"http://localhost:5173",
			"http://localhost:3000",
		}
	}

	c := cors.New(cors.Options{
		AllowedOrigins:   origins,
		AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Authorization", "Content-Type", "Accept", "X-Request-ID"},
		ExposedHeaders:   []string{"X-Total-Count"},
		AllowCredentials: true,
		MaxAge:           86400,
	})

	return c.Handler(next)
}

// statusRecorder wraps ResponseWriter to capture the status code.
type statusRecorder struct {
	http.ResponseWriter
	status int
}

func (sr *statusRecorder) WriteHeader(code int) {
	sr.status = code
	sr.ResponseWriter.WriteHeader(code)
}

// Logger logs each request: METHOD PATH STATUS DURATION REMOTE
func Logger(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		sr := &statusRecorder{ResponseWriter: w, status: http.StatusOK}

		next.ServeHTTP(sr, r)

		log.Printf("%-6s %s %d %s %s",
			r.Method,
			r.URL.Path,
			sr.status,
			time.Since(start),
			r.RemoteAddr,
		)
	})
}
