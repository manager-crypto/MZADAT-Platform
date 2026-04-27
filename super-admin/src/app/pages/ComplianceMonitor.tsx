import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  QrCode, 
  AlertCircle, 
  Calendar,
  ToggleLeft,
  ToggleRight,
  Download,
  FileText,
  Ban,
  TrendingUp
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { useState } from "react";

const licenseTypes = [
  {
    nameAr: "تراخيص الوساطة",
    nameEn: "Brokerage Licenses",
    type: "FAL-BRK",
    active: 487,
    expiringSoon: 12,
    expired: 3,
    total: 502,
    compliantPercentage: 97,
    autoRenewal: true,
    color: "#47CCD0"
  },
  {
    nameAr: "تراخيص المزادات",
    nameEn: "Auction Licenses",
    type: "FAL-AUC",
    active: 523,
    expiringSoon: 8,
    expired: 1,
    total: 532,
    compliantPercentage: 98.3,
    autoRenewal: true,
    color: "#47CCD0"
  },
  {
    nameAr: "تراخيص الاستشارات",
    nameEn: "Consultation Licenses",
    type: "FAL-CON",
    active: 237,
    expiringSoon: 3,
    expired: 2,
    total: 242,
    compliantPercentage: 98.8,
    autoRenewal: false,
    color: "#47CCD0"
  },
  {
    nameAr: "تراخيص المعلنين",
    nameEn: "Advertiser Licenses",
    type: "FAL-ADV",
    active: 1247,
    expiringSoon: 23,
    expired: 8,
    total: 1278,
    compliantPercentage: 97.5,
    autoRenewal: true,
    color: "#47CCD0"
  },
];

const propertyAdLicenses = [
  {
    id: "PAL-2026-00147",
    propertyId: "RYD-78542-N",
    propertyNameAr: "فيلا سكنية - حي الملقا",
    propertyType: "Residential",
    propertyTypeAr: "سكني",
    city: "Riyadh",
    cityAr: "الرياض",
    advertiser: "محمد بن عبدالله التميمي",
    issueDate: "2026-02-15",
    expiryDate: "2026-08-15",
    viewCount: 1247,
    status: "active",
    qrStatus: "valid"
  },
  {
    id: "PAL-2026-00148",
    propertyId: "JED-45891-C",
    propertyNameAr: "شقة تجارية - حي الروضة",
    propertyType: "Commercial",
    propertyTypeAr: "تجاري",
    city: "Jeddah",
    cityAr: "جدة",
    advertiser: "شركة العقارات المتحدة",
    issueDate: "2026-01-20",
    expiryDate: "2026-07-20",
    viewCount: 892,
    status: "active",
    qrStatus: "valid"
  },
  {
    id: "PAL-2026-00122",
    propertyId: "DMM-23456-R",
    propertyNameAr: "أرض تجارية - الكورنيش",
    propertyType: "Land",
    propertyTypeAr: "أرض",
    city: "Dammam",
    cityAr: "الدمام",
    advertiser: "عبدالرحمن الخليفة",
    issueDate: "2025-12-10",
    expiryDate: "2026-04-10",
    viewCount: 456,
    status: "expiring",
    qrStatus: "warning"
  },
  {
    id: "PAL-2025-00891",
    propertyId: "RYD-11234-A",
    propertyNameAr: "مجمع سكني - حي النرجس",
    propertyType: "Residential",
    propertyTypeAr: "سكني",
    city: "Riyadh",
    cityAr: "الرياض",
    advertiser: "مؤسسة البناء الحديث",
    issueDate: "2025-11-01",
    expiryDate: "2026-02-01",
    viewCount: 234,
    status: "expired",
    qrStatus: "invalid"
  },
  {
    id: "PAL-2026-00149",
    propertyId: "MKH-67890-B",
    propertyNameAr: "قصر فاخر - حي المروج",
    propertyType: "Residential",
    propertyTypeAr: "سكني",
    city: "Makkah",
    cityAr: "مكة",
    advertiser: "فيصل بن سعود",
    issueDate: "2026-02-20",
    expiryDate: "2026-08-20",
    viewCount: 1567,
    status: "active",
    qrStatus: "valid"
  },
];

