import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
 User, UserCheck, Briefcase, PlusCircle, Megaphone, 
 Smartphone, ShieldCheck, MapPin, CheckCircle2, 
 Building2, Home, Key, Map as MapIcon, Image as ImageIcon,
 FileText, Shield, Sparkles, Check, ChevronRight, ChevronDown,
 AlertCircle, Upload, Navigation, Target, Trash2, Edit2, Play, Users, X,
 Car, Brush, Waves, ArrowUpDown, Tent, Leaf, Snowflake, Utensils, Dumbbell
} from 'lucide-react';

import { PhoneInput } from '../components/ui/PhoneInput';
import { RiyalSymbol } from '../components/ui/RiyalSymbol';

interface AddAdPageProps {
 onNavigate?: (page: string) => void;
}

export const AddAdPage: React.FC<AddAdPageProps> = ({ onNavigate }) => {
 const { t, i18n } = useTranslation();
 const isRTL = i18n.language === 'ar';
 const [currentStep, setCurrentStep] = useState(1);
 const totalSteps = 12;

 // Form State
 const [formData, setFormData] = useState({
 identity: '',
 actionType: '',
 phone: '',
 otp: ['', '', '', ''],
 regaNumber: '',
 noLicense: false,
 adLicenseNumber: '',
 titleDeedNumber: '',
 buildingPermitNumber: '',
 wafiLicenseNumber: '',
 landSurveyNumber: '',
 isOffPlan: false,
 transactionType: '',
 propertyCategory: '',
 area: '', price: '', rooms: '', livings: '', wc: '', floor: '', age: '', direction: '', numberOfStreets: '', propertyCondition: '',
 streetWidths: [] as any[],
 amenities: [] as string[],
 description: '',
 targetAudience: '',
 nationalAddress: '',
 lat: '24.7136',
 lng: '46.6753',
 images: [] as { url: string, isVideo: boolean }[],
 obligations: [] as string[],
 boostPlan: 'basic'
 });

 const fileInputRef = useRef<HTMLInputElement>(null);

 const handleNext = () => {
 if (currentStep < totalSteps) {
 setCurrentStep(prev => prev + 1);
 window.scrollTo({ top: 0, behavior: 'smooth' });
 } else {
 alert(t('addAdPage.successMsg'));
 onNavigate?.('home');
 }
 };

 const handleBack = () => {
 if (currentStep > 1) {
 setCurrentStep(prev => prev - 1);
 window.scrollTo({ top: 0, behavior: 'smooth' });
 } else {
 onNavigate?.('add-ad');
 }
 };

 const updateForm = (key: string, value: any) => {
 setFormData(prev => {
 const newData = { ...prev, [key]: value };
 if (key === 'identity' && value === 'host' && newData.transactionType === 'sell') {
 newData.transactionType = '';
 }
 return newData;
 });
 };

 const toggleArrayItem = (key: 'amenities' | 'obligations', item: string) => {
 setFormData(prev => ({
 ...prev,
 [key]: prev[key].includes(item) 
 ? prev[key].filter(i => i !== item)
 : [...prev[key], item]
 }));
 };

 // Step 1: Identity
 const renderStep1 = () => (
 <div className="space-y-6 animate-fade-in">
 <div className="text-center mb-10">
 <h2 className={`text-2xl font-bold text-[#2B3D50] font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}'] mb-3`}>{t('addAdPage.step1Title')}</h2>
 <p className={`text-gray-500 font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}']`}>{t('addAdPage.step1Desc')}</p>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {[
 { id: 'host', label: t('addAdPage.identities.host'), icon: <User size={32} /> },
 { id: 'owner', label: t('addAdPage.identities.owner'), icon: <UserCheck size={32} /> },
 { id: 'broker', label: t('addAdPage.identities.broker'), icon: <Briefcase size={32} /> }
 ].map(item => (
 <button
 key={item.id}
 onClick={() => { updateForm('identity', item.id); handleNext(); }}
 className={`flex flex-col items-center justify-center p-8 rounded-2xl border-2 transition-all duration-300 ${
 formData.identity === item.id 
 ? 'border-[#47CCD0] bg-[#47CCD0]/5 text-[#2B3D50] scale-[1.02] shadow-lg' 
 : 'border-gray-100 bg-white text-gray-400 hover:border-[#47CCD0]/50 hover:bg-gray-50'
 }`}
 >
 <div className={`mb-4 ${formData.identity === item.id ? 'text-[#47CCD0]' : ''}`}>
 {item.icon}
 </div>
 <span className={`font-bold text-lg font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}']`}>{item.label}</span>
 </button>
 ))}
 </div>
 </div>
 );

 // Step 2: Action Type
 const renderStep2 = () => (
 <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
 <div className="text-center mb-10">
 <h2 className={`text-2xl font-bold text-[#2B3D50] font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}'] mb-3`}>{t('addAdPage.step2Title')}</h2>
 <p className={`text-gray-500 font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}']`}>{t('addAdPage.step2Desc')}</p>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
 {[
 { id: 'add_listing', label: t('addAdPage.actions.addListing'), icon: <PlusCircle size={28} /> },
 { id: 'request_marketing', label: t('addAdPage.actions.requestMarketing'), icon: <Megaphone size={28} /> }
 ].map(item => (
 <button
 key={item.id}
 onClick={() => { updateForm('actionType', item.id); handleNext(); }}
 className={`flex flex-col items-center text-center gap-4 p-8 rounded-2xl border-2 transition-all ${
 formData.actionType === item.id
 ? 'border-[#47CCD0] bg-[#47CCD0]/5 shadow-md'
 : 'border-gray-100 bg-white hover:border-gray-300'
 }`}
 >
 <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
 formData.actionType === item.id ? 'bg-[#47CCD0] text-white' : 'bg-gray-100 text-gray-500'
 }`}>
 {item.icon}
 </div>
 <span className={`font-bold text-[#2B3D50] font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}'] text-lg`}>{item.label}</span>
 </button>
 ))}
 </div>
 </div>
 );

 // Step 3: OTP Authentication
 const renderStep3 = () => (
 <div className="space-y-8 animate-fade-in max-w-md mx-auto">
 <div className="text-center">
 <div className="w-20 h-20 bg-blue-50 text-[#47CCD0] rounded-full flex items-center justify-center mx-auto mb-6">
 <Smartphone size={36} />
 </div>
 <h2 className={`text-2xl font-bold text-[#2B3D50] font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}'] mb-2`}>{t('addAdPage.step3Title')}</h2>
 <p className={`text-gray-500 font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}'] text-sm`}>{t('addAdPage.step3Desc')}</p>
 </div>
 
 <div className="space-y-6">
 <PhoneInput 
 containerClassName="h-14 bg-gray-50 border border-gray-200 rounded-xl focus-within:border-[#47CCD0] focus-within:ring-2 focus-within:ring-[#47CCD0]/20 transition-all"
 className={`h-full ${isRTL ? 'pe-4' : 'ps-4'} font-['Helvetica'] text-lg tracking-widest outline-none bg-transparent rounded-xl`}
 value={formData.phone}
 onChange={(e: any) => updateForm('phone', e.target.value)}
 />

 {formData.phone.length >= 10 && (
 <div className="pt-6 border-t border-gray-100 animate-fade-in">
 <label className={`block text-center text-sm text-gray-500 mb-4 font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}']`}>{t('addAdPage.otpLabel')}</label>
 <div className="flex justify-center gap-4" dir="ltr">
 {formData.otp.map((digit, idx) => (
 <input
 key={idx}
 id={`otp-${idx}`}
 type="text"
 maxLength={1}
 className="w-14 h-14 bg-white border-2 border-gray-200 rounded-xl text-center font-['Helvetica'] text-2xl font-bold focus:border-[#47CCD0] focus:ring-2 focus:ring-[#47CCD0]/20 outline-none transition-all"
 value={digit}
 onChange={(e) => {
 const newOtp = [...formData.otp];
 newOtp[idx] = e.target.value;
 updateForm('otp', newOtp);
 if (e.target.value && idx < 3) {
 document.getElementById(`otp-${idx + 1}`)?.focus();
 }
 }}
 />
 ))}
 </div>
 </div>
 )}
 </div>
 </div>
 );

 // Step 4: Compliance
 const renderStep4 = () => (
 <div className="space-y-8 animate-fade-in max-w-2xl mx-auto">
 <div className="text-center">
 <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
 <ShieldCheck size={36} />
 </div>
 <h2 className={`text-2xl font-bold text-[#2B3D50] font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}'] mb-2`}>{t('addAdPage.step4Title')}</h2>
 <p className={`text-gray-500 font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}'] text-sm`}>{t('addAdPage.step4Desc')}</p>
 </div>

 <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm space-y-8">
 {/* Fal License */}
 <div className="space-y-6">
 <div>
 <label className={`block text-sm font-bold text-[#2B3D50] mb-3 font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}']`}>{t('addAdPage.regaLabel')}</label>
 <input 
 type="text" 
 dir="ltr"
 disabled={formData.noLicense}
 placeholder={t('addAdPage.regaPlaceholder')}
 className={`w-full h-14 bg-gray-50 border border-gray-200 rounded-xl px-4 font-mono ${isRTL ? 'text-end' : 'text-start'} focus:border-[#47CCD0] focus:ring-2 focus:ring-[#47CCD0]/20 outline-none transition-all disabled:opacity-50`}
 value={formData.regaNumber}
 onChange={(e) => updateForm('regaNumber', e.target.value)}
 />
 </div>

 <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50/50 cursor-pointer hover:bg-gray-50 transition-colors">
 <input 
 type="checkbox" 
 className="w-5 h-5 text-[#47CCD0] border-gray-300 rounded focus:ring-[#47CCD0]"
 checked={formData.noLicense}
 onChange={(e) => updateForm('noLicense', e.target.checked)}
 />
 <span className={`text-sm font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}'] text-gray-700`}>{t('addAdPage.noLicense')}</span>
 </label>
 </div>

 <div className="h-px w-full bg-gray-100"></div>

 {/* Property Documents */}
 <div className="space-y-6">
 <h3 className="text-lg font-bold text-[#2B3D50]">{t('addAdPage.officialDocs')}</h3>
 
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-2">{t('addAdPage.titleDeedLabel')} <span className="text-red-500">*</span></label>
 <input 
 type="text" 
 dir="ltr"
 placeholder={t('addAdPage.titleDeedPlaceholder')}
 className={`w-full h-12 bg-white border border-gray-200 rounded-xl px-4 font-mono ${isRTL ? 'text-end' : 'text-start'} focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] outline-none transition-all`}
 value={formData.titleDeedNumber}
 onChange={(e) => updateForm('titleDeedNumber', e.target.value)}
 />
 <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1"><AlertCircle size={12}/> {t('addAdPage.nafathVerification')}</p>
 </div>

 <div>
 <label className="block text-sm font-bold text-gray-700 mb-2">{t('addAdPage.adLicenseLabel')}</label>
 <input 
 type="text" 
 dir="ltr"
 placeholder={t('addAdPage.adLicensePlaceholder')}
 className={`w-full h-12 bg-white border border-gray-200 rounded-xl px-4 font-mono ${isRTL ? 'text-end' : 'text-start'} focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] outline-none transition-all`}
 value={formData.adLicenseNumber}
 onChange={(e) => updateForm('adLicenseNumber', e.target.value)}
 />
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-2">{t('addAdPage.buildingPermitLabel')}</label>
 <input 
 type="text" 
 dir="ltr"
 placeholder={t('addAdPage.buildingPermitPlaceholder')}
 className={`w-full h-12 bg-white border border-gray-200 rounded-xl px-4 font-mono ${isRTL ? 'text-end' : 'text-start'} focus:border-[#47CCD0] focus:ring-1 outline-none transition-all`}
 value={formData.buildingPermitNumber}
 onChange={(e) => updateForm('buildingPermitNumber', e.target.value)}
 />
 </div>
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-2">{t('addAdPage.landSurveyLabel')}</label>
 <input 
 type="text" 
 dir="ltr"
 placeholder={t('addAdPage.landSurveyPlaceholder')}
 className={`w-full h-12 bg-white border border-gray-200 rounded-xl px-4 font-mono ${isRTL ? 'text-end' : 'text-start'} focus:border-[#47CCD0] focus:ring-1 outline-none transition-all`}
 value={formData.landSurveyNumber}
 onChange={(e) => updateForm('landSurveyNumber', e.target.value)}
 />
 </div>
 </div>
 </div>

 <div className="h-px w-full bg-gray-100"></div>

 {/* Wafi Integration */}
 <div className="space-y-4">
 <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-[#47CCD0]/5 cursor-pointer hover:bg-[#47CCD0]/10 transition-colors">
 <input 
 type="checkbox" 
 className="w-5 h-5 text-[#47CCD0] border-gray-300 rounded focus:ring-[#47CCD0]"
 checked={formData.isOffPlan}
 onChange={(e) => updateForm('isOffPlan', e.target.checked)}
 />
 <div className="flex-1">
 <span className="text-sm font-bold text-[#2B3D50] block mb-1">{t('addAdPage.wafiTitle')}</span>
 <span className="text-xs text-gray-500">{t('addAdPage.wafiDesc')}</span>
 </div>
 </label>

 {formData.isOffPlan && (
 <div className="p-4 border border-[#47CCD0]/30 bg-white rounded-xl animate-fade-in">
 <label className="block text-sm font-bold text-gray-700 mb-2">{t('addAdPage.wafiLicenseLabel')} <span className="text-red-500">*</span></label>
 <input 
 type="text" 
 dir="ltr"
 placeholder={t('addAdPage.wafiLicensePlaceholder')}
 className={`w-full h-12 bg-white border border-gray-200 rounded-xl px-4 font-mono ${isRTL ? 'text-end' : 'text-start'} focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] outline-none transition-all`}
 value={formData.wafiLicenseNumber}
 onChange={(e) => updateForm('wafiLicenseNumber', e.target.value)}
 />
 </div>
 )}
 </div>
 </div>
 </div>
 );

 // Step 5: Classification
 const renderStep5 = () => (
 <div className="space-y-8 animate-fade-in max-w-2xl mx-auto">
 <div className="text-center mb-8">
 <h2 className={`text-2xl font-bold text-[#2B3D50] font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}'] mb-2`}>{t('addAdPage.step5Title')}</h2>
 <p className={`text-gray-500 font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}'] text-sm`}>{t('addAdPage.step5Desc')}</p>
 </div>

 <div className="space-y-6">
 <div>
 <label className={`block text-sm font-bold text-[#2B3D50] mb-4 font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}']`}>{t('addAdPage.transactionTypeLabel')}</label>
 <div className={`grid grid-cols-2 ${formData.identity === 'host' ? 'sm:grid-cols-3' : 'sm:grid-cols-4'} gap-3`}>
 {Object.entries({
 sell: t('addAdPage.transactionTypes.sell'), 
 rentMonthly: t('addAdPage.transactionTypes.rentMonthly'), 
 rentYearly: t('addAdPage.transactionTypes.rentYearly'), 
 rentDaily: t('addAdPage.transactionTypes.rentDaily')
 })
 .filter(([key, _]) => formData.identity === 'host' ? key !== 'sell' : true)
 .map(([key, label]) => (
 <button
 key={key}
 onClick={() => updateForm('transactionType', key)}
 className={`py-3 px-4 rounded-xl border font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}'] text-sm transition-all ${
 formData.transactionType === key
 ? 'bg-[#47CCD0] text-white border-[#47CCD0] shadow-md'
 : 'bg-white border-gray-200 text-gray-600 hover:border-[#47CCD0]'
 }`}
 >
 {label}
 </button>
 ))}
 </div>
 </div>

 <div>
 <label className={`block text-sm font-bold text-[#2B3D50] mb-4 font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}']`}>{t('addAdPage.propertyCategoryLabel')}</label>
 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
 {[
 { id: 'villa', label: t('addAdPage.categories.villa'), icon: <Home size={20} /> },
 { id: 'apartment', label: t('addAdPage.categories.apartment'), icon: <Building2 size={20} /> },
 { id: 'land', label: t('addAdPage.categories.land'), icon: <MapIcon size={20} /> },
 { id: 'commercial', label: t('addAdPage.categories.commercial'), icon: <Briefcase size={20} /> },
 { id: 'chalet', label: t('addAdPage.categories.chalet'), icon: <Waves size={20} /> },
 { id: 'camp', label: t('addAdPage.categories.camp'), icon: <Tent size={20} /> }
 ].map(cat => (
 <button
 key={cat.id}
 onClick={() => updateForm('propertyCategory', cat.id)}
 className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
 formData.propertyCategory === cat.id
 ? 'border-[#47CCD0] bg-[#47CCD0]/5 text-[#47CCD0]'
 : 'border-gray-100 bg-white text-gray-500 hover:border-gray-300'
 }`}
 >
 {cat.icon}
 <span className={`font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}'] font-medium`}>{cat.label}</span>
 </button>
 ))}
 </div>
 </div>
 </div>
 </div>
 );

 // Step 6: Technical Details
 const renderStep6 = () => (
 <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
 <div className="text-center mb-8">
 <h2 className={`text-2xl font-bold text-[#2B3D50] font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}'] mb-2`}>{t('addAdPage.step6Title')}</h2>
 <p className={`text-gray-500 font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}'] text-sm`}>{t('addAdPage.step6Desc')}</p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 <div className="grid grid-cols-2 gap-4">
 {[
 { id: 'numberOfStreets', label: t('addAdPage.fields.numberOfStreets'), type: 'number' },
 { id: 'area', label: t('addAdPage.fields.area'), type: 'number' },
 { id: 'price', label: t('addAdPage.fields.price'), type: 'number', icon: <RiyalSymbol className="w-4 h-4 text-gray-500" /> },
 { id: 'rooms', label: t('addAdPage.fields.rooms'), type: 'number' },
 { id: 'livings', label: t('addAdPage.fields.livings'), type: 'number' },
 { id: 'wc', label: t('addAdPage.fields.wc'), type: 'number' },
 { id: 'floor', label: t('addAdPage.fields.floor'), type: 'text' },
 { id: 'age', label: t('addAdPage.fields.age'), type: 'number' },
 { id: 'propertyCondition', label: t('addAdPage.fields.propertyCondition'), type: 'select', options: [t('addAdPage.conditionOptions.new'), t('addAdPage.conditionOptions.old')] },
 ]
 .map(field => (
 <div key={field.id}>
 <label className={`block text-xs font-bold text-gray-500 mb-2 font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}']`}>{field.label}</label>
 {field.type === 'select' ? (
 <select
 className="w-full h-12 bg-white border border-gray-200 rounded-xl px-4 font-['Helvetica'] focus:border-[#47CCD0] focus:ring-2 focus:ring-[#47CCD0]/20 outline-none transition-all"
 value={(formData as any)[field.id]}
 onChange={(e) => updateForm(field.id, e.target.value)}
 >
 <option value="">{t('addAdPage.selectStatus')}</option>
 {field.options?.map(opt => (
 <option key={opt} value={opt}>{opt}</option>
 ))}
 </select>
 ) : (
 <input
 type={field.type}
 min={field.type === 'number' ? "0" : undefined}
 className="w-full h-12 bg-white border border-gray-200 rounded-xl px-4 font-['Helvetica'] focus:border-[#47CCD0] focus:ring-2 focus:ring-[#47CCD0]/20 outline-none transition-all"
 value={(formData as any)[field.id]}
 onChange={(e) => {
 let val = e.target.value;
 if (field.type === 'number' && parseFloat(val) < 0) val = "0";
 updateForm(field.id, val);
 if (field.id === 'numberOfStreets') {
 const num = parseInt(val) || 0;
 if (num !== formData.streetWidths?.length) {
 const newWidths = Array(num).fill(null).map(() => ({ width: '', direction: '' }));
 for (let i = 0; i < Math.min(num, formData.streetWidths?.length || 0); i++) {
 newWidths[i] = typeof formData.streetWidths[i] === 'object' 
 ? formData.streetWidths[i] 
 : { width: formData.streetWidths[i] || '', direction: '' };
 }
 updateForm('streetWidths', newWidths);
 }
 }
 }}
 />
 )}
 </div>
 ))}
 
 {parseInt(formData.numberOfStreets) > 0 && Array.from({ length: parseInt(formData.numberOfStreets) }).map((_, index) => (
 <div key={`streetWidth-${index}`} className="flex gap-2 items-end">
 <div className="flex-1">
 <label className={`block text-xs font-bold text-gray-500 mb-2 font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}']`}>{t('addAdPage.streetWidth')} {index + 1} (م)</label>
 <input
 type="number"
 min="0"
 className="w-full h-12 bg-white border border-gray-200 rounded-xl px-4 font-['Helvetica'] focus:border-[#47CCD0] focus:ring-2 focus:ring-[#47CCD0]/20 outline-none transition-all"
 value={formData.streetWidths?.[index]?.width || (typeof formData.streetWidths?.[index] === 'string' ? formData.streetWidths[index] : '') || ''}
 onChange={(e) => {
 let val = e.target.value;
 if (parseFloat(val) < 0) val = "0";
 const newWidths = [...(formData.streetWidths || [])];
 const current = typeof newWidths[index] === 'object' ? newWidths[index] : { width: newWidths[index] || '', direction: '' };
 newWidths[index] = { ...current, width: val };
 updateForm('streetWidths', newWidths);
 }}
 />
 </div>
 <div className="w-24">
 <label className={`block text-xs font-bold text-gray-500 mb-2 font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}'] text-center`}>{t('addAdPage.streetDirection')}</label>
 <select
 className={`w-full h-12 bg-white border border-gray-200 rounded-xl px-2 font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}'] font-bold focus:border-[#47CCD0] focus:ring-2 focus:ring-[#47CCD0]/20 outline-none transition-all appearance-none text-center cursor-pointer text-[#2B3D50]`}
 value={formData.streetWidths?.[index]?.direction || ''}
 onChange={(e) => {
 const newWidths = [...(formData.streetWidths || [])];
 const current = typeof newWidths[index] === 'object' ? newWidths[index] : { width: newWidths[index] || '', direction: '' };
 newWidths[index] = { ...current, direction: e.target.value };
 updateForm('streetWidths', newWidths);
 }}
 style={{ backgroundImage: 'none' }}
 >
 <option value="" disabled className="text-gray-400 font-normal">{t('addAdPage.directionsSelect')}</option>
 <option value="n">{t('addAdPage.directions.n')}</option>
 <option value="s">{t('addAdPage.directions.s')}</option>
 <option value="e">{t('addAdPage.directions.e')}</option>
 <option value="w">{t('addAdPage.directions.w')}</option>
 </select>
 </div>
 </div>
 ))}
 </div>

 <div className="bg-gray-50 rounded-2xl p-6 flex flex-col items-center justify-center border border-gray-200">
 <label className={`block text-sm font-bold text-[#2B3D50] mb-6 font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}']`}>{t('addAdPage.facadeLabel')}</label>
 <div className="relative w-48 h-48 rounded-full border-4 border-dashed border-gray-200 flex items-center justify-center">
 <div className={`absolute top-2 text-gray-400 font-bold font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}']`}>{t('addAdPage.directions.n')}</div>
 <div className={`absolute bottom-2 text-gray-400 font-bold font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}']`}>{t('addAdPage.directions.s')}</div>
 <div className={`absolute end-2 text-gray-400 font-bold font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}']`}>{t('addAdPage.directions.e')}</div>
 <div className={`absolute start-2 text-gray-400 font-bold font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}']`}>{t('addAdPage.directions.w')}</div>
 
 <div className="grid grid-cols-3 gap-2 p-8 w-full h-full relative z-10">
 {[
 t('addAdPage.facadeOptions.nw'), 
 t('addAdPage.facadeOptions.n'), 
 t('addAdPage.facadeOptions.ne'), 
 t('addAdPage.facadeOptions.w'), 
 t('addAdPage.facadeOptions.multi'), 
 t('addAdPage.facadeOptions.e'), 
 t('addAdPage.facadeOptions.sw'), 
 t('addAdPage.facadeOptions.s'), 
 t('addAdPage.facadeOptions.se')
 ].map((dir, i) => (
 <button
 key={i}
 onClick={() => updateForm('direction', dir)}
 className={`w-full h-full rounded-lg transition-all flex items-center justify-center text-[10px] font-bold font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}'] ${
 formData.direction === dir 
 ? 'bg-[#47CCD0] text-white shadow-md scale-110 z-20' 
 : 'bg-white text-gray-500 hover:bg-gray-100'
 }`}
 >
 {dir === t('addAdPage.facadeOptions.multi') ? <Navigation size={14} /> : ''}
 </button>
 ))}
 </div>
 </div>
 {formData.direction && (
 <div className={`mt-4 text-[#47CCD0] font-bold font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}']`}>
 {t('addAdPage.selectedDirection')}{formData.direction}
 </div>
 )}
 </div>
 </div>
 </div>
 );

 // Step 7: Amenities
 const renderStep7 = () => {
 const amenitiesList = [
 { id: 'driver', label: t('addAdPage.amenities.driver'), icon: <Car size={16} className="text-gray-500" /> },
 { id: 'maid', label: t('addAdPage.amenities.maid'), icon: <Brush size={16} className="text-gray-500" /> },
 { id: 'pool', label: t('addAdPage.amenities.pool'), icon: <Waves size={16} className="text-blue-500" /> },
 { id: 'elevator', label: t('addAdPage.amenities.elevator'), icon: <ArrowUpDown size={16} className="text-gray-500" /> },
 { id: 'roof', label: t('addAdPage.amenities.roof'), icon: <Tent size={16} className="text-amber-600" /> },
 { id: 'yard', label: t('addAdPage.amenities.yard'), icon: <Leaf size={16} className="text-emerald-500" /> },
 { id: 'ac', label: t('addAdPage.amenities.ac'), icon: <Snowflake size={16} className="text-sky-400" /> },
 { id: 'kitchen', label: t('addAdPage.amenities.kitchen'), icon: <Utensils size={16} className="text-gray-500" /> },
 { id: 'smart', label: t('addAdPage.amenities.smart'), icon: <Smartphone size={16} className="text-gray-700" /> },
 { id: 'parking', label: t('addAdPage.amenities.parking'), icon: <div className="w-[16px] h-[16px] bg-blue-600 text-white rounded-[4px] text-[10px] flex items-center justify-center font-bold">P</div> },
 { id: 'gym', label: t('addAdPage.amenities.gym'), icon: <Dumbbell size={16} className="text-gray-600" /> },
 { id: 'security', label: t('addAdPage.amenities.security'), icon: <ShieldCheck size={16} className="text-slate-700" /> },
 ];

 return (
 <div className="space-y-8 animate-fade-in max-w-3xl mx-auto">
 <div className="text-center mb-8">
 <h2 className={`text-2xl font-bold text-[#2B3D50] font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}'] mb-2`}>{t('addAdPage.step7Title')}</h2>
 <p className={`text-gray-500 font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}'] text-sm`}>{t('addAdPage.step7Desc')}</p>
 </div>

 <div className="flex flex-wrap gap-3 justify-center">
 {amenitiesList.map(item => {
 const isSelected = formData.amenities.includes(item.id);
 return (
 <button
 key={item.id}
 onClick={() => toggleArrayItem('amenities', item.id)}
 className={`flex items-center gap-2 px-5 py-3 rounded-full border transition-all font-['Noto_Kufi_Arabic'] text-sm ${
 isSelected 
 ? 'bg-[#47CCD0] border-[#47CCD0] text-white shadow-md' 
 : 'bg-white border-gray-200 text-gray-600 hover:border-[#47CCD0] hover:text-[#47CCD0]'
 }`}
 >
 <span>{item.icon}</span>
 <span>{item.label}</span>
 {isSelected && <Check size={14} />}
 </button>
 );
 })}
 </div>
 </div>
 );
 };

 // Step 8: Description
 const renderStep8 = () => (
 <div className="space-y-8 animate-fade-in max-w-3xl mx-auto">
 <div className="text-center mb-8">
 <h2 className={`text-2xl font-bold text-[#2B3D50] font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}'] mb-2`}>{t('addAdPage.step8Title')}</h2>
 <p className={`text-gray-500 font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}'] text-sm`}>{t('addAdPage.step8Desc')}</p>
 </div>

 <div className="space-y-6">
 <div>
 <label className={`block text-sm font-bold text-[#2B3D50] mb-3 font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}']`}>{t('addAdPage.targetAudienceLabel')}</label>
 <div className="flex gap-4">
 {[
 { id: 'family', label: t('addAdPage.targets.family'), icon: <Users size={20} /> },
 { id: 'single', label: t('addAdPage.targets.single'), icon: <User size={20} /> },
 { id: 'both', label: t('addAdPage.targets.both'), icon: <Target size={20} /> }
 ].map(target => (
 <button
 key={target.id}
 onClick={() => updateForm('targetAudience', target.id)}
 className={`flex-1 flex items-center justify-center gap-2 h-14 rounded-xl border font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}'] transition-all ${
 formData.targetAudience === target.id
 ? 'bg-[#47CCD0]/10 border-[#47CCD0] text-[#47CCD0] font-bold'
 : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
 }`}
 >
 {target.icon}
 {target.label}
 </button>
 ))}
 </div>
 </div>

 <div>
 <label className={`block text-sm font-bold text-[#2B3D50] mb-3 font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}']`}>{t('addAdPage.descriptionLabel')}</label>
 <textarea
 rows={6}
 placeholder={t('addAdPage.descriptionPlaceholder')}
 className={`w-full bg-white border border-gray-200 rounded-xl p-4 font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}'] focus:border-[#47CCD0] focus:ring-2 focus:ring-[#47CCD0]/20 outline-none resize-none transition-all`}
 value={formData.description}
 onChange={(e) => updateForm('description', e.target.value)}
 />
 <p className="text-xs text-gray-400 mt-2 text-start font-['Helvetica']">{formData.description.length} / 1000</p>
 </div>
 </div>
 </div>
 );

 // Step 9: Geo-Location
 const renderStep9 = () => (
 <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
 <div className="text-center mb-8">
 <h2 className={`text-2xl font-bold text-[#2B3D50] font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}'] mb-2`}>{t('addAdPage.step9Title')}</h2>
 <p className={`text-gray-500 font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}'] text-sm`}>{t('addAdPage.step9Desc')}</p>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <div className="lg:col-span-2 relative h-80 bg-gray-200 rounded-2xl overflow-hidden border border-gray-300">
 {/* Mock Map Background */}
 <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=24.7136,46.6753&zoom=13&size=800x400&sensor=false')] bg-cover bg-center opacity-50 blur-[1px]"></div>
 
 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
 <div className="relative">
 <MapPin size={48} className="text-red-500 absolute -top-12 -start-6 animate-bounce" />
 <div className="w-4 h-1 bg-black/20 rounded-full blur-[2px] absolute -start-2 top-0"></div>
 </div>
 </div>
 
 <div className="absolute bottom-4 start-4 end-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg flex justify-between items-center" dir="ltr">
 <span className="font-['Helvetica'] text-sm font-bold text-gray-700">Lat: {formData.lat}</span>
 <span className="font-['Helvetica'] text-sm font-bold text-gray-700">Lng: {formData.lng}</span>
 </div>
 </div>

 <div className="space-y-6">
 <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-full flex flex-col justify-center">
 <label className={`block text-sm font-bold text-[#2B3D50] mb-3 font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}']`}>{t('addAdPage.nationalAddressLabel')}</label>
 <input
 type="text"
 placeholder={t('addAdPage.nationalAddressPlaceholder')}
 className="w-full h-14 bg-gray-50 border border-gray-200 rounded-xl px-4 font-['Helvetica'] focus:border-[#47CCD0] focus:ring-2 focus:ring-[#47CCD0]/20 outline-none transition-all uppercase"
 value={formData.nationalAddress}
 onChange={(e) => updateForm('nationalAddress', e.target.value)}
 dir="ltr"
 />
 <p className={`text-xs text-gray-500 mt-4 font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}'] leading-relaxed`}>
 {t('addAdPage.nationalAddressHelp')}
 </p>
 </div>
 </div>
 </div>
 </div>
 );

 // Step 10: Media
 const renderStep10 = () => {

 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 const files = Array.from(e.target.files || []);
 if (files.length === 0) return;
 
 const newImages = files.map(file => ({
 url: URL.createObjectURL(file),
 isVideo: file.type.startsWith('video/')
 }));
 const allImages = [...formData.images, ...newImages].slice(0, 10);
 updateForm('images', allImages);
 };

 const handleDragOver = (e: React.DragEvent) => {
 e.preventDefault();
 e.stopPropagation();
 };

 const handleDrop = (e: React.DragEvent) => {
 e.preventDefault();
 e.stopPropagation();
 const files = Array.from(e.dataTransfer.files || []);
 if (files.length === 0) return;
 
 const newImages = files.map(file => ({
 url: URL.createObjectURL(file),
 isVideo: file.type.startsWith('video/')
 }));
 const allImages = [...formData.images, ...newImages].slice(0, 10);
 updateForm('images', allImages);
 };

 const removeImage = (index: number) => {
 const newImages = formData.images.filter((_, i) => i !== index);
 updateForm('images', newImages);
 };

 return (
 <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
 <div className="text-center mb-8">
 <h2 className={`text-2xl font-bold text-[#2B3D50] font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}'] mb-2`}>{t('addAdPage.step10Title')}</h2>
 <p className={`text-gray-500 font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}'] text-sm`}>{t('addAdPage.step10Desc')}</p>
 </div>

 <div 
 className="border-2 border-dashed border-[#47CCD0]/50 bg-[#47CCD0]/5 rounded-3xl p-12 text-center hover:bg-[#47CCD0]/10 transition-colors cursor-pointer group"
 onDragOver={handleDragOver}
 onDrop={handleDrop}
 onClick={() => fileInputRef.current?.click()}
 >
 <input 
 type="file" 
 ref={fileInputRef} 
 className="hidden" 
 multiple 
 accept="image/*,video/*" 
 onChange={handleFileChange} 
 />
 <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-[#47CCD0] shadow-sm mx-auto mb-6 group-hover:scale-110 transition-transform">
 <Upload size={32} />
 </div>
 <h3 className="text-lg font-bold text-[#2B3D50] mb-2 font-['Noto_Kufi_Arabic']">{t('addAdPage.dragDropTitle')}</h3>
 <p className="text-gray-500 text-sm mb-8 font-['Noto_Kufi_Arabic']">{t('addAdPage.dragDropDesc')}</p>
 <button
 type="button"
 className="px-8 py-3 bg-[#47CCD0] text-white rounded-xl font-bold font-['Noto_Kufi_Arabic'] shadow-lg hover:bg-[#3bb1b7] transition-colors"
 onClick={(e) => {
 e.stopPropagation();
 fileInputRef.current?.click();
 }}
 >
 {t('addAdPage.chooseFilesBtn')}
 </button>
 </div>

 {formData.images.length > 0 && (
 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8">
 {formData.images.map((media, idx) => (
 <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group border border-gray-200 bg-gray-50 flex items-center justify-center">
 {media.isVideo ? (
 <video src={media.url} className="w-full h-full object-cover" />
 ) : (
 <img src={media.url} alt="" className="w-full h-full object-cover" />
 )}
 {media.isVideo && (
 <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
 <Play className="text-white w-8 h-8 opacity-80" />
 </div>
 )}
 <button 
 type="button"
 onClick={() => removeImage(idx)}
 className="absolute top-2 end-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-600"
 >
 <Trash2 size={16} />
 </button>
 </div>
 ))}
 </div>
 )}
 </div>
 );
 };

 // Step 11: Legal & Obligations
 const renderStep11 = () => {
 const obligations = [
 { id: 'sbc', label: t('addAdPage.obligations.sbc'), icon: <CheckCircle2 size={20} className="text-emerald-500" /> },
 { id: 'guarantee', label: t('addAdPage.obligations.guarantee'), icon: <Shield size={20} className="text-blue-500" /> },
 { id: 'mortgage', label: t('addAdPage.obligations.mortgage'), icon: <AlertCircle size={20} className="text-amber-500" /> },
 { id: 'rented', label: t('addAdPage.obligations.rented'), icon: <Key size={20} className="text-purple-500" /> },
 ];

 return (
 <div className="space-y-8 animate-fade-in max-w-2xl mx-auto">
 <div className="text-center mb-8">
 <h2 className="text-2xl font-bold text-[#2B3D50] font-['Noto_Kufi_Arabic'] mb-2">{t('addAdPage.step11Title')}</h2>
 <p className="text-gray-500 font-['Noto_Kufi_Arabic'] text-sm">{t('addAdPage.step11Desc')}</p>
 </div>

 <div className="space-y-4">
 {obligations.map(ob => {
 const isSelected = formData.obligations.includes(ob.id);
 return (
 <button
 type="button"
 key={ob.id}
 onClick={() => toggleArrayItem('obligations', ob.id)}
 className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${
 isSelected
 ? 'border-[#47CCD0] bg-[#47CCD0]/5'
 : 'border-gray-100 bg-white hover:border-gray-200'
 }`}
 >
 <div className="flex items-center gap-4">
 <div className={`w-6 h-6 rounded-md flex items-center justify-center border transition-colors ${
 isSelected ? 'bg-[#47CCD0] border-[#47CCD0] text-white' : 'border-gray-300'
 }`}>
 {isSelected && <Check size={14} />}
 </div>
 <span className="font-bold text-[#2B3D50] font-['Noto_Kufi_Arabic']">{ob.label}</span>
 </div>
 {ob.icon}
 </button>
 );
 })}
 </div>
 </div>
 );
 };

 // Step 12: Review & Boost
 const renderStep12 = () => (
 <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
 <div className="text-center mb-8">
 <h2 className="text-2xl font-bold text-[#2B3D50] font-['Noto_Kufi_Arabic'] mb-2">{t('addAdPage.step12Title')}</h2>
 <p className="text-gray-500 font-['Noto_Kufi_Arabic'] text-sm">{t('addAdPage.step12Desc')}</p>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
 <div className="lg:col-span-1 space-y-6">
 <h3 className="font-bold text-[#2B3D50] text-lg font-['Noto_Kufi_Arabic'] flex items-center gap-2">
 <Sparkles className="text-[#47CCD0]" />
 {t('addAdPage.boostPlansTitle')}
 </h3>
 {[
 { id: 'basic', label: t('addAdPage.plans.basicTitle'), price: t('addAdPage.plans.free'), desc: t('addAdPage.plans.basicDesc') },
 { id: 'premium', label: t('addAdPage.plans.premiumTitle'), price: <span className="flex items-center gap-1">199 <RiyalSymbol className="w-3 h-3 text-white" /></span>, desc: t('addAdPage.plans.premiumDesc'), highlight: true },
 { id: 'vip', label: t('addAdPage.plans.vipTitle'), price: <span className="flex items-center gap-1">499 <RiyalSymbol className="w-3 h-3 text-gray-900" /></span>, desc: t('addAdPage.plans.vipDesc') }
 ].map(plan => (
 <div
 key={plan.id}
 onClick={() => updateForm('boostPlan', plan.id)}
 className={`p-6 rounded-2xl border-2 cursor-pointer transition-all relative overflow-hidden ${
 formData.boostPlan === plan.id
 ? 'border-[#47CCD0] bg-white shadow-lg'
 : 'border-gray-100 bg-gray-50 hover:bg-white'
 }`}
 >
 {plan.highlight && formData.boostPlan !== plan.id && (
 <div className="absolute top-0 end-0 bg-[#47CCD0] text-white text-xs px-3 py-1 font-bold font-['Noto_Kufi_Arabic'] rounded-es-lg">
 {t('addAdPage.mostRequested')}
 </div>
 )}
 {formData.boostPlan === plan.id && (
 <div className="absolute -start-6 -top-6 w-16 h-16 bg-[#47CCD0] rounded-full opacity-10"></div>
 )}

 <div className="flex justify-between items-center mb-2">
 <span className={`font-bold font-['Noto_Kufi_Arabic'] ${formData.boostPlan === plan.id ? 'text-[#47CCD0]' : 'text-[#2B3D50]'}`}>{plan.label}</span>
 <span className="font-bold font-['Helvetica'] text-[#2B3D50]">{plan.price}</span>
 </div>
 <p className="text-xs text-gray-500 font-['Noto_Kufi_Arabic'] leading-relaxed">{plan.desc}</p>

 {formData.boostPlan === plan.id && (
 <div className="mt-4 flex items-center gap-2 text-sm text-[#47CCD0] font-bold font-['Noto_Kufi_Arabic']">
 <CheckCircle2 size={16} /> {t('addAdPage.selectedPlan')}
 </div>
 )}
 </div>
 ))}
 </div>

 <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
 <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
 <h3 className="font-bold text-[#2B3D50] text-lg font-['Noto_Kufi_Arabic']">{t('addAdPage.summaryTitle')}</h3>
 <button onClick={() => setCurrentStep(6)} className="text-[#47CCD0] text-sm flex items-center gap-1 font-['Noto_Kufi_Arabic']">
 {t('addAdPage.editBtn')} <Edit2 size={14} />
 </button>
 </div>

 <div className="grid grid-cols-2 gap-y-6 gap-x-8">
 <div>
 <span className="block text-xs text-gray-500 mb-1 font-['Noto_Kufi_Arabic']">{t('addAdPage.summary.category')}</span>
 <span className="font-bold text-[#2B3D50] font-['Noto_Kufi_Arabic']">{formData.propertyCategory || t('addAdPage.categories.villa')} - {formData.transactionType || t('addAdPage.transactionTypes.sell')}</span>
 </div>
 <div>
 <span className="block text-xs text-gray-500 mb-1 font-['Noto_Kufi_Arabic']">{t('addAdPage.summary.price')}</span>
 <span className="font-bold text-[#47CCD0] font-['Helvetica'] text-lg flex items-center gap-1.5">{formData.price || '0'} <RiyalSymbol className="w-4 h-4 text-[#47CCD0]" /></span>
 </div>
 <div>
 <span className="block text-xs text-gray-500 mb-1 font-['Noto_Kufi_Arabic']">{t('addAdPage.summary.area')}</span>
 <span className="font-bold text-[#2B3D50] font-['Helvetica']">{formData.area || '0'} m²</span>
 </div>
 <div>
 <span className="block text-xs text-gray-500 mb-1 font-['Noto_Kufi_Arabic']">{t('addAdPage.summary.rega')}</span>
 <span className="font-bold text-[#2B3D50] font-['Helvetica']">{formData.regaNumber || '-'}</span>
 </div>
 </div>

 <div className="mt-8 p-4 bg-[#FFF9EE] rounded-xl border border-[#FDE68A] flex items-start gap-3">
 <AlertCircle className="text-[#D97706] flex-shrink-0 mt-0.5" size={20} />
 <p className="text-sm text-[#B45309] font-['Noto_Kufi_Arabic'] leading-relaxed">
 {t('addAdPage.disclaimerText1')}<a href="#" className="underline font-bold">{t('addAdPage.disclaimerText2')}</a>{t('addAdPage.disclaimerText3')}
 </p>
 </div>
 </div>
 </div>
 </div>
 );

 return (
 <div className="pt-32 pb-20 md:pt-40 md:pb-24 min-h-screen bg-[#F8FAFC]">
 <div className="container mx-auto px-4 max-w-6xl">
 
 {/* Header & Logo */}
 <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
 <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
 <button 
 onClick={handleBack}
 className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#2B3D50] hover:text-[#47CCD0] hover:border-[#47CCD0] transition-all shadow-sm"
 >
 <ChevronRight size={24} />
 </button>
 <h1 className="text-2xl font-bold text-[#2B3D50] font-['Noto_Kufi_Arabic'] md:hidden">{t('addAdPage.pageTitleMobile')}</h1>
 </div>
 
 <div className="hidden md:flex flex-col items-center">
 <h1 className="text-2xl font-bold text-[#2B3D50] font-['Noto_Kufi_Arabic']">{t('addAdPage.pageTitleDesktop')}</h1>
 <p className="text-gray-500 text-sm font-['Noto_Kufi_Arabic'] mt-1">{t('addAdPage.pageSubtitle')}</p>
 </div>
 
 <div className="flex items-center font-bold text-lg font-['Helvetica'] text-[#2B3D50] bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
 {t('addAdPage.stepProgressText')} <span className="text-[#47CCD0] mx-1">{currentStep}</span> {t('addAdPage.stepOfText')} {totalSteps}
 </div>
 </div>

 {/* Horizontal Stepper (Desktop) / Progress Bar (Mobile) */}
 <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 mb-10 overflow-hidden">
 {/* Mobile Progress Line */}
 <div className="md:hidden h-2 bg-gray-100 rounded-full w-full overflow-hidden">
 <div 
 className="h-full bg-[#47CCD0] transition-all duration-500 ease-out"
 style={{ width: `${(currentStep / totalSteps) * 100}%` }}
 ></div>
 </div>

 {/* Desktop Stepper */}
 <div className="hidden md:flex relative justify-between px-2">
 <div className="absolute top-1/2 start-8 end-8 h-[2px] bg-gray-100 -translate-y-1/2 z-0">
 <div 
 className="h-full bg-[#47CCD0] transition-all duration-500 ease-out"
 style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
 ></div>
 </div>

 {Array.from({ length: totalSteps }).map((_, idx) => {
 const stepNum = idx + 1;
 const isActive = currentStep === stepNum;
 const isPassed = currentStep > stepNum;
 
 return (
 <div key={stepNum} className="relative z-10 flex flex-col items-center gap-2">
 <div 
 className={`w-8 h-8 rounded-full flex items-center justify-center font-['Helvetica'] text-sm font-bold transition-all duration-300 border-2 ${
 isActive 
 ? 'bg-[#47CCD0] border-[#47CCD0] text-white ring-4 ring-[#47CCD0]/20 scale-110' 
 : isPassed 
 ? 'bg-[#47CCD0] border-[#47CCD0] text-white'
 : 'bg-white border-gray-200 text-gray-300'
 }`}
 >
 {isPassed ? <Check size={16} /> : stepNum}
 </div>
 </div>
 );
 })}
 </div>
 </div>

 {/* Content Area */}
 <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-12 min-h-[400px] flex flex-col relative overflow-hidden">
 {/* Background Decoration */}
 <div className="absolute top-0 start-0 w-64 h-64 bg-[#47CCD0]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
 
 <div className="relative z-20 flex-grow">
 {currentStep === 1 && renderStep1()}
 {currentStep === 2 && renderStep2()}
 {currentStep === 3 && renderStep3()}
 {currentStep === 4 && renderStep4()}
 {currentStep === 5 && renderStep5()}
 {currentStep === 6 && renderStep6()}
 {currentStep === 7 && renderStep7()}
 {currentStep === 8 && renderStep8()}
 {currentStep === 9 && renderStep9()}
 {currentStep === 10 && renderStep10()}
 {currentStep === 11 && renderStep11()}
 {currentStep === 12 && renderStep12()}
 </div>

 {/* Navigation Buttons */}
 <div className="mt-12 pt-8 border-t border-gray-100 flex gap-4 relative z-10">
 <button 
 onClick={handleBack}
 disabled={currentStep === 1}
 className={`flex-1 md:flex-none md:w-40 h-14 rounded-xl font-bold font-['Noto_Kufi_Arabic'] border border-gray-200 text-[#2B3D50] hover:bg-gray-50 transition-all ${currentStep === 1 ? 'opacity-0 pointer-events-none' : ''}`}
 >
 السابق
 </button>
 <button 
 onClick={handleNext}
 className="flex-[2] md:flex-1 h-14 bg-[#47CCD0] text-white rounded-xl font-bold font-['Noto_Kufi_Arabic'] hover:bg-[#3bb1b7] transition-all shadow-lg flex items-center justify-center gap-2"
 >
 {currentStep === totalSteps ? 'نش�� الإعلان' : 'متابعة'}
 {currentStep !== totalSteps && <ChevronRight size={20} className="rotate-180" />}
 </button>
 </div>
 </div>

 </div>
 </div>
 );
};
