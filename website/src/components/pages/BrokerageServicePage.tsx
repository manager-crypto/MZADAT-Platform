import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, CheckCircle2, ChevronRight, ChevronLeft, MapPin, Users, HeartHandshake } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useTranslation } from 'react-i18next';

interface BrokerageServicePageProps {
  onNavigate?: (path: string) => void;
}

export const BrokerageServicePage: React.FC<BrokerageServicePageProps> = ({ onNavigate }) => {
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
          <button onClick={handleBack} className="hover:text-[#47CCD0] transition-colors">{t('brokerageService.home', 'الرئيسية')}</button>
          <span>/</span>
          <span className="text-gray-900 font-medium">{t('brokerageService.services', 'الخدمات')}</span>
          <span>/</span>
          <span className="text-gray-900 font-medium">{t('brokerageService.brokerage', 'الوساطة العقارية')}</span>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
              <div className="absolute top-0 end-0 w-64 h-64 bg-[#47CCD0]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="w-16 h-16 bg-[#F8FAFB] rounded-2xl flex items-center justify-center mb-6 text-[#47CCD0]">
                <Building size={32} />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2B3D50] mb-6 leading-tight">
                {t('brokerageService.brokerage', 'الوساطة العقارية')}
              </h1>
              <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                {t('brokerageService.heroDesc', 'حلول تسويقية مبتكرة للربط بين البائع والمشتري، مع ضمان تجربة عقارية سلسة وموثوقة لجميع الأطراف.')}
              </p>
              
              <div className="flex flex-col gap-8 w-full max-w-sm">
                {/* سكني Section */}
                <div>
                  <h3 className="text-xl font-bold text-[#2B3D50] mb-4">{t('brokerageService.residential', 'سكني')}</h3>
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => onNavigate ? onNavigate('real-estate-for-sale') : navigate('/real-estate-for-sale')}
                      className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 rounded-2xl border border-gray-100 shadow-sm transition-all group w-full text-end"
                    >
                      <div>
                        <div className="font-bold text-[#47CCD0] text-lg mb-1">{t('brokerageService.forSale', 'للبيع')}</div>
                        <div className="text-sm text-[#47CCD0]/80">{t('brokerageService.saleOffers', 'عروض البيع في منطقتك')}</div>
                      </div>
                      <ChevronLeft className="text-[#47CCD0] group-hover:-translate-x-1 transition-transform" size={24} />
                    </button>

                    <button 
                      onClick={() => onNavigate ? onNavigate('real-estate-for-rent') : navigate('/real-estate-for-rent')}
                      className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 rounded-2xl border border-gray-100 shadow-sm transition-all group w-full text-end"
                    >
                      <div>
                        <div className="font-bold text-[#2B3D50] text-lg mb-1">{t('brokerageService.forRent', 'للايجار')}</div>
                        <div className="text-sm text-gray-400">{t('brokerageService.rentOffers', 'عروض الايجار في منطقتك')}</div>
                      </div>
                      <ChevronLeft className="text-gray-400 group-hover:-translate-x-1 transition-transform" size={24} />
                    </button>

                    <button 
                      onClick={() => onNavigate ? onNavigate('daily-rent') : navigate('/daily-rent')}
                      className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 rounded-2xl border border-gray-100 shadow-sm transition-all group w-full text-end"
                    >
                      <div>
                        <div className="font-bold text-[#2B3D50] text-lg mb-1">{t('brokerageService.dailyRent', 'إيجار يومي')}</div>
                        <div className="text-sm text-gray-400">{t('brokerageService.dailyRentOffers', 'شاليهات، استراحات، مخيمات')}</div>
                      </div>
                      <ChevronLeft className="text-gray-400 group-hover:-translate-x-1 transition-transform" size={24} />
                    </button>
                  </div>
                </div>

                {/* تجاري Section */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-bold text-[#2B3D50]">{t('brokerageService.commercial', 'تجاري')}</h3>
                    <span className="bg-[#00B14F] text-white text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wider">{t('brokerageService.new', 'جديد')}</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => onNavigate ? onNavigate('commercial-sale') : navigate('/commercial-sale')}
                      className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 rounded-2xl border border-gray-100 shadow-sm transition-all group w-full text-end"
                    >
                      <div>
                        <div className="font-bold text-[#2B3D50] text-lg mb-1">{t('brokerageService.forSale', 'للبيع')}</div>
                        <div className="text-sm text-gray-400">{t('brokerageService.saleOffers', 'عروض البيع في منطقتك')}</div>
                      </div>
                      <ChevronLeft className="text-gray-400 group-hover:-translate-x-1 transition-transform" size={24} />
                    </button>

                    <button 
                      onClick={() => onNavigate ? onNavigate('commercial-rent') : navigate('/commercial-rent')}
                      className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 rounded-2xl border border-gray-100 shadow-sm transition-all group w-full text-end"
                    >
                      <div>
                        <div className="font-bold text-[#2B3D50] text-lg mb-1">{t('brokerageService.forRent', 'للايجار')}</div>
                        <div className="text-sm text-gray-400">{t('brokerageService.rentOffers', 'عروض الايجار في منطقتك')}</div>
                      </div>
                      <ChevronLeft className="text-gray-400 group-hover:-translate-x-1 transition-transform" size={24} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-64 sm:h-80 lg:h-auto relative">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1687075430355-ed8df51c1670?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGtleSUyMGhhbmRvdmVyfGVufDF8fHx8MTc3MzYwOTY0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                alt={t('brokerageService.brokerageAlt', 'الوساطة العقارية - تسليم مفتاح')} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#2B3D50] mb-8 text-center">{t('brokerageService.featuresTitle', 'مميزات الوساطة العقارية لدينا')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#47CCD0]/10 rounded-xl flex items-center justify-center text-[#47CCD0] mb-6">
                <HeartHandshake size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#2B3D50] mb-3">{t('brokerageService.feature1Title', 'ربط دقيق')}</h3>
              <p className="text-gray-500">{t('brokerageService.feature1Desc', 'نربط البائع والمشتري بناءً على احتياجاتهم بدقة متناهية لتحقيق صفقات ناجحة ومربحة للطرفين.')}</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#47CCD0]/10 rounded-xl flex items-center justify-center text-[#47CCD0] mb-6">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#2B3D50] mb-3">{t('brokerageService.feature2Title', 'تغطية شاملة')}</h3>
              <p className="text-gray-500">{t('brokerageService.feature2Desc', 'نوفر خيارات عقارية واسعة تشمل السكني والتجاري في أبرز المدن والأحياء الحيوية.')}</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#47CCD0]/10 rounded-xl flex items-center justify-center text-[#47CCD0] mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#2B3D50] mb-3">{t('brokerageService.feature3Title', 'فريق استشاري')}</h3>
              <p className="text-gray-500">{t('brokerageService.feature3Desc', 'نضع خبرات فريقنا الاستشاري بين يديك لتوجيهك نحو الاستثمار العقاري الأمثل.')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
