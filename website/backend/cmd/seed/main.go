// cmd/seed/main.go — Idempotent Super Admin seeder.
// Reads credentials from env vars (with safe defaults) and inserts/updates the
// SUPER_ADMIN row. The bcrypt hashing is delegated to PostgreSQL's pgcrypto.
//
// Usage:
//
//	go run ./cmd/seed
//	ADMIN_SEED_EMAIL=foo@x.com ADMIN_SEED_PASSWORD=Secret123 go run ./cmd/seed
package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

const (
	defaultDSN      = "postgres://mzadat:mzadat_secret@localhost:5432/mzadat_db?sslmode=disable"
	defaultEmail    = "admin@mzadat.com"
	defaultPassword = "Admin123!@#"
	adminRole       = "SUPER_ADMIN"
	adminName       = "Super Admin"
)

func envOr(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

func main() {
	dsn := envOr("DATABASE_URL", defaultDSN)
	email := envOr("ADMIN_SEED_EMAIL", defaultEmail)
	password := envOr("ADMIN_SEED_PASSWORD", defaultPassword)

	if len(password) < 8 {
		log.Fatalf("seed: ADMIN_SEED_PASSWORD must be at least 8 characters")
	}

	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	pool, err := pgxpool.New(ctx, dsn)
	if err != nil {
		log.Fatalf("seed: connect failed: %v", err)
	}
	defer pool.Close()

	if err = pool.Ping(ctx); err != nil {
		log.Fatalf("seed: ping failed: %v", err)
	}

	// Single idempotent UPSERT — handles both fresh installs and re-seeds.
	// Uses pgcrypto's crypt() so the password is stored as bcrypt.
	tag, err := pool.Exec(ctx, `
		INSERT INTO admin_users (email, password_hash, role, full_name)
		VALUES ($1, crypt($2, gen_salt('bf', 10)), $3, $4)
		ON CONFLICT (email) DO UPDATE
			SET role          = EXCLUDED.role,
			    password_hash = EXCLUDED.password_hash,
			    full_name     = EXCLUDED.full_name,
			    is_active     = true,
			    updated_at    = NOW()
	`, email, password, adminRole, adminName)
	if err != nil {
		log.Fatalf("seed: upsert failed: %v", err)
	}

	fmt.Printf("seed: ok (rows affected: %d)\n", tag.RowsAffected())
	fmt.Printf("seed: Super Admin ready — email=%s\n", email)
	if password == defaultPassword {
		fmt.Println("seed: WARNING — using default password. Change it via ADMIN_SEED_PASSWORD!")
	}
}
