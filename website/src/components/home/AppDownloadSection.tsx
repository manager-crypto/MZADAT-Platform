import React from 'react';
import { Apple } from 'lucide-react';
import appImage from 'figma:asset/0e3bd9719da3ae2f4de946454f9c3824f61ed6e4.png';
import bgLogo from 'figma:asset/3a446ef4bb7017d6e7b27d75432e54ca706c5a49.png';
import { useTranslation } from 'react-i18next';

export const AppDownloadSection = () => {
 const { t } = useTranslation();
 return (
 <div className="relative w-full bg-[#0F1115] overflow-hidden py-24 mt-20">
 {/* Background Logo - Large, covers entire section behind content */}
 <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
 <img 
 src={bgLogo} 
 alt="" 
 className="absolute w-[85%] h-auto opacity-30 object-contain transform scale-150 origin-center"
 />
 </div>
 
 {/* Content Container */}
 <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
 
 {/* Text Side (Right) */}
 <div className="text-end space-y-8 order-1 lg:pe-10">
 <div className="space-y-4">
 <span className="text-[#47CCD0] font-bold text-lg block tracking-wide">{t('appDownload.appName')}</span>
 <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.2]">
 {t('appDownload.headline1')} <br/>
 <span className="text-gray-500">{t('appDownload.headline2')}</span>
 </h2>
 <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
 {t('appDownload.description')}
 </p>
 </div>
 
 <div className="flex flex-wrap gap-4">
 {/* Google Play */}
 <button className="group flex items-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-300 text-white px-5 py-3 rounded-xl min-w-[170px]">
 <div className="w-8 h-8 flex items-center justify-center">
 <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current group-hover:scale-110 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg">
 <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.84L14.88,13.19M14.88,10.81L6.05,2.16L16.81,8.88C17.5,9.33 18,10.08 18,10.93C18,11.78 17.5,12.53 16.81,13" />
 </svg>
 </div>
 <div className="flex flex-col items-start">
 <span className="text-[10px] uppercase opacity-70 font-medium tracking-wider">GET IT ON</span>
 <span className="text-sm font-bold leading-tight font-sans">Google Play</span>
 </div>
 </button>

 {/* App Store */}
 <button className="group flex items-center gap-3 bg-white text-black hover:bg-gray-100 transition-all duration-300 px-5 py-3 rounded-xl min-w-[170px] shadow-lg shadow-white/5">
 <Apple size={28} className="fill-current group-hover:scale-110 transition-transform duration-300" />
 <div className="flex flex-col items-start">
 <span className="text-[10px] uppercase opacity-80 font-medium tracking-wider">Download on the</span>
 <span className="text-sm font-bold leading-tight font-sans">App Store</span>
 </div>
 </button>
 </div>
 </div>

 {/* Image Side (Left) */}
 <div className="relative order-2 flex justify-center lg:justify-end">
 <div className="relative z-10 w-64 md:w-80 lg:w-[400px] transform -rotate-[15deg] translate-y-10 lg:me-10 group perspective-1000">
 <div className="relative transition-transform duration-700 ease-out group-hover:rotate-0 group-hover:scale-105">
 <img 
 src={appImage} 
 alt="Mzadat App Interface" 
 className="w-full h-auto drop-shadow-2xl"
 />
 </div>
 
 {/* Glow Effect behind phone */}
 <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#47CCD0] blur-[100px] opacity-15 -z-10 rounded-full pointer-events-none"></div>
 </div>
 </div>

 </div>
 </div>
 );
};
