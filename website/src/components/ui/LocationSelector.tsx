import React, { useState, useRef, useEffect } from 'react';
import { MapPin, ChevronDown, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface LocationSelectorProps {
  onLocationChange?: (city: string, neighborhood: string) => void;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({ onLocationChange }) => {
  const { t } = useTranslation();

  const SAUDI_CITIES = [
    {
      name: t('cities.riyadh', 'الرياض'),
      neighborhoods: [
        t('neighborhoods.alMalqa', 'الملقا'), 
        t('neighborhoods.alYasmin', 'الياسمين'), 
        t('neighborhoods.alNarjis', 'النرجس'), 
        t('neighborhoods.hittin', 'حطين'), 
        t('neighborhoods.alArid', 'العارض'), 
        t('neighborhoods.alQairawan', 'القيروان'), 
        t('neighborhoods.alSahafa', 'الصحافة')
      ]
    },
    {
      name: t('cities.jeddah', 'جدة'),
      neighborhoods: [
        t('neighborhoods.alShati', 'الشاطئ'), 
        t('neighborhoods.alMurjan', 'المرجان'), 
        t('neighborhoods.alNaeem', 'النعيم'), 
        t('neighborhoods.alBasatin', 'البساتين'), 
        t('neighborhoods.alMohammadiyah', 'المحمدية'), 
        t('neighborhoods.alKhalidiyah', 'الخالدية')
      ]
    },
    {
      name: t('cities.dammam', 'الدمام'),
      neighborhoods: [
        t('neighborhoods.alShatiDammam', 'الشاطئ'), 
        t('neighborhoods.alFaisaliyah', 'الفيصلية'), 
        t('neighborhoods.alZuhur', 'الزهور'), 
        t('neighborhoods.alMazruiyah', 'المزروعية'), 
        t('neighborhoods.alJamiyin', 'الجامعيين')
      ]
    },
    {
      name: t('cities.makkah', 'مكة المكرمة'),
      neighborhoods: [
        t('neighborhoods.alAwali', 'العوالي'), 
        t('neighborhoods.alShawqiyah', 'الشوقية'), 
        t('neighborhoods.bathaQuraish', 'بطحاء قريش'), 
        t('neighborhoods.alZahir', 'الزاهر'), 
        t('neighborhoods.alRusaifah', 'الرصيفة')
      ]
    },
    {
      name: t('cities.madinah', 'المدينة المنورة'),
      neighborhoods: [
        t('neighborhoods.sultana', 'سلطانة'), 
        t('neighborhoods.alAziziyah', 'العزيزية'), 
        t('neighborhoods.alKhalidiyahMadinah', 'الخالدية'), 
        t('neighborhoods.baqdu', 'باقدو'), 
        t('neighborhoods.kingFahd', 'الملك فهد')
      ]
    },
    {
      name: t('cities.khobar', 'الخبر'),
      neighborhoods: [
        t('neighborhoods.alOlaya', 'العليا'), 
        t('neighborhoods.alHizamAlDhahabi', 'الحزام الذهبي'), 
        t('neighborhoods.alRakah', 'الراكة'), 
        t('neighborhoods.alQurtubah', 'القرطبة'), 
        t('neighborhoods.alJisr', 'الجسر')
      ]
    }
  ];

  const saudiArabiaName = t('locationSelector.saudiArabia', 'المملكة العربية السعودية');
  const chooseNeighborhoodName = t('locationSelector.chooseNeighborhood', 'اختر الحي');

  const [selectedCity, setSelectedCity] = useState(saudiArabiaName);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(chooseNeighborhoodName);
  
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isNeighborhoodOpen, setIsNeighborhoodOpen] = useState(false);
  const [citySearch, setCitySearch] = useState('');
  const [neighborhoodSearch, setNeighborhoodSearch] = useState('');

  const cityRef = useRef<HTMLDivElement>(null);
  const neighborhoodRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityRef.current && !cityRef.current.contains(event.target as Node)) {
        setIsCityOpen(false);
      }
      if (neighborhoodRef.current && !neighborhoodRef.current.contains(event.target as Node)) {
        setIsNeighborhoodOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setSelectedNeighborhood(chooseNeighborhoodName); 
    setIsCityOpen(false);
    setCitySearch('');
    if (onLocationChange) onLocationChange(city, chooseNeighborhoodName);
  };

  const handleNeighborhoodSelect = (neighborhood: string) => {
    setSelectedNeighborhood(neighborhood);
    setIsNeighborhoodOpen(false);
    setNeighborhoodSearch('');
    if (onLocationChange) onLocationChange(selectedCity, neighborhood);
  };

  const currentCityObj = SAUDI_CITIES.find(c => c.name === selectedCity);
  const availableNeighborhoods = currentCityObj ? currentCityObj.neighborhoods : [];
  const filteredNeighborhoods = availableNeighborhoods.filter(n => 
    n.includes(neighborhoodSearch)
  );

  const filteredCities = SAUDI_CITIES.filter(city => 
    city.name.includes(citySearch)
  );

  return (
    <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 overflow-visible shrink-0">
      
      {/* City Selector */}
      <div className="relative w-full sm:w-auto" ref={cityRef}>
        <button 
          onClick={() => {
            setIsCityOpen(!isCityOpen);
            setIsNeighborhoodOpen(false);
          }}
          className={`
            w-full flex items-center justify-between gap-2 px-4 py-3.5 border rounded-xl bg-white text-sm transition-colors whitespace-nowrap font-bold
            ${isCityOpen ? 'border-[#47CCD0] ring-1 ring-[#47CCD0]/30' : 'border-gray-200 hover:border-[#47CCD0] text-gray-800'}
          `}
        >
          {selectedCity === saudiArabiaName ? (
            <span className="text-lg leading-none mt-[-2px]">🇸🇦</span>
          ) : (
            <MapPin size={16} className="text-[#47CCD0]" />
          )}
          <span>{selectedCity}</span>
          <ChevronDown size={16} className="text-gray-400 me-1" />
        </button>

        {isCityOpen && (
          <div className="absolute top-full mt-2 end-0 w-64 bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden py-2 max-h-80 flex flex-col">
            <div className="px-3 pb-2 border-b border-gray-50 mb-2">
              <input
                type="text"
                placeholder={t('locationSelector.searchCity', 'ابحث عن مدينة...')}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] transition-colors"
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="overflow-y-auto">
              <button
                onClick={() => handleCitySelect(saudiArabiaName)}
                className="w-full text-end px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center justify-between group transition-colors border-b border-gray-50"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg leading-none">🇸🇦</span>
                  <span className={`font-bold ${selectedCity === saudiArabiaName ? 'text-[#47CCD0]' : 'text-gray-700 group-hover:text-[#47CCD0]'}`}>
                    {saudiArabiaName}
                  </span>
                </div>
                {selectedCity === saudiArabiaName && <Check size={16} className="text-[#47CCD0]" />}
              </button>
              {filteredCities.map((cityObj) => (
                <button
                  key={cityObj.name}
                  onClick={() => handleCitySelect(cityObj.name)}
                  className="w-full text-end px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center justify-between group transition-colors"
                >
                  <span className={`font-medium ${selectedCity === cityObj.name ? 'text-[#47CCD0]' : 'text-gray-700 group-hover:text-[#47CCD0]'}`}>
                    {cityObj.name}
                  </span>
                  {selectedCity === cityObj.name && <Check size={16} className="text-[#47CCD0]" />}
                </button>
              ))}
              {filteredCities.length === 0 && (
                <div className="px-4 py-3 text-sm text-gray-500 text-center">{t('locationSelector.noCitiesFound', 'لا توجد مدن مطابقة')}</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Neighborhood Selector */}
      <div className="relative w-full sm:w-auto" ref={neighborhoodRef}>
        <button 
          onClick={() => {
            if (selectedCity !== saudiArabiaName) {
              setIsNeighborhoodOpen(!isNeighborhoodOpen);
              setIsCityOpen(false);
            }
          }}
          disabled={selectedCity === saudiArabiaName}
          className={`
            w-full flex items-center justify-between gap-2 px-4 py-3.5 border rounded-xl bg-white text-sm transition-colors whitespace-nowrap min-w-[120px]
            ${selectedCity === saudiArabiaName ? 'opacity-50 cursor-not-allowed border-gray-200 text-gray-400' : 'border-gray-200 hover:border-[#47CCD0] text-gray-700 cursor-pointer'}
            ${isNeighborhoodOpen ? 'border-[#47CCD0] ring-1 ring-[#47CCD0]/30' : ''}
          `}
        >
          <span className="font-medium">{selectedNeighborhood}</span>
          <ChevronDown size={16} className={selectedCity === saudiArabiaName ? 'text-gray-300' : 'text-gray-400'} />
        </button>

        {isNeighborhoodOpen && (
          <div className="absolute top-full mt-2 end-0 w-56 bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden py-2 max-h-80 flex flex-col">
            <div className="px-3 pb-2 border-b border-gray-50 mb-2">
              <input
                type="text"
                placeholder={t('locationSelector.searchNeighborhood', 'ابحث عن حي...')}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] transition-colors"
                value={neighborhoodSearch}
                onChange={(e) => setNeighborhoodSearch(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="overflow-y-auto">
              <button
                onClick={() => handleNeighborhoodSelect(chooseNeighborhoodName)}
                className="w-full text-end px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center justify-between group transition-colors border-b border-gray-50"
              >
                <span className={`font-bold ${selectedNeighborhood === chooseNeighborhoodName ? 'text-[#47CCD0]' : 'text-gray-700 group-hover:text-[#47CCD0]'}`}>
                  {t('locationSelector.allNeighborhoods', 'جميع الأحياء')}
                </span>
                {selectedNeighborhood === chooseNeighborhoodName && <Check size={16} className="text-[#47CCD0]" />}
              </button>
              {filteredNeighborhoods.map((neighborhood) => (
                <button
                  key={neighborhood}
                  onClick={() => handleNeighborhoodSelect(neighborhood)}
                  className="w-full text-end px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center justify-between group transition-colors"
                >
                  <span className={`font-medium ${selectedNeighborhood === neighborhood ? 'text-[#47CCD0]' : 'text-gray-700 group-hover:text-[#47CCD0]'}`}>
                    {neighborhood}
                  </span>
                  {selectedNeighborhood === neighborhood && <Check size={16} className="text-[#47CCD0]" />}
                </button>
              ))}
              {filteredNeighborhoods.length === 0 && (
                <div className="px-4 py-3 text-sm text-gray-500 text-center">{t('locationSelector.noNeighborhoodsFound', 'لا توجد أحياء مطابقة')}</div>
              )}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
