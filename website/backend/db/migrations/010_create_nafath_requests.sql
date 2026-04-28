-- Migration 010: Nafath verification requests
-- ═══════════════════════════════════════════════════════════════════════════
-- Tracks pending Nafath identity verification flows.
-- Records auto-expire after 5 minutes; a daily cleanup job purges old rows.

CREATE TYPE nafath_status AS ENUM (
    'WAITING',
    'APPROVED',
    'REJECTED',
    'EXPIRED'
);

CREATE TABLE IF NOT EXISTS nafath_requests (
    id              VARCHAR(40)    PRIMARY KEY,             -- 32 hex chars
    national_id     VARCHAR(10)    NOT NULL,                -- Saudi National ID (10 digits)
    random_number   INT            NOT NULL CHECK (random_number BETWEEN 0 AND 99),
    status          nafath_status  NOT NULL DEFAULT 'WAITING',
    -- Filled when status = APPROVED (from NIC response)
    full_name       VARCHAR(200),
    birth_date      DATE,
    -- Provider mode: 'mock' for dev, 'live' for prod
    mode            VARCHAR(10)    NOT NULL DEFAULT 'mock',
    -- Lifecycle
    created_at      TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
    expires_at      TIMESTAMPTZ    NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_nafath_status_expires
    ON nafath_requests (status, expires_at);
CREATE INDEX IF NOT EXISTS idx_nafath_national_id
    ON nafath_requests (national_id, created_at DESC);

CREATE TRIGGER trg_nafath_updated_at
BEFORE UPDATE ON nafath_requests
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

COMMENT ON TABLE nafath_requests IS
    'Transient Nafath identity verification flows. Records older than 7 days should be purged.';

-- Cleanup helper (call from a cron / daily background job)
CREATE OR REPLACE FUNCTION purge_old_nafath_requests()
RETURNS INT AS $$
DECLARE
    purged INT;
BEGIN
    WITH deleted AS (
        DELETE FROM nafath_requests
        WHERE created_at < NOW() - INTERVAL '7 days'
        RETURNING 1
    )
    SELECT COUNT(*) INTO purged FROM deleted;
    RETURN purged;
END;
$$ LANGUAGE plpgsql;
