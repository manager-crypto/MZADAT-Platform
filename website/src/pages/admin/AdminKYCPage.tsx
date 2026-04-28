import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Search, Check, X, FileText, ExternalLink, AlertTriangle } from 'lucide-react';

export const AdminKYCPage: React.FC = () => {
 const { t } = useTranslation();

 const [requests, setRequests] = useState([
 { id: 'REQ-901', user: 'خالد عبدالله', type: t('adminKYC.typeIndividual'), date: '2024-03-24', status: t('adminKYC.statusUnderReview'), docs: [t('adminKYC.docNationalId'), t('adminKYC.docSelfie')] },
 { id: 'REQ-902', user: 'شركة قمم العقارية', type: t('adminKYC.typeCompany'), date: '2024-03-23', status: t('adminKYC.statusUnderReview'), docs: [t('adminKYC.docCommercialRecord'), t('adminKYC.docFalLicense'), t('adminKYC.docRepresentativeAuth')] },
 { id: 'REQ-903', user: 'مؤسسة الأفق', type: t('adminKYC.typeCompany'), date: '2024-03-23', status: t('adminKYC.statusRejected'), docs: [t('adminKYC.docCommercialRecord'), t('adminKYC.docInvalidAuth')] },
 { id: 'REQ-904', user: 'فهد سعد', type: t('adminKYC.typeIndividual'), date: '2024-03-22', status: t('adminKYC.statusApproved'), docs: [t('adminKYC.docNationalIdNafath')] },
 ]);

 const handleAction = (id: string, action: string) => {
 setRequests(prev => prev.map(req => req.id === id ? { ...req, status: action } : req));
 };

 return (
 <div className="space-y-6 animate-fade-in">
 <div>
 <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('adminKYC.pageTitle')}</h2>
 <p className="text-gray-500 text-sm">{t('adminKYC.pageSubtitle')}</p>
 </div>

 {/* Summary Cards */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
 <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center">
 <AlertTriangle size={24} />
 </div>
 <div>
 <p className="text-gray-500 text-sm">{t('adminKYC.pendingRequests')}</p>
 <h3 className="text-2xl font-bold text-gray-900">24</h3>
 </div>
 </div>
 <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
 <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
 <ShieldCheck size={24} />
 </div>
 <div>
 <p className="text-gray-500 text-sm">{t('adminKYC.verifiedToday')}</p>
 <h3 className="text-2xl font-bold text-gray-900">156</h3>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
 <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4">
 <div className="relative flex-1">
 <Search className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
 <input
 type="text"
 placeholder={t('adminKYC.searchPlaceholder')}
 className="w-full h-10 ps-4 pe-10 rounded-xl border border-gray-200 focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] outline-none text-sm"
 />
 </div>
 <select className="h-10 px-4 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#47CCD0]">
 <option>{t('adminKYC.filterAll')}</option>
 <option>{t('adminKYC.statusUnderReview')}</option>
 <option>{t('adminKYC.statusApproved')}</option>
 <option>{t('adminKYC.statusRejected')}</option>
 </select>
 </div>

 <div className="overflow-x-auto">
 <table className="w-full text-end text-sm">
 <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
 <tr>
 <th className="py-4 px-6 font-bold">{t('adminKYC.colRequestNo')}</th>
 <th className="py-4 px-6 font-bold">{t('adminKYC.colUser')}</th>
 <th className="py-4 px-6 font-bold">{t('adminKYC.colType')}</th>
 <th className="py-4 px-6 font-bold">{t('adminKYC.colDocuments')}</th>
 <th className="py-4 px-6 font-bold">{t('adminKYC.colDate')}</th>
 <th className="py-4 px-6 font-bold">{t('adminKYC.colStatus')}</th>
 <th className="py-4 px-6 font-bold">{t('adminKYC.colActions')}</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-100">
 {requests.map((req) => (
 <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
 <td className="py-4 px-6 text-gray-500 font-mono">{req.id}</td>
 <td className="py-4 px-6 font-bold text-gray-900">{req.user}</td>
 <td className="py-4 px-6 text-gray-600">{req.type}</td>
 <td className="py-4 px-6">
 <div className="flex flex-wrap gap-2">
 {req.docs.map((doc, idx) => (
 <span key={idx} className="flex items-center gap-1 text-[10px] bg-blue-50 text-blue-700 px-2 py-1 rounded-md">
 <FileText size={10} /> {doc}
 </span>
 ))}
 </div>
 </td>
 <td className="py-4 px-6 text-gray-500">{req.date}</td>
 <td className="py-4 px-6">
 <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
 req.status === t('adminKYC.statusApproved') ? 'bg-green-100 text-green-700' :
 req.status === t('adminKYC.statusUnderReview') ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
 }`}>
 {req.status}
 </span>
 </td>
 <td className="py-4 px-6">
 <div className="flex items-center gap-2">
 {req.status === t('adminKYC.statusUnderReview') && (
 <>
 <button onClick={() => handleAction(req.id, t('adminKYC.statusApproved'))} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title={t('adminKYC.titleApprove')}>
 <Check size={16} />
 </button>
 <button onClick={() => handleAction(req.id, t('adminKYC.statusRejected'))} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title={t('adminKYC.titleReject')}>
 <X size={16} />
 </button>
 </>
 )}
 <button className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title={t('adminKYC.titleViewDetails')}>
 <ExternalLink size={16} />
 </button>
 </div>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 </div>
 );
};
