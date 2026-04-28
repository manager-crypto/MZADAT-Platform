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
 Plus,
 Minus
} from 'lucide-react';
import { BackButton } from '../components/ui/BackButton';
import { RiyalSymbol } from '../components/ui/RiyalSymbol';

import { EscrowWalletModal } from '../components/compliance/EscrowWalletModal';

interface Auction {
 id: number;
 title: string;
 code: string;
 price: number; // Current Bid
 openingBid: number;
 deposit: number;
 address: string;
 location: string;
 specs: { beds: number; baths: number; area: number };
 type: string;
 image: string; // Main image or first image
 images?: string[]; // Gallery
 tags: string[];
 agent: {
 name: string;
 logo: string;
 verified: boolean;
 license: string;
 };
 featured: boolean;
 timeLeft: string;
 description?: string;
}

interface AuctionDetailsPageProps {
 onNavigate: (page: string) => void;
 auction?: Auction; // Optional prop if passed directly
}

export const AuctionDetailsPage: React.FC<AuctionDetailsPageProps> = ({ onNavigate, auction: initialAuction }) => {
 const { t } = useTranslation();

 // Fallback mock data if no auction is passed
 const defaultAuction = {
 id: 1,
 code: 'MZ-7658291',
 title: t('auctionDetails.defaultTitle'),
 price: 3500000, // Current Bid
 openingBid: 3500000,
 deposit: 100000,
 address: t('auctionDetails.defaultAddress'),
 location: t('auctionDetails.defaultAddress'),
 specs: { beds: 5, baths: 6, area: 450 },
 type: t('auctionDetails.defaultType'),
 image: 'https://images.unsplash.com/photo-1700085060165-1ac17cf08286?q=80&w=1080',
 tags: [
 t('auctionDetails.tagNew'),
 t('auctionDetails.tagFittedKitchen'),
 t('auctionDetails.tagCentralAC'),
 t('auctionDetails.tagPool'),
 ],
 agent: {
 name: t('auctionDetails.defaultAgentName'),
 logo: 'https://api.dicebear.com/7.x/initials/svg?seed=RE',
 verified: true,
 license: 'TM-01-00-41037-25'
 },
 featured: true,
 timeLeft: '2 d 16 h 13 m 21 s',
 description: t('auctionDetails.defaultDescription')
 };

 const auction = initialAuction ? {
 ...defaultAuction, // Fallback for missing fields in passed object
 ...initialAuction,
 // Map potential mismatching fields if auction object comes from listing page
 price: initialAuction.currentBid || initialAuction.price || defaultAuction.price,
 address: initialAuction.location || initialAuction.address || defaultAuction.address,
 timeLeft: initialAuction.timeLeft || defaultAuction.timeLeft
 } : defaultAuction;

 const [activeImage, setActiveImage] = useState(0);
 const [bidAmount, setBidAmount] = useState(auction.price);
 const [showEscrowModal, setShowEscrowModal] = useState(false);

 const handleIncreaseBid = () => setBidAmount((prev) => prev + 10000);
 const handleDecreaseBid = () => setBidAmount((prev) => Math.max(0, Math.max(auction.price, prev - 10000)));

 const handleBidSubmit = () => {
 setShowEscrowModal(true);
 };

 const handleEscrowConfirm = () => {
 alert(t('auctionDetails.bidSuccessAlert'));
 // Optionally reload data here
 };

 // Mock gallery images
 const gallery = auction.images || [
 auction.image,
 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1080',
 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1080',
 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1080',
 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=1080'
 ];

 const features = [
 { icon: <Car size={20} />, labelKey: 'auctionDetails.featureParking' },
 { icon: <Trees size={20} />, labelKey: 'auctionDetails.featureGarden' },
 { icon: <Wifi size={20} />, labelKey: 'auctionDetails.featureFiber' },
 { icon: <ShieldCheck size={20} />, labelKey: 'auctionDetails.featureSecurity' },
 { icon: <Building size={20} />, labelKey: 'auctionDetails.featureMaidRoom' },
 { icon: <CheckCircle2 size={20} />, labelKey: 'auctionDetails.featureWarranty' },
 ];

 return (
 <div className="min-h-screen bg-gray-50 pt-36 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
 <div className="container mx-auto px-4 max-w-7xl">
 {/* Breadcrumb & Back */}
 <div className="flex items-center justify-between mb-6">
 <div className="flex items-center gap-2 text-sm text-gray-500">
 <BackButton onClick={() => onNavigate('auctions')} label={t('auctionDetails.back')} />
 <span className="text-gray-300">/</span>
 <span>{t('auctionDetails.breadcrumbAuctions')}</span>
 <span>/</span>
 <span className="text-gray-900 font-bold line-clamp-1">{auction.title}</span>
 </div>

 <div className="flex gap-2">
 <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 transition-all">
 <Heart size={20} />
 </button>
 <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-500 transition-all">
 <Share2 size={20} />
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
 alt={auction.title}
 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
 />
 <div className="absolute top-4 end-4 flex gap-2 z-10">
 <span className="bg-[#47CCD0] text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg">{t('auctionDetails.liveAuction')}</span>
 {auction.featured && (
 <span className="bg-yellow-400 text-black px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1 shadow-lg">
 <Star size={14} fill="currentColor" /> {t('auctionDetails.featured')}
 </span>
 )}
 </div>

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
 {gallery.map((img: string, idx: number) => (
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
 <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-relaxed">{auction.title}</h1>
 <p className="text-gray-500 flex items-center gap-2">
 <MapPin size={18} className="text-[#47CCD0]" />
 {auction.address}
 </p>
 </div>
 <div className="text-start md:text-start rtl:text-end">
 <p className="text-3xl font-bold text-[#47CCD0] font-mono mb-1 flex items-center justify-end gap-1.5">
 {auction.price.toLocaleString()}
 <RiyalSymbol className="w-6 h-6 text-gray-600" />
 </p>
 <p className="text-xs text-gray-400">{t('auctionDetails.lastUpdated')}</p>
 </div>
 </div>

 {/* Key Specs */}
 {auction.specs && (
 <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-gray-100 mb-6">
 <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl">
 <Bed size={24} className="text-[#47CCD0] mb-2" />
 <span className="font-bold text-lg">{auction.specs.beds}</span>
 <span className="text-xs text-gray-500">{t('auctionDetails.beds')}</span>
 </div>
 <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl">
 <Bath size={24} className="text-[#47CCD0] mb-2" />
 <span className="font-bold text-lg">{auction.specs.baths}</span>
 <span className="text-xs text-gray-500">{t('auctionDetails.baths')}</span>
 </div>
 <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl">
 <Maximize size={24} className="text-[#47CCD0] mb-2" />
 <span className="font-bold text-lg">{auction.specs.area}</span>
 <span className="text-xs text-gray-500">{t('auctionDetails.sqm')}</span>
 </div>
 </div>
 )}

 <div className="space-y-6">
 <div>
 <h3 className="text-xl font-bold text-gray-900 mb-4">{t('auctionDetails.propertyDetails')}</h3>
 <p className="text-gray-600 leading-relaxed text-lg">
 {auction.description || t('auctionDetails.noDescription')}
 </p>
 </div>

 <div>
 <h3 className="text-xl font-bold text-gray-900 mb-4">{t('auctionDetails.featuresAndServices')}</h3>
 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
 {features.map((feature, idx) => (
 <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-[#47CCD0]/30 hover:bg-teal-50/50 transition-colors">
 <div className="text-[#47CCD0]">{feature.icon}</div>
 <span className="text-sm font-medium text-gray-700">{t(feature.labelKey)}</span>
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
 {t('auctionDetails.locationOnMap')}
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
 </div>

 {/* Sidebar */}
 <div className="lg:col-span-4 space-y-6">
 {/* Agent Card / Auction Bidding Card */}
 <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

 {/* Share Button (Top) */}
 <button className="w-full py-3 flex items-center justify-center gap-2 text-gray-500 hover:text-gray-900 transition-colors border-b border-gray-100">
 <Share2 size={18} />
 <span className="font-medium">{t('auctionDetails.share')}</span>
 </button>

 {/* Green Header - Countdown */}
 <div className="bg-[#47CCD0] text-white p-4 text-center relative overflow-hidden">
 <div className="relative z-10">
 <h3 className="font-bold text-lg mb-1">{t('auctionDetails.auctionEndsIn', { time: auction.timeLeft })}</h3>
 <p className="text-xs opacity-90">{t('auctionDetails.endTimeDisclaimer')}</p>
 </div>
 {/* Progress circle decoration */}
 <div className="absolute top-1/2 start-4 -translate-y-1/2 w-10 h-10 rounded-full border-4 border-white/30 border-t-white flex items-center justify-center"></div>
 </div>

 <div className="p-6 space-y-6">

 {/* Prices Row */}
 <div className="flex justify-between items-start">
 <div className="text-end">
 <p className="text-sm text-gray-500 mb-1">{t('auctionDetails.openingPrice')}</p>
 <p className="font-bold text-xl text-gray-900 flex items-center gap-1.5 font-mono">
 {auction.openingBid.toLocaleString()} <RiyalSymbol className="w-5 h-5 text-gray-600" />
 </p>
 </div>
 <div className="text-start rtl:text-start">
 <p className="text-sm text-gray-500 mb-1">{t('auctionDetails.deposit')}</p>
 <p className="font-bold text-xl text-gray-900 flex items-center gap-1.5 flex-row-reverse font-mono">
 <RiyalSymbol className="w-5 h-5 text-gray-600" /> {auction.deposit.toLocaleString()}
 </p>
 </div>
 </div>

 {/* Bidding Section */}
 <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
 <div className="flex justify-between items-center mb-3 text-sm">
 <span className="font-bold text-gray-900">{t('auctionDetails.submitFirstBid')}</span>
 <span className="text-gray-500 flex items-center gap-1 font-mono">
 <Info size={14} /> (10,000 <RiyalSymbol className="w-3 h-3" /> {t('auctionDetails.increment')})
 </span>
 </div>

 <div className="flex items-center gap-0 bg-white rounded-lg border border-gray-200 overflow-hidden h-12">
 <button onClick={handleIncreaseBid} className="w-12 h-full flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors border-s border-gray-200">
 <Plus size={20} />
 </button>
 <div className="flex-1 h-full flex items-center justify-center font-bold text-lg text-gray-900 dir-ltr">
 {bidAmount.toLocaleString()}
 </div>
 <button onClick={handleDecreaseBid} disabled={bidAmount <= auction.price} className="w-12 h-full flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors border-e border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
 <Minus size={20} />
 </button>
 </div>
 </div>

 {/* Register Button */}
 <button
 onClick={handleBidSubmit}
 className="w-full py-4 bg-[#47CCD0] hover:bg-[#3dbec2] text-white rounded-xl font-bold text-lg shadow-lg transition-all mb-3"
 >
 {t('auctionDetails.bidNow')}
 </button>
 <button
 onClick={() => onNavigate('registration-flow')}
 className="w-full py-4 bg-gray-900 hover:bg-black text-white rounded-xl font-bold text-lg shadow-lg shadow-gray-900/10 transition-all"
 >
 {t('auctionDetails.registerInAuction')}
 </button>

 {/* Breakdown */}
 <div className="space-y-3 pt-2">
 <div className="flex justify-between items-center text-xs text-gray-400">
 <span>({t('auctionDetails.vat15')})</span>
 <span className="font-bold flex items-center gap-1 font-mono">453,562.50 <RiyalSymbol className="w-3 h-3" /></span>
 </div>
 <div className="flex justify-between items-center text-sm">
 <span className="text-gray-600">{t('auctionDetails.pricePerSqm')}</span>
 <span className="font-bold text-gray-900 flex items-center gap-1">1,263.40 <RiyalSymbol className="w-4 h-4" /></span>
 </div>
 <div className="flex justify-between items-center text-sm">
 <span className="text-gray-600">{t('auctionDetails.commission25')}</span>
 <span className="font-bold text-gray-900 flex items-center gap-1">73,750.00 <RiyalSymbol className="w-4 h-4" /></span>
 </div>
 <div className="h-px bg-gray-100 my-2 border-t border-dashed border-gray-300"></div>
 <div className="flex justify-between items-center text-lg">
 <span className="font-bold text-gray-900">{t('auctionDetails.total')}</span>
 <span className="font-bold text-gray-900 flex items-center gap-1">3,023,750 <RiyalSymbol className="w-5 h-5" /></span>
 </div>
 </div>

 {/* Agent Info */}
 <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
 <div className="w-12 h-12 rounded-lg border border-gray-200 p-1 flex items-center justify-center bg-gray-50">
 <img src={auction.agent.logo} alt="Agent" className="w-full h-full object-contain" />
 </div>
 <div>
 <span className="text-[10px] text-gray-500 border border-gray-200 px-2 py-0.5 rounded-md inline-block mb-1">{t('auctionDetails.sellingAgent')}</span>
 <p className="font-bold text-gray-900 text-sm">{auction.agent.name}</p>
 <p className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
 <Info size={10} /> {t('auctionDetails.falLicenseNo')} {auction.agent.license}
 </p>
 <p className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
 <Info size={10} /> {t('auctionDetails.auctionLicenseNo')} 7200012345
 </p>
 </div>
 </div>

 {/* Contact Buttons */}
 <div className="grid grid-cols-2 gap-3">
 <button className="py-3 bg-teal-50 text-[#47CCD0] rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-teal-100 transition-colors">
 <MessageCircle size={18} />
 {t('auctionDetails.whatsapp')}
 </button>
 <button className="py-3 bg-gray-100 text-gray-700 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
 <Phone size={18} />
 {t('auctionDetails.call')}
 </button>
 </div>

 </div>
 </div>

 {/* Safety Tips */}
 <div className="sticky top-24 space-y-6">
 {/* Safety Tips */}
 <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100 overflow-y-auto max-h-60">
 <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
 <ShieldCheck size={20} />
 {t('auctionDetails.safetyTipsTitle')}
 </h4>
 <ul className="text-sm text-blue-800 space-y-2 list-disc list-inside px-2">
 <li>{t('auctionDetails.safetyTip1')}</li>
 <li>{t('auctionDetails.safetyTip2')}</li>
 <li>{t('auctionDetails.safetyTip3')}</li>
 </ul>
 </div>
 {/* Ad Info & Reports */}
 <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
 <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
 <div className="text-center flex-1 border-s border-gray-100">
 <p className="text-xs text-gray-500 mb-1 flex items-center justify-center gap-1">
 <Hash size={14} /> {t('auctionDetails.adNumber')}
 </p>
 <p className="font-bold text-gray-900 font-mono text-lg">{auction.code.replace('MZ-', '')}</p>
 </div>
 <div className="text-center flex-1">
 <p className="text-xs text-gray-500 mb-1 flex items-center justify-center gap-1">
 <Calendar size={14} /> {t('auctionDetails.adDate')}
 </p>
 <p className="font-bold text-gray-900">2023/12/14</p>
 </div>
 </div>

 <div className="space-y-3">
 <button
 onClick={() => onNavigate('report-ad-issue')}
 className="w-full py-3 bg-[#F9FAFB] hover:bg-gray-100 text-gray-900 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all border border-gray-100"
 >
 <span>{t('auctionDetails.reportTechnicalIssue')}</span>
 <AlertTriangle size={16} className="text-orange-500" />
 </button>
 <button
 onClick={() => onNavigate('report-complaint')}
 className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all border border-red-100"
 >
 <Flag size={16} />
 {t('auctionDetails.reportAbuse')}
 </button>
 </div>
 </div>
 </div>
 {/* End Sidebar */}
 </div>
 </div>
 </div>

 {/* Sticky Bottom Actions on Mobile */}
 <div className="fixed bottom-0 start-0 end-0 p-4 bg-white/95 backdrop-blur-md border-t border-gray-200 z-[90] lg:hidden flex gap-3 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] pb-[max(16px,env(safe-area-inset-bottom))]">
 <button
 onClick={handleBidSubmit}
 className="flex-1 py-4 bg-[#47CCD0] hover:bg-[#3bbabb] text-white rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
 >
 {t('auctionDetails.addBid', { amount: bidAmount.toLocaleString() })} <RiyalSymbol className="w-4 h-4 text-white inline-block" theme="light" />
 </button>
 </div>

 <EscrowWalletModal
 isOpen={showEscrowModal}
 onClose={() => setShowEscrowModal(false)}
 bidAmount={bidAmount}
 auctionId={auction.code}
 onConfirm={handleEscrowConfirm}
 />
 </div>
 );
};
