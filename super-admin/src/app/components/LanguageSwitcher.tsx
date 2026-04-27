import React from 'react';
import { useTranslation } from '../context/TranslationContext';
import { Globe, Languages } from 'lucide-react';

interface LanguageSwitcherProps {
  variant?: 'default' | 'compact' | 'icon' | 'sidebar';
  className?: string;
}

export function LanguageSwitcher({ variant = 'default', className = '' }: LanguageSwitcherProps) {
  const { language, toggleLanguage, direction } = useTranslation();
  const isRTL = direction === 'rtl';

  // Sidebar variant - Enhanced design with high contrast
  if (variant === 'sidebar') {
    return (
      <div className="w-full">
        {/* Toggle Button */}
        <button
          onClick={toggleLanguage}
          className="w-full px-4 py-3 rounded-lg bg-white/95 dark:bg-white/90 
                     hover:bg-white dark:hover:bg-white
                     transition-all duration-300 ease-out
                     shadow-sm hover:shadow-md
                     group relative overflow-hidden"
          aria-label={language === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
        >
          {/* Hover effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#47CCD0]/5 to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Content */}
          <div className="relative flex items-center justify-center gap-2">
            <span className="text-[15px] font-medium text-[#2B3D50] tracking-wide">
              {language === 'ar' ? 'EN' : 'عربي'}
            </span>
            <Globe className="w-4 h-4 text-[#2B3D50]/60 group-hover:text-[#47CCD0] transition-colors" />
          </div>
        </button>
      </div>
    );
  }

  // Icon variant
  if (variant === 'icon') {
    return (
      <button
        onClick={toggleLanguage}
        className={`p-2.5 rounded-lg 
                   bg-gray-100/80 dark:bg-gray-700/50
                   hover:bg-gray-200 dark:hover:bg-gray-600
                   border border-gray-200/50 dark:border-gray-600/50
                   transition-all duration-200
                   group ${className}`}
        title={language === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
        aria-label={language === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
      >
        <Globe className="w-5 h-5 text-gray-600 dark:text-gray-300 
                         group-hover:text-[#47CCD0] transition-colors" />
      </button>
    );
  }

  // Compact variant
  if (variant === 'compact') {
    return (
      <button
        onClick={toggleLanguage}
        className={`px-4 py-2 rounded-lg 
                   bg-white dark:bg-gray-800 
                   border-2 border-gray-200 dark:border-gray-600
                   hover:border-[#47CCD0] dark:hover:border-[#47CCD0]
                   transition-all duration-200 
                   text-sm font-semibold
                   text-gray-700 dark:text-gray-200
                   hover:text-[#47CCD0] dark:hover:text-[#47CCD0]
                   hover:shadow-md
                   ${className}`}
      >
        {language === 'ar' ? 'EN' : 'عربي'}
      </button>
    );
  }

  // Default variant - Full button with icon
  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-3 px-5 py-2.5 rounded-lg 
                 bg-white dark:bg-gray-800 
                 border-2 border-gray-200 dark:border-gray-600
                 hover:border-[#47CCD0] dark:hover:border-[#47CCD0]
                 transition-all duration-200
                 hover:shadow-lg hover:shadow-[#47CCD0]/20
                 group ${className}`}
    >
      <Globe className="w-5 h-5 text-gray-500 dark:text-gray-400 
                       group-hover:text-[#47CCD0] transition-colors" />
      <span className="font-semibold text-gray-700 dark:text-gray-200 
                      group-hover:text-[#47CCD0] transition-colors">
        {language === 'ar' ? 'English' : 'العربية'}
      </span>
    </button>
  );
}