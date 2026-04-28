import React, { useState } from 'react';
import { 
 Share2, 
 Heart, 
 MapPin, 
 Star, 
 Users, 
 BedDouble, 
 Bath, 
 Wifi, 
 Car, 
 Coffee, 
 Tv, 
 ChefHat, 
 Wind, 
 CheckCircle2, 
 Calendar as CalendarIcon, 
 Clock, 
 ShieldCheck, 
 Info,
 ChevronLeft,
 ChevronRight,
 Flame,
 Waves,
 Map as MapIcon,
 Flag,
 AlertTriangle,
 Hash
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RiyalSymbol } from '../ui/RiyalSymbol';
import { ShareModal } from '../common/ShareModal';
import { BackButton } from '../ui/BackButton';
import { useTranslation } from 'react-i18next';

interface DailyRentPageProps {
 onBack: () => void;
 onNavigate: (page: string) => void;
}

export const DailyRentPage = ({ onBack, onNavigate }: DailyRentPageProps) => {
 const { t } = useTranslation();
 const [activeImage, setActiveImage] = useState(0);
 const [selectedDate, setSelectedDate] = useState<string | null>(null);
 const [guests, setGuests] = useState(2);
 const [isShareModalOpen, setIsShareModalOpen] = useState(false);

 const property = {
 title: t('dailyRentPage.title'),
 description: t('dailyRentPage.desc'),
 rating: 4.8,
 reviews: 124,
 location: t('dailyRentPage.location'),
 host: {
 name: t('dailyRentPage.hostName'),
 image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
 joined: '2021',
 responseRate: '100%'
 },
 images: [
 'https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?q=80&w=1080',
 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1080',
 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1080',
 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1080',
 'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?q=80&w=1080'
 ],
 amenities: [
 { icon: <Waves size={20} />, name: t('dailyRent.feat5') },
 { icon: <Wifi size={20} />, name: t('dailyRentPage.wifi') },
 { icon: <Car size={20} />, name: t('dailyRentPage.parking') },
 { icon: <Coffee size={20} />, name: t('dailyRentPage.coffee') },
 { icon: <Tv size={20} />, name: t('dailyRentPage.cinema') },
 { icon: <ChefHat size={20} />, name: t('dailyRent.feat15') },
 { icon: <Wind size={20} />, name: t('dailyRentPage.ac') },
 { icon: <Flame size={20} />, name: t('dailyRentPage.firepit') }
 ],
 prices: {
 weekday: 850,
 weekend: 1200,
 securityDeposit: 500
 },
 rules: [
 t('dailyRentPage.rule1'),
 t('dailyRentPage.rule2'),
 t('dailyRentPage.rule3'),
 t('dailyRentPage.rule4')
 ]
 };

 const dates = Array.from({ length: 14 }, (_, i) => {
 const d = new Date();
 d.setDate(d.getDate() + i);
 return {
 date: d,
 price: d.getDay() === 5 || d.getDay() === 6 ? property.prices.weekend : property.prices.weekday,
 available: Math.random() > 0.3
 };
 });

 return (
 <div className="min-h-screen bg-gray-50 pt-36 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
 <div className="container mx-auto px-4 max-w-7xl">
 
 {/* Header */}
 <div className="flex flex-col gap-4 mb-6">
 <div className="flex items-center gap-2 text-sm text-gray-500">
 <BackButton onClick={onBack} label={t('dailyRentPage.back')} />
 <span className="text-gray-300">/</span>
 <span>{t('dailyRent.dailyRentInclusive')}</span>
 <span>/</span>
 <span className="text-gray-900 font-bold">{property.title}</span>
 </div>

 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div>
 <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
 <div className="flex items-center gap-4 text-sm text-gray-500">
 <span className="flex items-center gap-1">
 <Star size={16} className="text-yellow-400 fill-yellow-400" />
 <span className="font-bold text-gray-900">{property.rating}</span>
 <span className="underline cursor-pointer">({property.reviews} {t('dailyRentPage.reviews')})</span>
 </span>
 <span className="flex items-center gap-1">
 <MapPin size={16} />
 {property.location}
 </span>
 </div>
 </div>
 
 <div className="flex gap-2">
 <button 
 onClick={() => setIsShareModalOpen(true)}
 className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-700 font-medium transition-all"
 >
 <Share2 size={18} />
 {t('directSales.share')}
 </button>
 <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-red-50 hover:text-red-500 hover:border-red-200 text-gray-700 font-medium transition-all group">
 <Heart size={18} className="group-hover:fill-red-500 transition-colors" />
 {t('dailyRentPage.save')}
 </button>
 </div>
 </div>
 </div>

 {/* Gallery */}
 <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-8 relative group">
 <div className="md:col-span-2 h-full relative">
 <motion.img 
 key={activeImage}
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ duration: 0.5 }}
 whileHover={{ scale: 1.05, transition: { duration: 0.7 } }}
 src={property.images[activeImage]} 
 alt="Main" 
 className="w-full h-full object-cover cursor-pointer"
 onClick={() => setActiveImage(0)}
 />
 <div className="absolute top-4 end-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1">
 <Star size={12} className="text-yellow-500 fill-yellow-500" />
 {t('dailyRentPage.superhost')}
 </div>
 </div>
 <div className="hidden md:grid grid-cols-2 col-span-2 gap-4 h-full">
 {property.images.slice(1).map((img, idx) => (
 <div key={idx} className="relative overflow-hidden rounded-none first:rounded-se-none last:rounded-ee-none">
 <motion.img 
 initial={{ opacity: 0 }}
 animate={{ opacity: activeImage === idx + 1 ? 1 : 0.7 }}
 whileHover={{ scale: 1.1, opacity: 1 }}
 transition={{ duration: 0.3 }}
 src={img} 
 alt={`Gallery ${idx}`} 
 loading="lazy"
 className={`w-full h-full object-cover cursor-pointer ${activeImage === idx + 1 ? 'ring-4 ring-[#47CCD0] ring-inset' : ''}`}
 onClick={() => setActiveImage(idx + 1)}
 onError={(e) => {
 e.currentTarget.src = "https://images.unsplash.com/photo-1719687384656-07e524f9797e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNvcnQlMjByb29tJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcwMTQyMTI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
 }}
 />
 </div>
 ))}
 </div>
 <button className="absolute bottom-4 start-4 bg-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg flex items-center gap-2 hover:bg-gray-50 transition-colors">
 <Users size={16} />
 {t('dailyRentPage.showAllPhotos')}
 </button>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
 
 {/* Main Info */}
 <div className="lg:col-span-8 space-y-8">
 
 {/* Quick Stats */}
 <div className="flex items-center justify-between py-6 border-b border-gray-100">
 <div>
 <h2 className="text-xl font-bold text-gray-900 mb-1">{t('dailyRentPage.hostTitle', { name: property.host.name })}</h2>
 <p className="text-gray-500 text-sm">
 {t('dailyRentPage.hostStats')}
 </p>
 </div>
 <img src={property.host.image} alt={property.host.name} className="w-14 h-14 rounded-full border-2 border-white shadow-sm" />
 </div>

 {/* Description */}
 <div className="space-y-4">
 <h3 className="font-bold text-gray-900 text-lg">{t('dailyRentPage.aboutPlace')}</h3>
 <p className="text-gray-600 leading-relaxed">
 {property.description}
 </p>
 </div>

 {/* Amenities */}
 <div className="space-y-4 py-6 border-t border-b border-gray-100">
 <h3 className="font-bold text-gray-900 text-lg">{t('dailyRentPage.amenities')}</h3>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 {property.amenities.map((item, idx) => (
 <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
 <div className="text-gray-600">{item.icon}</div>
 <span className="text-sm font-medium text-gray-700">{item.name}</span>
 </div>
 ))}
 </div>
 </div>

 {/* Rules */}
 <div className="space-y-4">
 <h3 className="font-bold text-gray-900 text-lg">{t('dailyRentPage.thingsToKnow')}</h3>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 
 <div className="space-y-2">
 <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
 <Clock size={16} />
 {t('dailyRentPage.checkInOut')}
 </h4>
 <div className="text-sm text-gray-500 space-y-1">
 <p>{t('dailyRentPage.checkIn')}</p>
 <p>{t('dailyRentPage.checkOut')}</p>
 </div>
 </div>

 <div className="space-y-2">
 <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
 <ShieldCheck size={16} />
 {t('dailyRentPage.depositTerms')}
 </h4>
 <div className="text-sm text-gray-500 space-y-1">
 <p className="flex items-center gap-1">{t('dailyRentPage.depositAmount')} {property.prices.securityDeposit} <RiyalSymbol className="w-2.5 h-2.5 text-gray-500" /></p>
 <p>{t('dailyRentPage.depositRefund')}</p>
 </div>
 </div>

 <div className="space-y-2">
 <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
 <Info size={16} />
 {t('dailyRentPage.houseRules')}
 </h4>
 <div className="text-sm text-gray-500 space-y-1">
 <p>{t('dailyRentPage.familiesOnly')}</p>
 <p>{t('dailyRentPage.noSmoking')}</p>
 </div>
 </div>

 </div>
 </div>
 
 {/* Reviews Summary */}
 <div className="py-6 border-b border-gray-100">
 <h3 className="font-bold text-gray-900 text-lg mb-4">{t('dailyRentPage.reviewsSection')}</h3>
 <div className="flex items-center gap-4 mb-4">
 <div className="text-4xl font-bold text-gray-900">4.8</div>
 <div className="flex flex-col">
 <div className="flex text-yellow-400">
 {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
 </div>
 <span className="text-sm text-gray-500">124 {t('dailyRentPage.reviews')}</span>
 </div>
 </div>
 {/* Review Items */}
 <div className="space-y-4">
 <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
 <div className="flex items-center justify-between mb-2">
 <span className="font-bold text-sm text-gray-900">{t('dailyRentPage.reviewer1')}</span>
 <span className="text-xs text-gray-400">{t('dailyRentPage.time1')}</span>
 </div>
 <p className="text-gray-600 text-sm leading-relaxed">{t('dailyRentPage.reviewText1')}</p>
 </div>
 <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
 <div className="flex items-center justify-between mb-2">
 <span className="font-bold text-sm text-gray-900">{t('dailyRentPage.reviewer2')}</span>
 <span className="text-xs text-gray-400">{t('dailyRentPage.time2')}</span>
 </div>
 <p className="text-gray-600 text-sm leading-relaxed">{t('dailyRentPage.reviewText2')}</p>
 </div>
 </div>
 </div>

 {/* Map Section */}
 <div className="py-6">
 <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
 <MapIcon size={20} className="text-[#47CCD0]" />
 {t('citySale.map')}
 </h3>
 <div className="h-[300px] bg-gray-100 rounded-2xl overflow-hidden relative border border-gray-200">
 <iframe 
 width="100%" 
 height="100%" 
 frameBorder="0" 
 scrolling="no" 
 title="Location"
 src="https://maps.google.com/maps?width=100%25&height=600&hl=ar&q=Riyadh%20Al%20Arid&t=&z=14&ie=UTF8&iwloc=B&output=embed"
 className="w-full h-full grayscale-[20%]"
 ></iframe>
 </div>
 <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
 <MapPin size={14} />
 {t('dailyRentPage.mapDesc')}
 </p>
 </div>
 
 </div>

 {/* Booking Card */}
 <div className="lg:col-span-4">
 <div className="sticky top-24 space-y-6">
 <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-6">
 <div className="flex items-end justify-between mb-6">
 <div>
 <p className="text-sm text-gray-500 line-through mb-0.5 flex items-center gap-1">{(selectedDate ? (property.prices.weekend * 1.2) : (property.prices.weekday * 1.2)).toLocaleString()} <RiyalSymbol className="w-3 h-3 text-gray-500" /></p>
 <p className="flex items-center gap-1.5 text-2xl font-bold text-[#47CCD0] font-mono tracking-tight">
 {selectedDate ? (new Date(selectedDate).getDay() === 5 || new Date(selectedDate).getDay() === 6 ? property.prices.weekend : property.prices.weekday) : property.prices.weekday}
 <RiyalSymbol className="w-5 h-5 text-gray-700" />
 <span className="text-sm font-normal text-gray-500 font-sans me-1">/ {t('dailyRent.day')}</span>
 </p>
 </div>
 <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
 <CheckCircle2 size={12} />
 {t('dailyRentPage.bestPrice')}
 </div>
 </div>

 {/* Date Selection */}
 <div className="border border-gray-200 rounded-2xl overflow-hidden mb-4">
 <div className="grid grid-cols-2 divide-x divide-x-reverse divide-gray-200 border-b border-gray-200">
 <div className="p-3 bg-gray-50">
 <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">{t('dailyRentPage.checkInDate')}</label>
 <input type="date" className="w-full bg-transparent text-sm font-bold outline-none" />
 </div>
 <div className="p-3 bg-gray-50">
 <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">{t('dailyRentPage.checkOutDate')}</label>
 <input type="date" className="w-full bg-transparent text-sm font-bold outline-none" />
 </div>
 </div>
 <div className="p-3 relative">
 <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">{t('dailyRentPage.guests')}</label>
 <div className="flex items-center justify-between">
 <span className="text-sm font-bold text-gray-900">{guests} {t('dailyRentPage.guestsNum')}</span>
 <div className="flex items-center gap-2">
 <button onClick={() => setGuests(Math.max(1, guests - 1))} disabled={guests <= 1} className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">-</button>
 <button onClick={() => setGuests(guests + 1)} className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">+</button>
 </div>
 </div>
 </div>
 </div>

 {/* Calendar Preview */}
 <div className="mb-6">
 <p className="text-sm font-bold text-gray-900 mb-2">{t('dailyRentPage.availableSoon')}</p>
 <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
 {dates.map((d, i) => (
 <button
 key={i}
 disabled={!d.available}
 onClick={() => d.available && setSelectedDate(d.date.toISOString())}
 className={`flex-shrink-0 w-14 h-20 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
 selectedDate === d.date.toISOString() 
 ? 'border-[#47CCD0] bg-teal-50 text-[#47CCD0]' 
 : !d.available 
 ? 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed' 
 : 'border-gray-200 hover:border-gray-300'
 }`}
 >
 <span className="text-[10px]">{d.date.toLocaleDateString(t('locale', 'ar-SA'), { weekday: 'short' })}</span>
 <span className="font-bold text-lg">{d.date.getDate()}</span>
 <span className="text-[10px] opacity-70">{d.price}</span>
 </button>
 ))}
 </div>
 </div>

 <button 
 onClick={() => onNavigate('booking')}
 className="w-full py-4 bg-[#47CCD0] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all mb-4"
 >
 {t('dailyRent.bookNow')}
 </button>

 <div className="text-center">
 <p className="text-xs text-gray-500 mb-2">{t('dailyRentPage.noCharge')}</p>
 <div className="flex justify-between text-sm text-gray-600 py-1">
 <span className="underline">{t('dailyRentPage.rentPrice')}</span>
 <span className="flex items-center gap-1">{selectedDate ? (new Date(selectedDate).getDay() === 5 || new Date(selectedDate).getDay() === 6 ? property.prices.weekend : property.prices.weekday) : property.prices.weekday} <RiyalSymbol className="w-2.5 h-2.5 text-gray-500" /></span>
 </div>
 <div className="flex justify-between text-sm text-gray-600 py-1">
 <span className="underline">{t('dailyRentPage.serviceFee')}</span>
 <span className="flex items-center gap-1">50 <RiyalSymbol className="w-2.5 h-2.5 text-gray-500" /></span>
 </div>
 <div className="h-px bg-gray-200 my-3" />
 <div className="flex justify-between font-bold text-gray-900">
 <span>{t('dailyRentPage.total')}</span>
 <span className="flex items-center gap-1">{(selectedDate ? (new Date(selectedDate).getDay() === 5 || new Date(selectedDate).getDay() === 6 ? property.prices.weekend : property.prices.weekday) : property.prices.weekday) + 50} <RiyalSymbol className="w-2.5 h-2.5 text-gray-500" /></span>
 </div>
 </div>

 </div>

 {/* Ad Number Card */}
 <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
 <div className="flex items-center justify-between mb-6">
 <div className="text-center flex-1 border-s border-gray-100">
 <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
 <Hash size={14} />
 <span className="text-xs">{t('directSales.adNumber')}</span>
 </div>
 <div className="font-bold text-gray-900">7658291</div>
 </div>
 <div className="text-center flex-1">
 <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
 <CalendarIcon size={14} />
 <span className="text-xs">{t('dailyRentPage.adDate')}</span>
 </div>
 <div className="font-bold text-gray-900">2023/12/14</div>
 </div>
 </div>
 <div className="space-y-3">
 <button className="w-full py-3 bg-gray-50 text-gray-700 rounded-xl text-sm font-bold border border-gray-100 hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
 <AlertTriangle size={16} className="text-orange-500" />
 {t('dailyRentPage.reportTechIssue')}
 </button>
 <button className="w-full py-3 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100 hover:bg-red-100 transition-all flex items-center justify-center gap-2">
 <Flag size={16} />
 {t('dailyRentPage.sendComplaint')}
 </button>
 </div>
 </div>

 {/* Safety Tips Card */}
 <div className="bg-blue-50 rounded-3xl border border-blue-100 p-6">
 <h3 className="font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
 <ShieldCheck size={20} className="text-blue-600" />
 {t('directSales.safetyTips')}
 </h3>
 <ul className="space-y-3">
 <li className="flex items-start gap-2 text-sm text-gray-700">
 <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
 {t('directSales.tip1')}
 </li>
 <li className="flex items-start gap-2 text-sm text-gray-700">
 <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
 {t('directSales.tip2')}
 </li>
 <li className="flex items-start gap-2 text-sm text-gray-700">
 <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
 {t('directSales.tip3')}
 </li>
 </ul>
 </div>

 </div>
 </div>

 </div>

 <ShareModal
 isOpen={isShareModalOpen}
 onClose={() => setIsShareModalOpen(false)}
 title={property.title}
 url={window.location.href}
 />
 
 </div>
 </div>
 );
};
