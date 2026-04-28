import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FileText, Gavel, AlertCircle, CreditCard, Users, Scale, Shield, ArrowLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TermsPageProps {
 onNavigate?: (page: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
 const { t } = useTranslation();
 const [activeSection, setActiveSection] = useState('intro');

 const sections = [
 { id: 'intro', title: t('termsPage.nav1'), icon: FileText },
 { id: 'registration', title: t('termsPage.nav2'), icon: Users },
 { id: 'auctions', title: t('termsPage.nav3'), icon: Gavel },
 { id: 'payments', title: t('termsPage.nav4'), icon: CreditCard },
 { id: 'disclaimer', title: t('termsPage.nav5'), icon: AlertCircle },
 { id: 'law', title: t('termsPage.nav6'), icon: Scale },
 ];

 const scrollToSection = (id: string) => {
 const element = document.getElementById(id);
 if (element) {
 const offset = 100; // Adjust for sticky header
 const bodyRect = document.body.getBoundingClientRect().top;
 const elementRect = element.getBoundingClientRect().top;
 const elementPosition = elementRect - bodyRect;
 const offsetPosition = elementPosition - offset;

 window.scrollTo({
 top: offsetPosition,
 behavior: 'smooth'
 });
 setActiveSection(id);
 }
 };

 useEffect(() => {
 const handleScroll = () => {
 const scrollPosition = window.scrollY + 150;

 for (const section of sections) {
 const element = document.getElementById(section.id);
 if (element) {
 const offsetTop = element.offsetTop;
 const offsetBottom = offsetTop + element.offsetHeight;

 if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
 setActiveSection(section.id);
 }
 }
 }
 };

 window.addEventListener('scroll', handleScroll);
 return () => window.removeEventListener('scroll', handleScroll);
 }, [sections]);

 return (
 <div className="min-h-screen bg-[#F8FAFB] pt-36 pb-16">

 {/* Hero Section */}
 <div className="bg-[#2B3D50] text-white py-20 relative overflow-hidden mb-12">
 <div className="absolute top-0 start-0 w-full h-full overflow-hidden z-0">
 <div className="absolute top-10 end-10 w-64 h-64 bg-[#47CCD0] rounded-full blur-[100px] opacity-20"></div>
 <div className="absolute bottom-10 start-10 w-48 h-48 bg-[#47CCD0] rounded-full blur-[80px] opacity-10"></div>
 </div>

 <div className="max-w-6xl mx-auto px-4 relative z-10 text-center">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6 }}
 >
 <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/10">
 <Scale size={18} className="text-[#47CCD0]" />
 <span className="text-sm font-medium">{t('termsPage.heroBadge')}</span>
 </div>
 <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('termsPage.heroTitle')}</h1>
 <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
 {t('termsPage.heroSubtitle')}
 </p>
 <div className="mt-8 text-sm text-gray-400 bg-white/5 inline-block px-6 py-2 rounded-full border border-white/10">
 {t('termsPage.lastUpdated')}
 </div>
 </motion.div>
 </div>
 </div>

 <div className="max-w-6xl mx-auto px-4">
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

 {/* Sidebar Navigation (Sticky) */}
 <div className="hidden lg:block lg:col-span-3">
 <div className="sticky top-32 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 overflow-hidden">
 <h3 className="font-bold text-[#2B3D50] mb-4 px-2">{t('termsPage.tableOfContents')}</h3>
 <nav className="space-y-1">
 {sections.map((section) => (
 <button
 key={section.id}
 onClick={() => scrollToSection(section.id)}
 className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-sm font-medium ${
 activeSection === section.id
 ? 'bg-[#47CCD0]/10 text-[#47CCD0]'
 : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
 }`}
 >
 <section.icon size={18} className={activeSection === section.id ? 'text-[#47CCD0]' : 'text-gray-400'} />
 <span>{section.title}</span>
 {activeSection === section.id && (
 <motion.div layoutId="activeDot" className="w-1.5 h-1.5 bg-[#47CCD0] rounded-full me-auto" />
 )}
 </button>
 ))}
 </nav>

 <div className="mt-6 pt-6 border-t border-gray-100 px-2">
 <button
 onClick={() => onNavigate && onNavigate('privacy-policy')}
 className="w-full flex items-center justify-between text-gray-500 hover:text-[#47CCD0] transition-colors text-sm"
 >
 <span>{t('termsPage.privacyPolicy')}</span>
 <ChevronRight size={14} className="rtl:rotate-180" />
 </button>
 </div>
 </div>
 </div>

 {/* Main Content */}
 <div className="lg:col-span-9 space-y-8">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2 }}
 className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-8 md:p-12"
 >
 <div className="max-w-3xl mx-auto">
 {/* Intro */}
 <div id="intro" className="scroll-mt-32 mb-12">
 <div className="flex items-center gap-4 mb-6">
 <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm shadow-blue-100">
 <FileText size={24} />
 </div>
 <h2 className="text-2xl font-bold text-[#2B3D50]">{t('termsPage.section1Title')}</h2>
 </div>
 <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none">
 <p>
 {t('termsPage.section1Body1')}
 </p>
 <p className="mt-4">
 {t('termsPage.section1Body2')}
 </p>
 </div>
 </div>

 <hr className="border-gray-100 my-8" />

 {/* Registration */}
 <div id="registration" className="scroll-mt-32 mb-12">
 <div className="flex items-center gap-4 mb-6">
 <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 shadow-sm shadow-green-100">
 <Users size={24} />
 </div>
 <h2 className="text-2xl font-bold text-[#2B3D50]">{t('termsPage.section2Title')}</h2>
 </div>
 <div className="space-y-4">
 <p className="text-gray-600 leading-relaxed">
 {t('termsPage.section2Intro')}
 </p>
 <ul className="space-y-3">
 {[
 t('termsPage.section2Item1'),
 t('termsPage.section2Item2'),
 t('termsPage.section2Item3'),
 t('termsPage.section2Item4'),
 t('termsPage.section2Item5'),
 ].map((item, idx) => (
 <li key={idx} className="flex gap-3 text-gray-600">
 <CheckCircle2 size={20} className="text-[#47CCD0] shrink-0 mt-1" />
 <span>{item}</span>
 </li>
 ))}
 </ul>
 </div>
 </div>

 <hr className="border-gray-100 my-8" />

 {/* Auctions Rules */}
 <div id="auctions" className="scroll-mt-32 mb-12">
 <div className="flex items-center gap-4 mb-6">
 <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 shadow-sm shadow-purple-100">
 <Gavel size={24} />
 </div>
 <h2 className="text-2xl font-bold text-[#2B3D50]">{t('termsPage.section3Title')}</h2>
 </div>
 <div className="bg-[#F8FAFB] p-6 rounded-xl border border-gray-100 mb-6">
 <h4 className="font-bold text-[#2B3D50] mb-2 flex items-center gap-2">
 <AlertCircle size={18} className="text-orange-500" />
 {t('termsPage.section3NoteTitle')}
 </h4>
 <p className="text-sm text-gray-600">
 {t('termsPage.section3NoteBody')}
 </p>
 </div>
 <ul className="space-y-3 text-gray-600">
 <li className="flex gap-3">
 <div className="w-1.5 h-1.5 bg-gray-300 rounded-full mt-2.5 shrink-0"></div>
 <span>{t('termsPage.section3Item1')}</span>
 </li>
 <li className="flex gap-3">
 <div className="w-1.5 h-1.5 bg-gray-300 rounded-full mt-2.5 shrink-0"></div>
 <span>{t('termsPage.section3Item2')}</span>
 </li>
 <li className="flex gap-3">
 <div className="w-1.5 h-1.5 bg-gray-300 rounded-full mt-2.5 shrink-0"></div>
 <span>{t('termsPage.section3Item3')}</span>
 </li>
 </ul>
 </div>

 <hr className="border-gray-100 my-8" />

 {/* Payments */}
 <div id="payments" className="scroll-mt-32 mb-12">
 <div className="flex items-center gap-4 mb-6">
 <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 shadow-sm shadow-orange-100">
 <CreditCard size={24} />
 </div>
 <h2 className="text-2xl font-bold text-[#2B3D50]">{t('termsPage.section4Title')}</h2>
 </div>
 <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none">
 <p>
 {t('termsPage.section4Body1')}
 </p>
 <p className="mt-4">
 {t('termsPage.section4Body2')}
 </p>
 </div>
 </div>

 <hr className="border-gray-100 my-8" />

 {/* Disclaimer */}
 <div id="disclaimer" className="scroll-mt-32 mb-12">
 <div className="flex items-center gap-4 mb-6">
 <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 shadow-sm shadow-red-100">
 <Shield size={24} />
 </div>
 <h2 className="text-2xl font-bold text-[#2B3D50]">{t('termsPage.section5Title')}</h2>
 </div>
 <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none">
 <p>
 {t('termsPage.section5Body1')}
 </p>
 <p className="mt-4">
 {t('termsPage.section5Body2')}
 </p>
 </div>
 </div>

 <hr className="border-gray-100 my-8" />

 {/* Law */}
 <div id="law" className="scroll-mt-32">
 <div className="flex items-center gap-4 mb-6">
 <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-[#47CCD0] shadow-sm shadow-teal-100">
 <Scale size={24} />
 </div>
 <h2 className="text-2xl font-bold text-[#2B3D50]">{t('termsPage.section6Title')}</h2>
 </div>
 <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none">
 <p>
 {t('termsPage.section6Body')}
 </p>
 </div>
 </div>
 </div>
 </motion.div>

 {/* Contact Support CTA */}
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ delay: 0.4 }}
 className="bg-[#2B3D50] rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6"
 >
 <div>
 <h3 className="text-xl font-bold mb-2">{t('termsPage.ctaTitle')}</h3>
 <p className="text-gray-300">{t('termsPage.ctaSubtitle')}</p>
 </div>
 <button
 onClick={() => onNavigate && onNavigate('support')}
 className="bg-[#47CCD0] text-[#2B3D50] px-6 py-3 rounded-xl font-bold hover:bg-white transition-colors shadow-lg hover:shadow-xl shrink-0"
 >
 {t('termsPage.ctaButton')}
 </button>
 </motion.div>
 </div>
 </div>
 </div>
 </div>
 );
};
