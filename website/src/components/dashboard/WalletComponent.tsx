import React, { useState } from 'react';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard, 
  Building2, 
  History, 
  MoreHorizontal, 
  Download, 
  Filter, 
  Plus, 
  Minus,
  Copy,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { RiyalSymbol } from '../ui/RiyalSymbol';

export const WalletComponent = () => {
  const [activeTab, setActiveTab] = useState('transactions');
  
  // Mock Data
  const transactions = [
    { id: 'TX-9281', type: 'deposit', amount: 5000, date: '2024-02-20', status: 'completed', desc: 'شحن رصيد - مدى', ref: 'MADA-8821' },
    { id: 'TX-9280', type: 'hold', amount: 2500, date: '2024-02-18', status: 'pending', desc: 'تأمين مزاد #202401', ref: 'AUC-HOLD-99' },
    { id: 'TX-9279', type: 'withdraw', amount: 1200, date: '2024-02-15', status: 'completed', desc: 'استرداد مبلغ - تحويل بنكي', ref: 'TRF-1120' },
    { id: 'TX-9278', type: 'deposit', amount: 10000, date: '2024-02-10', status: 'completed', desc: 'شحن رصيد - Apple Pay', ref: 'AP-3321' },
    { id: 'TX-9277', type: 'release', amount: 2500, date: '2024-02-05', status: 'completed', desc: 'فك حجز مبلغ - مزاد منتهي', ref: 'AUC-REL-88' },
  ];

  const StatCard = ({ title, amount, type, icon: Icon }: any) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
       <div className={`absolute top-0 start-0 w-1 h-full ${
          type === 'total' ? 'bg-[#2B3D50]' : 
          type === 'available' ? 'bg-[#47CCD0]' : 'bg-orange-400'
       }`}></div>
       
       <div className="flex justify-between items-start mb-4">
          <div>
             <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
             <h3 className="text-2xl font-black text-[#2B3D50] font-mono tracking-tight flex items-center justify-end md:justify-start gap-1" dir="ltr">
                {amount} <RiyalSymbol className="w-5 h-5 text-gray-400" />
             </h3>
          </div>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
             type === 'total' ? 'bg-[#2B3D50]/5 text-[#2B3D50]' : 
             type === 'available' ? 'bg-[#47CCD0]/10 text-[#47CCD0]' : 'bg-orange-50 text-orange-500'
          }`}>
             <Icon size={20} />
          </div>
       </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200/60 shadow-sm">
         <div>
            <h2 className="text-xl font-bold text-[#2B3D50] flex items-center gap-2">
               <Wallet className="text-[#47CCD0]" />
               المحفظة المالية
            </h2>
            <p className="text-sm text-gray-500 mt-1">إدارة رصيدك وعملياتك المالية بكل سهولة وأمان</p>
         </div>
         <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-[#47CCD0] text-white rounded-xl font-bold hover:bg-[#3dbec2] shadow-lg shadow-[#47CCD0]/20 transition-all">
               <Plus size={18} /> شحن الرصيد
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-[#2B3D50] rounded-xl font-bold hover:bg-gray-50 hover:border-[#2B3D50] transition-all">
               <Minus size={18} /> سحب
            </button>
         </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <StatCard title="الرصيد الكلي" amount="25,400.00" type="total" icon={Wallet} />
         <StatCard title="الرصيد المتاح" amount="20,400.00" type="available" icon={CheckCircle} />
         <StatCard title="المبالغ المحجوزة (المحفظة الضامنة)" amount="5,000.00" type="frozen" icon={AlertCircle} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* Right Column: Transactions */}
         <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
               <h3 className="font-bold text-[#2B3D50] text-lg flex items-center gap-2">
                  <History size={20} className="text-gray-400" />
                  سجل العمليات
               </h3>
               <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-[#2B3D50] transition-colors">
                     <Filter size={18} />
                  </button>
                  <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-[#2B3D50] transition-colors">
                     <Download size={18} />
                  </button>
               </div>
            </div>
            
            <div className="overflow-x-auto">
               <table className="w-full text-sm text-end">
                  <thead className="bg-gray-50 text-gray-500 font-bold text-xs">
                     <tr>
                        <th className="px-6 py-4">نوع العملية</th>
                        <th className="px-6 py-4">المبلغ</th>
                        <th className="px-6 py-4">التاريخ</th>
                        <th className="px-6 py-4">الحالة</th>
                        <th className="px-6 py-4"></th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                     {transactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors group">
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                 <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    tx.type === 'deposit' ? 'bg-green-50 text-green-600' :
                                    tx.type === 'withdraw' ? 'bg-red-50 text-red-600' :
                                    tx.type === 'hold' ? 'bg-orange-50 text-orange-600' :
                                    'bg-blue-50 text-blue-600'
                                 }`}>
                                    {tx.type === 'deposit' && <ArrowDownLeft size={18} />}
                                    {tx.type === 'withdraw' && <ArrowUpRight size={18} />}
                                    {tx.type === 'hold' && <AlertCircle size={18} />}
                                    {tx.type === 'release' && <CheckCircle size={18} />}
                                 </div>
                                 <div>
                                    <p className="font-bold text-[#2B3D50]">{tx.desc}</p>
                                    <p className="text-xs text-gray-400 mt-0.5 font-mono">{tx.ref}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-6 py-4">
                              <span className={`font-mono font-bold ${
                                 tx.type === 'deposit' || tx.type === 'release' ? 'text-green-600' : 'text-[#2B3D50]'
                              }`}>
                                 {tx.type === 'deposit' || tx.type === 'release' ? '+' : '-'}{tx.amount.toLocaleString()} <RiyalSymbol className="w-3 h-3 text-gray-400" />
                              </span>
                           </td>
                           <td className="px-6 py-4 text-gray-500 font-medium">
                              {new Date(tx.date).toLocaleDateString('ar-SA')}
                           </td>
                           <td className="px-6 py-4">
                              <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                                 tx.status === 'completed' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                              }`}>
                                 {tx.status === 'completed' ? 'مكتملة' : 'قيد المعالجة'}
                              </span>
                           </td>
                           <td className="px-6 py-4">
                              <button className="text-gray-300 hover:text-[#2B3D50]">
                                 <MoreHorizontal size={18} />
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            <div className="p-4 border-t border-gray-100 text-center">
               <button className="text-sm font-bold text-[#47CCD0] hover:text-[#3dbec2]">عرض المزيد</button>
            </div>
         </div>

         {/* Left Column: Bank Info & Cards */}
         <div className="space-y-6">
            
            {/* Virtual IBAN Card */}
            <div className="bg-gradient-to-br from-[#2B3D50] to-[#1e293b] rounded-2xl p-6 text-white shadow-xl shadow-[#2B3D50]/20 relative overflow-hidden">
               <div className="absolute top-0 end-0 w-40 h-40 bg-white/5 rounded-full -me-10 -mt-10 blur-3xl"></div>
               <div className="absolute bottom-0 start-0 w-32 h-32 bg-[#47CCD0]/20 rounded-full -ms-10 -mb-10 blur-3xl"></div>
               
               <div className="relative z-10">
                  <div className="flex justify-between items-center mb-8">
                     <span className="text-sm font-medium text-gray-300">الحساب البنكي الافتراضي</span>
                     <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" className="h-8 opacity-80" alt="Mastercard" />
                  </div>
                  
                  <div className="mb-6">
                     <p className="text-xs text-gray-400 mb-1">رقم الآيبان (IBAN)</p>
                     <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg border border-white/5 backdrop-blur-sm group cursor-pointer hover:bg-white/15 transition-all">
                        <span className="font-mono text-lg tracking-widest text-[#47CCD0]">SA58 1000 0000 8822 1144 22</span>
                        <Copy size={16} className="text-gray-400 group-hover:text-white ms-auto" />
                     </div>
                  </div>
                  
                  <div className="flex justify-between items-end">
                     <div>
                        <p className="text-xs text-gray-400">اسم المستفيد</p>
                        <p className="font-bold text-lg">محمد أحمد</p>
                     </div>
                     <div className="text-end">
                        <p className="text-xs text-gray-400">البنك</p>
                        <p className="font-bold">الراجحي</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Saved Cards */}
            <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-6">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-[#2B3D50]">البطاقات المحفوظة</h3>
                  <button className="text-[#47CCD0] hover:bg-[#47CCD0]/10 p-1.5 rounded-lg transition-colors">
                     <Plus size={18} />
                  </button>
               </div>
               
               <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-[#47CCD0] cursor-pointer transition-all bg-gray-50/50">
                     <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                        <CreditCard size={20} className="text-[#2B3D50]" />
                     </div>
                     <div className="flex-1">
                        <p className="font-bold text-sm text-[#2B3D50] dir-ltr text-end">**** 8821</p>
                        <p className="text-xs text-gray-400">تنتهي في 02/26</p>
                     </div>
                     <div className="w-4 h-4 rounded-full border border-[#47CCD0] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#47CCD0]"></div>
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-[#47CCD0] cursor-pointer transition-all">
                     <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                        <CreditCard size={20} className="text-gray-400" />
                     </div>
                     <div className="flex-1">
                        <p className="font-bold text-sm text-gray-600 dir-ltr text-end">**** 4211</p>
                        <p className="text-xs text-gray-400">تنتهي في 08/25</p>
                     </div>
                  </div>
               </div>
            </div>

         </div>
      </div>
    </div>
  );
};
