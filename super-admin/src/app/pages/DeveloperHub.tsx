import { 
  Code, 
  Key, 
  Activity, 
  Globe,
  Shield,
  Zap,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Link2,
  Clock,
  BarChart3,
  FileCode,
  Webhook,
  Lock,
  Copy,
  RefreshCw,
  AlertTriangle,
  Loader,
  TrendingUp,
  Settings,
  Play,
  Pause,
  Home,
  Plug,
  Radio,
  Check,
  ArrowUp,
  ArrowDown,
  CreditCard,
  Wallet,
  Smartphone,
  Mail,
  MessageSquare,
  Bell,
  MessageCircle,
  Send,
  Brain,
  Eye,
  Target,
  Bot,
  Sparkles,
  Camera,
  Building2,
  Fingerprint,
  IdCard,
  MapPin,
  Cloud,
  Search,
  Database,
  HardDrive,
  Trash2,
  RotateCw,
  Plus,
  Filter,
  Calendar,
  ExternalLink
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "../context/TranslationContext";

// Integration Status
const integrationStatus = [
  {
    nameAr: "تكامل REGA",
    nameEn: "REGA Integration",
    status: "Connected",
    statusAr: "متصل",
    uptime: "99.97%",
    lastSync: "2026-03-18 14:23",
    apiVersion: "v2.1.4",
    endpoint: "https://api.rega.gov.sa/v2",
    icon: Shield,
    color: "#47CCD0"
  },
  {
    nameAr: "تكامل Infath",
    nameEn: "Infath Integration",
    status: "Connected",
    statusAr: "متصل",
    uptime: "99.85%",
    lastSync: "2026-03-18 14:21",
    apiVersion: "v1.8.2",
    endpoint: "https://api.infath.gov.sa/v1",
    icon: FileCode,
    color: "#2B3D50"
  },
  {
    nameAr: "تكامل سداد",
    nameEn: "Sadad Integration",
    status: "Connected",
    statusAr: "متصل",
    uptime: "99.92%",
    lastSync: "2026-03-18 14:25",
    apiVersion: "v3.0.1",
    endpoint: "https://api.sadad.com/v3",
    icon: Activity,
    color: "#47CCD0"
  },
  {
    nameAr: "رسائل SMS (Unifonic)",
    nameEn: "SMS (Unifonic)",
    status: "Connected",
    statusAr: "متصل",
    uptime: "99.99%",
    lastSync: "2026-03-18 14:24",
    apiVersion: "v2.5.0",
    endpoint: "https://api.unifonic.com/v2",
    icon: Globe,
    color: "#2B3D50"
  },
  {
    nameAr: "تكامل WhatsApp Business",
    nameEn: "WhatsApp Business",
    status: "Limited",
    statusAr: "محدود",
    uptime: "98.45%",
    lastSync: "2026-03-18 13:58",
    apiVersion: "v16.0",
    endpoint: "https://graph.facebook.com/v16.0",
    icon: AlertCircle,
    color: "#F59E0B"
  }
];

// API Keys
const apiKeys = [
  {
    keyId: "key_live_4f8a9c2e1d",
    name: "Production API Key",
    nameAr: "مفتاح الإنتاج الرئيسي",
    created: "2025-11-15",
    lastUsed: "2026-03-18 14:25",
    calls: "1.2M",
    status: "active",
    permissions: ["read", "write", "delete"],
    rateLimit: "10000/hour"
  },
  {
    keyId: "key_test_7b3e5f9a2c",
    name: "Testing API Key",
    nameAr: "مفتاح الاختبار",
    created: "2026-01-20",
    lastUsed: "2026-03-18 12:10",
    calls: "45.3K",
    status: "active",
    permissions: ["read", "write"],
    rateLimit: "1000/hour"
  },
  {
    keyId: "key_dev_9d1c4a8e7f",
    name: "Development Key",
    nameAr: "مفتاح التطوير",
    created: "2026-02-10",
    lastUsed: "2026-03-17 18:42",
    calls: "12.8K",
    status: "active",
    permissions: ["read"],
    rateLimit: "500/hour"
  },
  {
    keyId: "key_old_2a5f8c9b3e",
    name: "Legacy Key (Deprecated)",
    nameAr: "مفتاح قديم (متوقف)",
    created: "2024-08-05",
    lastUsed: "2026-02-28 09:15",
    calls: "2.8M",
    status: "deprecated",
    permissions: ["read"],
    rateLimit: "100/hour"
  }
];

// API Usage Statistics
const apiUsageStats = {
  today: {
    requests: 34789,
    successful: 34521,
    failed: 268,
    avgResponseTime: "145ms",
    successRate: "99.23%"
  },
  thisWeek: {
    requests: 278456,
    successful: 276892,
    failed: 1564,
    avgResponseTime: "152ms",
    successRate: "99.44%"
  },
  thisMonth: {
    requests: 1247890,
    successful: 1239456,
    failed: 8434,
    avgResponseTime: "148ms",
    successRate: "99.32%"
  }
};

// Recent API Calls Log
const recentApiCalls = [
  {
    timestamp: "2026-03-18 14:25:12",
    endpoint: "/api/v2/auctions/create",
    method: "POST",
    status: 201,
    responseTime: "128ms",
    apiKey: "key_live_4f8a...",
    ipAddress: "94.56.123.45"
  },
  {
    timestamp: "2026-03-18 14:25:08",
    endpoint: "/api/v2/bids/submit",
    method: "POST",
    status: 200,
    responseTime: "95ms",
    apiKey: "key_live_4f8a...",
    ipAddress: "94.56.123.48"
  },
  {
    timestamp: "2026-03-18 14:25:03",
    endpoint: "/api/v2/users/verify",
    method: "GET",
    status: 200,
    responseTime: "52ms",
    apiKey: "key_test_7b3e...",
    ipAddress: "185.34.78.12"
  },
  {
    timestamp: "2026-03-18 14:24:58",
    endpoint: "/api/v2/properties/list",
    method: "GET",
    status: 200,
    responseTime: "187ms",
    apiKey: "key_live_4f8a...",
    ipAddress: "94.56.123.45"
  },
  {
    timestamp: "2026-03-18 14:24:52",
    endpoint: "/api/v2/rega/validate",
    method: "POST",
    status: 500,
    responseTime: "2345ms",
    apiKey: "key_live_4f8a...",
    ipAddress: "94.56.123.50",
    error: "REGA API Timeout"
  },
  {
    timestamp: "2026-03-18 14:24:45",
    endpoint: "/api/v2/webhooks/register",
    method: "POST",
    status: 201,
    responseTime: "76ms",
    apiKey: "key_test_7b3e...",
    ipAddress: "185.34.78.12"
  }
];

// Webhooks
const webhooks = [
  {
    id: "wh_4f8a9c2e1d",
    nameAr: "تنبيهات المزادات",
    nameEn: "Auction Alerts",
    url: "https://mzadat.com.sa/webhooks/auctions",
    events: ["auction.created", "auction.started", "auction.ended"],
    status: "active",
    lastTriggered: "2026-03-18 14:20",
    successRate: "99.8%"
  },
  {
    id: "wh_7b3e5f9a2c",
    nameAr: "تحديثات المزايدات",
    nameEn: "Bid Updates",
    url: "https://mzadat.com.sa/webhooks/bids",
    events: ["bid.placed", "bid.won"],
    status: "active",
    lastTriggered: "2026-03-18 14:25",
    successRate: "100%"
  },
  {
    id: "wh_9d1c4a8e7f",
    nameAr: "إشعارات الدفع",
    nameEn: "Payment Notifications",
    url: "https://mzadat.com.sa/webhooks/payments",
    events: ["payment.received", "refund.processed"],
    status: "paused",
    lastTriggered: "2026-03-15 09:12",
    successRate: "97.5%"
  }
];

// SDK Downloads
const sdkDownloads = [
  {
    platform: "JavaScript/Node.js",
    platformAr: "جافا سكريبت/Node.js",
    version: "v3.2.1",
    downloads: "12.4K",
    updated: "2026-03-10",
    icon: "📦"
  },
  {
    platform: "Python",
    platformAr: "بايثون",
    version: "v2.8.0",
    downloads: "8.7K",
    updated: "2026-03-05",
    icon: "🐍"
  },
  {
    platform: "PHP",
    platformAr: "PHP",
    version: "v2.5.3",
    downloads: "6.2K",
    updated: "2026-02-28",
    icon: "🐘"
  },
  {
    platform: "Ruby",
    platformAr: "روبي",
    version: "v1.9.2",
    downloads: "3.1K",
    updated: "2026-02-20",
    icon: "💎"
  }
];

export default function DeveloperHub() {
  const { theme } = useTheme();
  const { t, language, direction } = useTranslation();
  const isDark = theme === 'dark';
  const isRTL = direction === 'rtl';

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink 
              href="/" 
              className={`flex items-center gap-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-[#2B3D50]'}`}
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              <Home className="w-4 h-4" />
              {language === 'ar' ? 'الرئيسية' : 'Home'}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className={isDark ? 'text-gray-600' : ''} />
          <BreadcrumbItem>
            <BreadcrumbPage 
              className={`${isDark ? 'text-white' : 'text-[#2B3D50]'}`}
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              {language === 'ar' ? 'التكاملات والمطورين' : 'Integrations & Developers'}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h1 
            className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}
            style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          >
            Developer & API Integrations Hub
          </h1>
          <p 
            className={`text-lg mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            {language === 'ar' ? 'بوابة المطورين وإدارة التكاملات - API' : 'Developer Portal & API Integration Management'}
          </p>
          <p 
            className={`text-sm mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            {language === 'ar' 
              ? 'إدارة جميع التكاملات الخارجية، مفاتيح API، Webhooks، والاتصال بالنظام من مكان واحد' 
              : 'Manage all third-party integrations, API keys, webhooks, and system connectivity from one place'}
          </p>
        </div>
        <Button 
          className="bg-[#47CCD0] hover:bg-[#3ab5b9] text-white"
          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
        >
          <FileCode className="w-4 h-4 ml-2" />
          {language === 'ar' ? 'عرض التوثيق' : 'View Documentation'}
        </Button>
      </div>

      {/* API Health Overview - Top 4 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Active Integrations */}
        <Card className={`${isDark ? 'bg-[#1F2937] border-gray-700' : 'bg-white'} shadow-md`}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                  {language === 'ar' ? 'إجمالي التكاملات النشطة' : 'Active Integrations'}
                </p>
                <h3 className={`text-3xl font-bold mt-2 ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                  14
                </h3>
                <Badge className="mt-2 bg-green-100 text-green-700 hover:bg-green-100 flex items-center gap-1 w-fit">
                  +2 new <ArrowUp className="w-3 h-3" />
                </Badge>
              </div>
              <div className="w-14 h-14 bg-[#47CCD0]/10 rounded-full flex items-center justify-center">
                <Plug className="w-7 h-7 text-[#47CCD0]" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Today's API Calls */}
        <Card className={`${isDark ? 'bg-[#1F2937] border-gray-700' : 'bg-white'} shadow-md`}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                  {language === 'ar' ? 'طلبات API اليوم' : "Today's API Calls"}
                </p>
                <h3 className={`text-3xl font-bold mt-2 ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                  48,523
                </h3>
                <Badge className="mt-2 bg-green-100 text-green-700 hover:bg-green-100 flex items-center gap-1 w-fit">
                  +12% <ArrowUp className="w-3 h-3" />
                </Badge>
              </div>
              <div className="w-14 h-14 bg-[#47CCD0]/10 rounded-full flex items-center justify-center">
                <Radio className="w-7 h-7 text-[#47CCD0]" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Avg Response Time */}
        <Card className={`${isDark ? 'bg-[#1F2937] border-gray-700' : 'bg-white'} shadow-md`}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                  {language === 'ar' ? 'متوسط زمن الاستجابة' : 'Avg Response Time'}
                </p>
                <h3 className={`text-3xl font-bold mt-2 ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                  89ms
                </h3>
                <Badge className="mt-2 bg-green-100 text-green-700 hover:bg-green-100 flex items-center gap-1 w-fit">
                  -15% <ArrowDown className="w-3 h-3" />
                </Badge>
              </div>
              <div className="w-14 h-14 bg-[#2B3D50]/10 rounded-full flex items-center justify-center">
                <Zap className="w-7 h-7 text-[#2B3D50]" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 4: Overall Success Rate */}
        <Card className={`${isDark ? 'bg-[#1F2937] border-gray-700' : 'bg-white'} shadow-md`}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                  {language === 'ar' ? 'معدل النجاح الكلي' : 'Overall Success Rate'}
                </p>
                <h3 className={`text-3xl font-bold mt-2 ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                  99.7%
                </h3>
                <Badge className="mt-2 bg-green-100 text-green-700 hover:bg-green-100 flex items-center gap-1 w-fit">
                  +0.2% <ArrowUp className="w-3 h-3" />
                </Badge>
              </div>
              <div className="w-14 h-14 bg-green-100/50 rounded-full flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SECTION 2: Google Indexing & SEO APIs */}
      <Card className={`${isDark ? 'bg-[#1F2937] border-gray-700' : 'bg-white'} shadow-md`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className={`text-xl ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                Google Indexing & SEO Integration
              </CardTitle>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                {language === 'ar' ? 'تكامل أرشفة Google وتحسين محركات البحث' : 'Google Search APIs and Analytics Integration'}
              </p>
            </div>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
              ● {language === 'ar' ? 'متصل' : 'All Connected'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Card A - Google Indexing API */}
            <div className={`p-5 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <h4 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                  Google Indexing API
                </h4>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  ● {language === 'ar' ? 'متصل' : 'Connected'}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'حالة API:' : 'API Status:'}
                  </span>
                  <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    {language === 'ar' ? 'نشط' : 'Active'}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'صفحات مؤرشفة اليوم:' : 'Pages Indexed Today:'}
                  </span>
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    342
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'إجمالي الصفحات المؤرشفة:' : 'Total Indexed Pages:'}
                  </span>
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    12,847
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'قيد الأرشفة:' : 'Pending Indexing:'}
                  </span>
                  <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                    56
                  </Badge>
                </div>

                <div className={`pt-3 pb-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                      {language === 'ar' ? 'آخر مزامنة:' : 'Last Sync:'}
                    </span>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {language === 'ar' ? 'منذ 15 دقيقة' : '15 minutes ago'}
                    </span>
                  </div>
                  <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    2026-03-18 09:30
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'معدل النجاح:' : 'Success Rate:'}
                  </span>
                  <span className="text-sm font-medium text-green-600">98.5%</span>
                </div>

                <div className={`pt-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex justify-between mb-2">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {language === 'ar' ? 'الحصة اليومية:' : 'Daily Quota:'}
                    </span>
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                      1,200 / 10,000
                    </span>
                  </div>
                  <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div className="h-full bg-[#47CCD0] rounded-full" style={{ width: '12%' }}></div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-3">
                  <Button 
                    variant="outline" 
                    className={`w-full border-[#47CCD0] text-[#47CCD0] hover:bg-[#47CCD0]/10 ${isDark ? 'border-[#47CCD0]' : ''}`}
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    <RefreshCw className="w-4 h-4 ml-2" />
                    {language === 'ar' ? 'إعادة الأرشفة القسرية' : 'Force Re-index'}
                  </Button>
                  <Button 
                    className="w-full bg-[#47CCD0] hover:bg-[#3ab5b9] text-white"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    <FileCode className="w-4 h-4 ml-2" />
                    {language === 'ar' ? 'عرض سجل الأرشفة' : 'View Indexing Log'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Card B - Google Search Console API */}
            <div className={`p-5 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <h4 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                  Google Search Console API
                </h4>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  ● {language === 'ar' ? 'متصل' : 'Connected'}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'الظهور (7 أيام):' : 'Total Impressions (7d):'}
                  </span>
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    245,600
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'النقرات (7 أيام):' : 'Total Clicks (7d):'}
                  </span>
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    18,430
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'متوسط CTR:' : 'Average CTR:'}
                  </span>
                  <span className="text-sm font-medium text-green-600">7.5%</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'متوسط الموضع:' : 'Average Position:'}
                  </span>
                  <Badge className="bg-[#47CCD0]/10 text-[#47CCD0] hover:bg-[#47CCD0]/10">
                    4.2
                  </Badge>
                </div>

                <div className={`pt-3 pb-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <h5 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                    {language === 'ar' ? 'أفضل الصفحات أداءً:' : 'Top Performing Pages:'}
                  </h5>
                  <div className="space-y-2">
                    <div className={`flex items-center justify-between p-2 rounded ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                          1
                        </Badge>
                        <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          /auctions/villa-riyadh
                        </span>
                      </div>
                      <Badge className="bg-[#47CCD0]/10 text-[#47CCD0] hover:bg-[#47CCD0]/10 text-xs">
                        1.2
                      </Badge>
                    </div>
                    <div className={`flex items-center justify-between p-2 rounded ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                          2
                        </Badge>
                        <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          /auctions/land-jeddah
                        </span>
                      </div>
                      <Badge className="bg-[#47CCD0]/10 text-[#47CCD0] hover:bg-[#47CCD0]/10 text-xs">
                        2.8
                      </Badge>
                    </div>
                    <div className={`flex items-center justify-between p-2 rounded ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                          3
                        </Badge>
                        <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          /property/commercial
                        </span>
                      </div>
                      <Badge className="bg-[#47CCD0]/10 text-[#47CCD0] hover:bg-[#47CCD0]/10 text-xs">
                        3.5
                      </Badge>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full bg-[#47CCD0] hover:bg-[#3ab5b9] text-white mt-2"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  <BarChart3 className="w-4 h-4 ml-2" />
                  {language === 'ar' ? 'عرض التقرير الكامل' : 'View Full Report'}
                </Button>
              </div>
            </div>

            {/* Card C - Google Analytics & Tag Manager */}
            <div className={`p-5 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <h4 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                  Google Analytics & GTM
                </h4>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  ● {language === 'ar' ? 'متصل' : 'Connected'}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'GA4 Property ID:' : 'GA4 Property ID:'}
                  </span>
                  <code className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'}`}>
                    G-XXXX1234
                  </code>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'GTM Container:' : 'GTM Container:'}
                  </span>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    {language === 'ar' ? 'نشط' : 'Active'}
                  </Badge>
                </div>

                <div className={`pt-3 pb-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {language === 'ar' ? 'المستخدمون الآن:' : 'Real-time Users:'}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                      </span>
                      <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                        1,247
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'الأحداث المتتبعة اليوم:' : 'Events Tracked Today:'}
                  </span>
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    34,560
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'معدل التحويل:' : 'Conversion Rate:'}
                  </span>
                  <span className="text-sm font-medium text-green-600">3.2%</span>
                </div>

                <div className={`mt-4 p-3 rounded-lg ${isDark ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-4 h-4 text-blue-600" />
                    <span className={`text-xs font-medium ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                      {language === 'ar' ? 'أهم 3 أحداث:' : 'Top 3 Events:'}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>page_view</span>
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>12,340</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>bid_placed</span>
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>2,156</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>property_view</span>
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>8,890</span>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full bg-[#47CCD0] hover:bg-[#3ab5b9] text-white mt-2"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  <Settings className="w-4 h-4 ml-2" />
                  {language === 'ar' ? 'تكوين الأحداث' : 'Configure Events'}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SECTION 3: Payment Gateways & Banking APIs */}
      <Card className={`${isDark ? 'bg-[#1F2937] border-gray-700' : 'bg-white'} shadow-md`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className={`text-xl ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                Payment Gateways & Banking Integration
              </CardTitle>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                {language === 'ar' ? 'بوابات الدفع والتكامل البنكي - سداد، مدى، Apple Pay، STC Pay' : 'Payment Gateway Integration - Sadad, Mada, Apple Pay, STC Pay'}
              </p>
            </div>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
              ● {language === 'ar' ? 'متصل' : 'All Active'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Card 1 - Sadad Integration */}
            <div className={`p-5 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                      Sadad
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {language === 'ar' ? 'نظام سداد' : 'Sadad Payment'}
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  ● {language === 'ar' ? 'نشط' : 'Active'}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'المعاملات اليوم:' : 'Today\'s Transactions:'}
                  </span>
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    247
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'معدل النجاح:' : 'Success Rate:'}
                  </span>
                  <span className="text-sm font-medium text-green-600">95.14%</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'فشلت:' : 'Failed:'}
                  </span>
                  <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                    12 (4.86%)
                  </Badge>
                </div>

                <div className={`pt-3 pb-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {language === 'ar' ? 'القيمة الإجمالية اليوم:' : 'Total Value Today:'}
                    </span>
                    <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                      SAR 12,450,000
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'وقت التشغيل:' : 'Uptime:'}
                  </span>
                  <span className="text-sm font-medium text-green-600">99.98%</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'آخر مزامنة:' : 'Last Sync:'}
                  </span>
                  <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {language === 'ar' ? 'منذ دقيقتين' : '2 mins ago'}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'إصدار API:' : 'API Version:'}
                  </span>
                  <code className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'}`}>
                    v2.4
                  </code>
                </div>

                <div className="flex flex-col gap-2 pt-3">
                  <Button 
                    className="w-full bg-[#47CCD0] hover:bg-[#3ab5b9] text-white"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    <FileCode className="w-4 h-4 ml-2" />
                    {language === 'ar' ? 'عرض المعاملات' : 'View Transactions'}
                  </Button>
                  <Button 
                    variant="outline" 
                    className={`w-full border-[#47CCD0] text-[#47CCD0] hover:bg-[#47CCD0]/10 ${isDark ? 'border-[#47CCD0]' : ''}`}
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    <CheckCircle className="w-4 h-4 ml-2" />
                    {language === 'ar' ? 'اختبار الاتصال' : 'Test Connection'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Card 2 - Mada Gateway */}
            <div className={`p-5 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                      Mada
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {language === 'ar' ? 'بوابة مدى' : 'Mada Gateway'}
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  ● {language === 'ar' ? 'متصل' : 'Connected'}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'المعاملات اليوم:' : 'Today\'s Transactions:'}
                  </span>
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    189
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'معدل النجاح:' : 'Success Rate:'}
                  </span>
                  <span className="text-sm font-medium text-green-600">97.3%</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'فشلت:' : 'Failed:'}
                  </span>
                  <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                    5 (2.7%)
                  </Badge>
                </div>

                <div className={`pt-3 pb-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {language === 'ar' ? 'القيمة الإجمالية:' : 'Total Value:'}
                    </span>
                    <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                      SAR 3,240,000
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'وقت التشغيل:' : 'Uptime:'}
                  </span>
                  <span className="text-sm font-medium text-green-600">99.95%</span>
                </div>

                <div className={`pt-3 pb-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex items-start justify-between">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {language === 'ar' ? 'حالة التسوية:' : 'Settlement Status:'}
                    </span>
                    <div className="text-left">
                      <Badge className="bg-[#47CCD0]/10 text-[#47CCD0] hover:bg-[#47CCD0]/10">
                        {language === 'ar' ? 'تلقائي' : 'Auto'}
                      </Badge>
                      <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                        {language === 'ar' ? 'يومياً 12:00 ص' : 'Daily at 12:00 AM'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-3">
                  <Button 
                    className="w-full bg-[#47CCD0] hover:bg-[#3ab5b9] text-white"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    <FileCode className="w-4 h-4 ml-2" />
                    {language === 'ar' ? 'عرض المعاملات' : 'View Transactions'}
                  </Button>
                  <Button 
                    variant="outline" 
                    className={`w-full border-[#47CCD0] text-[#47CCD0] hover:bg-[#47CCD0]/10 ${isDark ? 'border-[#47CCD0]' : ''}`}
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    <CheckCircle className="w-4 h-4 ml-2" />
                    {language === 'ar' ? 'اختبار الاتصال' : 'Test Connection'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Card 3 - Apple Pay / STC Pay */}
            <div className={`p-5 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-6 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded flex items-center justify-center">
                      <Wallet className="w-4 h-4 text-white" />
                    </div>
                    <div className="w-6 h-12 bg-gradient-to-br from-[#47CCD0] to-[#3ab5b9] rounded flex items-center justify-center">
                      <Smartphone className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                      Apple Pay / STC Pay
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {language === 'ar' ? 'محافظ رقمية' : 'Digital Wallets'}
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  ● {language === 'ar' ? 'متصل' : 'Connected'}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'معاملات مجمعة:' : 'Combined Transactions:'}
                  </span>
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    156
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'معدل النجاح:' : 'Success Rate:'}
                  </span>
                  <span className="text-sm font-medium text-green-600">98.1%</span>
                </div>

                <div className={`pt-3 pb-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-gray-500" />
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          Apple Pay:
                        </span>
                      </div>
                      <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                        89 {language === 'ar' ? 'معاملة' : 'transactions'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-[#47CCD0]" />
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          STC Pay:
                        </span>
                      </div>
                      <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                        67 {language === 'ar' ? 'معاملة' : 'transactions'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'القيمة الإجمالية:' : 'Total Value:'}
                  </span>
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    SAR 1,850,000
                  </span>
                </div>

                <div className="flex flex-col gap-2 pt-3">
                  <Button 
                    className="w-full bg-[#47CCD0] hover:bg-[#3ab5b9] text-white"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    <Settings className="w-4 h-4 ml-2" />
                    {language === 'ar' ? 'تكوين' : 'Configure'}
                  </Button>
                  <Button 
                    variant="outline" 
                    className={`w-full border-[#47CCD0] text-[#47CCD0] hover:bg-[#47CCD0]/10 ${isDark ? 'border-[#47CCD0]' : ''}`}
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    <CheckCircle className="w-4 h-4 ml-2" />
                    {language === 'ar' ? 'اختبار الاتصال' : 'Test Connection'}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: BNPL & Banking */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Card 4 - Tabby BNPL */}
            <div className={`p-5 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                      Tabby
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {language === 'ar' ? 'تابي - اشتر الآن وادفع لاحقاً' : 'Buy Now Pay Later'}
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  ● {language === 'ar' ? 'متصل' : 'Connected'}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'خطط التقسيط النشطة:' : 'Active Installment Plans:'}
                  </span>
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    234
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'خطط جديدة اليوم:' : 'New Plans Today:'}
                  </span>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                    +12
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'معدل التعثر:' : 'Default Rate:'}
                  </span>
                  <span className="text-sm font-medium text-yellow-600">1.2%</span>
                </div>

                <div className={`pt-3 pb-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {language === 'ar' ? 'إجمالي المستحقات:' : 'Total Outstanding:'}
                    </span>
                    <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                      SAR 4,500,000
                    </span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-[#47CCD0] hover:bg-[#3ab5b9] text-white mt-3"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  <FileCode className="w-4 h-4 ml-2" />
                  {language === 'ar' ? 'عرض الخطط' : 'View Plans'}
                </Button>
              </div>
            </div>

            {/* Card 5 - Tamara BNPL */}
            <div className={`p-5 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                      Tamara
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {language === 'ar' ? 'تمارا - BNPL' : 'Buy Now Pay Later'}
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  ● {language === 'ar' ? 'متصل' : 'Connected'}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'الخطط النشطة:' : 'Active Plans:'}
                  </span>
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    187
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'خطط جديدة اليوم:' : 'New Plans Today:'}
                  </span>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                    +8
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'معدل التعثر:' : 'Default Rate:'}
                  </span>
                  <span className="text-sm font-medium text-green-600">0.8%</span>
                </div>

                <div className={`pt-3 pb-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {language === 'ar' ? 'إجمالي المستحقات:' : 'Total Outstanding:'}
                    </span>
                    <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                      SAR 3,200,000
                    </span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-[#47CCD0] hover:bg-[#3ab5b9] text-white mt-3"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  <FileCode className="w-4 h-4 ml-2" />
                  {language === 'ar' ? 'عرض الخطط' : 'View Plans'}
                </Button>
              </div>
            </div>

            {/* Card 6 - Bank Transfer / IBAN Verification */}
            <div className={`p-5 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2B3D50] to-[#1a2633] rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                      Bank Transfer
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {language === 'ar' ? 'تحقق من IBAN' : 'IBAN Verification'}
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  ● {language === 'ar' ? 'متصل' : 'Connected'}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'عمليات تحقق اليوم:' : 'IBAN Verifications Today:'}
                  </span>
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    89
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'معدل النجاح:' : 'Success Rate:'}
                  </span>
                  <span className="text-sm font-medium text-green-600">100%</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'البنوك المدعومة:' : 'Supported Banks:'}
                  </span>
                  <Badge className="bg-[#47CCD0]/10 text-[#47CCD0] hover:bg-[#47CCD0]/10">
                    12 {language === 'ar' ? 'بنك' : 'Banks'}
                  </Badge>
                </div>

                <div className={`pt-3 pb-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {language === 'ar' ? 'التسوية التلقائية:' : 'Auto-reconciliation:'}
                    </span>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      {language === 'ar' ? 'نشط' : 'Active'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                      {language === 'ar' ? 'آخر تسوية:' : 'Last Reconciliation:'}
                    </span>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      2026-03-18 08:00
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <Button 
                    className="w-full bg-[#47CCD0] hover:bg-[#3ab5b9] text-white"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    <CheckCircle className="w-4 h-4 ml-2" />
                    {language === 'ar' ? 'التحقق من IBAN' : 'Verify IBAN'}
                  </Button>
                  <Button 
                    variant="outline" 
                    className={`w-full border-[#47CCD0] text-[#47CCD0] hover:bg-[#47CCD0]/10 ${isDark ? 'border-[#47CCD0]' : ''}`}
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    <FileCode className="w-4 h-4 ml-2" />
                    {language === 'ar' ? 'عرض السجل' : 'View Log'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SECTION 4: Email & Messaging Notifications */}
      <Card className={`${isDark ? 'bg-[#1F2937] border-gray-700' : 'bg-white'} shadow-md`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className={`text-xl ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                Notifications & Messaging Services
              </CardTitle>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                {language === 'ar' ? 'خدمات الإشعارات والرسائل - البريد، SMS، الإشعارات، WhatsApp' : 'Email, SMS, Push Notifications & WhatsApp Integration'}
              </p>
            </div>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
              ● {language === 'ar' ? 'جميع الخدمات نشطة' : 'All Active'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Card 1 - Email Service */}
            <div className={`p-5 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                      Email Service
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      SendGrid
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  ● {language === 'ar' ? 'متصل' : 'Connected'}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'رسائل مرسلة اليوم:' : 'Emails Sent Today:'}
                  </span>
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    3,456
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'معدل التسليم:' : 'Delivery Rate:'}
                  </span>
                  <span className="text-sm font-medium text-green-600">99.2%</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'معدل الارتداد:' : 'Bounce Rate:'}
                  </span>
                  <span className="text-sm font-medium text-yellow-600">0.5%</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'بلاغات سبام:' : 'Spam Reports:'}
                  </span>
                  <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                    2
                  </Badge>
                </div>

                <div className={`pt-3 pb-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                        {language === 'ar' ? 'الحصة الشهرية:' : 'Monthly Quota:'}
                      </span>
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                        45,000 / 100,000
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-[#47CCD0] h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'القوالب النشطة:' : 'Templates Active:'}
                  </span>
                  <Badge className="bg-[#47CCD0]/10 text-[#47CCD0] hover:bg-[#47CCD0]/10">
                    24
                  </Badge>
                </div>

                <div className="flex flex-col gap-2 pt-3">
                  <Button 
                    className="w-full bg-[#47CCD0] hover:bg-[#3ab5b9] text-white"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    <Mail className="w-4 h-4 ml-2" />
                    {language === 'ar' ? 'قوالب البريد' : 'Email Templates'}
                  </Button>
                  <Button 
                    variant="outline" 
                    className={`w-full border-[#47CCD0] text-[#47CCD0] hover:bg-[#47CCD0]/10 ${isDark ? 'border-[#47CCD0]' : ''}`}
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    <FileCode className="w-4 h-4 ml-2" />
                    {language === 'ar' ? 'عرض السجلات' : 'View Logs'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Card 2 - SMS Gateway */}
            <div className={`p-5 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                      SMS Gateway
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Unifonic
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  ● {language === 'ar' ? 'متصل' : 'Connected'}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'رسائل مرسلة اليوم:' : 'SMS Sent Today:'}
                  </span>
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    1,234
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'معدل التسليم:' : 'Delivery Rate:'}
                  </span>
                  <span className="text-sm font-medium text-green-600">98.7%</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {language === 'ar' ? 'رسائل OTP:' : 'OTP Messages:'}
                    </span>
                    <span className={`text-xs font-medium ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                      890
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {language === 'ar' ? 'رسائل تسويقية:' : 'Marketing SMS:'}
                    </span>
                    <span className={`text-xs font-medium ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                      344
                    </span>
                  </div>
                </div>

                <div className={`pt-3 pb-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                        {language === 'ar' ? 'الحصة الشهرية:' : 'Monthly Quota:'}
                      </span>
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                        12,000 / 50,000
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '24%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'التكلفة اليوم:' : 'Cost Today:'}
                  </span>
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    SAR 1,850
                  </span>
                </div>

                <div className="flex flex-col gap-2 pt-3">
                  <Button 
                    className="w-full bg-[#47CCD0] hover:bg-[#3ab5b9] text-white"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    <Settings className="w-4 h-4 ml-2" />
                    {language === 'ar' ? 'تكوين' : 'Configure'}
                  </Button>
                  <Button 
                    variant="outline" 
                    className={`w-full border-[#47CCD0] text-[#47CCD0] hover:bg-[#47CCD0]/10 ${isDark ? 'border-[#47CCD0]' : ''}`}
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    <FileCode className="w-4 h-4 ml-2" />
                    {language === 'ar' ? 'عرض السجلات' : 'View Logs'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Card 3 - Push Notifications */}
            <div className={`p-5 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg flex items-center justify-center">
                    <Bell className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                      Push Notifications
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Firebase FCM
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  ● {language === 'ar' ? 'متصل' : 'Connected'}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'إشعارات مرسلة اليوم:' : 'Notifications Sent Today:'}
                  </span>
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    8,900
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'معدل التسليم:' : 'Delivery Rate:'}
                  </span>
                  <span className="text-sm font-medium text-green-600">96.5%</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'معدل الفتح:' : 'Open Rate:'}
                  </span>
                  <span className="text-sm font-medium text-blue-600">34.2%</span>
                </div>

                <div className={`pt-3 pb-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {language === 'ar' ? 'الأجهزة النشطة:' : 'Active Devices:'}
                    </span>
                    <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                      45,678
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                        iOS:
                      </span>
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                        23,456
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                        Android:
                      </span>
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                        22,222
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-3">
                  <Button 
                    className="w-full bg-[#47CCD0] hover:bg-[#3ab5b9] text-white"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    <Send className="w-4 h-4 ml-2" />
                    {language === 'ar' ? 'إرسال اختبار' : 'Send Test'}
                  </Button>
                  <Button 
                    variant="outline" 
                    className={`w-full border-[#47CCD0] text-[#47CCD0] hover:bg-[#47CCD0]/10 ${isDark ? 'border-[#47CCD0]' : ''}`}
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    <Settings className="w-4 h-4 ml-2" />
                    {language === 'ar' ? 'إدارة المواضيع' : 'Manage Topics'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Card 4 - WhatsApp Business API */}
            <div className={`p-5 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                      WhatsApp Business
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {language === 'ar' ? 'واتساب للأعمال' : 'Business API'}
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  ● {language === 'ar' ? 'متصل' : 'Connected'}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'رسائل مرسلة اليوم:' : 'Messages Sent Today:'}
                  </span>
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    567
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'معدل التسليم:' : 'Delivery Rate:'}
                  </span>
                  <span className="text-sm font-medium text-green-600">99.8%</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'القوالب المعتمدة:' : 'Template Messages:'}
                  </span>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    12 {language === 'ar' ? 'معتمد' : 'approved'}
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'رسائل الجلسة:' : 'Session Messages:'}
                  </span>
                  <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    234
                  </span>
                </div>

                <div className={`pt-3 pb-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {language === 'ar' ? 'التكلفة الشهرية:' : 'Monthly Cost:'}
                    </span>
                    <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                      SAR 4,200
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-3">
                  <Button 
                    className="w-full bg-[#47CCD0] hover:bg-[#3ab5b9] text-white"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    <MessageCircle className="w-4 h-4 ml-2" />
                    {language === 'ar' ? 'القوالب' : 'Templates'}
                  </Button>
                  <Button 
                    variant="outline" 
                    className={`w-full border-[#47CCD0] text-[#47CCD0] hover:bg-[#47CCD0]/10 ${isDark ? 'border-[#47CCD0]' : ''}`}
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    <FileCode className="w-4 h-4 ml-2" />
                    {language === 'ar' ? 'عرض المحادثات' : 'View Conversations'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SECTION 5: AI & Machine Learning Integrations */}
      <Card className={`${isDark ? 'bg-[#1F2937] border-gray-700' : 'bg-white'} shadow-md`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className={`text-xl ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                AI & Machine Learning Integrations
              </CardTitle>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                {language === 'ar' ? 'تكاملات الذكاء الاصطناعي والتعلم الآلي - OpenAI، Vision AI، نماذج التنبؤ' : 'OpenAI, Google Vision, Custom ML Models & AI Services'}
              </p>
            </div>
            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
              <Sparkles className="w-3 h-3 ml-1" />
              {language === 'ar' ? 'نشط' : 'Active'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Row 1: OpenAI, Vision AI, Custom ML */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Card 1 - OpenAI / GPT Integration */}
            <div className={`p-5 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                      OpenAI / GPT
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Model: GPT-4o
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  ● {language === 'ar' ? 'نشط' : 'Active'}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'استدعاءات API اليوم:' : 'API Calls Today:'}
                  </span>
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    2,340
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'الرموز المستخدمة اليوم:' : 'Tokens Used Today:'}
                  </span>
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    1.2M
                  </span>
                </div>

                <div className={`pt-3 pb-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                        {language === 'ar' ? 'الميزانية الشهرية:' : 'Monthly Budget:'}
                      </span>
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                        SAR 8,500 / 15,000
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '56.67%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'متوسط وقت الاستجابة:' : 'Avg Response Time:'}
                  </span>
                  <span className="text-sm font-medium text-green-600">1.2s</span>
                </div>

                <div className={`pt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs`}>
                  <div className="font-medium mb-1">{language === 'ar' ? 'حالات الاستخدام:' : 'Use Cases:'}</div>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">{language === 'ar' ? 'وصف العقار' : 'Property Desc'}</Badge>
                    <Badge variant="outline" className="text-xs">{language === 'ar' ? 'الدردشة' : 'Chatbot'}</Badge>
                    <Badge variant="outline" className="text-xs">{language === 'ar' ? 'تحليل الوثائق' : 'Doc Analysis'}</Badge>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-3">
                  <Button 
                    className="w-full bg-[#47CCD0] hover:bg-[#3ab5b9] text-white"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    <BarChart3 className="w-4 h-4 ml-2" />
                    {language === 'ar' ? 'لوحة الاستخدام' : 'Usage Dashboard'}
                  </Button>
                  <Button 
                    variant="outline" 
                    className={`w-full border-[#47CCD0] text-[#47CCD0] hover:bg-[#47CCD0]/10 ${isDark ? 'border-[#47CCD0]' : ''}`}
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    <Settings className="w-4 h-4 ml-2" />
                    {language === 'ar' ? 'تكوين النماذج' : 'Configure Models'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Card 2 - Google Vision AI */}
            <div className={`p-5 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                      Google Vision AI
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {language === 'ar' ? 'رؤية Google AI' : 'Image & Document AI'}
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  ● {language === 'ar' ? 'نشط' : 'Active'}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'صور معالجة اليوم:' : 'Images Processed Today:'}
                  </span>
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    456
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'مسح Document AI:' : 'Document AI Scans:'}
                  </span>
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    123
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'دقة OCR:' : 'OCR Accuracy:'}
                  </span>
                  <span className="text-sm font-medium text-green-600">97.8%</span>
                </div>

                <div className={`pt-3 pb-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {language === 'ar' ? 'الحصة الشهرية:' : 'Monthly Quota:'}
                    </span>
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                      5,600 / 20,000
                    </span>
                  </div>
                </div>

                <div className={`pt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs`}>
                  <div className="font-medium mb-1">{language === 'ar' ? 'حالات الاستخدام:' : 'Use Cases:'}</div>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">{language === 'ar' ? 'التحقق من الترخيص' : 'License Verify'}</Badge>
                    <Badge variant="outline" className="text-xs">{language === 'ar' ? 'صور العقار' : 'Property Photos'}</Badge>
                    <Badge variant="outline" className="text-xs">{language === 'ar' ? 'وثائق AI' : 'Document AI'}</Badge>
                  </div>
                </div>

                <Button 
                  className="w-full bg-[#47CCD0] hover:bg-[#3ab5b9] text-white mt-4"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  <FileCode className="w-4 h-4 ml-2" />
                  {language === 'ar' ? 'عرض سجل المعالجة' : 'View Processing Log'}
                </Button>
              </div>
            </div>

            {/* Card 3 - Custom ML Models */}
            <div className={`p-5 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-700 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                      Custom ML Models
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {language === 'ar' ? 'نماذج مزادات AI' : 'MZADAT AI'}
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  ● {language === 'ar' ? 'نشط' : 'Active'}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className={`space-y-2 text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <div className="flex justify-between items-center">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                      {language === 'ar' ? 'تنبؤ السعر:' : 'Price Prediction:'}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">v3.2</span>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                        87%
                      </Badge>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                      {language === 'ar' ? 'كشف الاحتيال:' : 'Fraud Detection:'}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">v2.1</span>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                        92%
                      </Badge>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                      {language === 'ar' ? 'تقييم العقار:' : 'Property Valuation:'}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">v1.8</span>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                        89%
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className={`pt-3 pb-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {language === 'ar' ? 'التنبؤات اليوم:' : 'Predictions Today:'}
                    </span>
                    <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                      1,234
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    {language === 'ar' ? 'آخر تحديث:' : 'Last Training:'}
                  </span>
                  <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    2026-03-15
                  </span>
                </div>

                <div className="flex flex-col gap-2 pt-3">
                  <Button 
                    className="w-full bg-[#47CCD0] hover:bg-[#3ab5b9] text-white"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    <BarChart3 className="w-4 h-4 ml-2" />
                    {language === 'ar' ? 'لوحة النماذج' : 'Model Dashboard'}
                  </Button>
                  <Button 
                    variant="outline" 
                    className={`w-full border-[#47CCD0] text-[#47CCD0] hover:bg-[#47CCD0]/10 ${isDark ? 'border-[#47CCD0]' : ''}`}
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    <RefreshCw className="w-4 h-4 ml-2" />
                    {language === 'ar' ? 'إعادة تدريب' : 'Retrain Models'}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Content Moderation & Chatbot */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Card 4 - AI Content Moderation */}
            <div className={`p-5 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                      AI Content Moderation
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {language === 'ar' ? 'مراقبة المحتوى الذكية' : 'Automated Review System'}
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  ● {language === 'ar' ? 'نشط' : 'Active'}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'عناصر مراجعة اليوم:' : 'Items Reviewed Today:'}
                  </span>
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    3,456
                  </span>
                </div>

                <div className={`space-y-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <div className="flex justify-between items-center">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                      {language === 'ar' ? 'موافق تلقائي:' : 'Auto-Approved:'}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">3,200</span>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                        92.6%
                      </Badge>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                      {language === 'ar' ? 'مُعلم للمراجعة:' : 'Flagged for Review:'}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">189</span>
                      <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 text-xs">
                        5.5%
                      </Badge>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                      {language === 'ar' ? 'رفض تلقائي:' : 'Auto-Rejected:'}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">67</span>
                      <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs">
                        1.9%
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className={`pt-3 pb-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {language === 'ar' ? 'معدل الإيجابيات الخاطئة:' : 'False Positive Rate:'}
                    </span>
                    <span className="text-sm font-medium text-green-600">2.1%</span>
                  </div>
                </div>

                <div className={`pt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs`}>
                  <div className="font-medium mb-1">{language === 'ar' ? 'الفئات:' : 'Categories:'}</div>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">{language === 'ar' ? 'الصور' : 'Images'}</Badge>
                    <Badge variant="outline" className="text-xs">{language === 'ar' ? 'النص' : 'Text'}</Badge>
                    <Badge variant="outline" className="text-xs">{language === 'ar' ? 'القوائم' : 'Listings'}</Badge>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-3">
                  <Button 
                    className="w-full bg-[#47CCD0] hover:bg-[#3ab5b9] text-white"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    <Eye className="w-4 h-4 ml-2" />
                    {language === 'ar' ? 'قائمة المراجعة' : 'Review Queue'}
                  </Button>
                  <Button 
                    variant="outline" 
                    className={`w-full border-[#47CCD0] text-[#47CCD0] hover:bg-[#47CCD0]/10 ${isDark ? 'border-[#47CCD0]' : ''}`}
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    <Settings className="w-4 h-4 ml-2" />
                    {language === 'ar' ? 'ضبط الحساسية' : 'Adjust Sensitivity'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Card 5 - AI Chatbot & Support */}
            <div className={`p-5 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-lg flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                      AI Chatbot & Support
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {language === 'ar' ? 'دعم العملاء الذكي' : 'Intelligent Customer Support'}
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  ● {language === 'ar' ? 'نشط' : 'Active'}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'المحادثات اليوم:' : 'Conversations Today:'}
                  </span>
                  <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    567
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'معدل الحل:' : 'Resolution Rate:'}
                  </span>
                  <span className="text-sm font-medium text-green-600">78.5%</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'تصعيد لبشري:' : 'Escalated to Human:'}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>122</span>
                    <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 text-xs">
                      21.5%
                    </Badge>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar' ? 'متوسط وقت الاستجابة:' : 'Avg Response Time:'}
                  </span>
                  <span className="text-sm font-medium text-green-600">1.8s</span>
                </div>

                <div className={`pt-3 pb-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {language === 'ar' ? 'رضا العملاء:' : 'Customer Satisfaction:'}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>4.3</span>
                      <span className="text-xs text-yellow-500">★★★★☆</span>
                    </div>
                  </div>
                </div>

                <div className={`pt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs`}>
                  <div className="font-medium mb-1">{language === 'ar' ? 'اللغات:' : 'Languages:'}</div>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">{language === 'ar' ? 'العربية' : 'Arabic'}</Badge>
                    <Badge variant="outline" className="text-xs">{language === 'ar' ? 'الإنجليزية' : 'English'}</Badge>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-3">
                  <Button 
                    className="w-full bg-[#47CCD0] hover:bg-[#3ab5b9] text-white"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    <Settings className="w-4 h-4 ml-2" />
                    {language === 'ar' ? 'إعدادات الدردشة' : 'Chatbot Settings'}
                  </Button>
                  <Button 
                    variant="outline" 
                    className={`w-full border-[#47CCD0] text-[#47CCD0] hover:bg-[#47CCD0]/10 ${isDark ? 'border-[#47CCD0]' : ''}`}
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    <MessageCircle className="w-4 h-4 ml-2" />
                    {language === 'ar' ? 'عرض المحادثات' : 'View Conversations'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SECTION 6: Essential Platform Integrations */}
      <Card className={`${isDark ? 'bg-[#1F2937] border-gray-700' : 'bg-white'} shadow-md`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className={`text-xl ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                Essential Platform Integrations
              </CardTitle>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                {language === 'ar' ? 'التكاملات الأساسية للمنصة - REGA، نفاذ، أبشر، والخدمات الأساسية' : 'REGA, Nafath, Absher, Maps, Storage & Search Integrations'}
              </p>
            </div>
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
              <Plug className="w-3 h-3 ml-1" />
              {language === 'ar' ? '6 خدمات' : '6 Services'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Grid: 3 cards per row, 2 rows */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Card 1 - REGA Integration */}
            <div className={`p-4 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                      REGA
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {language === 'ar' ? 'هيئة العقار' : 'Real Estate Authority'}
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                  ● {language === 'ar' ? 'متصل' : 'Connected'}
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    {language === 'ar' ? 'المزامنة:' : 'Sync:'}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {language === 'ar' ? 'كل 5 دقائق' : 'Every 5 min'}
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    {language === 'ar' ? 'تم التحقق اليوم:' : 'Verified Today:'}
                  </span>
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    247
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    {language === 'ar' ? 'وقت التشغيل:' : 'Uptime:'}
                  </span>
                  <span className="font-medium text-green-600">99.8%</span>
                </div>
              </div>
            </div>

            {/* Card 2 - Nafath (نفاذ) */}
            <div className={`p-4 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                    <Fingerprint className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                      Nafath
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {language === 'ar' ? 'نفاذ - الدخول الوطني' : 'National SSO'}
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                  ● {language === 'ar' ? 'متصل' : 'Connected'}
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    {language === 'ar' ? 'المصادقات اليوم:' : 'Authentications Today:'}
                  </span>
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    1,890
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    {language === 'ar' ? 'معدل النجاح:' : 'Success Rate:'}
                  </span>
                  <span className="font-medium text-green-600">99.5%</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    {language === 'ar' ? 'متوسط الوقت:' : 'Avg Auth Time:'}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    12s
                  </Badge>
                </div>
              </div>
            </div>

            {/* Card 3 - Absher Integration */}
            <div className={`p-4 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
                    <IdCard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                      Absher
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {language === 'ar' ? 'أبشر - التحقق' : 'ID Verification'}
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                  ● {language === 'ar' ? 'متصل' : 'Connected'}
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    {language === 'ar' ? 'التحققات اليوم:' : 'ID Verifications:'}
                  </span>
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    456
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    {language === 'ar' ? 'معدل النجاح:' : 'Success Rate:'}
                  </span>
                  <span className="font-medium text-green-600">98.9%</span>
                </div>
              </div>
            </div>

            {/* Card 4 - Google Maps & Geolocation */}
            <div className={`p-4 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                      Google Maps
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {language === 'ar' ? 'الخرائط والموقع' : 'Geolocation'}
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                  ● {language === 'ar' ? 'متصل' : 'Connected'}
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    {language === 'ar' ? 'استدعاءات API:' : 'API Calls Today:'}
                  </span>
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    12,340
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    {language === 'ar' ? 'طلبات Geocoding:' : 'Geocoding Requests:'}
                  </span>
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    3,400
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    {language === 'ar' ? 'الحصة الشهرية:' : 'Monthly Quota:'}
                  </span>
                  <Badge className="bg-[#47CCD0]/10 text-[#47CCD0] hover:bg-[#47CCD0]/10 text-xs">
                    45%
                  </Badge>
                </div>
              </div>
            </div>

            {/* Card 5 - Cloud Storage */}
            <div className={`p-4 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-lg flex items-center justify-center">
                    <Cloud className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                      Cloud Storage
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {language === 'ar' ? 'التخزين السحابي' : 'AWS S3 / GCS'}
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                  ● {language === 'ar' ? 'متصل' : 'Connected'}
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    {language === 'ar' ? 'المساحة المستخدمة:' : 'Storage Used:'}
                  </span>
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    2.4 TB / 5 TB
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    {language === 'ar' ? 'ملفات محملة اليوم:' : 'Files Uploaded Today:'}
                  </span>
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    1,234
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    {language === 'ar' ? 'عرض CDN:' : 'CDN Bandwidth:'}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    890 GB
                  </Badge>
                </div>
              </div>
            </div>

            {/* Card 6 - Elasticsearch */}
            <div className={`p-4 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-lg flex items-center justify-center">
                    <Search className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                      Elasticsearch
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {language === 'ar' ? 'محرك البحث' : 'Search Engine'}
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                  ● {language === 'ar' ? 'متصل' : 'Connected'}
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    {language === 'ar' ? 'حجم الفهرس:' : 'Index Size:'}
                  </span>
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    2.1M docs
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    {language === 'ar' ? 'متوسط البحث:' : 'Avg Search Time:'}
                  </span>
                  <span className="font-medium text-green-600">23ms</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    {language === 'ar' ? 'الاستعلامات اليوم:' : 'Queries Today:'}
                  </span>
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    34,567
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Status */}
      <Card className={`${isDark ? 'bg-[#1F2937] border-gray-700' : 'bg-white'} shadow-md`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className={`text-xl ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                External API Integrations
              </CardTitle>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                {language === 'ar' ? 'حالة التكاملات الخارجية (REGA، Infath، سداد)' : 'Third-party Integration Status'}
              </p>
            </div>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
              ● {language === 'ar' ? 'جميع الأنظمة تعمل' : 'All Systems Operational'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {integrationStatus.map((integration, index) => (
              <div 
                key={index}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${integration.color}20` }}
                  >
                    <integration.icon className="w-6 h-6" style={{ color: integration.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                        {language === 'ar' ? integration.nameAr : integration.nameEn}
                      </h4>
                      <Badge 
                        className={
                          integration.status === 'Connected' 
                            ? 'bg-green-100 text-green-700 hover:bg-green-100'
                            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                        }
                      >
                        ● {language === 'ar' ? integration.statusAr : integration.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                        {language === 'ar' ? 'وقت التشغيل:' : 'Uptime:'} <span className="font-medium text-green-600">{integration.uptime}</span>
                      </span>
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                        {language === 'ar' ? 'آخر مزامنة:' : 'Last Sync:'} {integration.lastSync}
                      </span>
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                        {integration.apiVersion}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={isDark ? 'border-gray-600 hover:bg-gray-700' : ''}
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={isDark ? 'border-gray-600 hover:bg-gray-700' : ''}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SSL Certificate Status */}
      <Card className={`${isDark ? 'bg-[#1F2937] border-gray-700' : 'bg-white'} shadow-md`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className={`text-xl ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                SSL Certificate Status
              </CardTitle>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                {language === 'ar' ? 'حالة شهادة الأمان وتشفير الاتصالات' : 'Security certificate and connection encryption status'}
              </p>
            </div>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 px-3 py-1 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              {language === 'ar' ? 'شهادة صالحة' : 'Valid Certificate'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className={`p-5 rounded-xl border ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              
              {/* Shield Icon Block */}
              <div className="flex flex-col items-center justify-center min-w-[120px]">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'}`}>
                  <Shield className="w-8 h-8" />
                </div>
                <span className={`text-sm font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                  TLS 1.3
                </span>
                <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-0.5`}>
                  AES-256-GCM
                </span>
              </div>

              {/* Certificate Details */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                <div className="flex flex-col gap-1.5">
                  <span className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {language === 'ar' ? 'النطاق (Domain)' : 'Domain Name'}
                  </span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    mzadat.com.sa
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {language === 'ar' ? 'المُصدر (Issuer)' : 'Issuer'}
                  </span>
                  <span className={`font-semibold flex items-center gap-2 ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    GlobalSign nv-sa
                    <Check className="w-4 h-4 text-blue-500" />
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {language === 'ar' ? 'تاريخ الإصدار' : 'Valid From'}
                  </span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    01 Jan 2026
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {language === 'ar' ? 'تاريخ الانتهاء' : 'Valid Until'}
                  </span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                    01 Jan 2027
                  </span>
                </div>
              </div>

              {/* Remaining Days & Action */}
              <div className={`flex flex-col items-center justify-center p-4 rounded-lg min-w-[140px] ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                <span className={`text-3xl font-bold ${isDark ? 'text-[#47CCD0]' : 'text-[#47CCD0]'}`}>
                  268
                </span>
                <span className={`text-xs font-medium mt-1 mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {language === 'ar' ? 'يوماً متبقياً' : 'Days Remaining'}
                </span>
                <Button 
                  size="sm"
                  variant="outline" 
                  className={`w-full text-xs h-8 ${isDark ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'}`}
                >
                  {language === 'ar' ? 'تجديد الشهادة' : 'Renew Cert'}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Keys Management */}
      <Card className={`${isDark ? 'bg-[#1F2937] border-gray-700' : 'bg-white'} shadow-md`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className={`text-xl ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                API Keys Management
              </CardTitle>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                {language === 'ar' ? 'إدارة مفاتيح API وصلاحيات الوصول' : 'Manage API keys and access permissions'}
              </p>
            </div>
            <Button className="bg-[#47CCD0] hover:bg-[#3ab5b9] text-white">
              <Key className="w-4 h-4 ml-2" />
              {language === 'ar' ? 'إنشاء مفتاح جديد' : 'Create New Key'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className={isDark ? 'border-gray-700' : ''}>
                  <TableHead className={isDark ? 'text-gray-300' : ''} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                    {language === 'ar' ? 'الاسم' : 'Name'}
                  </TableHead>
                  <TableHead className={isDark ? 'text-gray-300' : ''} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                    {language === 'ar' ? 'المفتاح' : 'API Key'}
                  </TableHead>
                  <TableHead className={isDark ? 'text-gray-300' : ''} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                    {language === 'ar' ? 'الطلبات' : 'Calls'}
                  </TableHead>
                  <TableHead className={isDark ? 'text-gray-300' : ''} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                    {language === 'ar' ? 'آخر استخدام' : 'Last Used'}
                  </TableHead>
                  <TableHead className={isDark ? 'text-gray-300' : ''} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                    {language === 'ar' ? 'الحالة' : 'Status'}
                  </TableHead>
                  <TableHead className={isDark ? 'text-gray-300' : ''} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                    {language === 'ar' ? 'الإجراءات' : 'Actions'}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeys.map((key, index) => (
                  <TableRow key={index} className={isDark ? 'border-gray-700' : ''}>
                    <TableCell className={isDark ? 'text-gray-300' : ''}>
                      <div>
                        <div className="font-medium">{language === 'ar' ? key.nameAr : key.name}</div>
                        <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          {language === 'ar' ? 'تم الإنشاء:' : 'Created:'} {key.created}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                          {key.keyId}
                        </code>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className={isDark ? 'text-gray-300' : ''}>
                      <span className="font-medium">{key.calls}</span>
                    </TableCell>
                    <TableCell className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {key.lastUsed}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          key.status === 'active' 
                            ? 'bg-green-100 text-green-700 hover:bg-green-100'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-100'
                        }
                      >
                        {language === 'ar' ? (key.status === 'active' ? 'نشط' : 'متوقف') : key.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Webhooks Configuration & Recent API Calls - Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Webhooks */}
        <Card className={`${isDark ? 'bg-[#1F2937] border-gray-700' : 'bg-white'} shadow-md`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className={`text-lg ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                  Webhooks
                </CardTitle>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                  {language === 'ar' ? 'إدارة Webhooks والأحداث' : 'Event notifications'}
                </p>
              </div>
              <Button size="sm" className="bg-[#47CCD0] hover:bg-[#3ab5b9] text-white">
                <Webhook className="w-4 h-4 ml-1" />
                {language === 'ar' ? 'إضافة' : 'Add'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {webhooks.map((webhook, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h5 className={`font-medium ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                        {language === 'ar' ? webhook.nameAr : webhook.nameEn}
                      </h5>
                      <code className={`text-xs mt-1 block ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {webhook.url}
                      </code>
                    </div>
                    <Badge 
                      className={
                        webhook.status === 'active' 
                          ? 'bg-green-100 text-green-700 hover:bg-green-100'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-100'
                      }
                    >
                      {webhook.status === 'active' ? (
                        <Play className="w-3 h-3 mr-1" />
                      ) : (
                        <Pause className="w-3 h-3 mr-1" />
                      )}
                      {language === 'ar' ? (webhook.status === 'active' ? 'نشط' : 'متوقف') : webhook.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                      {language === 'ar' ? 'معدل النجاح:' : 'Success Rate:'} <span className="text-green-600 font-medium">{webhook.successRate}</span>
                    </span>
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                      {language === 'ar' ? 'آخر تشغيل:' : 'Last:'} {webhook.lastTriggered}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* SDK Downloads */}
        <Card className={`${isDark ? 'bg-[#1F2937] border-gray-700' : 'bg-white'} shadow-md`}>
          <CardHeader>
            <div>
              <CardTitle className={`text-lg ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                SDK & Libraries
              </CardTitle>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                {language === 'ar' ? 'تحميل مكتبات التطوير' : 'Official SDK downloads'}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sdkDownloads.map((sdk, index) => (
                <div 
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{sdk.icon}</div>
                    <div>
                      <h5 className={`font-medium ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                        {sdk.platform}
                      </h5>
                      <div className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {sdk.version} • {sdk.downloads} {language === 'ar' ? 'تحميل' : 'downloads'}
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className={isDark ? 'border-gray-600' : ''}>
                    <Download className="w-4 h-4 ml-1" />
                    {language === 'ar' ? 'تحميل' : 'Download'}
                  </Button>
                </div>
              ))}
            </div>

            <div className={`mt-6 p-4 rounded-lg border-2 border-dashed ${isDark ? 'border-gray-700' : 'border-gray-300'}`}>
              <div className="text-center">
                <FileCode className={`w-8 h-8 mx-auto mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                <h5 className={`font-medium mb-1 ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                  {language === 'ar' ? 'توثيق API الكامل' : 'Full API Documentation'}
                </h5>
                <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {language === 'ar' ? 'دليل شامل لجميع endpoints والأمثلة' : 'Complete guides and examples'}
                </p>
                <Button className="bg-[#47CCD0] hover:bg-[#3ab5b9] text-white">
                  <Link2 className="w-4 h-4 ml-2" />
                  {language === 'ar' ? 'افتح التوثيق' : 'Open Docs'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent API Calls Log */}
      <Card className={`${isDark ? 'bg-[#1F2937] border-gray-700' : 'bg-white'} shadow-md`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className={`text-xl ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                Recent API Calls Log
              </CardTitle>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                {language === 'ar' ? 'سجل آخر الطلبات لـ API (آخر 24 ساعة)' : 'Last 24 hours activity'}
              </p>
            </div>
            <Button variant="outline" className={isDark ? 'border-gray-600' : ''}>
              <RefreshCw className="w-4 h-4 ml-2" />
              {language === 'ar' ? 'تحديث' : 'Refresh'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className={isDark ? 'border-gray-700' : ''}>
                  <TableHead className={isDark ? 'text-gray-300' : ''} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                    {language === 'ar' ? 'الوقت' : 'Timestamp'}
                  </TableHead>
                  <TableHead className={isDark ? 'text-gray-300' : ''} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                    {language === 'ar' ? 'Endpoint' : 'Endpoint'}
                  </TableHead>
                  <TableHead className={isDark ? 'text-gray-300' : ''} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                    {language === 'ar' ? 'Method' : 'Method'}
                  </TableHead>
                  <TableHead className={isDark ? 'text-gray-300' : ''} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                    {language === 'ar' ? 'الحالة' : 'Status'}
                  </TableHead>
                  <TableHead className={isDark ? 'text-gray-300' : ''} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                    {language === 'ar' ? 'زمن الاستجابة' : 'Response Time'}
                  </TableHead>
                  <TableHead className={isDark ? 'text-gray-300' : ''} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                    {language === 'ar' ? 'المفتاح' : 'API Key'}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentApiCalls.map((call, index) => (
                  <TableRow key={index} className={isDark ? 'border-gray-700' : ''}>
                    <TableCell className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <Clock className="w-3 h-3 inline mr-1" />
                      {call.timestamp}
                    </TableCell>
                    <TableCell>
                      <code className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {call.endpoint}
                      </code>
                      {call.error && (
                        <div className="text-xs text-red-500 mt-1">{call.error}</div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          call.method === 'GET' 
                            ? 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                            : 'bg-[#47CCD0]/10 text-[#47CCD0] hover:bg-[#47CCD0]/10'
                        }
                      >
                        {call.method}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          call.status >= 200 && call.status < 300
                            ? 'bg-green-100 text-green-700 hover:bg-green-100'
                            : 'bg-red-100 text-red-700 hover:bg-red-100'
                        }
                      >
                        {call.status}
                      </Badge>
                    </TableCell>
                    <TableCell className={isDark ? 'text-gray-300' : ''}>
                      <span className={
                        parseInt(call.responseTime) < 200 
                          ? 'text-green-600 font-medium' 
                          : parseInt(call.responseTime) < 1000 
                            ? 'text-yellow-600 font-medium'
                            : 'text-red-600 font-medium'
                      }>
                        {call.responseTime}
                      </span>
                    </TableCell>
                    <TableCell>
                      <code className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {call.apiKey}
                      </code>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* SECTION 7: API Keys & Webhook Management */}
      <Card className={`${isDark ? 'bg-[#1F2937] border-gray-700' : 'bg-white'} shadow-md`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className={`text-xl ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                API Keys & Webhook Management
              </CardTitle>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                {language === 'ar' ? 'إدارة مفاتيح API والويب هوكس - التحكم الكامل في الوصول' : 'Manage API Keys, Webhooks & Access Control'}
              </p>
            </div>
            <Badge className="bg-[#47CCD0]/10 text-[#47CCD0] hover:bg-[#47CCD0]/10">
              <Key className="w-3 h-3 ml-1" />
              {language === 'ar' ? 'إدارة متقدمة' : 'Advanced Management'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Panel - API Keys Table */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                  {language === 'ar' ? 'مفاتيح API' : 'API Keys'}
                </h4>
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-xs">
                  {language === 'ar' ? '6 نشط' : '6 Active'}
                </Badge>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className={isDark ? 'border-gray-700' : ''}>
                      <TableHead className={isDark ? 'text-gray-300' : ''} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                        {language === 'ar' ? 'الخدمة' : 'Service'}
                      </TableHead>
                      <TableHead className={isDark ? 'text-gray-300' : ''} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                        {language === 'ar' ? 'المفتاح' : 'Key'}
                      </TableHead>
                      <TableHead className={isDark ? 'text-gray-300' : ''} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                        {language === 'ar' ? 'الحالة' : 'Status'}
                      </TableHead>
                      <TableHead className={isDark ? 'text-gray-300' : ''} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                        {language === 'ar' ? 'الإجراءات' : 'Actions'}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className={isDark ? 'border-gray-700' : ''}>
                      <TableCell className={isDark ? 'text-gray-300' : ''}>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium">SendGrid</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          sk_live_****wxyz
                        </code>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                          ● {language === 'ar' ? 'نشط' : 'Active'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <RotateCw className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-500 hover:text-red-600">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>

                    <TableRow className={isDark ? 'border-gray-700' : ''}>
                      <TableCell className={isDark ? 'text-gray-300' : ''}>
                        <div className="flex items-center gap-2">
                          <Brain className="w-4 h-4 text-purple-500" />
                          <span className="text-sm font-medium">OpenAI</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          sk-proj-****abcd
                        </code>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                          ● {language === 'ar' ? 'نشط' : 'Active'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <RotateCw className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-500 hover:text-red-600">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>

                    <TableRow className={isDark ? 'border-gray-700' : ''}>
                      <TableCell className={isDark ? 'text-gray-300' : ''}>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-red-500" />
                          <span className="text-sm font-medium">Google Maps</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          AIza****1234
                        </code>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                          ● {language === 'ar' ? 'نشط' : 'Active'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <RotateCw className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-500 hover:text-red-600">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>

                    <TableRow className={isDark ? 'border-gray-700' : ''}>
                      <TableCell className={isDark ? 'text-gray-300' : ''}>
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium">Sadad</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          sdpay_****5678
                        </code>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                          ● {language === 'ar' ? 'نشط' : 'Active'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <RotateCw className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-500 hover:text-red-600">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>

                    <TableRow className={isDark ? 'border-gray-700' : ''}>
                      <TableCell className={isDark ? 'text-gray-300' : ''}>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium">REGA</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          rega_****9012
                        </code>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                          ● {language === 'ar' ? 'نشط' : 'Active'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <RotateCw className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-500 hover:text-red-600">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>

                    <TableRow className={isDark ? 'border-gray-700' : ''}>
                      <TableCell className={isDark ? 'text-gray-300' : ''}>
                        <div className="flex items-center gap-2">
                          <Cloud className="w-4 h-4 text-cyan-500" />
                          <span className="text-sm font-medium">AWS S3</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          AKIA****WXYZ
                        </code>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 text-xs">
                          {language === 'ar' ? 'ينتهي قريباً' : 'Expiring Soon'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <RotateCw className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-500 hover:text-red-600">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <Button className="w-full mt-4 bg-[#47CCD0] hover:bg-[#3ab5b9] text-white" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                <Plus className="w-4 h-4 ml-2" />
                {language === 'ar' ? 'إنشاء مفتاح API جديد' : 'Generate New API Key'}
              </Button>
            </div>

            {/* Right Panel - Webhooks */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                  {language === 'ar' ? 'ويب هوكس' : 'Webhooks'}
                </h4>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                  {language === 'ar' ? '5 نشط' : '5 Active'}
                </Badge>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className={isDark ? 'border-gray-700' : ''}>
                      <TableHead className={isDark ? 'text-gray-300' : ''} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                        {language === 'ar' ? 'Endpoint' : 'Endpoint'}
                      </TableHead>
                      <TableHead className={isDark ? 'text-gray-300' : ''} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                        {language === 'ar' ? 'الأحداث' : 'Events'}
                      </TableHead>
                      <TableHead className={isDark ? 'text-gray-300' : ''} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                        {language === 'ar' ? 'الحالة' : 'Status'}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className={isDark ? 'border-gray-700' : ''}>
                      <TableCell>
                        <div>
                          <code className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            /webhooks/auction-ended
                          </code>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {language === 'ar' ? 'آخر تشغيل: 2 د' : 'Last: 2m ago'}
                            </Badge>
                            <span className="text-xs text-green-600">99.8%</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          auction.ended
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                          ● {language === 'ar' ? 'نشط' : 'Active'}
                        </Badge>
                      </TableCell>
                    </TableRow>

                    <TableRow className={isDark ? 'border-gray-700' : ''}>
                      <TableCell>
                        <div>
                          <code className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            /webhooks/payment-success
                          </code>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {language === 'ar' ? 'آخر تشغيل: 5 د' : 'Last: 5m ago'}
                            </Badge>
                            <span className="text-xs text-green-600">100%</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          payment.*
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                          ● {language === 'ar' ? 'نشط' : 'Active'}
                        </Badge>
                      </TableCell>
                    </TableRow>

                    <TableRow className={isDark ? 'border-gray-700' : ''}>
                      <TableCell>
                        <div>
                          <code className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            /webhooks/user-registered
                          </code>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {language === 'ar' ? 'آخر تشغيل: 12 د' : 'Last: 12m ago'}
                            </Badge>
                            <span className="text-xs text-green-600">98.5%</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          user.created
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                          ● {language === 'ar' ? 'نشط' : 'Active'}
                        </Badge>
                      </TableCell>
                    </TableRow>

                    <TableRow className={isDark ? 'border-gray-700' : ''}>
                      <TableCell>
                        <div>
                          <code className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            /webhooks/bid-placed
                          </code>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {language === 'ar' ? 'آخر تشغيل: 1 د' : 'Last: 1m ago'}
                            </Badge>
                            <span className="text-xs text-green-600">99.2%</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          bid.*
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                          ● {language === 'ar' ? 'نشط' : 'Active'}
                        </Badge>
                      </TableCell>
                    </TableRow>

                    <TableRow className={isDark ? 'border-gray-700' : ''}>
                      <TableCell>
                        <div>
                          <code className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            /webhooks/verification-needed
                          </code>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {language === 'ar' ? 'آخر تشغيل: 45 د' : 'Last: 45m ago'}
                            </Badge>
                            <span className="text-xs text-yellow-600">92.3%</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          verification.*
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 text-xs">
                          {language === 'ar' ? 'متوقف مؤقتاً' : 'Paused'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <Button className="w-full mt-4 bg-[#47CCD0] hover:bg-[#3ab5b9] text-white" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                <Plus className="w-4 h-4 ml-2" />
                {language === 'ar' ? 'إضافة Webhook جديد' : 'Add Webhook'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SECTION 8: System Logs & Activity */}
      <Card className={`${isDark ? 'bg-[#1F2937] border-gray-700' : 'bg-white'} shadow-md`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className={`text-xl ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                Integration Activity Log
              </CardTitle>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                {language === 'ar' ? 'سجل نشاط التكاملات - مراقبة فورية لجميع العمليات' : 'Real-time monitoring of all integration activities'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className={isDark ? 'border-gray-600' : ''}>
                  <Filter className="w-4 h-4 ml-1" />
                  {language === 'ar' ? 'تصفية' : 'Filter'}
                </Button>
                <Button variant="outline" size="sm" className={isDark ? 'border-gray-600' : ''}>
                  <Calendar className="w-4 h-4 ml-1" />
                  {language === 'ar' ? 'التاريخ' : 'Date'}
                </Button>
              </div>
              <Button size="sm" className="bg-[#47CCD0] hover:bg-[#3ab5b9] text-white">
                <Download className="w-4 h-4 ml-1" />
                {language === 'ar' ? 'تصدير' : 'Export'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {/* Log Entry 1 */}
            <div className={`flex items-center gap-4 p-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center gap-3 flex-1">
                <Clock className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  2026-03-18 14:32:15
                </span>
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-700 rounded flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                      Sadad Payment Gateway
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {language === 'ar' ? 'معاملة دفع' : 'Payment Transaction'}
                    </Badge>
                  </div>
                  <code className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    POST /api/payments/process
                  </code>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                <CheckCircle className="w-3 h-3 ml-1" />
                {language === 'ar' ? 'نجح' : 'Success'}
              </Badge>
              <span className="text-xs font-medium text-green-600">156ms</span>
            </div>

            {/* Log Entry 2 */}
            <div className={`flex items-center gap-4 p-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center gap-3 flex-1">
                <Clock className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  2026-03-18 14:31:48
                </span>
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                      OpenAI GPT-4o
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {language === 'ar' ? 'توليد وصف' : 'Property Description'}
                    </Badge>
                  </div>
                  <code className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    POST /api/ai/generate-description
                  </code>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                <CheckCircle className="w-3 h-3 ml-1" />
                {language === 'ar' ? 'نجح' : 'Success'}
              </Badge>
              <span className="text-xs font-medium text-green-600">1.2s</span>
            </div>

            {/* Log Entry 3 */}
            <div className={`flex items-center gap-4 p-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center gap-3 flex-1">
                <Clock className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  2026-03-18 14:31:22
                </span>
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                      SendGrid Email Service
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {language === 'ar' ? 'إشعار بريد' : 'Email Notification'}
                    </Badge>
                  </div>
                  <code className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    POST /api/email/send-notification
                  </code>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                <CheckCircle className="w-3 h-3 ml-1" />
                {language === 'ar' ? 'نجح' : 'Success'}
              </Badge>
              <span className="text-xs font-medium text-green-600">234ms</span>
            </div>

            {/* Log Entry 4 - Failed */}
            <div className={`flex items-center gap-4 p-3 rounded-lg border ${isDark ? 'bg-red-900/10 border-red-900/20' : 'bg-red-50 border-red-200'}`}>
              <div className="flex items-center gap-3 flex-1">
                <Clock className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  2026-03-18 14:30:55
                </span>
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                      Google Maps API
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {language === 'ar' ? 'تحديد الموقع' : 'Geocoding'}
                    </Badge>
                  </div>
                  <code className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    GET /api/geocode/address
                  </code>
                </div>
              </div>
              <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                <XCircle className="w-3 h-3 ml-1" />
                {language === 'ar' ? 'فشل' : 'Failed'}
              </Badge>
              <span className="text-xs font-medium text-red-600">Timeout</span>
            </div>

            {/* Log Entry 5 */}
            <div className={`flex items-center gap-4 p-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center gap-3 flex-1">
                <Clock className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  2026-03-18 14:30:12
                </span>
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-700 rounded flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                      REGA Integration
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {language === 'ar' ? 'مزامنة بيانات' : 'Data Sync'}
                    </Badge>
                  </div>
                  <code className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    POST /api/rega/sync-properties
                  </code>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                <CheckCircle className="w-3 h-3 ml-1" />
                {language === 'ar' ? 'نجح' : 'Success'}
              </Badge>
              <span className="text-xs font-medium text-green-600">2.4s</span>
            </div>

            {/* Log Entry 6 */}
            <div className={`flex items-center gap-4 p-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center gap-3 flex-1">
                <Clock className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  2026-03-18 14:29:45
                </span>
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded flex items-center justify-center">
                  <Fingerprint className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                      Nafath Authentication
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {language === 'ar' ? 'تسجيل دخول' : 'User Login'}
                    </Badge>
                  </div>
                  <code className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    POST /api/auth/nafath/verify
                  </code>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                <CheckCircle className="w-3 h-3 ml-1" />
                {language === 'ar' ? 'نجح' : 'Success'}
              </Badge>
              <span className="text-xs font-medium text-green-600">12.3s</span>
            </div>

            {/* Log Entry 7 */}
            <div className={`flex items-center gap-4 p-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center gap-3 flex-1">
                <Clock className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  2026-03-18 14:28:33
                </span>
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded flex items-center justify-center">
                  <Search className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                      Elasticsearch
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {language === 'ar' ? 'بحث' : 'Search Query'}
                    </Badge>
                  </div>
                  <code className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    POST /api/search/properties
                  </code>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                <CheckCircle className="w-3 h-3 ml-1" />
                {language === 'ar' ? 'نجح' : 'Success'}
              </Badge>
              <span className="text-xs font-medium text-green-600">23ms</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t" style={{ borderColor: isDark ? '#374151' : '#E5E7EB' }}>
            <Button variant="outline" size="sm" className={isDark ? 'border-gray-600' : ''}>
              <RefreshCw className="w-4 h-4 ml-2" />
              {language === 'ar' ? 'تحديث تلقائي' : 'Auto Refresh'}
            </Button>
            <Button variant="outline" size="sm" className={isDark ? 'border-gray-600' : ''}>
              <ExternalLink className="w-4 h-4 ml-2" />
              {language === 'ar' ? 'عرض السجل الكامل' : 'View Full Log'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Rate Limits & Security Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={`${isDark ? 'bg-[#1F2937] border-gray-700' : 'bg-white'} shadow-md`}>
          <CardHeader>
            <CardTitle className={`text-lg ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
              Rate Limits & Quotas
            </CardTitle>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
              {language === 'ar' ? 'حدود الاستخدام والحصص المتاحة' : 'Current usage and limits'}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'ar' ? 'الطلبات الساعية' : 'Hourly Requests'}
                </span>
                <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                  7,234 / 10,000
                </span>
              </div>
              <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div className="h-full bg-[#47CCD0] rounded-full" style={{ width: '72.34%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'ar' ? 'الطلبات اليومية' : 'Daily Requests'}
                </span>
                <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                  34,789 / 100,000
                </span>
              </div>
              <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div className="h-full bg-[#47CCD0] rounded-full" style={{ width: '34.789%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'ar' ? 'مساحة التخزين' : 'Storage Used'}
                </span>
                <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                  142 GB / 500 GB
                </span>
              </div>
              <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div className="h-full bg-[#2B3D50] rounded-full" style={{ width: '28.4%' }}></div>
              </div>
            </div>

            <div className={`mt-6 p-4 rounded-lg ${isDark ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h5 className={`font-medium mb-1 ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                    {language === 'ar' ? 'ترقية الحساب' : 'Upgrade Plan'}
                  </h5>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {language === 'ar' 
                      ? 'احصل على حدود أعلى وميزات متقدمة مع الخطة الاحترافية' 
                      : 'Get higher limits and advanced features'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`${isDark ? 'bg-[#1F2937] border-gray-700' : 'bg-white'} shadow-md`}>
          <CardHeader>
            <CardTitle className={`text-lg ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
              Security & Best Practices
            </CardTitle>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
              {language === 'ar' ? 'إرشادات الأمان وأفضل الممارسات' : 'Security recommendations'}
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className={`flex items-start gap-3 p-3 rounded-lg ${isDark ? 'bg-green-900/20' : 'bg-green-50'}`}>
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
              <div>
                <h5 className={`font-medium text-sm mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {language === 'ar' ? 'المصادقة الثنائية نشطة' : 'Two-Factor Authentication Active'}
                </h5>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {language === 'ar' ? 'حسابك محمي بالمصادقة الثنائية' : 'Your account is protected'}
                </p>
              </div>
            </div>

            <div className={`flex items-start gap-3 p-3 rounded-lg ${isDark ? 'bg-green-900/20' : 'bg-green-50'}`}>
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
              <div>
                <h5 className={`font-medium text-sm mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {language === 'ar' ? 'تشفير SSL/TLS نشط' : 'SSL/TLS Encryption Active'}
                </h5>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {language === 'ar' ? 'جميع الاتصالات مشفرة' : 'All connections are encrypted'}
                </p>
              </div>
            </div>

            <div className={`flex items-start gap-3 p-3 rounded-lg ${isDark ? 'bg-yellow-900/20' : 'bg-yellow-50'}`}>
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
              <div>
                <h5 className={`font-medium text-sm mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {language === 'ar' ? 'تدوير المفاتيح الموصى به' : 'Key Rotation Recommended'}
                </h5>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {language === 'ar' 
                    ? 'آخر مفتاح تم استخدامه منذ 4 أشهر. يفضل التجديد كل 90 يوم' 
                    : 'Rotate keys every 90 days'}
                </p>
              </div>
            </div>

            <div className={`flex items-start gap-3 p-3 rounded-lg ${isDark ? 'bg-green-900/20' : 'bg-green-50'}`}>
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
              <div>
                <h5 className={`font-medium text-sm mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {language === 'ar' ? 'IP Whitelist مفعل' : 'IP Whitelist Enabled'}
                </h5>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {language === 'ar' ? '3 عناوين IP مسموح بها' : '3 IP addresses whitelisted'}
                </p>
              </div>
            </div>

            <div className={`mt-4 p-4 rounded-lg border-2 ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
              <Lock className={`w-6 h-6 mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <h5 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-[#2B3D50]'}`} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                {language === 'ar' ? 'إعدادات الأمان المتقدمة' : 'Advanced Security Settings'}
              </h5>
              <Button 
                size="sm" 
                variant="outline"
                className={`w-full ${isDark ? 'border-gray-600' : ''}`}
              >
                <Shield className="w-4 h-4 ml-2" />
                {language === 'ar' ? 'إدارة الأمان' : 'Manage Security'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}