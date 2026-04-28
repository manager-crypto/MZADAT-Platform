-- Migration 006: Auctions table
-- Decouples auction lifecycle from properties, supporting the full Infath flow:
--   scheduled → live → ended → settled (or cancelled)
--
-- A property may have multiple auctions over time (re-listing after no-sale).
-- Conforms to Infath operational requirements (Dec 2024 spec):
--   - Last-2-minutes extension: any bid in final 120s extends auction by 120s
--   - Mandatory deposit before participation
--   - Seller agent (وكيل البيع) ownership tracking
--   - Hybrid mode: electronic + in-person bidding

CREATE TYPE auction_status AS ENUM (
    'draft',       -- مسودة (created, not yet approved)
    'scheduled',   -- مجدول (approved, awaiting start time)
    'live',        -- مباشر (currently accepting bids)
    'paused',      -- موقوف (admin-paused, e.g. compliance issue)
    'ended',       -- منتهي (time elapsed; awaiting settlement)
    'settled',     -- مُسوّى (winner paid + asset transferred)
    'cancelled',   -- ملغي (admin cancelled before/during)
    'no_sale'      -- لم يُبَع (ended with no qualifying bids)
);

CREATE TYPE auction_mode AS ENUM (
    'electronic',  -- إلكتروني فقط
    'in_person',   -- حضوري فقط (electronic platform mirrors physical)
    'hybrid'       -- هجين (electronic + in-person concurrent)
);

CREATE TABLE auctions (
    id                       UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    -- Lifecycle
    status                   auction_status NOT NULL DEFAULT 'draft',
    mode                     auction_mode   NOT NULL DEFAULT 'electronic',
    -- Asset
    property_id              BIGINT       NOT NULL REFERENCES properties(id),
    -- Stakeholders
    seller_agent_id          UUID         REFERENCES users(id),  -- وكيل البيع
    infath_project_code      VARCHAR(50),                         -- Infath internal project ID
    -- Pricing (SAR, halalas precision via NUMERIC)
    starting_bid             NUMERIC(15, 2) NOT NULL CHECK (starting_bid >= 0),
    bid_increment            NUMERIC(12, 2) NOT NULL CHECK (bid_increment > 0),
    reserve_price            NUMERIC(15, 2),                      -- internal reserve (not shown to bidders)
    deposit_amount           NUMERIC(15, 2) NOT NULL CHECK (deposit_amount >= 0),
    -- Denormalized for hot-path reads (Source of truth: bids table SUM/MAX)
    current_bid              NUMERIC(15, 2),
    current_bid_user_id      UUID         REFERENCES users(id),
    bid_count                INT          NOT NULL DEFAULT 0,
    bidder_count             INT          NOT NULL DEFAULT 0,     -- distinct bidders
    -- Timing
    scheduled_start_at       TIMESTAMPTZ  NOT NULL,
    scheduled_end_at         TIMESTAMPTZ  NOT NULL,
    actual_start_at          TIMESTAMPTZ,                          -- when status flipped to 'live'
    actual_end_at            TIMESTAMPTZ,                          -- when status flipped to 'ended'
    -- Time-extension config (per Infath spec, default = 120s window, 120s extension)
    extension_window_seconds INT          NOT NULL DEFAULT 120 CHECK (extension_window_seconds > 0),
    extension_duration_seconds INT        NOT NULL DEFAULT 120 CHECK (extension_duration_seconds > 0),
    extension_count          INT          NOT NULL DEFAULT 0,     -- how many times has been extended
    max_extensions           INT          NOT NULL DEFAULT 50,    -- safety cap
    -- Settlement
    winner_user_id           UUID         REFERENCES users(id),
    winning_bid              NUMERIC(15, 2),
    settled_at               TIMESTAMPTZ,
    -- Audit
    created_at               TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at               TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    created_by_admin_id      UUID         REFERENCES admin_users(id),
    -- Integrity
    CONSTRAINT auctions_end_after_start CHECK (scheduled_end_at > scheduled_start_at),
    CONSTRAINT auctions_winner_consistent CHECK (
        (winner_user_id IS NULL AND winning_bid IS NULL AND settled_at IS NULL)
        OR (winner_user_id IS NOT NULL AND winning_bid IS NOT NULL)
    )
);

-- Indexes for hot-path queries
CREATE INDEX idx_auctions_status_end       ON auctions (status, scheduled_end_at);
CREATE INDEX idx_auctions_property         ON auctions (property_id);
CREATE INDEX idx_auctions_live             ON auctions (scheduled_end_at) WHERE status = 'live';
CREATE INDEX idx_auctions_seller           ON auctions (seller_agent_id, status);
CREATE INDEX idx_auctions_winner           ON auctions (winner_user_id) WHERE winner_user_id IS NOT NULL;

-- Auto-update updated_at
CREATE TRIGGER trg_auctions_updated_at
BEFORE UPDATE ON auctions
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Comments
COMMENT ON TABLE  auctions IS 'Auction lifecycle records. Decoupled from properties to allow re-listing.';
COMMENT ON COLUMN auctions.extension_window_seconds IS 'Bids in final N seconds trigger extension. Infath default: 120s.';
COMMENT ON COLUMN auctions.extension_duration_seconds IS 'How much time to add per extension. Infath default: 120s.';
COMMENT ON COLUMN auctions.deposit_amount IS 'Mandatory deposit (held in escrow) before bidder can participate.';
COMMENT ON COLUMN auctions.reserve_price IS 'Internal minimum sale price; if not met, auction ends as no_sale.';
COMMENT ON COLUMN auctions.current_bid IS 'Denormalized: max(bids.amount). Updated atomically by bid engine.';
