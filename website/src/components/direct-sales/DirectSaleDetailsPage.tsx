import React, { useState } from 'react';
import { 
  MapPin, 
  Share2, 
  Heart, 
  ShieldCheck, 
  Phone, 
  MessageCircle, 
  Flag,
  CheckCircle2,
  Calendar,
  Eye,
  Star,
  Hash,
  Info
} from 'lucide-react';
import { BackButton } from '../ui/BackButton';
import { RiyalSymbol } from '../ui/RiyalSymbol';
import { useTranslation } from 'react-i18next';

interface DirectSaleDetailsPageProps {
  item: any;
  onNavigate: (page: string) => void;
  onBack: () => void;
}

export const DirectSaleDetailsPage: React.FC<DirectSaleDetailsPageProps> = ({ item, onNavigate, onBack }) => {
  const { t } = useTranslation();
  const [showPhone, setShowPhone] = useState(false);
  
  if (!item) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-36">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <BackButton onClick={onBack} label={t('directSales.backToList')} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* Right Column: Images & Details */}
           <div className="lg:col-span-2 space-y-6">
              
              {/* Image Gallery / Plate Visual */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 relative">
                 {item.isPlate ? (
                   <div className="w-full aspect-[16/9] bg-gray-100 flex items-center justify-center p-12">
                      <div className="w-full max-w-lg aspect-[2/1] bg-white rounded-2xl border-8 border-black flex flex-col relative shadow-2xl">
                         <div className="h-1/4 border-b-2 border-black flex justify-between items-center px-6">
                            <span className="text-xl font-bold">KSA</span>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Flag_of_Saudi_Arabia.svg/2560px-Flag_of_Saudi_Arabia.svg.png" className="h-8 opacity-80" alt="KSA" />
                         </div>
                         <div className="flex-1 flex items-center justify-between px-10">
                            <span className="text-6xl font-black tracking-widest">{item.plateNums}</span>
                            <span className="text-6xl font-black tracking-widest">{item.plateChars}</span>
                         </div>
                      </div>
                   </div>
                 ) : (
                   <div className="relative aspect-[16/9]">
                     <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                     <div className="absolute top-4 start-4 bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2">
                        <Eye size={16} /> 1.2k {t('directSales.views')}
                     </div>
                   </div>
                 )}
              </div>

              {/* Title & Price (Mobile/Tablet view mostly, but good for header) */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                 <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                       <div className="flex items-center gap-2 mb-2">
                          <span className="bg-[#107055]/10 text-[#107055] px-3 py-1 rounded-full text-xs font-bold border border-[#107055]/20">{t('directSales.directSaleBadge')}</span>
                          <span className="text-gray-400 text-sm">{item.postedAt}</span>
                       </div>
                       <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">{item.title}</h1>
                       <div className="flex items-center gap-2 text-gray-500">
                          <MapPin size={18} className="text-[#47CCD0]" />
                          {item.location}
                       </div>
                    </div>
                    <div className="text-start">
                       <p className="text-sm text-gray-400 mb-1">{t('directSales.askingPrice')}</p>
                       <p className="text-3xl font-black text-[#47CCD0] font-mono tracking-tight flex items-center justify-end gap-1.5">{item.price.toLocaleString()} <RiyalSymbol className="w-6 h-6 text-gray-500" /></p>
                    </div>
                 </div>

                 <div className="h-px bg-gray-100 my-6"></div>

                 <h3 className="font-bold text-lg mb-4">{t('directSales.offerDetails')}</h3>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {item.specs?.map((spec: string, idx: number) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
                         <span className="font-bold text-gray-700 block">{spec}</span>
                      </div>
                    ))}
                 </div>
                 
                 <h3 className="font-bold text-lg mb-2">{t('directSales.description')}</h3>
                 <p className="text-gray-600 leading-relaxed">
                   {t('directSales.descriptionText')}
                 </p>
              </div>

           </div>

           {/* Left Column: Seller & Action */}
           <div className="space-y-6">
              
              {/* Seller Card */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden">
                       <img src={`https://ui-avatars.com/api/?name=${item.seller.name}&background=random`} alt="Seller" className="w-full h-full object-cover" />
                    </div>
                    <div>
                       <h3 className="font-bold text-gray-900 flex items-center gap-1">
                          {item.seller.name}
                          {item.seller.verified && (
                            <span title={t('directSales.verifiedSeller', 'بائع موثوق')}>
                              <ShieldCheck size={16} className="text-blue-500" />
                            </span>
                          )}
                       </h3>
                       <div className="flex items-center gap-1 text-orange-400 text-sm">
                          <Star size={14} fill="currentColor" />
                          <span className="font-bold text-gray-700">{item.seller.rating}</span>
                          <span className="text-gray-400">({t('directSales.reviewsCount', '45 تقييم')})</span>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-3">
                    <button 
                       onClick={() => setShowPhone(!showPhone)}
                       className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${showPhone ? 'bg-gray-900 text-white' : 'bg-[#47CCD0] text-white hover:bg-[#35a4a9] shadow-lg shadow-teal-500/20'}`}
                    >
                       <Phone size={20} />
                       {showPhone ? '055 123 4567' : t('directSales.showSellerNumber', 'إظهار رقم البائع')}
                    </button>
                    
                    <button className="w-full py-3.5 bg-green-50 text-green-600 border border-green-200 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-100 transition-all">
                       <MessageCircle size={20} />
                       {t('directSales.whatsappChat', 'محادثة واتساب')}
                    </button>
                 </div>
              </div>

              {/* Safety Tips Card */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-4 text-gray-900 font-bold">
                  <ShieldCheck className="text-[#107055]" size={20} />
                  <h3>{t('directSales.safetyTips', 'نصائح للتعامل الآمن')}</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex gap-2 text-sm text-gray-600">
                    <CheckCircle2 size={16} className="text-[#47CCD0] shrink-0 mt-0.5" />
                    <span>{t('directSales.tip1', 'لا تقم بتحويل أي أموال قبل معاينة السلعة واستلامها.')}</span>
                  </li>
                  <li className="flex gap-2 text-sm text-gray-600">
                    <CheckCircle2 size={16} className="text-[#47CCD0] shrink-0 mt-0.5" />
                    <span>{t('directSales.tip2', 'تأكد من فحص السلعة أو العقار بشكل شخصي.')}</span>
                  </li>
                  <li className="flex gap-2 text-sm text-gray-600">
                    <CheckCircle2 size={16} className="text-[#47CCD0] shrink-0 mt-0.5" />
                    <span>{t('directSales.tip3', 'ينصح بتوثيق المبايعة عبر العقود الرسمية.')}</span>
                  </li>
                </ul>
              </div>

              {/* Ad Info Card */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                   <span className="font-bold text-gray-900">{t('directSales.adInfo', 'معلومات الإعلان')}</span>
                   <Info size={18} className="text-gray-400" />
                </div>
                <div className="space-y-4">
                   <div className="flex items-center justify-between py-2 border-b border-gray-50">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                         <Hash size={16} />
                         <span>{t('directSales.adNumber', 'رقم الإعلان')}</span>
                      </div>
                      <span className="font-mono font-bold text-gray-900">#{item.id.replace(/\D/g, '') || '859201'}</span>
                   </div>
                   <div className="flex items-center justify-between py-2 border-b border-gray-50">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                         <Calendar size={16} />
                         <span>{t('directSales.publishDate', 'تاريخ النشر')}</span>
                      </div>
                      <span className="font-bold text-gray-900">{item.postedAt}</span>
                   </div>
                </div>
                <div className="mt-4 pt-2">
                   <button className="w-full py-2 bg-red-50 text-red-600 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors">
                      <Flag size={16} /> {t('directSales.reportIssue', 'إبلاغ عن مشكلة')}
                   </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex justify-around">
                 <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-red-500 transition-colors">
                    <Heart size={20} />
                    <span className="text-xs font-medium">{t('directSales.favorite', 'مفضلة')}</span>
                 </button>
                 <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
                    <Share2 size={20} />
                    <span className="text-xs font-medium">{t('directSales.share', 'مشاركة')}</span>
                 </button>
              </div>

           </div>

        </div>
      </div>
    </div>
  );
};
