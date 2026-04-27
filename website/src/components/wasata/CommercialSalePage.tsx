import React, { useState } from 'react';
import { LocationSelector } from '../ui/LocationSelector';
import { FilterBar } from '../ui/FilterBar';
import {
  MapPin,
  Search,
  ChevronDown,
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
  Home,
  X
} from 'lucide-react';
import { RiyalSymbol } from '../ui/RiyalSymbol';
import { useTranslation } from 'react-i18next';

// Mock Data for Commercial Real Estate (bilingual)
const propertiesData = [
  {
    id: 1,
    title_ar: 'مساحة مكتبية فاخرة في العليا',
    title_en: 'Luxury Office Space in Al-Olaya',
    location_ar: 'الرياض، العليا',
    location_en: 'Riyadh, Al-Olaya',
    price: '15,000,000',
    rooms: 12,
    baths: 4,
    area: '800 م²',
    isPremium: true,
    statusKey: 'forSale',
    features_ar: ['مواقف مخصصة', 'دخول ذكي', 'إطلالة بانورامية'],
    features_en: ['Dedicated Parking', 'Smart Access', 'Panoramic View'],
    image: 'https://images.unsplash.com/photo-1760246964044-1384f71665b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb3Jwb3JhdGUlMjBvZmZpY2UlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc3MjY3NDk0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    agent: {
      name_ar: 'العقار الذهبي',
      name_en: 'Golden Real Estate',
      timeKey: '2h',
      logo: 'AG'
    }
  },
  {
    id: 2,
    title_ar: 'معرض تجاري بموقع استراتيجي',
    title_en: 'Commercial Showroom in Strategic Location',
    location_ar: 'الرياض، طريق الملك فهد',
    location_en: 'Riyadh, King Fahd Road',
    price: '8,500,000',
    rooms: 1,
    baths: 2,
    area: '350 م²',
    isPremium: false,
    statusKey: 'removed',
    features_ar: ['واجهة زجاجية', 'مساحة مفتوحة'],
    features_en: ['Glass Facade', 'Open Space'],
    image: 'https://images.unsplash.com/photo-1766802981816-732b1679a6eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBzdG9yZSUyMHNob3dyb29tJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzc1Njk0NzY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    agent: {
      name_ar: 'إعمار المكاتب',
      name_en: 'Emaar Offices',
      timeKey: '5h',
      logo: 'EM'
    }
  },
  {
    id: 3,
    title_ar: 'محل تجاري في مجمع حديث',
    title_en: 'Retail Shop in Modern Complex',
    location_ar: 'الرياض، حي الصحافة',
    location_en: 'Riyadh, Al-Sahafa District',
    price: '3,200,000',
    rooms: 2,
    baths: 1,
    area: '120 م²',
    isPremium: true,
    statusKey: 'sold',
    features_ar: ['تشطيب فاخر', 'مواقف مجانية'],
    features_en: ['Luxury Finish', 'Free Parking'],
    image: 'https://images.unsplash.com/photo-1774876203004-461433250ada?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb21tZXJjaWFsJTIwcmV0YWlsJTIwc2hvcHxlbnwxfHx8fDE3NzU2OTQ3Njd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    agent: {
      name_ar: 'شركة العقار المتميز',
      name_en: 'Premium Real Estate Co.',
      timeKey: '3h',
      logo: 'RE'
    }
  },
  {
    id: 4,
    title_ar: 'مكتب تجاري بتصميم عصري',
    title_en: 'Modern-Design Commercial Office',
    location_ar: 'الرياض، حي النرجس',
    location_en: 'Riyadh, Al-Narjis District',
    price: '4,500,000',
    rooms: 6,
    baths: 3,
    area: '450 م²',
    isPremium: false,
    statusKey: 'forSale',
    features_ar: ['إنترنت سريع', 'غرفة اجتماعات'],
    features_en: ['Fast Internet', 'Meeting Room'],
    image: 'https://images.unsplash.com/photo-1728578365503-940dfa121627?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBpbnRlcmlvciUyMHNwYWNlfGVufDF8fHx8MTc3NTY5NDc2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    agent: {
      name_ar: 'مجموعة التطوير',
      name_en: 'Development Group',
      timeKey: '12h',
      logo: 'MD'
    }
  },
  {
    id: 5,
    title_ar: 'معرض سيارات بمساحة كبيرة',
    title_en: 'Large Car Showroom',
    location_ar: 'الرياض، حي القيروان',
    location_en: 'Riyadh, Al-Qairawan District',
    price: '22,000,000',
    rooms: 3,
    baths: 4,
    area: '1500 م²',
    isPremium: false,
    statusKey: 'forSale',
    features_ar: ['مواقف زوار', 'واجهة 40 متر'],
    features_en: ['Visitor Parking', '40m Frontage'],
    image: 'https://images.unsplash.com/photo-1758691736933-bb0f88fe2e0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwb2ZmaWNlJTIwc3BhY2UlMjBtb2Rlcm4lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzI3MzcwMzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    agent: {
      name_ar: 'الوسيط الذهبي',
      name_en: 'Golden Broker',
      timeKey: '2d',
      logo: 'GB'
    }
  },
  {
    id: 6,
    title_ar: 'مجمع مكاتب كامل للبيع',
    title_en: 'Complete Office Complex for Sale',
    location_ar: 'الرياض، حي الملقا',
    location_en: 'Riyadh, Al-Malqa District',
    price: '35,000,000',
    rooms: 24,
    baths: 12,
    area: '3000 م²',
    isPremium: true,
    statusKey: 'forSale',
    features_ar: ['مواقف قبو', 'مصاعد', 'استقبال'],
    features_en: ['Basement Parking', 'Elevators', 'Reception'],
    image: 'https://images.unsplash.com/photo-1760246964044-1384f71665b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb3Jwb3JhdGUlMjBvZmZpY2UlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc3MjY3NDk0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    agent: {
      name_ar: 'نخبة العقار',
      name_en: 'Elite Real Estate',
      timeKey: '2d',
      logo: 'NE'
    }
  },
];

