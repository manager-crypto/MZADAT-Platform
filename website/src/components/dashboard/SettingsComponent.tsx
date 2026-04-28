import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
 User,
 Bell,
 Lock,
 Globe,
 Shield,
 Smartphone,
 Mail,
 Key,
 Save,
 CheckCircle2,
 Palette,
 Sun,
 Moon,
 Monitor,
 Sparkles,
 ChevronDown,
 Copy,
 AlertCircle
} from 'lucide-react';

import { PhoneInput } from '../ui/PhoneInput';

export const SettingsComponent = () => {
 const { t } = useTranslation();
 const [activeTab, setActiveTab] = useState('preferences');
 const [isSaved, setIsSaved] = useState(false);
 const [theme, setTheme] = useState('light');
 const [primaryColor, setPrimaryColor] = useState('#47CCD0');
 const [fontSize, setFontSize] = useState('medium');

 // Verification States
 const [emailVerified, setEmailVerified] = useState(false);
 const [phoneVerified, setPhoneVerified] = useState(false);

 // OTP Modal States
 const [showOtpModal, setShowOtpModal] = useState(false);
 const [otpTarget, setOtpTarget] = useState<'email' | 'phone' | null>(null);
 const [otpValue, setOtpValue] = useState(['', '', '', '']);
 const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

 const handleOpenOtpModal = (target: 'email' | 'phone') => {
 setOtpTarget(target);
 setOtpValue(['', '', '', '']);
 setShowOtpModal(true);
 };

 const handleVerifyOtpSubmit = () => {
 setIsVerifyingOtp(true);
 // Simulate API call
 setTimeout(() => {
 setIsVerifyingOtp(false);
 setShowOtpModal(false);
 if (otpTarget === 'email') setEmailVerified(true);
 if (otpTarget === 'phone') setPhoneVerified(true);
 }, 1500);
 };

 const colors = [
 '#2B3D50', '#EF4444', '#10B981', '#F59E0B',
 '#EC4899', '#8B5CF6', '#6366F1', '#47CCD0'
 ];

 useEffect(() => {
 const html = document.documentElement;
 html.classList.remove('light', 'dark', 'brand');

 if (theme === 'system') {
 const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
 html.classList.add(isSystemDark ? 'dark' : 'light');
 } else {
 html.classList.add(theme);
 }
 }, [theme]);

 useEffect(() => {
 let styleEl = document.getElementById('dynamic-theme-colors');
 if (!styleEl) {
 styleEl = document.createElement('style');
 styleEl.id = 'dynamic-theme-colors';
 document.head.appendChild(styleEl);
 }

 styleEl.innerHTML = `
 :root {
 --primary: ${primaryColor};
 --ring: ${primaryColor};
 --sidebar-primary: ${primaryColor};
 --sidebar-ring: ${primaryColor};
 --accent: ${primaryColor};
 }
 .text-\\[\\#47CCD0\\] { color: ${primaryColor} !important; }
 .bg-\\[\\#47CCD0\\] { background-color: ${primaryColor} !important; }
 .border-\\[\\#47CCD0\\] { border-color: ${primaryColor} !important; }
 .fill-\\[\\#47CCD0\\] { fill: ${primaryColor} !important; }
 .bg-\\[\\#47CCD0\\]\\/5 { background-color: ${primaryColor}0D !important; }
 .bg-\\[\\#47CCD0\\]\\/10 { background-color: ${primaryColor}1A !important; }
 .bg-\\[\\#47CCD0\\]\\/20 { background-color: ${primaryColor}33 !important; }
 .hover\\:bg-\\[\\#47CCD0\\]\\/5:hover { background-color: ${primaryColor}0D !important; }
 .hover\\:bg-\\[\\#47CCD0\\]\\/10:hover { background-color: ${primaryColor}1A !important; }
 .hover\\:text-\\[\\#47CCD0\\]:hover { color: ${primaryColor} !important; }
 .dark\\:hover\\:text-\\[\\#47CCD0\\]:hover { color: ${primaryColor} !important; }
 `;
 }, [primaryColor]);

 useEffect(() => {
 const html = document.documentElement;
 if (fontSize === 'small') html.style.fontSize = '14px';
 else if (fontSize === 'large') html.style.fontSize = '18px';
 else html.style.fontSize = '16px';
 }, [fontSize]);

 const handleSave = () => {
 setIsSaved(true);
 setTimeout(() => setIsSaved(false), 3000);
 };

 const isDark = theme === 'dark';
 const isLight = theme === 'light';
 const isSystem = theme === 'system';

 const wrapperClass = `w-full min-h-full p-4 sm:p-6 md:p-8 rounded-[2rem] transition-colors duration-500 font-['Noto_Kufi_Arabic'] ${
 isDark ? 'bg-[#2B3D50] text-white' :
 isLight ? 'bg-[#F9FAFB] text-[#2B3D50]' :
 'bg-[#F9FAFB] dark:bg-[#2B3D50] text-[#2B3D50] dark:text-white'
 }`;

 const cardClass = `rounded-2xl p-6 sm:p-8 space-y-8 animate-in fade-in transition-all duration-500 ${
 isDark ? 'bg-[#364a5f] border border-white/10 shadow-sm' :
 isLight ? 'bg-white border border-gray-100 shadow-sm' :
 'bg-white dark:bg-[#364a5f] border border-gray-100 dark:border-white/10 shadow-sm'
 }`;

 const textPrimaryClass = `font-bold transition-colors ${
 isDark ? 'text-white' :
 isLight ? 'text-[#2B3D50]' :
 'text-[#2B3D50] dark:text-white'
 }`;

 const textSecondaryClass = `text-sm transition-colors ${
 isDark ? 'text-white/60' :
 isLight ? 'text-[#B6B5B5]' :
 'text-[#B6B5B5] dark:text-white/60'
 }`;

 const inputClass = `w-full px-4 py-3 rounded-xl border transition-colors focus:ring-2 focus:ring-[#47CCD0]/40 focus:border-[#47CCD0] outline-none font-['Noto_Kufi_Arabic'] ${
 isDark ? 'bg-[#2B3D50] border-white/10 text-white placeholder-white/40' :
 isLight ? 'bg-white border-gray-200 text-gray-900 placeholder-gray-400' :
 'bg-white dark:bg-[#2B3D50] border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/40'
 }`;

 const inputIconClass = `absolute start-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${
 isDark ? 'text-white/40' :
 isLight ? 'text-[#B6B5B5]' :
 'text-[#B6B5B5] dark:text-white/40'
 }`;

 const sidebarBtnClass = (isActive: boolean) => {
 const base = "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all font-['Noto_Kufi_Arabic'] relative z-10";
 if (isActive) {
 if (isDark) return `${base} bg-[#364a5f] text-[#47CCD0] shadow-sm border border-white/10`;
 if (isLight) return `${base} bg-white text-[#47CCD0] shadow-sm border border-gray-100`;
 return `${base} bg-white dark:bg-[#364a5f] text-[#47CCD0] shadow-sm border border-gray-100 dark:border-white/10`;
 }
 if (isDark) return `${base} text-white/60 hover:bg-white/5 hover:text-[#47CCD0]`;
 if (isLight) return `${base} text-[#B6B5B5] hover:bg-[#47CCD0]/5 hover:text-[#47CCD0]`;
 return `${base} text-[#B6B5B5] dark:text-white/60 hover:bg-[#47CCD0]/5 dark:hover:bg-white/5 hover:text-[#47CCD0] dark:hover:text-[#47CCD0]`;
 };

 const hrClass = `border-t transition-colors ${
 isDark ? 'border-white/10' :
 isLight ? 'border-gray-100' :
 'border-gray-100 dark:border-white/10'
 }`;

 return (
 <div className={wrapperClass}>
 <div className="relative z-10 space-y-6">
 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
 <div>
 <h2 className={`text-2xl mb-2 ${textPrimaryClass}`}>{t('settings.pageTitle')}</h2>
 <p className={textSecondaryClass}>{t('settings.pageSubtitle')}</p>
 </div>
 <button
 onClick={handleSave}
 className="flex items-center gap-2 bg-[#47CCD0] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#3bbabb] transition-all shadow-[0_4px_15px_rgba(71,204,208,0.4)] font-['Noto_Kufi_Arabic'] whitespace-nowrap"
 >
 {isSaved ? <CheckCircle2 size={18} /> : <Save size={18} />}
 {isSaved ? t('settings.savedSuccess') : t('settings.saveChanges')}
 </button>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

 {/* Settings Navigation */}
 <div className="md:col-span-3 space-y-2">
 {[
 { id: 'profile', icon: User, label: t('settings.tabs.profile') },
 { id: 'security', icon: Lock, label: t('settings.tabs.security') },
 { id: 'notifications', icon: Bell, label: t('settings.tabs.notifications') },
 { id: 'preferences', icon: Globe, label: t('settings.tabs.preferences') }
 ].map((tab) => (
 <button
 key={tab.id}
 onClick={() => setActiveTab(tab.id)}
 className={sidebarBtnClass(activeTab === tab.id)}
 >
 <tab.icon size={18} className={activeTab === tab.id ? 'text-[#47CCD0]' : ''} />
 {tab.label}
 </button>
 ))}
 </div>

 {/* Settings Content */}
 <div className="md:col-span-9">

 {/* Profile Settings */}
 {activeTab === 'profile' && (
 <div className={cardClass}>

 {/* Section 1: Nafath Official Data (Read-Only) */}
 <div className={`p-6 md:p-8 rounded-2xl relative border ${isDark ? 'bg-[#1A2531]/50 border-white/10' : isLight ? 'bg-[#f7f8f9] border-gray-100' : 'bg-[#f7f8f9] dark:bg-[#1A2531]/50 border-gray-100 dark:border-white/10'}`}>
 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
 <h3 className={`text-xl font-bold flex items-center gap-3 ${textPrimaryClass}`}>
 <Shield size={24} className="text-[#47CCD0]" />
 {t('settings.profile.nafathTitle')}
 </h3>
 <div className="flex items-center gap-2 bg-[#47CCD0]/10 text-[#47CCD0] px-4 py-2 rounded-full text-sm font-bold border border-[#47CCD0]/20">
 <CheckCircle2 size={18} />
 {t('settings.profile.verifiedViaNafath')}
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
 <div className="space-y-2 lg:col-span-2">
 <label className={`block text-xs font-bold ${textSecondaryClass}`}>{t('settings.profile.fullNameLabel')}</label>
 <div className={`text-base font-bold ${textPrimaryClass}`}>{t('settings.profile.fullNameAr')}</div>
 <div className={`text-sm font-mono uppercase opacity-70 ${textPrimaryClass}`}>Faisal Mohammed Rashed Alqahtani</div>
 </div>
 <div className="space-y-2">
 <label className={`block text-xs font-bold ${textSecondaryClass}`}>{t('settings.profile.idNumber')}</label>
 <div className={`text-base font-bold font-mono ${textPrimaryClass}`} dir="ltr">1055733XXX</div>
 </div>
 <div className="space-y-2">
 <label className={`block text-xs font-bold ${textSecondaryClass}`}>{t('settings.profile.dateOfBirth')}</label>
 <div className={`text-base font-bold font-mono ${textPrimaryClass}`} dir="ltr">09/07/1988</div>
 </div>
 <div className="space-y-2 lg:col-span-2">
 <label className={`block text-xs font-bold ${textSecondaryClass}`}>{t('settings.profile.membershipNumber')}</label>
 <div className={`flex items-center gap-3 text-base font-bold font-mono bg-white dark:bg-[#2B3D50] w-fit px-4 py-2 rounded-xl border ${isDark ? 'border-white/10' : 'border-gray-200'} ${textPrimaryClass}`} dir="ltr">
 MZ-99042
 <button className="text-[#47CCD0] hover:bg-[#47CCD0]/10 p-1.5 rounded-lg transition-colors" title={t('settings.profile.copyTitle')}>
 <Copy size={16} />
 </button>
 </div>
 </div>
 </div>
 </div>

 <hr className={hrClass} />

 {/* Section 2: Mzadat User Customization (Editable) */}
 <div>
 <h3 className={`text-xl font-bold mb-6 flex items-center gap-3 ${textPrimaryClass}`}>
 <User size={24} className="text-[#47CCD0]" />
 {t('settings.profile.personalPreferences')}
 </h3>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 {/* Nickname */}
 <div className="space-y-3 md:col-span-2 max-w-2xl">
 <label className={`text-sm font-bold flex items-center gap-2 ${textPrimaryClass}`}>
 {t('settings.profile.nickname')}
 <span className="text-xs font-normal opacity-60 text-gray-500">{t('settings.profile.nicknameHint')}</span>
 </label>
 <input type="text" placeholder={t('settings.profile.nicknamePlaceholder')} className={inputClass} />
 </div>

 {/* Email */}
 <div className="space-y-3 md:col-span-2 max-w-2xl">
 <label className={`text-sm font-bold ${textPrimaryClass}`}>{t('settings.profile.emailLabel')}</label>
 <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-3">
 <div className="relative w-full sm:flex-1">
 <input type="email" placeholder="name@company.com" className={`${inputClass} !ps-10 !pe-4 text-start ${emailVerified ? 'opacity-80 pointer-events-none' : ''}`} dir="ltr" disabled={emailVerified} />
 <Mail size={18} className={inputIconClass} />
 </div>
 {!emailVerified && (
 <button
 onClick={() => handleOpenOtpModal('email')}
 className="w-full sm:w-auto bg-[#47CCD0] text-white px-8 py-3.5 rounded-full text-base font-bold hover:bg-[#3bbabb] transition-all whitespace-nowrap shadow-sm flex items-center justify-center gap-2.5"
 >
 <CheckCircle2 size={20} className="stroke-2" />
 {t('settings.profile.verifyNow')}
 </button>
 )}
 </div>
 {emailVerified ? (
 <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold mt-1">
 <CheckCircle2 size={14} />
 {t('settings.profile.emailVerified')}
 </div>
 ) : (
 <div className="flex items-center gap-2 text-red-500 text-xs font-bold mt-1">
 <AlertCircle size={14} />
 {t('settings.profile.emailNotVerified')}
 </div>
 )}
 </div>

 {/* Mobile */}
 <div className="space-y-3 md:col-span-2 max-w-2xl">
 <label className={`text-sm font-bold ${textPrimaryClass}`}>{t('settings.profile.phoneLabel')}</label>
 <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-3">
 <div className="relative w-full sm:flex-1">
 <PhoneInput
 defaultValue="50 123 4567"
 containerClassName={`${inputClass} !p-0 !border-0 overflow-visible rounded-xl ${phoneVerified ? 'opacity-80 pointer-events-none' : ''} ${
 isDark ? 'bg-[#1A2531]/50 border-white/5' :
 isLight ? 'bg-white border-gray-200' :
 'bg-white dark:bg-[#1A2531]/50 border-gray-200 dark:border-white/5'
 } border`}
 className={`h-12 bg-transparent outline-none rounded-xl text-start w-full ${
 isDark ? 'text-white' :
 isLight ? 'text-gray-900' :
 'text-gray-900 dark:text-white'
 }`}
 disabled={phoneVerified}
 />
 {phoneVerified && (
 <div className="absolute start-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-md text-xs font-bold">
 <CheckCircle2 size={12} />
 {t('settings.profile.verifiedOtp')}
 </div>
 )}
 </div>
 {!phoneVerified && (
 <button
 onClick={() => handleOpenOtpModal('phone')}
 className="w-full sm:w-auto bg-[#47CCD0] text-white px-8 py-3.5 rounded-full text-base font-bold hover:bg-[#3bbabb] transition-all whitespace-nowrap shadow-sm flex items-center justify-center gap-2.5"
 >
 <CheckCircle2 size={20} className="stroke-2" />
 {t('settings.profile.verifyNow')}
 </button>
 )}
 </div>
 {phoneVerified ? (
 <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold mt-1">
 <CheckCircle2 size={14} />
 {t('settings.profile.phoneVerified')}
 </div>
 ) : (
 <div className="flex items-center gap-2 text-red-500 text-xs font-bold mt-1">
 <AlertCircle size={14} />
 {t('settings.profile.phoneNotVerified')}
 </div>
 )}
 </div>
 </div>
 </div>

 </div>
 )}

 {/* Security Settings */}
 {activeTab === 'security' && (
 <div className={cardClass}>
 <div>
 <h3 className={`text-lg mb-6 flex items-center gap-2 ${textPrimaryClass}`}>
 <Key size={20} className="text-[#47CCD0]" />
 {t('settings.security.changePassword')}
 </h3>
 <div className="space-y-4 max-w-md">
 <div className="space-y-2">
 <label className={`text-sm ${textPrimaryClass}`}>{t('settings.security.currentPassword')}</label>
 <input type="password" placeholder="••••••••" className={inputClass} />
 </div>
 <div className="space-y-2">
 <label className={`text-sm ${textPrimaryClass}`}>{t('settings.security.newPassword')}</label>
 <input type="password" placeholder="••••••••" className={inputClass} />
 </div>
 <div className="space-y-2">
 <label className={`text-sm ${textPrimaryClass}`}>{t('settings.security.confirmNewPassword')}</label>
 <input type="password" placeholder="••••••••" className={inputClass} />
 </div>
 </div>
 </div>

 <hr className={hrClass} />

 <div>
 <h3 className={`text-lg mb-6 flex items-center gap-2 ${textPrimaryClass}`}>
 <Shield size={20} className="text-[#47CCD0]" />
 {t('settings.security.twoFactorTitle')}
 </h3>
 <div className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${isDark ? 'bg-[#2B3D50] border-white/10' : isLight ? 'bg-gray-50 border-gray-100' : 'bg-gray-50 dark:bg-[#2B3D50] border-gray-100 dark:border-white/10'}`}>
 <div>
 <p className={textPrimaryClass}>{t('settings.security.enable2fa')}</p>
 <p className={textSecondaryClass}>{t('settings.security.enable2faDesc')}</p>
 </div>
 <label className="relative inline-flex items-center cursor-pointer">
 <input type="checkbox" value="" className="sr-only peer" />
 <div className={`w-11 h-6 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#47CCD0] ${isDark ? 'bg-[#1A2531]' : isLight ? 'bg-gray-200' : 'bg-gray-200 dark:bg-[#1A2531]'}`}></div>
 </label>
 </div>
 </div>
 </div>
 )}

 {/* Notifications Settings */}
 {activeTab === 'notifications' && (
 <div className={cardClass}>
 <h3 className={`text-lg mb-6 flex items-center gap-2 ${textPrimaryClass}`}>
 <Bell size={20} className="text-[#47CCD0]" />
 {t('settings.notifications.title')}
 </h3>

 <div className="space-y-4">
 {[
 { titleKey: 'settings.notifications.auctionAlerts', descKey: 'settings.notifications.auctionAlertsDesc', defaultChecked: true },
 { titleKey: 'settings.notifications.bidsOffers', descKey: 'settings.notifications.bidsOffersDesc', defaultChecked: true },
 { titleKey: 'settings.notifications.systemUpdates', descKey: 'settings.notifications.systemUpdatesDesc', defaultChecked: false },
 { titleKey: 'settings.notifications.promotions', descKey: 'settings.notifications.promotionsDesc', defaultChecked: false },
 ].map((item, index) => (
 <div key={index} className={`flex items-center justify-between py-4 border-b last:border-0 ${isDark ? 'border-white/10' : isLight ? 'border-gray-100' : 'border-gray-100 dark:border-white/10'}`}>
 <div>
 <p className={textPrimaryClass}>{t(item.titleKey)}</p>
 <p className={textSecondaryClass}>{t(item.descKey)}</p>
 </div>
 <label className="relative inline-flex items-center cursor-pointer">
 <input type="checkbox" defaultChecked={item.defaultChecked} className="sr-only peer" />
 <div className={`w-11 h-6 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#47CCD0] ${isDark ? 'bg-[#1A2531]' : isLight ? 'bg-gray-200' : 'bg-gray-200 dark:bg-[#1A2531]'}`}></div>
 </label>
 </div>
 ))}
 </div>
 </div>
 )}

 {/* Preferences Settings */}
 {activeTab === 'preferences' && (
 <div className={cardClass}>
 <h3 className={`text-lg mb-6 flex items-center gap-2 ${textPrimaryClass}`}>
 <Globe size={20} className="text-[#47CCD0]" />
 {t('settings.preferences.displayTitle')}
 </h3>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 <div className="space-y-3">
 <label className={`text-sm ${textPrimaryClass}`}>{t('settings.preferences.interfaceLanguage')}</label>
 <div className="relative">
 <select className={`${inputClass} appearance-none`}>
 <option value="ar">{t('settings.preferences.arabic')}</option>
 <option value="en">{t('settings.preferences.english')}</option>
 </select>
 <div className={inputIconClass}>▼</div>
 </div>
 </div>

 <div className="space-y-3">
 <label className={`text-sm ${textPrimaryClass}`}>{t('settings.preferences.timezone')}</label>
 <div className="relative">
 <select className={`${inputClass} appearance-none`}>
 <option value="ast">{t('settings.preferences.timezoneSaudi')}</option>
 <option value="gmt">{t('settings.preferences.timezoneGmt')}</option>
 </select>
 <div className={inputIconClass}>▼</div>
 </div>
 </div>
 </div>

 <hr className={hrClass} />

 <div>
 <h3 className={`text-lg mb-6 flex items-center gap-2 ${textPrimaryClass}`}>
 <Palette size={20} className="text-[#47CCD0]" />
 {t('settings.preferences.appearance')}
 </h3>
 <p className={`text-sm mb-6 ${textSecondaryClass}`}>{t('settings.preferences.previewNote')}</p>

 <div className="space-y-8">
 {/* Theme Selection */}
 <div className="space-y-3">
 <label className={`text-sm font-bold ${textPrimaryClass}`}>{t('settings.preferences.themeMode')}</label>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
 <button
 onClick={() => setTheme('system')}
 className={`flex flex-col items-center justify-center p-6 border-2 rounded-xl gap-3 transition-all ${
 theme === 'system'
 ? 'border-[#47CCD0] bg-[#47CCD0]/5 dark:bg-[#47CCD0]/10 text-[#47CCD0]'
 : isDark ? 'border-white/10 bg-[#2B3D50] hover:border-[#47CCD0]/50 text-white/60' : isLight ? 'border-gray-200 bg-gray-50 hover:border-[#47CCD0]/50 text-gray-500' : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#2B3D50] hover:border-[#47CCD0]/50 text-gray-500 dark:text-white/60'
 }`}
 >
 <Monitor size={24} className={theme === 'system' ? 'text-[#47CCD0]' : ''} />
 <span className="font-bold font-['Noto_Kufi_Arabic']">{t('settings.preferences.themeSystem')}</span>
 </button>

 <button
 onClick={() => setTheme('dark')}
 className={`flex flex-col items-center justify-center p-6 border-2 rounded-xl gap-3 transition-all ${
 theme === 'dark'
 ? 'border-[#47CCD0] bg-[#47CCD0]/10 text-[#47CCD0]'
 : isDark ? 'border-white/10 bg-[#2B3D50] hover:border-[#47CCD0]/50 text-white/60' : isLight ? 'border-gray-200 bg-gray-50 hover:border-[#47CCD0]/50 text-gray-500' : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#2B3D50] hover:border-[#47CCD0]/50 text-gray-500 dark:text-white/60'
 }`}
 >
 <Moon size={24} className={theme === 'dark' ? 'text-[#47CCD0]' : ''} />
 <span className="font-bold font-['Noto_Kufi_Arabic']">{t('settings.preferences.themeDark')}</span>
 </button>

 <button
 onClick={() => setTheme('light')}
 className={`flex flex-col items-center justify-center p-6 border-2 rounded-xl gap-3 transition-all ${
 theme === 'light'
 ? 'border-[#47CCD0] bg-[#47CCD0]/5 text-[#47CCD0]'
 : isDark ? 'border-white/10 bg-[#2B3D50] hover:border-[#47CCD0]/50 text-white/60' : isLight ? 'border-gray-200 bg-gray-50 hover:border-[#47CCD0]/50 text-gray-500' : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#2B3D50] hover:border-[#47CCD0]/50 text-gray-500 dark:text-white/60'
 }`}
 >
 <div className="relative">
 {theme === 'light' && <CheckCircle2 size={16} className="absolute -top-2 -end-6 text-[#47CCD0]" />}
 <Sun size={24} className={theme === 'light' ? 'text-[#47CCD0]' : ''} />
 </div>
 <span className="font-bold font-['Noto_Kufi_Arabic']">{t('settings.preferences.themeLight')}</span>
 </button>
 </div>
 </div>

 {/* Primary Color Selection */}
 <div className="space-y-3">
 <label className={`text-sm font-bold flex ${textPrimaryClass}`}>{t('settings.preferences.primaryColor')}</label>
 <div className="flex flex-wrap items-center gap-3">
 {colors.map((color) => (
 <button
 key={color}
 onClick={() => setPrimaryColor(color)}
 className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
 primaryColor === color ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-[#364a5f] scale-110' : 'hover:scale-105'
 }`}
 style={{ backgroundColor: color, '--tw-ring-color': color } as React.CSSProperties}
 >
 {primaryColor === color && <CheckCircle2 size={20} className="text-white" />}
 </button>
 ))}
 </div>
 </div>

 {/* Font Size Selection */}
 <div className="space-y-3">
 <label className={`text-sm font-bold flex ${textPrimaryClass}`}>{t('settings.preferences.fontSize')}</label>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
 <button
 onClick={() => setFontSize('large')}
 className={`flex flex-col items-center justify-center p-6 border-2 rounded-xl gap-2 transition-all ${
 fontSize === 'large'
 ? 'border-[#47CCD0] bg-[#47CCD0]/5 text-[#47CCD0]'
 : isDark ? 'border-white/10 bg-[#2B3D50] hover:border-[#47CCD0]/50 text-white/60' : isLight ? 'border-gray-200 bg-gray-50 hover:border-[#47CCD0]/50 text-gray-500' : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#2B3D50] hover:border-[#47CCD0]/50 text-gray-500 dark:text-white/60'
 }`}
 >
 <span className="text-xl font-bold font-sans">Aa</span>
 <span className="font-bold font-['Noto_Kufi_Arabic'] text-sm">{t('settings.preferences.fontLarge')}</span>
 </button>

 <button
 onClick={() => setFontSize('medium')}
 className={`flex flex-col items-center justify-center p-6 border-2 rounded-xl gap-2 transition-all ${
 fontSize === 'medium'
 ? 'border-[#47CCD0] bg-[#47CCD0]/5 text-[#47CCD0]'
 : isDark ? 'border-white/10 bg-[#2B3D50] hover:border-[#47CCD0]/50 text-white/60' : isLight ? 'border-gray-200 bg-gray-50 hover:border-[#47CCD0]/50 text-gray-500' : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#2B3D50] hover:border-[#47CCD0]/50 text-gray-500 dark:text-white/60'
 }`}
 >
 <span className="text-base font-bold font-sans">Aa</span>
 <span className="font-bold font-['Noto_Kufi_Arabic'] text-sm">{t('settings.preferences.fontMedium')}</span>
 </button>

 <button
 onClick={() => setFontSize('small')}
 className={`flex flex-col items-center justify-center p-6 border-2 rounded-xl gap-2 transition-all ${
 fontSize === 'small'
 ? 'border-[#47CCD0] bg-[#47CCD0]/5 text-[#47CCD0]'
 : isDark ? 'border-white/10 bg-[#2B3D50] hover:border-[#47CCD0]/50 text-white/60' : isLight ? 'border-gray-200 bg-gray-50 hover:border-[#47CCD0]/50 text-gray-500' : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#2B3D50] hover:border-[#47CCD0]/50 text-gray-500 dark:text-white/60'
 }`}
 >
 <span className="text-sm font-bold font-sans">Aa</span>
 <span className="font-bold font-['Noto_Kufi_Arabic'] text-sm">{t('settings.preferences.fontSmall')}</span>
 </button>
 </div>
 </div>
 </div>
 </div>
 </div>
 )}
 </div>
 </div>
 </div>

 {/* OTP Verification Modal */}
 {showOtpModal && (
 <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
 <div className={`w-full max-w-md rounded-2xl p-6 shadow-xl animate-in zoom-in-95 duration-200 ${
 isDark ? 'bg-[#2B3D50] text-white border border-white/10' :
 isLight ? 'bg-white text-[#2B3D50]' :
 'bg-white dark:bg-[#2B3D50] text-[#2B3D50] dark:text-white'
 }`}>
 <div className="text-center space-y-4">
 <div className="w-16 h-16 bg-[#47CCD0]/10 rounded-full flex items-center justify-center mx-auto mb-2">
 <Shield size={32} className="text-[#47CCD0]" />
 </div>
 <h3 className="text-xl font-bold">
 {otpTarget === 'email' ? t('settings.otp.emailTitle') : t('settings.otp.phoneTitle')}
 </h3>
 <p className={`text-sm ${
 isDark ? 'text-white/70' :
 isLight ? 'text-gray-500' :
 'text-gray-500 dark:text-white/70'
 }`}>
 {otpTarget === 'email'
 ? t('settings.otp.emailDesc')
 : t('settings.otp.phoneDesc')}
 </p>

 <div className="flex justify-center gap-3 my-8" dir="ltr">
 {otpValue.map((digit, index) => (
 <input
 key={index}
 id={`otp-input-${index}`}
 type="text"
 maxLength={1}
 value={digit}
 onChange={(e) => {
 const val = e.target.value;
 if (!/^[0-9]*$/.test(val)) return;
 const newOtp = [...otpValue];
 newOtp[index] = val;
 setOtpValue(newOtp);
 if (val && index < 3) {
 document.getElementById(`otp-input-${index + 1}`)?.focus();
 }
 }}
 onKeyDown={(e) => {
 if (e.key === 'Backspace' && !digit && index > 0) {
 document.getElementById(`otp-input-${index - 1}`)?.focus();
 }
 }}
 className={`w-14 h-14 text-center text-2xl font-bold rounded-xl border-2 outline-none transition-all ${
 digit ? 'border-[#47CCD0]' : 'focus:border-[#47CCD0]/50'
 } ${
 isDark ? 'bg-[#1A2531] text-white border-white/10' :
 isLight ? 'bg-gray-50 text-[#2B3D50] border-gray-200' :
 'bg-gray-50 dark:bg-[#1A2531] text-[#2B3D50] dark:text-white border-gray-200 dark:border-white/10'
 }`}
 />
 ))}
 </div>

 <div className="flex gap-3 pt-4">
 <button
 onClick={() => setShowOtpModal(false)}
 className={`flex-1 py-3.5 rounded-xl font-bold transition-colors ${
 isDark ? 'bg-white/10 hover:bg-white/20 text-white' :
 isLight ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' :
 'bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-700 dark:text-white'
 }`}
 >
 {t('settings.otp.cancel')}
 </button>
 <button
 onClick={handleVerifyOtpSubmit}
 disabled={isVerifyingOtp || otpValue.some(d => !d)}
 className="flex-1 bg-[#47CCD0] text-white py-3.5 rounded-xl font-bold hover:bg-[#3bbabb] transition-all disabled:opacity-50 flex justify-center items-center gap-2"
 >
 {isVerifyingOtp ? (
 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
 ) : (
 t('settings.otp.confirm')
 )}
 </button>
 </div>

 <div className="mt-6 text-sm">
 <span className={isDark ? 'text-white/60' : 'text-gray-500'}>{t('settings.otp.noCode')} </span>
 <button className="text-[#47CCD0] font-bold hover:underline">{t('settings.otp.resend')}</button>
 </div>
 </div>
 </div>
 </div>
 )}
 </div>
 );
};
