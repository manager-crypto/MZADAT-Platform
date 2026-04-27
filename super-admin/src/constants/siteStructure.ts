// src/constants/siteStructure.ts
// المصدر المركزي الوحيد لهيكل موقع مزادات
// Single source of truth for Mzadat website structure

// =============================================
// 1. الأنواع والواجهات (Types & Interfaces)
// =============================================

export type ItemType = "section" | "page";

export interface MzadatStructureItem {
  id: string;
  nameAr: string;
  nameEn: string;
  type: ItemType;
  icon: string; // lucide icon name
  isVisible: boolean;
  order: number;
  description: { ar: string; en: string };
  parentId?: string;
  isNew?: boolean;
  isScheduled?: boolean;
  schedule?: {
    startDate: string;
    endDate: string;
  };
}

// =============================================
// 2. المصفوفة الرئيسية (Main Structure Array)
// =============================================

export const MZADAT_STRUCTURE: MzadatStructureItem[] = [
  // ─────────────────────────────────────────────
  // أولاً: الأقسام الرئيسية (Homepage Sections)
  // ─────────────────────────────────────────────
  {
    id: "hero",
    nameAr: "البانر الرئيسي",
    nameEn: "Hero Banner",
    type: "section",
    icon: "ImageIcon",
    isVisible: true,
    order: 1,
    description: {
      ar: "صورة البانر الرئيسية في أعلى الصفحة",
      en: "Main hero banner at the top of the page",
    },
  },
  {
    id: "featured",
    nameAr: "المزادات المميزة",
    nameEn: "Featured Auctions",
    type: "section",
    icon: "Star",
    isVisible: true,
    order: 2,
    description: {
      ar: "عرض المزادات المختارة والمميزة",
      en: "Showcase selected featured auctions",
    },
  },
  {
    id: "latest",
    nameAr: "أحدث المزادات",
    nameEn: "Latest Auctions",
    type: "section",
    icon: "Flame",
    isVisible: true,
    order: 3,
    description: {
      ar: "آخر المزادات المضافة للمنصة",
      en: "Most recently added auctions",
    },
  },
  {
    id: "ending_soon",
    nameAr: "مزادات تنتهي قريباً",
    nameEn: "Ending Soon",
    type: "section",
    icon: "Clock",
    isVisible: true,
    order: 4,
    description: {
      ar: "مزادات على وشك الانتهاء",
      en: "Auctions about to close",
    },
  },
  {
    id: "cars_dept",
    nameAr: "قسم السيارات",
    nameEn: "Cars Section",
    type: "section",
    icon: "Car",
    isVisible: true,
    order: 5,
    description: {
      ar: "عرض مزادات السيارات",
      en: "Car auctions display",
    },
  },
  {
    id: "real_estate_dept",
    nameAr: "قسم العقارات",
    nameEn: "Real Estate Section",
    type: "section",
    icon: "Building2",
    isVisible: true,
    order: 6,
    description: {
      ar: "عرض مزادات العقارات",
      en: "Real estate auctions display",
    },
  },
  {
    id: "electronics",
    nameAr: "الإلكترونيات",
    nameEn: "Electronics",
    type: "section",
    icon: "Sparkles",
    isVisible: false,
    order: 7,
    description: {
      ar: "مزادات الأجهزة الإلكترونية",
      en: "Electronics auctions",
    },
  },
  {
    id: "top_bidders",
    nameAr: "أفضل المزايدين",
    nameEn: "Top Bidders",
    type: "section",
    icon: "Trophy",
    isVisible: true,
    order: 8,
    description: {
      ar: "لوحة شرف أفضل المزايدين",
      en: "Top bidders leaderboard",
    },
  },
  {
    id: "ad_banner",
    nameAr: "بانر الإعلانات",
    nameEn: "Ads Banner",
    type: "section",
    icon: "Megaphone",
    isVisible: true,
    order: 9,
    isScheduled: true,
    schedule: {
      startDate: "2026-03-01",
      endDate: "2026-04-30",
    },
    description: {
      ar: "شريط الإعلانات الترويجية",
      en: "Promotional ads banner strip",
    },
  },
  {
    id: "categories",
    nameAr: "شبكة التصنيفات",
    nameEn: "Categories Grid",
    type: "section",
    icon: "Layout",
    isVisible: true,
    order: 10,
    description: {
      ar: "عرض جميع تصنيفات المزادات",
      en: "All auction categories grid",
    },
  },
  {
    id: "partners",
    nameAr: "شعارات الشركاء",
    nameEn: "Partner Logos",
    type: "section",
    icon: "Handshake",
    isVisible: true,
    order: 11,
    description: {
      ar: "شعارات الشركاء والرعاة",
      en: "Partner and sponsor logos",
    },
  },
  {
    id: "youtube",
    nameAr: "فيديوهات يوتيوب",
    nameEn: "YouTube Videos",
    type: "section",
    icon: "Youtube",
    isVisible: false,
    order: 12,
    description: {
      ar: "مقاطع الفيديو الترويجية",
      en: "Promotional video content",
    },
  },

  // ─────────────────────────────────────────────
  // ثانياً: صفحات القسم السكني (Residential)
  // ─────────────────────────────────────────────
  {
    id: "residential",
    nameAr: "سكني",
    nameEn: "Residential",
    type: "page",
    icon: "Home",
    isVisible: true,
    order: 13,
    description: {
      ar: "صفحة القسم السكني الرئيسية",
      en: "Main residential section page",
    },
  },
  {
    id: "residential_sale",
    nameAr: "سكني - للبيع",
    nameEn: "Residential - For Sale",
    type: "page",
    icon: "Tag",
    isVisible: true,
    order: 14,
    parentId: "residential",
    description: {
      ar: "عروض البيع في منطقتك",
      en: "Sale listings in your area",
    },
  },
  {
    id: "residential_rent",
    nameAr: "سكني - للإيجار",
    nameEn: "Residential - For Rent",
    type: "page",
    icon: "Key",
    isVisible: true,
    order: 15,
    parentId: "residential",
    description: {
      ar: "عروض الإيجار في منطقتك",
      en: "Rental listings in your area",
    },
  },
  {
    id: "residential_daily",
    nameAr: "سكني - إيجار يومي",
    nameEn: "Residential - Daily Rental",
    type: "page",
    icon: "Tent",
    isVisible: true,
    order: 16,
    parentId: "residential",
    description: {
      ar: "شاليهات، استراحات، مخيمات",
      en: "Chalets, resorts, camps",
    },
  },

  // ─────────────────────────────────────────────
  // ثالثاً: صفحات القسم التجاري (Commercial)
  // ─────────────────────────────────────────────
  {
    id: "commercial",
    nameAr: "تجاري",
    nameEn: "Commercial",
    type: "page",
    icon: "Briefcase",
    isVisible: true,
    order: 17,
    isNew: true,
    description: {
      ar: "صفحة القسم التجاري الرئيسية",
      en: "Main commercial section page",
    },
  },
  {
    id: "commercial_sale",
    nameAr: "تجاري - للبيع",
    nameEn: "Commercial - For Sale",
    type: "page",
    icon: "Tag",
    isVisible: true,
    order: 18,
    parentId: "commercial",
    description: {
      ar: "عروض البيع التجارية في منطقتك",
      en: "Commercial sale listings in your area",
    },
  },
  {
    id: "commercial_rent",
    nameAr: "تجاري - للإيجار",
    nameEn: "Commercial - For Rent",
    type: "page",
    icon: "Key",
    isVisible: true,
    order: 19,
    parentId: "commercial",
    description: {
      ar: "عروض الإيجار التجارية في منطقتك",
      en: "Commercial rental listings in your area",
    },
  },

  // ─────────────────────────────────────────────
  // رابعاً: صفحات القائمة المنسدلة (Dropdown)
  // ─────────────────────────────────────────────
  {
    id: "auctions_page",
    nameAr: "المزادات",
    nameEn: "Auctions",
    type: "page",
    icon: "Gavel",
    isVisible: true,
    order: 20,
    description: {
      ar: "صفحة المزادات الرئيسية في القائمة المنسدلة",
      en: "Main auctions page in dropdown menu",
    },
  },
  {
    id: "instant_buy",
    nameAr: "شراء فوري",
    nameEn: "Instant Buy",
    type: "page",
    icon: "Zap",
    isVisible: true,
    order: 21,
    description: {
      ar: "صفحة الشراء الفوري بدون مزاد",
      en: "Instant buy page without auction",
    },
  },
  {
    id: "real_estate_page",
    nameAr: "العقارات",
    nameEn: "Real Estate",
    type: "page",
    icon: "Building2",
    isVisible: true,
    order: 22,
    parentId: "auctions_page",
    description: {
      ar: "فلل، أراضي، عمائر",
      en: "Villas, lands, buildings",
    },
  },
  {
    id: "cars_page",
    nameAr: "السيارات",
    nameEn: "Cars",
    type: "page",
    icon: "Car",
    isVisible: true,
    order: 23,
    parentId: "auctions_page",
    description: {
      ar: "مركبات ومركبات ثقيلة",
      en: "Vehicles and heavy vehicles",
    },
  },
  {
    id: "plates",
    nameAr: "لوحات السيارات",
    nameEn: "Car Plates",
    type: "page",
    icon: "CreditCard",
    isVisible: true,
    order: 24,
    parentId: "auctions_page",
    description: {
      ar: "أرقام مميزة",
      en: "Special plate numbers",
    },
  },
  {
    id: "others",
    nameAr: "أخرى",
    nameEn: "Other",
    type: "page",
    icon: "Package",
    isVisible: true,
    order: 25,
    parentId: "auctions_page",
    description: {
      ar: "كمبيوترات، معدات، آليات...",
      en: "Computers, equipment, machinery...",
    },
  },

  // ─────────────────────────────────────────────
  // خامساً: صفحات مستقلة (Standalone Pages)
  // ─────────────────────────────────────────────
  {
    id: "master_plans",
    nameAr: "المخططات",
    nameEn: "Plans",
    type: "page",
    icon: "Grid3X3",
    isVisible: true,
    order: 26,
    description: {
      ar: "صفحة المخططات والخرائط العقارية",
      en: "Real estate plans and maps page",
    },
  },
  {
    id: "extra_services",
    nameAr: "الخدمات الإضافية",
    nameEn: "Extra Services",
    type: "page",
    icon: "LayoutGrid",
    isVisible: true,
    order: 27,
    description: {
      ar: "خدمات إضافية متنوعة للمستخدمين",
      en: "Various additional services for users",
    },
  },
  {
    id: "jobs",
    nameAr: "الوظائف",
    nameEn: "Jobs",
    type: "page",
    icon: "BriefcaseBusiness",
    isVisible: true,
    order: 28,
    description: {
      ar: "صفحة الوظائف والتوظيف في مزادات",
      en: "Mzadat careers and job listings page",
    },
  },
];

