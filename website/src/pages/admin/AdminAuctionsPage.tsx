import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Trash2, Check, X, Eye, Clock, RefreshCw, AlertCircle, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { RiyalSymbol } from '../../components/ui/RiyalSymbol';

const API = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8080';
const SITE = 'http://localhost:3000';

interface Auction {
 id: number;
 title_ar: string;
 title_en: string;
 status: string;
 type: string;
 city_ar: string;
 city_en: string;
 current_bid: number;
 starting_bid: number;
 auction_end: string | null;
 owner_id: string | null;
 created_at: string;
}

const statusLabel: Record<string, string> = {
 auction: 'نشط',
 pending: 'قيد المراجعة',
 sold: 'مباع',
 draft: 'مسودة',
 rejected: 'مرفوض',
 expired: 'منتهي',
};

const statusStyle: Record<string, string> = {
 auction: 'bg-green-100 text-green-700',
 pending: 'bg-yellow-100 text-yellow-700',
 sold: 'bg-blue-100 text-blue-700',
 draft: 'bg-gray-100 text-gray-600',
 rejected: 'bg-red-100 text-red-700',
 expired: 'bg-red-100 text-red-700',
};

export const AdminAuctionsPage: React.FC = () => {
 const navigate = useNavigate();
 const [auctions, setAuctions] = useState<Auction[]>([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState('');
 const [search, setSearch] = useState('');
 const [statusFilter, setStatusFilter] = useState('');
 const [actionLoading, setActionLoading] = useState<number | null>(null);
 const [qrModal, setQrModal] = useState<{ id: number; title: string } | null>(null);

 const token = localStorage.getItem('admin_token') || '';

 const fetchAuctions = useCallback(async () => {
 setLoading(true);
 setError('');
 try {
 const res = await fetch(`${API}/api/admin/auctions`, {
 headers: { Authorization: `Bearer ${token}` },
 });
 if (!res.ok) {
 setError('فشل تحميل البيانات');
 return;
 }
 const data = await res.json();
 setAuctions(data.data || []);
 } catch {
 setError('تعذّر الاتصال بالخادم');
 } finally {
 setLoading(false);
 }
 }, [token]);

 useEffect(() => {
 fetchAuctions();
 }, [fetchAuctions]);

 const handleApprove = async (id: number) => {
 setActionLoading(id);
 try {
 const res = await fetch(`${API}/api/admin/auctions/${id}/approve`, {
 method: 'PATCH',
 headers: { Authorization: `Bearer ${token}` },
 });
 if (res.ok) {
 setAuctions(prev => prev.map(a => a.id === id ? { ...a, status: 'auction' } : a));
 }
 } finally {
 setActionLoading(null);
 }
 };

 const handleReject = async (id: number) => {
 setActionLoading(id);
 try {
 const res = await fetch(`${API}/api/admin/auctions/${id}/reject`, {
 method: 'PATCH',
 headers: { Authorization: `Bearer ${token}` },
 });
 if (res.ok) {
 setAuctions(prev => prev.map(a => a.id === id ? { ...a, status: 'pending' } : a));
 }
 } finally {
 setActionLoading(null);
 }
 };

 const handleDelete = async (id: number, title: string) => {
 if (!confirm(`هل تريد حذف "${title}"؟`)) return;
 setActionLoading(id);
 try {
 const res = await fetch(`${API}/api/admin/auctions/${id}`, {
 method: 'DELETE',
 headers: { Authorization: `Bearer ${token}` },
 });
 if (res.ok) {
 setAuctions(prev => prev.filter(a => a.id !== id));
 }
 } finally {
 setActionLoading(null);
 }
 };

 const filtered = auctions.filter(a => {
 const matchSearch = !search ||
 a.title_ar.includes(search) ||
 a.title_en.toLowerCase().includes(search.toLowerCase()) ||
 a.city_ar.includes(search);
 const matchStatus = !statusFilter || a.status === statusFilter;
 return matchSearch && matchStatus;
 });

 const isRestricted = (status: string) =>
 status === 'expired' || status === 'rejected';

 return (
 <div className="space-y-6 animate-fade-in" dir="rtl">
 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
 <h2 className="text-2xl font-bold text-gray-900">سجل العقارات الكامل</h2>
 <button
 onClick={fetchAuctions}
 disabled={loading}
 className="flex items-center gap-2 bg-[#47CCD0] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#3bb8bc] transition-colors disabled:opacity-60"
 >
 <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
 تحديث
 </button>
 </div>

 {error && (
 <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-sm">
 <AlertCircle size={16} className="shrink-0" />
 {error}
 </div>
 )}

 <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
 <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4">
 <div className="relative flex-1">
 <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
 <input
 type="text"
 value={search}
 onChange={e => setSearch(e.target.value)}
 placeholder="بحث بالعنوان أو المدينة..."
 className="w-full h-10 ps-10 pe-4 rounded-xl border border-gray-200 focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] outline-none text-sm text-start"
 />
 </div>
 <select
 value={statusFilter}
 onChange={e => setStatusFilter(e.target.value)}
 className="h-10 px-4 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#47CCD0]"
 >
 <option value="">جميع الحالات</option>
 <option value="auction">نشط</option>
 <option value="pending">قيد المراجعة</option>
 <option value="sold">مباع</option>
 <option value="draft">مسودة</option>
 <option value="rejected">مرفوض</option>
 <option value="expired">منتهي</option>
 </select>
 </div>

 {loading ? (
 <div className="flex items-center justify-center py-20 text-gray-400">
 <RefreshCw size={28} className="animate-spin me-3" />
 <span className="font-bold">جاري التحميل...</span>
 </div>
 ) : filtered.length === 0 ? (
 <div className="py-20 text-center text-gray-400 font-bold">لا توجد نتائج</div>
 ) : (
 <div className="overflow-x-auto">
 <table className="w-full text-sm">
 <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
 <tr>
 <th className="py-4 px-6 font-bold text-start">#</th>
 <th className="py-4 px-6 font-bold text-start">العنوان</th>
 <th className="py-4 px-6 font-bold text-start">النوع / المدينة</th>
 <th className="py-4 px-6 font-bold text-start">الحالة</th>
 <th className="py-4 px-6 font-bold text-start">
 <span className="flex items-center gap-1">
 السعر (<RiyalSymbol className="w-3 h-3 text-gray-500" />)
 </span>
 </th>
 <th className="py-4 px-6 font-bold text-start">تاريخ الإنشاء</th>
 <th className="py-4 px-6 font-bold text-start">الإجراءات</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-100">
 {filtered.map((auction) => {
 const isActioning = actionLoading === auction.id;
 const restricted = isRestricted(auction.status);
 const price = auction.current_bid > 0 ? auction.current_bid : auction.starting_bid;
 const priceStr = price > 0 ? price.toLocaleString('ar-SA') : '—';
 const createdDate = new Date(auction.created_at).toLocaleDateString('ar-SA');

 return (
 <tr key={auction.id} className="hover:bg-gray-50/50 transition-colors">
 <td className="py-4 px-6 text-gray-400 font-mono text-xs">{auction.id}</td>
 <td className="py-4 px-6">
 <div className="font-bold text-gray-900">{auction.title_ar || auction.title_en}</div>
 {auction.title_en && auction.title_ar && (
 <div className="text-xs text-gray-400 mt-0.5">{auction.title_en}</div>
 )}
 </td>
 <td className="py-4 px-6">
 <div className="text-gray-700 font-bold">{auction.type}</div>
 <div className="text-xs text-gray-400">{auction.city_ar}</div>
 </td>
 <td className="py-4 px-6">
 <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-max ${statusStyle[auction.status] || 'bg-gray-100 text-gray-600'}`}>
 {auction.status === 'pending' && <Clock size={10} />}
 {statusLabel[auction.status] || auction.status}
 </span>
 </td>
 <td className="py-4 px-6 font-mono font-bold text-gray-900">{priceStr}</td>
 <td className="py-4 px-6 text-gray-500 text-xs">{createdDate}</td>
 <td className="py-4 px-6">
 <div className="flex items-center gap-1.5">
 {/* Approve — only for pending/draft/rejected/expired (Super Admin can override) */}
 {auction.status !== 'auction' && auction.status !== 'sold' && (
 <button
 onClick={() => handleApprove(auction.id)}
 disabled={isActioning}
 title="قبول ونشر"
 className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-40"
 >
 <Check size={16} />
 </button>
 )}
 {/* Reject / suspend active auctions */}
 {auction.status === 'auction' && (
 <button
 onClick={() => handleReject(auction.id)}
 disabled={isActioning}
 title="إيقاف مؤقت"
 className="p-1.5 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-40"
 >
 <X size={16} />
 </button>
 )}
 {/* View — always enabled for Super Admin */}
 <button
 onClick={() => navigate(`/admin/properties/${auction.id}`)}
 title={restricted ? 'عرض التفاصيل (مقيّد — Super Admin)' : 'عرض التفاصيل'}
 className={`p-1.5 rounded-lg transition-colors ${
 restricted
 ? 'text-gray-300 hover:text-blue-400 hover:bg-blue-50'
 : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
 }`}
 >
 <Eye size={16} />
 </button>
 {/* QR Code */}
 <button
 onClick={() => setQrModal({ id: auction.id, title: auction.title_ar || auction.title_en })}
 title="رمز QR"
 className="p-1.5 text-gray-400 hover:text-purple-500 hover:bg-purple-50 rounded-lg transition-colors"
 >
 <QrCode size={16} />
 </button>
 {/* Delete */}
 <button
 onClick={() => handleDelete(auction.id, auction.title_ar || auction.title_en)}
 disabled={isActioning}
 title="حذف"
 className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40"
 >
 <Trash2 size={16} />
 </button>
 </div>
 </td>
 </tr>
 );
 })}
 </tbody>
 </table>
 </div>
 )}

 {!loading && filtered.length > 0 && (
 <div className="px-6 py-3 border-t border-gray-100 text-xs text-gray-400 text-start">
 عرض {filtered.length} من أصل {auctions.length} سجل
 </div>
 )}
 </div>

 {/* QR Modal */}
 {qrModal && (
 <div
 className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4"
 onClick={() => setQrModal(null)}
 >
 <div
 className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm"
 onClick={e => e.stopPropagation()}
 dir="rtl"
 >
 <h3 className="text-lg font-bold text-gray-900 mb-1">{qrModal.title}</h3>
 <p className="text-xs text-gray-400 mb-6">رمز QR لصفحة المزاد</p>

 <div className="flex justify-center mb-5">
 <div className="p-3 bg-white border-2 border-gray-100 rounded-xl shadow-inner">
 <QRCodeSVG
 value={`${SITE}/auctions/${qrModal.id}`}
 size={180}
 bgColor="#ffffff"
 fgColor="#2B3D50"
 level="M"
 />
 </div>
 </div>

 <p className="text-xs font-mono text-gray-500 bg-gray-50 rounded-lg px-3 py-2 text-center break-all mb-4">
 {SITE}/auctions/{qrModal.id}
 </p>

 <div className="flex gap-3">
 <button
 onClick={() => { navigator.clipboard.writeText(`${SITE}/auctions/${qrModal.id}`); }}
 className="flex-1 py-2.5 bg-[#47CCD0]/10 hover:bg-[#47CCD0]/20 text-[#47CCD0] rounded-xl font-bold text-sm transition-colors"
 >
 نسخ الرابط
 </button>
 <button
 onClick={() => setQrModal(null)}
 className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-sm transition-colors"
 >
 إغلاق
 </button>
 </div>
 </div>
 </div>
 )}
 </div>
 );
};
