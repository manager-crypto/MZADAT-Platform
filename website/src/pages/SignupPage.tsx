import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { userAuthApi, UserAuthError } from '../services/userAuthApi';
import { 
 ArrowRight,
 Globe,
 Building2,
 Flag,
 CheckCircle2,
 ChevronLeft,
 User,
 Briefcase,
 Upload,
 ChevronDown,
 Mail,
 Phone
} from 'lucide-react';
import { allCountries } from '../utils/countries';
import { allCountryCodes } from '../utils/phoneCodes';

import { PhoneInput } from '../components/ui/PhoneInput';

interface SignupPageProps {
 onNavigate: (page: string) => void;
}

type NationalityType = 'saudi' | 'gcc' | 'other';
type AccountType = 'individual' | 'business';

export const SignupPage: React.FC<SignupPageProps> = ({ onNavigate }) => {
 const { t, i18n } = useTranslation();
 const [step, setStep] = useState(1);
 const [nationality, setNationality] = useState<NationalityType>('saudi');
 const [accountType, setAccountType] = useState<AccountType>('individual');
 
 // Common Contact Info
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [mobile, setMobile] = useState('');
 const [isLoading, setIsLoading] = useState(false);
 const [countryCode, setCountryCode] = useState('+966');

 // Step 3 State (Individual)
 const [fullName, setFullName] = useState('');
 const [idNumber, setIdNumber] = useState('');
 const [residencyLocation, setResidencyLocation] = useState('');
 const [userNationality, setUserNationality] = useState('');
 const [idFile, setIdFile] = useState<File | null>(null);

 // Step 3 State (Business)
 const [companyName, setCompanyName] = useState('');
 const [crNumber, setCrNumber] = useState('');
 const [companyLocation, setCompanyLocation] = useState('');
 const [companyNationality, setCompanyNationality] = useState('');
 const [crFile, setCrFile] = useState<File | null>(null);

 // Per-field error messages (keyed by field name from backend)
 const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
 const [generalError, setGeneralError] = useState<string>('');

 const countryCodes = allCountryCodes;

 const handleNext = async () => {
 // Clear previous errors on each attempt
 setFieldErrors({});
 setGeneralError('');

 if (step === 1) {
 setStep(2);
 } else if (step === 2) {
 setStep(3);
 } else if (step === 3) {
 // Client-side validation first
 const errs: Record<string, string> = {};

 if (!fullName && accountType === 'individual') {
 errs.full_name = t('signup.errorNameRequired') || 'الاسم مطلوب';
 }
 if (!companyName && accountType === 'business') {
 errs.full_name = t('signup.errorCompanyRequired') || 'اسم الشركة مطلوب';
 }
 if (!email) {
 errs.email = t('signup.errorEmailRequired') || 'البريد الإلكتروني مطلوب';
 } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
 errs.email = t('signup.errorEmailInvalid') || 'صيغة البريد الإلكتروني غير صحيحة';
 }
 if (!mobile) {
 errs.phone = t('signup.errorPhoneRequired') || 'رقم الجوال مطلوب';
 }
 if (!password) {
 errs.password = t('signup.errorPasswordRequired') || 'كلمة المرور مطلوبة';
 } else if (password.length < 8) {
 errs.password = t('signup.errorPasswordTooShort') || 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
 }

 if (Object.keys(errs).length > 0) {
 setFieldErrors(errs);
 return;
 }

 setIsLoading(true);
 try {
 const fullNameValue = accountType === 'individual' ? fullName : companyName;
 const idValue = accountType === 'individual' ? idNumber : crNumber;

 const response = await userAuthApi.register({
 email: email.trim().toLowerCase(),
 phone: (countryCode + mobile).replace(/\s/g, ''),
 password,
 full_name: fullNameValue,
 id_number: idValue,
 residence_city: accountType === 'individual' ? residencyLocation : companyLocation,
 nationality: accountType === 'individual' ? userNationality : companyNationality,
 account_type: accountType === 'individual' ? 'individual' : 'company',
 });

 // Registration OK → navigate to OTP verification
 onNavigate(`verify-otp?phone=${encodeURIComponent(response.phone)}`);
 } catch (err) {
 if (err instanceof UserAuthError) {
 if (err.field) {
 // Backend flagged a specific field
 setFieldErrors({ [err.field]: err.message });
 } else if (err.code === 'RATE_LIMITED') {
 setGeneralError(t('signup.errorRateLimited') || 'تم تجاوز عدد المحاولات، حاول بعد قليل');
 } else if (err.code === 'NETWORK' || err.code === 'TIMEOUT') {
 setGeneralError(
 t('signup.errorNetwork') ||
 'تعذّر الاتصال بالخادم. تأكد من اتصالك بالإنترنت وحاول مرة أخرى.',
 );
 } else {
 setGeneralError(err.message);
 }
 } else {
 setGeneralError((err as Error).message || 'حدث خطأ غير متوقع');
 }
 } finally {
 setIsLoading(false);
 }
 }
 };

 const handleBack = () => {
 if (step > 1) {
 setStep(step - 1);
 } else {
 onNavigate('login');
 }
 };

 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'id' | 'cr') => {
 if (e.target.files && e.target.files[0]) {
 if (type === 'id') setIdFile(e.target.files[0]);
 if (type === 'cr') setCrFile(e.target.files[0]);
 }
 };

 return (
 <div dir={i18n.dir()} className="min-h-screen bg-white dark:bg-[#2B3D50] flex flex-col lg:flex-row transition-colors duration-300">
 
 {/* Form Section */}
 <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-12 lg:py-0 bg-[#FDFDFD] dark:bg-[#243343] order-1 lg:order-1">
 <div className="w-full max-w-lg mx-auto">
 
 {/* Back & Step Indicator */}
 <div className="flex justify-between items-center mb-8 relative z-10">
 <button 
 onClick={handleBack}
 className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 shadow-sm border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all group"
 {...{title: t("signup.back")}}
 >
 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
 </button>
 {step > 1 && (
 <span className="text-gray-400 dark:text-gray-500 text-sm font-medium">{t("signup.stepOf", { step })}</span>
 )}
 </div>

 {/* STEP 1: Nationality Selection */}
 {step === 1 && (
 <>
 <div className="text-center mb-10">
 <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-3 font-sans">{t("signup.residencyTitle")}</h1>
 <p className="text-gray-500 dark:text-gray-300 text-sm lg:text-base leading-relaxed">
 {t("signup.residencyDesc")}
 </p>
 </div>

 <div className="space-y-4 mb-8">
 {/* Option 1: Saudi */}
 <label 
 className={`relative flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 group ${
 nationality === 'saudi' 
 ? 'border-[#0F766E] dark:border-[#47CCD0] bg-teal-50/10 dark:bg-[#47CCD0]/10' 
 : 'border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-200 dark:hover:border-gray-600'
 }`}
 >
 <div className="mt-1">
 <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${nationality === 'saudi' ? 'border-[#0F766E] dark:border-[#47CCD0] bg-[#0F766E] dark:bg-[#47CCD0]' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'}`}>
 {nationality === 'saudi' && <div className="w-2 h-2 rounded-full bg-white" />}
 </div>
 <input 
 type="radio" 
 name="nationality" 
 value="saudi" 
 checked={nationality === 'saudi'}
 onChange={() => setNationality('saudi')}
 className="hidden"
 />
 </div>
 <div className="flex-1 text-start">
 <div className="flex justify-between items-start">
 <h3 className="font-bold text-gray-900 dark:text-white mb-1">{t("signup.saudiOrResident")}</h3>
 <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
 <Flag size={16} fill="currentColor" />
 </div>
 </div>
 <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{t("signup.saudiNote")}</p>
 </div>
 </label>

 {/* Option 2: GCC */}
 <label 
 className={`relative flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 group ${
 nationality === 'gcc' 
 ? 'border-[#0F766E] dark:border-[#47CCD0] bg-teal-50/10 dark:bg-[#47CCD0]/10' 
 : 'border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-200 dark:hover:border-gray-600'
 }`}
 >
 <div className="mt-1">
 <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${nationality === 'gcc' ? 'border-[#0F766E] dark:border-[#47CCD0] bg-[#0F766E] dark:bg-[#47CCD0]' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'}`}>
 {nationality === 'gcc' && <div className="w-2 h-2 rounded-full bg-white" />}
 </div>
 <input 
 type="radio" 
 name="nationality" 
 value="gcc" 
 onChange={() => setNationality('gcc')}
 className="hidden"
 />
 </div>
 <div className="flex-1 text-start">
 <div className="flex justify-between items-start">
 <h3 className="font-bold text-gray-900 dark:text-white mb-1">{t("signup.gccCitizen")}</h3>
 <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
 <Building2 size={16} />
 </div>
 </div>
 <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{t("signup.gccNote")}</p>
 </div>
 </label>

 {/* Option 3: Other */}
 <label 
 className={`relative flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 group ${
 nationality === 'other' 
 ? 'border-[#0F766E] dark:border-[#47CCD0] bg-teal-50/10 dark:bg-[#47CCD0]/10' 
 : 'border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-200 dark:hover:border-gray-600'
 }`}
 >
 <div className="mt-1">
 <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${nationality === 'other' ? 'border-[#0F766E] dark:border-[#47CCD0] bg-[#0F766E] dark:bg-[#47CCD0]' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'}`}>
 {nationality === 'other' && <div className="w-2 h-2 rounded-full bg-white" />}
 </div>
 <input 
 type="radio" 
 name="nationality" 
 value="other" 
 onChange={() => setNationality('other')}
 className="hidden"
 />
 </div>
 <div className="flex-1 text-start">
 <div className="flex justify-between items-start">
 <h3 className="font-bold text-gray-900 dark:text-white mb-1">{t("signup.otherNationality")}</h3>
 <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
 <Globe size={16} />
 </div>
 </div>
 <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{t("signup.otherNote")}</p>
 </div>
 </label>
 </div>
 </>
 )}

 {/* STEP 2: Account Type Selection */}
 {step === 2 && (
 <>
 <div className="text-center mb-10">
 <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-3 font-sans">{t("signup.chooseAccountType")}</h1>
 <p className="text-gray-500 dark:text-gray-300 text-sm lg:text-base leading-relaxed">
 {t("signup.chooseAccountDesc")}
 </p>
 </div>

 <div className="space-y-4 mb-8">
 {/* Individual */}
 <label 
 className={`relative flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 group ${
 accountType === 'individual' 
 ? 'border-[#0F766E] dark:border-[#47CCD0] bg-teal-50/10 dark:bg-[#47CCD0]/10' 
 : 'border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-200 dark:hover:border-gray-600'
 }`}
 >
 <div className="mt-1">
 <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${accountType === 'individual' ? 'border-[#0F766E] dark:border-[#47CCD0] bg-[#0F766E] dark:bg-[#47CCD0]' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'}`}>
 {accountType === 'individual' && <div className="w-2 h-2 rounded-full bg-white" />}
 </div>
 <input 
 type="radio" 
 name="accountType" 
 value="individual" 
 checked={accountType === 'individual'}
 onChange={() => setAccountType('individual')}
 className="hidden"
 />
 </div>
 <div className="flex-1 text-start">
 <div className="flex justify-between items-start">
 <h3 className="font-bold text-gray-900 dark:text-white mb-1">{t("signup.individual")}</h3>
 <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-[#0F766E] dark:text-[#47CCD0]">
 <User size={18} />
 </div>
 </div>
 <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{t("signup.individualDesc")}</p>
 </div>
 </label>

 {/* Business */}
 <label 
 className={`relative flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 group ${
 accountType === 'business' 
 ? 'border-[#0F766E] dark:border-[#47CCD0] bg-teal-50/10 dark:bg-[#47CCD0]/10' 
 : 'border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-200 dark:hover:border-gray-600'
 }`}
 >
 <div className="mt-1">
 <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${accountType === 'business' ? 'border-[#0F766E] dark:border-[#47CCD0] bg-[#0F766E] dark:bg-[#47CCD0]' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'}`}>
 {accountType === 'business' && <div className="w-2 h-2 rounded-full bg-white" />}
 </div>
 <input 
 type="radio" 
 name="accountType" 
 value="business" 
 onChange={() => setAccountType('business')}
 className="hidden"
 />
 </div>
 <div className="flex-1 text-start">
 <div className="flex justify-between items-start">
 <h3 className="font-bold text-gray-900 dark:text-white mb-1">{t("signup.business")}</h3>
 <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
 <Building2 size={18} />
 </div>
 </div>
 <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{t("signup.businessDesc")}</p>
 </div>
 </label>
 </div>
 </>
 )}

 {/* STEP 3: Information Input */}
 {step === 3 && (
 <>
 <div className="text-start mb-10">
 <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-3 font-sans">{t("signup.personalInfoTitle")}</h1>
 <p className="text-gray-500 dark:text-gray-300 text-sm lg:text-base leading-relaxed">
 {t("signup.personalInfoDesc")}
 </p>
 </div>

 {accountType === 'individual' ? (
 // Individual Form
 <div className="space-y-5 mb-8">
 <div className="space-y-1.5">
 <label className="text-sm font-bold text-gray-700 dark:text-gray-300 block text-start">{t("signup.fullName")}</label>
 <input 
 type="text" 
 value={fullName}
 onChange={(e) => setFullName(e.target.value)}
 className={`w-full h-12 bg-white dark:bg-gray-800 border rounded-lg px-4 text-start text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 ${fieldErrors.full_name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200 dark:border-gray-700 focus:border-[#0F766E] dark:focus:border-[#47CCD0] focus:ring-[#0F766E]/10 dark:focus:ring-[#47CCD0]/10'}`}
 placeholder={t("signup.fullNamePlaceholder")}
 />
 {fieldErrors.full_name && (
 <p className="text-xs text-red-500 mt-1 text-start">{fieldErrors.full_name}</p>
 )}
 </div>
 
 {/* Mobile & Email Fields for Individual */}
 <div className="space-y-1.5">
 <label className="text-sm font-bold text-gray-700 dark:text-gray-300 block text-start">{t("signup.mobile")}</label>
 <PhoneInput 
 value={mobile}
 onChange={(e: any) => setMobile(e.target.value)}
 containerClassName={`h-12 bg-white dark:bg-gray-800 border rounded-lg focus-within:ring-2 transition-all ${fieldErrors.phone ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500/10' : 'border-gray-200 dark:border-gray-700 focus-within:border-[#0F766E] dark:focus-within:border-[#47CCD0] focus-within:ring-[#0F766E]/10 dark:focus-within:ring-[#47CCD0]/10'}`}
 className="h-full bg-transparent outline-none rounded-lg text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
 />
 {fieldErrors.phone && (
 <p className="text-xs text-red-500 mt-1 text-start">{fieldErrors.phone}</p>
 )}
 </div>

 <div className="space-y-1.5">
 <label className="text-sm font-bold text-gray-700 dark:text-gray-300 block text-start">{t("signup.email")}</label>
 <input 
 type="email" 
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 className={`w-full h-12 bg-white dark:bg-gray-800 border rounded-lg px-4 text-start text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 ${fieldErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200 dark:border-gray-700 focus:border-[#0F766E] dark:focus:border-[#47CCD0] focus:ring-[#0F766E]/10 dark:focus:ring-[#47CCD0]/10'}`}
 placeholder="example@email.com"
 />
 {fieldErrors.email && (
 <p className="text-xs text-red-500 mt-1 text-start">{fieldErrors.email}</p>
 )}
 </div>

 <div className="space-y-1.5">
 <label className="text-sm font-bold text-gray-700 dark:text-gray-300 block text-start">{t("signup.password")}</label>
 <input 
 type="password" 
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 className={`w-full h-12 bg-white dark:bg-gray-800 border rounded-lg px-4 text-start text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 ${fieldErrors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200 dark:border-gray-700 focus:border-[#0F766E] dark:focus:border-[#47CCD0] focus:ring-[#0F766E]/10 dark:focus:ring-[#47CCD0]/10'}`}
 placeholder={t("signup.passwordPlaceholder")}
 />
 {fieldErrors.password && (
 <p className="text-xs text-red-500 mt-1 text-start">{fieldErrors.password}</p>
 )}
 </div>

 <div className="space-y-1.5">
 <label className="text-sm font-bold text-gray-700 dark:text-gray-300 block text-start">{t("signup.idOrPassport")}</label>
 <input 
 type="text" 
 value={idNumber}
 onChange={(e) => setIdNumber(e.target.value)}
 className={`w-full h-12 bg-white dark:bg-gray-800 border rounded-lg px-4 text-start text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 ${fieldErrors.id_number ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200 dark:border-gray-700 focus:border-[#0F766E] dark:focus:border-[#47CCD0] focus:ring-[#0F766E]/10 dark:focus:ring-[#47CCD0]/10'}`}
 placeholder={t("signup.idOrPassportPlaceholder")}
 />
 {fieldErrors.id_number && (
 <p className="text-xs text-red-500 mt-1 text-start">{fieldErrors.id_number}</p>
 )}
 </div>
 <div className="space-y-1.5">
 <label className="text-sm font-bold text-gray-700 dark:text-gray-300 block text-start">{t("signup.idPhoto")}</label>
 <div className="relative">
 <input 
 type="file" 
 id="id_upload" 
 className="hidden" 
 onChange={(e) => handleFileChange(e, 'id')}
 accept=".pdf,.png,.jpg,.jpeg"
 />
 <label 
 htmlFor="id_upload"
 className="w-full h-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
 >
 <span className="text-gray-400 dark:text-gray-500 text-sm truncate">
 {idFile ? idFile.name : t('signup.allowedFiles')}
 </span>
 <div className="flex items-center gap-2 text-[#0F766E] dark:text-[#47CCD0] font-medium text-sm">
 <span>{t("signup.uploadFile")}</span>
 <Upload size={16} />
 </div>
 </label>
 </div>
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-1.5">
 <label className="text-sm font-bold text-gray-700 dark:text-gray-300 block text-start">{t("signup.residence")}</label>
 <div className="relative">
 <select 
 value={residencyLocation}
 onChange={(e) => setResidencyLocation(e.target.value)}
 className="w-full h-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg ps-4 pe-8 text-start text-gray-900 dark:text-white focus:outline-none focus:border-[#0F766E] dark:focus:border-[#47CCD0] focus:ring-2 focus:ring-[#0F766E]/10 dark:focus:ring-[#47CCD0]/10 transition-all appearance-none cursor-pointer"
 >
 <option value="" disabled>{t("signup.selectResidence")}</option>
 {nationality === 'gcc' ? (
 <>
 <option value="saudi-arabia">{t("signup.saudiArabia")}</option>
 <option value="uae">{t("signup.uae")}</option>
 <option value="kuwait">{t("signup.kuwait")}</option>
 <option value="bahrain">{t("signup.bahrain")}</option>
 <option value="qatar">{t("signup.qatar")}</option>
 <option value="oman">{t("signup.oman")}</option>
 {allCountries.map((country) => (
 <option key={country} value={country}>{country}</option>
 ))}
 </>
 ) : nationality === 'other' ? (
 <>
 {allCountries.map((country) => (
 <option key={country} value={country}>{country}</option>
 ))}
 </>
 ) : (
 <>
 <option value="riyadh">{t("signup.riyadh")}</option>
 <option value="jeddah">{t("signup.jeddah")}</option>
 <option value="dammam">{t("signup.dammam")}</option>
 </>
 )}
 </select>
 <ChevronDown className="absolute top-1/2 end-3 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
 </div>
 </div>
 <div className="space-y-1.5">
 <label className="text-sm font-bold text-gray-700 block text-start">{t("signup.nationality")}</label>
 <div className="relative">
 <select 
 value={userNationality}
 onChange={(e) => setUserNationality(e.target.value)}
 className="w-full h-12 bg-white border border-gray-200 rounded-lg ps-4 pe-8 text-start text-gray-900 focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 transition-all appearance-none cursor-pointer"
 >
 <option value="" disabled>{t("signup.selectNationality")}</option>
 <option value="saudi">{t("signup.nationalitySaudi")}</option>
 <option value="emirati">{t("signup.nationalityEmirati")}</option>
 <option value="kuwaiti">{t("signup.nationalityKuwaiti")}</option>
 <option value="bahraini">{t("signup.nationalityBahraini")}</option>
 <option value="qatari">{t("signup.nationalityQatari")}</option>
 <option value="omani">{t("signup.nationalityOmani")}</option>
 {allCountries.map((country) => (
 <option key={country} value={country}>{country}</option>
 ))}
 </select>
 <ChevronDown className="absolute top-1/2 end-3 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
 </div>
 </div>
 </div>
 </div>
 ) : (
 // Business Form
 <div className="space-y-5 mb-8">
 <div className="space-y-1.5">
 <label className="text-sm font-bold text-gray-700 block text-start">{t("signup.companyName")}</label>
 <input 
 type="text" 
 value={companyName}
 onChange={(e) => setCompanyName(e.target.value)}
 className="w-full h-12 bg-white border border-gray-200 rounded-lg px-4 text-start text-gray-900 focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 transition-all placeholder:text-gray-400"
 placeholder={t("signup.companyNamePlaceholder")}
 />
 </div>
 
 {/* Mobile & Email Fields for Business */}
 <div className="space-y-1.5">
 <label className="text-sm font-bold text-gray-700 block text-start">{t("signup.officialMobile")}</label>
 <PhoneInput 
 value={mobile}
 onChange={(e: any) => setMobile(e.target.value)}
 containerClassName="h-12 bg-white border border-gray-200 rounded-lg focus-within:border-[#0F766E] focus-within:ring-2 focus-within:ring-[#0F766E]/10 transition-all"
 className="h-full bg-transparent outline-none rounded-lg text-gray-900 placeholder:text-gray-400"
 />
 </div>

 <div className="space-y-1.5">
 <label className="text-sm font-bold text-gray-700 block text-start">{t("signup.officialEmail")}</label>
 <input 
 type="email" 
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 className="w-full h-12 bg-white border border-gray-200 rounded-lg px-4 text-start text-gray-900 focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 transition-all placeholder:text-gray-400"
 placeholder="info@company.com"
 />
 </div>

 <div className="space-y-1.5">
 <label className="text-sm font-bold text-gray-700 block text-start">{t("signup.password")}</label>
 <input 
 type="password" 
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 className="w-full h-12 bg-white border border-gray-200 rounded-lg px-4 text-start text-gray-900 focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 transition-all placeholder:text-gray-400"
 placeholder={t("signup.passwordPlaceholder")}
 />
 </div>

 <div className="space-y-1.5">
 <label className="text-sm font-bold text-gray-700 block text-start">{t("signup.crNumber")}</label>
 <input 
 type="text" 
 value={crNumber}
 onChange={(e) => setCrNumber(e.target.value)}
 className="w-full h-12 bg-white border border-gray-200 rounded-lg px-4 text-start text-gray-900 focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 transition-all placeholder:text-gray-400"
 placeholder={t("signup.crNumberPlaceholder")}
 />
 </div>
 <div className="space-y-1.5">
 <label className="text-sm font-bold text-gray-700 block text-start">{t("signup.crPhoto")}</label>
 <div className="relative">
 <input 
 type="file" 
 id="cr_upload" 
 className="hidden" 
 onChange={(e) => handleFileChange(e, 'cr')}
 accept=".pdf,.png,.jpg,.jpeg"
 />
 <label 
 htmlFor="cr_upload"
 className="w-full h-12 bg-white border border-gray-200 rounded-lg px-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
 >
 <span className="text-gray-400 text-sm truncate">
 {crFile ? crFile.name : t('signup.allowedFiles')}
 </span>
 <div className="flex items-center gap-2 text-[#0F766E] font-medium text-sm">
 <span>{t("signup.uploadFile")}</span>
 <Upload size={16} />
 </div>
 </label>
 </div>
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-1.5">
 <label className="text-sm font-bold text-gray-700 block text-start">{t("signup.companyHQ")}</label>
 <div className="relative">
 <select 
 value={companyLocation}
 onChange={(e) => setCompanyLocation(e.target.value)}
 className="w-full h-12 bg-white border border-gray-200 rounded-lg ps-4 pe-8 text-start text-gray-900 focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 transition-all appearance-none cursor-pointer"
 >
 <option value="" disabled>{t("signup.selectCompanyHQ")}</option>
 {nationality === 'gcc' ? (
 <>
 <option value="saudi-arabia">{t("signup.saudiArabia")}</option>
 <option value="uae">{t("signup.uae")}</option>
 <option value="kuwait">{t("signup.kuwait")}</option>
 <option value="bahrain">{t("signup.bahrain")}</option>
 <option value="qatar">{t("signup.qatar")}</option>
 <option value="oman">{t("signup.oman")}</option>
 {allCountries.map((country) => (
 <option key={country} value={country}>{country}</option>
 ))}
 </>
 ) : nationality === 'other' ? (
 <>
 {allCountries.map((country) => (
 <option key={country} value={country}>{country}</option>
 ))}
 </>
 ) : (
 <>
 <option value="riyadh">{t("signup.riyadh")}</option>
 <option value="jeddah">{t("signup.jeddah")}</option>
 <option value="dammam">{t("signup.dammam")}</option>
 </>
 )}
 </select>
 <ChevronDown className="absolute top-1/2 end-3 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
 </div>
 </div>
 <div className="space-y-1.5">
 <label className="text-sm font-bold text-gray-700 block text-start">{t("signup.companyNationality")}</label>
 <div className="relative">
 <select 
 value={companyNationality}
 onChange={(e) => setCompanyNationality(e.target.value)}
 className="w-full h-12 bg-white border border-gray-200 rounded-lg ps-4 pe-8 text-start text-gray-900 focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 transition-all appearance-none cursor-pointer"
 >
 <option value="" disabled>{t("signup.selectCompanyNationality")}</option>
 {nationality === 'gcc' ? (
 <>
 <option value="saudi-arabia">{t("signup.saudiArabia")}</option>
 <option value="uae">{t("signup.uae")}</option>
 <option value="kuwait">{t("signup.kuwait")}</option>
 <option value="bahrain">{t("signup.bahrain")}</option>
 <option value="qatar">{t("signup.qatar")}</option>
 <option value="oman">{t("signup.oman")}</option>
 <option value="multiple">{t("signup.multi")}</option>
 </>
 ) : nationality === 'other' ? (
 <>
 {allCountries.map((country) => (
 <option key={country} value={country}>{country}</option>
 ))}
 </>
 ) : (
 <>
 <option value="saudi">{t("signup.nationalitySaudiShort")}</option>
 <option value="other">{t("signup.nationalityOther")}</option>
 </>
 )}
 </select>
 <ChevronDown className="absolute top-1/2 end-3 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
 </div>
 </div>
 </div>
 </div>
 )}
 </>
 )}

 {/* General error banner */}
 {generalError && (
 <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm text-start">
 {generalError}
 </div>
 )}

 {/* Navigation Buttons */}
 <div className="space-y-3">
 <button
 onClick={handleNext}
 disabled={isLoading}
 className="w-full h-14 bg-[#0F766E] text-white rounded-lg font-bold hover:bg-[#0d655e] transition-all shadow-lg shadow-teal-900/10 flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
 >
 {isLoading ? t('signup.completing') : (step === 3 ? t('signup.complete') : t('signup.next'))}
 </button>
 
 {step > 1 && (
 <button
 onClick={handleBack}
 className="w-full h-14 bg-[#FFFBF0] border border-[#FDE68A] text-amber-700 rounded-lg font-bold hover:bg-[#FFF7E1] transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
 >
 {t("signup.previous")}
 </button>
 )}
 </div>
 
 {/* Footer for Step 1 Only */}
 {step === 1 && (
 <div className="text-center mt-6">
 <span className="text-gray-400 text-sm">{t("signup.haveAccount")} </span>
 <button 
 onClick={() => onNavigate('login')}
 className="text-[#0F766E] hover:underline font-bold text-sm transition-colors"
 >
 {t("signup.loginLink")}
 </button>
 </div>
 )}
 
 <div className="flex justify-center gap-6 mt-16 text-sm text-[#0F766E] font-bold opacity-80">
 <button onClick={() => onNavigate('privacy-policy')} className="hover:opacity-100 transition-opacity">{t("signup.privacyPolicy")}</button>
 <button onClick={() => onNavigate('terms')} className="hover:opacity-100 transition-opacity">{t("signup.termsConditions")}</button>
 </div>

 </div>
 </div>

 {/* Image Side */}
 <div className="hidden lg:block w-1/2 relative order-2 lg:order-2">
 <div className="absolute inset-0 bg-gray-900">
 <img 
 src="https://images.unsplash.com/photo-1694018359679-49465b4c0d61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBbCUyMEZhaXNhbGlhaCUyMFRvd2VyJTIwUml5YWRoJTIwdmVydGljYWwlMjBza3lzY3JhcGVyfGVufDF8fHx8MTc2ODMyODcxOXww&ixlib=rb-4.1.0&q=80&w=1080" 
 alt="Al Faisaliah Tower" 
 className="w-full h-full object-cover opacity-90"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
 </div>
 
 {/* Language Switcher */}
 <div className="absolute top-8 start-8 z-10">
 <button className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-white/30 transition-all">
 En
 </button>
 </div>
 </div>

 </div>
 );
};