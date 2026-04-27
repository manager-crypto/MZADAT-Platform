import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Search, Shield, CheckCircle2, XCircle, QrCode, Fingerprint,
  FileText, User, Building, DollarSign, ArrowRight, ArrowLeft,
  MapPin, Check, Plus, Package
} from 'lucide-react';

const saudiProfessionalImg = "https://images.unsplash.com/photo-1721899311824-5b75161a82fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXVkaSUyMHByb2Zlc3Npb25hbCUyMGJ1c2luZXNzJTIwb2ZmaWNlJTIwbW9kZXJufGVufDF8fHx8MTc3MzY5MDEwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

// Define strict Typography classes
const typography = {
  h1: "text-[50pt] font-light leading-tight font-['Noto_Kufi_Arabic'] text-[#2B3D50]",
  h2: "text-[30pt] font-light leading-snug font-['Noto_Kufi_Arabic'] text-[#2B3D50]",
  body: "text-[9.5pt] font-light font-['Noto_Kufi_Arabic'] text-[#000000]",
  h1En: "text-[50pt] font-light leading-tight font-['Helvetica'] text-[#2B3D50]",
  h2En: "text-[30pt] font-light leading-snug font-['Helvetica'] text-[#2B3D50]",
  bodyEn: "text-[9.5pt] font-light font-['Helvetica'] text-[#000000]"
};

