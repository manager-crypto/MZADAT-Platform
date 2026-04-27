import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  Check,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Fingerprint,
  Wallet,
  AlertCircle,
  ChevronDown
} from 'lucide-react';
import sarCurrency from 'figma:asset/3f649d4624729213a9513bf0153522436e1f6f47.png';
import { RiyalSymbol } from '../components/ui/RiyalSymbol';

import { PhoneInput } from '../components/ui/PhoneInput';

interface RegistrationFlowPageProps {
  onNavigate?: (page: string) => void;
}

export const RegistrationFlowPage: React.FC<RegistrationFlowPageProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  // Constants
  const depositAmount = 100000;

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Complete
      alert(t('registrationFlow.successAlert'));
      onNavigate?.('register-now');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      onNavigate?.('register-now');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="pt-36 pb-20 min-h-screen bg-[#F8FAFC] dark:bg-[#1e293b] transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-2xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-4">
            <button
                onClick={handleBack}
                className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-[#47CCD0] dark:hover:text-[#47CCD0] hover:border-[#47CCD0] dark:hover:border-[#47CCD0] transition-all shadow-sm"
            >
                <ArrowRight size={22} />
            </button>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('registrationFlow.pageTitle')}</h1>
        </div>

        {/* Progress Steps */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 mb-8">
          <div className="relative flex justify-between px-4">
            {/* Progress Bar Line */}
            <div className="absolute top-[22px] start-10 end-10 h-[3px] bg-gray-100 dark:bg-gray-700 -z-0">
               <div
                 className="h-full bg-[#47CCD0] dark:bg-[#47CCD0] transition-all duration-500 ease-out"
                 style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
               ></div>
            </div>

            {/* Steps */}
            {[
              { id: 1, label: t('registrationFlow.stepPersonalInfo'), icon: <UserStepIcon active={currentStep >= 1} /> },
              { id: 2, label: t('registrationFlow.stepVerification'), icon: <OtpStepIcon active={currentStep >= 2} /> },
              { id: 3, label: t('registrationFlow.stepPayDeposit'), icon: <PaymentStepIcon active={currentStep >= 3} /> },
            ].map((step) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                    currentStep >= step.id
                      ? 'bg-[#47CCD0] dark:bg-[#47CCD0] border-[#47CCD0] dark:border-[#47CCD0] text-white shadow-lg shadow-teal-500/20'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-300 dark:text-gray-500'
                  }`}
                >
                  {currentStep > step.id ? <Check size={22} /> : step.icon}
                </div>
                <span className={`text-sm font-bold transition-colors ${currentStep >= step.id ? 'text-[#47CCD0] dark:text-[#47CCD0]' : 'text-gray-300 dark:text-gray-500'}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[500px] flex flex-col">

          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <div className="space-y-8 flex-1 flex flex-col justify-center">
              <div className="text-center mb-4">
                <div className="w-20 h-20 bg-teal-50/50 dark:bg-teal-900/30 rounded-3xl flex items-center justify-center text-[#47CCD0] dark:text-[#47CCD0] mx-auto mb-6">
                  <Smartphone size={40} strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('registrationFlow.step1Title')}</h2>
                <p className="text-gray-500 dark:text-gray-400">{t('registrationFlow.step1Subtitle')}</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-gray-200 mb-3">{t('registrationFlow.phoneLabel')}</label>
                <PhoneInput
                  containerClassName="h-16 bg-[#F9FAFB] dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus-within:border-[#47CCD0] dark:focus-within:border-[#47CCD0] focus-within:ring-4 focus-within:ring-[#47CCD0]/10 dark:focus-within:ring-[#47CCD0]/10 transition-all"
                  className="h-full bg-transparent outline-none rounded-2xl text-xl font-mono text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600"
                  value={phoneNumber}
                  onChange={(e: any) => setPhoneNumber(e.target.value)}
                />
              </div>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-100 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white dark:bg-gray-800 px-4 text-gray-400 dark:text-gray-500 font-medium">{t('registrationFlow.orDivider')}</span>
                </div>
              </div>

              <button className="w-full h-16 bg-[#1e293b] dark:bg-[#47CCD0] text-white dark:text-gray-900 rounded-2xl font-bold hover:bg-[#0f172a] dark:hover:bg-[#3bb1b7] transition-all flex items-center justify-center gap-3 shadow-lg shadow-gray-900/10 dark:shadow-none active:scale-[0.99]">
                 <Fingerprint size={24} />
                 <span className="text-lg">{t('registrationFlow.nafathLogin')}</span>
              </button>

              <div className="mt-4">
                 <button
                   onClick={handleNext}
                   className="w-full h-16 bg-[#47CCD0] dark:bg-[#2B3D50] text-white rounded-2xl font-bold text-lg hover:bg-[#3bb1b7] dark:hover:bg-[#1a2b3c] transition-all shadow-lg shadow-teal-500/20 dark:shadow-none active:scale-[0.99]"
                 >
                   {t('registrationFlow.continueBtn')}
                 </button>
              </div>
            </div>
          )}

          {/* Step 2: OTP */}
          {currentStep === 2 && (
            <div className="space-y-8 flex-1 flex flex-col justify-center">
               <div className="text-center mb-4">
                <div className="w-20 h-20 bg-teal-50/50 dark:bg-teal-900/30 rounded-3xl flex items-center justify-center text-[#47CCD0] dark:text-[#47CCD0] mx-auto mb-6">
                  <ShieldCheck size={40} strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('registrationFlow.step2Title')}</h2>
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  {t('registrationFlow.step2Subtitle')}
                  <br/>
                  <span className="font-mono text-gray-900 dark:text-white font-bold mt-2 inline-block dir-ltr text-xl" dir="ltr">+966 {phoneNumber || '5XXXXXXXX'}</span>
                </p>
              </div>

              <div className="flex justify-center gap-4 my-6" dir="ltr">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-20 h-20 bg-[#F9FAFB] dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-center text-3xl font-bold text-gray-900 dark:text-white focus:border-[#47CCD0] dark:focus:border-[#47CCD0] focus:ring-4 focus:ring-[#47CCD0]/10 dark:focus:ring-[#47CCD0]/10 transition-all outline-none"
                  />
                ))}
              </div>

              <div className="text-center text-gray-500 dark:text-gray-400 text-lg">
                {t('registrationFlow.otpNotReceived')} <button className="text-[#47CCD0] dark:text-[#47CCD0] font-bold hover:underline">{t('registrationFlow.resendOtp')}</button> <span className="font-mono">(00:45)</span>
              </div>

              <div className="mt-8">
                 <button
                   onClick={handleNext}
                   className="w-full h-16 bg-[#47CCD0] dark:bg-[#47CCD0] text-white dark:text-gray-900 rounded-2xl font-bold text-lg hover:bg-[#3bb1b7] dark:hover:bg-[#3bb1b7] transition-all shadow-lg shadow-teal-500/20 dark:shadow-none active:scale-[0.99]"
                 >
                   {t('registrationFlow.verifyBtn')}
                 </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <div className="space-y-8 flex-1 flex flex-col justify-center">
              <div className="text-center mb-4">
                <div className="w-20 h-20 bg-teal-50/50 dark:bg-teal-900/30 rounded-3xl flex items-center justify-center text-[#47CCD0] dark:text-[#47CCD0] mx-auto mb-6">
                  <Wallet size={40} strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('registrationFlow.step3Title')}</h2>
                <p className="text-gray-500 dark:text-gray-400">{t('registrationFlow.step3Subtitle')}</p>
              </div>

              {/* Amount Card */}
              <div className="bg-[#F0FDFA] dark:bg-teal-900/20 border border-[#CCFBF1] dark:border-teal-800/50 rounded-3xl p-8 text-center mb-2">
                <p className="text-teal-800 dark:text-teal-300 font-bold mb-4">{t('registrationFlow.amountDue')}</p>
                <div className="flex items-center justify-center gap-3 text-5xl font-bold text-[#47CCD0] dark:text-[#47CCD0] font-mono tracking-tight">
                  {depositAmount.toLocaleString()} <RiyalSymbol className="w-8 h-8 text-[#47CCD0]/70 dark:text-[#47CCD0]/70" />
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-gray-200 mb-4">{t('registrationFlow.selectPaymentMethod')}</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setSelectedPayment('apple')}
                    className={`h-20 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all ${selectedPayment === 'apple' ? 'border-[#47CCD0] dark:border-[#47CCD0] bg-teal-50/30 dark:bg-teal-900/30 ring-2 ring-[#47CCD0]/20 dark:ring-[#47CCD0]/20' : 'border-gray-100 dark:border-gray-700 bg-[#F9FAFB] dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 text-gray-900 dark:text-white'}`}
                  >
                     <span className="font-bold tracking-tight text-xl"> Pay</span>
                  </button>
                  <button
                    onClick={() => setSelectedPayment('card')}
                    className={`h-20 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all ${selectedPayment === 'card' ? 'border-[#47CCD0] dark:border-[#47CCD0] bg-teal-50/30 dark:bg-teal-900/30 ring-2 ring-[#47CCD0]/20 dark:ring-[#47CCD0]/20' : 'border-gray-100 dark:border-gray-700 bg-[#F9FAFB] dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 text-gray-900 dark:text-white'}`}
                  >
                     <div className="flex items-center gap-2">
                        <CreditCard size={20} />
                        <span className="text-sm font-bold">{t('registrationFlow.bankCard')}</span>
                     </div>
                  </button>
                </div>
              </div>

              {/* Secure Badge */}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-400 py-2">
                <ShieldCheck size={16} className="text-[#47CCD0] dark:text-[#47CCD0]" />
                <span>{t('registrationFlow.securePayment')}</span>
              </div>

              <div className="mt-4">
                 <button
                   onClick={handleNext}
                   disabled={!selectedPayment}
                   className="w-full h-16 bg-[#47CCD0] dark:bg-[#47CCD0] text-white dark:text-gray-900 rounded-2xl font-bold text-lg hover:bg-[#3bb1b7] dark:hover:bg-[#3bb1b7] transition-all shadow-lg shadow-teal-500/20 dark:shadow-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
                 >
                   {t('registrationFlow.completePaymentBtn')}
                 </button>
              </div>
            </div>
          )}

        </div>

        <div className="text-center mt-8 text-sm text-gray-400 font-medium">
           {t('registrationFlow.copyright')}
        </div>

      </div>
    </div>
  );
};

// Helper Icons
const UserStepIcon = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const OtpStepIcon = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const PaymentStepIcon = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
);
