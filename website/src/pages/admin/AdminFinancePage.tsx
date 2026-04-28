import React from 'react';
import { Wallet, ArrowUpRight, ArrowDownRight, Download, Search, CheckCircle, Clock } from 'lucide-react';
import { RiyalSymbol } from '../../components/ui/RiyalSymbol';

export const AdminFinancePage: React.FC = () => {
 const transactions = [
 { id: 'TRX-1092', user: 'محمد عبدالله', amount: '50,000', type: 'إيداع (عربون)', status: 'مكتمل', date: '2024-03-24 14:30', method: 'مدى' },
 { id: 'TRX-1093', user: 'شركة أبعاد', amount: '15,000', type: 'سحب', status: 'قيد المعالجة', date: '2024-03-24 11:20', method: 'تحويل بنكي' },
 { id: 'TRX-1094', user: 'خالد فهد', amount: '2,500', type: 'رسوم منصة', status: 'مكتمل', date: '2024-03-23 09:15', method: 'بطاقة ائتمانية' },
 { id: 'TRX-1095', user: 'مؤسسة إعمار', amount: '120,000', type: 'إيداع (محفظة ضامنة)', status: 'مكتمل', date: '2024-03-22 16:45', method: 'سداد' },
 ];

 return (
 <div className="space-y-6 animate-fade-in">
 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
 <div>
 <h2 className="text-2xl font-bold text-gray-900 mb-2">الرقابة المالية</h2>
 <p className="text-gray-500 text-sm">إدارة المحفظة الضامنة، الرسوم، وعمليات السحب والإيداع.</p>
 </div>
 <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl font-bold hover:bg-gray-50 transition-colors">
 <Download size={18} />
 تصدير التقرير المالي
 </button>
 </div>

 {/* Financial Overviews */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <div className="bg-[#2B3D50] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
 <div className="absolute top-0 end-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
 <div className="flex items-center gap-3 mb-4">
 <Wallet className="text-[#47CCD0]" size={24} />
 <h3 className="font-bold">إجمالي المحفظة الضامنة</h3>
 </div>
 <p className="text-3xl font-bold font-mono flex items-center gap-1.5">45,250,000 <RiyalSymbol className="w-5 h-5 text-gray-300" /></p>
 <p className="text-xs text-green-400 mt-2 flex items-center gap-1"><ArrowUpRight size={12}/> +2.4% هذا الأسبوع</p>
 </div>

 <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
 <div className="flex items-center gap-3 mb-4">
 <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
 <ArrowDownRight className="text-green-500" size={20} />
 </div>
 <h3 className="font-bold text-gray-700">إيرادات المنصة (الشهر الحالي)</h3>
 </div>
 <p className="text-2xl font-bold text-gray-900 font-mono flex items-center gap-1.5">124,500 <RiyalSymbol className="w-4 h-4 text-gray-500" /></p>
 </div>

 <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
 <div className="flex items-center gap-3 mb-4">
 <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
 <Clock className="text-orange-500" size={20} />
 </div>
 <h3 className="font-bold text-gray-700">طلبات سحب معلقة</h3>
 </div>
 <p className="text-2xl font-bold text-gray-900 font-mono">8 <span className="text-sm font-sans font-normal text-gray-500">طلبات</span></p>
 <button className="text-sm text-[#47CCD0] font-bold mt-2 hover:underline">مراجعة الطلبات</button>
 </div>
 </div>

 {/* Transactions Table */}
 <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
 <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
 <h3 className="text-lg font-bold text-gray-900">سجل العمليات الأخير</h3>
 <div className="relative w-full sm:w-64">
 <Search className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
 <input 
 type="text" 
 placeholder="بحث في العمليات..." 
 className="w-full h-9 ps-4 pe-10 rounded-lg border border-gray-200 focus:border-[#47CCD0] focus:ring-1 outline-none text-sm"
 />
 </div>
 </div>

 <div className="overflow-x-auto">
 <table className="w-full text-end text-sm">
 <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
 <tr>
 <th className="py-4 px-6 font-bold">رقم العملية</th>
 <th className="py-4 px-6 font-bold">المستخدم</th>
 <th className="py-4 px-6 font-bold">نوع العملية</th>
 <th className="py-4 px-6 font-bold flex items-center gap-1">المبلغ (<RiyalSymbol className="w-3 h-3 text-gray-500" />)</th>
 <th className="py-4 px-6 font-bold">طريقة الدفع</th>
 <th className="py-4 px-6 font-bold">التاريخ</th>
 <th className="py-4 px-6 font-bold">الحالة</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-100">
 {transactions.map((trx) => (
 <tr key={trx.id} className="hover:bg-gray-50/50 transition-colors">
 <td className="py-4 px-6 text-gray-500 font-mono">{trx.id}</td>
 <td className="py-4 px-6 font-bold text-gray-900">{trx.user}</td>
 <td className="py-4 px-6 text-gray-700">{trx.type}</td>
 <td className="py-4 px-6 font-mono font-bold text-[#2B3D50]">{trx.amount}</td>
 <td className="py-4 px-6 text-gray-500">{trx.method}</td>
 <td className="py-4 px-6 text-gray-500">{trx.date}</td>
 <td className="py-4 px-6">
 <span className={`flex items-center gap-1.5 text-xs font-bold w-max px-2.5 py-1 rounded-full ${
 trx.status === 'مكتمل' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
 }`}>
 {trx.status === 'مكتمل' ? <CheckCircle size={14} /> : <Clock size={14} />}
 {trx.status}
 </span>
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
