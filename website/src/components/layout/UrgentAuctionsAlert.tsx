import React, { useState, useEffect } from 'react';
import { AlertTriangle, ChevronLeft, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const UrgentAuctionsAlert: React.FC = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  if (!isVisible) return null;

  return (
    <div className="bg-red-600 text-white px-4 py-2 relative z-[60] overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 opacity-50" />
      <div className="max-w-[1440px] mx-auto flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          <AlertTriangle size={18} className="animate-pulse" />
          <span className="font-bold text-sm md:text-base whitespace-nowrap">{t('urgentAlert.title')}</span>
          
          <div className="overflow-hidden w-[200px] md:w-[400px] lg:w-[600px] relative h-6 flex items-center">
            <div className="animate-[scroll_15s_linear_infinite] whitespace-nowrap inline-flex gap-8 items-center text-sm">
              <span>{t('urgentAlert.auction1')}</span>
              <span>•</span>
              <span>{t('urgentAlert.auction2')}</span>
              <span>•</span>
              <span>{t('urgentAlert.auction3')}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/auctions')}
            className="hidden md:flex items-center gap-1 text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors"
          >
            {t('urgentAlert.viewDetails')} <ChevronLeft size={14} />
          </button>
          <button 
            onClick={() => setIsVisible(false)}
            className="hover:bg-white/20 p-1 rounded-full transition-colors"
            aria-label={t('urgentAlert.closeAlert')}
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
