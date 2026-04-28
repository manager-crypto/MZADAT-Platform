import React, { useState } from 'react';
import {
 MapPin,
 Bed,
 Bath,
 Maximize,
 Heart,
 Phone,
 MessageCircle,
 Star,
 PlayCircle,
 Camera,
 Map
} from 'lucide-react';
import { RiyalSymbol } from '../ui/RiyalSymbol';
import { useTranslation } from 'react-i18next';

interface Property {
 id: number;
 title: string;
 location: string;
 district: string;
 price: number;
 priceType: 'monthly' | 'yearly';
 bedrooms: number;
 bathrooms: number;
 area: number;
 image: string;
 featured: boolean;
 verified: boolean;
 rating: number;
 type: string;
 furnished: boolean;
 amenities: string[];
}

interface RentalPropertyCardProps {
 property: Property;
 onClick: () => void;
 onPreviewClick: (e: React.MouseEvent) => void;
}

export const RentalPropertyCard: React.FC<RentalPropertyCardProps> = ({ property, onClick, onPreviewClick }) => {
 const { t, i18n } = useTranslation();
 const [isHovered, setIsHovered] = useState(false);

 return (
 <div 
 className="group bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 relative"
 onClick={onClick}
 onMouseEnter={() => setIsHovered(true)}
 onMouseLeave={() => setIsHovered(false)}
 >
 {/* Property Image Area */}
 <div className="relative h-[280px] overflow-hidden rounded-t-3xl p-3">
 <div className="w-full h-full relative rounded-2xl overflow-hidden">
 <img
 src={property.image}
 alt={property.title}
 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-300" />
 </div>
 
 {/* Badges - Top End */}
 <div className="absolute top-6 end-6 flex flex-col gap-2 z-10">
 {property.featured && (
 <span className="bg-[#47CCD0] text-white text-xs px-3 py-1.5 rounded-full font-bold flex items-center justify-center gap-1 shadow-md">
 <Star size={12} className="fill-white" />
 {t('rentalCard.featured')}
 </span>
 )}
 {property.verified && (
 <span className="bg-[#47CCD0] text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-md text-center">
 {t('rentalCard.verified')}
 </span>
 )}
 </div>

 {/* Floating Actions - Top Start */}
 <div className="absolute top-6 start-6 flex flex-col gap-2 z-10">
 <button className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:scale-110 transition-transform text-gray-400 hover:text-red-500">
 <Heart size={20} />
 </button>
 <button
 className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:scale-110 transition-transform text-gray-400 hover:text-[#47CCD0]"
 onClick={(e) => {
 e.stopPropagation();
 window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location + ' ' + property.district)}`, '_blank');
 }}
 title={t('rentalCard.mapTitle')}
 >
 <Map size={18} />
 </button>
 </div>

 {/* Preview Button Overlay (appears on hover) */}
 <div className={`absolute inset-0 flex items-center justify-center z-20 transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
 <button
 onClick={(e) => {
 e.stopPropagation();
 onPreviewClick(e);
 }}
 className="w-16 h-16 bg-[#47CCD0]/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#47CCD0] hover:scale-110 transition-all"
 title={t('rentalCard.previewTitle')}
 >
 <Camera size={28} />
 </button>
 </div>

 {/* Price Tag - Bottom Right */}
 <div className="absolute bottom-1 end-3 bg-white px-5 py-3 rounded-ss-2xl rounded-b-2xl shadow-lg z-10 flex flex-col items-center">
 <p className="text-[#47CCD0] font-bold text-lg leading-none font-mono flex items-center gap-1.5" dir="ltr">
 {property.price.toLocaleString('en-US')} <RiyalSymbol className="w-4 h-4 text-[#47CCD0]" />
 </p>
 <p className="text-gray-500 text-xs mt-1 font-medium">
 {property.priceType === 'monthly' ? t('rentalCard.monthly') : t('rentalCard.yearly')}
 </p>
 </div>
 </div>

 {/* Property Details */}
 <div className="p-5 pt-2">
 {/* Title & Rating */}
 <div className="flex justify-between items-start mb-3">
 <h3 className="text-xl font-bold text-[#47CCD0] leading-tight">
 {property.title}
 </h3>
 <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg shrink-0">
 <span className="text-sm font-bold text-gray-800">{property.rating}</span>
 <Star size={14} className="text-yellow-500 fill-yellow-500" />
 </div>
 </div>

 {/* Location */}
 <div className="flex items-center gap-1.5 text-gray-500 mb-4 justify-end">
 <span className="text-sm font-medium">{property.district}{property.district && property.location ? (i18n.language === 'ar' ? '، ' : ', ') : ''}{property.location}</span>
 <MapPin size={16} className="text-[#47CCD0]" />
 </div>

 {/* Property Features (Icons) */}
 <div className="flex items-center justify-between py-4 border-t border-b border-gray-100 mb-4">
 <div className="flex items-center gap-2">
 <Bed size={18} className="text-gray-400" />
 <span className="text-sm font-bold text-gray-700">{property.bedrooms}</span>
 </div>
 <div className="w-px h-6 bg-gray-200"></div>
 <div className="flex items-center gap-2">
 <Bath size={18} className="text-gray-400" />
 <span className="text-sm font-bold text-gray-700">{property.bathrooms}</span>
 </div>
 <div className="w-px h-6 bg-gray-200"></div>
 <div className="flex items-center gap-2">
 <Maximize size={18} className="text-gray-400" />
 <span className="text-sm font-bold text-gray-700" dir="ltr">{property.area} {t('brokerageFilter.sqm')}</span>
 </div>
 </div>

 {/* Amenities Pills */}
 <div className="flex flex-wrap justify-center gap-2 mb-6">
 {(property.amenities || []).slice(0, 3).map((amenity, idx) => (
 <span
 key={idx}
 className="text-[11px] bg-gray-50 text-gray-600 px-3 py-1.5 rounded-full font-medium"
 >
 {amenity}
 </span>
 ))}
 {property.amenities.length > 3 && (
 <span className="text-[11px] bg-gray-50 text-gray-600 px-3 py-1.5 rounded-full font-medium">
 +{property.amenities.length - 3}
 </span>
 )}
 </div>

 {/* Action Buttons */}
 <div className="flex gap-3">
 <button
 onClick={(e) => e.stopPropagation()}
 className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all text-sm"
 >
 <MessageCircle size={18} />
 <span>{t('rentalCard.whatsapp')}</span>
 </button>
 <button
 onClick={(e) => e.stopPropagation()}
 className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#47CCD0] text-white rounded-xl font-bold hover:bg-[#3bb3b7] transition-all text-sm shadow-md"
 >
 <Phone size={18} />
 <span>{t('rentalCard.call')}</span>
 </button>
 </div>
 </div>
 </div>
 );
};
