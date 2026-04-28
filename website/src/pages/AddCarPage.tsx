import React, { useState } from 'react';
import { Car, Image as ImageIcon, CheckCircle2, ChevronRight, Upload, X } from 'lucide-react';
import { RiyalSymbol } from '../components/ui/RiyalSymbol';
import { useTranslation } from 'react-i18next';

interface AddCarPageProps {
 onNavigate?: (page: string) => void;
}

export const AddCarPage: React.FC<AddCarPageProps> = ({ onNavigate }) => {
 const { t } = useTranslation();
 const [currentStep, setCurrentStep] = useState(1);
 const [formData, setFormData] = useState({
 make: '',
 model: '',
 year: '',
 price: '',
 description: '',
 images: [] as string[]
 });

 const handleNext = () => {
 if (currentStep < 3) {
 setCurrentStep(prev => prev + 1);
 window.scrollTo({ top: 0, behavior: 'smooth' });
 } else {
 alert(t('addCarPage.success'));
 onNavigate?.('home');
 }
 };

 const handleBack = () => {
 if (currentStep > 1) {
 setCurrentStep(prev => prev - 1);
 window.scrollTo({ top: 0, behavior: 'smooth' });
 } else {
 onNavigate?.('add-ad');
 }
 };

 const updateForm = (key: string, value: any) => {
 setFormData(prev => ({ ...prev, [key]: value }));
 };

 return (
 <div className="pt-40 pb-10 md:pt-48 md:pb-20 min-h-screen bg-[#F8FAFC]">
 <div className="container mx-auto px-4 max-w-3xl">
 {/* Header */}
 <div className="flex items-center gap-4 mb-8">
 <button 
 onClick={handleBack}
 className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
 >
 <ChevronRight size={24} />
 </button>
 <div>
 <h1 className="text-2xl font-bold text-[#2B3D50] font-['Noto_Kufi_Arabic']">{t('addCarPage.title')}</h1>
 <p className="text-gray-500 text-sm font-['Noto_Kufi_Arabic'] mt-1">{t('addCarPage.step', { current: currentStep })}</p>
 </div>
 </div>

 {/* Progress Bar */}
 <div className="w-full bg-gray-200 h-2 rounded-full mb-8 overflow-hidden">
 <div 
 className="bg-[#47CCD0] h-full transition-all duration-300"
 style={{ width: `${(currentStep / 3) * 100}%` }}
 />
 </div>

 {/* Content Area */}
 <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 animate-fade-up">
 {currentStep === 1 && (
 <div className="space-y-6">
 <h2 className="text-xl font-bold text-[#2B3D50] mb-4 font-['Noto_Kufi_Arabic'] flex items-center gap-2">
 <Car className="text-[#47CCD0]" />
 {t('addCarPage.carDetails')}
 </h2>
 
 <div className="grid md:grid-cols-2 gap-6">
 <div className="space-y-2">
 <label className="text-sm font-bold text-gray-700 font-['Noto_Kufi_Arabic']">{t('addCarPage.manufacturer')}</label>
 <input 
 type="text" 
 value={formData.make}
 onChange={(e) => updateForm('make', e.target.value)}
 placeholder={t('addCarPage.manufacturerPlaceholder')}
 className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] font-['Noto_Kufi_Arabic']"
 />
 </div>
 <div className="space-y-2">
 <label className="text-sm font-bold text-gray-700 font-['Noto_Kufi_Arabic']">{t('addCarPage.model')}</label>
 <input 
 type="text" 
 value={formData.model}
 onChange={(e) => updateForm('model', e.target.value)}
 placeholder={t('addCarPage.modelPlaceholder')}
 className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] font-['Noto_Kufi_Arabic']"
 />
 </div>
 <div className="space-y-2">
 <label className="text-sm font-bold text-gray-700 font-['Noto_Kufi_Arabic']">{t('addCarPage.year')}</label>
 <input 
 type="number" 
 min="0"
 value={formData.year}
 onChange={(e) => {
 let val = e.target.value;
 if (parseFloat(val) < 0) val = "0";
 updateForm('year', val);
 }}
 onKeyDown={(e) => { if (e.key === '-' || e.key === 'e') e.preventDefault(); }}
 placeholder={t('addCarPage.yearPlaceholder')}
 className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] font-['Noto_Kufi_Arabic']"
 />
 </div>
 <div className="space-y-2">
 <label className="text-sm font-bold text-gray-700 font-['Noto_Kufi_Arabic'] flex items-center gap-1">{t('addCarPage.price')} <RiyalSymbol className="w-3 h-3" /></label>
 <input 
 type="number" 
 min="0"
 value={formData.price}
 onChange={(e) => {
 let val = e.target.value;
 if (parseFloat(val) < 0) val = "0";
 updateForm('price', val);
 }}
 onKeyDown={(e) => { if (e.key === '-' || e.key === 'e') e.preventDefault(); }}
 placeholder={t('addCarPage.pricePlaceholder')}
 className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] font-['Noto_Kufi_Arabic']"
 />
 </div>
 </div>
 </div>
 )}

 {currentStep === 2 && (
 <div className="space-y-6">
 <h2 className="text-xl font-bold text-[#2B3D50] mb-4 font-['Noto_Kufi_Arabic'] flex items-center gap-2">
 <ImageIcon className="text-[#47CCD0]" />
 {t('addCarPage.photosAndDesc')}
 </h2>

 <div className="space-y-2">
 <label className="text-sm font-bold text-gray-700 font-['Noto_Kufi_Arabic']">{t('addCarPage.desc')}</label>
 <textarea 
 value={formData.description}
 onChange={(e) => updateForm('description', e.target.value)}
 placeholder={t('addCarPage.descPlaceholder')}
 rows={4}
 className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] font-['Noto_Kufi_Arabic'] resize-none"
 />
 </div>

 <div className="space-y-2">
 <label className="text-sm font-bold text-gray-700 font-['Noto_Kufi_Arabic']">{t('addCarPage.photos')}</label>
 <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#47CCD0] hover:bg-teal-50/30 transition-colors cursor-pointer group">
 <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#47CCD0] group-hover:text-white transition-colors">
 <Upload size={28} />
 </div>
 <p className="text-gray-600 font-['Noto_Kufi_Arabic'] font-bold mb-1">{t('addCarPage.clickToUpload')}</p>
 <p className="text-sm text-gray-400 font-['Noto_Kufi_Arabic']">{t('addCarPage.dragDrop')}</p>
 </div>
 </div>
 </div>
 )}

 {currentStep === 3 && (
 <div className="text-center py-10 space-y-6">
 <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-500 mb-6">
 <CheckCircle2 size={48} />
 </div>
 <h2 className="text-3xl font-bold text-[#2B3D50] font-['Noto_Kufi_Arabic']">{t('addCarPage.readyToPublish')}</h2>
 <p className="text-gray-500 font-['Noto_Kufi_Arabic'] max-w-md mx-auto">
 {t('addCarPage.readyDesc')}
 </p>
 </div>
 )}
 </div>

 {/* Footer Actions */}
 <div className="mt-8 flex items-center justify-between">
 {currentStep > 1 ? (
 <button 
 onClick={handleBack}
 className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-colors font-['Noto_Kufi_Arabic']"
 >
 {t('addCarPage.prev')}
 </button>
 ) : (
 <div />
 )}
 <button 
 onClick={handleNext}
 className="px-8 py-3 rounded-xl bg-[#47CCD0] text-white font-bold hover:bg-[#3bb0b4] transition-colors shadow-lg font-['Noto_Kufi_Arabic'] flex items-center gap-2"
 >
 {currentStep === 3 ? t('addCarPage.publish') : t('addCarPage.next')}
 {currentStep < 3 && <ChevronRight size={20} className="rotate-180" />}
 </button>
 </div>
 </div>
 </div>
 );
};
