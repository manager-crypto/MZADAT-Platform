import React, { useState, useEffect } from 'react';
import { Timer, ArrowLeft, ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface UrgentAlertBarProps {
 onNavigate: (page: string) => void;
}

export const UrgentAlertBar: React.FC<UrgentAlertBarProps> = ({ onNavigate }) => {
 const { t } = useTranslation();
 const [isVisible, setIsVisible] = useState(true);
 const [timeLeft, setTimeLeft] = useState('00:43:50');

 useEffect(() => {
 // Simple timer simulation
 const timer = setInterval(() => {
 // Logic for countdown would go here
 }, 1000);
 return () => clearInterval(timer);
 }, []);

 if (!isVisible) return null;

 return (
 <div className="bg-red-600 text-white relative z-[60] overflow-hidden hidden md:block">
 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
 <div className="container mx-auto px-4 py-2 relative flex items-center justify-between">
 
 <div className="flex items-center gap-3">
 <div className="bg-white/20 p-1.5 rounded-full animate-pulse">
 <Timer size={16} />
 </div>
 <span className="text-sm font-bold tracking-wide">
 {t('urgentAlert.endingSoon')} ({timeLeft})
 </span>
 <div className="h-4 w-px bg-white/30 mx-2"></div>
 <button 
 onClick={() => onNavigate('auctions')}
 className="text-xs font-bold hover:underline underline-offset-4 flex items-center gap-1 group"
 >
 {t('urgentAlert.viewDetails')} <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
 </button>
 </div>

 {/* ... (Close button logic is missing in the original, but let's keep it structurally identical or add close) */}
 </div>
 </div>
 );
};
