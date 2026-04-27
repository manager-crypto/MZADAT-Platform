import React, { useState } from 'react';
import {
  MapPin,
  Search,
  SlidersHorizontal,
  List,
  Map as MapIcon,
  Heart,
  Share2,
  Building2,
  Bath,
  Maximize,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Mock Data for Commercial Rent (bilingual)
const propertiesData = [
  {
    id: 1,
    title_ar: 'مكتب مفروش جاهز للعمل',
    title_en: 'Furnished Office Ready to Work',
    location_ar: 'الرياض، العليا',
    location_en: 'Riyadh, Al-Olaya',
    price: '120,000',
    rentTypeKey: 'annual',
    rooms: 4,
    baths: 2,
    area: '180 م²',
    isPremium: true,
    statusKey: 'forRent',
    features_ar: ['مفروش بالكامل', 'إنترنت سريع', 'استقبال'],
    features_en: ['Fully Furnished', 'Fast Internet', 'Reception'],
    image: 'https://images.unsplash.com/photo-1633975847368-a2b19b00bf44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXJuaXNoZWQlMjBvZmZpY2UlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzU2OTU0OTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    agent: {
      name_ar: 'مساحات الأعمال',
      name_en: 'Business Spaces',
      timeKey: '2h',
      logo: 'WS'
    }
  },
  {
    id: 2,
    title_ar: 'مستودع تخزين آمن',
    title_en: 'Secure Storage Warehouse',
    location_ar: 'الرياض، حي السلي',
    location_en: 'Riyadh, Al-Sali District',
    price: '85,000',
    rentTypeKey: 'annual',
    rooms: 1,
    baths: 2,
    area: '800 م²',
    isPremium: false,
    statusKey: 'forRent',
    features_ar: ['كاميرات مراقبة', 'دخول شاحنات', 'مساحة مفتوحة'],
    features_en: ['Security Cameras', 'Truck Access', 'Open Space'],
    image: 'https://images.unsplash.com/photo-1610463076431-2717271d692d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJlaG91c2UlMjBpbnRlcmlvciUyMHN0b3JhZ2V8ZW58MXx8fHwxNzc1Njk1NDkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    agent: {
      name_ar: 'مخازن السعودية',
      name_en: 'Saudi Warehouses',
      timeKey: '5h',
      logo: 'SM'
    }
  },
  {
    id: 3,
    title_ar: 'معرض تجاري واجهة 20م',
    title_en: 'Commercial Showroom with 20m Frontage',
    location_ar: 'الرياض، طريق الملك فهد',
    location_en: 'Riyadh, King Fahd Road',
    price: '350,000',
    rentTypeKey: 'annual',
    rooms: 2,
    baths: 1,
    area: '400 م²',
    isPremium: true,
    statusKey: 'forRent',
    features_ar: ['واجهة زجاجية', 'مواقف عملاء'],
    features_en: ['Glass Facade', 'Customer Parking'],
    image: 'https://images.unsplash.com/photo-1694885169342-909981fb408a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwd2FyZWhvdXNlJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzc1Njk1NDkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    agent: {
      name_ar: 'شركة العقار المتميز',
      name_en: 'Premium Real Estate Co.',
      timeKey: '3h',
      logo: 'RE'
    }
  },
  {
    id: 4,
    title_ar: 'مساحة عمل مشتركة للايجار',
    title_en: 'Shared Workspace for Rent',
    location_ar: 'الرياض، حي الصحافة',
    location_en: 'Riyadh, Al-Sahafa District',
    price: '5,000',
    rentTypeKey: 'monthly',
    rooms: 1,
    baths: 4,
    area: '25 م²',
    isPremium: false,
    statusKey: 'rented',
    features_ar: ['مشروبات مجانية', 'غرفة اجتماعات'],
    features_en: ['Free Beverages', 'Meeting Room'],
    image: 'https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzc1Njc1MTQxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    agent: {
      name_ar: 'هب للأعمال',
      name_en: 'Hub for Business',
      timeKey: '12h',
      logo: 'HB'
    }
  },
  {
    id: 5,
    title_ar: 'مستودع لوجستي ضخم',
    title_en: 'Large Logistics Warehouse',
    location_ar: 'الرياض، الصناعية الجديدة',
    location_en: 'Riyadh, New Industrial Area',
    price: '450,000',
    rentTypeKey: 'annual',
    rooms: 3,
    baths: 4,
    area: '2500 م²',
    isPremium: true,
    statusKey: 'forRent',
    features_ar: ['مواقف شاحنات', 'أسقف مرتفعة 12م'],
    features_en: ['Truck Parking', 'High Ceilings 12m'],
    image: 'https://images.unsplash.com/photo-1610463076431-2717271d692d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJlaG91c2UlMjBpbnRlcmlvciUyMHN0b3JhZ2V8ZW58MXx8fHwxNzc1Njk1NDkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    agent: {
      name_ar: 'الوسيط الصناعي',
      name_en: 'Industrial Broker',
      timeKey: '2d',
      logo: 'IB'
    }
  },
  {
    id: 6,
    title_ar: 'مكتب فاخر مؤثث بالكامل',
    title_en: 'Luxury Fully Furnished Office',
    location_ar: 'الرياض، حي الملقا',
    location_en: 'Riyadh, Al-Malqa District',
    price: '180,000',
    rentTypeKey: 'annual',
    rooms: 6,
    baths: 3,
    area: '280 م²',
    isPremium: true,
    statusKey: 'forRent',
    features_ar: ['مواقف قبو', 'أثاث ألماني', 'استقبال'],
    features_en: ['Basement Parking', 'German Furniture', 'Reception'],
    image: 'https://images.unsplash.com/photo-1633975847368-a2b19b00bf44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXJuaXNoZWQlMjBvZmZpY2UlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzU2OTU0OTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    agent: {
      name_ar: 'نخبة المكاتب',
      name_en: 'Elite Offices',
      timeKey: '2d',
      logo: 'NO'
    }
  },
];

