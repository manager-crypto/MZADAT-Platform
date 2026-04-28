import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
 ShieldCheck,
 Landmark,
 Activity,
 CheckCircle2,
 FileText,
 AlertCircle,
 Database,
 Lock,
 Globe,
 Clock,
 Server
} from 'lucide-react';
import { BackButton } from '../components/ui/BackButton';
import { RiyalSymbol } from '../components/ui/RiyalSymbol';

interface ComplianceDashboardPageProps {
 onNavigate: (page: string) => void;
}

export const ComplianceDashboardPage: React.FC<ComplianceDashboardPageProps> = ({ onNavigate }) => {
 const { t } = useTranslation();
 const [activeTab, setActiveTab] = useState<'sama' | 'citc' | 'absher'>('sama');

 // Mock data representing backend state
 const samaTransactions = [
 { id: 'TRX-10928', type: t('compliance.txTypeDeposit'), amount: 50000, date: '2024-03-24', status: t('compliance.txStatusCompleted'), amlStatus: t('compliance.amlChecked') },
 { id: 'TRX-10927', type: t('compliance.txTypeRefund'), amount: 15000, date: '2024-03-22', status: t('compliance.txStatusCompleted'), amlStatus: t('compliance.amlChecked') },
 { id: 'TRX-10926', type: t('compliance.txTypeDeposit'), amount: 120000, date: '2024-03-20', status: t('compliance.txStatusPending'), amlStatus: t('compliance.amlInProgress') },
 ];

 return (
 <div className="min-h-screen bg-gray-50 pt-32 pb-12">
 <div className="container mx-auto px-4 max-w-7xl">

 {/* Header */}
 <div className="mb-8">
 <BackButton onClick={() => onNavigate('home')} label={t('compliance.backButton')} />
 <h1 className="text-3xl font-bold text-gray-900 mt-6 flex items-center gap-3">
 <ShieldCheck className="text-[#107055]" size={36} />
 {t('compliance.pageTitle')}
 </h1>
 <p className="text-gray-500 mt-2 text-lg">
 {t('compliance.pageSubtitle')}
 </p>
 </div>

 {/* Status Overview Cards */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
 <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 shrink-0">
 <Landmark size={24} />
 </div>
 <div>
 <h3 className="font-bold text-gray-900 mb-1">{t('compliance.samaCardTitle')}</h3>
 <p className="text-sm text-gray-500 mb-3">{t('compliance.samaCardDesc')}</p>
 <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md w-fit">
 <CheckCircle2 size={14} /> {t('compliance.samaCardStatus')}
 </div>
 </div>
 </div>

 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
 <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
 <Activity size={24} />
 </div>
 <div>
 <h3 className="font-bold text-gray-900 mb-1">{t('compliance.cstCardTitle')}</h3>
 <p className="text-sm text-gray-500 mb-3">{t('compliance.cstCardDesc')}</p>
 <div className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md w-fit">
 <CheckCircle2 size={14} /> {t('compliance.cstCardStatus')}
 </div>
 </div>
 </div>

 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
 <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
 <Lock size={24} />
 </div>
 <div>
 <h3 className="font-bold text-gray-900 mb-1">{t('compliance.nafathCardTitle')}</h3>
 <p className="text-sm text-gray-500 mb-3">{t('compliance.nafathCardDesc')}</p>
 <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md w-fit">
 <CheckCircle2 size={14} /> {t('compliance.nafathCardStatus')}
 </div>
 </div>
 </div>
 </div>

 {/* Main Content Area */}
 <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

 {/* Tabs */}
 <div className="flex border-b border-gray-100 bg-gray-50/50">
 <button
 onClick={() => setActiveTab('sama')}
 className={`flex-1 py-4 font-bold text-sm md:text-base border-b-2 transition-colors flex items-center justify-center gap-2 ${activeTab === 'sama' ? 'border-[#107055] text-[#107055] bg-white' : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
 >
 <Landmark size={18} /> {t('compliance.tabSama')}
 </button>
 <button
 onClick={() => setActiveTab('citc')}
 className={`flex-1 py-4 font-bold text-sm md:text-base border-b-2 transition-colors flex items-center justify-center gap-2 ${activeTab === 'citc' ? 'border-[#107055] text-[#107055] bg-white' : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
 >
 <Activity size={18} /> {t('compliance.tabCst')}
 </button>
 <button
 onClick={() => setActiveTab('absher')}
 className={`flex-1 py-4 font-bold text-sm md:text-base border-b-2 transition-colors flex items-center justify-center gap-2 ${activeTab === 'absher' ? 'border-[#107055] text-[#107055] bg-white' : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
 >
 <Lock size={18} /> {t('compliance.tabNafath')}
 </button>
 </div>

 <div className="p-6 md:p-8">

 {/* SAMA Tab */}
 {activeTab === 'sama' && (
 <div className="animate-fade-in">
 <div className="flex justify-between items-center mb-6">
 <h3 className="text-lg font-bold text-gray-900">{t('compliance.samaTableTitle')}</h3>
 <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-200">
 <FileText size={16} /> {t('compliance.exportReport')}
 </button>
 </div>
 <div className="overflow-x-auto">
 <table className="w-full text-end">
 <thead>
 <tr className="bg-gray-50 text-gray-500 text-sm">
 <th className="p-4 rounded-e-xl font-medium">{t('compliance.colTransactionId')}</th>
 <th className="p-4 font-medium">{t('compliance.colType')}</th>
 <th className="p-4 font-medium flex items-center gap-1">{t('compliance.colAmount')} (<RiyalSymbol className="w-3 h-3 text-white" />)</th>
 <th className="p-4 font-medium">{t('compliance.colDate')}</th>
 <th className="p-4 font-medium">{t('compliance.colStatus')}</th>
 <th className="p-4 rounded-s-xl font-medium">{t('compliance.colAml')}</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-100">
 {samaTransactions.map((trx, idx) => (
 <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
 <td className="p-4 font-mono text-sm">{trx.id}</td>
 <td className="p-4 text-gray-900 font-medium">{trx.type}</td>
 <td className="p-4 font-mono font-bold">{trx.amount.toLocaleString()}</td>
 <td className="p-4 text-sm text-gray-500">{trx.date}</td>
 <td className="p-4">
 <span className={`px-2 py-1 rounded-md text-xs font-bold ${trx.status === t('compliance.txStatusCompleted') ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
 {trx.status}
 </span>
 </td>
 <td className="p-4">
 <span className="flex items-center gap-1 text-xs text-gray-600">
 {trx.amlStatus === t('compliance.amlChecked') ? <CheckCircle2 size={14} className="text-green-500" /> : <Clock size={14} className="text-orange-500" />}
 {trx.amlStatus}
 </span>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 )}

 {/* CITC Tab */}
 {activeTab === 'citc' && (
 <div className="animate-fade-in space-y-8">
 <div>
 <h3 className="text-lg font-bold text-gray-900 mb-4">{t('compliance.cstSlaTitle')}</h3>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex justify-between items-center">
 <div className="flex items-center gap-3">
 <Server className="text-blue-500" size={20} />
 <span className="font-bold text-gray-700">{t('compliance.cstUptime')}</span>
 </div>
 <span className="font-mono font-bold text-lg text-gray-900">99.98%</span>
 </div>
 <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex justify-between items-center">
 <div className="flex items-center gap-3">
 <Globe className="text-blue-500" size={20} />
 <span className="font-bold text-gray-700">{t('compliance.cstLatency')}</span>
 </div>
 <span className="font-mono font-bold text-lg text-gray-900">124ms</span>
 </div>
 </div>
 </div>

 <div>
 <h3 className="text-lg font-bold text-gray-900 mb-4">{t('compliance.cstPrivacyTitle')}</h3>
 <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex items-start gap-4">
 <Database className="text-gray-400 shrink-0 mt-1" />
 <div>
 <p className="text-sm text-gray-600 mb-2">
 {t('compliance.cstPrivacyDesc')}
 </p>
 <ul className="text-xs text-gray-500 space-y-1 list-disc list-inside">
 <li>{t('compliance.cstBullet1')}</li>
 <li>{t('compliance.cstBullet2')}</li>
 <li>{t('compliance.cstBullet3')}</li>
 </ul>
 </div>
 </div>
 </div>
 </div>
 )}

 {/* Absher Tab */}
 {activeTab === 'absher' && (
 <div className="animate-fade-in flex flex-col items-center justify-center py-12 text-center">
 <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-4 border border-emerald-100">
 <ShieldCheck size={40} className="text-emerald-600" />
 </div>
 <h3 className="text-xl font-bold text-gray-900 mb-2">{t('compliance.absherTitle')}</h3>
 <p className="text-gray-500 max-w-md mx-auto mb-8">
 {t('compliance.absherDesc')}
 </p>
 <div className="flex gap-4 w-full max-w-sm">
 <div className="flex-1 bg-gray-50 p-4 rounded-xl border border-gray-100">
 <p className="text-xs text-gray-500 mb-1">{t('compliance.absherVerifications')}</p>
 <p className="text-2xl font-bold text-gray-900 font-mono">14,205</p>
 </div>
 <div className="flex-1 bg-gray-50 p-4 rounded-xl border border-gray-100">
 <p className="text-xs text-gray-500 mb-1">{t('compliance.absherResponseTime')}</p>
 <p className="text-2xl font-bold text-gray-900 font-mono">3.2s</p>
 </div>
 </div>
 </div>
 )}

 </div>
 </div>
 </div>
 </div>
 );
};
