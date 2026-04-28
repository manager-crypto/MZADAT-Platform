import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
 FileText,
 Download,
 FileSpreadsheet,
 CheckCircle2,
 Calendar,
 Filter
} from 'lucide-react';

export const ReportsCenterComponent: React.FC = () => {
 const { t } = useTranslation();
 const [selectedReport, setSelectedReport] = useState<string>('bids');

 const reportTypes = [
 { id: 'bids', title: t('reportsCenter.reportBidsTitle'), description: t('reportsCenter.reportBidsDesc') },
 { id: 'wallet', title: t('reportsCenter.reportWalletTitle'), description: t('reportsCenter.reportWalletDesc') },
 { id: 'wins', title: t('reportsCenter.reportWinsTitle'), description: t('reportsCenter.reportWinsDesc') },
 ];

 return (
 <div className="space-y-6 animate-in fade-in duration-500 font-sans">
 <div className="flex justify-between items-end">
 <div>
 <h2 className="text-2xl font-black text-[#2B3D50] mb-2 font-serif">{t('reportsCenter.pageTitle')}</h2>
 <p className="text-gray-500">{t('reportsCenter.pageSubtitle')}</p>
 </div>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <div className="lg:col-span-2 space-y-6">
 <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
 <h3 className="text-lg font-bold text-[#2B3D50] mb-6">{t('reportsCenter.chooseReportType')}</h3>
 <div className="space-y-4">
 {reportTypes.map((report) => (
 <div
 key={report.id}
 onClick={() => setSelectedReport(report.id)}
 className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
 selectedReport === report.id
 ? 'border-[#47CCD0] bg-[#47CCD0]/5'
 : 'border-gray-100 hover:border-gray-200 bg-gray-50/50'
 }`}
 >
 <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
 selectedReport === report.id ? 'bg-[#47CCD0] text-white' : 'border-2 border-gray-300'
 }`}>
 {selectedReport === report.id && <CheckCircle2 size={14} />}
 </div>
 <div>
 <h4 className={`font-bold ${selectedReport === report.id ? 'text-[#2B3D50]' : 'text-gray-700'}`}>
 {report.title}
 </h4>
 <p className="text-sm text-gray-500 mt-1">{report.description}</p>
 </div>
 </div>
 ))}
 </div>
 </div>

 <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
 <h3 className="text-lg font-bold text-[#2B3D50] mb-6">{t('reportsCenter.customizeReport')}</h3>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="space-y-2">
 <label className="text-sm font-bold text-gray-700">{t('reportsCenter.timePeriodLabel')}</label>
 <div className="relative">
 <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#47CCD0]/20 focus:border-[#47CCD0]">
 <option>{t('reportsCenter.last30Days')}</option>
 <option>{t('reportsCenter.last3Months')}</option>
 <option>{t('reportsCenter.last6Months')}</option>
 <option>{t('reportsCenter.thisYear')}</option>
 <option>{t('reportsCenter.all')}</option>
 </select>
 <Calendar className="absolute start-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
 </div>
 </div>

 <div className="space-y-2">
 <label className="text-sm font-bold text-gray-700">{t('reportsCenter.sortByLabel')}</label>
 <div className="relative">
 <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#47CCD0]/20 focus:border-[#47CCD0]">
 <option>{t('reportsCenter.sortNewest')}</option>
 <option>{t('reportsCenter.sortOldest')}</option>
 <option>{t('reportsCenter.sortValueHigh')}</option>
 <option>{t('reportsCenter.sortValueLow')}</option>
 </select>
 <Filter className="absolute start-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
 </div>
 </div>
 </div>
 </div>
 </div>

 <div className="lg:col-span-1">
 <div className="bg-[#F9FAFB] rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-6">
 <div className="w-12 h-12 bg-[#47CCD0]/10 text-[#47CCD0] rounded-xl flex items-center justify-center mb-4">
 <FileText size={24} />
 </div>
 <h3 className="text-xl font-bold text-[#2B3D50] mb-2">{t('reportsCenter.exportTitle')}</h3>
 <p className="text-gray-500 text-sm mb-8">
 {t('reportsCenter.exportDesc', { reportName: reportTypes.find(r => r.id === selectedReport)?.title })}
 </p>

 <div className="space-y-3">
 <button className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#47CCD0] text-white rounded-xl font-bold hover:bg-[#3dbec2] shadow-lg transition-all group">
 <Download size={20} className="group-hover:-translate-y-1 transition-transform" />
 {t('reportsCenter.exportPdf')}
 </button>

 <button className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#2B3D50] text-white rounded-xl font-bold hover:bg-[#1a2531] shadow-lg transition-all group">
 <FileSpreadsheet size={20} className="group-hover:-translate-y-1 transition-transform" />
 {t('reportsCenter.exportExcel')}
 </button>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
};
