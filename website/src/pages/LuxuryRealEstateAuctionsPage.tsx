import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
 Search,
 Filter,
 Gavel,
 MapPin,
 Bed,
 Bath,
 Maximize,
 Home,
 Building,
 Armchair,
 CheckCircle2,
 Clock,
 ArrowUpRight,
 Key,
 Tag
} from 'lucide-react';
import sarCurrency from 'figma:asset/3f649d4624729213a9513bf0153522436e1f6f47.png';
import { RiyalSymbol } from '../components/ui/RiyalSymbol';

import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface LuxuryRealEstateAuctionsPageProps {
 onNavigate?: (page: string) => void;
}

export const LuxuryRealEstateAuctionsPage: React.FC<LuxuryRealEstateAuctionsPageProps> = ({ onNavigate }) => {
 const { t } = useTranslation();
 const [activeCategory, setActiveCategory] = useState<'all' | 'villa' | 'commercial' | 'apartment'>('all');

 const categories = [
 { id: 'all', label: t('luxuryRealEstate.catAll'), icon: Home },
 { id: 'villa', label: t('luxuryRealEstate.catVilla'), icon: Home },
 { id: 'apartment', label: t('luxuryRealEstate.catApartment'), icon: Armchair },
 { id: 'commercial', label: t('luxuryRealEstate.catCommercial'), icon: Building },
 ];

 const properties = [
 {
 id: 1,
 title: t('luxuryRealEstate.prop1Title'),
 description: t('luxuryRealEstate.prop1Desc'),
 location: t('luxuryRealEstate.prop1Location'),
 price: 12500000,
 area: 1200,
 beds: 6,
 baths: 8,
 type: 'villa',
 listingType: 'sale',
 status: 'active',
 image: 'https://images.unsplash.com/photo-1669605273258-52f42b9489ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3aGl0ZSUyMHZpbGxhJTIwbHV4dXJ5JTIwcG9vbCUyMGV4dGVyaW9yfGVufDF8fHx8MTc2NjI4OTYyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
 },
 {
 id: 2,
 title: t('luxuryRealEstate.prop2Title'),
 description: t('luxuryRealEstate.prop2Desc'),
 location: t('luxuryRealEstate.prop2Location'),
 price: 8900000,
 area: 950,
 beds: 5,
 baths: 6,
 type: 'villa',
 listingType: 'auction',
 status: 'active',
 timeLeft: t('luxuryRealEstate.prop2TimeLeft'),
 image: 'https://images.unsplash.com/photo-1609520025808-e26aeaf7a69f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGRhcmslMjBleHRlcmlvciUyMG5hdHVyZSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NjYyODk2MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
 bidders: 23
 },
 {
 id: 3,
 title: t('luxuryRealEstate.prop3Title'),
 description: t('luxuryRealEstate.prop3Desc'),
 location: t('luxuryRealEstate.prop3Location'),
 price: 4500000,
 area: 450,
 beds: 3,
 baths: 4,
 type: 'apartment',
 listingType: 'sale',
 status: 'coming_soon',
 image: 'https://images.unsplash.com/photo-1758448756350-3d0eec02ba37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsaXZpbmclMjByb29tJTIwaW50ZXJpb3IlMjBkZXNpZ24lMjBtb2Rlcm4lMjBwZW50aG91c2V8ZW58MXx8fHwxNzY2Mjg5NjIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
 },
 {
 id: 4,
 title: t('luxuryRealEstate.prop4Title'),
 description: t('luxuryRealEstate.prop4Desc'),
 location: t('luxuryRealEstate.prop4Location'),
 price: 150000000,
 area: 25000,
 beds: 0,
 baths: 0,
 type: 'commercial',
 listingType: 'auction',
 status: 'active',
 timeLeft: t('luxuryRealEstate.prop4TimeLeft'),
 image: 'https://images.unsplash.com/photo-1722966885396-1f3dcebdf27f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSaXlhZGglMjBLQUZEJTIwYXJjaGl0ZWN0dXJlJTIwc2t5c2NyYXBlcnxlbnwxfHx8fDE3NjYyODk2Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
 bidders: 5
 }
 ];

 const luxuryStrip = [
 {
 id: 1,
 image: "https://images.unsplash.com/photo-1706043890009-9aae000532cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZSUyMHBvb2wlMjBtb2Rlcm58ZW58MXx8fHwxNzczNjEwMTcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
 title: t('luxuryRealEstate.strip1Title'),
 location: t('luxuryRealEstate.strip1Location'),
 },
 {
 id: 2,
 image: "https://images.unsplash.com/photo-1703782997446-fba282cbfce6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmb3Jlc3QlMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc3MzYxMDE3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
 title: t('luxuryRealEstate.strip2Title'),
 location: t('luxuryRealEstate.strip2Location'),
 },
 {
 id: 3,
 image: "https://images.unsplash.com/photo-1758448756350-3d0eec02ba37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwZW50aG91c2UlMjBsaXZpbmclMjByb29tJTIwbHV4dXJ5fGVufDF8fHx8MTc3MzYxMDE3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
 title: t('luxuryRealEstate.strip3Title'),
 location: t('luxuryRealEstate.strip3Location'),
 },
 {
 id: 4,
 image: "https://images.unsplash.com/photo-1770836560507-ba33be89e547?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBza3lzY3JhcGVyJTIwcml5YWRofGVufDF8fHx8MTc3MzYxMDE4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
 title: t('luxuryRealEstate.strip4Title'),
 location: t('luxuryRealEstate.strip4Location'),
 }
 ];

 const filteredProperties = activeCategory === 'all' 
 ? properties 
 : properties.filter(p => p.type === activeCategory);

 return (
 <div className="pt-36 pb-20 min-h-screen bg-gray-50">
 {/* Hero Header */}
 <div className="bg-[#1e293b] text-white py-16 relative overflow-hidden mb-8">
 <div className="container mx-auto px-4 relative z-10">
 <div className="max-w-3xl">
 <h1 className="text-4xl md:text-5xl font-bold mb-6 flex items-center gap-4">
 <div className="w-14 h-14 rounded-2xl bg-[#47CCD0] flex items-center justify-center text-white shadow-lg shadow-teal-500/30">
 <Key size={28} />
 </div>
 {t('luxuryRealEstate.heroTitle')}
 </h1>
 <p className="text-gray-300 text-xl leading-relaxed max-w-2xl">
 {t('luxuryRealEstate.heroDesc')}
 </p>

 <div className="flex flex-wrap gap-4 mt-8">
 <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-xl border border-white/10">
 <CheckCircle2 className="text-[#47CCD0]" size={20} />
 <span className="font-medium">{t('luxuryRealEstate.verified100')}</span>
 </div>
 <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-xl border border-white/10">
 <CheckCircle2 className="text-[#47CCD0]" size={20} />
 <span className="font-medium">{t('luxuryRealEstate.techInspection')}</span>
 </div>
 </div>
 </div>
 </div>
 {/* Background Decoration */}
 <div className="absolute top-0 end-0 w-full h-full opacity-20 pointer-events-none">
 <div className="absolute end-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#47CCD0]/30 to-transparent"></div>
 <img 
 src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1080&auto=format&fit=crop" 
 className="w-full h-full object-cover mix-blend-overlay"
 alt="Background"
 />
 </div>
 </div>

 {/* Luxury Strip Section */}
 <section className="w-full overflow-hidden bg-black mb-12">
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
 {luxuryStrip.map((ad) => (
 <div key={ad.id} className="relative h-[500px] group cursor-pointer overflow-hidden">
 <ImageWithFallback 
 src={ad.image} 
 alt={ad.title} 
 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale-[20%] group-hover:grayscale-0"
 />
 
 {/* Overlay */}
 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-100 flex flex-col justify-end p-6">
 <div className="flex flex-col transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
 <div className="text-end mb-4">
 <h3 className="text-xl text-white font-bold mb-2">{ad.title}</h3>
 <p className="text-[#47CCD0] text-sm flex items-center gap-1">
 <MapPin size={14} /> {ad.location}
 </p>
 </div>
 
 <div className="w-full flex justify-end">
 <button 
 onClick={(e) => {
 e.stopPropagation();
 onNavigate?.('luxury-auction-details');
 }}
 className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-6 py-2 rounded-full text-sm hover:bg-[#47CCD0] hover:border-[#47CCD0] transition-all flex items-center gap-2"
 >
 {t('luxuryRealEstate.detailsBtn')} <ArrowUpRight size={14} />
 </button>
 </div>
 </div>
 </div>
 </div>
 ))}
 </div>
 </section>

 <div className="container mx-auto px-4">
 
 {/* Filter Tabs */}
 <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
 {categories.map(cat => (
 <button
 key={cat.id}
 onClick={() => setActiveCategory(cat.id as any)}
 className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all ${
 activeCategory === cat.id
 ? 'bg-[#47CCD0] text-white shadow-lg shadow-teal-500/20 scale-105'
 : 'bg-white text-gray-600 hover:bg-gray-100'
 }`}
 >
 <cat.icon size={18} />
 {cat.label}
 </button>
 ))}
 </div>

 {/* Properties Grid */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 {filteredProperties.map((property) => (
 <div key={property.id} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 flex flex-col">
 
 {/* Image Section */}
 <div className="relative h-80 overflow-hidden">
 <img 
 src={property.image} 
 alt={property.title} 
 className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
 />
 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
 
 <div className="absolute top-4 end-4 flex gap-2">
 {property.listingType === 'auction' ? (
 <>
 <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-gray-900 flex items-center gap-1.5 shadow-sm">
 <Clock size={14} className="text-[#47CCD0]" />
 {property.timeLeft}
 </div>
 <div className="bg-[#47CCD0]/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-white flex items-center gap-1.5 shadow-sm">
 <Gavel size={14} />
 {t('luxuryRealEstate.auctionBadge')}
 </div>
 </>
 ) : (
 <div className="bg-[#00B14F]/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-white flex items-center gap-1.5 shadow-sm">
 <Tag size={14} />
 {t('luxuryRealEstate.directSaleBadge')}
 </div>
 )}
 </div>

 <div className="absolute bottom-4 end-4 text-white">
 <h3 className="text-2xl font-bold mb-1 shadow-black/10">{property.title}</h3>
 <div className="flex items-center gap-1.5 text-gray-200 text-sm">
 <MapPin size={16} className="text-[#47CCD0]" />
 {property.location}
 </div>
 </div>
 </div>

 {/* Content Section */}
 <div className="p-6 flex-1 flex flex-col">
 <div className="flex items-start justify-between mb-6">
 <p className="text-gray-500 text-sm leading-relaxed max-w-md">{property.description}</p>
 {property.listingType === 'auction' && property.bidders !== undefined && (
 <div className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
 <span className="text-xs text-gray-500">{t('luxuryRealEstate.biddersLabel')}</span>
 <span className="font-bold text-gray-900">{property.bidders}</span>
 </div>
 )}
 </div>

 {/* Features */}
 <div className="grid grid-cols-3 gap-4 mb-8">
 <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-2xl">
 <Maximize size={20} className="text-[#47CCD0] mb-2" />
 <span className="text-sm font-bold text-gray-900">{property.area} {t('luxuryRealEstate.areaSuffix')}</span>
 <span className="text-xs text-gray-400">{t('luxuryRealEstate.areaLabel')}</span>
 </div>
 {property.beds > 0 && (
 <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-2xl">
 <Bed size={20} className="text-[#47CCD0] mb-2" />
 <span className="text-sm font-bold text-gray-900">{property.beds}</span>
 <span className="text-xs text-gray-400">{t('luxuryRealEstate.roomsLabel')}</span>
 </div>
 )}
 {property.baths > 0 && (
 <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-2xl">
 <Bath size={20} className="text-[#47CCD0] mb-2" />
 <span className="text-sm font-bold text-gray-900">{property.baths}</span>
 <span className="text-xs text-gray-400">{t('luxuryRealEstate.bathroomsLabel')}</span>
 </div>
 )}
 {property.type === 'commercial' && (
 <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-2xl">
 <Building size={20} className="text-[#47CCD0] mb-2" />
 <span className="text-sm font-bold text-gray-900">{t('luxuryRealEstate.commercial')}</span>
 <span className="text-xs text-gray-400">{t('luxuryRealEstate.typeLabel')}</span>
 </div>
 )}
 </div>

 <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
 <div>
 {property.listingType === 'auction' && (
 <p className="text-[10px] text-gray-400 mb-0.5 line-through flex items-center gap-1">{t('luxuryRealEstate.openingPrice')} {(property.price * 0.8).toLocaleString()} <RiyalSymbol className="w-2.5 h-2.5 text-gray-400" /></p>
 )}
 <p className="text-xs text-gray-500 mb-1 font-bold">
 {property.listingType === 'auction' ? t('luxuryRealEstate.currentPrice') : t('luxuryRealEstate.askingPrice')}
 <span className="text-[9px] bg-gray-100 px-1 py-0.5 rounded me-1 font-normal text-gray-500">{t('luxuryRealEstate.vatIncluded')}</span>
 </p>
 <div className="text-2xl font-bold text-[#47CCD0] flex items-center gap-1.5 font-mono">
 {property.price.toLocaleString()}
 <RiyalSymbol className="w-4 h-4 text-gray-500 ms-1" />
 </div>
 </div>
 
 <button 
 onClick={() => onNavigate?.('luxury-auction-details')}
 className={`px-8 py-3 text-white rounded-xl font-bold transition-colors flex items-center gap-2 ${
 property.listingType === 'auction' 
 ? 'bg-gray-900 hover:bg-[#47CCD0]' 
 : 'bg-[#47CCD0] hover:bg-[#3bbabb]'
 }`}
 >
 {property.listingType === 'auction' ? t('luxuryRealEstate.bidNow') : t('luxuryRealEstate.detailsBtn')}
 <ArrowUpRight size={18} />
 </button>
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 );
};