const neighborhoodsData = [
  { name_ar: 'العليا', name_en: 'Al-Olaya', count: 120 },
  { name_ar: 'السلي', name_en: 'Al-Sali', count: 85 },
  { name_ar: 'طريق الملك فهد', name_en: 'King Fahd Road', count: 65 },
  { name_ar: 'الصناعية', name_en: 'Industrial Area', count: 40 },
  { name_ar: 'حي الصحافة', name_en: 'Al-Sahafa District', count: 35 },
];

interface CommercialRentPageProps {
  onPropertyClick?: (property: any) => void;
  onNavigate?: (page: string) => void;
}

export const CommercialRentPage: React.FC<CommercialRentPageProps> = ({ onPropertyClick, onNavigate }) => {
  const { t, i18n } = useTranslation();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [activeMapProperty, setActiveMapProperty] = useState<number | null>(null);

  const properties = propertiesData.map(p => ({
    ...p,
    title: i18n.language === 'en' ? p.title_en : p.title_ar,
    location: i18n.language === 'en' ? p.location_en : p.location_ar,
    features: i18n.language === 'en' ? p.features_en : p.features_ar,
    rentType: p.rentTypeKey === 'annual' ? t('commercialRent.rentTypeAnnual') : t('commercialRent.rentTypeMonthly'),
    agentName: i18n.language === 'en' ? p.agent.name_en : p.agent.name_ar,
    agentTime: t(`commercialRent.agentTime_${p.agent.timeKey}`),
    status: p.statusKey === 'rented' ? t('commercialRent.statusRented') : t('commercialRent.statusForRent'),
  }));

  const neighborhoods = neighborhoodsData.map(n => ({
    ...n,
    name: i18n.language === 'en' ? n.name_en : n.name_ar,
  }));

  return (
    <div className="min-h-screen bg-[#F8FAFB] pt-32 pb-20 font-sans">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6 flex flex-wrap items-center gap-2">
          <button onClick={() => onNavigate?.('home')} className="hover:text-[#47CCD0] transition-colors cursor-pointer font-medium">{t('wasataSale.breadcrumbHome')}</button>
          <span className="text-gray-300">/</span>
          <button onClick={() => onNavigate?.('commercial-rent')} className="hover:text-[#47CCD0] transition-colors cursor-pointer font-medium">{t('commercialRent.breadcrumb')}</button>
          <span className="text-gray-300">/</span>
          <span className="font-bold text-gray-900">{t('wasataSale.riyadh')}</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#2B3D50] mb-2">{t('commercialRent.pageTitle')}</h1>
            <p className="text-gray-500">{t('commercialRent.resultsFound', { count: properties.length * 15 })}</p>
          </div>

          {/* Quick Filters */}
          <div className="flex gap-2 bg-white p-1 rounded-xl shadow-sm border border-gray-100 overflow-x-auto hide-scrollbar">
            <button onClick={() => setViewMode('list')} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${viewMode === 'list' ? 'bg-[#47CCD0] text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
              <List size={18} /> {t('wasataSale.listView')}
            </button>
            <button onClick={() => setViewMode('map')} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${viewMode === 'map' ? 'bg-[#47CCD0] text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
              <MapIcon size={18} /> {t('wasataSale.mapView')}
            </button>
          </div>
        </div>

        {/* Filters and row */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Content (Right side in RTL) */}
          <div className="w-full lg:w-3/4 order-2 lg:order-1">
            <div className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 gap-4">
              <div className="w-full md:w-auto relative">
                <Search size={18} className="absolute end-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('wasataSale.searchPlaceholder')}
                  className="w-full md:w-[350px] ps-4 pe-12 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] bg-gray-50/50 transition-all text-sm"
                />
              </div>
              <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
                 <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50 whitespace-nowrap font-medium transition-colors">
                   <SlidersHorizontal size={16} /> {t('wasataSale.latestOffers')}
                 </button>
                 <select className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50 focus:outline-none cursor-pointer font-medium transition-colors appearance-none pe-8 relative bg-no-repeat" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: 'right 0.75rem center', backgroundSize: '1em' }}>
                   <option>{t('wasataSale.sortBy')} {t('wasataSale.newest')}</option>
                 </select>
              </div>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  onClick={() => onPropertyClick?.(property)}
                  onMouseEnter={() => setActiveMapProperty(property.id)}
                  onMouseLeave={() => setActiveMapProperty(null)}
                >
                  {/* Card Image */}
                  <div className="relative h-[220px] overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

                    {/* Tags */}
                    <div className="absolute top-4 end-4 flex gap-2">
                      <span className={`${property.statusKey === 'rented' ? 'bg-gray-600' : 'bg-[#47CCD0]'} text-white text-xs font-bold px-3 py-1 rounded-md`}>{property.status}</span>
                      {property.isPremium && (
                        <span className="bg-[#FFC107] text-[#2B3D50] text-xs font-bold px-3 py-1 rounded-md">{`★ ${t('wasataSale.featured')}`}</span>
                      )}
                    </div>

                    {/* Top Actions */}
                    <div className="absolute top-4 start-4 flex flex-col gap-2">
                      <button className="w-8 h-8 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#47CCD0] transition-colors" onClick={(e) => { e.stopPropagation(); }}>
                        <Heart size={14} />
                      </button>
                      <button className="w-8 h-8 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#47CCD0] transition-colors" onClick={(e) => { e.stopPropagation(); }}>
                        <Share2 size={14} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="absolute bottom-4 start-4 flex items-end gap-1">
                      <span className="text-white font-bold text-xl drop-shadow-md">
                        {property.price}
                      </span>
                      <span className="text-sm font-normal text-white/90 pb-1">
                        {t('commercialRent.currencyPerPeriod', { period: property.rentType })}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 mb-2 truncate group-hover:text-[#47CCD0] transition-colors">{property.title}</h3>
                    <div className="flex items-center text-gray-500 text-xs mb-4">
                      <MapPin size={14} className="ms-1 text-[#47CCD0]" />
                      {property.location}
                    </div>

                    {/* Specs */}
                    <div className="flex items-center justify-between py-3 border-t border-b border-gray-100 mb-4">
                      <div className="flex items-center gap-1.5 text-gray-700 text-sm">
                        <Building2 size={16} className="text-gray-400" />
                        <span className="font-bold">{property.rooms}</span>
                      </div>
                      <div className="w-px h-4 bg-gray-200"></div>
                      <div className="flex items-center gap-1.5 text-gray-700 text-sm">
                        <Bath size={16} className="text-gray-400" />
                        <span className="font-bold">{property.baths}</span>
                      </div>
                      <div className="w-px h-4 bg-gray-200"></div>
                      <div className="flex items-center gap-1.5 text-gray-700 text-sm">
                        <Maximize size={16} className="text-gray-400" />
                        <span className="font-bold dir-ltr">{property.area}</span>
                      </div>
                    </div>

                    {/* Features Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {property.features.map((feature, idx) => (
                        <span key={idx} className="bg-gray-50 text-gray-500 text-[10px] px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Footer Agent Info */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                          {property.agent.logo}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-gray-900 flex items-center gap-1">
                            {property.agentName}
                            <div className="w-1.5 h-1.5 rounded-full bg-[#47CCD0]"></div>
                          </div>
                          <div className="text-[10px] text-gray-400">{property.agentTime}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="w-8 h-8 rounded-full bg-[#E5F9FA] text-[#47CCD0] flex items-center justify-center hover:bg-[#47CCD0] hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); }}>
                          <MessageCircle size={14} />
                        </button>
                        <button className="w-8 h-8 rounded-full bg-[#E5F9FA] text-[#47CCD0] flex items-center justify-center hover:bg-[#47CCD0] hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); }}>
                          <Phone size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-10 flex justify-center">
               <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:border-[#47CCD0] hover:text-[#47CCD0] transition-colors">
                   {t('commercialRent.loadMore')}
               </button>
            </div>
          </div>

          {/* Sidebar (Left side in RTL) */}
          <div className="w-full lg:w-1/4 order-1 lg:order-2 flex flex-col gap-6">
            {/* Ad Banner */}
            <div className="bg-gradient-to-br from-[#2B3D50] to-[#1a2530] rounded-2xl p-6 text-white text-center relative overflow-hidden shadow-lg">
              <div className="absolute top-0 end-0 w-32 h-32 bg-[#47CCD0] rounded-full blur-3xl opacity-20 -me-10 -mt-10"></div>
              <div className="absolute bottom-0 start-0 w-32 h-32 bg-[#47CCD0] rounded-full blur-3xl opacity-20 -ms-10 -mb-10"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-3">{t('commercialRent.ctaTitle')}</h3>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed">{t('wasataSale.ctaDesc')}</p>
                <button className="w-full py-3 bg-[#47CCD0] hover:bg-[#3bb5b9] text-white rounded-xl font-bold transition-colors shadow-md">
                  {t('commercialRent.addPropertyFree')}
                </button>
              </div>
            </div>

            {/* Popular Neighborhoods */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin size={18} className="text-[#47CCD0]" />
                {t('commercialRent.popularNeighborhoods')}
              </h3>
              <div className="space-y-3">
                {neighborhoods.map((n, idx) => (
                  <button key={idx} className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors group">
                    <span className="text-sm font-medium text-gray-700 group-hover:text-[#47CCD0] transition-colors">{n.name}</span>
                    <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-md">{n.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
