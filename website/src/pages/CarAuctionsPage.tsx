import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Search,
  Filter,
  Car,
  Calendar,
  Gauge,
  MapPin,
  ChevronDown,
  SlidersHorizontal,
  Sliders,
  X,
  Check,
  Clock,
  User,
  Eye,
  ArrowUpDown,
  Siren,
  Building2,
  Landmark,
  Wallet,
  FileCheck,
  ShieldCheck,
  Zap
} from 'lucide-react';
import sarCurrency from 'figma:asset/3f649d4624729213a9513bf0153522436e1f6f47.png';
import { Slider } from '../components/ui/slider';
import { RiyalSymbol } from '../components/ui/RiyalSymbol';

interface CarAuctionsPageProps {
  onNavigate?: (page: string) => void;
  onCarClick?: (car: any) => void;
}

export const CarAuctionsPage: React.FC<CarAuctionsPageProps> = ({ onNavigate, onCarClick }) => {
  const { t } = useTranslation();

  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<number[]>([0, 500000]);
  const [isBodyConditionOpen, setIsBodyConditionOpen] = useState(true);
  const [isCarConditionOpen, setIsCarConditionOpen] = useState(true);
  const [isTransmissionOpen, setIsTransmissionOpen] = useState(true);
  const [isFuelTypeOpen, setIsFuelTypeOpen] = useState(true);
  const [selectedCarCondition, setSelectedCarCondition] = useState<string>('used');

  // New layout & sorting states
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  const sortOptions = [
    { key: 'newest', label: t('carAuctions.sortNewest') },
    { key: 'lowestPrice', label: t('carAuctions.sortLowestPrice') },
    { key: 'highestPrice', label: t('carAuctions.sortHighestPrice') },
    { key: 'endingSoon', label: t('carAuctions.sortEndingSoon') },
  ];

  // Mock Data — status uses English keys; titleKey/locationKey resolved via t()
  const cars = [
    {
      id: 1,
      titleKey: 'carAuctions.car1Title',
      make: 'Toyota',
      model: 'Camry',
      year: 2023,
      odometer: '15,000 km',
      locationKey: 'carFilters.riyadh',
      currentBid: 85000,
      image: 'https://images.unsplash.com/photo-1689182441262-64e78e223584?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3lvdGElMjBjYW1yeSUyMHdoaXRlJTIwY2FyfGVufDF8fHx8MTc2NjE1NzAzNHww&ixlib=rb-4.1.0&q=80&w=1080',
      timeLeft: '02d : 15h : 30m',
      bidders: 12,
      status: 'live',
      statusColor: 'bg-red-500'
    },
    {
      id: 2,
      titleKey: 'carAuctions.car2Title',
      make: 'Mercedes',
      model: 'S-Class',
      year: 2022,
      odometer: '28,000 km',
      locationKey: 'carFilters.jeddah',
      currentBid: 420000,
      image: 'https://images.unsplash.com/photo-1629019879070-11fceb18ed61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXJjZWRlcyUyMGJlbnolMjBzJTIwY2xhc3MlMjBibGFja3xlbnwxfHx8fDE3NjYxNTcwMzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      timeLeft: '01d : 08h : 10m',
      bidders: 45,
      status: 'live',
      statusColor: 'bg-red-500'
    },
    {
      id: 3,
      titleKey: 'carAuctions.car3Title',
      make: 'Lexus',
      model: 'LX600',
      year: 2024,
      odometer: '5,000 km',
      locationKey: 'carFilters.riyadh',
      currentBid: 580000,
      image: 'https://images.unsplash.com/photo-1698122660387-64acb063dabe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZXh1cyUyMHN1diUyMHdoaXRlfGVufDF8fHx8MTc2NjE1NzA0M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      timeLeft: '03d : 12h : 00m',
      bidders: 28,
      status: 'upcoming',
      statusColor: 'bg-blue-500'
    },
    {
      id: 4,
      titleKey: 'carAuctions.car4Title',
      make: 'Hyundai',
      model: 'Sonata',
      year: 2023,
      odometer: '35,000 km',
      locationKey: 'carFilters.dammam',
      currentBid: 65000,
      image: 'https://images.unsplash.com/photo-1631452598383-3787ab18650e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoeXVuZGFpJTIwc29uYXRhJTIwc2lsdmVyfGVufDF8fHx8MTc2NjE1NzA0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      timeLeft: '00d : 05h : 20m',
      bidders: 8,
      status: 'live',
      statusColor: 'bg-red-500'
    },
    {
      id: 5,
      titleKey: 'carAuctions.car5Title',
      make: 'Ford',
      model: 'Mustang',
      year: 2021,
      odometer: '42,000 km',
      locationKey: 'carFilters.jeddah',
      currentBid: 145000,
      image: 'https://images.unsplash.com/photo-1692807471707-880ceff6bb17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JkJTIwbXVzdGFuZyUyMHJlZHxlbnwxfHx8fDE3NjYxNTcwNTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      timeLeft: '04d : 02h : 15m',
      bidders: 19,
      status: 'live',
      statusColor: 'bg-red-500'
    },
    {
      id: 6,
      titleKey: 'carAuctions.car6Title',
      make: 'Land Rover',
      model: 'Range Rover',
      year: 2023,
      odometer: '12,000 km',
      locationKey: 'carFilters.riyadh',
      currentBid: 720000,
      image: 'https://images.unsplash.com/photo-1676319100135-bbf0d23232aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kJTIwcm92ZXIlMjByYW5nZSUyMHJvdmVyJTIwd2hpdGV8ZW58MXx8fHwxNzY2MTU3MDU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      timeLeft: '06d : 10h : 45m',
      bidders: 56,
      status: 'upcoming',
      statusColor: 'bg-blue-500'
    }
  ];

  const vehicleTypes = [
    { nameKey: 'carAuctions.typeSedan', count: 120 },
    { nameKey: 'carAuctions.type4x4', count: 85 },
    { nameKey: 'carAuctions.typeCoupe', count: 15 },
    { nameKey: 'carAuctions.typePickup', count: 24 },
    { nameKey: 'carAuctions.typeVan', count: 8 }
  ];

  // Car condition options with English keys
  const carConditionOptions = [
    { key: 'new', label: t('carAuctions.conditionNew') },
    { key: 'used', label: t('carAuctions.conditionUsed') },
    { key: 'damaged', label: t('carAuctions.conditionDamaged') },
  ];

  // Status display helper
  const getStatusLabel = (status: string) => {
    if (status === 'live') return t('carAuctions.statusLive');
    if (status === 'upcoming') return t('carAuctions.statusUpcoming');
    if (status === 'ended') return t('carAuctions.statusEnded');
    return status;
  };

  return (
    <div className="min-h-screen bg-gray-50 -mt-[104px]">

      {/* --- Hero Section --- */}
      <div className="relative pt-[160px] pb-16 bg-[#1A1A1A] overflow-hidden">
        <div className="absolute inset-0">
           <img
             src="https://images.unsplash.com/photo-1760689043833-bbacf1316e85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBjYXIlMjBleHRlcmlvciUyMGZyb250JTIwdmlld3xlbnwxfHx8fDE3NjYxNTcwMjd8MA&ixlib=rb-4.1.0&q=80&w=1080"
             alt={t('carAuctions.heroImageAlt')}
             className="w-full h-full object-cover object-bottom opacity-60"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 h-full flex flex-col justify-center">
           <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-[#47CCD0]/20 rounded-lg backdrop-blur-md border border-[#47CCD0]/30">
               <Car className="text-[#47CCD0]" size={24} />
             </div>
             <span className="text-[#47CCD0] font-bold tracking-widest uppercase">{t('carAuctions.heroLabel')}</span>
           </div>
           <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
             {t('carAuctions.heroTitle')}
           </h1>
           <p className="text-gray-300 text-lg max-w-xl">
             {t('carAuctions.heroDesc')}
           </p>
        </div>
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* --- Sidebar Filters --- */}
          <div className="w-full lg:w-[280px] flex-shrink-0">
             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                   <h3 className="font-bold text-gray-900 flex items-center gap-2 text-lg">
                     <Filter size={20} className="text-[#47CCD0]" />
                     {t('carAuctions.filterResults')}
                   </h3>
                   <button className="text-xs text-red-500 hover:underline">{t('carAuctions.reset')}</button>
                </div>

                {/* 1. Auction Status (Urgency) */}
                <div className="mb-6">
                  <h4 className="font-bold text-sm mb-3 text-gray-800">{t('carAuctions.auctionStatus')}</h4>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between p-2 rounded-lg border border-red-100 bg-red-50/50 cursor-pointer hover:bg-red-50 transition-colors">
                      <div className="flex items-center gap-2">
                         <input type="checkbox" className="w-4 h-4 rounded text-red-600 focus:ring-red-500 border-gray-300" defaultChecked />
                         <span className="text-sm font-bold text-red-600 flex items-center gap-1.5">
                           <span className="relative flex h-2.5 w-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                            </span>
                            {t('carAuctions.liveNow')}
                         </span>
                      </div>
                      <span className="text-xs font-medium text-red-600 bg-white px-2 py-0.5 rounded shadow-sm">12</span>
                    </label>

                    <label className="flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-2">
                         <input type="checkbox" className="w-4 h-4 rounded text-[#47CCD0] focus:ring-[#47CCD0] border-gray-300" />
                         <span className="text-sm text-gray-700 flex items-center gap-2">
                           <Clock size={14} className="text-orange-500" />
                           {t('carAuctions.endsToday')}
                         </span>
                      </div>
                      <span className="text-xs text-gray-400">5</span>
                    </label>

                    <label className="flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-2">
                         <input type="checkbox" className="w-4 h-4 rounded text-[#47CCD0] focus:ring-[#47CCD0] border-gray-300" />
                         <span className="text-sm text-gray-700 flex items-center gap-2">
                           <Calendar size={14} className="text-blue-500" />
                           {t('carAuctions.comingSoon')}
                         </span>
                      </div>
                      <span className="text-xs text-gray-400">20</span>
                    </label>
                  </div>
                </div>

                <div className="h-px bg-gray-100 mb-6" />

                {/* 2. Auction Source */}
                <div className="mb-6">
                   <h4 className="font-bold text-sm mb-3 text-gray-800">{t('carAuctions.auctionSource')}</h4>
                   <div className="space-y-3">
                      {[
                        { id: 'gov', labelKey: 'carAuctions.sourceGov', icon: Building2, color: 'text-slate-600' },
                        { id: 'bank', labelKey: 'carAuctions.sourceBank', icon: Landmark, color: 'text-emerald-600' },
                        { id: 'private', labelKey: 'carAuctions.sourcePrivate', icon: Wallet, color: 'text-blue-600' },
                        { id: 'individual', labelKey: 'carAuctions.sourceIndividual', icon: User, color: 'text-gray-600' }
                      ].map((source) => (
                        <label key={source.id} className="flex items-center gap-3 cursor-pointer group">
                           <input type="checkbox" className="w-4 h-4 rounded text-[#47CCD0] focus:ring-[#47CCD0] border-gray-300" />
                           <div className="flex items-center gap-2 text-sm text-gray-600 group-hover:text-[#47CCD0] transition-colors">
                              <source.icon size={16} className={source.color} />
                              {t(source.labelKey)}
                           </div>
                        </label>
                      ))}
                   </div>
                </div>

                <div className="h-px bg-gray-100 mb-6" />

                {/* 3. Starting Bid (Slider) */}
                <div className="mb-6">
                   <h4 className="font-bold text-sm mb-4 text-gray-800">{t('carAuctions.openingBidPrice')}</h4>
                   <div className="px-2">
                     <Slider
                        defaultValue={[0, 500000]}
                        max={1000000}
                        step={5000}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="my-4"
                     />
                     <div className="flex items-center justify-between text-xs text-gray-500 mt-2 font-medium font-mono">
                        <div className="bg-gray-50 px-2 py-1 rounded border border-gray-200 flex items-center gap-1">{priceRange[0].toLocaleString()} <RiyalSymbol className="w-3 h-3 text-gray-500" /></div>
                        <div className="bg-gray-50 px-2 py-1 rounded border border-gray-200 flex items-center gap-1">{priceRange[1].toLocaleString()} <RiyalSymbol className="w-3 h-3 text-gray-500" /></div>
                     </div>
                   </div>
                </div>

                <div className="h-px bg-gray-100 mb-6" />

                {/* 4. Car Details */}
                <div className="mb-6">
                   <h4 className="font-bold text-sm mb-3 text-gray-800">{t('carAuctions.carDetails')}</h4>
                   <div className="space-y-3">
                      <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-[#47CCD0] transition-all">
                         <option>{t('carAuctions.allBrands')}</option>
                         <option>{t('carFilters.toyota')}</option>
                         <option>{t('carFilters.mercedes')}</option>
                         <option>{t('carFilters.ford')}</option>
                      </select>

                      <div className="flex items-center gap-2">
                         <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-[#47CCD0]">
                            <option>{t('carAuctions.fromYear')}</option>
                            <option>2020</option>
                            <option>2021</option>
                         </select>
                         <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-[#47CCD0]">
                            <option>{t('carAuctions.toYear')}</option>
                            <option>2025</option>
                            <option>2024</option>
                         </select>
                      </div>

                      <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-[#47CCD0]">
                         <option>{t('carAuctions.mileageKm')}</option>
                         <option>{t('carAuctions.mileageUnder10k')}</option>
                         <option>{t('carAuctions.mileage10kTo50k')}</option>
                         <option>{t('carAuctions.mileageOver50k')}</option>
                      </select>
                   </div>
                </div>

                <div className="h-px bg-gray-100 mb-6" />

                {/* 5. Inspection & Docs */}
                <div className="mb-6">
                   <h4 className="font-bold text-sm mb-3 text-gray-800">{t('carAuctions.inspectionDocs')}</h4>
                   <div className="space-y-2">
                      {[
                        { labelKey: 'carAuctions.hasInspectionReport', icon: FileCheck },
                        { labelKey: 'carAuctions.registrationValid', icon: ShieldCheck },
                        { labelKey: 'carAuctions.periodicInspectionValid', icon: Check },
                        { labelKey: 'carAuctions.readyForTransfer', icon: Zap }
                      ].map((item, idx) => (
                        <label key={idx} className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-gray-50 rounded-lg -mx-1.5 transition-colors">
                           <input type="checkbox" className="w-4 h-4 rounded text-[#47CCD0] focus:ring-[#47CCD0] border-gray-300" />
                           <span className="text-sm text-gray-600 flex items-center gap-2">
                             <item.icon size={14} className="text-gray-400" />
                             {t(item.labelKey)}
                           </span>
                        </label>
                      ))}
                   </div>
                </div>

                <div className="h-px bg-gray-100 mb-6" />

                {/* 6. Regional Specifications */}
                <div className="mb-6">
                   <h4 className="font-bold text-sm mb-3 text-gray-800">{t('carFilters.regionalSpecs')}</h4>
                   <div className="space-y-2">
                      {[
                        { key: 'carFilters.saudi' },
                        { key: 'carFilters.gulf' },
                        { key: 'carFilters.american' },
                        { key: 'carFilters.importedOther' }
                      ].map((spec) => (
                        <label key={spec.key} className="flex items-center justify-between cursor-pointer p-1.5 hover:bg-gray-50 rounded-lg -mx-1.5 transition-colors">
                           <span className="text-sm text-gray-600">{t(spec.key)}</span>
                           <input type="checkbox" className="w-4 h-4 rounded text-[#47CCD0] focus:ring-[#47CCD0] border-gray-300" />
                        </label>
                      ))}
                   </div>
                </div>

                <div className="h-px bg-gray-100 mb-6" />

                {/* 7. Body Condition */}
                <div className="mb-6">
                   <button
                      onClick={() => setIsBodyConditionOpen(!isBodyConditionOpen)}
                      className="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl hover:border-[#47CCD0] transition-all mb-2 group"
                   >
                      <span className="font-bold text-sm text-gray-800 group-hover:text-[#47CCD0] transition-colors">{t('carAuctions.bodyCondition')}</span>
                      <ChevronDown size={16} className={`text-gray-400 group-hover:text-[#47CCD0] transition-all ${isBodyConditionOpen ? 'rotate-180' : ''}`} />
                   </button>

                   {isBodyConditionOpen && (
                     <div className="space-y-2 px-1">
                        {[
                          { key: 'carAuctions.bodyOriginal' },
                          { key: 'carAuctions.bodyCosmeticPaint' },
                          { key: 'carAuctions.bodyLightDamage' }
                        ].map((condition) => (
                          <label key={condition.key} className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-gray-50 rounded-lg transition-colors">
                             <input type="checkbox" className="w-4 h-4 rounded text-[#47CCD0] focus:ring-[#47CCD0] border-gray-300" />
                             <span className="text-sm text-gray-600">{t(condition.key)}</span>
                          </label>
                        ))}
                     </div>
                   )}
                </div>

                <div className="h-px bg-gray-100 mb-6" />

                {/* 8. Car Condition */}
                <div className="mb-6">
                   <button
                      onClick={() => setIsCarConditionOpen(!isCarConditionOpen)}
                      className="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl hover:border-[#47CCD0] transition-all mb-2 group"
                   >
                      <span className="font-bold text-sm text-gray-800 group-hover:text-[#47CCD0] transition-colors">{t('carFilters.carCondition')}</span>
                      <ChevronDown size={16} className={`text-gray-400 group-hover:text-[#47CCD0] transition-all ${isCarConditionOpen ? 'rotate-180' : ''}`} />
                   </button>

                   {isCarConditionOpen && (
                     <div className="space-y-2 px-1">
                        {carConditionOptions.map((condition) => (
                          <label key={condition.key} className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-gray-50 rounded-lg transition-colors">
                             <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${selectedCarCondition === condition.key ? 'border-black' : 'border-gray-200'}`}>
                                {selectedCarCondition === condition.key && (
                                  <div className="w-2 h-2 rounded-full bg-black" />
                                )}
                             </div>
                             <input
                               type="radio"
                               name="carCondition"
                               className="hidden"
                               checked={selectedCarCondition === condition.key}
                               onChange={() => setSelectedCarCondition(condition.key)}
                             />
                             <span className={`text-sm ${selectedCarCondition === condition.key ? 'font-bold text-black' : 'text-gray-600'}`}>{condition.label}</span>
                          </label>
                        ))}
                     </div>
                   )}
                </div>

                <div className="h-px bg-gray-100 mb-6" />

                {/* 9. Transmission */}
                <div className="mb-6">
                   <button
                      onClick={() => setIsTransmissionOpen(!isTransmissionOpen)}
                      className="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl hover:border-[#47CCD0] transition-all mb-2 group"
                   >
                      <span className="font-bold text-sm text-gray-800 group-hover:text-[#47CCD0] transition-colors">{t('carAuctions.transmission')}</span>
                      <ChevronDown size={16} className={`text-gray-400 group-hover:text-[#47CCD0] transition-all ${isTransmissionOpen ? 'rotate-180' : ''}`} />
                   </button>

                   {isTransmissionOpen && (
                     <div className="space-y-2 px-1">
                        {[
                          { key: 'carFilters.automatic' },
                          { key: 'carFilters.manual' }
                        ].map((type) => (
                          <label key={type.key} className="flex items-center justify-between cursor-pointer p-1.5 hover:bg-gray-50 rounded-lg transition-colors">
                             <span className="text-sm text-gray-600">{t(type.key)}</span>
                             <input type="checkbox" className="w-4 h-4 rounded text-[#47CCD0] focus:ring-[#47CCD0] border-gray-300" />
                          </label>
                        ))}
                     </div>
                   )}
                </div>

                <div className="h-px bg-gray-100 mb-6" />

                {/* 10. Fuel Type */}
                <div className="mb-6">
                   <button
                      onClick={() => setIsFuelTypeOpen(!isFuelTypeOpen)}
                      className="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl hover:border-[#47CCD0] transition-all mb-2 group"
                   >
                      <span className="font-bold text-sm text-gray-800 group-hover:text-[#47CCD0] transition-colors">{t('carFilters.fuelType')}</span>
                      <ChevronDown size={16} className={`text-gray-400 group-hover:text-[#47CCD0] transition-all ${isFuelTypeOpen ? 'rotate-180' : ''}`} />
                   </button>

                   {isFuelTypeOpen && (
                     <div className="space-y-2 px-1">
                        {[
                          { key: 'carFilters.petrol' },
                          { key: 'carFilters.diesel' },
                          { key: 'carFilters.hybrid' },
                          { key: 'carFilters.electric' }
                        ].map((type) => (
                          <label key={type.key} className="flex items-center justify-between cursor-pointer p-1.5 hover:bg-gray-50 rounded-lg transition-colors">
                             <span className="text-sm text-gray-600">{t(type.key)}</span>
                             <input type="checkbox" className="w-4 h-4 rounded text-[#47CCD0] focus:ring-[#47CCD0] border-gray-300" />
                          </label>
                        ))}
                     </div>
                   )}
                </div>

                <div className="h-px bg-gray-100 mb-6" />

                 {/* 11. Location */}
                 <div>
                   <h4 className="font-bold text-sm mb-3 text-gray-800">{t('carAuctions.location')}</h4>
                   <div className="space-y-2 max-h-32 overflow-y-auto custom-scrollbar ps-2">
                      {[
                        'carFilters.riyadh',
                        'carFilters.jeddah',
                        'carFilters.dammam',
                        'carFilters.makkah',
                        'carFilters.madinah',
                        'carAuctions.mainAuctionHall'
                      ].map((locKey) => (
                        <label key={locKey} className="flex items-center gap-2 cursor-pointer">
                           <input type="checkbox" className="w-4 h-4 rounded text-[#47CCD0] focus:ring-[#47CCD0] border-gray-300" />
                           <span className="text-sm text-gray-600">{t(locKey)}</span>
                        </label>
                      ))}
                   </div>
                </div>

             </div>
          </div>

          {/* --- Main Content --- */}
          <div className="flex-1">

             {/* Sort Bar */}
             <div className="flex items-center justify-between bg-white py-3 px-4 rounded-xl border border-gray-200 shadow-sm mb-6">
                <p className="text-[#2B3D50] text-sm font-medium">
                   {t('carAuctions.foundCount', { count: 124 })}
                </p>
                <div className="flex items-center gap-3 relative">
                   <span className="text-sm text-gray-500 font-medium hidden sm:block">{t('carAuctions.sortBy')}:</span>

                   {/* Custom Sort Dropdown */}
                   <div className="relative">
                      <button
                         onClick={() => setIsSortOpen(!isSortOpen)}
                         className={`flex items-center justify-between gap-6 px-4 py-2 bg-white border ${isSortOpen ? 'border-[#47CCD0] ring-2 ring-[#47CCD0]/20' : 'border-gray-200'} rounded-lg text-sm font-bold text-[#2B3D50] hover:border-[#47CCD0] hover:bg-gray-50 transition-all`}
                      >
                         <span>{sortOptions.find(o => o.key === sortBy)?.label ?? sortBy}</span>
                         <ChevronDown size={16} className={`text-gray-500 transition-transform duration-200 ${isSortOpen ? 'rotate-180 text-[#47CCD0]' : ''}`} />
                      </button>

                      {isSortOpen && (
                         <div className="absolute top-full mt-2 start-0 w-full min-w-[140px] bg-white border border-gray-100 shadow-xl rounded-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                            {sortOptions.map((option) => (
                               <button
                                  key={option.key}
                                  onClick={() => {
                                     setSortBy(option.key);
                                     setIsSortOpen(false);
                                  }}
                                  className={`w-full text-end px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors ${sortBy === option.key ? 'text-[#47CCD0] bg-teal-50/50' : 'text-gray-700'}`}
                               >
                                  {option.label}
                               </button>
                            ))}
                         </div>
                      )}
                   </div>

                   {/* View Mode Toggles */}
                   <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden h-[38px] me-2 bg-white">
                      <button
                         onClick={() => setViewMode('grid')}
                         className={`h-full px-3 flex items-center justify-center transition-colors ${viewMode === 'grid' ? 'bg-[#47CCD0] text-white' : 'bg-white text-gray-400 hover:bg-gray-50'}`}
                         title={t('carAuctions.gridView')}
                      >
                         <SlidersHorizontal size={18} />
                      </button>
                      <button
                         onClick={() => setViewMode('list')}
                         className={`h-full px-3 flex items-center justify-center transition-colors border-e border-gray-200 ${viewMode === 'list' ? 'bg-[#47CCD0] text-white' : 'bg-white text-gray-400 hover:bg-gray-50'}`}
                         title={t('carAuctions.listView')}
                      >
                         <Sliders size={18} />
                      </button>
                   </div>
                </div>
             </div>

             {/* Cars Grid / List */}
             <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
                {cars.map((car) => (
                  <div key={car.id} className={`bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden group ${viewMode === 'list' ? 'flex flex-col sm:flex-row' : 'flex flex-col'}`}>

                     {/* Image Area */}
                     <div className={`relative overflow-hidden bg-gray-100 ${viewMode === 'list' ? 'h-48 sm:h-auto sm:w-1/3 flex-shrink-0' : 'h-56'}`}>
                        <img
                          src={car.image}
                          alt={t(car.titleKey)}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />

                        <div className="absolute top-3 end-3 z-10 flex gap-2">
                           <span className={`${car.statusColor} text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm flex items-center gap-1`}>
                             <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                             {getStatusLabel(car.status)}
                           </span>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                           <button
                             onClick={() => onCarClick?.(car)}
                             className="bg-white/20 backdrop-blur-md border border-white/40 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-white hover:text-black transition-all flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 duration-300"
                           >
                              <Eye size={16} /> {t('carAuctions.viewDetails')}
                           </button>
                        </div>
                     </div>

                     {/* Content */}
                     <div className={`p-5 flex-1 flex ${viewMode === 'list' ? 'flex-col sm:flex-row' : 'flex-col'}`}>
                        <div className={`flex-1 ${viewMode === 'list' ? 'border-b sm:border-b-0 sm:border-s border-gray-100 pb-4 sm:pb-0 sm:ps-5' : ''}`}>
                           <h3
                             className="font-bold text-lg text-gray-900 mb-1 group-hover:text-[#47CCD0] transition-colors cursor-pointer"
                             onClick={() => onCarClick?.(car)}
                           >
                             {t(car.titleKey)}
                           </h3>
                           <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
                              <span className="font-medium text-gray-700">{car.make}</span> • <span className="text-gray-500">{car.year}</span>
                           </p>

                           <div className={`flex items-center gap-4 text-xs text-gray-500 ${viewMode === 'grid' ? 'border-y border-gray-50 py-3 mb-6' : 'mt-4'}`}>
                              <div className="flex items-center gap-1.5">
                                 <Gauge size={14} className="text-[#47CCD0]" />
                                 <span dir="ltr">{car.odometer}</span>
                              </div>
                              <div className="w-px h-4 bg-gray-200" />
                              <div className="flex items-center gap-1.5">
                                 <MapPin size={14} className="text-[#47CCD0]" />
                                 <span>{t(car.locationKey)}</span>
                              </div>
                           </div>
                        </div>

                        {/* Bid Info */}
                        <div className={`${viewMode === 'list' ? 'pt-4 sm:pt-0 sm:pe-5 sm:w-48 flex flex-col justify-between' : 'mt-auto'}`}>
                           <div className={`flex items-end justify-between ${viewMode === 'grid' ? 'mb-2' : 'mb-4'}`}>
                              <div>
                                 <p className="text-[10px] text-gray-400 mb-0.5 line-through flex items-center gap-1">{t('carAuctions.opening')}: {(car.currentBid * 0.8).toLocaleString()} <RiyalSymbol className="w-2.5 h-2.5 text-gray-400" /></p>
                                 <p className="text-xs text-gray-500 mb-1 font-bold">{car.status === 'live' ? t('carAuctions.currentPriceBid') : t('carAuctions.price')} <span className="text-[9px] bg-gray-100 px-1 py-0.5 rounded font-normal text-gray-500">{t('carAuctions.includesTax')}</span></p>
                                 <div className="flex items-center gap-1 font-mono">
                                    <span className="text-2xl font-bold text-[#47CCD0]" dir="ltr">{car.currentBid.toLocaleString()}</span>
                                    <RiyalSymbol className="w-4 h-4 text-gray-500" />
                                 </div>
                              </div>
                              {viewMode === 'grid' && (
                                 <div className="text-start">
                                    <div className="flex items-center gap-1 text-[#47CCD0] text-xs font-bold bg-teal-50 px-2 py-1 rounded-md mb-1">
                                       <Clock size={12} />
                                       <span dir="ltr">{car.timeLeft}</span>
                                    </div>
                                    <p className="text-[10px] text-gray-400">{car.bidders} {t('carAuctions.bidders')}</p>
                                 </div>
                              )}
                           </div>

                           {viewMode === 'list' && (
                              <div className="flex items-center justify-between mb-4">
                                 <div className="flex items-center gap-1 text-[#47CCD0] text-xs font-bold bg-teal-50 px-2 py-1 rounded-md">
                                    <Clock size={12} />
                                    <span dir="ltr">{car.timeLeft}</span>
                                 </div>
                                 <p className="text-[10px] text-gray-400 font-medium">{car.bidders} {t('carAuctions.bidders')}</p>
                              </div>
                           )}

                           <button className="w-full py-2.5 bg-gray-900 text-white rounded-lg font-bold text-sm hover:bg-[#47CCD0] transition-colors shadow-lg shadow-gray-200 hover:shadow-teal-500/30">
                              {t('carAuctions.bidNow')}
                           </button>
                        </div>
                     </div>
                  </div>
                ))}
             </div>

             {/* Pagination */}
             <div className="mt-12 flex justify-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-[#47CCD0] hover:text-[#47CCD0] transition-all">
                   <ChevronDown className="rotate-90" size={20} />
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#47CCD0] text-white font-bold">1</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:border-[#47CCD0] hover:text-[#47CCD0] transition-all">2</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-[#47CCD0] hover:text-[#47CCD0] transition-all">
                   <ChevronDown className="-rotate-90" size={20} />
                </button>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
};
