# 🚀 Mzadat Platform — Deployment Guide

> **Companion to:** `SPRINT1_CHANGES.md`
> **Audience:** DevOps / Lead Developer
> **Goal:** Get Sprint 1 running on a staging server in under 2 hours.

---

## 0. Prerequisites Checklist

Before you start, confirm:

- [ ] You have SSH root access to a fresh Ubuntu 22.04 or 24.04 VPS
- [ ] You own a domain (e.g., `mzadat.com`) with DNS access
- [ ] You have GitHub repo access with deploy key set up
- [ ] **You've rotated/revoked the leaked Supabase anon key** (see Security Alert in `SPRINT1_CHANGES.md`)
- [ ] You've decided on Nafath mode: `mock` (no NIC contract yet) or `live` (you have the API key)

---

## 1. Sprint 1 — What's Newly Deployed

This sprint adds:

### Backend (Go)

```
backend/
├── bidengine/bidengine.go            ← NEW: atomic bid engine
├── wshub/wshub.go                    ← NEW: WebSocket hub
├── middleware/ratelimit.go           ← NEW: token bucket rate limiter
├── handlers/
│   ├── auctions.go                   ← NEW: auction REST endpoints
│   └── nafath.go                     ← NEW: Nafath SSO (mock + live stub)
└── db/migrations/
    ├── 006_create_auctions.sql       ← NEW
    ├── 007_create_bids.sql           ← NEW (immutable, hash-chained)
    ├── 008_create_financial_holds.sql ← NEW (SADAD)
    ├── 009_audit_immutability_and_nafath.sql ← NEW
    └── 010_create_nafath_requests.sql ← NEW
```

### Frontend

```
website/src/
├── hooks/useAuctionLive.ts           ← NEW: WebSocket React hook
├── services/auctionsApi.ts           ← NEW: REST + WS client
├── components/ui/RiyalSymbol.tsx     ← MODIFIED: SVG inline (no Figma asset)
├── locales/ar.ts                     ← MODIFIED: ﷼ replaces ر.س
└── pages/
    ├── LoginPage.tsx                 ← MODIFIED: Go backend
    ├── ForgotPasswordPage.tsx        ← MODIFIED: phone-OTP
    ├── ResetPasswordPage.tsx         ← MODIFIED: OTP flow
    └── ~80 other files               ← MODIFIED: brand compliance fixes
```

---

## 2. Server Setup (One-Time)

### 2.1 OS hardening

```bash
# As root
adduser --disabled-password deploy
usermod -aG sudo,docker deploy

# Copy your public key
mkdir -p /home/deploy/.ssh
echo "ssh-ed25519 AAAA... your-key" >> /home/deploy/.ssh/authorized_keys
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh && chmod 600 /home/deploy/.ssh/authorized_keys

# Disable root SSH + password auth
sed -i 's/^#*PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
sed -i 's/^#*PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
systemctl reload sshd

# Firewall
apt update && apt install -y ufw fail2ban
ufw default deny incoming && ufw default allow outgoing
ufw allow OpenSSH && ufw allow 'Nginx Full'
ufw enable
systemctl enable fail2ban
```

### 2.2 Install runtime

```bash
apt install -y \
  docker.io docker-compose-plugin \
  nginx certbot python3-certbot-nginx \
  git make nodejs npm

# Verify
docker --version          # 24+
docker compose version    # v2+
nginx -v                  # 1.18+
node --version            # v20+ recommended
```

### 2.3 Clone repo (as deploy user)

```bash
sudo -u deploy bash << 'EOF'
cd ~
git clone git@github.com:manager-crypto/MZADAT-Platform.git mzadat
cd mzadat/website
cp .env.example .env
EOF
```

---

## 3. Configure Environment Variables

Edit `/home/deploy/mzadat/website/.env`:

