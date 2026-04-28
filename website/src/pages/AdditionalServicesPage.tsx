import React from 'react';
import { Grid, FileText, CheckCircle2, Shield, Camera, PencilRuler } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface AdditionalServicesPageProps {
 onNavigate?: (page: string) => void;
}

export const AdditionalServicesPage: React.FC<AdditionalServicesPageProps> = ({ onNavigate }) => {
 const navigate = useNavigate();
 const { t } = useTranslation();

 const handleBack = () => {
 if (onNavigate) {
 onNavigate('home');
 } else {
 navigate('/');
 }
 };

 const services = [
 {
 id: 1,
 title: t('additionalServices.service1Title'),
 description: t('additionalServices.service1Desc'),
 icon: <FileText size={24} className="text-[#47CCD0]" />,
 features: [
 t('additionalServices.service1Feature1'),
 t('additionalServices.service1Feature2'),
 t('additionalServices.service1Feature3'),
 ]
 },
 {
 id: 2,
 title: t('additionalServices.service2Title'),
 description: t('additionalServices.service2Desc'),
 icon: <Shield size={24} className="text-[#47CCD0]" />,
 features: [
 t('additionalServices.service2Feature1'),
 t('additionalServices.service2Feature2'),
 t('additionalServices.service2Feature3'),
 ]
 },
 {
 id: 3,
 title: t('additionalServices.service3Title'),
 description: t('additionalServices.service3Desc'),
 icon: <Grid size={24} className="text-[#47CCD0]" />,
 features: [
 t('additionalServices.service3Feature1'),
 t('additionalServices.service3Feature2'),
 t('additionalServices.service3Feature3'),
 ]
 },
 {
 id: 4,
 title: t('additionalServices.service4Title'),
 description: t('additionalServices.service4Desc'),
 icon: <Camera size={24} className="text-[#47CCD0]" />,
 features: [
 t('additionalServices.service4Feature1'),
 t('additionalServices.service4Feature2'),
 t('additionalServices.service4Feature3'),
 ]
 },
 {
 id: 5,
 title: t('additionalServices.service5Title'),
 description: t('additionalServices.service5Desc'),
 icon: <PencilRuler size={24} className="text-[#47CCD0]" />,
 features: [
 t('additionalServices.service5Feature1'),
 t('additionalServices.service5Feature2'),
 t('additionalServices.service5Feature3'),
 ]
 }
 ];

 return (
 <div className="min-h-screen bg-gray-50 pt-24 pb-20">
 <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
 {/* Breadcrumb */}
 <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
 <button onClick={handleBack} className="hover:text-[#47CCD0] transition-colors">{t('additionalServices.breadcrumbHome')}</button>
 <span>/</span>
 <span className="text-gray-900 font-medium">{t('additionalServices.breadcrumbCurrent')}</span>
 </div>

 {/* Header */}
 <div className="bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-sm border border-gray-100 flex flex-col items-center text-center relative overflow-hidden">
 <div className="absolute top-0 end-0 w-64 h-64 bg-[#47CCD0]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
 <div className="absolute bottom-0 start-0 w-64 h-64 bg-[#47CCD0]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

 <div className="w-16 h-16 bg-[#F8FAFB] rounded-2xl flex items-center justify-center mb-6 text-[#47CCD0]">
 <Grid size={32} />
 </div>
 <h1 className="text-3xl md:text-4xl font-bold text-[#2B3D50] mb-4">{t('additionalServices.pageTitle')}</h1>
 <p className="text-lg text-gray-500 max-w-2xl">
 {t('additionalServices.pageSubtitle')}
 </p>
 </div>

 {/* Services Grid */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {services.map((service) => (
 <div key={service.id} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:border-[#47CCD0]/30 group">
 <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
 {service.icon}
 </div>
 <h3 className="text-xl font-bold text-[#2B3D50] mb-3">{service.title}</h3>
 <p className="text-gray-500 mb-6 leading-relaxed">
 {service.description}
 </p>

 <div className="space-y-3 pt-6 border-t border-gray-100">
 {service.features.map((feature, index) => (
 <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
 <CheckCircle2 size={16} className="text-green-500" />
 <span>{feature}</span>
 </div>
 ))}
 </div>

 <button
 onClick={() => navigate('/service-providers')}
 className="w-full mt-8 py-3 rounded-xl border border-gray-200 text-[#2B3D50] font-bold hover:bg-[#47CCD0] hover:text-white hover:border-[#47CCD0] transition-colors"
 >
 {t('additionalServices.requestService')}
 </button>
 </div>
 ))}
 </div>

 {/* Contact Banner */}
 <div className="mt-12 bg-[#2B3D50] rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
 <div className="absolute top-0 start-0 w-full h-full">
 <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#47CCD0]/20"></div>
 </div>
 <div className="relative z-10 text-center md:text-end">
 <h3 className="text-2xl font-bold mb-2">{t('additionalServices.contactBannerTitle')}</h3>
 <p className="text-gray-300">{t('additionalServices.contactBannerSubtitle')}</p>
 </div>
 <button className="relative z-10 bg-[#47CCD0] hover:bg-[#3dbec2] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg whitespace-nowrap">
 {t('additionalServices.contactBannerBtn')}
 </button>
 </div>
 </div>
 </div>
 );
};
