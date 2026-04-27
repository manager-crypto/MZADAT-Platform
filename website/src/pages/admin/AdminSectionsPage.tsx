import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Eye, EyeOff, GripVertical, RefreshCw, AlertCircle,
  CheckCircle2, ExternalLink, Save, Monitor, ChevronUp, ChevronDown
} from 'lucide-react';

const API = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8080';
const SITE = 'http://localhost:3000';

interface Section {
  id: string;
  name_ar: string;
  name_en: string;
  page: string;
  route: string | null;
  icon: string | null;
  sort_order: number;
  is_visible: boolean;
}

// ─── Toast ─────────────────────────────────────────────────────────────────
const Toast: React.FC<{ msg: string }> = ({ msg }) =>
  msg ? (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] flex items-center gap-2 bg-[#2B3D50] text-white px-5 py-3 rounded-2xl shadow-2xl text-sm font-bold pointer-events-none">
      <CheckCircle2 size={16} className="text-[#47CCD0] shrink-0" />
      {msg}
    </div>
  ) : null;

export const AdminSectionsPage: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const [selectedPage, setSelectedPage] = useState('home');

  // Drag-and-drop refs (only handle triggers it)
  const dragIdx = useRef<number | null>(null);
  const dragOverIdx = useRef<number | null>(null);
  const isDragging = useRef(false);

  const token = localStorage.getItem('admin_token') ?? '';

  const flash = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2800);
  };

  // ── Fetch ─────────────────────────────────────────────────────────────────
  const fetchSections = useCallback(async () => {
    setLoading(true);
    setError('');
    setIsDirty(false);
    try {
      const res = await fetch(`${API}/api/admin/sections?page=${selectedPage}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setSections(data.data ?? []);
    } catch (e) {
      setError(`تعذّر تحميل الأقسام — ${(e as Error).message}`);
    } finally {
      setLoading(false);
    }
  }, [token, selectedPage]);

  useEffect(() => { fetchSections(); }, [fetchSections]);

  // ── Toggle visibility ─────────────────────────────────────────────────────
  const toggleVisibility = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();          // prevent any drag parent from eating the click
    e.preventDefault();
    if (togglingId) return;       // debounce: one toggle at a time

    setTogglingId(id);

    // Optimistic flip
    setSections(prev =>
      prev.map(s => s.id === id ? { ...s, is_visible: !s.is_visible } : s)
    );

    try {
      const res = await fetch(
        `${API}/api/admin/sections/${id}/toggle-visibility`,
        { method: 'PATCH', headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: { is_visible: boolean } = await res.json();
      // Sync from server truth
      setSections(prev =>
        prev.map(s => s.id === id ? { ...s, is_visible: data.is_visible } : s)
      );
      flash(data.is_visible ? 'القسم مرئي الآن ✓' : 'تم إخفاء القسم ✓');
    } catch (err) {
      // Revert on error
      setSections(prev =>
        prev.map(s => s.id === id ? { ...s, is_visible: !s.is_visible } : s)
      );
      flash('فشل التحديث — تحقق من اتصال الخادم');
    } finally {
      setTogglingId(null);
    }
  };

  // ── Arrow reorder ─────────────────────────────────────────────────────────
  const moveSection = (e: React.MouseEvent, idx: number, dir: -1 | 1) => {
    e.stopPropagation();
    e.preventDefault();
    const next = idx + dir;
    if (next < 0 || next >= sections.length) return;
    setSections(prev => {
      const arr = [...prev];
      [arr[idx], arr[next]] = [arr[next], arr[idx]];
      return arr.map((s, i) => ({ ...s, sort_order: i + 1 }));
    });
    setIsDirty(true);
  };

  // ── Native HTML5 DnD — only the grip handle triggers it ──────────────────
  const onHandleDragStart = (e: React.DragEvent<HTMLDivElement>, idx: number) => {
    isDragging.current = true;
    dragIdx.current = idx;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(idx));
  };

  const onRowDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    if (!isDragging.current) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const onRowDragEnter = (e: React.DragEvent<HTMLLIElement>, idx: number) => {
    if (!isDragging.current) return;
    e.preventDefault();
    dragOverIdx.current = idx;
    // highlight
    e.currentTarget.classList.add('ring-2', 'ring-[#47CCD0]', 'ring-inset');
  };

  const onRowDragLeave = (e: React.DragEvent<HTMLLIElement>) => {
    e.currentTarget.classList.remove('ring-2', 'ring-[#47CCD0]', 'ring-inset');
  };

  const onRowDrop = (e: React.DragEvent<HTMLLIElement>, dropIdx: number) => {
    e.preventDefault();
    e.currentTarget.classList.remove('ring-2', 'ring-[#47CCD0]', 'ring-inset');
    const from = dragIdx.current;
    isDragging.current = false;
    if (from === null || from === dropIdx) return;

    setSections(prev => {
      const arr = [...prev];
      const [moved] = arr.splice(from, 1);
      arr.splice(dropIdx, 0, moved);
      return arr.map((s, i) => ({ ...s, sort_order: i + 1 }));
    });
    setIsDirty(true);
    dragIdx.current = null;
    dragOverIdx.current = null;
  };

  const onDragEnd = () => {
    isDragging.current = false;
    dragIdx.current = null;
    dragOverIdx.current = null;
    document.querySelectorAll('.ring-\\[\\#47CCD0\\]').forEach(el =>
      el.classList.remove('ring-2', 'ring-[#47CCD0]', 'ring-inset')
    );
  };

  // ── Save order ────────────────────────────────────────────────────────────
  const saveOrder = async () => {
    setSaving(true);
    try {
      const payload = sections.map((s, i) => ({ id: s.id, sort_order: i + 1 }));
      const res = await fetch(`${API}/api/admin/sections/reorder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setIsDirty(false);
      flash('تم حفظ الترتيب في قاعدة البيانات ✓');
    } catch (err) {
      flash(`فشل الحفظ — ${(err as Error).message}`);
    } finally {
      setSaving(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6" dir="rtl">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">إدارة أقسام وصفحات الموقع</h2>
          <p className="text-sm text-gray-500 mt-1">اسحب لإعادة الترتيب · انقر العين للإخفاء/الإظهار · احفظ لتطبيق الترتيب</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <a
            href={SITE}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-sm transition-colors"
          >
            <Monitor size={15} />
            معاينة مباشرة
            <ExternalLink size={11} className="opacity-50" />
          </a>
          <button
            onClick={fetchSections}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-bold text-sm transition-colors disabled:opacity-50"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            تحديث
          </button>
          <button
            onClick={saveOrder}
            disabled={!isDirty || saving}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
              isDirty
                ? 'bg-[#47CCD0] hover:bg-[#35b5b9] text-white shadow-md shadow-[#47CCD0]/30'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {saving
              ? <RefreshCw size={15} className="animate-spin" />
              : <Save size={15} />
            }
            حفظ الترتيب
          </button>
        </div>
      </div>

      {/* Page selector tabs */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide me-1">الصفحة</span>
        {(['home', 'auctions', 'services'] as const).map(p => (
          <button
            key={p}
            onClick={() => setSelectedPage(p)}
            className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${
              selectedPage === p
                ? 'bg-[#2B3D50] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {p === 'home' ? 'الرئيسية' : p === 'auctions' ? 'المزادات' : 'الخدمات'}
          </button>
        ))}
      </div>

      {/* Unsaved-changes banner */}
      {isDirty && (
        <div className="flex items-center justify-between gap-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-4 py-3 text-sm">
          <div className="flex items-center gap-2 font-bold">
            <AlertCircle size={15} />
            ترتيب غير محفوظ — اضغط "حفظ الترتيب" لتطبيق التغييرات
          </div>
          <button
            onClick={saveOrder}
            disabled={saving}
            className="px-3 py-1 bg-amber-200 hover:bg-amber-300 rounded-lg font-bold text-xs transition-colors"
          >
            حفظ الآن
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-sm">
          <AlertCircle size={16} className="shrink-0" />
          {error}
        </div>
      )}

      {/* Section list */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-24 text-gray-400">
            <RefreshCw size={26} className="animate-spin me-2" />
            <span className="font-bold">جاري التحميل...</span>
          </div>
        ) : sections.length === 0 ? (
          <div className="py-20 text-center text-gray-400 font-bold text-sm">لا توجد أقسام</div>
        ) : (
          <ul>
            {sections.map((section, idx) => {
              const isToggling = togglingId === section.id;
              return (
                <li
                  key={section.id}
                  onDragOver={onRowDragOver}
                  onDragEnter={e => onRowDragEnter(e, idx)}
                  onDragLeave={onRowDragLeave}
                  onDrop={e => onRowDrop(e, idx)}
                  className={`flex items-center gap-3 px-5 py-3.5 border-b border-gray-100 last:border-0 transition-colors ${
                    section.is_visible ? 'bg-white hover:bg-gray-50/50' : 'bg-gray-50'
                  }`}
                >
                  {/* Grip handle — this is the ONLY draggable element */}
                  <div
                    draggable
                    onDragStart={e => onHandleDragStart(e, idx)}
                    onDragEnd={onDragEnd}
                    className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 transition-colors shrink-0 p-1 rounded"
                    title="اسحب لإعادة الترتيب"
                  >
                    <GripVertical size={18} />
                  </div>

                  {/* Rank */}
                  <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-bold text-gray-500 shrink-0">
                    {idx + 1}
                  </div>

                  {/* Labels */}
                  <div className="flex-1 min-w-0">
                    <p className={`font-bold text-sm ${section.is_visible ? 'text-gray-900' : 'text-gray-400 line-through'}`}>
                      {section.name_ar}
                    </p>
                    <p className="text-xs text-gray-400">{section.name_en}</p>
                    {section.route && (
                      <span className="inline-block text-[10px] font-mono text-[#47CCD0] bg-[#47CCD0]/5 px-1.5 py-0.5 rounded mt-0.5">
                        {section.route}
                      </span>
                    )}
                  </div>

                  {/* Status pill */}
                  <span className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-bold ${
                    section.is_visible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {section.is_visible ? 'ظاهر' : 'مخفي'}
                  </span>

                  {/* Up / down arrows */}
                  <div className="flex flex-col shrink-0">
                    <button
                      type="button"
                      onClick={e => moveSection(e, idx, -1)}
                      disabled={idx === 0}
                      className="p-0.5 text-gray-400 hover:text-[#47CCD0] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                      title="للأعلى"
                    >
                      <ChevronUp size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={e => moveSection(e, idx, 1)}
                      disabled={idx === sections.length - 1}
                      className="p-0.5 text-gray-400 hover:text-[#47CCD0] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                      title="للأسفل"
                    >
                      <ChevronDown size={16} />
                    </button>
                  </div>

                  {/* Visibility toggle — isolated, non-draggable */}
                  <button
                    type="button"
                    onClick={e => toggleVisibility(e, section.id)}
                    disabled={isToggling}
                    title={section.is_visible ? 'انقر لإخفاء هذا القسم' : 'انقر لإظهار هذا القسم'}
                    className={`shrink-0 p-2 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-[#47CCD0] ${
                      isToggling
                        ? 'opacity-40 cursor-wait'
                        : section.is_visible
                          ? 'text-[#47CCD0] hover:bg-[#47CCD0]/10 active:scale-90'
                          : 'text-gray-400 hover:bg-gray-100 active:scale-90'
                    }`}
                  >
                    {isToggling
                      ? <RefreshCw size={18} className="animate-spin" />
                      : section.is_visible
                        ? <Eye size={18} />
                        : <EyeOff size={18} />
                    }
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Legend */}
      {!loading && sections.length > 0 && (
        <p className="text-xs text-gray-400 flex items-center gap-4 px-1">
          <span className="flex items-center gap-1"><GripVertical size={12} /> اسحب الأيقونة لتغيير الترتيب</span>
          <span className="flex items-center gap-1"><Eye size={12} /> / <EyeOff size={12} /> انقر للتبديل الفوري</span>
          <span className="flex items-center gap-1"><Save size={12} /> احفظ لتثبيت الترتيب في DB</span>
        </p>
      )}

      {/* Info box about main-site sync */}
      {!loading && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
          <strong>مزامنة الموقع الرئيسي:</strong> تغييرات الإخفاء/الظهور محفوظة فوراً في DB وتنعكس على{' '}
          <code className="bg-blue-100 px-1 rounded">/api/sections</code>.
          الموقع الرئيسي سيقرأ الأقسام المرئية فقط عند كل تحميل.
        </div>
      )}

      <Toast msg={toast} />
    </div>
  );
};
