import React, { useState, useRef, useEffect, useMemo } from 'react';
import { LocationSelector } from '../ui/LocationSelector';
import { FilterBar } from '../ui/FilterBar';
import {
  MapPin,
  Search,
  ChevronDown,
  List,
  Map as MapIcon,
  Heart,
  Share2,
  Bed,
  Bath,
  Maximize,
  Phone,
  MessageCircle,
  X,
  Star
} from 'lucide-react';
import { RiyalSymbol } from '../ui/RiyalSymbol';
import { useTranslation } from 'react-i18next';

export const DailyRentListingPage = ({ onNavigate }: { onNavigate?: (path: string) => void }) => {
  const { t } = useTranslation();

  const allProperties = [
    {
      id: 1,
      type: t('filterBar.furnishedApt'),
      title: t('dailyRentListing.mockTitle1'),
      location: t('dailyRentListing.mockLoc1'),
      price: 850,
      rating: 4.8,
      reviews: 120,
      beds: 2,
      baths: 2,
      area: '120 ' + t('citySale.sqm'),
      isPremium: true,
      features: [t('dailyRentListing.feat1'), t('dailyRentListing.feat2'), t('dailyRentListing.feat3'), t('dailyRentListing.feat4')],
      image: 'https://images.unsplash.com/photo-1550567418-1bd5c7712337?q=80&w=1080',
      agent: { name: t('dailyRentListing.agent1'), time: t('citySale.time1'), logo: 'EH' }
    },
    {
      id: 2,
      type: t('dailyRentListing.privateVilla'),
      title: t('dailyRentListing.mockTitle2'),
      location: t('dailyRentListing.mockLoc2'),
      price: 2500,
      rating: 4.9,
      reviews: 85,
      beds: 4,
      baths: 5,
      area: '450 ' + t('citySale.sqm'),
      isPremium: true,
      features: [t('dailyRentListing.feat5'), t('dailyRentListing.feat6'), t('dailyRentListing.feat7'), t('dailyRentListing.feat2')],
      image: 'https://images.unsplash.com/photo-1673538104712-62c9ac12462f?q=80&w=1080',
      agent: { name: t('dailyRentListing.agent2'), time: t('dailyRentListing.time2'), logo: 'RE' }
    },
    {
      id: 3,
      type: t('dailyRentListing.camp'),
      title: t('dailyRentListing.mockTitle3'),
      location: t('dailyRentListing.mockLoc3'),
      price: 1500,
      rating: 4.7,
      reviews: 210,
      beds: 3,
      baths: 2,
      area: '1000 ' + t('citySale.sqm'),
      isPremium: true,
      features: [t('dailyRentListing.feat8'), t('dailyRentListing.feat9'), t('dailyRentListing.feat10'), t('dailyRentListing.feat11')],
      image: 'https://images.unsplash.com/photo-1762254804915-967868db1ece?q=80&w=1080',
      agent: { name: t('dailyRentListing.agent3'), time: t('citySale.time1'), logo: 'RC' }
    },
    {
      id: 4,
      type: t('dailyRentListing.chalet'),
      title: t('dailyRentListing.mockTitle4'),
      location: t('dailyRentListing.mockLoc4'),
      price: 1200,
      rating: 4.6,
      reviews: 150,
      beds: 2,
      baths: 3,
      area: '300 ' + t('citySale.sqm'),
      isPremium: false,
      features: [t('dailyRentListing.feat12'), t('dailyRentListing.feat13'), t('dailyRentListing.feat14'), t('dailyRentListing.feat15')],
      image: 'https://images.unsplash.com/photo-1646662521253-5b9253b1a207?q=80&w=1080',
      agent: { name: t('dailyRentListing.agent4'), time: t('citySale.time3'), logo: 'SK' }
    }
  ];

  const availableFeatures = Array.from(new Set(allProperties.flatMap(p => p.features)));
  const availableTypes = Array.from(new Set(allProperties.map(p => p.type)));

  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [activeMapProperty, setActiveMapProperty] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Filtering States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedRooms, setSelectedRooms] = useState<number | null>(null);
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

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedTypes([]);
    setPriceRange({ min: '', max: '' });
    setSelectedRooms(null);
    setSelectedFeatures([]);
    setActiveFilter(null);
  };

  // Filter Logic
  const filteredProperties = useMemo(() => {
    return allProperties.filter(property => {
      const matchesSearch = property.title.includes(searchQuery) || property.location.includes(searchQuery);
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(property.type);
      const min = priceRange.min ? parseFloat(priceRange.min) : 0;
      const max = priceRange.max ? parseFloat(priceRange.max) : Infinity;
      const matchesPrice = property.price >= min && property.price <= max;
      const matchesRooms = selectedRooms === null ||
        (selectedRooms === 5 ? property.beds >= 5 : property.beds === selectedRooms);
      const matchesFeatures = selectedFeatures.length === 0 ||
        selectedFeatures.every(f => property.features.includes(f));

      return matchesSearch && matchesType && matchesPrice && matchesRooms && matchesFeatures;
    });
  }, [searchQuery, selectedTypes, priceRange, selectedRooms, selectedFeatures]);

  const activeFiltersCount = selectedTypes.length + (priceRange.min || priceRange.max ? 1 : 0) + (selectedRooms ? 1 : 0) + selectedFeatures.length;

  return (
    <div className="min-h-screen bg-[#F8FAFB] pt-40 pb-20 font-sans">
      <div className="container mx-auto px-4 max-w-7xl">

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <button onClick={() => onNavigate?.('home')} className="hover:text-[#47CCD0] transition-colors cursor-pointer font-medium">{t('directSales.home')}</button>
          <span className="text-gray-300">/</span>
          <span className="font-bold text-gray-900">{t('dailyRentListing.breadcrumb')}</span>
        </div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#2B3D50] mb-2">{t('dailyRentListing.pageTitle')}</h1>
            <p className="text-gray-500">{t('dailyRentListing.foundProperties', { count: filteredProperties.length })}</p>
          </div>

          <div className="flex bg-white rounded-xl border border-gray-200 p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors text-sm font-bold ${viewMode === 'list' ? 'bg-[#47CCD0] text-white' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <List size={18} /> {t('citySale.list')}
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors text-sm font-bold ${viewMode === 'map' ? 'bg-[#47CCD0] text-white' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <MapIcon size={18} /> {t('citySale.map')}
            </button>
          </div>
        </div>

        {/* Smart Filters Bar */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col gap-4 relative z-40" ref={filterRef}>
            <div className="flex flex-col md:flex-row gap-4">
                <LocationSelector />

                {/* Search Input */}
                <div className="relative flex-1">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t('dailyRentListing.searchPlaceholder')}
                        className="w-full ps-4 pe-12 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] text-sm bg-gray-50/50"
                    />
                    <Search size={20} className="absolute end-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>

                {/* Filter Dropdowns */}
                <FilterBar typeOptions={[t('filterBar.furnishedApt'), t('dailyRentListing.chalet'), t('dailyRentListing.camp'), t('filterBar.villa'), t('dailyRentListing.restHouse'), t('dailyRentListing.resort')]} hidePricePeriod={true} />
            </div>

            {/* Quick Tags */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-50 mt-1">
                {[t('dailyRentListing.tag1'), t('dailyRentListing.tag2'), t('dailyRentListing.tag3'), t('dailyRentListing.feat2'), t('dailyRentListing.feat5'), t('dailyRentListing.tag4')].map((tag, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            if (availableTypes.includes(tag)) toggleType(tag);
                            else if (availableFeatures.includes(tag)) toggleFeature(tag);
                            else setSearchQuery(tag);
                        }}
                        className="px-4 py-2 bg-gray-50 border border-gray-100 hover:border-[#47CCD0] text-gray-600 hover:text-[#47CCD0] rounded-full text-xs font-medium transition-colors"
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </div>

        {/* Results Grid */}
        {viewMode === 'list' ? (
          filteredProperties.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center flex flex-col items-center">
                  <Search size={48} className="text-gray-300 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t('dailyRentListing.noResults')}</h3>
                  <p className="text-gray-500 mb-6">{t('dailyRentListing.tryChangingFilters')}</p>
                  <button onClick={clearAllFilters} className="px-6 py-2 bg-[#47CCD0] text-white rounded-xl font-bold hover:bg-[#3bb1b5] transition-colors">{t('dailyRentListing.clearAllFilters')}</button>
              </div>
          ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                    <div key={property.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                        <div className="relative h-[220px] w-full overflow-hidden shrink-0">
                            <img src={property.image} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                            {/* Top Badges */}
                            <div className="absolute top-4 end-4 flex gap-2">
                                <span className="bg-[#2B3D50] text-white text-xs font-bold px-3 py-1 rounded-md">{property.type}</span>
                                {property.isPremium && <span className="bg-[#47CCD0] text-white text-xs font-bold px-3 py-1 rounded-md">★ {t('citySale.featured')}</span>}
                            </div>

                            <div className="absolute top-4 start-4 flex flex-col gap-2">
                                <button className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-colors"><Heart size={14} /></button>
                                <button className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#47CCD0] transition-colors"><Share2 size={14} /></button>
                            </div>

                            <div className="absolute bottom-4 end-4 text-end flex w-[calc(100%-2rem)] justify-between items-end">
                                <div>
                                    <div className="flex items-center gap-1 mb-1 bg-black/40 w-fit px-2 py-0.5 rounded text-white text-xs backdrop-blur-md">
                                        <Star size={12} className="fill-yellow-400 text-yellow-400" />
                                        <span className="font-bold">{property.rating}</span>
                                        <span className="text-white/70">({property.reviews})</span>
                                    </div>
                                    <div className="flex items-baseline gap-1 text-white drop-shadow-lg font-mono">
                                        <span className="font-bold text-2xl">{property.price}</span>
                                        <RiyalSymbol className="w-5 h-5 text-white" />
                                        <span className="text-xs opacity-80 bg-white/20 px-1.5 py-0.5 rounded backdrop-blur-sm font-sans me-1">/ {t('dailyRentListing.day')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-5 flex flex-col flex-1">
                            <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">{property.title}</h3>
                            <div className="flex items-center text-gray-500 text-xs mb-4">
                                <MapPin size={14} className="ms-1 text-[#47CCD0]" /> {property.location}
                            </div>

                            {/* Specifics */}
                            <div className="flex items-center justify-between py-3 border-t border-b border-gray-100 mb-4 mt-auto">
                                <div className="flex items-center gap-1.5 text-gray-700 text-sm"><Bed size={16} className="text-gray-400" /><span className="font-bold">{property.beds}</span> {t('filterBar.bedrooms')}</div>
                                <div className="w-px h-4 bg-gray-200"></div>
                                <div className="flex items-center gap-1.5 text-gray-700 text-sm"><Bath size={16} className="text-gray-400" /><span className="font-bold">{property.baths}</span> {t('filterBar.bathrooms')}</div>
                                <div className="w-px h-4 bg-gray-200"></div>
                                <div className="flex items-center gap-1.5 text-gray-700 text-sm"><Maximize size={16} className="text-gray-400" /><span className="font-bold">{property.area}</span></div>
                            </div>

                            {/* Features */}
                            <div className="flex flex-wrap gap-2 mb-5">
                                {property.features.slice(0, 3).map((feature, idx) => (
                                    <span key={idx} className="bg-[#47CCD0]/5 text-[#2B3D50] text-[10px] px-2.5 py-1.5 rounded-md font-medium border border-[#47CCD0]/10">{feature}</span>
                                ))}
                                {property.features.length > 3 && (
                                    <span className="bg-gray-50 text-gray-500 text-[10px] px-2.5 py-1.5 rounded-md font-medium border border-gray-100">+{property.features.length - 3}</span>
                                )}
                            </div>

                            {/* Agent */}
                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">{property.agent.logo}</div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-900">{property.agent.name}</p>
                                        <p className="text-[10px] text-gray-400">{property.agent.time}</p>
                                    </div>
                                </div>
                                <button
                                  onClick={() => onNavigate?.('rent-property-details')}
                                  className="px-4 py-2 bg-[#47CCD0]/10 text-[#47CCD0] rounded-lg text-sm font-bold hover:bg-[#47CCD0] hover:text-white transition-colors"
                                >
                                  {t('dailyRentListing.detailsAndBooking')}
                                </button>
                            </div>
                        </div>
                    </div>
                  ))}
              </div>
          )
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-250px)] min-h-[600px] mb-10">
              {/* Properties List (Right side) */}
              <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                      <h2 className="font-bold text-gray-900">{t('dailyRentListing.latestOffers')}</h2>
                      <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                          {t('citySale.sortBy')} <span className="font-bold">{t('citySale.newest')}</span> <ChevronDown size={16} />
                      </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                      {filteredProperties.length === 0 ? (
                          <div className="text-center py-10">
                             <p className="text-gray-500 mb-4">{t('dailyRentListing.noResults')}</p>
                             <button onClick={clearAllFilters} className="px-4 py-2 bg-[#47CCD0] text-white rounded-xl text-sm">{t('filterBar.clear')}</button>
                          </div>
                      ) : (
                          filteredProperties.map((property) => (
                              <div
                                  key={property.id}
                                  className="flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all group cursor-pointer"
                                  onClick={() => onNavigate?.('rent-property-details')}
                              >
                                  <div className="relative w-full sm:w-2/5 h-[160px] sm:h-auto overflow-hidden shrink-0">
                                      <img
                                          src={property.image}
                                          alt={property.title}
                                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                      <div className="absolute top-2 end-2 flex gap-1">
                                          <span className="bg-[#2B3D50] text-white text-[10px] font-bold px-2 py-1 rounded">{property.type}</span>
                                          {property.isPremium && (
                                              <span className="bg-[#47CCD0] text-white text-[10px] font-bold px-2 py-1 rounded">★ {t('citySale.featured')}</span>
                                          )}
                                      </div>
                                      <div className="absolute bottom-2 start-2">
                                          <div className="flex items-baseline text-white gap-1 font-mono">
                                              <span className="font-bold text-sm drop-shadow-md flex items-center gap-1">{property.price} <RiyalSymbol className="w-3 h-3 text-white drop-shadow-md" /></span>
                                              <span className="text-[10px] font-bold opacity-90 drop-shadow-md font-sans">/ {t('dailyRentListing.day')}</span>
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
                                          <div className="flex items-center gap-1 bg-black/5 w-fit px-1.5 py-0.5 rounded text-[10px]">
                                              <Star size={10} className="fill-yellow-400 text-yellow-400" />
                                              <span className="font-bold">{property.rating}</span>
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
                          ))
                      )}
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
                  {filteredProperties.map((property, idx) => (
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
                            <span className="text-[10px] font-normal opacity-80 flex items-center gap-0.5"><RiyalSymbol className="w-2.5 h-2.5 text-white/80" />/{t('dailyRentListing.day')}</span>
                         </div>
                         <div className={`w-0 h-0 border-s-[6px] border-s-transparent border-e-[6px] border-e-transparent border-t-[8px] mx-auto transition-colors relative -mt-[1px] ${activeMapProperty === property.id ? 'border-t-[#47CCD0]' : 'border-t-[#2B3D50] group-hover:border-t-[#47CCD0]'}`}></div>

                         {/* Popup Card */}
                         {activeMapProperty === property.id && (
                             <div
                               className="absolute bottom-full mb-3 end-1/2 translate-x-1/2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden cursor-pointer transition-all origin-bottom z-50 animate-in fade-in zoom-in duration-200 group-hover/card:shadow-3xl"
                               onClick={(e) => {
                                 e.stopPropagation();
                                 onNavigate?.('rent-property-details');
                               }}
                             >
                                 <button onClick={(e) => { e.stopPropagation(); setActiveMapProperty(null); }} className="absolute top-2 end-2 z-10 w-6 h-6 bg-black/40 text-white rounded-full flex items-center justify-center hover:bg-black/60 backdrop-blur-sm transition-colors">
                                     <X size={14} />
                                 </button>

                                 <div className="relative h-32 w-full">
                                     <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                     <div className="absolute bottom-2 end-2 start-2 flex items-end justify-between text-white">
                                         <div>
                                            <p className="font-bold text-sm mb-0.5 line-clamp-1">{property.title}</p>
                                            <p className="text-[10px] opacity-80 flex items-center gap-1"><MapPin size={10} /> {property.location}</p>
                                         </div>
                                     </div>
                                     {property.isPremium && (
                                         <span className="absolute top-2 end-2 bg-[#47CCD0] text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">★ {t('citySale.featured')}</span>
                                     )}
                                 </div>
                                 <div className="p-3">
                                     <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-50">
                                         <div className="flex gap-2 text-gray-600">
                                             <div className="flex items-center gap-1 text-[11px]"><Bed size={12} className="text-gray-400" />{property.beds}</div>
                                             <div className="flex items-center gap-1 text-[11px]"><Bath size={12} className="text-gray-400" />{property.baths}</div>
                                         </div>
                                         <div className="flex items-center gap-1 text-[10px] font-bold text-yellow-500">
                                             <Star size={10} className="fill-yellow-500 text-yellow-500" /> {property.rating}
                                         </div>
                                     </div>
                                     <div className="flex items-center justify-between">
                                         <span className="text-[#47CCD0] font-bold text-sm">{t('dailyRentListing.bookNow')}</span>
                                         <span className="font-bold text-gray-900 flex items-center gap-1">
                                             {property.price} <RiyalSymbol className="w-3 h-3 text-[#2B3D50]" /> <span className="text-[10px] font-bold opacity-80 font-sans">/ {t('dailyRentListing.day')}</span>
                                         </span>
                                     </div>
                                 </div>
                             </div>
                         )}
                      </div>
                  ))}
              </div>
          </div>
        )}
      </div>
    </div>
  );
};
