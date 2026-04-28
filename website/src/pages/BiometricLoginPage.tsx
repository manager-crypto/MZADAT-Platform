import React, { useState, useEffect } from 'react';
import { ScanFace, CheckCircle2, AlertCircle } from 'lucide-react';
import biometricIcon from 'figma:asset/7ec520aca8d5b18f2ead46d4a1303989432c60ff.png';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

interface BiometricLoginPageProps {
 onNavigate: (page: string) => void;
 onLogin?: () => void;
}

export const BiometricLoginPage: React.FC<BiometricLoginPageProps> = ({ onNavigate, onLogin }) => {
 const { t, i18n } = useTranslation();
 const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');

 useEffect(() => {
 const startScan = setTimeout(() => setScanStatus('scanning'), 500);
 const completeScan = setTimeout(() => setScanStatus('success'), 2500);
 const redirect = setTimeout(() => {
 onLogin?.();
 onNavigate('home');
 }, 4000);

 return () => {
 clearTimeout(startScan);
 clearTimeout(completeScan);
 clearTimeout(redirect);
 };
 }, [onNavigate, onLogin]);

 return (
 <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
 <div className="max-w-md w-full text-center space-y-8 relative">
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

 <div className="space-y-4 relative z-10">
 <h1 className="text-3xl font-black text-gray-900 font-sans tracking-tight">
 {t('biometric.title')}
 </h1>
 <div className="text-gray-500 text-lg">
 {scanStatus === 'idle' && t('biometric.idle')}
 {scanStatus === 'scanning' && t('biometric.scanning')}
 {scanStatus === 'success' && t('biometric.success')}
 {scanStatus === 'error' && t('biometric.error')}
 </div>
 </div>

 <div className="relative z-10 w-48 h-48 mx-auto flex items-center justify-center">
 {scanStatus === 'scanning' && (
 <>
 <motion.div
 className="absolute inset-0 rounded-full border-4 border-[#2B3D50]/20"
 animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
 transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
 />
 <motion.div
 className="absolute inset-0 rounded-full border-4 border-[#47CCD0]/30"
 animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
 transition={{ repeat: Infinity, duration: 2, delay: 0.5, ease: "linear" }}
 />
 </>
 )}

 <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 shadow-xl ${scanStatus === 'success' ? 'bg-green-50 text-green-500 shadow-green-900/10' :
 scanStatus === 'error' ? 'bg-red-50 text-red-500 shadow-red-900/10' :
 'bg-white text-[#2B3D50] shadow-teal-900/10'
 }`}>
 {scanStatus === 'success' ? (
 <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
 <CheckCircle2 size={64} />
 </motion.div>
 ) : scanStatus === 'error' ? (
 <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
 <AlertCircle size={64} />
 </motion.div>
 ) : (
 <div className="relative group flex items-center justify-center">
 <img src={biometricIcon} alt="Icon" className="w-16 h-16 object-contain" />
 </div>
 )}
 </div>
 </div>

 <div className="pt-8 relative z-10">
 <button
 onClick={() => onNavigate('login')}
 className="text-sm font-bold text-gray-500 hover:text-[#2B3D50] transition-colors"
 >
 {t('biometric.cancel')}
 </button>
 </div>
 </div>
 </div>
 );
};