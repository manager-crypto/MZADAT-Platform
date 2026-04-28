import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
 ArrowRight,
 ChevronRight,
 ChevronLeft,
 MapPin,
 Bed,
 Bath,
 Maximize,
 Share2,
 Heart,
 Phone,
 MessageCircle,
 CheckCircle2,
 Calendar,
 ShieldCheck,
 Car,
 Trees,
 Wifi,
 Building,
 Star,
 Map as MapIcon,
 Flag,
 AlertTriangle,
 Hash,
 Info,
 FileText,
 PlayCircle,
 Sparkles,
 Calculator
} from 'lucide-react';
import { RiyalSymbol } from '../ui/RiyalSymbol';
import { FinanceEligibilityModal } from '../finance/FinanceEligibilityModal';
import { ShareModal } from '../common/ShareModal';
import { VirtualTour360 } from './VirtualTour360';
import { BackButton } from '../ui/BackButton';
import { SaudiRealEstateComplianceBadge } from '../compliance/SaudiRealEstateComplianceBadge';
import { SaudiPropertyCompliance } from '../../types/saudiRealEstate';

interface Property {
 id: number | string;
 title: string;
 price: number | string;
 address?: string;
 location?: string;
 specs?: { beds: number; baths: number; area: number };
 // Legacy / alternate shape
 beds?: number;
 baths?: number;
 area?: number | string;
 type?: string;
 image?: string;
 tags?: string[];
 features?: string[];
 agent?: {
 name: string;
 logo: string;
 verified: boolean;
 time?: string;
 };
 featured?: boolean;
 isPremium?: boolean;
 time?: string;
 complianceData?: SaudiPropertyCompliance;
 [key: string]: any; // Allow extra fields from different sources
}

interface PropertyDetailsPageProps {
 property?: Property;
 onBack: () => void;
 onNavigate: (page: string) => void;
}

