import React from 'react';
import alinmaLogo from 'figma:asset/032ebd0b1e20ce78f940c37f8316a8666eddfdb0.png';
import alrajhiLogo from 'figma:asset/6766e301bb76f9934940da4df653a295b62ff7c6.png';
import sakaniLogo from 'figma:asset/c1b5940620d2d64e129eb6497e3264ca40015637.png';
import ehsanLogo from 'figma:asset/216e53b1adeb883d177ec9fedceb8ccb9da16187.png';
import nafathLogo from 'figma:asset/401f48efcdd8f48b6f98cd8cd52477b562e86c50.png';
import regaLogo from 'figma:asset/eb09a48c553046209a2689f7a9a625781130e10d.png';
import ncaLogo from 'figma:asset/648ca36fbbe231cc3bcb193a35f7d0a72718f9e5.png';
import mocLogo from 'figma:asset/d6053f13c5ad46ef7468e5624bf98683c2a60de4.png';
import mnasatLogo from 'figma:asset/0f81ce91c9e1e4b160373763252782e2e4a383f7.png';
import codeLogo from 'figma:asset/70b586eaab5268599574c1ba345d9303cd8dc7e2.png';
import saudiTechLogo from 'figma:asset/4dfb281d34ccbfa87e9e0e8ec18fe47982500deb.png';
import vision2030Logo from 'figma:asset/282bf9d7d4505753604235758d1892d7cac2b565.png';
import { useTranslation } from 'react-i18next';

export const PartnersMarquee: React.FC = () => {
 const { t } = useTranslation();
 const partners = [
 { nameKey: 'partners.alinma', logo: alinmaLogo, link: 'https://www.alinma.com' },
 { nameKey: 'partners.alrajhi', logo: alrajhiLogo, link: 'https://www.alrajhibank.com.sa' },
 { nameKey: 'partners.code', logo: codeLogo, link: 'https://code.net.sa/' },
 { nameKey: 'partners.mnasat', logo: mnasatLogo, link: 'https://mnasat.com.sa/' },
 { nameKey: 'partners.ehsan', logo: ehsanLogo, link: 'https://ehsan.org.sa/c/0/?gad_source=1&gad_campaignid=22292423210&gbraid=0AAAAADt2fbyHoMao7WKNwquXuNrpEgebz&gclid=CjwKCAjw1N7NBhAoEiwAcPchp18t3F23cAzrQ8BBBZ0lil8jgAX0nnv0LuRs0KYIMNCmXPyVtmr4kBoCyuMQAvD_BwE' },
 { nameKey: 'partners.rega', logo: regaLogo, link: 'https://rega.gov.sa' },
 { nameKey: 'partners.nca', logo: ncaLogo, link: 'https://nca.gov.sa/ar/' },
 { nameKey: 'partners.nafath', logo: nafathLogo, link: 'https://my.gov.sa/ar/services/119727' },
 { nameKey: 'partners.sakani', logo: sakaniLogo, link: 'https://sakani.sa/' },
 { nameKey: 'partners.moc', logo: mocLogo, link: 'https://mc.gov.sa/' },
 { nameKey: 'partners.vision2030', logo: vision2030Logo, link: 'https://www.vision2030.gov.sa/ar/' },
 { nameKey: 'partners.saudiTech', logo: saudiTechLogo, link: '#' }
 ];

 return (
 <section className="py-16 bg-white overflow-hidden border-t border-b border-gray-100 relative">
 <div className="text-center mb-12">
 <span className="text-[#47CCD0] text-sm uppercase tracking-widest mb-2 block">{t('partners.sectionLabel')}</span>
 <h2 className="text-3xl text-black">{t('partners.sectionTitle')}</h2>
 </div>

 <style dangerouslySetInnerHTML={{__html: `
 @keyframes scroll {
 from { transform: translateX(0); }
 to { transform: translateX(-100%); }
 }
 .animate-scroll {
 animation: scroll 40s linear infinite;
 }
 .group:hover .animate-scroll {
 animation-play-state: paused;
 }
 `}} />

 <div className="relative flex overflow-hidden group w-full" dir="ltr">
 <div className="flex items-center gap-16 px-8 shrink-0 animate-scroll">
 {partners.map((partner, index) => (
 <a
 key={index}
 href={partner.link}
 target="_blank"
 rel="noopener noreferrer"
 className="flex-shrink-0 w-44 h-24 flex items-center justify-center grayscale hover:grayscale-0 hover:scale-110 transition-all duration-300"
 title={t(partner.nameKey)}
 >
 <img
 src={partner.logo}
 alt={t(partner.nameKey)}
 className="max-w-full max-h-full object-contain"
 />
 </a>
 ))}
 </div>
 <div className="flex items-center gap-16 px-8 shrink-0 animate-scroll">
 {partners.map((partner, index) => (
 <a
 key={`dup-${index}`}
 href={partner.link}
 target="_blank"
 rel="noopener noreferrer"
 className="flex-shrink-0 w-44 h-24 flex items-center justify-center grayscale hover:grayscale-0 hover:scale-110 transition-all duration-300"
 title={t(partner.nameKey)}
 >
 <img
 src={partner.logo}
 alt={t(partner.nameKey)}
 className="max-w-full max-h-full object-contain"
 />
 </a>
 ))}
 </div>
 </div>
 </section>
 );
};
