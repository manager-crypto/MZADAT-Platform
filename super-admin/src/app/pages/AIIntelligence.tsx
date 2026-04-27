import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Shield,
  Camera,
  Target,
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle,
  MapPin,
  ArrowDown,
  ArrowUp,
  Minus,
  Eye,
  Ban,
  X,
  Users,
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

const pricePredictions = [
  {
    propertyId: "RYD-45678-L",
    propertyNameAr: "فيلا فاخرة - حي الياسمين",
    location: "حي الياسمين، الرياض",
    locationEn: "Al Yasmin, Riyadh",
    startingPrice: 1200000,
    fairMarketValue: 1450000,
    confidence: 87,
    trend: "underpriced",
    predictedFinalBid: 1520000,
    similarProperties: 12,
    priceHistory: [1180000, 1220000, 1190000, 1250000, 1280000, 1310000, 1350000] // Last 7 days
  },
  {
    propertyId: "JED-78901-C",
    propertyNameAr: "أرض تجارية - الكورنيش الشمالي",
    location: "الكورنيش الشمالي، جدة",
    locationEn: "North Corniche, Jeddah",
    startingPrice: 2500000,
    fairMarketValue: 2450000,
    confidence: 92,
    trend: "fair",
    predictedFinalBid: 2650000,
    similarProperties: 8,
    priceHistory: [2420000, 2440000, 2430000, 2450000, 2460000, 2455000, 2450000] // Last 7 days
  },
  {
    propertyId: "DMM-23456-R",
    propertyNameAr: "مجمع سكني - حي المرجان",
    location: "حي المرجان، الدمام",
    locationEn: "Al Murjan, Dammam",
    startingPrice: 3800000,
    fairMarketValue: 3200000,
    confidence: 78,
    trend: "overpriced",
    predictedFinalBid: 3450000,
    similarProperties: 5,
    priceHistory: [3650000, 3580000, 3520000, 3480000, 3420000, 3380000, 3350000] // Last 7 days - declining
  }
];

const documentValidation = [
  {
    id: "DOC-2026-1547",
    propertyId: "RYD-78542-N",
    type: "Deed (Sakk)",
    typeAr: "صك ملكية",
    uploadedBy: "أحمد المطيري",
    uploadDate: "2026-03-17 14:20",
    aiStatus: "Validated",
    confidence: 96,
    issues: [],
    validationChecks: {
      textClarity: "Pass",
      dataConsistency: "Pass",
      stampAuthenticity: "Pass",
      formatCompliance: "Pass"
    }
  },
  {
    id: "DOC-2026-1546",
    propertyId: "JED-45891-C",
    type: "Property Survey",
    typeAr: "مخطط عقاري",
    uploadedBy: "فاطمة السديري",
    uploadDate: "2026-03-17 13:45",
    aiStatus: "Low Quality",
    confidence: 58,
    issues: ["Low resolution image", "Partial text obscured"],
    validationChecks: {
      textClarity: "Fail",
      dataConsistency: "Pass",
      stampAuthenticity: "Warning",
      formatCompliance: "Pass"
    }
  },
  {
    id: "DOC-2026-1545",
    propertyId: "DMM-23456-R",
    type: "Ownership Certificate",
    typeAr: "شهادة ملكية",
    uploadedBy: "سلطان الحربي",
    uploadDate: "2026-03-17 10:30",
    aiStatus: "Inconsistent Data",
    confidence: 45,
    issues: ["Property size mismatch with deed", "Date inconsistency detected"],
    validationChecks: {
      textClarity: "Pass",
      dataConsistency: "Fail",
      stampAuthenticity: "Pass",
      formatCompliance: "Warning"
    }
  },
  {
    id: "DOC-2026-1544",
    propertyId: "MKH-67890-B",
    type: "Building Permit",
    typeAr: "رخصة بناء",
    uploadedBy: "نورة المنصور",
    uploadDate: "2026-03-17 09:15",
    aiStatus: "Validated",
    confidence: 94,
    issues: [],
    validationChecks: {
      textClarity: "Pass",
      dataConsistency: "Pass",
      stampAuthenticity: "Pass",
      formatCompliance: "Pass"
    }
  }
];

