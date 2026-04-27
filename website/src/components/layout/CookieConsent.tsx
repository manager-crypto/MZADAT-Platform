import React, { useState, useEffect } from 'react';
import { Cookie, Shield, BarChart3, Megaphone } from 'lucide-react';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
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
    // Check if user has already consented
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show after a small delay for better UX
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
        <div className="fixed bottom-0 start-0 end-0 z-[9999] p-4 md:p-6 animate-fade-up">
          <div className="container mx-auto max-w-7xl">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-6 md:gap-12 relative overflow-hidden">
              
              {/* Content */}
              <div className="flex-1 text-center md:text-end relative z-10 flex items-start gap-4">
                <div className="bg-teal-50 p-3 rounded-full hidden md:block shrink-0">
                  <Cookie className="text-[#47CCD0] w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{t('cookieConsent.title')}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed max-w-4xl">
                    {t('cookieConsent.description')}
                    <br className="hidden md:block" />
                    <span className="mt-2 inline-block">{t('cookieConsent.optional')}</span>
                    </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto min-w-[280px] relative z-10">
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 px-8 py-3 bg-[#47CCD0] text-white rounded-xl font-bold hover:bg-[#37a8ad] transition-all shadow-lg shadow-teal-500/20 active:scale-[0.98] whitespace-nowrap"
                >
                  {t('cookieConsent.acceptAll')}
                </button>
                <button
                    onClick={() => setShowSettings(true)}
                    className="flex-1 px-8 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-[0.98] whitespace-nowrap"
                >
                    {t('cookieConsent.settings')}
                </button>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 end-0 w-32 h-32 bg-teal-50/50 rounded-es-full -z-0 pointer-events-none"></div>
              <div className="absolute bottom-0 start-0 w-24 h-24 bg-gray-50/80 rounded-se-full -z-0 pointer-events-none"></div>
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
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white gap-0 rounded-3xl" >
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
                  <Label htmlFor="essential" className="text-base font-bold text-gray-900">{t('cookieConsent.essential')}</Label>
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
                  <Label htmlFor="analytics" className="text-base font-bold text-gray-900 cursor-pointer">{t('cookieConsent.analytics')}</Label>
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
                  <Label htmlFor="marketing" className="text-base font-bold text-gray-900 cursor-pointer">{t('cookieConsent.marketing')}</Label>
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
