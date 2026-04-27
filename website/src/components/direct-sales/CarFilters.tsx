import React, { useState } from 'react';
import { 
  Filter
} from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Slider } from "../ui/slider";
import { RiyalSymbol } from '../ui/RiyalSymbol';
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useTranslation } from 'react-i18next';

interface CarFiltersProps {
  className?: string;
  onFilterChange?: (filters: any) => void;
}

export const CarFilters: React.FC<CarFiltersProps> = ({ className, onFilterChange }) => {
  const { t } = useTranslation();
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [selectedMake, setSelectedMake] = useState<string>('');
  
  // Handlers would normally update parent state
  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    // onFilterChange(...)
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Filter size={20} className="text-[#47CCD0]" />
          {t('carFilters.filterResults')}
        </h3>
        <button className="text-sm text-gray-400 hover:text-[#47CCD0] font-medium transition-colors">
          {t('carFilters.reset')}
        </button>
      </div>

      <Accordion type="multiple" defaultValue={['offer-type', 'brand', 'price', 'year', 'city']} className="w-full">
        
        {/* 1. نوع العرض */}
        <AccordionItem value="offer-type">
          <AccordionTrigger className="text-end font-bold text-gray-800 hover:text-[#47CCD0] hover:no-underline">
            {t('carFilters.offerType')}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox id="direct-sale" defaultChecked />
                <Label htmlFor="direct-sale" className="text-sm cursor-pointer">{t('carFilters.directSale')}</Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox id="transfer" />
                <Label htmlFor="transfer" className="text-sm cursor-pointer">{t('carFilters.transfer')}</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 2. الماركة والموديل */}
        <AccordionItem value="brand">
          <AccordionTrigger className="text-end font-bold text-gray-800 hover:text-[#47CCD0] hover:no-underline">
            {t('carFilters.brandModel')}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              <div className="space-y-1.5">
                <Label className="text-xs text-gray-500">{t('carFilters.brand')}</Label>
                <Select onValueChange={setSelectedMake}>
                  <SelectTrigger className="w-full text-end text-sm">
                    <SelectValue placeholder={t('carFilters.selectBrand')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="toyota">{t('carFilters.toyota')}</SelectItem>
                    <SelectItem value="mercedes">{t('carFilters.mercedes')}</SelectItem>
                    <SelectItem value="hyundai">{t('carFilters.hyundai')}</SelectItem>
                    <SelectItem value="ford">{t('carFilters.ford')}</SelectItem>
                    <SelectItem value="nissan">{t('carFilters.nissan')}</SelectItem>
                    <SelectItem value="lexus">{t('carFilters.lexus')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1.5">
                <Label className="text-xs text-gray-500">{t('carFilters.model')}</Label>
                <Select disabled={!selectedMake}>
                  <SelectTrigger className="w-full text-end text-sm">
                    <SelectValue placeholder={t('carFilters.selectModel')} />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedMake === 'toyota' && (
                      <>
                        <SelectItem value="landcruiser">{t('carFilters.landcruiser')}</SelectItem>
                        <SelectItem value="camry">{t('carFilters.camry')}</SelectItem>
                        <SelectItem value="corolla">{t('carFilters.corolla')}</SelectItem>
                        <SelectItem value="hilux">{t('carFilters.hilux')}</SelectItem>
                      </>
                    )}
                    {selectedMake === 'mercedes' && (
                      <>
                        <SelectItem value="s-class">S-Class</SelectItem>
                        <SelectItem value="e-class">E-Class</SelectItem>
                        <SelectItem value="c-class">C-Class</SelectItem>
                        <SelectItem value="g-class">G-Class</SelectItem>
                      </>
                    )}
                     <SelectItem value="other">{t('carFilters.other')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 3. السنة */}
        <AccordionItem value="year">
          <AccordionTrigger className="text-end font-bold text-gray-800 hover:text-[#47CCD0] hover:no-underline">
            {t('carFilters.year')}
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center gap-2 pt-2">
               <div className="flex-1 space-y-1.5">
                <Label className="text-xs text-gray-500">{t('carFilters.from')}</Label>
                <Select>
                  <SelectTrigger className="w-full text-end text-sm">
                    <SelectValue placeholder="2010" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 16 }, (_, i) => 2010 + i).map(year => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
               </div>
               <div className="flex-1 space-y-1.5">
                <Label className="text-xs text-gray-500">{t('carFilters.to')}</Label>
                <Select>
                  <SelectTrigger className="w-full text-end text-sm">
                    <SelectValue placeholder="2025" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 16 }, (_, i) => 2010 + i).reverse().map(year => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
               </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 4. السعر */}
        <AccordionItem value="price">
          <AccordionTrigger className="text-end font-bold text-gray-800 hover:text-[#47CCD0] hover:no-underline">
            {t('carFilters.price')} <RiyalSymbol className="w-4 h-4 text-gray-800 me-1" />
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 px-1 pb-2">
              <Slider
                defaultValue={[0, 500000]}
                max={1000000}
                step={5000}
                value={priceRange}
                onValueChange={handlePriceChange}
                className="mb-6"
              />
              <div className="flex items-center gap-2">
                 <div className="flex-1 relative">
                    <input 
                      type="number" 
                      min="0"
                      value={priceRange[0]}
                      onChange={(e) => {
                        let val = Number(e.target.value);
                        if (val < 0) val = 0;
                        handlePriceChange([val, priceRange[1]]);
                      }}
                      className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#47CCD0] text-start"
                    />
                    <span className="absolute end-2 top-1.5 text-xs text-gray-400">{t('carFilters.from')}</span>
                 </div>
                 <div className="flex-1 relative">
                    <input 
                      type="number" 
                      min="0"
                      value={priceRange[1]}
                      onChange={(e) => {
                        let val = Number(e.target.value);
                        if (val < 0) val = 0;
                        handlePriceChange([priceRange[0], val]);
                      }}
                      className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#47CCD0] text-start"
                    />
                    <span className="absolute end-2 top-1.5 text-xs text-gray-400">{t('carFilters.to')}</span>
                 </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 5. المدينة */}
        <AccordionItem value="city">
          <AccordionTrigger className="text-end font-bold text-gray-800 hover:text-[#47CCD0] hover:no-underline">
            {t('carFilters.city')}
          </AccordionTrigger>
          <AccordionContent>
             <Select>
              <SelectTrigger className="w-full text-end text-sm mt-2">
                <SelectValue placeholder={t('carFilters.allCities')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('carFilters.allCities')}</SelectItem>
                <SelectItem value="riyadh">{t('carFilters.riyadh')}</SelectItem>
                <SelectItem value="jeddah">{t('carFilters.jeddah')}</SelectItem>
                <SelectItem value="dammam">{t('carFilters.dammam')}</SelectItem>
                <SelectItem value="makkah">{t('carFilters.makkah')}</SelectItem>
                <SelectItem value="madinah">{t('carFilters.madinah')}</SelectItem>
                <SelectItem value="khobar">{t('carFilters.khobar')}</SelectItem>
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>

        {/* 6. الممشى */}
        <AccordionItem value="mileage">
          <AccordionTrigger className="text-end font-bold text-gray-800 hover:text-[#47CCD0] hover:no-underline">
             {t('carFilters.mileage')}
          </AccordionTrigger>
          <AccordionContent>
             <RadioGroup defaultValue="all" className="pt-2 space-y-2">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="all" id="km-all" />
                  <Label htmlFor="km-all" className="text-sm cursor-pointer">{t('carFilters.all')}</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="0-50" id="km-50" />
                  <Label htmlFor="km-50" className="text-sm cursor-pointer">{t('carFilters.under50k')}</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="50-100" id="km-100" />
                  <Label htmlFor="km-100" className="text-sm cursor-pointer">{t('carFilters.between50k100k')}</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="100-150" id="km-150" />
                  <Label htmlFor="km-150" className="text-sm cursor-pointer">{t('carFilters.between100k150k')}</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="150+" id="km-plus" />
                  <Label htmlFor="km-plus" className="text-sm cursor-pointer">{t('carFilters.over150k')}</Label>
                </div>
             </RadioGroup>
          </AccordionContent>
        </AccordionItem>

        {/* 7. المواصفات الإقليمية */}
        <AccordionItem value="regional-specs">
          <AccordionTrigger className="text-end font-bold text-gray-800 hover:text-[#47CCD0] hover:no-underline">
             {t('carFilters.regionalSpecs')}
          </AccordionTrigger>
          <AccordionContent>
             <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox id="spec-saudi" />
                  <Label htmlFor="spec-saudi" className="text-sm cursor-pointer">{t('carFilters.saudi')}</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox id="spec-gulf" />
                  <Label htmlFor="spec-gulf" className="text-sm cursor-pointer">{t('carFilters.gulf')}</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox id="spec-american" />
                  <Label htmlFor="spec-american" className="text-sm cursor-pointer">{t('carFilters.american')}</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox id="spec-other" />
                  <Label htmlFor="spec-other" className="text-sm cursor-pointer">{t('carFilters.importedOther')}</Label>
                </div>
             </div>
          </AccordionContent>
        </AccordionItem>

        {/* 8. حالة البدي */}
        <AccordionItem value="body-condition">
          <AccordionTrigger className="text-end font-bold text-gray-800 hover:text-[#47CCD0] hover:no-underline">
             {t('carFilters.bodyCondition')}
          </AccordionTrigger>
          <AccordionContent>
             <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox id="body-original" />
                  <Label htmlFor="body-original" className="text-sm cursor-pointer">{t('carFilters.original')}</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox id="body-cosmetic" />
                  <Label htmlFor="body-cosmetic" className="text-sm cursor-pointer">{t('carFilters.cosmetic')}</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox id="body-light" />
                  <Label htmlFor="body-light" className="text-sm cursor-pointer">{t('carFilters.lightDamage')}</Label>
                </div>
             </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* 9. نوع الوقود */}
        <AccordionItem value="fuel">
          <AccordionTrigger className="text-end font-bold text-gray-800 hover:text-[#47CCD0] hover:no-underline">
             {t('carFilters.fuelType')}
          </AccordionTrigger>
          <AccordionContent>
             <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox id="fuel-petrol" />
                  <Label htmlFor="fuel-petrol" className="text-sm cursor-pointer">{t('carFilters.petrol')}</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox id="fuel-diesel" />
                  <Label htmlFor="fuel-diesel" className="text-sm cursor-pointer">{t('carFilters.diesel')}</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox id="fuel-hybrid" />
                  <Label htmlFor="fuel-hybrid" className="text-sm cursor-pointer">{t('carFilters.hybrid')}</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox id="fuel-electric" />
                  <Label htmlFor="fuel-electric" className="text-sm cursor-pointer">{t('carFilters.electric')}</Label>
                </div>
             </div>
          </AccordionContent>
        </AccordionItem>

        {/* 10. حالة السيارة */}
        <AccordionItem value="condition">
          <AccordionTrigger className="text-end font-bold text-gray-800 hover:text-[#47CCD0] hover:no-underline">
             {t('carFilters.carCondition')}
          </AccordionTrigger>
          <AccordionContent>
             <RadioGroup defaultValue="used" className="pt-2 space-y-2">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="new" id="cond-new" />
                  <Label htmlFor="cond-new" className="text-sm cursor-pointer">{t('carFilters.new')}</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="used" id="cond-used" />
                  <Label htmlFor="cond-used" className="text-sm cursor-pointer">{t('carFilters.used')}</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="damaged" id="cond-damaged" />
                  <Label htmlFor="cond-damaged" className="text-sm cursor-pointer">{t('carFilters.damaged')}</Label>
                </div>
             </RadioGroup>
          </AccordionContent>
        </AccordionItem>
        
        {/* 11. الجير */}
        <AccordionItem value="gear">
          <AccordionTrigger className="text-end font-bold text-gray-800 hover:text-[#47CCD0] hover:no-underline">
             {t('carFilters.transmission')}
          </AccordionTrigger>
          <AccordionContent>
             <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox id="gear-auto" />
                  <Label htmlFor="gear-auto" className="text-sm cursor-pointer">{t('carFilters.automatic')}</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox id="gear-manual" />
                  <Label htmlFor="gear-manual" className="text-sm cursor-pointer">{t('carFilters.manual')}</Label>
                </div>
             </div>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
      
      <Button className="w-full bg-[#47CCD0] hover:bg-[#35a4a9] text-white font-bold py-6 rounded-xl shadow-lg shadow-teal-500/20">
        {t('carFilters.applyFilters')}
      </Button>
    </div>
  );
};
