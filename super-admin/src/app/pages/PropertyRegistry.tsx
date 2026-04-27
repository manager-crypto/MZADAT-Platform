import { useState } from "react";
import { 
  Building2, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Download,
  Filter,
  Search,
  QrCode,
  Shield,
  MapPin,
  Calendar,
  User,
  FileText,
  Eye
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "../context/TranslationContext";

// Property Registry Data
const properties = [
  {
    id: "RYD-45678-L",
    nameAr: "فيلا فاخرة - حي الياسمين",
    nameEn: "Luxury Villa - Al Yasmin District",
    type: "Villa",
    typeAr: "فيلا",
    city: "Riyadh",
    cityAr: "الرياض",
    owner: "أحمد محمد العتيبي",
    ownerEn: "Ahmed Mohammed Al-Otaibi",
    falLicense: "FAL-2026-RYD-45678",
    falStatus: "Active",
    qrStatus: "Verified",
    listedDate: "2026-02-15",
    verificationDate: "2026-02-15",
    expiryDate: "2027-02-15",
    area: "450 m²",
    regaVerified: true
  },
  {
    id: "JED-78901-C",
    nameAr: "أرض تجارية - الكورنيش الشمالي",
    nameEn: "Commercial Land - North Corniche",
    type: "Commercial Land",
    typeAr: "أرض تجارية",
    city: "Jeddah",
    cityAr: "جدة",
    owner: "شركة الخليج العقارية",
    ownerEn: "Gulf Real Estate Company",
    falLicense: "FAL-2026-JED-78901",
    falStatus: "Active",
    qrStatus: "Verified",
    listedDate: "2026-03-01",
    verificationDate: "2026-03-01",
    expiryDate: "2027-03-01",
    area: "1200 m²",
    regaVerified: true
  },
  {
    id: "DMM-23456-R",
    nameAr: "مجمع سكني - حي المرجان",
    nameEn: "Residential Complex - Al Murjan",
    type: "Residential Complex",
    typeAr: "مجمع سكني",
    city: "Dammam",
    cityAr: "الدمام",
    owner: "مؤسسة الشرق للاستثمار",
    ownerEn: "Al Sharq Investment Est.",
    falLicense: "FAL-2026-DMM-23456",
    falStatus: "Pending Renewal",
    qrStatus: "Pending",
    listedDate: "2026-01-10",
    verificationDate: "2026-01-10",
    expiryDate: "2026-04-10",
    area: "3500 m²",
    regaVerified: false
  },
  {
    id: "RYD-89012-A",
    nameAr: "شقة سكنية - برج الفيصلية",
    nameEn: "Apartment - Al Faisaliah Tower",
    type: "Apartment",
    typeAr: "شقة",
    city: "Riyadh",
    cityAr: "الرياض",
    owner: "فاطمة عبدالله السديري",
    ownerEn: "Fatima Abdullah Al-Sudairi",
    falLicense: "FAL-2026-RYD-89012",
    falStatus: "Active",
    qrStatus: "Verified",
    listedDate: "2026-02-20",
    verificationDate: "2026-02-20",
    expiryDate: "2027-02-20",
    area: "280 m²",
    regaVerified: true
  },
  {
    id: "MKH-34567-V",
    nameAr: "فيلا - حي العزيزية",
    nameEn: "Villa - Al Aziziyah",
    type: "Villa",
    typeAr: "فيلا",
    city: "Makkah",
    cityAr: "مكة",
    owner: "خالد أحمد الزهراني",
    ownerEn: "Khalid Ahmed Al-Zahrani",
    falLicense: "FAL-2026-MKH-34567",
    falStatus: "Expired",
    qrStatus: "Invalid",
    listedDate: "2025-12-05",
    verificationDate: "2025-12-05",
    expiryDate: "2026-03-05",
    area: "380 m²",
    regaVerified: false
  },
  {
    id: "JED-56789-W",
    nameAr: "مستودع - المنطقة الصناعية",
    nameEn: "Warehouse - Industrial Area",
    type: "Warehouse",
    typeAr: "مستودع",
    city: "Jeddah",
    cityAr: "جدة",
    owner: "شركة اللوجستيات المتقدمة",
    ownerEn: "Advanced Logistics Co.",
    falLicense: "FAL-2026-JED-56789",
    falStatus: "Active",
    qrStatus: "Verified",
    listedDate: "2026-03-10",
    verificationDate: "2026-03-10",
    expiryDate: "2027-03-10",
    area: "2800 m²",
    regaVerified: true
  }
];

export default function PropertyRegistry() {
  const { theme } = useTheme();
  const { language } = useTranslation();
  const isDark = theme === 'dark';
  const isRTL = language === 'ar';
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCity, setFilterCity] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Filter properties
  const filteredProperties = properties.filter(property => {
    const matchesSearch = 
      property.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.nameAr.includes(searchTerm) ||
      property.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.owner.includes(searchTerm) ||
      property.falLicense.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCity = filterCity === "all" || property.city === filterCity;
    const matchesStatus = filterStatus === "all" || property.falStatus === filterStatus;
    
    return matchesSearch && matchesCity && matchesStatus;
  });

  // Statistics
  const stats = {
    total: properties.length,
    active: properties.filter(p => p.falStatus === "Active").length,
    pending: properties.filter(p => p.falStatus === "Pending Renewal").length,
    expired: properties.filter(p => p.falStatus === "Expired").length,
    verified: properties.filter(p => p.regaVerified).length
  };

  const getFALStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
      case "Pending Renewal":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>;
      case "Expired":
        return <Badge className="bg-red-500 hover:bg-red-600">Expired</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getQRStatusIcon = (status: string) => {
    switch (status) {
      case "Verified":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "Pending":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case "Invalid":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className={`text-4xl font-light ${isDark ? 'text-[#F1F5F9]' : 'text-[#2B3D50]'}`}>
          Property Registry
        </h1>
        <p 
          className={`text-2xl font-light mt-2 ${isDark ? 'text-[#94A3B8]' : 'text-gray-600'}`}
          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
        >
          سجل العقارات - REGA Integration
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className={`border-0 shadow-sm ${isDark ? 'bg-[#1A2836]' : 'bg-white'}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'} mb-1`}>
                  Total Properties
                </p>
                <p className={`text-3xl font-light ${isDark ? 'text-[#F1F5F9]' : 'text-[#2B3D50]'}`}>
                  {stats.total}
                </p>
              </div>
              <Building2 className="w-8 h-8 text-[#47CCD0]" />
            </div>
          </CardContent>
        </Card>

        <Card className={`border-0 shadow-sm ${isDark ? 'bg-[#1A2836]' : 'bg-white'}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'} mb-1`}>
                  Active FAL
                </p>
                <p className={`text-3xl font-light text-green-600`}>
                  {stats.active}
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
                  Pending Renewal
                </p>
                <p className={`text-3xl font-light text-yellow-600`}>
                  {stats.pending}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className={`border-0 shadow-sm ${isDark ? 'bg-[#1A2836]' : 'bg-white'}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'} mb-1`}>
                  Expired
                </p>
                <p className={`text-3xl font-light text-red-600`}>
                  {stats.expired}
                </p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className={`border-0 shadow-sm ${isDark ? 'bg-[#1A2836]' : 'bg-white'}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'} mb-1`}>
                  REGA Verified
                </p>
                <p className={`text-3xl font-light text-[#47CCD0]`}>
                  {stats.verified}
                </p>
              </div>
              <Shield className="w-8 h-8 text-[#47CCD0]" />
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
                placeholder={language === 'ar' ? 'بحث بـ ID، الاسم، المالك، رقم الترخيص...' : 'Search by ID, Name, Owner, License...'}
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

            {/* City Filter */}
            <select
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              className={`px-4 py-2.5 rounded-lg border ${
                isDark 
                  ? 'bg-[#0F1923] border-[#2B3D50] text-[#F1F5F9]' 
                  : 'bg-gray-50 border-gray-200 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-[#47CCD0]/20 focus:border-[#47CCD0]`}
            >
              <option value="all">{language === 'ar' ? 'جميع المدن' : 'All Cities'}</option>
              <option value="Riyadh">{language === 'ar' ? 'الرياض' : 'Riyadh'}</option>
              <option value="Jeddah">{language === 'ar' ? 'جدة' : 'Jeddah'}</option>
              <option value="Dammam">{language === 'ar' ? 'الدمام' : 'Dammam'}</option>
              <option value="Makkah">{language === 'ar' ? 'مكة' : 'Makkah'}</option>
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
              <option value="Active">{language === 'ar' ? 'نشط' : 'Active'}</option>
              <option value="Pending Renewal">{language === 'ar' ? 'قيد التجديد' : 'Pending Renewal'}</option>
              <option value="Expired">{language === 'ar' ? 'منتهي' : 'Expired'}</option>
            </select>

            {/* Export Button */}
            <Button className="bg-[#47CCD0] hover:bg-[#3ab5b9] text-white">
              <Download className="w-4 h-4 mr-2" aria-hidden="true" />
              {language === 'ar' ? 'تصدير' : 'Export'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Properties Table */}
      <Card className={`border-0 shadow-sm ${isDark ? 'bg-[#1A2836]' : 'bg-white'}`}>
        <CardHeader>
          <CardTitle className={`text-xl font-light ${isDark ? 'text-[#F1F5F9]' : 'text-[#2B3D50]'} flex items-center gap-2`}>
            <Building2 className="w-5 h-5 text-[#47CCD0]" />
            {language === 'ar' ? 'سجل العقارات الكامل' : 'Complete Property Registry'}
          </CardTitle>
          <p className={`text-sm ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'}`}>
            {filteredProperties.length} {language === 'ar' ? 'عقار' : 'properties'} • REGA Integrated
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${isDark ? 'border-[#2B3D50]' : 'border-gray-200'}`}>
                  <th className={`${isRTL ? 'text-right' : 'text-left'} px-4 py-3 text-xs font-medium ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'} uppercase`}>
                    Property ID
                  </th>
                  <th className={`${isRTL ? 'text-right' : 'text-left'} px-4 py-3 text-xs font-medium ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'} uppercase`}>
                    {language === 'ar' ? 'الاسم' : 'Name'}
                  </th>
                  <th className={`${isRTL ? 'text-right' : 'text-left'} px-4 py-3 text-xs font-medium ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'} uppercase`}>
                    {language === 'ar' ? 'النوع' : 'Type'}
                  </th>
                  <th className={`${isRTL ? 'text-right' : 'text-left'} px-4 py-3 text-xs font-medium ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'} uppercase`}>
                    {language === 'ar' ? 'المدينة' : 'City'}
                  </th>
                  <th className={`${isRTL ? 'text-right' : 'text-left'} px-4 py-3 text-xs font-medium ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'} uppercase`}>
                    {language === 'ar' ? 'المالك' : 'Owner'}
                  </th>
                  <th className={`${isRTL ? 'text-right' : 'text-left'} px-4 py-3 text-xs font-medium ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'} uppercase`}>
                    FAL License
                  </th>
                  <th className={`${isRTL ? 'text-right' : 'text-left'} px-4 py-3 text-xs font-medium ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'} uppercase`}>
                    QR Status
                  </th>
                  <th className={`${isRTL ? 'text-right' : 'text-left'} px-4 py-3 text-xs font-medium ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'} uppercase`}>
                    {language === 'ar' ? 'تاريخ الإدراج' : 'Listed Date'}
                  </th>
                  <th className={`${isRTL ? 'text-right' : 'text-left'} px-4 py-3 text-xs font-medium ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'} uppercase`}>
                    {language === 'ar' ? 'إجراءات' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProperties.map((property, index) => (
                  <tr 
                    key={property.id}
                    className={`border-b ${isDark ? 'border-[#2B3D50]' : 'border-gray-100'} ${
                      index % 2 === 0 
                        ? (isDark ? 'bg-[#1A2836]' : 'bg-white')
                        : (isDark ? 'bg-[#162230]' : 'bg-gray-50')
                    } hover:${isDark ? 'bg-[#2B3D50]/30' : 'bg-gray-100'} transition-colors`}
                  >
                    <td className={`px-4 py-4 text-sm font-mono ${isDark ? 'text-[#47CCD0]' : 'text-[#47CCD0]'} font-medium`}>
                      {property.id}
                    </td>
                    <td className={`px-4 py-4`}>
                      <div>
                        <p 
                          className={`text-sm font-medium ${isDark ? 'text-[#F1F5F9]' : 'text-gray-900'}`}
                          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                        >
                          {language === 'ar' ? property.nameAr : property.nameEn}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'}`}>
                          {property.area}
                        </p>
                      </div>
                    </td>
                    <td className={`px-4 py-4 text-sm ${isDark ? 'text-[#F1F5F9]' : 'text-gray-900'}`}>
                      {language === 'ar' ? property.typeAr : property.type}
                    </td>
                    <td className={`px-4 py-4 text-sm ${isDark ? 'text-[#F1F5F9]' : 'text-gray-900'}`}>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        {language === 'ar' ? property.cityAr : property.city}
                      </div>
                    </td>
                    <td 
                      className={`px-4 py-4 text-sm ${isDark ? 'text-[#F1F5F9]' : 'text-gray-900'}`}
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {language === 'ar' ? property.owner : property.ownerEn}
                    </td>
                    <td className={`px-4 py-4`}>
                      <div className="space-y-1">
                        <p className={`text-xs font-mono ${isDark ? 'text-[#94A3B8]' : 'text-gray-600'}`}>
                          {property.falLicense}
                        </p>
                        {getFALStatusBadge(property.falStatus)}
                      </div>
                    </td>
                    <td className={`px-4 py-4`}>
                      <div className="flex items-center gap-2">
                        {getQRStatusIcon(property.qrStatus)}
                        <span className={`text-xs ${isDark ? 'text-[#94A3B8]' : 'text-gray-600'}`}>
                          {property.qrStatus}
                        </span>
                      </div>
                    </td>
                    <td className={`px-4 py-4 text-sm ${isDark ? 'text-[#94A3B8]' : 'text-gray-600'}`}>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        {property.listedDate}
                      </div>
                    </td>
                    <td className={`px-4 py-4`}>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 px-2"
                          aria-label={language === 'ar' ? 'عرض التفاصيل' : 'View details'}
                        >
                          <Eye className="w-4 h-4" aria-hidden="true" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 px-2"
                          aria-label={language === 'ar' ? 'رمز QR' : 'QR Code'}
                        >
                          <QrCode className="w-4 h-4" aria-hidden="true" />
                        </Button>
                      </div>
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
