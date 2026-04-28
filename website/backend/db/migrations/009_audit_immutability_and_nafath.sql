-- Migration 009: Audit immutability + Nafath integration fields + new actions
-- ═══════════════════════════════════════════════════════════════════════════
-- Per Infath spec:
--   "قدرة النظامِ على مراقبة ومنع حذف السجلات الرئيسية مع حركاتها"
-- Per central req: National SSO (Nafath) for bidder authentication.

-- ─── 1. Audit log: enforce append-only ────────────────────────────────────
CREATE OR REPLACE FUNCTION audit_log_block_modifications()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'audit_log is APPEND-ONLY. Operation % blocked.', TG_OP
        USING ERRCODE = 'insufficient_privilege';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER audit_log_no_update
BEFORE UPDATE ON audit_log
FOR EACH ROW EXECUTE FUNCTION audit_log_block_modifications();

CREATE TRIGGER audit_log_no_delete
BEFORE DELETE ON audit_log
FOR EACH ROW EXECUTE FUNCTION audit_log_block_modifications();

CREATE TRIGGER audit_log_no_truncate
BEFORE TRUNCATE ON audit_log
FOR EACH STATEMENT EXECUTE FUNCTION audit_log_block_modifications();

REVOKE UPDATE, DELETE, TRUNCATE ON audit_log FROM PUBLIC;

-- ─── 2. Nafath identity fields on users ──────────────────────────────────
-- Per Infath: "تسجيل الدخول في البوابة الإلكترونية (باستخدام النفاذ الوطني الموحد)"
ALTER TABLE users
    ADD COLUMN IF NOT EXISTS nafath_id              VARCHAR(20),  -- Saudi National ID validated by Nafath
    ADD COLUMN IF NOT EXISTS nafath_verified_at     TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS nafath_verification_id VARCHAR(100), -- Nafath transaction reference
    ADD COLUMN IF NOT EXISTS nafath_full_name_ar    VARCHAR(200), -- canonical name from Nafath
    ADD COLUMN IF NOT EXISTS nafath_birth_date      DATE,
    ADD COLUMN IF NOT EXISTS nafath_nationality     VARCHAR(50);

CREATE UNIQUE INDEX IF NOT EXISTS idx_users_nafath_id
    ON users (nafath_id) WHERE nafath_id IS NOT NULL;

-- ─── 3. Wallet on users (refunds + deposits roll-over) ────────────────────
ALTER TABLE users
    ADD COLUMN IF NOT EXISTS wallet_balance         NUMERIC(15, 2) NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS wallet_held            NUMERIC(15, 2) NOT NULL DEFAULT 0;
    -- Note: wallet_balance = liquid funds; wallet_held = funds locked in active financial_holds
    -- Total user balance = wallet_balance + wallet_held

-- ─── 4. SAMA / FAL fields on properties ──────────────────────────────────
-- Per REGA: "إصدار رخصة فال للمزادات العقارية"
ALTER TABLE properties
    ADD COLUMN IF NOT EXISTS fal_license_number     VARCHAR(50),
    ADD COLUMN IF NOT EXISTS fal_license_verified_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS rega_property_id       VARCHAR(50);  -- REGA Mooj system reference

-- ─── 5. Extended audit actions (new ones for auctions) ───────────────────
-- These are documented constants; the audit Record() function in Go uses any string,
-- but documenting here for clarity / discoverability.
COMMENT ON COLUMN audit_log.action IS
    'Examples: ADMIN_LOGIN, ADMIN_LOGOUT, AUCTION_APPROVE, AUCTION_REJECT, ' ||
    'AUCTION_CREATE, AUCTION_PAUSE, AUCTION_RESUME, AUCTION_CANCEL, AUCTION_SETTLE, ' ||
    'BID_VOID, BIDDER_DISQUALIFY, HOLD_CREATE, HOLD_RELEASE, HOLD_FORFEIT, ' ||
    'NAFATH_VERIFY_INIT, NAFATH_VERIFY_SUCCESS, NAFATH_VERIFY_FAIL, ' ||
    'PROPERTY_FAL_VERIFY, USER_TOGGLE_ACTIVE, SECTION_TOGGLE_VISIBILITY, SECTION_REORDER';

-- ─── 6. Anti-tamper hash chain on audit_log (cryptographic) ──────────────
ALTER TABLE audit_log
    ADD COLUMN IF NOT EXISTS prev_log_hash CHAR(64),
    ADD COLUMN IF NOT EXISTS log_hash      CHAR(64);

-- Helper trigger: each audit row hash-chained to previous
CREATE OR REPLACE FUNCTION audit_log_chain_hash()
RETURNS TRIGGER AS $$
DECLARE
    last_hash CHAR(64);
BEGIN
    SELECT log_hash INTO last_hash
    FROM audit_log
    WHERE created_at < NEW.created_at
       OR (created_at = NEW.created_at AND id < NEW.id)
    ORDER BY created_at DESC, id DESC
    LIMIT 1;

    NEW.prev_log_hash := COALESCE(last_hash, REPEAT('0', 64));

    -- Hash = SHA-256 of canonical row
    NEW.log_hash := encode(
        digest(
            COALESCE(NEW.prev_log_hash, '') ||
            COALESCE(NEW.admin_id::TEXT, '') ||
            COALESCE(NEW.action, '') ||
            COALESCE(NEW.entity_type, '') ||
            COALESCE(NEW.entity_id, '') ||
            COALESCE(NEW.details::TEXT, '') ||
            COALESCE(NEW.created_at::TEXT, ''),
            'sha256'
        ),
        'hex'
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- pgcrypto extension needed for digest()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Trigger fires AFTER all checks but BEFORE physical insert (so we can set NEW.*)
CREATE TRIGGER trg_audit_log_chain
BEFORE INSERT ON audit_log
FOR EACH ROW EXECUTE FUNCTION audit_log_chain_hash();

COMMENT ON COLUMN audit_log.log_hash IS 'SHA-256 of (prev_hash + canonical row). Tamper-evident chain.';
COMMENT ON COLUMN audit_log.prev_log_hash IS 'Hash of preceding row in chronological order. Genesis = 0...0.';
