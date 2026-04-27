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
  LayoutGrid, 
  Maximize, 
  Phone, 
  MessageCircle,
  Home,
  Check,
  X
} from 'lucide-react';
import { RiyalSymbol } from '../ui/RiyalSymbol';

const properties = [
  {
    id: 1,
    title: 'مستودع حديث مطابق لاشتراطات الدفاع المدني',
    location: 'الرياض، السلي',
    price: '200,000',
    rentPeriod: 'سنوياً',
    type: 'مستودع',
    area: '1200 م²',
    isPremium: true,
    features: ['دفاع مدني', 'أسقف مرتفعة', 'منطقة تحميل', 'مكاتب إدارية'],
    image: 'https://images.unsplash.com/photo-1771530789155-b1f03fbf82b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXJnZSUyMGVtcHR5JTIwd2FyZWhvdXNlJTIwaW50ZXJpb3IlMjBsb2dpc3RpY3N8ZW58MXx8fHwxNzcyNzM3NDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    agent: { name: 'لوجستيك العقارية', time: 'منذ يوم', logo: 'LG' }
  },
  {
    id: 2,
    title: 'مستودع تخزين مركزي مع نظام تبريد',
    location: 'الرياض، الصناعية الثانية',
    price: '350,000',
    rentPeriod: 'سنوياً',
    type: 'مستودع',
    area: '2500 م²',
    isPremium: false,
    features: ['نظام تبريد', 'أرضيات إيبوكسي', 'غرف حراس', 'مراقبة 24/7'],
    image: 'https://images.unsplash.com/photo-1760921678729-9658c8b792bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwd2FyZWhvdXNlJTIwc3RvcmFnZSUyMGZhY2lsaXR5fGVufDF8fHx8MTc3MjczNzQ0OXww&ixlib=rb-4.1.0&q=80&w=1080',
    agent: { name: 'المخازن الحديثة', time: 'منذ 3 أيام', logo: 'MH' }
  }
];

export const WarehousesPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
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

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] pt-40 pb-20 font-sans">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <span>الرئيسية</span>
          <span className="text-gray-300">/</span>
          <span>عقارات تجارية للإيجار</span>
          <span className="text-gray-300">/</span>
          <span className="font-bold text-gray-900">مستودعات</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#2B3D50] mb-2">مستودعات</h1>
            <p className="text-gray-500">تم العثور على {properties.length} مستودع متاح للإيجار</p>
          </div>
          <div className="flex bg-white rounded-xl border border-gray-200 p-1">
            <button onClick={() => setViewMode('list')} className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors text-sm font-bold ${viewMode === 'list' ? 'bg-[#47CCD0] text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
              <List size={18} /> قائمة
            </button>
            <button onClick={() => setViewMode('map')} className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors text-sm font-bold ${viewMode === 'map' ? 'bg-[#47CCD0] text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
              <MapIcon size={18} /> خريطة
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col gap-4 relative z-40">
            <div className="flex flex-col md:flex-row gap-4">
                <LocationSelector />
                <div className="relative flex-1">
                    <input type="text" placeholder="ابحث باسم الحي، المنطقة الصناعية..." className="w-full ps-4 pe-12 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] text-sm bg-gray-50/50" />
                    <Search size={20} className="absolute end-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <FilterBar typeOptions={['مستودع', 'ورشة', 'مصنع']} hidePricePeriod={true} />
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
                {['مستودعات جافة', 'مستودعات مبردة', 'ورش صناعية', 'مساحات مفتوحة'].map((tag, idx) => (
                    <button key={idx} className="px-4 py-2 bg-gray-50 border border-gray-100 hover:border-gray-200 text-gray-600 rounded-full text-xs font-medium transition-colors">
                        {tag}
                    </button>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {properties.map((property) => (
                <div key={property.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                    <div className="relative h-[220px] w-full overflow-hidden shrink-0">
                        <img src={property.image} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                        <div className="absolute top-4 end-4 flex flex-col gap-2">
                            {property.isPremium && (
                                <span className="bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1">
                                    <Check size={12} /> مميز
                                </span>
                            )}
                        </div>
                        <button className="absolute top-4 start-4 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-colors">
                            <Heart size={16} />
                        </button>
                        <div className="absolute bottom-4 end-4 text-white">
                            <div className="text-2xl font-black mb-1 font-mono flex items-center gap-1.5">{property.price} <span className="flex items-center gap-1"><RiyalSymbol className="w-5 h-5 text-white/80" /> <span className="text-sm font-bold text-white/80 font-sans">/ {property.rentPeriod}</span></span></div>
                            <div className="flex items-center gap-1.5 text-sm text-white/90">
                                <MapPin size={14} className="text-[#47CCD0]" /> {property.location}
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-5 flex flex-col flex-1">
                        <h3 className="font-bold text-gray-900 text-lg mb-4 line-clamp-1">{property.title}</h3>
                        
                        <div className="flex items-center gap-4 text-gray-600 text-sm mb-4 pb-4 border-b border-gray-50">
                            <div className="flex items-center gap-1.5">
                                <LayoutGrid size={16} className="text-gray-400" />
                                <span>{property.type}</span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                            <div className="flex items-center gap-1.5">
                                <Maximize size={16} className="text-gray-400" />
                                <span>{property.area}</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {property.features.slice(0, 3).map((feature, idx) => (
                                <span key={idx} className="bg-[#F8FAFB] text-gray-600 px-2.5 py-1 rounded-md text-xs border border-gray-100">
                                    {feature}
                                </span>
                            ))}
                            {property.features.length > 3 && (
                                <span className="bg-[#F8FAFB] text-gray-600 px-2.5 py-1 rounded-md text-xs border border-gray-100">
                                    +{property.features.length - 3}
                                </span>
                            )}
                        </div>

                        <div className="mt-auto pt-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold">
                                    {property.agent.logo}
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-gray-900">{property.agent.name}</div>
                                    <div className="text-[10px] text-gray-500">{property.agent.time}</div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="w-9 h-9 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition-colors">
                                    <MessageCircle size={16} />
                                </button>
                                <button className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors">
                                    <Phone size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};