```env
# ─── Database ──────────────────────────────────────────────────────────
POSTGRES_USER=mzadat
POSTGRES_PASSWORD=<<<openssl rand -base64 32>>>
POSTGRES_DB=mzadat_db
POSTGRES_HOST=postgres
POSTGRES_PORT=5432

# ─── Server ────────────────────────────────────────────────────────────
PORT=8080
LOG_LEVEL=info

# ─── CORS ──────────────────────────────────────────────────────────────
ALLOWED_ORIGINS=https://staging.mzadat.com,https://admin-staging.mzadat.com

# ─── Sessions / Security ──────────────────────────────────────────────
JWT_SECRET=<<<openssl rand -base64 64>>>
ADMIN_SEED_EMAIL=admin@mzadat.com
ADMIN_SEED_PASSWORD=<<<set a strong password — used only on first run>>>

# ─── SMS Provider (mock for staging) ──────────────────────────────────
SMS_PROVIDER=console
# When you contract Unifonic:
# SMS_PROVIDER=unifonic
# SMS_UNIFONIC_APP_SID=...
# SMS_UNIFONIC_SENDER_ID=Mzadat

# ─── Nafath (mock for staging) ────────────────────────────────────────
NAFATH_MODE=mock
NAFATH_MOCK_DELAY=3s
# Production:
# NAFATH_MODE=live
# NAFATH_API_URL=https://api.nic.gov.sa/nafath/v1
# NAFATH_API_KEY=<<<from NIC>>>
# NAFATH_CALLBACK_URL=https://staging.mzadat.com/api/auth/nafath/callback

# ─── SADAD (placeholder until bank contract) ──────────────────────────
SADAD_ENABLED=false
# SADAD_API_URL=...
# SADAD_API_KEY=...
# SADAD_BILLER_CODE=...

# ─── REGA / FAL (placeholder until contract) ──────────────────────────
REGA_ENABLED=false
# REGA_MOOJ_API_URL=...
# REGA_MOOJ_API_KEY=...
```

> **Security:** never commit `.env`. Verify it's in `.gitignore`.

---

## 4. First-Time Boot

```bash
cd /home/deploy/mzadat/website

# Build & start backend + DB
docker compose up -d --build

# Wait for DB to be ready (15-30s)
docker compose logs -f postgres
# Look for "database system is ready to accept connections" → Ctrl+C

# Run migrations (handled automatically by backend on startup,
# but you can verify manually)
docker compose exec postgres psql -U mzadat -d mzadat_db -c "\dt"
# Expected: properties, admin_users, site_sections, audit_log, users,
#           user_sessions, auctions, bids, financial_holds, nafath_requests

# Seed first admin
docker compose run --rm backend ./seed
# Expected: "✅ admin user created: admin@mzadat.com"

# Verify health
curl http://localhost:8080/health
# Expected: {"status":"ok","db":"connected","time":"..."}
```

### 4.1 Build frontends

```bash
cd /home/deploy/mzadat/website
npm ci --omit=dev
npm run build
# Output: /home/deploy/mzadat/website/build/

cd /home/deploy/mzadat/super-admin
npm ci --omit=dev
npm run build
# Output: /home/deploy/mzadat/super-admin/dist/
```

---

## 5. Nginx Configuration

### 5.1 Create the site config

```bash
sudo nano /etc/nginx/sites-available/mzadat
```

Paste:

```nginx
upstream go_backend { server 127.0.0.1:8080; }

# ─── Public site (staging) ────────────────────────────────────────────
server {
    listen 443 ssl http2;
    server_name staging.mzadat.com;

    root /home/deploy/mzadat/website/build;
    index index.html;

    ssl_certificate /etc/letsencrypt/live/staging.mzadat.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/staging.mzadat.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header Referrer-Policy strict-origin-when-cross-origin always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com data:; img-src 'self' data: https:; connect-src 'self' wss://staging.mzadat.com" always;

    # Static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|ico)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API
    location /api/ {
        proxy_pass http://go_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_read_timeout 30s;
    }

    # WebSocket
    location /ws/ {
        proxy_pass http://go_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_read_timeout 3600s;
    }
}

# ─── Super Admin (staging, IP-restricted) ─────────────────────────────
server {
    listen 443 ssl http2;
    server_name admin-staging.mzadat.com;

    root /home/deploy/mzadat/super-admin/dist;
    index index.html;

    ssl_certificate /etc/letsencrypt/live/admin-staging.mzadat.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/admin-staging.mzadat.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    # IP whitelist — replace with your office/VPN IPs
    allow 1.2.3.4;     # office
    allow 5.6.7.8;     # VPN
    deny all;

    location / { try_files $uri $uri/ /index.html; }
    location /api/ { proxy_pass http://go_backend; }
}

# ─── HTTP → HTTPS redirect ────────────────────────────────────────────
server {
    listen 80;
    server_name staging.mzadat.com admin-staging.mzadat.com;
    return 301 https://$host$request_uri;
}
```

### 5.2 Enable + SSL

```bash
sudo ln -s /etc/nginx/sites-available/mzadat /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default     # remove default if present
sudo nginx -t                                 # syntax check

# Get SSL certs
sudo certbot --nginx -d staging.mzadat.com -d admin-staging.mzadat.com
# Auto-renews via systemd timer

sudo systemctl reload nginx
```

---

## 6. Smoke Tests

