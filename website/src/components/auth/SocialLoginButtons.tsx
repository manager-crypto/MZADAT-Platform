import React from 'react';
import { ScanFace, Fingerprint } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import biometricIcon from 'figma:asset/7ec520aca8d5b18f2ead46d4a1303989432c60ff.png';

interface SocialLoginButtonsProps {
 onNafathLogin: () => void;
 onBiometricLogin: () => void;
}

export const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({ onNafathLogin, onBiometricLogin }) => {
 const { t } = useTranslation();

 return (
 <div className="flex flex-col gap-3 w-full mt-6">

 <div className="relative flex py-2 items-center">
 <div className="flex-grow border-t border-gray-100"></div>
 <span className="flex-shrink-0 mx-4 text-gray-400 text-sm font-bold">{t('loginModal.or')}</span>
 <div className="flex-grow border-t border-gray-100"></div>
 </div>

 {/* Biometric Button */}
 <button
 type="button"
 onClick={onBiometricLogin}
 className="w-full h-14 bg-white border-2 border-gray-100 text-[#2B3D50] rounded-lg font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-3 group"
 >
 <img
 src={biometricIcon}
 alt="Face ID / Fingerprint"
 className="w-6 h-6 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
 onError={(e) => {
 e.currentTarget.style.display = 'none';
 const nextEl = e.currentTarget.nextElementSibling;
 if (nextEl) {
 nextEl.classList.remove('hidden');
 nextEl.classList.add('flex');
 }
 }}
 />
 <div className="hidden items-center gap-2 text-gray-400 group-hover:text-[#47CCD0] transition-colors">
 <ScanFace size={24} />
 <Fingerprint size={24} />
 </div>
 <span>{t('biometric.title')}</span>
 </button>

 {/* Nafath Login Button */}
 <button
 type="button"
 onClick={onNafathLogin}
 className="w-full h-14 bg-[#149B61] text-white rounded-lg font-bold hover:bg-[#118452] transition-all shadow-md flex items-center justify-center gap-3 group"
 >
 <span className="text-xl font-black tracking-tight group-hover:scale-105 transition-transform">
 {t('loginModal.nafathBrand', 'نفاذ')}
 </span>
 <span>{t('loginModal.loginViaNafathFull')}</span>
 </button>

 <div className="flex justify-center gap-6 pt-6 text-sm text-[#2B3D50] font-bold opacity-70">
 <button type="button" className="hover:opacity-100 hover:text-[#47CCD0] transition-colors">
 {t('loginModal.privacy')}
 </button>
 <button type="button" className="hover:opacity-100 hover:text-[#47CCD0] transition-colors">
 {t('loginModal.terms')}
 </button>
 </div>

 </div>
 );
};
