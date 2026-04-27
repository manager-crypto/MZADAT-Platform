import { useState, useMemo } from 'react';
import {
  Globe,
  Eye,
  EyeOff,
  GripVertical,
  RefreshCw,
  Save,
  AlertCircle,
  Loader2,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';
import { toast } from 'sonner';
import { useTranslation } from '../context/TranslationContext';
import { useApi } from '../hooks/useApi';
import { sectionsApi, SiteSection } from '../services/sectionsApi';
import PageWrapper from '../components/PageWrapper';

export default function WebsiteSectionsManager() {
  const { language } = useTranslation();
  const isAr = language === 'ar';

  const { data, loading, error, refetch } = useApi(() => sectionsApi.list('home'));
  const [localOrder, setLocalOrder] = useState<SiteSection[] | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const sections = localOrder ?? data?.data ?? [];
  const hasUnsavedOrder = localOrder !== null;

  const visibleCount = useMemo(
    () => sections.filter((s) => s.is_visible).length,
    [sections],
  );

  const handleToggle = async (section: SiteSection) => {
    setToggling(section.id);
    // Optimistic update
    const optimistic = sections.map((s) =>
      s.id === section.id ? { ...s, is_visible: !s.is_visible } : s,
    );
    setLocalOrder(optimistic);

    try {
      await sectionsApi.toggleVisibility(section.id);
      toast.success(
        isAr
          ? section.is_visible
            ? 'تم إخفاء القسم من الموقع'
            : 'تم إظهار القسم في الموقع'
          : section.is_visible
            ? 'Section hidden from website'
            : 'Section shown on website',
      );
      // Refetch to sync server state
      await refetch();
      setLocalOrder(null);
    } catch (err) {
      toast.error(isAr ? 'فشلت العملية' : 'Operation failed');
      // Revert
      setLocalOrder(data?.data ?? null);
    } finally {
      setToggling(null);
    }
  };

  // Drag-and-drop reorder
  const handleDragStart = (id: string) => setDraggedId(id);
  const handleDragEnd = () => setDraggedId(null);

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) return;

    const current = localOrder ?? data?.data ?? [];
    const draggedIdx = current.findIndex((s) => s.id === draggedId);
    const targetIdx = current.findIndex((s) => s.id === targetId);
    if (draggedIdx === -1 || targetIdx === -1) return;

    const reordered = [...current];
    const [removed] = reordered.splice(draggedIdx, 1);
    reordered.splice(targetIdx, 0, removed);
    // Recompute sort_order
    const withOrder = reordered.map((s, idx) => ({ ...s, sort_order: idx + 1 }));
    setLocalOrder(withOrder);
  };

  const handleSaveOrder = async () => {
    if (!localOrder) return;
    setSaving(true);
    try {
      await sectionsApi.reorder(
        localOrder.map((s) => ({ id: s.id, sort_order: s.sort_order })),
      );
      toast.success(isAr ? 'تم حفظ الترتيب' : 'Order saved');
      await refetch();
      setLocalOrder(null);
    } catch (err) {
      toast.error(isAr ? 'فشل حفظ الترتيب' : 'Failed to save order');
    } finally {
      setSaving(false);
    }
  };

  const handleDiscardOrder = () => setLocalOrder(null);

  return (
    <PageWrapper
      title={isAr ? 'إدارة أقسام الموقع' : 'Website Sections'}
      subtitle={
        isAr
          ? 'تحكم في ظهور وترتيب الأقسام على الصفحة الرئيسية للموقع'
          : 'Control visibility and order of sections on the main website'
      }
      icon={Globe}
      actions={
        <>
          {hasUnsavedOrder && (
            <>
              <Button variant="outline" onClick={handleDiscardOrder} size="sm">
                {isAr ? 'إلغاء' : 'Discard'}
              </Button>
              <Button onClick={handleSaveOrder} disabled={saving} size="sm" className="gap-2">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isAr ? 'حفظ الترتيب' : 'Save order'}
              </Button>
            </>
          )}
          <Button variant="outline" onClick={refetch} disabled={loading} size="sm" className="gap-2">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isAr ? 'تحديث' : 'Refresh'}</span>
          </Button>
        </>
      }
    >
      {/* Status banner */}
      {!loading && !error && (
        <Card className="mb-6 border-[#5AC4BE]/30 bg-[#5AC4BE]/5">
          <CardContent className="p-4 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#5AC4BE] flex-shrink-0" />
            <div className="text-sm flex-1">
              <span className="font-semibold">
                {isAr
                  ? `${visibleCount} من ${sections.length} أقسام ظاهرة على الموقع`
                  : `${visibleCount} of ${sections.length} sections visible on website`}
              </span>
              {hasUnsavedOrder && (
                <span className="text-yellow-500 ms-2">
                  {isAr ? '• لديك تغييرات غير محفوظة' : '• You have unsaved changes'}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loading */}
      {loading && !data && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#5AC4BE]" />
        </div>
      )}

      {/* Error */}
      {error && (
        <Card className="border-red-500/30 bg-red-500/5 mb-6">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-red-500 mb-1">
                {isAr ? 'فشل الاتصال بالخادم' : 'Connection failed'}
              </p>
              <p className="text-sm text-gray-400 mb-3">{error.message}</p>
              <Button onClick={refetch} size="sm" variant="outline">
                {isAr ? 'إعادة المحاولة' : 'Retry'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sections list */}
      {!loading && !error && sections.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground mb-3 flex items-center gap-2">
            <GripVertical className="w-3.5 h-3.5" />
            {isAr
              ? 'اسحب عناصر القائمة لإعادة ترتيبها'
              : 'Drag items to reorder them'}
          </p>

          {sections.map((section, idx) => (
            <Card
              key={section.id}
              draggable
              onDragStart={() => handleDragStart(section.id)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => handleDragOver(e, section.id)}
              className={`cursor-move transition-all ${
                draggedId === section.id ? 'opacity-50 scale-[0.98]' : ''
              } ${!section.is_visible ? 'opacity-60' : ''}`}
            >
              <CardContent className="p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
                <GripVertical className="w-5 h-5 text-gray-400 flex-shrink-0" />

                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#5AC4BE]/10 flex items-center justify-center text-sm font-bold text-[#5AC4BE]">
                  {idx + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm sm:text-base truncate">
                      {isAr ? section.name_ar : section.name_en}
                    </h3>
                    {section.is_visible ? (
                      <Badge className="bg-green-500/10 text-green-500 border-0 text-xs">
                        <Eye className="w-3 h-3 me-1" />
                        {isAr ? 'ظاهر' : 'Visible'}
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-500/10 text-gray-500 border-0 text-xs">
                        <EyeOff className="w-3 h-3 me-1" />
                        {isAr ? 'مخفي' : 'Hidden'}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>
                      {isAr ? 'صفحة:' : 'Page:'} <code>{section.page}</code>
                    </span>
                    {section.route && (
                      <>
                        <span>•</span>
                        <a
                          href={section.route}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#5AC4BE] hover:underline inline-flex items-center gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <code>{section.route}</code>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex-shrink-0 flex items-center gap-2">
                  {toggling === section.id ? (
                    <Loader2 className="w-5 h-5 animate-spin text-[#5AC4BE]" />
                  ) : (
                    <Switch
                      checked={section.is_visible}
                      onCheckedChange={() => handleToggle(section)}
                      aria-label={
                        section.is_visible
                          ? isAr ? 'إخفاء القسم' : 'Hide section'
                          : isAr ? 'إظهار القسم' : 'Show section'
                      }
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </PageWrapper>
  );
}