const expiringAlerts = [
  {
    id: 1,
    licenseId: "FAL-BRK-2024-1456",
    holder: "مكتب الفهد العقاري",
    type: "Brokerage",
    expiryDate: "2026-04-25",
    daysLeft: 39
  },
  {
    id: 2,
    licenseId: "FAL-AUC-2024-0892",
    holder: "شركة المزادات الذهبية",
    type: "Auction",
    expiryDate: "2026-04-30",
    daysLeft: 44
  },
  {
    id: 3,
    licenseId: "FAL-CON-2024-2134",
    holder: "مركز الاستشارات العقارية",
    type: "Consultation",
    expiryDate: "2026-05-10",
    daysLeft: 54
  },
];

// Critical renewal alerts - must be renewed within 30 days
const criticalRenewals = [
  {
    id: 1,
    licenseId: "FAL-BRK-2023-8745",
    holder: "شركة الرياض للوساطة العقارية",
    holderEn: "Riyadh Real Estate Brokerage Co.",
    type: "Brokerage",
    typeAr: "وساطة عقارية",
    expiryDate: "2026-04-05",
    daysLeft: 19
  },
  {
    id: 2,
    licenseId: "FAL-ADV-2024-5623",
    holder: "مؤسسة التسويق العقاري المتقدم",
    holderEn: "Advanced Property Marketing Est.",
    type: "Advertiser",
    typeAr: "معلن عقاري",
    expiryDate: "2026-04-12",
    daysLeft: 26
  },
];

