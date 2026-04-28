import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { allCountryCodes } from '../../utils/phoneCodes';

export interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
 containerClassName?: string;
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
 ({ className, containerClassName, dir = "ltr", ...props }, ref) => {
 const [isOpen, setIsOpen] = useState(false);
 const [selectedCode, setSelectedCode] = useState('+966');
 const dropdownRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
 const handleClickOutside = (event: MouseEvent) => {
 if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
 setIsOpen(false);
 }
 };
 document.addEventListener('mousedown', handleClickOutside);
 return () => document.removeEventListener('mousedown', handleClickOutside);
 }, []);

 const selectedCountry = allCountryCodes.find(c => c.code === selectedCode) || allCountryCodes[0];

 return (
 <div className={`relative flex items-center w-full ${isOpen ? 'z-[99999]' : 'z-10'} ${containerClassName || ''}`} dir="ltr">
 <div className="absolute start-0 top-0 bottom-0 flex items-center h-full" ref={dropdownRef}>
 <div 
 className={`flex items-center gap-1.5 h-full px-3 cursor-pointer border-e border-gray-200 dark:border-gray-700 transition-colors rounded-l-xl ${isOpen ? 'bg-gray-100 dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800'}`}
 onClick={() => setIsOpen(!isOpen)}
 >
 <span className="text-base">{selectedCountry.flag}</span>
 <span className="text-sm font-bold text-gray-700 dark:text-gray-300 min-w-[3.5ch] text-start" dir="ltr">{selectedCountry.code}</span>
 <ChevronDown size={14} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
 </div>

 {isOpen && (
 <div 
 className="absolute top-[calc(100%+8px)] start-0 w-[160px] max-h-[280px] overflow-y-auto bg-white dark:bg-gray-800 rounded-xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)] border border-gray-200 dark:border-gray-700 py-1.5 z-[999999] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full"
 onClick={(e) => e.stopPropagation()}
 >
 {allCountryCodes.map((country) => (
 <div
 key={`${country.code}-${country.name}`}
 className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
 onClick={() => {
 setSelectedCode(country.code);
 setIsOpen(false);
 }}
 >
 <div className="w-5 flex justify-start">
 {selectedCode === country.code && <Check size={14} className="text-[#47CCD0]" />}
 </div>
 <span className="me-2 text-base">{country.flag}</span>
 <span className="text-sm font-medium" dir="ltr">{country.code}</span>
 </div>
 ))}
 </div>
 )}
 </div>
 
 <input 
 ref={ref}
 type="tel"
 dir="ltr"
 placeholder="5XXXXXXXX"
 className={`w-full ps-[110px] text-start ${className || ''}`}
 {...props}
 onChange={(e) => {
 let val = e.target.value;
 if (val.startsWith('0')) {
 val = val.substring(1);
 e.target.value = val;
 }
 if (props.onChange) {
 props.onChange(e);
 }
 }}
 />
 </div>
 );
 }
);

PhoneInput.displayName = 'PhoneInput';