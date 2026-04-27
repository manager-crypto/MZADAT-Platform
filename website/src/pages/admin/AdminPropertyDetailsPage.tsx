import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, RefreshCw, AlertCircle, MapPin, Tag, Calendar, DollarSign, User, Home } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const API = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8080';
const SITE = 'http://localhost:3000';

interface Property {
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
  auction: 'نشط (مزاد)',
  pending: 'قيد المراجعة',
  sold: 'مباع',
  draft: 'مسودة',
  rejected: 'مرفوض',
  expired: 'منتهي',
};

const statusStyle: Record<string, string> = {
  auction: 'bg-green-100 text-green-700 border-green-200',
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  sold: 'bg-blue-100 text-blue-700 border-blue-200',
  draft: 'bg-gray-100 text-gray-600 border-gray-200',
  rejected: 'bg-red-100 text-red-700 border-red-200',
  expired: 'bg-red-100 text-red-700 border-red-200',
};

export const AdminPropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const token = localStorage.getItem('admin_token') || '';
  const auctionUrl = `${SITE}/auctions/${id}`;

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      setError('');
      try {
        // Fetch from admin auctions list and find by ID
        const res = await fetch(`${API}/api/admin/auctions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          setError('فشل تحميل البيانات');
          return;
        }
        const data = await res.json();
        const found = (data.data as Property[]).find(p => String(p.id) === id);
        if (!found) {
          setError('العقار غير موجود');
        } else {
          setProperty(found);
        }
      } catch {
        setError('تعذّر الاتصال بالخادم');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProperty();
  }, [id, token]);

  const handleApprove = async () => {
    if (!property) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${API}/api/admin/auctions/${property.id}/approve`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setProperty(p => p ? { ...p, status: 'auction' } : p);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!property) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${API}/api/admin/auctions/${property.id}/reject`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setProperty(p => p ? { ...p, status: 'pending' } : p);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!property || !confirm(`هل تريد حذف "${property.title_ar}"؟`)) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${API}/api/admin/auctions/${property.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) navigate('/admin/auctions', { replace: true });
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in" dir="rtl">
      {/* Back header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/admin/auctions')}
          className="flex items-center gap-2 text-gray-500 hover:text-[#47CCD0] transition-colors font-bold"
        >
          <ArrowRight size={18} />
          العودة للسجل
        </button>
        <span className="text-gray-300">/</span>
        <span className="text-gray-700 font-bold">
          {loading ? 'جاري التحميل...' : property?.title_ar || `عقار #${id}`}
        </span>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-sm">
          <AlertCircle size={16} className="shrink-0" />
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-24 text-gray-400">
          <RefreshCw size={28} className="animate-spin me-3" />
          <span className="font-bold">جاري التحميل...</span>
        </div>
      ) : property ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main details card */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">{property.title_ar}</h1>
                  {property.title_en && (
                    <p className="text-gray-500 text-sm">{property.title_en}</p>
                  )}
                </div>
                <span className={`px-3 py-1.5 rounded-full text-sm font-bold border ${statusStyle[property.status] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                  {statusLabel[property.status] || property.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <DetailRow icon={<Home size={16} />} label="النوع" value={property.type || '—'} />
                <DetailRow icon={<MapPin size={16} />} label="المدينة" value={property.city_ar || property.city_en || '—'} />
                <DetailRow
                  icon={<Tag size={16} />}
                  label="سعر البداية"
                  value={property.starting_bid > 0 ? `${property.starting_bid.toLocaleString('ar-SA')} ريال` : '—'}
                />
                <DetailRow
                  icon={<Tag size={16} />}
                  label="العرض الحالي"
                  value={property.current_bid > 0 ? `${property.current_bid.toLocaleString('ar-SA')} ريال` : '—'}
                />
                <DetailRow
                  icon={<Calendar size={16} />}
                  label="تاريخ الإنشاء"
                  value={new Date(property.created_at).toLocaleDateString('ar-SA-u-nu-latn')}
                />
                <DetailRow
                  icon={<Calendar size={16} />}
                  label="نهاية المزاد"
                  value={property.auction_end ? new Date(property.auction_end).toLocaleDateString('ar-SA-u-nu-latn') : '—'}
                />
                <DetailRow icon={<User size={16} />} label="رقم المالك" value={property.owner_id || '—'} />
                <DetailRow icon={<DollarSign size={16} />} label="رقم العقار" value={`#${property.id}`} />
              </div>
            </div>

            {/* Admin Actions */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">إجراءات المشرف</h2>
              <div className="flex flex-wrap gap-3">
                {property.status !== 'auction' && (
                  <button
                    onClick={handleApprove}
                    disabled={actionLoading}
                    className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-colors disabled:opacity-50"
                  >
                    قبول ونشر المزاد
                  </button>
                )}
                {property.status === 'auction' && (
                  <button
                    onClick={handleReject}
                    disabled={actionLoading}
                    className="flex items-center gap-2 px-5 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl font-bold transition-colors disabled:opacity-50"
                  >
                    إيقاف مؤقت (مراجعة)
                  </button>
                )}
                <button
                  onClick={handleDelete}
                  disabled={actionLoading}
                  className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-colors disabled:opacity-50"
                >
                  حذف العقار نهائياً
                </button>
              </div>
              {(property.status === 'expired' || property.status === 'rejected') && (
                <p className="mt-3 text-sm text-orange-600 bg-orange-50 border border-orange-200 rounded-lg px-4 py-2">
                  ⚠️ هذا العقار {statusLabel[property.status]}. يمكن لـ Super Admin الموافقة عليه وإعادة نشره.
                </p>
              )}
            </div>
          </div>

          {/* QR + Link sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">رمز QR للمزاد</h2>
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-white border-2 border-gray-100 rounded-xl shadow-inner">
                  <QRCodeSVG
                    value={auctionUrl}
                    size={160}
                    bgColor="#ffffff"
                    fgColor="#2B3D50"
                    level="M"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center mb-4 break-all font-mono bg-gray-50 px-3 py-2 rounded-lg">
                {auctionUrl}
              </p>
              <button
                onClick={() => { navigator.clipboard.writeText(auctionUrl); }}
                className="w-full py-2 bg-[#47CCD0]/10 hover:bg-[#47CCD0]/20 text-[#47CCD0] rounded-xl font-bold text-sm transition-colors"
              >
                نسخ الرابط
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3">الرابط المباشر</h2>
              <a
                href={auctionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-2.5 bg-[#2B3D50] hover:bg-[#3a4f65] text-white rounded-xl font-bold text-sm transition-colors"
              >
                فتح صفحة المزاد ↗
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const DetailRow: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
    <div className="text-[#47CCD0] mt-0.5 shrink-0">{icon}</div>
    <div>
      <p className="text-xs text-gray-500 mb-0.5">{label}</p>
      <p className="text-sm font-bold text-gray-900">{value}</p>
    </div>
  </div>
);
