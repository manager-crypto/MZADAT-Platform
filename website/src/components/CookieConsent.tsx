import React, { useState, useEffect } from 'react';
import { X, Cookie, Shield, BarChart3, Megaphone } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogFooter,
 DialogHeader,
 DialogTitle,
} from "./ui/dialog";
import { useTranslation } from 'react-i18next';

export const CookieConsent = () => {
 const { t } = useTranslation();
 const [isVisible, setIsVisible] = useState(false);
 const [showSettings, setShowSettings] = useState(false);

 const [preferences, setPreferences] = useState({
 essential: true,
 analytics: true,
 marketing: false,
 });

 useEffect(() => {
 const consent = localStorage.getItem('cookie-consent');
 if (!consent) {
 const timer = setTimeout(() => setIsVisible(true), 1500);
 return () => clearTimeout(timer);
 }
 }, []);

 const handleAcceptAll = () => {
 localStorage.setItem('cookie-consent', 'all');
 setPreferences({ essential: true, analytics: true, marketing: true });
 setIsVisible(false);
 setShowSettings(false);
 };

 const handleSavePreferences = () => {
 localStorage.setItem('cookie-consent', JSON.stringify(preferences));
 setIsVisible(false);
 setShowSettings(false);
 };

 if (!isVisible && !showSettings) return null;

 return (
 <>
 {/* Banner */}
 {isVisible && !showSettings && (
 <div className="fixed bottom-0 start-0 end-0 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)] border-t border-gray-100 z-50 animate-in slide-in-from-bottom-full duration-500">
 <div className="container mx-auto px-4 py-6">
 <div className="flex flex-col md:flex-row items-center justify-between gap-6">
 <div className="flex items-start gap-4 flex-1">
 <div className="bg-teal-50 p-3 rounded-full hidden md:block">
 <Cookie className="text-[#47CCD0] w-6 h-6" />
 </div>
 <div>
 <h3 className="font-bold text-gray-900 mb-1 text-lg">{t('cookieConsent.privacyTitle')}</h3>
 <p className="text-gray-600 text-sm leading-relaxed max-w-2xl">
 {t('cookieConsent.description')}
 </p>
 </div>
 </div>

 <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
 <button
 onClick={() => setShowSettings(true)}
 className="flex-1 md:flex-none px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 hover:border-gray-300 transition-all text-sm min-w-[120px]"
 >
 {t('cookieConsent.settings')}
 </button>

 <button
 onClick={handleAcceptAll}
 className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-[#47CCD0] text-white font-bold hover:bg-[#35a3a8] transition-all shadow-lg shadow-teal-500/20 text-sm min-w-[120px]"
 >
 {t('cookieConsent.acceptAll')}
 </button>
 </div>
 </div>
 </div>
 </div>
 )}

 {/* Settings Modal */}
 <Dialog open={showSettings} onOpenChange={(open) => {
 setShowSettings(open);
 if (!open && !localStorage.getItem('cookie-consent')) {
 setIsVisible(true);
 }
 }}>
 <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white gap-0 rounded-3xl">
 <div className="p-6 border-b border-gray-100">
 <DialogHeader className="text-end">
 <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
 <Cookie className="text-[#47CCD0]" />
 {t('cookieConsent.settingsTitle')}
 </DialogTitle>
 <DialogDescription className="text-gray-500 text-end mt-2">
 {t('cookieConsent.settingsDesc')}
 </DialogDescription>
 </DialogHeader>
 </div>

 <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
 {/* Essential */}
 <div className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
 <div className="space-y-1">
 <div className="flex items-center gap-2">
 <Shield className="w-4 h-4 text-[#47CCD0]" />
 <Label htmlFor="essential" className="text-base font-bold text-gray-900">{t('cookieConsent.essentialTitle')}</Label>
 </div>
 <p className="text-sm text-gray-500 leading-relaxed">
 {t('cookieConsent.essentialDesc')}
 </p>
 </div>
 <Switch id="essential" checked={true} disabled className="mt-1" />
 </div>

 {/* Analytics */}
 <div className="flex items-start justify-between gap-4 p-4 rounded-2xl border border-gray-100 hover:border-[#47CCD0]/30 transition-colors">
 <div className="space-y-1">
 <div className="flex items-center gap-2">
 <BarChart3 className="w-4 h-4 text-gray-500" />
 <Label htmlFor="analytics" className="text-base font-bold text-gray-900 cursor-pointer">{t('cookieConsent.analyticsTitle')}</Label>
 </div>
 <p className="text-sm text-gray-500 leading-relaxed">
 {t('cookieConsent.analyticsDesc')}
 </p>
 </div>
 <Switch
 id="analytics"
 checked={preferences.analytics}
 onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, analytics: checked }))}
 className="mt-1 data-[state=checked]:bg-[#47CCD0]"
 />
 </div>

 {/* Marketing */}
 <div className="flex items-start justify-between gap-4 p-4 rounded-2xl border border-gray-100 hover:border-[#47CCD0]/30 transition-colors">
 <div className="space-y-1">
 <div className="flex items-center gap-2">
 <Megaphone className="w-4 h-4 text-gray-500" />
 <Label htmlFor="marketing" className="text-base font-bold text-gray-900 cursor-pointer">{t('cookieConsent.marketingTitle')}</Label>
 </div>
 <p className="text-sm text-gray-500 leading-relaxed">
 {t('cookieConsent.marketingDesc')}
 </p>
 </div>
 <Switch
 id="marketing"
 checked={preferences.marketing}
 onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, marketing: checked }))}
 className="mt-1 data-[state=checked]:bg-[#47CCD0]"
 />
 </div>
 </div>

 <DialogFooter className="p-6 border-t border-gray-100 bg-gray-50/50 flex-row gap-3 sm:justify-start">
 <button
 onClick={handleSavePreferences}
 className="flex-1 sm:flex-none px-8 py-3 rounded-xl bg-[#47CCD0] text-white font-bold hover:bg-[#35a3a8] transition-all shadow-lg shadow-teal-500/20 text-sm"
 >
 {t('cookieConsent.savePreferences')}
 </button>
 <button
 onClick={() => {
 setShowSettings(false);
 setIsVisible(true);
 }}
 className="flex-1 sm:flex-none px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-white hover:border-gray-300 transition-all text-sm"
 >
 {t('cookieConsent.cancel')}
 </button>
 </DialogFooter>
 </DialogContent>
 </Dialog>
 </>
 );
};
