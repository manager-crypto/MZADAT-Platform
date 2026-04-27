import React, { useState } from 'react';
import {
  Search, MapPin, User, ShieldCheck, ChevronDown, CheckCircle2, Timer, Info, Bell, Play
} from 'lucide-react';
import { RiyalSymbol } from '../ui/RiyalSymbol';
import { useTranslation } from 'react-i18next';

export const FeaturedAuctionsSection = ({ onNavigate, onAuctionClick, isLoggedIn, onOpenLogin }: { onNavigate?: (path: string) => void, onAuctionClick?: (auc: any) => void, isLoggedIn?: boolean, onOpenLogin?: () => void }) => {
  const { t } = useTranslation();
  const [activeAuctionFilter, setActiveAuctionFilter] = useState('all');
  const [openDropdown, setOpenDropdown] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDropdown = (name: string) => {
    setOpenDropdown(prev => prev === name ? '' : name);
  };

  const handleSelect = (setter: any, value: string) => {
    setter(value);
    setOpenDropdown('');
  };

  const cities = [
    { key: 'all', label: t('featuredAuctions.filterAll') },
    { key: 'riyadh', label: t('headerDrop.cities.riyadh') },
    { key: 'jeddah', label: t('headerDrop.cities.jeddah') },
    { key: 'dammam', label: t('brokerageFilter.cityDammam') },
    { key: 'makkah', label: t('headerDrop.cities.makkah') },
    { key: 'madinah', label: t('headerDrop.cities.madinah') },
    { key: 'khobar', label: t('brokerageFilter.cityKhobar') },
    { key: 'abha', label: t('brokerageFilter.cityAbha') },
  ];

  const getCityLabel = (key: string) => cities.find(c => c.key === key)?.label || t('featuredAuctions.saudiArabia');

  const districts = [
    { key: 'all', label: t('featuredAuctions.filterAll') },
    { key: 'yasmin', label: t('featuredAuctions.districtYasmin') },
    { key: 'kingfahd', label: t('featuredAuctions.districtKingFahd') },
    { key: 'shati', label: t('featuredAuctions.districtShati') },
  ];

  const featuredAuctions = [
    {
      id: 1,
      title: t('featuredAuctions.item1Title'),
      location: t('featuredAuctions.item1Location'),
      price: 2500000,
      openingBid: 1800000,
      image: 'https://images.unsplash.com/photo-1726087163038-2910e4de29e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwbGFuZCUyMGNvbnN0cnVjdGlvbiUyMHNpdGUlMjByaXlhZGglMjBzYXVkaSUyMGFyYWJpYXxlbnwxfHx8fDE3NjQ2MzUyNDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      typeKey: 'realEstate',
      bidders: 14,
      statusKey: 'live',
      timeLeft: '02:15:30',
      falLicense: 'FAL-1200098765',
      isLicenseActive: true,
      advertiserName: t('featuredAuctions.advertiser1Name'),
      officeName: t('featuredAuctions.advertiser1Office'),
      auctionRef: 'A-2023-8891',
      auctionTypeKey: 'electronic',
      authorityKey: 'courtOrder',
      startDate: '2023-11-20 10:00',
      endDate: '2023-11-25 18:00',
      minBidIncrement: 50000
    },
    {
      id: 2,
      title: t('featuredAuctions.item2Title'),
      location: t('featuredAuctions.item2Location'),
      price: 5200000,
      openingBid: 4500000,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop',
      typeKey: 'realEstate',
      bidders: 8,
      statusKey: 'endingSoon',
      timeLeft: '00:45:10',
      falLicense: 'FAL-1200011223',
      isLicenseActive: true,
      advertiserName: t('featuredAuctions.advertiser2Name'),
      officeName: t('featuredAuctions.advertiser2Office'),
      auctionRef: 'A-2023-8892',
      auctionTypeKey: 'public',
      authorityKey: 'executive',
      startDate: '2023-11-22 14:00',
      endDate: '2023-11-23 18:00',
      minBidIncrement: 100000
    },
    {
      id: 3,
      title: t('featuredAuctions.item3Title'),
      location: t('featuredAuctions.item3Location'),
      price: 850000,
      openingBid: 500000,
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop',
      typeKey: 'industrial',
      bidders: 22,
      statusKey: 'scheduled',
      timeLeft: '04:20:00',
      falLicense: 'FAL-1200088990',
      isLicenseActive: false,
      advertiserName: t('featuredAuctions.advertiser3Name'),
      officeName: t('featuredAuctions.advertiser3Office'),
      auctionRef: 'A-2023-8893',
      auctionTypeKey: 'electronic',
      authorityKey: 'voluntary',
      startDate: '2023-11-21 09:00',
      endDate: '2023-11-26 15:00',
      minBidIncrement: 10000
    },
  ];

  const getStatusLabel = (key: string) => {
    if (key === 'live') return t('featuredAuctions.statusLive');
    if (key === 'endingSoon') return t('featuredAuctions.statusEndingSoon');
    return t('featuredAuctions.statusScheduled');
  };

  const getTypeLabel = (key: string) => {
    if (key === 'industrial') return t('featuredAuctions.filterIndustrial');
    return t('featuredAuctions.filterRealEstate');
  };

  const getAuctionTypeLabel = (key: string) => {
    if (key === 'public') return t('featuredAuctions.filterRealEstate');
    return t('featuredAuctions.electronicAuction');
  };

  const getAuthorityLabel = (key: string) => {
    if (key === 'courtOrder') return t('featuredAuctions.courtOrder');
    if (key === 'executive') return t('featuredAuctions.executive');
    return t('featuredAuctions.voluntary');
  };

  const auctionFilters = [
    { key: 'all', label: t('featuredAuctions.filterAll') },
    { key: 'realEstate', label: t('featuredAuctions.filterRealEstate') },
    { key: 'industrial', label: t('featuredAuctions.filterIndustrial') },
  ];

  const filteredAuctions = featuredAuctions.filter(item => {
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) && !item.location.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (selectedCity && selectedCity !== 'all' && !item.location.toLowerCase().includes(getCityLabel(selectedCity).toLowerCase())) return false;
    if (selectedDistrict && selectedDistrict !== 'all') {
      const districtLabel = districts.find(d => d.key === selectedDistrict)?.label || '';
      if (!item.location.toLowerCase().includes(districtLabel.toLowerCase())) return false;
    }
    if (activeAuctionFilter === 'realEstate' && item.typeKey !== 'realEstate') return false;
    if (activeAuctionFilter === 'industrial' && item.typeKey !== 'industrial') return false;
    return true;
  });

  return (
    <section className="pt-8 pb-24 bg-white">
      <div className="w-full max-w-[1440px] mx-auto px-4">
         {/* Bidder Eligibility Notice (Entad Requirements) */}
         <div className="bg-[#F8FAFB] border border-[#47CCD0]/30 p-5 rounded-2xl mb-10 flex flex-col md:flex-row items-start md:items-center gap-4 shadow-sm relative overflow-hidden">
           <div className="absolute top-0 start-0 w-2 h-full bg-[#47CCD0]"></div>
           <div className="bg-[#47CCD0]/10 p-3 rounded-xl text-[#47CCD0] flex-shrink-0">
             <ShieldCheck size={28} />
           </div>
           <div>
             <h3 className="font-bold text-gray-900 mb-2 text-lg">{t('featuredAuctions.requirements')}</h3>
             <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-700 font-medium">
               <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-500" /> {t('featuredAuctions.reqNafath')}</span>
               <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-500" /> {t('featuredAuctions.reqWallet')}</span>
               <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-500" /> {t('featuredAuctions.reqTerms')}</span>
             </div>
           </div>
         </div>

         <div className="flex justify-between items-end mb-6">
            <div className="text-end">
              <span className="text-[#47CCD0] text-sm uppercase tracking-widest mb-2 block">{t('featuredAuctions.sectionLabel')}</span>
              <h2 className="text-3xl text-black font-bold">{t('featuredAuctions.sectionTitle')}</h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex bg-[#F8FAFB] p-1.5 rounded-xl overflow-x-auto hide-scrollbar">
              {auctionFilters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveAuctionFilter(filter.key)}
                  className={`px-6 py-2.5 rounded-lg text-sm transition-all whitespace-nowrap ${
                    activeAuctionFilter === filter.key
                      ? 'bg-[#2B3D50] text-white shadow-md'
                      : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
         </div>

         {/* Advanced Filter Container */}
         <div className="bg-white rounded-[24px] border border-gray-200 shadow-sm p-4 mb-12">
            <div className="flex flex-col lg:flex-row gap-3">

              {/* Country / City */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('city')}
                  className="flex items-center justify-between gap-3 px-4 py-3 border border-[#1B4345] rounded-xl hover:bg-gray-50 transition-colors text-sm text-[#1B4345] font-bold min-w-[200px] w-full lg:w-auto h-[46px]"
                >
                  <div className="flex items-center gap-2">
                    <img src="https://flagcdn.com/w20/sa.png" alt="SA" className="w-5 h-3.5 rounded-[2px]" />
                    <span>{selectedCity && selectedCity !== 'all' ? getCityLabel(selectedCity) : t('featuredAuctions.saudiArabia')}</span>
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
                    {selectedDistrict && selectedDistrict !== 'all'
                      ? districts.find(d => d.key === selectedDistrict)?.label
                      : t('featuredAuctions.selectDistrict')}
                  </span>
                  <ChevronDown size={14} className={`text-gray-400 transition-transform ${openDropdown === 'district' ? 'rotate-180' : ''}`} />
                </button>
                {openDropdown === 'district' && (
                  <div className="absolute top-full end-0 mt-2 w-full min-w-[140px] bg-white border border-gray-100 shadow-lg rounded-xl z-50 py-2">
                    {districts.map(d => (
                      <button
                        key={d.key}
                        onClick={() => handleSelect(setSelectedDistrict, d.key)}
                        className={`w-full text-end px-4 py-2 text-sm hover:bg-gray-50 ${selectedDistrict === d.key ? 'text-[#47CCD0] font-medium bg-gray-50' : 'text-gray-700'}`}
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
                  placeholder={t('featuredAuctions.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-[46px] ps-10 pe-4 border border-gray-200 rounded-xl outline-none focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0]/20 text-sm text-gray-700 placeholder-gray-400"
                />
                <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAuctions.length > 0 ? (
              filteredAuctions.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => {
                    if (onAuctionClick) {
                      onAuctionClick(item);
                    } else {
                      onNavigate?.('auction-details');
                    }
                  }}
                  className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:shadow-gray-200 hover:-translate-y-1 transition-all duration-500 relative cursor-pointer"
                >
                 {/* Floating Actions */}
                 <div className="absolute top-4 start-4 z-30 flex flex-col gap-2">
                   <button
                     onClick={(e) => e.stopPropagation()}
                     className="bg-white/90 backdrop-blur-md p-2 rounded-lg text-gray-400 hover:text-yellow-500 transition-colors shadow-sm" title={t('featuredAuctions.alertMe')}
                   >
                     <Bell size={18} />
                   </button>
                   {item.statusKey === 'live' && (
                     <button
                       onClick={(e) => e.stopPropagation()}
                       className="bg-white/90 backdrop-blur-md p-2 rounded-lg text-gray-400 hover:text-red-500 transition-colors shadow-sm" title={t('featuredAuctions.liveBroadcast')}
                     >
                       <Play size={18} className="fill-current" />
                     </button>
                   )}
                 </div>

                 {/* Prominent Countdown Timer */}
                 <div className="absolute top-4 end-1/2 translate-x-1/2 z-30">
                   <div className={`px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg backdrop-blur-md text-sm font-bold font-mono ${
                     item.timeLeft.startsWith('00:0') ? 'bg-red-500/90 text-white animate-pulse' : 
                     item.timeLeft.startsWith('00:') ? 'bg-orange-500/90 text-white' : 
                     'bg-white/90 text-gray-800'
                   }`}>
                     <Timer size={16} className={item.timeLeft.startsWith('00:') ? 'animate-pulse' : ''} />
                     <span dir="ltr">{item.timeLeft}</span>
                   </div>
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
                        <span className="bg-white/95 backdrop-blur text-gray-900 text-xs px-3 py-1.5 rounded-lg shadow-sm font-bold">{getTypeLabel(item.typeKey)}</span>
                        {item.statusKey === 'live' && (
                          <span className="bg-red-500 text-white text-xs px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5 font-bold">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span> {t('featuredAuctions.statusLive')}
                          </span>
                        )}
                        {item.statusKey === 'endingSoon' && (
                          <span className="bg-orange-500 text-white text-xs px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5 font-bold">
                            {t('featuredAuctions.statusEndingSoon')}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 bg-gray-800/80 backdrop-blur text-white text-[10px] px-2.5 py-1.5 rounded-full shadow-sm border border-gray-600/50">
                        <div className={`w-2 h-2 rounded-full ${item.isLicenseActive ? 'bg-green-400 shadow-[0_0_4px_#4ade80]' : 'bg-red-500 shadow-[0_0_4px_#ef4444]'} animate-pulse`}></div>
                        <span className="font-mono tracking-wider">{item.falLicense}</span>
                      </div>
                    </div>
                    
                    {/* Price Overlay */}
                    <div className="absolute bottom-4 end-4 z-20 text-white">
                      <div className="mb-1">
                        <p className="text-[10px] opacity-70 mb-0.5 line-through flex items-center gap-1">{t('featuredAuctions.openingBid')} {item.openingBid?.toLocaleString()} <RiyalSymbol className="w-2.5 h-2.5" theme="light" /></p>
                        <p className="text-xs opacity-90">{t('featuredAuctions.currentPrice')} <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded ms-1">{t('featuredAuctions.includesTax')}</span></p>
                      </div>
                      <p className="text-2xl font-bold font-mono flex items-center gap-1.5">
                        {item.price.toLocaleString()}
                        <RiyalSymbol className="w-4 h-4" theme="light" />
                      </p>
                    </div>
                 </div>

                 {/* Content */}
                 <div className="p-6 relative flex flex-col h-[320px]">
                    {/* Auction Meta info (Entad requirements) */}
                    <div className="flex flex-wrap items-center gap-2 mb-3 pe-8">
                      <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-1 rounded-md font-mono border border-gray-200">
                        {t('featuredAuctions.auctionRef')} {item.auctionRef}
                      </span>
                      <span className="bg-[#47CCD0]/10 text-[#2B3D50] text-[10px] px-2 py-1 rounded-md font-bold">
                        {getAuctionTypeLabel(item.auctionTypeKey)}
                      </span>
                      <span className="bg-purple-50 text-purple-700 text-[10px] px-2 py-1 rounded-md font-bold">
                        {getAuthorityLabel(item.authorityKey)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg text-gray-900 group-hover:text-[#47CCD0] transition-colors line-clamp-1 font-bold">{item.title}</h3>
                    </div>
                    <p className="text-gray-500 text-sm flex items-center gap-2 mb-4">
                      <MapPin size={14} className="text-[#47CCD0]" /> {item.location}
                    </p>
                    
                    {/* Bid History Sparkline */}
                    <div className="mb-4 h-8 w-full bg-gray-50 rounded border border-gray-100 flex items-end justify-between px-2 pt-2 relative overflow-hidden" title={t('featuredAuctions.bidHistory')}>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#47CCD0]/10 to-transparent"></div>
                      {/* Mock sparkline bars */}
                      {[30, 40, 35, 50, 60, 55, 70, 85, 95, 100].map((h, i) => (
                        <div key={i} className="w-[8%] bg-[#47CCD0]/60 rounded-t-sm" style={{ height: `${h}%` }}></div>
                      ))}
                    </div>

                    {/* Auction Dates (Entad requirements) */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-4 space-y-2 border border-gray-100">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500">{t('featuredAuctions.starts')}</span>
                        <span className="font-mono text-gray-800" dir="ltr">{item.startDate}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500">{t('featuredAuctions.ends')}</span>
                        <span className="font-mono text-gray-800" dir="ltr">{item.endDate}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs pt-2 border-t border-gray-200">
                        <span className="text-gray-500">{t('featuredAuctions.minBid')}</span>
                        <span className="font-mono font-bold text-[#47CCD0] flex items-center gap-1" dir="ltr">
                          {item.minBidIncrement?.toLocaleString()} <RiyalSymbol className="w-2.5 h-2.5 text-gray-500" />
                        </span>
                      </div>
                    </div>
                    
                    {/* Meta */}
                    <div className="flex items-center justify-between py-3 border-t border-gray-100 mt-auto">
                      <div className="flex items-center gap-2 text-gray-700 text-sm">
                        <User size={16} className="text-gray-400" />
                        <span>{item.bidders} {t('featuredAuctions.bidders')}</span>
                      </div>
                      <div className="flex items-center gap-1 group/tooltip relative">
                        <div className="flex items-center gap-2 text-[#F39C12] text-xs font-mono bg-[#FFF8E1] px-2 py-1 rounded-lg">
                          <Timer size={14} />
                          <span>{item.timeLeft}</span>
                        </div>
                        <Info size={14} className="text-gray-400 cursor-help" />
                        {/* Tooltip for auto-extension */}
                        <div className="absolute bottom-full start-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-[10px] text-center rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-10">
                          {t('featuredAuctions.autoExtension')}
                          <div className="absolute top-full start-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 w-full mt-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onAuctionClick) {
                            onAuctionClick(item);
                          } else {
                            onNavigate?.('auction-details');
                          }
                        }}
                        className="flex-1 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 hover:border-[#47CCD0] hover:text-[#47CCD0] transition-all duration-300 text-sm font-bold flex items-center justify-center gap-2"
                      >
                        {t('featuredAuctions.details')}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (item.statusKey === 'live') {
                            onNavigate?.('register-now');
                          } else {
                            onNavigate?.('auction-guide');
                          }
                        }}
                        className={`flex-[2] py-3 rounded-xl border border-transparent text-white transition-all duration-300 text-sm font-bold flex items-center justify-center gap-2 ${item.statusKey === 'live' ? 'bg-[#e74c3c] hover:bg-[#c0392b] shadow-lg shadow-red-500/20' : 'bg-[#47CCD0] hover:bg-[#3ba8ac] shadow-lg shadow-teal-500/20'}`}
                      >
                        {item.statusKey === 'live' ? (
                          <>{t('featuredAuctions.bidNow')} <Play size={16} className="fill-white" /></>
                        ) : (
                          t('featuredAuctions.registerAndBid')
                        )}
                      </button>
                    </div>
                 </div>

                 {/* Blur Overlay for Non-logged in Users on Live Auctions */}
                 {item.statusKey === 'live' && !isLoggedIn && (
                   <div className="absolute inset-0 z-40 flex flex-col items-center justify-center p-6 text-center" style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(255, 255, 255, 0.4)' }}>
                     <ShieldCheck size={48} className="text-[#47CCD0] mb-4 drop-shadow-md" />
                     <h4 className="text-lg font-bold text-gray-900 mb-2 drop-shadow-sm">{t('featuredAuctions.liveLoginRequired')}</h4>
                     <p className="text-sm text-gray-700 mb-6 drop-shadow-sm font-medium">{t('featuredAuctions.liveLoginDesc')}</p>
                     <button
                       onClick={(e) => { e.stopPropagation(); onOpenLogin?.(); }}
                       className="bg-[#47CCD0] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#3ba8ac] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                     >
                       {t('featuredAuctions.login')}
                     </button>
                   </div>
                 )}
              </div>
            ))
            ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 py-16 text-center text-gray-500 bg-gray-50 rounded-2xl border border-gray-200">
                <Search className="mx-auto text-gray-400 mb-4" size={32} />
                <p className="text-lg font-medium">{t('featuredAuctions.noResults')}</p>
                <p className="text-sm mt-2">{t('featuredAuctions.noResultsHint')}</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCity('');
                    setSelectedDistrict('');
                    setActiveAuctionFilter('all');
                  }}
                  className="mt-6 px-6 py-2 bg-[#47CCD0] text-white rounded-lg hover:bg-[#3bb5b9] transition-colors"
                >
                  {t('featuredAuctions.clearFilters')}
                </button>
              </div>
            )}
         </div>

         <div className="mt-16 text-center">
           <button className="px-10 py-4 bg-[#F8FAFB] text-gray-900 rounded-xl hover:bg-[#47CCD0] hover:text-white transition-all duration-300 font-bold">
             {t('featuredAuctions.viewAllAuctions')}
           </button>
         </div>
      </div>
    </section>
  );
};
