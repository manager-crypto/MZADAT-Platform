-- Migration 001: Properties table
-- Conforms to Saudi Real Estate Exchange (Mooj) data standards.
-- Bilingual columns (ar/en) satisfy Saudi national data localisation policy.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum types -----------------------------------------------------------------
CREATE TYPE property_type AS ENUM (
    'residential',  -- سكني
    'commercial',   -- تجاري
    'land',         -- أرض
    'farm'          -- مزرعة
);

CREATE TYPE property_status AS ENUM (
    'active',   -- نشط
    'sold',     -- مباع
    'auction',  -- في المزاد
    'pending'   -- قيد المراجعة
);

-- Main table -----------------------------------------------------------------
CREATE TABLE properties (
    id              BIGSERIAL PRIMARY KEY,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Mooj / Deed fields
    deed_number     VARCHAR(50)  UNIQUE,   -- رقم الصك
    plan_number     VARCHAR(50),           -- رقم المخطط
    block_number    VARCHAR(50),           -- رقم الحوض

    -- Bilingual content
    title_ar        VARCHAR(255) NOT NULL,
    title_en        VARCHAR(255) NOT NULL,
    description_ar  TEXT,
    description_en  TEXT,

    -- Location
    city_code       VARCHAR(50)  NOT NULL,  -- riyadh, jeddah, makkah, madinah …
    city_ar         VARCHAR(100) NOT NULL,
    city_en         VARCHAR(100) NOT NULL,
    district_ar     VARCHAR(100),
    district_en     VARCHAR(100),
    latitude        NUMERIC(10, 7),
    longitude       NUMERIC(10, 7),

    -- Property details
    type            property_type   NOT NULL DEFAULT 'residential',
    status          property_status NOT NULL DEFAULT 'active',
    area_sqm        NUMERIC(12, 2),
    bedrooms        SMALLINT DEFAULT 0,
    bathrooms       SMALLINT DEFAULT 0,
    floor_number    SMALLINT DEFAULT 0,
    total_floors    SMALLINT DEFAULT 0,

    -- Pricing (SAR)
    price_total     NUMERIC(15, 2),
    price_per_sqm   NUMERIC(12, 2),

    -- Auction fields (nullable for non-auction listings)
    auction_start   TIMESTAMPTZ,
    auction_end     TIMESTAMPTZ,
    starting_bid    NUMERIC(15, 2),
    current_bid     NUMERIC(15, 2),
    bid_increment   NUMERIC(12, 2),

    -- Media (stored as JSON array of URLs)
    image_urls      JSONB NOT NULL DEFAULT '[]',
    video_url       TEXT,

    -- Metadata
    owner_id        BIGINT NOT NULL DEFAULT 0,
    is_featured     BOOLEAN NOT NULL DEFAULT FALSE,
    view_count      INT NOT NULL DEFAULT 0
);

-- Indexes --------------------------------------------------------------------
CREATE INDEX idx_properties_city_code ON properties (city_code);
CREATE INDEX idx_properties_type      ON properties (type);
CREATE INDEX idx_properties_status    ON properties (status);
CREATE INDEX idx_properties_featured  ON properties (is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_properties_auction   ON properties (auction_end) WHERE status = 'auction';
CREATE INDEX idx_properties_price     ON properties (price_total);

-- Auto-update updated_at -----------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_properties_updated_at
BEFORE UPDATE ON properties
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Seed data (bilingual, Mooj-compliant) -------------------------------------
INSERT INTO properties (
    deed_number, title_ar, title_en,
    description_ar, description_en,
    city_code, city_ar, city_en,
    district_ar, district_en,
    type, status, area_sqm, bedrooms, bathrooms,
    price_total, price_per_sqm,
    is_featured, image_urls
) VALUES
(
    'DEED-2024-001',
    'فيلا فاخرة في حي النرجس',
    'Luxury Villa in Al-Narjis District',
    'فيلا راقية بتصميم عصري وموقع متميز في قلب الرياض',
    'An upscale villa with modern design in a prime Riyadh location',
    'riyadh', 'الرياض', 'Riyadh',
    'النرجس', 'Al-Narjis',
    'residential', 'active', 650.0, 5, 6,
    4500000.00, 6923.08,
    TRUE,
    '["https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1080"]'
),
(
    'DEED-2024-002',
    'شقة تجارية في برج المملكة',
    'Commercial Suite in Kingdom Tower',
    'مكتب فاخر في المبنى التجاري الأكثر تميزاً في الرياض',
    'Premium office space in Riyadh''s most prestigious commercial tower',
    'riyadh', 'الرياض', 'Riyadh',
    'العليا', 'Al-Olaya',
    'commercial', 'auction', 280.0, 0, 2,
    2800000.00, 10000.00,
    TRUE,
    '["https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1080"]'
),
(
    'DEED-2024-003',
    'أرض سكنية في حي الملقا',
    'Residential Land in Al-Malqa District',
    'أرض مستوية في حي الملقا بموقع استراتيجي',
    'Level residential plot in the strategic Al-Malqa district',
    'riyadh', 'الرياض', 'Riyadh',
    'الملقا', 'Al-Malqa',
    'land', 'active', 900.0, 0, 0,
    2700000.00, 3000.00,
    FALSE,
    '["https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1080"]'
),
(
    'DEED-2024-004',
    'فيلا مطلة على البحر في جدة',
    'Sea-View Villa in Jeddah',
    'فيلا بإطلالة رائعة على البحر الأحمر في شمال جدة',
    'Stunning Red Sea view villa in North Jeddah',
    'jeddah', 'جدة', 'Jeddah',
    'الشاطئ', 'Al-Shati',
    'residential', 'active', 820.0, 6, 7,
    7200000.00, 8780.49,
    TRUE,
    '["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1080"]'
);
