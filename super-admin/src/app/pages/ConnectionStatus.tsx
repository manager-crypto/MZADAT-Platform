import { useState, useEffect, useCallback } from "react";
import {
  Wifi, WifiOff, Activity, RefreshCw, CheckCircle, XCircle, AlertTriangle,
  Clock, Settings, Bell, Mail, Smartphone, MessageSquare, Play, Pause,
  ChevronDown, ChevronUp, Shield, FileCode, Globe, CreditCard,
  Building2, Fingerprint, MapPin, Cloud, Search, Database, Zap,
  ArrowUp, ArrowDown, RotateCw, Filter, Radio, Eye, TrendingUp,
  Home, Plug, History, ToggleLeft, ToggleRight, Timer, Send,
  AlertCircle, CheckCheck, Volume2, X
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "../context/TranslationContext";

// ─── Types ───
type ConnectionState = "connected" | "disconnected" | "degraded";
type AlertChannel = "push" | "email" | "sms";

interface Integration {
  id: string;
  nameAr: string;
  nameEn: string;
  icon: any;
  color: string;
  status: ConnectionState;
  uptime: string;
  lastSync: string;
  syncFrequency: string; // e.g. "5m", "15m", "1h"
  syncFrequencyLabel: { ar: string; en: string };
  successRate: string;
  totalSyncs: number;
  failedSyncs: number;
  latency: string;
  endpoint: string;
  retryEnabled: boolean;
  retryInterval: number; // seconds
  maxRetries: number;
  alerts: {
    push: boolean;
    email: boolean;
    sms: boolean;
  };
}

interface SyncLogEntry {
  id: string;
  integrationId: string;
  integrationName: { ar: string; en: string };
  timestamp: string;
  status: "success" | "failed" | "retrying" | "partial";
  duration: string;
  recordsSynced: number;
  errorMessage?: { ar: string; en: string };
  retryAttempt?: number;
}

// ─── Mock Data ───
const initialIntegrations: Integration[] = [
  {
    id: "rega", nameAr: "الهيئة العامة للعقار (REGA)", nameEn: "REGA - Real Estate Authority",
    icon: Shield, color: "#47CCD0", status: "connected", uptime: "99.97%",
    lastSync: "2026-03-30T11:45:00", syncFrequency: "5m",
    syncFrequencyLabel: { ar: "كل 5 دقائق", en: "Every 5 minutes" },
    successRate: "99.8%", totalSyncs: 14520, failedSyncs: 29, latency: "125ms",
    endpoint: "https://api.rega.gov.sa/v2", retryEnabled: true, retryInterval: 30, maxRetries: 3,
    alerts: { push: true, email: true, sms: true }
  },
  {
    id: "infath", nameAr: "منصة إنفاذ", nameEn: "Infath - Enforcement Platform",
    icon: FileCode, color: "#2B3D50", status: "connected", uptime: "99.85%",
    lastSync: "2026-03-30T11:42:00", syncFrequency: "15m",
    syncFrequencyLabel: { ar: "كل 15 دقيقة", en: "Every 15 minutes" },
    successRate: "99.5%", totalSyncs: 5840, failedSyncs: 29, latency: "210ms",
    endpoint: "https://api.infath.gov.sa/v1", retryEnabled: true, retryInterval: 60, maxRetries: 5,
    alerts: { push: true, email: true, sms: false }
  },
  {
    id: "sadad", nameAr: "بوابة سداد", nameEn: "SADAD Payment Gateway",
    icon: CreditCard, color: "#10B981", status: "connected", uptime: "99.99%",
    lastSync: "2026-03-30T11:46:00", syncFrequency: "1m",
    syncFrequencyLabel: { ar: "كل دقيقة", en: "Every minute" },
    successRate: "99.95%", totalSyncs: 87600, failedSyncs: 44, latency: "45ms",
    endpoint: "https://api.sadad.com/v3", retryEnabled: true, retryInterval: 15, maxRetries: 5,
    alerts: { push: true, email: true, sms: true }
  },
  {
    id: "nafath", nameAr: "نفاذ - التحقق من الهوية", nameEn: "Nafath - Identity Verification",
    icon: Fingerprint, color: "#6366F1", status: "connected", uptime: "99.92%",
    lastSync: "2026-03-30T11:44:00", syncFrequency: "10m",
    syncFrequencyLabel: { ar: "كل 10 دقائق", en: "Every 10 minutes" },
    successRate: "99.7%", totalSyncs: 8760, failedSyncs: 26, latency: "180ms",
    endpoint: "https://api.nafath.sa/v2", retryEnabled: true, retryInterval: 30, maxRetries: 3,
    alerts: { push: true, email: true, sms: false }
  },
  {
    id: "google", nameAr: "خدمات Google (خرائط + فهرسة)", nameEn: "Google Services (Maps + Indexing)",
    icon: MapPin, color: "#EA4335", status: "degraded", uptime: "98.45%",
    lastSync: "2026-03-30T11:30:00", syncFrequency: "30m",
    syncFrequencyLabel: { ar: "كل 30 دقيقة", en: "Every 30 minutes" },
    successRate: "97.2%", totalSyncs: 2920, failedSyncs: 82, latency: "450ms",
    endpoint: "https://maps.googleapis.com/v1", retryEnabled: true, retryInterval: 120, maxRetries: 3,
    alerts: { push: true, email: true, sms: false }
  },
  {
    id: "unifonic", nameAr: "رسائل SMS (Unifonic)", nameEn: "SMS Gateway (Unifonic)",
    icon: Smartphone, color: "#F59E0B", status: "connected", uptime: "99.98%",
    lastSync: "2026-03-30T11:45:30", syncFrequency: "5m",
    syncFrequencyLabel: { ar: "كل 5 دقائق", en: "Every 5 minutes" },
    successRate: "99.9%", totalSyncs: 14520, failedSyncs: 15, latency: "80ms",
    endpoint: "https://api.unifonic.com/v2", retryEnabled: true, retryInterval: 30, maxRetries: 3,
    alerts: { push: true, email: false, sms: false }
  },
  {
    id: "whatsapp", nameAr: "WhatsApp Business API", nameEn: "WhatsApp Business API",
    icon: MessageSquare, color: "#25D366", status: "disconnected", uptime: "94.20%",
    lastSync: "2026-03-30T09:15:00", syncFrequency: "5m",
    syncFrequencyLabel: { ar: "كل 5 دقائق", en: "Every 5 minutes" },
    successRate: "92.5%", totalSyncs: 14520, failedSyncs: 1089, latency: "—",
    endpoint: "https://graph.facebook.com/v18.0", retryEnabled: true, retryInterval: 60, maxRetries: 10,
    alerts: { push: true, email: true, sms: true }
  },
  {
    id: "aws_s3", nameAr: "تخزين AWS S3", nameEn: "AWS S3 Storage",
    icon: Cloud, color: "#FF9900", status: "connected", uptime: "99.999%",
    lastSync: "2026-03-30T11:46:10", syncFrequency: "1m",
    syncFrequencyLabel: { ar: "كل دقيقة", en: "Every minute" },
    successRate: "100%", totalSyncs: 87600, failedSyncs: 0, latency: "32ms",
    endpoint: "https://s3.me-south-1.amazonaws.com", retryEnabled: true, retryInterval: 10, maxRetries: 5,
    alerts: { push: true, email: true, sms: false }
  },
  {
    id: "elasticsearch", nameAr: "محرك البحث Elasticsearch", nameEn: "Elasticsearch Engine",
    icon: Search, color: "#00BFB3", status: "connected", uptime: "99.95%",
    lastSync: "2026-03-30T11:46:05", syncFrequency: "2m",
    syncFrequencyLabel: { ar: "كل دقيقتين", en: "Every 2 minutes" },
    successRate: "99.9%", totalSyncs: 43800, failedSyncs: 44, latency: "18ms",
    endpoint: "https://search.mzadat.internal", retryEnabled: true, retryInterval: 15, maxRetries: 3,
    alerts: { push: true, email: false, sms: false }
  },
  {
    id: "supabase", nameAr: "قاعدة البيانات Supabase", nameEn: "Supabase Database",
    icon: Database, color: "#3ECF8E", status: "connected", uptime: "99.98%",
    lastSync: "2026-03-30T11:46:12", syncFrequency: "1m",
    syncFrequencyLabel: { ar: "كل دقيقة", en: "Every minute" },
    successRate: "99.99%", totalSyncs: 87600, failedSyncs: 9, latency: "12ms",
    endpoint: "https://mzadat.supabase.co", retryEnabled: true, retryInterval: 10, maxRetries: 5,
    alerts: { push: true, email: true, sms: true }
  },
];

const syncLog: SyncLogEntry[] = [
  { id: "SL-001", integrationId: "whatsapp", integrationName: { ar: "WhatsApp Business", en: "WhatsApp Business" }, timestamp: "2026-03-30T09:15:00", status: "failed", duration: "30.2s", recordsSynced: 0, errorMessage: { ar: "انتهت مهلة الاتصال - الخادم لا يستجيب", en: "Connection timeout - server not responding" }, retryAttempt: 10 },
  { id: "SL-002", integrationId: "whatsapp", integrationName: { ar: "WhatsApp Business", en: "WhatsApp Business" }, timestamp: "2026-03-30T09:14:00", status: "retrying", duration: "15.1s", recordsSynced: 0, errorMessage: { ar: "إعادة المحاولة رقم 9/10", en: "Retry attempt 9/10" }, retryAttempt: 9 },
  { id: "SL-003", integrationId: "google", integrationName: { ar: "خدمات Google", en: "Google Services" }, timestamp: "2026-03-30T11:30:00", status: "partial", duration: "8.5s", recordsSynced: 1245, errorMessage: { ar: "مزامنة جزئية - فهرسة 78% من الصفحات", en: "Partial sync - 78% of pages indexed" } },
  { id: "SL-004", integrationId: "rega", integrationName: { ar: "REGA", en: "REGA" }, timestamp: "2026-03-30T11:45:00", status: "success", duration: "2.1s", recordsSynced: 342 },
  { id: "SL-005", integrationId: "sadad", integrationName: { ar: "سداد", en: "SADAD" }, timestamp: "2026-03-30T11:46:00", status: "success", duration: "0.8s", recordsSynced: 89 },
  { id: "SL-006", integrationId: "supabase", integrationName: { ar: "Supabase", en: "Supabase" }, timestamp: "2026-03-30T11:46:12", status: "success", duration: "0.3s", recordsSynced: 1547 },
  { id: "SL-007", integrationId: "nafath", integrationName: { ar: "نفاذ", en: "Nafath" }, timestamp: "2026-03-30T11:44:00", status: "success", duration: "1.5s", recordsSynced: 67 },
  { id: "SL-008", integrationId: "elasticsearch", integrationName: { ar: "Elasticsearch", en: "Elasticsearch" }, timestamp: "2026-03-30T11:46:05", status: "success", duration: "0.5s", recordsSynced: 2340 },
  { id: "SL-009", integrationId: "aws_s3", integrationName: { ar: "AWS S3", en: "AWS S3" }, timestamp: "2026-03-30T11:46:10", status: "success", duration: "0.2s", recordsSynced: 456 },
  { id: "SL-010", integrationId: "infath", integrationName: { ar: "إنفاذ", en: "Infath" }, timestamp: "2026-03-30T11:42:00", status: "success", duration: "3.4s", recordsSynced: 128 },
  { id: "SL-011", integrationId: "unifonic", integrationName: { ar: "Unifonic SMS", en: "Unifonic SMS" }, timestamp: "2026-03-30T11:45:30", status: "success", duration: "0.9s", recordsSynced: 215 },
  { id: "SL-012", integrationId: "google", integrationName: { ar: "خدمات Google", en: "Google Services" }, timestamp: "2026-03-30T11:00:00", status: "failed", duration: "30.0s", recordsSynced: 0, errorMessage: { ar: "تجاوز حد معدل الطلبات", en: "Rate limit exceeded" }, retryAttempt: 1 },
];

type TabType = "status" | "alerts" | "synclog";

export default function ConnectionStatus() {
  const { theme } = useTheme();
  const { language, direction } = useTranslation();
  const isDark = theme === "dark";
  const isRTL = direction === "rtl";
  const isAr = language === "ar";

  const [integrations, setIntegrations] = useState<Integration[]>(initialIntegrations);
  const [activeTab, setActiveTab] = useState<TabType>("status");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [syncing, setSyncing] = useState<Record<string, boolean>>({});
  const [logFilter, setLogFilter] = useState<"all" | "success" | "failed" | "retrying" | "partial">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | ConnectionState>("all");
  const [pulseConnected, setPulseConnected] = useState(true);

  // Simulated pulse animation for real-time feel
  useEffect(() => {
    const interval = setInterval(() => setPulseConnected((p) => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  const connectedCount = integrations.filter((i) => i.status === "connected").length;
  const degradedCount = integrations.filter((i) => i.status === "degraded").length;
  const disconnectedCount = integrations.filter((i) => i.status === "disconnected").length;

  const handleSyncNow = useCallback((id: string) => {
    setSyncing((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setSyncing((prev) => ({ ...prev, [id]: false }));
      setIntegrations((prev) =>
        prev.map((i) =>
          i.id === id
            ? { ...i, lastSync: new Date().toISOString() }
            : i
        )
      );
    }, 2000 + Math.random() * 2000);
  }, []);

  const handleSyncAll = useCallback(() => {
    integrations.forEach((i) => {
      if (i.status !== "disconnected") handleSyncNow(i.id);
    });
  }, [integrations, handleSyncNow]);

  const toggleAlert = (id: string, channel: AlertChannel) => {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, alerts: { ...i.alerts, [channel]: !i.alerts[channel] } }
          : i
      )
    );
  };

  const toggleRetry = (id: string) => {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, retryEnabled: !i.retryEnabled } : i
      )
    );
  };

  const updateRetryInterval = (id: string, val: number) => {
    setIntegrations((prev) =>
      prev.map((i) => (i.id === id ? { ...i, retryInterval: val } : i))
    );
  };

  const updateMaxRetries = (id: string, val: number) => {
    setIntegrations((prev) =>
      prev.map((i) => (i.id === id ? { ...i, maxRetries: val } : i))
    );
  };

  const formatTimeAgo = (ts: string) => {
    const now = new Date("2026-03-30T12:00:00");
    const d = new Date(ts);
    const diffMs = now.getTime() - d.getTime();
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return isAr ? "الآن" : "just now";
    if (mins < 60) return isAr ? `منذ ${mins} دقيقة` : `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return isAr ? `منذ ${hours} ساعة` : `${hours}h ago`;
    return isAr ? `منذ ${Math.floor(hours / 24)} يوم` : `${Math.floor(hours / 24)}d ago`;
  };

  const statusConfig = {
    connected: { color: "text-green-500", bg: isDark ? "bg-green-900/30" : "bg-green-50", border: "border-green-500/30", labelAr: "متصل", labelEn: "Connected", icon: CheckCircle },
    degraded: { color: "text-amber-500", bg: isDark ? "bg-amber-900/30" : "bg-amber-50", border: "border-amber-500/30", labelAr: "متدهور", labelEn: "Degraded", icon: AlertTriangle },
    disconnected: { color: "text-red-500", bg: isDark ? "bg-red-900/30" : "bg-red-50", border: "border-red-500/30", labelAr: "غير متصل", labelEn: "Disconnected", icon: XCircle },
  };

  const logStatusConfig = {
    success: { color: "text-green-500", bg: isDark ? "bg-green-900/30" : "bg-green-50", labelAr: "ناجح", labelEn: "Success" },
    failed: { color: "text-red-500", bg: isDark ? "bg-red-900/30" : "bg-red-50", labelAr: "فاشل", labelEn: "Failed" },
    retrying: { color: "text-amber-500", bg: isDark ? "bg-amber-900/30" : "bg-amber-50", labelAr: "إعادة محاولة", labelEn: "Retrying" },
    partial: { color: "text-blue-500", bg: isDark ? "bg-blue-900/30" : "bg-blue-50", labelAr: "جزئي", labelEn: "Partial" },
  };

  const cardCls = isDark ? "bg-[#1F2937] border-gray-700" : "bg-white";
  const textP = isDark ? "text-white" : "text-[#2B3D50]";
  const textS = isDark ? "text-gray-400" : "text-gray-600";

  const filteredIntegrations = statusFilter === "all" ? integrations : integrations.filter((i) => i.status === statusFilter);
  const filteredLog = logFilter === "all" ? syncLog : syncLog.filter((l) => l.status === logFilter);

  const tabs: { key: TabType; labelAr: string; labelEn: string; icon: any }[] = [
    { key: "status", labelAr: "حالة الاتصال", labelEn: "Connection Status", icon: Wifi },
    { key: "alerts", labelAr: "إعدادات التنبيهات", labelEn: "Alert Settings", icon: Bell },
    { key: "synclog", labelAr: "سجل المزامنة", labelEn: "Sync Log", icon: History },
  ];

  return (
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className={`flex items-center gap-2 ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-[#2B3D50]"}`}>
              <Home className="w-4 h-4" />
              {isAr ? "الرئيسية" : "Home"}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className={isDark ? "text-gray-600" : ""} />
          <BreadcrumbItem>
            <BreadcrumbPage className={textP}>
              {isAr ? "حالة الاتصال والمزامنة" : "Connection Status & Sync"}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <div className={`flex flex-col sm:flex-row items-start justify-between gap-4 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
        <div className={isRTL ? "text-right" : ""}>
          <h1 className={`text-3xl ${textP} flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
            <div className="w-12 h-12 rounded-2xl bg-[#47CCD0]/10 flex items-center justify-center">
              <Activity className="w-6 h-6 text-[#47CCD0]" />
            </div>
            {isAr ? "حالة الاتصال والمزامنة" : "Connection Status & Sync"}
          </h1>
          <p className={`${textS} mt-2 text-[14px]`}>
            {isAr
              ? "مراقبة حالة جميع التكاملات في الوقت الفعلي مع تنبيهات ذكية ومزامنة تلقائية"
              : "Real-time monitoring of all integrations with smart alerts and automatic synchronization"}
          </p>
        </div>
        <Button onClick={handleSyncAll} className="bg-[#47CCD0] hover:bg-[#3ab5b9] text-white gap-2 shrink-0">
          <RefreshCw className="w-4 h-4" />
          {isAr ? "مزامنة الكل" : "Sync All"}
        </Button>
      </div>

      {/* ─── KPI Cards ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className={`${cardCls} border shadow-md`}>
          <CardContent className="pt-6">
            <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className={isRTL ? "text-right" : ""}>
                <p className={`text-[13px] ${textS}`}>{isAr ? "متصل" : "Connected"}</p>
                <h3 className={`text-3xl mt-1 ${textP}`}>{connectedCount}</h3>
                <Badge className="mt-2 bg-green-100 text-green-700 hover:bg-green-100 text-[11px]">
                  {isAr ? "من" : "of"} {integrations.length}
                </Badge>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100/50 flex items-center justify-center relative">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className={`absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 ${pulseConnected ? "animate-ping" : ""}`} />
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`${cardCls} border shadow-md`}>
          <CardContent className="pt-6">
            <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className={isRTL ? "text-right" : ""}>
                <p className={`text-[13px] ${textS}`}>{isAr ? "متدهور" : "Degraded"}</p>
                <h3 className={`text-3xl mt-1 ${textP}`}>{degradedCount}</h3>
                <Badge className="mt-2 bg-amber-100 text-amber-700 hover:bg-amber-100 text-[11px]">
                  {isAr ? "يحتاج مراقبة" : "Needs attention"}
                </Badge>
              </div>
              <div className="w-12 h-12 rounded-full bg-amber-100/50 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`${cardCls} border shadow-md`}>
          <CardContent className="pt-6">
            <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className={isRTL ? "text-right" : ""}>
                <p className={`text-[13px] ${textS}`}>{isAr ? "غير متصل" : "Disconnected"}</p>
                <h3 className={`text-3xl mt-1 text-red-500`}>{disconnectedCount}</h3>
                {disconnectedCount > 0 && (
                  <Badge className="mt-2 bg-red-100 text-red-700 hover:bg-red-100 text-[11px]">
                    {isAr ? "يتطلب إجراء!" : "Action required!"}
                  </Badge>
                )}
              </div>
              <div className="w-12 h-12 rounded-full bg-red-100/50 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`${cardCls} border shadow-md`}>
          <CardContent className="pt-6">
            <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className={isRTL ? "text-right" : ""}>
                <p className={`text-[13px] ${textS}`}>{isAr ? "متوسط الاستجابة" : "Avg Latency"}</p>
                <h3 className={`text-3xl mt-1 ${textP}`}>89ms</h3>
                <Badge className="mt-2 bg-green-100 text-green-700 hover:bg-green-100 text-[11px] gap-1">
                  <ArrowDown className="w-3 h-3" /> -12%
                </Badge>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#47CCD0]/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-[#47CCD0]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ─── Tabs ─── */}
      <div className={`flex flex-wrap items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] transition-all ${
                activeTab === tab.key
                  ? "bg-[#47CCD0] text-white shadow-lg shadow-[#47CCD0]/20"
                  : isDark
                  ? "bg-[#2B3D50] text-gray-400 hover:text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Icon className="w-4 h-4" />
              {isAr ? tab.labelAr : tab.labelEn}
            </button>
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════ TAB: STATUS ═══════ */}
      {activeTab === "status" && (
        <div className="space-y-4">
          {/* Status filter pills */}
          <div className={`flex flex-wrap gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
            {(["all", "connected", "degraded", "disconnected"] as const).map((f) => {
              const count = f === "all" ? integrations.length : integrations.filter((i) => i.status === f).length;
              return (
                <button
                  key={f}
                  onClick={() => setStatusFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-[12px] transition-all flex items-center gap-1.5 ${
                    statusFilter === f
                      ? f === "all"
                        ? "bg-[#47CCD0] text-white"
                        : `${statusConfig[f === "all" ? "connected" : f].bg} ${statusConfig[f === "all" ? "connected" : f].color} ring-1 ${statusConfig[f === "all" ? "connected" : f].border}`
                      : isDark
                      ? "bg-[#2B3D50] text-gray-400"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {f === "all"
                    ? isAr ? "الكل" : "All"
                    : isAr ? statusConfig[f].labelAr : statusConfig[f].labelEn}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isDark ? "bg-white/10" : "bg-black/5"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Integration Cards */}
          <div className="space-y-3">
            {filteredIntegrations.map((integ) => {
              const sc = statusConfig[integ.status];
              const StatusIcon = sc.icon;
              const Icon = integ.icon;
              const isExpanded = expandedId === integ.id;
              const isSyncing = syncing[integ.id];

              return (
                <Card key={integ.id} className={`${cardCls} border shadow-sm overflow-hidden transition-all`}>
                  <CardContent className="p-0">
                    {/* Main Row */}
                    <div className={`flex items-center gap-4 p-5 ${isRTL ? "flex-row-reverse" : ""}`}>
                      {/* Status indicator dot */}
                      <div className="relative shrink-0">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center`} style={{ backgroundColor: `${integ.color}15` }}>
                          <Icon className="w-6 h-6" style={{ color: integ.color }} />
                        </div>
                        <div className={`absolute -bottom-0.5 ${isRTL ? "-left-0.5" : "-right-0.5"} w-4 h-4 rounded-full border-2 ${isDark ? "border-[#1F2937]" : "border-white"} flex items-center justify-center ${sc.bg}`}>
                          <StatusIcon className={`w-2.5 h-2.5 ${sc.color}`} />
                        </div>
                      </div>

                      {/* Info */}
                      <div className={`flex-1 min-w-0 ${isRTL ? "text-right" : ""}`}>
                        <h3 className={`text-[15px] ${textP} truncate`}>{isAr ? integ.nameAr : integ.nameEn}</h3>
                        <div className={`flex items-center gap-3 mt-1 flex-wrap ${isRTL ? "flex-row-reverse" : ""}`}>
                          <Badge className={`text-[10px] ${sc.bg} ${sc.color} border-0`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {isAr ? sc.labelAr : sc.labelEn}
                          </Badge>
                          <span className={`text-[11px] ${textS} flex items-center gap-1`}>
                            <Clock className="w-3 h-3" />
                            {isAr ? "آخر مزامنة:" : "Last sync:"} {formatTimeAgo(integ.lastSync)}
                          </span>
                          <span className={`text-[11px] ${textS}`}>
                            {isAr ? "وقت التشغيل:" : "Uptime:"} {integ.uptime}
                          </span>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className={`hidden lg:flex items-center gap-6 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <div className={`text-center ${isRTL ? "text-right" : ""}`}>
                          <p className={`text-[11px] ${textS}`}>{isAr ? "معدل النجاح" : "Success Rate"}</p>
                          <p className={`text-[15px] ${textP}`}>{integ.successRate}</p>
                        </div>
                        <div className={`text-center ${isRTL ? "text-right" : ""}`}>
                          <p className={`text-[11px] ${textS}`}>{isAr ? "الاستجابة" : "Latency"}</p>
                          <p className={`text-[15px] ${textP}`}>{integ.latency}</p>
                        </div>
                        <div className={`text-center ${isRTL ? "text-right" : ""}`}>
                          <p className={`text-[11px] ${textS}`}>{isAr ? "تكرار المزامنة" : "Sync Freq"}</p>
                          <p className={`text-[15px] ${textP}`}>{isAr ? integ.syncFrequencyLabel.ar : integ.syncFrequencyLabel.en}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className={`flex items-center gap-2 shrink-0 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={isSyncing || integ.status === "disconnected"}
                          onClick={() => handleSyncNow(integ.id)}
                          className={`gap-1.5 text-[12px] ${isSyncing ? "opacity-70" : ""}`}
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
                          {isSyncing ? (isAr ? "جارٍ..." : "Syncing...") : (isAr ? "مزامنة" : "Sync")}
                        </Button>
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : integ.id)}
                          className={`p-2 rounded-lg transition-colors ${isDark ? "hover:bg-white/5 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* ─── Expanded Detail Panel ─── */}
                    {isExpanded && (
                      <div className={`border-t px-5 pb-5 pt-4 ${isDark ? "border-gray-700 bg-[#1a2533]" : "border-gray-100 bg-gray-50/50"}`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                          {/* Sync Stats */}
                          <div className="space-y-3">
                            <h4 className={`text-[13px] ${textP} flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                              <TrendingUp className="w-4 h-4 text-[#47CCD0]" />
                              {isAr ? "إحصائيات المزامنة" : "Sync Statistics"}
                            </h4>
                            <div className="grid grid-cols-2 gap-3">
                              {[
                                { labelAr: "إجمالي المزامنات", labelEn: "Total Syncs", value: integ.totalSyncs.toLocaleString() },
                                { labelAr: "مزامنات فاشلة", labelEn: "Failed Syncs", value: integ.failedSyncs.toLocaleString() },
                                { labelAr: "معدل النجاح", labelEn: "Success Rate", value: integ.successRate },
                                { labelAr: "زمن الاستجابة", labelEn: "Latency", value: integ.latency },
                              ].map((stat, i) => (
                                <div key={i} className={`p-2.5 rounded-xl ${isDark ? "bg-[#0F1923]" : "bg-white"} ${isRTL ? "text-right" : ""}`}>
                                  <p className={`text-[10px] ${textS}`}>{isAr ? stat.labelAr : stat.labelEn}</p>
                                  <p className={`text-[15px] ${textP} mt-0.5`}>{stat.value}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Auto-Retry Config */}
                          <div className="space-y-3">
                            <h4 className={`text-[13px] ${textP} flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                              <RotateCw className="w-4 h-4 text-amber-500" />
                              {isAr ? "إعادة المحاولة التلقائية" : "Auto-Retry Config"}
                            </h4>
                            <div className={`p-3 rounded-xl ${isDark ? "bg-[#0F1923]" : "bg-white"} space-y-3`}>
                              <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                                <span className={`text-[12px] ${textP}`}>{isAr ? "تفعيل إعادة المحاولة" : "Enable Auto-Retry"}</span>
                                <button
                                  onClick={() => toggleRetry(integ.id)}
                                  className={`relative w-10 h-6 rounded-full transition-colors ${integ.retryEnabled ? "bg-[#47CCD0]" : isDark ? "bg-white/10" : "bg-gray-300"}`}
                                >
                                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${integ.retryEnabled ? (isRTL ? "left-0.5" : "left-[18px]") : (isRTL ? "left-[18px]" : "left-0.5")}`} />
                                </button>
                              </div>
                              {integ.retryEnabled && (
                                <>
                                  <div>
                                    <label className={`text-[11px] ${textS} block mb-1`}>{isAr ? "فترة الانتظار (ثواني)" : "Retry Interval (seconds)"}</label>
                                    <select
                                      value={integ.retryInterval}
                                      onChange={(e) => updateRetryInterval(integ.id, Number(e.target.value))}
                                      className={`w-full px-3 py-1.5 rounded-lg border text-[12px] ${isDark ? "bg-[#1F2937] border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-[#2B3D50]"} outline-none`}
                                    >
                                      {[10, 15, 30, 60, 120, 300].map((v) => (
                                        <option key={v} value={v}>{v}s</option>
                                      ))}
                                    </select>
                                  </div>
                                  <div>
                                    <label className={`text-[11px] ${textS} block mb-1`}>{isAr ? "أقصى عدد محاولات" : "Max Retries"}</label>
                                    <select
                                      value={integ.maxRetries}
                                      onChange={(e) => updateMaxRetries(integ.id, Number(e.target.value))}
                                      className={`w-full px-3 py-1.5 rounded-lg border text-[12px] ${isDark ? "bg-[#1F2937] border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-[#2B3D50]"} outline-none`}
                                    >
                                      {[1, 3, 5, 10, 15, 20].map((v) => (
                                        <option key={v} value={v}>{v}</option>
                                      ))}
                                    </select>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Endpoint Info */}
                          <div className="space-y-3">
                            <h4 className={`text-[13px] ${textP} flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                              <Globe className="w-4 h-4 text-blue-500" />
                              {isAr ? "معلومات الاتصال" : "Connection Info"}
                            </h4>
                            <div className={`p-3 rounded-xl ${isDark ? "bg-[#0F1923]" : "bg-white"} space-y-2`}>
                              <div className={isRTL ? "text-right" : ""}>
                                <p className={`text-[10px] ${textS}`}>Endpoint</p>
                                <p className={`text-[12px] ${textP} font-mono break-all`} dir="ltr">{integ.endpoint}</p>
                              </div>
                              <div className={isRTL ? "text-right" : ""}>
                                <p className={`text-[10px] ${textS}`}>{isAr ? "تكرار المزامنة" : "Sync Frequency"}</p>
                                <p className={`text-[12px] ${textP}`}>{isAr ? integ.syncFrequencyLabel.ar : integ.syncFrequencyLabel.en}</p>
                              </div>
                              <div className={isRTL ? "text-right" : ""}>
                                <p className={`text-[10px] ${textS}`}>{isAr ? "آخر مزامنة" : "Last Sync"}</p>
                                <p className={`text-[12px] ${textP}`}>{formatTimeAgo(integ.lastSync)}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════ TAB: ALERTS ═══════ */}
      {activeTab === "alerts" && (
        <div className="space-y-4">
          {/* Info banner */}
          <div className={`p-4 rounded-2xl border flex items-start gap-3 ${isDark ? "bg-[#47CCD0]/10 border-[#47CCD0]/20" : "bg-[#47CCD0]/5 border-[#47CCD0]/15"} ${isRTL ? "flex-row-reverse text-right" : ""}`}>
            <Bell className="w-5 h-5 text-[#47CCD0] shrink-0 mt-0.5" />
            <div>
              <p className={`text-[14px] ${textP}`}>
                {isAr ? "إعدادات التنبيهات لكل تكامل" : "Alert Settings per Integration"}
              </p>
              <p className={`text-[12px] ${textS} mt-1`}>
                {isAr
                  ? "اختر قنوات التنبيه (دفع، بريد إلكتروني، SMS) لكل تكامل. سيتم إرسال تنبيه فوري عند انقطاع الاتصال أو فشل المزامنة."
                  : "Select alert channels (Push, Email, SMS) per integration. Instant alerts are sent on connection drops or sync failures."}
              </p>
            </div>
          </div>

          {/* Alert matrix */}
          <Card className={`${cardCls} border shadow-sm overflow-hidden`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={isDark ? "bg-[#0F1923]" : "bg-gray-50"}>
                    <th className={`${isRTL ? "text-right" : "text-left"} px-5 py-3 text-[12px] ${textS}`}>{isAr ? "التكامل" : "Integration"}</th>
                    <th className={`text-center px-5 py-3 text-[12px] ${textS}`}>{isAr ? "الحالة" : "Status"}</th>
                    <th className={`text-center px-5 py-3 text-[12px] ${textS}`}>
                      <div className="flex items-center justify-center gap-1"><Bell className="w-3.5 h-3.5" /> {isAr ? "إشعار فوري" : "Push"}</div>
                    </th>
                    <th className={`text-center px-5 py-3 text-[12px] ${textS}`}>
                      <div className="flex items-center justify-center gap-1"><Mail className="w-3.5 h-3.5" /> {isAr ? "بريد إلكتروني" : "Email"}</div>
                    </th>
                    <th className={`text-center px-5 py-3 text-[12px] ${textS}`}>
                      <div className="flex items-center justify-center gap-1"><Smartphone className="w-3.5 h-3.5" /> SMS</div>
                    </th>
                    <th className={`text-center px-5 py-3 text-[12px] ${textS}`}>{isAr ? "إعادة المحاولة" : "Auto-Retry"}</th>
                  </tr>
                </thead>
                <tbody>
                  {integrations.map((integ) => {
                    const sc = statusConfig[integ.status];
                    const Icon = integ.icon;
                    return (
                      <tr key={integ.id} className={`border-t ${isDark ? "border-gray-700" : "border-gray-100"}`}>
                        <td className="px-5 py-4">
                          <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${integ.color}15` }}>
                              <Icon className="w-4 h-4" style={{ color: integ.color }} />
                            </div>
                            <span className={`text-[13px] ${textP}`}>{isAr ? integ.nameAr : integ.nameEn}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-center">
                          <Badge className={`text-[10px] ${sc.bg} ${sc.color} border-0`}>
                            {isAr ? sc.labelAr : sc.labelEn}
                          </Badge>
                        </td>
                        {(["push", "email", "sms"] as AlertChannel[]).map((ch) => (
                          <td key={ch} className="px-5 py-4 text-center">
                            <button
                              onClick={() => toggleAlert(integ.id, ch)}
                              className={`relative w-10 h-6 rounded-full transition-colors mx-auto ${
                                integ.alerts[ch] ? "bg-[#47CCD0]" : isDark ? "bg-white/10" : "bg-gray-300"
                              }`}
                            >
                              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${
                                integ.alerts[ch] ? (isRTL ? "left-0.5" : "left-[18px]") : (isRTL ? "left-[18px]" : "left-0.5")
                              }`} />
                            </button>
                          </td>
                        ))}
                        <td className="px-5 py-4 text-center">
                          <button
                            onClick={() => toggleRetry(integ.id)}
                            className={`relative w-10 h-6 rounded-full transition-colors mx-auto ${
                              integ.retryEnabled ? "bg-amber-500" : isDark ? "bg-white/10" : "bg-gray-300"
                            }`}
                          >
                            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${
                              integ.retryEnabled ? (isRTL ? "left-0.5" : "left-[18px]") : (isRTL ? "left-[18px]" : "left-0.5")
                            }`} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Alert Conditions Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: XCircle, color: "#EF4444", titleAr: "انقطاع الاتصال", titleEn: "Connection Down", descAr: "تنبيه فوري عند فقدان الاتصال بأي تكامل", descEn: "Instant alert when connection to any integration is lost" },
              { icon: AlertTriangle, color: "#F59E0B", titleAr: "فشل المزامنة", titleEn: "Sync Failure", descAr: "تنبيه عند فشل عملية المزامنة بعد استنفاد المحاولات", descEn: "Alert when sync fails after exhausting all retries" },
              { icon: Activity, color: "#47CCD0", titleAr: "تدهور الأداء", titleEn: "Performance Degraded", descAr: "تنبيه عند ارتفاع زمن الاستجابة أو انخفاض معدل النجاح", descEn: "Alert when latency spikes or success rate drops" },
            ].map((condition, i) => {
              const CIcon = condition.icon;
              return (
                <Card key={i} className={`${cardCls} border shadow-sm`}>
                  <CardContent className={`pt-5 ${isRTL ? "text-right" : ""}`}>
                    <div className={`flex items-center gap-2 mb-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <CIcon className="w-5 h-5" style={{ color: condition.color }} />
                      <span className={`text-[14px] ${textP}`}>{isAr ? condition.titleAr : condition.titleEn}</span>
                    </div>
                    <p className={`text-[12px] ${textS}`}>{isAr ? condition.descAr : condition.descEn}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════ TAB: SYNC LOG ═══════ */}
      {activeTab === "synclog" && (
        <div className="space-y-4">
          {/* Filters */}
          <div className={`flex flex-wrap items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
            {(["all", "success", "failed", "retrying", "partial"] as const).map((f) => {
              const count = f === "all" ? syncLog.length : syncLog.filter((l) => l.status === f).length;
              return (
                <button
                  key={f}
                  onClick={() => setLogFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-[12px] transition-all flex items-center gap-1.5 ${
                    logFilter === f
                      ? "bg-[#47CCD0] text-white"
                      : isDark
                      ? "bg-[#2B3D50] text-gray-400"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {f === "all"
                    ? isAr ? "الكل" : "All"
                    : isAr ? logStatusConfig[f].labelAr : logStatusConfig[f].labelEn}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${logFilter === f ? "bg-white/20" : isDark ? "bg-white/10" : "bg-black/5"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Log entries */}
          <Card className={`${cardCls} border shadow-sm overflow-hidden`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={isDark ? "bg-[#0F1923]" : "bg-gray-50"}>
                    <th className={`${isRTL ? "text-right" : "text-left"} px-5 py-3 text-[12px] ${textS}`}>{isAr ? "الوقت" : "Time"}</th>
                    <th className={`${isRTL ? "text-right" : "text-left"} px-5 py-3 text-[12px] ${textS}`}>{isAr ? "التكامل" : "Integration"}</th>
                    <th className={`text-center px-5 py-3 text-[12px] ${textS}`}>{isAr ? "الحالة" : "Status"}</th>
                    <th className={`text-center px-5 py-3 text-[12px] ${textS}`}>{isAr ? "المدة" : "Duration"}</th>
                    <th className={`text-center px-5 py-3 text-[12px] ${textS}`}>{isAr ? "السجلات" : "Records"}</th>
                    <th className={`${isRTL ? "text-right" : "text-left"} px-5 py-3 text-[12px] ${textS}`}>{isAr ? "تفاصيل" : "Details"}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLog.map((entry) => {
                    const lsc = logStatusConfig[entry.status];
                    return (
                      <tr key={entry.id} className={`border-t ${isDark ? "border-gray-700" : "border-gray-100"} hover:${isDark ? "bg-white/[0.02]" : "bg-gray-50/50"} transition-colors`}>
                        <td className={`px-5 py-3.5 ${isRTL ? "text-right" : ""}`}>
                          <span className={`text-[12px] ${textS} font-mono`} dir="ltr">{formatTimeAgo(entry.timestamp)}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`text-[13px] ${textP}`}>{isAr ? entry.integrationName.ar : entry.integrationName.en}</span>
                        </td>
                        <td className="px-5 py-3.5 text-center">
                          <Badge className={`text-[10px] ${lsc.bg} ${lsc.color} border-0`}>
                            {isAr ? lsc.labelAr : lsc.labelEn}
                            {entry.retryAttempt ? ` (${entry.retryAttempt})` : ""}
                          </Badge>
                        </td>
                        <td className={`px-5 py-3.5 text-center text-[12px] ${textP} font-mono`} dir="ltr">{entry.duration}</td>
                        <td className={`px-5 py-3.5 text-center text-[12px] ${textP}`}>
                          {entry.recordsSynced > 0 ? entry.recordsSynced.toLocaleString() : "—"}
                        </td>
                        <td className={`px-5 py-3.5 ${isRTL ? "text-right" : ""}`}>
                          {entry.errorMessage ? (
                            <span className={`text-[12px] text-red-500`}>
                              {isAr ? entry.errorMessage.ar : entry.errorMessage.en}
                            </span>
                          ) : (
                            <span className={`text-[12px] text-green-500`}>✓</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
