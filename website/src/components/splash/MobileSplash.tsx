import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import logoImage from 'figma:asset/70a549db43a3294ca041bd716e8022066cbe43be.png';
import splashBgImage from 'figma:asset/d28b4504d12b9c29ec591f1f578731428ec41f46.png';
import { useTranslation } from 'react-i18next';

interface MobileSplashProps {
 onComplete: () => void;
}

export const MobileSplash: React.FC<MobileSplashProps> = ({ onComplete }) => {
 const { t } = useTranslation();
 const [phase, setPhase] = useState(0);

 useEffect(() => {
 // Sequence of animations
 const t1 = setTimeout(() => setPhase(1), 500); // Scale up and rotate
 const t2 = setTimeout(() => setPhase(2), 1500); // Scale down and straighten
 const t3 = setTimeout(() => setPhase(3), 2500); // Final phase: show bg and text

 return () => {
 clearTimeout(t1);
 clearTimeout(t2);
 clearTimeout(t3);
 };
 }, []);

 const isFinalPhase = phase >= 3;
 
 return (
 <motion.div
 className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden bg-black"
 initial={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 transition={{ duration: 0.6, ease: "easeInOut" }}
 >
 {/* Background Image - Shows in final phase */}
 <motion.div 
 className="absolute inset-0 pointer-events-none z-0 flex justify-center"
 initial={{ opacity: 0 }}
 animate={{ opacity: isFinalPhase ? 0.4 : 0 }}
 transition={{ duration: 0.8, ease: "easeInOut" }}
 >
 <img 
 src={splashBgImage} 
 alt="Splash Background" 
 // Use object-contain on md+ to show the man fully without cropping
 className="w-full h-full object-cover md:object-contain md:object-bottom"
 />
 {/* Gradient overlays to ensure text readability and seamless blending into black */}
 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent md:via-transparent" />
 <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent" />
 </motion.div>

 <div className="relative flex flex-col items-center justify-center h-full w-full z-10">
 {/* 
 This layout wrapper ensures that when the text dynamically appears,
 both the logo and text smoothly shift to remain perfectly centered together.
 */}
 <motion.div layout className="flex flex-col items-center justify-center">
 
 {/* Logo */}
 <motion.div
 layout
 animate={{
 scale: phase === 0 ? 1 : phase === 1 ? 1.6 : 1,
 rotate: phase === 1 ? -45 : 0,
 }}
 transition={{ 
 duration: 0.8, 
 type: "spring", 
 stiffness: 100,
 damping: 12
 }}
 className="z-10 flex items-center justify-center"
 >
 <img 
 src={logoImage} 
 alt="Mzadat Logo" 
 className="w-24 h-24 md:w-28 md:h-28 object-contain transition-all duration-500 ease-in-out"
 style={{
 filter: isFinalPhase ? 'brightness(0) invert(1)' : 'brightness(1) invert(0)'
 }}
 />
 </motion.div>

 {/* Text Container */}
 <AnimatePresence>
 {isFinalPhase && (
 <motion.div
 layout
 initial={{ opacity: 0, height: 0 }}
 animate={{ opacity: 1, height: 'auto' }}
 transition={{ duration: 0.5, ease: "easeOut" }}
 className="flex flex-col items-center cursor-pointer group overflow-hidden"
 onClick={onComplete}
 >
 <motion.div 
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2, duration: 0.4 }}
 className="pt-4 md:pt-5 flex flex-col items-center"
 >
 <span className="text-white text-[24px] md:text-[28px] font-bold mb-1 whitespace-nowrap tracking-wide group-active:scale-95 transition-transform" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
 {t('splash.startNow')}
 </span>
 <span className="text-white text-[10px] md:text-[11px] tracking-[0.25em] font-bold opacity-80 uppercase whitespace-nowrap" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
 START NOW
 </span>
 </motion.div>
 </motion.div>
 )}
 </AnimatePresence>

 </motion.div>
 </div>
 </motion.div>
 );
};
