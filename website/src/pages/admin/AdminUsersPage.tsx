import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Shield, Ban, CheckCircle, Edit2, Trash2 } from 'lucide-react';

export const AdminUsersPage: React.FC = () => {
 const [users, setUsers] = useState([
 { id: '1001', name: 'أحمد عبدالله', role: 'مشتري', status: 'نشط', kyc: 'موثق', joinDate: '2023-10-12', phone: '+966 50 123 4567' },
 { id: '1002', name: 'شركة أبعاد العقارية', role: 'وسيط عقاري', status: 'نشط', kyc: 'موثق', joinDate: '2023-11-05', phone: '+966 55 987 6543' },
 { id: '1003', name: 'سعد خالد', role: 'بائع', status: 'موقوف', kyc: 'مرفوض', joinDate: '2024-01-20', phone: '+966 53 333 4444' },
 { id: '1004', name: 'مؤسسة إعمار', role: 'وسيط عقاري', status: 'نشط', kyc: 'قيد المراجعة', joinDate: '2024-02-15', phone: '+966 54 444 5555' },
 { id: '1005', name: 'نورة محمد', role: 'مشتري', status: 'نشط', kyc: 'موثق', joinDate: '2024-02-28', phone: '+966 56 666 7777' },
 ]);

 const handleAction = (id: string, action: string) => {
 if (action === 'إيقاف') {
 setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'نشط' ? 'موقوف' : 'نشط' } : u));
 }
 };

 return (
 <div className="space-y-6 animate-fade-in">
 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
 <h2 className="text-2xl font-bold text-gray-900">إدارة المستخدمين</h2>
 <button className="bg-[#47CCD0] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#3bb8bc] transition-colors">
 إضافة مستخدم جديد
 </button>
 </div>

 <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
 {/* Toolbar */}
 <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4">
 <div className="relative flex-1">
 <Search className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
 <input 
 type="text" 
 placeholder="البحث بالاسم، رقم الهاتف، أو المعرف..." 
 className="w-full h-10 ps-4 pe-10 rounded-xl border border-gray-200 focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] outline-none text-sm"
 />
 </div>
 <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 text-sm font-bold">
 <Filter size={18} />
 تصفية
 </button>
 </div>

 {/* Table */}
 <div className="overflow-x-auto">
 <table className="w-full text-end text-sm">
 <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
 <tr>
 <th className="py-4 px-6 font-bold">المعرف</th>
 <th className="py-4 px-6 font-bold">الاسم / الجهة</th>
 <th className="py-4 px-6 font-bold">الدور</th>
 <th className="py-4 px-6 font-bold">الحالة</th>
 <th className="py-4 px-6 font-bold">حالة التوثيق (KYC)</th>
 <th className="py-4 px-6 font-bold">تاريخ الانضمام</th>
 <th className="py-4 px-6 font-bold">الإجراءات</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-100">
 {users.map((user) => (
 <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
 <td className="py-4 px-6 text-gray-500 font-mono">#{user.id}</td>
 <td className="py-4 px-6">
 <div className="font-bold text-gray-900">{user.name}</div>
 <div className="text-xs text-gray-500 mt-1 font-mono" dir="ltr">{user.phone}</div>
 </td>
 <td className="py-4 px-6 text-gray-700">{user.role}</td>
 <td className="py-4 px-6">
 <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
 user.status === 'نشط' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
 }`}>
 {user.status}
 </span>
 </td>
 <td className="py-4 px-6">
 <span className={`flex items-center gap-1.5 text-xs font-bold ${
 user.kyc === 'موثق' ? 'text-green-600' : 
 user.kyc === 'قيد المراجعة' ? 'text-yellow-600' : 'text-red-600'
 }`}>
 {user.kyc === 'موثق' ? <CheckCircle size={14} /> : 
 user.kyc === 'مرفوض' ? <Ban size={14} /> : <Shield size={14} />}
 {user.kyc}
 </span>
 </td>
 <td className="py-4 px-6 text-gray-500">{user.joinDate}</td>
 <td className="py-4 px-6">
 <div className="flex items-center gap-2">
 <button className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="تعديل">
 <Edit2 size={16} />
 </button>
 <button onClick={() => handleAction(user.id, 'إيقاف')} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title={user.status === 'نشط' ? 'إيقاف' : 'تنشيط'}>
 {user.status === 'نشط' ? <Ban size={16} /> : <CheckCircle size={16} className="text-green-500" />}
 </button>
 <button className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
 <MoreVertical size={16} />
 </button>
 </div>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 
 {/* Pagination placeholder */}
 <div className="p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
 <div>عرض 1 إلى 5 من 12,450</div>
 <div className="flex gap-1">
 <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>السابق</button>
 <button className="px-3 py-1 bg-[#47CCD0] text-white rounded-lg">1</button>
 <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50">2</button>
 <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50">3</button>
 <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50">التالي</button>
 </div>
 </div>
 </div>
 </div>
 );
};
