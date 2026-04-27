package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/mzadat/backend/db"
	"github.com/mzadat/backend/handlers"
	"github.com/mzadat/backend/middleware"
)

func main() {
	// Connect to database
	db.Connect()
	defer db.Close()

	// Register routes
	mux := http.NewServeMux()

	// Health
	mux.HandleFunc("GET /health", handlers.Health)

	// Properties API
	mux.HandleFunc("GET /api/properties", handlers.GetProperties)
	mux.HandleFunc("GET /api/properties/{id}", handlers.GetPropertyByID)

	// Admin Auth
	mux.HandleFunc("POST /api/admin/login", handlers.AdminLogin)
	mux.HandleFunc("POST /api/admin/logout", handlers.AdminLogout)

	// Admin Auctions (token-protected)
	mux.HandleFunc("GET /api/admin/auctions", handlers.AdminGetAuctions)
	mux.HandleFunc("PATCH /api/admin/auctions/{id}/approve", handlers.AdminApproveAuction)
	mux.HandleFunc("PATCH /api/admin/auctions/{id}/reject", handlers.AdminRejectAuction)
	mux.HandleFunc("DELETE /api/admin/auctions/{id}", handlers.AdminDeleteAuction)

	// Admin Site Sections (token-protected)
	mux.HandleFunc("GET /api/admin/sections", handlers.AdminGetSections)
	mux.HandleFunc("PATCH /api/admin/sections/{id}/visibility", handlers.AdminToggleSectionVisibility)
	mux.HandleFunc("PATCH /api/admin/sections/{id}/toggle-visibility", handlers.AdminToggleSectionVisibility)
	mux.HandleFunc("POST /api/admin/sections/reorder", handlers.AdminReorderSections)

	// Admin Users (token-protected)
	mux.HandleFunc("GET /api/admin/users", handlers.AdminGetUsers)
	mux.HandleFunc("PATCH /api/admin/users/{id}/toggle-active", handlers.AdminToggleUserActive)

	// Admin Finance (token-protected)
	mux.HandleFunc("GET /api/admin/finance/summary", handlers.AdminGetFinanceSummary)

	// Admin Audit Log (token-protected)
	mux.HandleFunc("GET /api/admin/audit-log", handlers.AdminGetAuditLog)

	// Public sections endpoint for main site
	mux.HandleFunc("GET /api/sections", handlers.PublicGetSections)

	// ─── Customer auth (public endpoints) ──────────────────────────────────
	mux.HandleFunc("POST /api/auth/register",                handlers.UserRegister)
	mux.HandleFunc("POST /api/auth/login",                   handlers.UserLogin)
	mux.HandleFunc("POST /api/auth/logout",                  handlers.UserLogout)
	mux.HandleFunc("GET  /api/auth/me",                      handlers.UserMe)
	mux.HandleFunc("POST /api/auth/otp/send",                handlers.UserOTPSend)
	mux.HandleFunc("POST /api/auth/otp/verify",              handlers.UserOTPVerify)
	mux.HandleFunc("POST /api/auth/password/reset-request",  handlers.UserPasswordResetRequest)
	mux.HandleFunc("POST /api/auth/password/reset-confirm",  handlers.UserPasswordResetConfirm)

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
