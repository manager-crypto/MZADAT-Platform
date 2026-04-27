import React, { useState } from 'react';
import {
  Handshake,
  FileSignature,
  Megaphone,
  BadgeCheck,
  Building2,
  ArrowLeft,
  BookOpen,
  AlertCircle,
  Briefcase
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BrokerageGuidePageProps {
  onNavigate?: (page: string) => void;
}

export const BrokerageGuidePage: React.FC<BrokerageGuidePageProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

  const steps = [
    {
      id: 1,
      title: t('brokerageGuide.step1Title'),
      desc: t('brokerageGuide.step1Desc'),
      icon: <FileSignature size={24} />,
      color: "bg-blue-50 text-blue-600 border-blue-100"
    },
    {
      id: 2,
      title: t('brokerageGuide.step2Title'),
      desc: t('brokerageGuide.step2Desc'),
      icon: <Building2 size={24} />,
      color: "bg-purple-50 text-purple-600 border-purple-100"
    },
    {
      id: 3,
      title: t('brokerageGuide.step3Title'),
      desc: t('brokerageGuide.step3Desc'),
      icon: <Handshake size={24} />,
      color: "bg-[#47CCD0]/10 text-[#47CCD0] border-[#47CCD0]/20"
    },
    {
      id: 4,
      title: t('brokerageGuide.step4Title'),
      desc: t('brokerageGuide.step4Desc'),
      icon: <Megaphone size={24} />,
      color: "bg-green-50 text-green-600 border-green-100"
    },
    {
      id: 5,
      title: t('brokerageGuide.step5Title'),
      desc: t('brokerageGuide.step5Desc'),
      icon: <BadgeCheck size={24} />,
      color: "bg-orange-50 text-orange-600 border-orange-100"
    }
  ];

  const terms = [
    t('brokerageGuide.term1'),
    t('brokerageGuide.term2'),
    t('brokerageGuide.term3'),
    t('brokerageGuide.term4'),
    t('brokerageGuide.term5'),
    t('brokerageGuide.term6'),
    t('brokerageGuide.term7')
  ];

  return (
    <div className="pt-36 pb-20 min-h-screen bg-[#F8FAFC]">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
              onClick={() => onNavigate?.('home')}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#47CCD0] hover:border-[#47CCD0] transition-all shadow-sm"
          >
              <ArrowLeft size={22} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('brokerageGuide.title')}</h1>
            <p className="text-gray-500 mt-1">{t('brokerageGuide.subtitle')}</p>
          </div>
        </div>

        {/* Steps Section */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8 animate-fade-up">
          <div className="flex items-center gap-3 mb-8">
             <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-[#47CCD0]">
               <Briefcase size={20} />
             </div>
             <h2 className="text-xl font-bold text-gray-900">{t('brokerageGuide.mechanismTitle')}</h2>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-8 end-8 bottom-8 w-0.5 bg-gray-100 hidden md:block"></div>

            <div className="space-y-8 relative">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col md:flex-row gap-6 relative">
                  {/* Icon Bubble */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 z-10 border-2 shadow-sm ${step.color} bg-white`}>
                    {step.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 text-xs flex items-center justify-center font-mono">
                        {index + 1}
                      </span>
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Terms Section */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
               <AlertCircle size={20} />
             </div>
             <h2 className="text-xl font-bold text-gray-900">{t('brokerageGuide.termsTitle')}</h2>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <ul className="space-y-4">
              {terms.map((term, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#47CCD0] mt-2 flex-shrink-0"></span>
                  {term}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => onNavigate?.('request-brokerage')}
              className="px-8 py-3 bg-[#47CCD0] text-white rounded-xl font-bold hover:bg-[#3bb1b7] transition-all shadow-lg shadow-teal-500/20 flex items-center gap-2"
            >
              <FileSignature size={20} />
              {t('brokerageGuide.requestService')}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
