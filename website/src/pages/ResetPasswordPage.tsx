import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { LoginLayout } from '../components/auth/LoginLayout';
import { supabase } from '../utils/supabase/client';

interface ResetPasswordPageProps {
  onNavigate: (page: string) => void;
}

export const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm({
    mode: 'onChange'
  });

  const newPassword = watch('password');

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setErrorMsg('');

    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password
      });

      if (error) {
        console.error("Error updating password:", error);
        setErrorMsg(t('resetPassword.errorSessionExpired'));
      } else {
        setIsSuccess(true);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(t('resetPassword.errorUnexpected'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginLayout
      imageUrl="https://images.unsplash.com/photo-1775015682021-1548fc36ee4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXlhZGglMjBtb2Rlcm4lMjBidXNpbmVzcyUyMGJ1aWxkaW5nfGVufDF8fHx8MTc3NTY5MTUyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      imageAlt={t('resetPassword.imageAlt')}
      onNavigate={onNavigate}
    >
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-[#2B3D50] mb-4 tracking-tight leading-tight">
          {t('resetPassword.title')}
        </h1>
        <p className="text-gray-500 text-lg font-bold">
          {t('resetPassword.subtitle')}
        </p>
      </div>

      {isSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#149B61]/10 border border-[#149B61]/20 rounded-2xl p-8 text-center"
        >
          <div className="w-20 h-20 bg-[#149B61] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#149B61]/20">
            <CheckCircle2 size={40} className="text-white" />
          </div>
          <h3 className="text-2xl font-black text-[#149B61] mb-2">{t('resetPassword.successTitle')}</h3>
          <p className="text-gray-600 font-bold mb-8">
            {t('resetPassword.successMessage')}
          </p>
          <button
            onClick={() => onNavigate('login')}
            className="w-full h-14 bg-[#2B3D50] text-white rounded-lg font-bold hover:bg-[#1a2530] transition-all flex items-center justify-center gap-2"
          >
            <ArrowRight size={20} className="rotate-180" />
            {t('resetPassword.goToLogin')}
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-50 text-red-600 rounded-lg text-sm font-bold border border-red-100 text-center"
            >
              {errorMsg}
            </motion.div>
          )}

          {/* New Password Input */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 block text-end">{t('resetPassword.newPasswordLabel')}</label>
            <div className="relative">
              <input
                {...register('password', {
                  required: t('resetPassword.passwordRequired'),
                  minLength: { value: 8, message: t('resetPassword.passwordMinLength') }
                })}
                type={showPassword ? "text" : "password"}
                className={`w-full h-14 bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-lg px-4 pe-12 text-end text-gray-900 focus:outline-none focus:border-[#2B3D50] focus:ring-2 focus:ring-[#2B3D50]/10 transition-all placeholder:text-gray-400 font-sans`}
                placeholder={t('resetPassword.newPasswordPlaceholder')}
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
                <span className="text-red-500 text-xs mt-1 block text-end font-bold">{errors.password.message as string}</span>
              )}
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 block text-end">{t('resetPassword.confirmPasswordLabel')}</label>
            <div className="relative">
              <input
                {...register('confirmPassword', {
                  required: t('resetPassword.confirmPasswordRequired'),
                  validate: value => value === newPassword || t('resetPassword.passwordMismatch')
                })}
                type={showConfirmPassword ? "text" : "password"}
                className={`w-full h-14 bg-gray-50 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} rounded-lg px-4 pe-12 text-end text-gray-900 focus:outline-none focus:border-[#2B3D50] focus:ring-2 focus:ring-[#2B3D50]/10 transition-all placeholder:text-gray-400 font-sans`}
                placeholder={t('resetPassword.confirmPasswordPlaceholder')}
                dir="ltr"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-1/2 end-4 -translate-y-1/2 text-gray-400 hover:text-[#2B3D50] transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.confirmPassword && (
                <span className="text-red-500 text-xs mt-1 block text-end font-bold">{errors.confirmPassword.message as string}</span>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={!isValid || isLoading}
            className="w-full h-14 bg-[#2B3D50] text-white rounded-lg font-bold hover:bg-[#1a2530] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#2B3D50]/10 flex items-center justify-center gap-3 text-lg mt-8"
          >
            {isLoading ? <Loader2 className="animate-spin w-6 h-6 text-[#47CCD0]" /> : t('resetPassword.saveButton')}
          </button>

        </form>
      )}
    </LoginLayout>
  );
};
