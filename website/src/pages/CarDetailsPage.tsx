import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
 MapPin,
 Calendar,
 Gauge,
 Clock,
 Share2,
 Heart,
 ChevronRight,
 ShieldCheck,
 FileCheck,
 AlertCircle,
 Gavel,
 BadgeCheck,
 ChevronLeft,
 ChevronDown,
 Info,
 Car,
 Fuel,
 Settings,
 PaintBucket,
 User,
 History,
 Download
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import carImage from 'figma:asset/5dd30e7381d1b49f967907db683426041b6073c3.png';
import { RiyalSymbol } from '../components/ui/RiyalSymbol';

interface CarDetailsPageProps {
 onNavigate?: (page: string) => void;
 car?: any;
 isLoggedIn?: boolean;
 onOpenLogin?: () => void;
}

export const CarDetailsPage: React.FC<CarDetailsPageProps> = ({ onNavigate, car: initialCar, isLoggedIn = false, onOpenLogin = () => {} }) => {
 const { t } = useTranslation();

 // Fallback mock data if no car is passed
 const defaultCar = {
 id: 1,
 title: t('carDetails.defaultCarTitle'),
 make: 'Toyota',
 model: 'Camry',
 year: 2023,
 odometer: 15000,
 location: t('carDetails.defaultCarLocation'),
 currentBid: 85000,
 images: [
 carImage,
 'https://images.unsplash.com/photo-1621007947382-bb3c3968e3bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHx0b3lvdGElMjBjYW1yeSUyMGludGVyaW9yfGVufDF8fHx8MTc2NjE1ODAwMHww&ixlib=rb-4.1.0&q=80&w=1080',
 'https://images.unsplash.com/photo-1592853625511-ad0edec7f94d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHx0b3lvdGElMjBjYW1yeSUyMHJlYXJ8ZW58MXx8fHwxNzY2MTU4MDAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
 'https://images.unsplash.com/photo-1625231364500-6d333d0623a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHx0b3lvdGElMjBjYW1yeSUyMHdoZWVsfGVufDF8fHx8MTc2NjE1ODAwMHww&ixlib=rb-4.1.0&q=80&w=1080'
 ],
 timeLeft: t('carDetails.defaultCarTimeLeft'),
 bidders: 12,
 status: t('carDetails.live'),
 description: t('carDetails.defaultCarDesc'),
 specs: {
 engine: '2.5L 4-Cylinder',
 transmission: t('carDetails.transmission8Auto'),
 fuel: t('carDetails.fuelGasoline'),
 drive: t('carDetails.driveFront'),
 color: t('carDetails.colorPearl'),
 interior: t('carDetails.interiorBeige'),
 cylinders: 4,
 regionalSpecs: t('carDetails.regionalSpecsSaudi')
 },
 condition: {
 body: t('carDetails.conditionBodyAgency'),
 engine: t('carDetails.conditionExcellent'),
 gear: t('carDetails.conditionExcellent'),
 ac: t('carDetails.conditionExcellent'),
 tires: t('carDetails.conditionNew')
 },
 report: {
 hasReport: true,
 reportId: 'CHK-8829102',
 date: '2024-01-10',
 score: '92/100'
 },
 seller: {
 name: t('carDetails.sellerName'),
 rating: 4.8,
 verified: true,
 location: t('carDetails.sellerLocation')
 }
 };

 const car = initialCar || defaultCar;
 const [activeImage, setActiveImage] = useState(0);
 const [bidAmount, setBidAmount] = useState<string>('');

 const images = car.images || [car.image];

 return (
 <div className="min-h-screen bg-gray-50 pt-36 pb-12">
 {/* Breadcrumbs */}
 <div className="max-w-7xl mx-auto px-4 mb-6">
 <div className="flex items-center gap-2 text-sm text-gray-500">
 <span
 className="hover:text-[#47CCD0] cursor-pointer transition-colors"
 onClick={() => onNavigate?.('home')}
 >
 {t('carDetails.home')}
 </span>
 <ChevronLeft size={14} />
 <span
 className="hover:text-[#47CCD0] cursor-pointer transition-colors"
 onClick={() => onNavigate?.('car-auctions')}
 >
 {t('carDetails.carAuctions')}
 </span>
 <ChevronLeft size={14} />
 <span className="font-bold text-gray-900 line-clamp-1">{car.title}</span>
 </div>
 </div>

 <div className="max-w-7xl mx-auto px-4">
 <div className="flex flex-col lg:flex-row gap-8">

 {/* --- Right Column (Main Content) --- */}
 <div className="flex-1 w-full lg:w-2/3 space-y-6">

 {/* Image Gallery */}
 <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
 <div className="relative h-[400px] md:h-[500px] bg-gray-100 group">
 <img
 src={images[activeImage]}
 alt={car.title}
 className="w-full h-full object-cover"
 />

 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

 {/* Navigation Arrows */}
 <button
 onClick={(e) => {
 e.stopPropagation();
 setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
 }}
 className="absolute start-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur text-gray-800 rounded-full flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100"
 >
 <ChevronLeft size={20} />
 </button>
 <button
 onClick={(e) => {
 e.stopPropagation();
 setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
 }}
 className="absolute end-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur text-gray-800 rounded-full flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100 rotate-180"
 >
 <ChevronLeft size={20} />
 </button>

 <div className="absolute top-4 end-4">
 <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-pulse">
 <span className="w-1.5 h-1.5 bg-white rounded-full" />
 {t('carDetails.live')}
 </span>
 </div>
 </div>

 {/* Thumbnails */}
 <div className="p-4 flex gap-3 overflow-x-auto pb-4 custom-scrollbar">
 {images.map((img: string, idx: number) => (
 <button
 key={idx}
 onClick={() => setActiveImage(idx)}
 className={`relative w-24 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-[#47CCD0] ring-2 ring-[#47CCD0]/20' : 'border-transparent opacity-70 hover:opacity-100'}`}
 >
 <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
 </button>
 ))}
 </div>
 </div>

 {/* Quick Stats & Title */}
 <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
 <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
 <div>
 <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{car.title}</h1>
 <p className="text-gray-500 flex items-center gap-2">
 {car.year} • {car.make} {car.model}
 </p>
 </div>
 <div className="flex items-center gap-3">
 <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors border border-gray-100">
 <Heart size={20} />
 </button>
 <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-[#47CCD0] hover:bg-teal-50 transition-colors border border-gray-100">
 <Share2 size={20} />
 </button>
 </div>
 </div>

 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
 <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
 <Gauge size={20} />
 </div>
 <div>
 <p className="text-xs text-gray-500 mb-0.5">{t('carDetails.odometer')}</p>
 <p className="font-bold text-gray-900" dir="ltr">{car.odometer?.toLocaleString()} km</p>
 </div>
 </div>
 <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
 <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
 <MapPin size={20} />
 </div>
 <div>
 <p className="text-xs text-gray-500 mb-0.5">{t('carDetails.location')}</p>
 <p className="font-bold text-gray-900">{car.location}</p>
 </div>
 </div>
 <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
 <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
 <BadgeCheck size={20} />
 </div>
 <div>
 <p className="text-xs text-gray-500 mb-0.5">{t('carDetails.specs')}</p>
 <p className="font-bold text-gray-900">{t('carDetails.saudi')}</p>
 </div>
 </div>
 <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
 <div className="p-2 bg-green-100 text-green-600 rounded-lg">
 <ShieldCheck size={20} />
 </div>
 <div>
 <p className="text-xs text-gray-500 mb-0.5">{t('carDetails.bodyCondition')}</p>
 <p className="font-bold text-gray-900">{t('carDetails.agency')}</p>
 </div>
 </div>
 </div>
 </div>

 {/* Main Details Tabs */}
 <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
 <div className="border-b border-gray-100">
 <div className="flex overflow-x-auto no-scrollbar">
 <button className="px-6 py-4 text-sm font-bold text-[#47CCD0] border-b-2 border-[#47CCD0]">{t('carDetails.overviewTab')}</button>
 <button className="px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">{t('carDetails.techSpecsTab')}</button>
 <button className="px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">{t('carDetails.inspectionTab')}</button>
 <button className="px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">{t('carDetails.historyTab')}</button>
 </div>
 </div>

 <div className="p-6 md:p-8">
 <h3 className="font-bold text-lg mb-4 text-gray-900">{t('carDetails.vehicleDescription')}</h3>
 <p className="text-gray-600 leading-relaxed mb-8 text-sm md:text-base">
 {car.description}
 </p>

 <h3 className="font-bold text-lg mb-4 text-gray-900">{t('carDetails.specsAndFeatures')}</h3>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
 <div className="flex justify-between border-b border-gray-50 pb-2">
 <span className="text-gray-500 flex items-center gap-2"><Car size={16} /> {t('carDetails.type')}</span>
 <span className="font-medium text-gray-900">{car.make}</span>
 </div>
 <div className="flex justify-between border-b border-gray-50 pb-2">
 <span className="text-gray-500 flex items-center gap-2"><Settings size={16} /> {t('carDetails.model')}</span>
 <span className="font-medium text-gray-900">{car.model}</span>
 </div>
 <div className="flex justify-between border-b border-gray-50 pb-2">
 <span className="text-gray-500 flex items-center gap-2"><Calendar size={16} /> {t('carDetails.year')}</span>
 <span className="font-medium text-gray-900">{car.year}</span>
 </div>
 <div className="flex justify-between border-b border-gray-50 pb-2">
 <span className="text-gray-500 flex items-center gap-2"><Fuel size={16} /> {t('carDetails.fuel')}</span>
 <span className="font-medium text-gray-900">{car.specs?.fuel}</span>
 </div>
 <div className="flex justify-between border-b border-gray-50 pb-2">
 <span className="text-gray-500 flex items-center gap-2"><Settings size={16} /> {t('carDetails.transmission')}</span>
 <span className="font-medium text-gray-900">{car.specs?.transmission}</span>
 </div>
 <div className="flex justify-between border-b border-gray-50 pb-2">
 <span className="text-gray-500 flex items-center gap-2"><PaintBucket size={16} /> {t('carDetails.exteriorColor')}</span>
 <span className="font-medium text-gray-900">{car.specs?.color}</span>
 </div>
 <div className="flex justify-between border-b border-gray-50 pb-2">
 <span className="text-gray-500 flex items-center gap-2"><User size={16} /> {t('carDetails.interiorColor')}</span>
 <span className="font-medium text-gray-900">{car.specs?.interior}</span>
 </div>
 <div className="flex justify-between border-b border-gray-50 pb-2">
 <span className="text-gray-500 flex items-center gap-2"><Gavel size={16} /> {t('carDetails.source')}</span>
 <span className="font-medium text-gray-900">{car.specs?.regionalSpecs}</span>
 </div>
 </div>

 {/* Condition Report Summary */}
 <div className="mt-10 p-5 bg-gray-50 rounded-xl border border-gray-200">
 <div className="flex items-center justify-between mb-4">
 <h4 className="font-bold text-gray-900 flex items-center gap-2">
 <FileCheck className="text-[#47CCD0]" size={20} />
 {t('carDetails.inspectionSummary')}
 </h4>
 <Button variant="outline" size="sm" className="text-xs h-8 gap-2">
 <Download size={14} />
 {t('carDetails.downloadFullReport')}
 </Button>
 </div>

 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 <div className="text-center p-3 bg-white rounded-lg border border-gray-100">
 <div className="text-xs text-gray-400 mb-1">{t('carDetails.engine')}</div>
 <div className="text-sm font-bold text-green-600">{car.condition?.engine}</div>
 </div>
 <div className="text-center p-3 bg-white rounded-lg border border-gray-100">
 <div className="text-xs text-gray-400 mb-1">{t('carDetails.gear')}</div>
 <div className="text-sm font-bold text-green-600">{car.condition?.gear}</div>
 </div>
 <div className="text-center p-3 bg-white rounded-lg border border-gray-100">
 <div className="text-xs text-gray-400 mb-1">{t('carDetails.body')}</div>
 <div className="text-sm font-bold text-blue-600">{car.condition?.body}</div>
 </div>
 <div className="text-center p-3 bg-white rounded-lg border border-gray-100">
 <div className="text-xs text-gray-400 mb-1">{t('carDetails.result')}</div>
 <div className="text-sm font-bold text-gray-900">{car.report?.score}</div>
 </div>
 </div>
 </div>
 </div>
 </div>

 </div>

 {/* --- Left Column (Sticky Sidebar) --- */}
 <div className="w-full lg:w-1/3">
 <div className="sticky top-28 space-y-6 max-h-[calc(100vh-8rem)] overflow-y-auto pb-6 custom-scrollbar">

 {/* Auction Action Card */}
 <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
 <div className="flex items-center justify-between mb-6">
 <div className="flex items-center gap-2 text-red-500 font-bold bg-red-50 px-3 py-1 rounded-full text-sm">
 <Clock size={16} />
 <span dir="ltr">{car.timeLeft}</span>
 </div>
 <div className="text-xs text-gray-400 font-medium">{t('carDetails.endingSoon')}</div>
 </div>

 <div className="mb-8">
 <div className="flex items-center gap-2 mb-2">
 <p className="text-xs text-gray-400 line-through decoration-red-400 flex items-center gap-1">{t('carDetails.openingPrice')} {(car.currentBid * 0.8).toLocaleString()} <RiyalSymbol className="w-2.5 h-2.5 text-gray-400" /></p>
 </div>
 <div className="flex items-center gap-2 mb-1">
 <p className="text-sm text-gray-500 font-bold">{t('carDetails.currentPrice')}</p>
 <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{t('carDetails.includesTax')}</span>
 </div>
 <div className="flex items-center gap-2 mt-2">
 <span className="text-4xl font-black text-gray-900 tracking-tight font-mono" dir="ltr">
 {car.currentBid.toLocaleString()}
 </span>
 <RiyalSymbol className="w-6 h-6 text-gray-600" />
 </div>
 <p className="text-xs text-gray-400 mt-3 flex items-center gap-1">
 <User size={12} /> {t('carDetails.biddersCount', { count: car.bidders })}
 </p>
 </div>

 <div className="space-y-4 mb-6">
 <div>
 <label className="text-sm font-medium text-gray-700 mb-2 block">{t('carDetails.bidAmount')}</label>
 <div className="relative">
 <input
 type="number"
 min="0"
 value={bidAmount}
 onChange={(e) => {
 let val = Number(e.target.value);
 if (val < 0) val = 0;
 setBidAmount(val ? val.toString() : '');
 }}
 placeholder={t('carDetails.bidPlaceholder', { amount: (car.currentBid + 1000).toLocaleString() })}
 className="w-full p-3 pe-4 ps-12 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#47CCD0] focus:ring-2 focus:ring-[#47CCD0]/10 outline-none transition-all font-bold text-lg"
 />
 <span className="absolute start-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium"><RiyalSymbol className="w-4 h-4" /></span>
 </div>
 </div>

 <div className="flex gap-2">
 {[1000, 2000, 5000].map(amount => (
 <button
 key={amount}
 onClick={() => setBidAmount((prev) => String((parseInt(prev || String(car.currentBid)) + amount)))}
 className="flex-1 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:border-[#47CCD0] hover:bg-teal-50 hover:text-[#47CCD0] transition-all"
 >
 +{amount.toLocaleString()}
 </button>
 ))}
 </div>
 </div>

 <Button
 onClick={() => {
 if (!isLoggedIn) {
 onOpenLogin();
 return;
 }
 }}
 className="w-full h-12 text-lg font-bold bg-[#1A1A1A] hover:bg-[#47CCD0] text-white shadow-lg hover:shadow-teal-500/20 transition-all mb-4"
 >
 {t('carDetails.bidNow')}
 </Button>

 <p className="text-center text-xs text-gray-400 mb-6">
 {t('carDetails.termsApply')}
 </p>

 <Separator className="my-6" />

 {/* Seller Info */}
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
 <Building2 size={20} />
 </div>
 <div>
 <p className="text-sm font-bold text-gray-900">{car.seller?.name}</p>
 <div className="flex items-center gap-1">
 <span className="text-xs text-yellow-500">★ {car.seller?.rating}</span>
 <span className="text-gray-300 text-[10px]">•</span>
 <span className="text-xs text-green-600 flex items-center gap-0.5"><ShieldCheck size={10} /> {t('carDetails.trusted')}</span>
 </div>
 </div>
 </div>
 </div>

 {/* Bid History */}
 <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
 <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
 <History size={18} className="text-[#47CCD0]" />
 {t('carDetails.bidHistory')}
 </h3>

 <div className="space-y-4 relative">
 {/* Vertical Line */}
 <div className="absolute top-2 bottom-2 end-[7px] w-0.5 bg-gray-100" />

 {[
 { userKey: 'bidUser1', timeKey: 'bidTime1', amount: 85000, active: true },
 { userKey: 'bidUser2', timeKey: 'bidTime2', amount: 84000, active: false },
 { userKey: 'bidUser3', timeKey: 'bidTime3', amount: 82500, active: false },
 ].map((bid, idx) => (
 <div key={idx} className="flex items-center justify-between relative z-10">
 <div className="flex items-center gap-3">
 <div className={`w-4 h-4 rounded-full border-2 ${bid.active ? 'bg-[#47CCD0] border-white ring-2 ring-[#47CCD0]/30' : 'bg-gray-200 border-white'}`} />
 <div>
 <p className={`text-sm ${bid.active ? 'font-bold text-gray-900' : 'font-medium text-gray-500'} flex items-center gap-1`}>
 {t(`carDetails.${bid.userKey}`)}
 <ShieldCheck size={10} className="text-[#47CCD0]" />
 </p>
 <p className="text-[10px] text-gray-400">{t(`carDetails.${bid.timeKey}`)}</p>
 </div>
 </div>
 <div className={`font-bold dir-ltr flex items-center gap-1 ${bid.active ? 'text-[#47CCD0]' : 'text-gray-400'}`}>
 {bid.amount.toLocaleString()} <RiyalSymbol className="w-3 h-3" />
 </div>
 </div>
 ))}
 </div>

 <button className="w-full mt-4 text-xs text-gray-500 hover:text-[#47CCD0] font-medium transition-colors">
 {t('carDetails.viewAllBids')}
 </button>
 </div>

 {/* Safety Tips */}
 <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
 <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
 <ShieldCheck size={18} className="text-[#47CCD0]" />
 {t('carDetails.safetyTips')}
 </h3>
 <ul className="space-y-3 text-xs text-gray-500 leading-relaxed list-disc list-inside marker:text-[#47CCD0]">
 <li>{t('carDetails.tip1')}</li>
 <li>{t('carDetails.tip2')}</li>
 <li>{t('carDetails.tip3')}</li>
 <li>{t('carDetails.tip4')}</li>
 </ul>
 </div>

 {/* Ad Info & Actions */}
 <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 space-y-4">
 {/* Ad Info */}
 <div className="flex items-center justify-between text-xs text-gray-500 pb-4 border-b border-gray-200">
 <div className="text-center flex-1 border-s border-gray-200 ps-2">
 <p className="mb-1 text-gray-400">{t('carDetails.adNumber')}</p>
 <p className="font-bold text-gray-900">105923</p>
 </div>
 <div className="text-center flex-1 pe-2">
 <p className="mb-1 text-gray-400">{t('carDetails.adDate')}</p>
 <p className="font-bold text-gray-900">2023/10/12</p>
 </div>
 </div>

 {/* Action Buttons */}
 <div className="grid grid-cols-2 gap-3">
 <button className="flex flex-col items-center justify-center gap-2 p-3 bg-white rounded-xl border border-gray-200 hover:border-red-200 hover:bg-red-50 hover:text-red-500 transition-all group">
 <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-red-100 flex items-center justify-center transition-colors">
 <Settings size={16} className="text-gray-500 group-hover:text-red-500" />
 </div>
 <span className="text-[10px] font-bold text-gray-600 group-hover:text-red-500">{t('carDetails.technicalIssue')}</span>
 </button>

 <button className="flex flex-col items-center justify-center gap-2 p-3 bg-white rounded-xl border border-gray-200 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500 transition-all group">
 <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-orange-100 flex items-center justify-center transition-colors">
 <FileCheck size={16} className="text-gray-500 group-hover:text-orange-500" />
 </div>
 <span className="text-[10px] font-bold text-gray-600 group-hover:text-orange-500">{t('carDetails.submitComplaint')}</span>
 </button>
 </div>
 </div>
 </div>

 </div>
 </div>
 </div>
 </div>
 );
};

// Icon component needed for seller section
function Building2({ size, className }: { size?: number, className?: string }) {
 return (
 <svg
 xmlns="http://www.w3.org/2000/svg"
 width={size}
 height={size}
 viewBox="0 0 24 24"
 fill="none"
 stroke="currentColor"
 strokeWidth="2"
 strokeLinecap="round"
 strokeLinejoin="round"
 className={className}
 >
 <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
 <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
 <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
 <path d="M10 6h4"/>
 <path d="M10 10h4"/>
 <path d="M10 14h4"/>
 <path d="M10 18h4"/>
 </svg>
 );
}
