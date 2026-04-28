import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
 MapPin,
 Timer,
 Gavel,
 Filter,
 Search,
 ChevronDown,
 List,
 Map as MapIcon,
 Clock,
 User,
 Maximize,
 Radio,
 Eye,
 Monitor,
 Truck,
 Package,
 Cpu,
 Settings
} from 'lucide-react';
import { QuickViewModal } from '../components/QuickViewModal';
import { RiyalSymbol } from '../components/ui/RiyalSymbol';

interface OtherAuctionsPageProps {
 onNavigate?: (page: string) => void;
 onAuctionClick?: (auction: any) => void;
}

export const OtherAuctionsPage: React.FC<OtherAuctionsPageProps> = ({ onNavigate, onAuctionClick }) => {
 const { t } = useTranslation();
 const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
 const [selectedAuction, setSelectedAuction] = useState<any>(null);
 const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
 const [activeTab, setActiveTab] = useState('all');
 const [sortBy, setSortBy] = useState('newest');

 const handleQuickView = (auction: any) => {
 setSelectedAuction(auction);
 setIsQuickViewOpen(true);
 };

 const categories = [
 { id: 'all', labelKey: 'otherAuctions.categoryAll' },
 { id: 'computers', labelKey: 'otherAuctions.categoryComputers' },
 { id: 'heavy-equipment', labelKey: 'otherAuctions.categoryHeavyEquipment' },
 { id: 'mixed', labelKey: 'otherAuctions.categoryMixed' },
 { id: 'machinery', labelKey: 'otherAuctions.categoryMachinery' },
 ];

 // Mock Data
 const auctions = [
 {
 id: 101,
 code: 'MZ-8012',
 titleKey: 'otherAuctions.auction101Title',
 locationKey: 'otherAuctions.auction101Location',
 currentBid: 45000,
 openingBid: 20000,
 quantity: 150,
 image: 'https://images.unsplash.com/photo-1689236673934-66f8e9d9279b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaWxlJTIwb2YlMjBsYXB0b3BzJTIwYW5kJTIwZGVza3RvcCUyMGNvbXB1dGVycyUyMHdhcmVob3VzZXxlbnwxfHx8fDE3NjYxNjIyMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
 type: 'computers',
 status: 'live',
 statusColor: 'bg-red-500',
 timeLeft: '1',
 companyLogo: 'https://ui-avatars.com/api/?name=IT&background=000&color=fff&font-size=0.5',
 specs: { quantity: 150, conditionKey: 'otherAuctions.conditionUsed' },
 tags: ['otherAuctions.tagElectronics', 'otherAuctions.tagDesktopDevices']
 },
 {
 id: 102,
 code: 'MZ-8044',
 titleKey: 'otherAuctions.auction102Title',
 locationKey: 'otherAuctions.auction102Location',
 currentBid: 850000,
 openingBid: 600000,
 quantity: 5,
 image: 'https://images.unsplash.com/photo-1677695029687-2b2e72e0342e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5ZWxsb3clMjBleGNhdmF0b3JzJTIwYW5kJTIwYnVsbGRvemVycyUyMGNvbnN0cnVjdGlvbiUyMHNpdGV8ZW58MXx8fHwxNzY2MTYyMjMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
 type: 'heavy-equipment',
 status: 'upcoming',
 statusColor: 'bg-blue-500',
 timeLeft: '7',
 companyLogo: 'https://ui-avatars.com/api/?name=HE&background=000&color=fff&font-size=0.5',
 specs: { quantity: 5, conditionKey: 'otherAuctions.conditionGood' },
 tags: ['otherAuctions.tagHeavyEquipment', 'otherAuctions.tagConstruction']
 },
 {
 id: 103,
 code: 'MZ-8105',
 titleKey: 'otherAuctions.auction103Title',
 locationKey: 'otherAuctions.auction103Location',
 currentBid: 12000,
 openingBid: 5000,
 quantity: 500,
 image: 'https://images.unsplash.com/photo-1636573785224-d9bbe74e1fdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGZ1cm5pdHVyZSUyMHN0b3JhZ2UlMjBhdWN0aW9ufGVufDF8fHx8MTc2NjE2MjIzMXww&ixlib=rb-4.1.0&q=80&w=1080',
 type: 'mixed',
 status: 'live',
 statusColor: 'bg-red-500',
 timeLeft: '0',
 companyLogo: 'https://ui-avatars.com/api/?name=MX&background=000&color=fff&font-size=0.5',
 specs: { quantity: 500, conditionKey: 'otherAuctions.conditionUsed' },
 tags: ['otherAuctions.tagFurniture', 'otherAuctions.tagHotel']
 },
 {
 id: 104,
 code: 'MZ-8220',
 titleKey: 'otherAuctions.auction104Title',
 locationKey: 'otherAuctions.auction104Location',
 currentBid: 1250000,
 openingBid: 900000,
 quantity: 1,
 image: 'https://images.unsplash.com/photo-1530037335614-e68828dcf258?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGJvdHRsaW5nJTIwZmFjdG9yeSUyMHByb2R1Y3Rpb24lMjBsaW5lJTIwaW5kdXN0cmlhbHxlbnwxfHx8fDE3NjYxNjIyMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
 type: 'machinery',
 status: 'ended',
 statusColor: 'bg-gray-500',
 timeLeft: '0',
 companyLogo: 'https://ui-avatars.com/api/?name=FA&background=000&color=fff&font-size=0.5',
 specs: { quantity: 1, conditionKey: 'otherAuctions.conditionWorking' },
 tags: ['otherAuctions.tagFactories', 'otherAuctions.tagProductionLines']
 },
 {
 id: 105,
 code: 'MZ-8311',
 titleKey: 'otherAuctions.auction105Title',
 locationKey: 'otherAuctions.auction105Location',
 currentBid: 65000,
 openingBid: 40000,
 quantity: 20,
 image: 'https://images.unsplash.com/photo-1662890459081-87e680bb1b00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ2ZXIlMjByb29tJTIwZGF0YSUyMGNlbnRlciUyMHJhY2tzfGVufDF8fHx8MTc2NjE2MjIzMnww&ixlib=rb-4.1.0&q=80&w=1080',
 type: 'computers',
 status: 'live',
 statusColor: 'bg-red-500',
 timeLeft: '2',
 companyLogo: 'https://ui-avatars.com/api/?name=TC&background=000&color=fff&font-size=0.5',
 specs: { quantity: 20, conditionKey: 'otherAuctions.conditionRefurbished' },
 tags: ['otherAuctions.tagNetworking', 'otherAuctions.tagIT']
 },
 {
 id: 106,
 code: 'MZ-8450',
 titleKey: 'otherAuctions.auction106Title',
 locationKey: 'otherAuctions.auction106Location',
 currentBid: 110000,
 openingBid: 85000,
 quantity: 3,
 image: 'https://images.unsplash.com/photo-1763665814546-27c2c003317e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JrbGlmdCUyMGluJTIwd2FyZWhvdXNlJTIwaW5kdXN0cmlhbHxlbnwxfHx8fDE3NjYxNjIyMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
 type: 'heavy-equipment',
 status: 'upcoming',
 statusColor: 'bg-blue-500',
 timeLeft: '5',
 companyLogo: 'https://ui-avatars.com/api/?name=LG&background=000&color=fff&font-size=0.5',
 specs: { quantity: 3, conditionKey: 'otherAuctions.conditionExcellent' },
 tags: ['otherAuctions.tagLogistics', 'otherAuctions.tagWarehouses']
 },
 {
 id: 107,
 code: 'MZ-8512',
 titleKey: 'otherAuctions.auction107Title',
 locationKey: 'otherAuctions.auction107Location',
 currentBid: 240000,
 openingBid: 180000,
 quantity: 2,
 image: 'https://images.unsplash.com/photo-1636867759143-c28c1e909bd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcG93ZXIlMjBnZW5lcmF0b3J8ZW58MXx8fHwxNzY2MTYyMjMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
 type: 'machinery',
 status: 'upcoming',
 statusColor: 'bg-emerald-500',
 timeLeft: '10',
 companyLogo: 'https://ui-avatars.com/api/?name=PG&background=000&color=fff&font-size=0.5',
 specs: { quantity: 2, conditionKey: 'otherAuctions.conditionNew' },
 tags: ['otherAuctions.tagEnergy', 'otherAuctions.tagGenerators']
 },
 {
 id: 108,
 code: 'MZ-8630',
 titleKey: 'otherAuctions.auction108Title',
 locationKey: 'otherAuctions.auction108Location',
 currentBid: 8000,
 openingBid: 2000,
 quantity: 45,
 image: 'https://images.unsplash.com/photo-1669985457873-0c540a1d832a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBjaGFpcnMlMjBhbmQlMjBkZXNrcyUyMHN1cnBsdXN8ZW58MXx8fHwxNzY2MTYyMjMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
 type: 'mixed',
 status: 'live',
 statusColor: 'bg-red-500',
 timeLeft: '1',
 companyLogo: 'https://ui-avatars.com/api/?name=OF&background=000&color=fff&font-size=0.5',
 specs: { quantity: 45, conditionKey: 'otherAuctions.conditionUsed' },
 tags: ['otherAuctions.tagFurniture', 'otherAuctions.tagLiquidation']
 },
 {
 id: 109,
 code: 'MZ-8755',
 titleKey: 'otherAuctions.auction109Title',
 locationKey: 'otherAuctions.auction109Location',
 currentBid: 320000,
 openingBid: 250000,
 quantity: 12,
 image: 'https://images.unsplash.com/photo-1694787590597-ba49c7cdc2cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZXF1aXBtZW50JTIwYXVjdGlvbiUyMGhvc3BpdGFsfGVufDF8fHx8MTc2NjE2MjIzMnww&ixlib=rb-4.1.0&q=80&w=1080',
 type: 'mixed',
 status: 'upcoming',
 statusColor: 'bg-blue-500',
 timeLeft: '15',
 companyLogo: 'https://ui-avatars.com/api/?name=ME&background=000&color=fff&font-size=0.5',
 specs: { quantity: 12, conditionKey: 'otherAuctions.conditionNeedsService' },
 tags: ['otherAuctions.tagMedical', 'otherAuctions.tagDevices']
 }
 ];

 const getStatusLabel = (status: string) => {
 if (status === 'live') return t('auctionsPage.live');
 if (status === 'upcoming') return t('auctionsPage.upcoming');
 if (status === 'ended') return t('auctionsPage.ended');
 return status;
 };

 const filteredAuctions = activeTab === 'all'
 ? auctions
 : auctions.filter(a => a.type === activeTab);

 return (
 <div className="pt-36 pb-20 min-h-screen bg-gray-50 animate-in fade-in duration-500">
 <div className="container mx-auto px-4 max-w-7xl">

 {/* Breadcrumbs */}
 <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
 <button onClick={() => onNavigate?.('home')} className="hover:text-[#47CCD0] transition-colors">{t('otherAuctions.breadcrumbHome')}</button>
 <span>/</span>
 <span className="text-gray-900 font-bold">{t('otherAuctions.breadcrumbCurrent')}</span>
 </div>

 {/* Header & Title */}
 <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
 <div>
 <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('otherAuctions.pageTitle')}</h1>
 <p className="text-gray-500">{t('otherAuctions.foundCount', { count: filteredAuctions.length })}</p>
 </div>

 <div className="flex items-center p-1.5 bg-white border border-gray-200 rounded-xl shadow-sm">
 <button
 onClick={() => setViewMode('grid')}
 className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
 viewMode === 'grid'
 ? 'bg-[#47CCD0] text-white shadow-md'
 : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
 }`}
 >
 <List size={18} />
 {t('otherAuctions.viewList')}
 </button>
 <button
 onClick={() => setViewMode('map')}
 className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
 viewMode === 'map'
 ? 'bg-[#47CCD0] text-white shadow-md'
 : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
 }`}
 >
 <MapIcon size={18} />
 {t('otherAuctions.viewMap')}
 </button>
 </div>
 </div>

 {/* Categories Tabs */}
 <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-4 scrollbar-hide">
 {categories.map((cat) => (
 <button
 key={cat.id}
 onClick={() => setActiveTab(cat.id)}
 className={`flex-shrink-0 px-5 py-3 rounded-xl text-sm font-bold transition-all border ${
 activeTab === cat.id
 ? 'bg-[#47CCD0] text-white border-[#47CCD0] shadow-lg shadow-teal-500/20'
 : 'bg-white text-gray-600 border-gray-200 hover:border-[#47CCD0] hover:text-[#47CCD0]'
 }`}
 >
 {t(cat.labelKey)}
 </button>
 ))}
 </div>

 {/* Search & Filters */}
 <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
 <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-3">
 <div className="col-span-1 md:col-span-2 relative">
 <Search className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
 <input
 type="text"
 placeholder={t('otherAuctions.searchPlaceholder')}
 className="w-full h-11 pe-10 ps-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] outline-none transition-all text-sm"
 />
 </div>

 <div className="relative group">
 <button className="w-full h-11 px-3 flex items-center justify-between bg-white border border-gray-200 rounded-xl hover:border-[#47CCD0] transition-all text-sm text-gray-600">
 <span>{t('otherAuctions.filterStatus')}</span>
 <ChevronDown size={16} />
 </button>
 </div>

 <div className="relative group">
 <button className="w-full h-11 px-3 flex items-center justify-between bg-white border border-gray-200 rounded-xl hover:border-[#47CCD0] transition-all text-sm text-gray-600">
 <span>{t('otherAuctions.filterValue')}</span>
 <ChevronDown size={16} />
 </button>
 </div>

 <div className="relative group">
 <button className="w-full h-11 px-3 flex items-center justify-between bg-white border border-gray-200 rounded-xl hover:border-[#47CCD0] transition-all text-sm text-gray-600">
 <span>{t('otherAuctions.filterCity')}</span>
 <ChevronDown size={16} />
 </button>
 </div>

 <div className="relative group">
 <button className="w-full h-11 px-3 flex items-center justify-between bg-white border border-gray-200 rounded-xl hover:border-[#47CCD0] transition-all text-sm text-gray-600">
 <span className="flex items-center gap-2">
 <Filter size={16} />
 {t('otherAuctions.filterButton')}
 </span>
 </button>
 </div>
 </div>
 </div>

 {/* Content */}
 <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
 {/* Main List */}
 <div className="md:col-span-12 lg:col-span-9">
 <div className="flex items-center justify-between mb-4">
 <h3 className="font-bold text-gray-800">{t('otherAuctions.listingsTitle')}</h3>
 <div className="flex items-center gap-2 text-sm text-gray-500">
 <span>{t('otherAuctions.sortBy')}</span>
 <select
 value={sortBy}
 onChange={(e) => setSortBy(e.target.value)}
 className="bg-transparent font-bold text-gray-900 outline-none cursor-pointer"
 >
 <option value="newest">{t('otherAuctions.sortNewest')}</option>
 <option value="lowest_price">{t('otherAuctions.sortLowestPrice')}</option>
 <option value="highest_price">{t('otherAuctions.sortHighestPrice')}</option>
 <option value="ending_soon">{t('otherAuctions.sortEndingSoon')}</option>
 </select>
 </div>
 </div>

 {viewMode === 'map' ? (
 <div className="bg-gray-100 rounded-3xl h-[600px] overflow-hidden border border-gray-200 relative flex items-center justify-center">
 <div className="text-center text-gray-400">
 <MapIcon size={48} className="mx-auto mb-4 opacity-50" />
 <p>{t('otherAuctions.mapUnavailable')}</p>
 </div>
 </div>
 ) : (
 <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
 {filteredAuctions.map((item) => (
 <div key={item.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group">

 {/* Top Section: Image & Badge */}
 <div className="relative h-60 overflow-hidden bg-gray-100">
 <img
 src={item.image}
 alt={t(item.titleKey)}
 className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
 />

 <div className="absolute top-4 end-4 z-10">
 <span className={`${item.statusColor} text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5`}>
 <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
 {getStatusLabel(item.status)}
 </span>
 </div>

 <div className="absolute bottom-4 start-4 z-20 text-white text-start bg-black/40 backdrop-blur-md px-3 py-2 rounded-lg border border-white/20">
 <div className="mb-1 text-end">
 <p className="text-[9px] text-gray-300 mb-0.5 line-through decoration-red-400 flex items-center justify-end gap-1">{t('otherAuctions.openingBid')}: {item.openingBid?.toLocaleString()} <RiyalSymbol className="w-2.5 h-2.5" theme="light" /></p>
 <p className="text-[10px] font-bold text-white flex items-center justify-between gap-2">
 {t('otherAuctions.currentBid')}
 <span className="text-[8px] bg-white/20 px-1 rounded font-normal">{t('otherAuctions.vatIncluded')}</span>
 </p>
 </div>
 <p className="text-xl font-bold font-mono flex items-center justify-end gap-1.5 text-shadow-lg text-[#47CCD0]">
 {item.currentBid.toLocaleString()}
 <RiyalSymbol className="w-4 h-4" theme="light" />
 </p>
 </div>

 {/* Quick Action Overlay */}
 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
 <button
 onClick={() => handleQuickView(item)}
 className="bg-white/20 backdrop-blur-md border border-white/40 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-white hover:text-black transition-all flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 duration-300"
 >
 <Eye size={16} /> {t('otherAuctions.quickView')}
 </button>
 </div>
 </div>

 {/* Content Section */}
 <div className="p-5 flex-1 flex flex-col">

 <div className="mb-4">
 <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 group-hover:text-[#47CCD0] transition-colors line-clamp-2 min-h-[3rem]">
 {t(item.titleKey)}
 </h3>
 <div className="flex items-center gap-1.5 text-gray-500 text-sm">
 <MapPin size={14} className="text-[#47CCD0] flex-shrink-0" />
 <span className="truncate">{t(item.locationKey)}</span>
 </div>
 </div>

 {/* Specs */}
 <div className="flex items-center gap-4 text-xs text-gray-600 mb-4 bg-gray-50 p-3 rounded-lg">
 <div className="flex items-center gap-1">
 <Package size={14} className="text-[#47CCD0]" />
 <span>{t('otherAuctions.quantity')}: {item.quantity}</span>
 </div>
 <div className="h-4 w-px bg-gray-200"></div>
 <div className="flex items-center gap-1">
 <Settings size={14} className="text-[#47CCD0]" />
 <span>{t('otherAuctions.condition')}: {t(item.specs.conditionKey)}</span>
 </div>
 </div>

 {/* Stats Row */}
 <div className="flex items-center justify-between mb-6 mt-auto">
 <div className="flex items-center gap-2 bg-teal-50 text-[#47CCD0] px-3 py-1.5 rounded-lg text-xs font-medium">
 <Clock size={14} />
 <span dir="ltr" className="font-mono pt-0.5">{item.timeLeft} {t('otherAuctions.daysLeft')}</span>
 </div>
 <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
 <span>{20 + item.id} {t('otherAuctions.bidders')}</span>
 <User size={14} />
 </div>
 </div>

 {/* Buttons */}
 <div className="flex gap-2">
 <button
 onClick={() => onAuctionClick ? onAuctionClick(item) : onNavigate?.('auction-details')}
 className="flex-1 py-2.5 bg-white border border-gray-200 text-gray-900 rounded-xl hover:bg-[#47CCD0] hover:text-white hover:border-[#47CCD0] transition-all duration-300 text-sm font-bold shadow-sm"
 >
 {t('otherAuctions.details')}
 </button>
 <button
 onClick={() => onNavigate?.('live-auction')}
 className="px-3 py-2.5 bg-red-50 text-red-600 border border-red-100 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300 text-sm font-bold flex items-center justify-center"
 title={t('otherAuctions.liveBroadcast')}
 >
 <Radio size={16} className="animate-pulse" />
 </button>
 </div>
 </div>
 </div>
 ))}
 </div>
 )}
 </div>

 {/* Sidebar */}
 <div className="hidden lg:block lg:col-span-3 space-y-6">
 {/* Banner */}
 <div className="bg-gray-900 rounded-2xl p-6 text-white text-center relative overflow-hidden">
 <div className="relative z-10">
 <h3 className="font-bold text-lg mb-2">{t('otherAuctions.bannerTitle')}</h3>
 <p className="text-sm text-gray-400 mb-4 leading-relaxed">{t('otherAuctions.bannerDesc')}</p>
 <button className="w-full py-3 bg-[#47CCD0] hover:bg-[#35a3a8] rounded-xl font-bold transition-colors shadow-lg shadow-teal-500/20">{t('otherAuctions.bannerCta')}</button>
 </div>
 <div className="absolute bottom-0 end-0 w-32 h-32 bg-[#47CCD0] rounded-full blur-[60px] opacity-10"></div>
 </div>

 {/* Categories List (Sidebar Style) */}
 <div className="bg-white rounded-2xl border border-gray-100 p-5">
 <h3 className="font-bold text-gray-900 mb-4">{t('otherAuctions.sidebarSections')}</h3>
 <div className="space-y-1">
 {categories.filter(c => c.id !== 'all').map((cat) => (
 <button
 key={cat.id}
 onClick={() => setActiveTab(cat.id)}
 className={`w-full flex items-center justify-between text-sm px-3 py-2.5 rounded-lg transition-all ${
 activeTab === cat.id ? 'bg-teal-50 text-[#47CCD0] font-bold' : 'text-gray-600 hover:bg-gray-50'
 }`}
 >
 <span>{t(cat.labelKey)}</span>
 <ChevronDown size={14} className="-rotate-90 text-gray-300" />
 </button>
 ))}
 </div>
 </div>
 </div>
 </div>
 </div>

 <QuickViewModal
 isOpen={isQuickViewOpen}
 onClose={() => setIsQuickViewOpen(false)}
 auction={selectedAuction}
 onNavigate={(page) => {
 if (page === 'auction-details' && onAuctionClick) {
 onAuctionClick(selectedAuction);
 } else {
 onNavigate?.(page);
 }
 }}
 />
 </div>
 );
};
