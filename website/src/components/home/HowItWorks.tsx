import React from 'react';
import { User, Wallet, Gavel, FileCheck, ScanFace, Fingerprint, CreditCard } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const HowItWorks = () => {
 const { t } = useTranslation();
 return (
 <section className="pt-20 pb-10 bg-white relative overflow-hidden">
 <div className="w-full max-w-[1440px] mx-auto px-4 relative z-10">
 
 {/* Header */}
 <div className="text-center mb-16">
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{t('howItWorks.title')}</h2>
 <p className="text-gray-500 text-lg">{t('howItWorks.subtitle')}</p>
 </div>

 {/* Steps Container */}
 <div className="relative max-w-6xl mx-auto">
 
 {/* Connecting Line (SVG) - Visible on Desktop */}
 <div className="hidden md:block absolute top-1/2 start-0 w-full -translate-y-1/2 -z-10 text-[#47CCD0]">
 <svg width="100%" height="150" viewBox="0 0 1000 150" preserveAspectRatio="none" className="w-full h-full overflow-visible opacity-30">
 <path d="M0,100 Q500,-20 1000,100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" />
 </svg>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
 {/* Step 1: Register */}
 <div className="flex flex-col items-center text-center group">
 <div className="w-24 h-24 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-[#2D9F49] transition-all duration-300 relative z-10">
 <div className="w-12 h-12 bg-green-50 text-[#2D9F49] rounded-xl flex items-center justify-center">
 <div className="flex items-center gap-1">
 <ScanFace size={18} />
 <Fingerprint size={18} />
 </div>
 </div>
 </div>
 <h3 className="text-lg font-bold text-gray-900 mb-2">{t('howItWorks.step1Title')}</h3>
 <p className="text-gray-500 text-sm max-w-[220px]">
 {t('howItWorks.step1Desc')}
 </p>
 </div>

 {/* Step 2: Charge Wallet */}
 <div className="flex flex-col items-center text-center group md:-mt-8">
 <div className="w-24 h-24 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-[#47CCD0] transition-all duration-300 relative z-10">
 <div className="w-12 h-12 bg-teal-50 text-[#47CCD0] rounded-xl flex items-center justify-center">
 <CreditCard size={24} />
 </div>
 </div>
 <h3 className="text-lg font-bold text-gray-900 mb-2">{t('howItWorks.step2Title')}</h3>
 <p className="text-gray-500 text-sm max-w-[220px]">
 {t('howItWorks.step2Desc')}
 </p>
 </div>

 {/* Step 3: Start Bidding */}
 <div className="flex flex-col items-center text-center group md:mt-4">
 <div className="w-24 h-24 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-[#47CCD0] transition-all duration-300 relative z-10">
 <div className="w-12 h-12 bg-teal-50 text-[#47CCD0] rounded-xl flex items-center justify-center">
 <Gavel size={24} />
 </div>
 </div>
 <h3 className="text-lg font-bold text-gray-900 mb-2">{t('howItWorks.step3Title')}</h3>
 <p className="text-gray-500 text-sm max-w-[220px]">
 {t('howItWorks.step3Desc')}
 </p>
 </div>

 {/* Step 4: Receive Minutes */}
 <div className="flex flex-col items-center text-center group md:-mt-4">
 <div className="w-24 h-24 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-[#47CCD0] transition-all duration-300 relative z-10">
 <div className="w-12 h-12 bg-teal-50 text-[#47CCD0] rounded-xl flex items-center justify-center">
 <FileCheck size={24} />
 </div>
 </div>
 <h3 className="text-lg font-bold text-gray-900 mb-2">{t('howItWorks.step4Title')}</h3>
 <p className="text-gray-500 text-sm max-w-[220px]">
 {t('howItWorks.step4Desc')}
 </p>
 </div>
 </div>

 </div>
 </div>
 </section>
 );
};
