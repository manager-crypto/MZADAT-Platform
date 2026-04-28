import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
 BarChart2,
 Target,
 CheckCircle2,
 X,
 Users,
 Clock,
 Star,
 ArrowLeft,
 Send,
} from 'lucide-react';
import headerLogoImage from 'figma:asset/70a549db43a3294ca041bd716e8022066cbe43be.png';

export const ConsultingPage = () => {
 const { t, i18n } = useTranslation();
 const [isFormOpen, setIsFormOpen] = useState(false);

 const steps = [
 {
 icon: BarChart2,
 key: 'step1',
 image:
 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHlzaXMlMjBidXNpbmVzc3xlbnwxfHx8fDE3NzUyMjMxNTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
 },
 {
 icon: Target,
 key: 'step2',
 image:
 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJhdGVneSUyMHBsYW5uaW5nJTIwYnVzaW5lc3N8ZW58MXx8fHwxNzc1MjIzMTU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
 },
 {
 icon: CheckCircle2,
 key: 'step3',
 image:
 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwZGVhbCUyMHNhdWRpfGVufDF8fHx8MTc3NTIyMzE1OXww&ixlib=rb-4.1.0&q=80&w=1080',
 },
 ];

 const experts = [
 {
 nameKey: 'expert1Name',
 titleKey: 'expert1Title',
 specialtyKey: 'expert1Specialty',
 image:
 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzUyMjMxNTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
 rating: 4.9,
 clients: 120,
 },
 {
 nameKey: 'expert2Name',
 titleKey: 'expert2Title',
 specialtyKey: 'expert2Specialty',
 image:
 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJ1c2luZXNzfGVufDF8fHx8MTc3NTIyMzE1OXww&ixlib=rb-4.1.0&q=80&w=1080',
 rating: 5.0,
 clients: 98,
 },
 {
 nameKey: 'expert3Name',
 titleKey: 'expert3Title',
 specialtyKey: 'expert3Specialty',
 image:
 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBzdWl0fGVufDF8fHx8MTc3NTIyMzE1OXww&ixlib=rb-4.1.0&q=80&w=1080',
 rating: 4.8,
 clients: 145,
 },
 ];

 return (
 <div dir={i18n.dir()} className="min-h-screen bg-gray-50">

 {/* ── HERO ── */}
 <section className="relative bg-[#0d1117] text-white pt-[100px] lg:pt-36 pb-24 overflow-hidden">
 {/* Background image */}
 <img
 src="https://images.unsplash.com/photo-1486325212027-8081e485255e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXlhZGglMjBza3lzY3JhcGVycyUyMG5pZ2h0fGVufDF8fHx8MTc3NTIyMzE1OXww&ixlib=rb-4.1.0&q=80&w=1920"
 alt="Consulting hero"
 className="absolute inset-0 w-full h-full object-cover opacity-25"
 />
 {/* Gradient overlay */}
 <div className="absolute inset-0 bg-[#0d1117]" />
 {/* Teal glow */}
 <div className="absolute top-1/3 start-1/4 w-96 h-96 bg-[#47CCD0] rounded-full blur-[180px] opacity-10 pointer-events-none" />

 {/* Watermark logo */}
 <img
 src={headerLogoImage}
 alt=""
 aria-hidden="true"
 className="absolute inset-0 w-[60%] h-[60%] m-auto object-contain opacity-[0.04] pointer-events-none"
 />

 <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 md:px-8">
 <span className="inline-block text-[#47CCD0] font-bold tracking-widest uppercase text-sm mb-4">
 {t('consulting.badge')}
 </span>
 <h1 className="text-4xl md:text-6xl font-black mb-6 max-w-3xl leading-tight">
 {t('consulting.title')}
 </h1>
 <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
 {t('consulting.hero_sub')}
 </p>
 <button
 onClick={() => setIsFormOpen(true)}
 className="bg-[#47CCD0] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#35a4a9] transition-colors shadow-lg flex items-center gap-3"
 >
 {t('consulting.bookBtn')}
 <ArrowLeft size={20} />
 </button>
 </div>
 </section>

 {/* ── STATS BAR ── */}
 <section className="bg-white border-b border-gray-100">
 <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8">
 <div className="grid grid-cols-3 divide-x divide-gray-100 rtl:divide-x-reverse">
 <div className="py-10 text-center">
 <p className="text-3xl md:text-4xl font-black text-gray-900 mb-1">{t('consulting.stat1Value')}</p>
 <p className="text-gray-500 text-sm">{t('consulting.stat1Label')}</p>
 </div>
 <div className="py-10 text-center">
 <p className="text-3xl md:text-4xl font-black text-gray-900 mb-1">{t('consulting.stat2Value')}</p>
 <p className="text-gray-500 text-sm">{t('consulting.stat2Label')}</p>
 </div>
 <div className="py-10 text-center">
 <p className="text-3xl md:text-4xl font-black text-gray-900 mb-1">{t('consulting.stat3Value')}</p>
 <p className="text-gray-500 text-sm">{t('consulting.stat3Label')}</p>
 </div>
 </div>
 </div>
 </section>

 {/* ── PROCESS STEPS ── */}
 <section className="py-20">
 <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8">
 <div className="text-center mb-14">
 <span className="text-[#47CCD0] font-bold tracking-wider uppercase text-sm mb-2 block">
 {t('consulting.processBadge')}
 </span>
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('consulting.processTitle')}</h2>
 <p className="text-gray-500 max-w-xl mx-auto">{t('consulting.processDesc')}</p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 {steps.map((step, i) => (
 <div
 key={i}
 className="bg-white rounded-2xl border border-gray-200 hover:border-[#47CCD0] hover:shadow-xl hover: transition-all duration-300 group overflow-hidden flex flex-col"
 >
 {/* Image */}
 <div className="h-48 w-full relative overflow-hidden">
 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
 <img
 src={step.image}
 alt={t(`consulting.${step.key}Title`)}
 className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
 />
 {/* Step number badge */}
 <span className="absolute top-4 start-4 z-20 w-8 h-8 rounded-full bg-[#47CCD0] text-white text-sm font-black flex items-center justify-center">
 {i + 1}
 </span>
 </div>

 {/* Content */}
 <div className="p-8 pt-0 flex-1 flex flex-col relative">
 <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center text-[#47CCD0] mb-4 group-hover:scale-110 transition-transform relative z-20 -mt-7 shadow-md border border-gray-100">
 <step.icon size={28} />
 </div>
 <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#47CCD0] transition-colors">
 {t(`consulting.${step.key}Title`)}
 </h3>
 <p className="text-gray-500 text-sm leading-relaxed">{t(`consulting.${step.key}Desc`)}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* ── EXPERT PROFILES ── */}
 <section className="bg-[#111] text-white py-20 relative overflow-hidden">
 <div className="absolute top-0 end-0 w-96 h-96 bg-[#47CCD0] rounded-full blur-[150px] opacity-10 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
 <div className="absolute bottom-0 start-0 w-64 h-64 bg-[#47CCD0] rounded-full blur-[120px] opacity-10 -translate-x-1/2 translate-y-1/2 pointer-events-none" />

 <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 md:px-8">
 <div className="text-center mb-14">
 <span className="text-[#47CCD0] font-bold tracking-wider uppercase text-sm mb-2 block">
 {t('consulting.expertsBadge')}
 </span>
 <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('consulting.expertsTitle')}</h2>
 <p className="text-gray-400 max-w-xl mx-auto">{t('consulting.expertsDesc')}</p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 {experts.map((expert, i) => (
 <div
 key={i}
 className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#47CCD0]/50 transition-all group"
 >
 {/* Photo */}
 <div className="relative h-64 overflow-hidden">
 <img
 src={expert.image}
 alt={t(`consulting.${expert.nameKey}`)}
 className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
 </div>

 {/* Info */}
 <div className="p-6">
 <h3 className="text-lg font-bold text-white mb-1">{t(`consulting.${expert.nameKey}`)}</h3>
 <p className="text-[#47CCD0] text-sm font-medium mb-3">{t(`consulting.${expert.titleKey}`)}</p>
 <p className="text-gray-400 text-xs mb-4">{t(`consulting.${expert.specialtyKey}`)}</p>

 <div className="flex items-center justify-between text-sm">
 <div className="flex items-center gap-1 text-amber-400">
 <Star size={14} fill="currentColor" />
 <span className="font-bold text-white">{expert.rating}</span>
 </div>
 <div className="flex items-center gap-1 text-gray-400">
 <Users size={14} />
 <span>{expert.clients}+ {t('consulting.clientsLabel')}</span>
 </div>
 <div className="flex items-center gap-1 text-gray-400">
 <Clock size={14} />
 <span>{t('consulting.availableLabel')}</span>
 </div>
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* ── CTA SECTION ── */}
 <section className="py-20 bg-gray-50">
 <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8">
 <div className="bg-[#0F766E] rounded-3xl p-12 md:p-16 text-white text-center relative overflow-hidden">
 <div className="absolute top-0 end-0 w-72 h-72 bg-white rounded-full blur-[120px] opacity-10 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
 <div className="relative z-10">
 <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('consulting.ctaTitle')}</h2>
 <p className="text-white/80 text-lg max-w-xl mx-auto mb-10">{t('consulting.ctaDesc')}</p>
 <button
 onClick={() => setIsFormOpen(true)}
 className="bg-white text-[#0F766E] px-10 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-xl flex items-center gap-3 mx-auto"
 >
 {t('consulting.bookBtn')}
 <ArrowLeft size={20} />
 </button>
 </div>
 </div>
 </div>
 </section>

 {/* ── CONTACT FORM MODAL ── */}
 {isFormOpen && (
 <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
 {/* Backdrop */}
 <div
 className="absolute inset-0 bg-black/60 backdrop-blur-sm"
 onClick={() => setIsFormOpen(false)}
 />

 {/* Modal */}
 <div
 dir={i18n.dir()}
 className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 z-10 animate-slide-in"
 >
 <button
 onClick={() => setIsFormOpen(false)}
 className="absolute top-4 end-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
 >
 <X size={16} />
 </button>

 <h3 className="text-2xl font-bold text-gray-900 mb-2 text-start">{t('consulting.formTitle')}</h3>
 <p className="text-gray-500 text-sm mb-8 text-start">{t('consulting.formSubtitle')}</p>

 <div className="space-y-5">
 <div className="space-y-1.5">
 <label className="text-sm font-bold text-gray-700 block text-start">{t('consulting.formName')}</label>
 <input
 type="text"
 placeholder={t('consulting.formNamePlaceholder')}
 className="w-full h-12 bg-gray-50 border border-gray-200 rounded-lg ps-4 pe-4 text-start text-gray-900 focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 transition-all placeholder:text-gray-400"
 />
 </div>

 <div className="space-y-1.5">
 <label className="text-sm font-bold text-gray-700 block text-start">{t('consulting.formPhone')}</label>
 <input
 type="tel"
 placeholder={t('consulting.formPhonePlaceholder')}
 className="w-full h-12 bg-gray-50 border border-gray-200 rounded-lg ps-4 pe-4 text-start text-gray-900 focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 transition-all placeholder:text-gray-400"
 />
 </div>

 <div className="space-y-1.5">
 <label className="text-sm font-bold text-gray-700 block text-start">{t('consulting.formMessage')}</label>
 <textarea
 rows={4}
 placeholder={t('consulting.formMessagePlaceholder')}
 className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 text-start text-gray-900 focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 transition-all placeholder:text-gray-400 resize-none"
 />
 </div>

 <div className="flex gap-3 pt-2">
 <button
 onClick={() => setIsFormOpen(false)}
 className="flex-1 h-12 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-colors"
 >
 {t('consulting.formCancel')}
 </button>
 <button className="flex-1 h-12 bg-[#0F766E] text-white rounded-xl font-bold hover:bg-[#0d655e] transition-colors flex items-center justify-center gap-2">
 {t('consulting.formSubmit')}
 <Send size={16} />
 </button>
 </div>
 </div>
 </div>
 </div>
 )}

 </div>
 );
};

export default ConsultingPage;
