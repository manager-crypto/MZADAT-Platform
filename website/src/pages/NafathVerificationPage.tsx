import React, { useState, useEffect, useRef } from 'react';
import { Loader2, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';
import { BackButton } from '../components/ui/BackButton';
import { AuthServices, ApiError } from '../services/apiClient';

interface NafathVerificationPageProps {
 onNavigate: (page: string) => void;
}

interface StoredNafathRequest {
 request_id: string;
 random_number: number;
 expires_at: string;
 national_id: string;
}

const POLL_INTERVAL_MS = 2000;

export const NafathVerificationPage: React.FC<NafathVerificationPageProps> = ({ onNavigate }) => {
 const [stored, setStored] = useState<StoredNafathRequest | null>(null);
 const [timeLeft, setTimeLeft] = useState<number>(0);
 const [status, setStatus] = useState<'waiting' | 'verifying' | 'success' | 'expired' | 'rejected'>('waiting');
 const [errorMsg, setErrorMsg] = useState<string>('');
 const pollTimer = useRef<ReturnType<typeof setInterval> | null>(null);

 // Load the in-flight Nafath request from sessionStorage on mount
 useEffect(() => {
 const raw = sessionStorage.getItem('nafath_request');
 if (!raw) {
 onNavigate('nafath-login');
 return;
 }
 try {
 const parsed: StoredNafathRequest = JSON.parse(raw);
 setStored(parsed);
 const remaining = Math.max(0, Math.floor((new Date(parsed.expires_at).getTime() - Date.now()) / 1000));
 setTimeLeft(remaining);
 } catch {
 onNavigate('nafath-login');
 }
 }, [onNavigate]);

 // Countdown timer
 useEffect(() => {
 if (status !== 'waiting' && status !== 'verifying') return;
 if (timeLeft <= 0) {
 setStatus('expired');
 return;
 }
 const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
 return () => clearTimeout(t);
 }, [timeLeft, status]);

 // Poll Nafath status until APPROVED / REJECTED / EXPIRED
 useEffect(() => {
 if (!stored || (status !== 'waiting' && status !== 'verifying')) return;

 const poll = async () => {
 try {
 const res = await AuthServices.nafathStatus(stored.request_id);
 if (res.status === 'APPROVED') {
 setStatus('verifying');
 if (res.token) {
 try {
 localStorage.setItem('access_token', res.token);
 if (res.user_id) localStorage.setItem('user_id', res.user_id);
 if (res.full_name) localStorage.setItem('user_full_name', res.full_name);
 } catch {
 // ignore storage errors
 }
 }
 sessionStorage.removeItem('nafath_request');
 setTimeout(() => setStatus('success'), 800);
 } else if (res.status === 'REJECTED') {
 setStatus('rejected');
 sessionStorage.removeItem('nafath_request');
 } else if (res.status === 'EXPIRED') {
 setStatus('expired');
 sessionStorage.removeItem('nafath_request');
 }
 } catch (err) {
 const msg = err instanceof ApiError ? `(${err.status}) ${err.message}` : (err as Error).message;
 setErrorMsg(msg);
 }
 };

 // First poll immediately, then on interval
 poll();
 pollTimer.current = setInterval(poll, POLL_INTERVAL_MS);
 return () => {
 if (pollTimer.current) clearInterval(pollTimer.current);
 };
 }, [stored, status]);

 // Redirect home after success
 useEffect(() => {
 if (status === 'success') {
 const t = setTimeout(() => onNavigate('home'), 2500);
 return () => clearTimeout(t);
 }
 }, [status, onNavigate]);

 const handleRetry = () => {
 sessionStorage.removeItem('nafath_request');
 onNavigate('nafath-login');
 };

 const randomNumber = stored?.random_number ?? 0;
 const minutes = Math.floor(timeLeft / 60);
 const seconds = timeLeft % 60;

 return (
 <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
 <div className="bg-white w-full max-w-md rounded-3xl shadow-xl overflow-hidden border border-gray-100 relative">

 {/* Header */}
 <div className="bg-[#107055] p-6 text-center relative overflow-hidden">
 <div className="absolute top-0 start-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
 <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md border border-white/20">
 <ShieldCheck size={32} className="text-white" />
 </div>
 <h2 className="text-2xl font-bold text-white">نفاذ</h2>
 <p className="text-green-100 text-sm mt-1">التحقق من الهوية</p>
 </div>

 {/* Content */}
 <div className="p-8 text-center">

 {status === 'waiting' && (
 <>
 <h3 className="text-gray-900 font-bold text-lg mb-2">الرجاء فتح تطبيق نفاذ</h3>
 <p className="text-gray-500 text-sm mb-8">واختيار الرقم الظاهر أدناه لتأكيد هويتك</p>

 <div className="w-32 h-32 mx-auto bg-gray-50 rounded-full flex items-center justify-center border-4 border-[#107055] mb-8 relative">
 <span className="text-5xl font-bold text-[#107055]">{randomNumber}</span>
 <div className="absolute -bottom-2 bg-white px-3 py-1 rounded-full border border-gray-200 text-xs font-bold text-gray-500 shadow-sm">
 الرقم
 </div>
 </div>

 <div className="flex justify-center items-center gap-2 text-gray-400 text-sm font-mono mb-6">
 <Loader2 size={16} className="animate-spin" />
 <span>{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</span>
 </div>

 {errorMsg && (
 <p className="text-amber-600 text-xs mb-4">{errorMsg}</p>
 )}

 <div className="flex justify-center mt-6">
 <BackButton
 onClick={handleRetry}
 label="إلغاء الطلب"
 className="!text-gray-400 hover:bg-transparent"
 />
 </div>
 </>
 )}

 {status === 'verifying' && (
 <div className="py-8 animate-fade-up">
 <Loader2 size={48} className="animate-spin text-[#107055] mx-auto mb-6" />
 <h3 className="text-gray-900 font-bold text-xl mb-2">جاري تدقيق البيانات</h3>
 <p className="text-gray-500 mb-6">تأكيد الهوية ...</p>
 </div>
 )}

 {status === 'success' && (
 <div className="py-8 animate-fade-up">
 <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
 <CheckCircle2 size={48} />
 </div>
 <h3 className="text-gray-900 font-bold text-xl mb-2">تم التحقق بنجاح</h3>
 <p className="text-gray-500 mb-6">جارٍ توجيهك إلى الصفحة الرئيسية</p>
 <Loader2 size={24} className="animate-spin mx-auto text-[#47CCD0]" />
 </div>
 )}

 {status === 'expired' && (
 <div className="py-8 animate-fade-up">
 <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
 <RefreshCw size={40} />
 </div>
 <h3 className="text-gray-900 font-bold text-xl mb-2">انتهت صلاحية الطلب</h3>
 <p className="text-gray-500 mb-6">لم يتم تأكيد الطلب في الوقت المحدد</p>

 <button
 onClick={handleRetry}
 className="w-full bg-[#107055] text-white py-3 rounded-xl font-bold hover:bg-[#0d5c46] transition-all"
 >
 إعادة المحاولة
 </button>
 </div>
 )}

 {status === 'rejected' && (
 <div className="py-8 animate-fade-up">
 <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
 <RefreshCw size={40} />
 </div>
 <h3 className="text-gray-900 font-bold text-xl mb-2">تم رفض الطلب</h3>
 <p className="text-gray-500 mb-6">لم تتم الموافقة على طلب التحقق</p>

 <button
 onClick={handleRetry}
 className="w-full bg-[#107055] text-white py-3 rounded-xl font-bold hover:bg-[#0d5c46] transition-all"
 >
 إعادة المحاولة
 </button>
 </div>
 )}

 </div>

 {/* Footer */}
 <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
 <p className="text-xs text-gray-400">© 2025 النفاذ الوطني الموحد. جميع الحقوق محفوظة.</p>
 </div>

 </div>
 </div>
 );
};
