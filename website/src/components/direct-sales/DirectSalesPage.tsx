import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Car, 
  LayoutGrid, 
  Package, 
  Filter, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronLeft
} from 'lucide-react';
import { RiyalSymbol } from '../ui/RiyalSymbol';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { CarFilters } from './CarFilters';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { useTranslation } from 'react-i18next';

interface DirectSalesPageProps {
  category: 'real-estate' | 'cars' | 'plates' | 'other';
  onNavigate: (page: string) => void;
  onItemClick: (item: any) => void;
}

export const DirectSalesPage: React.FC<DirectSalesPageProps> = ({ category, onNavigate, onItemClick }) => {
  const { t } = useTranslation();
  const [selectedCity, setSelectedCity] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  // Mock Data
  const getCategoryTitle = () => {
    switch(category) {
      case 'real-estate': return t('directSales.realEstateTitle');
      case 'cars': return t('directSales.carsTitle');
      case 'plates': return t('directSales.platesTitle');
      default: return t('directSales.otherTitle');
    }
  };

  const getCategorySubtitle = () => {
    switch(category) {
      case 'real-estate': return t('directSales.realEstateSubtitle');
      case 'cars': return t('directSales.carsSubtitle');
      case 'plates': return t('directSales.platesSubtitle');
      default: return t('directSales.otherSubtitle');
    }
  };

  // Mock Items Generator
  const generateItems = () => {
    const items = [];
    const count = 12;
    
    const realEstateImages = [
      "https://images.unsplash.com/photo-1575356864509-f1727fd74ee4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB2aWxsYSUyMGV4dGVyaW9yJTIwc2F1ZGl8ZW58MXx8fHwxNzY2MjU4OTUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1638454668466-e8dbd5462f20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjYyNTYxNjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1600596542815-60c37c6525fa?q=80&w=2076&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
    ];

    const carImages = [
      "https://images.unsplash.com/photo-1650530579355-7ad9d4766043?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3lvdGElMjBsYW5kJTIwY3J1aXNlcnxlbnwxfHx8fDE3NjYyNTg5NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1680446983373-853872fb667a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXJjZWRlcyUyMGJlbnolMjBzJTIwY2xhc3N8ZW58MXx8fHwxNzY2MjU4OTUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop"
    ];

    const otherImages = [
      "https://images.unsplash.com/photo-1695822958645-b2b058159215?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpUGhvbmUlMjAxNSUyMFBybyUyME1heCUyMFRpdGFuaXVtfGVufDF8fHx8MTc2NjI4OTIyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1724859234679-964acf07b126?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYWNCb29rJTIwUHJvJTIwTTN8ZW58MXx8fHwxNzY2Mjg5MjIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1713557670055-7df8d5502a51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYWNCb29rJTIwUHJvJTIwTTMlMjBTaWx2ZXJ8ZW58MXx8fHwxNzY2Mjg5MjM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ];
    
    for (let i = 1; i <= count; i++) {
      if (category === 'real-estate') {
        items.push({
          id: `re-${i}`,
          title: i % 2 === 0 ? t('directSales.mockVilla') : t('directSales.mockApt'),
          price: 1500000 + (i * 100000),
          image: realEstateImages[i % realEstateImages.length],
          location: t('directSales.riyadh'),
          specs: [t('directSales.mockSpec1'), t('directSales.mockSpec2'), t('directSales.mockSpec3')],
          seller: { name: t('directSales.mockSeller1'), rating: 4.8, verified: true },
          postedAt: t('directSales.mockPosted1')
        });
      } else if (category === 'cars') {
        items.push({
          id: `car-${i}`,
          title: i % 2 === 0 ? t('directSales.mockCar1') : t('directSales.mockCar2'),
          price: 250000 + (i * 50000),
          image: carImages[i % carImages.length],
          location: t('directSales.jeddah'),
          specs: ['2023', t('directSales.mockSpec4'), t('directSales.mockSpec5')],
          seller: { name: t('directSales.mockSeller2'), rating: 4.9, verified: true },
          postedAt: t('directSales.mockPosted2')
        });
      } else if (category === 'plates') {
        items.push({
          id: `plate-${i}`,
          title: t('directSales.mockPlate') + ` (أ أ أ ${i}${i}${i})`,
          price: 5000 + (i * 2000),
          isPlate: true,
          plateChars: 'أ أ أ',
          plateNums: `${i}${i}${i}`,
          plateType: i % 2 === 0 ? 'private' : 'transport',
          location: t('directSales.riyadh'),
          seller: { name: t('directSales.mockSeller3'), rating: 4.5, verified: false },
          postedAt: t('directSales.mockPosted3')
        });
      } else {
        items.push({
          id: `other-${i}`,
          title: i % 3 === 0 ? 'iPhone 15 Pro Max' : 'MacBook Pro M3 Max',
          price: i % 3 === 0 ? 5500 : 12000,
          image: otherImages[i % otherImages.length],
          location: t('directSales.dammam'),
          specs: [t('directSales.mockSpec6'), t('directSales.mockSpec7'), '1TB'],
          seller: { name: t('directSales.mockSeller4'), rating: 4.2, verified: true },
          postedAt: t('directSales.mockPosted4')
        });
      }
    }
    return items;
  };

  const items = generateItems();

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-36">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <button onClick={() => onNavigate('home')} className="hover:text-[#47CCD0]">{t('directSales.home')}</button>
          <ChevronLeft size={14} />
          <span className="text-gray-900 font-bold">{t('directSales.directSaleBreadcrumb')}</span>
          <ChevronLeft size={14} />
          <span className="text-[#47CCD0] font-bold">{getCategoryTitle()}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-2">{getCategoryTitle()}</h1>
            <p className="text-gray-500">{getCategorySubtitle()}</p>
          </div>
          
          <div className="flex items-center gap-3">
             {category === 'cars' ? (
                <Sheet>
                  <SheetTrigger className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:border-[#47CCD0] transition-all lg:hidden">
                     <Filter size={16} />
                     {t('directSales.filterResults')}
                  </SheetTrigger>
                  <SheetContent side="right" className="overflow-y-auto w-full sm:max-w-md pt-12">
                     <CarFilters />
                  </SheetContent>
                </Sheet>
             ) : (
               <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:border-[#47CCD0] transition-all">
                  <Filter size={16} />
                  {t('directSales.filterResults')}
               </button>
             )}

             <div className="relative hidden md:block">
                <Search className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder={t('directSales.searchPlaceholder')}
                  className="ps-4 pe-10 py-2 w-64 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#47CCD0]"
                />
             </div>
          </div>
        </div>

        {/* Categories Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
           <button 
             onClick={() => onNavigate('direct-sale-cars')}
             className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${category === 'cars' ? 'bg-[#47CCD0] text-white shadow-lg shadow-teal-500/20' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
           >
             <Car size={18} /> {t('directSales.cars')}
           </button>
           <button 
             onClick={() => onNavigate('direct-sale-plates')}
             className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${category === 'plates' ? 'bg-[#47CCD0] text-white shadow-lg shadow-teal-500/20' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
           >
             <LayoutGrid size={18} /> {t('directSales.plates')}
           </button>
           <button 
             onClick={() => onNavigate('direct-sale-other')}
             className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${category === 'other' ? 'bg-[#47CCD0] text-white shadow-lg shadow-teal-500/20' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
           >
             <Package size={18} /> {t('directSales.others')}
           </button>
        </div>

        {/* Main Layout: Sidebar + Grid */}
        <div className="flex gap-8 items-start">
           
           {/* Desktop Sidebar Filter (Only for Cars) */}
           {category === 'cars' && (
              <aside className="hidden lg:block w-72 shrink-0">
                 <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                   <CarFilters />
                 </div>
              </aside>
           )}

           {/* Results Grid */}
           <div className="flex-1">
              <div className={`grid grid-cols-1 md:grid-cols-2 ${category === 'cars' ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-6`}>
                 {items.map((item) => (
                   <div 
                     key={item.id} 
                     onClick={() => onItemClick(item)}
                     className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                   >
                      {/* Image / Plate Visual */}
                      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                         {item.isPlate ? (
                           <div className="w-full h-full flex items-center justify-center p-4 bg-gray-200">
                              <div className="w-full aspect-[2/1] bg-white rounded-lg border-4 border-black flex flex-col relative shadow-sm">
                                 <div className="h-1/4 border-b border-black flex justify-between items-center px-2">
                                    <span className="text-[10px] font-bold">KSA</span>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Flag_of_Saudi_Arabia.svg/2560px-Flag_of_Saudi_Arabia.svg.png" className="h-3 opacity-80" alt="KSA" />
                                 </div>
                                 <div className="flex-1 flex items-center justify-between px-4">
                                    <span className="text-xl font-black tracking-widest">{item.plateNums}</span>
                                    <span className="text-xl font-black tracking-widest">{item.plateChars}</span>
                                 </div>
                              </div>
                           </div>
                         ) : (
                           <ImageWithFallback src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                         )}
                         <div className="absolute top-3 end-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm">
                            {item.seller.name}
                         </div>
                         <div className="absolute bottom-3 start-3 bg-[#107055] text-white text-xs font-bold px-3 py-1 rounded-lg shadow-sm flex items-center gap-1">
                            <CheckCircle2 size={12} /> {t('directSales.directSaleCardBadge')}
                         </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                         <div className="flex items-start justify-between mb-2">
                            <h3 className="font-bold text-gray-900 line-clamp-1 group-hover:text-[#47CCD0] transition-colors">{item.title}</h3>
                            {item.seller.verified && <ShieldCheck size={16} className="text-[#47CCD0] shrink-0" />}
                         </div>
                         
                         <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                            <MapPin size={12} /> {item.location}
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span>{item.postedAt}</span>
                         </div>

                         {item.specs && (
                            <div className="flex items-center gap-2 mb-4">
                               {item.specs.map((spec: string, idx: number) => (
                                 <span key={idx} className="bg-gray-50 text-gray-600 text-[10px] px-2 py-1 rounded-md border border-gray-100">{spec}</span>
                               ))}
                            </div>
                         )}

                         <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                            <div>
                               <p className="text-xs text-gray-400 mb-0.5">{t('directSales.askingPrice')}</p>
                               <p className="text-xl font-bold text-[#47CCD0] font-mono tracking-tight flex items-center gap-1">{item.price.toLocaleString()} <RiyalSymbol className="w-4 h-4 text-gray-500" /></p>
                            </div>
                            <button className="w-10 h-10 rounded-full bg-teal-50 text-[#47CCD0] flex items-center justify-center group-hover:bg-[#47CCD0] group-hover:text-white transition-colors">
                               <ArrowRight size={18} className="rotate-180" />
                            </button>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};
