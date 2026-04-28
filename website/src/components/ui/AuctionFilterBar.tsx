import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { RiyalSymbol } from './RiyalSymbol';
import { useTranslation } from 'react-i18next';

interface AuctionFilterBarProps {
 onFilterChange?: (filters: any) => void;
 categories?: string[];
 locations?: string[];
}

export const AuctionFilterBar: React.FC<AuctionFilterBarProps> = ({ 
 onFilterChange, 
 categories,
 locations
}) => {
 const { t } = useTranslation();
 const defaultCategories = [
 t('auctionFilter.residential'), 
 t('auctionFilter.commercial'), 
 t('auctionFilter.industrial'), 
 t('auctionFilter.lands'), 
 t('auctionFilter.cars'), 
 t('auctionFilter.premiumPlates'), 
 t('auctionFilter.heavyEquipment')
 ];
 const defaultLocations = [
 t('auctionFilter.riyadh'), 
 t('auctionFilter.jeddah'), 
 t('auctionFilter.dammam'), 
 t('auctionFilter.makkah'), 
 t('auctionFilter.madinah'), 
 t('auctionFilter.khobar'), 
 t('auctionFilter.abha')
 ];

 const actualCategories = categories || defaultCategories;
 const actualLocations = locations || defaultLocations;

 const [activeFilter, setActiveFilter] = useState<string | null>(null);
 
 // States for filters
 const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
 const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
 const [priceRange, setPriceRange] = useState({ min: '', max: '' });
 const [status, setStatus] = useState<string[]>([]);
 
 const filterRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
 const handleClickOutside = (event: MouseEvent) => {
 if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
 setActiveFilter(null);
 }
 };
 document.addEventListener('mousedown', handleClickOutside);
 return () => document.removeEventListener('mousedown', handleClickOutside);
 }, []);

 const toggleSelection = (item: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
 setList(prev => 
 prev.includes(item) ? prev.filter(t => t !== item) : [...prev, item]
 );
 };

 const applyFilters = () => {
 setActiveFilter(null);
 if (onFilterChange) {
 onFilterChange({
 categories: selectedCategories,
 locations: selectedLocations,
 priceRange,
 status
 });
 }
 };

 const isPriceActive = priceRange.min !== '' || priceRange.max !== '';
 const isStatusActive = status.length > 0;

 return (
 <div className="flex flex-wrap gap-3 w-full" ref={filterRef}>
 
 {/* Category Filter */}
 <div className="relative">
 <button 
 onClick={() => setActiveFilter(activeFilter === 'category' ? null : 'category')}
 className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all border ${selectedCategories.length > 0 || activeFilter === 'category' ? 'border-[#47CCD0] text-[#47CCD0] bg-[#47CCD0]/5' : 'border-gray-200 bg-white text-gray-700 hover:border-[#47CCD0]'}`}
 >
 {t('auctionFilter.category')} 
 {selectedCategories.length > 0 && <span className="bg-[#47CCD0] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">{selectedCategories.length}</span>}
 <ChevronDown size={16} className={selectedCategories.length > 0 || activeFilter === 'category' ? 'text-[#47CCD0]' : 'text-gray-400'} />
 </button>
 
 {activeFilter === 'category' && (
 <div className="absolute top-full end-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 p-4">
 <h4 className="font-bold text-gray-900 mb-3 text-sm">{t('auctionFilter.selectCategory')}</h4>
 <div className="space-y-3 max-h-60 overflow-y-auto ps-2">
 {actualCategories.map(cat => (
 <label key={cat} className="flex items-center gap-3 cursor-pointer group">
 <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedCategories.includes(cat) ? 'bg-[#47CCD0] border-[#47CCD0]' : 'border-gray-300 group-hover:border-[#47CCD0]'}`}>
 {selectedCategories.includes(cat) && <Check size={12} className="text-white" />}
 </div>
 <span className="text-sm text-gray-700 group-hover:text-gray-900">{cat}</span>
 <input 
 type="checkbox" 
 className="hidden" 
 checked={selectedCategories.includes(cat)}
 onChange={() => toggleSelection(cat, selectedCategories, setSelectedCategories)}
 />
 </label>
 ))}
 </div>
 <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
 <button 
 onClick={() => setSelectedCategories([])} 
 className="text-sm text-gray-500 hover:text-gray-700 font-medium"
 disabled={selectedCategories.length === 0}
 >
 {t('auctionFilter.clear')}
 </button>
 <button 
 onClick={applyFilters}
 className="px-4 py-2 bg-[#47CCD0] text-white rounded-lg text-sm font-bold hover:bg-[#3dbec2] transition-colors"
 >
 {t('auctionFilter.apply')}
 </button>
 </div>
 </div>
 )}
 </div>

 {/* Location Filter */}
 <div className="relative">
 <button 
 onClick={() => setActiveFilter(activeFilter === 'location' ? null : 'location')}
 className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all border ${selectedLocations.length > 0 || activeFilter === 'location' ? 'border-[#47CCD0] text-[#47CCD0] bg-[#47CCD0]/5' : 'border-gray-200 bg-white text-gray-700 hover:border-[#47CCD0]'}`}
 >
 {t('auctionFilter.city')} 
 {selectedLocations.length > 0 && <span className="bg-[#47CCD0] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">{selectedLocations.length}</span>}
 <ChevronDown size={16} className={selectedLocations.length > 0 || activeFilter === 'location' ? 'text-[#47CCD0]' : 'text-gray-400'} />
 </button>
 
 {activeFilter === 'location' && (
 <div className="absolute top-full end-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 p-4">
 <h4 className="font-bold text-gray-900 mb-3 text-sm">{t('auctionFilter.selectCity')}</h4>
 <div className="space-y-3 max-h-60 overflow-y-auto ps-2">
 {actualLocations.map(loc => (
 <label key={loc} className="flex items-center gap-3 cursor-pointer group">
 <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedLocations.includes(loc) ? 'bg-[#47CCD0] border-[#47CCD0]' : 'border-gray-300 group-hover:border-[#47CCD0]'}`}>
 {selectedLocations.includes(loc) && <Check size={12} className="text-white" />}
 </div>
 <span className="text-sm text-gray-700 group-hover:text-gray-900">{loc}</span>
 <input 
 type="checkbox" 
 className="hidden" 
 checked={selectedLocations.includes(loc)}
 onChange={() => toggleSelection(loc, selectedLocations, setSelectedLocations)}
 />
 </label>
 ))}
 </div>
 <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
 <button 
 onClick={() => setSelectedLocations([])} 
 className="text-sm text-gray-500 hover:text-gray-700 font-medium"
 disabled={selectedLocations.length === 0}
 >
 {t('auctionFilter.clear')}
 </button>
 <button 
 onClick={applyFilters}
 className="px-4 py-2 bg-[#47CCD0] text-white rounded-lg text-sm font-bold hover:bg-[#3dbec2] transition-colors"
 >
 {t('auctionFilter.apply')}
 </button>
 </div>
 </div>
 )}
 </div>

 {/* Price Range Filter */}
 <div className="relative">
 <button 
 onClick={() => setActiveFilter(activeFilter === 'price' ? null : 'price')}
 className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all border ${isPriceActive || activeFilter === 'price' ? 'border-[#47CCD0] text-[#47CCD0] bg-[#47CCD0]/5' : 'border-gray-200 bg-white text-gray-700 hover:border-[#47CCD0]'}`}
 >
 {t('auctionFilter.startingPrice')} 
 <ChevronDown size={16} className={isPriceActive || activeFilter === 'price' ? 'text-[#47CCD0]' : 'text-gray-400'} />
 </button>
 
 {activeFilter === 'price' && (
 <div className="absolute top-full end-0 mt-2 w-72 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 p-4">
 <h4 className="font-bold text-gray-900 mb-4 text-sm flex items-center gap-1">{t('auctionFilter.setPriceRange')} <RiyalSymbol className="w-4 h-4 text-gray-900" /></h4>
 
 <div className="flex items-center gap-3 mb-6">
 <div className="flex-1">
 <label className="text-xs text-gray-500 mb-1 block">{t('auctionFilter.from')}</label>
 <input 
 type="number" 
 placeholder="0"
 value={priceRange.min}
 onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
 className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] outline-none transition-all"
 />
 </div>
 <span className="text-gray-400 mt-5">-</span>
 <div className="flex-1">
 <label className="text-xs text-gray-500 mb-1 block">{t('auctionFilter.to')}</label>
 <input 
 type="number" 
 placeholder={t('auctionFilter.noLimit')}
 value={priceRange.max}
 onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
 className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] outline-none transition-all"
 />
 </div>
 </div>
 
 <div className="grid grid-cols-2 gap-2 mb-4">
 <button 
 onClick={() => setPriceRange({ min: '0', max: '500000' })}
 className="px-2 py-1.5 bg-gray-50 text-gray-600 text-xs rounded-lg hover:bg-[#47CCD0]/10 hover:text-[#47CCD0] transition-colors"
 >
 {t('auctionFilter.under500k')}
 </button>
 <button 
 onClick={() => setPriceRange({ min: '500000', max: '2000000' })}
 className="px-2 py-1.5 bg-gray-50 text-gray-600 text-xs rounded-lg hover:bg-[#47CCD0]/10 hover:text-[#47CCD0] transition-colors"
 >
 {t('auctionFilter.between500k2m')}
 </button>
 <button 
 onClick={() => setPriceRange({ min: '2000000', max: '5000000' })}
 className="px-2 py-1.5 bg-gray-50 text-gray-600 text-xs rounded-lg hover:bg-[#47CCD0]/10 hover:text-[#47CCD0] transition-colors"
 >
 {t('auctionFilter.between2m5m')}
 </button>
 <button 
 onClick={() => setPriceRange({ min: '5000000', max: '' })}
 className="px-2 py-1.5 bg-gray-50 text-gray-600 text-xs rounded-lg hover:bg-[#47CCD0]/10 hover:text-[#47CCD0] transition-colors"
 >
 {t('auctionFilter.over5m')}
 </button>
 </div>

 <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
 <button 
 onClick={() => setPriceRange({ min: '', max: '' })} 
 className="text-sm text-gray-500 hover:text-gray-700 font-medium"
 disabled={!isPriceActive}
 >
 {t('auctionFilter.clear')}
 </button>
 <button 
 onClick={applyFilters}
 className="px-4 py-2 bg-[#47CCD0] text-white rounded-lg text-sm font-bold hover:bg-[#3dbec2] transition-colors"
 >
 {t('auctionFilter.apply')}
 </button>
 </div>
 </div>
 )}
 </div>

 {/* Status Filter */}
 <div className="relative">
 <button 
 onClick={() => setActiveFilter(activeFilter === 'status' ? null : 'status')}
 className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all border ${isStatusActive || activeFilter === 'status' ? 'border-[#47CCD0] text-[#47CCD0] bg-[#47CCD0]/5' : 'border-gray-200 bg-white text-gray-700 hover:border-[#47CCD0]'}`}
 >
 {t('auctionFilter.auctionStatus')}
 {status.length > 0 && <span className="bg-[#47CCD0] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">{status.length}</span>}
 <ChevronDown size={16} className={isStatusActive || activeFilter === 'status' ? 'text-[#47CCD0]' : 'text-gray-400'} />
 </button>
 
 {activeFilter === 'status' && (
 <div className="absolute top-full end-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 p-4">
 <h4 className="font-bold text-gray-900 mb-3 text-sm">{t('auctionFilter.selectStatus')}</h4>
 <div className="space-y-3 ps-2">
 {[t('auctionFilter.live'), t('auctionFilter.soon'), t('auctionFilter.ended'), t('auctionFilter.canceled')].map(s => (
 <label key={s} className="flex items-center gap-3 cursor-pointer group">
 <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${status.includes(s) ? 'bg-[#47CCD0] border-[#47CCD0]' : 'border-gray-300 group-hover:border-[#47CCD0]'}`}>
 {status.includes(s) && <Check size={12} className="text-white" />}
 </div>
 <span className="text-sm text-gray-700 group-hover:text-gray-900">{s}</span>
 <input 
 type="checkbox" 
 className="hidden" 
 checked={status.includes(s)}
 onChange={() => toggleSelection(s, status, setStatus)}
 />
 </label>
 ))}
 </div>
 <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
 <button 
 onClick={() => setStatus([])} 
 className="text-sm text-gray-500 hover:text-gray-700 font-medium"
 disabled={status.length === 0}
 >
 {t('auctionFilter.clear')}
 </button>
 <button 
 onClick={applyFilters}
 className="px-4 py-2 bg-[#47CCD0] text-white rounded-lg text-sm font-bold hover:bg-[#3dbec2] transition-colors"
 >
 {t('auctionFilter.apply')}
 </button>
 </div>
 </div>
 )}
 </div>

 </div>
 );
};
