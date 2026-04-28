import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { BackButton } from '../components/ui/BackButton';
import nafathLogoImage from 'figma:asset/331135c935a627d4be1bdb0d7f741419310e7469.png';

interface NafathLoginPageProps {
 onNavigate: (page: string) => void;
 onLoginSuccess?: (data: any) => void;
}

export const NafathLoginPage: React.FC<NafathLoginPageProps> = ({ onNavigate, onLoginSuccess }) => {
 const [nationalId, setNationalId] = useState('');
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState('');

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 setError('');

 if (nationalId.length !== 10) {
 setError('رقم الهوية يجب أن يتكون من 10 أرقام');
 return;
 }

 if (!nationalId.startsWith('1') && !nationalId.startsWith('2')) {
 setError('رقم الهوية غير صحيح');
 return;
 }

 setIsLoading(true);
 // Simulate API call to Nafath
 setTimeout(() => {
 setIsLoading(false);
 // Navigate to verification page with the random number
 onNavigate('nafath-verification');
 }, 1500);
 };

 return (
 <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] dark:bg-[#2B3D50] transition-colors duration-300 px-4">
 <div className="w-full max-w-md bg-[#F8F9FA] dark:bg-[#2B3D50] flex flex-col items-center justify-center p-8 rounded-2xl">
 
 {/* Logo and Title area */}
 <div className="mb-8 text-center flex flex-col items-center w-full">
 {/* If you want to use the exact provided image as the logo, uncomment below.
 However, since the image contains the whole UI, we will build it with HTML/CSS instead.
 */}
 {/* <img src={nafathLogoImage} alt="Nafath" className="w-full max-w-[300px] mb-4" /> */}
 
 <div className="mb-4 text-[#139E8C] dark:text-[#47CCD0] font-black text-7xl tracking-tighter" style={{ fontFamily: 'Noto Kufi Arabic, sans-serif' }}>
 نفاذ
 </div>
 <h1 className="text-[#139E8C] dark:text-[#47CCD0] text-3xl font-normal tracking-wide">
 تسجيل الدخول
 </h1>
 </div>

 <form onSubmit={handleSubmit} className="w-full space-y-6">
 <div className="space-y-3">
 <label className="text-lg font-normal text-[#139E8C] dark:text-[#47CCD0] block text-center">
 رقم الهوية الوطنية
 </label>
 <div className="relative">
 <input
 type="text"
 value={nationalId}
 onChange={(e) => {
 const val = e.target.value.replace(/\D/g, '');
 if (val.length <= 10) setNationalId(val);
 }}
 className={`w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-[#139E8C] dark:focus:border-[#47CCD0] transition-all text-center text-xl font-medium text-gray-900 dark:text-white ${
 error ? 'border-red-500' : ''
 }`}
 dir="ltr"
 />
 </div>
 {error && <p className="text-red-500 text-sm font-medium mt-1 text-center">{error}</p>}
 </div>

 <div className="pt-2">
 <button
 type="submit"
 className="w-full max-w-[280px] mx-auto bg-[#139E8C] text-white py-3 rounded font-normal text-lg hover:bg-[#108575] transition-colors flex items-center justify-center gap-2"
 >
 {isLoading ? <Loader2 className="animate-spin" /> : 'تسجيل الدخول عبر نفاذ'}
 </button>
 </div>
 
 <div className="flex justify-center mt-6">
 <BackButton 
 onClick={() => onNavigate('login')}
 label="العودة"
 className="!text-gray-400 hover:bg-transparent"
 type="button"
 />
 </div>
 </form>
 </div>
 </div>
 );
};
