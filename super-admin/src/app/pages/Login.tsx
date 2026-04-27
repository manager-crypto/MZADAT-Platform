import { useState, FormEvent, useEffect } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { ApiError } from '../services/apiClient';
import { Lock, Mail, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import logoMzadatFull from 'figma:asset/c8819d3b5f3ea18704bb078e169c44ea993d6b53.png';
import logoMzadatIcon from 'figma:asset/5d2928a5396710b8017c244462e8f5cef6b3686a.png';
import saudiBuildingImg from 'figma:asset/2c419509f4369eb3219718c504bb64aec176a784.png';

export default function Login() {
  const { language, direction, toggleLanguage } = useTranslation();
  const { theme } = useTheme();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const isDark = theme === 'dark';
  const isRTL = direction === 'rtl';

  // Where to go after successful login
  const from = (location.state as any)?.from || '/';

  // If already logged in, redirect away
  if (!authLoading && isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(email.trim().toLowerCase(), password);
      navigate(from, { replace: true });
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 401) {
          setError(
            language === 'ar'
              ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
              : 'Invalid email or password',
          );
        } else if (err.status === 0 || err.status === 408) {
          setError(
            language === 'ar'
              ? 'تعذّر الاتصال بالخادم. تأكد من تشغيل الـ Backend على المنفذ 8080.'
              : 'Cannot connect to server. Make sure the backend is running on port 8080.',
          );
        } else {
          setError(err.message);
        }
      } else {
        setError(
          language === 'ar' ? 'حدث خطأ غير متوقع' : 'An unexpected error occurred',
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen flex w-full ${isDark ? 'bg-[#0F1923]' : 'bg-gray-50'}`}>
      {/* Left/Right Side - Image (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#2B3D50]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${saudiBuildingImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923] via-[#0F1923]/60 to-transparent opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#5AC4BE]/40 to-transparent opacity-40 mix-blend-multiply" />

        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 z-10">
          <div className="max-w-xl">
            <h2
              className={`text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight ${isRTL ? 'text-right' : 'text-left'}`}
            >
              {language === 'ar'
                ? 'منصة المزادات العقارية الأولى في المملكة العربية السعودية'
                : 'The Premier Real Estate Auction Platform in Saudi Arabia'}
            </h2>
            <p className={`text-base lg:text-lg text-white/80 ${isRTL ? 'text-right' : 'text-left'}`}>
              {language === 'ar'
                ? 'بوابة آمنة وموثوقة لإدارة المزادات والأصول والممتلكات وفق أعلى المعايير التنظيمية.'
                : 'A secure and reliable portal for managing auctions, assets, and properties under the highest regulatory standards.'}
            </p>
          </div>
        </div>
      </div>

      {/* Form side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 relative overflow-hidden">
        {/* Language switcher */}
        <div className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'}`}>
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={language === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isDark
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                : 'bg-white hover:bg-gray-50 text-[#1E293B] border border-gray-200'
            } transition-all shadow-sm font-bold text-sm`}
          >
            {language === 'ar' ? 'EN' : 'ع'}
          </button>
        </div>

        <div className="w-full max-w-md space-y-6 sm:space-y-8">
          {/* Logo */}
          <div className="flex flex-col items-center justify-center text-center">
            {isDark ? (
              <div className="w-20 h-20 bg-gradient-to-br from-[#5AC4BE]/20 to-[#47CCD0]/5 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-white/5">
                <img src={logoMzadatIcon} alt="Mzadat Logo" className="w-14 h-14 object-contain" />
              </div>
            ) : (
              <div className="mb-6 flex justify-center">
                <img src={logoMzadatFull} alt="Mzadat Logo" className="h-16 sm:h-20 object-contain" />
              </div>
            )}
            <h1 className={`text-2xl sm:text-3xl font-extrabold ${isDark ? 'text-white' : 'text-[#2B3D50]'} mb-2`}>
              {language === 'ar' ? 'تسجيل الدخول' : 'Welcome Back'}
            </h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
              {language === 'ar'
                ? 'قم بتسجيل الدخول للوصول إلى لوحة تحكم المزادات'
                : 'Sign in to access the auction control panel'}
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div
              role="alert"
              className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span className={isRTL ? 'text-right' : 'text-left'}>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div className="space-y-4">
              {/* Email */}
              <div className="relative">
                <label
                  htmlFor="email"
                  className={`block text-xs font-bold mb-2 ${isDark ? 'text-gray-300' : 'text-[#2B3D50]'} ${isRTL ? 'text-right' : 'text-left'}`}
                >
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                </label>
                <div className="relative">
                  <div className={`absolute inset-y-0 ${isRTL ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                    <Mail className={`h-5 w-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    dir="ltr"
                    disabled={isSubmitting}
                    className={`block w-full ${isRTL ? 'pr-10' : 'pl-10'} py-3 sm:py-3.5 border ${
                      isDark
                        ? 'bg-[#1a2632] border-gray-700 text-white placeholder-gray-500 focus:ring-[#5AC4BE] focus:border-[#5AC4BE]'
                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-[#5AC4BE] focus:border-[#5AC4BE]'
                    } rounded-xl shadow-sm focus:outline-none focus:ring-2 sm:text-sm transition-colors duration-200 disabled:opacity-60`}
                    placeholder="admin@mzadat.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="relative">
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="password"
                    className={`block text-xs font-bold ${isDark ? 'text-gray-300' : 'text-[#2B3D50]'}`}
                  >
                    {language === 'ar' ? 'كلمة المرور' : 'Password'}
                  </label>
                </div>
                <div className="relative">
                  <div className={`absolute inset-y-0 ${isRTL ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                    <Lock className={`h-5 w-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    dir="ltr"
                    disabled={isSubmitting}
                    className={`block w-full ${isRTL ? 'pr-10' : 'pl-10'} py-3 sm:py-3.5 border ${
                      isDark
                        ? 'bg-[#1a2632] border-gray-700 text-white placeholder-gray-500 focus:ring-[#5AC4BE] focus:border-[#5AC4BE]'
                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-[#5AC4BE] focus:border-[#5AC4BE]'
                    } rounded-xl shadow-sm focus:outline-none focus:ring-2 sm:text-sm transition-colors duration-200 disabled:opacity-60`}
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 px-4 rounded-xl shadow-sm text-sm font-bold text-white bg-[#5AC4BE] hover:bg-[#47CCD0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5AC4BE] transition-all duration-300 ${
                isSubmitting ? 'opacity-80 cursor-wait' : ''
              } ${isDark ? 'focus:ring-offset-[#0F1923]' : ''}`}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {language === 'ar' ? 'جاري التحقق...' : 'Signing in...'}
                </div>
              ) : (
                <>
                  {language === 'ar' ? 'دخول للوحة التحكم' : 'Sign in to Dashboard'}
                  {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </>
              )}
            </button>

            {/* Dev hint */}
            <p className={`text-xs text-center ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
              {language === 'ar'
                ? 'البيانات الافتراضية: admin@mzadat.com'
                : 'Default credentials: admin@mzadat.com'}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
