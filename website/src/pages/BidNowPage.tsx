import React from 'react';
import { 
  MapPin, 
  Clock, 
  Gauge, 
  ChevronLeft, 
  Filter, 
  Search, 
  ArrowUpDown,
  Car,
  Heart
} from 'lucide-react';
import { RiyalSymbol } from '../components/ui/RiyalSymbol';
import { Button } from '../components/ui/button';

interface BidNowPageProps {
  onNavigate?: (page: string) => void;
}

export const BidNowPage: React.FC<BidNowPageProps> = ({ onNavigate }) => {
  // Mock Data for "Live" Auctions
  const auctions = [
    {
      id: 1,
      title: 'تويوتا كامري 2023 فل كامل',
      make: 'Toyota',
      year: 2023,
      odometer: 15000,
      location: 'الرياض',
      currentBid: 85000,
      bidders: 12,
      timeLeft: '02 يوم : 15 س : 30 د',
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3968e3bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHx0b3lvdGElMjBjYW1yeSUyMGludGVyaW9yfGVufDF8fHx8MTc2NjE1ODAwMHww&ixlib=rb-4.1.0&q=80&w=1080',
      isLive: true
    },
    {
      id: 2,
      title: 'مرسيدس بنز S-Class 2022',
      make: 'Mercedes',
      year: 2022,
      odometer: 28000,
      location: 'جدة',
      currentBid: 420000,
      bidders: 45,
      timeLeft: '01 يوم : 08 س : 10 د',
      image: 'https://images.unsplash.com/photo-1629019879070-11fceb18ed61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXJjZWRlcyUyMGJlbnolMjBzJTIwY2xhc3MlMjBibGFja3xlbnwxfHx8fDE3NjYxNTcwMzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      isLive: true
    },
    {
      id: 3,
      title: 'رنج روفر سبورت 2024',
      make: 'Land Rover',
      year: 2024,
      odometer: 5000,
      location: 'الدمام',
      currentBid: 580000,
      bidders: 28,
      timeLeft: '00 يوم : 04 س : 15 د',
      image: 'https://images.unsplash.com/photo-1676319100135-bbf0d23232aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kJTIwcm92ZXIlMjByYW5nZSUyMHJvdmVyJTIwd2hpdGV8ZW58MXx8fHwxNzY2MTU3MDU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      isLive: true
    },
    {
      id: 4,
      title: 'شيفروليه تاهو 2023',
      make: 'Chevrolet',
      year: 2023,
      odometer: 18000,
      location: 'الرياض',
      currentBid: 210000,
      bidders: 15,
      timeLeft: '03 يوم : 12 س : 00 د',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGV2cm9sZXQlMjBjYXJ8ZW58MXx8fHwxNzY2MTU4MDMwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      isLive: true
    },
    {
      id: 5,
      title: 'بي إم دبليو X6 2023',
      make: 'BMW',
      year: 2023,
      odometer: 12000,
      location: 'جدة',
      currentBid: 350000,
      bidders: 32,
      timeLeft: '02 يوم : 05 س : 20 د',
      image: 'https://images.unsplash.com/photo-1555215695-3004980adade?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiPXZtdyUyMHg2fGVufDF8fHx8MTc2NjE1ODAzMHww&ixlib=rb-4.1.0&q=80&w=1080',
      isLive: true
    },
    {
      id: 6,
      title: 'لكزس ES 2023',
      make: 'Lexus',
      year: 2023,
      odometer: 9000,
      location: 'المدينة',
      currentBid: 195000,
      bidders: 18,
      timeLeft: '01 يوم : 10 س : 45 د',
      image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZXh1cyUyMGNhcnxlbnwxfHx8fDE3NjYxNTgwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      isLive: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-36 pb-20">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">مزادات جارية الآن (زايد الآن)</h1>
            <p className="text-gray-500">اغتنم الفرصة وشارك في المزادات المباشرة الأكثر طلباً</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="بحث في المزادات..." 
                className="ps-10 pe-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#47CCD0] w-64 shadow-sm text-sm"
              />
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
            
            <Button variant="outline" className="gap-2 h-11 bg-white border-gray-200 hover:border-[#47CCD0] hover:text-[#47CCD0]">
              <Filter size={18} /> تصفية
            </Button>
          </div>
        </div>
      </div>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {auctions.map((auction) => (
            <div 
              key={auction.id} 
              onClick={() => onNavigate?.('auction-details')}
              className="bg-white rounded-[20px] border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col cursor-pointer"
            >
              {/* Image Header */}
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                <img 
                  src={auction.image} 
                  alt={auction.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Live Badge */}
                <div className="absolute top-3 end-3">
                  <span className="bg-[#FF3B30] text-white text-xs font-bold px-3 py-1 rounded-md shadow-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                    مباشر
                  </span>
                </div>

                {/* Favorite Button */}
                <button 
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-3 start-3 w-8 h-8 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#FF3B30] transition-colors"
                >
                  <Heart size={16} />
                </button>
              </div>

              {/* Content Body */}
              <div className="p-4 flex-1 flex flex-col">
                
                {/* Title */}
                <div className="mb-4">
                  <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1 group-hover:text-[#47CCD0] transition-colors">
                    {auction.title}
                  </h3>
                  <p className="text-gray-500 text-sm font-medium">
                    {auction.year} • {auction.make}
                  </p>
                </div>

                {/* Specs Row */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 border-b border-gray-50 pb-4">
                  <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                    <MapPin size={14} className="text-[#47CCD0]" />
                    <span>{auction.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                    <Gauge size={14} className="text-[#47CCD0]" />
                    <span dir="ltr">{auction.odometer.toLocaleString()} كم</span>
                  </div>
                </div>

                {/* Timer & Bidders */}
                <div className="flex items-center justify-between mb-4 bg-[#F8F9FA] rounded-lg p-2.5">
                   <div className="flex items-center gap-1.5 text-[#47CCD0] text-xs font-bold">
                     <Clock size={14} />
                     <span dir="ltr">{auction.timeLeft}</span>
                   </div>
                   <div className="text-xs text-gray-400">
                     {auction.bidders} مزايد
                   </div>
                </div>

                {/* Price Section */}
                <div className="mt-auto">
                   <p className="text-[10px] text-gray-400 mb-0.5 line-through flex items-center gap-1">الافتتاحي: {(auction.currentBid * 0.8).toLocaleString()} <RiyalSymbol className="w-2.5 h-2.5 text-gray-400" /></p>
                   <p className="text-xs text-gray-500 mb-1 font-bold">
                     السعر الحالي <span className="text-[9px] bg-gray-100 px-1 rounded ms-1 font-normal">شامل الضريبة</span>
                   </p>
                   <div className="flex items-center justify-between items-end mb-4 mt-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-2xl font-black text-gray-900 tracking-tight font-mono" dir="ltr">
                          {auction.currentBid.toLocaleString()}
                        </span>
                        <RiyalSymbol className="w-4 h-4 text-gray-600" />
                      </div>
                   </div>

                   {/* Action Button */}
                   <Button 
                     className="w-full bg-[#1A1A1A] hover:bg-[#47CCD0] text-white font-bold h-11 rounded-xl shadow-lg hover:shadow-teal-500/20 transition-all"
                     onClick={(e) => { 
                       e.stopPropagation(); 
                       import('../utils/logger').then(({ logger }) => {
                         logger.info('User navigated to live auction', { auctionId: auction.id }, 'BidNowPage');
                       });
                       onNavigate?.('live-car-auction'); 
                     }}
                   >
                     زايد الآن
                   </Button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
