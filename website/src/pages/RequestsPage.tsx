import React, { useState } from 'react';
import {
 Search,
 Filter,
 MapPin,
 Car,
 Home,
 LayoutGrid,
 Package,
 ChevronDown,
 SlidersHorizontal,
 ArrowUpDown,
 Heart,
 Share2,
 MessageCircle,
 Phone,
 CheckCircle2,
 AlertCircle,
 X,
 BedDouble,
 Bath,
 Maximize,
 Calendar,
 Gauge,
 Tag
} from 'lucide-react';
import { RiyalSymbol } from '../components/ui/RiyalSymbol';
import { useTranslation } from 'react-i18next';

interface RequestItem {
 id: string;
 type: 'real-estate' | 'car' | 'plate' | 'other';
 titleKey: string;
 price: number;
 locationKey: string;
 image: string;
 dateKey: string;
 tagKeys: string[];
 specs: {
 labelKey: string;
 valueKey: string;
 }[];
 isDirectSale: boolean;
}

const MOCK_DATA: RequestItem[] = [
 {
 id: '1',
 type: 'real-estate',
 titleKey: 'requestsPage.item1Title',
 price: 2500000,
 locationKey: 'requestsPage.item1Location',
 image: 'https://images.unsplash.com/photo-1600596542815-e36cb2907bcd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
 dateKey: 'requestsPage.item1Date',
 tagKeys: ['requestsPage.item1TagResidential', 'requestsPage.item1TagForSale', 'requestsPage.item1TagNew'],
 specs: [
 { labelKey: 'requestsPage.item1SpecArea', valueKey: 'requestsPage.item1SpecAreaVal' },
 { labelKey: 'requestsPage.item1SpecRooms', valueKey: 'requestsPage.item1SpecRoomsVal' },
 { labelKey: 'requestsPage.item1SpecFacade', valueKey: 'requestsPage.item1SpecFacadeVal' }
 ],
 isDirectSale: true
 },
 {
 id: '2',
 type: 'car',
 titleKey: 'requestsPage.item2Title',
 price: 580000,
 locationKey: 'requestsPage.item2Location',
 image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
 dateKey: 'requestsPage.item2Date',
 tagKeys: ['requestsPage.item2TagCars', 'requestsPage.item2TagNew', 'requestsPage.item2TagWarranty'],
 specs: [
 { labelKey: 'requestsPage.item2SpecOdometer', valueKey: 'requestsPage.item2SpecOdometerVal' },
 { labelKey: 'requestsPage.item2SpecColor', valueKey: 'requestsPage.item2SpecColorVal' },
 { labelKey: 'requestsPage.item2SpecEngine', valueKey: 'requestsPage.item2SpecEngineVal' }
 ],
 isDirectSale: true
 },
 {
 id: '3',
 type: 'plate',
 titleKey: 'requestsPage.item3Title',
 price: 120000,
 locationKey: 'requestsPage.item3Location',
 image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
 dateKey: 'requestsPage.item3Date',
 tagKeys: ['requestsPage.item3TagPlates', 'requestsPage.item3TagPrivate', 'requestsPage.item3TagGold'],
 specs: [
 { labelKey: 'requestsPage.item3SpecType', valueKey: 'requestsPage.item3SpecTypeVal' },
 { labelKey: 'requestsPage.item3SpecNumbers', valueKey: 'requestsPage.item3SpecNumbersVal' },
 { labelKey: 'requestsPage.item3SpecLetters', valueKey: 'requestsPage.item3SpecLettersVal' }
 ],
 isDirectSale: true
 },
 {
 id: '4',
 type: 'real-estate',
 titleKey: 'requestsPage.item4Title',
 price: 850000,
 locationKey: 'requestsPage.item4Location',
 image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
 dateKey: 'requestsPage.item4Date',
 tagKeys: ['requestsPage.item4TagResidential', 'requestsPage.item4TagApartments', 'requestsPage.item4TagLuxury'],
 specs: [
 { labelKey: 'requestsPage.item4SpecArea', valueKey: 'requestsPage.item4SpecAreaVal' },
 { labelKey: 'requestsPage.item4SpecRooms', valueKey: 'requestsPage.item4SpecRoomsVal' },
 { labelKey: 'requestsPage.item4SpecFloor', valueKey: 'requestsPage.item4SpecFloorVal' }
 ],
 isDirectSale: true
 },
 {
 id: '5',
 type: 'car',
 titleKey: 'requestsPage.item5Title',
 price: 320000,
 locationKey: 'requestsPage.item5Location',
 image: 'https://images.unsplash.com/photo-1533473359331-0135ef1bcfb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
 dateKey: 'requestsPage.item5Date',
 tagKeys: ['requestsPage.item5TagCars', 'requestsPage.item5TagDouble', 'requestsPage.item5TagFull'],
 specs: [
 { labelKey: 'requestsPage.item5SpecOdometer', valueKey: 'requestsPage.item5SpecOdometerVal' },
 { labelKey: 'requestsPage.item5SpecColor', valueKey: 'requestsPage.item5SpecColorVal' },
 { labelKey: 'requestsPage.item5SpecFuel', valueKey: 'requestsPage.item5SpecFuelVal' }
 ],
 isDirectSale: true
 }
];

