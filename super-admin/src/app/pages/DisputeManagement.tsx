import {
  AlertTriangle, Scale, Clock, CheckCircle, XCircle, MessageSquare,
  Search, Filter, Download, Eye, FileText, User, ChevronLeft, ChevronRight,
  ArrowUpRight, Shield, Gavel, Calendar, Flag
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "../context/TranslationContext";
import { useState } from "react";

const disputeStats = [
  { labelAr: "نزاعات مفتوحة", labelEn: "Open Disputes", value: 12, icon: AlertTriangle, color: "#F59E0B", bg: "bg-yellow-100", bgDark: "bg-yellow-900/30" },
  { labelAr: "قيد المراجعة", labelEn: "Under Review", value: 8, icon: Clock, color: "#6366F1", bg: "bg-indigo-100", bgDark: "bg-indigo-900/30" },
  { labelAr: "تم الحل", labelEn: "Resolved", value: 156, icon: CheckCircle, color: "#10B981", bg: "bg-green-100", bgDark: "bg-green-900/30" },
  { labelAr: "مرفوضة", labelEn: "Rejected", value: 23, icon: XCircle, color: "#EF4444", bg: "bg-red-100", bgDark: "bg-red-900/30" },
];

const disputes = [
  {
    id: "DSP-2026-0147",
    auctionId: "AUC-2026-00519",
    filedBy: "محمد العتيبي",
    filedByEn: "Mohammed Al-Otaibi",
    filedAgainst: "النظام",
    filedAgainstEn: "System",
    type: "bid-manipulation",
    typeAr: "تلاعب بالمزايدة",
    typeEn: "Bid Manipulation",
    status: "open",
    priority: "high",
    filedDate: "2026-03-28",
    amount: "2,450,000",
    description: "ادعاء بتلاعب في المزايدة الأخيرة",
    descriptionEn: "Claim of manipulation in last bid",
    assignedTo: "أحمد الشمري",
    assignedToEn: "Ahmed Al-Shamri"
  },
  {
    id: "DSP-2026-0146",
    auctionId: "AUC-2026-00515",
    filedBy: "شركة الأمل العقارية",
    filedByEn: "Al-Amal Real Estate Co.",
    filedAgainst: "خالد المطيري",
    filedAgainstEn: "Khalid Al-Mutairi",
    type: "non-payment",
    typeAr: "عدم السداد",
    typeEn: "Non-Payment",
    status: "under-review",
    priority: "high",
    filedDate: "2026-03-27",
    amount: "1,800,000",
    description: "عدم سداد قيمة الترسية خلال المدة المحددة",
    descriptionEn: "Failure to pay award amount within deadline",
    assignedTo: "سارة القحطاني",
    assignedToEn: "Sara Al-Qahtani"
  },
  {
    id: "DSP-2026-0145",
    auctionId: "AUC-2026-00510",
    filedBy: "عبدالرحمن الدوسري",
    filedByEn: "Abdulrahman Al-Dosari",
    filedAgainst: "شركة العقار الذهبي",
    filedAgainstEn: "Golden Real Estate Co.",
    type: "property-misrepresentation",
    typeAr: "وصف مضلل للعقار",
    typeEn: "Property Misrepresentation",
    status: "under-review",
    priority: "medium",
    filedDate: "2026-03-26",
    amount: "950,000",
    description: "العقار لا يطابق الوصف المعلن في المزاد",
    descriptionEn: "Property does not match auction listing",
    assignedTo: "أحمد الشمري",
    assignedToEn: "Ahmed Al-Shamri"
  },
  {
    id: "DSP-2026-0144",
    auctionId: "AUC-2026-00505",
    filedBy: "ناصر الغامدي",
    filedByEn: "Nasser Al-Ghamdi",
    filedAgainst: "النظام",
    filedAgainstEn: "System",
    type: "technical-issue",
    typeAr: "خلل تقني",
    typeEn: "Technical Issue",
    status: "resolved",
    priority: "low",
    filedDate: "2026-03-24",
    amount: "3,200,000",
    description: "انقطاع الاتصال أثناء المزايدة",
    descriptionEn: "Connection lost during bidding",
    assignedTo: "فريق التقنية",
    assignedToEn: "Tech Team"
  },
  {
    id: "DSP-2026-0143",
    auctionId: "AUC-2026-00498",
    filedBy: "فهد السبيعي",
    filedByEn: "Fahad Al-Subaie",
    filedAgainst: "عبدالله الحربي",
    filedAgainstEn: "Abdullah Al-Harbi",
    type: "shill-bidding",
    typeAr: "مزايدة وهمية",
    typeEn: "Shill Bidding",
    status: "resolved",
    priority: "high",
    filedDate: "2026-03-22",
    amount: "1,500,000",
    description: "اشتباه في مزايدات وهمية لرفع السعر",
    descriptionEn: "Suspected shill bidding to inflate price",
    assignedTo: "لجنة المراجعة",
    assignedToEn: "Review Committee"
  },
];

const getStatusBadge = (status: string, language: string) => {
  const map: Record<string, { label: string; labelAr: string; cls: string }> = {
    "open": { label: "Open", labelAr: "مفتوح", cls: "bg-yellow-500 hover:bg-yellow-500 text-white" },
    "under-review": { label: "Under Review", labelAr: "قيد المراجعة", cls: "bg-indigo-500 hover:bg-indigo-500 text-white" },
    "resolved": { label: "Resolved", labelAr: "تم الحل", cls: "bg-green-500 hover:bg-green-500 text-white" },
    "rejected": { label: "Rejected", labelAr: "مرفوض", cls: "bg-red-500 hover:bg-red-500 text-white" },
  };
  const s = map[status] || map["open"];
  return <Badge className={s.cls}>{language === 'ar' ? s.labelAr : s.label}</Badge>;
};

const getPriorityBadge = (priority: string, language: string) => {
  const map: Record<string, { label: string; labelAr: string; cls: string }> = {
    "high": { label: "High", labelAr: "عالية", cls: "bg-red-100 text-red-700 border border-red-200" },
    "medium": { label: "Medium", labelAr: "متوسطة", cls: "bg-yellow-100 text-yellow-700 border border-yellow-200" },
    "low": { label: "Low", labelAr: "منخفضة", cls: "bg-green-100 text-green-700 border border-green-200" },
  };
  const p = map[priority] || map["medium"];
  return <Badge variant="outline" className={p.cls}>{language === 'ar' ? p.labelAr : p.label}</Badge>;
};

export default function DisputeManagement() {
  const { theme } = useTheme();
  const { language, direction } = useTranslation();
  const isDark = theme === 'dark';
  const isRTL = direction === 'rtl';
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDispute, setSelectedDispute] = useState<string | null>(null);

  const filtered = statusFilter === "all" ? disputes : disputes.filter(d => d.status === statusFilter);

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className={isRTL ? 'text-right' : ''}>
        <h1 className={`mzadat-h1 ${isDark ? 'text-[#F1F5F9]' : 'text-[#2B3D50]'}`}>
          {language === 'ar' ? 'إدارة النزاعات' : 'Dispute Management'}
        </h1>
        <p className={`mzadat-body ${isDark ? 'text-[#94A3B8]' : 'text-[#6B7280]'} mt-2`}>
          {language === 'ar' ? 'إدارة ومتابعة النزاعات والشكاوى المتعلقة بالمزادات' : 'Manage and track auction-related disputes and complaints'}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {disputeStats.map((stat, i) => (
          <Card key={i} className={`border-0 ${isDark ? 'bg-[#1A2836]' : 'bg-white shadow-sm'}`}>
            <CardContent className="p-4">
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? stat.bgDark : stat.bg}`}>
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <div className={isRTL ? 'text-right' : ''}>
                  <p className={`text-[12px] ${isDark ? 'text-[#94A3B8]' : 'text-[#6B7280]'}`}>
                    {language === 'ar' ? stat.labelAr : stat.labelEn}
                  </p>
                  <p className={`text-2xl font-helvetica ${isDark ? 'text-[#F1F5F9]' : 'text-[#1F2937]'}`} style={{ fontVariantNumeric: 'tabular-nums' }}>
                    {stat.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className={`border-0 ${isDark ? 'bg-[#1A2836]' : 'bg-white shadow-sm'}`}>
        <CardContent className="p-4">
          <div className={`flex flex-wrap items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`relative flex-1 min-w-[200px] ${isRTL ? 'text-right' : ''}`}>
              <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-[#94A3B8]' : 'text-gray-400'} ${isRTL ? 'right-3' : 'left-3'}`} />
              <input
                type="text"
                placeholder={language === 'ar' ? 'بحث في النزاعات...' : 'Search disputes...'}
                className={`w-full py-2 rounded-lg border text-sm ${isRTL ? 'pr-10 pl-3' : 'pl-10 pr-3'} ${
                  isDark ? 'bg-[#0F1923] border-[#2B3D50] text-[#F1F5F9]' : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {[
                { value: "all", labelAr: "الكل", labelEn: "All" },
                { value: "open", labelAr: "مفتوح", labelEn: "Open" },
                { value: "under-review", labelAr: "قيد المراجعة", labelEn: "Under Review" },
                { value: "resolved", labelAr: "تم الحل", labelEn: "Resolved" },
              ].map(f => (
                <button key={f.value} onClick={() => setStatusFilter(f.value)}
                  className={`px-3 py-1.5 rounded-lg text-[12px] transition-all ${
                    statusFilter === f.value
                      ? 'bg-[#47CCD0] text-white'
                      : isDark ? 'bg-[#2B3D50] text-[#94A3B8]' : 'bg-gray-100 text-gray-600'
                  }`}>
                  {language === 'ar' ? f.labelAr : f.labelEn}
                </button>
              ))}
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              {language === 'ar' ? 'تصدير' : 'Export'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Disputes Table */}
      <Card className={`border-0 ${isDark ? 'bg-[#1A2836]' : 'bg-white shadow-sm'}`}>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className={isDark ? 'border-[#2B3D50]' : ''}>
                  <TableHead className={`${isRTL ? 'text-right' : ''} ${isDark ? 'text-[#94A3B8]' : ''}`}>{language === 'ar' ? 'رقم النزاع' : 'Dispute ID'}</TableHead>
                  <TableHead className={`${isRTL ? 'text-right' : ''} ${isDark ? 'text-[#94A3B8]' : ''}`}>{language === 'ar' ? 'المزاد' : 'Auction'}</TableHead>
                  <TableHead className={`${isRTL ? 'text-right' : ''} ${isDark ? 'text-[#94A3B8]' : ''}`}>{language === 'ar' ? 'مقدم الشكوى' : 'Filed By'}</TableHead>
                  <TableHead className={`${isRTL ? 'text-right' : ''} ${isDark ? 'text-[#94A3B8]' : ''}`}>{language === 'ar' ? 'النوع' : 'Type'}</TableHead>
                  <TableHead className={`${isRTL ? 'text-right' : ''} ${isDark ? 'text-[#94A3B8]' : ''}`}>{language === 'ar' ? 'المبلغ' : 'Amount'}</TableHead>
                  <TableHead className={`${isRTL ? 'text-right' : ''} ${isDark ? 'text-[#94A3B8]' : ''}`}>{language === 'ar' ? 'الأولوية' : 'Priority'}</TableHead>
                  <TableHead className={`${isRTL ? 'text-right' : ''} ${isDark ? 'text-[#94A3B8]' : ''}`}>{language === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                  <TableHead className={`${isRTL ? 'text-right' : ''} ${isDark ? 'text-[#94A3B8]' : ''}`}>{language === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(dispute => (
                  <TableRow key={dispute.id} className={`${isDark ? 'border-[#2B3D50] hover:bg-[#162230]' : 'hover:bg-gray-50'} cursor-pointer`}
                    onClick={() => setSelectedDispute(selectedDispute === dispute.id ? null : dispute.id)}>
                    <TableCell className={`font-helvetica text-[13px] ${isDark ? 'text-[#F1F5F9]' : ''}`}>{dispute.id}</TableCell>
                    <TableCell className={`font-helvetica text-[13px] ${isDark ? 'text-[#47CCD0]' : 'text-[#47CCD0]'}`}>{dispute.auctionId}</TableCell>
                    <TableCell className={`text-[13px] ${isDark ? 'text-[#F1F5F9]' : ''}`}>{language === 'ar' ? dispute.filedBy : dispute.filedByEn}</TableCell>
                    <TableCell className={`text-[13px] ${isDark ? 'text-[#94A3B8]' : 'text-gray-600'}`}>{language === 'ar' ? dispute.typeAr : dispute.typeEn}</TableCell>
                    <TableCell className={`font-helvetica text-[13px] ${isDark ? 'text-[#F1F5F9]' : ''}`} style={{ fontVariantNumeric: 'tabular-nums' }}>{dispute.amount} SAR</TableCell>
                    <TableCell>{getPriorityBadge(dispute.priority, language)}</TableCell>
                    <TableCell>{getStatusBadge(dispute.status, language)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="p-2"><Eye className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" className="p-2"><MessageSquare className="w-4 h-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Expanded Detail */}
          {selectedDispute && (() => {
            const d = disputes.find(x => x.id === selectedDispute);
            if (!d) return null;
            return (
              <div className={`p-6 border-t ${isDark ? 'border-[#2B3D50] bg-[#0F1923]' : 'border-gray-200 bg-gray-50'}`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className={isRTL ? 'text-right' : ''}>
                    <h3 className={`text-sm mb-3 ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'}`}>{language === 'ar' ? 'تفاصيل النزاع' : 'Dispute Details'}</h3>
                    <p className={`text-[13px] mb-2 ${isDark ? 'text-[#F1F5F9]' : 'text-gray-900'}`}>{language === 'ar' ? d.description : d.descriptionEn}</p>
                    <p className={`text-[12px] ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'}`}>
                      <Calendar className="w-3 h-3 inline mr-1" />{d.filedDate}
                    </p>
                  </div>
                  <div className={isRTL ? 'text-right' : ''}>
                    <h3 className={`text-sm mb-3 ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'}`}>{language === 'ar' ? 'ضد' : 'Filed Against'}</h3>
                    <p className={`text-[13px] ${isDark ? 'text-[#F1F5F9]' : 'text-gray-900'}`}>{language === 'ar' ? d.filedAgainst : d.filedAgainstEn}</p>
                  </div>
                  <div className={isRTL ? 'text-right' : ''}>
                    <h3 className={`text-sm mb-3 ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'}`}>{language === 'ar' ? 'مسؤول المراجعة' : 'Assigned To'}</h3>
                    <p className={`text-[13px] ${isDark ? 'text-[#F1F5F9]' : 'text-gray-900'}`}>{language === 'ar' ? d.assignedTo : d.assignedToEn}</p>
                  </div>
                </div>
                <div className={`flex gap-3 mt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Button size="sm" className="bg-[#47CCD0] hover:bg-[#3ab5b0] text-white gap-1">
                    <Scale className="w-4 h-4" />{language === 'ar' ? 'بدء التحقيق' : 'Start Investigation'}
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1">
                    <FileText className="w-4 h-4" />{language === 'ar' ? 'عرض المستندات' : 'View Documents'}
                  </Button>
                </div>
              </div>
            );
          })()}
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <p className={`text-sm ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'}`}>
          {language === 'ar' ? `عرض ${filtered.length} من ${disputes.length} نزاع` : `Showing ${filtered.length} of ${disputes.length} disputes`}
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled><ChevronLeft className="w-4 h-4" /></Button>
          <span className={`text-sm px-3 py-1 rounded ${isDark ? 'bg-[#2B3D50] text-[#F1F5F9]' : 'bg-gray-100'}`}>1</span>
          <Button variant="outline" size="sm"><ChevronRight className="w-4 h-4" /></Button>
        </div>
      </div>
    </div>
  );
}
