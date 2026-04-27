import React, { ReactNode } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

interface LoginLayoutProps {
  children: ReactNode;
  imageUrl: string;
  imageAlt: string;
  onNavigate: (page: string) => void;
}

export const LoginLayout: React.FC<LoginLayoutProps> = ({ children, imageUrl, imageAlt, onNavigate }) => {
  const { t, i18n } = useTranslation();
  return (
    <div dir={i18n.dir()} className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-12 lg:py-0 bg-white order-2 lg:order-1 relative z-10">
        
        {/* Back to Home Button */}
        <button 
          onClick={() => onNavigate('home')}
          className="absolute top-8 end-8 text-gray-500 hover:text-[#2B3D50] flex items-center gap-2 transition-colors font-bold text-sm bg-gray-50 px-4 py-2 rounded-full"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          {t('addAdIntroPage.backToHome')}
        </button>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md mx-auto mt-12 lg:mt-0"
        >
          {children}
        </motion.div>
      </div>

      {/* Image Section */}
      <div className="hidden lg:block w-1/2 relative order-1 lg:order-2 overflow-hidden">
        <motion.div 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-gray-900"
        >
          <img 
            src={imageUrl} 
            alt={imageAlt} 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2B3D50]/80 via-[#2B3D50]/20 to-transparent mix-blend-multiply"></div>
          
          {/* Logo overlay on image */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12 text-center pointer-events-none">
            <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center transform rotate-45 mb-8 border border-white/20 shadow-2xl">
               <div className="transform -rotate-45 font-bold text-white text-3xl">
                 {/* Placeholder Logo Icon */}
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-12 h-12 text-[#47CCD0]">
                   <path d="M3 21h18M5 21V7l8-4 8 4v14" />
                 </svg>
               </div>
            </div>
            <h2 className="text-4xl font-black mb-4 tracking-tight drop-shadow-lg" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>{t('loginModal.platformTitle')}</h2>
            <p className="text-xl text-white/80 max-w-md leading-relaxed drop-shadow-md">{t('loginModal.imageDesc')}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
