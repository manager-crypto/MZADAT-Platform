import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { BackButton } from '../components/ui/BackButton';
import { useTranslation } from 'react-i18next';

interface AddAdIntroPageProps {
 onNavigate: (page: string) => void;
 onOpenLogin: () => void;
 mode?: 'ad' | 'auction' | 'transaction';
}

export const AddAdIntroPage: React.FC<AddAdIntroPageProps> = ({ onNavigate, onOpenLogin, mode = 'ad' }) => {
 const { t } = useTranslation();

 const getMessage = () => {
 switch (mode) {
 case 'auction':
 return t('addAdIntroPage.msgAuction');
 case 'transaction':
 return t('addAdIntroPage.msgTransaction');
 default:
 return t('addAdIntroPage.msgAd');
 }
 };

 return (
 <div className="min-h-screen bg-gray-50 dark:bg-[#2B3D50] flex flex-col items-center justify-center p-4 pt-36 transition-colors duration-300">
 <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 max-w-md w-full text-center animate-in fade-in slide-in-from-bottom-8 duration-500">
 <div className="w-24 h-24 bg-green-50 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-400 border-4 border-green-100 dark:border-green-800/50">
 <ShieldCheck size={48} />
 </div>
 <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('addAdIntroPage.identityVerification')}</h1>
 <p className="text-gray-500 dark:text-gray-300 mb-8 leading-relaxed">
 {getMessage()}
 </p>
 
 <button 
 onClick={onOpenLogin}
 className="w-full bg-[#2B9268] text-white py-4 rounded-xl font-bold text-xl hover:bg-[#237a56] transition-all shadow-lg shadow-green-500/20 dark:shadow-none flex items-center justify-center gap-3 group relative overflow-hidden mb-4"
 >
 <span>{t('addAdIntroPage.loginViaNafath')}</span>
 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
 </button>
 
 <div className="flex justify-center">
 <BackButton 
 onClick={() => onNavigate('home')}
 label={t('addAdIntroPage.backToHome')}
 className="!text-gray-400 dark:!text-gray-500 hover:bg-transparent"
 />
 </div>
 </div>
 
 <div className="mt-8 flex items-center gap-2 text-gray-400 dark:text-gray-500 text-xs">
 <ShieldCheck size={12} />
 <span>{t('addAdIntroPage.dataProtected')}</span>
 </div>
 </div>
 );
};
