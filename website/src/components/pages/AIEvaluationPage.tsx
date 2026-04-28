import React from 'react';
import { useTranslation } from 'react-i18next';
import {
 ArrowRight,
 TrendingUp,
 TrendingDown,
 Activity,
 MapPin,
 Info,
 CheckCircle2,
 AlertCircle,
 BarChart3,
 Sparkles
} from 'lucide-react';
import { BackButton } from '../ui/BackButton';
import { RiyalSymbol } from '../ui/RiyalSymbol';
import {
 AreaChart,
 Area,
 XAxis,
 YAxis,
 CartesianGrid,
 Tooltip,
 ResponsiveContainer,
 BarChart,
 Bar,
 Cell
} from 'recharts';

interface AIEvaluationPageProps {
 onBack: () => void;
 propertyTitle?: string;
}

export const AIEvaluationPage = ({ onBack, propertyTitle = "Luxury Modern Villa in Al-Yasmin" }: AIEvaluationPageProps) => {
 const { t } = useTranslation();

 // Mock Data for Price History & Forecast
 const priceHistoryData = [
 { month: t('aiEvalPage.jan'), price: 3200000, type: 'history' },
 { month: t('aiEvalPage.feb'), price: 3250000, type: 'history' },
 { month: t('aiEvalPage.mar'), price: 3300000, type: 'history' },
 { month: t('aiEvalPage.apr'), price: 3400000, type: 'history' },
 { month: t('aiEvalPage.may'), price: 3450000, type: 'history' },
 { month: t('aiEvalPage.jun'), price: 3500000, type: 'current' },
 { month: t('aiEvalPage.jul'), price: 3550000, type: 'forecast' },
 { month: t('aiEvalPage.aug'), price: 3600000, type: 'forecast' },
 { month: t('aiEvalPage.sep'), price: 3650000, type: 'forecast' },
 ];

 // Comparable Properties Data
 const comparables = [
 { id: 1, title: t('aiEvalPage.comp1Title'), price: 3450000, area: 450, similarity: 95 },
 { id: 2, title: t('aiEvalPage.comp2Title'), price: 3600000, area: 460, similarity: 88 },
 { id: 3, title: t('aiEvalPage.comp3Title'), price: 3800000, area: 500, similarity: 82 },
 ];

 // Market Indicators
 const marketHealth = [
 { label: t('aiEvalPage.demandLabel'), value: 85, color: '#47CCD0', status: t('aiEvalPage.demandStatus') },
 { label: t('aiEvalPage.supplyLabel'), value: 40, color: '#F59E0B', status: t('aiEvalPage.supplyStatus') },
 { label: t('aiEvalPage.liquidityLabel'), value: 65, color: '#10B981', status: t('aiEvalPage.liquidityStatus') },
 ];

 return (
 <div className="min-h-screen bg-gray-50 pt-36 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
 <div className="container mx-auto px-4 max-w-7xl">
 {/* Header */}
 <div className="flex items-center gap-4 mb-8">
 <BackButton onClick={onBack} label="" className="!p-2 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-100 transition-colors" />
 <div>
 <div className="flex items-center gap-2 mb-1">
 <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1 font-bold">
 <Sparkles size={12} /> {t('aiEvalPage.aiEvalLabel')}
 </span>
 </div>
 <h1 className="text-2xl font-bold text-gray-900">{t('aiEvalPage.pageTitle')}</h1>
 <p className="text-gray-500 text-sm mt-1">{t('aiEvalPage.pageSubtitle')} {propertyTitle}</p>
 </div>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

 {/* Left Column: Main Analysis */}
 <div className="lg:col-span-8 space-y-6">

 {/* 1. Price Estimate Card */}
 <div className="bg-white rounded-3xl p-8 shadow-sm border border-indigo-100 relative overflow-hidden">
 <div className="absolute top-0 start-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

 <div className="flex flex-col md:flex-row items-center justify-between gap-8">
 <div className="text-center md:text-end">
 <p className="text-gray-500 font-medium mb-2">{t('aiEvalPage.fairPriceLabel')}</p>
 <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-mono mb-2 flex items-center justify-center md:justify-start gap-2">
 3,500,000 <RiyalSymbol className="w-8 h-8 text-gray-400" />
 </h2>
 <div className="flex items-center gap-2 justify-center md:justify-start">
 <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-md font-bold flex items-center gap-1">
 <TrendingUp size={14} /> +2.5%
 </span>
 <span className="text-xs text-gray-400">{t('aiEvalPage.vsNeighbAvg')}</span>
 </div>
 </div>

 <div className="w-full md:w-auto flex-1 max-w-sm bg-gray-50 rounded-2xl p-4 border border-gray-100">
 <div className="flex justify-between items-center mb-2">
 <span className="text-xs font-bold text-gray-500">{t('aiEvalPage.expectedPriceRange')}</span>
 <Info size={14} className="text-gray-400 cursor-help" />
 </div>
 <div className="relative h-4 bg-gray-200 rounded-full mb-2">
 <div className="absolute top-0 start-[20%] end-[20%] h-full bg-indigo-200 rounded-full"></div>
 <div className="absolute top-0 start-[45%] w-1 h-full bg-indigo-600 rounded-full z-10 scale-150"></div>
 </div>
 <div className="flex justify-between text-xs font-mono text-gray-600">
 <span>3.2M</span>
 <span className="font-bold text-indigo-700">3.5M</span>
 <span>3.8M</span>
 </div>
 <p className="text-[10px] text-gray-400 mt-2 text-center">{t('aiEvalPage.evaluationAccuracy')} <strong className="text-green-600">{t('aiEvalPage.accuracyValue')}</strong></p>
 </div>
 </div>
 </div>

 {/* 2. Price History & Forecast Chart */}
 <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
 <div className="flex items-center justify-between mb-6">
 <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
 <Activity size={20} className="text-indigo-600" />
 {t('aiEvalPage.priceTrendTitle')}
 </h3>
 <div className="flex gap-2 text-xs">
 <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> {t('aiEvalPage.legendHistory')}</span>
 <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-400 dashed border border-purple-600"></span> {t('aiEvalPage.legendForecast')}</span>
 </div>
 </div>

 <div className="h-[300px] w-full min-w-0" dir="ltr">
 <ResponsiveContainer width="100%" height="100%">
 <AreaChart data={priceHistoryData}>
 <defs>
 <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
 <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
 <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
 </linearGradient>
 </defs>
 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
 <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
 <YAxis
 orientation="right"
 axisLine={false}
 tickLine={false}
 tick={{fill: '#9ca3af', fontSize: 12}}
 tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
 />
 <Tooltip
 contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
 formatter={(value: number) => [<span className="flex items-center gap-1 font-mono">{value.toLocaleString()} <RiyalSymbol className="w-3 h-3 text-gray-700" /></span>, t('aiEvalPage.priceTooltipLabel')]}
 />
 <Area
 type="monotone"
 dataKey="price"
 stroke="#6366f1"
 strokeWidth={3}
 fillOpacity={1}
 fill="url(#colorPrice)"
 />
 </AreaChart>
 </ResponsiveContainer>
 </div>
 <p className="text-sm text-gray-500 mt-4 bg-indigo-50 p-3 rounded-xl border border-indigo-100 leading-relaxed">
 <Sparkles size={14} className="inline-block ms-1 text-indigo-600" />
 <strong>{t('aiEvalPage.aiAnalysisTitle')}</strong> {t('aiEvalPage.aiAnalysisText')}
 </p>
 </div>

 {/* 3. Comparables */}
 <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
 <h3 className="text-xl font-bold text-gray-900 mb-4">{t('aiEvalPage.comparablesTitle')}</h3>
 <div className="overflow-x-auto">
 <table className="w-full text-sm text-end">
 <thead className="bg-gray-50 text-gray-500 font-medium">
 <tr>
 <th className="p-3 rounded-r-xl">{t('aiEvalPage.colProperty')}</th>
 <th className="p-3">{t('aiEvalPage.colArea')}</th>
 <th className="p-3">{t('aiEvalPage.colPrice')}</th>
 <th className="p-3 rounded-l-xl">{t('aiEvalPage.colSimilarity')}</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-50">
 {comparables.map((comp) => (
 <tr key={comp.id} className="hover:bg-gray-50/50 transition-colors">
 <td className="p-3 font-medium text-gray-900">{comp.title}</td>
 <td className="p-3 text-gray-500">{comp.area} {t('aiEvalPage.sqm')}</td>
 <td className="p-3 font-mono font-bold text-gray-900">{comp.price.toLocaleString()}</td>
 <td className="p-3">
 <div className="flex items-center gap-2">
 <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
 <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${comp.similarity}%` }}></div>
 </div>
 <span className="text-xs font-bold text-indigo-600">{comp.similarity}%</span>
 </div>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>

 </div>

 {/* Right Column: Sidebar Stats */}
 <div className="lg:col-span-4 space-y-6">

 {/* Score Card */}
 <div className="bg-[#1e293b] rounded-3xl p-6 text-white text-center shadow-lg relative overflow-hidden">
 <div className="absolute top-0 end-0 w-32 h-32 bg-indigo-500 rounded-full blur-[60px] opacity-20"></div>
 <div className="absolute bottom-0 start-0 w-32 h-32 bg-purple-500 rounded-full blur-[60px] opacity-20"></div>

 <h3 className="text-lg font-medium text-gray-300 mb-4">{t('aiEvalPage.aiScoreTitle')}</h3>
 <div className="relative w-32 h-32 mx-auto mb-4 flex items-center justify-center">
 <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 36 36">
 <path
 className="text-gray-700"
 d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
 fill="none"
 stroke="currentColor"
 strokeWidth="3"
 />
 <path
 className="text-[#47CCD0]"
 d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
 fill="none"
 stroke="currentColor"
 strokeWidth="3"
 strokeDasharray="92, 100"
 />
 </svg>
 <div className="absolute inset-0 flex flex-col items-center justify-center">
 <span className="text-4xl font-bold">92</span>
 <span className="text-xs text-gray-400">{t('aiEvalPage.aiScoreRating')}</span>
 </div>
 </div>
 <p className="text-xs text-gray-400 leading-relaxed px-2">
 {t('aiEvalPage.aiScoreDesc')}
 </p>
 </div>

 {/* Market Health */}
 <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
 <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
 <BarChart3 size={20} className="text-gray-400" />
 {t('aiEvalPage.marketHealthTitle')}
 </h3>
 <div className="space-y-6">
 {marketHealth.map((item, idx) => (
 <div key={idx}>
 <div className="flex justify-between items-center mb-2">
 <span className="text-sm font-medium text-gray-600">{item.label}</span>
 <span className="text-xs font-bold px-2 py-0.5 rounded bg-gray-100" style={{color: item.color}}>{item.status}</span>
 </div>
 <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
 <div
 className="h-full rounded-full transition-all duration-1000"
 style={{ width: `${item.value}%`, backgroundColor: item.color }}
 ></div>
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* Location Insight */}
 <div className="bg-indigo-50 rounded-3xl p-6 border border-indigo-100">
 <h3 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
 <MapPin size={20} /> {t('aiEvalPage.locationInsightsTitle')}
 </h3>
 <ul className="space-y-3">
 <li className="flex items-start gap-2 text-sm text-indigo-800">
 <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-indigo-600" />
 <span>{t('aiEvalPage.loc1')}</span>
 </li>
 <li className="flex items-start gap-2 text-sm text-indigo-800">
 <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-indigo-600" />
 <span>{t('aiEvalPage.loc2')}</span>
 </li>
 <li className="flex items-start gap-2 text-sm text-indigo-800">
 <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-indigo-600" />
 <span>{t('aiEvalPage.loc3')}</span>
 </li>
 </ul>
 </div>

 {/* Disclaimer */}
 <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 flex gap-3">
 <AlertCircle size={20} className="text-amber-600 shrink-0" />
 <p className="text-xs text-amber-800 leading-relaxed">
 {t('aiEvalPage.disclaimerText')}
 </p>
 </div>

 </div>
 </div>
 </div>
 </div>
 );
};
