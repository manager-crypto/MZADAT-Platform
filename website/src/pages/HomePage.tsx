import React from 'react';
import heroImage from 'figma:asset/490b23f89866c2e28d65798443a6ee7116ec5faf.png';
import luxuryImage from 'figma:asset/c401f321f596540c94893d5d865ff794356cb049.png';
import valuationImage from 'figma:asset/71fafc11d22677403993510d6411bea21409136b.png';
import { 
  ArrowUpLeft, 
  MapPin, 
  Building2, 
  FileText, 
  User, 
  Gem,
  Smartphone,
  Download,
  Menu,
  Home,
  Search,
  Heart,
  Map as MapIcon
} from 'lucide-react';
import appBgImage from 'figma:asset/5a892c5e0b0f4679e6cf216e290f98521e1de5b6.png';
import { HowItWorks } from '../components/home/HowItWorks';
import { HeroSection } from '../components/home/HeroSection';
import { PartnersMarquee } from '../components/home/PartnersMarquee';
import { PaidAdsCardMarquee } from '../components/PaidAdsCardMarquee';
import { BrokerageSection } from '../components/home/BrokerageSection';
import { FeaturedAuctionsSection } from '../components/home/FeaturedAuctionsSection';
import { RiyalSymbol } from '../components/ui/RiyalSymbol';

interface HomePageProps {
  onOpenChat: () => void;
  cursorPosition: { x: number; y: number };
  onCitySelect?: (cityId: string) => void;
  onNavigate?: (page: string) => void;
  onItemClick?: (item: any) => void;
  onPropertyClick?: (property: any) => void;
  onAuctionClick?: (auction: any) => void;
  isLoggedIn?: boolean;
  onOpenLogin?: () => void;
}

import { useTranslation } from 'react-i18next';
import { useSiteSections } from '../hooks/useSiteSections';

