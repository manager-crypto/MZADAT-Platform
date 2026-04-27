import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '../ui/dialog';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from '../ui/input-otp';
import {
  User,
  Loader2,
  ArrowRight,
  Fingerprint,
  ScanFace,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Cloud,
  AlertCircle
} from 'lucide-react';
import biometricIcon from 'figma:asset/7ec520aca8d5b18f2ead46d4a1303989432c60ff.png';

import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState<'selection' | 'login' | 'biometric'>('selection');
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isCloudflareChecked, setIsCloudflareChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setStep('selection');
      setUsername('');
      setPassword('');
      setShowPassword(false);
      setIsCloudflareChecked(false);
      setIsLoading(false);
      setScanStatus('idle');
    }
  }, [isOpen]);

  // Handle biometric scan process
  useEffect(() => {
    let startScan: NodeJS.Timeout;
    let completeScan: NodeJS.Timeout;
    let redirect: NodeJS.Timeout;

    if (step === 'biometric') {
      startScan = setTimeout(() => setScanStatus('scanning'), 500);
      completeScan = setTimeout(() => setScanStatus('success'), 2500);
      redirect = setTimeout(() => {
        onLogin?.();
        onClose();
      }, 4000);
    }

    return () => {
      clearTimeout(startScan);
      clearTimeout(completeScan);
      clearTimeout(redirect);
    };
  }, [step, onLogin, onClose]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password || !isCloudflareChecked) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (onLogin) onLogin();
      onClose();
    }, 1500);
  };

  const handleNafathLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onLogin) onLogin();
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden bg-white border-none shadow-2xl rounded-3xl">
        <div className="p-8 pb-10">
          
          {step === 'selection' ? (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 py-4">
               <div className="text-center mb-10">
                 <DialogTitle className="text-gray-500 font-medium text-xl mb-1">{t('loginModal.welcome')}</DialogTitle>
                 <DialogDescription className="sr-only">{t('loginModal.chooseMethod')}</DialogDescription>
               </div>
               
               <div className="space-y-4">
                 <div className="group relative">
                   <button 
                     onClick={handleNafathLogin}
                     className="w-full bg-[#2D9F49] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#24803b] transition-all shadow-lg shadow-[#2D9F49]/20 flex items-center justify-between px-6"
                   >
                     <span>{t('loginModal.loginViaNafath')}</span>
                     <div className="flex items-center gap-2">
                       <Fingerprint size={24} strokeWidth={1.5} />
                       <ScanFace size={24} strokeWidth={1.5} />
                     </div>
                   </button>
                   {/* Tooltip */}
                   <div className="absolute -top-10 start-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                     {t('loginModal.nafathRequired')}
                   </div>
                 </div>
                 
                 <button 
                   onClick={() => setStep('login')}
                   className="w-full bg-white border-2 border-gray-100 text-gray-800 py-4 rounded-xl font-bold text-lg hover:border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-center"
                 >
                   {t('loginModal.loginOrRegister')}
                 </button>
               </div>
            </div>
          ) : step === 'login' ? (
            <div className="animate-in fade-in slide-in-from-end-8 duration-300">
               {/* Header Icon */}
               <div className="flex justify-center mb-6">
                 <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center rotate-45 mb-2 shadow-sm border border-gray-100">
                    <div className="-rotate-45 text-[#47CCD0]">
                      <User size={32} />
                    </div>
                 </div>
               </div>

               <div className="text-center mb-8">
                 <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">{t('loginModal.welcomeBack')}</DialogTitle>
                 <DialogDescription className="text-gray-500 text-sm max-w-[280px] mx-auto leading-relaxed">
                   {t('loginModal.bestDeal')}
                 </DialogDescription>
               </div>

               <form onSubmit={handleLoginSubmit} className="space-y-4">
                 {/* Email/Username Input */}
                 <div>
                    <label className="text-xs font-bold text-gray-700 mb-1.5 block">{t('loginModal.phoneOrIdLabel')}</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pe-10 text-end focus:outline-none focus:border-[#47CCD0] focus:ring-4 focus:ring-[#47CCD0]/10 transition-all text-sm"
                        placeholder={t('loginModal.phoneOrIdPlaceholder')}

                      />
                      <Lock className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                 </div>

                 {/* Password Input */}
                 <div>
                    <label className="text-xs font-bold text-gray-700 mb-1.5 block">{t('loginModal.passwordLabel')}</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pe-10 ps-10 text-end focus:outline-none focus:border-[#47CCD0] focus:ring-4 focus:ring-[#47CCD0]/10 transition-all text-sm font-sans"
                        placeholder="••••••••"

                      />
                      <Lock className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <div className="text-start mt-2">
                       <button type="button" className="text-xs text-[#47CCD0] font-bold hover:underline">{t('loginModal.forgotPassword')}</button>
                    </div>
                 </div>

                 {/* Cloudflare Mock */}
                 <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="relative flex items-center justify-center">
                          <input 
                            type="checkbox" 
                            checked={isCloudflareChecked}
                            onChange={(e) => setIsCloudflareChecked(e.target.checked)}
                            className="peer w-6 h-6 border-2 border-gray-300 rounded cursor-pointer checked:bg-[#47CCD0] checked:border-[#47CCD0] transition-all appearance-none"
                          />
                          <CheckCircle2 className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" size={16} />
                       </div>
                       <span className="text-sm text-gray-700">I am human</span>
                    </div>
                    <div className="flex flex-col items-end">
                       <Cloud size={20} className="text-gray-400" />
                       <span className="text-[10px] text-gray-400">Cloudflare</span>
                    </div>
                 </div>

                 <div className="flex flex-col gap-3 mt-4">
                   <button
                     type="submit"
                     disabled={!isCloudflareChecked || !username || !password || isLoading}
                     className="w-full bg-[#115E59] text-white py-3 rounded-xl font-bold hover:bg-[#0F504C] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-teal-900/10 flex items-center justify-center gap-2"
                   >
                     {isLoading ? <Loader2 className="animate-spin" /> : t('loginModal.loginButton')}
                   </button>

                   <button
                     type="button"
                     className="w-full bg-white border border-gray-200 text-[#115E59] py-3 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-3 shadow-sm group"
                     onClick={() => setStep('biometric')}
                   >
                     <img 
                       src={biometricIcon} 
                       alt="Face ID / Fingerprint" 
                       className="w-5 h-5 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                       onError={(e) => {
                         e.currentTarget.style.display = 'none';
                         const nextEl = e.currentTarget.nextElementSibling;
                         if (nextEl) nextEl.classList.remove('hidden');
                         if (nextEl) nextEl.classList.add('flex');
                       }}
                     />
                     <div className="hidden items-center gap-2 text-gray-400 group-hover:text-[#115E59] transition-colors">
                        <ScanFace size={18} />
                        <Fingerprint size={18} />
                     </div>
                     <span className="text-sm">{t('loginModal.biometricLogin')}</span>
                   </button>
                 </div>

                 <div className="text-center mt-4">
                    <span className="text-gray-500 text-xs">{t('loginModal.noAccount')} </span>
                    <button type="button" className="text-[#47CCD0] font-bold text-xs hover:underline">{t('loginModal.createAccount')}</button>
                 </div>
                 
                 <div className="flex justify-center gap-4 mt-6 text-[10px] text-[#47CCD0]">
                    <a href="#" className="hover:underline">{t('loginModal.terms')}</a>
                    <a href="#" className="hover:underline">{t('loginModal.privacy')}</a>
                 </div>

               </form>
            </div>
          ) : (
            <div className="animate-in fade-in zoom-in-95 duration-300 flex flex-col items-center justify-center py-8">
              <DialogTitle className="text-xl font-bold text-gray-900 mb-2">{t('loginModal.biometricTitle')}</DialogTitle>
              <DialogDescription className="text-gray-500 text-sm mb-8 text-center">
                {scanStatus === 'idle' && t('loginModal.scanIdle')}
                {scanStatus === 'scanning' && t('loginModal.scanScanning')}
                {scanStatus === 'success' && t('loginModal.scanSuccess')}
                {scanStatus === 'error' && t('loginModal.scanError')}
              </DialogDescription>

              <div className="relative w-40 h-40 mx-auto flex items-center justify-center mb-8">
                {/* Scanning Animation */}
                {scanStatus === 'scanning' && (
                  <motion.div 
                    className="absolute inset-0 rounded-full border-4 border-[#2B3D50]/20"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  />
                )}

                {scanStatus === 'scanning' && (
                  <motion.div 
                    className="absolute inset-0 rounded-full border-4 border-[#115E59]/30"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 0.5, ease: "linear" }}
                  />
                )}

                {/* Status Icon */}
                <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 shadow-xl relative z-10 ${
                  scanStatus === 'success' ? 'bg-green-50 text-green-500 shadow-green-900/10' :
                  scanStatus === 'error' ? 'bg-red-50 text-red-500 shadow-red-900/10' :
                  'bg-white text-[#115E59] shadow-teal-900/10'
                }`}>
                  {scanStatus === 'success' ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                      <CheckCircle2 size={48} />
                    </motion.div>
                  ) : scanStatus === 'error' ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                      <AlertCircle size={48} />
                    </motion.div>
                  ) : (
                    <div className="relative group flex items-center justify-center">
                      <img 
                        src={biometricIcon} 
                        alt="Face ID / Fingerprint" 
                        className="w-12 h-12 object-contain z-0"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const nextEl = e.currentTarget.nextElementSibling;
                          if (nextEl) nextEl.classList.remove('hidden');
                          if (nextEl) nextEl.classList.add('flex');
                        }}
                      />
                      <div className="hidden items-center justify-center gap-2 relative z-0">
                        <ScanFace size={48} className="opacity-80 absolute" />
                      </div>
                      
                      {scanStatus === 'scanning' && (
                        <motion.div
                           animate={{ y: [-30, 30, -30] }}
                           transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                           className="absolute w-24 h-1 bg-[#115E59] shadow-[0_0_12px_#115E59] rounded-full z-10 opacity-80"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => setStep('login')}
                className="text-sm font-bold text-gray-400 hover:text-[#115E59] transition-colors"
              >
                {t('loginModal.cancelBiometric')}
              </button>
            </div>
          )}
          
        </div>
      </DialogContent>
    </Dialog>
  );
};