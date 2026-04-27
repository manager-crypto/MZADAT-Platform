import { useState } from 'react';
import { MapPin, Crown, ArrowUpLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { RiyalSymbol } from './ui/RiyalSymbol';
import { useTranslation } from 'react-i18next';

interface PaidAdsCardMarqueeProps {
  onNavigate?: (page: string) => void;
  onItemClick?: (item: any) => void;
}

export function PaidAdsCardMarquee({ onNavigate, onItemClick }: PaidAdsCardMarqueeProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('real-estate');

  const tabs = [
    { id: 'real-estate', labelKey: 'paidAds.realEstate' },
    { id: 'cars', labelKey: 'paidAds.cars' },
    { id: 'plates', labelKey: 'paidAds.plates' },
    { id: 'other', labelKey: 'paidAds.other' }
  ];

  const adsData: Record<string, any[]> = {
    'real-estate': [
      {
        id: 1,
        image: "https://images.unsplash.com/photo-1622015663319-e97e697503ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMGV4dGVyaW9yfGVufDF8fHx8MTc3Mjk2NDE3MXww&ixlib=rb-4.1.0&q=80&w=1080",
        titleKey: "paidAds.item1Title",
        locationKey: "paidAds.item1Location",
        price: "12,500,000",
        badgeKey: "paidAds.item1Badge",
        targetPage: "luxury-auction-details"
      },
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1769698840921-b6cf06a51f8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBleHRlcmlvcnxlbnwxfHx8fDE3NzMwMjQ3Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
        titleKey: "paidAds.item2Title",
        locationKey: "paidAds.item2Location",
        price: "45,000,000",
        badgeKey: "paidAds.item2Badge",
        targetPage: "luxury-auction-details"
      },
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1702373749921-3ed85367c2ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwbGFuZCUyMGFncmljdWx0dXJlfGVufDF8fHx8MTc3MzAyNDcyOXww&ixlib=rb-4.1.0&q=80&w=1080",
        titleKey: "paidAds.item3Title",
        locationKey: "paidAds.item3Location",
        price: "8,200,000",
        badgeKey: "paidAds.item3Badge",
        targetPage: "luxury-auction-details"
      },
      {
        id: 4,
        image: "https://images.unsplash.com/photo-1663756915301-2ba688e078cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzI5ODc5MjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
        titleKey: "paidAds.item4Title",
        locationKey: "paidAds.item4Location",
        price: "1,150,000",
        badgeKey: "paidAds.item4Badge",
        targetPage: "luxury-auction-details"
      },
    ],
    'cars': [
      {
        id: 5,
        image: "https://images.unsplash.com/photo-1742056024244-02a093dae0b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcG9ydHMlMjBjYXJ8ZW58MXx8fHwxNzcyOTgwNDMyfDA&ixlib=rb-4.1.0&q=80&w=1080",
        titleKey: "paidAds.item5Title",
        locationKey: "paidAds.item5Location",
        price: "650,000",
        badgeKey: "paidAds.item5Badge",
        targetPage: "car-details"
      },
      {
        id: 6,
        image: "https://images.unsplash.com/photo-1618418721668-0d1f72aa4bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXJzfGVufDF8fHx8MTc3MzQxMTM3OXww&ixlib=rb-4.1.0&q=80&w=1080",
        titleKey: "paidAds.item6Title",
        locationKey: "paidAds.item6Location",
        price: "950,000",
        badgeKey: "paidAds.item6Badge",
        targetPage: "car-details"
      },
      {
        id: 7,
        image: "https://images.unsplash.com/photo-1541348263662-e068662d82af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBjYXJ8ZW58MXx8fHwxNzczNDExMzgzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        titleKey: "paidAds.item7Title",
        locationKey: "paidAds.item7Location",
        price: "1,200,000",
        badgeKey: "paidAds.item7Badge",
        targetPage: "car-details"
      },
      {
        id: 8,
        image: "https://images.unsplash.com/photo-1549632891-a0bea6d0355b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYW5nZSUyMHJvdmVyfGVufDF8fHx8MTc3MzQxMTQzOXww&ixlib=rb-4.1.0&q=80&w=1080",
        titleKey: "paidAds.item8Title",
        locationKey: "paidAds.item8Location",
        price: "850,000",
        badgeKey: "paidAds.item8Badge",
        targetPage: "car-details"
      },
    ],
    'plates': [
      {
        id: 9,
        image: "https://images.unsplash.com/photo-1768123134291-bf7896a5ea0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBsaWNlbnNlJTIwcGxhdGV8ZW58MXx8fHwxNzczNDExMzg5fDA&ixlib=rb-4.1.0&q=80&w=1080",
        titleKey: "paidAds.item9Title",
        locationKey: "paidAds.item9Location",
        price: "120,000",
        badgeKey: "paidAds.item9Badge",
        targetPage: "plate-details"
      },
      {
        id: 10,
        image: "https://images.unsplash.com/photo-1687039588464-09f1b52208c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudW1iZXIlMjBwbGF0ZXxlbnwxfHx8fDE3NzM0MTEzOTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        titleKey: "paidAds.item10Title",
        locationKey: "paidAds.item10Location",
        price: "450,000",
        badgeKey: "paidAds.item10Badge",
        targetPage: "plate-details"
      },
      {
        id: 11,
        image: "https://images.unsplash.com/photo-1768123134291-bf7896a5ea0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBsaWNlbnNlJTIwcGxhdGV8ZW58MXx8fHwxNzczNDExMzg5fDA&ixlib=rb-4.1.0&q=80&w=1080",
        titleKey: "paidAds.item11Title",
        locationKey: "paidAds.item11Location",
        price: "85,000",
        badgeKey: "paidAds.item11Badge",
        targetPage: "plate-details"
      },
      {
        id: 12,
        image: "https://images.unsplash.com/photo-1687039588464-09f1b52208c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudW1iZXIlMjBwbGF0ZXxlbnwxfHx8fDE3NzM0MTEzOTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        titleKey: "paidAds.item12Title",
        locationKey: "paidAds.item12Location",
        price: "60,000",
        badgeKey: "paidAds.item12Badge",
        targetPage: "plate-details"
      }
    ],
    'other': [
      {
        id: 13,
        image: "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBwYyUyMHNldHVwfGVufDF8fHx8MTc3Mjk5MTc4M3ww&ixlib=rb-4.1.0&q=80&w=1080",
        titleKey: "paidAds.item13Title",
        locationKey: "paidAds.item13Location",
        price: "8,500",
        badgeKey: "paidAds.item13Badge",
        targetPage: "auction-details"
      },
      {
        id: 14,
        image: "https://images.unsplash.com/photo-1626218174358-7769486c4b79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBwY3xlbnwxfHx8fDE3NzM0MTEzOTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
        titleKey: "paidAds.item14Title",
        locationKey: "paidAds.item14Location",
        price: "12,000",
        badgeKey: "paidAds.item14Badge",
        targetPage: "auction-details"
      },
      {
        id: 15,
        image: "https://images.unsplash.com/photo-1758380742318-4074cce52ec4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY29sbGVjdGlibGV8ZW58MXx8fHwxNzczNDExNDA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
        titleKey: "paidAds.item15Title",
        locationKey: "paidAds.item15Location",
        price: "15,000",
        badgeKey: "paidAds.item15Badge",
        targetPage: "auction-details"
      },
      {
        id: 16,
        image: "https://images.unsplash.com/photo-1670177257750-9b47927f68eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaHxlbnwxfHx8fDE3NzMzNjQ0ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        titleKey: "paidAds.item16Title",
        locationKey: "paidAds.item16Location",
        price: "185,000",
        badgeKey: "paidAds.item16Badge",
        targetPage: "auction-details"
      }
    ]
  };

  const currentAds = adsData[activeTab] || [];
  const duplicatedAds = [...currentAds, ...currentAds, ...currentAds, ...currentAds];

  const getSpecs = (tab: string) => {
    if (tab === 'cars') return [t('paidAds.specAutomatic'), t('paidAds.specExcellent'), t('paidAds.specDirectSale')];
    if (tab === 'real-estate') return [t('paidAds.specSpacious'), t('paidAds.specLuxury'), t('paidAds.specDirectSale')];
    if (tab === 'plates') return [t('paidAds.specPrivate'), t('paidAds.specImmediateTransfer')];
    return [t('paidAds.specFeatured'), t('paidAds.specDirectSale')];
  };

  return (
    <section className="w-full bg-[#F8FAFB] py-16 overflow-hidden relative border-t border-gray-100">
      <div className="text-center mb-6 max-w-2xl mx-auto px-4">
        <h2 className="text-3xl text-black font-bold mb-4 flex items-center justify-center gap-2">
          <Crown className="text-[#47CCD0]" size={28} />
          {t('paidAds.sectionTitle')}
        </h2>
        <p className="text-gray-500">{t('paidAds.sectionSubtitle')}</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center items-center gap-2 mb-10 overflow-x-auto px-4 py-2 hide-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-[#47CCD0] text-white shadow-md'
                : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {t(tab.labelKey)}
          </button>
        ))}
      </div>

      {/* CSS Animation for Marquee */}
      <style>
        {`
          @keyframes scroll-cards-rtl {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(100% / 4)); }
          }
          .animate-cards-marquee {
            display: flex;
            width: max-content;
            animation: scroll-cards-rtl 40s linear infinite;
          }
          .animate-cards-marquee:hover {
            animation-play-state: paused;
          }
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>

      <div className="relative w-full max-w-[1920px] mx-auto group">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex overflow-hidden"
          >
            <div className="animate-cards-marquee">
              {duplicatedAds.map((ad, index) => (
                <motion.div
                  key={`${ad.id}-${index}`}
                  whileHover={{ y: -5 }}
                  className="w-[280px] sm:w-[320px] bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex-shrink-0 mx-3 sm:mx-4 cursor-pointer"
                  onClick={() => {
                    if (onItemClick) {
                      onItemClick({
                        id: `ad-${ad.id}`,
                        category: activeTab,
                        title: t(ad.titleKey),
                        price: parseInt(ad.price.replace(/\D/g, '')) || 0,
                        image: ad.image,
                        location: t(ad.locationKey),
                        specs: getSpecs(activeTab),
                        seller: { name: t('paidAds.verifiedAdvertiser'), rating: 4.8, verified: true },
                        postedAt: t('paidAds.oneDayAgo'),
                        isPlate: activeTab === 'plates',
                        plateNums: activeTab === 'plates' ? t(ad.titleKey).match(/\d+/)?.[0] || '123' : undefined,
                        plateChars: activeTab === 'plates' ? 'A A A' : undefined,
                      });
                    } else if (onNavigate) {
                      onNavigate('direct-sale-details');
                    }
                  }}
                >
                  {/* Image Section */}
                  <div className="relative h-[200px] sm:h-[220px]">
                    <img
                      src={ad.image}
                      alt={t(ad.titleKey)}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 end-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800">
                      {t(ad.badgeKey)}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 sm:p-5">
                    <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base line-clamp-1">{t(ad.titleKey)}</h3>

                    <div className="flex items-center gap-1.5 text-gray-500 mb-4 text-xs sm:text-sm">
                      <MapPin size={14} className="text-[#47CCD0]" />
                      <span className="truncate">{t(ad.locationKey)}</span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="font-bold text-[#2B3D50] text-sm sm:text-base flex items-center gap-1 font-mono">
                        {ad.price}
                        <RiyalSymbol className="w-4 h-4 text-gray-500" />
                      </span>
                      <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#2B3D50] flex items-center justify-center text-white hover:bg-[#47CCD0] transition-colors">
                        <ArrowUpLeft size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
