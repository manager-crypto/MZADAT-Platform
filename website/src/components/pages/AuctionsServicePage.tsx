import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Gavel, CheckCircle2, ChevronRight, BarChart3, ShieldCheck, Clock } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useTranslation } from 'react-i18next';

interface AuctionsServicePageProps {
 onNavigate?: (path: string) => void;
}

export const AuctionsServicePage: React.FC<AuctionsServicePageProps> = ({ onNavigate }) => {
 const navigate = useNavigate();
 const { t } = useTranslation();

 const handleBack = () => {
 if (onNavigate) {
 onNavigate('/');
 } else {
 navigate('/');
 }
 };

 return (
 <div className="min-h-screen bg-gray-50 pt-24 pb-20">
 <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
 {/* Breadcrumb */}
 <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
 <button onClick={handleBack} className="hover:text-[#47CCD0] transition-colors">{t('auctionsService.home', 'الرئيسية')}</button>
 <span>/</span>
 <span className="text-gray-900 font-medium">{t('auctionsService.services', 'الخدمات')}</span>
 <span>/</span>
 <span className="text-gray-900 font-medium">{t('auctionsService.publicAuctions', 'المزادات العلنية')}</span>
 </div>

 {/* Hero Section */}
 <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 mb-12">
 <div className="grid grid-cols-1 lg:grid-cols-2">
 <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
 <div className="absolute top-0 end-0 w-64 h-64 bg-[#47CCD0]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
 
 <div className="w-16 h-16 bg-[#F8FAFB] rounded-2xl flex items-center justify-center mb-6 text-[#47CCD0]">
 <Gavel size={32} />
 </div>
 <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2B3D50] mb-6 leading-tight">
 {t('auctionsService.publicAuctions', 'المزادات العلنية')}
 </h1>
 <p className="text-lg text-gray-500 mb-8 leading-relaxed">
 {t('auctionsService.heroDesc', 'إدارة المزادات العقارية بأعلى معايير الشفافية والموثوقية، لضمان أفضل قيمة للبائع والمشتري في بيئة تنافسية عادلة.')}
 </p>
 
 <div className="flex flex-col sm:flex-row gap-4">
 <button 
 onClick={() => onNavigate ? onNavigate('/auctions') : navigate('/auctions')}
 className="bg-[#47CCD0] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#3bbabb] transition-all flex items-center justify-center gap-2 shadow-sm"
 >
 {t('auctionsService.browseCurrentAuctions', 'استعرض المزادات الحالية')}
 <ChevronRight size={20} />
 </button>
 </div>
 </div>
 
 <div className="h-64 sm:h-80 lg:h-auto relative">
 <ImageWithFallback 
 src="https://images.unsplash.com/photo-1698065923333-de2f8d294f9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYXVjdGlvbiUyMGdhdmVsfGVufDF8fHx8MTc3MzYwODY1OHww&ixlib=rb-4.1.0&q=80&w=1080" 
 alt={t('auctionsService.publicAuctions', 'المزادات العلنية')} 
 className="w-full h-full object-cover"
 />
 <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
 </div>
 </div>
 </div>

 {/* Features */}
 <div className="mb-12">
 <h2 className="text-2xl font-bold text-[#2B3D50] mb-8 text-center">{t('auctionsService.whyChoose', 'لماذا تختار خدمة المزادات العلنية؟')}</h2>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
 <div className="w-12 h-12 bg-[#47CCD0]/10 rounded-xl flex items-center justify-center text-[#47CCD0] mb-6">
 <ShieldCheck size={24} />
 </div>
 <h3 className="text-xl font-bold text-[#2B3D50] mb-3">{t('auctionsService.feature1Title', 'شفافية مطلقة')}</h3>
 <p className="text-gray-500">{t('auctionsService.feature1Desc', 'نضمن عملية مزايدة واضحة وشفافة لجميع الأطراف تحت إشراف لجان متخصصة.')}</p>
 </div>
 <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
 <div className="w-12 h-12 bg-[#47CCD0]/10 rounded-xl flex items-center justify-center text-[#47CCD0] mb-6">
 <BarChart3 size={24} />
 </div>
 <h3 className="text-xl font-bold text-[#2B3D50] mb-3">{t('auctionsService.feature2Title', 'أفضل قيمة سوقية')}</h3>
 <p className="text-gray-500">{t('auctionsService.feature2Desc', 'الوصول إلى أكبر شريحة من المستثمرين لضمان تحقيق أعلى عائد مالي ممكن لعقارك.')}</p>
 </div>
 <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
 <div className="w-12 h-12 bg-[#47CCD0]/10 rounded-xl flex items-center justify-center text-[#47CCD0] mb-6">
 <Clock size={24} />
 </div>
 <h3 className="text-xl font-bold text-[#2B3D50] mb-3">{t('auctionsService.feature3Title', 'إجراءات سريعة')}</h3>
 <p className="text-gray-500">{t('auctionsService.feature3Desc', 'تسهيل وتسريع كافة إجراءات نقل الملكية وتوثيق الصفقات بكفاءة عالية.')}</p>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
};
