import React from 'react';
import { useTranslation } from 'react-i18next';
import {
 Brain,
 TrendingUp,
 Target,
 ShieldCheck,
 PieChart,
 FileText,
 Zap,
 MessageSquare,
 Sparkles,
 ArrowRight,
 Calculator,
 Briefcase,
 CheckCircle,
 Calendar,
 UserCircle
} from 'lucide-react';
import { RiyalSymbol } from '../ui/RiyalSymbol';

interface SmartManagementContentProps {
 role: 'admin' | 'individual' | 'corporate' | 'broker';
}

export const SmartManagementContent: React.FC<SmartManagementContentProps> = ({ role }) => {
 const { t } = useTranslation();
 const isCorporate = role === 'corporate' || role === 'broker';

 const marketInsights = [
 { labelKey: 'smartMgmt.insightCommercialRE', trend: '+5.2%', status: 'up' },
 { labelKey: 'smartMgmt.insightLuxuryCars', trend: '-1.8%', status: 'down' },
 { labelKey: 'smartMgmt.insightRawLand', trend: '+12%', status: 'up' },
 ];

 const serviceCards = [
 { titleKey: 'smartMgmt.svcFinanceCalc', icon: Calculator, color: 'text-blue-600', bg: 'bg-blue-50' },
 { titleKey: 'smartMgmt.svcVerifyDeed', icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-50' },
 { titleKey: 'smartMgmt.svcUpdateProfile', icon: UserCircle, color: 'text-purple-600', bg: 'bg-purple-50' },
 { titleKey: 'smartMgmt.svcBookInspection', icon: Calendar, color: 'text-orange-600', bg: 'bg-orange-50' },
 ];

 const requestSteps = [
 { step: 1, labelKey: 'smartMgmt.stepSubmitRequest', active: true },
 { step: 2, labelKey: 'smartMgmt.stepInitialApproval', active: true },
 { step: 3, labelKey: 'smartMgmt.stepPayDeposit', active: true },
 { step: 4, labelKey: 'smartMgmt.stepSignContract', active: false },
 { step: 5, labelKey: 'smartMgmt.stepTransfer', active: false },
 ];

 return (
 <div className="space-y-8 animate-fade-up">
 {/* Header Section */}
 <div className="bg-[#2B3D50] rounded-3xl p-8 relative overflow-hidden shadow-xl">
 <div className="absolute top-0 end-0 w-64 h-64 bg-[#47CCD0]/10 rounded-full blur-3xl -me-10 -mt-10"></div>
 <div className="relative z-10 text-white">
 <div className="flex items-center gap-3 mb-4">
 <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-[#47CCD0] border border-white/5">
 <Brain size={24} />
 </div>
 <span className="bg-[#47CCD0] text-[#2B3D50] text-xs font-bold px-3 py-1 rounded-full">{t('smartMgmt.headerBadge')}</span>
 </div>
 <h2 className="text-3xl font-black mb-2 font-serif">{t('smartMgmt.pageTitle')}</h2>
 <p className="text-gray-300 max-w-xl text-sm leading-relaxed">
 {isCorporate ? t('smartMgmt.pageSubtitleCorporate') : t('smartMgmt.pageSubtitleIndividual')}
 </p>
 </div>
 </div>

 {isCorporate ? (
 // === CORPORATE CONTENT ===
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 {/* Main AI Tools */}
 <div className="lg:col-span-2 space-y-6">
 <div className="bg-white p-6 rounded-2xl border border-gray-200/60 shadow-sm hover:border-[#47CCD0]/50 transition-all group cursor-pointer">
 <div className="flex justify-between items-start mb-4">
 <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
 <PieChart size={24} />
 </div>
 <ArrowRight size={20} className="text-gray-300 group-hover:text-[#47CCD0] -rotate-45 transition-colors" />
 </div>
 <h3 className="text-lg font-bold text-[#2B3D50] mb-2">{t('smartMgmt.corpPortfolioTitle')}</h3>
 <p className="text-gray-500 text-sm mb-4">{t('smartMgmt.corpPortfolioDesc')}</p>
 <div className="flex gap-2">
 <span className="px-2 py-1 bg-gray-50 text-gray-500 text-[10px] font-bold rounded-md">{t('smartMgmt.corpTagRisk')}</span>
 <span className="px-2 py-1 bg-gray-50 text-gray-500 text-[10px] font-bold rounded-md">{t('smartMgmt.corpTagAsset')}</span>
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className="bg-white p-6 rounded-2xl border border-gray-200/60 shadow-sm hover:border-[#47CCD0]/50 transition-all group cursor-pointer">
 <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
 <FileText size={20} />
 </div>
 <h3 className="font-bold text-[#2B3D50] mb-1">{t('smartMgmt.corpAutoReportTitle')}</h3>
 <p className="text-xs text-gray-400">{t('smartMgmt.corpAutoReportDesc')}</p>
 </div>
 <div className="bg-white p-6 rounded-2xl border border-gray-200/60 shadow-sm hover:border-[#47CCD0]/50 transition-all group cursor-pointer">
 <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
 <Calculator size={20} />
 </div>
 <h3 className="font-bold text-[#2B3D50] mb-1">{t('smartMgmt.corpLiquidityTitle')}</h3>
 <p className="text-xs text-gray-400">{t('smartMgmt.corpLiquidityDesc')}</p>
 </div>
 </div>
 </div>

 {/* Side Panel: Insights */}
 <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-gray-200/60">
 <h3 className="font-bold text-[#2B3D50] flex items-center gap-2 mb-6">
 <Sparkles size={18} className="text-[#47CCD0]" />
 {t('smartMgmt.corpMarketInsights')}
 </h3>
 <div className="space-y-4">
 {marketInsights.map((item, idx) => (
 <div key={idx} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
 <span className="text-sm font-bold text-gray-700">{t(item.labelKey)}</span>
 <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.status === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'} flex items-center gap-1`}>
 {item.status === 'up' ? <TrendingUp size={10} /> : <TrendingUp size={10} className="rotate-180" />}
 {item.trend}
 </span>
 </div>
 ))}
 </div>
 <button className="w-full mt-6 py-3 bg-[#2B3D50] text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors">
 {t('smartMgmt.corpViewFullReport')}
 </button>
 </div>
 </div>
 ) : (
 // === INDIVIDUAL CONTENT - Sakani Inspired Style ===
 <div className="space-y-8">

 {/* 1. User Profile & Status Card */}
 <div className="bg-white rounded-2xl border border-gray-200/60 p-6 shadow-sm relative overflow-hidden">
 <div className="absolute top-0 start-0 w-1 h-full bg-[#2B3D50]"></div>
 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
 <div className="flex items-center gap-4">
 <div className="w-16 h-16 rounded-full bg-gray-100 p-1 border-2 border-[#47CCD0]/30">
 <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" className="w-full h-full rounded-full object-cover" />
 </div>
 <div>
 <h3 className="text-xl font-bold text-[#2B3D50] flex items-center gap-2">
 {t('smartMgmt.indGreeting')}
 <span className="bg-[#47CCD0]/10 text-[#47CCD0] text-[10px] px-2 py-0.5 rounded-full border border-[#47CCD0]/20">{t('smartMgmt.indMembership')}</span>
 </h3>
 <p className="text-sm text-gray-500 mt-1">{t('smartMgmt.indLastLogin')}</p>
 </div>
 </div>

 <div className="flex gap-4 w-full md:w-auto">
 <div className="flex-1 md:flex-none bg-gray-50 px-6 py-3 rounded-xl border border-gray-100 text-center">
 <p className="text-xs text-gray-400 mb-1">{t('smartMgmt.indEligibilityLabel')}</p>
 <p className="text-sm font-bold text-green-600 flex items-center justify-center gap-1">
 <ShieldCheck size={16} /> {t('smartMgmt.indEligibilityValue')}
 </p>
 </div>
 <div className="flex-1 md:flex-none bg-gray-50 px-6 py-3 rounded-xl border border-gray-100 text-center">
 <p className="text-xs text-gray-400 mb-1">{t('smartMgmt.indPurchasePowerLabel')}</p>
 <p className="text-sm font-bold text-[#2B3D50] flex items-center gap-1 justify-center">2,500,000 <RiyalSymbol className="w-3 h-3 text-[#2B3D50]" /></p>
 </div>
 </div>
 </div>

 {/* Progress Stepper */}
 <div className="mt-8 pt-6 border-t border-gray-100">
 <p className="text-sm font-bold text-[#2B3D50] mb-4">{t('smartMgmt.indCurrentRequestLabel')} <span className="text-[#47CCD0]">{t('smartMgmt.indCurrentRequestValue')}</span></p>
 <div className="relative flex items-center justify-between">
 <div className="absolute top-1/2 start-0 w-full h-1 bg-gray-100 -z-10 -translate-y-1/2 rounded-full"></div>
 <div className="absolute top-1/2 end-0 w-2/3 h-1 bg-[#2B3D50] -z-10 -translate-y-1/2 rounded-full transition-all duration-1000"></div>

 {requestSteps.map((s) => (
 <div key={s.step} className="flex flex-col items-center gap-2 bg-white px-2">
 <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
 s.active
 ? 'bg-[#2B3D50] border-[#2B3D50] text-white'
 : 'bg-white border-gray-200 text-gray-400'
 }`}>
 {s.active ? <CheckCircle size={14} /> : s.step}
 </div>
 <span className={`text-[10px] font-bold ${s.active ? 'text-[#2B3D50]' : 'text-gray-400'}`}>{t(s.labelKey)}</span>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* 2. Services Grid (Sakani Style) */}
 <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
 {/* Main Advisor Card */}
 <div className="md:col-span-2 bg-[#2B3D50] rounded-2xl p-6 text-white relative overflow-hidden group cursor-pointer">
 <div className="absolute top-0 end-0 w-32 h-32 bg-[#47CCD0]/20 rounded-full blur-2xl -me-10 -mt-10"></div>
 <div className="relative z-10 h-full flex flex-col justify-between">
 <div>
 <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center text-[#47CCD0] mb-4 border border-white/5">
 <Sparkles size={20} />
 </div>
 <h3 className="text-xl font-bold mb-2">{t('smartMgmt.indAdvisorTitle')}</h3>
 <p className="text-gray-300 text-sm leading-relaxed mb-4">
 {t('smartMgmt.indAdvisorDesc')}
 </p>
 </div>
 <button className="flex items-center gap-2 text-[#47CCD0] font-bold text-sm hover:gap-3 transition-all">
 {t('smartMgmt.indAdvisorCta')} <ArrowRight size={16} className="rotate-180" />
 </button>
 </div>
 </div>

 {/* Service Cards */}
 {serviceCards.map((service, idx) => (
 <button key={idx} className="bg-white p-6 rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-md hover:border-[#47CCD0]/30 transition-all flex flex-col items-center justify-center text-center group">
 <div className={`w-12 h-12 rounded-xl ${service.bg} flex items-center justify-center ${service.color} mb-4 group-hover:scale-110 transition-transform`}>
 <service.icon size={24} />
 </div>
 <h4 className="font-bold text-[#2B3D50] text-sm group-hover:text-[#47CCD0] transition-colors">{t(service.titleKey)}</h4>
 </button>
 ))}
 </div>

 {/* 3. Recommended Opportunities List */}
 <div className="bg-white rounded-2xl border border-gray-200/60 p-6 shadow-sm">
 <div className="flex items-center justify-between mb-6">
 <h3 className="font-bold text-[#2B3D50] text-lg flex items-center gap-2">
 <Target size={20} className="text-[#47CCD0]" />
 {t('smartMgmt.indOpportunitiesTitle')}
 </h3>
 <button className="text-xs font-bold text-gray-400 hover:text-[#2B3D50]">{t('smartMgmt.indViewMore')}</button>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {[1, 2, 3].map((item) => (
 <div key={item} className="group border border-gray-100 rounded-xl p-3 hover:border-[#47CCD0] transition-all cursor-pointer">
 <div className="relative h-32 rounded-lg overflow-hidden mb-3">
 <img src={`https://images.unsplash.com/photo-${item === 1 ? '1600596542815-e328701102b9' : item === 2 ? '1512917774080-9991f1c4c750' : '1600607687939-ce8a6c25118c'}?auto=format&fit=crop&w=400&q=80`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
 <span className="absolute top-2 end-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-[#2B3D50]">{t('smartMgmt.indOpportunityLocation')}</span>
 </div>
 <h4 className="font-bold text-[#2B3D50] text-sm mb-1 truncate">{t('smartMgmt.indOpportunityTitle')}</h4>
 <div className="flex items-center justify-between">
 <span className="text-xs text-gray-500">{t('smartMgmt.indOpportunityArea')}</span>
 <span className="text-sm font-black text-[#47CCD0]">1.2M</span>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 )}
 </div>
 );
};
