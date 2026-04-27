import React, { useState } from 'react';
import { 
  Tag, 
  MapPin,
  Key, 
  ChevronLeft, 
  Filter,
  Search,
  ChevronDown,
  List,
  Map as MapIcon,
  Calendar as CalendarIcon
} from 'lucide-react';
import { BackButton } from '../components/ui/BackButton';
import { Badge } from '../components/ui/badge';
import { cn } from '../components/ui/utils';
import { RentalPropertyCard } from '../components/rentals/RentalPropertyCard';

interface RentalsPageProps {
  onNavigate: (page: string) => void;
}

export const RentalsPage: React.FC<RentalsPageProps> = ({ onNavigate }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  const cities = [
    {
      id: 'riyadh',
      name: 'الرياض',
      image: 'https://images.unsplash.com/photo-1663900108404-a05e8bf82cda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSaXlhZGglMjBjaXR5JTIwc2t5bGluZSUyMG5pZ2h0fGVufDF8fHx8MTc2NjUxNjc1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'jeddah',
      name: 'جدة',
      image: 'https://images.unsplash.com/photo-1674979724572-c0a0579bc9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxKZWRkYWglMjBjaXR5JTIwc2VhJTIwbGFuZG1hcmt8ZW58MXx8fHwxNzY2NTE2NzU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'makkah',
      name: 'مكة',
      image: 'https://images.unsplash.com/photo-1635829577291-8a0dc47606e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYWtrYWglMjBjaXR5JTIwbW91bnRhaW5zfGVufDF8fHx8MTc2NjUxNjc2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'medina',
      name: 'المدينة',
      image: 'https://images.unsplash.com/photo-1638800213251-ec31194b1cd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNZWRpbmElMjBjaXR5JTIwbW9zcXVlfGVufDF8fHx8MTc2NjUxNjc2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  // Mock rental properties
  const rentalProperties = [
    {
      id: 1,
      title: 'شقة فاخرة للإيجار في حي الملقا',
      price: 85000,
      period: 'سنوي',
      address: 'الرياض، حي الملقا',
      specs: { beds: 3, baths: 3, area: 180 },
      type: 'شقة',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1080',
      tags: ['مطبخ راكب', 'تكييف مركزي'],
      agent: {
        name: 'إعمار المستقبل',
        logo: 'https://api.dicebear.com/7.x/initials/svg?seed=EM',
        verified: true
      },
      featured: true,
      time: 'منذ 3 ��اعات'
    },
    {
      id: 2,
      title: 'فيلا مودرن للإيجار حي العارض',
      price: 150000,
      period: 'سنوي',
      address: 'الرياض، حي العارض',
      specs: { beds: 5, baths: 6, area: 450 },
      type: 'فيلا',
      image: 'https://images.unsplash.com/photo-1600596542815-27b88e54e60d?q=80&w=1080',
      tags: ['مسبح', 'جديدة'],
      agent: {
        name: 'نخبة العقار',
        logo: 'https://api.dicebear.com/7.x/initials/svg?seed=NE',
        verified: true
      },
      featured: false,
      time: 'منذ 5 ساعات'
    },
    {
      id: 3,
      title: 'مكتب تجاري للإيجار طريق الملك فهد',
      price: 45000,
      period: 'سنوي',
      address: 'الرياض، العليا',
      specs: { beds: 0, baths: 2, area: 120 },
      type: 'مكتب',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1080',
      tags: ['مؤثث', 'إطلالة'],
      agent: {
        name: 'أصول للاستثمار',
        logo: 'https://api.dicebear.com/7.x/initials/svg?seed=AS',
        verified: true
      },
      featured: true,
      time: 'منذ يوم'
    },
    {
      id: 4,
      title: 'شقة عائلي�� للإيجار الشهري',
      price: 6500,
      period: 'شهري',
      address: 'جدة، حي السلامة',
      specs: { beds: 2, baths: 2, area: 110 },
      type: 'شقة',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1080',
      tags: ['شامل الكهرباء', 'موقف خاص'],
      agent: {
        name: 'مسكن جدة',
        logo: 'https://api.dicebear.com/7.x/initials/svg?seed=MJ',
        verified: false
      },
      featured: false,
      time: 'منذ يومين'
    }
  ];

  return (
    <div className="container mx-auto px-4 animate-fade-up min-h-screen pt-36 pb-12">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Main Content (Left Side in RTL) */}
        <div className="flex-1 order-2 lg:order-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">عروض الإيجار المميزة</h2>
            <button className="text-[#47CCD0] hover:text-[#35a4a9] flex items-center gap-1 text-sm font-medium transition-colors">
              عرض الكل
              <ChevronLeft size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {cities.map((city) => (
              <div 
                key={city.id} 
                className="group relative h-40 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
                onClick={() => onNavigate('city-sale')} 
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
                <img 
                  src={city.image} 
                  alt={city.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-4 end-4 z-20">
                  <h3 className="text-white font-bold text-lg drop-shadow-md">{city.name}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Search & Filters */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
             <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-4">
               <button className="h-11 px-3 flex items-center justify-between bg-white border border-gray-200 rounded-xl hover:border-[#47CCD0] transition-all text-sm text-gray-600 col-span-1">
                 <div className="flex items-center gap-1.5"><span className="text-lg leading-none mt-[-2px]">🇸🇦</span> <span className="font-bold text-gray-800">المملكة العربية السعودية</span></div>
                 <ChevronDown size={16} className="text-gray-400" />
               </button>
               <button className="h-11 px-3 flex items-center justify-between bg-white border border-gray-200 rounded-xl hover:border-[#47CCD0] transition-all text-sm text-gray-600 col-span-1">
                 <span>اختر الحي</span>
                 <ChevronDown size={16} className="text-gray-400" />
               </button>
               <div className="md:col-span-2 relative">
                 <Search className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                 <input 
                   type="text" 
                   placeholder="ابحث بالحي، المدينة..." 
                   className="w-full h-11 pe-10 ps-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] outline-none transition-all text-sm"
                 />
               </div>
               <button className="h-11 px-3 flex items-center justify-between bg-white border border-gray-200 rounded-xl hover:border-[#47CCD0] transition-all text-sm text-gray-600 col-span-1">
                 <span>نوع العقار</span>
                 <ChevronDown size={16} className="text-gray-400" />
               </button>
               <button className="h-11 px-3 flex items-center justify-between bg-white border border-gray-200 rounded-xl hover:border-[#47CCD0] transition-all text-sm text-gray-600 col-span-1">
                 <span className="flex items-center gap-2"><Filter size={16} className="text-gray-400" /> تصفية</span>
               </button>
             </div>
             
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {['سنوي', 'شهري', 'يومي', 'عوائل', 'عزاب'].map((tag, idx) => (
                    <button key={idx} className="flex-shrink-0 px-4 py-1.5 bg-gray-50 hover:bg-teal-50 hover:text-[#47CCD0] border border-gray-100 rounded-full text-xs font-bold transition-all text-gray-600">
                      {tag}
                    </button>
                  ))}
                </div>
                <div className="flex items-center bg-gray-100 p-1 rounded-lg">
                   <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-[#47CCD0]' : 'text-gray-400 hover:text-gray-600'}`}>
                     <List size={18} />
                   </button>
                   <button onClick={() => setViewMode('map')} className={`p-1.5 rounded-md transition-all ${viewMode === 'map' ? 'bg-white shadow-sm text-[#47CCD0]' : 'text-gray-400 hover:text-gray-600'}`}>
                     <MapIcon size={18} />
                   </button>
                </div>
             </div>
          </div>
          
          {/* Listings */}
          {viewMode === 'map' ? (
             <div className="bg-gray-100 rounded-3xl h-[600px] overflow-hidden border border-gray-200 relative mb-8">
               <iframe 
                 width="100%" 
                 height="100%" 
                 frameBorder="0" 
                 scrolling="no" 
                 title="Rentals Map"
                 src="https://maps.google.com/maps?width=100%25&height=600&hl=ar&q=Riyadh%20Real%20Estate&t=&z=12&ie=UTF8&iwloc=B&output=embed"
                 className="w-full h-full grayscale-[20%] hover:grayscale-0 transition-all duration-500"
               ></iframe>
               <div className="absolute top-4 end-4 z-10">
                 <BackButton onClick={() => setViewMode('grid')} label="العودة للقائمة" className="bg-white/90 backdrop-blur-sm shadow-lg border border-gray-100" />
               </div>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
               {rentalProperties.map((property) => (
                 <RentalPropertyCard
                   key={property.id}
                   property={property}
                   onClick={() => onNavigate('property-details')}
                 />
               ))}
            </div>
          )}
        </div>

        {/* Sidebar (Right Side in RTL) */}
        <div className="w-full lg:w-72 flex-shrink-0 order-1 lg:order-2 space-y-8">
          
          {/* Residential Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-end">سكني</h3>
            <div className="space-y-2">
              <button 
                onClick={() => onNavigate('city-sale')} 
                className="w-full flex items-center justify-end gap-3 p-3 rounded-xl hover:bg-gray-50 text-gray-500 hover:text-gray-900 transition-colors group"
              >
                <div className="text-end">
                  <div className="font-bold">للبيع</div>
                  <div className="text-xs text-gray-400 group-hover:text-gray-500">عروض البيع في منطقتك</div>
                </div>
                <Tag className="w-5 h-5" />
              </button>

              <button 
                onClick={() => onNavigate('real-estate-for-rent')}
                className="w-full flex items-center justify-end gap-3 p-3 rounded-xl bg-[#E6F9FA] text-[#47CCD0] relative overflow-hidden cursor-pointer"
              >
                {/* Active Indicator Circle */}
                <div className="absolute -start-6 top-1/2 -translate-y-1/2 w-24 h-24 bg-[#47CCD0]/10 rounded-full blur-xl pointer-events-none"></div>
                
                <div className="text-end z-10">
                  <div className="font-bold">للايجار</div>
                  <div className="text-xs text-[#47CCD0]/70">عروض الايجار في منطقتك</div>
                </div>
                <Key className="w-5 h-5 z-10" />
              </button>

              <button 
                onClick={() => onNavigate('daily-rent')} 
                className="w-full flex items-center justify-end gap-3 p-3 rounded-xl hover:bg-gray-50 text-gray-500 hover:text-gray-900 transition-colors group"
              >
                <div className="text-end">
                  <div className="font-bold">إيجار يومي</div>
                  <div className="text-xs text-gray-400 group-hover:text-gray-500">شاليهات، استراحات، مخيمات</div>
                </div>
                <CalendarIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Commercial Section */}
          <div>
            <div className="flex items-center justify-end gap-2 mb-4">
              <Badge className="bg-green-500 hover:bg-green-600 text-[10px] px-2 h-5">جديد</Badge>
              <h3 className="text-lg font-bold text-gray-900">تجاري</h3>
            </div>
            
            <div className="space-y-2">
              <button 
                onClick={() => onNavigate('commercial-sale')} 
                className="w-full flex items-center justify-end gap-3 p-3 rounded-xl hover:bg-gray-50 text-gray-500 hover:text-gray-900 transition-colors group"
              >
                <div className="text-end">
                  <div className="font-bold">للبيع</div>
                  <div className="text-xs text-gray-400 group-hover:text-gray-500">عروض البيع في منطقتك</div>
                </div>
                <Tag className="w-5 h-5" />
              </button>

              <button 
                onClick={() => onNavigate('commercial-rent')}
                className="w-full flex items-center justify-end gap-3 p-3 rounded-xl hover:bg-gray-50 text-gray-500 hover:text-gray-900 transition-colors group"
              >
                <div className="text-end">
                  <div className="font-bold">للايجار</div>
                  <div className="text-xs text-gray-400 group-hover:text-gray-500">عروض الايجار في منطقتك</div>
                </div>
                <Key className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
