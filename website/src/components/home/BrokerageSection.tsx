import React, { useState } from 'react';
import { 
 Search, MapPin, Home, LayoutGrid, User, ShieldCheck, ChevronDown, Heart, Calendar, Percent, QrCode, SlidersHorizontal 
} from 'lucide-react';
import { RiyalSymbol } from '../ui/RiyalSymbol';
import { useTranslation } from 'react-i18next';

export const BrokerageSection = ({ onNavigate, onPropertyClick }: { onNavigate?: (path: string) => void, onPropertyClick?: (prop: any) => void }) => {
 const { t } = useTranslation();
 const [searchQuery, setSearchQuery] = useState('');
 const [selectedCity, setSelectedCity] = useState('');
 const [selectedDistrict, setSelectedDistrict] = useState('');
 const [selectedPropertyType, setSelectedPropertyType] = useState('');
 const [selectedPriceRange, setSelectedPriceRange] = useState('');
 const [selectedAreaRange, setSelectedAreaRange] = useState('');
 const [activeTag, setActiveTag] = useState('');
 const [openDropdown, setOpenDropdown] = useState('');

 const toggleDropdown = (name: string) => {
 setOpenDropdown(prev => prev === name ? '' : name);
 };

 const handleSelect = (setter: any, value: string) => {
 setter(value);
 setOpenDropdown('');
 };

 const cities = [
 { key: 'all', label: t('brokerageFilter.all') },
 { key: 'riyadh', label: t('headerDrop.cities.riyadh') },
 { key: 'jeddah', label: t('headerDrop.cities.jeddah') },
 { key: 'dammam', label: t('brokerageFilter.cityDammam') },
 { key: 'makkah', label: t('headerDrop.cities.makkah') },
 { key: 'madinah', label: t('headerDrop.cities.madinah') },
 { key: 'khobar', label: t('brokerageFilter.cityKhobar') },
 { key: 'abha', label: t('brokerageFilter.cityAbha') },
 ];

 const getCityLabel = (key: string) => cities.find(c => c.key === key)?.label || t('brokerageFilter.saudiArabia');

 const districts = [
 { key: 'all', label: t('brokerageFilter.all') },
 { key: 'yasmin', label: t('brokerageFilter.districtYasmin') },
 { key: 'kingfahd', label: t('brokerageFilter.districtKingFahd') },
 { key: 'shati', label: t('brokerageFilter.districtShati') },
 ];
 const propertyTypes = [
 { key: 'all', label: t('brokerageFilter.all') },
 { key: 'residential', label: t('brokerageFilter.residential') },
 { key: 'commercial', label: t('brokerageFilter.commercial') },
 ];
 const priceRanges = [
 { key: 'all', label: t('brokerageFilter.all') },
 { key: 'below1M', label: t('brokerageFilter.priceBelow1M') },
 { key: '1to3M', label: t('brokerageFilter.price1to3M') },
 { key: 'above3M', label: t('brokerageFilter.priceAbove3M') },
 ];
 const areaRanges = [
 { key: 'all', label: t('brokerageFilter.all') },
 { key: 'below200', label: t('brokerageFilter.areaBelow200') },
 { key: '200to400', label: t('brokerageFilter.area200to400') },
 { key: 'above400', label: t('brokerageFilter.areaAbove400') },
 ];
 const quickTags = [
 { key: 'northRiyadh', label: t('brokerageFilter.northRiyadh') },
 { key: 'modernVillas', label: t('brokerageFilter.modernVillas') },
 { key: 'duplex', label: t('brokerageFilter.duplex') },
 { key: 'residentialLands', label: t('brokerageFilter.residentialLands') },
 { key: 'realEstateFinance', label: t('brokerageFilter.realEstateFinance') },
 { key: 'directFromOwner', label: t('brokerageFilter.directFromOwner') },
 ];

 const brokerageOffers = [
 {
 id: 1,
 title: t('brokerageFilter.item1Title'),
 location: t('brokerageFilter.item1Location'),
 price: 3200000,
 image: 'https://images.unsplash.com/photo-1765303314168-323faf51292b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
 typeKey: 'residential',
 statusKey: 'forSale',
 cityKey: 'riyadh',
 districtKey: 'yasmin',
 area: 450,
 rooms: 5,
 falLicense: 'FAL-1200012345',
 isLicenseActive: true,
 advertiserName: t('brokerageFilter.advertiser1Name'),
 officeName: t('brokerageFilter.advertiser1Office'),
 commission: t('brokerageFilter.item1Commission')
 },
 {
 id: 2,
 title: t('brokerageFilter.item2Title'),
 location: t('brokerageFilter.item2Location'),
 price: 150000,
 image: 'https://images.unsplash.com/photo-1770836560507-ba33be89e547?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
 typeKey: 'commercial',
 statusKey: 'forRent',
 cityKey: 'jeddah',
 districtKey: 'kingfahd',
 area: 200,
 rooms: 3,
 falLicense: 'FAL-1200045678',
 isLicenseActive: true,
 advertiserName: t('brokerageFilter.advertiser2Name'),
 officeName: t('brokerageFilter.advertiser2Office'),
 commission: t('brokerageFilter.item2Commission')
 },
 {
 id: 3,
 title: t('brokerageFilter.item3Title'),
 location: t('brokerageFilter.item3Location'),
 price: 85000,
 image: 'https://images.unsplash.com/photo-1738168279272-c08d6dd22002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
 typeKey: 'residential',
 statusKey: 'forRent',
 cityKey: 'dammam',
 districtKey: 'shati',
 area: 180,
 rooms: 4,
 falLicense: 'FAL-1200078901',
 isLicenseActive: false,
 advertiserName: t('brokerageFilter.advertiser3Name'),
 officeName: t('brokerageFilter.advertiser3Office'),
 commission: t('brokerageFilter.item3Commission')
 },
 ];

 const filteredBrokerageOffers = brokerageOffers.filter(offer => {
 if (searchQuery && !offer.title.toLowerCase().includes(searchQuery.toLowerCase()) && !offer.location.toLowerCase().includes(searchQuery.toLowerCase())) {
 return false;
 }
 if (selectedCity && selectedCity !== 'all' && offer.cityKey !== selectedCity) {
 return false;
 }
 if (selectedDistrict && selectedDistrict !== 'all' && offer.districtKey !== selectedDistrict) {
 return false;
 }
 if (selectedPropertyType && selectedPropertyType !== 'all' && offer.typeKey !== selectedPropertyType) {
 return false;
 }
 if (selectedPriceRange && selectedPriceRange !== 'all') {
 if (selectedPriceRange === 'below1M' && offer.price >= 1000000) return false;
 if (selectedPriceRange === '1to3M' && (offer.price < 1000000 || offer.price > 3000000)) return false;
 if (selectedPriceRange === 'above3M' && offer.price <= 3000000) return false;
 }
 if (selectedAreaRange && selectedAreaRange !== 'all') {
 if (selectedAreaRange === 'below200' && offer.area >= 200) return false;
 if (selectedAreaRange === '200to400' && (offer.area < 200 || offer.area > 400)) return false;
 if (selectedAreaRange === 'above400' && offer.area <= 400) return false;
 }
 if (activeTag) {
 if (activeTag === 'northRiyadh' && offer.cityKey !== 'riyadh') return false;
 if (activeTag === 'modernVillas' && offer.typeKey !== 'residential') return false;
 }
 return true;
 });

 return (
 <section className="pt-10 pb-8 bg-white lg:mt-0">
 <div className="w-full max-w-[1440px] mx-auto px-4">
 {/* Section Header */}
 <div className="flex justify-between items-end mb-6">
 <div className="text-end">
 <span className="text-[#47CCD0] text-sm font-bold tracking-widest mb-2 block">{t('brokerage.brokerageOffers')}</span>
 <div className="flex items-center gap-3">
 <h2 className="text-3xl text-black font-bold">{t('brokerage.latestProperties')}</h2>
 <span className="inline-flex items-center gap-1.5 bg-[#f0fdfa] text-[#166534] border border-[#bbf7d0] px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">
 <ShieldCheck size={14} />
 {t('brokerage.licensedByREGA')}
 </span>
 </div>
 </div>
 </div>

 {/* Advanced Filter Container */}
 <div className="bg-white rounded-[24px] border border-gray-200 shadow-sm p-4 mb-12">
 {/* Top Row */}
 <div className="flex flex-col lg:flex-row gap-3 mb-4">
 
 {/* Country / City */}
 <div className="relative">
 <button
 onClick={() => toggleDropdown('city')}
 className="flex items-center justify-between gap-3 px-4 py-3 border border-[#1B4345] rounded-xl hover:bg-gray-50 transition-colors text-sm text-[#1B4345] font-bold min-w-[200px] w-full lg:w-auto h-[46px]"
 >
 <div className="flex items-center gap-2">
 <img src="https://flagcdn.com/w20/sa.png" alt="SA" className="w-5 h-3.5 rounded-[2px]" />
 <span>{selectedCity && selectedCity !== 'all' ? getCityLabel(selectedCity) : t('brokerageFilter.saudiArabia')}</span>
 </div>
 <ChevronDown size={14} className={`text-[#1B4345] transition-transform ${openDropdown === 'city' ? 'rotate-180' : ''}`} />
 </button>
 {openDropdown === 'city' && (
 <div className="absolute top-full end-0 mt-2 w-full min-w-[200px] bg-white border border-gray-100 shadow-lg rounded-xl z-50 py-2">
 {cities.map(city => (
 <button
 key={city.key}
 onClick={() => handleSelect(setSelectedCity, city.key)}
 className={`w-full text-end px-4 py-2 text-sm hover:bg-gray-50 ${selectedCity === city.key ? 'text-[#47CCD0] font-medium bg-gray-50' : 'text-gray-700'}`}
 >
 {city.label}
 </button>
 ))}
 </div>
 )}
 </div>

 {/* District */}
 <div className="relative hidden sm:block">
 <button
 onClick={() => toggleDropdown('district')}
 className="flex items-center justify-between gap-4 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm text-gray-700 min-w-[140px] w-full lg:w-auto h-[46px]"
 >
 <span className={selectedDistrict ? 'text-black font-medium' : 'text-gray-400'}>
 {selectedDistrict && selectedDistrict !== 'all' ? districts.find(d => d.key === selectedDistrict)?.label : t('brokerageFilter.selectDistrict')}
 </span>
 <ChevronDown size={14} className={`text-gray-400 transition-transform ${openDropdown === 'district' ? 'rotate-180' : ''}`} />
 </button>
 {openDropdown === 'district' && (
 <div className="absolute top-full end-0 mt-2 w-full min-w-[140px] bg-white border border-gray-100 shadow-lg rounded-xl z-50 py-2">
 {districts.map(d => (
 <button
 key={d.key}
 onClick={() => handleSelect(setSelectedDistrict, d.label)}
 className={`w-full text-end px-4 py-2 text-sm hover:bg-gray-50 ${selectedDistrict === d.label ? 'text-[#47CCD0] font-medium bg-gray-50' : 'text-gray-700'}`}
 >
 {d.label}
 </button>
 ))}
 </div>
 )}
 </div>

 {/* Search Bar */}
 <div className="relative flex-1">
 <input
 type="text"
 placeholder={t('brokerageFilter.searchPlaceholder')}
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="w-full h-[46px] ps-10 pe-4 border border-gray-200 rounded-xl outline-none focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0]/20 text-sm text-gray-700 placeholder-gray-400"
 />
 <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
 </div>

 {/* Property Type */}
 <div className="relative hidden md:block">
 <button
 onClick={() => toggleDropdown('propertyType')}
 className="flex items-center justify-between gap-4 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm text-gray-700 min-w-[140px] w-full lg:w-auto h-[46px]"
 >
 <span className={selectedPropertyType ? 'text-black font-medium' : 'text-gray-700'}>
 {selectedPropertyType && selectedPropertyType !== 'all'
 ? propertyTypes.find(p => p.key === selectedPropertyType)?.label
 : t('brokerageFilter.propertyType')}
 </span>
 <ChevronDown size={14} className={`text-gray-400 transition-transform ${openDropdown === 'propertyType' ? 'rotate-180' : ''}`} />
 </button>
 {openDropdown === 'propertyType' && (
 <div className="absolute top-full end-0 mt-2 w-full min-w-[140px] bg-white border border-gray-100 shadow-lg rounded-xl z-50 py-2">
 {propertyTypes.map(pt => (
 <button
 key={pt.key}
 onClick={() => handleSelect(setSelectedPropertyType, pt.key)}
 className={`w-full text-end px-4 py-2 text-sm hover:bg-gray-50 ${selectedPropertyType === pt.key ? 'text-[#47CCD0] font-medium bg-gray-50' : 'text-gray-700'}`}
 >
 {pt.label}
 </button>
 ))}
 </div>
 )}
 </div>

 {/* Price */}
 <div className="relative hidden md:block">
 <button
 onClick={() => toggleDropdown('price')}
 className="flex items-center justify-between gap-4 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm text-gray-700 min-w-[120px] w-full lg:w-auto h-[46px]"
 >
 <span className={selectedPriceRange ? 'text-black font-medium' : 'text-gray-700'}>
 {selectedPriceRange && selectedPriceRange !== 'all'
 ? priceRanges.find(p => p.key === selectedPriceRange)?.label
 : t('brokerageFilter.price')}
 </span>
 <ChevronDown size={14} className={`text-gray-400 transition-transform ${openDropdown === 'price' ? 'rotate-180' : ''}`} />
 </button>
 {openDropdown === 'price' && (
 <div className="absolute top-full end-0 mt-2 w-full min-w-[140px] bg-white border border-gray-100 shadow-lg rounded-xl z-50 py-2">
 {priceRanges.map(pr => (
 <button
 key={pr.key}
 onClick={() => handleSelect(setSelectedPriceRange, pr.key)}
 className={`w-full text-end px-4 py-2 text-sm hover:bg-gray-50 ${selectedPriceRange === pr.key ? 'text-[#47CCD0] font-medium bg-gray-50' : 'text-gray-700'}`}
 >
 {pr.label}
 </button>
 ))}
 </div>
 )}
 </div>

 {/* Area */}
 <div className="relative hidden md:block">
 <button
 onClick={() => toggleDropdown('area')}
 className="flex items-center justify-between gap-4 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm text-gray-700 min-w-[120px] w-full lg:w-auto h-[46px]"
 >
 <span className={selectedAreaRange ? 'text-black font-medium' : 'text-gray-700'}>
 {selectedAreaRange && selectedAreaRange !== 'all'
 ? areaRanges.find(a => a.key === selectedAreaRange)?.label
 : t('brokerageFilter.area')}
 </span>
 <ChevronDown size={14} className={`text-gray-400 transition-transform ${openDropdown === 'area' ? 'rotate-180' : ''}`} />
 </button>
 {openDropdown === 'area' && (
 <div className="absolute top-full end-0 mt-2 w-full min-w-[140px] bg-white border border-gray-100 shadow-lg rounded-xl z-50 py-2">
 {areaRanges.map(ar => (
 <button
 key={ar.key}
 onClick={() => handleSelect(setSelectedAreaRange, ar.key)}
 className={`w-full text-end px-4 py-2 text-sm hover:bg-gray-50 ${selectedAreaRange === ar.key ? 'text-[#47CCD0] font-medium bg-gray-50' : 'text-gray-700'}`}
 >
 {ar.label}
 </button>
 ))}
 </div>
 )}
 </div>

 {/* More Filters / Clear */}
 <button
 onClick={() => {
 setSearchQuery('');
 setSelectedCity('');
 setSelectedDistrict('');
 setSelectedPropertyType('');
 setSelectedPriceRange('');
 setSelectedAreaRange('');
 setActiveTag('');
 setOpenDropdown('');
 }}
 className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors text-sm text-gray-700 whitespace-nowrap h-[46px] w-full lg:w-auto justify-center lg:justify-start"
 >
 <SlidersHorizontal size={16} className={activeTag || selectedCity || selectedDistrict || selectedPropertyType || selectedPriceRange || selectedAreaRange || searchQuery ? "text-red-500" : "text-gray-500"} />
 <span>{activeTag || selectedCity || selectedDistrict || selectedPropertyType || selectedPriceRange || selectedAreaRange || searchQuery ? t('brokerageFilter.clearFilters') : t('brokerageFilter.more')}</span>
 </button>

 </div>

 {/* Bottom Row - Quick Tags */}
 <div className="flex flex-wrap gap-2 justify-end lg:justify-start">
 {quickTags.map((tag) => (
 <button
 key={tag.key}
 onClick={() => setActiveTag(activeTag === tag.key ? '' : tag.key)}
 className={`px-5 py-2 rounded-full text-sm font-medium transition-colors border ${
 activeTag === tag.key
 ? 'bg-[#47CCD0] text-white border-[#47CCD0]'
 : 'bg-[#F8FAFB] hover:bg-gray-100 text-gray-600 border-transparent hover:border-gray-200'
 }`}
 >
 {tag.label}
 </button>
 ))}
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {filteredBrokerageOffers.length > 0 ? (
 filteredBrokerageOffers.map((item) => (
 <div key={item.id} className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:shadow-gray-200 hover:-translate-y-1 transition-all duration-500 relative">
 {/* Floating Compare Checkbox */}
 <div className="absolute top-4 start-4 z-30 flex flex-col gap-2">
 <button className="bg-white/90 backdrop-blur-md p-2 rounded-lg text-gray-400 hover:text-red-500 transition-colors shadow-sm" title={t('brokerageFilter.favorites')}>
 <Heart size={18} />
 </button>
 <label className="bg-white/90 backdrop-blur-md p-2 rounded-lg text-gray-400 hover:text-[#47CCD0] transition-colors shadow-sm cursor-pointer flex items-center justify-center" title={t('brokerageFilter.compare')}>
 <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#47CCD0] focus:ring-[#47CCD0] cursor-pointer" />
 </label>
 </div>

 {/* Image */}
 <div className="h-64 relative overflow-hidden bg-gray-100">
 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10 opacity-70"></div>
 <img 
 src={item.image} 
 alt={item.title} 
 className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
 />
 
 {/* Tags & FAL License */}
 <div className="absolute top-4 end-4 z-20 flex flex-col gap-2 items-start">
 <div className="flex gap-2">
 <span className="bg-white/95 backdrop-blur text-gray-900 text-xs px-3 py-1.5 rounded-lg shadow-sm font-medium">
 {item.typeKey === 'residential' ? t('brokerageFilter.residential') : t('brokerageFilter.commercial')}
 </span>
 <span className={`text-white text-xs px-3 py-1.5 rounded-lg shadow-sm font-medium ${item.statusKey === 'forSale' ? 'bg-[#47CCD0]' : 'bg-[#2B3D50]'}`}>
 {item.statusKey === 'forSale' ? t('brokerageFilter.forSale') : t('brokerageFilter.forRent')}
 </span>
 </div>
 <div className="flex items-center gap-1.5 bg-gray-800/80 backdrop-blur text-white text-[10px] px-2.5 py-1.5 rounded-full shadow-sm border border-gray-600/50">
 <div className={`w-2 h-2 rounded-full ${item.isLicenseActive ? 'bg-green-400 shadow-[0_0_4px_#4ade80]' : 'bg-red-500 shadow-[0_0_4px_#ef4444]'} animate-pulse`}></div>
 <span className="font-mono tracking-wider">{item.falLicense}</span>
 </div>
 </div>
 
 {/* Price Overlay */}
 <div className="absolute bottom-4 end-4 z-20 text-white">
 <p className="text-xs opacity-80 mb-1">{t('brokerageFilter.price')} <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded ms-1">{t('brokerageFilter.includesTax')}</span></p>
 <p className="text-2xl font-bold font-mono flex items-center gap-1.5">
 {item.price.toLocaleString()}
 <RiyalSymbol className="w-4 h-4" theme="light" />
 </p>
 </div>
 </div>

 {/* Content */}
 <div className="p-6 relative">
 {/* Floating Map Button */}
 <button
 onClick={(e) => {
 e.stopPropagation();
 window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.location)}`, '_blank');
 }}
 className="absolute -top-6 start-6 z-30 w-12 h-12 bg-[#47CCD0] hover:bg-[#3bb5b9] rounded-full text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300" title={t('brokerageFilter.viewOnMap')}
 >
 <MapPin size={20} />
 </button>

 <div className="flex justify-between items-start mb-3 pe-2">
 <h3 className="text-lg text-gray-900 group-hover:text-[#47CCD0] transition-colors line-clamp-1 font-medium">{item.title}</h3>
 </div>
 <p className="text-gray-500 text-sm flex items-center gap-2 mb-4">
 <MapPin size={16} className="text-[#47CCD0]" /> {item.location}
 </p>
 
 {/* Meta */}
 <div className="flex items-center justify-between py-4 border-t border-gray-100">
 <div className="flex items-center gap-2 text-gray-700 text-sm bg-gray-50 px-2 py-1.5 rounded-lg flex-1 mx-1 justify-center">
 <LayoutGrid size={16} className="text-gray-400" />
 <span className="text-xs">{item.area} {t('brokerageFilter.sqm')}</span>
 </div>
 <div className="flex items-center gap-2 text-gray-700 text-sm bg-gray-50 px-2 py-1.5 rounded-lg flex-1 mx-1 justify-center">
 <Home size={16} className="text-gray-400" />
 <span className="text-xs">{item.rooms} {t('brokerageFilter.rooms')}</span>
 </div>
 <div className="flex items-center gap-2 text-gray-700 text-sm bg-gray-50 px-2 py-1.5 rounded-lg flex-1 mx-1 justify-center">
 <Calendar size={16} className="text-gray-400" />
 <span className="text-xs">{t('brokerageFilter.propertyAge')}</span>
 </div>
 </div>

 {/* Commission */}
 {item.commission && (
 <div className="flex items-center gap-1.5 mt-2 mb-3">
 <span className="bg-blue-50 text-blue-700 text-[10px] px-2.5 py-1 rounded-md font-bold flex items-center gap-1 border border-blue-100">
 <Percent size={12} /> {item.commission}
 </span>
 </div>
 )}

 {/* Advertiser Info */}
 <div className="flex items-center justify-between pt-3 pb-2 border-t border-gray-100">
 <div className="flex items-center gap-3">
 <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-[#2B3D50]">
 <User size={14} />
 </div>
 <div>
 <p className="text-[10px] text-gray-400 mb-0.5">{t('brokerageFilter.advertiser')} {item.advertiserName}</p>
 <p className="text-xs font-bold text-gray-700 line-clamp-1">{item.officeName}</p>
 </div>
 </div>
 <button className="bg-gray-50 p-2 rounded-lg text-gray-700 hover:text-[#47CCD0] transition-colors" title={t('brokerageFilter.falVerify')}>
 <QrCode size={16} />
 </button>
 </div>
 
 <button 
 onClick={() => {
 if (onPropertyClick) {
 onPropertyClick({
 id: item.id.toString(),
 title: item.title,
 price: item.price,
 address: item.location,
 specs: { beds: item.rooms, baths: 2, area: parseInt(item.area) || 0 },
 type: item.type,
 image: item.image,
 tags: [item.status, item.type],
 agent: { name: t('brokerageFilter.trustedAgency'), logo: 'https://via.placeholder.com/40', verified: true },
 featured: true,
 time: t('brokerageFilter.oneDayAgo')
 });
 } else {
 onNavigate?.('real-estate-for-sale');
 }
 }}
 className="w-full mt-5 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-[#2B3D50] hover:text-white hover:border-[#2B3D50] transition-all duration-300 text-sm font-medium"
 >
 {t('brokerageFilter.viewDetails')}
 </button>
 </div>
 </div>
 ))
 ) : (
 <div className="col-span-1 md:col-span-3 py-16 text-center text-gray-500 bg-gray-50 rounded-2xl border border-gray-200">
 <Search className="mx-auto text-gray-400 mb-4" size={32} />
 <p className="text-lg font-medium">{t('brokerageFilter.noResults')}</p>
 <p className="text-sm mt-2">{t('brokerageFilter.noResultsHint')}</p>
 <button
 onClick={() => {
 setSearchQuery('');
 setSelectedCity('');
 setSelectedDistrict('');
 setSelectedPropertyType('');
 setSelectedPriceRange('');
 setSelectedAreaRange('');
 setActiveTag('');
 }}
 className="mt-6 px-6 py-2 bg-[#47CCD0] text-white rounded-lg hover:bg-[#3bb5b9] transition-colors"
 >
 {t('brokerageFilter.clearFilters')}
 </button>
 </div>
 )}
 </div>

 <div className="mt-10 text-center">
 <button onClick={() => onNavigate?.('real-estate-for-sale')} className="px-10 py-4 bg-[#F8FAFB] text-gray-900 rounded-xl hover:bg-[#47CCD0] hover:text-white transition-all duration-300 font-medium mb-6">
 {t('brokerageFilter.viewAllProperties')}
 </button>
 <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
 <ShieldCheck size={16} className="text-[#47CCD0]" />
 {t('brokerageFilter.licensedNote')}
 </p>
 </div>
 </div>
 </section>
 );
};
