import React from 'react';
import logoImage from 'figma:asset/70a549db43a3294ca041bd716e8022066cbe43be.png';
import falImage from 'figma:asset/196b4e239f5eb25ae700c088f021bfb6c7561d83.png';
import brokerageLicenseImage from 'figma:asset/196b4e239f5eb25ae700c088f021bfb6c7561d83.png';
import saipImage from 'figma:asset/a763854baca7616bc0338428ebeeacbc83280940.png';
import licensesImage from 'figma:asset/85b8dec9b4a9023ca72458d8b97402e13e1828fd.png';
import platformLicensesImage from 'figma:asset/82aec4d130a2649c02d499e6ea0935bdeb3cf24e.png';
import saudiTechLogo from 'figma:asset/4dfb281d34ccbfa87e9e0e8ec18fe47982500deb.png';
import {  
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Globe, 
  Phone, 
  MessageCircle,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { XIcon } from '../icons/XIcon';
import { SnapchatIcon } from '../icons/SnapchatIcon';
import { TrustIndicators } from '../compliance/TrustIndicators';

import { useTranslation } from 'react-i18next';
export const Footer = ({ onNavigate }: { onNavigate?: (page: string) => void }) => {
  const { t } = useTranslation();
  const handleLinkClick = (link: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (!onNavigate) return;
    
    if (link === t('footer.home')) onNavigate('home');
    if (link === t('footer.publicAuctions')) onNavigate('auctions');
    if (link === t('footer.faq')) onNavigate('faq');
    if (link === t('footer.privacyPolicy')) onNavigate('privacy-policy');
    if (link === t('footer.termsConditions')) onNavigate('terms');
    if (link === t('footer.contactUs')) onNavigate('support');
    if (link === t('footer.reportVulnerability')) onNavigate('report-vulnerability');
    if (link === t('footer.aboutMzadat')) onNavigate('about');
    if (link === t('footer.suggestions')) onNavigate('suggestions');
    if (link === t('footer.adminPanel')) onNavigate('admin');
    // Add other links mappings as needed
  };

  return (
    <footer className="pt-8 pb-10 text-white bg-[#2B3D50]">
       <div className="w-full max-w-[1440px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-16">
             <div className="lg:col-span-4">
                <div 
                  className="flex items-center gap-2 mb-6 cursor-pointer hover:scale-105 transition-transform"
                  onClick={(e) => handleLinkClick(t('footer.home'), e)}
                >
                  {/* Using a brightness filter to ensure logo is visible on dark background if it's black text */}
                  <img src={logoImage} alt="Mzadat Logo" className="h-24 w-auto object-contain" />
                </div>
                <p className="text-gray-300 text-sm mb-6">
                  {t('footer.slogan')}
                </p>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-black hover:text-white transition-all cursor-pointer">
                    <XIcon size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-[#E1306C] hover:text-white transition-all cursor-pointer">
                    <Instagram size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-[#1877F2] hover:text-white transition-all cursor-pointer">
                    <Facebook size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-[#FFFC00] hover:text-black transition-all cursor-pointer">
                    <SnapchatIcon size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-[#0A66C2] hover:text-white transition-all cursor-pointer">
                    <Linkedin size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-[#FF0000] hover:text-white transition-all cursor-pointer">
                    <Youtube size={18} />
                  </a>
                </div>
             </div>
             
             <div className="lg:col-span-2">
               <h4 className="text-white mb-6 text-lg font-bold">{t('footer.quickAccess')}</h4>
               <ul className="space-y-4 text-sm text-gray-300">
                 {[t('footer.home'), t('footer.publicAuctions'), t('footer.realEstateBrokerage'), t('footer.addNewAd')].map(link => (
                   <li 
                     key={link} 
                     onClick={(e) => handleLinkClick(link, e)}
                     className="hover:text-[#47CCD0] hover:-translate-x-1 rtl:hover:translate-x-1 rtl:hover:-translate-x-0 transition-all cursor-pointer block w-fit"
                   >
                     {link}
                   </li>
                 ))}
               </ul>
             </div>

             <div className="lg:col-span-2">
               <h4 className="text-white mb-6 text-lg font-bold">{t('footer.supportHelp')}</h4>
               <ul className="space-y-4 text-sm text-gray-300">
                 {[t('footer.faq'), t('footer.privacyPolicy'), t('footer.termsConditions'), t('footer.contactUs')].map(link => (
                   <li
                    key={link}
                    onClick={(e) => handleLinkClick(link, e)}
                    className="hover:text-[#47CCD0] hover:-translate-x-1 rtl:hover:translate-x-1 rtl:hover:-translate-x-0 transition-all cursor-pointer block w-fit"
                   >
                    {link}
                   </li>
                 ))}
               </ul>
             </div>

             <div className="lg:col-span-2">
               <h4 className="text-white mb-6 text-lg font-bold">{t('footer.aboutPlatform')}</h4>
               <ul className="space-y-4 text-sm text-gray-300">
                 {[t('footer.aboutMzadat'), t('footer.platformRating'), t('footer.suggestions'), t('footer.reportVulnerability')].map(link => (
                   <li
                    key={link}
                    onClick={(e) => handleLinkClick(link, e)}
                    className="hover:text-[#47CCD0] hover:-translate-x-1 rtl:hover:translate-x-1 rtl:hover:-translate-x-0 transition-all cursor-pointer block w-fit"
                   >
                    {link}
                   </li>
                 ))}
               </ul>
             </div>

             <div className="lg:col-span-2 text-center lg:text-end">
               <h4 className="text-white mb-6 text-lg font-bold text-center">{t('footer.licenses')}</h4>
               <a href="https://drive.google.com/file/d/1phIczxTTKuAja4kwu3Er3NlZwCtsodES/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="block hover:opacity-80 transition-opacity mb-4">
                 <img src={platformLicensesImage} alt={t('footer.licenses')} className="w-full h-auto object-contain rounded-lg bg-white p-1" />
               </a>

               <h4 className="text-white mt-8 mb-4 text-sm font-bold text-center">{t('footer.trustedBy')}</h4>
               <div className="flex flex-wrap justify-center gap-3">
                  <div className="bg-white/10 px-3 py-2 rounded-lg flex items-center gap-2 border border-white/20">
                    <ShieldCheck size={16} className="text-green-400" />
                    <span className="text-xs font-bold">{t('footer.nafath')}</span>
                  </div>
                  <div className="bg-white/10 px-3 py-2 rounded-lg flex items-center gap-2 border border-white/20">
                    <CreditCard size={16} className="text-blue-400" />
                    <span className="text-xs font-bold">{t('footer.sadad')}</span>
                  </div>
                  <div className="bg-white px-3 py-1 rounded-lg flex items-center justify-center border border-white/20">
                    <img src={saudiTechLogo} alt={t('footer.saudiTech')} className="h-6 object-contain" />
                  </div>
               </div>
             </div>
          </div>
          
          <TrustIndicators />
          
          <div className="border-t border-white/10 pt-8 flex flex-col items-center gap-6">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-sm text-gray-300">
               <button onClick={() => onNavigate && onNavigate('terms')} className="hover:text-[#47CCD0] transition-colors">{t('footer.termsAndDisclaimer')}</button>
               <span className="text-gray-600">|</span>
               <button onClick={() => onNavigate && onNavigate('privacy-policy')} className="hover:text-[#47CCD0] transition-colors">{t('footer.privacyAndConfidentiality')}</button>
               <span className="text-gray-600">|</span>
               <button onClick={() => onNavigate && onNavigate('terms')} className="hover:text-[#47CCD0] transition-colors">{t('footer.refundPolicy')}</button>
            </div>

            <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-xs md:text-sm text-gray-400">
               <span className="hover:text-[#47CCD0] cursor-pointer transition-colors">{t('footer.taxDeclaration')}</span>
               <span className="text-gray-600">|</span>
               <span className="hover:text-[#47CCD0] cursor-pointer transition-colors">{t('footer.commercialRegister')}</span>
               <span className="text-gray-600">|</span>
               <span className="hover:text-[#47CCD0] cursor-pointer transition-colors">{t('footer.zakatAndCustoms')}</span>
            </div>

            <p className="text-xs text-gray-500 mt-2">{t('footer.rights')} {t('footer.companyInfo')}</p>
          </div>
       </div>
    </footer>
  );
};
