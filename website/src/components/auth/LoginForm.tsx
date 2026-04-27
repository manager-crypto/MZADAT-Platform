import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

interface LoginFormProps {
  onSubmit: (data: any) => Promise<void>;
  isLoading: boolean;
  onNavigate: (page: string) => void;
  errorMsg?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading, onNavigate, errorMsg }) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: 'onChange'
  });

  const onFormSubmit = async (data: any) => {
    if (!isCaptchaVerified) return;
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      
      {errorMsg && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 text-red-600 rounded-lg text-sm font-bold border border-red-100"
        >
          {errorMsg}
        </motion.div>
      )}

      {/* Email Input */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700 block text-start">{t('loginForm.emailLabel')}</label>
        <div className="relative">
          <input
            {...register('email', {
              required: t('loginForm.emailRequired'),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: t('loginForm.emailInvalid')
              }
            })}
            type="email"
            className={`w-full h-14 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-lg px-4 text-start text-gray-900 focus:outline-none focus:border-[#2B3D50] focus:ring-2 focus:ring-[#2B3D50]/10 transition-all placeholder:text-gray-400 font-sans`}
            placeholder={t('loginForm.emailPlaceholder')}
            dir="ltr"
          />
          {errors.email && (
            <span className="text-red-500 text-xs mt-1 block text-start font-bold">{errors.email.message as string}</span>
          )}
        </div>
      </div>

      {/* Password Input */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <button 
            type="button" 
            onClick={() => onNavigate('forgot-password')}
            className="text-[#47CCD0] text-sm font-bold hover:text-[#2B3D50] transition-colors"
          >
            {t('loginForm.forgotPassword')}
          </button>
          <label className="text-sm font-bold text-gray-700">{t('loginForm.passwordLabel')}</label>
        </div>
        <div className="relative">
          <input 
            {...register('password', { required: t('loginForm.passwordRequired') })}
            type={showPassword ? "text" : "password"}
            className={`w-full h-14 bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-lg px-4 pe-12 text-start text-gray-900 focus:outline-none focus:border-[#2B3D50] focus:ring-2 focus:ring-[#2B3D50]/10 transition-all placeholder:text-gray-400 font-sans`}
            placeholder={t('loginForm.passwordPlaceholder')}
            dir="ltr"
          />
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 end-4 -translate-y-1/2 text-gray-400 hover:text-[#2B3D50] transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.password && (
            <span className="text-red-500 text-xs mt-1 block text-start font-bold">{errors.password.message as string}</span>
          )}
        </div>
      </div>

      {/* Cloudflare Captcha Mock */}
      <div 
        className={`bg-[#f9f9f9] border ${isCaptchaVerified ? 'border-[#2B3D50]/20' : 'border-[#e0e0e0]'} rounded-lg p-3 flex items-center justify-between shadow-sm cursor-pointer select-none transition-all hover:bg-gray-100`} 
        onClick={() => setIsCaptchaVerified(true)}
      >
        <div className="flex items-center gap-3">
          <div className={`w-6 h-6 rounded border flex items-center justify-center transition-all duration-300 ${isCaptchaVerified ? 'bg-[#2B3D50] border-[#2B3D50] scale-110' : 'bg-white border-gray-300 scale-100'}`}>
            {isCaptchaVerified && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                <CheckCircle2 size={16} className="text-[#47CCD0]" />
              </motion.div>
            )}
          </div>
          <span className="text-sm text-gray-700 font-bold">{t('loginForm.iAmHuman')}</span>
        </div>
        <div className="flex flex-col items-end">
           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Cloudflare_Logo.svg/1200px-Cloudflare_Logo.svg.png" alt="Cloudflare" className="h-3 opacity-40 mb-0.5 grayscale" />
           <span className="text-[10px] text-gray-400 font-sans">Privacy - Terms</span>
        </div>
      </div>

      {/* Login Button */}
      <button
        type="submit"
        disabled={!isValid || !isCaptchaVerified || isLoading}
        className="w-full h-14 bg-[#2B3D50] text-white rounded-lg font-bold hover:bg-[#1a2530] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#2B3D50]/10 flex items-center justify-center gap-3 text-lg"
      >
        {isLoading ? <Loader2 className="animate-spin w-6 h-6 text-[#47CCD0]" /> : t('loginForm.loginButton')}
      </button>

      {/* Sign Up Link */}
      <div className="text-center pt-2">
        <span className="text-gray-400 text-sm">{t('loginForm.noAccount')} </span>
        <button
          type="button"
          onClick={() => onNavigate('signup')}
          className="text-[#47CCD0] hover:text-[#2B3D50] font-bold text-sm transition-colors"
        >
          {t('loginForm.createAccount')}
        </button>
      </div>
    </form>
  );
};
