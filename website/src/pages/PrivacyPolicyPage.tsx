import React from 'react';
import { Shield, Lock, Eye, FileText, Database, Server, Globe2, Building2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface PrivacyPolicyPageProps {
 onNavigate?: (page: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
 const navigate = useNavigate();
 const { t } = useTranslation();

 return (
 <div className="min-h-screen bg-gray-50 pt-[100px] lg:pt-36 pb-16">
 <div className="container mx-auto px-4 max-w-4xl relative">

 {/* Back Button */}
 <button
 onClick={() => navigate(-1)}
 className="absolute top-0 end-4 lg:-end-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-500 shadow-sm border border-gray-100 hover:bg-gray-50 hover:text-gray-900 transition-all z-10 group"
 title={t('privacyPage.backTitle')}
 >
 <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
 </button>

 {/* Header */}
 <div className="text-center mb-12">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="w-20 h-20 bg-teal-50 rounded-2xl flex items-center justify-center text-[#0F766E] mx-auto mb-6 shadow-sm"
 >
 <Shield size={40} />
 </motion.div>
 <motion.h1
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 }}
 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 font-sans"
 >
 {t('privacyPage.title')}
 </motion.h1>
 <motion.p
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2 }}
 className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed"
 >
 {t('privacyPage.subtitle')}
 </motion.p>
 </div>

 {/* Content */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.3 }}
 className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden"
 >
 <div className="p-8 md:p-14 space-y-10">

 {/* Last Updated */}
 <div className="flex items-center gap-3 text-sm text-gray-400 mb-8 border-b border-gray-100 pb-6">
 <span className="w-2 h-2 rounded-full bg-[#0F766E]"></span>
 {t('privacyPage.lastUpdated')}
 </div>

 {/* Section 1: Collection */}
 <section className="space-y-5">
 <div className="flex items-start gap-4">
 <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0 mt-1">
 <Database size={24} />
 </div>
 <div>
 <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('privacyPage.section1Title')}</h2>
 <div className="text-gray-600 leading-8 space-y-3">
 <p>{t('privacyPage.section1Intro')}</p>
 <ul className="list-disc list-inside space-y-2 marker:text-[#0F766E]">
 <li><span className="font-bold text-gray-800">{t('privacyPage.identityDataLabel')}</span> {t('privacyPage.identityDataText')}</li>
 <li><span className="font-bold text-gray-800">{t('privacyPage.contactDataLabel')}</span> {t('privacyPage.contactDataText')}</li>
 <li><span className="font-bold text-gray-800">{t('privacyPage.financialDataLabel')}</span> {t('privacyPage.financialDataText')}</li>
 <li><span className="font-bold text-gray-800">{t('privacyPage.entityDocsLabel')}</span> {t('privacyPage.entityDocsText')}</li>
 </ul>
 </div>
 </div>
 </div>
 </section>

 <div className="h-px bg-gray-100 w-full" />

 {/* Section 2: Sharing */}
 <section className="space-y-5">
 <div className="flex items-start gap-4">
 <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-[#0F766E] shrink-0 mt-1">
 <Building2 size={24} />
 </div>
 <div>
 <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('privacyPage.section2Title')}</h2>
 <div className="text-gray-600 leading-8 space-y-3">
 <p>{t('privacyPage.section2Intro')}</p>
 <ul className="list-disc list-inside space-y-2 marker:text-[#0F766E]">
 <li>{t('privacyPage.sharing1Pre')}<span className="font-bold text-gray-800">{t('privacyPage.sharing1Bold')}</span>{t('privacyPage.sharing1Post')}</li>
 <li>{t('privacyPage.sharing2')}</li>
 <li>{t('privacyPage.sharing3')}</li>
 </ul>
 </div>
 </div>
 </div>
 </section>

 <div className="h-px bg-gray-100 w-full" />

 {/* Section 3: Cross Border (New) */}
 <section className="space-y-5">
 <div className="flex items-start gap-4">
 <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0 mt-1">
 <Globe2 size={24} />
 </div>
 <div>
 <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('privacyPage.section3Title')}</h2>
 <div className="text-gray-600 leading-8 space-y-3">
 <p>
 {t('privacyPage.section3Intro')}
 </p>
 <ul className="list-disc list-inside space-y-2 marker:text-[#0F766E]">
 <li>
 <span className="font-bold text-gray-800">{t('privacyPage.gccLabel')}</span> {t('privacyPage.gccText')}
 </li>
 <li>
 <span className="font-bold text-gray-800">{t('privacyPage.globalStandardsLabel')}</span> {t('privacyPage.globalStandardsText')}
 </li>
 <li>
 {t('privacyPage.sovereignStorage')}
 </li>
 </ul>
 </div>
 </div>
 </div>
 </section>

 <div className="h-px bg-gray-100 w-full" />

 {/* Section 4: Security */}
 <section className="space-y-5">
 <div className="flex items-start gap-4">
 <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 shrink-0 mt-1">
 <Lock size={24} />
 </div>
 <div>
 <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('privacyPage.section4Title')}</h2>
 <div className="text-gray-600 leading-8">
 <p>
 {t('privacyPage.section4Text')}
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* Contact Footer */}
 <div className="bg-[#0F766E]/5 rounded-3xl p-8 mt-4 border border-[#0F766E]/10">
 <div className="flex flex-col md:flex-row items-center justify-between gap-6">
 <div>
 <h3 className="text-xl font-bold text-gray-900 mb-2">{t('privacyPage.contactTitle')}</h3>
 <p className="text-gray-600">{t('privacyPage.contactSubtitle')}</p>
 </div>
 <button
 onClick={() => onNavigate && onNavigate('support')}
 className="bg-[#0F766E] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#0d655e] transition-all shadow-lg shadow-teal-900/10 active:scale-95 whitespace-nowrap"
 >
 {t('privacyPage.contactButton')}
 </button>
 </div>
 </div>

 </div>
 </motion.div>
 </div>
 </div>
 );
};