export const BrokerDashboardPage = () => {
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [contractStep, setContractStep] = useState(1);

  // Example data for Advertising Licenses — property names are i18n keys
  const advertisingLicenses = [
    { id: 'ADV-2026-1001', propertyKey: 'brokerDashboard.license1Property', status: 'active', issueDate: '2026-02-15' },
    { id: 'ADV-2026-1002', propertyKey: 'brokerDashboard.license2Property', status: 'cancelled', issueDate: '2026-01-20' },
    { id: 'ADV-2026-1003', propertyKey: 'brokerDashboard.license3Property', status: 'active', issueDate: '2026-03-01' },
  ];

  // Stepper labels as i18n keys
  const contractSteps = [
    { step: 1, labelKey: 'brokerDashboard.stepTitleDeed', icon: FileText },
    { step: 2, labelKey: 'brokerDashboard.stepRepresentative', icon: User },
    { step: 3, labelKey: 'brokerDashboard.stepPropertySpecs', icon: Building },
    { step: 4, labelKey: 'brokerDashboard.stepCommission', icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#000000] selection:bg-[#2B3D50] selection:text-white">

      {/* HEADER / NAVIGATION */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-[#2B3D50] tracking-tight uppercase font-['Helvetica']">MZADAT</span>
              <span className="text-[11px] font-normal tracking-wide text-gray-500 font-['Helvetica']">easy bidding</span>
            </div>
          </div>

          {/* Verification Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={t('brokerDashboard.searchPlaceholder')}
                className={`w-full h-12 pe-12 ps-4 rounded-full border border-gray-200 bg-[#F9FAFB] focus:bg-white focus:border-[#2B3D50] outline-none transition-all ${typography.body}`}
              />
              <Search className="absolute end-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <button className={`absolute start-2 top-1/2 -translate-y-1/2 bg-[#2B3D50] text-white px-4 py-1.5 rounded-full hover:bg-black transition-colors ${typography.body} text-xs`}>
                {t('brokerDashboard.verifyBtn')}
              </button>
            </div>
          </div>

          {/* Nafath Authentication Toggle */}
          <div className="flex items-center gap-4">
            {!isAuthenticated ? (
              <button
                onClick={() => setIsAuthenticated(true)}
                className={`flex items-center gap-2 bg-[#2B3D50] text-white px-6 py-2.5 rounded-full hover:bg-black transition-all shadow-md ${typography.body}`}
              >
                <Fingerprint size={18} />
                <span>{t('brokerDashboard.nafathLogin')}</span>
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className={`font-medium text-[#2B3D50] ${typography.body}`}>{t('brokerDashboard.brokerName')}</span>
                  <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                    <Shield size={10} /> {t('brokerDashboard.certifiedByRea')}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#2B3D50] flex items-center justify-center text-white font-bold cursor-pointer" onClick={() => setIsAuthenticated(false)}>
                  {t('brokerDashboard.brokerInitial')}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden p-4 border-t border-gray-100 bg-[#F9FAFB]">
          <div className="relative w-full">
            <input
              type="text"
              placeholder={t('brokerDashboard.mobileSearchPlaceholder')}
              className={`w-full h-12 pe-10 ps-4 rounded-xl border border-gray-200 bg-white focus:border-[#2B3D50] outline-none transition-all ${typography.body}`}
            />
            <Search className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main>
        {!isAuthenticated ? (
          /* ================= LANDING PAGE (Unauthenticated) ================= */
          <div className="animate-in fade-in duration-700">
            {/* Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div className="space-y-8 text-end">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-[#2B3D50] text-sm mb-4 border border-blue-100">
                      <Shield size={16} />
                      <span className="font-['Noto_Kufi_Arabic']">{t('brokerDashboard.heroCompliance')}</span>
                    </div>

                    <h1 className={typography.h1}>
                      {t('brokerDashboard.heroTitle')}
                    </h1>

                    <h2 className={`${typography.h2} text-gray-500 max-w-lg`}>
                      {t('brokerDashboard.heroSubtitle')}
                    </h2>

                    <div className="pt-6 flex flex-wrap gap-4">
                      <button
                        onClick={() => setIsAuthenticated(true)}
                        className="flex items-center justify-center gap-3 bg-[#2B3D50] text-white px-8 py-4 rounded-xl hover:bg-black transition-all shadow-xl hover:shadow-2xl font-['Noto_Kufi_Arabic'] text-[15px] group w-full sm:w-auto"
                      >
                        <Fingerprint size={24} className="group-hover:scale-110 transition-transform" />
                        {t('brokerDashboard.loginViaNafath')}
                      </button>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#2B3D50]/10 to-transparent rounded-3xl transform rotate-3 scale-105 blur-xl"></div>
                    <img
                      src={saudiProfessionalImg}
                      alt="Saudi Real Estate Professional"
                      className="relative z-10 rounded-3xl shadow-2xl object-cover h-[500px] w-full border-4 border-white"
                    />
                    {/* Floating Badge */}
                    <div className="absolute -bottom-6 -end-6 z-20 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                        <CheckCircle2 size={24} />
                      </div>
                      <div>
                        <div className="font-bold text-[#2B3D50] font-['Noto_Kufi_Arabic']">{t('brokerDashboard.badgeInstantVerify')}</div>
                        <div className={`${typography.body} text-gray-500`}>{t('brokerDashboard.badgeViaNafath')}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Auction Packages Section */}
            <section className="py-24 bg-[#F9FAFB]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 space-y-4">
                  <h2 className={typography.h2}>{t('brokerDashboard.packagesTitle')}</h2>
                  <p className={`${typography.body} text-gray-500 max-w-2xl mx-auto`}>
                    {t('brokerDashboard.packagesSubtitle')}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  {/* Package 1 */}
                  <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 end-0 w-32 h-32 bg-[#2B3D50]/5 rounded-es-full -z-10 group-hover:bg-[#2B3D50]/10 transition-colors"></div>
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6">
                      <Package className="text-[#2B3D50]" size={28} />
                    </div>
                    <h3 className="text-2xl font-bold font-['Noto_Kufi_Arabic'] text-[#2B3D50] mb-2">{t('brokerDashboard.pkg1Name')}</h3>
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-[40px] font-light font-['Helvetica'] text-[#2B3D50]">50</span>
                      <span className={`${typography.body} text-gray-500`}>{t('brokerDashboard.licenseUnit')}</span>
                    </div>
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3">
                        <Check className="text-emerald-500" size={18} />
                        <span className={typography.body}>{t('brokerDashboard.pkg1Cost')}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="text-emerald-500" size={18} />
                        <span className={typography.body}>{t('brokerDashboard.instantQrActivation')}</span>
                      </div>
                    </div>
                    <button className="w-full py-4 rounded-xl border-2 border-[#2B3D50] text-[#2B3D50] font-bold font-['Noto_Kufi_Arabic'] hover:bg-[#2B3D50] hover:text-white transition-colors">
                      {t('brokerDashboard.buyPackage')}
                    </button>
                  </div>

                  {/* Package 2 */}
                  <div className="bg-[#2B3D50] rounded-3xl p-8 shadow-2xl relative overflow-hidden transform md:-translate-y-4">
                    <div className="absolute top-4 start-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full font-['Noto_Kufi_Arabic']">
                      {t('brokerDashboard.mostPopular')}
                    </div>
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                      <Package className="text-white" size={28} />
                    </div>
                    <h3 className="text-2xl font-bold font-['Noto_Kufi_Arabic'] text-white mb-2">{t('brokerDashboard.pkg2Name')}</h3>
                    <div className="flex items-baseline gap-2 mb-6 text-white">
                      <span className="text-[40px] font-light font-['Helvetica']">150</span>
                      <span className={`${typography.body} text-gray-300`}>{t('brokerDashboard.licenseUnit')}</span>
                    </div>
                    <div className="space-y-4 mb-8 text-white/90">
                      <div className="flex items-center gap-3">
                        <Check className="text-emerald-400" size={18} />
                        <span className={typography.body}>{t('brokerDashboard.pkg2Cost')}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="text-emerald-400" size={18} />
                        <span className={typography.body}>{t('brokerDashboard.instantQrActivation')}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="text-emerald-400" size={18} />
                        <span className={typography.body}>{t('brokerDashboard.support247')}</span>
                      </div>
                    </div>
                    <button className="w-full py-4 rounded-xl bg-white text-[#2B3D50] font-bold font-['Noto_Kufi_Arabic'] hover:bg-gray-100 transition-colors">
                      {t('brokerDashboard.buyPackage')}
                    </button>
                  </div>

                  {/* Package 3 */}
                  <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 end-0 w-32 h-32 bg-[#2B3D50]/5 rounded-es-full -z-10 group-hover:bg-[#2B3D50]/10 transition-colors"></div>
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6">
                      <Package className="text-[#2B3D50]" size={28} />
                    </div>
                    <h3 className="text-2xl font-bold font-['Noto_Kufi_Arabic'] text-[#2B3D50] mb-2">{t('brokerDashboard.pkg3Name')}</h3>
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-[40px] font-light font-['Helvetica'] text-[#2B3D50]">250</span>
                      <span className={`${typography.body} text-gray-500`}>{t('brokerDashboard.licenseUnit')}</span>
                    </div>
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3">
                        <Check className="text-emerald-500" size={18} />
                        <span className={typography.body}>{t('brokerDashboard.pkg3Cost')}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="text-emerald-500" size={18} />
                        <span className={typography.body}>{t('brokerDashboard.instantQrActivation')}</span>
                      </div>
                    </div>
                    <button className="w-full py-4 rounded-xl border-2 border-[#2B3D50] text-[#2B3D50] font-bold font-['Noto_Kufi_Arabic'] hover:bg-[#2B3D50] hover:text-white transition-colors">
                      {t('brokerDashboard.buyPackage')}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : (
          /* ================= BROKER DASHBOARD (Authenticated) ================= */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in zoom-in-95 duration-500">
            <div className="flex flex-col md:flex-row gap-8">

              {/* Sidebar */}
              <aside className="w-full md:w-64 shrink-0 space-y-2">
                <div className="bg-[#2B3D50] text-white p-6 rounded-2xl mb-6 shadow-lg">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold font-['Noto_Kufi_Arabic']">{t('brokerDashboard.licenseBalance')}</span>
                    <Package size={20} className="text-white/60" />
                  </div>
                  <div className="text-4xl font-light font-['Helvetica']">124</div>
                  <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                    <span className="text-xs text-white/70">{t('brokerDashboard.upgradePackage')}</span>
                    <button className="text-xs font-bold bg-white text-[#2B3D50] px-3 py-1 rounded-full">{t('brokerDashboard.buyBtn')}</button>
                  </div>
                </div>

                <button className="w-full flex items-center gap-3 px-4 py-3 bg-white text-[#2B3D50] rounded-xl font-bold font-['Noto_Kufi_Arabic'] shadow-sm border border-gray-100">
                  <FileText size={18} />
                  <span>{t('brokerDashboard.auctionContracts')}</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-white hover:text-[#2B3D50] rounded-xl transition-colors font-['Noto_Kufi_Arabic']">
                  <QrCode size={18} />
                  <span>{t('brokerDashboard.advertisingLicenses')}</span>
                </button>
              </aside>

              {/* Main Content Area */}
              <div className="flex-1 space-y-8">

                {/* SECTION 1: Real Estate Advertising Licenses */}
                <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-6">
                    <div>
                      <h2 className={`${typography.h2} text-xl md:text-2xl font-medium mb-1`}>{t('brokerDashboard.adLicensesTitle')}</h2>
                      <p className={`${typography.body} text-gray-500`}>{t('brokerDashboard.adLicensesSubtitle')}</p>
                    </div>
                    <button className="bg-[#2B3D50] text-white px-5 py-2.5 rounded-xl font-['Noto_Kufi_Arabic'] text-sm flex items-center gap-2 hover:bg-black transition-colors">
                      <Plus size={18} />
                      {t('brokerDashboard.newLicenseBtn')}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {advertisingLicenses.map((license, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-2xl p-5 hover:border-[#2B3D50]/30 transition-colors bg-[#F9FAFB]">
                        <div className="flex justify-between items-start mb-4">
                          <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                            license.status === 'active'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-red-100 text-red-700'
                          }`}>
                            {license.status === 'active' ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                            {license.status === 'active' ? t('brokerDashboard.statusActive') : t('brokerDashboard.statusCancelled')}
                          </div>
                          <span className="text-[11px] text-gray-500 font-['Helvetica']">{license.id}</span>
                        </div>

                        <div className="flex gap-4 items-center">
                          {/* Mandatory QR Code field with dynamic status color */}
                          <div className={`w-20 h-20 p-2 rounded-xl border-2 flex items-center justify-center bg-white ${
                            license.status === 'active' ? 'border-emerald-400 text-emerald-600' : 'border-red-400 text-red-600'
                          }`}>
                            <QrCode size={48} className="stroke-1" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-[#2B3D50] font-['Noto_Kufi_Arabic'] text-sm mb-1">{t(license.propertyKey)}</h4>
                            <p className={`${typography.body} text-gray-500 mb-2`}>{t('brokerDashboard.issueDate')}: {license.issueDate}</p>
                            <button className="text-xs text-[#2B3D50] font-bold underline decoration-dotted">
                              {t('brokerDashboard.viewDetails')}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* SECTION 2: Real Estate Auction Contracts Form */}
                <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                  <div className="mb-8 border-b border-gray-100 pb-6">
                    <h2 className={`${typography.h2} text-xl md:text-2xl font-medium mb-1`}>{t('brokerDashboard.contractFormTitle')}</h2>
                    <p className={`${typography.body} text-gray-500`}>{t('brokerDashboard.contractFormSubtitle')}</p>
                  </div>

                  {/* Form Stepper */}
                  <div className="flex items-center justify-between mb-10 relative">
                    <div className="absolute top-1/2 start-0 end-0 h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>
                    <div className="absolute top-1/2 start-0 end-0 h-0.5 bg-[#2B3D50] -translate-y-1/2 z-0 transition-all duration-500"
                         style={{ width: `${((contractStep - 1) / 3) * 100}%` }}></div>

                    {contractSteps.map((s) => (
                      <div key={s.step} className="relative z-10 flex flex-col items-center gap-2">
                        <button
                          onClick={() => setContractStep(s.step)}
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                            contractStep >= s.step
                            ? 'bg-[#2B3D50] text-white shadow-lg'
                            : 'bg-white border-2 border-gray-200 text-gray-400'
                          }`}
                        >
                          <s.icon size={20} />
                        </button>
                        <span className={`text-[11px] font-bold font-['Noto_Kufi_Arabic'] hidden sm:block ${
                          contractStep >= s.step ? 'text-[#2B3D50]' : 'text-gray-400'
                        }`}>
                          {t(s.labelKey)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Form Content */}
                  <div className="min-h-[300px] mb-8">

                    {/* STEP 1: Title Deed Info */}
                    {contractStep === 1 && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-end-4">
                        <h3 className="text-lg font-bold font-['Noto_Kufi_Arabic'] text-[#2B3D50] mb-4">{t('brokerDashboard.step1Heading')}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className={`block mb-2 font-medium ${typography.body}`}>{t('brokerDashboard.deedNumber')}</label>
                            <input type="text" className="w-full p-4 rounded-xl border border-gray-200 bg-[#F9FAFB] focus:border-[#2B3D50] focus:bg-white outline-none font-['Helvetica']" placeholder="1234567890" />
                          </div>
                          <div>
                            <label className={`block mb-2 font-medium ${typography.body}`}>{t('brokerDashboard.deedDate')}</label>
                            <input type="date" className="w-full p-4 rounded-xl border border-gray-200 bg-[#F9FAFB] focus:border-[#2B3D50] focus:bg-white outline-none font-['Helvetica']" />
                          </div>
                          <div className="md:col-span-2">
                            <label className={`block mb-2 font-medium ${typography.body}`}>{t('brokerDashboard.deedIssuer')}</label>
                            <input type="text" className="w-full p-4 rounded-xl border border-gray-200 bg-[#F9FAFB] focus:border-[#2B3D50] focus:bg-white outline-none font-['Noto_Kufi_Arabic'] text-[13px]" placeholder={t('brokerDashboard.deedIssuerPlaceholder')} />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: Representative Details */}
                    {contractStep === 2 && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-end-4">
                        <h3 className="text-lg font-bold font-['Noto_Kufi_Arabic'] text-[#2B3D50] mb-4">{t('brokerDashboard.step2Heading')}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className={`block mb-2 font-medium ${typography.body}`}>{t('brokerDashboard.repName')}</label>
                            <input type="text" className="w-full p-4 rounded-xl border border-gray-200 bg-[#F9FAFB] focus:border-[#2B3D50] focus:bg-white outline-none font-['Noto_Kufi_Arabic'] text-[13px]" placeholder={t('brokerDashboard.repNamePlaceholder')} />
                          </div>
                          <div>
                            <label className={`block mb-2 font-medium ${typography.body}`}>{t('brokerDashboard.nationalId')}</label>
                            <input type="text" className="w-full p-4 rounded-xl border border-gray-200 bg-[#F9FAFB] focus:border-[#2B3D50] focus:bg-white outline-none font-['Helvetica']" placeholder="10xxxxxxxxx" maxLength={10} />
                          </div>
                          <div className="md:col-span-2">
                            <label className={`block mb-2 font-medium ${typography.body}`}>{t('brokerDashboard.repRole')}</label>
                            <select className="w-full p-4 rounded-xl border border-gray-200 bg-[#F9FAFB] focus:border-[#2B3D50] focus:bg-white outline-none font-['Noto_Kufi_Arabic'] text-[13px]">
                              <option>{t('brokerDashboard.roleOwner')}</option>
                              <option>{t('brokerDashboard.roleLegalAgent')}</option>
                              <option>{t('brokerDashboard.roleCompanyDelegate')}</option>
                              <option>{t('brokerDashboard.roleJudicialGuardian')}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 3: Property Specs */}
                    {contractStep === 3 && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-end-4">
                        <h3 className="text-lg font-bold font-['Noto_Kufi_Arabic'] text-[#2B3D50] mb-4">{t('brokerDashboard.step3Heading')}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className={`block mb-2 font-medium ${typography.body}`}>{t('brokerDashboard.propertyType')}</label>
                            <select className="w-full p-4 rounded-xl border border-gray-200 bg-[#F9FAFB] focus:border-[#2B3D50] focus:bg-white outline-none font-['Noto_Kufi_Arabic'] text-[13px]">
                              <option>{t('brokerDashboard.typeCommercialLand')}</option>
                              <option>{t('brokerDashboard.typeResidentialLand')}</option>
                              <option>{t('brokerDashboard.typeVilla')}</option>
                              <option>{t('brokerDashboard.typeApartmentBuilding')}</option>
                              <option>{t('brokerDashboard.typeWarehouse')}</option>
                            </select>
                          </div>
                          <div>
                            <label className={`block mb-2 font-medium ${typography.body}`}>{t('brokerDashboard.areaSqm')}</label>
                            <input type="number" className="w-full p-4 rounded-xl border border-gray-200 bg-[#F9FAFB] focus:border-[#2B3D50] focus:bg-white outline-none font-['Helvetica']" placeholder={t('brokerDashboard.areaSqmPlaceholder')} />
                          </div>
                          <div className="md:col-span-2 grid grid-cols-2 gap-6">
                            <div>
                              <label className={`block mb-2 font-medium ${typography.body}`}>{t('brokerDashboard.city')}</label>
                              <input type="text" className="w-full p-4 rounded-xl border border-gray-200 bg-[#F9FAFB] focus:border-[#2B3D50] focus:bg-white outline-none font-['Noto_Kufi_Arabic'] text-[13px]" placeholder={t('brokerDashboard.cityPlaceholder')} />
                            </div>
                            <div>
                              <label className={`block mb-2 font-medium ${typography.body}`}>{t('brokerDashboard.district')}</label>
                              <input type="text" className="w-full p-4 rounded-xl border border-gray-200 bg-[#F9FAFB] focus:border-[#2B3D50] focus:bg-white outline-none font-['Noto_Kufi_Arabic'] text-[13px]" placeholder={t('brokerDashboard.districtPlaceholder')} />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 4: Broker Commission */}
                    {contractStep === 4 && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-end-4">
                        <h3 className="text-lg font-bold font-['Noto_Kufi_Arabic'] text-[#2B3D50] mb-4">{t('brokerDashboard.step4Heading')}</h3>
                        <div className="grid grid-cols-1 gap-6">
                          <div className="flex items-center gap-4 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                            <Shield className="text-[#2B3D50] shrink-0" />
                            <p className={`${typography.body} text-gray-700 leading-relaxed`}>
                              {t('brokerDashboard.commissionNote')}
                            </p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className={`block mb-2 font-medium ${typography.body}`}>{t('brokerDashboard.commissionRate')}</label>
                              <input type="number" step="0.1" max="2.5" className="w-full p-4 rounded-xl border border-gray-200 bg-[#F9FAFB] focus:border-[#2B3D50] focus:bg-white outline-none font-['Helvetica'] text-lg text-[#2B3D50]" defaultValue="2.5" />
                            </div>
                            <div>
                              <label className={`block mb-2 font-medium ${typography.body}`}>{t('brokerDashboard.paidBy')}</label>
                              <select className="w-full p-4 rounded-xl border border-gray-200 bg-[#F9FAFB] focus:border-[#2B3D50] focus:bg-white outline-none font-['Noto_Kufi_Arabic'] text-[13px]">
                                <option>{t('brokerDashboard.paidByBuyer')}</option>
                                <option>{t('brokerDashboard.paidBySeller')}</option>
                                <option>{t('brokerDashboard.paidByBoth')}</option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <label className={`block mb-2 font-medium ${typography.body}`}>{t('brokerDashboard.additionalTerms')}</label>
                            <textarea className="w-full p-4 rounded-xl border border-gray-200 bg-[#F9FAFB] focus:border-[#2B3D50] focus:bg-white outline-none font-['Noto_Kufi_Arabic'] text-[13px] min-h-[100px]" placeholder={t('brokerDashboard.additionalTermsPlaceholder')}></textarea>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Form Actions */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <button
                      onClick={() => setContractStep(prev => Math.max(1, prev - 1))}
                      disabled={contractStep === 1}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold font-['Noto_Kufi_Arabic'] transition-all ${
                        contractStep === 1
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-[#2B3D50] bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <ArrowRight size={18} />
                      {t('brokerDashboard.prevBtn')}
                    </button>

                    {contractStep < 4 ? (
                      <button
                        onClick={() => setContractStep(prev => Math.min(4, prev + 1))}
                        className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold font-['Noto_Kufi_Arabic'] bg-[#2B3D50] text-white hover:bg-black transition-all shadow-md"
                      >
                        {t('brokerDashboard.nextBtn')}
                        <ArrowLeft size={18} />
                      </button>
                    ) : (
                      <button
                        className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold font-['Noto_Kufi_Arabic'] bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-md"
                      >
                        <CheckCircle2 size={18} />
                        {t('brokerDashboard.issueContractBtn')}
                      </button>
                    )}
                  </div>
                </section>

              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
