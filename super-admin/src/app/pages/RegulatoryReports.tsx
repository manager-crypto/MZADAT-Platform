import { useState } from "react";
import { 
  FileText,
  Download,
  Send,
  CheckCircle,
  Clock,
  Calendar,
  Shield,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Eye,
  Filter
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "../context/TranslationContext";

// Report Templates
const reportTemplates = [
  {
    id: "RPT-REGA-MONTHLY",
    nameAr: "تقرير الامتثال الشهري لهيئة العقار",
    nameEn: "Monthly REGA Compliance Report",
    category: "REGA Compliance",
    categoryAr: "امتثال هيئة العقار",
    frequency: "Monthly",
    frequencyAr: "شهري",
    description: "Complete monthly compliance report including all FAL licenses, property verifications, and audit trail",
    descriptionAr: "تقرير امتثال شهري شامل يتضمن جميع تراخيص FAL والتحقق من العقارات وسجل التدقيق",
    lastGenerated: "2026-03-01",
    status: "Ready",
    size: "2.4 MB",
    format: ["PDF", "Excel"],
    icon: Shield,
    color: "text-[#47CCD0]"
  },
  {
    id: "RPT-AUCTION-QUARTERLY",
    nameAr: "ملخص المزادات الفصلي",
    nameEn: "Quarterly Auction Summary",
    category: "Auction Reports",
    categoryAr: "تقارير المزادات",
    frequency: "Quarterly",
    frequencyAr: "ربع سنوي",
    description: "Quarterly overview of all auctions: total volume, success rate, average prices, bidder demographics",
    descriptionAr: "نظرة عامة ربع سنوية على جميع المزادات: الحجم الإجمالي، معدل النجاح، متوسط الأسعار، التركيبة السكانية للمزايدين",
    lastGenerated: "2026-01-05",
    status: "Due",
    size: "3.8 MB",
    format: ["PDF", "PowerPoint"],
    icon: TrendingUp,
    color: "text-purple-600"
  },
  {
    id: "RPT-AML-ANNUAL",
    nameAr: "تقرير مكافحة غسل الأموال السنوي",
    nameEn: "Annual AML Report",
    category: "AML Compliance",
    categoryAr: "امتثال مكافحة غسل الأموال",
    frequency: "Annually",
    frequencyAr: "سنوي",
    description: "Annual Anti-Money Laundering report with KYC verification, suspicious transactions, and compliance metrics",
    descriptionAr: "تقرير سنوي لمكافحة غسل الأموال مع التحقق من KYC والمعاملات المشبوهة ومقاييس الامتثال",
    lastGenerated: "2025-12-31",
    status: "Submitted",
    size: "5.2 MB",
    format: ["PDF"],
    icon: AlertTriangle,
    color: "text-orange-600"
  },
  {
    id: "RPT-DEPOSIT-RECON",
    nameAr: "تسوية الودائع الأمنية",
    nameEn: "Security Deposit Reconciliation",
    category: "Financial Reports",
    categoryAr: "التقارير المالية",
    frequency: "Monthly",
    frequencyAr: "شهري",
    description: "Monthly reconciliation of all security deposits: collected, held, released, and refunded per Entad standards",
    descriptionAr: "تسوية شهرية لجميع الودائع الأمنية: المحصلة والمحتفظ بها والمفرج عنها والمستردة وفقاً لمعايير Entad",
    lastGenerated: "2026-03-01",
    status: "Ready",
    size: "1.9 MB",
    format: ["PDF", "Excel"],
    icon: DollarSign,
    color: "text-green-600"
  }
];

// Submission History
const submissionHistory = [
  {
    id: "SUB-2026-045",
    reportName: "Monthly REGA Compliance Report",
    reportNameAr: "تقرير الامتثال الشهري لهيئة العقار",
    period: "February 2026",
    periodAr: "فبراير 2026",
    submittedTo: "REGA (Real Estate General Authority)",
    submittedToAr: "هيئة العقار",
    submittedDate: "2026-03-01 10:30:00",
    submittedBy: "مدير الامتثال",
    status: "Acknowledged",
    confirmationNumber: "REGA-2026-FEB-045",
    size: "2.4 MB"
  },
  {
    id: "SUB-2026-044",
    reportName: "Security Deposit Reconciliation",
    reportNameAr: "تسوية الودائع الأمنية",
    period: "February 2026",
    periodAr: "فبراير 2026",
    submittedTo: "Entad (Electronic Notary)",
    submittedToAr: "إنطاد",
    submittedDate: "2026-03-01 09:15:00",
    submittedBy: "مدير المالية",
    status: "Acknowledged",
    confirmationNumber: "ENTAD-2026-FEB-044",
    size: "1.9 MB"
  },
  {
    id: "SUB-2026-043",
    reportName: "Monthly REGA Compliance Report",
    reportNameAr: "تقرير الامتثال الشهري لهيئة العقار",
    period: "January 2026",
    periodAr: "يناير 2026",
    submittedTo: "REGA (Real Estate General Authority)",
    submittedToAr: "هيئة العقار",
    submittedDate: "2026-02-01 11:45:00",
    submittedBy: "مدير الامتثال",
    status: "Acknowledged",
    confirmationNumber: "REGA-2026-JAN-043",
    size: "2.3 MB"
  },
  {
    id: "SUB-2025-042",
    reportName: "Annual AML Report",
    reportNameAr: "تقرير مكافحة غسل الأموال السنوي",
    period: "2025",
    periodAr: "2025",
    submittedTo: "SAMA (Saudi Central Bank)",
    submittedToAr: "مؤسسة النقد العربي السعودي",
    submittedDate: "2026-01-15 14:20:00",
    submittedBy: "مدير الامتثال",
    status: "Approved",
    confirmationNumber: "SAMA-2025-AML-042",
    size: "5.2 MB"
  }
];

export default function RegulatoryReports() {
  const { theme } = useTheme();
  const { language } = useTranslation();
  const isDark = theme === 'dark';
  const isRTL = language === 'ar';
  
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Filter reports
  const filteredReports = reportTemplates.filter(report => {
    const matchesCategory = filterCategory === "all" || report.category === filterCategory;
    const matchesStatus = filterStatus === "all" || report.status === filterStatus;
    return matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ready":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            {language === 'ar' ? 'جاهز' : 'Ready'}
          </Badge>
        );
      case "Due":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">
            {language === 'ar' ? 'مستحق' : 'Due'}
          </Badge>
        );
      case "Submitted":
        return (
          <Badge className="bg-[#47CCD0] hover:bg-[#3ab5b9]">
            {language === 'ar' ? 'تم الإرسال' : 'Submitted'}
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getSubmissionStatusBadge = (status: string) => {
    switch (status) {
      case "Acknowledged":
        return (
          <Badge className="bg-[#47CCD0] hover:bg-[#3ab5b9] flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            {language === 'ar' ? 'تم الاستلام' : 'Acknowledged'}
          </Badge>
        );
      case "Approved":
        return (
          <Badge className="bg-green-500 hover:bg-green-600 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            {language === 'ar' ? 'موافق عليه' : 'Approved'}
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className={`text-4xl font-light ${isDark ? 'text-[#F1F5F9]' : 'text-[#2B3D50]'}`}>
          Regulatory Reports
        </h1>
        <p 
          className={`text-2xl font-light mt-2 ${isDark ? 'text-[#94A3B8]' : 'text-gray-600'}`}
          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
        >
          التقارير التنظيمية - Compliance Documentation
        </p>
        <div className={`flex items-center gap-2 mt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Shield className="w-4 h-4 text-[#47CCD0]" />
          <p className={`text-sm ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'}`}>
            {language === 'ar' 
              ? 'تقارير جاهزة للهيئات التنظيمية: REGA، Entad، SAMA، ZATCA'
              : 'Pre-built reports for: REGA, Entad, SAMA, ZATCA'}
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card className={`border-0 shadow-sm ${isDark ? 'bg-[#1A2836]' : 'bg-white'}`}>
        <CardContent className="p-6">
          <div className={`flex flex-col md:flex-row gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className={`flex-1 px-4 py-2.5 rounded-lg border ${
                isDark 
                  ? 'bg-[#0F1923] border-[#2B3D50] text-[#F1F5F9]' 
                  : 'bg-gray-50 border-gray-200 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-[#47CCD0]/20 focus:border-[#47CCD0]`}
            >
              <option value="all">{language === 'ar' ? 'جميع الفئات' : 'All Categories'}</option>
              <option value="REGA Compliance">{language === 'ar' ? 'امتثال هيئة العقار' : 'REGA Compliance'}</option>
              <option value="Auction Reports">{language === 'ar' ? 'تقارير المزادات' : 'Auction Reports'}</option>
              <option value="AML Compliance">{language === 'ar' ? 'امتثال مكافحة غسل الأموال' : 'AML Compliance'}</option>
              <option value="Financial Reports">{language === 'ar' ? 'التقارير المالية' : 'Financial Reports'}</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`flex-1 px-4 py-2.5 rounded-lg border ${
                isDark 
                  ? 'bg-[#0F1923] border-[#2B3D50] text-[#F1F5F9]' 
                  : 'bg-gray-50 border-gray-200 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-[#47CCD0]/20 focus:border-[#47CCD0]`}
            >
              <option value="all">{language === 'ar' ? 'جميع الحالات' : 'All Status'}</option>
              <option value="Ready">{language === 'ar' ? 'جاهز' : 'Ready'}</option>
              <option value="Due">{language === 'ar' ? 'مستحق' : 'Due'}</option>
              <option value="Submitted">{language === 'ar' ? 'تم الإرسال' : 'Submitted'}</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Report Templates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredReports.map((report) => (
          <Card key={report.id} className={`border-0 shadow-sm ${isDark ? 'bg-[#1A2836]' : 'bg-white'} hover:shadow-lg transition-shadow`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-[#0F1923]' : 'bg-gray-50'}`}>
                    <report.icon className={`w-6 h-6 ${report.color}`} />
                  </div>
                  <div>
                    <CardTitle 
                      className={`text-lg font-medium ${isDark ? 'text-[#F1F5F9]' : 'text-[#2B3D50]'} mb-1`}
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {language === 'ar' ? report.nameAr : report.nameEn}
                    </CardTitle>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {language === 'ar' ? report.categoryAr : report.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {language === 'ar' ? report.frequencyAr : report.frequency}
                      </Badge>
                    </div>
                  </div>
                </div>
                {getStatusBadge(report.status)}
              </div>
            </CardHeader>
            <CardContent>
              <p 
                className={`text-sm ${isDark ? 'text-[#94A3B8]' : 'text-gray-600'} mb-4`}
                style={{ fontFamily: language === 'ar' ? "'Noto Kufi Arabic', sans-serif" : 'inherit' }}
              >
                {language === 'ar' ? report.descriptionAr : report.description}
              </p>

              <div className={`flex items-center gap-4 mb-4 pb-4 border-b ${isDark ? 'border-[#2B3D50]' : 'border-gray-200'}`}>
                <div className="flex items-center gap-2">
                  <Calendar className={`w-4 h-4 ${isDark ? 'text-[#94A3B8]' : 'text-gray-400'}`} />
                  <span className={`text-xs ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'}`}>
                    {language === 'ar' ? 'آخر إصدار:' : 'Last Generated:'} {report.lastGenerated}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className={`w-4 h-4 ${isDark ? 'text-[#94A3B8]' : 'text-gray-400'}`} />
                  <span className={`text-xs ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'}`}>
                    {report.size}
                  </span>
                </div>
              </div>

              <div className={`flex flex-wrap gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {report.format.map((format) => (
                  <Button 
                    key={format}
                    size="sm" 
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Download className="w-3 h-3" aria-hidden="true" />
                    {format}
                  </Button>
                ))}
                
                <Button 
                  size="sm" 
                  className="bg-[#47CCD0] hover:bg-[#3ab5b9] text-white flex items-center gap-2"
                >
                  <Send className="w-3 h-3" aria-hidden="true" />
                  {language === 'ar' ? 'إرسال للهيئة' : 'Submit'}
                </Button>

                <Button 
                  size="sm" 
                  variant="outline"
                  aria-label={language === 'ar' ? 'معاينة' : 'Preview'}
                >
                  <Eye className="w-3 h-3" aria-hidden="true" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Submission History */}
      <Card className={`border-0 shadow-sm ${isDark ? 'bg-[#1A2836]' : 'bg-white'}`}>
        <CardHeader>
          <CardTitle className={`text-xl font-light ${isDark ? 'text-[#F1F5F9]' : 'text-[#2B3D50]'} flex items-center gap-2`}>
            <CheckCircle className="w-5 h-5 text-[#47CCD0]" />
            {language === 'ar' ? 'سجل الإرسالات' : 'Submission History'}
          </CardTitle>
          <p className={`text-sm ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'}`}>
            {language === 'ar' ? 'تاريخ كامل لجميع التقارير المرسلة للهيئات التنظيمية' : 'Complete history of all regulatory submissions'}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {submissionHistory.map((submission) => (
              <div 
                key={submission.id}
                className={`p-5 rounded-lg border ${isDark ? 'border-[#2B3D50] bg-[#0F1923]' : 'border-gray-200 bg-gray-50'} hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 
                        className={`text-base font-medium ${isDark ? 'text-[#F1F5F9]' : 'text-[#2B3D50]'}`}
                        style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                      >
                        {language === 'ar' ? submission.reportNameAr : submission.reportName}
                      </h4>
                      {getSubmissionStatusBadge(submission.status)}
                    </div>
                    <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 text-sm ${isDark ? 'text-[#94A3B8]' : 'text-gray-600'}`}>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">{language === 'ar' ? 'الفترة:' : 'Period:'}</p>
                        <p>{language === 'ar' ? submission.periodAr : submission.period}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">{language === 'ar' ? 'المرسل إلى:' : 'Submitted to:'}</p>
                        <p style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                          {language === 'ar' ? submission.submittedToAr : submission.submittedTo}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">{language === 'ar' ? 'تاريخ الإرسال:' : 'Submitted:'}</p>
                        <p>{submission.submittedDate.split(' ')[0]}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">{language === 'ar' ? 'رقم التأكيد:' : 'Confirmation #:'}</p>
                        <p className="font-mono text-xs">{submission.confirmationNumber}</p>
                      </div>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="ml-4"
                    aria-label={language === 'ar' ? 'تحميل' : 'Download'}
                  >
                    <Download className="w-4 h-4" aria-hidden="true" />
                  </Button>
                </div>

                <div className={`flex items-center gap-2 pt-3 border-t ${isDark ? 'border-[#2B3D50]' : 'border-gray-200'}`}>
                  <Shield className="w-3 h-3 text-[#47CCD0]" />
                  <span 
                    className={`text-xs ${isDark ? 'text-[#47CCD0]' : 'text-[#47CCD0]'} font-medium`}
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {language === 'ar' ? 'تم الإرسال لهيئة العقار' : 'Submitted to Regulatory Authority'}
                  </span>
                  <span className={`text-xs ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'}`}>
                    • {submission.submittedDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
