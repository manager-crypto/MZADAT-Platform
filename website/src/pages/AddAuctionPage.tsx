import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ArrowRight, 
  Check, 
  Gavel, 
  Clock, 
  Calendar,
  DollarSign, 
  FileText,
  AlertCircle,
  Upload,
  ShieldCheck,
  Building2,
  Car,
  Package
} from 'lucide-react';
import { RiyalSymbol } from '../components/ui/RiyalSymbol';
import personImage from 'figma:asset/12e4927068bfa4d6d7d02d08e05baa6297fe91f3.png';
import auctionImage from 'figma:asset/9e185068aed0ec71a303c8b7e7720bfe7568bc93.png';

interface AddAuctionPageProps {
  onNavigate?: (page: string) => void;
}

export const AddAuctionPage: React.FC<AddAuctionPageProps> = ({ onNavigate }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    type: 'public',
    category: '',
    title: '',
    description: '',
    startPrice: '',
    minIncrement: '',
    startDate: '',
    endDate: '',
  });

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Submit
      alert(t('addAuctionPage.successMsg'));
      onNavigate?.('home');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      onNavigate?.('home');
    }
  };

  return (
    <div className={`pt-40 pb-10 md:pt-48 md:pb-20 min-h-screen bg-[#F8FAFC] font-['${isRTL ? 'Noto_Kufi_Arabic' : 'Helvetica'}']`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4 md:mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{t('addAuctionPage.pageTitle')}</h1>
          <div className="flex items-center gap-4">
            <button 
                onClick={handleBack}
                className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#47CCD0] hover:border-[#47CCD0] transition-all shadow-sm"
            >
                <ArrowRight size={22} className={isRTL ? '' : 'rotate-180'} />
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-3xl p-4 md:p-8 shadow-sm border border-gray-100 mb-6 md:mb-8">
          <div className="relative flex justify-between px-4">
            {/* Progress Bar Line */}
            <div className="absolute top-[22px] start-10 end-10 h-[3px] bg-gray-100 -z-0">
               <div 
                 className="h-full bg-[#47CCD0] transition-all duration-500 ease-out"
                 style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
               ></div>
            </div>

            {/* Steps */}
            {[
              { id: 1, label: t('addAuctionPage.steps.type'), icon: <Gavel size={20} /> },
              { id: 2, label: t('addAuctionPage.steps.details'), icon: <FileText size={20} /> },
              { id: 3, label: t('addAuctionPage.steps.timing'), icon: <Clock size={20} /> },
              { id: 4, label: t('addAuctionPage.steps.confirm'), icon: <ShieldCheck size={20} /> },
            ].map((step) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                    currentStep >= step.id 
                      ? 'bg-[#47CCD0] border-[#47CCD0] text-white shadow-lg shadow-teal-500/20' 
                      : 'bg-white border-gray-200 text-gray-300'
                  }`}
                >
                  {currentStep > step.id ? <Check size={22} /> : step.icon}
                </div>
                <span className={`text-sm font-bold transition-colors ${currentStep >= step.id ? 'text-[#47CCD0]' : 'text-gray-300'}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-8 md:p-12 animate-fade-up min-h-[400px] flex flex-col">
          
          {/* Step 1: Auction Type */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('addAuctionPage.step1Title')}</h2>
                <p className="text-gray-500">{t('addAuctionPage.step1Desc')}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left side - Image Section with Animation */}
                <div className="hidden md:block relative">
                  <div className="relative bg-white">
                    {/* Person Image */}
                    <div className="relative p-6">
                      <img 
                        src={auctionImage} 
                        alt="Auction Consultant" 
                        className="w-full h-auto relative z-10"
                      />
                      
                      {/* Floating Icons with Animation */}
                      <div className={`absolute top-12 ${isRTL ? 'start-8' : 'end-8'} w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-float`}>
                        <Gavel size={28} className="text-[#47CCD0]" />
                      </div>
                      
                      <div className={`absolute top-24 ${isRTL ? 'end-8' : 'start-8'} w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-float-delay-1`}>
                        <Clock size={28} className="text-[#47CCD0]" />
                      </div>
                      
                      <div className={`absolute bottom-32 ${isRTL ? 'start-12' : 'end-12'} w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-float-delay-2`}>
                        <DollarSign size={28} className="text-[#47CCD0]" />
                      </div>
                      
                      <div className={`absolute bottom-24 ${isRTL ? 'end-12' : 'start-12'} w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-float-delay-3`}>
                        <ShieldCheck size={28} className="text-[#47CCD0]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side - Options */}
                <div className="space-y-8">
                   {/* Auction Types */}
                   <div className="space-y-4">
                       <h3 className="text-lg font-bold text-gray-900">{t('addAuctionPage.auctionTypeLabel')}</h3>
                       <div className="grid grid-cols-1 gap-4">
                          {[
                            { id: 'public', label: t('addAuctionPage.types.public'), desc: t('addAuctionPage.types.publicDesc') },
                            { id: 'sealed', label: t('addAuctionPage.types.sealed'), desc: t('addAuctionPage.types.sealedDesc') },
                            { id: 'private', label: t('addAuctionPage.types.private'), desc: t('addAuctionPage.types.privateDesc') },
                          ].map((type) => (
                            <button
                              key={type.id}
                              onClick={() => setFormData({ ...formData, type: type.id })}
                              className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${isRTL ? 'text-end' : 'text-start'} group ${
                                formData.type === type.id
                                  ? 'border-[#47CCD0] bg-teal-50/50 ring-2 ring-[#47CCD0]/20'
                                  : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                              }`}
                            >
                              <div className={`w-14 h-14 flex-shrink-0 rounded-full flex items-center justify-center transition-colors ${
                                formData.type === type.id ? 'bg-[#47CCD0] text-white' : 'bg-gray-100 text-gray-500'
                              }`}>
                                <Gavel size={24} />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-bold text-gray-900 group-hover:text-[#47CCD0] transition-colors">{type.label}</h4>
                                <p className="text-sm text-gray-400">{type.desc}</p>
                              </div>
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                  formData.type === type.id ? 'border-[#47CCD0]' : 'border-gray-300'
                              }`}>
                                  {formData.type === type.id && <div className="w-3 h-3 bg-[#47CCD0] rounded-full" />}
                              </div>
                            </button>
                          ))}
                       </div>
                   </div>

                   {/* Categories */}
                   <div className="space-y-4">
                       <h3 className="text-lg font-bold text-gray-900">{t('addAuctionPage.categoryLabel')}</h3>
                       <div className="flex flex-wrap gap-3">
                          {[
                            { id: 'real-estate', label: t('addAuctionPage.categories.realEstate'), icon: <Building2 size={18} /> },
                            { id: 'cars', label: t('addAuctionPage.categories.cars'), icon: <Car size={18} /> },
                            { id: 'other', label: t('addAuctionPage.categories.other'), icon: <Package size={18} /> },
                          ].map((cat) => (
                            <button
                              key={cat.id}
                              onClick={() => setFormData({ ...formData, category: cat.id })}
                              className={`flex items-center gap-2 px-5 py-3 rounded-xl border transition-all ${
                                formData.category === cat.id
                                  ? 'border-[#47CCD0] bg-[#47CCD0] text-white shadow-lg shadow-teal-500/20'
                                  : 'border-gray-200 text-gray-600 hover:border-[#47CCD0] hover:text-[#47CCD0]'
                              }`}
                            >
                              {cat.icon}
                              <span className="font-bold text-sm">{cat.label}</span>
                            </button>
                          ))}
                       </div>
                   </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('addAuctionPage.step2Title')}</h2>
                <p className="text-gray-500">{t('addAuctionPage.step2Desc')}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Right side - Form (Visually Right in RTL) */}
                <div className="space-y-6 flex flex-col justify-center order-1 md:order-none">
                  <div>
                    <label className={`block text-sm font-bold text-gray-900 mb-3 ${isRTL ? 'text-end' : 'text-start'}`}>{t('addAuctionPage.titleLabel')}</label>
                    <input 
                      type="text" 
                      placeholder={t('addAuctionPage.titlePlaceholder')}
                      className={`w-full h-14 bg-gray-50 border border-gray-100 rounded-xl px-4 text-gray-900 placeholder-gray-400 focus:border-[#47CCD0] focus:ring-4 focus:ring-[#47CCD0]/10 transition-all outline-none ${isRTL ? 'text-end' : 'text-start'}`}
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>

                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-gray-300 rounded-[28px] p-10 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer group min-h-[220px]">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-6 group-hover:bg-[#47CCD0] group-hover:text-white transition-all">
                      <Upload size={28} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{t('addAuctionPage.uploadTitle')}</h3>
                    <p className="text-gray-400 text-xs text-center" dir="ltr">{t('addAuctionPage.uploadDesc')}</p>
                  </div>
                </div>

                {/* Left side - Description (Visually Left in RTL) */}
                <div className="flex flex-col h-full order-2 md:order-none">
                  <label className={`block text-sm font-bold text-gray-900 mb-3 ${isRTL ? 'text-end' : 'text-start'}`}>{t('addAuctionPage.descLabel')}</label>
                  <textarea 
                    placeholder={t('addAuctionPage.descPlaceholder')}
                    className={`w-full h-full min-h-[312px] bg-gray-50 border border-gray-100 rounded-[28px] p-6 text-gray-900 placeholder-gray-400 focus:border-[#47CCD0] focus:ring-4 focus:ring-[#47CCD0]/10 transition-all outline-none ${isRTL ? 'text-end' : 'text-start'} resize-none`}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Pricing & Timing */}
          {currentStep === 3 && (
            <div className="space-y-8 flex flex-col items-center">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center text-[#47CCD0] mx-auto mb-6">
                   <Clock size={36} />
                </div>
                <h2 className="text-[28px] font-bold text-gray-900 mb-3">{t('addAuctionPage.step3Title')}</h2>
                <p className="text-gray-500 text-lg">{t('addAuctionPage.step3Desc')}</p>
              </div>

              <div className="w-full max-w-3xl">
                <div className="bg-white border-2 border-gray-100 rounded-[32px] p-8 md:p-10 space-y-8 shadow-sm">
                  {/* Prices Section */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-[#47CCD0]">
                         <DollarSign size={20} />
                       </div>
                       {t('addAuctionPage.pricingSettings')}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <label className={`block text-sm font-bold text-gray-900 mb-3 ${isRTL ? 'text-end' : 'text-start'}`}>{t('addAuctionPage.startPriceLabel')}</label>
                        <div className="relative">
                          <input 
                            type="number" 
                            min="0"
                            placeholder="0"
                            className={`w-full h-14 bg-gray-50 border border-gray-100 rounded-xl px-4 text-gray-900 placeholder-gray-400 focus:border-[#47CCD0] focus:ring-4 focus:ring-[#47CCD0]/10 transition-all outline-none font-mono text-lg ${isRTL ? 'text-end pe-12' : 'text-start ps-12'}`}
                            value={formData.startPrice}
                            onChange={(e) => {
                              let val = e.target.value;
                              if (parseFloat(val) < 0) val = "0";
                              setFormData({ ...formData, startPrice: val });
                            }}
                            onKeyDown={(e) => { if (e.key === '-' || e.key === 'e') e.preventDefault(); }}
                          />
                          <div className={`absolute ${isRTL ? 'start-4' : 'end-4'} top-1/2 -translate-y-1/2`}><RiyalSymbol className="w-5 h-5 text-gray-400" /></div>
                        </div>
                      </div>

                      <div>
                        <label className={`block text-sm font-bold text-gray-900 mb-3 ${isRTL ? 'text-end' : 'text-start'}`}>{t('addAuctionPage.minIncrementLabel')}</label>
                        <div className="relative">
                          <input 
                            type="number" 
                            min="0"
                            placeholder="0"
                            className={`w-full h-14 bg-gray-50 border border-gray-100 rounded-xl px-4 text-gray-900 placeholder-gray-400 focus:border-[#47CCD0] focus:ring-4 focus:ring-[#47CCD0]/10 transition-all outline-none font-mono text-lg ${isRTL ? 'text-end pe-12' : 'text-start ps-12'}`}
                            value={formData.minIncrement}
                            onChange={(e) => {
                              let val = e.target.value;
                              if (parseFloat(val) < 0) val = "0";
                              setFormData({ ...formData, minIncrement: val });
                            }}
                            onKeyDown={(e) => { if (e.key === '-' || e.key === 'e') e.preventDefault(); }}
                          />
                          <div className={`absolute ${isRTL ? 'start-4' : 'end-4'} top-1/2 -translate-y-1/2`}><RiyalSymbol className="w-5 h-5 text-gray-400" /></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-gray-100 w-full"></div>

                  {/* Timing Section */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-[#47CCD0]">
                         <Calendar size={20} />
                       </div>
                       {t('addAuctionPage.timingSettings')}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <label className={`block text-sm font-bold text-gray-900 mb-3 ${isRTL ? 'text-end' : 'text-start'}`}>{t('addAuctionPage.startDateLabel')}</label>
                        <div className="relative">
                          <input 
                            type="datetime-local" 
                            className={`w-full h-14 bg-gray-50 border border-gray-100 rounded-xl px-4 text-gray-900 placeholder-gray-400 focus:border-[#47CCD0] focus:ring-4 focus:ring-[#47CCD0]/10 transition-all outline-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer font-sans ${isRTL ? 'text-end' : 'text-start'}`}
                            value={formData.startDate}
                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                          />
                          <div className={`absolute ${isRTL ? 'start-4' : 'end-4'} top-1/2 -translate-y-1/2 pointer-events-none`}>
                            <Calendar className="w-5 h-5 text-[#47CCD0]" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className={`block text-sm font-bold text-gray-900 mb-3 ${isRTL ? 'text-end' : 'text-start'}`}>{t('addAuctionPage.endDateLabel')}</label>
                        <div className="relative">
                          <input 
                            type="datetime-local" 
                            className={`w-full h-14 bg-gray-50 border border-gray-100 rounded-xl px-4 text-gray-900 placeholder-gray-400 focus:border-[#47CCD0] focus:ring-4 focus:ring-[#47CCD0]/10 transition-all outline-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer font-sans ${isRTL ? 'text-end' : 'text-start'}`}
                            value={formData.endDate}
                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                          />
                          <div className={`absolute ${isRTL ? 'start-4' : 'end-4'} top-1/2 -translate-y-1/2 pointer-events-none`}>
                            <Calendar className="w-5 h-5 text-[#47CCD0]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50/80 p-5 rounded-2xl border border-orange-100/50 flex gap-4 text-sm text-orange-800 mt-6 max-w-3xl mx-auto shadow-sm">
                  <AlertCircle size={24} className="flex-shrink-0 text-orange-500 mt-0.5" />
                  <p className="leading-relaxed text-[15px] font-medium">{t('addAuctionPage.timingNotice')}</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="space-y-8 flex flex-col items-center">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center text-[#47CCD0] mx-auto mb-6 relative">
                   <ShieldCheck size={48} className="relative z-10" />
                   <div className="absolute inset-0 bg-[#47CCD0]/20 rounded-full animate-ping opacity-75"></div>
                </div>
                <h2 className="text-[28px] font-bold text-gray-900 mb-3">{t('addAuctionPage.step4Title')}</h2>
                <p className="text-gray-500 text-lg">{t('addAuctionPage.step4Desc')}</p>
              </div>

              <div className="w-full max-w-2xl bg-white border-2 border-gray-100 rounded-[32px] p-8 md:p-10 shadow-sm space-y-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-8 border-b border-gray-100 gap-6">
                   <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-teal-50 rounded-full flex items-center justify-center shadow-sm text-[#47CCD0]">
                         <Gavel size={28} />
                      </div>
                      <div className={isRTL ? 'text-end' : 'text-start'}>
                         <p className="text-sm text-gray-500 mb-1.5 font-medium">{t('addAuctionPage.confirmTypeLabel')}</p>
                         <p className="font-bold text-gray-900 text-xl">{formData.type === 'public' ? t('addAuctionPage.types.public') : formData.type === 'sealed' ? t('addAuctionPage.types.sealed') : t('addAuctionPage.types.private')}</p>
                      </div>
                   </div>
                   <div className={`bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100 min-w-[140px] ${isRTL ? 'text-end' : 'text-start'}`}>
                      <p className="text-sm text-gray-500 mb-1 font-medium">{t('addAuctionPage.confirmCategoryLabel')}</p>
                      <p className="font-bold text-[#47CCD0] text-lg flex items-center gap-2">
                        {formData.category === 'real-estate' ? <Building2 size={18} /> : formData.category === 'cars' ? <Car size={18} /> : <Package size={18} />}
                        {formData.category === 'real-estate' ? t('addAuctionPage.categories.realEstate') : formData.category === 'cars' ? t('addAuctionPage.categories.cars') : t('addAuctionPage.categories.other')}
                      </p>
                   </div>
                </div>

                <div className={`pb-8 border-b border-gray-100 ${isRTL ? 'text-end' : 'text-start'}`}>
                   <p className="text-sm text-gray-500 mb-2 font-medium">{t('addAuctionPage.confirmTitleLabel')}</p>
                   <p className="font-bold text-gray-900 text-xl leading-relaxed">{formData.title || t('addAuctionPage.noTitle')}</p>
                </div>

                <div className={`pb-8 border-b border-gray-100 ${isRTL ? 'text-end' : 'text-start'}`}>
                   <p className="text-sm text-gray-500 mb-2 font-medium">{t('addAuctionPage.confirmDescLabel')}</p>
                   <p className="text-gray-700 text-base leading-relaxed bg-gray-50 p-5 rounded-2xl border border-gray-100 min-h-[100px]">
                     {formData.description || t('addAuctionPage.noDesc')}
                   </p>
                </div>

                <div className="grid grid-cols-2 gap-8 pb-8 border-b border-gray-100">
                   <div className={`bg-gray-50/50 p-5 rounded-2xl border border-gray-100 ${isRTL ? 'text-end' : 'text-start'}`}>
                      <p className="text-sm text-gray-500 mb-2 font-medium">{t('addAuctionPage.confirmStartPriceLabel')}</p>
                      <p className="font-bold text-[#47CCD0] font-mono text-2xl flex items-center gap-1.5">{formData.startPrice ? parseInt(formData.startPrice).toLocaleString() : '0'} <RiyalSymbol className="w-5 h-5 text-[#47CCD0]" /></p>
                   </div>
                   <div className={`bg-gray-50/50 p-5 rounded-2xl border border-gray-100 ${isRTL ? 'text-end' : 'text-start'}`}>
                      <p className="text-sm text-gray-500 mb-2 font-medium">{t('addAuctionPage.confirmMinIncrementLabel')}</p>
                      <p className="font-bold text-gray-900 font-mono text-2xl flex items-center gap-1.5">{formData.minIncrement ? parseInt(formData.minIncrement).toLocaleString() : '0'} <RiyalSymbol className="w-5 h-5 text-gray-500" /></p>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                   <div className={isRTL ? 'text-end' : 'text-start'}>
                      <p className="text-sm text-gray-500 mb-2 font-medium">{t('addAuctionPage.confirmStartDateLabel')}</p>
                      <p className="font-bold text-gray-900 text-[15px] bg-gray-50 py-3 px-4 rounded-xl border border-gray-100" dir="ltr">{formData.startDate ? new Date(formData.startDate).toLocaleString(isRTL ? 'ar-SA' : 'en-US', { dateStyle: 'medium', timeStyle: 'short' }) : t('addAuctionPage.notSpecified')}</p>
                   </div>
                   <div className={isRTL ? 'text-end' : 'text-start'}>
                      <p className="text-sm text-gray-500 mb-2 font-medium">{t('addAuctionPage.confirmEndDateLabel')}</p>
                      <p className="font-bold text-gray-900 text-[15px] bg-gray-50 py-3 px-4 rounded-xl border border-gray-100" dir="ltr">{formData.endDate ? new Date(formData.endDate).toLocaleString(isRTL ? 'ar-SA' : 'en-US', { dateStyle: 'medium', timeStyle: 'short' }) : t('addAuctionPage.notSpecified')}</p>
                   </div>
                </div>
              </div>
              
              <label htmlFor="agree" className="w-full max-w-2xl flex items-start gap-4 mt-2 bg-white border-2 border-gray-100 p-6 rounded-2xl cursor-pointer hover:border-[#47CCD0] hover:shadow-md transition-all group">
                <input type="checkbox" id="agree" className="w-6 h-6 text-[#47CCD0] rounded-lg border-gray-300 focus:ring-[#47CCD0] mt-0.5 transition-colors" />
                <span className={`text-[15px] text-gray-600 leading-relaxed font-medium select-none group-hover:text-gray-900 transition-colors ${isRTL ? 'text-end' : 'text-start'}`}>
                  {t('addAuctionPage.agreementText')}
                </span>
              </label>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-auto pt-10 flex gap-4">
            <button 
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`flex-1 h-[60px] rounded-xl font-bold border-2 border-gray-100 text-gray-700 bg-white hover:bg-gray-50 transition-all text-[17px] ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {t('addAuctionPage.prevBtn')}
            </button>
            <button 
              onClick={handleNext}
              disabled={currentStep === 1 && !formData.category}
              className="flex-1 h-[60px] bg-[#47CCD0] text-white rounded-xl font-bold hover:bg-[#3bb1b7] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-[17px]"
            >
              {currentStep === 4 ? t('addAuctionPage.submitBtn') : t('addAuctionPage.nextBtn')}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};