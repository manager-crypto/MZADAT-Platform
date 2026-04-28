import React from 'react';
import { BidiText } from '../common/BidiText';

interface SaudiPlateProps {
 letters: string;
 numbers: string;
 type?: 'private' | 'transport' | 'motorcycle' | 'diplomatic';
 size?: 'sm' | 'md' | 'lg';
}

export const SaudiPlate: React.FC<SaudiPlateProps> = ({ letters, numbers, type = 'private', size = 'md' }) => {
 const getLatinChars = (str: string) => {
 const map: any = { 'أ': 'A', 'ب': 'B', 'ح': 'J', 'د': 'D', 'ر': 'R', 'س': 'S', 'ص': 'X', 'ط': 'T', 'ع': 'E', 'ق': 'G', 'ك': 'K', 'ل': 'L', 'م': 'Z', 'ن': 'N', 'ه': 'H', 'و': 'U', 'ي': 'V' };
 return str.split('').map(c => map[c] || c).join(' ');
 };

 const getLatinNums = (str: string) => {
 const map: any = { '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9' };
 return str.split('').map(c => map[c] || c).join('');
 };

 const latinLetters = getLatinChars(letters.replace(/\s/g, ''));
 const latinNumbers = getLatinNums(numbers);

 // Size configurations
 const sizes = {
 sm: { wrapper: 'max-w-[180px]', textAr: 'text-lg', textEn: 'text-sm', ksaW: 'w-10', ksaText: 'text-[6px]', logo: 'w-5 h-5', logoText: 'text-[6px]' },
 md: { wrapper: 'max-w-[320px]', textAr: 'text-3xl', textEn: 'text-2xl', ksaW: 'w-16', ksaText: 'text-[10px]', logo: 'w-8 h-8', logoText: 'text-[8px]' },
 lg: { wrapper: 'max-w-[480px]', textAr: 'text-5xl', textEn: 'text-4xl', ksaW: 'w-24', ksaText: 'text-xs', logo: 'w-12 h-12', logoText: 'text-[10px]' },
 };
 
 const s = sizes[size];

 return (
 <div className={`w-full ${s.wrapper} aspect-[2/1] md:aspect-[5.2/1.1] rounded-lg border-2 border-black bg-white flex overflow-hidden shadow-sm relative mx-auto select-none`}>
 {/* Plate Content */}
 <div className="flex-1 flex flex-col h-full">
 {/* Top Row: Arabic */}
 <div className="flex-1 flex items-center justify-between px-4 border-b-2 border-gray-100">
 <BidiText text={numbers} dir="ltr" className={`${s.textAr} font-bold font-mono tracking-widest`} />
 <BidiText text={letters} dir="rtl" className={`${s.textAr} font-bold font-mono tracking-widest`} />
 </div>
 {/* Bottom Row: Latin */}
 <div className="flex-1 flex items-center justify-between px-4">
 <BidiText text={latinNumbers} dir="ltr" className={`${s.textEn} font-bold font-mono tracking-widest`} />
 <BidiText text={latinLetters} dir="ltr" className={`${s.textEn} font-bold font-mono tracking-widest uppercase`} />
 </div>
 </div>

 {/* KSA Strip */}
 <div className={`${s.ksaW} border-s-2 border-black flex flex-col items-center justify-center relative bg-white`}>
 <div className={`${s.ksaText} font-bold mb-1`}>KSA</div>
 <div className={`${s.logo} rounded-full border border-green-600 flex items-center justify-center mb-1`}>
 <div className={`text-green-600 ${s.logoText} font-bold`}>🇸🇦</div>
 </div>
 <div className={`${s.ksaText} font-bold rotate-90 whitespace-nowrap mt-2 tracking-tighter`}>السعودية</div>
 
 {/* Type Indicator */}
 <div className={`absolute bottom-0 end-0 w-0 h-0 border-s-[15px] border-s-transparent border-b-[15px] ${type === 'transport' ? 'border-b-yellow-400' : type === 'diplomatic' ? 'border-b-green-600' : 'border-b-black'}`}></div>
 </div>
 </div>
 );
};