// =============================================
// 3. دوال مساعدة (Helper Functions)
// =============================================

/** الحصول على الأقسام فقط */
export const getSections = () =>
  MZADAT_STRUCTURE.filter((item) => item.type === "section");

/** الحصول على الصفحات فقط */
export const getPages = () =>
  MZADAT_STRUCTURE.filter((item) => item.type === "page");

/** الحصول على العناصر المرئية فقط */
export const getVisibleItems = () =>
  MZADAT_STRUCTURE.filter((item) => item.isVisible);

/** الحصول على العناصر المجدولة */
export const getScheduledItems = () =>
  MZADAT_STRUCTURE.filter((item) => item.isScheduled);

/** الحصول على العناصر الجديدة */
export const getNewItems = () =>
  MZADAT_STRUCTURE.filter((item) => item.isNew);

/** الحصول على العناصر الفرعية لعنصر أب */
export const getChildrenOf = (parentId: string) =>
  MZADAT_STRUCTURE.filter((item) => item.parentId === parentId);

/** الحصول على العناصر الجذرية (بدون أب) */
export const getRootItems = () =>
  MZADAT_STRUCTURE.filter((item) => !item.parentId);

/** الحصول على العناصر مرتبة */
export const getSortedItems = () =>
  [...MZADAT_STRUCTURE].sort((a, b) => a.order - b.order);

/** البحث في العناصر */
export const searchItems = (query: string) => {
  const q = query.toLowerCase();
  return MZADAT_STRUCTURE.filter(
    (item) =>
      item.nameAr.includes(q) ||
      item.nameEn.toLowerCase().includes(q) ||
      item.description.ar.includes(q) ||
      item.description.en.toLowerCase().includes(q)
  );
};

/** الحصول على عنصر بالمعرف */
export const getItemById = (id: string) =>
  MZADAT_STRUCTURE.find((item) => item.id === id);

/** إحصائيات سريعة */
export const getStats = () => ({
  total: MZADAT_STRUCTURE.length,
  sections: getSections().length,
  pages: getPages().length,
  visible: getVisibleItems().length,
  hidden: MZADAT_STRUCTURE.length - getVisibleItems().length,
  scheduled: getScheduledItems().length,
  newItems: getNewItems().length,
});
