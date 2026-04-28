import React, { useState } from 'react';
import { LoginLayout } from '../components/auth/LoginLayout';
import { LoginForm } from '../components/auth/LoginForm';
import { SocialLoginButtons } from '../components/auth/SocialLoginButtons';
import { userAuthApi, UserAuthError } from '../services/userAuthApi';
import { useTranslation } from 'react-i18next';

interface LoginPageProps {
 onNavigate: (page: string) => void;
 onLogin?: () => void;
}

/**
 * Email/password login flow.
 * Talks to the Go backend at POST /api/auth/login.
 * The backend issues a 64-char session token + user snapshot, persisted by userAuthApi.
 */
export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, onLogin }) => {
 const { t } = useTranslation();
 const [isLoading, setIsLoading] = useState(false);
 const [errorMsg, setErrorMsg] = useState('');

 const handleEmailLogin = async (data: { email: string; password: string }) => {
 setIsLoading(true);
 setErrorMsg('');

 try {
 await userAuthApi.login(data.email, data.password);
 // Token + user are already persisted by userAuthApi.login
 onLogin?.();
 } catch (err) {
 // Map backend error codes to user-facing Arabic strings.
 if (err instanceof UserAuthError) {
 switch (err.status) {
 case 401:
 setErrorMsg('البريد الإلكتروني أو كلمة المرور غير صحيحة');
 break;
 case 403:
 setErrorMsg('الحساب موقوف مؤقتاً، يرجى المحاولة لاحقاً');
 break;
 case 408:
 setErrorMsg('انتهت مهلة الاتصال، تأكد من الإنترنت');
 break;
 case 0:
 setErrorMsg('تعذر الاتصال بالخادم، يرجى المحاولة لاحقاً');
 break;
 default:
 setErrorMsg('حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى');
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
 imageUrl="https://images.unsplash.com/photo-1767982613695-26adf10be06d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByaXlhZGglMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzc1NjkxMjMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
 imageAlt="مباني الرياض الحديثة"
 onNavigate={onNavigate}
 >
 <div className="text-center mb-10">
 <h1 className="text-4xl font-black text-[#2B3D50] mb-4 tracking-tight leading-tight">
 {t('loginModal.welcomeBack')}
 </h1>
 <p className="text-gray-500 text-lg font-bold">
 {t('loginModal.bestDeal')}
 </p>
 </div>

 <LoginForm
 onSubmit={handleEmailLogin}
 isLoading={isLoading}
 onNavigate={onNavigate}
 errorMsg={errorMsg}
 />

 <SocialLoginButtons
 onNafathLogin={() => onNavigate('nafath-login')}
 onBiometricLogin={() => onNavigate('biometric-login')}
 />
 </LoginLayout>
 );
};
