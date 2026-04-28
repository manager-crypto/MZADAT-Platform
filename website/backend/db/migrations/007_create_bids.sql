-- Migration 007: Bids table — IMMUTABLE, APPEND-ONLY
-- ═══════════════════════════════════════════════════════════════════════════
-- Per Infath operational requirements (Dec 2024):
--   "قدرة النظامِ على مراقبة ومنع حذف السجلات الرئيسية مع حركاتها"
--   → System must monitor and prevent deletion of master records and their transactions.
--
-- This is enforced at THREE levels:
--   1. SQL: REVOKE UPDATE, DELETE on bids table from all roles
--   2. Trigger: raise exception on any UPDATE/DELETE attempt
--   3. Audit log: every bid is mirrored into bid_audit_chain with hash chaining

CREATE TYPE bid_kind AS ENUM (
    'standard',     -- مزايدة عادية
    'auto',         -- مزايدة تلقائية (proxy bidding by user max-bid setting)
    'in_person',    -- مزايدة حضورية (recorded by auctioneer)
    'voided'        -- مُستبعدة (admin invalidated; original kept in chain)
);

CREATE TABLE bids (
    -- Composite PK: (auction_id, bid_seq) — preserves order, prevents gaps via trigger
    auction_id          UUID         NOT NULL REFERENCES auctions(id),
    bid_seq             BIGINT       NOT NULL,                  -- 1,2,3... per auction
    -- Identity
    id                  UUID         NOT NULL DEFAULT gen_random_uuid(),  -- global unique
    bidder_user_id      UUID         NOT NULL REFERENCES users(id),
    -- Bid details
    amount              NUMERIC(15, 2) NOT NULL CHECK (amount > 0),
    kind                bid_kind     NOT NULL DEFAULT 'standard',
    -- Anti-replay & idempotency (clients send unique key per bid attempt)
    idempotency_key     VARCHAR(64)  NOT NULL,
    -- Did this bid trigger a time extension?
    caused_extension    BOOLEAN      NOT NULL DEFAULT FALSE,
    extension_added_seconds INT,
    -- Network forensics
    ip_address          INET,
    user_agent          TEXT,
    -- Server timing (NOT client-supplied; set by DB)
    created_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    -- Cryptographic chaining (each bid hash = SHA256(prev_hash || canonical_bid_json))
    -- This makes the entire history tamper-evident even if DB is compromised.
    prev_hash           CHAR(64),                                -- hex SHA-256 of previous bid in same auction
    bid_hash            CHAR(64)     NOT NULL,                    -- hex SHA-256 of this bid
    -- Constraints
    PRIMARY KEY (auction_id, bid_seq),
    UNIQUE (id),
    UNIQUE (auction_id, idempotency_key)                          -- per-auction idempotency
);

-- Indexes
CREATE INDEX idx_bids_auction_amount       ON bids (auction_id, amount DESC);
CREATE INDEX idx_bids_bidder               ON bids (bidder_user_id, created_at DESC);
CREATE INDEX idx_bids_created_at           ON bids (created_at DESC);
CREATE INDEX idx_bids_kind_voided          ON bids (auction_id) WHERE kind = 'voided';

-- ═══════════════════════════════════════════════════════════════════════════
-- IMMUTABILITY ENFORCEMENT
-- ═══════════════════════════════════════════════════════════════════════════

-- 1. Revoke direct DML privileges from PUBLIC (only the bid-engine role inserts)
REVOKE UPDATE, DELETE, TRUNCATE ON bids FROM PUBLIC;

-- 2. Trigger: raise exception on any UPDATE attempt
CREATE OR REPLACE FUNCTION bids_block_modifications()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'bids table is APPEND-ONLY. Operation % is not permitted.', TG_OP
        USING ERRCODE = 'insufficient_privilege',
              HINT    = 'To void a bid, INSERT a new row with kind=voided referencing the original.';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER bids_no_update
BEFORE UPDATE ON bids
FOR EACH ROW EXECUTE FUNCTION bids_block_modifications();

CREATE TRIGGER bids_no_delete
BEFORE DELETE ON bids
FOR EACH ROW EXECUTE FUNCTION bids_block_modifications();

CREATE TRIGGER bids_no_truncate
BEFORE TRUNCATE ON bids
FOR EACH STATEMENT EXECUTE FUNCTION bids_block_modifications();

-- 3. Trigger: enforce sequence is contiguous (no gaps allowed)
CREATE OR REPLACE FUNCTION bids_enforce_sequence()
RETURNS TRIGGER AS $$
DECLARE
    expected_seq BIGINT;
BEGIN
    SELECT COALESCE(MAX(bid_seq), 0) + 1 INTO expected_seq
    FROM bids WHERE auction_id = NEW.auction_id;

    IF NEW.bid_seq != expected_seq THEN
        RAISE EXCEPTION 'bid_seq must be contiguous: expected %, got %',
            expected_seq, NEW.bid_seq;
    END IF;

    -- Auto-set prev_hash from preceding bid in same auction
    IF NEW.bid_seq = 1 THEN
        NEW.prev_hash := REPEAT('0', 64);  -- genesis
    ELSE
        SELECT bid_hash INTO NEW.prev_hash
        FROM bids
        WHERE auction_id = NEW.auction_id AND bid_seq = NEW.bid_seq - 1;

        IF NEW.prev_hash IS NULL THEN
            RAISE EXCEPTION 'cannot find previous bid for chaining';
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER bids_seq_check
BEFORE INSERT ON bids
FOR EACH ROW EXECUTE FUNCTION bids_enforce_sequence();

COMMENT ON TABLE  bids IS 'Immutable, append-only bid history. Each bid hash-chained to its predecessor.';
COMMENT ON COLUMN bids.bid_seq IS 'Per-auction monotonic sequence (1,2,3...). Gaps NOT allowed.';
COMMENT ON COLUMN bids.prev_hash IS 'SHA-256 of previous bid in chain. Genesis = 0...0.';
COMMENT ON COLUMN bids.bid_hash IS 'SHA-256 of canonical JSON of this bid. Computed by bid engine.';
COMMENT ON COLUMN bids.idempotency_key IS 'Client-supplied unique key to prevent duplicate submission.';
