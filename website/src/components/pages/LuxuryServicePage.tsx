import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Diamond, CheckCircle2, ChevronRight, Star, Home, Trophy } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface LuxuryServicePageProps {
 onNavigate?: (path: string) => void;
}

export const LuxuryServicePage: React.FC<LuxuryServicePageProps> = ({ onNavigate }) => {
 const navigate = useNavigate();

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
 <button onClick={handleBack} className="hover:text-[#47CCD0] transition-colors">الرئيسية</button>
 <span>/</span>
 <span className="text-gray-900 font-medium">الخدمات</span>
 <span>/</span>
 <span className="text-gray-900 font-medium">عقارات فاخرة</span>
 </div>

 {/* Hero Section */}
 <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 mb-12">
 <div className="grid grid-cols-1 lg:grid-cols-2">
 <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
 <div className="absolute top-0 end-0 w-64 h-64 bg-[#47CCD0]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
 
 <div className="w-16 h-16 bg-[#F8FAFB] rounded-2xl flex items-center justify-center mb-6 text-[#47CCD0]">
 <Diamond size={32} />
 </div>
 <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2B3D50] mb-6 leading-tight">
 عقارات فاخرة
 </h1>
 <p className="text-lg text-gray-500 mb-8 leading-relaxed">
 روائع معمارية فاخرة بمعايير عالمية تُعيد صياغة مفهوم السكن الفاخر لتلائم نخبة عملائنا وأسلوب حياتهم الاستثنائي.
 </p>
 
 <div className="flex flex-col sm:flex-row gap-4">
 <button 
 onClick={() => onNavigate ? onNavigate('/luxury-real-estate-auctions') : navigate('/luxury-real-estate-auctions')}
 className="bg-[#47CCD0] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#3bbabb] transition-all flex items-center justify-center gap-2 shadow-sm"
 >
 اكتشف المجموعة الحصرية
 <ChevronRight size={20} />
 </button>
 </div>
 </div>
 
 <div className="h-64 sm:h-80 lg:h-auto relative">
 <ImageWithFallback 
 src="https://images.unsplash.com/photo-1760972543743-7cbab1987eed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMG1hbnNpb24lMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzczNjA4NjcwfDA&ixlib=rb-4.1.0&q=80&w=1080" 
 alt="عقارات فاخرة" 
 className="w-full h-full object-cover"
 />
 <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
 </div>
 </div>
 </div>

 {/* Features */}
 <div className="mb-12">
 <h2 className="text-2xl font-bold text-[#2B3D50] mb-8 text-center">لماذا خدماتنا للعقارات الفاخرة؟</h2>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
 <div className="w-12 h-12 bg-[#47CCD0]/10 rounded-xl flex items-center justify-center text-[#47CCD0] mb-6">
 <Star size={24} />
 </div>
 <h3 className="text-xl font-bold text-[#2B3D50] mb-3">تفرد مطلق</h3>
 <p className="text-gray-500">ننتقي لك عقارات حصرية تتميز بتصاميم استثنائية وتشطيبات فائقة الجودة تليق بك.</p>
 </div>
 <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
 <div className="w-12 h-12 bg-[#47CCD0]/10 rounded-xl flex items-center justify-center text-[#47CCD0] mb-6">
 <Home size={24} />
 </div>
 <h3 className="text-xl font-bold text-[#2B3D50] mb-3">مواقع استراتيجية</h3>
 <p className="text-gray-500">عقارات في أرقى أحياء المدن الكبرى توفر لك الخصوصية المطلقة والوصول لأهم المعالم.</p>
 </div>
 <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
 <div className="w-12 h-12 bg-[#47CCD0]/10 rounded-xl flex items-center justify-center text-[#47CCD0] mb-6">
 <Trophy size={24} />
 </div>
 <h3 className="text-xl font-bold text-[#2B3D50] mb-3">خدمة الكونسيرج</h3>
 <p className="text-gray-500">فريق مخصص لخدمة نخبة العملاء طوال رحلة الشراء وبعد البيع لضمان راحتك التامة.</p>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
};