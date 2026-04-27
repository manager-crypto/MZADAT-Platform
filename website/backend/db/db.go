package db

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

// Pool is the shared connection pool used by all handlers.
var Pool *pgxpool.Pool

// Connect initialises the PostgreSQL connection pool from DATABASE_URL.
func Connect() {
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		dsn = "postgres://mzadat:mzadat_secret@localhost:5432/mzadat_db?sslmode=disable"
	}

	cfg, err := pgxpool.ParseConfig(dsn)
	if err != nil {
		log.Fatalf("db: failed to parse DATABASE_URL: %v", err)
	}

	// Connection pool settings tuned for a mid-traffic API server.
	cfg.MaxConns = 20
	cfg.MinConns = 2
	cfg.MaxConnLifetime = 30 * time.Minute
	cfg.MaxConnIdleTime = 5 * time.Minute
	cfg.HealthCheckPeriod = 1 * time.Minute

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	Pool, err = pgxpool.NewWithConfig(ctx, cfg)
	if err != nil {
		log.Fatalf("db: unable to create connection pool: %v", err)
	}

	if err = Pool.Ping(ctx); err != nil {
		log.Fatalf("db: unable to ping database: %v", err)
	}

	fmt.Println("db: connected to PostgreSQL")
}

// Close gracefully shuts down the connection pool.
func Close() {
	if Pool != nil {
		Pool.Close()
		log.Println("db: connection pool closed")
	}
}

// Healthcheck returns nil when the DB is reachable.
func Healthcheck(ctx context.Context) error {
	return Pool.Ping(ctx)
}

// EnvOrDefault returns the env var value or a fallback.
func EnvOrDefault(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
