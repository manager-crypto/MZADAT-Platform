import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  X,
  Building2,
  Key,
  Banknote,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Calculator,
  Briefcase,
  Wallet,
  Landmark
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { logger } from '../../utils/logger';
import { RiyalSymbol } from '../ui/RiyalSymbol';

interface FinanceEligibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyPrice: number;
}

type FinanceType = 'murabaha' | 'ijara' | 'personal';
type Step = 'input' | 'otp' | 'processing' | 'result';

export const FinanceEligibilityModal = ({ isOpen, onClose, propertyPrice }: FinanceEligibilityModalProps) => {
  const { t } = useTranslation();

  const banks = [
    { id: 'rajhi', name: t('financeModal.bankRajhi'), color: '#1A4F9C', textColor: 'text-white' },
    { id: 'snb', name: t('financeModal.bankSnb'), color: '#3A7D40', textColor: 'text-white' },
    { id: 'riyad', name: t('financeModal.bankRiyad'), color: '#005931', textColor: 'text-white' },
    { id: 'inma', name: t('financeModal.bankInma'), color: '#6F4E37', textColor: 'text-white' },
    { id: 'bilad', name: t('financeModal.bankBilad'), color: '#D68910', textColor: 'text-white' },
    { id: 'anb', name: t('financeModal.bankAnb'), color: '#006C35', textColor: 'text-white' },
  ];

  const [activeTab, setActiveTab] = useState<FinanceType>('murabaha');
  const [step, setStep] = useState<Step>('input');
  const [formData, setFormData] = useState({
    salary: '',
    obligations: '',
    sector: 'government',
    idNumber: '',
    phone: '',
    bankId: 'rajhi'
  });
  const [result, setResult] = useState<any>(null);

  if (!isOpen) return null;

  const handleCalculate = () => {
    if (!formData.salary || !formData.idNumber) return;
    setStep('otp');
  };

  const handleVerifyOtp = () => {
    setStep('processing');

    setTimeout(() => {
      const salary = parseInt(formData.salary);
      const obligations = parseInt(formData.obligations) || 0;
      const netSalary = salary - obligations;

      let maxLoan = 0;
      let eligible = false;

      if (activeTab === 'murabaha') {
        maxLoan = netSalary * 60;
      } else if (activeTab === 'ijara') {
        maxLoan = netSalary * 65;
      } else {
        maxLoan = netSalary * 18;
      }

      eligible = maxLoan >= (activeTab === 'personal' ? 50000 : propertyPrice * 0.8);

      setResult({
        eligible,
        maxLoan,
        monthlyInstallment: netSalary * 0.45,
        profitRate: 3.5
      });

      if (!eligible) {
        logger.trackPaymentEvent('FINANCE_EVAL', maxLoan, false, formData.bankId, 'User not eligible for required loan amount');
      } else {
        logger.info('Finance eligibility check completed successfully', { maxLoan, bankId: formData.bankId }, 'FinanceSystem');
      }

      setStep('result');
    }, 2000);
  };

  const reset = () => {
    setStep('input');
    setResult(null);
  };

  const selectedBank = banks.find(b => b.id === formData.bankId) || banks[0];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Calculator className="text-[#47CCD0]" />
              {t('financeModal.title')}
            </h2>
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              <CheckCircle2 size={12} className="text-green-500" />
              {t('financeModal.secureGateway')}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 pt-6">
          <div className="flex p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => { setActiveTab('murabaha'); reset(); }}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${activeTab === 'murabaha' ? 'bg-white text-[#47CCD0] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Building2 size={16} />
              {t('financeModal.tabMurabaha')}
            </button>
            <button
              onClick={() => { setActiveTab('ijara'); reset(); }}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${activeTab === 'ijara' ? 'bg-white text-[#47CCD0] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Key size={16} />
              {t('financeModal.tabIjara')}
            </button>
            <button
              onClick={() => { setActiveTab('personal'); reset(); }}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${activeTab === 'personal' ? 'bg-white text-[#47CCD0] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Banknote size={16} />
              {t('financeModal.tabPersonal')}
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          <AnimatePresence mode="wait">

            {/* STEP 1: INPUT */}
            {step === 'input' && (
              <motion.div
                key="input"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6">
                  <h4 className="font-bold text-blue-900 text-sm mb-2">{t('financeModal.proposedFinanceTitle')}</h4>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-700">{t('financeModal.targetPropertyValue')}</span>
                    <span className="font-mono font-bold text-blue-900 flex items-center gap-1">{propertyPrice.toLocaleString()} <RiyalSymbol className="w-3 h-3 text-blue-900" /></span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* Bank Selection */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <Landmark size={14} className="text-[#47CCD0]" />
                      {t('financeModal.bankLabel')}
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {banks.map((bank) => (
                        <button
                          key={bank.id}
                          onClick={() => setFormData({...formData, bankId: bank.id})}
                          className={`p-2 rounded-xl text-sm font-bold border transition-all flex items-center justify-center text-center h-12 ${formData.bankId === bank.id ? 'border-[#47CCD0] bg-[#47CCD0]/5 text-[#47CCD0] ring-1 ring-[#47CCD0]' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                        >
                          {bank.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('financeModal.salaryLabel')}</label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#47CCD0] focus:ring-2 focus:ring-[#47CCD0]/20 outline-none transition-all ps-12"
                        placeholder={t('financeModal.salaryPlaceholder')}
                        value={formData.salary}
                        onChange={(e) => {
                          let val = Number(e.target.value);
                          if (val < 0) val = 0;
                          setFormData({...formData, salary: val.toString()})
                        }}
                      />
                      <RiyalSymbol className="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('financeModal.obligationsLabel')}</label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#47CCD0] focus:ring-2 focus:ring-[#47CCD0]/20 outline-none transition-all ps-12"
                        placeholder={t('financeModal.obligationsPlaceholder')}
                        value={formData.obligations}
                        onChange={(e) => {
                          let val = Number(e.target.value);
                          if (val < 0) val = 0;
                          setFormData({...formData, obligations: val.toString()})
                        }}
                      />
                      <RiyalSymbol className="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('financeModal.sectorLabel')}</label>
                    <select
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#47CCD0] focus:ring-2 focus:ring-[#47CCD0]/20 outline-none transition-all bg-white"
                      value={formData.sector}
                      onChange={(e) => setFormData({...formData, sector: e.target.value})}
                    >
                      <option value="government">{t('financeModal.sectorGovernment')}</option>
                      <option value="private_listed">{t('financeModal.sectorPrivateListed')}</option>
                      <option value="private">{t('financeModal.sectorPrivate')}</option>
                      <option value="pensioner">{t('financeModal.sectorPensioner')}</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('financeModal.idLabel')}</label>
                    <input
                      type="text"
                      maxLength={10}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#47CCD0] focus:ring-2 focus:ring-[#47CCD0]/20 outline-none transition-all"
                      placeholder="1xxxxxxxxx"
                      value={formData.idNumber}
                      onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleCalculate}
                    className="w-full py-4 bg-[#47CCD0] hover:bg-[#3bb1b6] text-white rounded-xl font-bold shadow-lg shadow-[#47CCD0]/20 transition-all flex items-center justify-center gap-2"
                  >
                    {t('financeModal.checkEligibilityBtn')}
                    <ArrowLeft size={20} />
                  </button>
                  <p className="text-[10px] text-gray-400 text-center mt-3">
                    {t('financeModal.simahConsent')}
                  </p>
                </div>
              </motion.div>
            )}

            {/* STEP 2: OTP */}
            {step === 'otp' && (
               <motion.div
                 key="otp"
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 className="text-center py-8"
               >
                 <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#47CCD0]">
                    <Key size={32} />
                 </div>
                 <h3 className="text-xl font-bold text-gray-900 mb-2">{t('financeModal.otpTitle')}</h3>
                 <p className="text-gray-500 mb-6">{t('financeModal.otpSubtitle')}</p>

                 <div className="flex justify-center gap-2 mb-8 dir-ltr">
                    {[1,2,3,4].map((_, i) => (
                      <input
                        key={i}
                        type="text"
                        maxLength={1}
                        className="w-12 h-14 rounded-xl border-2 border-gray-200 text-center text-2xl font-bold focus:border-[#47CCD0] focus:ring-4 focus:ring-[#47CCD0]/10 outline-none transition-all"
                      />
                    ))}
                 </div>

                 <button
                    onClick={handleVerifyOtp}
                    className="w-full py-4 bg-[#47CCD0] hover:bg-[#3bb1b6] text-white rounded-xl font-bold shadow-lg shadow-[#47CCD0]/20 transition-all"
                  >
                    {t('financeModal.confirmBtn')}
                  </button>
               </motion.div>
            )}

            {/* STEP 3: PROCESSING */}
            {step === 'processing' && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <Loader2 size={48} className="text-[#47CCD0] animate-spin mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-1">{t('financeModal.processingTitle')} {selectedBank.name}...</h3>
                <p className="text-gray-400 text-sm">{t('financeModal.processingSubtitle')}</p>
              </motion.div>
            )}

            {/* STEP 4: RESULT */}
            {step === 'result' && result && (
               <motion.div
                 key="result"
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="text-center"
               >
                 {result.eligible ? (
                    <div className="space-y-6">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 animate-in zoom-in duration-300">
                        <CheckCircle2 size={40} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{t('financeModal.eligibleTitle')}</h3>
                        <p className="text-gray-500 flex items-center justify-center gap-1">
                            {t('financeModal.eligibleFromBank')}
                            <span className="font-bold" style={{color: selectedBank.color}}>{selectedBank.name}</span>
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                         <div className="grid grid-cols-2 gap-6 text-center">
                            <div>
                              <p className="text-xs text-gray-500 mb-1">{t('financeModal.maxFinanceLabel')}</p>
                              <p className="text-2xl font-bold text-[#47CCD0] font-mono flex items-center gap-1">{result.maxLoan.toLocaleString()} <RiyalSymbol className="w-4 h-4 text-gray-400" /></p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">{t('financeModal.monthlyInstallLabel')}</p>
                              <p className="text-xl font-bold text-gray-900 font-mono flex items-center gap-1">{result.monthlyInstallment.toLocaleString()} <RiyalSymbol className="w-4 h-4 text-gray-400" /></p>
                            </div>
                         </div>
                      </div>

                      {activeTab !== 'personal' && result.maxLoan < propertyPrice && (
                         <div className="bg-amber-50 text-amber-800 p-4 rounded-xl text-sm border border-amber-100 flex items-start gap-2 text-end">
                           <AlertCircle size={18} className="shrink-0 mt-0.5" />
                           <p className="flex items-center flex-wrap gap-1">{t('financeModal.downPaymentWarning')} <span className="font-bold font-mono flex items-center gap-1">{(propertyPrice - result.maxLoan).toLocaleString()} <RiyalSymbol className="w-3 h-3 text-red-700" /></span></p>
                         </div>
                      )}

                      <div className="flex gap-3">
                         <button
                            className="flex-1 py-3 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:opacity-90"
                            style={{ backgroundColor: selectedBank.color }}
                        >
                           {t('financeModal.applyViaBankBtn')} {selectedBank.name}
                         </button>
                         <button
                           onClick={reset}
                           className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-all"
                         >
                           {t('financeModal.newCalculationBtn')}
                         </button>
                      </div>
                    </div>
                 ) : (
                    <div className="space-y-6 py-4">
                       <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-600">
                        <X size={40} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{t('financeModal.notEligibleTitle')}</h3>
                        <p className="text-gray-500">{t('financeModal.notEligibleDesc')} {selectedBank.name} {t('financeModal.notEligibleForAmount')}</p>
                      </div>
                      <button
                         onClick={reset}
                         className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-all"
                       >
                         {t('financeModal.tryAgainBtn')}
                       </button>
                    </div>
                 )}
               </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

// Helper Icon
const ArrowLeft = ({ size, className }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 12H5"/>
    <path d="M12 19l-7-7 7-7"/>
  </svg>
);
