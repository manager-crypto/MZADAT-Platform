import React, { useState, useEffect } from 'react';
import headerLogoImage from 'figma:asset/70a549db43a3294ca041bd716e8022066cbe43be.png';
import headerLogoScrolledImage from 'figma:asset/70a549db43a3294ca041bd716e8022066cbe43be.png';
import appImage from 'figma:asset/0e3bd9719da3ae2f4de946454f9c3824f61ed6e4.png';
import supportIcon from 'figma:asset/f38856eeafacefa5cb99fce66e6ce3244c3789df.png';
import { 
 Menu, 
 X, 
 ChevronDown, 
 User, 
 Phone, 
 Calendar, 
 Clock, 
 HelpCircle, 
 MessageCircle,
 Smartphone,
 Plus,
 Gavel,
 Home,
 Building2,
 Globe,
 LayoutGrid,
 LayoutDashboard,
 ChevronLeft,
 FileText,
 Languages,
 Info,
 Home as HomeIcon,
 Fingerprint,
 Tag,
 Key,
 Facebook,
 Instagram,
 Linkedin,
 Youtube,
 Settings,
 Wallet,
 BookOpen,
 Briefcase,
 Car,
 Package,
 ScanFace,
 Star,
 Grid,
 LogOut
} from 'lucide-react';
import { BiddingIcon } from '../icons/BiddingIcon';
import { XIcon } from '../icons/XIcon';
import { SnapchatIcon } from '../icons/SnapchatIcon';

