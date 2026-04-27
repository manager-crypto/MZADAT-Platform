import React, { useState, useRef, useEffect } from 'react';
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
  Bed,
  Bath,
  Maximize,
  Phone,
  MessageCircle,
  Home,
  Check,
  X
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { RiyalSymbol } from '../ui/RiyalSymbol';

// Mock Data for Rent Properties (bilingual)
const propertiesData = [
  {
    id: 1,
    title_ar: 'شقة فاخرة مفروشة للإيجار',
    title_en: 'Luxury Furnished Apartment for Rent',
    location_ar: 'الرياض، حي الملقا',
    location_en: 'Riyadh, Al-Malqa District',
    price: '95,000',
    rentPeriod_ar: 'سنوياً',
    rentPeriod_en: 'Annually',
    beds: 3,
    baths: 3,
    area: '160 م²',
    isPremium: true,
    features_ar: ['مفروشة', 'موقف خاص', 'دخول ذكي'],
    features_en: ['Furnished', 'Private Parking', 'Smart Entry'],
    image: 'https://images.unsplash.com/photo-1663756915301-2ba688e078cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc3MjczMjY4OHww&ixlib=rb-4.1.0&q=80&w=1080',
    agent: {
      name_ar: 'نخبة العقار',
      name_en: 'Elite Property',
      time_ar: 'منذ ساعتين',
      time_en: '2 hours ago',
      logo: 'NE'
    }
  },
  {
    id: 2,
    title_ar: 'فيلا مودرن للإيجار السنوي',
    title_en: 'Modern Villa for Annual Rent',
    location_ar: 'الرياض، حي الياسمين',
    location_en: 'Riyadh, Al-Yasmin District',
    price: '250,000',
    rentPeriod_ar: 'سنوياً',
    rentPeriod_en: 'Annually',
    beds: 5,
    baths: 6,
    area: '450 م²',
    isPremium: false,
    features_ar: ['مسبح', 'تكييف مركزي', 'مطبخ راكب'],
    features_en: ['Pool', 'Central AC', 'Built-in Kitchen'],
    image: 'https://images.unsplash.com/photo-1622015663381-d2e05ae91b72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMGV4dGVyaW9yJTIwbW9kZXJufGVufDF8fHx8MTc3MjYyMDI3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    agent: {
      name_ar: 'إعمار المستقبل',
      name_en: 'Emaar Al-Mustaqbal',
      time_ar: 'منذ يوم',
      time_en: '1 day ago',
      logo: 'EM'
    }
  },
  {
    id: 3,
    title_ar: 'شقة بتصميم عصري وإطلالة',
    title_en: 'Modern Design Apartment with View',
    location_ar: 'الرياض، حي حطين',
    location_en: 'Riyadh, Hittin District',
    price: '120,000',
    rentPeriod_ar: 'سنوياً',
    rentPeriod_en: 'Annually',
    beds: 2,
    baths: 2,
    area: '130 م²',
    isPremium: true,
    features_ar: ['بلكونة', 'نادي رياضي', 'حراسة 24/7'],
    features_en: ['Balcony', 'Gym', '24/7 Security'],
    image: 'https://images.unsplash.com/photo-1659956608657-8d649f07da6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXVkaSUyMG1vZGVybiUyMGFwYXJ0bWVudCUyMGludGVyaW9yfGVufDF8fHx8MTc3MjczMjY4OHww&ixlib=rb-4.1.0&q=80&w=1080',
    agent: {
      name_ar: 'شركة العقار المتميز',
      name_en: 'Premium Property Co.',
      time_ar: 'منذ 5 ساعات',
      time_en: '5 hours ago',
      logo: 'RE'
    }
  },
  {
    id: 4,
    title_ar: 'دور أرضي واسع بمدخل مستقل',
    title_en: 'Spacious Ground Floor with Private Entrance',
    location_ar: 'الرياض، حي النرجس',
    location_en: 'Riyadh, Al-Narjis District',
    price: '75,000',
    rentPeriod_ar: 'سنوياً',
    rentPeriod_en: 'Annually',
    beds: 4,
    baths: 3,
    area: '250 م²',
    isPremium: false,
    features_ar: ['حوش واسع', 'غرفة سائق', 'مجدد'],
    features_en: ['Large Yard', 'Driver\'s Room', 'Renovated'],
    image: 'https://images.unsplash.com/photo-1703967620345-a9d07d7dabd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yJTIwbmlnaHR8ZW58MXx8fHwxNzcyNjY1NzU0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    agent: {
      name_ar: 'مجموعة التطوير',
      name_en: 'Development Group',
      time_ar: 'منذ 12 ساعة',
      time_en: '12 hours ago',
      logo: 'MD'
    }
  },
  {
    id: 5,
    title_ar: 'استديو مؤثث بالكامل للإيجار',
    title_en: 'Fully Furnished Studio for Rent',
    location_ar: 'الرياض، حي الصحافة',
    location_en: 'Riyadh, Al-Sahafa District',
    price: '5,500',
    rentPeriod_ar: 'شهرياً',
    rentPeriod_en: 'Monthly',
    beds: 1,
    baths: 1,
    area: '60 م²',
    isPremium: false,
    features_ar: ['مؤثث', 'شامل الفواتير', 'انترنت مجاني'],
    features_en: ['Furnished', 'Bills Included', 'Free Internet'],
    image: 'https://images.unsplash.com/photo-1663756915301-2ba688e078cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc3MjczMjY4OHww&ixlib=rb-4.1.0&q=80&w=1080',
    agent: {
      name_ar: 'الوسيط الذهبي',
      name_en: 'Golden Broker',
      time_ar: 'منذ يومين',
      time_en: '2 days ago',
      logo: 'GB'
    }
  },
  {
    id: 6,
    title_ar: 'فيلا كومباوند مع خدمات متكاملة',
    title_en: 'Compound Villa with Full Services',
    location_ar: 'الرياض، حي الربيع',
    location_en: 'Riyadh, Al-Rabi District',
    price: '300,000',
    rentPeriod_ar: 'سنوياً',
    rentPeriod_en: 'Annually',
    beds: 4,
    baths: 5,
    area: '400 م²',
    isPremium: true,
    features_ar: ['صيانة مجانية', 'مسبح مشترك', 'ملاعب أطفال'],
    features_en: ['Free Maintenance', 'Shared Pool', 'Children\'s Playground'],
    image: 'https://images.unsplash.com/photo-1622015663381-d2e05ae91b72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMGV4dGVyaW9yJTIwbW9kZXJufGVufDF8fHx8MTc3MjYyMDI3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    agent: {
      name_ar: 'نخبة العقار',
      name_en: 'Elite Property',
      time_ar: 'منذ يومين',
      time_en: '2 days ago',
      logo: 'NE'
    }
  },
];

