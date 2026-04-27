import { useState, useMemo } from 'react';
import {
  Gavel,
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Search,
  MapPin,
  Eye,
  Ban,
  Trash2,
  Loader2,
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog';
import { toast } from 'sonner';
import { useTranslation } from '../context/TranslationContext';
import { useApi } from '../hooks/useApi';
import { auctionsApi, AuctionRow } from '../services/auctionsApi';
import PageWrapper from '../components/PageWrapper';

type StatusFilter = 'all' | 'active' | 'sold' | 'auction' | 'pending';

const statusStyles: Record<string, { bg: string; text: string; label: { ar: string; en: string } }> = {
  active:   { bg: 'bg-green-500/10',  text: 'text-green-500',  label: { ar: 'نشط', en: 'Active' } },
  auction:  { bg: 'bg-[#5AC4BE]/10',  text: 'text-[#5AC4BE]',  label: { ar: 'في المزاد', en: 'In Auction' } },
  pending:  { bg: 'bg-yellow-500/10', text: 'text-yellow-500', label: { ar: 'قيد المراجعة', en: 'Pending' } },
  sold:     { bg: 'bg-gray-500/10',   text: 'text-gray-500',   label: { ar: 'مباع', en: 'Sold' } },
};

export default function AuctionControl() {
  const { language } = useTranslation();
  const isAr = language === 'ar';

  const { data, loading, error, refetch } = useApi(() => auctionsApi.list());

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [actioning, setActioning] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AuctionRow | null>(null);

  const auctions = data?.data ?? [];

  // Filter locally for instant feedback
  const filtered = useMemo(() => {
    let result = auctions;
    if (statusFilter !== 'all') {
      result = result.filter((a) => a.status === statusFilter);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (a) =>
          a.title_ar.toLowerCase().includes(q) ||
          a.title_en.toLowerCase().includes(q) ||
          String(a.id).includes(q),
      );
    }
    return result;
  }, [auctions, search, statusFilter]);

  // Stats (computed from all auctions, not filtered)
  const stats = useMemo(
    () => ({
      total: auctions.length,
      active: auctions.filter((a) => a.status === 'auction').length,
      pending: auctions.filter((a) => a.status === 'pending').length,
      sold: auctions.filter((a) => a.status === 'sold').length,
    }),
    [auctions],
  );

  const handleApprove = async (id: number) => {
    setActioning(String(id));
    try {
      await auctionsApi.approve(id);
      toast.success(isAr ? 'تمت الموافقة على المزاد' : 'Auction approved');
      await refetch();
    } catch (err) {
      toast.error(isAr ? 'فشلت الموافقة' : 'Approval failed');
    } finally {
      setActioning(null);
    }
  };

  const handleReject = async (id: number) => {
    setActioning(String(id));
    try {
      await auctionsApi.reject(id);
      toast.success(isAr ? 'تم الرفض' : 'Rejected');
      await refetch();
    } catch (err) {
      toast.error(isAr ? 'فشل الرفض' : 'Rejection failed');
    } finally {
      setActioning(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setActioning(String(deleteTarget.id));
    try {
      await auctionsApi.delete(deleteTarget.id);
      toast.success(isAr ? 'تم الحذف' : 'Deleted');
      setDeleteTarget(null);
      await refetch();
    } catch (err) {
      toast.error(isAr ? 'فشل الحذف' : 'Deletion failed');
    } finally {
      setActioning(null);
    }
  };

  const formatSAR = (n: number) =>
    new Intl.NumberFormat(isAr ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: 'SAR',
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <PageWrapper
      title={isAr ? 'إدارة المزادات' : 'Auction Control'}
      subtitle={isAr ? 'مراقبة والموافقة على المزادات' : 'Monitor and approve auctions'}
      icon={Gavel}
    >
      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <StatCard label={isAr ? 'الإجمالي' : 'Total'} value={stats.total} icon={Gavel} color="text-[#5AC4BE]" />
        <StatCard label={isAr ? 'نشط' : 'Active'} value={stats.active} icon={CheckCircle} color="text-green-500" />
        <StatCard label={isAr ? 'قيد المراجعة' : 'Pending'} value={stats.pending} icon={Clock} color="text-yellow-500" />
        <StatCard label={isAr ? 'مباع' : 'Sold'} value={stats.sold} icon={CheckCircle} color="text-gray-400" />
      </div>

      {/* Filters + Refresh */}
      <Card className="mb-6">
        <CardContent className="p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <Input
              type="text"
              placeholder={isAr ? 'ابحث بالعنوان أو الرقم' : 'Search by title or ID'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ps-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as StatusFilter)}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{isAr ? 'كل الحالات' : 'All Statuses'}</SelectItem>
              <SelectItem value="auction">{isAr ? 'في المزاد' : 'In Auction'}</SelectItem>
              <SelectItem value="pending">{isAr ? 'قيد المراجعة' : 'Pending'}</SelectItem>
              <SelectItem value="active">{isAr ? 'نشط' : 'Active'}</SelectItem>
              <SelectItem value="sold">{isAr ? 'مباع' : 'Sold'}</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={refetch} disabled={loading} className="gap-2">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isAr ? 'تحديث' : 'Refresh'}</span>
          </Button>
        </CardContent>
      </Card>

      {/* Loading / Error */}
      {loading && !data && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#5AC4BE]" />
        </div>
      )}

      {error && (
        <Card className="border-red-500/30 bg-red-500/5 mb-6">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-red-500 mb-1">
                {isAr ? 'فشل الاتصال بالخادم' : 'Connection failed'}
              </p>
              <p className="text-sm text-gray-400">{error.message}</p>
              <Button onClick={refetch} size="sm" variant="outline" className="mt-3">
                {isAr ? 'إعادة المحاولة' : 'Retry'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Auctions list */}
      {!loading && !error && filtered.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Gavel className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              {search || statusFilter !== 'all'
                ? isAr ? 'لا توجد نتائج مطابقة' : 'No results match your filters'
                : isAr ? 'لا توجد مزادات بعد' : 'No auctions yet'}
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((a) => {
          const style = statusStyles[a.status] ?? statusStyles.active;
          const isActioning = actioning === String(a.id);
          return (
            <Card key={a.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-base sm:text-lg truncate mb-1">
                      {isAr ? a.title_ar : a.title_en}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{isAr ? a.city_ar : a.city_en}</span>
                      <span className="mx-1">•</span>
                      <span>#{a.id}</span>
                    </div>
                  </div>
                  <Badge className={`${style.bg} ${style.text} border-0 flex-shrink-0`}>
                    {isAr ? style.label.ar : style.label.en}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">{isAr ? 'المزايدة الحالية' : 'Current Bid'}</p>
                    <p className="font-bold text-[#5AC4BE]">
                      {a.current_bid > 0 ? formatSAR(a.current_bid) : '—'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">{isAr ? 'السعر الابتدائي' : 'Starting Bid'}</p>
                    <p className="font-medium">
                      {a.starting_bid > 0 ? formatSAR(a.starting_bid) : '—'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {a.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleApprove(a.id)}
                        disabled={isActioning}
                        className="gap-1.5 bg-green-600 hover:bg-green-700"
                      >
                        {isActioning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />}
                        {isAr ? 'موافقة' : 'Approve'}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReject(a.id)}
                        disabled={isActioning}
                        className="gap-1.5"
                      >
                        <Ban className="w-3.5 h-3.5" />
                        {isAr ? 'رفض' : 'Reject'}
                      </Button>
                    </>
                  )}
                  {a.status !== 'pending' && a.status !== 'sold' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReject(a.id)}
                      disabled={isActioning}
                      className="gap-1.5"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      {isAr ? 'إعادة للمراجعة' : 'Back to pending'}
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setDeleteTarget(a)}
                    disabled={isActioning}
                    className="gap-1.5 text-red-500 hover:text-red-600 ms-auto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    {isAr ? 'حذف' : 'Delete'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isAr ? 'تأكيد الحذف' : 'Confirm Deletion'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isAr
                ? `هل أنت متأكد من حذف "${deleteTarget?.title_ar}"؟ هذا الإجراء لا يمكن التراجع عنه.`
                : `Are you sure you want to delete "${deleteTarget?.title_en}"? This cannot be undone.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{isAr ? 'إلغاء' : 'Cancel'}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              {isAr ? 'حذف نهائي' : 'Delete permanently'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageWrapper>
  );
}

function StatCard({
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
          <p className="text-xs text-gray-500 uppercase tracking-wider">{label}</p>
          <Icon className={`w-4 h-4 ${color}`} />
        </div>
        <p className="text-2xl sm:text-3xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
