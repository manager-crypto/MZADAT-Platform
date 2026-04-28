-- Migration 008: Financial holds (deposits / escrow)
-- Per Infath spec: "أن يدفع المشارك بالمزاد عبر منصة المزاد الإلكترونية مبلغًا
-- ماليًا كدفعة مقدمة بأي طريقة دفع أو ضمانات معتمدة لدى المركز إلكترونيًا"
--
-- Each bidder must place a deposit BEFORE participating in an auction.
-- Holds are released when:
--   - Bidder loses the auction → released back to bidder's wallet
--   - Bidder wins + pays full amount → released (deposit credited toward total)
--   - Bidder wins + fails to pay → forfeited (transferred to seller as penalty)

CREATE TYPE hold_status AS ENUM (
    'pending',     -- created, awaiting payment confirmation from SADAD/bank
    'active',      -- funds confirmed held; bidder may participate
    'released',    -- returned to bidder (lost auction or won + paid in full)
    'forfeited',   -- transferred to seller (won but defaulted)
    'cancelled'    -- admin cancelled before activation
);

CREATE TYPE hold_payment_method AS ENUM (
    'sadad',           -- سداد
    'mada',            -- مدى
    'bank_transfer',   -- حوالة بنكية
    'visa_mastercard', -- بطاقة ائتمان
    'apple_pay',       -- Apple Pay
    'wallet'           -- محفظة المنصة (rolled over from previous auction refund)
);

CREATE TABLE financial_holds (
    id                  UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    -- Who & what
    auction_id          UUID         NOT NULL REFERENCES auctions(id),
    bidder_user_id      UUID         NOT NULL REFERENCES users(id),
    -- Money (SAR, halalas precision)
    amount              NUMERIC(15, 2) NOT NULL CHECK (amount > 0),
    currency            CHAR(3)      NOT NULL DEFAULT 'SAR',
    -- Lifecycle
    status              hold_status  NOT NULL DEFAULT 'pending',
    payment_method      hold_payment_method NOT NULL,
    -- Provider references
    sadad_invoice_id    VARCHAR(100),                          -- when payment_method = 'sadad'
    sadad_bill_number   VARCHAR(100),
    payment_gateway_ref VARCHAR(200),                          -- generic transaction ID (Moyasar/HyperPay/etc.)
    payment_authorized_at TIMESTAMPTZ,                          -- when funds confirmed by gateway
    -- Release / forfeit
    released_at         TIMESTAMPTZ,
    released_amount     NUMERIC(15, 2),                         -- may differ if partial release
    release_reason      VARCHAR(50),                            -- 'auction_lost', 'auction_won_paid', 'admin_release', etc.
    forfeited_at        TIMESTAMPTZ,
    forfeit_reason      TEXT,
    -- Audit
    created_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    -- Constraints
    UNIQUE (auction_id, bidder_user_id),                        -- one hold per bidder per auction
    CONSTRAINT holds_release_consistent CHECK (
        (status != 'released' OR released_at IS NOT NULL)
        AND (status != 'forfeited' OR forfeited_at IS NOT NULL)
    )
);

CREATE INDEX idx_holds_auction_status      ON financial_holds (auction_id, status);
CREATE INDEX idx_holds_bidder              ON financial_holds (bidder_user_id, status);
CREATE INDEX idx_holds_pending_pmt         ON financial_holds (created_at) WHERE status = 'pending';
CREATE INDEX idx_holds_sadad               ON financial_holds (sadad_invoice_id) WHERE sadad_invoice_id IS NOT NULL;

CREATE TRIGGER trg_holds_updated_at
BEFORE UPDATE ON financial_holds
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Releases & forfeits should be APPEND-ONLY in terms of business logic.
-- We allow UPDATE (for status transitions) but block DELETE.
CREATE OR REPLACE FUNCTION holds_block_delete()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'financial_holds records cannot be deleted (audit requirement)';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER holds_no_delete
BEFORE DELETE ON financial_holds
FOR EACH ROW EXECUTE FUNCTION holds_block_delete();

REVOKE DELETE, TRUNCATE ON financial_holds FROM PUBLIC;

COMMENT ON TABLE financial_holds IS 'Pre-bid deposits + post-auction settlement tracking. Integrates with SADAD/Mada per Infath spec.';
