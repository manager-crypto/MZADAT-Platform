-- Site sections / pages manager
CREATE TABLE IF NOT EXISTS site_sections (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    name_ar     VARCHAR(100) NOT NULL,
    name_en     VARCHAR(100) NOT NULL,
    page        VARCHAR(50)  NOT NULL DEFAULT 'home',
    route       VARCHAR(100),
    icon        VARCHAR(50),
    sort_order  INT          NOT NULL DEFAULT 0,
    is_visible  BOOLEAN      NOT NULL DEFAULT true,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_site_sections_page_order ON site_sections(page, sort_order);

-- Seed default homepage sections
INSERT INTO site_sections (name_ar, name_en, page, route, icon, sort_order, is_visible) VALUES
  ('الرئيسية / Hero',          'Hero Banner',          'home', '/',                    'Layers',      1,  true),
  ('إحصائيات سريعة',           'Quick Stats',          'home', NULL,                   'BarChart2',   2,  true),
  ('المزادات المميزة',          'Featured Auctions',    'home', '/auctions',            'Gavel',       3,  true),
  ('الخدمات المتكاملة',         'Integrated Services',  'home', '/services',            'Briefcase',   4,  true),
  ('أكاديمية مزادات',           'Mzadat Academy',       'home', '/training',            'BookOpen',    5,  true),
  ('الاستشارات العقارية',        'Real Estate Consulting','home', '/consulting',          'UserCheck',   6,  true),
  ('البيع المباشر',             'Direct Sales',         'home', '/direct-sale-real-estate','ShoppingBag',7, true),
  ('شركاؤنا',                   'Our Partners',         'home', NULL,                   'Handshake',   8,  true),
  ('التذييل / Footer',          'Footer',               'home', NULL,                   'AlignBottom', 9,  true)
ON CONFLICT DO NOTHING;