export default function ComplianceMonitor() {
  const [suspendingLicense, setSuspendingLicense] = useState<string | null>(null);
  const [suspendReason, setSuspendReason] = useState("");

  const handleExportPDF = () => {
    alert("Exporting compliance report as PDF...");
  };

  const handleExportExcel = () => {
    alert("Exporting compliance report as Excel...");
  };

  const handleSuspendAd = (licenseId: string) => {
    if (!suspendReason.trim()) {
      alert("يرجى إدخال سبب التعليق / Please enter suspension reason");
      return;
    }
    alert(`Suspending advertisement for license ${licenseId}. Reason: ${suspendReason}`);
    setSuspendingLicense(null);
    setSuspendReason("");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-light text-[#2B3D50] heading-en">Compliance & License Monitor</h1>
        <p 
          className="text-2xl font-light text-gray-600 mt-2 font-arabic"
        >
          مراقبة الامتثال والتراخيص - تكامل REGA
        </p>
      </div>

      {/* Critical Renewal Alerts - MUST renew within 30 days */}
      {criticalRenewals.length > 0 && (
        <Card className="border-0 shadow-md bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-l-red-500">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center animate-pulse">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-red-700">
                    تنبيهات الإنذار — Critical Renewal Alerts
                  </CardTitle>
                  <p className="text-sm text-red-600 mt-1 font-arabic">
                    تراخيص يجب تجديدها خلال 30 يوم
                  </p>
                </div>
              </div>
              <Badge className="bg-red-600 text-white text-lg px-4 py-2">
                {criticalRenewals.length} Urgent
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {criticalRenewals.map((alert) => (
                <div 
                  key={alert.id} 
                  className="flex items-center justify-between p-5 bg-white rounded-lg border-2 border-red-200 shadow-sm"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className="bg-red-600 text-white hover:bg-red-600">
                        {alert.daysLeft} DAYS LEFT
                      </Badge>
                      <span className="font-medium text-gray-900 font-helvetica">{alert.licenseId}</span>
                    </div>
                    <p className="text-base font-medium text-gray-900 font-arabic mb-1">
                      {alert.holder}
                    </p>
                    <p className="text-sm text-gray-600">{alert.holderEn}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-gray-500">
                        <span className="font-arabic">{alert.typeAr}</span> • {alert.type}
                      </span>
                      <span className="text-xs text-red-600 font-helvetica">
                        Expires: {alert.expiryDate}
                      </span>
                    </div>
                  </div>
                  <Button 
                    className="gap-2 bg-[#47CCD0] hover:bg-[#3ab5b9] text-white"
                    size="lg"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-arabic">تجديد الآن</span>
                    <span>Renew Now</span>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* FAL License Overview - 4 Cards with Compliance % */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {licenseTypes.map((license, index) => (
          <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p 
                    className="text-sm text-gray-600 mb-1 font-arabic"
                  >
                    {license.nameAr}
                  </p>
                  <p className="text-xs text-gray-500 mb-2">{license.nameEn}</p>
                  <Badge variant="outline" className="text-xs font-helvetica">
                    {license.type}
                  </Badge>
                </div>
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${license.color}20` }}
                >
                  <Shield className="w-6 h-6" style={{ color: license.color }} />
                </div>
              </div>
              
              <div className="space-y-3 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active</span>
                  <span className="text-xl font-light text-[#2B3D50] font-helvetica">{license.active}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-orange-600">Expiring Soon</span>
                  <span className="text-xl font-light text-orange-600 font-helvetica">{license.expiringSoon}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-red-600">Expired</span>
                  <span className="text-xl font-light text-red-600 font-helvetica">{license.expired}</span>
                </div>
                
                {/* Compliance Percentage Bar */}
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-600">Compliance Rate</span>
                    <span className="text-sm font-medium text-[#47CCD0] font-helvetica">
                      {license.compliantPercentage}%
                    </span>
                  </div>
                  <Progress value={license.compliantPercentage} className="h-2" />
                </div>

                {/* Auto-Renewal Toggle Indicator */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-gray-600 font-arabic">تجديد تلقائي</span>
                  <div className="flex items-center gap-2">
                    {license.autoRenewal ? (
                      <>
                        <ToggleRight className="w-5 h-5 text-[#47CCD0]" />
                        <span className="text-xs font-medium text-[#47CCD0]">ON</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft className="w-5 h-5 text-gray-400" />
                        <span className="text-xs text-gray-500">OFF</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Expiring Licenses Alert */}
      <Card className="border-0 shadow-sm border-l-4 border-l-orange-500">
        <CardHeader>
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-orange-500" />
            <div>
              <CardTitle className="text-xl font-light text-[#2B3D50]">
                Licenses Expiring Within 60 Days
              </CardTitle>
              <p 
                className="text-sm text-gray-500"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                تنبيه: تراخيص تنتهي خلال 60 يوم
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {expiringAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-100">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                      {alert.type}
                    </Badge>
                    <span className="font-medium text-gray-900">{alert.licenseId}</span>
                  </div>
                  <p 
                    className="text-sm text-gray-600 mt-1"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {alert.holder}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-orange-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{alert.expiryDate}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{alert.daysLeft} days remaining</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Property Ad Licenses Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-light text-[#2B3D50] heading-en">
                Property Advertisement Licenses
              </CardTitle>
              <p 
                className="text-sm text-gray-500 font-arabic mt-1"
              >
                تراخيص إعلانات العقارات مع حالة رمز QR الديناميكي
              </p>
            </div>
            {/* Export Report Buttons */}
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleExportPDF}
                className="gap-2 border-[#47CCD0] text-[#47CCD0] hover:bg-[#47CCD0] hover:text-white"
              >
                <FileText className="w-4 h-4" />
                <span className="font-arabic">تصدير PDF</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleExportExcel}
                className="gap-2 border-[#47CCD0] text-[#47CCD0] hover:bg-[#47CCD0] hover:text-white"
              >
                <Download className="w-4 h-4" />
                <span className="font-arabic">تصدير Excel</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>License ID</TableHead>
                  <TableHead>
                    <span className="font-arabic">العقار</span>
                    <br />
                    <span className="text-xs text-gray-500">Property</span>
                  </TableHead>
                  <TableHead>
                    <span className="font-arabic">نوع العقار</span>
                    <br />
                    <span className="text-xs text-gray-500">Type</span>
                  </TableHead>
                  <TableHead>
                    <span className="font-arabic">المدينة</span>
                    <br />
                    <span className="text-xs text-gray-500">City</span>
                  </TableHead>
                  <TableHead>
                    <span className="font-arabic">المعلن</span>
                    <br />
                    <span className="text-xs text-gray-500">Advertiser</span>
                  </TableHead>
                  <TableHead>
                    <span className="font-arabic">تاريخ الإصدار</span>
                    <br />
                    <span className="text-xs text-gray-500">Issue Date</span>
                  </TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>
                    <span className="font-arabic">عدد المشاهدات</span>
                    <br />
                    <span className="text-xs text-gray-500">Views</span>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>QR Status</TableHead>
                  <TableHead>
                    <span className="font-arabic">إجراءات</span>
                    <br />
                    <span className="text-xs text-gray-500">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {propertyAdLicenses.map((license) => (
                  <TableRow key={license.id}>
                    <TableCell className="font-medium font-helvetica">{license.id}</TableCell>
                    <TableCell>
                      <div>
                        <p 
                          className="text-sm font-medium font-arabic"
                        >
                          {license.propertyNameAr}
                        </p>
                        <p className="text-xs text-gray-500 font-helvetica">{license.propertyId}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-arabic">{license.propertyTypeAr}</p>
                        <p className="text-xs text-gray-500">{license.propertyType}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-arabic">{license.cityAr}</p>
                        <p className="text-xs text-gray-500">{license.city}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-arabic">
                        {license.advertiser}
                      </span>
                    </TableCell>
                    <TableCell className="font-helvetica">{license.issueDate}</TableCell>
                    <TableCell className="font-helvetica">{license.expiryDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-[#47CCD0]" />
                        <span className="font-helvetica font-medium text-[#47CCD0]">
                          {license.viewCount.toLocaleString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {license.status === "active" && (
                        <Badge className="bg-[#47CCD0] hover:bg-[#47CCD0] text-white">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                      )}
                      {license.status === "expiring" && (
                        <Badge className="bg-orange-500 hover:bg-orange-500">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Expiring Soon
                        </Badge>
                      )}
                      {license.status === "expired" && (
                        <Badge variant="destructive">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Expired
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <QrCode 
                          className={`w-5 h-5 ${
                            license.qrStatus === "valid" 
                              ? "text-[#47CCD0]" 
                              : license.qrStatus === "warning"
                              ? "text-orange-500"
                              : "text-red-500"
                          }`}
                        />
                        <span className={`text-sm ${
                          license.qrStatus === "valid" 
                            ? "text-[#47CCD0]" 
                            : license.qrStatus === "warning"
                            ? "text-orange-500"
                            : "text-red-500"
                        }`}>
                          {license.qrStatus === "valid" && "Valid"}
                          {license.qrStatus === "warning" && "Warning"}
                          {license.qrStatus === "invalid" && "Invalid"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {suspendingLicense === license.id ? (
                        <div className="flex flex-col gap-2 min-w-[200px]">
                          <input
                            type="text"
                            placeholder="سبب التعليق / Suspension Reason"
                            value={suspendReason}
                            onChange={(e) => setSuspendReason(e.target.value)}
                            className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#47CCD0]"
                          />
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              onClick={() => handleSuspendAd(license.id)}
                              className="bg-red-600 hover:bg-red-700 text-white text-xs h-7"
                            >
                              Confirm
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSuspendingLicense(null);
                                setSuspendReason("");
                              }}
                              className="text-xs h-7"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSuspendingLicense(license.id)}
                          className="gap-2 text-red-600 border-red-300 hover:bg-red-50"
                        >
                          <Ban className="w-3 h-3" />
                          <span className="font-arabic">تعليق</span>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}