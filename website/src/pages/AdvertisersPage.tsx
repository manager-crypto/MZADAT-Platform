import React from 'react';
import { CheckCircle2, Megaphone, Target, BarChart3, ArrowUpLeft } from 'lucide-react';
import sarCurrency from 'figma:asset/3f649d4624729213a9513bf0153522436e1f6f47.png';
import { RiyalSymbol } from '../components/ui/RiyalSymbol';
import { useTranslation } from 'react-i18next';

export const AdvertisersPage = () => {
 const { t } = useTranslation();

 return (
 <div className="pb-20 min-h-screen bg-white">
 {/* Header */}
 <div className="bg-[#111] text-white pt-44 pb-20 relative overflow-hidden rounded-b-[3rem]">
 <div className="absolute top-0 end-0 w-[600px] h-[600px] bg-[#47CCD0] rounded-full blur-[150px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
 <div className="w-full max-w-[1440px] mx-auto px-4 relative z-10 text-center">
 <h1 className="text-4xl md:text-6xl font-bold mb-6">{t('advertisersPage.title1')} <br/><span className="text-[#47CCD0]">{t('advertisersPage.title2')}</span></h1>
 <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
 {t('advertisersPage.subtitle')}
 </p>
 <button className="bg-[#47CCD0] text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#35a4a9] transition-all shadow-lg shadow-teal-500/20">
 {t('advertisersPage.startCampaign')}
 </button>
 </div>
 </div>

 {/* Features */}
 <div className="w-full max-w-[1440px] mx-auto px-4 py-24">
 <div className="text-center mb-16">
 <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('advertisersPage.whyAdvertise')}</h2>
 <p className="text-gray-500">{t('advertisersPage.whyAdvertiseDesc')}</p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 text-center hover:border-[#47CCD0] transition-colors group">
 <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#47CCD0] shadow-sm group-hover:scale-110 transition-transform">
 <Target size={32} />
 </div>
 <h3 className="text-xl font-bold mb-3">{t('advertisersPage.preciseTargeting')}</h3>
 <p className="text-gray-500 text-sm">{t('advertisersPage.preciseTargetingDesc')}</p>
 </div>

 <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 text-center hover:border-[#47CCD0] transition-colors group">
 <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#47CCD0] shadow-sm group-hover:scale-110 transition-transform">
 <Megaphone size={32} />
 </div>
 <h3 className="text-xl font-bold mb-3">{t('advertisersPage.multipleFormats')}</h3>
 <p className="text-gray-500 text-sm">{t('advertisersPage.multipleFormatsDesc')}</p>
 </div>

 <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 text-center hover:border-[#47CCD0] transition-colors group">
 <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#47CCD0] shadow-sm group-hover:scale-110 transition-transform">
 <BarChart3 size={32} />
 </div>
 <h3 className="text-xl font-bold mb-3">{t('advertisersPage.detailedReports')}</h3>
 <p className="text-gray-500 text-sm">{t('advertisersPage.detailedReportsDesc')}</p>
 </div>
 </div>
 </div>

 {/* Pricing / Packages */}
 <div className="bg-black text-white py-24">
 <div className="w-full max-w-[1440px] mx-auto px-4">
 <div className="text-center mb-16">
 <h2 className="text-3xl font-bold mb-4">{t('advertisersPage.pricingTitle')}</h2>
 </div>
 
 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 {/* Basic */}
 <div className="bg-[#1a1a1a] rounded-3xl p-8 border border-gray-800 hover:border-gray-600 transition-colors">
 <h3 className="text-xl font-bold mb-2">{t('advertisersPage.basicPackage')}</h3>
 <div className="text-3xl font-bold mb-6 flex items-center gap-1">
 500 
 <RiyalSymbol className="w-5 h-5 text-gray-400" />
 <span className="text-sm font-normal text-gray-400 me-1">{t('advertisersPage.perMonth')}</span>
 </div>
 <ul className="space-y-4 mb-8 text-gray-400 text-sm">
 <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#47CCD0]" /> {t('advertisersPage.basicFeature1')}</li>
 <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#47CCD0]" /> {t('advertisersPage.basicFeature2')}</li>
 <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#47CCD0]" /> {t('advertisersPage.basicFeature3')}</li>
 </ul>
 <button className="w-full py-3 bg-white/10 rounded-xl hover:bg-white hover:text-black transition-colors font-bold text-sm">{t('advertisersPage.subscribeNow')}</button>
 </div>

 {/* Pro */}
 <div className="bg-[#47CCD0] rounded-3xl p-8 border border-teal-500 relative transform md:-translate-y-4 shadow-2xl shadow-teal-500/20">
 <span className="absolute top-4 start-4 bg-black/20 px-3 py-1 rounded-full text-xs font-bold">{t('advertisersPage.mostPopular')}</span>
 <h3 className="text-xl font-bold mb-2">{t('advertisersPage.proPackage')}</h3>
 <div className="text-3xl font-bold mb-6 flex items-center gap-1">
 1,200 
 <RiyalSymbol className="w-5 h-5 text-teal-100" />
 <span className="text-sm font-normal text-teal-100 me-1">{t('advertisersPage.perMonth')}</span>
 </div>
 <ul className="space-y-4 mb-8 text-white text-sm">
 <li className="flex items-center gap-2"><CheckCircle2 size={16} /> {t('advertisersPage.proFeature1')}</li>
 <li className="flex items-center gap-2"><CheckCircle2 size={16} /> {t('advertisersPage.proFeature2')}</li>
 <li className="flex items-center gap-2"><CheckCircle2 size={16} /> {t('advertisersPage.proFeature3')}</li>
 <li className="flex items-center gap-2"><CheckCircle2 size={16} /> {t('advertisersPage.proFeature4')}</li>
 </ul>
 <button className="w-full py-3 bg-white text-[#47CCD0] rounded-xl hover:bg-gray-100 transition-colors font-bold text-sm">{t('advertisersPage.subscribeNow')}</button>
 </div>

 {/* Enterprise */}
 <div className="bg-[#1a1a1a] rounded-3xl p-8 border border-gray-800 hover:border-gray-600 transition-colors">
 <h3 className="text-xl font-bold mb-2">{t('advertisersPage.enterprisePackage')}</h3>
 <div className="text-3xl font-bold mb-6">{t('advertisersPage.contactUsPricing')} <span className="text-sm font-normal text-gray-400">{t('advertisersPage.forPricing')}</span></div>
 <ul className="space-y-4 mb-8 text-gray-400 text-sm">
 <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#47CCD0]" /> {t('advertisersPage.enterpriseFeature1')}</li>
 <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#47CCD0]" /> {t('advertisersPage.enterpriseFeature2')}</li>
 <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#47CCD0]" /> {t('advertisersPage.enterpriseFeature3')}</li>
 <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#47CCD0]" /> {t('advertisersPage.enterpriseFeature4')}</li>
 </ul>
 <button className="w-full py-3 bg-white/10 rounded-xl hover:bg-white hover:text-black transition-colors font-bold text-sm">{t('advertisersPage.contactUs')}</button>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
};
