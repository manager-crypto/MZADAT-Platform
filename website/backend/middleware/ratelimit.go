// Package middleware — Rate limiting (token bucket per identifier).
//
// Two policies:
//   - Per-IP: prevents brute-force on /api/auth/login, /api/auth/otp/*
//   - Per-User: prevents bid spam (max 5 bids/sec, 30 bids/min)
//
// Implementation: in-memory token bucket. Goroutine-safe. Sufficient for a
// single API instance. For multi-instance deployments, swap to a Redis-backed
// bucket (recommended: github.com/throttled/throttled or custom Lua script).
//
// Memory bound: each unique key holds ~80 bytes; we GC keys idle for >10min.
package middleware

import (
	"encoding/json"
	"net/http"
	"strings"
	"sync"
	"time"
)

// ─── Token Bucket ──────────────────────────────────────────────────────────

type bucket struct {
	tokens   float64
	lastFill time.Time
	lastUsed time.Time
}

// LimiterConfig defines a bucket's capacity & refill rate.
type LimiterConfig struct {
	Capacity float64       // max burst
	Refill   float64       // tokens per second
	IdleTTL  time.Duration // GC keys idle longer than this
}

// Limiter is a goroutine-safe token-bucket rate limiter keyed by string identifier.
type Limiter struct {
	cfg     LimiterConfig
	buckets map[string]*bucket
	mu      sync.Mutex
}

// NewLimiter constructs a Limiter and starts its background GC.
func NewLimiter(cfg LimiterConfig) *Limiter {
	if cfg.IdleTTL == 0 {
		cfg.IdleTTL = 10 * time.Minute
	}
	l := &Limiter{
		cfg:     cfg,
		buckets: make(map[string]*bucket),
	}
	go l.gcLoop()
	return l
}

// Allow returns true if the bucket for this key has at least one token.
// Always consumes 1 token on success.
func (l *Limiter) Allow(key string) bool {
	l.mu.Lock()
	defer l.mu.Unlock()

	now := time.Now()
	b, ok := l.buckets[key]
	if !ok {
		b = &bucket{
			tokens:   l.cfg.Capacity - 1,
			lastFill: now,
			lastUsed: now,
		}
		l.buckets[key] = b
		return true
	}

	// Refill since last access
	elapsed := now.Sub(b.lastFill).Seconds()
	b.tokens += elapsed * l.cfg.Refill
	if b.tokens > l.cfg.Capacity {
		b.tokens = l.cfg.Capacity
	}
	b.lastFill = now
	b.lastUsed = now

	if b.tokens < 1 {
		return false
	}
	b.tokens--
	return true
}

func (l *Limiter) gcLoop() {
	t := time.NewTicker(2 * time.Minute)
	defer t.Stop()
	for range t.C {
		l.mu.Lock()
		cutoff := time.Now().Add(-l.cfg.IdleTTL)
		for k, b := range l.buckets {
			if b.lastUsed.Before(cutoff) {
				delete(l.buckets, k)
			}
		}
		l.mu.Unlock()
	}
}

// ─── Pre-configured limiters ────────────────────────────────────────────────

// AuthLimiter: 5 attempts per IP per minute (~12s refill rate).
// Targets: login, OTP send/verify, password reset request.
var AuthLimiter = NewLimiter(LimiterConfig{
	Capacity: 5,
	Refill:   5.0 / 60.0, // 5 tokens / 60 seconds
})

// BidLimiter: 5 bids per second per user, burst of 5.
// Targets: POST /api/auctions/{id}/bid
var BidLimiter = NewLimiter(LimiterConfig{
	Capacity: 5,
	Refill:   5.0, // 5 tokens per second
})

// GeneralLimiter: 100 requests per minute per IP for everything else.
var GeneralLimiter = NewLimiter(LimiterConfig{
	Capacity: 100,
	Refill:   100.0 / 60.0,
})

// ─── HTTP Middleware ────────────────────────────────────────────────────────

// RateLimitByIP wraps a handler with per-IP rate limiting using the given limiter.
func RateLimitByIP(limiter *Limiter, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		key := "ip:" + clientIP(r)
		if !limiter.Allow(key) {
			tooManyRequests(w, r)
			return
		}
		next.ServeHTTP(w, r)
	})
}

// RateLimitByUser wraps a handler with per-user-ID rate limiting.
// Falls back to per-IP if the request is unauthenticated.
func RateLimitByUser(limiter *Limiter, userIDExtractor func(*http.Request) string, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		key := userIDExtractor(r)
		if key == "" {
			key = "ip:" + clientIP(r)
		} else {
			key = "user:" + key
		}
		if !limiter.Allow(key) {
			tooManyRequests(w, r)
			return
		}
		next.ServeHTTP(w, r)
	})
}

// ─── Helpers ────────────────────────────────────────────────────────────────

func clientIP(r *http.Request) string {
	// Behind a trusted proxy? Honor X-Forwarded-For.
	// Configure TRUST_PROXY=1 in env when running behind nginx/cloudflare.
	if xff := r.Header.Get("X-Forwarded-For"); xff != "" {
		if i := strings.Index(xff, ","); i > 0 {
			return strings.TrimSpace(xff[:i])
		}
		return strings.TrimSpace(xff)
	}
	addr := r.RemoteAddr
	if i := strings.LastIndex(addr, ":"); i > 0 {
		addr = addr[:i]
	}
	return addr
}

func tooManyRequests(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Header().Set("Retry-After", "60")
	w.WriteHeader(http.StatusTooManyRequests)
	_ = json.NewEncoder(w).Encode(map[string]string{
		"error": "too many requests, please slow down",
		"code":  "RATE_LIMITED",
	})
}