import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
 onNavigate: (page: string) => void;
 lang: string;
 toggleLanguage: () => void;
 onOpenLogin: () => void;
 isLoggedIn?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, lang, toggleLanguage, onOpenLogin, isLoggedIn }) => {
 // Force HMR invalidation comment v2
 const location = useLocation();
 const routerNavigate = useNavigate();
 const { t } = useTranslation();
 
 const currentPage = location.pathname.substring(1) || 'home';
 const [scrolled, setScrolled] = useState(false);
 const [isWasataOpen, setIsWasataOpen] = useState(false);
 const [isAuctionsOpen, setIsAuctionsOpen] = useState(false);
 const [isDirectSalesOpen, setIsDirectSalesOpen] = useState(false);
 const [isMoreOpen, setIsMoreOpen] = useState(false);
 const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
 const [isUserDirectSalesOpen, setIsUserDirectSalesOpen] = useState(false);
 const [isUserAuctionsOpen, setIsUserAuctionsOpen] = useState(false);
 const [isUserWasataOpen, setIsUserWasataOpen] = useState(false);
 const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
 
 // Mobile Menu State
 const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 const [isMobile, setIsMobile] = useState(() => {
 if (typeof window === 'undefined') return false;
 return !window.matchMedia('(min-width: 1024px)').matches;
 });
 useEffect(() => {
 const mq = window.matchMedia('(min-width: 1024px)');
 const onChange = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(!e.matches);
 onChange(mq);
 mq.addEventListener('change', onChange);
 return () => mq.removeEventListener('change', onChange);
 }, []);
 const [activeWasataTab, setActiveWasataTab] = useState('residential-sale');

 // Handle Language Switch
 const switchToEnglish = () => {
 toggleLanguage();
 };

 const cityImages = {
 riyadh: "https://images.unsplash.com/photo-1663900108404-a05e8bf82cda?q=80&w=1080",
 jeddah: "https://images.unsplash.com/photo-1622274421175-87b87bde7fca?q=80&w=1080",
 makkah: "https://images.unsplash.com/photo-1635829582812-62c17e5710c0?q=80&w=1080",
 madinah: "https://images.unsplash.com/photo-1738762101661-fc109403dc06?q=80&w=1080"
 };

 useEffect(() => {
 const handleScroll = () => setScrolled(window.scrollY > 50);
 window.addEventListener('scroll', handleScroll);
 return () => window.removeEventListener('scroll', handleScroll);
 }, []);

 // Prevent body scroll when mobile menu is open
 useEffect(() => {
 if (isMobileMenuOpen) {
 document.body.style.overflow = 'hidden';
 } else {
 document.body.style.overflow = 'unset';
 }
 return () => {
 document.body.style.overflow = 'unset';
 };
 }, [isMobileMenuOpen]);

 return (
 <div>
 {/* --- MAIN NAVIGATION --- */}
 <nav className={`fixed z-50 transition-all duration-300 ${
 scrolled || currentPage !== 'home'
 ? 'top-0 start-0 end-0 w-full rounded-none lg:start-auto lg:end-auto lg:left-1/2 lg:-translate-x-1/2 lg:top-4 lg:w-[95%] lg:max-w-[1440px] lg:rounded-full bg-[#0B1118]/80 lg:bg-[#2B3D50]/95 backdrop-blur-[15px] lg:backdrop-blur-xl shadow-lg py-3 md:py-4 text-white'
 : 'top-0 start-0 end-0 w-full rounded-none lg:start-auto lg:end-auto lg:left-1/2 lg:-translate-x-1/2 lg:top-8 lg:w-[95%] lg:max-w-[1440px] lg:rounded-full bg-[#0B1118]/60 lg:bg-white/10 backdrop-blur-[15px] lg:backdrop-blur-lg lg:border lg:border-white/10 py-3 md:py-5 text-white'
 }`}>
 <div className="w-full h-full px-4 md:px-10 flex items-center justify-between gap-4 lg:gap-6">

 {/* Logo */}
 <div className="flex items-center cursor-pointer flex-shrink-0" onClick={() => onNavigate('home')}>
 <img
 src={headerLogoImage}
 alt="Mzadat Logo"
 className="h-14 md:h-18 w-auto object-contain"
 />
 </div>

 {/* Desktop Nav Items - centered */}
 <div className="hidden lg:flex items-center gap-6 xl:gap-8 font-medium text-sm flex-1 justify-center">
 
 {/* Wasata Dropdown */}
 <div 
 className="relative group"
 onMouseEnter={() => setIsWasataOpen(true)}
 onMouseLeave={() => setIsWasataOpen(false)}
 >
 <button 
 className={`flex items-center gap-1 hover:text-[#47CCD0] transition-colors text-white`}
 onClick={() => setIsWasataOpen(!isWasataOpen)}
 >
 {t('header.wasata')} <ChevronDown size={14} />
 </button>
 <div
 className={`absolute top-full start-0 mt-2 w-[900px] bg-white rounded-2xl shadow-xl border border-gray-100 transform transition-all duration-75 origin-top-start overflow-hidden z-[60] ${
 isWasataOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'
 }`}
 >
 <div className="flex min-h-[460px]">
 {/* Right Side: Menu */}
 <div className="w-[280px] flex-shrink-0 p-4 border-s border-gray-100 flex flex-col gap-6 bg-white z-10 text-gray-900">
 {/* Residential */}
 <div>
 <h3 className="font-bold text-gray-900 px-3 mb-2 text-base">{t('headerDrop.residential')}</h3>
 <div className="space-y-1">
 <button
 onMouseEnter={() => setActiveWasataTab('residential-sale')}
 onClick={() => { onNavigate('real-estate-for-sale'); setIsWasataOpen(false); }}
 className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group text-start ${activeWasataTab === 'residential-sale' ? 'bg-[#F8FAFB]' : 'hover:bg-gray-50'}`}
 >
 <Tag size={18} className={`shrink-0 transition-colors ${activeWasataTab === 'residential-sale' ? 'text-[#47CCD0]' : 'text-gray-400'}`} />
 <div>
 <div className={`font-bold text-sm transition-colors ${activeWasataTab === 'residential-sale' ? 'text-[#47CCD0]' : 'text-gray-900'}`}>{t('headerDrop.forSale')}</div>
 <div className={`text-[11px] mt-0.5 transition-colors ${activeWasataTab === 'residential-sale' ? 'text-[#47CCD0]/70' : 'text-gray-400'}`}>{t('headerDrop.forSaleDesc')}</div>
 </div>
 </button>

 <button
 onClick={() => { onNavigate('real-estate-for-rent'); setIsWasataOpen(false); }}
 onMouseEnter={() => setActiveWasataTab('residential-rent')}
 className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group text-start ${activeWasataTab === 'residential-rent' ? 'bg-[#F8FAFB]' : 'hover:bg-gray-50'}`}
 >
 <Key size={18} className={`shrink-0 transition-colors ${activeWasataTab === 'residential-rent' ? 'text-[#47CCD0]' : 'text-gray-400'}`} />
 <div>
 <div className={`font-bold text-sm transition-colors ${activeWasataTab === 'residential-rent' ? 'text-[#47CCD0]' : 'text-gray-900'}`}>{t('headerDrop.forRent')}</div>
 <div className={`text-[11px] mt-0.5 transition-colors ${activeWasataTab === 'residential-rent' ? 'text-[#47CCD0]/70' : 'text-gray-400'}`}>{t('headerDrop.forRentDesc')}</div>
 </div>
 </button>

 <button
 onMouseEnter={() => setActiveWasataTab('residential-daily')}
 onClick={() => { onNavigate('daily-rent'); setIsWasataOpen(false); }}
 className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group text-start ${activeWasataTab === 'residential-daily' ? 'bg-[#F8FAFB]' : 'hover:bg-gray-50'}`}
 >
 <Calendar size={18} className={`shrink-0 transition-colors ${activeWasataTab === 'residential-daily' ? 'text-[#47CCD0]' : 'text-gray-400'}`} />
 <div>
 <div className={`font-bold text-sm transition-colors ${activeWasataTab === 'residential-daily' ? 'text-[#47CCD0]' : 'text-gray-900'}`}>{t('headerDrop.dailyRent')}</div>
 <div className={`text-[11px] mt-0.5 transition-colors ${activeWasataTab === 'residential-daily' ? 'text-[#47CCD0]/70' : 'text-gray-400'}`}>{t('headerDrop.dailyRentDesc')}</div>
 </div>
 </button>
 </div>
 </div>

 {/* Commercial */}
 <div>
 <div className="flex items-center gap-2 px-3 mb-2">
 <h3 className="font-bold text-gray-900 text-base">{t('headerDrop.commercial')}</h3>
 <span className="bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded-md font-bold">{t('headerDrop.new')}</span>
 </div>
 <div className="space-y-1">
 <button
 onMouseEnter={() => setActiveWasataTab('commercial-sale')}
 onClick={() => { onNavigate('commercial-sale'); setIsWasataOpen(false); }}
 className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group text-start ${activeWasataTab === 'commercial-sale' ? 'bg-[#F8FAFB]' : 'hover:bg-gray-50'}`}
 >
 <Tag size={18} className={`shrink-0 transition-colors ${activeWasataTab === 'commercial-sale' ? 'text-[#47CCD0]' : 'text-gray-400'}`} />
 <div>
 <div className={`font-bold text-sm transition-colors ${activeWasataTab === 'commercial-sale' ? 'text-[#47CCD0]' : 'text-gray-900'}`}>{t('headerDrop.forSale')}</div>
 <div className={`text-[11px] mt-0.5 transition-colors ${activeWasataTab === 'commercial-sale' ? 'text-[#47CCD0]/70' : 'text-gray-400'}`}>{t('headerDrop.forSaleDesc')}</div>
 </div>
 </button>

 <button
 onClick={() => { onNavigate('commercial-rent'); setIsWasataOpen(false); }}
 onMouseEnter={() => setActiveWasataTab('commercial-rent')}
 className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group text-start ${activeWasataTab === 'commercial-rent' ? 'bg-[#F8FAFB]' : 'hover:bg-gray-50'}`}
 >
 <Key size={18} className={`shrink-0 transition-colors ${activeWasataTab === 'commercial-rent' ? 'text-[#47CCD0]' : 'text-gray-400'}`} />
 <div>
 <div className={`font-bold text-sm transition-colors ${activeWasataTab === 'commercial-rent' ? 'text-[#47CCD0]' : 'text-gray-900'}`}>{t('headerDrop.forRent')}</div>
 <div className={`text-[11px] mt-0.5 transition-colors ${activeWasataTab === 'commercial-rent' ? 'text-[#47CCD0]/70' : 'text-gray-400'}`}>{t('headerDrop.forRentDesc')}</div>
 </div>
 </button>
 </div>
 </div>

 {/* Brokerage Guide Link */}
 <div className="pt-2 border-t border-gray-100 mt-auto">
 <button
 onClick={() => { onNavigate('brokerage-guide'); setIsWasataOpen(false); }}
 className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group text-start hover:bg-gray-50"
 >
 <BookOpen size={18} className="shrink-0 text-gray-400 group-hover:text-[#47CCD0] transition-colors" />
 <div>
 <div className="font-bold text-sm text-gray-900 group-hover:text-[#47CCD0] transition-colors">{t('headerDrop.brokerageMechanism')}</div>
 <div className="text-[11px] text-gray-400 mt-0.5">{t('headerDrop.termsAndConditions')}</div>
 </div>
 </button>
 </div>
 </div>

 {/* Left Side: Content */}
 <div className="flex-1 p-6 relative overflow-hidden text-gray-900">
 {/* Residential Sale Content */}
 {activeWasataTab === 'residential-sale' && (
 <div className="relative animate-in fade-in slide-in-from-end-4 duration-300">
 <div className="flex items-center justify-between mb-6">
 <h4 className="font-bold text-xl text-gray-900">{t('headerDrop.featuredSaleOffers')}</h4>
 <button onClick={() => { onNavigate('real-estate-for-sale'); setIsWasataOpen(false); }} className="flex items-center gap-1 text-sm text-[#47CCD0] font-bold hover:underline">
 {t('headerDrop.viewAll')} <ChevronLeft size={16} />
 </button>
 </div>
 
 <div className="grid grid-cols-4 gap-4">
 {[
 { name: t('headerDrop.cities.riyadh'), img: cityImages.riyadh, action: () => onNavigate('riyadh-sale') },
 { name: t('headerDrop.cities.jeddah'), img: cityImages.jeddah, action: () => {} },
 { name: t('headerDrop.cities.makkah'), img: cityImages.makkah, action: () => {} },
 { name: t('headerDrop.cities.madinah'), img: cityImages.madinah, action: () => {} }
 ].map((city, idx) => (
 <button key={idx} onClick={() => { city.action(); setIsWasataOpen(false); }} className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all text-start w-full">
 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
 <img src={city.img} alt={city.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
 <span className="absolute bottom-3 end-3 text-white font-bold z-20">{city.name}</span>
 </button>
 ))}
 </div>
 </div>
 )}

 {/* Residential Rent Content */}
 {activeWasataTab === 'residential-rent' && (
 <div className="relative animate-in fade-in slide-in-from-end-4 duration-300">
 <div className="flex items-center justify-between mb-6">
 <h4 className="font-bold text-xl text-gray-900">{t('headerDrop.featuredRentOffers')}</h4>
 <button onClick={() => { onNavigate('real-estate-for-rent'); setIsWasataOpen(false); }} className="flex items-center gap-1 text-sm text-[#47CCD0] font-bold hover:underline">
 {t('headerDrop.viewAll')} <ChevronLeft size={16} />
 </button>
 </div>
 
 <div className="grid grid-cols-4 gap-4">
 {[
 { name: t('headerDrop.cities.riyadh'), img: cityImages.riyadh },
 { name: t('headerDrop.cities.jeddah'), img: cityImages.jeddah },
 { name: t('headerDrop.cities.makkah'), img: cityImages.makkah },
 { name: t('headerDrop.cities.madinah'), img: cityImages.madinah }
 ].reverse().map((city, idx) => (
 <button key={idx} onClick={() => { onNavigate('riyadh-rent'); setIsWasataOpen(false); }} className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all w-full">
 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
 <img src={city.img} alt={city.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
 <span className="absolute bottom-3 end-3 text-white font-bold z-20">{city.name}</span>
 </button>
 ))}
 </div>
 </div>
 )}

 {/* Residential Daily Content */}
 {activeWasataTab === 'residential-daily' && (
 <div className="relative animate-in fade-in slide-in-from-end-4 duration-300">
 <div className="flex items-center justify-between mb-6">
 <h4 className="font-bold text-xl text-gray-900">{t('headerDrop.dailyRentOffers')}</h4>
 <button onClick={() => { onNavigate('daily-rent'); setIsWasataOpen(false); }} className="flex items-center gap-1 text-sm text-[#47CCD0] font-bold hover:underline">
 {t('headerDrop.viewAll')} <ChevronLeft size={16} />
 </button>
 </div>
 
 <div className="grid grid-cols-2 gap-4">
 <button onClick={() => { onNavigate('daily-rent'); setIsWasataOpen(false); }} className="relative flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-[#47CCD0] transition-all group overflow-hidden">
 <div className="w-16 h-16 bg-[#F8FAFB] rounded-lg flex items-center justify-center text-[#47CCD0] group-hover:bg-[#47CCD0] group-hover:text-white transition-all shrink-0">
 <Home size={32} />
 </div>
 <div className="text-start">
 <h5 className="font-bold text-gray-900 mb-1">{t('headerDrop.chalets')}</h5>
 <p className="text-xs text-gray-400">{t('headerDrop.holidays')}</p>
 </div>
 <div className="absolute top-4 start-4 flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full border border-yellow-100">
 <span className="text-xs font-bold text-yellow-700">4.9</span>
 <Star size={10} className="fill-yellow-500 text-yellow-500" />
 </div>
 </button>
 
 <button onClick={() => { onNavigate('desert-camps'); setIsWasataOpen(false); }} className="relative flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-[#47CCD0] transition-all group overflow-hidden">
 <div className="w-16 h-16 bg-[#F8FAFB] rounded-lg flex items-center justify-center text-[#47CCD0] group-hover:bg-[#47CCD0] group-hover:text-white transition-all shrink-0">
 <LayoutGrid size={32} />
 </div>
 <div className="text-start">
 <h5 className="font-bold text-gray-900 mb-1">{t('headerDrop.camps')}</h5>
 <p className="text-xs text-gray-400">{t('headerDrop.fullyEquipped')}</p>
 </div>
 <div className="absolute top-4 start-4 flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full border border-yellow-100">
 <span className="text-xs font-bold text-yellow-700">4.8</span>
 <Star size={10} className="fill-yellow-500 text-yellow-500" />
 </div>
 </button>

 <button onClick={() => { onNavigate('hotel-apartments'); setIsWasataOpen(false); }} className="relative flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-[#47CCD0] transition-all group overflow-hidden">
 <div className="w-16 h-16 bg-[#F8FAFB] rounded-lg flex items-center justify-center text-[#47CCD0] group-hover:bg-[#47CCD0] group-hover:text-white transition-all shrink-0">
 <Building2 size={32} />
 </div>
 <div className="text-start">
 <h5 className="font-bold text-gray-900 mb-1">{t('headerDrop.hotelApartments')}</h5>
 <p className="text-xs text-gray-400">{t('headerDrop.comfortableAndLuxurious')}</p>
 </div>
 <div className="absolute top-4 start-4 flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full border border-yellow-100">
 <span className="text-xs font-bold text-yellow-700">4.7</span>
 <Star size={10} className="fill-yellow-500 text-yellow-500" />
 </div>
 </button>

 <button onClick={() => { onNavigate('private-villas'); setIsWasataOpen(false); }} className="relative flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-[#47CCD0] transition-all group overflow-hidden">
 <div className="w-16 h-16 bg-[#F8FAFB] rounded-lg flex items-center justify-center text-[#47CCD0] group-hover:bg-[#47CCD0] group-hover:text-white transition-all shrink-0">
 <HomeIcon size={32} />
 </div>
 <div className="text-start">
 <h5 className="font-bold text-gray-900 mb-1">{t('headerDrop.privateVillas')}</h5>
 <p className="text-xs text-gray-400">{t('headerDrop.familyPrivacy')}</p>
 </div>
 <div className="absolute top-4 start-4 flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full border border-yellow-100">
 <span className="text-xs font-bold text-yellow-700">4.9</span>
 <Star size={10} className="fill-yellow-500 text-yellow-500" />
 </div>
 </button>
 </div>
 </div>
 )}

 {/* Commercial Sale Content */}
 {activeWasataTab === 'commercial-sale' && (
 <div className="relative animate-in fade-in slide-in-from-end-4 duration-300">
 <div className="flex items-center justify-between mb-6">
 <h4 className="font-bold text-xl text-gray-900">{t('headerDrop.commercialPropertiesForSale')}</h4>
 <button onClick={() => { onNavigate('commercial-sale'); setIsWasataOpen(false); }} className="flex items-center gap-1 text-sm text-[#47CCD0] font-bold hover:underline">
 {t('headerDrop.viewAll')} <ChevronLeft size={16} />
 </button>
 </div>
 
 <div className="grid grid-cols-2 gap-4">
 <button onClick={() => { onNavigate('commercial-offices'); setIsWasataOpen(false); }} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-[#47CCD0] transition-all group w-full text-start">
 <div className="w-16 h-16 bg-[#F8FAFB] rounded-lg flex items-center justify-center text-[#47CCD0] group-hover:bg-[#47CCD0] group-hover:text-white transition-all shrink-0">
 <Building2 size={32} />
 </div>
 <div>
 <h5 className="font-bold text-gray-900 mb-1">{t('headerDrop.commercialOffices')}</h5>
 <p className="text-xs text-gray-400">{t('headerDrop.variousOfficeSpaces')}</p>
 </div>
 </button>
 <button onClick={() => { onNavigate('showrooms-shops'); setIsWasataOpen(false); }} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-[#47CCD0] transition-all group w-full text-start">
 <div className="w-16 h-16 bg-[#F8FAFB] rounded-lg flex items-center justify-center text-[#47CCD0] group-hover:bg-[#47CCD0] group-hover:text-white transition-all shrink-0">
 <LayoutGrid size={32} />
 </div>
 <div>
 <h5 className="font-bold text-gray-900 mb-1">{t('headerDrop.showroomsAndShops')}</h5>
 <p className="text-xs text-gray-400">{t('headerDrop.strategicLocations')}</p>
 </div>
 </button>
 </div>
 </div>
 )}

 {/* Commercial Rent Content */}
 {activeWasataTab === 'commercial-rent' && (
 <div className="relative animate-in fade-in slide-in-from-end-4 duration-300">
 <div className="flex items-center justify-between mb-6">
 <h4 className="font-bold text-xl text-gray-900">{t('headerDrop.commercialRentTitle')}</h4>
 <button onClick={() => { onNavigate('commercial-rent'); setIsWasataOpen(false); }} className="flex items-center gap-1 text-sm text-[#47CCD0] font-bold hover:underline">
 {t('headerDrop.viewAll')} <ChevronLeft size={16} />
 </button>
 </div>
 
 <div className="grid grid-cols-2 gap-4">
 <button onClick={() => { onNavigate('furnished-offices'); setIsWasataOpen(false); }} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-[#47CCD0] transition-all group w-full text-start">
 <div className="w-16 h-16 bg-[#F8FAFB] rounded-lg flex items-center justify-center text-[#47CCD0] group-hover:bg-[#47CCD0] group-hover:text-white transition-all shrink-0">
 <Building2 size={32} />
 </div>
 <div>
 <h5 className="font-bold text-gray-900 mb-1">{t('headerDrop.furnishedOffices')}</h5>
 <p className="text-xs text-gray-400">{t('headerDrop.readyToWork')}</p>
 </div>
 </button>
 <button onClick={() => { onNavigate('warehouses'); setIsWasataOpen(false); }} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-[#47CCD0] transition-all group w-full text-start">
 <div className="w-16 h-16 bg-[#F8FAFB] rounded-lg flex items-center justify-center text-[#47CCD0] group-hover:bg-[#47CCD0] group-hover:text-white transition-all shrink-0">
 <LayoutGrid size={32} />
 </div>
 <div>
 <h5 className="font-bold text-gray-900 mb-1">{t('headerDrop.warehouses')}</h5>
 <p className="text-xs text-gray-400">{t('headerDrop.safeStorageSpaces')}</p>
 </div>
 </button>
 </div>
 </div>
 )}
 </div>
 </div>
 </div>
 </div>

 {/* Auctions Dropdown */}
 <div className="relative group">
 <button 
 className={`relative flex items-center gap-1 hover:text-[#47CCD0] transition-colors text-white ${currentPage === 'auctions' ? 'font-bold' : ''}`}
 onClick={() => setIsAuctionsOpen(!isAuctionsOpen)}
 onMouseEnter={() => setIsAuctionsOpen(true)}
 onMouseLeave={() => setIsAuctionsOpen(false)}
 >
 {t('header.auctions')} <ChevronDown size={14} />
 <span className="absolute -top-1 -start-1.5 flex h-2.5 w-2.5">
 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#47CCD0] opacity-75"></span>
 <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#47CCD0]"></span>
 </span>
 </button>
 
 <div
 className={`absolute top-full start-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-2 transform transition-all duration-200 origin-top-start z-[60] ${
 isAuctionsOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'
 }`}
 onMouseEnter={() => setIsAuctionsOpen(true)}
 onMouseLeave={() => setIsAuctionsOpen(false)}
 >
 <div className="flex flex-col gap-1 text-gray-900">
 <button onClick={() => { onNavigate('auctions'); setIsAuctionsOpen(false); }} className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#F8FAFB] hover:text-[#47CCD0] transition-colors text-start group">
 <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 group-hover:bg-white group-hover:text-[#47CCD0] transition-colors shrink-0">
 <Building2 size={18} />
 </div>
 <div>
 <div className="font-bold text-sm text-gray-900 group-hover:text-[#47CCD0]">{t('headerDrop.realEstate')}</div>
 <div className="text-[10px] text-gray-400">{t('headerDrop.villasLandsBuildings')}</div>
 </div>
 </button>

 <button onClick={() => { onNavigate('car-auctions'); setIsAuctionsOpen(false); }} className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#F8FAFB] hover:text-[#47CCD0] transition-colors text-start group">
 <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 group-hover:bg-white group-hover:text-[#47CCD0] transition-colors shrink-0">
 <Car size={18} />
 </div>
 <div>
 <div className="font-bold text-sm text-gray-900 group-hover:text-[#47CCD0]">{t('headerDrop.cars')}</div>
 <div className="text-[10px] text-gray-400">{t('headerDrop.vehiclesAndHeavyEquipment')}</div>
 </div>
 </button>

 <button onClick={() => { onNavigate('car-plates-auctions'); setIsAuctionsOpen(false); }} className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#F8FAFB] hover:text-[#47CCD0] transition-colors text-start group">
 <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 group-hover:bg-white group-hover:text-[#47CCD0] transition-colors shrink-0">
 <LayoutGrid size={18} />
 </div>
 <div>
 <div className="font-bold text-sm text-gray-900 group-hover:text-[#47CCD0]">{t('headerDrop.carPlates')}</div>
 <div className="text-[10px] text-gray-400">{t('headerDrop.specialNumbers')}</div>
 </div>
 </button>

 <button onClick={() => { onNavigate('other-auctions'); setIsAuctionsOpen(false); }} className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#F8FAFB] hover:text-[#47CCD0] transition-colors text-start group">
 <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 group-hover:bg-white group-hover:text-[#47CCD0] transition-colors shrink-0">
 <Package size={18} />
 </div>
 <div>
 <div className="font-bold text-sm text-gray-900 group-hover:text-[#47CCD0]">{t('headerDrop.other')}</div>
 <div className="text-[10px] text-gray-400">{t('headerDrop.computersEquipmentMachinery')}</div>
 </div>
 </button>

 <div className="pt-2 mt-1 border-t border-gray-100 flex flex-col gap-1">
 <button 
 onClick={() => { onNavigate('auction-guide'); setIsAuctionsOpen(false); }} 
 className="w-full flex items-center justify-center gap-2 py-2 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 hover:text-[#47CCD0] transition-all"
 >
 <Gavel size={16} />
 <span>{t('headerDrop.biddingGuideAndTerms')}</span>
 </button>

 <button 
 onClick={() => { onNavigate('add-auction'); setIsAuctionsOpen(false); }} 
 className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#47CCD0]/10 text-[#47CCD0] rounded-lg font-bold text-sm hover:bg-[#47CCD0] hover:text-white transition-all group"
 >
 <Plus size={16} />
 <span>{t('headerDrop.howToCreateAuction')}</span>
 </button>
 </div>
 </div>
 </div>
 </div>
 
 {/* Direct Sales Dropdown (NEW) */}
 <div className="relative group">
 <button 
 className={`flex items-center gap-1 hover:text-[#47CCD0] transition-colors text-white`}
 onClick={() => setIsDirectSalesOpen(!isDirectSalesOpen)}
 onMouseEnter={() => setIsDirectSalesOpen(true)}
 onMouseLeave={() => setIsDirectSalesOpen(false)}
 >
 {t('header.directSale')} <ChevronDown size={14} />
 </button>
 
 <div
 className={`absolute top-full start-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-2 transform transition-all duration-200 origin-top-start z-[60] ${
 isDirectSalesOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'
 }`}
 onMouseEnter={() => setIsDirectSalesOpen(true)}
 onMouseLeave={() => setIsDirectSalesOpen(false)}
 >
 <div className="flex flex-col gap-1 text-gray-900">


 <button onClick={() => { onNavigate('direct-sale-cars'); setIsDirectSalesOpen(false); }} className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#F8FAFB] hover:text-[#47CCD0] transition-colors text-start group">
 <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 group-hover:bg-white group-hover:text-[#47CCD0] transition-colors shrink-0">
 <Car size={18} />
 </div>
 <div>
 <div className="font-bold text-sm text-gray-900 group-hover:text-[#47CCD0]">{t('headerDrop.cars')}</div>
 <div className="text-[10px] text-gray-400">{t('headerDrop.vehiclesWithFixedPrices')}</div>
 </div>
 </button>

 <button onClick={() => { onNavigate('direct-sale-plates'); setIsDirectSalesOpen(false); }} className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#F8FAFB] hover:text-[#47CCD0] transition-colors text-start group">
 <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 group-hover:bg-white group-hover:text-[#47CCD0] transition-colors shrink-0">
 <LayoutGrid size={18} />
 </div>
 <div>
 <div className="font-bold text-sm text-gray-900 group-hover:text-[#47CCD0]">{t('headerDrop.carPlates')}</div>
 <div className="text-[10px] text-gray-400">{t('headerDrop.instantOwnershipTransfer')}</div>
 </div>
 </button>

 <button onClick={() => { onNavigate('direct-sale-other'); setIsDirectSalesOpen(false); }} className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#F8FAFB] hover:text-[#47CCD0] transition-colors text-start group">
 <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 group-hover:bg-white group-hover:text-[#47CCD0] transition-colors shrink-0">
 <Package size={18} />
 </div>
 <div>
 <div className="font-bold text-sm text-gray-900 group-hover:text-[#47CCD0]">{t('headerDrop.other')}</div>
 <div className="text-[10px] text-gray-400">{t('headerDrop.variousProducts')}</div>
 </div>
 </button>
 </div>
 </div>
 </div>

 <button 
 onClick={() => onNavigate('advertisers')}
 className={`hover:text-[#47CCD0] transition-colors text-white ${currentPage === 'advertisers' ? 'font-bold' : ''}`}
 >
 {t('header.advertisers')}
 </button>

 <button 
 onClick={() => onNavigate('my-requests')}
 className={`hover:text-[#47CCD0] transition-colors text-white ${currentPage === 'my-requests' ? 'font-bold' : ''}`}
 >
 {t('header.customerRequests')}
 </button>

 {/* More Dropdown */}
 <div className="relative group">
 <button 
 className={`flex items-center gap-1 hover:text-[#47CCD0] transition-colors text-white`}
 onClick={() => setIsMoreOpen(!isMoreOpen)}
 onMouseEnter={() => setIsMoreOpen(true)}
 onMouseLeave={() => setIsMoreOpen(false)}
 >
 {t('header.more')} <ChevronDown size={14} />
 </button>
 
 <div
 className={`absolute top-full start-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 p-4 transform transition-all duration-200 origin-top-start z-[60] ${
 isMoreOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'
 }`}
 onMouseEnter={() => setIsMoreOpen(true)}
 onMouseLeave={() => setIsMoreOpen(false)}
 >
 <div className="space-y-1 text-gray-800">
 <button onClick={() => onNavigate('plans')} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#47CCD0]/10 hover:text-[#47CCD0] transition-colors text-sm font-medium w-full text-start text-[#2B3D50]">
 <LayoutGrid size={18} className="text-gray-400 shrink-0" />
 {t('headerDrop.plans')}
 </button>

 <button onClick={() => onNavigate('training')} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#47CCD0]/10 hover:text-[#47CCD0] transition-colors text-sm font-medium w-full text-start text-[#2B3D50]">
 <BookOpen size={18} className="text-gray-400 shrink-0" />
 {t('headerDrop.mzadatAcademy')}
 </button>

 <button onClick={() => onNavigate('consulting')} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#47CCD0]/10 hover:text-[#47CCD0] transition-colors text-sm font-medium w-full text-start text-[#2B3D50]">
 <Briefcase size={18} className="text-gray-400 shrink-0" />
 {t('headerDrop.consulting')}
 </button>

 <button onClick={() => onNavigate('additional-services')} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#47CCD0]/10 hover:text-[#47CCD0] transition-colors text-sm font-medium w-full text-start text-[#2B3D50]">
 <Grid size={18} className="text-gray-400 shrink-0" />
 {t('headerDrop.additionalServices')}
 </button>

 <button onClick={() => onNavigate('careers')} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#47CCD0]/10 hover:text-[#47CCD0] transition-colors text-sm font-medium w-full text-start text-[#2B3D50]">
 <Briefcase size={18} className="text-gray-400 shrink-0" />
 {t('headerDrop.careers')}
 </button>

 <button onClick={() => onNavigate('faq')} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#47CCD0]/10 hover:text-[#47CCD0] transition-colors text-sm font-medium w-full text-start text-[#2B3D50]">
 <HelpCircle size={18} className="text-gray-400 shrink-0" />
 {t('headerDrop.faq')}
 </button>

 <div className="border-t border-gray-100 pt-3">
 <div className="flex items-center gap-3 mb-2 text-gray-700">
 <div className="w-8 h-8 rounded-full bg-[#F8FAFB] flex items-center justify-center text-[#47CCD0]">
 <Phone size={14} />
 </div>
 <div className="text-sm">
 <p className="font-bold" dir="ltr">055 030 0400</p>
 <p className="text-[10px] text-gray-500">{t('headerDrop.workHours')}</p>
 </div>
 </div>

 <div className="grid grid-cols-2 gap-2 mt-3">
 <button className="flex items-center justify-center gap-2 py-2 bg-green-50 text-green-600 rounded-lg text-xs font-bold hover:bg-green-100 transition-colors">
 <MessageCircle size={14} /> {t('headerDrop.whatsapp')}
 </button>
 <button className="flex items-center justify-center gap-2 py-2 bg-gray-900 text-white rounded-lg text-xs font-bold hover:bg-gray-700 transition-colors">
 <Phone size={14} /> {t('headerDrop.call')}
 </button>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* Actions */}
 <div className="flex items-center gap-3 flex-shrink-0">
 {/* Add Button Dropdown - Hidden on smaller screens */}
 <div className="relative group hidden lg:block">
 <button 
 className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-[#47CCD0] rounded-full hover:bg-[#3dbec2] shadow-lg transition-all"
 onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
 onMouseEnter={() => setIsAddMenuOpen(true)}
 onMouseLeave={() => setIsAddMenuOpen(false)}
 >
 <Plus size={16} /> {t('header.add')}
 </button>
 
 <div
 className={`absolute top-full end-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 p-2 transform transition-all duration-200 origin-top-end z-[60] ${
 isAddMenuOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'
 }`}
 onMouseEnter={() => setIsAddMenuOpen(true)}
 onMouseLeave={() => setIsAddMenuOpen(false)}
 >
 <button onClick={() => { onNavigate('add-ad'); setIsAddMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 hover:text-[#47CCD0] transition-colors text-start text-gray-700 text-sm font-bold">
 {t('mobileNav.addAd')}
 </button>
 <button onClick={() => { onNavigate('add-auction'); setIsAddMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 hover:text-[#47CCD0] transition-colors text-start text-gray-700 text-sm font-bold">
 {t('mobileNav.addAuction')}
 </button>
 </div>
 </div>

 {/* Support Button */}
 <button 
 onClick={() => onNavigate('support')}
 className={`hidden xl:flex items-center gap-2 px-2 text-sm font-medium hover:text-[#47CCD0] transition-all text-white/80`}
 title={t('header.support')}
 >
 <img 
 src={supportIcon} 
 alt={t('header.support')} 
 className={`w-6 h-6 object-contain transition-all`}
 />
 </button>

 {/* Language Toggle Button */}
 <button 
 onClick={toggleLanguage}
 className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/20`}
 title={lang === 'ar' ? 'English' : 'العربية'}
 >
 <Globe size={16} />
 <span className="hidden md:inline">{lang === 'ar' ? 'EN' : 'عربي'}</span>
 </button>

 {/* Combined Menu Button / User Menu - Used as Trigger for Side Menu on Mobile */}
 <div 
 className="relative group"
 onMouseEnter={() => {
 if (!isMobile) setIsUserMenuOpen(true);
 }}
 onMouseLeave={() => setIsUserMenuOpen(false)}
 >
 <button 
 onClick={() => {
 if (isMobile) {
 setIsMobileMenuOpen(true);
 } else {
 setIsUserMenuOpen(!isUserMenuOpen);
 }
 }}
 className={`flex items-center gap-3 px-2 ps-2 pe-3 py-1.5 rounded-full border transition-all duration-100 active:scale-95 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-md`}
 >
 <Menu size={20} />
 <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white/20 text-white`}>
 <User size={16} />
 </div>
 </button>

 {/* Desktop User Dropdown - with login state */}
 <div
 className={`hidden lg:block absolute top-full end-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 transform transition-all duration-75 origin-top-end z-[60] overflow-hidden ${
 isUserMenuOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'
 }`}
 >
 <div className="bg-[#111827] text-white text-center text-[11px] py-2 px-3 font-medium" data-login-banner="desktop" style={isLoggedIn ? {display:'none'} : {}}>
 {t('headerDrop.registrationRequiresNafath')}
 </div>

 <div className="p-4 border-b border-gray-100 bg-[#F8FAFB]" style={isLoggedIn ? {display:'none'} : {}}>
 <p className="text-sm font-bold text-gray-700 mb-4 text-center">{t('headerDrop.welcomeNafath')}</p>
 <button 
 onClick={() => { onNavigate('nafath-login'); setIsUserMenuOpen(false); }}
 className="w-full py-2.5 bg-[#2D9F49] text-white rounded-xl text-sm font-bold shadow-md mb-3 hover:bg-[#24803b] transition-all flex items-center justify-center gap-2"
 >
 <div className="flex items-center gap-1">
 <ScanFace size={18} />
 <Fingerprint size={18} />
 </div>
 {t('headerDrop.loginViaNafath')}
 </button>
 <button onClick={() => { onOpenLogin(); setIsUserMenuOpen(false); }} className="w-full py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all">{t('header.login')}</button>
 </div>
 
 {isLoggedIn && (<div className="p-4 border-b border-gray-100 bg-[#F8FAFB]"><div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-full bg-[#47CCD0]/20 flex items-center justify-center"><User size={20} className="text-[#47CCD0]" /></div><div><p className="text-sm font-bold text-gray-800">{t('menu.welcome')}</p><p className="text-xs text-gray-500">{t('menu.mzadatUser')}</p></div></div><button onClick={() => { onNavigate('dashboard'); setIsUserMenuOpen(false); }} className="w-full py-2.5 bg-[#47CCD0] text-white rounded-xl text-sm font-bold hover:bg-[#3ab8bc] transition-all">{t('header.dashboard')}</button></div>)}
 <div className="p-2 space-y-1">
 <button onClick={() => { onNavigate('dashboard'); setIsUserMenuOpen(false); }} className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-[#47CCD0] transition-colors text-sm font-medium group">
 <div className="flex items-center gap-3">
 <LayoutDashboard size={18} className="text-gray-500 group-hover:text-[#47CCD0] transition-colors" />
 <span>{t('header.dashboard')}</span>
 </div>
 </button>
 
 {/* User Menu Auctions Toggle */}
 <div className="overflow-hidden transition-all">
 <button 
 onClick={(e) => { 
 e.stopPropagation(); 
 setIsUserAuctionsOpen(!isUserAuctionsOpen); 
 }} 
 className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-[#47CCD0] transition-colors text-sm font-medium group ${isUserAuctionsOpen ? 'bg-gray-50 text-[#47CCD0]' : ''}`}
 >
 <div className="flex items-center gap-3">
 <BiddingIcon size={18} className={`text-gray-500 group-hover:text-[#47CCD0] transition-colors ${isUserAuctionsOpen ? 'text-[#47CCD0]' : ''}`} />
 <span>{t('header.auctions')}</span>
 </div>
 <ChevronDown size={14} className={`text-gray-400 transition-transform ${isUserAuctionsOpen ? 'rotate-180 text-[#47CCD0]' : ''}`} />
 </button>

 {/* Submenu */}
 {isUserAuctionsOpen && (
 <div className="bg-gray-50/50 rounded-lg mx-2 my-1 animate-in slide-in-from-top-2 duration-200">
 <button onClick={() => { onNavigate('auctions'); setIsUserMenuOpen(false); }} className="w-full flex items-center gap-2 px-8 py-2.5 text-xs text-gray-600 hover:text-[#47CCD0] font-medium transition-colors">
 <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
 {t('headerDrop.realEstate')}
 </button>
 <button onClick={() => { onNavigate('car-auctions'); setIsUserMenuOpen(false); }} className="w-full flex items-center gap-2 px-8 py-2.5 text-xs text-gray-600 hover:text-[#47CCD0] font-medium transition-colors">
 <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
 {t('headerDrop.cars')}
 </button>
 <button onClick={() => { onNavigate('car-plates-auctions'); setIsUserMenuOpen(false); }} className="w-full flex items-center gap-2 px-8 py-2.5 text-xs text-gray-600 hover:text-[#47CCD0] font-medium transition-colors">
 <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
 {t('headerDrop.carPlates')}
 </button>
 <button onClick={() => { onNavigate('other-auctions'); setIsUserMenuOpen(false); }} className="w-full flex items-center gap-2 px-8 py-2.5 text-xs text-gray-600 hover:text-[#47CCD0] font-medium transition-colors">
 <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
 {t('headerDrop.other')}
 </button>
 <div className="border-t border-gray-200/50 mt-1 pt-1 mb-1 pb-1">
 <button onClick={() => { onNavigate('auction-guide'); setIsUserMenuOpen(false); }} className="w-full flex items-center gap-2 px-8 py-2.5 text-xs text-gray-600 hover:text-[#47CCD0] font-medium transition-colors">
 <Gavel size={12} className="text-gray-400" />
 {t('headerDrop.biddingGuideAndTerms')}
 </button>
 <button onClick={() => { onNavigate('add-auction'); setIsUserMenuOpen(false); }} className="w-full flex items-center gap-2 px-8 py-2.5 text-xs text-[#47CCD0] hover:text-[#47CCD0] font-bold transition-colors">
 <Plus size={12} />
 {t('headerDrop.howToCreateAuction')}
 </button>
 </div>
 </div>
 )}
 </div>

 {/* User Menu Wasata Toggle */}
 <div className="overflow-hidden transition-all">
 <button 
 onClick={(e) => { 
 e.stopPropagation(); 
 setIsUserWasataOpen(!isUserWasataOpen); 
 }} 
 className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-[#47CCD0] transition-colors text-sm font-medium group ${isUserWasataOpen ? 'bg-gray-50 text-[#47CCD0]' : ''}`}
 >
 <div className="flex items-center gap-3">
 <FileText size={18} className={`text-gray-500 group-hover:text-[#47CCD0] transition-colors ${isUserWasataOpen ? 'text-[#47CCD0]' : ''}`} />
 <span>{t('header.wasata')}</span>
 </div>
 <ChevronDown size={14} className={`text-gray-400 transition-transform ${isUserWasataOpen ? 'rotate-180 text-[#47CCD0]' : ''}`} />
 </button>

 {/* Submenu */}
 {isUserWasataOpen && (
 <div className="bg-gray-50/50 rounded-lg mx-2 my-1 animate-in slide-in-from-top-2 duration-200 p-2 text-start">
 {/* Residential */}
 <div className="mb-3">
 <h3 className="font-bold text-gray-900 px-2 mb-1 text-sm">{t('headerDrop.residential')}</h3>
 <div className="space-y-0.5">
 <button
 onClick={() => { onNavigate('real-estate-for-sale'); setIsUserMenuOpen(false); }}
 className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-xs transition-colors group ${currentPage === 'real-estate-for-sale' ? 'bg-white shadow-sm ring-1 ring-gray-100 text-[#47CCD0]' : 'text-gray-600 hover:bg-white hover:text-[#47CCD0]'}`}
 >
 <Tag size={14} className={`shrink-0 ${currentPage === 'real-estate-for-sale' ? 'text-[#47CCD0]' : 'text-gray-400 group-hover:text-[#47CCD0]'}`} />
 <div className="text-start">
 <div className="font-bold">{t('headerDrop.forSale')}</div>
 <div className={`text-[9px] mt-0.5 ${currentPage === 'real-estate-for-sale' ? 'text-[#47CCD0]/70' : 'text-gray-400 group-hover:text-[#47CCD0]/70'}`}>{t('headerDrop.forSaleDesc')}</div>
 </div>
 </button>
 <button
 onClick={() => { onNavigate('real-estate-for-rent'); setIsUserMenuOpen(false); }}
 className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-xs transition-colors group ${currentPage === 'real-estate-for-rent' ? 'bg-white shadow-sm ring-1 ring-gray-100 text-[#47CCD0]' : 'text-gray-600 hover:bg-white hover:text-[#47CCD0]'}`}
 >
 <Key size={14} className={`shrink-0 ${currentPage === 'real-estate-for-rent' ? 'text-[#47CCD0]' : 'text-gray-400 group-hover:text-[#47CCD0]'}`} />
 <div className="text-start">
 <div className="font-bold">{t('headerDrop.forRent')}</div>
 <div className={`text-[9px] mt-0.5 ${currentPage === 'real-estate-for-rent' ? 'text-[#47CCD0]/70' : 'text-gray-400 group-hover:text-[#47CCD0]/70'}`}>{t('headerDrop.forRentDesc')}</div>
 </div>
 </button>
 <button
 onClick={() => { onNavigate('daily-rent'); setIsUserMenuOpen(false); }}
 className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-xs transition-colors group ${currentPage === 'daily-rent' ? 'bg-white shadow-sm ring-1 ring-gray-100 text-[#47CCD0]' : 'text-gray-600 hover:bg-white hover:text-[#47CCD0]'}`}
 >
 <Calendar size={14} className={`shrink-0 ${currentPage === 'daily-rent' ? 'text-[#47CCD0]' : 'text-gray-400 group-hover:text-[#47CCD0]'}`} />
 <div className="text-start">
 <div className="font-bold">{t('headerDrop.dailyRent')}</div>
 <div className={`text-[9px] mt-0.5 ${currentPage === 'daily-rent' ? 'text-[#47CCD0]/70' : 'text-gray-400 group-hover:text-[#47CCD0]/70'}`}>{t('headerDrop.dailyRentDesc')}</div>
 </div>
 </button>
 </div>
 </div>

 {/* Commercial */}
 <div className="mb-2">
 <div className="flex items-center gap-2 px-2 mb-1">
 <h3 className="font-bold text-gray-900 text-sm">{t('headerDrop.commercial')}</h3>
 <span className="bg-green-600 text-white text-[9px] px-1.5 py-0.5 rounded-md font-bold">{t('headerDrop.new')}</span>
 </div>
 <div className="space-y-0.5">
 <button
 onClick={() => { onNavigate('commercial-sale'); setIsUserMenuOpen(false); }}
 className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-xs transition-colors group ${currentPage === 'commercial-sale' ? 'bg-white shadow-sm ring-1 ring-gray-100 text-[#47CCD0]' : 'text-gray-600 hover:bg-white hover:text-[#47CCD0]'}`}
 >
 <Tag size={14} className={`shrink-0 ${currentPage === 'commercial-sale' ? 'text-[#47CCD0]' : 'text-gray-400 group-hover:text-[#47CCD0]'}`} />
 <div className="text-start">
 <div className="font-bold">{t('headerDrop.forSale')}</div>
 <div className={`text-[9px] mt-0.5 ${currentPage === 'commercial-sale' ? 'text-[#47CCD0]/70' : 'text-gray-400 group-hover:text-[#47CCD0]/70'}`}>{t('headerDrop.forSaleDesc')}</div>
 </div>
 </button>
 <button
 onClick={() => { onNavigate('commercial-rent'); setIsUserMenuOpen(false); }}
 className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-xs transition-colors group ${currentPage === 'commercial-rent' ? 'bg-white shadow-sm ring-1 ring-gray-100 text-[#47CCD0]' : 'text-gray-600 hover:bg-white hover:text-[#47CCD0]'}`}
 >
 <Key size={14} className={`shrink-0 ${currentPage === 'commercial-rent' ? 'text-[#47CCD0]' : 'text-gray-400 group-hover:text-[#47CCD0]'}`} />
 <div className="text-start">
 <div className="font-bold">{t('headerDrop.forRent')}</div>
 <div className={`text-[9px] mt-0.5 ${currentPage === 'commercial-rent' ? 'text-[#47CCD0]/70' : 'text-gray-400 group-hover:text-[#47CCD0]/70'}`}>{t('headerDrop.forRentDesc')}</div>
 </div>
 </button>
 </div>
 </div>

 {/* Brokerage Guide */}
 <div className="border-t border-gray-200/50 mt-2 pt-2">
 <button onClick={() => { onNavigate('brokerage-guide'); setIsUserMenuOpen(false); }} className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-white text-xs text-[#47CCD0] transition-colors group">
 <BookOpen size={14} className="shrink-0 text-[#47CCD0]" />
 <div className="text-start">
 <div className="font-bold text-[#47CCD0]">{t('headerDrop.brokerageMechanism')}</div>
 <div className="text-[9px] text-[#47CCD0]/70 mt-0.5">{t('headerDrop.termsAndConditions')}</div>
 </div>
 </button>
 </div>
 </div>
 )}
 </div>

 {/* User Menu Direct Sales Toggle */}
 <div className="overflow-hidden transition-all">
 <button 
 onClick={(e) => { 
 e.stopPropagation(); 
 setIsUserDirectSalesOpen(!isUserDirectSalesOpen); 
 }} 
 className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-[#47CCD0] transition-colors text-sm font-medium group ${isUserDirectSalesOpen ? 'bg-gray-50 text-[#47CCD0]' : ''}`}
 >
 <div className="flex items-center gap-3">
 <Tag size={18} className={`text-gray-500 group-hover:text-[#47CCD0] transition-colors ${isUserDirectSalesOpen ? 'text-[#47CCD0]' : ''}`} />
 <span>{t('header.directSale')}</span>
 </div>
 <ChevronDown size={14} className={`text-gray-400 transition-transform ${isUserDirectSalesOpen ? 'rotate-180 text-[#47CCD0]' : ''}`} />
 </button>

 {/* Submenu */}
 {isUserDirectSalesOpen && (
 <div className="bg-gray-50/50 rounded-lg mx-2 my-1 animate-in slide-in-from-top-2 duration-200">
 <button onClick={() => { onNavigate('direct-sale-cars'); setIsUserMenuOpen(false); }} className="w-full flex items-center gap-2 px-8 py-2.5 text-xs text-gray-600 hover:text-[#47CCD0] font-medium transition-colors">
 <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
 {t('headerDrop.cars')}
 </button>
 <button onClick={() => { onNavigate('direct-sale-plates'); setIsUserMenuOpen(false); }} className="w-full flex items-center gap-2 px-8 py-2.5 text-xs text-gray-600 hover:text-[#47CCD0] font-medium transition-colors">
 <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
 {t('headerDrop.carPlates')}
 </button>
 <button onClick={() => { onNavigate('direct-sale-other'); setIsUserMenuOpen(false); }} className="w-full flex items-center gap-2 px-8 py-2.5 text-xs text-gray-600 hover:text-[#47CCD0] font-medium transition-colors">
 <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
 {t('headerDrop.other')}
 </button>
 </div>
 )}
 </div>

 <button onClick={() => { onNavigate('wallet'); setIsUserMenuOpen(false); }} className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-[#47CCD0] transition-colors text-sm font-medium group">
 <div className="flex items-center gap-3">
 <Wallet size={18} className="text-gray-500 group-hover:text-[#47CCD0] transition-colors" />
 <span>{t('header.wallet')}</span>
 </div>
 </button>
 <button 
 onClick={() => { onNavigate('dashboard?tab=settings'); setIsUserMenuOpen(false); }} 
 className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-[#47CCD0] transition-colors text-sm font-medium group"
 >
 <div className="flex items-center gap-3">
 <Settings size={18} className="text-gray-500 group-hover:text-[#47CCD0] transition-colors" />
 <span>{t('header.settings')}</span>
 </div>
 </button>
 <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-[#47CCD0] transition-colors text-sm font-medium group">
 <div className="flex items-center gap-3">
 <Smartphone size={18} className="text-gray-500 group-hover:text-[#47CCD0] transition-colors" />
 <span>{t('header.downloadApp')}</span>
 </div>
 </button>
 {isLoggedIn && (
 <button onClick={() => { window.location.href = '/'; }} className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-red-50 text-gray-700 hover:text-red-500 transition-colors text-sm font-medium group mt-1">
 <div className="flex items-center gap-3 text-red-500">
 <LogOut size={18} />
 <span>{t('menu.logout')}</span>
 </div>
 </button>
 )}
 </div>
 </div>
 </div>
 </div>
 </div>
 </nav>

 {/* --- MOBILE SIDE MENU DRAWER --- */}
 <div className={`fixed inset-0 z-[100] transition-all duration-300 ${isMobileMenuOpen ? 'visible' : 'invisible pointer-events-none'}`}>
 {/* Overlay */}
 <div
 className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
 onClick={() => setIsMobileMenuOpen(false)}
 ></div>

 {/* Drawer — always right-0 regardless of RTL/LTR */}
 <div className={`absolute top-0 right-0 h-full w-full max-w-sm bg-[#F8FAFB] shadow-2xl overflow-y-auto p-4 flex flex-col gap-4 text-start transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
 
 {/* Header / Close & Language */}
 <div className="flex justify-between items-center mb-4">
 <button 
 onClick={() => { toggleLanguage(); setIsMobileMenuOpen(false); }}
 className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all bg-gray-100 text-gray-700 hover:bg-gray-200"
 >
 <Languages size={18} />
 <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
 </button>
 <button 
 onClick={() => setIsMobileMenuOpen(false)}
 className="p-2 bg-white rounded-full text-gray-500 hover:bg-gray-100 shadow-sm border border-gray-100"
 >
 <X size={20} />
 </button>
 </div>

 {/* Login Section - conditional */}
 {isLoggedIn ? (<div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative overflow-hidden"><div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-full bg-[#47CCD0]/20 flex items-center justify-center"><User size={20} className="text-[#47CCD0]" /></div><div><p className="text-sm font-bold text-gray-800">{t('menu.welcome')}</p><p className="text-xs text-gray-500">{t('menu.mzadatUser')}</p></div></div><button onClick={() => { onNavigate('dashboard'); setIsMobileMenuOpen(false); }} className="w-full py-2.5 bg-[#47CCD0] text-white rounded-xl text-sm font-bold hover:bg-[#3ab8bc] transition-all">{t('header.dashboard')}</button></div>) : (<div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center relative overflow-hidden">
 <div className="absolute top-0 start-0 end-0 bg-[#111827] text-white text-[11px] py-1.5 px-2 font-medium">
 {t('menu.nafathRequired')}
 </div>
 <div className="pt-5">
 <h3 className="text-gray-900 font-bold mb-4">{t('menu.hello')}</h3>
 <div className="flex flex-col gap-3">
 <button 
 onClick={() => { onNavigate('nafath-login'); setIsMobileMenuOpen(false); }}
 className="w-full py-2.5 bg-[#2D9F49] text-white rounded-xl font-bold shadow-md hover:bg-[#24803b] transition-all flex items-center justify-center gap-2"
 >
 <div className="flex items-center gap-1">
 <ScanFace size={18} />
 <Fingerprint size={18} />
 </div>
 {t('menu.loginViaNafath')}
 </button>
 <button onClick={() => { onOpenLogin(); setIsMobileMenuOpen(false); }} className="w-full py-2.5 border border-gray-300 bg-white rounded-xl text-gray-700 font-bold hover:bg-gray-50 transition-colors">
 {t('header.login')}
 </button>
 </div>
 </div>
 </div>)}

 {/* Nav Items */}
 <div className="flex flex-col gap-2">
 <button 
 onClick={() => { onNavigate('dashboard'); setIsMobileMenuOpen(false); }} 
 className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all group"
 >
 <div className="flex items-center gap-3">
 <LayoutDashboard size={20} className="text-gray-500 group-hover:text-[#47CCD0] transition-colors" />
 <span className="font-bold text-gray-700 group-hover:text-[#47CCD0]">{t('header.dashboard')}</span>
 </div>
 </button>
 
 {/* Mobile Menu Auctions Toggle */}
 <div className="overflow-hidden">
 <button 
 onClick={(e) => { 
 e.stopPropagation(); 
 setIsUserAuctionsOpen(!isUserAuctionsOpen); 
 }} 
 className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all group"
 >
 <div className="flex items-center gap-3">
 <BiddingIcon size={20} className={`text-gray-500 group-hover:text-[#47CCD0] transition-colors ${isUserAuctionsOpen ? 'text-[#47CCD0]' : ''}`} />
 <span className={`font-bold transition-colors ${isUserAuctionsOpen ? 'text-[#47CCD0]' : 'text-gray-700 group-hover:text-[#47CCD0]'}`}>{t('menu.auctions')}</span>
 </div>
 <ChevronDown size={20} className={`text-gray-400 transition-transform ${isUserAuctionsOpen ? 'rotate-180 text-[#47CCD0]' : ''}`} />
 </button>
 
 {isUserAuctionsOpen && (
 <div className="bg-gray-50/50 p-2 animate-in slide-in-from-top-2 duration-200">
 <button onClick={() => { onNavigate('auctions'); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-6 py-3 text-sm text-gray-600 hover:text-[#47CCD0] hover:bg-white rounded-xl font-medium transition-colors">
 <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
 {t('menu.realEstate')}
 </button>
 <button onClick={() => { onNavigate('car-auctions'); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-6 py-3 text-sm text-gray-600 hover:text-[#47CCD0] hover:bg-white rounded-xl font-medium transition-colors">
 <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
 {t('menu.cars')}
 </button>
 <button onClick={() => { onNavigate('car-plates-auctions'); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-6 py-3 text-sm text-gray-600 hover:text-[#47CCD0] hover:bg-white rounded-xl font-medium transition-colors">
 <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
 {t('menu.carPlates')}
 </button>
 <button onClick={() => { onNavigate('other-auctions'); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-6 py-3 text-sm text-gray-600 hover:text-[#47CCD0] hover:bg-white rounded-xl font-medium transition-colors">
 <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
 {t('menu.other')}
 </button>
 <div className="border-t border-gray-200/50 mt-2 pt-2">
 <button onClick={() => { onNavigate('auction-guide'); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-6 py-3 text-sm text-gray-600 hover:text-[#47CCD0] hover:bg-white rounded-xl font-medium transition-colors">
 <Gavel size={16} className="text-gray-400" />
 {t('menu.biddingGuide')}
 </button>
 <button onClick={() => { onNavigate('add-auction'); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-6 py-3 text-sm text-[#47CCD0] hover:bg-white rounded-xl font-bold transition-colors">
 <Plus size={16} />
 {t('menu.createAuction')}
 </button>
 </div>
 </div>
 )}
 </div>

 {/* Mobile Menu Wasata Toggle */}
 <div className="overflow-hidden">
 <button 
 onClick={(e) => { 
 e.stopPropagation(); 
 setIsUserWasataOpen(!isUserWasataOpen); 
 }} 
 className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all group"
 >
 <div className="flex items-center gap-3">
 <FileText size={20} className={`text-gray-500 group-hover:text-[#47CCD0] transition-colors ${isUserWasataOpen ? 'text-[#47CCD0]' : ''}`} />
 <span className={`font-bold transition-colors ${isUserWasataOpen ? 'text-[#47CCD0]' : 'text-gray-700 group-hover:text-[#47CCD0]'}`}>{t('menu.wasata')}</span>
 </div>
 <ChevronDown size={20} className={`text-gray-400 transition-transform ${isUserWasataOpen ? 'rotate-180 text-[#47CCD0]' : ''}`} />
 </button>
 
 {isUserWasataOpen && (
 <div className="bg-gray-50/50 p-2 animate-in slide-in-from-top-2 duration-200">
 {/* Residential */}
 <div className="mb-4">
 <h3 className="font-bold text-gray-900 px-4 mb-2">{t('menu.sakani')}</h3>
 <div className="space-y-1">
 <button onClick={() => { onNavigate('real-estate-for-sale'); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 bg-white rounded-xl text-sm text-gray-600 hover:text-[#47CCD0] transition-colors border border-gray-100 text-start">
 <Tag size={16} className="shrink-0 text-gray-400" />
 <span>{t('menu.forSale')}</span>
 </button>
 <button onClick={() => { onNavigate('real-estate-for-rent'); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 bg-white rounded-xl text-sm text-gray-600 hover:text-[#47CCD0] transition-colors border border-gray-100 text-start">
 <Key size={16} className="shrink-0 text-gray-400" />
 <span>{t('menu.forRent')}</span>
 </button>
 <button onClick={() => { onNavigate('daily-rent'); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 bg-white rounded-xl text-sm text-gray-600 hover:text-[#47CCD0] transition-colors border border-gray-100 text-start">
 <Calendar size={16} className="shrink-0 text-gray-400" />
 <span>{t('menu.dailyRent')}</span>
 </button>
 </div>
 </div>

 {/* Commercial */}
 <div className="mb-2">
 <div className="flex items-center gap-2 px-4 mb-2">
 <h3 className="font-bold text-gray-900">{t('menu.commercial')}</h3>
 <span className="bg-green-600 text-white text-[10px] px-2 py-0.5 rounded-md font-bold">{t('menu.new')}</span>
 </div>
 <div className="space-y-1">
 <button onClick={() => { onNavigate('commercial-sale'); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 bg-white rounded-xl text-sm text-gray-600 hover:text-[#47CCD0] transition-colors border border-gray-100 text-start">
 <Tag size={16} className="shrink-0 text-gray-400" />
 <span>{t('menu.forSale')}</span>
 </button>
 <button onClick={() => { onNavigate('commercial-rent'); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 bg-white rounded-xl text-sm text-gray-600 hover:text-[#47CCD0] transition-colors border border-gray-100 text-start">
 <Key size={16} className="shrink-0 text-gray-400" />
 <span>{t('menu.forRent')}</span>
 </button>
 </div>
 </div>

 {/* Brokerage Guide */}
 <div className="border-t border-gray-200/50 mt-3 pt-3">
 <button onClick={() => { onNavigate('brokerage-guide'); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white rounded-xl text-sm text-[#47CCD0] font-bold transition-colors text-start">
 <BookOpen size={16} className="shrink-0" />
 <span>{t('menu.brokerageGuide')}</span>
 </button>
 </div>
 </div>
 )}
 </div>

 {/* Mobile Menu Direct Sales Toggle */}
 <div className="overflow-hidden">
 <button 
 onClick={(e) => { 
 e.stopPropagation(); 
 setIsUserDirectSalesOpen(!isUserDirectSalesOpen); 
 }} 
 className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all group"
 >
 <div className="flex items-center gap-3">
 <Tag size={20} className={`text-gray-500 group-hover:text-[#47CCD0] transition-colors ${isUserDirectSalesOpen ? 'text-[#47CCD0]' : ''}`} />
 <span className={`font-bold transition-colors ${isUserDirectSalesOpen ? 'text-[#47CCD0]' : 'text-gray-700 group-hover:text-[#47CCD0]'}`}>{t('header.directSale')}</span>
 </div>
 <ChevronDown size={20} className={`text-gray-400 transition-transform ${isUserDirectSalesOpen ? 'rotate-180 text-[#47CCD0]' : ''}`} />
 </button>
 
 {isUserDirectSalesOpen && (
 <div className="bg-gray-50/50 p-2 animate-in slide-in-from-top-2 duration-200">
 <button onClick={() => { onNavigate('direct-sale-cars'); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-6 py-3 text-sm text-gray-600 hover:text-[#47CCD0] hover:bg-white rounded-xl font-medium transition-colors">
 <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
 {t('menu.cars')}
 </button>
 <button onClick={() => { onNavigate('direct-sale-plates'); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-6 py-3 text-sm text-gray-600 hover:text-[#47CCD0] hover:bg-white rounded-xl font-medium transition-colors">
 <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
 {t('menu.carPlates')}
 </button>
 <button onClick={() => { onNavigate('direct-sale-other'); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-6 py-3 text-sm text-gray-600 hover:text-[#47CCD0] hover:bg-white rounded-xl font-medium transition-colors">
 <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
 {t('headerDrop.other')}
 </button>
 </div>
 )}
 </div>

 <button 
 onClick={() => { onNavigate('wallet'); setIsMobileMenuOpen(false); }} 
 className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all group"
 >
 <div className="flex items-center gap-3">
 <Wallet size={20} className="text-gray-500 group-hover:text-[#47CCD0] transition-colors" />
 <span className="font-bold text-gray-700 group-hover:text-[#47CCD0]">{t('header.wallet')}</span>
 </div>
 </button>

 <button 
 onClick={() => { onNavigate('dashboard?tab=settings'); setIsMobileMenuOpen(false); }} 
 className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all group"
 >
 <div className="flex items-center gap-3">
 <Settings size={20} className="text-gray-500 group-hover:text-[#47CCD0] transition-colors" />
 <span className="font-bold text-gray-700 group-hover:text-[#47CCD0]">{t('header.settings')}</span>
 </div>
 </button>

 <button
 onClick={() => { onNavigate('consulting'); setIsMobileMenuOpen(false); }}
 className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all group"
 >
 <div className="flex items-center gap-3">
 <Briefcase size={20} className="text-gray-500 group-hover:text-[#47CCD0] transition-colors" />
 <span className="font-bold text-gray-700 group-hover:text-[#47CCD0]">{t('headerDrop.consulting')}</span>
 </div>
 </button>

 <button
 onClick={() => { onNavigate('additional-services'); setIsMobileMenuOpen(false); }}
 className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all group"
 >
 <div className="flex items-center gap-3">
 <Plus size={20} className="text-gray-500 group-hover:text-[#47CCD0] transition-colors" />
 <span className="font-bold text-gray-700 group-hover:text-[#47CCD0]">{t('menu.additionalServices')}</span>
 </div>
 </button>

 <button 
 className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all group"
 >
 <div className="flex items-center gap-3">
 <Smartphone size={20} className="text-gray-500 group-hover:text-[#47CCD0] transition-colors" />
 <span className="font-bold text-gray-700 group-hover:text-[#47CCD0]">{t('header.downloadApp')}</span>
 </div>
 </button>
 
 {isLoggedIn && (
 <button 
 onClick={() => { window.location.href = '/'; }}
 className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition-all group border-t border-gray-100"
 >
 <div className="flex items-center gap-3">
 <LogOut size={20} className="text-red-500" />
 <span className="font-bold text-red-500">{t('menu.logout')}</span>
 </div>
 </button>
 )}
 </div>

 </div>
 </div>
 </div>
 );
};