interface RequestsPageProps {
 onNavigate: (page: string) => void;
}

export const RequestsPage: React.FC<RequestsPageProps> = ({ onNavigate }) => {
 const { t } = useTranslation();
 const [activeCategory, setActiveCategory] = useState('all');
 const [searchQuery, setSearchQuery] = useState('');
 const [showFilters, setShowFilters] = useState(false);
 const [priceRange, setPriceRange] = useState([0, 5000000]);

 // Specific filters state
 const [selectedCities, setSelectedCities] = useState<string[]>([]);
 const [propertyType, setPropertyType] = useState<string[]>([]);
 const [carMake, setCarMake] = useState<string[]>([]);
 const [plateType, setPlateType] = useState<string[]>([]);

 const categories = [
 { id: 'all', labelKey: 'requestsPage.categoryAll', icon: LayoutGrid },
 { id: 'real-estate', labelKey: 'requestsPage.categoryRealEstate', icon: Home },
 { id: 'car', labelKey: 'requestsPage.categoryCars', icon: Car },
 { id: 'plate', labelKey: 'requestsPage.categoryPlates', icon: LayoutGrid },
 { id: 'other', labelKey: 'requestsPage.categoryOther', icon: Package },
 ];

 const propertyTypes = [
 { key: 'villa', label: t('requestsPage.propVilla') },
 { key: 'apartment', label: t('requestsPage.propApartment') },
 { key: 'land', label: t('requestsPage.propLand') },
 { key: 'building', label: t('requestsPage.propBuilding') },
 { key: 'chalet', label: t('requestsPage.propChalet') },
 { key: 'floor', label: t('requestsPage.propFloor') },
 ];

 const carMakes = [
 t('requestsPage.carToyota'),
 t('requestsPage.carMercedes'),
 t('requestsPage.carHyundai'),
 t('requestsPage.carFord'),
 t('requestsPage.carLexus'),
 t('requestsPage.carNissan'),
 ];

 const plateTypes = [
 t('requestsPage.platePrivate'),
 t('requestsPage.plateTransport'),
 t('requestsPage.plateBike'),
 t('requestsPage.plateTaxi'),
 ];

 const cities = [
 t('requestsPage.cityRiyadh'),
 t('requestsPage.cityJeddah'),
 t('requestsPage.cityMakkah'),
 t('requestsPage.cityMadinah'),
 t('requestsPage.cityDammam'),
 t('requestsPage.cityKhobar'),
 t('requestsPage.cityAbha'),
 t('requestsPage.cityTaif'),
 ];

 const handleCityToggle = (city: string) => {
 setSelectedCities(prev =>
 prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
 );
 };

 const filteredData = MOCK_DATA.filter(item => {
 const matchesCategory = activeCategory === 'all' || item.type === activeCategory;
 const translatedTitle = t(item.titleKey);
 const translatedLocation = t(item.locationKey);
 const matchesSearch = translatedTitle.includes(searchQuery) || translatedLocation.includes(searchQuery);
 return matchesCategory && matchesSearch;
 });

 const renderCategorySpecificFilters = () => {
 switch (activeCategory) {
 case 'real-estate':
 return (
 <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
 <div className="border-t border-gray-100 pt-4">
 <label className="text-sm font-bold text-gray-700 mb-3 block">{t('requestsPage.propertyType')}</label>
 <div className="grid grid-cols-2 gap-2">
 {propertyTypes.map(pt => (
 <button
 key={pt.key}
 onClick={() => setPropertyType(prev => prev.includes(pt.key) ? prev.filter(t => t !== pt.key) : [...prev, pt.key])}
 className={`px-3 py-2 rounded-lg text-xs font-bold transition-all border ${
 propertyType.includes(pt.key)
 ? 'bg-[#0F766E] text-white border-[#0F766E]'
 : 'bg-white text-gray-600 border-gray-200 hover:border-[#0F766E]'
 }`}
 >
 {pt.label}
 </button>
 ))}
 </div>
 </div>

 <div className="border-t border-gray-100 pt-4">
 <label className="text-sm font-bold text-gray-700 mb-3 block">{t('requestsPage.specs')}</label>
 <div className="space-y-3">
 <div>
 <span className="text-xs text-gray-500 mb-1 block">{t('requestsPage.roomsCount')}</span>
 <div className="flex gap-2">
 {[1, 2, 3, 4, '5+'].map(num => (
 <button key={num} className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 text-xs font-bold hover:border-[#0F766E] hover:text-[#0F766E] transition-colors">
 {num}
 </button>
 ))}
 </div>
 </div>
 <div>
 <span className="text-xs text-gray-500 mb-1 block">{t('requestsPage.livingRoomsCount')}</span>
 <div className="flex gap-2">
 {[1, 2, 3, '4+'].map(num => (
 <button key={num} className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 text-xs font-bold hover:border-[#0F766E] hover:text-[#0F766E] transition-colors">
 {num}
 </button>
 ))}
 </div>
 </div>
 </div>
 </div>
 </div>
 );

 case 'car':
 return (
 <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
 <div className="border-t border-gray-100 pt-4">
 <label className="text-sm font-bold text-gray-700 mb-3 block">{t('requestsPage.manufacturer')}</label>
 <div className="grid grid-cols-2 gap-2">
 {carMakes.map(make => (
 <button
 key={make}
 className={`px-3 py-2 rounded-lg text-xs font-bold transition-all border bg-white text-gray-600 border-gray-200 hover:border-[#0F766E]`}
 >
 {make}
 </button>
 ))}
 </div>
 </div>

 <div className="border-t border-gray-100 pt-4">
 <label className="text-sm font-bold text-gray-700 mb-3 block">{t('requestsPage.yearOfManufacture')}</label>
 <div className="flex items-center gap-2">
 <select className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs font-bold outline-none">
 <option>{t('requestsPage.from2024')}</option>
 <option>2023</option>
 <option>2022</option>
 </select>
 <span className="text-gray-400">-</span>
 <select className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs font-bold outline-none">
 <option>{t('requestsPage.to2015')}</option>
 <option>2010</option>
 </select>
 </div>
 </div>

 <div className="border-t border-gray-100 pt-4">
 <label className="text-sm font-bold text-gray-700 mb-3 block">{t('requestsPage.odometer')}</label>
 <div className="flex flex-wrap gap-2">
 <button className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-600 hover:border-[#0F766E]">{t('requestsPage.newZero')}</button>
 <button className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-600 hover:border-[#0F766E]">{t('requestsPage.below50k')}</button>
 <button className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-600 hover:border-[#0F766E]">{t('requestsPage.above100k')}</button>
 </div>
 </div>
 </div>
 );

 case 'plate':
 return (
 <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
 <div className="border-t border-gray-100 pt-4">
 <label className="text-sm font-bold text-gray-700 mb-3 block">{t('requestsPage.plateType')}</label>
 <div className="flex flex-wrap gap-2">
 {plateTypes.map(pt => (
 <button
 key={pt}
 className={`px-3 py-2 rounded-lg text-xs font-bold transition-all border bg-white text-gray-600 border-gray-200 hover:border-[#0F766E]`}
 >
 {pt}
 </button>
 ))}
 </div>
 </div>

 <div className="border-t border-gray-100 pt-4">
 <label className="text-sm font-bold text-gray-700 mb-3 block">{t('requestsPage.digitsCount')}</label>
 <div className="flex gap-2">
 {[1, 2, 3, 4].map(num => (
 <button key={num} className="flex-1 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-bold hover:border-[#0F766E] hover:text-[#0F766E] transition-colors">
 {num}
 </button>
 ))}
 </div>
 </div>

 <div className="border-t border-gray-100 pt-4">
 <label className="text-sm font-bold text-gray-700 mb-3 block">{t('requestsPage.letters')}</label>
 <div className="flex gap-2">
 <input type="text" maxLength={1} placeholder="1" className="w-full h-10 bg-gray-50 border border-gray-200 rounded-lg text-center font-bold" />
 <input type="text" maxLength={1} placeholder="2" className="w-full h-10 bg-gray-50 border border-gray-200 rounded-lg text-center font-bold" />
 <input type="text" maxLength={1} placeholder="3" className="w-full h-10 bg-gray-50 border border-gray-200 rounded-lg text-center font-bold" />
 </div>
 </div>
 </div>
 );

 default:
 return null;
 }
 };

 return (
 <div className="min-h-screen bg-[#F8FAFC] pb-20 pt-36">
 {/* Header Section */}
 <div className="bg-white border-b border-gray-200 pb-8 pt-6 shadow-sm">
 <div className="max-w-7xl mx-auto px-4 md:px-8">
 <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
 <div>
 <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">{t('requestsPage.pageTitle')}</h1>
 <p className="text-gray-500 font-medium">{t('requestsPage.pageSubtitle')}</p>
 </div>
 <div className="flex gap-3">
 <button
 onClick={() => onNavigate('create-request')}
 className="px-6 py-3 bg-[#0F766E] hover:bg-[#0d615b] text-white rounded-xl font-bold transition-all shadow-lg shadow-teal-700/20 flex items-center gap-2"
 >
 <span>{t('requestsPage.addNewRequest')}</span>
 <Package size={18} />
 </button>
 </div>
 </div>

 {/* Search & Filter Bar */}
 <div className="flex flex-col lg:flex-row gap-4">
 <div className="flex-1 relative">
 <input
 type="text"
 placeholder={t('requestsPage.searchPlaceholder')}
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="w-full h-14 pe-12 ps-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] transition-all font-medium"
 />
 {/* Instant Search Dropdown */}
 {searchQuery && (
 <div className="absolute top-full start-0 end-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
 {filteredData.length > 0 ? (
 <>
 <div className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
 {filteredData.slice(0, 5).map((item) => (
 <div key={item.id} className="p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 border-b border-gray-50 last:border-0 transition-colors group">
 <img src={item.image} alt={t(item.titleKey)} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
 <div className="flex-1 min-w-0">
 <div className="flex justify-between items-start mb-0.5">
 <h4 className="text-sm font-bold text-gray-900 truncate group-hover:text-[#0F766E] transition-colors">{t(item.titleKey)}</h4>
 <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 whitespace-nowrap">
 {item.type === 'real-estate' ? t('requestsPage.typeRealEstate') : item.type === 'car' ? t('requestsPage.typeCar') : t('requestsPage.typePlate')}
 </span>
 </div>
 <div className="flex items-center justify-between">
 <p className="text-xs text-gray-500 truncate flex items-center gap-1">
 <MapPin size={10} /> {t(item.locationKey)}
 </p>
 <p className="text-sm font-black text-[#0F766E]">{item.price.toLocaleString()}</p>
 </div>
 </div>
 </div>
 ))}
 </div>
 {filteredData.length > 5 && (
 <div className="p-3 text-center bg-gray-50 border-t border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
 <span className="text-xs font-bold text-[#0F766E]">{t('requestsPage.showAllResults', { count: filteredData.length })}</span>
 </div>
 )}
 </>
 ) : (
 <div className="p-6 text-center text-gray-500">
 <p className="text-sm font-medium">{t('requestsPage.noSearchResults', { query: searchQuery })}</p>
 </div>
 )}
 </div>
 )}
 <Search className="absolute end-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
 </div>

 <div className="flex gap-2">
 <button
 onClick={() => setShowFilters(!showFilters)}
 className={`h-14 px-6 rounded-xl border flex items-center gap-2 font-bold whitespace-nowrap transition-all ${showFilters ? 'bg-gray-900 text-white border-gray-900' : 'bg-white border-gray-200 text-gray-700 hover:border-[#0F766E]'}`}
 >
 <Filter size={18} />
 <span>{showFilters ? t('requestsPage.hideFilters') : t('requestsPage.advancedFilters')}</span>
 </button>
 </div>
 </div>
 </div>
 </div>

 <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
 <div className="flex flex-col lg:flex-row gap-8">

 {/* Advanced Sidebar Filters - RIGHT SIDE */}
 <aside className={`lg:w-72 flex-shrink-0 space-y-6 transition-all duration-300 ${showFilters ? 'block' : 'hidden lg:block'}`}>

 {/* Filters Container */}
 <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm sticky top-[240px] max-h-[calc(100vh-260px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
 <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
 <h3 className="font-bold text-gray-900 flex items-center gap-2">
 <SlidersHorizontal size={18} className="text-[#0F766E]" />
 {t('requestsPage.filterOptions')}
 </h3>
 <button
 onClick={() => { setSelectedCities([]); setPropertyType([]); setCarMake([]); setActiveCategory('all'); }}
 className="text-xs text-red-500 font-bold hover:underline"
 >
 {t('requestsPage.clearAll')}
 </button>
 </div>

 <div className="space-y-5">
 {/* Category Filter */}
 <div>
 <label className="text-sm font-bold text-gray-700 mb-3 block">{t('requestsPage.section')}</label>
 <div className="grid grid-cols-2 gap-2">
 {categories.map((cat) => (
 <button
 key={cat.id}
 onClick={() => setActiveCategory(cat.id)}
 className={`flex items-center justify-center gap-2 px-2 py-2.5 rounded-xl border text-xs font-bold transition-all ${
 activeCategory === cat.id
 ? 'bg-[#0F766E] text-white border-[#0F766E] shadow-md'
 : 'bg-white text-gray-600 border-gray-200 hover:border-[#0F766E] hover:bg-gray-50'
 }`}
 >
 <cat.icon size={14} />
 <span>{t(cat.labelKey)}</span>
 </button>
 ))}
 </div>
 </div>

 {/* Common Filters */}
 <div>
 <label className="text-sm font-bold text-gray-700 mb-3 block">{t('requestsPage.priceRange')}</label>
 <div className="flex items-center gap-2 mb-3">
 <div className="relative flex-1">
 <input type="number" min="0" placeholder={t('requestsPage.from')} className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-sm font-bold outline-none focus:border-[#0F766E] focus:bg-white transition-colors" onKeyDown={(e) => { if (e.key === '-' || e.key === 'e') e.preventDefault(); }} />
 <span className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400"><RiyalSymbol className="w-3 h-3 text-gray-400" /></span>
 </div>
 <span className="text-gray-300">-</span>
 <div className="relative flex-1">
 <input type="number" min="0" placeholder={t('requestsPage.to')} className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-sm font-bold outline-none focus:border-[#0F766E] focus:bg-white transition-colors" onKeyDown={(e) => { if (e.key === '-' || e.key === 'e') e.preventDefault(); }} />
 <span className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400"><RiyalSymbol className="w-3 h-3 text-gray-400" /></span>
 </div>
 </div>
 <input
 type="range"
 className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0F766E]"
 />
 </div>

 <div className="border-t border-gray-100 pt-5">
 <label className="text-sm font-bold text-gray-700 mb-3 block">{t('requestsPage.city')}</label>
 <div className="space-y-2 max-h-40 overflow-y-auto pe-1 scrollbar-thin scrollbar-thumb-gray-100">
 {cities.map(city => (
 <label key={city} className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
 <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${selectedCities.includes(city) ? 'bg-[#0F766E] border-[#0F766E]' : 'border-gray-300 group-hover:border-[#0F766E]'}`}>
 {selectedCities.includes(city) && <CheckCircle2 size={12} className="text-white" />}
 </div>
 <input
 type="checkbox"
 className="hidden"
 checked={selectedCities.includes(city)}
 onChange={() => handleCityToggle(city)}
 />
 <span className={`text-sm font-medium transition-colors ${selectedCities.includes(city) ? 'text-[#0F766E] font-bold' : 'text-gray-600 group-hover:text-gray-900'}`}>{city}</span>
 </label>
 ))}
 </div>
 </div>

 {/* Dynamic Category Filters */}
 {renderCategorySpecificFilters()}

 <div className="border-t border-gray-100 pt-5">
 <label className="text-sm font-bold text-gray-700 mb-3 block">{t('requestsPage.offerStatus')}</label>
 <div className="flex flex-wrap gap-2">
 <button className="px-4 py-2 rounded-xl bg-[#0F766E]/10 text-[#0F766E] text-xs font-bold border border-[#0F766E] shadow-sm">{t('requestsPage.new')}</button>
 <button className="px-4 py-2 rounded-xl bg-gray-50 text-gray-500 text-xs font-bold border border-gray-200 hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all">{t('requestsPage.used')}</button>
 </div>
 </div>
 </div>
 </div>
 </aside>

 {/* Main Content Grid - CENTER */}
 <main className="flex-1">
 {/* Sort & Count Bar */}
 <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
 <p className="text-gray-600 font-medium text-sm" dangerouslySetInnerHTML={{ __html: t('requestsPage.resultsFound', { count: filteredData.length }) }} />
 <div className="flex items-center gap-2">
 <span className="text-xs font-bold text-gray-400 hidden sm:inline">{t('requestsPage.sortBy')}</span>
 <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:border-[#0F766E] hover:bg-white transition-all group">
 <span>{t('requestsPage.newest')}</span>
 <ArrowUpDown size={14} className="text-gray-400 group-hover:text-[#0F766E]" />
 </button>
 </div>
 </div>

 {/* Items List - Redesigned Cards */}
 <div className="space-y-5">
 {filteredData.map((item) => (
 <div key={item.id} className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-[#0F766E]/30 transition-all duration-300 flex flex-col md:flex-row">
 {/* Image Side */}
 <div className="md:w-72 h-56 md:h-auto relative flex-shrink-0">
 <img src={item.image} alt={t(item.titleKey)} className="w-full h-full object-cover" />
 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-none opacity-60 md:opacity-100"></div>
 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors hidden md:block"></div>

 {/* Status Badge */}
 <div className="absolute top-3 end-3 flex flex-col gap-2 z-10">
 <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-black text-[#0F766E] flex items-center gap-1.5 shadow-sm border border-teal-100">
 <CheckCircle2 size={14} className="text-[#0F766E]" />
 {t('requestsPage.approvedRequest')}
 </div>
 {item.isDirectSale && (
 <div className="bg-orange-500/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-black text-white flex items-center gap-1.5 shadow-sm">
 <Tag size={14} />
 {t('requestsPage.directSale')}
 </div>
 )}
 </div>

 <div className="absolute bottom-3 end-3 start-3 flex justify-between items-end md:hidden">
 <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-white text-[10px] font-bold flex items-center gap-1">
 <MapPin size={10} /> {t(item.locationKey)}
 </div>
 </div>
 </div>

 {/* Content Side */}
 <div className="p-5 md:p-6 flex flex-col flex-1 relative">
 <div className="flex items-start justify-between mb-4">
 <div>
 <div className="flex items-center gap-2 mb-2">
 <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg border ${
 item.type === 'real-estate' ? 'bg-blue-50 text-blue-700 border-blue-200' :
 item.type === 'car' ? 'bg-orange-50 text-orange-700 border-orange-200' :
 item.type === 'plate' ? 'bg-purple-50 text-purple-700 border-purple-200' :
 'bg-gray-50 text-gray-700 border-gray-200'
 }`}>
 {item.type === 'real-estate' ? t('requestsPage.typeRealEstate') : item.type === 'car' ? t('requestsPage.typeCar') : item.type === 'plate' ? t('requestsPage.typePlate') : t('requestsPage.typeOther')}
 </span>
 <span className="h-4 w-[1px] bg-gray-300"></span>
 <span className="text-[11px] font-medium text-gray-500 flex items-center gap-1">
 <ClockIcon /> {t(item.dateKey)}
 </span>
 <span className="h-4 w-[1px] bg-gray-300 hidden md:block"></span>
 <span className="text-[11px] font-medium text-gray-500 items-center gap-1 hidden md:flex">
 <MapPin size={12} /> {t(item.locationKey)}
 </span>
 </div>
 <h3 className="font-bold text-gray-900 text-lg md:text-xl group-hover:text-[#0F766E] transition-colors line-clamp-1">{t(item.titleKey)}</h3>
 </div>
 <button className="w-10 h-10 rounded-full bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-colors border border-gray-100">
 <Heart size={20} />
 </button>
 </div>

 {/* Specs Grid */}
 <div className="grid grid-cols-3 gap-3 mb-6">
 {item.specs.map((spec, idx) => (
 <div key={idx} className="bg-gray-50 rounded-xl p-3 border border-gray-100 flex flex-col items-center justify-center text-center group-hover:border-[#0F766E]/20 group-hover:bg-[#0F766E]/5 transition-colors">
 <span className="text-[11px] text-gray-500 mb-1">{t(spec.labelKey)}</span>
 <span className="text-sm font-black text-gray-800">{t(spec.valueKey)}</span>
 </div>
 ))}
 </div>

 <div className="mt-auto flex flex-col md:flex-row md:items-center justify-between gap-4 pt-5 border-t border-gray-100">
 <div>
 <p className="text-xs text-gray-500 font-bold mb-1">{t('requestsPage.requestedPrice')}</p>
 <div className="flex items-baseline gap-1 font-mono">
 <p className="text-2xl font-black text-[#0F766E]">{item.price.toLocaleString()}</p>
 <RiyalSymbol className="w-4 h-4 text-gray-500" />
 </div>
 </div>

 <div className="flex gap-3 w-full md:w-auto">
 <button className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-white border-2 border-gray-100 text-gray-700 font-bold text-sm hover:border-[#0F766E] hover:text-[#0F766E] transition-colors">
 {t('requestsPage.details')}
 </button>
 <button className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-[#0F766E] text-white font-bold text-sm hover:bg-[#0d615b] shadow-lg shadow-teal-700/20 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
 <MessageCircle size={18} />
 {t('requestsPage.contact')}
 </button>
 </div>
 </div>
 </div>
 </div>
 ))}
 </div>

 {/* Empty State */}
 {filteredData.length === 0 && (
 <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 border-dashed animate-in fade-in zoom-in duration-300">
 <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
 <Search size={48} />
 </div>
 <h3 className="text-2xl font-black text-gray-900 mb-3">{t('requestsPage.noResults')}</h3>
 <p className="text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">{t('requestsPage.noResultsDesc')}</p>
 <div className="flex justify-center gap-4">
 <button
 onClick={() => { setActiveCategory('all'); setSearchQuery(''); setShowFilters(false); }}
 className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
 >
 {t('requestsPage.clearFilters')}
 </button>
 <button className="px-6 py-3 bg-[#0F766E] text-white rounded-xl font-bold hover:bg-[#0d615b] transition-all shadow-lg shadow-teal-700/20">
 {t('requestsPage.addRequestNow')}
 </button>
 </div>
 </div>
 )}
 </main>

 {/* Ad Banner - LEFT SIDE (Structurally last in RTL) */}
 <aside className="lg:w-64 flex-shrink-0 hidden lg:block">
 <div className="sticky top-[240px]">
 <div className="bg-[#0F766E] rounded-2xl p-6 text-white text-center relative overflow-hidden shadow-lg shadow-teal-900/10">
 <div className="absolute top-0 start-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
 <div className="relative z-10">
 <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
 <Package size={24} className="text-white" />
 </div>
 <h3 className="font-bold text-lg mb-2">{t('requestsPage.lookingForFinancing')}</h3>
 <p className="text-sm text-teal-100 mb-4 leading-relaxed">{t('requestsPage.financingDesc')}</p>
 <button className="w-full py-3 bg-white text-[#0F766E] rounded-xl font-bold text-sm hover:bg-teal-50 transition-colors shadow-lg shadow-black/5">{t('requestsPage.submitRequest')}</button>
 </div>
 </div>
 </div>
 </aside>
 </div>
 </div>
 </div>
 );
};

// Simple Icons
const ClockIcon = () => (
 <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
