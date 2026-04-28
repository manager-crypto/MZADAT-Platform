import React, { useEffect } from 'react';
import {
 ArrowRight,
 MapPin,
 CheckCircle2,
 Share2,
 Heart,
 Phone,
 MessageSquare,
 Building2,
 Maximize,
 FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '../ui/BackButton';
import { RiyalSymbol } from '../ui/RiyalSymbol';
import { useTranslation } from 'react-i18next';

interface PlanDetailsPageProps {
 onNavigate: (page: string) => void;
}

export const PlanDetailsPage: React.FC<PlanDetailsPageProps> = ({ onNavigate }) => {
 const { t } = useTranslation();
 const navigate = useNavigate();

 useEffect(() => {
 window.scrollTo(0, 0);
 }, []);

 const features = [
 t('planDetails.feature1'),
 t('planDetails.feature2'),
 t('planDetails.feature3'),
 t('planDetails.feature4'),
 t('planDetails.feature5'),
 t('planDetails.feature6'),
 t('planDetails.feature7'),
 t('planDetails.feature8'),
 ];

 const handleBack = () => {
 navigate('/plans');
 };

 return (
 <div className="min-h-screen bg-[#F8FAFB] pt-36 pb-20 font-sans">
 <div className="container mx-auto px-4 max-w-7xl">
 {/* Breadcrumb / Back button */}
 <div className="mb-6 flex items-center">
 <BackButton onClick={handleBack} label={t('planDetails.backLabel')} className="bg-white shadow-sm" />
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
 {/* Main Content (Right Side) */}
 <div className="lg:col-span-2 space-y-8">
 {/* Image Gallery */}
 <div className="bg-white p-4 rounded-3xl shadow-sm">
 <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-4">
 <img
 src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200"
 alt={t('planDetails.planAlt')}
 className="w-full h-full object-cover"
 />
 <div className="absolute top-4 end-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold text-[#2B3D50] flex items-center gap-2 shadow-sm">
 <CheckCircle2 size={16} className="text-[#47CCD0]" />
 {t('planDetails.licensedByWafi')}
 </div>
 <div className="absolute top-4 start-4 flex gap-2">
 <button className="p-2.5 bg-white/90 backdrop-blur-md text-gray-700 hover:text-[#CD5C5C] rounded-full shadow-sm transition-colors">
 <Heart size={20} />
 </button>
 <button className="p-2.5 bg-white/90 backdrop-blur-md text-gray-700 hover:text-[#47CCD0] rounded-full shadow-sm transition-colors">
 <Share2 size={20} />
 </button>
 </div>
 <div className="absolute bottom-4 start-4 bg-[#22C55E] text-white px-4 py-2 rounded-full text-sm font-bold shadow-md">
 {t('planDetails.availableForSale')}
 </div>
 </div>
 </div>

 {/* Title & Description */}
 <div className="bg-white p-8 rounded-3xl shadow-sm">
 <div className="flex justify-between items-start mb-4">
 <div>
 <h1 className="text-3xl font-black text-[#2B3D50] mb-2">{t('planDetails.planName')}</h1>
 <div className="flex items-center gap-2 text-gray-500">
 <MapPin size={18} className="text-[#47CCD0]" />
 <span>{t('planDetails.location')}</span>
 </div>
 </div>
 </div>

 <div className="border-t border-gray-100 my-6"></div>

 <h2 className="text-xl font-bold text-[#2B3D50] mb-4">{t('planDetails.descTitle')}</h2>
 <p className="text-gray-600 leading-relaxed mb-6">
 {t('planDetails.descBody')}
 </p>

 <h2 className="text-xl font-bold text-[#2B3D50] mb-4">{t('planDetails.featuresTitle')}</h2>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 {features.map((feature, idx) => (
 <div key={idx} className="flex items-center gap-2 bg-[#F8FAFB] p-3 rounded-xl border border-gray-100">
 <CheckCircle2 size={18} className="text-[#47CCD0]" />
 <span className="text-sm font-medium text-[#2B3D50]">{feature}</span>
 </div>
 ))}
 </div>
 </div>

 {/* Map Section */}
 <div className="bg-white p-8 rounded-3xl shadow-sm">
 <h2 className="text-xl font-bold text-[#2B3D50] mb-4">{t('planDetails.mapTitle')}</h2>
 <div className="h-[400px] rounded-2xl overflow-hidden bg-gray-200 border border-gray-100 relative">
 <iframe
 src="https://www.openstreetmap.org/export/embed.html?bbox=43.95%2C26.30%2C44.05%2C26.40&layer=mapnik"
 className="w-full h-full border-0"
 title={t('planDetails.mapTitle')}
 ></iframe>
 </div>
 </div>
 </div>

 {/* Sidebar (Left Side) */}
 <div className="space-y-6">
 {/* Pricing & Info Card */}
 <div className="bg-white p-8 rounded-3xl shadow-sm sticky top-36">
 <h3 className="text-lg font-bold text-[#2B3D50] mb-6">{t('planDetails.sidebarTitle')}</h3>

 <div className="space-y-4 mb-8">
 <div className="flex justify-between items-center p-4 bg-[#F8FAFB] rounded-xl border border-gray-100">
 <div className="flex items-center gap-3 text-gray-600">
 <div className="p-2 bg-white rounded-lg shadow-sm text-[#47CCD0]">
 <FileText size={20} />
 </div>
 <span className="font-medium">{t('planDetails.pricesFrom')}</span>
 </div>
 <div className="font-black text-lg text-[#2B3D50] font-mono flex items-center gap-1.5">450,000 <RiyalSymbol className="w-4 h-4 text-gray-500" /></div>
 </div>

 <div className="flex justify-between items-center p-4 bg-[#F8FAFB] rounded-xl border border-gray-100">
 <div className="flex items-center gap-3 text-gray-600">
 <div className="p-2 bg-white rounded-lg shadow-sm text-[#47CCD0]">
 <Maximize size={20} />
 </div>
 <span className="font-medium">{t('planDetails.areasFrom')}</span>
 </div>
 <div className="font-black text-lg text-[#2B3D50]">500 - 900 <span className="text-sm font-normal text-gray-500">{t('planDetails.sqm')}</span></div>
 </div>

 <div className="flex justify-between items-center p-4 bg-[#F8FAFB] rounded-xl border border-gray-100">
 <div className="flex items-center gap-3 text-gray-600">
 <div className="p-2 bg-white rounded-lg shadow-sm text-[#47CCD0]">
 <Building2 size={20} />
 </div>
 <span className="font-medium">{t('planDetails.plotCount')}</span>
 </div>
 <div className="font-black text-lg text-[#2B3D50]">120 <span className="text-sm font-normal text-gray-500">{t('planDetails.plotUnit')}</span></div>
 </div>
 </div>

 <div className="space-y-3">
 <button className="w-full bg-[#47CCD0] text-white py-4 rounded-xl font-bold shadow-lg hover:-translate-y-1 transition-all">
 {t('planDetails.bookNow')}
 </button>
 <button className="w-full bg-white text-[#2B3D50] border-2 border-[#2B3D50] py-4 rounded-xl font-bold hover:bg-[#2B3D50] hover:text-white transition-all flex items-center justify-center gap-2">
 <Phone size={18} />
 {t('planDetails.callSales')}
 </button>
 <button className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold shadow-lg hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
 <MessageSquare size={18} />
 {t('planDetails.whatsapp')}
 </button>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
};