const neighborhoodsData = [
  { name_ar: 'العليا', name_en: 'Al-Olaya', count: 120 },
  { name_ar: 'حي الصحافة', name_en: 'Al-Sahafa District', count: 85 },
  { name_ar: 'طريق الملك فهد', name_en: 'King Fahd Road', count: 65 },
  { name_ar: 'حي النرجس', name_en: 'Al-Narjis District', count: 40 },
  { name_ar: 'حي الملقا', name_en: 'Al-Malqa District', count: 35 },
];

interface CommercialSalePageProps {
  onPropertyClick?: (property: any) => void;
  onNavigate?: (page: string) => void;
}

export const CommercialSalePage: React.FC<CommercialSalePageProps> = ({ onPropertyClick, onNavigate }) => {
  const { t, i18n } = useTranslation();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [activeMapProperty, setActiveMapProperty] = useState<number | null>(null);

  const properties = propertiesData.map(p => ({
    ...p,
    title: i18n.language === 'en' ? p.title_en : p.title_ar,
    location: i18n.language === 'en' ? p.location_en : p.location_ar,
    features: i18n.language === 'en' ? p.features_en : p.features_ar,
    agentName: i18n.language === 'en' ? p.agent.name_en : p.agent.name_ar,
    agentTime: t(`commercialSale.agentTime_${p.agent.timeKey}`),
    status: p.statusKey === 'sold' ? t('wasataSale.statusSold')
          : p.statusKey === 'removed' ? t('wasataSale.statusRemoved')
          : t('wasataSale.statusForSale'),
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
          <button onClick={() => onNavigate?.('commercial-sale')} className="hover:text-[#47CCD0] transition-colors cursor-pointer font-medium">{t('commercialSale.breadcrumb')}</button>
          <span className="text-gray-300">/</span>
          <span className="font-bold text-gray-900">{t('wasataSale.riyadh')}</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#2B3D50] mb-2">{t('commercialSale.pageTitle')}</h1>
            <p className="text-gray-500">{t('commercialSale.resultsFound', { count: properties.length * 15 })}</p>
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

        {/* Filters and Map row */}
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
                      <span className={`${property.statusKey === 'removed' ? 'bg-red-500' : property.statusKey === 'sold' ? 'bg-gray-600' : 'bg-[#47CCD0]'} text-white text-xs font-bold px-3 py-1 rounded-md`}>{property.status}</span>
                      {property.isPremium && (
                        <span className="bg-[#FFC107] text-[#2B3D50] text-xs font-bold px-3 py-1 rounded-md">★ {t('wasataSale.featured')}</span>
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
                    <div className="absolute bottom-4 start-4">
                      <span className="text-white font-bold text-xl drop-shadow-md">
                        <span className="text-sm ms-1 font-normal opacity-80">{t('commercialSale.currency')}</span>
                        {property.price}
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
                   {t('wasataSale.viewMoreProperties')}
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
                <h3 className="text-xl font-bold mb-3">{t('commercialSale.ctaTitle')}</h3>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed">{t('wasataSale.ctaDesc')}</p>
                <button className="w-full py-3 bg-[#47CCD0] hover:bg-[#3bb5b9] text-white rounded-xl font-bold transition-colors shadow-md">
                  {t('wasataSale.ctaButton')}
                </button>
              </div>
            </div>

            {/* Popular Neighborhoods */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin size={18} className="text-[#47CCD0]" />
                {t('commercialSale.popularNeighborhoods')}
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