// Real-time Fraud Detection Data
const realtimeFraudAlerts = [
  {
    id: "FRD-2026-1234",
    bidderIdMasked: "****5892",
    auctionId: "AUC-2026-00549",
    riskScore: 87,
    alertType: "multiple-devices",
    alertTypeAr: "أجهزة متعددة",
    flagReason: "Multiple accounts from same IP address",
    flagReasonAr: "حسابات متعددة من نفس عنوان IP",
    timestamp: "2026-03-18 10:23:45",
    ipAddress: "156.218.45.***",
    deviceFingerprint: "Mismatch detected"
  },
  {
    id: "FRD-2026-1235",
    bidderIdMasked: "****6145",
    auctionId: "AUC-2026-00547",
    riskScore: 92,
    alertType: "price-manipulation",
    alertTypeAr: "تلاعب بالأسعار",
    flagReason: "Suspicious bid increment pattern - exactly 5% each time",
    flagReasonAr: "نمط زيادة مشبوه - بالضبط 5٪ في كل مرة",
    timestamp: "2026-03-18 10:15:12",
    ipAddress: "156.218.78.***",
    deviceFingerprint: "Normal"
  },
  {
    id: "FRD-2026-1236",
    bidderIdMasked: "****4521",
    auctionId: "AUC-2026-00548",
    riskScore: 55,
    alertType: "shill-bidding",
    alertTypeAr: "مزايدة وهمية",
    flagReason: "Rapid bidding sequence - 12 bids in 3 minutes",
    flagReasonAr: "سلسلة مزايدة سريعة - 12 مزايدة في 3 دقائق",
    timestamp: "2026-03-18 10:05:33",
    ipAddress: "156.218.90.***",
    deviceFingerprint: "Normal"
  },
  {
    id: "FRD-2026-1237",
    bidderIdMasked: "****7834",
    auctionId: "AUC-2026-00545",
    riskScore: 78,
    alertType: "multiple-devices",
    alertTypeAr: "أجهزة متعددة",
    flagReason: "Device fingerprint mismatch - login from new device",
    flagReasonAr: "عدم تطابق بصمة الجهاز - تسجيل دخول من جهاز جديد",
    timestamp: "2026-03-18 09:58:21",
    ipAddress: "156.218.12.***",
    deviceFingerprint: "Mismatch detected"
  },
  {
    id: "FRD-2026-1238",
    bidderIdMasked: "****9012",
    auctionId: "AUC-2026-00550",
    riskScore: 45,
    alertType: "suspicious-ip",
    alertTypeAr: "IPs مشبوهة",
    flagReason: "Bid placed from known VPN/proxy IP address",
    flagReasonAr: "مزايدة من عنوان IP معروف لـ VPN/Proxy",
    timestamp: "2026-03-18 09:42:18",
    ipAddress: "156.218.56.***",
    deviceFingerprint: "Normal"
  },
  {
    id: "FRD-2026-1239",
    bidderIdMasked: "****3456",
    auctionId: "AUC-2026-00546",
    riskScore: 88,
    alertType: "bid-collusion",
    alertTypeAr: "تواطؤ مزايدين",
    flagReason: "Coordinated bidding pattern detected between 2 accounts",
    flagReasonAr: "اكتشاف نمط تواطؤ بين حسابين",
    timestamp: "2026-03-18 09:30:05",
    ipAddress: "156.218.23.***",
    deviceFingerprint: "Normal"
  }
];

