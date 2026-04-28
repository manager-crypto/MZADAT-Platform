package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"strings"
	"syscall"
	"time"

	"github.com/mzadat/backend/db"
	"github.com/mzadat/backend/handlers"
	"github.com/mzadat/backend/middleware"
	"github.com/mzadat/backend/wshub"
)

func main() {
	// Connect to database
	db.Connect()
	defer db.Close()

	// Start WebSocket hub
	hub := wshub.NewHub()
	go hub.Run()
	handlers.AuctionHub = hub
	defer hub.Shutdown()

	// Register routes
	mux := http.NewServeMux()

	// Health
	mux.HandleFunc("GET /health", handlers.Health)

	// ─── Public Properties ────────────────────────────────────────────────
	mux.HandleFunc("GET /api/properties", handlers.GetProperties)
	mux.HandleFunc("GET /api/properties/{id}", handlers.GetPropertyByID)

	// ─── Public Auctions (read) ───────────────────────────────────────────
	mux.HandleFunc("GET /api/auctions", handlers.ListAuctions)
	mux.HandleFunc("GET /api/auctions/{id}", handlers.GetAuction)
	mux.HandleFunc("GET /api/auctions/{id}/bids", handlers.GetBidHistory)

	// ─── Bidding (auth required + rate limit) ─────────────────────────────
	bidHandler := http.HandlerFunc(handlers.PlaceBid)
	mux.Handle("POST /api/auctions/{id}/bid",
		middleware.RateLimitByUser(
			middleware.BidLimiter,
			extractUserID,
			bidHandler,
		),
	)

	// Deposit creation (auth required)
	mux.HandleFunc("POST /api/auctions/{id}/deposit", handlers.CreateDeposit)

	// Hash chain verification (admin only — handler does the check)
	mux.HandleFunc("GET /api/auctions/{id}/verify-chain", handlers.VerifyChain)

	// ─── Admin Auth ───────────────────────────────────────────────────────
	mux.Handle("POST /api/admin/login",
		middleware.RateLimitByIP(middleware.AuthLimiter, http.HandlerFunc(handlers.AdminLogin)),
	)
	mux.HandleFunc("POST /api/admin/logout", handlers.AdminLogout)

	// ─── Admin Operations (token-protected by handlers) ───────────────────
	mux.HandleFunc("GET /api/admin/auctions", handlers.AdminGetAuctions)
	mux.HandleFunc("PATCH /api/admin/auctions/{id}/approve", handlers.AdminApproveAuction)
	mux.HandleFunc("PATCH /api/admin/auctions/{id}/reject", handlers.AdminRejectAuction)
	mux.HandleFunc("DELETE /api/admin/auctions/{id}", handlers.AdminDeleteAuction)

	mux.HandleFunc("GET /api/admin/sections", handlers.AdminGetSections)
	mux.HandleFunc("PATCH /api/admin/sections/{id}/visibility", handlers.AdminToggleSectionVisibility)
	mux.HandleFunc("PATCH /api/admin/sections/{id}/toggle-visibility", handlers.AdminToggleSectionVisibility)
	mux.HandleFunc("POST /api/admin/sections/reorder", handlers.AdminReorderSections)

	mux.HandleFunc("GET /api/admin/users", handlers.AdminGetUsers)
	mux.HandleFunc("PATCH /api/admin/users/{id}/toggle-active", handlers.AdminToggleUserActive)

	mux.HandleFunc("GET /api/admin/finance/summary", handlers.AdminGetFinanceSummary)
	mux.HandleFunc("GET /api/admin/audit-log", handlers.AdminGetAuditLog)

	// ─── Public sections (main site) ──────────────────────────────────────
	mux.HandleFunc("GET /api/sections", handlers.PublicGetSections)

	// ─── Customer auth (rate-limited public endpoints) ────────────────────
	registerHandler := http.HandlerFunc(handlers.UserRegister)
	loginHandler := http.HandlerFunc(handlers.UserLogin)
	otpSendHandler := http.HandlerFunc(handlers.UserOTPSend)
	otpVerifyHandler := http.HandlerFunc(handlers.UserOTPVerify)
	resetReqHandler := http.HandlerFunc(handlers.UserPasswordResetRequest)
	resetCfmHandler := http.HandlerFunc(handlers.UserPasswordResetConfirm)

	mux.Handle("POST /api/auth/register",
		middleware.RateLimitByIP(middleware.AuthLimiter, registerHandler))
	mux.Handle("POST /api/auth/login",
		middleware.RateLimitByIP(middleware.AuthLimiter, loginHandler))
	mux.Handle("POST /api/auth/otp/send",
		middleware.RateLimitByIP(middleware.AuthLimiter, otpSendHandler))
	mux.Handle("POST /api/auth/otp/verify",
		middleware.RateLimitByIP(middleware.AuthLimiter, otpVerifyHandler))
	mux.Handle("POST /api/auth/password/reset-request",
		middleware.RateLimitByIP(middleware.AuthLimiter, resetReqHandler))
	mux.Handle("POST /api/auth/password/reset-confirm",
		middleware.RateLimitByIP(middleware.AuthLimiter, resetCfmHandler))

	mux.HandleFunc("POST /api/auth/logout", handlers.UserLogout)
	mux.HandleFunc("GET /api/auth/me", handlers.UserMe)

	// ─── Nafath (National SSO) ────────────────────────────────────────────
	nafathInitiateHandler := http.HandlerFunc(handlers.NafathInitiate)
	mux.Handle("POST /api/auth/nafath/initiate",
		middleware.RateLimitByIP(middleware.AuthLimiter, nafathInitiateHandler))
	mux.HandleFunc("GET /api/auth/nafath/status/{request_id}", handlers.NafathStatus)

	// ─── WebSocket: live auction broadcasts ───────────────────────────────
	mux.HandleFunc("GET /ws/auction/{id}", hub.ServeWS)

	// Apply middleware: CORS → Logger → mux
	handler := middleware.CORS(middleware.Logger(mux))

	port := db.EnvOrDefault("PORT", "8080")
	addr := fmt.Sprintf(":%s", port)

	srv := &http.Server{
		Addr:         addr,
		Handler:      handler,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 30 * time.Second,
		IdleTimeout:  120 * time.Second,
	}

	// Graceful shutdown
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		log.Printf("server: listening on %s", addr)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("server: listen error: %v", err)
		}
	}()

	<-quit
	log.Println("server: shutting down gracefully...")

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		log.Fatalf("server: forced shutdown: %v", err)
	}
	log.Println("server: stopped")
}

// extractUserID resolves a user UUID from the bearer/cookie session token.
// Used by RateLimitByUser to bucket bids per-user instead of per-IP.
// Returns "" if no valid session (caller falls back to IP-based limiting).
func extractUserID(r *http.Request) string {
	// Bearer
	auth := r.Header.Get("Authorization")
	var token string
	if strings.HasPrefix(auth, "Bearer ") {
		token = strings.TrimPrefix(auth, "Bearer ")
	}
	if token == "" {
		// Cookie fallback
		if c, err := r.Cookie("mzdt_session"); err == nil {
			token = c.Value
		}
	}
	if token == "" {
		return ""
	}

	ctx, cancel := context.WithTimeout(r.Context(), 1*time.Second)
	defer cancel()

	var userID string
	err := db.Pool.QueryRow(ctx,
		`SELECT user_id::TEXT FROM user_sessions WHERE token = $1 AND expires_at > NOW()`,
		token).Scan(&userID)
	if err != nil {
		return ""
	}
	return userID
}
