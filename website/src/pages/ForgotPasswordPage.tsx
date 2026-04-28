import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { LoginLayout } from '../components/auth/LoginLayout';
import { userAuthApi, UserAuthError } from '../services/userAuthApi';

interface ForgotPasswordPageProps {
 onNavigate: (page: string, params?: { phone?: string }) => void;
}

interface FormData {
 phone: string;
}

/**
 * Step 1 of password reset: user enters phone number → backend sends OTP via SMS.
 * On success, navigates to `reset-password` with the phone in query state so step 2
 * (OTP entry + new password) can pick up.
 *
 * Backend contract:
 * POST /api/auth/password/reset-request
 * body: { phone: "+9665XXXXXXXX" }
 * always returns 200 (no user-existence leak)
 */
export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onNavigate }) => {
 const [isLoading, setIsLoading] = useState(false);
 const [isSuccess, setIsSuccess] = useState(false);
 const [errorMsg, setErrorMsg] = useState('');
 const [submittedPhone, setSubmittedPhone] = useState('');

 const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
 mode: 'onChange'
 });

 const onSubmit = async (data: FormData) => {
 setIsLoading(true);
 setErrorMsg('');

 try {
 // Normalize: accept "05XXXXXXXX", "5XXXXXXXX", "+9665XXXXXXXX"
 let normalized = data.phone.trim().replace(/\s/g, '');
 if (normalized.startsWith('00966')) normalized = '+' + normalized.substring(2);
 else if (normalized.startsWith('966')) normalized = '+' + normalized;
 else if (normalized.startsWith('05')) normalized = '+966' + normalized.substring(1);
 else if (normalized.startsWith('5') && normalized.length === 9) normalized = '+966' + normalized;

 await userAuthApi.passwordResetRequest(normalized);
 setSubmittedPhone(normalized);
 setIsSuccess(true);
 } catch (err) {
 if (err instanceof UserAuthError) {
 if (err.field === 'phone') {
 setErrorMsg('رقم الجوال غير صالح. يجب أن يكون رقماً سعودياً صحيحاً (مثال: 05XXXXXXXX)');
 } else if (err.status === 0 || err.status === 408) {
 setErrorMsg('تعذر الاتصال بالخادم، تأكد من الإنترنت');
 } else {
 setErrorMsg('حدث خطأ أثناء إرسال رمز التحقق. حاول مرة أخرى.');
 }
 } else {
 setErrorMsg('حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى');
 }
 } finally {
 setIsLoading(false);
 }
 };

 return (
 <LoginLayout
 imageUrl="https://images.unsplash.com/photo-1775015682021-1548fc36ee4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXlhZGglMjBtb2Rlcm4lMjBidXNpbmVzcyUyMGJ1aWxkaW5nfGVufDF8fHx8MTc3NTY5MTUyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
 imageAlt="مباني حديثة - استعادة كلمة المرور"
 onNavigate={onNavigate}
 >
 <div className="text-center mb-10">
 <h1 className="text-4xl font-black text-[#2B3D50] mb-4 tracking-tight leading-tight">
 نسيت كلمة المرور؟
 </h1>
 <p className="text-gray-500 text-lg font-bold">
 أدخل رقم جوالك المُسجّل، وسنرسل لك رمز تحقق لإعادة تعيين كلمة المرور.
 </p>
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
 <h3 className="text-2xl font-black text-[#149B61] mb-2">تم الإرسال بنجاح!</h3>
 <p className="text-gray-600 font-bold mb-2">
 إذا كان رقم الجوال مسجَّلاً لدينا، فقد أُرسل إليه رمز التحقق عبر رسالة نصية.
 </p>
 <p className="text-gray-500 text-sm font-bold mb-8" dir="ltr">
 {submittedPhone}
 </p>
 <button
 onClick={() => onNavigate('reset-password', { phone: submittedPhone })}
 className="w-full h-14 bg-[#2B3D50] text-white rounded-lg font-bold hover:bg-[#1a2530] transition-all flex items-center justify-center gap-2 mb-4"
 >
 متابعة لإدخال رمز التحقق
 </button>
 <button
 onClick={() => onNavigate('login')}
 className="w-full h-14 bg-white border-2 border-[#2B3D50] text-[#2B3D50] rounded-lg font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
 >
 <ArrowRight size={20} className="rotate-180" />
 العودة لتسجيل الدخول
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

 <div className="space-y-2">
 <label className="text-sm font-bold text-gray-700 block text-end">رقم الجوال</label>
 <div className="relative">
 <input
 {...register('phone', {
 required: 'رقم الجوال مطلوب',
 pattern: {
 value: /^(\+?966|0)?5\d{8}$/,
 message: "رقم جوال سعودي غير صالح"
 }
 })}
 type="tel"
 inputMode="tel"
 autoComplete="tel"
 className={`w-full h-14 bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-lg px-4 text-end text-gray-900 focus:outline-none focus:border-[#2B3D50] focus:ring-2 focus:ring-[#2B3D50]/10 transition-all placeholder:text-gray-400 font-sans`}
 placeholder="05XXXXXXXX"
 dir="ltr"
 />
 {errors.phone && (
 <span className="text-red-500 text-xs mt-1 block text-end font-bold">{errors.phone.message as string}</span>
 )}
 </div>
 </div>

 <button
 type="submit"
 disabled={!isValid || isLoading}
 className="w-full h-14 bg-[#2B3D50] text-white rounded-lg font-bold hover:bg-[#1a2530] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg mt-8"
 >
 {isLoading ? <Loader2 className="animate-spin w-6 h-6 text-[#47CCD0]" /> : 'إرسال رمز التحقق'}
 </button>

 <div className="text-center pt-6">
 <button
 type="button"
 onClick={() => onNavigate('login')}
 className="text-[#47CCD0] hover:text-[#2B3D50] font-bold text-sm transition-colors inline-flex items-center gap-2"
 >
 <ArrowRight size={16} className="rotate-180" />
 العودة لتسجيل الدخول
 </button>
 </div>
 </form>
 )}
 </LoginLayout>
 );
};