// Historical Price Prediction Accuracy Data
const priceAccuracyHistory = [
  {
    auctionId: "AUC-2026-00545",
    propertyName: "قصر ملكي - حي الملقا",
    city: "Riyadh",
    propertyType: "Villa",
    predictedPrice: 5750000,
    actualPrice: 5750000,
    accuracy: 100,
    difference: 0,
    status: "Perfect Match"
  },
  {
    auctionId: "AUC-2026-00544",
    propertyName: "أرض تجارية - شارع التحلية",
    city: "Jeddah",
    propertyType: "Commercial Land",
    predictedPrice: 3200000,
    actualPrice: 3100000,
    accuracy: 96.88,
    difference: -100000,
    status: "High Accuracy"
  },
  {
    auctionId: "AUC-2026-00543",
    propertyName: "فيلا - حي النرجس",
    city: "Riyadh",
    propertyType: "Villa",
    predictedPrice: 2800000,
    actualPrice: 2950000,
    accuracy: 94.92,
    difference: 150000,
    status: "High Accuracy"
  },
  {
    auctionId: "AUC-2026-00542",
    propertyName: "شقة - أبراج السلام",
    city: "Dammam",
    propertyType: "Apartment",
    predictedPrice: 1200000,
    actualPrice: 1180000,
    accuracy: 98.33,
    difference: -20000,
    status: "High Accuracy"
  },
  {
    auctionId: "AUC-2026-00541",
    propertyName: "مجمع سكني - حي الفيصلية",
    city: "Riyadh",
    propertyType: "Residential Complex",
    predictedPrice: 4500000,
    actualPrice: 4200000,
    accuracy: 93.33,
    difference: -300000,
    status: "High Accuracy"
  }
];

// Accuracy Trend Over Time (Last 12 weeks)
const accuracyTrendData = [
  { week: "W1", accuracy: 84 },
  { week: "W2", accuracy: 86 },
  { week: "W3", accuracy: 85 },
  { week: "W4", accuracy: 88 },
  { week: "W5", accuracy: 87 },
  { week: "W6", accuracy: 89 },
  { week: "W7", accuracy: 91 },
  { week: "W8", accuracy: 90 },
  { week: "W9", accuracy: 92 },
  { week: "W10", accuracy: 91 },
  { week: "W11", accuracy: 93 },
  { week: "W12", accuracy: 94 }
];

// Accuracy by City
const accuracyByCity = [
  { city: "Riyadh", cityAr: "الرياض", accuracy: 94, count: 142 },
  { city: "Jeddah", cityAr: "جدة", accuracy: 91, count: 98 },
  { city: "Dammam", cityAr: "الدمام", accuracy: 89, count: 67 },
  { city: "Makkah", cityAr: "مكة", accuracy: 87, count: 54 }
];

// Accuracy by Property Type
const accuracyByType = [
  { type: "Villa", typeAr: "فيلا", accuracy: 95, count: 87 },
  { type: "Apartment", typeAr: "شقة", accuracy: 92, count: 123 },
  { type: "Commercial Land", typeAr: "أرض تجارية", accuracy: 88, count: 56 },
  { type: "Residential Complex", typeAr: "مجمع سكني", accuracy: 90, count: 45 }
];

