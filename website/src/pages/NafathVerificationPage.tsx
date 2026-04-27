import React, { useState, useEffect } from 'react';
import { Loader2, ShieldCheck, CheckCircle2, RefreshCw, AlertCircle } from 'lucide-react';
import { BackButton } from '../components/ui/BackButton';
import { AbsherIntegration, SamaCompliance } from '../services/complianceApi';

interface NafathVerificationPageProps {
  onNavigate: (page: string) => void;
}

export const NafathVerificationPage: React.FC<NafathVerificationPageProps> = ({ onNavigate }) => {
  const [randomNumber] = useState(() => Math.floor(Math.random() * 90 + 10)); // 10-99
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds
  const [status, setStatus] = useState<'waiting' | 'verifying' | 'success' | 'expired'>('waiting');

  useEffect(() => {
    // Initiate Nafath verification request
    const initNafath = async () => {
      try {
         await AbsherIntegration.requestVerification("1000000000"); // Mock ID
      } catch (e) {
         console.error(e);
      }
    };
    initNafath();
  }, []);

  useEffect(() => {
    if (status !== 'waiting' && status !== 'verifying') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setStatus('expired');
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Simulate user approval via Absher after 4 seconds
    const approvalTimer = setTimeout(() => {
        setStatus('verifying');
        
        // Simulate background SAMA/AML check immediately after Absher confirms
        SamaCompliance.checkAmlStatus("user-123").then(() => {
           setTimeout(() => {
               setStatus('success');
               clearInterval(timer);
           }, 1500);
        });

    }, 4000);

    return () => {
        clearInterval(timer);
        clearTimeout(approvalTimer);
    };
  }, [status]);

  useEffect(() => {
    if (status === 'success') {
        const redirectTimer = setTimeout(() => {
            onNavigate('home');
        }, 3000);
        return () => clearTimeout(redirectTimer);
    }
  }, [status, onNavigate]);

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
                    <p className="text-gray-500 text-sm mb-8">واختيار الرقم الظاهر أدناه لتأكيد هويتك والامتثال لمتطلبات SAMA</p>

                    <div className="w-32 h-32 mx-auto bg-gray-50 rounded-full flex items-center justify-center border-4 border-[#107055] mb-8 relative">
                         <span className="text-5xl font-bold text-[#107055]">{randomNumber}</span>
                         <div className="absolute -bottom-2 bg-white px-3 py-1 rounded-full border border-gray-200 text-xs font-bold text-gray-500 shadow-sm">
                             الرقم
                         </div>
                    </div>

                    <div className="flex justify-center items-center gap-2 text-gray-400 text-sm font-mono mb-6">
                        <Loader2 size={16} className="animate-spin" />
                        <span>00:{timeLeft.toString().padStart(2, '0')}</span>
                    </div>

                    <div className="flex justify-center mt-6">
                      <BackButton 
                         onClick={() => onNavigate('nafath-login')}
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
                    <p className="text-gray-500 mb-6 flex flex-col items-center gap-2">
                      <span>تأكيد الهوية عبر أبشر ... <CheckCircle2 size={16} className="inline text-green-500" /></span>
                      <span className="animate-pulse">التحقق من سجلات SAMA للالتزام المالي ...</span>
                    </p>
                </div>
            )}

            {status === 'success' && (
                <div className="py-8 animate-fade-up">
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                        <CheckCircle2 size={48} />
                    </div>
                    <h3 className="text-gray-900 font-bold text-xl mb-2">تم التحقق والامتثال بنجاح</h3>
                    <p className="text-gray-500 mb-6">حسابك الآن موثق ومتوافق مع متطلبات البنك المركزي السعودي SAMA</p>
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
                        onClick={() => setStatus('waiting')} // Ideally reset timer etc, but simplified here
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
