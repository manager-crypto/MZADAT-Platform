import React, { useState, useRef, useEffect } from 'react';
import { House, Gavel, LayoutGrid, UserRound, Plus, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import logoImage from 'figma:asset/70a549db43a3294ca041bd716e8022066cbe43be.png';
import { useTranslation } from 'react-i18next';

interface MobileBottomNavProps {
 onNavigate: (page: string) => void;
 onOpenLogin: () => void;
 isLoggedIn?: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onNavigate, onOpenLogin, isLoggedIn }) => {
 const { t } = useTranslation();
 const location = useLocation();
 const currentPath = location.pathname.substring(1) || 'home';
 const [isMenuOpen, setIsMenuOpen] = useState(false);
 const menuRef = useRef<HTMLDivElement>(null);

 // Close menu on outside click
 useEffect(() => {
 if (!isMenuOpen) return;
 const handler = (e: MouseEvent) => {
 if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
 setIsMenuOpen(false);
 }
 };
 document.addEventListener('mousedown', handler);
 return () => document.removeEventListener('mousedown', handler);
 }, [isMenuOpen]);

 const navItems = [
 { id: 'home', icon: House, label: t('header.home') },
 { id: 'auctions', icon: Gavel, label: t('header.auctions') },
 { id: 'center', label: '' }, // placeholder for center logo
 { id: 'services', icon: LayoutGrid, label: t('mobileNav.services') },
 { id: 'profile', icon: UserRound, label: t('mobileNav.profile') },
 ];

 return (
 <>
 {/* Overlay */}
 <AnimatePresence>
 {isMenuOpen && (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 transition={{ duration: 0.2 }}
 className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[99]"
 onClick={() => setIsMenuOpen(false)}
 />
 )}
 </AnimatePresence>

 <div className="lg:hidden fixed bottom-0 start-0 w-full z-[100]">
 {/* Floating Action Menu */}
 <AnimatePresence>
 {isMenuOpen && (
 <motion.div
 ref={menuRef}
 initial={{ opacity: 0, y: 20, scale: 0.9 }}
 animate={{ opacity: 1, y: 0, scale: 1 }}
 exit={{ opacity: 0, y: 20, scale: 0.9 }}
 transition={{ duration: 0.25, ease: 'easeOut' }}
 className="absolute bottom-[85px] start-1/2 -translate-x-1/2 flex flex-col gap-3 items-center"
 >
 <button
 onClick={() => { setIsMenuOpen(false); onNavigate('add-auction'); }}
 className="flex items-center gap-2.5 px-5 py-3 bg-[#0d1a24] border border-[#47CCD0]/30 rounded-2xl shadow-[0_8px_30px_rgba(71,204,208,0.25)] active:scale-95 transition-transform"
 >
 <div className="w-7 h-7 rounded-lg bg-[#47CCD0]/15 flex items-center justify-center">
 <Plus size={16} className="text-[#47CCD0]" />
 </div>
 <span className="text-white font-bold text-sm whitespace-nowrap" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>{t('mobileNav.addAuction')}</span>
 </button>
 <button
 onClick={() => { setIsMenuOpen(false); onNavigate('add-ad'); }}
 className="flex items-center gap-2.5 px-5 py-3 bg-[#0d1a24] border border-[#47CCD0]/30 rounded-2xl shadow-[0_8px_30px_rgba(71,204,208,0.25)] active:scale-95 transition-transform"
 >
 <div className="w-7 h-7 rounded-lg bg-[#47CCD0]/15 flex items-center justify-center">
 <Plus size={16} className="text-[#47CCD0]" />
 </div>
 <span className="text-white font-bold text-sm whitespace-nowrap" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>{t('mobileNav.addAd')}</span>
 </button>
 </motion.div>
 )}
 </AnimatePresence>

 {/* Nav Bar */}
 <div className="bg-[#0B1118]/95 backdrop-blur-xl border-t border-white/[0.06] shadow-[0_-4px_24px_rgba(0,0,0,0.3)] pb-[env(safe-area-inset-bottom)]">
 <div className="flex justify-around items-end h-[68px] px-1">
 {navItems.map((item) => {
 if (item.id === 'center') {
 // Center Logo Button
 return (
 <button
 key="center"
 onClick={() => setIsMenuOpen(prev => !prev)}
 className="flex flex-col items-center justify-center -mt-22 group relative"
 >
 {/* Shadow under circle */}
 <div className="absolute top-[80px] w-16 h-4 bg-black/10 rounded-full blur-md" />
 <motion.div
 animate={isMenuOpen ? { rotate: 180 } : { rotate: 0 }}
 transition={{ duration: 0.3 }}
 className="w-[72px] h-[72px] rounded-full flex items-center justify-center shadow-[0_8px_28px_rgba(71,204,208,0.4)] border-4 border-gray-500 overflow-hidden"
 style={{ background: 'linear-gradient(135deg, #47CCD0, #2bb5b9)' }}
 >
 {isMenuOpen ? (
 <X size={28} className="text-white" />
 ) : (
 <img src={logoImage} alt={t('header.home')} className="w-[52px] h-[52px] object-contain brightness-0 invert" />
 )}
 </motion.div>
 </button>
 );
 }

 const Icon = item.icon!;
 const isActive = currentPath === item.id || (item.id === 'services' && currentPath.startsWith('services/'));

 return (
 <button
 key={item.id}
 onClick={() => {
 if (item.id === 'profile' && !isLoggedIn) {
 onOpenLogin();
 } else if (item.id === 'profile' && isLoggedIn) {
 onNavigate('dashboard');
 } else if (item.id === 'services') {
 onNavigate('real-estate-for-sale');
 } else {
 onNavigate(item.id);
 }
 }}
 className={`flex flex-col items-center justify-center w-[68px] pb-1.5 pt-2 transition-all active:scale-90 ${
 isActive ? 'text-[#47CCD0]' : 'text-white/40'
 }`}
 >
 <div className="relative">
 {isActive && (
 <div className="absolute -top-1 start-1/2 -translate-x-1/2 w-5 h-[3px] bg-[#47CCD0] rounded-full" />
 )}
 <Icon size={23} strokeWidth={isActive ? 2.2 : 1.8} />
 </div>
 <span className={`text-[10px] mt-1 tracking-wide ${isActive ? 'font-bold' : 'font-medium'}`} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
 {item.label}
 </span>
 </button>
 );
 })}
 </div>
 </div>
 </div>
 </>
 );
};