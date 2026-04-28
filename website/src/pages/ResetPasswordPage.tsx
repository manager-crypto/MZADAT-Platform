import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { LoginLayout } from '../components/auth/LoginLayout';
import { userAuthApi, UserAuthError } from '../services/userAuthApi';

interface ResetPasswordPageProps {
 onNavigate: (page: string, params?: any) => void;
 /** Phone number passed from ForgotPasswordPage (E.164 format). */
 phone?: string;
}

interface FormData {
 otp: string;
 password: string;
 confirmPassword: string;
}

/**
 * Step 2 of password reset.
 * Backend flow:
 * 1. POST /api/auth/otp/verify with { phone, code, purpose: "password_reset" }
 * → returns { reset_token }
 * 2. POST /api/auth/password/reset-confirm with { reset_token, new_password }
 * → succeeds + invalidates all existing sessions for that user.
 */
export const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ onNavigate, phone }) => {
 const { t } = useTranslation();
 const [showPassword, setShowPassword] = useState(false);
 const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 const [isLoading, setIsLoading] = useState(false);
 const [isSuccess, setIsSuccess] = useState(false);
 const [errorMsg, setErrorMsg] = useState('');

 const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<FormData>({
 mode: 'onChange'
 });

 const newPassword = watch('password');

 // If phone is missing (user landed here directly), redirect back to step 1.
 useEffect(() => {
 if (!phone) {
 onNavigate('forgot-password');
 }
 }, [phone, onNavigate]);

 const onSubmit = async (data: FormData) => {
 if (!phone) {
 setErrorMsg('انتهت الجلسة. يرجى البدء من جديد بإدخال رقم جوالك.');
 return;
 }

 setIsLoading(true);
 setErrorMsg('');

 try {
 // Step 1: verify OTP → get reset_token
 const verifyResp = await userAuthApi.otpVerify(phone, data.otp, 'password_reset');

 if (!verifyResp.reset_token) {
 setErrorMsg('رمز التحقق غير صالح أو منتهي. اطلب رمزاً جديداً.');
 setIsLoading(false);
 return;
 }

 // Step 2: confirm with new password
 await userAuthApi.passwordResetConfirm(verifyResp.reset_token, data.password);
 setIsSuccess(true);
 } catch (err) {
 if (err instanceof UserAuthError) {
 if (err.code === 'OTP_INVALID' || err.field === 'code' || err.field === 'otp') {
 setErrorMsg('رمز التحقق غير صحيح');
 } else if (err.code === 'OTP_EXPIRED') {
 setErrorMsg('انتهت صلاحية رمز التحقق. اطلب رمزاً جديداً.');
 } else if (err.field === 'new_password' || err.field === 'password') {
 setErrorMsg('كلمة المرور غير صالحة. يجب أن تكون 8 أحرف على الأقل.');
 } else if (err.status === 0 || err.status === 408) {
 setErrorMsg('تعذر الاتصال بالخادم، تأكد من الإنترنت');
 } else {
 setErrorMsg(t('resetPassword.errorUnexpected') || 'حدث خطأ أثناء إعادة التعيين');
 }
 } else {
 setErrorMsg(t('resetPassword.errorUnexpected') || 'حدث خطأ غير متوقع');
 }
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
 {t('resetPassword.title') || 'إعادة تعيين كلمة المرور'}
 </h1>
 <p className="text-gray-500 text-lg font-bold">
 أدخل رمز التحقق المُرسَل إلى جوالك وكلمة المرور الجديدة.
 </p>
 {phone && (
 <p className="text-gray-400 text-sm mt-2 font-bold" dir="ltr">{phone}</p>
 )}
 </div>

 {isSuccess ? (
 <motion.div
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 className="bg-[#149B61]/10 border border-[#149B61]/20 rounded-2xl p-8 text-center"
 >
 <div className="w-20 h-20 bg-[#149B61] rounded-full flex items-center justify-center mx-auto mb-6">
 <CheckCircle2 size={40} className="text-white" />
 </div>
 <h3 className="text-2xl font-black text-[#149B61] mb-2">
 {t('resetPassword.successTitle') || 'تم تغيير كلمة المرور'}
 </h3>
 <p className="text-gray-600 font-bold mb-8">
 {t('resetPassword.successMessage') || 'يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.'}
 </p>
 <button
 onClick={() => onNavigate('login')}
 className="w-full h-14 bg-[#2B3D50] text-white rounded-lg font-bold hover:bg-[#1a2530] transition-all flex items-center justify-center gap-2"
 >
 <ArrowRight size={20} className="rotate-180" />
 {t('resetPassword.goToLogin') || 'تسجيل الدخول'}
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

 {/* OTP Code Input */}
 <div className="space-y-2">
 <label className="text-sm font-bold text-gray-700 block text-end">رمز التحقق (6 أرقام)</label>
 <div className="relative">
 <input
 {...register('otp', {
 required: 'رمز التحقق مطلوب',
 pattern: {
 value: /^\d{6}$/,
 message: 'رمز التحقق يجب أن يكون 6 أرقام'
 }
 })}
 type="text"
 inputMode="numeric"
 autoComplete="one-time-code"
 maxLength={6}
 className={`w-full h-14 bg-gray-50 border ${errors.otp ? 'border-red-500' : 'border-gray-200'} rounded-lg px-4 text-center text-gray-900 focus:outline-none focus:border-[#2B3D50] focus:ring-2 focus:ring-[#2B3D50]/10 transition-all placeholder:text-gray-400 font-sans tracking-[0.5em] text-2xl`}
 placeholder="------"
 dir="ltr"
 />
 {errors.otp && (
 <span className="text-red-500 text-xs mt-1 block text-end font-bold">{errors.otp.message as string}</span>
 )}
 </div>
 </div>

 {/* New Password Input */}
 <div className="space-y-2">
 <label className="text-sm font-bold text-gray-700 block text-end">
 {t('resetPassword.newPasswordLabel') || 'كلمة المرور الجديدة'}
 </label>
 <div className="relative">
 <input
 {...register('password', {
 required: t('resetPassword.passwordRequired') || 'كلمة المرور مطلوبة',
 minLength: { value: 8, message: t('resetPassword.passwordMinLength') || 'كلمة المرور يجب أن تكون 8 أحرف على الأقل' }
 })}
 type={showPassword ? "text" : "password"}
 autoComplete="new-password"
 className={`w-full h-14 bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-lg px-4 pe-12 text-end text-gray-900 focus:outline-none focus:border-[#2B3D50] focus:ring-2 focus:ring-[#2B3D50]/10 transition-all placeholder:text-gray-400 font-sans`}
 placeholder={t('resetPassword.newPasswordPlaceholder') || '••••••••'}
 dir="ltr"
 />
 <button
 type="button"
 onClick={() => setShowPassword(!showPassword)}
 className="absolute top-1/2 end-4 -translate-y-1/2 text-gray-400 hover:text-[#2B3D50] transition-colors"
 aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
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
 <label className="text-sm font-bold text-gray-700 block text-end">
 {t('resetPassword.confirmPasswordLabel') || 'تأكيد كلمة المرور'}
 </label>
 <div className="relative">
 <input
 {...register('confirmPassword', {
 required: t('resetPassword.confirmPasswordRequired') || 'تأكيد كلمة المرور مطلوب',
 validate: value => value === newPassword || (t('resetPassword.passwordMismatch') || 'كلمتا المرور غير متطابقتين')
 })}
 type={showConfirmPassword ? "text" : "password"}
 autoComplete="new-password"
 className={`w-full h-14 bg-gray-50 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} rounded-lg px-4 pe-12 text-end text-gray-900 focus:outline-none focus:border-[#2B3D50] focus:ring-2 focus:ring-[#2B3D50]/10 transition-all placeholder:text-gray-400 font-sans`}
 placeholder={t('resetPassword.confirmPasswordPlaceholder') || '••••••••'}
 dir="ltr"
 />
 <button
 type="button"
 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
 className="absolute top-1/2 end-4 -translate-y-1/2 text-gray-400 hover:text-[#2B3D50] transition-colors"
 aria-label={showConfirmPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
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
 className="w-full h-14 bg-[#2B3D50] text-white rounded-lg font-bold hover:bg-[#1a2530] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg mt-8"
 >
 {isLoading ? <Loader2 className="animate-spin w-6 h-6 text-[#47CCD0]" /> : (t('resetPassword.saveButton') || 'حفظ كلمة المرور الجديدة')}
 </button>

 <div className="text-center pt-6">
 <button
 type="button"
 onClick={() => onNavigate('forgot-password')}
 className="text-[#47CCD0] hover:text-[#2B3D50] font-bold text-sm transition-colors inline-flex items-center gap-2"
 >
 <ArrowRight size={16} className="rotate-180" />
 لم يصلك الرمز؟ ابدأ من جديد
 </button>
 </div>
 </form>
 )}
 </LoginLayout>
 );
};
