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
import { RiyalSymbol } from '../ui/RiyalSymbol';

const properties = [
 {
 id: 1,
 title: 'شقة فندقية فاخرة بإطلالة بانورامية',
 location: 'الرياض، حي الملقا',
 price: '850',
 rentPeriod: 'يومياً',
 beds: 2,
 baths: 2,
 area: '120 م²',
 isPremium: true,
 features: ['خدمة تنظيف يومية', 'دخول ذكي', 'انترنت سريع'],
 image: 'https://images.unsplash.com/photo-1550567418-1bd5c7712337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGFwYXJ0bWVudCUyMGJlZHJvb218ZW58MXx8fHwxNzcyNzM1MTkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
 agent: { name: 'فنادق النخبة', time: 'منذ ساعتين', logo: 'EH' }
 },
 {
 id: 2,
 title: 'جناح فندقي عصري قرب البوليفارد',
 location: 'الرياض، حي حطين',
 price: '1,200',
 rentPeriod: 'يومياً',
 beds: 1,
 baths: 1,
 area: '80 م²',
 isPremium: false,
 features: ['مسبح', 'صالة رياضية', 'مواقف مجانية'],
 image: 'https://images.unsplash.com/photo-1662841540530-2f04bb3291e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJvb20lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzI3MzUxOTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
 agent: { name: 'الضيافة الفاخرة', time: 'منذ يوم', logo: 'LH' }
 }
];

export const HotelApartmentsPage: React.FC = () => {
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
 <span>إيجار يومي</span>
 <span className="text-gray-300">/</span>
 <span className="font-bold text-gray-900">شقق فندقية</span>
 </div>

 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
 <div>
 <h1 className="text-3xl font-bold text-[#2B3D50] mb-2">شقق فندقية</h1>
 <p className="text-gray-500">تم العثور على {properties.length} شقة فندقية متاحة</p>
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
 <input type="text" placeholder="ابحث باسم الحي، الفندق..." className="w-full ps-4 pe-12 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] text-sm bg-gray-50/50" />
 <Search size={20} className="absolute end-4 top-1/2 -translate-y-1/2 text-gray-400" />
 </div>
 <FilterBar typeOptions={['شقة فندقية', 'جناح فندقي', 'استديو', 'شقة مفروشة']} />
 </div>
 <div className="flex flex-wrap gap-2 pt-2">
 {['قريب من البوليفارد', 'إطلالة مدينة', 'دخول ذاتي', 'تقييم +4.5', 'خصم أسبوعي'].map((tag, idx) => (
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
 <div className="absolute top-4 end-4 flex gap-2">
 {property.isPremium && <span className="bg-[#47CCD0] text-white text-xs font-bold px-3 py-1 rounded-md">★ مميز</span>}
 </div>
 <div className="absolute top-4 start-4 flex flex-col gap-2">
 <button className="w-8 h-8 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#47CCD0] transition-colors"><Heart size={14} /></button>
 <button className="w-8 h-8 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#47CCD0] transition-colors"><Share2 size={14} /></button>
 </div>
 <div className="absolute bottom-4 end-4 text-end">
 <div className="flex items-baseline text-white gap-1.5 font-mono">
 <span className="font-bold text-2xl">{property.price}</span>
 <RiyalSymbol className="w-5 h-5 text-white" />
 <span className="text-xs me-1 opacity-80 bg-white/20 px-1.5 py-0.5 rounded backdrop-blur-sm font-sans">{property.rentPeriod}</span>
 </div>
 </div>
 </div>
 <div className="p-5 flex flex-col flex-1">
 <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">{property.title}</h3>
 <div className="flex items-center text-gray-500 text-xs mb-4">
 <MapPin size={14} className="ms-1 text-[#47CCD0]" /> {property.location}
 </div>
 <div className="flex items-center justify-between py-3 border-t border-b border-gray-100 mb-4 mt-auto">
 <div className="flex items-center gap-1.5 text-gray-700 text-sm"><Bed size={16} className="text-gray-400" /><span className="font-bold">{property.beds}</span></div>
 <div className="w-px h-4 bg-gray-200"></div>
 <div className="flex items-center gap-1.5 text-gray-700 text-sm"><Bath size={16} className="text-gray-400" /><span className="font-bold">{property.baths}</span></div>
 <div className="w-px h-4 bg-gray-200"></div>
 <div className="flex items-center gap-1.5 text-gray-700 text-sm"><Maximize size={16} className="text-gray-400" /><span className="font-bold">{property.area}</span></div>
 </div>
 <div className="flex flex-wrap gap-2 mb-5">
 {property.features.map((feature, idx) => (
 <span key={idx} className="bg-gray-50 text-gray-600 text-[10px] px-2.5 py-1.5 rounded-md font-medium border border-gray-100">{feature}</span>
 ))}
 </div>
 <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
 <div className="flex items-center gap-2">
 <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">{property.agent.logo}</div>
 <div>
 <p className="text-xs font-bold text-gray-900">{property.agent.name}</p>
 <p className="text-[10px] text-gray-400">{property.agent.time}</p>
 </div>
 </div>
 <button className="px-4 py-2 bg-[#47CCD0]/10 text-[#47CCD0] rounded-lg text-sm font-bold hover:bg-[#47CCD0] hover:text-white transition-colors">عرض التفاصيل</button>
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 );
};