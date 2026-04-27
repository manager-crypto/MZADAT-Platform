import { useState } from 'react';
import {
  History,
  RefreshCw,
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Filter,
  LogIn,
  LogOut,
  CheckCircle2,
  Ban,
  Trash2,
  Eye,
  EyeOff,
  ArrowUpDown,
  UserCog,
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { useTranslation } from '../context/TranslationContext';
import { useApi } from '../hooks/useApi';
import { auditApi } from '../services/auditApi';
import PageWrapper from '../components/PageWrapper';

// ─── Action metadata (label + icon + color) ──────────────────────────────────
const actionMeta: Record<
  string,
  {
    labelAr: string;
    labelEn: string;
    icon: React.ElementType;
    color: string;
    bg: string;
  }
> = {
  ADMIN_LOGIN: {
    labelAr: 'تسجيل دخول',
    labelEn: 'Login',
    icon: LogIn,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  ADMIN_LOGOUT: {
    labelAr: 'تسجيل خروج',
    labelEn: 'Logout',
    icon: LogOut,
    color: 'text-gray-500',
    bg: 'bg-gray-500/10',
  },
  AUCTION_APPROVE: {
    labelAr: 'موافقة على مزاد',
    labelEn: 'Auction Approved',
    icon: CheckCircle2,
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
  AUCTION_REJECT: {
    labelAr: 'رفض مزاد',
    labelEn: 'Auction Rejected',
    icon: Ban,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
  },
  AUCTION_DELETE: {
    labelAr: 'حذف مزاد',
    labelEn: 'Auction Deleted',
    icon: Trash2,
    color: 'text-red-500',
    bg: 'bg-red-500/10',
  },
  SECTION_TOGGLE_VISIBILITY: {
    labelAr: 'إظهار/إخفاء قسم',
    labelEn: 'Section Toggled',
    icon: Eye,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  SECTION_REORDER: {
    labelAr: 'إعادة ترتيب الأقسام',
    labelEn: 'Sections Reordered',
    icon: ArrowUpDown,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  USER_TOGGLE_ACTIVE: {
    labelAr: 'تفعيل/تعطيل مستخدم',
    labelEn: 'User Toggled',
    icon: UserCog,
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
  },
};

// ─── Entity type translations ────────────────────────────────────────────────
const entityLabelsAr: Record<string, string> = {
  property: 'عقار',
  section: 'قسم',
  user: 'مستخدم',
  session: 'جلسة',
};

// ─── Translate details JSON values ───────────────────────────────────────────
function translateDetailsAr(details: Record<string, unknown>): string {
  const translations: Record<string, (v: unknown) => string> = {
    new_status: (v) => {
      const statusMap: Record<string, string> = {
        pending: 'قيد المراجعة',
        auction: 'في المزاد',
        active: 'نشط',
        sold: 'مباع',
      };
      return `الحالة الجديدة: ${statusMap[String(v)] || String(v)}`;
    },
    new_visible: (v) => (v ? 'أصبح مرئياً' : 'أصبح مخفياً'),
    new_active: (v) => (v ? 'أصبح مفعّلاً' : 'أصبح معطّلاً'),
    role: (v) => `الصلاحية: ${v}`,
    count: (v) => `العدد: ${v}`,
  };

  const parts: string[] = [];
  for (const [k, v] of Object.entries(details || {})) {
    if (translations[k]) {
      parts.push(translations[k](v));
    } else {
      parts.push(`${k}: ${JSON.stringify(v)}`);
    }
  }
  return parts.join(' • ');
}

function translateDetailsEn(details: Record<string, unknown>): string {
  const translations: Record<string, (v: unknown) => string> = {
    new_status: (v) => `New status: ${v}`,
    new_visible: (v) => (v ? 'Became visible' : 'Became hidden'),
    new_active: (v) => (v ? 'Activated' : 'Deactivated'),
    role: (v) => `Role: ${v}`,
    count: (v) => `Count: ${v}`,
  };
  const parts: string[] = [];
  for (const [k, v] of Object.entries(details || {})) {
    if (translations[k]) parts.push(translations[k](v));
    else parts.push(`${k}: ${JSON.stringify(v)}`);
  }
  return parts.join(' • ');
}

export default function AuditLog() {
  const { language } = useTranslation();
  const isAr = language === 'ar';

  const [page, setPage] = useState(1);
  const [actionFilter, setActionFilter] = useState<string>('all');
  const [entityFilter, setEntityFilter] = useState<string>('all');

  const { data, loading, error, refetch } = useApi(
    () =>
      auditApi.list({
        page,
        pageSize: 50,
        action: actionFilter === 'all' ? undefined : actionFilter,
        entityType: entityFilter === 'all' ? undefined : entityFilter,
      }),
    [page, actionFilter, entityFilter],
  );

  const entries = data?.data ?? [];
  const totalPages = data?.total_pages ?? 1;

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    // For Arabic use gregorian calendar (easier to read than Hijri)
    return d.toLocaleString(isAr ? 'ar' : 'en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const translateEntity = (entityType: string) =>
    isAr ? entityLabelsAr[entityType] || entityType : entityType;

  const translateDetails = (d: any) =>
    isAr ? translateDetailsAr(d) : translateDetailsEn(d);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <PageWrapper
      title={isAr ? 'سجل التدقيق' : 'Audit Log'}
      subtitle={
        isAr
          ? 'تاريخ كامل لجميع الإجراءات الإدارية (متطلبات SAMA/ZATCA)'
          : 'Full history of all admin actions (SAMA/ZATCA compliance)'
      }
      icon={History}
      actions={
        <Button
          variant="outline"
          onClick={refetch}
          disabled={loading}
          size="sm"
          className="gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">{isAr ? 'تحديث' : 'Refresh'}</span>
        </Button>
      }
    >
      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4 flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground flex-shrink-0">
            <Filter className="w-4 h-4" />
            {isAr ? 'تصفية:' : 'Filters:'}
          </div>
          <Select
            value={actionFilter}
            onValueChange={(v) => {
              setActionFilter(v);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-full sm:w-60">
              <SelectValue placeholder={isAr ? 'الإجراء' : 'Action'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {isAr ? 'كل الإجراءات' : 'All actions'}
              </SelectItem>
              {Object.entries(actionMeta).map(([action, meta]) => (
                <SelectItem key={action} value={action}>
                  {isAr ? meta.labelAr : meta.labelEn}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={entityFilter}
            onValueChange={(v) => {
              setEntityFilter(v);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder={isAr ? 'النوع' : 'Entity'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {isAr ? 'كل الأنواع' : 'All entities'}
              </SelectItem>
              <SelectItem value="property">
                {isAr ? 'عقار' : 'Property'}
              </SelectItem>
              <SelectItem value="section">
                {isAr ? 'قسم' : 'Section'}
              </SelectItem>
              <SelectItem value="user">
                {isAr ? 'مستخدم' : 'User'}
              </SelectItem>
              <SelectItem value="session">
                {isAr ? 'جلسة' : 'Session'}
              </SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {loading && !data && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#5AC4BE]" />
        </div>
      )}

      {error && (
        <Card className="border-red-500/30 bg-red-500/5 mb-6">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-red-500 mb-1">
                {isAr ? 'فشل تحميل السجل' : 'Failed to load audit log'}
              </p>
              <p className="text-sm text-gray-400">{error.message}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {!loading && entries.length === 0 && !error && (
        <Card>
          <CardContent className="p-12 text-center">
            <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              {isAr
                ? 'لا توجد سجلات تطابق الفلتر'
                : 'No log entries match the filter'}
            </p>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {entries.map((entry) => {
          const meta = actionMeta[entry.action] || {
            labelAr: entry.action,
            labelEn: entry.action,
            icon: History,
            color: 'text-gray-500',
            bg: 'bg-gray-500/10',
          };
          const Icon = meta.icon;
          const details = (entry.details as Record<string, unknown>) || {};
          const hasDetails = Object.keys(details).length > 0;

          return (
            <Card key={entry.id}>
              <CardContent className="p-3 sm:p-4 flex items-start gap-3">
                {/* Action icon */}
                <div
                  className={`w-10 h-10 rounded-lg ${meta.bg} ${meta.color} flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Main content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">
                      {isAr ? meta.labelAr : meta.labelEn}
                    </span>
                    <Badge className="bg-muted text-muted-foreground border-0 text-xs">
                      {translateEntity(entry.entity_type)}
                      {entry.entity_id && (
                        <span className="font-mono ms-1 opacity-70">
                          #{String(entry.entity_id).slice(0, 8)}
                        </span>
                      )}
                    </Badge>
                  </div>

                  <p className="text-xs text-muted-foreground truncate mb-1">
                    <span className="font-medium">
                      {entry.admin_email ||
                        (isAr ? 'مستخدم غير معروف' : 'Unknown user')}
                    </span>
                    {hasDetails && (
                      <>
                        <span className="mx-2">•</span>
                        <span>{translateDetails(details)}</span>
                      </>
                    )}
                  </p>
                </div>

                {/* Time + IP */}
                <div className="text-xs text-muted-foreground flex-shrink-0 flex flex-col items-end text-end">
                  <span className="whitespace-nowrap">
                    {formatDate(entry.created_at)}
                  </span>
                  {entry.ip_address && (
                    <span className="font-mono text-[10px] mt-0.5 opacity-70">
                      {entry.ip_address}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Pagination */}
      {data && data.total > 0 && (
        <Card className="mt-6">
          <CardContent className="p-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {isAr
                ? `صفحة ${page} من ${totalPages} • إجمالي ${data.total} سجل`
                : `Page ${page} of ${totalPages} • ${data.total} total entries`}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrev}
                disabled={page === 1 || loading}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                disabled={page === totalPages || loading}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </PageWrapper>
  );
}
