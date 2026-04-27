-- Migration 002: Admin users & sessions
-- Requires pgcrypto for bcrypt password hashing

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS admin_users (
    id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    email         VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role          VARCHAR(50)  NOT NULL DEFAULT 'ADMIN',
    full_name     VARCHAR(255),
    is_active     BOOLEAN      NOT NULL DEFAULT true,
    last_login    TIMESTAMPTZ,
    created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_sessions (
    id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id   UUID        NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
    token      VARCHAR(128) UNIQUE NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admin_sessions_token   ON admin_sessions(token);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires ON admin_sessions(expires_at);

-- Seed: Super Admin (password: Admin123!@#)
INSERT INTO admin_users (email, password_hash, role, full_name)
VALUES (
    'admin@mzadat.com',
    crypt('Admin123!@#', gen_salt('bf', 10)),
    'SUPER_ADMIN',
    'Super Admin'
)
ON CONFLICT (email) DO UPDATE
    SET role          = 'SUPER_ADMIN',
        password_hash = crypt('Admin123!@#', gen_salt('bf', 10)),
        updated_at    = NOW();
