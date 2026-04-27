import { useState, useMemo } from 'react';
import {
  Users,
  Shield,
  UserCheck,
  UserX,
  RefreshCw,
  Search,
  Loader2,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Switch } from '../components/ui/switch';
import { toast } from 'sonner';
import { useTranslation } from '../context/TranslationContext';
import { useAuth } from '../context/AuthContext';
import { useApi } from '../hooks/useApi';
import { usersApi, AdminUserRow } from '../services/usersApi';
import PageWrapper from '../components/PageWrapper';

export default function UserManagement() {
  const { language } = useTranslation();
  const { user: currentUser, hasRole } = useAuth();
  const isAr = language === 'ar';
  const isSuperAdmin = hasRole('SUPER_ADMIN');

  const { data, loading, error, refetch } = useApi(() => usersApi.list());
  const [search, setSearch] = useState('');
  const [toggling, setToggling] = useState<string | null>(null);

  const users = data?.data ?? [];

  const filtered = useMemo(() => {
    if (!search.trim()) return users;
    const q = search.trim().toLowerCase();
    return users.filter(
      (u) =>
        u.email.toLowerCase().includes(q) ||
        u.full_name.toLowerCase().includes(q),
    );
  }, [users, search]);

  const stats = useMemo(
    () => ({
      total: users.length,
      active: users.filter((u) => u.is_active).length,
      superAdmins: users.filter((u) => u.role === 'SUPER_ADMIN').length,
    }),
    [users],
  );

  const handleToggle = async (user: AdminUserRow) => {
    if (!isSuperAdmin) {
      toast.error(isAr ? 'صلاحية SUPER_ADMIN مطلوبة' : 'SUPER_ADMIN role required');
      return;
    }
    if (currentUser && user.email === currentUser.email) {
      toast.error(isAr ? 'لا يمكنك تعطيل حسابك الخاص' : 'Cannot disable your own account');
      return;
    }

    setToggling(user.id);
    try {
      await usersApi.toggleActive(user.id);
      toast.success(
        isAr
          ? user.is_active
            ? 'تم تعطيل المستخدم'
            : 'تم تفعيل المستخدم'
          : user.is_active
            ? 'User deactivated'
            : 'User activated',
      );
      await refetch();
    } catch (err: any) {
      toast.error(err?.message || (isAr ? 'فشلت العملية' : 'Operation failed'));
    } finally {
      setToggling(null);
    }
  };

  const formatDate = (iso: string | null) => {
    if (!iso) return isAr ? 'لم يسجّل بعد' : 'Never';
    return new Date(iso).toLocaleString(isAr ? 'ar-SA' : 'en-GB');
  };

  return (
    <PageWrapper
      title={isAr ? 'إدارة المستخدمين' : 'User Management'}
      subtitle={
        isAr
          ? 'قائمة حسابات المشرفين وحالاتها'
          : 'Admin accounts list and their status'
      }
      icon={Users}
      actions={
        <Button variant="outline" onClick={refetch} disabled={loading} size="sm" className="gap-2">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">{isAr ? 'تحديث' : 'Refresh'}</span>
        </Button>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
        <StatCard label={isAr ? 'الإجمالي' : 'Total'} value={stats.total} icon={Users} color="text-[#5AC4BE]" />
        <StatCard label={isAr ? 'نشط' : 'Active'} value={stats.active} icon={UserCheck} color="text-green-500" />
        <StatCard label={isAr ? 'Super Admins' : 'Super Admins'} value={stats.superAdmins} icon={Shield} color="text-yellow-500" />
      </div>

      {!isSuperAdmin && (
        <Card className="mb-4 border-yellow-500/30 bg-yellow-500/5">
          <CardContent className="p-3 flex items-center gap-2 text-sm">
            <AlertCircle className="w-4 h-4 text-yellow-500" />
            <span>
              {isAr
                ? 'أنت تعرض هذه الصفحة كـ ADMIN (للقراءة فقط). التعديل يتطلب صلاحية SUPER_ADMIN.'
                : 'Viewing as ADMIN (read-only). Modifications require SUPER_ADMIN role.'}
            </span>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <Input
              type="text"
              placeholder={isAr ? 'ابحث بالاسم أو البريد' : 'Search by name or email'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ps-10"
            />
          </div>
        </CardContent>
      </Card>

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
                {isAr ? 'فشل تحميل المستخدمين' : 'Failed to load users'}
              </p>
              <p className="text-sm text-gray-400 mb-3">{error.message}</p>
              <Button onClick={refetch} size="sm" variant="outline">
                {isAr ? 'إعادة المحاولة' : 'Retry'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Users list */}
      <div className="space-y-2">
        {filtered.map((u) => {
          const isSelf = currentUser?.email === u.email;
          const isCurrentToggling = toggling === u.id;
          return (
            <Card key={u.id} className={!u.is_active ? 'opacity-60' : ''}>
              <CardContent className="p-4 flex items-center gap-3 sm:gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    u.role === 'SUPER_ADMIN'
                      ? 'bg-yellow-500/10 text-yellow-500'
                      : 'bg-[#5AC4BE]/10 text-[#5AC4BE]'
                  }`}
                >
                  {u.role === 'SUPER_ADMIN' ? <Shield className="w-5 h-5" /> : <UserCheck className="w-5 h-5" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm sm:text-base truncate">
                      {u.full_name || u.email}
                    </h3>
                    <Badge className="bg-gray-500/10 text-gray-500 border-0 text-xs">
                      {u.role}
                    </Badge>
                    {isSelf && (
                      <Badge className="bg-blue-500/10 text-blue-500 border-0 text-xs">
                        {isAr ? 'أنت' : 'You'}
                      </Badge>
                    )}
                    {!u.is_active && (
                      <Badge className="bg-red-500/10 text-red-500 border-0 text-xs">
                        {isAr ? 'معطّل' : 'Disabled'}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate mb-1">{u.email}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {isAr ? 'آخر دخول:' : 'Last login:'} {formatDate(u.last_login)}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  {isCurrentToggling ? (
                    <Loader2 className="w-5 h-5 animate-spin text-[#5AC4BE]" />
                  ) : (
                    <Switch
                      checked={u.is_active}
                      disabled={!isSuperAdmin || isSelf}
                      onCheckedChange={() => handleToggle(u)}
                      aria-label={u.is_active ? 'Disable user' : 'Enable user'}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {!loading && !error && filtered.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <UserX className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              {search
                ? isAr ? 'لا توجد نتائج مطابقة' : 'No results match your search'
                : isAr ? 'لا يوجد مستخدمون' : 'No users found'}
            </p>
          </CardContent>
        </Card>
      )}
    </PageWrapper>
  );
}

function StatCard({ label, value, icon: Icon, color }: any) {
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
