import { 
  Briefcase, 
  Camera, 
  FileCheck, 
  Ruler,
  MapPin,
  Clock,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageSquare,
  Send,
  Filter,
  Search,
  TrendingUp,
  DollarSign,
  Award,
  Users,
  Zap,
  Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { useState } from "react";

const serviceCategories = [
  { 
    id: "photography", 
    name: "Professional Photography", 
    nameAr: "التصوير الاحترافي",
    icon: Camera,
    color: "#47CCD0",
    count: 23
  },
  { 
    id: "valuation", 
    name: "Property Valuation", 
    nameAr: "التقييم العقاري",
    icon: DollarSign,
    color: "#2B3D50",
    count: 18
  },
  { 
    id: "legal", 
    name: "Legal Surveying", 
    nameAr: "المسح القانوني",
    icon: FileCheck,
    color: "#47CCD0",
    count: 12
  },
  { 
    id: "measurement", 
    name: "Property Measurement", 
    nameAr: "قياس العقار",
    icon: Ruler,
    color: "#2B3D50",
    count: 15
  }
];

const serviceRequests = [
  {
    id: "REQ-2026-0847",
    advertiser: "حمد المطيري",
    advertiserContact: "+966 50 123 4567",
    propertyId: "RYD-45678-L",
    propertyName: "فيلا فاخرة - حي الياسمين",
    propertyType: "Residential Villa",
    location: "Riyadh - Al Yasmin",
    serviceType: "photography",
    serviceName: "Professional Photography",
    serviceNameAr: "التصوير الاحترافي",
    urgency: "High",
    requestDate: "2026-03-17 14:23",
    preferredDate: "2026-03-20",
    status: "Pending",
    budget: "2,500",
    description: "Need high-quality photos for luxury villa auction listing",
    descriptionAr: "بحاجة إلى صور عالية الجودة لقائمة مزاد فيلا فاخرة"
  },
  {
    id: "REQ-2026-0846",
    advertiser: "شركة العقارات المتحدة",
    advertiserContact: "+966 55 987 6543",
    propertyId: "JED-78901-C",
    propertyName: "أرض تجارية - الكورنيش الشمالي",
    propertyType: "Commercial Land",
    location: "Jeddah - North Corniche",
    serviceType: "valuation",
    serviceName: "Property Valuation",
    serviceNameAr: "التقييم العقاري",
    urgency: "Critical",
    requestDate: "2026-03-17 13:45",
    preferredDate: "2026-03-19",
    status: "Assigned",
    assignedTo: "مكتب الخبرة للتقييم",
    budget: "5,000",
    description: "Urgent valuation needed for commercial land auction",
    descriptionAr: "مطلوب تقييم عاجل لأرض تجارية للمزاد"
  },
  {
    id: "REQ-2026-0845",
    advertiser: "فاطمة السديري",
    advertiserContact: "+966 54 234 5678",
    propertyId: "DMM-23456-R",
    propertyName: "مجمع سكني - حي المرجان",
    propertyType: "Residential Complex",
    location: "Dammam - Al Marjan",
    serviceType: "legal",
    serviceName: "Legal Surveying",
    serviceNameAr: "المسح القانوني",
    urgency: "Normal",
    requestDate: "2026-03-17 10:15",
    preferredDate: "2026-03-25",
    status: "In Progress",
    assignedTo: "مكتب المحاماة الشامل",
    budget: "8,000",
    description: "Legal survey and documentation verification",
    descriptionAr: "مسح قانوني والتحقق من المستندات"
  },
  {
    id: "REQ-2026-0844",
    advertiser: "سلطان الحربي",
    advertiserContact: "+966 50 876 5432",
    propertyId: "MKH-67890-B",
    propertyName: "قصر فاخر - حي المروج",
    propertyType: "Palace",
    location: "Makkah - Al Morooj",
    serviceType: "measurement",
    serviceName: "Property Measurement",
    serviceNameAr: "قياس العقار",
    urgency: "Normal",
    requestDate: "2026-03-17 09:30",
    preferredDate: "2026-03-22",
    status: "Pending",
    budget: "3,500",
    description: "Accurate measurement and floor plan documentation",
    descriptionAr: "قياس دقيق وتوثيق المخطط الأرضي"
  }
];

const serviceProviders = [
  {
    id: "PRV-2026-1247",
    name: "استوديو النور للتصوير",
    nameEn: "Al-Noor Photography Studio",
    category: "photography",
    rating: 4.8,
    completedJobs: 156,
    activeJobs: 3,
    verificationStatus: "Verified",
    commercialReg: "CR-1234567890",
    license: "PHL-2024-5678",
    licenseExpiry: "2027-12-31",
    joinDate: "2024-03-15",
    location: "Riyadh",
    contact: "+966 50 234 5678",
    email: "info@alnoor.sa",
    completionRate: 94,
    avgResponseTime: "2h 30m",
    customerSatisfaction: 4.8,
    earnings: "245,000"
  },
  {
    id: "PRV-2026-1246",
    name: "مكتب الخبرة للتقييم",
    nameEn: "Expert Valuation Office",
    category: "valuation",
    rating: 4.9,
    completedJobs: 234,
    activeJobs: 5,
    verificationStatus: "Verified",
    commercialReg: "CR-9876543210",
    license: "VAL-2024-3456",
    licenseExpiry: "2027-06-30",
    joinDate: "2023-11-20",
    location: "Jeddah",
    contact: "+966 55 345 6789",
    email: "contact@expertval.sa",
    completionRate: 97,
    avgResponseTime: "1h 45m",
    customerSatisfaction: 4.9,
    earnings: "587,000"
  },
  {
    id: "PRV-2026-1245",
    name: "مكتب المحاماة الشامل",
    nameEn: "Comprehensive Legal Office",
    category: "legal",
    rating: 4.7,
    completedJobs: 189,
    activeJobs: 4,
    verificationStatus: "Pending Review",
    commercialReg: "CR-5555666677",
    license: "LGL-2024-8901",
    licenseExpiry: "2026-09-15",
    joinDate: "2024-01-10",
    location: "Dammam",
    contact: "+966 54 456 7890",
    email: "legal@shamel.sa",
    completionRate: 91,
    avgResponseTime: "3h 15m",
    customerSatisfaction: 4.7,
    earnings: "412,000"
  },
  {
    id: "PRV-2026-1244",
    name: "مكتب الدقة للقياس",
    nameEn: "Precision Measurement Office",
    category: "measurement",
    rating: 4.6,
    completedJobs: 142,
    activeJobs: 2,
    verificationStatus: "Verified",
    commercialReg: "CR-7777888899",
    license: "MSR-2024-2345",
    licenseExpiry: "2028-03-31",
    joinDate: "2023-08-05",
    location: "Riyadh",
    contact: "+966 50 567 8901",
    email: "info@precision.sa",
    completionRate: 89,
    avgResponseTime: "4h 00m",
    customerSatisfaction: 4.6,
    earnings: "298,000"
  }
];

const performanceKPIs = [
  {
    label: "Average Fulfillment Time",
    labelAr: "متوسط وقت التنفيذ",
    value: "3.5 days",
    trend: "down",
    change: "-12%",
    icon: Clock,
    color: "#47CCD0"
  },
  {
    label: "Provider Growth Rate",
    labelAr: "معدل نمو مقدمي الخدمات",
    value: "+23%",
    trend: "up",
    change: "+5%",
    icon: TrendingUp,
    color: "#2B3D50"
  },
  {
    label: "Customer Satisfaction",
    labelAr: "رضا العملاء",
    value: "4.7/5.0",
    trend: "up",
    change: "+0.3",
    icon: Star,
    color: "#47CCD0"
  },
  {
    label: "Total Commissions",
    labelAr: "إجمالي العمولات",
    value: "SAR 142K",
    trend: "up",
    change: "+18%",
    icon: DollarSign,
    color: "#2B3D50"
  }
];

const messageTemplates = [
  { id: "doc_missing", text: "Documentation Missing - Please provide required documents", textAr: "المستندات المفقودة - يرجى تقديم المستندات المطلوبة" },
  { id: "task_overdue", text: "Task Overdue - Please update status immediately", textAr: "المهمة متأخرة - يرجى تحديث الحالة فوراً" },
  { id: "clarification", text: "Clarification Required - Additional information needed", textAr: "مطلوب توضيح - معلومات إضافية مطلوبة" },
  { id: "approved", text: "Request Approved - Please proceed with service delivery", textAr: "الطلب معتمد - يرجى المتابعة مع تقديم الخدمة" }
];

export default function ServicesManagement() {
  const [selectedRequest, setSelectedRequest] = useState(serviceRequests[0]);
  const [selectedProvider, setSelectedProvider] = useState<typeof serviceProviders[0] | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterUrgency, setFilterUrgency] = useState<string>("all");
  const [showMessaging, setShowMessaging] = useState(false);

  const filteredRequests = serviceRequests.filter(req => {
    const categoryMatch = filterCategory === "all" || req.serviceType === filterCategory;
    const urgencyMatch = filterUrgency === "all" || req.urgency === filterUrgency;
    return categoryMatch && urgencyMatch;
  });

  const suggestedProviders = serviceProviders.filter(
    provider => provider.category === selectedRequest.serviceType && 
    provider.verificationStatus === "Verified"
  ).sort((a, b) => b.rating - a.rating);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-4xl font-light text-[#2B3D50]">Additional Services Management</h1>
        <p 
          className="text-lg sm:text-2xl font-light text-gray-600 mt-1 sm:mt-2"
          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
        >
          إدارة الخدمات الإضافية والموردين
        </p>
      </div>

      {/* Service Categories Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {serviceCategories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setFilterCategory(category.id)}
              className={`flex flex-col w-full p-3 sm:p-4 rounded-xl border-2 transition-all text-start hover:shadow-md overflow-hidden h-full whitespace-normal ${
                filterCategory === category.id
                  ? 'border-[#47CCD0] bg-[#47CCD0]/5'
                  : 'border-gray-200 hover:border-[#47CCD0]/50 bg-white'
              }`}
            >
              <div className="flex items-start justify-between w-full mb-3 gap-2">
                <div 
                  className="p-2 rounded-lg shrink-0"
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: category.color }} />
                </div>
                <Badge variant="secondary" className="bg-[#2B3D50] text-white shrink-0 text-[10px] sm:text-xs">
                  {category.count}
                </Badge>
              </div>
              <div className="flex flex-col gap-1 w-full">
                <p 
                  className="text-[11px] sm:text-sm font-bold text-[#2B3D50] leading-tight break-words"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {category.nameAr}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500 leading-tight break-words font-medium">
                  {category.name}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Performance KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceKPIs.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={`kpi-${index}`} className="border-0 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div 
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${kpi.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: kpi.color }} />
                  </div>
                  <Badge 
                    variant={kpi.trend === "up" ? "default" : "secondary"}
                    className={kpi.trend === "up" ? "bg-green-500" : "bg-gray-500"}
                  >
                    {kpi.change}
                  </Badge>
                </div>
                <p 
                  className="text-xs text-gray-500 mb-1"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {kpi.labelAr}
                </p>
                <p className="text-xs text-gray-600 mb-2">{kpi.label}</p>
                <p className="text-2xl font-light text-[#2B3D50]">{kpi.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Split View: Master-Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Master: Request List */}
        <Card className="border-0 shadow-sm lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl font-light text-[#2B3D50] flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#47CCD0]" />
              Service Requests
            </CardTitle>
            <p 
              className="text-sm text-gray-500"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              طلبات الخدمات
            </p>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full sm:flex-1 px-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#47CCD0]"
              >
                <option value="all">All Services</option>
                {serviceCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <select
                value={filterUrgency}
                onChange={(e) => setFilterUrgency(e.target.value)}
                className="w-full sm:flex-1 px-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#47CCD0]"
              >
                <option value="all">All Urgency</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Normal">Normal</option>
              </select>
            </div>

            {/* Request List */}
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {filteredRequests.map((request) => (
                <button
                  key={request.id}
                  onClick={() => setSelectedRequest(request)}
                  className={`flex flex-col w-full p-3 sm:p-4 rounded-lg border-2 text-start transition-all overflow-hidden whitespace-normal ${
                    selectedRequest.id === request.id
                      ? 'border-[#47CCD0] bg-[#47CCD0]/5'
                      : 'border-gray-200 hover:border-[#47CCD0]/50 bg-white'
                  }`}
                >
                  {/* Row 1: Property Name */}
                  <p 
                    className="text-xs sm:text-sm font-bold text-[#2B3D50] mb-2 line-clamp-2 w-full"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {request.propertyName}
                  </p>
                  
                  {/* Row 2: Service type */}
                  <div className="flex items-center gap-1.5 mb-2 w-full">
                    {serviceCategories.find(c => c.id === request.serviceType)?.icon && (
                      (() => {
                        const ServiceIcon = serviceCategories.find(c => c.id === request.serviceType)!.icon;
                        return <ServiceIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[#47CCD0] shrink-0" />;
                      })()
                    )}
                    <p className="text-[11px] sm:text-xs text-gray-600 truncate flex-1">{request.serviceName}</p>
                    <span className="text-[10px] text-gray-400 shrink-0 bg-gray-100 px-1.5 py-0.5 rounded-sm">{request.id}</span>
                  </div>

                  {/* Row 3: Badges & Date */}
                  <div className="flex items-center gap-1.5 flex-wrap w-full mt-1">
                    <Badge 
                      variant={request.urgency === "Critical" ? "destructive" : "secondary"}
                      className={`text-[10px] leading-tight px-1.5 py-0.5 ${
                        request.urgency === "High" ? "bg-orange-500 text-white" :
                        request.urgency === "Critical" ? "" : "bg-gray-400 text-white"
                      }`}
                    >
                      {request.urgency}
                    </Badge>
                    <Badge 
                      variant={
                        request.status === "Assigned" ? "default" :
                        request.status === "In Progress" ? "secondary" : "outline"
                      }
                      className={`text-[10px] leading-tight px-1.5 py-0.5 ${
                        request.status === "Assigned" ? "bg-blue-500" :
                        request.status === "In Progress" ? "bg-green-500 text-white" : ""
                      }`}
                    >
                      {request.status}
                    </Badge>
                    <span className="text-[10px] text-gray-400 ml-auto shrink-0">{request.requestDate.split(' ')[0]}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detail: Request Details & Actions */}
        <Card className="border-0 shadow-sm lg:col-span-2">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl font-light text-[#2B3D50]">
                  Request Details
                </CardTitle>
                <p 
                  className="text-sm text-gray-500"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  تفاصيل الطلب
                </p>
              </div>
              <Badge 
                variant={
                  selectedRequest.status === "Assigned" ? "default" :
                  selectedRequest.status === "In Progress" ? "secondary" : "outline"
                }
                className={
                  selectedRequest.status === "Assigned" ? "bg-blue-500" :
                  selectedRequest.status === "In Progress" ? "bg-green-500 text-white" : ""
                }
              >
                {selectedRequest.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Request Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Request ID</p>
                  <p className="text-sm font-medium text-[#2B3D50]">{selectedRequest.id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Service Type</p>
                  <p 
                    className="text-sm font-medium"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {selectedRequest.serviceNameAr}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Advertiser</p>
                  <p 
                    className="text-sm font-medium"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {selectedRequest.advertiser}
                  </p>
                  <p className="text-xs text-gray-500">{selectedRequest.advertiserContact}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Property</p>
                  <p 
                    className="text-sm font-medium"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {selectedRequest.propertyName}
                  </p>
                  <p className="text-xs text-gray-500">{selectedRequest.propertyId}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Location</p>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <p className="text-sm text-gray-700">{selectedRequest.location}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Urgency Level</p>
                  <Badge 
                    variant={selectedRequest.urgency === "Critical" ? "destructive" : "secondary"}
                    className={
                      selectedRequest.urgency === "High" ? "bg-orange-500" :
                      selectedRequest.urgency === "Critical" ? "" : "bg-gray-400"
                    }
                  >
                    {selectedRequest.urgency}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Budget</p>
                  <p className="text-sm font-medium text-[#2B3D50]">SAR {selectedRequest.budget}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Preferred Date</p>
                  <p className="text-sm text-gray-700">{selectedRequest.preferredDate}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-xs text-gray-500 mb-2">Description</p>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p 
                    className="text-sm mb-2"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {selectedRequest.descriptionAr}
                  </p>
                  <p className="text-sm text-gray-600">{selectedRequest.description}</p>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 pt-4 border-t border-gray-200">
                <Button className="flex-1 gap-2 bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  Approve Request
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 gap-2 border-[#47CCD0] text-[#47CCD0] hover:bg-[#47CCD0] hover:text-white text-xs sm:text-sm"
                  onClick={() => setSelectedProvider(suggestedProviders[0])}
                >
                  <Users className="w-4 h-4 shrink-0" />
                  Assign to Provider
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 gap-2 text-xs sm:text-sm"
                  onClick={() => setShowMessaging(!showMessaging)}
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  Request Clarification
                </Button>
              </div>

              {/* Automated Matching */}
              {selectedProvider === null && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-5 h-5 text-[#47CCD0]" />
                    <p className="font-medium text-[#2B3D50]">Automated Provider Matching</p>
                    <Badge className="bg-[#47CCD0]">AI Powered</Badge>
                  </div>
                  <div className="space-y-3">
                    {suggestedProviders.slice(0, 3).map((provider, index) => (
                      <button
                        key={provider.id}
                        onClick={() => setSelectedProvider(provider)}
                        className="flex flex-col w-full p-4 border-2 border-gray-200 rounded-lg hover:border-[#47CCD0] transition-all text-start bg-white whitespace-normal overflow-hidden"
                      >
                        <div className="flex items-start sm:items-center justify-between w-full mb-3 gap-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 shrink-0 bg-gradient-to-br from-[#2B3D50] to-[#47CCD0] rounded-full flex items-center justify-center text-white font-medium">
                              #{index + 1}
                            </div>
                            <div className="flex flex-col">
                              <p 
                                className="font-bold text-[#2B3D50] text-[13px] sm:text-sm leading-tight break-words"
                                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                              >
                                {provider.name}
                              </p>
                              <p className="text-[10px] sm:text-xs text-gray-500 leading-tight mt-0.5">{provider.nameEn}</p>
                            </div>
                          </div>
                          <div className="text-end shrink-0">
                            <div className="flex items-center justify-end gap-1 mb-1">
                              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-[11px] sm:text-sm font-bold text-[#2B3D50]">{provider.rating}</span>
                            </div>
                            <p className="text-[9px] sm:text-xs text-gray-500">{provider.completedJobs} jobs</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-gray-600 flex-wrap w-full mt-1">
                          <span>📍 {provider.location}</span>
                          <span>⚡ {provider.avgResponseTime}</span>
                          <span>✅ {provider.completionRate}%</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Provider Assignment Confirmation */}
              {selectedProvider && (
                <div className="p-5 bg-[#47CCD0]/10 border-2 border-[#47CCD0] rounded-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-medium text-[#2B3D50] mb-1">Selected Provider</p>
                      <p 
                        className="text-lg font-medium"
                        style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                      >
                        {selectedProvider.name}
                      </p>
                      <p className="text-sm text-gray-600">{selectedProvider.nameEn}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedProvider(null)}
                    >
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Rating</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{selectedProvider.rating}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Response Time</p>
                      <p className="text-sm font-medium">{selectedProvider.avgResponseTime}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Completion Rate</p>
                      <p className="text-sm font-medium">{selectedProvider.completionRate}%</p>
                    </div>
                  </div>
                  <Button className="w-full gap-2 bg-[#47CCD0] hover:bg-[#3ab5b9] text-white">
                    <Send className="w-4 h-4" />
                    Confirm Assignment & Notify Provider
                  </Button>
                </div>
              )}

              {/* Quick Messaging */}
              {showMessaging && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="w-5 h-5 text-[#47CCD0]" />
                    <p className="font-medium text-[#2B3D50]">Quick Connect</p>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">Select a template:</p>
                    {messageTemplates.map((template) => (
                      <button
                        key={template.id}
                        className="flex flex-col w-full p-3 border border-gray-200 rounded-lg hover:border-[#47CCD0] hover:bg-[#47CCD0]/5 transition-all text-start whitespace-normal break-words"
                      >
                        <p 
                          className="text-sm mb-1"
                          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                        >
                          {template.textAr}
                        </p>
                        <p className="text-xs text-gray-500">{template.text}</p>
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Or write a custom message..."
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#47CCD0]"
                    />
                    <Button className="gap-2 bg-[#47CCD0] hover:bg-[#3ab5b9] text-white">
                      <Send className="w-4 h-4" />
                      Send
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Provider Management */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="px-3 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="min-w-0">
              <CardTitle className="text-base sm:text-xl font-light text-[#2B3D50] flex items-center gap-2">
                <Award className="w-5 h-5 text-[#47CCD0] shrink-0" />
                Service Provider Marketplace
              </CardTitle>
              <p 
                className="text-xs sm:text-sm text-gray-500"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                سوق مقدمي الخدمات
              </p>
            </div>
            <Button className="gap-2 bg-[#47CCD0] hover:bg-[#3ab5b9] text-white w-full sm:w-auto shrink-0 text-xs sm:text-sm">
              <Users className="w-4 h-4" />
              Add New Provider
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {serviceProviders.map((provider) => {
              const categoryInfo = serviceCategories.find(c => c.id === provider.category);
              const CategoryIcon = categoryInfo?.icon || Briefcase;
              
              return (
                <div 
                  key={provider.id}
                  className="p-5 border-2 border-gray-200 rounded-lg hover:border-[#47CCD0] hover:shadow-lg transition-all"
                >
                  {/* Provider Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${categoryInfo?.color}15` }}
                    >
                      <CategoryIcon className="w-6 h-6" style={{ color: categoryInfo?.color }} />
                    </div>
                    <Badge 
                      variant={provider.verificationStatus === "Verified" ? "default" : "secondary"}
                      className={
                        provider.verificationStatus === "Verified" 
                          ? "bg-green-500" 
                          : "bg-orange-500"
                      }
                    >
                      {provider.verificationStatus}
                    </Badge>
                  </div>

                  {/* Provider Info */}
                  <div className="mb-4">
                    <p 
                      className="font-medium text-sm mb-1"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {provider.name}
                    </p>
                    <p className="text-xs text-gray-500 mb-2">{provider.nameEn}</p>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{provider.rating}</span>
                      <span className="text-xs text-gray-500">({provider.completedJobs} jobs)</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Active Jobs:</span>
                      <Badge variant="secondary" className="bg-blue-500 text-white">
                        {provider.activeJobs}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Completion Rate:</span>
                      <span className="font-medium text-[#47CCD0]">{provider.completionRate}%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Avg Response:</span>
                      <span className="font-medium">{provider.avgResponseTime}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 text-xs"
                    >
                      View Profile
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 text-xs bg-[#2B3D50] hover:bg-[#1f2d3d] text-white"
                    >
                      <Activity className="w-3 h-3 mr-1" />
                      Activity
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}