import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Search,
  Filter,
  Gavel,
  Timer,
  ChevronDown,
  Trophy,
  Car,
  Truck,
  Bike,
  AlertCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import sarCurrency from 'figma:asset/3f649d4624729213a9513bf0153522436e1f6f47.png';
import { RiyalSymbol } from '../components/ui/RiyalSymbol';

interface CarPlatesAuctionsPageProps {
  onNavigate?: (page: string) => void;
}

import { SaudiPlate } from '../components/auctions/SaudiPlate';

export const CarPlatesAuctionsPage: React.FC<CarPlatesAuctionsPageProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'private' | 'transport' | 'motorcycle'>('private');
  const [selectedPlate, setSelectedPlate] = useState<any>(null);

  const categories = [
    { id: 'private', label: t('carPlatesPage.catPrivate'), icon: Car },
    { id: 'transport', label: t('carPlatesPage.catTransport'), icon: Truck },
    { id: 'motorcycle', label: t('carPlatesPage.catMotorcycle'), icon: Bike },
  ];

  const plates = [
    { id: 1, letters: 'ط ط ط', numbers: '١ ١ ١', type: 'private', price: 250000, timeLeft: '02:14:30', status: 'diamond', bidders: 45 },
    { id: 2, letters: 'س س س', numbers: '١ ٢ ٣', type: 'private', price: 180000, timeLeft: '01:05:20', status: 'gold', bidders: 32 },
    { id: 3, letters: 'ن م ر', numbers: '١', type: 'private', price: 1500000, timeLeft: '05:00:00', status: 'diamond', bidders: 120 },
    { id: 4, letters: 'ق م ر', numbers: '١ ٤', type: 'private', price: 450000, timeLeft: '03:30:00', status: 'diamond', bidders: 55 },
    { id: 5, letters: 'ح ل م', numbers: '٢ ٠ ٣ ٠', type: 'private', price: 95000, timeLeft: '00:45:00', status: 'silver', bidders: 18 },
    { id: 6, letters: 'ع ع ع', numbers: '٦ ٦ ٦', type: 'transport', price: 55000, timeLeft: '04:10:00', status: 'silver', bidders: 12 },
    { id: 7, letters: 'ب ب ب', numbers: '٨ ٠ ٠', type: 'transport', price: 42000, timeLeft: '02:00:00', status: 'bronze', bidders: 8 },
    { id: 8, letters: 'ص ص', numbers: '١', type: 'motorcycle', price: 15000, timeLeft: '01:20:00', status: 'silver', bidders: 5 },
  ];

  const filteredPlates = plates.filter(p => p.type === activeTab);

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'diamond': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'gold': return 'bg-yellow-50 text-yellow-600 border-yellow-100';
      case 'silver': return 'bg-gray-100 text-gray-600 border-gray-200';
      default: return 'bg-gray-50 text-gray-500 border-gray-100';
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'diamond': return t('carPlatesPage.tierDiamond');
      case 'gold': return t('carPlatesPage.tierGold');
      case 'silver': return t('carPlatesPage.tierSilver');
      default: return t('carPlatesPage.tierBronze');
    }
  };

  return (
    <div className="pt-36 pb-20 min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-[#1e293b] text-white py-12 relative overflow-hidden">
         <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
               <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#47CCD0] flex items-center justify-center text-white">
                     <Gavel size={24} />
                  </div>
                  المزادات الإلكترونية للوحات
               </h1>
               <p className="text-gray-300 text-lg leading-relaxed">
                  منصة رسمية للمزايدة على اللوحات المميزة بجميع فئاتها. شارك الآن واقتنِ لوحتك المميزة بكل سهولة وموثوقية.
               </p>
               
               <div className="flex flex-wrap gap-4 mt-8">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
                     <CheckCircle2 className="text-[#47CCD0]" size={20} />
                     <span className="text-sm">لوحات ماسية نادرة</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
                     <CheckCircle2 className="text-[#47CCD0]" size={20} />
                     <span className="text-sm">نقل ملكية فوري</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
                     <CheckCircle2 className="text-[#47CCD0]" size={20} />
                     <span className="text-sm">موثوقية تامة</span>
                  </div>
               </div>
            </div>
         </div>
         {/* Background Decoration */}
         <div className="absolute top-0 start-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute -end-20 -top-20 w-96 h-96 bg-[#47CCD0] rounded-full blur-[100px]"></div>
             <div className="absolute -start-20 bottom-0 w-80 h-80 bg-blue-600 rounded-full blur-[100px]"></div>
         </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-20">
         {/* Stats Cards */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
               <div>
                  <p className="text-gray-500 text-sm mb-1">المزادات الجارية</p>
                  <p className="text-2xl font-bold text-gray-900">124</p>
               </div>
               <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                  <Clock size={24} />
               </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
               <div>
                  <p className="text-gray-500 text-sm mb-1">أعلى مزايدة اليوم</p>
                  <p className="text-2xl font-bold text-gray-900 font-mono flex items-center gap-1">1.5M <RiyalSymbol className="w-5 h-5 text-gray-400" /></p>
               </div>
               <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                  <Trophy size={24} />
               </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
               <div>
                  <p className="text-gray-500 text-sm mb-1">لوحات مباعة</p>
                  <p className="text-2xl font-bold text-gray-900">+500</p>
               </div>
               <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center">
                  <Gavel size={24} />
               </div>
            </div>
         </div>

         {/* Filters & Content */}
         <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="w-full lg:w-72 flex-shrink-0 space-y-6">
               <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
                  <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                     <Filter size={20} className="text-[#47CCD0]" />
                     تصفية اللوحات
                  </h3>

                  <div className="space-y-6">
                     {/* Plate Type */}
                     <div>
                        <label className="text-sm font-bold text-gray-700 mb-3 block">نوع اللوحة</label>
                        <div className="space-y-2">
                           {categories.map(cat => (
                              <button
                                 key={cat.id}
                                 onClick={() => setActiveTab(cat.id as any)}
                                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all border ${
                                    activeTab === cat.id 
                                    ? 'bg-teal-50 border-[#47CCD0] text-[#47CCD0]' 
                                    : 'bg-white border-gray-100 text-gray-600 hover:bg-gray-50'
                                 }`}
                              >
                                 <cat.icon size={20} />
                                 <span className="font-medium">{cat.label}</span>
                                 {activeTab === cat.id && <CheckCircle2 size={16} className="me-auto" />}
                              </button>
                           ))}
                        </div>
                     </div>

                     {/* Classification */}
                     <div>
                        <label className="text-sm font-bold text-gray-700 mb-3 block">تصنيف التميز</label>
                        <div className="flex flex-wrap gap-2">
                           {['ماسي', 'ذهبي', 'فضي', 'برونزي'].map(tier => (
                              <button key={tier} className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:border-[#47CCD0] hover:text-[#47CCD0] transition-all">
                                 {tier}
                              </button>
                           ))}
                        </div>
                     </div>
                     
                     {/* Price Range */}
                     <div>
                        <label className="text-sm font-bold text-gray-700 mb-3 block">نطاق السعر</label>
                        <div className="flex items-center gap-2">
                           <input 
                              type="number" 
                              min="0" 
                              placeholder="من" 
                              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#47CCD0]" 
                              onKeyDown={(e) => { if (e.key === '-' || e.key === 'e') e.preventDefault(); }}
                           />
                           <span className="text-gray-400">-</span>
                           <input 
                              type="number" 
                              min="0" 
                              placeholder="إلى" 
                              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#47CCD0]" 
                              onKeyDown={(e) => { if (e.key === '-' || e.key === 'e') e.preventDefault(); }}
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Main Grid */}
            <div className="flex-1">
               <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">اللوحات المتاحة ({filteredPlates.length})</h2>
                  <div className="flex items-center gap-2">
                     <select className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 outline-none focus:border-[#47CCD0]">
                        <option>الأحدث</option>
                        <option>الأعلى سعراً</option>
                        <option>الأقل سعراً</option>
                        <option>ينتهي قريباً</option>
                     </select>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredPlates.map((plate) => (
                     <div key={plate.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 p-6 flex flex-col items-center">
                        
                        {/* Header: Bids */}
                        <div className="text-gray-600 font-medium mb-6 text-sm">
                           عدد المزايدات : <span className="font-bold text-gray-800">{plate.bidders}</span>
                        </div>

                        {/* Plate Visual */}
                        <div className="w-full flex justify-center mb-8">
                           <div className="transform scale-100">
                              <SaudiPlate letters={plate.letters} numbers={plate.numbers} type={plate.type as any} />
                           </div>
                        </div>

                        {/* Price Section */}
                        <div className="text-center mb-2 w-full">
                           <p className="text-gray-500 font-bold mb-2 text-sm">سعر اللوحة</p>
                           <div className="text-3xl font-bold text-[#47CCD0] tracking-tight mb-2">
                              {plate.price.toLocaleString()}
                           </div>
                           <p className="text-gray-500 text-xs font-medium">ادنى حد للمزايدة 500</p>
                        </div>

                        {/* Timer Section */}
                        <div className="w-full text-center mt-6 mb-8">
                           <p className="text-gray-500 text-xs mb-3 font-medium">الوقت المتبقي حتى نهاية المزاد</p>
                           
                           {/* Simulated Timer Digits */}
                           <div className="flex justify-center items-center gap-4 text-gray-800 font-bold text-xl font-mono tracking-wider" dir="ltr">
                              {/* Splitting the mock time string for visual effect */}
                              {plate.timeLeft.split(':').map((part, i) => (
                                 <div key={i} className="flex flex-col items-center gap-1">
                                    <span>{part}</span>
                                    <span className="text-[10px] text-gray-400 font-normal">
                                       {i === 0 ? 'أيام' : i === 1 ? 'ساعات' : 'دقائق'}
                                    </span>
                                 </div>
                              ))}
                              {/* Add seconds column for effect since string is short */}
                              <div className="flex flex-col items-center gap-1">
                                 <span>45</span>
                                 <span className="text-[10px] text-gray-400 font-normal">ثواني</span>
                              </div>
                           </div>
                        </div>

                        {/* Action Button */}
                        <button 
                           onClick={() => onNavigate?.('plate-details')}
                           className="w-full py-3 bg-[#47CCD0] hover:bg-[#35a8ad] text-white rounded-md font-bold text-lg transition-colors shadow-sm"
                        >
                           مزايدة
                        </button>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
