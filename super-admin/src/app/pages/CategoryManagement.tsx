import {
  Tag, Plus, Edit, Trash2, Eye, Search, ChevronRight, ChevronDown,
  Building2, Home, Factory, Wheat, Map, Store, Layers, GripVertical,
  ToggleLeft, ToggleRight, Image, FileText
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "../context/TranslationContext";
import { useState } from "react";

interface Category {
  id: string;
  nameAr: string;
  nameEn: string;
  icon: any;
  color: string;
  auctionsCount: number;
  activeAuctions: number;
  enabled: boolean;
  subcategories: { id: string; nameAr: string; nameEn: string; count: number; enabled: boolean }[];
}

const categories: Category[] = [
  {
    id: "CAT-001", nameAr: "سكني", nameEn: "Residential", icon: Home, color: "#47CCD0",
    auctionsCount: 345, activeAuctions: 18, enabled: true,
    subcategories: [
      { id: "SC-001", nameAr: "فيلا", nameEn: "Villa", count: 120, enabled: true },
      { id: "SC-002", nameAr: "شقة", nameEn: "Apartment", count: 95, enabled: true },
      { id: "SC-003", nameAr: "دوبلكس", nameEn: "Duplex", count: 48, enabled: true },
      { id: "SC-004", nameAr: "تاون هاوس", nameEn: "Townhouse", count: 32, enabled: true },
      { id: "SC-005", nameAr: "قصر", nameEn: "Palace", count: 50, enabled: true },
    ]
  },
  {
    id: "CAT-002", nameAr: "تجاري", nameEn: "Commercial", icon: Building2, color: "#6366F1",
    auctionsCount: 189, activeAuctions: 8, enabled: true,
    subcategories: [
      { id: "SC-006", nameAr: "مكتب", nameEn: "Office", count: 67, enabled: true },
      { id: "SC-007", nameAr: "محل", nameEn: "Shop", count: 55, enabled: true },
      { id: "SC-008", nameAr: "مجمع تجاري", nameEn: "Commercial Complex", count: 42, enabled: true },
      { id: "SC-009", nameAr: "فندق", nameEn: "Hotel", count: 25, enabled: true },
    ]
  },
  {
    id: "CAT-003", nameAr: "صناعي", nameEn: "Industrial", icon: Factory, color: "#F59E0B",
    auctionsCount: 78, activeAuctions: 4, enabled: true,
    subcategories: [
      { id: "SC-010", nameAr: "مستودع", nameEn: "Warehouse", count: 35, enabled: true },
      { id: "SC-011", nameAr: "مصنع", nameEn: "Factory", count: 28, enabled: true },
      { id: "SC-012", nameAr: "ورشة", nameEn: "Workshop", count: 15, enabled: true },
    ]
  },
  {
    id: "CAT-004", nameAr: "زراعي", nameEn: "Agricultural", icon: Wheat, color: "#10B981",
    auctionsCount: 56, activeAuctions: 3, enabled: true,
    subcategories: [
      { id: "SC-013", nameAr: "مزرعة", nameEn: "Farm", count: 34, enabled: true },
      { id: "SC-014", nameAr: "أرض زراعية", nameEn: "Agricultural Land", count: 22, enabled: true },
    ]
  },
  {
    id: "CAT-005", nameAr: "أراضي", nameEn: "Land", icon: Map, color: "#8B5CF6",
    auctionsCount: 234, activeAuctions: 12, enabled: true,
    subcategories: [
      { id: "SC-015", nameAr: "أرض سكنية", nameEn: "Residential Land", count: 98, enabled: true },
      { id: "SC-016", nameAr: "أرض تجارية", nameEn: "Commercial Land", count: 76, enabled: true },
      { id: "SC-017", nameAr: "أرض خام", nameEn: "Raw Land", count: 60, enabled: true },
    ]
  },
  {
    id: "CAT-006", nameAr: "منقولات", nameEn: "Movables", icon: Store, color: "#EC4899",
    auctionsCount: 45, activeAuctions: 2, enabled: false,
    subcategories: [
      { id: "SC-018", nameAr: "مركبات", nameEn: "Vehicles", count: 25, enabled: true },
      { id: "SC-019", nameAr: "معدات", nameEn: "Equipment", count: 20, enabled: false },
    ]
  },
];

export default function CategoryManagement() {
  const { theme } = useTheme();
  const { language, direction } = useTranslation();
  const isDark = theme === 'dark';
  const isRTL = direction === 'rtl';
  const [expandedCat, setExpandedCat] = useState<string | null>("CAT-001");
  const [searchTerm, setSearchTerm] = useState("");

  const totalAuctions = categories.reduce((s, c) => s + c.auctionsCount, 0);
  const totalActive = categories.reduce((s, c) => s + c.activeAuctions, 0);
  const totalSubs = categories.reduce((s, c) => s + c.subcategories.length, 0);

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className={`flex items-start justify-between flex-wrap gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : ''}>
          <h1 className={`mzadat-h1 ${isDark ? 'text-[#F1F5F9]' : 'text-[#2B3D50]'}`}>
            {language === 'ar' ? 'إدارة التصنيفات' : 'Category Management'}
          </h1>
          <p className={`mzadat-body ${isDark ? 'text-[#94A3B8]' : 'text-[#6B7280]'} mt-2`}>
            {language === 'ar' ? 'إدارة تصنيفات العقارات والأصول في منصة المزادات' : 'Manage property and asset classifications on the auction platform'}
          </p>
        </div>
        <Button className="bg-[#47CCD0] hover:bg-[#3ab5b0] text-white gap-2">
          <Plus className="w-4 h-4" />{language === 'ar' ? 'تصنيف جديد' : 'New Category'}
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { labelAr: "إجمالي التصنيفات", labelEn: "Total Categories", value: categories.length, sub: `${totalSubs} ${language === 'ar' ? 'تصنيف فرعي' : 'subcategories'}` },
          { labelAr: "إجمالي المزادات", labelEn: "Total Auctions", value: totalAuctions, sub: language === 'ar' ? 'عبر جميع التصنيفات' : 'Across all categories' },
          { labelAr: "مزادات نشطة", labelEn: "Active Auctions", value: totalActive, sub: language === 'ar' ? 'حالياً' : 'Currently' },
        ].map((s, i) => (
          <Card key={i} className={`border-0 ${isDark ? 'bg-[#1A2836]' : 'bg-white shadow-sm'}`}>
            <CardContent className={`p-4 ${isRTL ? 'text-right' : ''}`}>
              <p className={`text-[12px] ${isDark ? 'text-[#94A3B8]' : 'text-[#6B7280]'}`}>{language === 'ar' ? s.labelAr : s.labelEn}</p>
              <p className={`text-2xl font-helvetica mt-1 ${isDark ? 'text-[#F1F5F9]' : 'text-[#1F2937]'}`} style={{ fontVariantNumeric: 'tabular-nums' }}>{s.value}</p>
              <p className={`text-[11px] mt-1 ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'}`}>{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className={`relative max-w-md ${isRTL ? 'mr-0 ml-auto' : ''}`}>
        <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-[#94A3B8]' : 'text-gray-400'} ${isRTL ? 'right-3' : 'left-3'}`} />
        <input
          type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
          placeholder={language === 'ar' ? 'بحث في التصنيفات...' : 'Search categories...'}
          className={`w-full py-2 rounded-lg border text-sm ${isRTL ? 'pr-10 pl-3 text-right' : 'pl-10 pr-3'} ${
            isDark ? 'bg-[#0F1923] border-[#2B3D50] text-[#F1F5F9]' : 'bg-gray-50 border-gray-200 text-gray-900'
          }`}
        />
      </div>

      {/* Categories List */}
      <div className="space-y-3">
        {categories.filter(c => 
          !searchTerm || c.nameAr.includes(searchTerm) || c.nameEn.toLowerCase().includes(searchTerm.toLowerCase())
        ).map(cat => {
          const isExpanded = expandedCat === cat.id;
          return (
            <Card key={cat.id} className={`border-0 overflow-hidden ${isDark ? 'bg-[#1A2836]' : 'bg-white shadow-sm'}`}>
              <div
                className={`p-4 flex items-center gap-4 cursor-pointer transition-colors ${isRTL ? 'flex-row-reverse' : ''} ${
                  isDark ? 'hover:bg-[#162230]' : 'hover:bg-gray-50'
                }`}
                onClick={() => setExpandedCat(isExpanded ? null : cat.id)}
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${cat.color}1A` }}>
                  <cat.icon className="w-6 h-6" style={{ color: cat.color }} />
                </div>

                {/* Info */}
                <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
                  <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <h3 className={`text-[15px] ${isDark ? 'text-[#F1F5F9]' : 'text-[#2B3D50]'}`}>
                      {language === 'ar' ? cat.nameAr : cat.nameEn}
                    </h3>
                    {!cat.enabled && (
                      <Badge variant="outline" className="text-[10px] text-red-500 border-red-200">{language === 'ar' ? 'معطل' : 'Disabled'}</Badge>
                    )}
                  </div>
                  <p className={`text-[12px] ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'}`}>
                    {cat.subcategories.length} {language === 'ar' ? 'تصنيف فرعي' : 'subcategories'}
                  </p>
                </div>

                {/* Stats */}
                <div className={`hidden sm:flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`text-center ${isRTL ? 'text-right' : ''}`}>
                    <p className={`text-[18px] font-helvetica ${isDark ? 'text-[#F1F5F9]' : 'text-[#1F2937]'}`} style={{ fontVariantNumeric: 'tabular-nums' }}>{cat.auctionsCount}</p>
                    <p className={`text-[11px] ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'}`}>{language === 'ar' ? 'مزاد' : 'Auctions'}</p>
                  </div>
                  <div className={`text-center ${isRTL ? 'text-right' : ''}`}>
                    <p className="text-[18px] font-helvetica text-[#47CCD0]" style={{ fontVariantNumeric: 'tabular-nums' }}>{cat.activeAuctions}</p>
                    <p className={`text-[11px] ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'}`}>{language === 'ar' ? 'نشط' : 'Active'}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Button variant="ghost" size="sm" className="p-2" onClick={e => e.stopPropagation()}><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm" className="p-2" onClick={e => e.stopPropagation()}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                  {isExpanded ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className={`w-5 h-5 text-gray-400 ${isRTL ? 'rotate-180' : ''}`} />}
                </div>
              </div>

              {/* Subcategories */}
              {isExpanded && (
                <div className={`px-4 pb-4 ${isRTL ? 'pr-20' : 'pl-20'}`}>
                  <div className={`border-t ${isDark ? 'border-[#2B3D50]' : 'border-gray-100'} pt-3`}>
                    <div className="space-y-2">
                      {cat.subcategories.map(sub => (
                        <div key={sub.id} className={`flex items-center gap-3 p-2.5 rounded-lg ${isDark ? 'bg-[#0F1923]' : 'bg-gray-50'} ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }}></div>
                          <span className={`flex-1 text-[13px] ${isDark ? 'text-[#F1F5F9]' : 'text-gray-700'} ${isRTL ? 'text-right' : ''}`}>
                            {language === 'ar' ? sub.nameAr : sub.nameEn}
                          </span>
                          <span className={`text-[12px] font-helvetica ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'}`} style={{ fontVariantNumeric: 'tabular-nums' }}>
                            {sub.count} {language === 'ar' ? 'مزاد' : 'auctions'}
                          </span>
                          {!sub.enabled && <Badge variant="outline" className="text-[9px] text-red-400 border-red-200">{language === 'ar' ? 'معطل' : 'Off'}</Badge>}
                          <Button variant="ghost" size="sm" className="p-1.5" onClick={e => e.stopPropagation()}><Edit className="w-3 h-3" /></Button>
                        </div>
                      ))}
                      <Button variant="ghost" size="sm" className={`text-[#47CCD0] gap-1 mt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Plus className="w-3 h-3" />{language === 'ar' ? 'إضافة تصنيف فرعي' : 'Add Subcategory'}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
