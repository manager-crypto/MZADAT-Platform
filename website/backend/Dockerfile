# ─────────────────────────────────────────────────────────────────────────────
# MZADAT Backend - Multi-stage Dockerfile
# ─────────────────────────────────────────────────────────────────────────────

FROM golang:1.23-alpine AS builder

RUN apk add --no-cache git ca-certificates

WORKDIR /app

# Copy go.mod and go.sum first for layer caching
COPY go.mod go.sum* ./
RUN go mod download

# Copy source code
COPY . .

# Build static binaries
RUN go mod tidy && \
    CGO_ENABLED=0 GOOS=linux go build \
        -ldflags="-s -w" \
        -o /server \
        ./cmd/server

RUN CGO_ENABLED=0 GOOS=linux go build \
        -ldflags="-s -w" \
        -o /seed \
        ./cmd/seed

# ─────────────────────────────────────────────────────────────────────────────
# Stage 2: Minimal runtime
# ─────────────────────────────────────────────────────────────────────────────
FROM alpine:3.20

RUN apk add --no-cache ca-certificates tzdata wget && \
    addgroup -S mzadat && \
    adduser  -S mzadat -G mzadat

WORKDIR /app

COPY --from=builder /server /app/server
COPY --from=builder /seed   /app/seed

USER mzadat

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:8080/health || exit 1

ENTRYPOINT ["/app/server"]
