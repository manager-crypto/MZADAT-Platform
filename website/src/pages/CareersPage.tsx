import React from 'react';
import { ArrowLeft, Briefcase, Users, MapPin, CheckCircle2, TrendingUp, DollarSign, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const CareersPage = () => {
 const { t } = useTranslation();

 const jobs = [
 {
 title: t('careersPage.job1Title'),
 department: t('careersPage.job1Dept'),
 location: t('careersPage.job1Location'),
 type: t('careersPage.job1Type'),
 posted: t('careersPage.job1Posted'),
 },
 {
 title: t('careersPage.job2Title'),
 department: t('careersPage.job2Dept'),
 location: t('careersPage.job2Location'),
 type: t('careersPage.job2Type'),
 posted: t('careersPage.job2Posted'),
 },
 {
 title: t('careersPage.job3Title'),
 department: t('careersPage.job3Dept'),
 location: t('careersPage.job3Location'),
 type: t('careersPage.job3Type'),
 posted: t('careersPage.job3Posted'),
 },
 {
 title: t('careersPage.job4Title'),
 department: t('careersPage.job4Dept'),
 location: t('careersPage.job4Location'),
 type: t('careersPage.job4Type'),
 posted: t('careersPage.job4Posted'),
 },
 ];

 const benefits = [
 { icon: DollarSign, title: t('careersPage.benefitSalaryTitle'), desc: t('careersPage.benefitSalaryDesc') },
 { icon: TrendingUp, title: t('careersPage.benefitGrowthTitle'), desc: t('careersPage.benefitGrowthDesc') },
 { icon: Heart, title: t('careersPage.benefitInsuranceTitle'), desc: t('careersPage.benefitInsuranceDesc') },
 { icon: Users, title: t('careersPage.benefitCultureTitle'), desc: t('careersPage.benefitCultureDesc') },
 ];

 return (
 <div className="min-h-screen bg-gray-50 pt-36 pb-12">
 <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8">

 {/* Header */}
 <div className="text-center mb-16">
 <span className="text-[#47CCD0] font-bold tracking-wider uppercase mb-2 block">{t('careersPage.tagline')}</span>
 <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t('careersPage.headline')}</h1>
 <p className="text-gray-500 max-w-2xl mx-auto text-lg">
 {t('careersPage.subtitle')}
 </p>
 </div>

 {/* Benefits Grid */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
 {benefits.map((benefit, idx) => (
 <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
 <div className="w-14 h-14 bg-teal-50 text-[#47CCD0] rounded-full flex items-center justify-center mx-auto mb-4">
 <benefit.icon size={24} />
 </div>
 <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
 <p className="text-sm text-gray-500">{benefit.desc}</p>
 </div>
 ))}
 </div>

 {/* Open Positions */}
 <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-20">
 <div className="p-8 border-b border-gray-100 flex justify-between items-center">
 <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
 <Briefcase className="text-[#47CCD0]" /> {t('careersPage.openPositions')}
 </h2>
 <button className="text-[#47CCD0] font-bold text-sm hover:underline">{t('careersPage.viewAll')}</button>
 </div>

 <div className="divide-y divide-gray-100">
 {jobs.map((job, idx) => (
 <div key={idx} className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 transition-colors group cursor-pointer">
 <div>
 <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#47CCD0] transition-colors">{job.title}</h3>
 <div className="flex flex-wrap gap-4 text-sm text-gray-500">
 <span className="flex items-center gap-1"><Briefcase size={14}/> {job.department}</span>
 <span className="flex items-center gap-1"><MapPin size={14}/> {job.location}</span>
 <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">{job.type}</span>
 </div>
 </div>
 <div className="flex items-center gap-4">
 <span className="text-xs text-gray-400">{job.posted}</span>
 <button className="bg-white border border-gray-200 text-gray-700 px-6 py-2 rounded-lg font-bold hover:bg-[#47CCD0] hover:border-[#47CCD0] hover:text-white transition-all">
 {t('careersPage.applyNow')}
 </button>
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* CTA */}
 <div className="bg-[#47CCD0] rounded-3xl p-12 text-center text-white relative overflow-hidden">
 <div className="absolute top-0 start-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
 <div className="absolute bottom-0 end-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

 <div className="relative z-10 max-w-2xl mx-auto">
 <h2 className="text-3xl font-bold mb-4">{t('careersPage.ctaTitle')}</h2>
 <p className="text-teal-50 mb-8 text-lg">
 {t('careersPage.ctaDesc')}
 </p>
 <button className="bg-white text-[#47CCD0] px-8 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-lg shadow-black/5">
 {t('careersPage.ctaButton')}
 </button>
 </div>
 </div>

 </div>
 </div>
 );
};