export const PropertyDetailsPage = ({ property: initialProperty, onBack, onNavigate }: PropertyDetailsPageProps) => {
 const { t } = useTranslation();

 // Fallback mock data if no property is passed
 const defaultProperty = {
 id: 1,
 title: t('propertyDetails.defaultTitle'),
 price: 3500000,
 address: t('propertyDetails.defaultAddress'),
 specs: { beds: 5, baths: 6, area: 450 },
 type: t('propertyDetails.defaultType'),
 image: 'https://images.unsplash.com/photo-1700085060165-1ac17cf08286?q=80&w=1080',
 tags: [
 t('propertyDetails.defaultTag1'),
 t('propertyDetails.defaultTag2'),
 t('propertyDetails.defaultTag3'),
 t('propertyDetails.defaultTag4'),
 ],
 agent: {
 name: t('propertyDetails.defaultAgentName'),
 logo: 'https://api.dicebear.com/7.x/initials/svg?seed=RE',
 verified: true
 },
 featured: true,
 time: t('propertyDetails.defaultTime'),
 complianceData: {
 titleDeedNumber: '510123456789',
 titleDeedDate: '1445-02-15',
 falLicenseNumber: '1200001234',
 adLicenseNumber: '7200005678',
 buildingPermit: {
 permitNumber: '44012345',
 issueDate: '1444-10-05',
 status: 'active'
 },
 landSurvey: {
 surveyNumber: '88123',
 surveyDate: '1444-11-20'
 }
 } as SaudiPropertyCompliance
 };

 // Normalize property to handle different mock data structures
 const p = initialProperty || defaultProperty;
 const property = {
 ...p,
 title: p.title,
 address: p.address || p.location || '',
 price: typeof p.price === 'string' ? parseFloat(p.price.replace(/,/g, '')) : p.price,
 specs: p.specs || { beds: p.beds, baths: p.baths, area: typeof p.area === 'string' ? parseFloat(p.area) : p.area },
 image: p.image,
 featured: p.featured ?? p.isPremium,
 tags: p.tags || p.features || [],
 time: p.time || p.agent?.time || '',
 agent: p.agent || defaultProperty.agent
 };

 const [activeImage, setActiveImage] = useState(0);
 const [isFinanceModalOpen, setIsFinanceModalOpen] = useState(false);
 const [isShareModalOpen, setIsShareModalOpen] = useState(false);

 // Mock gallery images
 const gallery = [
 property.image,
 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1080',
 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1080',
 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1080',
 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=1080'
 ];

 const features = [
 { icon: <Car size={20} />, label: t('propertyDetails.feature1') },
 { icon: <Trees size={20} />, label: t('propertyDetails.feature2') },
 { icon: <Wifi size={20} />, label: t('propertyDetails.feature3') },
 { icon: <ShieldCheck size={20} />, label: t('propertyDetails.feature4') },
 { icon: <Building size={20} />, label: t('propertyDetails.feature5') },
 { icon: <CheckCircle2 size={20} />, label: t('propertyDetails.feature6') },
 ];

 return (
 <div className="min-h-screen bg-gray-50 pt-36 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
 <div className="container mx-auto px-4 max-w-7xl">
 {/* Breadcrumb & Back */}
 <div className="flex items-center justify-between mb-6">
 <div className="flex items-center gap-2 text-sm text-gray-500">
 <BackButton onClick={onBack} label={t('propertyDetails.backLabel')} />
 <span className="text-gray-300">/</span>
 <span>{t('propertyDetails.propertiesForSale')}</span>
 <span>/</span>
 <span className="text-gray-900 font-bold line-clamp-1">{property.title}</span>
 </div>

 <div className="flex gap-2">
 <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 transition-all">
 <Heart size={20} />
 </button>
 </div>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
 {/* Main Content */}
 <div className="lg:col-span-8 space-y-6">

 {/* Gallery */}
 <div className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100">
 <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-2 group">
 <img
 src={gallery[activeImage]}
 alt={property.title}
 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
 />
 <div className="absolute top-4 end-4 flex gap-2 z-10">
 <span className="bg-[#47CCD0] text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg">{t('propertyDetails.forSale')}</span>
 {property.featured && (
 <span className="bg-yellow-400 text-black px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1 shadow-lg">
 <Star size={14} fill="currentColor" /> {t('propertyDetails.featured')}
 </span>
 )}
 </div>

 <VirtualTour360 image={gallery[activeImage]} />

 {/* Navigation Arrows */}
 <button
 onClick={(e) => {
 e.stopPropagation();
 setActiveImage((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
 }}
 className="absolute top-1/2 start-4 -translate-y-1/2 w-12 h-12 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm z-20 cursor-pointer border border-white/20"
 >
 <ChevronLeft size={28} />
 </button>

 <button
 onClick={(e) => {
 e.stopPropagation();
 setActiveImage((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
 }}
 className="absolute top-1/2 end-4 -translate-y-1/2 w-12 h-12 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm z-20 cursor-pointer border border-white/20"
 >
 <ChevronRight size={28} />
 </button>
 </div>
 <div className="grid grid-cols-5 gap-2">
 {gallery.map((img, idx) => (
 <button
 key={idx}
 onClick={() => setActiveImage(idx)}
 className={`relative h-20 md:h-24 rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-[#47CCD0]' : 'border-transparent opacity-70 hover:opacity-100'}`}
 >
 <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
 </button>
 ))}
 </div>
 </div>

 {/* Title & Price (Mobile/Tablet only - hidden on large screens usually but kept here for flow) */}
 <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
 <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
 <div>
 <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-relaxed">{property.title}</h1>
 <p className="text-gray-500 flex items-center gap-2">
 <MapPin size={18} className="text-[#47CCD0]" />
 {property.address}
 </p>
 </div>
 <div className="text-start md:text-start rtl:text-end">
 <p className="text-3xl font-bold text-[#47CCD0] font-mono mb-1 flex items-center justify-end gap-1.5">
 {property.price.toLocaleString()}
 <RiyalSymbol className="w-6 h-6 text-gray-600" />
 </p>
 <p className="text-xs text-gray-400">{t('propertyDetails.lastUpdated', { time: property.time })}</p>
 </div>
 </div>

 {/* Key Specs */}
 <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-gray-100 mb-6">
 <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl">
 <Bed size={24} className="text-[#47CCD0] mb-2" />
 <span className="font-bold text-lg">{property.specs.beds}</span>
 <span className="text-xs text-gray-500">{t('propertyDetails.bedrooms')}</span>
 </div>
 <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl">
 <Bath size={24} className="text-[#47CCD0] mb-2" />
 <span className="font-bold text-lg">{property.specs.baths}</span>
 <span className="text-xs text-gray-500">{t('propertyDetails.bathrooms')}</span>
 </div>
 <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl">
 <Maximize size={24} className="text-[#47CCD0] mb-2" />
 <span className="font-bold text-lg">{property.specs.area}</span>
 <span className="text-xs text-gray-500">{t('propertyDetails.squareMeters')}</span>
 </div>
 </div>

 <div className="space-y-6">
 <div>
 <h3 className="text-xl font-bold text-gray-900 mb-4">{t('propertyDetails.propertyDetailsTitle')}</h3>
 <p className="text-gray-600 leading-relaxed text-lg">
 {t('propertyDetails.propertyDesc')}
 </p>
 </div>

 <div>
 <h3 className="text-xl font-bold text-gray-900 mb-4">{t('propertyDetails.featuresTitle')}</h3>
 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
 {features.map((feature, idx) => (
 <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-[#47CCD0]/30 hover:bg-teal-50/50 transition-colors">
 <div className="text-[#47CCD0]">{feature.icon}</div>
 <span className="text-sm font-medium text-gray-700">{feature.label}</span>
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>

 {/* Map */}
 <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 overflow-hidden">
 <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
 <MapIcon size={24} className="text-[#47CCD0]" />
 {t('propertyDetails.mapTitle')}
 </h3>
 <div className="h-[300px] bg-gray-100 rounded-2xl overflow-hidden relative">
 <iframe
 width="100%"
 height="100%"
 frameBorder="0"
 scrolling="no"
 title="Property Location"
 src="https://maps.google.com/maps?width=100%25&height=600&hl=ar&q=Riyadh%20Yasmin&t=&z=14&ie=UTF8&iwloc=B&output=embed"
 className="w-full h-full grayscale-[20%]"
 ></iframe>
 </div>
 </div>

 {/* Saudi Real Estate Compliance Data */}
 {property.complianceData && (
 <SaudiRealEstateComplianceBadge data={property.complianceData} isOffPlan={false} />
 )}
 </div>

 {/* Sidebar */}
 <div className="lg:col-span-4 space-y-6">
 {/* Agent Card / Direct Sale Card */}
 <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

 {/* Share Button (Top) */}
 <button
 onClick={() => setIsShareModalOpen(true)}
 className="w-full py-3 flex items-center justify-center gap-2 text-gray-500 hover:text-gray-900 transition-colors border-b border-gray-100"
 >
 <Share2 size={18} />
 <span className="font-medium">{t('propertyDetails.share')}</span>
 </button>

 <div className="p-6 space-y-6">

 {/* Price */}
 <div className="text-center">
 <p className="text-sm text-gray-500 mb-1">{t('propertyDetails.requestedPrice')}</p>
 <p className="font-bold text-3xl text-gray-900 flex items-center justify-center gap-1.5 font-mono">
 {property.price.toLocaleString()} <RiyalSymbol className="w-6 h-6 text-gray-600" />
 </p>
 </div>

 {/* Media Buttons */}
 <div className="grid grid-cols-2 gap-3">
 <button className="py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 hover:border-gray-300 transition-all">
 <FileText size={18} />
 {t('propertyDetails.brochure')}
 </button>
 <button className="py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 hover:border-gray-300 transition-all">
 <PlayCircle size={18} />
 {t('propertyDetails.propertyVideo')}
 </button>
 </div>

 {/* AI Price Button */}
 <button
 onClick={() => onNavigate('ai-evaluation')}
 className="w-full py-3 bg-gradient-to-l from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg transition-all animate-pulse"
 >
 <Sparkles size={18} />
 {t('propertyDetails.aiPriceBtn')}
 </button>

 {/* Finance Eligibility Button */}
 <div className="relative group">
 <button
 onClick={() => setIsFinanceModalOpen(true)}
 className="w-full py-3 bg-white border-2 border-[#47CCD0] text-[#47CCD0] rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#47CCD0] hover:text-white transition-all shadow-sm"
 >
 <Calculator size={18} />
 {t('propertyDetails.financeBtn')}
 </button>
 <div className="absolute -bottom-6 end-0 w-full text-center flex justify-center">
 <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-b-lg border-b border-e border-s border-gray-200 flex items-center gap-1 shadow-sm">
 <CheckCircle2 size={10} className="text-green-500" />
 {t('propertyDetails.secureGateway')}
 </span>
 </div>
 </div>

 {/* Breakdown */}
 <div className="space-y-3 pt-6">
 <div className="flex justify-between items-center text-xs text-gray-400">
 <span>{t('propertyDetails.tax15')}</span>
 <span className="font-bold flex items-center gap-1 font-mono">453,562.50 <RiyalSymbol className="w-3 h-3" /></span>
 </div>
 <div className="flex justify-between items-center text-sm">
 <span className="text-gray-600">{t('propertyDetails.pricePerSqm')}</span>
 <span className="font-bold text-gray-900 flex items-center gap-1 font-mono">1,263.40 <RiyalSymbol className="w-4 h-4" /></span>
 </div>
 <div className="flex justify-between items-center text-sm">
 <span className="text-gray-600">{t('propertyDetails.commission')}</span>
 <span className="font-bold text-gray-900 flex items-center gap-1 font-mono">73,750.00 <RiyalSymbol className="w-4 h-4" /></span>
 </div>
 <div className="h-px bg-gray-100 my-2 border-t border-dashed border-gray-300"></div>
 <div className="flex justify-between items-center text-lg">
 <span className="font-bold text-gray-900">{t('propertyDetails.totalApprox')}</span>
 <span className="font-bold text-[#47CCD0] flex items-center gap-1 font-mono">3,023,750 <RiyalSymbol className="w-5 h-5 text-gray-600" /></span>
 </div>
 </div>

 {/* Agent Info */}
 <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
 <div className="w-12 h-12 rounded-lg border border-gray-200 p-1 flex items-center justify-center bg-gray-50">
 <img src={property.agent.logo} alt="Agent" className="w-full h-full object-contain" />
 </div>
 <div>
 <span className="text-[10px] text-gray-500 border border-gray-200 px-2 py-0.5 rounded-md inline-block mb-1">{t('propertyDetails.sellingAgent')}</span>
 <p className="font-bold text-gray-900 text-sm">{property.agent.name}</p>
 <p className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
 <Info size={10} /> {t('propertyDetails.falLicenseLabel')}
 </p>
 <p className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
 <Info size={10} /> {t('propertyDetails.adLicenseLabel')}
 </p>
 </div>
 </div>

 {/* Book Viewing Button */}
 <button
 onClick={() => onNavigate('booking')}
 className="w-full py-4 mb-3 bg-[#2B3D50] text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#1a2530] transition-colors shadow-lg"
 >
 <Calendar size={20} />
 {t('propertyDetails.bookViewing')}
 </button>

 {/* Contact Buttons */}
 <div className="grid grid-cols-2 gap-3">
 <button className="py-3 bg-teal-50 text-[#47CCD0] rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-teal-100 transition-colors">
 <MessageCircle size={18} />
 {t('propertyDetails.whatsapp')}
 </button>
 <button className="py-3 bg-gray-100 text-gray-700 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
 <Phone size={18} />
 {t('propertyDetails.call')}
 </button>
 </div>

 </div>
 </div>

 {/* Ad Info & Reports */}
 <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
 <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
 <div className="text-center flex-1 border-s border-gray-100">
 <p className="text-xs text-gray-500 mb-1 flex items-center justify-center gap-1">
 <Hash size={14} /> {t('propertyDetails.adNumber')}
 </p>
 <p className="font-bold text-gray-900 font-mono text-lg">7658291</p>
 </div>
 <div className="text-center flex-1">
 <p className="text-xs text-gray-500 mb-1 flex items-center justify-center gap-1">
 <Calendar size={14} /> {t('propertyDetails.adDate')}
 </p>
 <p className="font-bold text-gray-900">2023/12/14</p>
 </div>
 </div>

 <div className="space-y-3">
 <button
 onClick={() => onNavigate('report-ad-issue')}
 className="w-full py-3 bg-[#F9FAFB] hover:bg-gray-100 text-gray-900 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all border border-gray-100"
 >
 <span>{t('propertyDetails.reportTechnical')}</span>
 <AlertTriangle size={16} className="text-orange-500" />
 </button>
 <button
 onClick={() => onNavigate('report-complaint')}
 className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all border border-red-100"
 >
 <Flag size={16} />
 {t('propertyDetails.reportComplaint')}
 </button>
 </div>
 </div>

 {/* Safety Tips */}
 <div className="bg-[#F0F7FF] rounded-3xl p-8 border border-[#DAE9FA] text-center">
 <h4 className="font-bold text-[#0F3968] text-xl mb-4 flex items-center justify-center gap-2">
 <ShieldCheck size={24} className="text-[#0F3968]" />
 {t('propertyDetails.safetyTitle')}
 </h4>
 <ul className="space-y-3 text-[#2C5282] text-base font-medium inline-block text-end dir-rtl">
 <li className="flex items-center gap-3">
 <span className="w-2 h-2 bg-[#60A5FA] rounded-full flex-shrink-0"></span>
 {t('propertyDetails.safetyTip1')}
 </li>
 <li className="flex items-center gap-3">
 <span className="w-2 h-2 bg-[#60A5FA] rounded-full flex-shrink-0"></span>
 {t('propertyDetails.safetyTip2')}
 </li>
 <li className="flex items-center gap-3">
 <span className="w-2 h-2 bg-[#60A5FA] rounded-full flex-shrink-0"></span>
 {t('propertyDetails.safetyTip3')}
 </li>
 </ul>
 </div>
 </div>
 </div>
 </div>

 {/* Sticky Bottom Actions on Mobile */}
 <div className="fixed bottom-0 start-0 end-0 p-4 bg-white/95 backdrop-blur-md border-t border-gray-200 z-[90] lg:hidden flex gap-3 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] pb-[max(16px,env(safe-area-inset-bottom))]">
 <button className="flex-1 py-4 bg-[#47CCD0] hover:bg-[#3bbabb] text-white rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95">
 <Phone size={20} />
 {t('propertyDetails.call')}
 </button>
 <button className="flex-1 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95">
 <MessageCircle size={20} />
 {t('propertyDetails.whatsapp')}
 </button>
 </div>

 <FinanceEligibilityModal
 isOpen={isFinanceModalOpen}
 onClose={() => setIsFinanceModalOpen(false)}
 propertyPrice={property.price}
 />

 <ShareModal
 isOpen={isShareModalOpen}
 onClose={() => setIsShareModalOpen(false)}
 title={t('propertyDetails.shareTitle', { title: property.title })}
 url={window.location.href}
 />
 </div>
 );
};