const neighborhoodsData = [
  { name_ar: 'حي الملقا', name_en: 'Al-Malqa District', count: 530 },
  { name_ar: 'حي الياسمين', name_en: 'Al-Yasmin District', count: 412 },
  { name_ar: 'حي النرجس', name_en: 'Al-Narjis District', count: 320 },
  { name_ar: 'حي حطين', name_en: 'Hittin District', count: 245 },
  { name_ar: 'حي العارض', name_en: 'Al-Arid District', count: 180 },
];

interface RealEstateRentPageProps {
  onPropertyClick?: (property: any) => void;
  onNavigate?: (page: string) => void;
}

export const RealEstateRentPage: React.FC<RealEstateRentPageProps> = ({ onPropertyClick, onNavigate }) => {
  const { t, i18n } = useTranslation();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const isAr = i18n.language !== 'en';

  const properties = propertiesData.map(p => ({
    ...p,
    title: isAr ? p.title_ar : p.title_en,
    location: isAr ? p.location_ar : p.location_en,
    rentPeriod: isAr ? p.rentPeriod_ar : p.rentPeriod_en,
    features: isAr ? p.features_ar : p.features_en,
    agent: {
      ...p.agent,
      name: isAr ? p.agent.name_ar : p.agent.name_en,
      time: isAr ? p.agent.time_ar : p.agent.time_en,
    },
  }));

  const neighborhoods = neighborhoodsData.map(n => ({
    name: isAr ? n.name_ar : n.name_en,
    count: n.count,
  }));

  const [activeMapProperty, setActiveMapProperty] = useState<number | null>(null);

  // Filter States
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
  const [rentRange, setRentRange] = useState({ min: '', max: '' });
  const [selectedRooms, setSelectedRooms] = useState<number | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [rentPeriod, setRentPeriod] = useState<string>('all');

  // Close filter dropdowns when clicking outside
  const filterRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setActiveFilter(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const togglePropertyType = (type: string) => {
    setSelectedPropertyTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  const isRentFilterActive = rentRange.min !== '' || rentRange.max !== '' || rentPeriod !== 'all';
  const isMoreFilterActive = selectedFeatures.length > 0;

  const quickTags = [
    t('realEstateRent.quickTagFamilyApts'),
    t('realEstateRent.quickTagBachelorApts'),
    t('realEstateRent.quickTagFurnishedApts'),
    t('realEstateRent.quickTagVillasForRent'),
    t('realEstateRent.quickTagMonthlyRent'),
    t('realEstateRent.quickTagFlexiblePayments'),
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFB] pt-40 pb-20 font-sans">
      <div className="container mx-auto px-4 max-w-7xl">

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <button onClick={() => onNavigate?.('home')} className="hover:text-[#47CCD0] transition-colors cursor-pointer font-medium">{t('wasataSale.breadcrumbHome')}</button>
          <span className="text-gray-300">/</span>
          <button onClick={() => onNavigate?.('real-estate-for-rent')} className="hover:text-[#47CCD0] transition-colors cursor-pointer font-medium">{t('realEstateRent.breadcrumb')}</button>
          <span className="text-gray-300">/</span>
          <span className="font-bold text-gray-900">{t('wasataSale.riyadh')}</span>
        </div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#2B3D50] mb-2">{t('realEstateRent.pageTitle')}</h1>
            <p className="text-gray-500">{t('realEstateRent.resultsFound', { count: properties.length * 15 })}</p>
          </div>

          <div className="flex bg-white rounded-xl border border-gray-200 p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors text-sm font-bold ${viewMode === 'list' ? 'bg-[#47CCD0] text-white' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <List size={18} />
              {t('wasataSale.listView')}
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors text-sm font-bold ${viewMode === 'map' ? 'bg-[#47CCD0] text-white' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <MapIcon size={18} />
              {t('wasataSale.mapView')}
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col gap-4 relative z-40">
            <div className="flex flex-col md:flex-row gap-4">
                <LocationSelector />

                {/* Search Input */}
                <div className="relative flex-1 w-full">
                    <input
                        type="text"
                        placeholder={t('wasataSale.searchPlaceholder')}
                        className="w-full ps-4 pe-12 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] text-sm bg-gray-50/50"
                    />
                    <Search size={20} className="absolute end-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>

                {/* Filter Dropdowns */}
                <FilterBar />
            </div>

            {/* Quick Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
                {quickTags.map((tag, idx) => (
                    <button key={idx} className="px-4 py-2 bg-gray-50 border border-gray-100 hover:border-gray-200 text-gray-600 rounded-full text-xs font-medium transition-colors">
                        {tag}
                    </button>
                ))}
            </div>
        </div>

        {/* Main Content Layout */}
        {viewMode === 'list' ? (
        <div className="flex flex-col lg:flex-row gap-8">

            {/* Main Grid (Right side in RTL) */}
            <div className="flex-1 order-2 lg:order-1">
                {/* Sort Bar */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-bold text-lg text-gray-900">{t('wasataSale.latestOffers')}</h2>
                    <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                        {t('wasataSale.sortBy')} <span className="font-bold">{t('wasataSale.newest')}</span> <ChevronDown size={16} />
                    </button>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {properties.map((property) => (
                        <div
                           key={property.id}
                           className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col cursor-pointer"
                           onClick={() => onPropertyClick?.(property)}
                        >
                            {/* Image Container */}
                            <div className="relative h-[220px] w-full overflow-hidden shrink-0">
                                <img
                                    src={property.image}
                                    alt={property.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                                {/* Top Tags */}
                                <div className="absolute top-4 end-4 flex gap-2">
                                    <span className="bg-[#2B3D50] text-white text-xs font-bold px-3 py-1 rounded-md">{t('realEstateRent.forRentBadge')}</span>
                                    {property.isPremium && (
                                        <span className="bg-[#47CCD0] text-white text-xs font-bold px-3 py-1 rounded-md">{`★ ${t('wasataSale.featured')}`}</span>
                                    )}
                                </div>

                                {/* Top Actions */}
                                <div className="absolute top-4 start-4 flex flex-col gap-2">
                                    <button className="w-8 h-8 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#47CCD0] transition-colors" onClick={e => e.stopPropagation()}>
                                        <Heart size={14} />
                                    </button>
                                    <button className="w-8 h-8 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#47CCD0] transition-colors" onClick={e => e.stopPropagation()}>
                                        <Share2 size={14} />
                                    </button>
                                </div>

                                {/* Price */}
                                <div className="absolute bottom-4 end-4 text-end">
                                    <div className="flex items-baseline text-white">
                                        <span className="font-bold text-2xl drop-shadow-md">{property.price}</span>
                                        <RiyalSymbol className="w-5 h-5 text-white/90" />
                                        <span className="text-xs me-1 opacity-80 bg-white/20 px-1.5 py-0.5 rounded backdrop-blur-sm">{property.rentPeriod}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-5 flex flex-col flex-1">
                                <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">{property.title}</h3>
                                <div className="flex items-center text-gray-500 text-xs mb-4">
                                    <MapPin size={14} className="ms-1 text-[#47CCD0]" />
                                    {property.location}
                                </div>

                                {/* Specs */}
                                <div className="flex items-center justify-between py-3 border-t border-b border-gray-100 mb-4 mt-auto">
                                    <div className="flex items-center gap-1.5 text-gray-700 text-sm">
                                        <Bed size={16} className="text-gray-400" />
                                        <span className="font-bold">{property.beds}</span>
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
                                        <span key={idx} className="bg-gray-50 border border-gray-100 text-gray-600 text-[10px] px-2.5 py-1 rounded-md">
                                            {feature}
                                        </span>
                                    ))}
                                </div>

                                {/* Footer Agent Info */}
                                <div className="flex items-center justify-between pt-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#47CCD0]/10 flex items-center justify-center text-[#47CCD0] font-bold text-xs">
                                            {property.agent.logo}
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-gray-900 flex items-center gap-1">
                                                {property.agent.name}
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                            </div>
                                            <div className="text-[10px] text-gray-400">{property.agent.time}</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="w-8 h-8 rounded-full bg-[#F8FAFB] text-gray-500 border border-gray-200 flex items-center justify-center hover:border-[#47CCD0] hover:text-[#47CCD0] transition-colors" onClick={e => e.stopPropagation()}>
                                            <MessageCircle size={14} />
                                        </button>
                                        <button className="w-8 h-8 rounded-full bg-[#F8FAFB] text-gray-500 border border-gray-200 flex items-center justify-center hover:border-[#47CCD0] hover:text-[#47CCD0] transition-colors" onClick={e => e.stopPropagation()}>
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
                       {t('realEstateRent.loadMoreProperties')}
                   </button>
                </div>
            </div>

            {/* Sidebar (Left side in RTL) */}
            <div className="w-full lg:w-1/4 order-1 lg:order-2 flex flex-col gap-6">

                {/* Rent CTA Box - Modified to 'List your property for rent' */}
                <div className="bg-[#2B3D50] rounded-2xl p-6 text-white text-center relative overflow-hidden">
                    <div className="absolute top-0 end-0 w-32 h-32 bg-[#47CCD0]/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 start-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10">
                        <h3 className="font-bold text-xl mb-3">{t('realEstateRent.ctaTitle')}</h3>
                        <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                            {t('realEstateRent.ctaDesc')}
                        </p>
                        <button
                            onClick={() => onNavigate?.('add-real-estate')}
                            className="w-full py-3 bg-[#47CCD0] hover:bg-[#3bb1b5] text-white font-bold rounded-xl transition-colors shadow-lg shadow-[#47CCD0]/20">
                            {t('realEstateRent.addPropertyBtn')}
                        </button>
                    </div>
                </div>

                {/* Popular Neighborhoods */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100">{t('wasataSale.popularNeighborhoods')}</h3>
                    <div className="space-y-4">
                        {neighborhoods.map((n, idx) => (
                            <div key={idx} className="flex items-center justify-between group cursor-pointer">
                                <span className="text-sm text-gray-600 group-hover:text-[#47CCD0] transition-colors">{n.name}</span>
                                <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-md">{n.count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Trusted Agents Banner */}
                <div className="bg-gradient-to-br from-[#E5F9FA] to-white rounded-2xl p-6 border border-[#47CCD0]/20">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 text-[#47CCD0] shadow-sm">
                        <Home size={24} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{t('realEstateRent.trustedAgents')}</h3>
                    <p className="text-sm text-gray-600 mb-4">{t('realEstateRent.trustedAgentsDesc')}</p>
                    <button className="text-[#47CCD0] text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                        {t('realEstateRent.browseBrokers')}
                    </button>
                </div>

            </div>

        </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-250px)] min-h-[600px] mb-10">
              {/* Properties List (Right side) */}
              <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                      <h2 className="font-bold text-gray-900">{t('wasataSale.latestOffers')}</h2>
                      <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                          {t('wasataSale.sortBy')} <span className="font-bold">{t('wasataSale.newest')}</span> <ChevronDown size={16} />
                      </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                      {properties.map((property) => (
                          <div
                              key={property.id}
                              className="flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all group cursor-pointer"
                              onClick={() => onPropertyClick?.(property)}
                          >
                              <div className="relative w-full sm:w-2/5 h-[160px] sm:h-auto overflow-hidden shrink-0">
                                  <img
                                      src={property.image}
                                      alt={property.title}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                  <div className="absolute top-2 end-2 flex gap-1">
                                      <span className="bg-[#2B3D50] text-white text-[10px] font-bold px-2 py-1 rounded">{t('realEstateRent.forRentBadge')}</span>
                                      {property.isPremium && (
                                          <span className="bg-[#47CCD0] text-white text-[10px] font-bold px-2 py-1 rounded">{`★ ${t('wasataSale.featured')}`}</span>
                                      )}
                                  </div>
                                  <div className="absolute bottom-2 start-2">
                                      <div className="flex items-baseline text-white gap-1 font-mono">
                                          <span className="font-bold text-sm drop-shadow-md">{property.price}</span>
                                          <RiyalSymbol className="w-3 h-3 text-white/90 drop-shadow-md" />
                                      </div>
                                  </div>
                              </div>
                              <div className="p-3 flex-1 flex flex-col justify-between">
                                  <div>
                                      <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">{property.title}</h3>
                                      <div className="flex items-center text-gray-500 text-[11px] mb-2">
                                          <MapPin size={12} className="ms-1 text-[#47CCD0]" />
                                          {property.location}
                                      </div>
                                      <div className="flex items-center gap-3 py-2 border-t border-b border-gray-50 mb-2">
                                          <div className="flex items-center gap-1 text-gray-700 text-xs">
                                              <Bed size={14} className="text-gray-400" />
                                              <span className="font-bold">{property.beds}</span>
                                          </div>
                                          <div className="flex items-center gap-1 text-gray-700 text-xs">
                                              <Bath size={14} className="text-gray-400" />
                                              <span className="font-bold">{property.baths}</span>
                                          </div>
                                          <div className="flex items-center gap-1 text-gray-700 text-xs">
                                              <Maximize size={14} className="text-gray-400" />
                                              <span className="font-bold dir-ltr">{property.area}</span>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="flex items-center justify-between mt-2">
                                      <div className="flex items-center gap-2">
                                          <div className="w-6 h-6 rounded-full bg-[#47CCD0]/10 flex items-center justify-center text-[#47CCD0] font-bold text-[10px]">
                                              {property.agent.logo}
                                          </div>
                                          <span className="text-[11px] font-bold text-gray-900">{property.agent.name}</span>
                                      </div>
                                      <div className="flex gap-1.5">
                                          <button className="w-7 h-7 rounded-full bg-[#F8FAFB] text-gray-500 border border-gray-200 flex items-center justify-center hover:border-[#47CCD0] hover:text-[#47CCD0] transition-colors" onClick={(e) => { e.stopPropagation(); }}>
                                              <MessageCircle size={12} />
                                          </button>
                                          <button className="w-7 h-7 rounded-full bg-[#F8FAFB] text-gray-500 border border-gray-200 flex items-center justify-center hover:border-[#47CCD0] hover:text-[#47CCD0] transition-colors" onClick={(e) => { e.stopPropagation(); }}>
                                              <Phone size={12} />
                                          </button>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      ))}

                      {/* Pagination */}
                      <div className="mt-6 pb-4 flex justify-center">
                         <button className="px-5 py-2 bg-gray-50 border border-gray-200 text-gray-600 text-sm font-bold rounded-xl hover:border-[#47CCD0] hover:text-[#47CCD0] transition-colors">
                             {t('realEstateRent.loadMore')}
                         </button>
                      </div>
                  </div>
              </div>

              {/* Interactive Map (Left side) */}
              <div className="flex-1 h-full rounded-2xl overflow-hidden relative border border-gray-200 shadow-inner bg-gray-100">
                  <iframe
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      scrolling="no"
                      src="https://www.openstreetmap.org/export/embed.html?bbox=46.45,24.55,46.85,24.95&layer=mapnik"
                      className="absolute inset-0 grayscale-[0.3] contrast-125 opacity-80"
                      title="map"
                  ></iframe>
                  <div className="absolute inset-0 bg-[#47CCD0]/5 pointer-events-none"></div>

                  {/* Map Pins */}
                  {properties.map((property, idx) => (
                      <div
                        key={`pin-${idx}`}
                        className={`absolute transform -translate-x-1/2 -translate-y-full cursor-pointer group ${activeMapProperty === property.id ? 'z-30' : 'z-10 hover:z-20'}`}
                        style={{
                           top: `${25 + (idx * 17) % 55}%`,
                           right: `${20 + (idx * 23) % 60}%`
                        }}
                        onClick={() => setActiveMapProperty(activeMapProperty === property.id ? null : property.id)}
                      >
                         <div className={`text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg flex items-center gap-1 transition-all relative ${activeMapProperty === property.id ? 'bg-[#47CCD0] scale-105' : 'bg-[#2B3D50] group-hover:bg-[#47CCD0] group-hover:scale-105'}`}>
                            {property.price}
                            <RiyalSymbol className="w-2.5 h-2.5 text-white/80" />
                         </div>
                         {/* Triangle pointer */}
                         <div className={`w-0 h-0 border-s-[6px] border-s-transparent border-e-[6px] border-e-transparent border-t-[8px] mx-auto transition-colors relative -mt-[1px] ${activeMapProperty === property.id ? 'border-t-[#47CCD0]' : 'border-t-[#2B3D50] group-hover:border-t-[#47CCD0]'}`}></div>

                         {/* Popup Card */}
                         {activeMapProperty === property.id && (
                             <div
                               className="absolute bottom-full mb-3 end-1/2 translate-x-1/2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden cursor-pointer transition-all origin-bottom z-50 animate-in fade-in zoom-in duration-200 group-hover/card:shadow-3xl"
                               onClick={(e) => {
                                 e.stopPropagation();
                                 onPropertyClick?.(property);
                               }}
                             >
                                 {/* Close Button */}
                                 <button onClick={(e) => { e.stopPropagation(); setActiveMapProperty(null); }} className="absolute top-2 end-2 z-10 w-6 h-6 bg-black/40 text-white rounded-full flex items-center justify-center hover:bg-black/60 backdrop-blur-sm transition-colors">
                                     <X size={14} />
                                 </button>

                                 <div className="relative h-32 w-full">
                                     <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                                     <div className="absolute bottom-2 start-2 flex gap-1">
                                         <span className="bg-[#2B3D50] text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">{t('realEstateRent.forRentBadge')}</span>
                                         {property.isPremium && (
                                            <span className="bg-[#47CCD0] text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">{`★ ${t('wasataSale.featured')}`}</span>
                                         )}
                                     </div>
                                 </div>
                                 <div className="p-3">
                                     <div className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">{property.title}</div>
                                     <div className="text-gray-500 text-[11px] mb-2 flex items-center gap-1">
                                         <MapPin size={10} className="text-[#47CCD0]" />
                                         {property.location}
                                     </div>
                                     <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                                         <div className="text-[#2B3D50] font-bold text-sm flex items-center gap-1 font-mono">
                                             {property.price} <RiyalSymbol className="w-3 h-3 text-[#2B3D50]" /> <span className="text-[10px] font-bold opacity-80 font-sans">{t('realEstateRent.perYear')}</span>
                                         </div>
                                         <div className="flex items-center gap-2 text-gray-500 text-[11px]">
                                             <span className="flex items-center gap-0.5"><Bed size={12} className="text-gray-400"/>{property.beds}</span>
                                             <span className="flex items-center gap-0.5"><Bath size={12} className="text-gray-400"/>{property.baths}</span>
                                             <span className="flex items-center gap-0.5"><Maximize size={12} className="text-gray-400"/>{property.area}</span>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         )}
                      </div>
                  ))}

                  {/* Map Controls Overlay */}
                  <div className="absolute bottom-6 start-6 flex flex-col gap-2">
                      <button className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center text-gray-700 hover:text-[#47CCD0] hover:bg-gray-50 transition-colors">
                          <span className="text-xl leading-none font-bold">+</span>
                      </button>
                      <button className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center text-gray-700 hover:text-[#47CCD0] hover:bg-gray-50 transition-colors">
                          <span className="text-2xl leading-none font-bold -mt-1">-</span>
                      </button>
                  </div>
              </div>
          </div>
        )}

      </div>
    </div>
  );
};
