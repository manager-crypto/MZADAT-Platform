-- Migration 004: Audit log table
-- Records all admin actions for compliance (SAMA, ZATCA requirements).
-- Retention: indefinite (production should archive older than 2 years).

CREATE TABLE IF NOT EXISTS audit_log (
    id            UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id      UUID         REFERENCES admin_users(id) ON DELETE SET NULL,
    admin_email   VARCHAR(255),                 -- denormalized for display even after user deletion
    action        VARCHAR(100) NOT NULL,        -- e.g. AUCTION_APPROVE, USER_DEACTIVATE, SECTION_TOGGLE
    entity_type   VARCHAR(50)  NOT NULL,        -- e.g. property, user, section
    entity_id     VARCHAR(100),                 -- the target ID (string to accommodate both BIGINT and UUID)
    details       JSONB        NOT NULL DEFAULT '{}'::jsonb,
    ip_address    INET,
    user_agent    TEXT,
    created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at   ON audit_log (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_admin_id     ON audit_log (admin_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_action       ON audit_log (action);
CREATE INDEX IF NOT EXISTS idx_audit_log_entity       ON audit_log (entity_type, entity_id);

COMMENT ON TABLE  audit_log             IS 'Admin action audit trail (SAMA/ZATCA compliance)';
COMMENT ON COLUMN audit_log.action      IS 'UPPER_SNAKE_CASE action identifier';
COMMENT ON COLUMN audit_log.entity_type IS 'Lowercase entity name (property, user, section, etc.)';
COMMENT ON COLUMN audit_log.entity_id   IS 'ID of the affected entity (string to fit any PK type)';
COMMENT ON COLUMN audit_log.details     IS 'Structured JSON with before/after, reason, metadata';