export const HomePage: React.FC<HomePageProps> = ({ 
  onOpenChat, 
  cursorPosition, 
  onCitySelect, 
  onNavigate, 
  onItemClick, 
  onPropertyClick, 
  onAuctionClick,
  isLoggedIn,
  onOpenLogin
}) => {
  const { t } = useTranslation();
  const { isVisible } = useSiteSections('home');
  const services = [
    {
      title: t('homePage.service1Title'),
      desc: t('homePage.service1Desc'),
      icon: FileText,
      image: valuationImage,
      path: 'services/valuation'
    },
    {
      title: t('homePage.service2Title'),
      desc: t('homePage.service2Desc'),
      icon: Gem,
      image: luxuryImage,
      path: 'services/luxury'
    },
    {
      title: t('homePage.service3Title'),
      desc: t('homePage.service3Desc'),
      icon: User,
      image: 'https://images.unsplash.com/photo-1694018359679-49465b4c0d61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwY29uc3VsdGF0aW9uJTIwc2F1ZGklMjBhcmFiaWF8ZW58MXx8fHwxNzczODIyMTM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      path: 'consulting'
    },
  ];

  const previousAuctions = [
    {
      id: 1,
      title: t('homePage.auction1Title'),
      type: t('homePage.auctionTypeResidential'),
      date: t('homePage.auction1Date'),
      winningBid: 3450000,
      participants: 24,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 2,
      title: t('homePage.auction2Title'),
      type: t('homePage.auctionTypeCommercial'),
      date: t('homePage.auction2Date'),
      winningBid: 8200000,
      participants: 45,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 3,
      title: t('homePage.auction3Title'),
      type: t('homePage.auctionTypeIndustrial'),
      date: t('homePage.auction3Date'),
      winningBid: 1560000,
      participants: 18,
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 4,
      title: t('homePage.auction4Title'),
      type: t('homePage.auctionTypeResidential'),
      date: t('homePage.auction4Date'),
      winningBid: 1250000,
      participants: 32,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop'
    }
  ];

  const propertyAds = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1646662521253-5b9253b1a207?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBwYWxhY2UlMjBleHRlcmlvciUyMGFyY2hpdGVjdHVyZSUyMHNhdWRpJTIwYXJhYmlhfGVufDF8fHx8MTc2NDYzNTE1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: t('homePage.ad1Title'),
      location: t('homePage.ad1Location')
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
      title: t('homePage.ad2Title'),
      location: t('homePage.ad2Location')
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
      title: t('homePage.ad3Title'),
      location: t('homePage.ad3Location')
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
      title: t('homePage.ad4Title'),
      location: t('homePage.ad4Location')
    }
  ];

  return (
    <>
      {/* --- HERO SECTION --- */}
      {isVisible('Hero Banner') && <HeroSection onNavigate={onNavigate} onOpenChat={onOpenChat} />}

      {/* --- HOW IT WORKS / QUICK STATS --- */}
      {isVisible('Quick Stats') && <HowItWorks />}

      {/* --- BROKERAGE OFFERS --- */}
      {isVisible('Direct Sales') && <BrokerageSection onNavigate={onNavigate} onPropertyClick={onPropertyClick} />}

      {/* --- FEATURED AUCTIONS --- */}
      {isVisible('Featured Auctions') && <FeaturedAuctionsSection onNavigate={onNavigate} onAuctionClick={onAuctionClick} isLoggedIn={isLoggedIn} onOpenLogin={onOpenLogin} />}

      {/* --- PREVIOUS AUCTION RESULTS --- */}
      <section className="py-20 bg-[#F8FAFB]">
        <div className="w-full max-w-[1440px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-black font-bold mb-4">{t('home.previousAuctions')}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">{t('home.previousAuctionsDesc')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {previousAuctions.map(item => (
              <div key={item.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-w-0">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-gray-50 text-gray-600 text-[10px] px-2.5 py-1.5 rounded-md font-bold border border-gray-100">{item.type}</span>
                  <span className="text-xs text-gray-400 font-mono bg-gray-50 px-2 py-1 rounded" dir="ltr">{item.date}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-6 truncate text-sm">{item.title}</h3>
                
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-[10px] text-gray-400 mb-1">{t('home.winningBid')}</p>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xl font-bold font-mono text-[#47CCD0] flex items-center gap-1" dir="ltr">{item.winningBid.toLocaleString()} <RiyalSymbol className="w-3 h-3 text-gray-500" /></span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
                    <span className="text-xs text-gray-600 flex items-center gap-1.5">
                      <User size={14} className="text-gray-400" /> {t('home.participants')}
                    </span>
                    <span className="font-bold font-mono text-gray-900">{item.participants}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PAID ADS CARDS MARQUEE --- */}
      <PaidAdsCardMarquee onNavigate={onNavigate} onItemClick={onItemClick} />

      {/* --- SERVICES SECTION --- */}
      <section className="py-20 bg-[#F8FAFB]">
        <div className="w-full max-w-[1440px] mx-auto px-4">
           <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Title Card */}
              <div className="bg-[#2B3D50] text-white p-10 rounded-2xl flex flex-col justify-center relative overflow-hidden group h-full min-h-[400px]">
                 <div className="absolute inset-0 z-0">
                    <img 
                      src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop" 
                      alt="Business Handshake" 
                      className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700 filter grayscale hover:grayscale-0" 
                    />
                    <div className="absolute inset-0 bg-[#2B3D50]/80"></div>
                 </div>

                 <div className="absolute top-0 end-0 w-64 h-64 bg-[#47CCD0] rounded-full blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity z-10"></div>
                 <div className="relative z-20">
                   <h2 className="text-3xl mb-4">{t('homePage.servicesTitle')}</h2>
                   <p className="text-gray-300 mb-8 group-hover:text-white transition-colors">{t('homePage.servicesDesc')}</p>
                   <button className="flex items-center gap-2 text-[#47CCD0] hover:gap-4 transition-all">
                     {t('homePage.viewAllServices')} <ArrowUpLeft size={18} />
                   </button>
                 </div>
              </div>

              {/* Service Cards */}
              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((srv, i) => (
                  <div 
                    key={i} 
                    onClick={() => onNavigate?.(srv.path)}
                    className="bg-white rounded-2xl border border-gray-200 hover:border-[#47CCD0] hover:shadow-xl hover:shadow-[#47CCD0]/10 transition-all duration-300 group overflow-hidden flex flex-col h-full cursor-pointer"
                  >
                     <div className="h-48 w-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                        <img 
                          src={srv.image} 
                          alt={srv.title} 
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                        />
                     </div>
                     
                     <div className="p-8 pt-0 flex-1 flex flex-col relative">
                       <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center text-[#47CCD0] mb-4 group-hover:scale-110 transition-transform relative z-20 -mt-7 shadow-md border border-gray-50">
                         <srv.icon size={28} />
                       </div>
                       
                       <h3 className="text-xl mb-3 text-gray-900">{srv.title}</h3>
                       <p className="text-gray-500 text-sm">{srv.desc}</p>
                     </div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </section>

      {/* --- PROPERTY AD CAROUSEL --- */}
      <section className="w-full overflow-hidden bg-black">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {propertyAds.map((ad) => (
            <div key={ad.id} className="relative h-[450px] group cursor-pointer overflow-hidden">
              <img 
                src={ad.image} 
                alt={ad.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale-[20%] group-hover:grayscale-0"
              />
              
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ad.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 start-4 z-30 bg-white/20 backdrop-blur-md border border-white/30 text-white w-9 h-9 flex items-center justify-center rounded-full hover:bg-white hover:text-black transition-all duration-500 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0"
                title={t('homePage.searchOnGoogleMaps')}
              >
                <MapIcon size={16} />
              </a>

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <div className="flex justify-between items-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="text-end">
                    <h3 className="text-lg text-white mb-1">{ad.title}</h3>
                    <p className="text-[#47CCD0] text-xs flex items-center gap-1">
                      <MapPin size={12} /> {ad.location}
                    </p>
                  </div>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate?.('luxury-auction-details');
                    }}
                    className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-4 py-1.5 rounded-full text-xs hover:bg-[#47CCD0] hover:border-[#47CCD0] transition-all flex items-center gap-1.5"
                  >
                    {t('homePage.details')} <ArrowUpLeft size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- SUCCESS PARTNERS MARQUEE --- */}
      {isVisible('Our Partners') && <PartnersMarquee />}

      {/* --- APP CTA --- */}
      <section className="bg-[#2B3D50] text-white pt-24 pb-0 relative overflow-hidden">
         <div className="absolute inset-0 z-0">
           <img 
             src={appBgImage} 
             alt="Background" 
             className="w-full h-full object-cover opacity-10 mix-blend-overlay"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-[#2B3D50] via-transparent to-[#2B3D50]"></div>
         </div>

         <div className="absolute top-0 end-0 w-[600px] h-[600px] bg-[#47CCD0] rounded-full blur-[150px] opacity-10 translate-x-1/2 -translate-y-1/2"></div>
         
         <div className="w-full max-w-[1440px] mx-auto px-4 relative z-10">
           <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
              <div className="lg:w-1/2 text-center lg:text-end lg:pe-16">
                <span className="text-[#47CCD0] tracking-widest uppercase text-sm mb-4 block">{t('homePage.appCtaLabel')}</span>
                <h2 className="text-4xl md:text-5xl mb-6 font-bold text-white">{t('homePage.appCtaHeadline')}</h2>
                <p className="text-gray-300 text-lg mb-10 max-w-md mx-auto lg:mx-0">{t('homePage.appCtaDesc')}</p>
                
                <div className="flex justify-center lg:justify-start gap-4">
                  <button className="flex items-center gap-3 bg-white text-[#2B3D50] px-6 py-3 rounded-xl hover:bg-[#47CCD0] hover:text-white transition-all group shadow-lg shadow-white/10">
                    <div className="text-end">
                      <p className="text-[10px] uppercase opacity-60">Download on</p>
                      <p className="text-lg leading-none">App Store</p>
                    </div>
                    <Smartphone size={28} className="group-hover:scale-110 transition-transform" />
                  </button>
                  <button className="flex items-center gap-3 bg-transparent border border-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/10 transition-all hover:border-white">
                     <div className="text-end">
                      <p className="text-[10px] uppercase opacity-60">Get it on</p>
                      <p className="text-lg leading-none">Google Play</p>
                    </div>
                    <Download size={28} />
                  </button>
                </div>
              </div>
              
              <div className="hidden lg:flex lg:w-1/2 justify-center items-center h-[300px] mt-16 mb-8">
                 <div className="relative scale-50 transform-gpu origin-center">
                    <div className="w-[300px] h-[600px] bg-black border-[12px] border-gray-800 rounded-[2.5rem] shadow-2xl relative z-10 flex flex-col items-center overflow-hidden transform -rotate-12 hover:rotate-0 transition-transform duration-500 ease-out cursor-pointer group">
                       <div className="w-32 h-6 bg-black rounded-b-2xl absolute top-0 z-20"></div>
                       <div className="w-full h-full bg-[#F8FAFB] flex flex-col pt-12 px-4 pb-4 group-hover:bg-white transition-colors overflow-hidden">
                          <div className="flex justify-between items-center mb-4 px-1">
                             <Menu size={20} className="text-gray-800" />
                             <span className="text-black text-lg">{t('homePage.appMockupTitle')}</span>
                             <User size={20} className="text-gray-800" />
                          </div>

                          <div className="flex-1 space-y-3 overflow-y-auto no-scrollbar pb-4" style={{scrollbarWidth: 'none'}}>
                             <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex gap-3 items-center transform group-hover:translate-y-0 transition-transform duration-500">
                                <img 
                                  src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=200&auto=format&fit=crop" 
                                  className="w-16 h-16 rounded-xl object-cover" 
                                  alt="Villa"
                                />
                                <div className="flex-1">
                                   <h4 className="text-xs text-gray-900 mb-1">{t('homePage.mockupListing1Title')}</h4>
                                   <p className="text-[10px] text-gray-500 flex items-center gap-1 mb-1"><MapPin size={10}/> {t('homePage.mockupListing1Area')}</p>
                                   <p className="text-xs text-[#47CCD0] flex items-center gap-1">
                                    2,500,000 
                                    <RiyalSymbol className="w-2.5 h-2.5 text-gray-500" />
                                   </p>
                                </div>
                             </div>

                             <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex gap-3 items-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                <img 
                                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=200&auto=format&fit=crop" 
                                  className="w-16 h-16 rounded-xl object-cover" 
                                  alt="Land"
                                />
                                <div className="flex-1">
                                   <h4 className="text-xs text-gray-900 mb-1">{t('homePage.mockupListing2Title')}</h4>
                                   <p className="text-[10px] text-gray-500 flex items-center gap-1 mb-1"><MapPin size={10}/> {t('homePage.mockupListing2Area')}</p>
                                   <p className="text-xs text-[#47CCD0] flex items-center gap-1">
                                    1,850,000
                                    <RiyalSymbol className="w-2.5 h-2.5 text-gray-500" />
                                   </p>
                                </div>
                             </div>

                             <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex gap-3 items-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                <img 
                                  src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=200&auto=format&fit=crop" 
                                  className="w-16 h-16 rounded-xl object-cover" 
                                  alt="Real Estate"
                                />
                                <div className="flex-1">
                                   <h4 className="text-xs text-gray-900 mb-1">{t('homePage.mockupListing3Title')}</h4>
                                   <p className="text-[10px] text-gray-500 flex items-center gap-1 mb-1"><MapPin size={10}/> {t('homePage.mockupListing3Area')}</p>
                                   <p className="text-xs text-[#47CCD0] flex items-center gap-1">
                                    5,200,000
                                    <RiyalSymbol className="w-2.5 h-2.5 text-gray-500" />
                                   </p>
                                </div>
                             </div>
                          </div>

                          <div className="bg-white border-t border-gray-100 pt-3 pb-1 px-4 flex justify-between items-center text-gray-400">
                             <Home size={20} className="text-[#47CCD0]" />
                             <Search size={20} />
                             <Heart size={20} />
                             <User size={20} />
                          </div>
                       </div>
                    </div>
                    <div className="absolute -z-10 top-20 -end-20 w-72 h-72 bg-[#2B3D50] rounded-full opacity-50 blur-2xl"></div>
                    <div className="absolute -z-10 bottom-10 -start-10 w-40 h-40 bg-[#47CCD0] rounded-full blur-3xl opacity-40 animate-pulse"></div>
                 </div>
              </div>
           </div>
         </div>
      </section>

    </>
  );
};