```bash
# Health
curl https://staging.mzadat.com/api/health

# List auctions (empty initially)
curl https://staging.mzadat.com/api/auctions

# Create a test admin session
curl -X POST https://staging.mzadat.com/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@mzadat.com","password":"YOUR_SEED_PASSWORD"}'

# Try Nafath mock
curl -X POST https://staging.mzadat.com/api/auth/nafath/initiate \
  -H "Content-Type: application/json" \
  -d '{"national_id":"1010101010"}'
# Save the request_id from response, then:

REQUEST_ID="..."
sleep 4   # mock auto-approves after 3s

curl https://staging.mzadat.com/api/auth/nafath/status/$REQUEST_ID
# Expected: status=APPROVED + token

# Test rate limit (run 20x, should see 429 after ~5)
for i in {1..20}; do
  curl -s -o /dev/null -w "%{http_code} " \
    https://staging.mzadat.com/api/auth/login \
    -X POST -H "Content-Type: application/json" \
    -d '{"email":"x","password":"x"}'
done
echo
```

---

## 7. CI/CD with GitHub Actions

### 7.1 Add secrets to GitHub repo

Settings → Secrets → Actions:

- `STAGING_HOST` — server IP or hostname
- `SSH_PRIVATE_KEY` — private key for `deploy` user (no passphrase)

### 7.2 Workflow file

`.github/workflows/deploy-staging.yml`:

```yaml
name: Deploy Staging

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.STAGING_HOST }}
          username: deploy
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            set -e
            cd ~/mzadat
            git fetch origin main
            git reset --hard origin/main

            # Backend
            cd website
            docker compose up -d --build backend
            docker compose run --rm backend ./seed || true   # idempotent

            # Frontend
            npm ci --omit=dev
            npm run build

            # Super Admin
            cd ../super-admin
            npm ci --omit=dev
            npm run build

            # Reload nginx (no-op if no config change)
            sudo systemctl reload nginx
```

---

## 8. Daily Operations

### 8.1 Backups

```bash
# Add to crontab as deploy user
crontab -e
```

```cron
# Daily DB backup at 2 AM
0 2 * * * docker exec mzadat_postgres pg_dump -U mzadat mzadat_db | gzip > /home/deploy/backups/db_$(date +\%F).sql.gz

# Keep 30 days
0 3 * * * find /home/deploy/backups -name "db_*.sql.gz" -mtime +30 -delete

# Daily Nafath cleanup
0 4 * * * docker exec mzadat_postgres psql -U mzadat -d mzadat_db -c "SELECT purge_old_nafath_requests()"
```

### 8.2 Monitoring

```bash
# Quick health check
docker compose ps
curl -s http://localhost:8080/health | jq

# Logs
docker compose logs -f backend --tail=100
docker compose logs -f postgres --tail=50

# Resource usage
docker stats --no-stream
```

### 8.3 Audit chain verification

```bash
# Verify a specific auction's bid chain hasn't been tampered with
curl https://staging.mzadat.com/api/auctions/<UUID>/verify-chain
# Expected: {"intact": true, "verified_at": "..."}
```

---

## 9. Rollback Procedure

If a deployment breaks something:

```bash
# Quick rollback to previous commit
cd /home/deploy/mzadat
git log --oneline -5             # find the last good commit
git reset --hard <commit-hash>

cd website
docker compose up -d --build backend
npm ci --omit=dev && npm run build

cd ../super-admin
npm ci --omit=dev && npm run build

sudo systemctl reload nginx
```

If DB migration broke:

```bash
# Restore from latest backup
docker exec -i mzadat_postgres psql -U mzadat -d mzadat_db < \
  <(gunzip -c /home/deploy/backups/db_$(date +%F).sql.gz)
```

---

## 10. Production Migration Checklist

Before flipping `staging.mzadat.com` → `mzadat.com`:

- [ ] **Nafath live key** in `.env` + tested with real National ID
- [ ] **SADAD/bank integration** tested end-to-end (test deposit + refund)
- [ ] **REGA Mooj API** wired into property approval flow
- [ ] **Penetration test** completed by Saudi-licensed firm
- [ ] **Load test** passed: 1000 concurrent bidders on a single auction
- [ ] **Data residency** verified — server is hosted in Saudi Arabia (STC Cloud / Sahara / NEOM)
- [ ] **PDPL compliance** audit signed off
- [ ] **Backup restore drill** completed (proven you can restore in <15 min)
- [ ] **Monitoring alerts** configured (Sentry + uptime + on-call rotation)
- [ ] **Legal sign-off** from Infath + REGA on the platform

---

## 📞 Support Contacts

When you hit something this guide doesn't cover:

- **Backend errors:** Check `docker compose logs backend`. The Go logger is verbose and structured.
- **WebSocket disconnects:** Browser console → Network → WS tab. Compare `wss://` URL to nginx config.
- **Nafath issues:** Verify `NAFATH_MODE` env var. Mock mode ignores national_id format issues.
- **Rate limit hits:** `middleware/ratelimit.go` constants. Defaults are conservative.

---

**Last updated:** April 2026 | **Sprint 1 deliverables**
