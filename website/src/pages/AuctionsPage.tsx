import React, { useState } from 'react';
import { 
  MapPin, 
  Timer, 
  Gavel, 
  Filter, 
  Search, 
  ChevronDown,
  ArrowUpDown,
  ListFilter,
  Eye,
  Clock,
  User,
  Maximize,
  Minimize,
  Radio,
  Share2,
  Heart,
  List,
  Map as MapIcon,
  Bed,
  Bath,
  CheckCircle2,
  MessageCircle,
  Phone,
  X,
  QrCode,
  Info,
  ShieldCheck
} from 'lucide-react';
import carImage from 'figma:asset/3c101079407c0c432e6ca48126e0020aa8a51dbd.png';
import { RiyalSymbol } from '../components/ui/RiyalSymbol';
import { QuickViewModal } from '../components/QuickViewModal';
import { useTranslation } from 'react-i18next';

interface AuctionsPageProps {
  onNavigate?: (page: string) => void;
  onAuctionClick?: (auction: any) => void;
  isLoggedIn?: boolean;
  onOpenLogin?: () => void;
}

export const AuctionsPage: React.FC<AuctionsPageProps> = ({ onNavigate, onAuctionClick, isLoggedIn, onOpenLogin }) => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedAuction, setSelectedAuction] = useState<any>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [activeMarkerId, setActiveMarkerId] = useState<number | null>(null);
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [auctionValue, setAuctionValue] = useState('all');
  const [city, setCity] = useState('all');
  const [activeTag, setActiveTag] = useState('all');
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);

  const handleQuickView = (auction: any) => {
    setSelectedAuction(auction);
    setIsQuickViewOpen(true);
  };

  // Mock Data conforming to the new requirements
  const previousAuctions = [
    {
      id: 1,
      titleKey: 'auctionsPage.prevAuction1Title',
      type: 'residential',
      date: 'auctionsPage.prevAuction1Date',
      winningBid: 3450000,
      participants: 24,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 2,
      titleKey: 'auctionsPage.prevAuction2Title',
      type: 'commercial',
      date: 'auctionsPage.prevAuction2Date',
      winningBid: 8200000,
      participants: 45,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 3,
      titleKey: 'auctionsPage.prevAuction3Title',
      type: 'industrial',
      date: 'auctionsPage.prevAuction3Date',
      winningBid: 1560000,
      participants: 18,
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 4,
      titleKey: 'auctionsPage.prevAuction4Title',
      type: 'residential',
      date: 'auctionsPage.prevAuction4Date',
      winningBid: 1250000,
      participants: 32,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop'
    }
  ];

  const auctions = [
    {
      id: 1,
      code: 'MZ-1024',
      titleKey: 'auctionsPage.auction1Title',
      locationKey: 'auctionsPage.auction1Location',
      cityCode: 'riyadh',
      currentBid: 2500000,
      openingBid: 1800000,
      area: 2500,
      image: 'https://images.unsplash.com/photo-1726087163038-2910e4de29e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwbGFuZCUyMGNvbnN0cnVjdGlvbiUyMHNpdGUlMjByaXlhZGglMjBzYXVkaSUyMGFyYWJpYXxlbnwxfHx8fDE3NjQ2MzUyNDd8MA&ixlib=rb-4.1.0&q=80&w=1080', 
      type: 'property',
      status: 'live',
      statusColor: 'bg-red-500',
      timeLeft: '2d:15h:30m',
      companyLogo: 'https://ui-avatars.com/api/?name=RE&background=000&color=fff&font-size=0.5',
      specs: { beds: 0, baths: 0, area: 2500 },
      tags: ['commercial', 'prime-location'],
      mapPosition: { top: '35%', left: '45%' },
      auctionRef: 'A-2023-8891',
      auctionType: 'electronic',
      authority: 'court',
      startDate: '2023-11-20 10:00',
      endDate: '2023-11-25 18:00',
      minBidIncrement: 50000,
      bidders: 14
    },
    {
      id: 2,
      code: 'MZ-2055',
      titleKey: 'auctionsPage.auction2Title',
      locationKey: 'auctionsPage.auction2Location',
      cityCode: 'jeddah',
      currentBid: 5200000,
      openingBid: 4500000,
      area: 1800,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop',
      type: 'property',
      status: 'upcoming',
      statusColor: 'bg-blue-500',
      timeLeft: '5d:08h:10m',
      companyLogo: 'https://ui-avatars.com/api/?name=EM&background=000&color=fff&font-size=0.5',
      specs: { beds: 12, baths: 15, area: 1800 },
      tags: ['residential', 'investment'],
      mapPosition: { top: '48%', left: '55%' },
      auctionRef: 'A-2023-8892',
      auctionType: 'public',
      authority: 'executive',
      startDate: '2023-11-22 14:00',
      endDate: '2023-11-23 18:00',
      minBidIncrement: 100000,
      bidders: 0
    },
    {
      id: 3,
      code: 'MZ-3091',
      titleKey: 'auctionsPage.auction3Title',
      locationKey: 'auctionsPage.auction3Location',
      cityCode: 'dammam',
      currentBid: 850000,
      openingBid: 500000,
      area: 5000,
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop', 
      type: 'industrial',
      status: 'live',
      statusColor: 'bg-red-500',
      timeLeft: '0d:04h:20m',
      companyLogo: 'https://ui-avatars.com/api/?name=IN&background=000&color=fff&font-size=0.5',
      specs: { beds: 0, baths: 2, area: 5000 },
      tags: ['industrial', 'warehouses'],
      mapPosition: { top: '25%', left: '65%' },
      auctionRef: 'A-2023-8893',
      auctionType: 'electronic',
      authority: 'voluntary',
      startDate: '2023-11-21 09:00',
      endDate: '2023-11-26 15:00',
      minBidIncrement: 10000,
      bidders: 22
    },
    {
      id: 4,
      code: 'MZ-4011',
      titleKey: 'auctionsPage.auction4Title',
      locationKey: 'auctionsPage.auction4Location',
      cityCode: 'riyadh',
      currentBid: 3100000,
      openingBid: 2800000,
      area: 450,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop',
      type: 'residential',
      status: 'ended',
      statusColor: 'bg-gray-500',
      timeLeft: '0d:00h:00m',
      companyLogo: 'https://ui-avatars.com/api/?name=HO&background=000&color=fff&font-size=0.5',
      specs: { beds: 5, baths: 6, area: 450 },
      tags: ['residential', 'modern'],
      mapPosition: { top: '65%', left: '35%' },
      auctionRef: 'A-2023-8894',
      auctionType: 'electronic',
      authority: 'court',
      startDate: '2023-11-10 10:00',
      endDate: '2023-11-15 18:00',
      minBidIncrement: 50000,
      bidders: 35
    },
    {
      id: 5,
      code: 'MZ-5088',
      titleKey: 'auctionsPage.auction5Title',
      locationKey: 'auctionsPage.auction5Location',
      cityCode: 'khobar',
      currentBid: 4500000,
      openingBid: 4000000,
      area: 900,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
      type: 'commercial',
      status: 'live',
      statusColor: 'bg-red-500',
      timeLeft: '1d:10h:20m',
      companyLogo: 'https://ui-avatars.com/api/?name=CO&background=000&color=fff&font-size=0.5',
      specs: { beds: 0, baths: 0, area: 900 },
      tags: ['commercial', 'high-yield'],
      mapPosition: { top: '75%', left: '60%' },
      auctionRef: 'A-2023-8895',
      auctionType: 'public',
      authority: 'executive',
      startDate: '2023-11-18 10:00',
      endDate: '2023-11-20 18:00',
      minBidIncrement: 100000,
      bidders: 18
    },
    {
      id: 6,
      code: 'MZ-6023',
      titleKey: 'auctionsPage.auction6Title',
      locationKey: 'auctionsPage.auction6Location',
      cityCode: 'riyadh',
      currentBid: 1200000,
      openingBid: 950000,
      area: 10000,
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop',
      type: 'land',
      status: 'upcoming',
      statusColor: 'bg-blue-500',
      timeLeft: '12d:05h:45m',
      companyLogo: 'https://ui-avatars.com/api/?name=LA&background=000&color=fff&font-size=0.5',
      specs: { beds: 0, baths: 0, area: 10000 },
      tags: ['land', 'raw'],
      mapPosition: { top: '55%', left: '80%' },
      auctionRef: 'A-2023-8896',
      auctionType: 'electronic',
      authority: 'voluntary',
      startDate: '2023-11-25 10:00',
      endDate: '2023-11-28 18:00',
      minBidIncrement: 20000,
      bidders: 0
    },
    {
      id: 7,
      code: 'MZ-7001',
      titleKey: 'auctionsPage.auction7Title',
      locationKey: 'auctionsPage.auction7Location',
      cityCode: 'riyadh',
      currentBid: 185000,
      openingBid: 150000,
      area: 2024, // Using this field for Year/Model temporarily
      image: carImage,
      type: 'cars',
      status: 'new',
      statusColor: 'bg-emerald-500',
      timeLeft: '4d:12h:00m',
      companyLogo: 'https://ui-avatars.com/api/?name=Toyota&background=red&color=fff',
      specs: { beds: 0, baths: 0, area: 0 },
      tags: ['cars', 'sport'],
      mapPosition: { top: '80%', left: '25%' }
    },
  ];

  // Filtering Logic
  const filteredAuctions = auctions.filter((auction) => {
    // 1. Text Search (Code, Title, Location)
    const titleStr = t(auction.titleKey ?? '');
    const locationStr = t(auction.locationKey ?? '');
    const matchesSearch =
      searchQuery === '' ||
      titleStr.includes(searchQuery) ||
      locationStr.includes(searchQuery) ||
      auction.code.includes(searchQuery);

    // 2. Property Type Dropdown
    const matchesType = propertyType === 'all' || auction.type === propertyType;

    // 3. City Dropdown
    const matchesCity = city === 'all' || auction.cityCode === city;

    // 4. Value Dropdown
    let matchesValue = true;
    if (auctionValue === 'under1m') matchesValue = auction.currentBid < 1000000;
    else if (auctionValue === '1m-5m') matchesValue = auction.currentBid >= 1000000 && auction.currentBid <= 5000000;
    else if (auctionValue === 'over5m') matchesValue = auction.currentBid > 5000000;

    // 5. Quick Filter Tags
    let matchesTag = true;
    if (activeTag !== 'all') {
      if (['live-now', 'live'].includes(activeTag)) matchesTag = auction.status === 'live';
      else if (activeTag === 'upcoming') matchesTag = auction.status === 'upcoming';
      else if (activeTag === 'ended') matchesTag = auction.status === 'ended';
      else matchesTag = auction.tags.includes(activeTag) || auction.type === activeTag;
    }

    return matchesSearch && matchesType && matchesCity && matchesValue && matchesTag;
  }).sort((a, b) => {
    // Sorting
    if (sortBy === 'lowest_price') return a.currentBid - b.currentBid;
    if (sortBy === 'highest_price') return b.currentBid - a.currentBid;
    return 0; // Default or 'newest'
  });

  return (
    <div className="pt-36 pb-20 min-h-screen bg-gray-50 animate-in fade-in duration-500">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <a href="#" onClick={() => onNavigate?.('home')} className="hover:text-[#47CCD0] transition-colors">{t('common.home')}</a>
          <span>/</span>
          <span className="text-gray-900 font-bold">{t('auctionsPage.realEstateAuctions')}</span>
        </div>

        {/* Header & Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('auctionsPage.realEstateAuctions')}</h1>
            <p className="text-gray-500">{t('auctionsPage.found', { count: filteredAuctions.length })}</p>
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
              {t('auctionsPage.list')}
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
              {t('auctionsPage.map')}
            </button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-3">
              <div className="col-span-1 md:col-span-2 relative">
                <Search className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('auctionsPage.searchPlaceholder')} 
                  className="w-full h-11 pe-10 ps-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] outline-none transition-all text-sm"
                />
              </div>
              
              <div className="relative group">
                <select 
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full h-11 px-3 appearance-none bg-white border border-gray-200 rounded-xl hover:border-[#47CCD0] focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] outline-none transition-all text-sm text-gray-600 cursor-pointer"
                >
                  <option value="all">{t('auctionsPage.propType')}</option>
                  <option value="residential">{t('auctionsPage.residential')}</option>
                  <option value="commercial">{t('auctionsPage.commercial')}</option>
                  <option value="industrial">{t('auctionsPage.industrial')}</option>
                  <option value="land">{t('auctionsPage.land')}</option>
                  <option value="property">{t('auctionsPage.generalProperty')}</option>
                </select>
                <ChevronDown size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative group">
                <select 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full h-11 px-3 appearance-none bg-white border border-gray-200 rounded-xl hover:border-[#47CCD0] focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] outline-none transition-all text-sm text-gray-600 cursor-pointer"
                >
                  <option value="all">{t('auctionsPage.cityAll')}</option>
                  <option value="riyadh">{t('carFilters.riyadh')}</option>
                  <option value="jeddah">{t('carFilters.jeddah')}</option>
                  <option value="dammam">{t('carFilters.dammam')}</option>
                  <option value="khobar">{t('carFilters.khobar')}</option>
                </select>
                <ChevronDown size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative group flex gap-2 col-span-1 md:col-span-2 lg:col-span-2">
                <button 
                  onClick={() => setIsAdvancedFilterOpen(!isAdvancedFilterOpen)}
                  className={`flex-1 h-11 px-3 flex items-center justify-center gap-2 border rounded-xl transition-all text-sm font-bold ${isAdvancedFilterOpen ? 'bg-[#47CCD0] text-white border-[#47CCD0]' : 'bg-white border-gray-200 text-gray-600 hover:border-[#47CCD0]'}`}
                >
                  <ListFilter size={16} />
                  <span>{t('auctionsPage.advancedSearch')}</span>
                </button>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setPropertyType('all');
                    setAuctionValue('all');
                    setCity('all');
                    setActiveTag('all');
                    setIsAdvancedFilterOpen(false);
                  }}
                  className="flex-shrink-0 h-11 px-4 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all text-gray-500"
                  title={t('auctionsPage.reset')}
                >
                  <Filter size={16} />
                </button>
              </div>
            </div>

            {/* Advanced Filters Panel */}
            {isAdvancedFilterOpen && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100 animate-in fade-in slide-in-from-top-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 flex items-center gap-1">{t('auctionsPage.priceRange')} <RiyalSymbol className="w-3 h-3 text-gray-700" /></label>
                  <div className="flex items-center gap-2">
                    <input type="number" placeholder={t('carFilters.from')} className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:border-[#47CCD0] outline-none" />
                    <span className="text-gray-400">-</span>
                    <input type="number" placeholder={t('carFilters.to')} className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:border-[#47CCD0] outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">{t('auctionsPage.areaLabel')}</label>
                  <div className="flex items-center gap-2">
                    <input type="number" placeholder={t('carFilters.from')} className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:border-[#47CCD0] outline-none" />
                    <span className="text-gray-400">-</span>
                    <input type="number" placeholder={t('carFilters.to')} className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:border-[#47CCD0] outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">{t('auctionsPage.auctionStatus')}</label>
                  <div className="flex gap-2">
                    {[{key: 'live', label: t('auctionsPage.live')}, {key: 'upcoming', label: t('auctionsPage.upcoming')}, {key: 'ended', label: t('auctionsPage.ended')}].map(s => (
                      <button key={s.key} className="flex-1 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-[#F8FAFB] hover:border-[#47CCD0] hover:text-[#47CCD0] transition-colors">{s.label}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
            {[{key:'all',label:t('common.all')},{key:'live-now',label:t('auctionsPage.liveNow')},{key:'upcoming',label:t('auctionsPage.upcoming')},{key:'ended',label:t('auctionsPage.ended')},{key:'residential',label:t('auctionsPage.residential')},{key:'commercial',label:t('auctionsPage.commercial')},{key:'industrial',label:t('auctionsPage.industrial')}].map((tag, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveTag(tag.key)}
                className={`flex-shrink-0 px-4 py-1.5 border rounded-full text-xs font-bold transition-all ${
                  activeTag === tag.key 
                  ? 'bg-[#F8FAFB] text-[#47CCD0] border-[#47CCD0]' 
                  : 'bg-white border-gray-100 text-gray-600 hover:bg-[#F8FAFB] hover:text-[#47CCD0]'
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bidder Eligibility Notice (Entad Requirements) */}
        <div className="bg-[#F8FAFB] border border-[#47CCD0]/30 p-5 rounded-2xl mb-8 flex flex-col md:flex-row items-start md:items-center gap-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 start-0 w-2 h-full bg-[#47CCD0]"></div>
          <div className="bg-[#47CCD0]/10 p-3 rounded-xl text-[#47CCD0] flex-shrink-0">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">{t('auctionsPage.requirementsTitle')}</h3>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-700 font-medium">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-500" /> {t('auctionsPage.reqNafath')}</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-500" /> {t('auctionsPage.reqDeposit')}</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-500" /> {t('auctionsPage.reqTerms')}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main List */}
          <div className="md:col-span-12 lg:col-span-9">
            <div className="flex items-center justify-between mb-4">
               <h3 className="font-bold text-gray-800">{t('auctionsPage.latestAuctions')}</h3>
               <div className="flex items-center gap-2 text-sm text-gray-500">
                 <span>{t('auctionsPage.sortBy')}:</span>
                 <select 
                   value={sortBy}
                   onChange={(e) => setSortBy(e.target.value)}
                   className="bg-transparent font-bold text-gray-900 outline-none cursor-pointer"
                 >
                   <option value="newest">{t('auctionsPage.newest')}</option>
                   <option value="lowest_price">{t('auctionsPage.lowestPrice')}</option>
                   <option value="highest_price">{t('auctionsPage.highestPrice')}</option>
                   <option value="ending_soon">{t('auctionsPage.endingSoon')}</option>
                 </select>
               </div>
            </div>

            {viewMode === 'map' ? (
              <div className={`bg-gray-100 overflow-hidden border border-gray-200 transition-all duration-300 ${isMapExpanded ? 'fixed inset-0 z-50 rounded-none w-full h-full' : 'relative rounded-3xl h-[600px]'}`}>
                <div className="absolute inset-0 pointer-events-none z-0">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no" 
                    title="Auctions Map"
                    src="https://maps.google.com/maps?width=100%25&height=100%25&hl=ar&q=Riyadh%20Real%20Estate&t=&z=11&ie=UTF8&iwloc=B&output=embed"
                    className="w-full h-full grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                  ></iframe>
                </div>

                <div 
                  className="absolute inset-0 z-10 cursor-crosshair"
                  onClick={() => setActiveMarkerId(null)}
                >
                  {/* Map Markers */}
                  {filteredAuctions.filter(a => a.status === 'live').map((auction) => (
                    <div 
                      key={auction.id} 
                      className={`absolute ${activeMarkerId === auction.id ? 'z-40' : 'z-20'}`}
                      style={{ top: auction.mapPosition?.top, left: auction.mapPosition?.left }}
                    >
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveMarkerId(activeMarkerId === auction.id ? null : auction.id); }}
                        className={`relative flex items-center justify-center w-10 h-10 rounded-full shadow-lg border-2 transition-transform duration-300 ${activeMarkerId === auction.id ? 'bg-[#47CCD0] border-white scale-110' : 'bg-white border-[#47CCD0] hover:scale-110'}`}
                      >
                        <MapPin size={20} className={activeMarkerId === auction.id ? 'text-white' : 'text-[#47CCD0]'} />
                        {/* Pulse effect */}
                        <span className="absolute -top-1 -end-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
                        <span className="absolute -top-1 -end-1 w-3 h-3 bg-red-500 rounded-full"></span>
                      </button>

                      {/* Popover Card */}
                      {activeMarkerId === auction.id && (
                        <div className="absolute top-12 start-1/2 -translate-x-1/2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-30 animate-in fade-in zoom-in duration-200">
                          <div className="h-32 relative">
                            <img src={auction.image} alt={t(auction.titleKey || auction.title)} className="w-full h-full object-cover" />
                            <button 
                              onClick={(e) => { e.stopPropagation(); setActiveMarkerId(null); }}
                              className="absolute top-2 end-2 w-6 h-6 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70"
                            >
                              <X size={14} />
                            </button>
                            <div className="absolute bottom-2 start-2 px-2 py-1 bg-black/50 backdrop-blur-md rounded text-white text-xs font-bold font-mono flex items-center gap-1">
                               {auction.currentBid.toLocaleString()} <RiyalSymbol className="w-3 h-3" theme="light" />
                            </div>
                          </div>
                          <div 
                            className="p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => {
                               if (auction.type === 'cars') {
                                 onNavigate?.('car-details');
                               } else {
                                 onAuctionClick ? onAuctionClick(auction) : onNavigate?.('auction-details');
                               }
                            }}
                          >
                            <h4 className="font-bold text-[#2B3D50] text-sm mb-1 truncate">{t(auction.titleKey || auction.title)}</h4>
                            <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                              <MapPin size={10} /> {t(auction.locationKey || auction.location)}
                            </p>
                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                              <span className={`text-[10px] px-2 py-0.5 rounded-full text-white font-bold ${auction.statusColor}`}>
                                {auction.status}
                              </span>
                              <span className="text-[10px] text-gray-400 font-bold text-[#47CCD0]">
                                {t('auctionsPage.viewDetails')} &gt;
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className={`absolute bottom-6 end-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg max-w-xs z-20 border border-gray-100 pointer-events-none transition-all ${isMapExpanded ? 'bottom-10 end-10 scale-110' : ''}`}>
                    <h4 className="font-bold text-[#2B3D50] mb-1">{t('auctionsPage.mapTitle')}</h4>
                    <p className="text-xs text-gray-500 mb-3">{t('auctionsPage.mapDesc')}</p>
                    <button 
                      onClick={() => setIsMapExpanded(!isMapExpanded)}
                      className="text-xs text-[#47CCD0] font-bold flex items-center gap-1 hover:gap-2 transition-all pointer-events-auto bg-transparent border-none"
                    >
                      {isMapExpanded ? (
                        <>{t('auctionsPage.shrinkMap')} <Minimize size={12} /></>
                      ) : (
                        <>{t('auctionsPage.expandMap')} <Maximize size={12} /></>
                      )}
                    </button>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {filteredAuctions.length > 0 ? (
                  filteredAuctions.map((item) => (
                    <div 
                      key={item.id} 
                      onClick={() => onAuctionClick ? onAuctionClick(item) : onNavigate?.('auction-details')}
                      className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:shadow-[#47CCD0]/20 hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col group relative cursor-pointer"
                    >
                     
                     {/* Hover Gradient Border Effect */}
                     <div className="absolute inset-0 bg-gradient-to-br from-[#47CCD0]/0 via-transparent to-[#47CCD0]/0 group-hover:from-[#47CCD0]/10 group-hover:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>

                     {/* 1. Top Section: Image & Badge */}
                     <div className="relative h-64 overflow-hidden bg-gray-100 z-10">
                        <img 
                          src={item.image} 
                          alt={t(item.titleKey || item.title)} 
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                        />
                        
                        {/* Interactive Overlay Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleQuickView(item); }}
                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 hover:text-[#47CCD0] hover:scale-110 transition-all shadow-lg"
                            title={t('auctionsPage.quickView')}
                          >
                            <Eye size={18} />
                          </button>
                          <button 
                            onClick={(e) => e.stopPropagation()}
                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 hover:text-red-500 hover:scale-110 transition-all shadow-lg"
                            title={t('common.save')}
                          >
                            <Heart size={18} />
                          </button>
                          <button 
                            onClick={(e) => e.stopPropagation()}
                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 hover:text-[#47CCD0] hover:scale-110 transition-all shadow-lg"
                            title={t('auctionsPage.share')}
                          >
                            <Share2 size={18} />
                          </button>
                        </div>
                        
                        {/* QR Code */}
                        <div className="absolute top-4 start-4 z-20">
                          <button 
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white/90 backdrop-blur-md p-2 rounded-lg text-gray-700 hover:text-[#47CCD0] transition-colors shadow-sm" title={t('auctionsPage.verifyFal')}
                          >
                            <QrCode size={18} />
                          </button>
                        </div>

                        {/* Floating Status & FAL Badge */}
                        <div className="absolute top-4 end-4 z-10 flex flex-col gap-2 items-start">
                           <span className={`${item.statusColor} text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5`}>
                             <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                             {item.status}
                           </span>
                           {item.falLicense && (
                             <div className="flex items-center gap-1.5 bg-gray-800/80 backdrop-blur text-white text-[10px] px-2.5 py-1.5 rounded-full shadow-sm border border-gray-600/50">
                               <div className={`w-2 h-2 rounded-full ${item.isLicenseActive ? 'bg-green-400 shadow-[0_0_4px_#4ade80]' : 'bg-red-500 shadow-[0_0_4px_#ef4444]'} animate-pulse`}></div>
                               <span className="font-mono tracking-wider">{item.falLicense}</span>
                             </div>
                           )}
                        </div>

                        {/* Price Overlay */}
                        <div className="absolute bottom-4 start-4 z-20 text-white text-start bg-black/40 backdrop-blur-md px-3 py-2 rounded-lg border border-white/20">
                           <div className="mb-1 text-end">
                             <p className="text-[9px] text-gray-300 mb-0.5 line-through decoration-red-400 flex items-center justify-end gap-1">{t('auctionsPage.openingPrice')}: {item.openingBid?.toLocaleString()} <RiyalSymbol className="w-2.5 h-2.5" theme="light" /></p>
                             <p className="text-[10px] font-bold text-white flex items-center justify-between gap-2">
                               {t('auctionsPage.currentPrice')} 
                               <span className="text-[8px] bg-white/20 px-1 rounded font-normal">{t('quickView.includesTax')}</span>
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
                             onClick={(e) => { e.stopPropagation(); handleQuickView(item); }}
                             className="bg-white/20 backdrop-blur-md border border-white/40 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-white hover:text-black transition-all flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 duration-300"
                           >
                              <Eye size={16} /> {t('auctionsPage.quickView')}</button>
                        </div>
                     </div>

                     {/* 2. Content Section */}
                     <div className="p-5 flex-1 flex flex-col">
                        
                        {/* Auction Meta info (Entad requirements) */}
                        {item.auctionRef && (
                           <div className="flex flex-wrap items-center gap-2 mb-3">
                             <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-1 rounded-md font-mono border border-gray-200">
                               {t('auctionsPage.auctionRef')}: {item.auctionRef}
                             </span>
                             <span className="bg-[#47CCD0]/10 text-[#2B3D50] text-[10px] px-2 py-1 rounded-md font-bold">
                               {item.auctionType}
                             </span>
                             <span className="bg-purple-50 text-purple-700 text-[10px] px-2 py-1 rounded-md font-bold">
                               {item.authority}
                             </span>
                           </div>
                        )}

                        {/* Header: Title */}
                        <div className="mb-4">
                           <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 group-hover:text-[#47CCD0] transition-colors line-clamp-1">
                              {t(item.titleKey || item.title)}
                           </h3>
                           <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                              <MapPin size={14} className="text-[#47CCD0] flex-shrink-0" />
                              <span className="truncate">{t(item.locationKey || item.location)}</span>
                           </div>
                        </div>

                        {/* Auction Dates (Entad requirements) */}
                        {item.startDate && (
                           <div className="bg-gray-50 rounded-lg p-3 mb-4 space-y-2 border border-gray-100">
                             <div className="flex justify-between items-center text-xs">
                               <span className="text-gray-500">{t('auctionsPage.starts')}:</span>
                               <span className="font-mono text-gray-800" dir="ltr">{item.startDate}</span>
                             </div>
                             <div className="flex justify-between items-center text-xs">
                               <span className="text-gray-500">{t('auctionsPage.ends')}:</span>
                               <span className="font-mono text-gray-800" dir="ltr">{item.endDate}</span>
                             </div>
                             <div className="flex justify-between items-center text-xs pt-2 border-t border-gray-200">
                               <span className="text-gray-500">{t('auctionsPage.minBid')}:</span>
                               <span className="font-mono font-bold text-[#47CCD0] flex items-center gap-1" dir="ltr">
                                 {item.minBidIncrement?.toLocaleString()} <RiyalSymbol className="w-2.5 h-2.5 text-gray-500" />
                               </span>
                             </div>
                           </div>
                        )}

                        {/* Specs (if Real Estate) */}
                        {item.type === 'property' || item.type === 'residential' || item.type === 'commercial' ? (
                          <div className="flex items-center justify-between text-gray-500 text-xs mb-4 bg-gray-50 p-2 rounded-lg">
                             <div className="flex items-center gap-1">
                               <Maximize size={14} /> <span>{item.area} {t('quickView.sqm')}</span>
                             </div>
                             <div className="flex items-center gap-1">
                               <Bed size={14} /> <span>{item.specs?.beds || '-'}</span>
                             </div>
                             <div className="flex items-center gap-1">
                               <Bath size={14} /> <span>{item.specs?.baths || '-'}</span>
                             </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 mb-4">
                             {item.tags.map((tag, idx) => (
                               <span key={idx} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-md">{tag}</span>
                             ))}
                          </div>
                        )}

                        {/* Advertiser Info */}
                        {item.advertiserName && (
                          <div className="flex items-center gap-3 pt-2 pb-4 mb-4 border-b border-gray-100">
                            <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-[#2B3D50]">
                              <User size={14} />
                            </div>
                            <div className="flex-1">
                              <p className="text-[10px] text-gray-400 mb-0.5">{t('auctionsPage.organizer')}: {item.advertiserName}</p>
                              <p className="text-xs font-bold text-gray-700 line-clamp-1">{item.officeName}</p>
                            </div>
                          </div>
                        )}

                        {/* Stats Row (Timer & Bidders) */}
                        <div className="flex items-center justify-between mb-6 mt-auto">
                           {/* Timer with Tooltip */}
                           <div className="flex items-center gap-1 group/tooltip relative">
                             <div className="flex items-center gap-2 bg-[#FFF8E1] text-[#F39C12] px-3 py-1.5 rounded-lg text-xs font-medium">
                                <Clock size={14} />
                                <span dir="ltr" className="font-mono pt-0.5">{item.timeLeft.split(':')[0]} {t('auctionsPage.daysLeft')}</span>
                             </div>
                             <Info size={14} className="text-gray-400 cursor-help" />
                             {/* Tooltip for auto-extension */}
                             <div className="absolute bottom-full end-0 mb-2 w-48 p-2 bg-gray-900 text-white text-[10px] text-center rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-10">
                               {t('auctionsPage.autoExtend')}
                               <div className="absolute top-full end-4 border-4 border-transparent border-t-gray-900"></div>
                             </div>
                           </div>

                           {/* Bidders */}
                           <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                              <span>{item.bidders ?? (14 + item.id * 2)} {t('auctionsPage.bidder')}</span>
                              <User size={14} />
                           </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <button 
                            onClick={(e) => { e.stopPropagation(); onAuctionClick ? onAuctionClick(item) : onNavigate?.('auction-details'); }}
                            className="flex-1 py-2.5 bg-white border border-gray-200 text-gray-900 rounded-xl hover:bg-[#47CCD0] hover:text-white hover:border-[#47CCD0] transition-all duration-300 text-sm font-bold shadow-sm"
                          >
                             {t('auctionsPage.details')}
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              if (item.status === 'live') {
                                onNavigate?.('register-now');
                              } else {
                                onNavigate?.('auction-guide');
                              }
                            }}
                            className={`flex-[2] py-2.5 text-white border border-transparent rounded-xl transition-all duration-300 text-sm font-bold flex items-center justify-center gap-2 ${item.status === 'live' ? 'bg-[#e74c3c] hover:bg-[#c0392b] shadow-lg shadow-red-500/20' : 'bg-[#47CCD0] hover:bg-[#3ba8ac] shadow-lg shadow-teal-500/20'}`}
                          >
                            {item.status === 'live' ? (
                              <>{t('auctionsPage.bidNow')} <Radio size={16} className="animate-pulse" /></>
                            ) : (
                              t('auctionsPage.registerBid')
                            )}
                          </button>
                        </div>
                     </div>

                     {/* Blur Overlay for Non-logged in Users on Live Auctions */}
                     {item.status === 'live' && !isLoggedIn && (
                       <div className="absolute inset-0 z-40 flex flex-col items-center justify-center p-6 text-center" style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(255, 255, 255, 0.4)' }}>
                         <ShieldCheck size={48} className="text-[#47CCD0] mb-4 drop-shadow-md" />
                         <h4 className="text-lg font-bold text-gray-900 mb-2 drop-shadow-sm">{t('auctionsPage.loginRequired')}</h4>
                         <p className="text-sm text-gray-700 mb-6 drop-shadow-sm font-medium">{t('auctionsPage.loginRequiredDesc')}</p>
                         <button 
                           onClick={(e) => { e.stopPropagation(); onOpenLogin?.(); }}
                           className="bg-[#47CCD0] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#3ba8ac] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                         >
                           {t('loginModal.loginButton')}
                         </button>
                       </div>
                     )}
                  </div>
                  ))
                ) : (
                  <div className="col-span-full py-16 text-center text-gray-500 bg-white rounded-2xl border border-gray-200">
                    <Search className="mx-auto mb-4 text-gray-300" size={48} />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{t('auctionsPage.noResults')}</h3>
                    <p>{t('auctionsPage.tryChangingFilters')}</p>
                  </div>
                )}
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-12">
               <div className="flex items-center gap-2">
                 <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#47CCD0] hover:text-[#47CCD0] transition-all disabled:opacity-50">
                    <ChevronDown className="rotate-90" size={20} />
                 </button>
                 <button className="w-10 h-10 rounded-xl bg-[#47CCD0] text-white flex items-center justify-center font-bold shadow-lg shadow-[#47CCD0]/30">1</button>
                 <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#47CCD0] hover:text-[#47CCD0] transition-all">2</button>
                 <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#47CCD0] hover:text-[#47CCD0] transition-all">3</button>
                 <span className="text-gray-400">...</span>
                 <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#47CCD0] hover:text-[#47CCD0] transition-all">
                    <ChevronDown className="-rotate-90" size={20} />
                 </button>
               </div>
            </div>

            {/* Previous Auction Results */}
            <div className="mt-16 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('home.previousAuctions')}</h3>
                <p className="text-gray-500">{t('home.previousAuctionsDesc')}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {previousAuctions.slice(0, 4).map(item => (
                  <div key={item.id} className="bg-gray-50 p-5 rounded-xl border border-gray-100 flex items-center gap-4 hover:bg-gray-100 transition-colors cursor-pointer min-w-0">
                    <img src={item.image} alt={t(item.titleKey)} className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">{item.type}</span>
                        <span className="text-[10px] text-gray-400 font-mono" dir="ltr">{t(item.date)}</span>
                      </div>
                      <h4 className="font-bold text-sm text-gray-900 mb-2 truncate">{t(item.titleKey)}</h4>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex flex-col">
                          <span className="text-gray-400 text-[10px]">{t('home.winningBid')}</span>
                          <span className="font-bold font-mono text-[#47CCD0] flex items-center gap-1">{item.winningBid.toLocaleString()} <RiyalSymbol className="w-3 h-3 text-[#47CCD0]" /></span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-600 bg-white px-2 py-1 rounded-md border border-gray-200">
                          <User size={12} className="text-gray-400" />
                          <span>{item.participants} {t('auctionsPage.bidder')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                 <button className="text-[#47CCD0] font-bold text-sm hover:underline">{t('auctionsPage.viewAllPrevious')}</button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">


             {/* Trending Areas */}
             <div className="bg-white rounded-2xl border border-gray-100 p-5">
               <h3 className="font-bold text-gray-900 mb-4">{t('auctionsPage.activeAreas')}</h3>
               <div className="space-y-3">
                 {[
                   { nameKey: 'auctionsPage.areaNorthRiyadh', count: 15 },
                   { nameKey: 'auctionsPage.areaEastRiyadh', count: 12 },
                   { nameKey: 'auctionsPage.areaCentralJeddah', count: 8 },
                   { nameKey: 'auctionsPage.areaKhobar', count: 6 },
                   { nameKey: 'auctionsPage.areaMakkah', count: 5 },
                 ].map((area, idx) => (
                   <a key={idx} href="#" className="flex items-center justify-between text-sm group">
                      <span className="text-gray-600 group-hover:text-[#47CCD0] transition-colors">{t(area.nameKey)}</span>
                      <span className="text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md text-xs group-hover:bg-[#F8FAFB] group-hover:text-[#47CCD0] transition-colors">{area.count}</span>
                   </a>
                 ))}
               </div>
             </div>

             {/* Live Auctions Promo */}
             <div className="bg-red-50 rounded-2xl border border-red-100 p-5">
               <div className="flex items-center gap-2 mb-3">
                 <span className="relative flex h-3 w-3">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                 </span>
                 <h3 className="font-bold text-red-900">{t('auctionsPage.liveBroadcast')}</h3>
               </div>
               <p className="text-xs text-red-800/70 mb-4">{t('auctionsPage.liveBroadcastDesc')}</p>
               <button 
                 onClick={() => onNavigate?.('live-auction')}
                 className="w-full py-2.5 bg-white border border-red-200 text-red-600 rounded-xl font-bold text-sm hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2"
               >
                 <Radio size={16} /> {t('auctionsPage.watchNow')}
               </button>
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
