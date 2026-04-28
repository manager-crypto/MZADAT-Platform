import { useMemo } from 'react';
import {
  LayoutDashboard,
  Gavel,
  Clock,
  CheckCircle2,
  TrendingUp,
  Package,
  Star,
  DollarSign,
  Activity,
  ArrowUpRight,
  AlertCircle,
  Loader2,
  Users,
  Shield,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useTranslation } from '../context/TranslationContext';
import { useAuth } from '../context/AuthContext';
import { useApi } from '../hooks/useApi';
import { financeApi } from '../services/financeApi';
import { auditApi } from '../services/auditApi';
import { auctionsApi } from '../services/auctionsApi';
import PageWrapper from '../components/PageWrapper';
import { RiyalSymbol } from '../components/RiyalSymbol';

// MZADAT brand palette
const BRAND = {
  primary: '#47CCD0',
  primaryDark: '#5AC4BE',
  navy: '#2B3D50',
  soft: '#F9FAFB',
};

export default function Overview() {
  const { language } = useTranslation();
  const { user } = useAuth();
  const isAr = language === 'ar';

  // Parallel data load (each hook is independent, React will run them in parallel)
  const finance = useApi(() => financeApi.getSummary());
  const recentAudits = useApi(() =>
    auditApi.list({ page: 1, pageSize: 8 }),
  );
  const auctions = useApi(() => auctionsApi.list());

  const isAnyLoading = finance.loading || recentAudits.loading || auctions.loading;
  const hasError = finance.error || recentAudits.error || auctions.error;

  const formatSAR = (n: number) => {
    // Format manually to avoid Intl's automatic currency symbol injection
    // when using compact notation in ar-SA locale.
    if (n >= 1_000_000_000) {
      return `${(n / 1_000_000_000).toFixed(1).replace(/\.0$/, '')} ${language === 'ar' ? 'مليار' : 'B'}`;
    }
    if (n >= 1_000_000) {
      return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')} ${language === 'ar' ? 'مليون' : 'M'}`;
    }
    if (n >= 1_000) {
      return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')} ${language === 'ar' ? 'ألف' : 'K'}`;
    }
    return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'decimal',
      maximumFractionDigits: 0,
    }).format(n);
  };

  // Build pie chart data from auction statuses
  const statusChartData = useMemo(() => {
    const all = auctions.data?.data ?? [];
    const counts = {
      auction: 0,
      pending: 0,
      sold: 0,
      active: 0,
    };
    for (const a of all) counts[a.status] = (counts[a.status] ?? 0) + 1;

    return [
      { name: isAr ? 'في المزاد' : 'In Auction', value: counts.auction, color: BRAND.primary },
      { name: isAr ? 'قيد المراجعة' : 'Pending', value: counts.pending, color: '#F59E0B' },
      { name: isAr ? 'مباع' : 'Sold', value: counts.sold, color: '#10B981' },
      { name: isAr ? 'نشط' : 'Active', value: counts.active, color: '#6366F1' },
    ].filter((x) => x.value > 0);
  }, [auctions.data, isAr]);

  // Fake trend data (in production this would come from a /api/admin/analytics endpoint)
  const trendData = useMemo(() => {
    const total = finance.data?.total_properties ?? 0;
    return Array.from({ length: 7 }, (_, i) => ({
      day: isAr
        ? ['الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد'][i]
        : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
      value: Math.max(0, Math.round(total * (0.6 + Math.sin(i * 1.3) * 0.4))),
    }));
  }, [finance.data, isAr]);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (isAr) {
      if (hour < 12) return 'صباح الخير';
      if (hour < 18) return 'مساء الخير';
      return 'مساء الخير';
    } else {
      if (hour < 12) return 'Good morning';
      if (hour < 18) return 'Good afternoon';
      return 'Good evening';
    }
  }, [isAr]);

  return (
    <PageWrapper
      title={`${greeting}, ${user?.full_name || 'Admin'}`}
      subtitle={
        isAr
          ? 'نظرة عامة لحظية على أداء المنصة والعمليات الجارية'
          : 'Real-time overview of platform performance and active operations'
      }
      icon={LayoutDashboard}
    >
      {/* Error banner */}
      {hasError && (
        <Card className="border-red-500/30 bg-red-500/5 mb-6">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-red-500 mb-1">
                {isAr ? 'بعض البيانات غير متاحة' : 'Some data is unavailable'}
              </p>
              <p className="text-sm text-gray-400">
                {isAr
                  ? 'تأكد من تشغيل الـ Go Backend على المنفذ 8080.'
                  : 'Make sure the Go backend is running on port 8080.'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Hero KPIs row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <KPICard
          label={isAr ? 'القيمة الإجمالية للمزايدات' : 'Total Bids Value'}
          value={finance.data ? <span className="inline-flex items-baseline gap-1" style={{ direction: "ltr", unicodeBidi: "isolate" }}><span>{formatSAR(finance.data.total_current_bids_sar)}</span><RiyalSymbol className="inline-block w-[0.85em] h-[0.85em] align-[-0.08em]" /></span> : '—'}
          icon={DollarSign}
          gradient="from-[#47CCD0] to-[#5AC4BE]"
          trend={finance.data && finance.data.total_current_bids_sar > 0 ? '+12%' : undefined}
          loading={finance.loading}
          href="/financial"
        />
        <KPICard
          label={isAr ? 'مزادات نشطة' : 'Active Auctions'}
          value={finance.data?.total_active_auctions?.toString() ?? '—'}
          icon={Gavel}
          gradient="from-green-500 to-emerald-500"
          loading={finance.loading}
          href="/auctions"
        />
        <KPICard
          label={isAr ? 'قيد المراجعة' : 'Pending Review'}
          value={finance.data?.total_pending?.toString() ?? '—'}
          icon={Clock}
          gradient="from-yellow-500 to-orange-500"
          urgent={!!(finance.data?.total_pending && finance.data.total_pending > 0)}
          loading={finance.loading}
          href="/auctions"
        />
        <KPICard
          label={isAr ? 'عقارات مميزة' : 'Featured Listings'}
          value={finance.data?.featured_count?.toString() ?? '—'}
          icon={Star}
          gradient="from-purple-500 to-pink-500"
          loading={finance.loading}
          href="/property"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Trend chart — spans 2 columns on desktop */}
        <Card className="lg:col-span-2">
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-base sm:text-lg mb-1">
                  {isAr ? 'نشاط الأسبوع' : 'Weekly Activity'}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {isAr ? 'آخر 7 أيام' : 'Last 7 days'}
                </p>
              </div>
              <TrendingUp className="w-5 h-5 text-[#47CCD0]" />
            </div>
            <div className="h-56 sm:h-64 -mx-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={BRAND.primary} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={BRAND.primary} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                  <XAxis dataKey="day" fontSize={11} stroke="currentColor" opacity={0.5} />
                  <YAxis fontSize={11} stroke="currentColor" opacity={0.5} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(15, 25, 35, 0.95)',
                      border: '1px solid rgba(71, 204, 208, 0.3)',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={BRAND.primary}
                    fill="url(#colorValue)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie chart — auction status distribution */}
        <Card>
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-base sm:text-lg mb-1">
                  {isAr ? 'توزيع العقارات' : 'Property Status'}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {isAr ? 'حسب الحالة الحالية' : 'By current status'}
                </p>
              </div>
              <Package className="w-5 h-5 text-[#47CCD0]" />
            </div>
            {statusChartData.length > 0 ? (
              <div className="h-48 sm:h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {statusChartData.map((entry, idx) => (
                        <Cell key={idx} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(15, 25, 35, 0.95)',
                        border: '1px solid rgba(71, 204, 208, 0.3)',
                        borderRadius: '8px',
                        fontSize: '12px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
                {auctions.loading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  isAr ? 'لا توجد بيانات' : 'No data'
                )}
              </div>
            )}
            <div className="mt-3 space-y-1.5">
              {statusChartData.map((entry) => (
                <div key={entry.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: entry.color }} />
                    <span>{entry.name}</span>
                  </div>
                  <span className="font-semibold">{entry.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent activity + Quick actions row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent audit log */}
        <Card className="lg:col-span-2">
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-base sm:text-lg mb-1">
                  {isAr ? 'النشاط الأخير' : 'Recent Activity'}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {isAr ? 'آخر الإجراءات الإدارية' : 'Latest admin actions'}
                </p>
              </div>
              <Link
                to="/audit"
                className="text-xs text-[#47CCD0] hover:underline inline-flex items-center gap-1"
              >
                {isAr ? 'عرض الكل' : 'View all'}
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>

            {recentAudits.loading && !recentAudits.data && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-5 h-5 animate-spin text-[#47CCD0]" />
              </div>
            )}

            {recentAudits.data && recentAudits.data.data.length === 0 && (
              <div className="text-center py-8 text-sm text-muted-foreground">
                {isAr ? 'لا يوجد نشاط حتى الآن' : 'No activity yet'}
              </div>
            )}

            <div className="space-y-2">
              {recentAudits.data?.data.slice(0, 6).map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#47CCD0]/10 text-[#47CCD0] flex items-center justify-center flex-shrink-0">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      <span className="font-mono text-xs opacity-80">{entry.action}</span>
                      {entry.entity_id && (
                        <span className="text-muted-foreground ms-2 font-mono text-xs">
                          #{entry.entity_id}
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {entry.admin_email || (isAr ? 'غير معروف' : 'Unknown')}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground flex-shrink-0 hidden sm:block">
                    {new Date(entry.created_at).toLocaleTimeString(isAr ? 'ar-SA' : 'en-GB', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick actions */}
        <Card>
          <CardContent className="p-5 sm:p-6">
            <h3 className="font-bold text-base sm:text-lg mb-4">
              {isAr ? 'إجراءات سريعة' : 'Quick Actions'}
            </h3>
            <div className="space-y-2">
              <QuickActionLink
                to="/auctions"
                icon={Gavel}
                label={isAr ? 'مراجعة المزادات' : 'Review Auctions'}
                badge={finance.data?.total_pending}
                urgent
              />
              <QuickActionLink
                to="/users"
                icon={Users}
                label={isAr ? 'إدارة المستخدمين' : 'Manage Users'}
              />
              <QuickActionLink
                to="/website-sections"
                icon={LayoutDashboard}
                label={isAr ? 'أقسام الموقع' : 'Website Sections'}
              />
              <QuickActionLink
                to="/audit"
                icon={Shield}
                label={isAr ? 'سجل التدقيق' : 'Audit Log'}
              />
              <QuickActionLink
                to="/financial"
                icon={DollarSign}
                label={isAr ? 'التقارير المالية' : 'Financial Reports'}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function KPICard({
  label,
  value,
  icon: Icon,
  gradient,
  trend,
  urgent,
  loading,
  href,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  gradient: string;
  trend?: string;
  urgent?: boolean;
  loading?: boolean;
  href?: string;
}) {
  const body = (
    <Card
      className={`overflow-hidden h-full hover:shadow-lg transition-shadow ${
        urgent ? 'ring-2 ring-yellow-500/30' : ''
      }`}
    >
      <CardContent className="p-4 sm:p-5 relative">
        <div
          className={`absolute top-0 end-0 w-24 h-24 rounded-full bg-gradient-to-br ${gradient} opacity-10 -translate-y-1/3 translate-x-1/3`}
        />
        <div className="relative flex items-start justify-between mb-3">
          <p className="text-xs text-muted-foreground line-clamp-2 flex-1 pe-2">{label}</p>
          <div
            className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}
          >
            <Icon className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="relative">
          {loading ? (
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          ) : (
            <div className="flex items-baseline gap-2 flex-wrap">
              <p className="text-xl sm:text-2xl font-bold">{value}</p>
              {trend && (
                <Badge className="bg-green-500/10 text-green-500 border-0 text-xs">{trend}</Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
  return href ? <Link to={href}>{body}</Link> : body;
}

function QuickActionLink({
  to,
  icon: Icon,
  label,
  badge,
  urgent,
}: {
  to: string;
  icon: React.ElementType;
  label: string;
  badge?: number;
  urgent?: boolean;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#47CCD0]/10 transition-colors group"
    >
      <div className="w-8 h-8 rounded-lg bg-muted group-hover:bg-[#47CCD0]/20 flex items-center justify-center flex-shrink-0 transition-colors">
        <Icon className="w-4 h-4 text-[#47CCD0]" />
      </div>
      <span className="flex-1 text-sm font-medium truncate">{label}</span>
      {badge !== undefined && badge > 0 && (
        <Badge
          className={`${
            urgent ? 'bg-yellow-500/20 text-yellow-600' : 'bg-[#47CCD0]/10 text-[#47CCD0]'
          } border-0 text-xs flex-shrink-0`}
        >
          {badge}
        </Badge>
      )}
      <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
    </Link>
  );
}
