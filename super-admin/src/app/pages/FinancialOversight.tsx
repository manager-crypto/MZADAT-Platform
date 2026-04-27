import {
  DollarSign,
  Gavel,
  TrendingUp,
  Package,
  Star,
  RefreshCw,
  Loader2,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useTranslation } from '../context/TranslationContext';
import { useApi } from '../hooks/useApi';
import { financeApi } from '../services/financeApi';
import PageWrapper from '../components/PageWrapper';

export default function FinancialOversight() {
  const { language } = useTranslation();
  const isAr = language === 'ar';

  const { data, loading, error, refetch } = useApi(() => financeApi.getSummary());

  const formatSAR = (n: number) =>
    new Intl.NumberFormat(isAr ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: 'SAR',
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <PageWrapper
      title={isAr ? 'المراقبة المالية' : 'Financial Oversight'}
      subtitle={
        isAr
          ? 'نظرة عامة على أداء المزادات والمعاملات المالية'
          : 'Overview of auction performance and financial activity'
      }
      icon={DollarSign}
      actions={
        <Button variant="outline" onClick={refetch} disabled={loading} size="sm" className="gap-2">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">{isAr ? 'تحديث' : 'Refresh'}</span>
        </Button>
      }
    >
      {loading && !data && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#5AC4BE]" />
        </div>
      )}

      {error && (
        <Card className="border-red-500/30 bg-red-500/5">
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

      {data && (
        <>
          {/* Hero KPIs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <KPICard
              label={isAr ? 'إجمالي المزايدات الحالية' : 'Total Current Bids'}
              value={formatSAR(data.total_current_bids_sar)}
              icon={Gavel}
              gradient="from-[#5AC4BE] to-[#47CCD0]"
              big
            />
            <KPICard
              label={isAr ? 'إجمالي الأسعار الابتدائية' : 'Total Starting Bids'}
              value={formatSAR(data.total_starting_bids_sar)}
              icon={TrendingUp}
              gradient="from-[#2B3D50] to-[#47CCD0]/40"
              big
            />
            <KPICard
              label={isAr ? 'متوسط سعر العقار' : 'Average Property Price'}
              value={formatSAR(data.avg_price_total_sar)}
              icon={DollarSign}
              gradient="from-yellow-500 to-orange-500"
              big
            />
          </div>

          {/* Counts */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <MiniStat
              label={isAr ? 'كل العقارات' : 'Total Properties'}
              value={data.total_properties}
              icon={Package}
              color="text-[#5AC4BE]"
            />
            <MiniStat
              label={isAr ? 'مزادات نشطة' : 'Active Auctions'}
              value={data.total_active_auctions}
              icon={Gavel}
              color="text-green-500"
            />
            <MiniStat
              label={isAr ? 'قيد المراجعة' : 'Pending'}
              value={data.total_pending}
              icon={Clock}
              color="text-yellow-500"
            />
            <MiniStat
              label={isAr ? 'مميّزة' : 'Featured'}
              value={data.featured_count}
              icon={Star}
              color="text-purple-500"
            />
          </div>

          {/* Sold summary */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {isAr ? 'إجمالي المباع' : 'Total Sold'}
                  </p>
                  <p className="text-3xl font-bold text-green-500">{data.total_sold}</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center">
                  <TrendingUp className="w-7 h-7 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="text-xs text-muted-foreground text-center">
            {isAr ? 'آخر تحديث:' : 'Last updated:'}{' '}
            {new Date(data.generated_at).toLocaleString(isAr ? 'ar-SA' : 'en-GB')}
          </p>
        </>
      )}
    </PageWrapper>
  );
}

function KPICard({
  label,
  value,
  icon: Icon,
  gradient,
  big,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  gradient: string;
  big?: boolean;
}) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5 sm:p-6 relative">
        <div className={`absolute top-0 end-0 w-32 h-32 rounded-full bg-gradient-to-br ${gradient} opacity-10 -translate-y-1/3 translate-x-1/3`} />
        <div className="relative flex items-start justify-between mb-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm text-muted-foreground mb-2">{label}</p>
            <p className={`${big ? 'text-2xl sm:text-3xl' : 'text-xl'} font-bold truncate`}>
              {value}
            </p>
          </div>
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MiniStat({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <Card>
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-muted-foreground">{label}</p>
          <Icon className={`w-4 h-4 ${color}`} />
        </div>
        <p className="text-2xl sm:text-3xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
