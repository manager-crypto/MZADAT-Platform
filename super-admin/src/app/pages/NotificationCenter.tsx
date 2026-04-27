import {
  Bell, BellRing, Check, CheckCheck, Trash2, Search, Filter, Settings,
  Gavel, Shield, DollarSign, Users, AlertTriangle, MessageSquare,
  Clock, ChevronLeft, ChevronRight, Volume2, VolumeX, Mail, Smartphone,
  Wifi
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "../context/TranslationContext";
import { useState } from "react";

interface Notification {
  id: string;
  type: "auction" | "payment" | "user" | "security" | "dispute" | "system" | "connection";
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  timestamp: string;
  timeAgoAr: string;
  timeAgoEn: string;
  read: boolean;
  priority: "high" | "medium" | "low";
  actionUrl?: string;
}

const notifications: Notification[] = [
  { id: "N-001", type: "auction", titleAr: "مزاد جديد بانتظار الموافقة", titleEn: "New Auction Pending Approval", descriptionAr: "مزاد عقاري AUC-2026-00550 تم تقديمه ويتطلب مراجعة", descriptionEn: "Property auction AUC-2026-00550 submitted and requires review", timestamp: "2026-03-30 09:45", timeAgoAr: "منذ دقيقة", timeAgoEn: "1 min ago", read: false, priority: "high" },
  { id: "N-002", type: "security", titleAr: "تنبيه أمني - محاولات تسجيل دخول فاشلة", titleEn: "Security Alert - Failed Login Attempts", descriptionAr: "تم رصد 5 محاولات فاشلة لتسجيل الدخول من IP غير معروف", descriptionEn: "5 failed login attempts detected from unknown IP", timestamp: "2026-03-30 09:42", timeAgoAr: "منذ 4 دقائق", timeAgoEn: "4 min ago", read: false, priority: "high" },
  { id: "N-003", type: "dispute", titleAr: "نزاع جديد مرفوع", titleEn: "New Dispute Filed", descriptionAr: "تم رفع نزاع على المزاد AUC-2026-00519 بتهمة التلاعب", descriptionEn: "Dispute filed on auction AUC-2026-00519 for bid manipulation", timestamp: "2026-03-30 09:38", timeAgoAr: "منذ 8 دقائق", timeAgoEn: "8 min ago", read: false, priority: "high" },
  { id: "N-004", type: "payment", titleAr: "دفعة SADAD مكتملة", titleEn: "SADAD Payment Completed", descriptionAr: "تم استلام دفعة بمبلغ 120,000 ريال عبر سداد", descriptionEn: "Payment of SAR 120,000 received via SADAD", timestamp: "2026-03-30 09:30", timeAgoAr: "منذ 16 دقيقة", timeAgoEn: "16 min ago", read: false, priority: "medium" },
  { id: "N-005", type: "auction", titleAr: "مزاد على وشك الانتهاء", titleEn: "Auction Ending Soon", descriptionAr: "المزاد AUC-2026-00547 سينتهي خلال 5 دقائق", descriptionEn: "Auction AUC-2026-00547 ending in 5 minutes", timestamp: "2026-03-30 09:25", timeAgoAr: "منذ 21 دقيقة", timeAgoEn: "21 min ago", read: true, priority: "medium" },
  { id: "N-006", type: "user", titleAr: "طلب تحقق هوية جديد", titleEn: "New Identity Verification Request", descriptionAr: "15 طلب تحقق هوية جديد بانتظار المراجعة", descriptionEn: "15 new identity verification requests pending review", timestamp: "2026-03-30 09:15", timeAgoAr: "منذ 31 دقيقة", timeAgoEn: "31 min ago", read: true, priority: "medium" },
  { id: "N-007", type: "system", titleAr: "تحديث النظام مجدول", titleEn: "System Update Scheduled", descriptionAr: "تحديث صيانة مجدول غداً الساعة 2:00 صباحاً", descriptionEn: "Maintenance update scheduled for tomorrow at 2:00 AM", timestamp: "2026-03-30 08:00", timeAgoAr: "منذ ساعتين", timeAgoEn: "2 hours ago", read: true, priority: "low" },
  { id: "N-008", type: "payment", titleAr: "عمولة مستحقة التحصيل", titleEn: "Commission Due for Collection", descriptionAr: "عمولة بمبلغ 87,500 ريال مستحقة التحصيل من مزاد مكتمل", descriptionEn: "Commission of SAR 87,500 due from completed auction", timestamp: "2026-03-30 07:30", timeAgoAr: "منذ 3 ساعات", timeAgoEn: "3 hours ago", read: true, priority: "medium" },
  { id: "N-009", type: "connection", titleAr: "اتصال غير مستقر", titleEn: "Unstable Connection", descriptionAr: "تم الكشف عن اتصال غير مستقر مع خادم البيانات", descriptionEn: "Unstable connection detected with data server", timestamp: "2026-03-30 07:00", timeAgoAr: "منذ 4 ساعات", timeAgoEn: "4 hours ago", read: true, priority: "high" },
];

const typeConfig: Record<string, { icon: any; color: string; bg: string; bgDark: string }> = {
  auction: { icon: Gavel, color: "#47CCD0", bg: "bg-[#47CCD0]/10", bgDark: "bg-[#47CCD0]/20" },
  payment: { icon: DollarSign, color: "#10B981", bg: "bg-green-100", bgDark: "bg-green-900/30" },
  user: { icon: Users, color: "#6366F1", bg: "bg-indigo-100", bgDark: "bg-indigo-900/30" },
  security: { icon: Shield, color: "#EF4444", bg: "bg-red-100", bgDark: "bg-red-900/30" },
  dispute: { icon: AlertTriangle, color: "#F59E0B", bg: "bg-yellow-100", bgDark: "bg-yellow-900/30" },
  system: { icon: Settings, color: "#94A3B8", bg: "bg-gray-100", bgDark: "bg-gray-800" },
  connection: { icon: Wifi, color: "#F59E0B", bg: "bg-yellow-100", bgDark: "bg-yellow-900/30" },
};

export default function NotificationCenter() {
  const { theme } = useTheme();
  const { language, direction } = useTranslation();
  const isDark = theme === 'dark';
  const isRTL = direction === 'rtl';
  const [typeFilter, setTypeFilter] = useState("all");
  const [notifs, setNotifs] = useState(notifications);

  const unreadCount = notifs.filter(n => !n.read).length;
  const filtered = typeFilter === "all" ? notifs : notifs.filter(n => n.type === typeFilter);

  const markAllRead = () => setNotifs(notifs.map(n => ({ ...n, read: true })));
  const toggleRead = (id: string) => setNotifs(notifs.map(n => n.id === id ? { ...n, read: !n.read } : n));

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className={`flex items-start justify-between flex-wrap gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : ''}>
          <h1 className={`mzadat-h1 ${isDark ? 'text-[#F1F5F9]' : 'text-[#2B3D50]'}`}>
            {language === 'ar' ? 'مركز الإشعارات' : 'Notification Center'}
          </h1>
          <p className={`mzadat-body ${isDark ? 'text-[#94A3B8]' : 'text-[#6B7280]'} mt-2`}>
            {language === 'ar' ? 'إدارة ومتابعة جميع إشعارات النظام' : 'Manage and track all system notifications'}
          </p>
        </div>
        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllRead} className="gap-2">
              <CheckCheck className="w-4 h-4" />{language === 'ar' ? 'تحديد الكل كمقروء' : 'Mark All Read'}
            </Button>
          )}
          <Button variant="outline" size="sm" className="gap-2">
            <Settings className="w-4 h-4" />{language === 'ar' ? 'الإعدادات' : 'Settings'}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { labelAr: "غير مقروءة", labelEn: "Unread", value: unreadCount, icon: BellRing, color: "#EF4444" },
          { labelAr: "اليوم", labelEn: "Today", value: notifs.length, icon: Bell, color: "#47CCD0" },
          { labelAr: "عالية الأولوية", labelEn: "High Priority", value: notifs.filter(n => n.priority === 'high').length, icon: AlertTriangle, color: "#F59E0B" },
          { labelAr: "إجمالي هذا الشهر", labelEn: "This Month", value: 1247, icon: Mail, color: "#6366F1" },
        ].map((s, i) => (
          <Card key={i} className={`border-0 ${isDark ? 'bg-[#1A2836]' : 'bg-white shadow-sm'}`}>
            <CardContent className={`p-4 flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${s.color}1A` }}>
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <div className={isRTL ? 'text-right' : ''}>
                <p className={`text-[11px] ${isDark ? 'text-[#94A3B8]' : 'text-[#6B7280]'}`}>{language === 'ar' ? s.labelAr : s.labelEn}</p>
                <p className={`text-[18px] font-helvetica ${isDark ? 'text-[#F1F5F9]' : 'text-[#1F2937]'}`} style={{ fontVariantNumeric: 'tabular-nums' }}>{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className={`flex flex-wrap items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
        {[
          { value: "all", labelAr: "الكل", labelEn: "All" },
          { value: "auction", labelAr: "المزادات", labelEn: "Auctions" },
          { value: "payment", labelAr: "المدفوعات", labelEn: "Payments" },
          { value: "security", labelAr: "الأمان", labelEn: "Security" },
          { value: "dispute", labelAr: "النزاعات", labelEn: "Disputes" },
          { value: "user", labelAr: "المستخدمين", labelEn: "Users" },
          { value: "system", labelAr: "النظام", labelEn: "System" },
          { value: "connection", labelAr: "الاتصال", labelEn: "Connection" },
        ].map(f => (
          <button key={f.value} onClick={() => setTypeFilter(f.value)}
            className={`px-3 py-1.5 rounded-lg text-[12px] transition-all ${
              typeFilter === f.value ? 'bg-[#47CCD0] text-white' : isDark ? 'bg-[#2B3D50] text-[#94A3B8]' : 'bg-gray-100 text-gray-600'
            }`}>{language === 'ar' ? f.labelAr : f.labelEn}</button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-2">
        {filtered.map(notif => {
          const cfg = typeConfig[notif.type];
          const Icon = cfg.icon;
          return (
            <Card key={notif.id} className={`border-0 transition-all cursor-pointer ${
              !notif.read 
                ? isDark ? 'bg-[#1A2836] border-l-4 border-[#47CCD0]' : 'bg-white shadow-sm border-l-4 border-[#47CCD0]' 
                : isDark ? 'bg-[#1A2836]/60' : 'bg-white/80 shadow-sm'
            }`} style={{ borderLeftWidth: !notif.read ? '4px' : '0' }}
              onClick={() => toggleRead(notif.id)}>
              <CardContent className={`p-4 flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isDark ? cfg.bgDark : cfg.bg}`}>
                  <Icon className="w-5 h-5" style={{ color: cfg.color }} />
                </div>
                <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
                  <div className={`flex items-center gap-2 mb-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <h3 className={`text-[14px] ${!notif.read ? '' : ''} ${isDark ? 'text-[#F1F5F9]' : 'text-[#1F2937]'}`}>
                      {language === 'ar' ? notif.titleAr : notif.titleEn}
                    </h3>
                    {!notif.read && <div className="w-2 h-2 rounded-full bg-[#47CCD0] shrink-0"></div>}
                    {notif.priority === 'high' && (
                      <Badge variant="outline" className="text-[9px] bg-red-100 text-red-600 border-red-200">
                        {language === 'ar' ? 'عاجل' : 'Urgent'}
                      </Badge>
                    )}
                  </div>
                  <p className={`text-[13px] ${isDark ? 'text-[#94A3B8]' : 'text-gray-600'} line-clamp-1`}>
                    {language === 'ar' ? notif.descriptionAr : notif.descriptionEn}
                  </p>
                </div>
                <div className={`flex flex-col items-end gap-2 shrink-0 ${isRTL ? 'items-start' : 'items-end'}`}>
                  <span className={`text-[11px] font-helvetica ${isDark ? 'text-[#94A3B8]' : 'text-gray-400'}`}>
                    {language === 'ar' ? notif.timeAgoAr : notif.timeAgoEn}
                  </span>
                  <button onClick={e => { e.stopPropagation(); toggleRead(notif.id); }}
                    className={`p-1 rounded transition-colors ${isDark ? 'hover:bg-[#2B3D50]' : 'hover:bg-gray-100'}`}
                    title={notif.read ? 'Mark as unread' : 'Mark as read'}>
                    {notif.read ? <Check className="w-4 h-4 text-gray-400" /> : <CheckCheck className="w-4 h-4 text-[#47CCD0]" />}
                  </button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className={`text-center py-12 ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'}`}>
          <Bell className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>{language === 'ar' ? 'لا توجد إشعارات' : 'No notifications'}</p>
        </div>
      )}
    </div>
  );
}