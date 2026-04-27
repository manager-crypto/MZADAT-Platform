import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, SlidersHorizontal, Check } from 'lucide-react';
import { RiyalSymbol } from './RiyalSymbol';
import { useTranslation } from 'react-i18next';

interface FilterBarProps {
  onFilterChange?: (filters: any) => void;
  typeOptions?: string[];
  hidePricePeriod?: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({ 
  onFilterChange, 
  typeOptions,
  hidePricePeriod = true
}) => {
  const { t } = useTranslation();
  
  const options = typeOptions || [
    t('filterBar.apartment', 'شقة'), 
    t('filterBar.villa', 'فيلا'), 
    t('filterBar.floor', 'دور'), 
    t('filterBar.studio', 'استديو'), 
    t('filterBar.furnishedApt', 'شقة مفروشة'), 
    t('filterBar.office', 'مكتب'), 
    t('filterBar.showroom', 'معرض')
  ];

  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  // States for filters
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [pricePeriod, setPricePeriod] = useState('all'); // all, monthly, yearly
  const [areaRange, setAreaRange] = useState({ min: '', max: '' });
  const [selectedRooms, setSelectedRooms] = useState<number | null>(null);
  const [selectedBaths, setSelectedBaths] = useState<number | null>(null);
  
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

  const togglePropertyType = (type: string) => {
    setSelectedPropertyTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const applyFilters = () => {
    setActiveFilter(null);
    if (onFilterChange) {
      onFilterChange({
        propertyTypes: selectedPropertyTypes,
        priceRange,
        pricePeriod,
        areaRange,
        rooms: selectedRooms,
        baths: selectedBaths
      });
    }
  };

  const isPriceActive = priceRange.min !== '' || priceRange.max !== '' || (!hidePricePeriod && pricePeriod !== 'all');
  const isAreaActive = areaRange.min !== '' || areaRange.max !== '';
  const isMoreActive = selectedRooms !== null || selectedBaths !== null;

  return (
    <div className="flex flex-wrap gap-3 overflow-visible pb-2 md:pb-0 shrink-0 w-full md:w-auto" ref={filterRef}>
      
      {/* Property Type Filter */}
      <div className="relative">
        <button 
          onClick={() => setActiveFilter(activeFilter === 'type' ? null : 'type')}
          className={`flex items-center gap-2 px-4 py-3.5 border rounded-xl text-sm transition-colors whitespace-nowrap ${selectedPropertyTypes.length > 0 || activeFilter === 'type' ? 'border-[#47CCD0] text-[#47CCD0] bg-[#47CCD0]/5' : 'border-gray-200 bg-white text-gray-700 hover:border-[#47CCD0]'}`}
        >
          {t('filterBar.propertyType', 'نوع العقار')}
          {selectedPropertyTypes.length > 0 && <span className="bg-[#47CCD0] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{selectedPropertyTypes.length}</span>}
          <ChevronDown size={16} className={selectedPropertyTypes.length > 0 || activeFilter === 'type' ? 'text-[#47CCD0]' : 'text-gray-400'} />
        </button>
        
        {activeFilter === 'type' && (
          <div className="absolute top-full end-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 p-4">
            <h4 className="font-bold text-gray-900 mb-3 text-sm">{t('filterBar.selectPropertyType', 'اختر نوع العقار')}</h4>
            <div className="space-y-3 max-h-60 overflow-y-auto ps-2 hide-scrollbar">
              {options.map(type => (
                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedPropertyTypes.includes(type) ? 'bg-[#47CCD0] border-[#47CCD0]' : 'border-gray-300 group-hover:border-[#47CCD0]'}`}>
                    {selectedPropertyTypes.includes(type) && <Check size={12} className="text-white" />}
                  </div>
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">{type}</span>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={selectedPropertyTypes.includes(type)}
                    onChange={() => togglePropertyType(type)}
                  />
                </label>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
              <button 
                onClick={() => setSelectedPropertyTypes([])} 
                className="text-sm text-gray-500 hover:text-gray-700 font-medium"
                disabled={selectedPropertyTypes.length === 0}
              >
                {t('filterBar.clear', 'مسح')}
              </button>
              <button onClick={applyFilters} className="px-5 py-2 bg-[#47CCD0] text-white text-sm rounded-xl hover:bg-[#3bb1b5] transition-colors font-bold">{t('filterBar.apply', 'تطبيق')}</button>
            </div>
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="relative">
        <button 
          onClick={() => setActiveFilter(activeFilter === 'price' ? null : 'price')}
          className={`flex items-center gap-2 px-4 py-3.5 border rounded-xl text-sm transition-colors whitespace-nowrap ${isPriceActive || activeFilter === 'price' ? 'border-[#47CCD0] text-[#47CCD0] bg-[#47CCD0]/5' : 'border-gray-200 bg-white text-gray-700 hover:border-[#47CCD0]'}`}
        >
          {t('filterBar.price', 'السعر')}
          {isPriceActive && <span className="bg-[#47CCD0] w-2 h-2 rounded-full"></span>}
          <ChevronDown size={16} className={isPriceActive || activeFilter === 'price' ? 'text-[#47CCD0]' : 'text-gray-400'} />
        </button>

        {activeFilter === 'price' && (
          <div className="absolute top-full end-0 mt-2 w-72 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 p-4">
            {!hidePricePeriod && (
              <>
                <h4 className="font-bold text-gray-900 mb-3 text-sm">{t('filterBar.paymentMethod', 'طريقة الدفع')}</h4>
                <div className="flex gap-2 mb-5 bg-gray-50 p-1 rounded-lg">
                  {['all', 'monthly', 'yearly'].map((period) => (
                    <button
                      key={period}
                      onClick={() => setPricePeriod(period)}
                      className={`flex-1 py-1.5 text-xs rounded-md transition-all ${pricePeriod === period ? 'bg-white shadow-sm font-bold text-[#47CCD0]' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      {period === 'all' ? t('filterBar.all', 'الكل') : period === 'monthly' ? t('filterBar.monthly', 'شهري') : t('filterBar.yearly', 'سنوي')}
                    </button>
                  ))}
                </div>
              </>
            )}

            <h4 className="font-bold text-gray-900 mb-3 text-sm flex items-center gap-1">{t('filterBar.priceRange', 'نطاق السعر')} <RiyalSymbol className="w-4 h-4 text-gray-900" /></h4>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex-1 relative">
                <input 
                  type="number" 
                  min="0"
                  placeholder={t('filterBar.minPrice', 'الحد الأدنى')}
                  className="w-full ps-2 pe-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#47CCD0] bg-gray-50/50 text-start"
                  value={priceRange.min}
                  onChange={(e) => {
                    let val = Number(e.target.value);
                    if (val < 0) val = 0;
                    setPriceRange({...priceRange, min: val.toString()})
                  }}
                  dir="ltr"
                />
              </div>
              <span className="text-gray-400">-</span>
              <div className="flex-1 relative">
                <input 
                  type="number" 
                  min="0"
                  placeholder={t('filterBar.maxPrice', 'الحد الأعلى')}
                  className="w-full ps-2 pe-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#47CCD0] bg-gray-50/50 text-start"
                  value={priceRange.max}
                  onChange={(e) => {
                    let val = Number(e.target.value);
                    if (val < 0) val = 0;
                    setPriceRange({...priceRange, max: val.toString()})
                  }}
                  dir="ltr"
                />
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
              <button 
                onClick={() => { setPriceRange({min: '', max: ''}); setPricePeriod('all'); }} 
                className="text-sm text-gray-500 hover:text-gray-700 font-medium"
              >
                {t('filterBar.clear', 'مسح')}
              </button>
              <button onClick={applyFilters} className="px-5 py-2 bg-[#47CCD0] text-white text-sm rounded-xl hover:bg-[#3bb1b5] transition-colors font-bold">{t('filterBar.apply', 'تطبيق')}</button>
            </div>
          </div>
        )}
      </div>

      {/* Area Filter */}
      <div className="relative">
        <button 
          onClick={() => setActiveFilter(activeFilter === 'area' ? null : 'area')}
          className={`flex items-center gap-2 px-4 py-3.5 border rounded-xl text-sm transition-colors whitespace-nowrap ${isAreaActive || activeFilter === 'area' ? 'border-[#47CCD0] text-[#47CCD0] bg-[#47CCD0]/5' : 'border-gray-200 bg-white text-gray-700 hover:border-[#47CCD0]'}`}
        >
          {t('filterBar.area', 'المساحة')}
          {isAreaActive && <span className="bg-[#47CCD0] w-2 h-2 rounded-full"></span>}
          <ChevronDown size={16} className={isAreaActive || activeFilter === 'area' ? 'text-[#47CCD0]' : 'text-gray-400'} />
        </button>

        {activeFilter === 'area' && (
          <div className="absolute top-full end-0 mt-2 w-72 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 p-4">
            <h4 className="font-bold text-gray-900 mb-3 text-sm">{t('filterBar.areaLabel', 'المساحة (م²)')}</h4>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex-1 relative">
                <input 
                  type="number" 
                  min="0"
                  placeholder={t('filterBar.minArea', 'الحد الأدنى')}
                  className="w-full ps-2 pe-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#47CCD0] bg-gray-50/50 text-start"
                  value={areaRange.min}
                  onChange={(e) => {
                    let val = Number(e.target.value);
                    if (val < 0) val = 0;
                    setAreaRange({...areaRange, min: val.toString()})
                  }}
                  dir="ltr"
                />
              </div>
              <span className="text-gray-400">-</span>
              <div className="flex-1 relative">
                <input 
                  type="number" 
                  min="0"
                  placeholder={t('filterBar.maxArea', 'الحد الأعلى')}
                  className="w-full ps-2 pe-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#47CCD0] bg-gray-50/50 text-start"
                  value={areaRange.max}
                  onChange={(e) => {
                    let val = Number(e.target.value);
                    if (val < 0) val = 0;
                    setAreaRange({...areaRange, max: val.toString()})
                  }}
                  dir="ltr"
                />
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
              <button 
                onClick={() => setAreaRange({min: '', max: ''})} 
                className="text-sm text-gray-500 hover:text-gray-700 font-medium"
              >
                {t('filterBar.clear', 'مسح')}
              </button>
              <button onClick={applyFilters} className="px-5 py-2 bg-[#47CCD0] text-white text-sm rounded-xl hover:bg-[#3bb1b5] transition-colors font-bold">{t('filterBar.apply', 'تطبيق')}</button>
            </div>
          </div>
        )}
      </div>

      {/* More Filters */}
      <div className="relative">
        <button 
          onClick={() => setActiveFilter(activeFilter === 'more' ? null : 'more')}
          className={`flex items-center gap-2 px-4 py-3.5 border rounded-xl text-sm transition-colors whitespace-nowrap ${isMoreActive || activeFilter === 'more' ? 'border-[#47CCD0] text-[#47CCD0] bg-[#47CCD0]/5' : 'border-gray-200 bg-white text-gray-700 hover:border-[#47CCD0]'}`}
        >
          {t('filterBar.more', 'المزيد')}
          {isMoreActive && <span className="bg-[#47CCD0] w-2 h-2 rounded-full"></span>}
          <SlidersHorizontal size={16} className={isMoreActive || activeFilter === 'more' ? 'text-[#47CCD0]' : 'text-gray-400'} />
        </button>

        {activeFilter === 'more' && (
          <div className="absolute top-full end-0 mt-2 w-72 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 p-4">
            
            <h4 className="font-bold text-gray-900 mb-3 text-sm">{t('filterBar.bedrooms', 'غرف النوم')}</h4>
            <div className="flex gap-2 flex-wrap mb-5">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => setSelectedRooms(selectedRooms === num ? null : num)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all text-sm
                    ${selectedRooms === num ? 'bg-[#47CCD0] border-[#47CCD0] text-white font-bold' : 'bg-white border-gray-200 text-gray-700 hover:border-[#47CCD0]'}`}
                >
                  {num === 5 ? '+5' : num}
                </button>
              ))}
            </div>

            <h4 className="font-bold text-gray-900 mb-3 text-sm">{t('filterBar.bathrooms', 'دورات المياه')}</h4>
            <div className="flex gap-2 flex-wrap mb-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => setSelectedBaths(selectedBaths === num ? null : num)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all text-sm
                    ${selectedBaths === num ? 'bg-[#47CCD0] border-[#47CCD0] text-white font-bold' : 'bg-white border-gray-200 text-gray-700 hover:border-[#47CCD0]'}`}
                >
                  {num === 5 ? '+5' : num}
                </button>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between items-center">
              <button 
                onClick={() => { setSelectedRooms(null); setSelectedBaths(null); }} 
                className="text-sm text-gray-500 hover:text-gray-700 font-medium"
              >
                {t('filterBar.clear', 'مسح')}
              </button>
              <button onClick={applyFilters} className="px-5 py-2 bg-[#47CCD0] text-white text-sm rounded-xl hover:bg-[#3bb1b5] transition-colors font-bold">{t('filterBar.apply', 'تطبيق')}</button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
