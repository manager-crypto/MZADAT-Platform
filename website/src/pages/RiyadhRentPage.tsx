import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
 Search,
 SlidersHorizontal,
 MapPin,
 Bed,
 Bath,
 Maximize,
 Heart,
 Phone,
 MessageCircle,
 Star,
 Calendar,
 TrendingUp,
 Building2,
 Home,
 DollarSign,
 Filter,
 X,
 ChevronDown
} from 'lucide-react';
import { RentalPropertyCard } from '../components/rentals/RentalPropertyCard';
import { RiyalSymbol } from '../components/ui/RiyalSymbol';
import heroImage from 'figma:asset/a11b8294fd1ef4929326789444a13080ba58788a.png';

interface Property {
 id: number;
 title: string;
 location: string;
 district: string;
 price: number;
 priceType: 'monthly' | 'yearly';
 bedrooms: number;
 bathrooms: number;
 area: number;
 image: string;
 featured: boolean;
 verified: boolean;
 rating: number;
 type: 'apartment' | 'villa' | 'townhouse' | 'studio';
 furnished: boolean;
 amenities: string[];
}

interface RiyadhRentPageProps {
 onNavigate: (page: string) => void;
 onPropertyClick?: (property: Property) => void;
}

export const RiyadhRentPage: React.FC<RiyadhRentPageProps> = ({ onNavigate, onPropertyClick }) => {
 const { t } = useTranslation();
 const [searchTerm, setSearchTerm] = useState('');
 const [showFilters, setShowFilters] = useState(false);
 const [selectedDistrict, setSelectedDistrict] = useState('all');
 const [selectedType, setSelectedType] = useState('all');
 const [priceRange, setPriceRange] = useState({ min: 0, max: 200000 });
 const [bedrooms, setBedrooms] = useState('all');
 const [rentType, setRentType] = useState('all');
 const [furnished, setFurnished] = useState('all');
 const [sortBy, setSortBy] = useState('featured');

 // Mock data for Riyadh properties
 const properties: Property[] = [
 {
 id: 1,
 title: t('riyadhRent.prop1Title'),
 location: t('riyadhRent.riyadh'),
 district: t('riyadhRent.districtMalqa'),
 price: 45000,
 priceType: 'yearly',
 bedrooms: 3,
 bathrooms: 2,
 area: 180,
 image: 'https://images.unsplash.com/photo-1646662521253-5b9253b1a207?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXlhZGglMjBsdXh1cnklMjBhcGFydG1lbnR8ZW58MXx8fHwxNzcwNDAxODE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
 featured: true,
 verified: true,
 rating: 4.8,
 type: 'apartment',
 furnished: true,
 amenities: [t('riyadhRent.amenityPool'), t('riyadhRent.amenityParking'), t('riyadhRent.amenitySecurity247'), t('riyadhRent.amenityGym')]
 },
 {
 id: 2,
 title: t('riyadhRent.prop2Title'),
 location: t('riyadhRent.riyadh'),
 district: t('riyadhRent.districtYasmin'),
 price: 120000,
 priceType: 'yearly',
 bedrooms: 5,
 bathrooms: 4,
 area: 450,
 image: 'https://images.unsplash.com/photo-1673538104712-62c9ac12462f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXlhZGglMjBtb2Rlcm4lMjB2aWxsYXxlbnwxfHx8fDE3NzA0MDE4MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
 featured: true,
 verified: true,
 rating: 4.9,
 type: 'villa',
 furnished: false,
 amenities: [t('riyadhRent.amenityGarden'), t('riyadhRent.amenityPool2'), t('riyadhRent.amenityParking4'), t('riyadhRent.amenityMaidRoom')]
 },
 {
 id: 3,
 title: t('riyadhRent.prop3Title'),
 location: t('riyadhRent.riyadh'),
 district: t('riyadhRent.districtNarjis'),
 price: 3500,
 priceType: 'monthly',
 bedrooms: 2,
 bathrooms: 2,
 area: 120,
 image: 'https://images.unsplash.com/photo-1646662521253-5b9253b1a207?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXlhZGglMjByZXNpZGVudGlhbCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc3MDQwMTgxOHww&ixlib=rb-4.1.0&q=80&w=1080',
 featured: false,
 verified: true,
 rating: 4.6,
 type: 'apartment',
 furnished: true,
 amenities: [t('riyadhRent.amenityParking'), t('riyadhRent.amenityElevator'), t('riyadhRent.amenitySecurity')]
 },
 {
 id: 4,
 title: t('riyadhRent.prop4Title'),
 location: t('riyadhRent.riyadh'),
 district: t('riyadhRent.districtGhadir'),
 price: 95000,
 priceType: 'yearly',
 bedrooms: 4,
 bathrooms: 3,
 area: 350,
 image: 'https://images.unsplash.com/photo-1673538104712-62c9ac12462f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXlhZGglMjBtb2Rlcm4lMjB2aWxsYXxlbnwxfHx8fDE3NzA0MDE4MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
 featured: true,
 verified: true,
 rating: 4.7,
 type: 'villa',
 furnished: false,
 amenities: [t('riyadhRent.amenityPrivatePool'), t('riyadhRent.amenityGarden'), t('riyadhRent.amenityCoveredParking'), t('riyadhRent.amenityDriverRoom')]
 },
 {
 id: 5,
 title: t('riyadhRent.prop5Title'),
 location: t('riyadhRent.riyadh'),
 district: t('riyadhRent.districtOlaya'),
 price: 4200,
 priceType: 'monthly',
 bedrooms: 1,
 bathrooms: 1,
 area: 85,
 image: 'https://images.unsplash.com/photo-1646662521253-5b9253b1a207?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXlhZGglMjBsdXh1cnklMjBhcGFydG1lbnR8ZW58MXx8fHwxNzcwNDAxODE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
 featured: false,
 verified: true,
 rating: 4.5,
 type: 'apartment',
 furnished: true,
 amenities: [t('riyadhRent.amenityCentral'), t('riyadhRent.amenityNearServices'), t('riyadhRent.amenityFullyFurnished')]
 },
 {
 id: 6,
 title: t('riyadhRent.prop6Title'),
 location: t('riyadhRent.riyadh'),
 district: t('riyadhRent.districtRabwa'),
 price: 65000,
 priceType: 'yearly',
 bedrooms: 3,
 bathrooms: 3,
 area: 220,
 image: 'https://images.unsplash.com/photo-1646662521253-5b9253b1a207?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXlhZGglMjByZXNpZGVudGlhbCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc3MDQwMTgxOHww&ixlib=rb-4.1.0&q=80&w=1080',
 featured: false,
 verified: true,
 rating: 4.4,
 type: 'townhouse',
 furnished: false,
 amenities: [t('riyadhRent.amenitySmallGarden'), t('riyadhRent.amenityTwoParking'), t('riyadhRent.amenityGatedCompound')]
 }
 ];

 const riyadhDistricts = [
 t('riyadhRent.districtAll'),
 t('riyadhRent.districtMalqa'),
 t('riyadhRent.districtYasmin'),
 t('riyadhRent.districtNarjis'),
 t('riyadhRent.districtGhadir'),
 t('riyadhRent.districtOlaya'),
 t('riyadhRent.districtRabwa'),
 t('riyadhRent.districtNada'),
 t('riyadhRent.districtSahafa'),
 t('riyadhRent.districtWoroud'),
 t('riyadhRent.districtMuruj'),
 ];

 const propertyTypes = [
 { value: 'all', label: t('riyadhRent.typeAll'), icon: Building2 },
 { value: 'apartment', label: t('riyadhRent.typeApartment'), icon: Building2 },
 { value: 'villa', label: t('riyadhRent.typeVilla'), icon: Home },
 { value: 'townhouse', label: t('riyadhRent.typeTownhouse'), icon: Building2 },
 { value: 'studio', label: t('riyadhRent.typeStudio'), icon: Building2 }
 ];

 const formatPrice = (price: number, type: 'monthly' | 'yearly') => {
 return <span className="flex items-center gap-1">{price.toLocaleString('en-US')} <RiyalSymbol className="w-3 h-3" /> {type === 'monthly' ? t('riyadhRent.monthly') : t('riyadhRent.yearly')}</span>;
 };

 const filteredProperties = properties.filter(property => {
 if (selectedDistrict !== 'all' && property.district !== selectedDistrict) return false;
 if (selectedType !== 'all' && property.type !== selectedType) return false;
 if (rentType !== 'all' && property.priceType !== rentType) return false;
 if (bedrooms !== 'all' && property.bedrooms !== parseInt(bedrooms)) return false;
 if (furnished !== 'all') {
 if (furnished === 'furnished' && !property.furnished) return false;
 if (furnished === 'unfurnished' && property.furnished) return false;
 }
 if (searchTerm && !property.title.includes(searchTerm) && !property.district.includes(searchTerm)) return false;
 return true;
 });

 return (
 <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-36">
 {/* Hero Section */}
 <div className="relative bg-[#0f172a] text-white py-20 overflow-hidden">
 <div className="absolute inset-0">
 <div className="absolute inset-0" style={{
 backgroundImage: `url("https://images.unsplash.com/photo-1722966885396-1f3dcebdf27f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSaXlhZGglMjBza3lsaW5lJTIwbW9kZXJuJTIwbHV4dXJ5JTIwYXJjaGl0ZWN0dXJlJTIwbmlnaHR8ZW58MXx8fHwxNzcwNDg0NzQxfDA&ixlib=rb-4.1.0&q=80&w=1080")`,
 backgroundSize: 'cover',
 backgroundPosition: 'center'
 }} />
 <div className="absolute inset-0 bg-black/60" />
 </div>

 <div className="max-w-7xl mx-auto px-6 relative z-10">
 <div className="text-center mb-12">
 <div className="inline-flex items-center gap-2 bg-[#47CCD0]/20 px-4 py-2 rounded-full mb-6">
 <MapPin size={18} className="text-[#47CCD0]" />
 <span className="text-sm font-bold text-[#47CCD0]">{t('riyadhRent.heroBadge')}</span>
 </div>
 <h1 className="text-5xl font-bold mb-4">{t('riyadhRent.heroTitle')}</h1>
 <p className="text-xl text-white/80 max-w-2xl mx-auto">
 {t('riyadhRent.heroSubtitle')}
 </p>
 </div>

 {/* Search Bar */}
 <div className="max-w-4xl mx-auto">
 <div className="bg-white rounded-2xl shadow-2xl p-6">
 <div className="flex gap-4">
 <div className="flex-1 relative">
 <Search className="absolute end-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
 <input
 type="text"
 placeholder={t('riyadhRent.searchPlaceholder')}
 className="w-full pe-12 ps-4 py-4 rounded-xl border-2 border-gray-200 focus:border-[#47CCD0] focus:outline-none text-gray-800"
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 />
 </div>
 <button
 onClick={() => setShowFilters(!showFilters)}
 className="px-6 py-4 bg-[#47CCD0] text-white rounded-xl font-bold hover:bg-[#3bb3b7] transition-all flex items-center gap-2"
 >
 <SlidersHorizontal size={20} />
 <span>{t('riyadhRent.filter')}</span>
 </button>
 </div>

 {/* Advanced Filters */}
 {showFilters && (
 <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
 {/* District Filter */}
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-2">{t('riyadhRent.labelDistrict')}</label>
 <select
 value={selectedDistrict}
 onChange={(e) => setSelectedDistrict(e.target.value)}
 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#47CCD0] focus:outline-none text-gray-800"
 >
 {riyadhDistricts.map((district, idx) => (
 <option key={idx} value={idx === 0 ? 'all' : district}>
 {district}
 </option>
 ))}
 </select>
 </div>

 {/* Property Type Filter */}
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-2">{t('riyadhRent.labelPropertyType')}</label>
 <select
 value={selectedType}
 onChange={(e) => setSelectedType(e.target.value)}
 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#47CCD0] focus:outline-none text-gray-800"
 >
 {propertyTypes.map((type) => (
 <option key={type.value} value={type.value}>
 {type.label}
 </option>
 ))}
 </select>
 </div>

 {/* Rent Type Filter */}
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-2">{t('riyadhRent.labelRentDuration')}</label>
 <select
 value={rentType}
 onChange={(e) => setRentType(e.target.value)}
 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#47CCD0] focus:outline-none text-gray-800"
 >
 <option value="all">{t('riyadhRent.all')}</option>
 <option value="yearly">{t('riyadhRent.yearlyLabel')}</option>
 <option value="monthly">{t('riyadhRent.monthlyLabel')}</option>
 </select>
 </div>

 {/* Bedrooms Filter */}
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-2">{t('riyadhRent.labelBedrooms')}</label>
 <select
 value={bedrooms}
 onChange={(e) => setBedrooms(e.target.value)}
 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#47CCD0] focus:outline-none text-gray-800"
 >
 <option value="all">{t('riyadhRent.all')}</option>
 <option value="1">{t('riyadhRent.room1')}</option>
 <option value="2">{t('riyadhRent.room2')}</option>
 <option value="3">{t('riyadhRent.room3')}</option>
 <option value="4">{t('riyadhRent.room4')}</option>
 <option value="5">{t('riyadhRent.room5plus')}</option>
 </select>
 </div>

 {/* Furnished Filter */}
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-2">{t('riyadhRent.labelFurnished')}</label>
 <select
 value={furnished}
 onChange={(e) => setFurnished(e.target.value)}
 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#47CCD0] focus:outline-none text-gray-800"
 >
 <option value="all">{t('riyadhRent.all')}</option>
 <option value="furnished">{t('riyadhRent.furnished')}</option>
 <option value="unfurnished">{t('riyadhRent.unfurnished')}</option>
 </select>
 </div>

 {/* Sort By */}
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-2">{t('riyadhRent.labelSortBy')}</label>
 <select
 value={sortBy}
 onChange={(e) => setSortBy(e.target.value)}
 className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#47CCD0] focus:outline-none text-gray-800"
 >
 <option value="featured">{t('riyadhRent.sortFeatured')}</option>
 <option value="price-low">{t('riyadhRent.sortPriceLow')}</option>
 <option value="price-high">{t('riyadhRent.sortPriceHigh')}</option>
 <option value="rating">{t('riyadhRent.sortRating')}</option>
 <option value="newest">{t('riyadhRent.sortNewest')}</option>
 </select>
 </div>

 {/* Reset Filters */}
 <div className="flex items-end">
 <button
 onClick={() => {
 setSelectedDistrict('all');
 setSelectedType('all');
 setRentType('all');
 setBedrooms('all');
 setFurnished('all');
 setSearchTerm('');
 }}
 className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
 >
 <X size={18} />
 <span>{t('riyadhRent.resetFilters')}</span>
 </button>
 </div>
 </div>
 )}
 </div>
 </div>
 </div>
 </div>

 {/* Stats Section */}
 <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
 <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
 <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#47CCD0]">
 <div className="flex items-center justify-between">
 <div>
 <p className="text-sm text-gray-600 mb-1">{t('riyadhRent.statTotal')}</p>
 <p className="text-3xl font-bold text-gray-900">{filteredProperties.length}</p>
 </div>
 <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center">
 <Building2 size={28} className="text-[#47CCD0]" />
 </div>
 </div>
 </div>

 <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#2B3D50]">
 <div className="flex items-center justify-between">
 <div>
 <p className="text-sm text-gray-600 mb-1">{t('riyadhRent.statFeatured')}</p>
 <p className="text-3xl font-bold text-gray-900">
 {filteredProperties.filter(p => p.featured).length}
 </p>
 </div>
 <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center">
 <Star size={28} className="text-[#2B3D50] fill-[#2B3D50]" />
 </div>
 </div>
 </div>

 <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#47CCD0]">
 <div className="flex items-center justify-between">
 <div>
 <p className="text-sm text-gray-600 mb-1">{t('riyadhRent.statAvgRent')}</p>
 <p className="text-2xl font-bold text-gray-900 font-mono">55,000</p>
 <p className="text-xs text-gray-500 font-bold mt-1 flex items-center gap-1 justify-center"><RiyalSymbol className="w-3 h-3 text-gray-500" /> {t('riyadhRent.yearly')}</p>
 </div>
 <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center">
 <DollarSign size={28} className="text-[#47CCD0]" />
 </div>
 </div>
 </div>

 <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#2B3D50]">
 <div className="flex items-center justify-between">
 <div>
 <p className="text-sm text-gray-600 mb-1">{t('riyadhRent.statDistricts')}</p>
 <p className="text-3xl font-bold text-gray-900">{riyadhDistricts.length - 1}</p>
 </div>
 <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center">
 <MapPin size={28} className="text-[#2B3D50]" />
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* Properties Grid */}
 <div className="max-w-7xl mx-auto px-6 py-16">
 <div className="flex items-center justify-between mb-8">
 <h2 className="text-3xl font-bold text-gray-900">
 {t('riyadhRent.availableProperties')} ({filteredProperties.length})
 </h2>
 </div>

 {filteredProperties.length === 0 ? (
 <div className="text-center py-20">
 <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
 <Search size={48} className="text-gray-400" />
 </div>
 <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('riyadhRent.noResults')}</h3>
 <p className="text-gray-600 mb-6">{t('riyadhRent.noResultsHint')}</p>
 <button
 onClick={() => {
 setSelectedDistrict('all');
 setSelectedType('all');
 setRentType('all');
 setBedrooms('all');
 setFurnished('all');
 setSearchTerm('');
 }}
 className="px-6 py-3 bg-[#47CCD0] text-white rounded-xl font-bold hover:bg-[#3bb3b7] transition-all"
 >
 {t('riyadhRent.resetFilters')}
 </button>
 </div>
 ) : (
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 {filteredProperties.map((property) => (
 <RentalPropertyCard
 key={property.id}
 property={property}
 onClick={() => onPropertyClick && onPropertyClick(property)}
 onPreviewClick={(e) => {
 e.stopPropagation();
 if (onPropertyClick) onPropertyClick(property);
 }}
 />
 ))}
 </div>
 )}
 </div>

 {/* CTA Section */}
 <div className="bg-[#0f172a] text-white py-16">
 <div className="max-w-7xl mx-auto px-6 text-center">
 <h2 className="text-4xl font-bold mb-4">{t('riyadhRent.ctaTitle')}</h2>
 <p className="text-xl text-white/80 mb-8">
 {t('riyadhRent.ctaSubtitle')}
 </p>
 <div className="flex items-center justify-center gap-4">
 <button className="px-8 py-4 bg-[#47CCD0] text-white rounded-xl font-bold hover:bg-[#3bb3b7] transition-all flex items-center gap-2">
 <Phone size={20} />
 <span>{t('riyadhRent.ctaContact')}</span>
 </button>
 <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold hover:bg-white/20 transition-all border border-white/20">
 {t('riyadhRent.ctaViewAll')}
 </button>
 </div>
 </div>
 </div>
 </div>
 );
};
