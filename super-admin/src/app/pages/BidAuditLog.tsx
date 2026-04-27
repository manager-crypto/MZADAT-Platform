import { useState } from "react";
import { 
  Gavel,
  Download,
  Filter,
  Search,
  Shield,
  Calendar,
  FileText,
  CheckCircle,
  AlertTriangle,
  Monitor,
  MapPin,
  Clock,
  User
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "../context/TranslationContext";

// Bid Audit Log Data - MANDATORY per Entad requirements
const bidLogs = [
  {
    id: "BID-2026-001847",
    timestamp: "2026-03-18 14:23:45",
    auctionId: "AUC-2026-00549",
    auctionName: "فيلا فاخرة - حي الياسمين",
    bidderIdMasked: "****5892",
    bidderName: "أحمد م. العتيبي",
    amount: 1520000,
    ipAddress: "156.218.45.***",
    device: "Mobile - iOS 17.3",
    deviceFingerprint: "4f9a2b...",
    verificationStatus: "Verified",
    bidIncrement: 20000,
    timestamp2: "14:23:45.234"
  },
  {
    id: "BID-2026-001846",
    timestamp: "2026-03-18 14:22:18",
    auctionId: "AUC-2026-00549",
    auctionName: "فيلا فاخرة - حي الياسمين",
    bidderIdMasked: "****3421",
    bidderName: "محمد ع. السديري",
    amount: 1500000,
    ipAddress: "156.218.78.***",
    device: "Desktop - Chrome 121",
    deviceFingerprint: "7c3d8e...",
    verificationStatus: "Verified",
    bidIncrement: 30000,
    timestamp2: "14:22:18.891"
  },
  {
    id: "BID-2026-001845",
    timestamp: "2026-03-18 14:20:55",
    auctionId: "AUC-2026-00547",
    auctionName: "أرض تجارية - الكورنيش الشمالي",
    bidderIdMasked: "****6789",
    bidderName: "شركة الخليج العقارية",
    amount: 2650000,
    ipAddress: "156.218.90.***",
    device: "Desktop - Safari 17",
    deviceFingerprint: "9e1f5a...",
    verificationStatus: "Verified",
    bidIncrement: 50000,
    timestamp2: "14:20:55.567"
  },
  {
    id: "BID-2026-001844",
    timestamp: "2026-03-18 14:18:32",
    auctionId: "AUC-2026-00548",
    auctionName: "مجمع سكني - حي المرجان",
    bidderIdMasked: "****4521",
    bidderName: "خالد أ. الحربي",
    amount: 3450000,
    ipAddress: "156.218.12.***",
    device: "Mobile - Android 14",
    deviceFingerprint: "2a7b9c...",
    verificationStatus: "Flagged",
    bidIncrement: 100000,
    timestamp2: "14:18:32.123"
  },
  {
    id: "BID-2026-001843",
    timestamp: "2026-03-18 14:15:07",
    auctionId: "AUC-2026-00549",
    auctionName: "فيلا فاخرة - حي الياسمين",
    bidderIdMasked: "****5892",
    bidderName: "أحمد م. العتيبي",
    amount: 1470000,
    ipAddress: "156.218.45.***",
    device: "Mobile - iOS 17.3",
    deviceFingerprint: "4f9a2b...",
    verificationStatus: "Verified",
    bidIncrement: 20000,
    timestamp2: "14:15:07.789"
  },
  {
    id: "BID-2026-001842",
    timestamp: "2026-03-18 14:12:45",
    auctionId: "AUC-2026-00547",
    auctionName: "أرض تجارية - الكورنيش الشمالي",
    bidderIdMasked: "****2341",
    bidderName: "فاطمة ع. السديري",
    amount: 2600000,
    ipAddress: "156.218.56.***",
    device: "Desktop - Firefox 122",
    deviceFingerprint: "5d8c2f...",
    verificationStatus: "Verified",
    bidIncrement: 50000,
    timestamp2: "14:12:45.456"
  },
  {
    id: "BID-2026-001841",
    timestamp: "2026-03-18 14:10:22",
    auctionId: "AUC-2026-00548",
    auctionName: "مجمع سكني - حي المرجان",
    bidderIdMasked: "****7834",
    bidderName: "سلطان م. القحطاني",
    amount: 3350000,
    ipAddress: "156.218.23.***",
    device: "Mobile - iOS 17.2",
    deviceFingerprint: "8b4e1d...",
    verificationStatus: "Verified",
    bidIncrement: 100000,
    timestamp2: "14:10:22.234"
  },
  {
    id: "BID-2026-001840",
    timestamp: "2026-03-18 14:08:15",
    auctionId: "AUC-2026-00549",
    auctionName: "فيلا فاخرة - حي الياسمين",
    bidderIdMasked: "****3421",
    bidderName: "محمد ع. السديري",
    amount: 1450000,
    ipAddress: "156.218.78.***",
    device: "Desktop - Chrome 121",
    deviceFingerprint: "7c3d8e...",
    verificationStatus: "Verified",
    bidIncrement: 30000,
    timestamp2: "14:08:15.678"
  }
];

export default function BidAuditLog() {
  const { theme } = useTheme();
  const { language } = useTranslation();
  const isDark = theme === 'dark';
  const isRTL = language === 'ar';
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAuction, setFilterAuction] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [dateRange, setDateRange] = useState("today");

  // Filter bids
  const filteredBids = bidLogs.filter(bid => {
    const matchesSearch = 
      bid.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bid.auctionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bid.bidderIdMasked.includes(searchTerm) ||
      bid.auctionName.includes(searchTerm);
    
    const matchesAuction = filterAuction === "all" || bid.auctionId === filterAuction;
    const matchesStatus = filterStatus === "all" || bid.verificationStatus === filterStatus;
    
    return matchesSearch && matchesAuction && matchesStatus;
  });

  // Statistics
  const stats = {
    total: bidLogs.length,
    verified: bidLogs.filter(b => b.verificationStatus === "Verified").length,
    flagged: bidLogs.filter(b => b.verificationStatus === "Flagged").length,
    totalValue: bidLogs.reduce((sum, b) => sum + b.amount, 0),
    uniqueBidders: new Set(bidLogs.map(b => b.bidderIdMasked)).size
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Verified":
        return (
          <Badge className="bg-green-500 hover:bg-green-600 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Verified
          </Badge>
        );
      case "Flagged":
        return (
          <Badge className="bg-red-500 hover:bg-red-600 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            Flagged
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const exportToCSV = () => {
    // CSV Export functionality
    const headers = ["Bid ID", "Timestamp", "Auction ID", "Bidder ID", "Amount", "IP Address", "Device", "Status"];
    const rows = filteredBids.map(bid => [
      bid.id,
      bid.timestamp,
      bid.auctionId,
      bid.bidderIdMasked,
      bid.amount,
      bid.ipAddress,
      bid.device,
      bid.verificationStatus
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `bid-audit-log-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className={`text-4xl font-light ${isDark ? 'text-[#F1F5F9]' : 'text-[#2B3D50]'}`}>
          Bid Audit Log
        </h1>
        <p 
          className={`text-2xl font-light mt-2 ${isDark ? 'text-[#94A3B8]' : 'text-gray-600'}`}
          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
        >
          سجل المزايدات - Entad Compliance
        </p>
        <div className={`flex items-center gap-2 mt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Shield className="w-4 h-4 text-[#47CCD0]" />
          <p className={`text-sm ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'}`}>
            {language === 'ar' 
              ? 'إلزامي وفقاً لمتطلبات هيئة المزادات الإلكترونية (Entad)'
              : 'MANDATORY per Entad Electronic Auction Audit Requirements'}
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className={`border-0 shadow-sm ${isDark ? 'bg-[#1A2836]' : 'bg-white'}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'} mb-1`}>
                  Total Bids Today
                </p>
                <p className={`text-3xl font-light ${isDark ? 'text-[#F1F5F9]' : 'text-[#2B3D50]'}`}>
                  {stats.total}
                </p>
              </div>
              <Gavel className="w-8 h-8 text-[#47CCD0]" />
            </div>
          </CardContent>
        </Card>

        <Card className={`border-0 shadow-sm ${isDark ? 'bg-[#1A2836]' : 'bg-white'}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'} mb-1`}>
                  Verified Bids
                </p>
                <p className={`text-3xl font-light text-green-600`}>
                  {stats.verified}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className={`border-0 shadow-sm ${isDark ? 'bg-[#1A2836]' : 'bg-white'}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'} mb-1`}>
                  Flagged Bids
                </p>
                <p className={`text-3xl font-light text-red-600`}>
                  {stats.flagged}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className={`border-0 shadow-sm ${isDark ? 'bg-[#1A2836]' : 'bg-white'}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'} mb-1`}>
                  Total Bid Value
                </p>
                <p className={`text-2xl font-light ${isDark ? 'text-[#F1F5F9]' : 'text-[#2B3D50]'} font-helvetica`}>
                  {(stats.totalValue / 1000000).toFixed(1)}M
                </p>
                <p className={`text-xs ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'}`}>SAR</p>
              </div>
              <FileText className="w-8 h-8 text-[#47CCD0]" />
            </div>
          </CardContent>
        </Card>

        <Card className={`border-0 shadow-sm ${isDark ? 'bg-[#1A2836]' : 'bg-white'}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'} mb-1`}>
                  Unique Bidders
                </p>
                <p className={`text-3xl font-light ${isDark ? 'text-[#F1F5F9]' : 'text-[#2B3D50]'}`}>
                  {stats.uniqueBidders}
                </p>
              </div>
              <User className="w-8 h-8 text-[#47CCD0]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className={`border-0 shadow-sm ${isDark ? 'bg-[#1A2836]' : 'bg-white'}`}>
        <CardContent className="p-6">
          <div className={`flex flex-col md:flex-row gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            {/* Search */}
            <div className="flex-1 relative">
              <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-[#94A3B8]' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder={language === 'ar' ? 'بحث بـ Bid ID، Auction ID، Bidder ID...' : 'Search by Bid ID, Auction ID, Bidder ID...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full ${isRTL ? 'pr-11 pl-4' : 'pl-11 pr-4'} py-2.5 rounded-lg border ${
                  isDark 
                    ? 'bg-[#0F1923] border-[#2B3D50] text-[#F1F5F9] placeholder-[#94A3B8]' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-[#47CCD0]/20 focus:border-[#47CCD0]`}
                style={{ fontFamily: language === 'ar' ? "'Noto Kufi Arabic', sans-serif" : 'inherit' }}
              />
            </div>

            {/* Date Range */}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className={`px-4 py-2.5 rounded-lg border ${
                isDark 
                  ? 'bg-[#0F1923] border-[#2B3D50] text-[#F1F5F9]' 
                  : 'bg-gray-50 border-gray-200 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-[#47CCD0]/20 focus:border-[#47CCD0]`}
            >
              <option value="today">{language === 'ar' ? 'اليوم' : 'Today'}</option>
              <option value="week">{language === 'ar' ? 'هذا الأسبوع' : 'This Week'}</option>
              <option value="month">{language === 'ar' ? 'هذا الشهر' : 'This Month'}</option>
              <option value="custom">{language === 'ar' ? 'نطاق مخصص' : 'Custom Range'}</option>
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`px-4 py-2.5 rounded-lg border ${
                isDark 
                  ? 'bg-[#0F1923] border-[#2B3D50] text-[#F1F5F9]' 
                  : 'bg-gray-50 border-gray-200 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-[#47CCD0]/20 focus:border-[#47CCD0]`}
            >
              <option value="all">{language === 'ar' ? 'جميع الحالات' : 'All Status'}</option>
              <option value="Verified">{language === 'ar' ? 'تم التحقق' : 'Verified'}</option>
              <option value="Flagged">{language === 'ar' ? 'مشبوه' : 'Flagged'}</option>
            </select>

            {/* Export Buttons */}
            <Button 
              onClick={exportToCSV}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Download className="w-4 h-4 mr-2" aria-hidden="true" />
              CSV
            </Button>
            
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Download className="w-4 h-4 mr-2" aria-hidden="true" />
              PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bid Audit Table */}
      <Card className={`border-0 shadow-sm ${isDark ? 'bg-[#1A2836]' : 'bg-white'}`}>
        <CardHeader>
          <CardTitle className={`text-xl font-light ${isDark ? 'text-[#F1F5F9]' : 'text-[#2B3D50]'} flex items-center gap-2`}>
            <FileText className="w-5 h-5 text-[#47CCD0]" />
            {language === 'ar' ? 'سجل المزايدات الكامل' : 'Complete Bid Audit Trail'}
          </CardTitle>
          <p className={`text-sm ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'}`}>
            {filteredBids.length} {language === 'ar' ? 'مزايدة مسجلة' : 'bids recorded'} • Entad Compliant
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${isDark ? 'border-[#2B3D50]' : 'border-gray-200'}`}>
                  <th className={`${isRTL ? 'text-right' : 'text-left'} px-4 py-3 text-xs font-medium ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'} uppercase`}>
                    Timestamp
                  </th>
                  <th className={`${isRTL ? 'text-right' : 'text-left'} px-4 py-3 text-xs font-medium ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'} uppercase`}>
                    Bid ID
                  </th>
                  <th className={`${isRTL ? 'text-right' : 'text-left'} px-4 py-3 text-xs font-medium ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'} uppercase`}>
                    Auction
                  </th>
                  <th className={`${isRTL ? 'text-right' : 'text-left'} px-4 py-3 text-xs font-medium ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'} uppercase`}>
                    Bidder
                  </th>
                  <th className={`${isRTL ? 'text-right' : 'text-left'} px-4 py-3 text-xs font-medium ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'} uppercase`}>
                    Amount
                  </th>
                  <th className={`${isRTL ? 'text-right' : 'text-left'} px-4 py-3 text-xs font-medium ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'} uppercase`}>
                    IP Address
                  </th>
                  <th className={`${isRTL ? 'text-right' : 'text-left'} px-4 py-3 text-xs font-medium ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'} uppercase`}>
                    Device
                  </th>
                  <th className={`${isRTL ? 'text-right' : 'text-left'} px-4 py-3 text-xs font-medium ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'} uppercase`}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredBids.map((bid, index) => (
                  <tr 
                    key={bid.id}
                    className={`border-b ${isDark ? 'border-[#2B3D50]' : 'border-gray-100'} ${
                      index % 2 === 0 
                        ? (isDark ? 'bg-[#1A2836]' : 'bg-white')
                        : (isDark ? 'bg-[#162230]' : 'bg-gray-50')
                    } hover:${isDark ? 'bg-[#2B3D50]/30' : 'bg-gray-100'} transition-colors`}
                  >
                    <td className={`px-4 py-4`}>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <div>
                          <p className={`text-sm ${isDark ? 'text-[#F1F5F9]' : 'text-gray-900'}`}>
                            {bid.timestamp.split(' ')[1]}
                          </p>
                          <p className={`text-xs ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'}`}>
                            {bid.timestamp.split(' ')[0]}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className={`px-4 py-4 text-sm font-mono ${isDark ? 'text-[#47CCD0]' : 'text-[#47CCD0]'} font-medium`}>
                      {bid.id}
                    </td>
                    <td className={`px-4 py-4`}>
                      <div>
                        <p className={`text-xs font-mono ${isDark ? 'text-[#94A3B8]' : 'text-gray-600'}`}>
                          {bid.auctionId}
                        </p>
                        <p 
                          className={`text-sm ${isDark ? 'text-[#F1F5F9]' : 'text-gray-900'}`}
                          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                        >
                          {bid.auctionName}
                        </p>
                      </div>
                    </td>
                    <td className={`px-4 py-4`}>
                      <div>
                        <p className={`text-sm font-mono ${isDark ? 'text-[#F1F5F9]' : 'text-gray-900'}`}>
                          {bid.bidderIdMasked}
                        </p>
                        <p 
                          className={`text-xs ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'}`}
                          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                        >
                          {bid.bidderName}
                        </p>
                      </div>
                    </td>
                    <td className={`px-4 py-4`}>
                      <div>
                        <p className={`text-base font-medium ${isDark ? 'text-[#47CCD0]' : 'text-[#47CCD0]'} font-helvetica`}>
                          {bid.amount.toLocaleString()}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'}`}>
                          +{bid.bidIncrement.toLocaleString()} SAR
                        </p>
                      </div>
                    </td>
                    <td className={`px-4 py-4 text-sm font-mono ${isDark ? 'text-[#94A3B8]' : 'text-gray-600'}`}>
                      {bid.ipAddress}
                    </td>
                    <td className={`px-4 py-4`}>
                      <div className="flex items-center gap-2">
                        <Monitor className="w-3 h-3 text-gray-400" />
                        <span className={`text-xs ${isDark ? 'text-[#94A3B8]' : 'text-gray-600'}`}>
                          {bid.device}
                        </span>
                      </div>
                    </td>
                    <td className={`px-4 py-4`}>
                      {getStatusBadge(bid.verificationStatus)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