export default function AIIntelligence() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-4xl font-light text-[#2B3D50]">AI-Driven Intelligence</h1>
        <p 
          className="text-lg sm:text-2xl font-light text-gray-600 mt-2"
          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
        >
          الذكاء الاصطناعي والتحليلات المتقدمة
        </p>
      </div>

      {/* AI System Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-[#47CCD0]/10 to-[#47CCD0]/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#47CCD0] rounded-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Price Prediction</p>
                <p 
                  className="text-xs text-gray-500"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  التنبؤ بالأسعار
                </p>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-light text-[#2B3D50]">87%</span>
              <span className="text-sm text-gray-600">Avg. Accuracy</span>
            </div>
            <Badge className="mt-3 bg-green-500">Active</Badge>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-orange-50/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-orange-500 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Anti-Fraud System</p>
                <p 
                  className="text-xs text-gray-500"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  نظام مكافحة الاحتيال
                </p>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-light text-[#2B3D50]">3</span>
              <span className="text-sm text-gray-600">Active Alerts</span>
            </div>
            <Badge className="mt-3 bg-orange-500">Monitoring</Badge>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-50/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#2B3D50] rounded-lg">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Document AI</p>
                <p 
                  className="text-xs text-gray-500"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  التحقق من المستندات
                </p>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-light text-[#2B3D50]">92%</span>
              <span className="text-sm text-gray-600">Validation Rate</span>
            </div>
            <Badge className="mt-3 bg-green-500">Active</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Price Prediction Dashboard */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-light text-[#2B3D50] flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#47CCD0]" />
            AI Price Prediction Engine
          </CardTitle>
          <p 
            className="text-sm text-gray-500"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            محرك التنبؤ بالأسعار - Fair Market Value Analysis
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 overflow-hidden">
            {pricePredictions.map((prediction, index) => {
              // Calculate percentage for circular progress
              const circumference = 2 * Math.PI * 45; // radius = 45
              const offset = circumference - (prediction.confidence / 100) * circumference;

              // Get price label configuration
              const getPriceLabel = (trend: string) => {
                switch (trend) {
                  case 'underpriced':
                    return {
                      text: 'Underpriced',
                      className: 'bg-[#059669] text-white',
                      icon: <ArrowDown className="w-4 h-4" />
                    };
                  case 'overpriced':
                    return {
                      text: 'Overpriced',
                      className: 'bg-[#DC2626] text-white',
                      icon: <ArrowUp className="w-4 h-4" />
                    };
                  default:
                    return {
                      text: 'Fair Price',
                      className: 'bg-[#47CCD0] text-white',
                      icon: <Minus className="w-4 h-4" />
                    };
                }
              };

              const priceLabel = getPriceLabel(prediction.trend);

              // Calculate progress bar percentages for gradient
              const maxPrice = Math.max(prediction.startingPrice, prediction.fairMarketValue, prediction.predictedFinalBid);
              const startPercent = (prediction.startingPrice / maxPrice) * 100;
              const fairPercent = (prediction.fairMarketValue / maxPrice) * 100;
              const predictedPercent = (prediction.predictedFinalBid / maxPrice) * 100;

              // Sparkline calculation
              const sparklineMax = Math.max(...prediction.priceHistory);
              const sparklineMin = Math.min(...prediction.priceHistory);
              const sparklineRange = sparklineMax - sparklineMin;

              return (
                <div 
                  key={`pred-${index}`}
                  className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  {/* Header Section with Map & Property Info */}
                  <div className="flex flex-col sm:flex-row items-start gap-4 mb-5">
                    {/* Map Preview Thumbnail */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg overflow-hidden border-2 border-[#47CCD0]/30 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <MapPin className="w-8 h-8 text-[#47CCD0]" />
                        </div>
                        <div className="absolute bottom-1 left-1 right-1 bg-white/90 backdrop-blur-sm rounded px-1 py-0.5">
                          <p 
                            className="text-[8px] text-gray-700 text-center truncate"
                            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                          >
                            {prediction.location}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Property Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 
                            className="text-lg font-medium text-[#2B3D50] mb-1"
                            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                          >
                            {prediction.propertyNameAr}
                          </h3>
                          <p className="text-xs text-gray-500 mb-2">{prediction.propertyId}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <MapPin className="w-3 h-3" />
                            <span>{prediction.locationEn}</span>
                          </div>
                        </div>

                        {/* Circular Progress Ring - Confidence Score */}
                        <div className="flex flex-col items-center">
                          <div className="relative w-20 h-20">
                            <svg className="transform -rotate-90" width="80" height="80">
                              {/* Background circle */}
                              <circle
                                cx="40"
                                cy="40"
                                r="34"
                                fill="none"
                                stroke="#E5E7EB"
                                strokeWidth="6"
                              />
                              {/* Progress circle */}
                              <circle
                                cx="40"
                                cy="40"
                                r="34"
                                fill="none"
                                stroke="#47CCD0"
                                strokeWidth="6"
                                strokeLinecap="round"
                                strokeDasharray={circumference}
                                strokeDashoffset={offset}
                                className="transition-all duration-1000"
                              />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="text-base font-medium text-[#2B3D50]">{prediction.confidence}%</span>
                              <span className="text-[8px] text-gray-500">Confidence</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Price Label - Prominent */}
                      <div className="flex items-center gap-3 mt-3">
                        <Badge className={`${priceLabel.className} flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium`}>
                          {priceLabel.icon}
                          {priceLabel.text}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1.5 px-2 py-1 text-xs border-[#47CCD0] text-[#47CCD0]">
                          <Target className="w-3 h-3" />
                          {prediction.similarProperties} Comparables
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Price Information Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Starting Price</p>
                      <p className="text-base font-medium text-gray-700 font-helvetica">
                        SAR {prediction.startingPrice.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-3 bg-[#2B3D50]/5 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Fair Market Value</p>
                      <p className="text-base font-medium text-[#2B3D50] font-helvetica">
                        SAR {prediction.fairMarketValue.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-3 bg-[#47CCD0]/10 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Predicted Final Bid</p>
                      <p className="text-base font-medium text-[#47CCD0] font-helvetica">
                        SAR {prediction.predictedFinalBid.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Gradient Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                      <span>Starting</span>
                      <span>Fair Market</span>
                      <span>Predicted</span>
                    </div>
                    <div className="relative w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                      {/* Gradient fill */}
                      <div 
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{
                          width: `${predictedPercent}%`,
                          background: `linear-gradient(to right, #2B3D50 0%, #2B3D50 ${(startPercent/predictedPercent)*100}%, #47CCD0 ${(fairPercent/predictedPercent)*100}%, #47CCD0 100%)`
                        }}
                      />
                      {/* Markers */}
                      <div 
                        className="absolute top-0 bottom-0 w-0.5 bg-white"
                        style={{ left: `${startPercent}%` }}
                      />
                      <div 
                        className="absolute top-0 bottom-0 w-0.5 bg-white"
                        style={{ left: `${fairPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* 7-Day Trend Sparkline */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Price Trend (Last 7 Days)</p>
                      <div className="flex items-center gap-2">
                        {/* Sparkline */}
                        <svg width="120" height="30" className="overflow-visible">
                          <polyline
                            points={prediction.priceHistory.map((price, i) => {
                              const x = (i / (prediction.priceHistory.length - 1)) * 115;
                              const normalizedValue = sparklineRange > 0 
                                ? ((price - sparklineMin) / sparklineRange)
                                : 0.5;
                              const y = 25 - (normalizedValue * 20);
                              return `${x},${y}`;
                            }).join(' ')}
                            fill="none"
                            stroke={
                              prediction.priceHistory[prediction.priceHistory.length - 1] > prediction.priceHistory[0]
                                ? '#059669'
                                : prediction.priceHistory[prediction.priceHistory.length - 1] < prediction.priceHistory[0]
                                ? '#DC2626'
                                : '#47CCD0'
                            }
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          {/* Data points */}
                          {prediction.priceHistory.map((price, i) => {
                            const x = (i / (prediction.priceHistory.length - 1)) * 115;
                            const normalizedValue = sparklineRange > 0 
                              ? ((price - sparklineMin) / sparklineRange)
                              : 0.5;
                            const y = 25 - (normalizedValue * 20);
                            return (
                              <circle
                                key={i}
                                cx={x}
                                cy={y}
                                r="2"
                                fill={
                                  prediction.priceHistory[prediction.priceHistory.length - 1] > prediction.priceHistory[0]
                                    ? '#059669'
                                    : prediction.priceHistory[prediction.priceHistory.length - 1] < prediction.priceHistory[0]
                                    ? '#DC2626'
                                    : '#47CCD0'
                                }
                              />
                            );
                          })}
                        </svg>
                        <div className="text-xs">
                          {prediction.priceHistory[prediction.priceHistory.length - 1] > prediction.priceHistory[0] ? (
                            <span className="text-green-600 flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              Rising
                            </span>
                          ) : prediction.priceHistory[prediction.priceHistory.length - 1] < prediction.priceHistory[0] ? (
                            <span className="text-red-600 flex items-center gap-1">
                              <ArrowDown className="w-3 h-3" />
                              Falling
                            </span>
                          ) : (
                            <span className="text-[#47CCD0] flex items-center gap-1">
                              <Minus className="w-3 h-3" />
                              Stable
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <Button size="sm" variant="outline" className="border-[#47CCD0] text-[#47CCD0] hover:bg-[#47CCD0]/10">
                      View Full Analysis
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Anti-Fraud System */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-light text-[#2B3D50] flex items-center gap-2">
                <Shield className="w-5 h-5 text-orange-500" />
                Anti-Fraud Detection System
              </CardTitle>
              <p 
                className="text-sm text-gray-500 mt-1"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                نظام كشف الاحتيال - Real-time Monitoring
              </p>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <span className="text-sm text-gray-600">Auto-Exclude:</span>
                <input 
                  type="checkbox" 
                  defaultChecked
                  className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
              </label>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {realtimeFraudAlerts.map((alert, index) => (
              <div 
                key={`fraud-${index}`}
                className={`p-4 sm:p-5 border-2 rounded-xl ${
                  alert.riskScore >= 80 ? "border-red-500 bg-red-50" :
                  alert.riskScore >= 60 ? "border-orange-500 bg-orange-50" :
                  "border-yellow-500 bg-yellow-50"
                }`}
              >
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <AlertTriangle 
                    className="w-5 h-5 flex-shrink-0"
                    style={{ 
                      color: 
                        alert.riskScore >= 80 ? "#DC2626" :
                        alert.riskScore >= 60 ? "#F59E0B" : "#EAB308"
                    }}
                  />
                  <p className="font-medium text-[#2B3D50]">Fraud Alert</p>
                  <Badge 
                    variant="destructive"
                    className={
                      alert.riskScore >= 80 ? "bg-red-600" :
                      alert.riskScore >= 60 ? "bg-orange-600" : "bg-yellow-600"
                    }
                  >
                    {alert.riskScore >= 80 ? "Critical" :
                    alert.riskScore >= 60 ? "High" : "Medium"}
                  </Badge>
                  <Badge 
                    variant="secondary"
                    className="bg-blue-600 hover:bg-blue-700 text-white ml-auto"
                  >
                    Monitoring
                  </Badge>
                </div>

                <p className="text-sm text-gray-700 mb-1">{alert.id} • {alert.auctionId}</p>
                <p 
                  className="text-sm mb-3 break-words"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {alert.flagReason}
                </p>

                <div className="bg-white rounded-lg p-3 mb-3">
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-medium">Pattern Detected:</span> {alert.flagReason}
                  </p>
                  <p className="text-xs text-gray-600">
                    Suspect Account: {alert.bidderIdMasked}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-gray-500" />
                    <span className="text-xs text-gray-600">Confidence: {alert.riskScore}%</span>
                  </div>
                  <span className="text-xs text-gray-500 ml-auto">{alert.timestamp}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <Button size="sm" variant="outline" className="border-red-500 text-red-600 hover:bg-red-50 text-xs">
                    Exclude User
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs">
                    Review Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fraud Detection Dashboard - Real-time Feed */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-light text-[#2B3D50] flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#DC2626]" />
            Real-Time Fraud Detection Dashboard
          </CardTitle>
          <p 
            className="text-sm text-gray-500"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            لوحة التحكم في كشف الاحتيال - مراقبة لحظية
          </p>
        </CardHeader>
        <CardContent>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-red-50 to-red-100/30 rounded-lg border border-red-200">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Total Alerts Today</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-light text-[#DC2626]">6</span>
                    <Badge className="bg-[#DC2626] text-white text-xs">+2 new</Badge>
                  </div>
                </div>
                <AlertCircle className="w-8 h-8 text-[#DC2626]" />
              </div>
              <p className="text-xs text-gray-500">Last alert: 5 mins ago</p>
            </div>

            <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100/30 rounded-lg border border-orange-200">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Blocked Bidders</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-light text-[#F59E0B]">12</span>
                    <Badge className="bg-[#F59E0B] text-white text-xs">This month</Badge>
                  </div>
                </div>
                <Ban className="w-8 h-8 text-[#F59E0B]" />
              </div>
              <p className="text-xs text-gray-500">Prevention rate: 94%</p>
            </div>

            <div className="p-4 bg-gradient-to-br from-teal-50 to-teal-100/30 rounded-lg border border-teal-200">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-xs text-gray-600 mb-1">False Positive Rate</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-light text-[#47CCD0]">3.2%</span>
                    <Badge className="bg-[#47CCD0] text-white text-xs">Excellent</Badge>
                  </div>
                </div>
                <CheckCircle className="w-8 h-8 text-[#47CCD0]" />
              </div>
              <p className="text-xs text-gray-500">Accuracy: 96.8%</p>
            </div>
          </div>

          {/* Alert Feed */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-[#2B3D50]">Live Fraud Alerts</h4>
              <Badge variant="outline" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                Real-time
              </Badge>
            </div>

            {realtimeFraudAlerts.map((alert, index) => {
              // Calculate risk zone
              const getRiskZone = (score: number) => {
                if (score >= 70) return { zone: 'red', color: '#DC2626', bg: '#FEE2E2', label: 'Critical' };
                if (score >= 40) return { zone: 'yellow', color: '#F59E0B', bg: '#FEF3C7', label: 'Warning' };
                return { zone: 'green', color: '#47CCD0', bg: '#D1FAE5', label: 'Low Risk' };
              };

              const risk = getRiskZone(alert.riskScore);

              // Circular gauge calculation
              const circumference = 2 * Math.PI * 32;
              const offset = circumference - (alert.riskScore / 100) * circumference;

              return (
                <div 
                  key={`realtime-${index}`}
                  className="p-4 sm:p-5 border-2 rounded-xl transition-all duration-300 hover:shadow-md"
                  style={{ 
                    borderColor: risk.color,
                    backgroundColor: risk.bg
                  }}
                >
                  {/* Top: ID + Badge + Gauge */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs text-gray-500 font-mono">{alert.id}</span>
                        <Badge 
                          className="text-white text-xs"
                          style={{ backgroundColor: risk.color }}
                        >
                          {risk.label}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div>
                          <span className="text-xs text-gray-500">Bidder ID: </span>
                          <span className="font-mono font-medium text-gray-900">{alert.bidderIdMasked}</span>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500">Auction: </span>
                          <span className="font-medium text-gray-900">{alert.auctionId}</span>
                        </div>
                      </div>
                    </div>
                    {/* Circular Risk Gauge */}
                    <div className="flex-shrink-0">
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                        <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 80 80">
                          <circle cx="40" cy="40" r="32" fill="none" stroke="#E5E7EB" strokeWidth="6" />
                          <circle
                            cx="40" cy="40" r="32" fill="none"
                            stroke={risk.color} strokeWidth="6" strokeLinecap="round"
                            strokeDasharray={circumference} strokeDashoffset={offset}
                            className="transition-all duration-1000"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-sm sm:text-base font-semibold" style={{ color: risk.color }}>
                            {alert.riskScore}
                          </span>
                          <span className="text-[7px] sm:text-[8px] text-gray-600">Risk Score</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Flag Reason Box */}
                  <div className="bg-white/70 rounded-lg p-3 mb-3">
                    <p className="text-xs text-gray-500 mb-1">Flag Reason:</p>
                    <p className="text-sm text-gray-900 font-medium break-words">{alert.flagReason}</p>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-2 text-xs text-gray-600">
                      <span>IP: {alert.ipAddress}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>Device: {alert.deviceFingerprint}</span>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="flex flex-wrap items-center gap-2">
                    <Button size="sm" variant="outline" className="h-7 px-3 text-xs gap-1">
                      <Eye className="w-3 h-3" />
                      Review
                    </Button>
                    <Button size="sm" className="h-7 px-3 text-xs gap-1 bg-[#DC2626] hover:bg-[#B91C1C] text-white">
                      <Ban className="w-3 h-3" />
                      Block Bidder
                    </Button>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 ml-auto">
                      <Clock className="w-3 h-3" />
                      <span>{alert.timestamp}</span>
                    </div>
                  </div>
                  <div className="flex justify-center mt-2">
                    <Button size="sm" variant="ghost" className="h-6 px-2 text-xs text-gray-400">
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Risk Score Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#DC2626] rounded"></div>
              <span className="text-xs text-gray-600">Red Zone (70-100) - Critical</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#F59E0B] rounded"></div>
              <span className="text-xs text-gray-600">Yellow Zone (40-69) - Warning</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#47CCD0] rounded"></div>
              <span className="text-xs text-gray-600">Green Zone (0-39) - Low Risk</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Image Recognition */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-light text-[#2B3D50] flex items-center gap-2">
            <Camera className="w-5 h-5 text-[#2B3D50]" />
            AI Document Validation - Image Recognition
          </CardTitle>
          <p 
            className="text-sm text-gray-500"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            التحقق من المستندات بالذكاء الاصطناعي
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {documentValidation.map((doc, index) => (
              <div 
                key={`doc-${index}`}
                className={`p-5 rounded-lg border-2 ${
                  doc.aiStatus === "Validated" ? "border-green-500 bg-green-50" :
                  doc.aiStatus === "Low Quality" ? "border-orange-500 bg-orange-50" :
                  "border-red-500 bg-red-50"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <p className="font-medium text-[#2B3D50]">{doc.type}</p>
                      <p 
                        className="text-sm text-gray-600"
                        style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                      >
                        ({doc.typeAr})
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">{doc.id} • {doc.propertyId}</p>
                  </div>
                  {doc.aiStatus === "Validated" ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : doc.aiStatus === "Low Quality" ? (
                    <AlertCircle className="w-6 h-6 text-orange-600" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600" />
                  )}
                </div>

                <Badge 
                  className={`mb-3 ${
                    doc.aiStatus === "Validated" ? "bg-green-600" :
                    doc.aiStatus === "Low Quality" ? "bg-orange-600" :
                    "bg-red-600"
                  }`}
                >
                  {doc.aiStatus}
                </Badge>

                <div className="mb-3">
                  <p className="text-xs text-gray-600 mb-2">AI Confidence Score:</p>
                  <div className="w-full bg-white rounded-full h-3">
                    <div 
                      className="h-3 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${doc.confidence}%`,
                        backgroundColor: 
                          doc.confidence >= 80 ? '#16A34A' :
                          doc.confidence >= 60 ? '#F59E0B' : '#DC2626'
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 text-right mt-1">{doc.confidence}%</p>
                </div>

                <div className="bg-white rounded p-3 mb-3 space-y-2">
                  <p className="text-xs font-medium text-gray-700 mb-2">Validation Checks:</p>
                  {Object.entries(doc.validationChecks).map(([check, status], idx) => (
                    <div key={`check-${idx}`} className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 capitalize">{check.replace(/([A-Z])/g, ' $1').trim()}:</span>
                      <Badge 
                        variant={
                          status === "Pass" ? "default" :
                          status === "Warning" ? "secondary" : "destructive"
                        }
                        className={`text-xs ${
                          status === "Pass" ? "bg-green-500" :
                          status === "Warning" ? "bg-yellow-500" : ""
                        }`}
                      >
                        {status}
                      </Badge>
                    </div>
                  ))}
                </div>

                {doc.issues.length > 0 && (
                  <div className="bg-white rounded p-3 mb-3">
                    <p className="text-xs font-medium text-red-700 mb-2">Issues Detected:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {doc.issues.map((issue, idx) => (
                        <li key={`issue-${idx}`} className="text-xs text-red-600">{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div>
                    <p 
                      className="text-xs text-gray-600"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {doc.uploadedBy}
                    </p>
                    <p className="text-xs text-gray-500">{doc.uploadDate}</p>
                  </div>
                  <Button size="sm" variant="outline" className="text-[#2B3D50]">
                    View Document
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}