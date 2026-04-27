-- Migration 005: Customer users, sessions, OTP codes, password resets
-- Production-grade auth system with KSA-specific phone validation
-- and SAMA-compliant audit trail.

-- ─── users: customer accounts ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
    id                  UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    -- Identity
    email               VARCHAR(320) NOT NULL UNIQUE,
    phone               VARCHAR(20)  NOT NULL UNIQUE,  -- E.164 format: +9665XXXXXXXX
    password_hash       VARCHAR(100) NOT NULL,         -- bcrypt hash
    -- Profile
    full_name           VARCHAR(200) NOT NULL,
    id_number           VARCHAR(20),                   -- Saudi ID or Iqama
    nationality         VARCHAR(50),                   -- ISO alpha-3 preferred
    residence_city      VARCHAR(80),
    id_document_url     TEXT,                          -- uploaded ID photo path
    -- Account type & role
    account_type        VARCHAR(20)  NOT NULL DEFAULT 'individual'
                                    CHECK (account_type IN ('individual','broker','company')),
    role                VARCHAR(20)  NOT NULL DEFAULT 'USER'
                                    CHECK (role IN ('USER','BROKER','COMPANY')),
    -- Verification
    email_verified      BOOLEAN      NOT NULL DEFAULT false,
    phone_verified      BOOLEAN      NOT NULL DEFAULT false,
    kyc_status          VARCHAR(20)  NOT NULL DEFAULT 'pending'
                                    CHECK (kyc_status IN ('pending','submitted','approved','rejected')),
    -- Lifecycle
    is_active           BOOLEAN      NOT NULL DEFAULT true,
    last_login          TIMESTAMPTZ,
    failed_login_count  INT          NOT NULL DEFAULT 0,
    locked_until        TIMESTAMPTZ,                   -- set by brute-force lockout
    created_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    -- Constraints
    CONSTRAINT users_email_lowercase  CHECK (email = LOWER(email)),
    CONSTRAINT users_phone_format     CHECK (phone ~ '^\+[1-9][0-9]{7,14}$')
);

CREATE INDEX IF NOT EXISTS idx_users_email             ON users (email);
CREATE INDEX IF NOT EXISTS idx_users_phone             ON users (phone);
CREATE INDEX IF NOT EXISTS idx_users_role              ON users (role);
CREATE INDEX IF NOT EXISTS idx_users_created_at        ON users (created_at DESC);

COMMENT ON TABLE  users              IS 'Customer accounts (buyers, bidders, brokers, companies)';
COMMENT ON COLUMN users.phone        IS 'E.164 phone; KSA numbers begin with +966';
COMMENT ON COLUMN users.id_number    IS 'Saudi National ID or Iqama number; needed for auction participation';


-- ─── user_sessions: active auth tokens ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_sessions (
    token           VARCHAR(64)  PRIMARY KEY,        -- 32 random bytes, hex-encoded
    user_id         UUID         NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    expires_at      TIMESTAMPTZ  NOT NULL,
    last_used_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    ip_address      INET,
    user_agent      TEXT
);

CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id    ON user_sessions (user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_expires_at ON user_sessions (expires_at);

COMMENT ON TABLE user_sessions IS 'Active login sessions for customer users';


-- ─── otp_codes: one-time passwords for phone verification ───────────────────
CREATE TABLE IF NOT EXISTS otp_codes (
    id              UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    -- What does this code verify?
    purpose         VARCHAR(30)  NOT NULL
                                CHECK (purpose IN ('phone_verify','login_2fa','password_reset')),
    -- Who?
    user_id         UUID         REFERENCES users(id) ON DELETE CASCADE,  -- null for new-signup phone-verify
    phone           VARCHAR(20)  NOT NULL,            -- phone to send to
    -- The code
    code_hash       VARCHAR(100) NOT NULL,            -- bcrypt hash of the 6-digit code
    -- Lifecycle
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    expires_at      TIMESTAMPTZ  NOT NULL,            -- typically NOW() + 10 minutes
    attempts        INT          NOT NULL DEFAULT 0,  -- failed verify attempts
    used_at         TIMESTAMPTZ,                      -- non-null once redeemed
    ip_address      INET
);

CREATE INDEX IF NOT EXISTS idx_otp_codes_phone_purpose ON otp_codes (phone, purpose) WHERE used_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_otp_codes_expires_at    ON otp_codes (expires_at);

COMMENT ON TABLE  otp_codes          IS 'One-time passwords sent via SMS for phone verification and 2FA';
COMMENT ON COLUMN otp_codes.code_hash IS 'bcrypt hash; never store plaintext OTPs';


-- ─── password_resets: reset tokens sent via email ───────────────────────────
CREATE TABLE IF NOT EXISTS password_resets (
    token_hash      VARCHAR(100) PRIMARY KEY,         -- SHA-256 hash of the raw token
    user_id         UUID         NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    expires_at      TIMESTAMPTZ  NOT NULL,            -- typically NOW() + 1 hour
    used_at         TIMESTAMPTZ,
    ip_address      INET
);

CREATE INDEX IF NOT EXISTS idx_password_resets_user_id    ON password_resets (user_id);
CREATE INDEX IF NOT EXISTS idx_password_resets_expires_at ON password_resets (expires_at);

COMMENT ON TABLE password_resets IS 'Email-based password reset tokens with short TTL';


-- ─── login_attempts: brute-force protection ─────────────────────────────────
CREATE TABLE IF NOT EXISTS login_attempts (
    id              BIGSERIAL    PRIMARY KEY,
    email           VARCHAR(320),
    phone           VARCHAR(20),
    ip_address      INET         NOT NULL,
    success         BOOLEAN      NOT NULL,
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_login_attempts_email_time ON login_attempts (email, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_login_attempts_ip_time    ON login_attempts (ip_address, created_at DESC);

COMMENT ON TABLE login_attempts IS 'Login history for rate-limiting and security monitoring';
