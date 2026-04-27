import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  ArrowLeft,
  Building2,
  CheckCircle2,
  Map as MapIcon,
  LayoutGrid,
  MessageSquare,
  Bot
} from 'lucide-react';
import { BackButton } from '../components/ui/BackButton';
import { RiyalSymbol } from '../components/ui/RiyalSymbol';

interface PlansPageProps {
  onNavigate: (page: string) => void;
}

export const PlansPage: React.FC<PlansPageProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedCity, setSelectedCity] = useState('all');
  const navigate = useNavigate();

  const schemes = [
    {
      id: 1,
      title: t('plansPage.scheme1Title'),
      location: t('plansPage.scheme1Location'),
      area: t('plansPage.scheme1Area'),
      priceStart: '450,000',
      status: 'available',
      image: 'https://images.unsplash.com/photo-1598618334722-5693f0e37ce3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjB2aWV3JTIwb2YlMjBsYW5kJTIwcGxvdHMlMjBmb3IlMjBzYWxlJTIwZGVzZXJ0fGVufDF8fHx8MTc3MDU3NzgyMnww&ixlib=rb-4.1.0&q=80&w=1080',
      type: t('plansPage.scheme1Type'),
      plotsCount: 200
    },
    {
      id: 2,
      title: t('plansPage.scheme2Title'),
      location: t('plansPage.scheme2Location'),
      area: t('plansPage.scheme2Area'),
      priceStart: '850,000',
      status: 'selling_fast',
      image: 'https://images.unsplash.com/photo-1722966885396-1f3dcebdf27f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXVkaSUyMGFyYWJpYSUyMGNpdHklMjBwbGFubmluZyUyMGJsdWVwcmludHxlbnwxfHx8fDE3NzA1Nzc4MTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      type: t('plansPage.scheme2Type'),
      plotsCount: 85
    },
    {
      id: 3,
      title: t('plansPage.scheme3Title'),
      location: t('plansPage.scheme3Location'),
      area: t('plansPage.scheme3Area'),
      priceStart: '1,200,000',
      status: 'available',
      image: 'https://images.unsplash.com/photo-1759863468387-374e0362050a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXNpZGVudGlhbCUyMGNvbXBvdW5kJTIwY29uc3RydWN0aW9uJTIwc2l0ZXxlbnwxfHx8fDE3NzA1Nzc4MTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      type: t('plansPage.scheme3Type'),
      plotsCount: 150
    }
  ];

  const cities = [
    { label: t('plansPage.cityAll'), value: 'all' },
    { label: t('plansPage.cityRiyadh'), value: t('plansPage.cityRiyadh') },
    { label: t('plansPage.cityMakkah'), value: t('plansPage.cityMakkah') },
    { label: t('plansPage.cityEastern'), value: t('plansPage.cityEastern') },
    { label: t('plansPage.cityJeddah'), value: t('plansPage.cityJeddah') },
    { label: t('plansPage.cityQassim'), value: t('plansPage.cityQassim') },
  ];

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available': return t('plansPage.statusAvailable');
      case 'sold_out': return t('plansPage.statusSoldOut');
      case 'selling_fast': return t('plansPage.statusSellingFast');
      default: return t('plansPage.statusComingSoon');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] pb-20 font-sans">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#2B3D50] to-[#47CCD0] text-white pt-40 pb-12 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-black mb-2">{t('plansPage.heroTitle')}</h1>
              <p className="text-gray-300">{t('plansPage.heroSubtitle')}</p>
            </div>
            <BackButton
              onClick={() => onNavigate('home')}
              label={t('plansPage.backButton')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/10"
            />
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-xl p-2 flex flex-col md:flex-row items-center gap-2 shadow-lg max-w-4xl mx-auto transform translate-y-16 border border-gray-100">
            <div className="flex-1 w-full flex items-center px-4 relative group">
              <input
                type="text"
                placeholder={t('plansPage.searchPlaceholder')}
                className="w-full h-12 pe-4 ps-10 bg-transparent border-none outline-none focus:ring-0 text-[#2B3D50] placeholder:text-gray-400"
              />
              <MapPin className="absolute start-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#47CCD0] transition-colors" size={20} />
            </div>
            <div className="hidden md:block w-px h-8 bg-gray-200 mx-2"></div>
            <div className="flex-[0.8] w-full flex items-center px-4 relative group">
              <select className="w-full h-12 pe-4 ps-10 bg-transparent border-none outline-none focus:ring-0 text-gray-600 appearance-none cursor-pointer">
                <option value="">{t('plansPage.filterTypeDefault')}</option>
                <option value="residential">{t('plansPage.filterTypeResidential')}</option>
                <option value="commercial">{t('plansPage.filterTypeCommercial')}</option>
                <option value="agricultural">{t('plansPage.filterTypeAgricultural')}</option>
              </select>
              <Building2 className="absolute start-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#47CCD0] transition-colors pointer-events-none" size={20} />
            </div>
            <button className="w-full md:w-auto bg-[#47CCD0] hover:bg-[#3bbdc1] text-white px-10 h-12 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 shadow-md shadow-[#47CCD0]/20">
              {t('plansPage.searchButton')}
              <Search size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-7xl pt-24">

        {/* Toolbar */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-gray-100 shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-[#47CCD0] text-white shadow-sm' : 'text-gray-400 hover:bg-gray-50'}`}
            >
              <LayoutGrid size={20} />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'map' ? 'bg-[#47CCD0] text-white shadow-sm' : 'text-gray-400 hover:bg-gray-50'}`}
            >
              <MapIcon size={20} />
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide dir-rtl">
            {cities.map((city) => (
              <button
                key={city.value}
                onClick={() => setSelectedCity(city.value)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors border ${
                  selectedCity === city.value
                    ? 'bg-[#2B3D50] text-white border-[#2B3D50] shadow-sm'
                    : 'bg-white text-gray-500 hover:text-[#47CCD0] hover:border-[#47CCD0] border-gray-200'
                }`}
              >
                {city.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schemes.map((scheme) => (
              <motion.div
                key={scheme.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Card Image */}
                <div className="relative h-[220px] overflow-hidden m-2 rounded-[1.5rem]">
                  <img
                    src={scheme.image}
                    alt={scheme.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                  <div className="absolute top-3 end-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-bold text-[#2B3D50] shadow-sm flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-[#47CCD0]" />
                    {t('plansPage.wafiLicensed')}
                  </div>
                  <div className={`absolute bottom-3 end-3 px-4 py-1.5 rounded-full text-[11px] font-bold text-white shadow-sm ${
                    scheme.status === 'available' ? 'bg-[#22C55E]' :
                    scheme.status === 'sold_out' ? 'bg-[#EF4444]' :
                    scheme.status === 'selling_fast' ? 'bg-[#F59E0B]' : 'bg-[#64748B]'
                  }`}>
                    {getStatusLabel(scheme.status)}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-4 text-center">
                    <h3 className="text-xl font-black text-[#2B3D50] mb-2">{scheme.title}</h3>
                    <div className="flex items-center justify-center text-gray-500 text-sm gap-1">
                      <MapPin size={16} />
                      {scheme.location}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-6 mt-auto">
                    <div className="bg-[#F8FAFB] p-3 rounded-2xl text-center">
                      <span className="block text-[11px] text-gray-500 mb-1">{t('plansPage.areaStartsFrom')}</span>
                      <span className="font-bold text-[#2B3D50] text-sm dir-ltr">{scheme.area}</span>
                    </div>
                    <div className="bg-[#F8FAFB] p-3 rounded-2xl text-center">
                      <span className="block text-[11px] text-gray-500 mb-1">{t('plansPage.priceStartsFrom')}</span>
                      <span className="font-bold text-[#47CCD0] text-sm font-mono flex items-center justify-center gap-1">{scheme.priceStart} <RiyalSymbol className="w-3 h-3 text-gray-500" /></span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/plan-details/${scheme.id}`)}
                    className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-[#47CCD0] font-bold text-sm transition-colors group/btn pt-4 border-t border-gray-100"
                  >
                    {t('plansPage.viewDetails')}
                    <ArrowLeft size={16} className="transform group-hover/btn:-translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 h-[700px]">
            {/* Cards List side in Map View */}
            <div className="w-full lg:w-[400px] overflow-y-auto pe-2 space-y-4 scrollbar-hide">
              {schemes.map((scheme) => (
                <div
                  key={scheme.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all flex p-3 gap-4"
                >
                  <div className="w-28 h-28 rounded-xl overflow-hidden relative shrink-0">
                    <img
                      src={scheme.image}
                      alt={scheme.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute bottom-2 end-2 px-2 py-1 rounded-full text-[9px] font-bold text-white shadow-sm ${
                      scheme.status === 'available' ? 'bg-[#22C55E]' :
                      scheme.status === 'sold_out' ? 'bg-[#EF4444]' :
                      scheme.status === 'selling_fast' ? 'bg-[#F59E0B]' : 'bg-[#64748B]'
                    }`}>
                      {scheme.status === 'available' ? t('plansPage.statusAvailable') : t('plansPage.statusSold')}
                    </div>
                  </div>

                  <div className="flex-1 py-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-[#2B3D50] text-sm mb-1">{scheme.title}</h3>
                      <div className="flex items-center text-gray-500 text-xs gap-1">
                        <MapPin size={12} />
                        {scheme.location}
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="font-bold text-[#47CCD0] text-sm font-mono flex items-center gap-1">{scheme.priceStart} <RiyalSymbol className="w-3 h-3 text-gray-500" /></span>
                    </div>
                    <button
                      onClick={() => navigate(`/plan-details/${scheme.id}`)}
                      className="text-[#2B3D50] hover:text-[#47CCD0] font-bold text-xs flex items-center gap-1 mt-2 transition-colors w-max"
                    >
                      {t('plansPage.details')} <ArrowLeft size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Area */}
            <div className="w-full lg:flex-1 bg-gray-200 rounded-3xl overflow-hidden relative border border-gray-100 shadow-sm">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=39.1%2C21.4%2C39.3%2C21.6&layer=mapnik"
                className="w-full h-full border-0"
                title={t('plansPage.mapTitle')}
              ></iframe>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
