import { TrendingUp, Activity, MapPin, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const regionalData = [
  { region: "Riyadh", regionAr: "الرياض", auctions: 245, revenue: 45.2 },
  { region: "Jeddah", regionAr: "جدة", auctions: 189, revenue: 38.7 },
  { region: "Dammam", regionAr: "الدمام", auctions: 156, revenue: 29.4 },
  { region: "Makkah", regionAr: "مكة", auctions: 98, revenue: 18.5 },
  { region: "Madinah", regionAr: "المدينة", auctions: 87, revenue: 16.2 },
  { region: "Others", regionAr: "أخرى", auctions: 125, revenue: 22.1 },
];

const monthlyPerformance = [
  { month: "Oct", monthAr: "أكتوبر", auctions: 412, users: 4523, revenue: 38.5 },
  { month: "Nov", monthAr: "نوفمبر", auctions: 445, users: 4892, revenue: 42.3 },
  { month: "Dec", monthAr: "ديسمبر", auctions: 478, users: 5234, revenue: 45.8 },
  { month: "Jan", monthAr: "يناير", auctions: 523, users: 5678, revenue: 51.2 },
  { month: "Feb", monthAr: "فبراير", auctions: 567, users: 5892, revenue: 56.7 },
  { month: "Mar", monthAr: "مارس", auctions: 589, users: 6145, revenue: 58.9 },
];

const packageDistribution = [
  { name: "50 Licenses", value: 425, color: "#47CCD0" },
  { name: "150 Licenses", value: 312, color: "#2B3D50" },
  { name: "250 Licenses", value: 187, color: "#000000" },
];

const saudiRegions = [
  { name: "الرياض", count: 245, lat: 24.7136, lng: 46.6753, intensity: "high" },
  { name: "جدة", count: 189, lat: 21.4858, lng: 39.1925, intensity: "high" },
  { name: "الدمام", count: 156, lat: 26.4367, lng: 50.1039, intensity: "medium" },
  { name: "مكة", count: 98, lat: 21.3891, lng: 39.8579, intensity: "medium" },
  { name: "المدينة", count: 87, lat: 24.5247, lng: 39.5692, intensity: "medium" },
  { name: "الطائف", count: 54, lat: 21.2703, lng: 40.4150, intensity: "low" },
  { name: "تبوك", count: 42, lat: 28.3838, lng: 36.5550, intensity: "low" },
  { name: "حائل", count: 38, lat: 27.5236, lng: 41.7008, intensity: "low" },
];

export default function Analytics() {
  const maxAuctions = Math.max(...monthlyPerformance.map(d => d.auctions));
  const maxUsers = Math.max(...monthlyPerformance.map(d => d.users));
  const maxRegionalAuctions = Math.max(...regionalData.map(d => d.auctions));
  const totalPackages = packageDistribution.reduce((sum, pkg) => sum + pkg.value, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-light text-[#2B3D50]">Performance & KPI Analytics</h1>
        <p 
          className="text-2xl font-light text-gray-600 mt-2"
          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
        >
          تحليلات الأداء ومؤشرات الأداء الرئيسية
        </p>
      </div>

      {/* Live Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-light text-[#2B3D50]">
              Service Availability
            </CardTitle>
            <p 
              className="text-sm text-gray-500"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              توافر الخدمة
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center" style={{ height: '250px' }}>
              {/* Custom Circular Gauge */}
              <div className="relative" style={{ width: '200px', height: '200px' }}>
                <svg width="200" height="200" viewBox="0 0 200 200">
                  {/* Background arc */}
                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="20"
                    strokeLinecap="round"
                  />
                  {/* Progress arc - 99.9% of 180 degrees */}
                  <path
                    d="M 20 100 A 80 80 0 0 1 179.8 100"
                    fill="none"
                    stroke="#47CCD0"
                    strokeWidth="20"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="font-light text-[#2B3D50] text-[36px]">99.9%</div>
                  <div className="text-sm text-gray-500 mt-1">Target: 99.9%</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-3 h-3 bg-[#47CCD0] rounded-full"></div>
              <span className="text-sm text-gray-600">Excellent Performance</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-light text-[#2B3D50]">
              Customer Satisfaction
            </CardTitle>
            <p 
              className="text-sm text-gray-500"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              رضا العملاء
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center" style={{ height: '250px' }}>
              {/* Custom Circular Gauge */}
              <div className="relative" style={{ width: '200px', height: '200px' }}>
                <svg width="200" height="200" viewBox="0 0 200 200">
                  {/* Background arc */}
                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="20"
                    strokeLinecap="round"
                  />
                  {/* Progress arc - 75% of 180 degrees = 135 degrees */}
                  <path
                    d="M 20 100 A 80 80 0 0 1 156.6 43.4"
                    fill="none"
                    stroke="#2B3D50"
                    strokeWidth="20"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="font-light text-[#2B3D50] text-[36px]">75%</div>
                  <div className="text-sm text-gray-500 mt-1">Target: 80%</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-3 h-3 bg-[#2B3D50] rounded-full"></div>
              <span className="text-sm text-gray-600">Good - Room for Improvement</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Performance Trends */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-light text-[#2B3D50]">
            Monthly Performance Trends
          </CardTitle>
          <p 
            className="text-sm text-gray-500"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            اتجاهات الأداء الشهري
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] flex flex-col">
            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#47CCD0] rounded-full"></div>
                <span className="text-sm text-gray-600">Total Auctions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#2B3D50] rounded-full"></div>
                <span className="text-sm text-gray-600">Active Users</span>
              </div>
            </div>

            {/* Custom Line Chart */}
            <div className="flex-1 relative px-8 pb-8">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between px-8 pb-8">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={`grid-${i}`} className="border-t border-gray-200"></div>
                ))}
              </div>

              {/* Line paths using SVG */}
              <svg className="absolute inset-0 w-full h-full px-8 pb-8" preserveAspectRatio="none">
                {/* Auctions line */}
                <polyline
                  points={monthlyPerformance.map((d, i) => {
                    const x = (i / (monthlyPerformance.length - 1)) * 100;
                    const y = 100 - ((d.auctions / maxAuctions) * 100);
                    return `${x}%,${y}%`;
                  }).join(' ')}
                  fill="none"
                  stroke="#47CCD0"
                  strokeWidth="3"
                  vectorEffect="non-scaling-stroke"
                />
                {/* Users line */}
                <polyline
                  points={monthlyPerformance.map((d, i) => {
                    const x = (i / (monthlyPerformance.length - 1)) * 100;
                    const y = 100 - ((d.users / maxUsers) * 100);
                    return `${x}%,${y}%`;
                  }).join(' ')}
                  fill="none"
                  stroke="#2B3D50"
                  strokeWidth="3"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* X-axis labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between px-8 text-xs text-gray-600">
                {monthlyPerformance.map((d, i) => (
                  <div key={`month-${i}`}>{d.month}</div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regional Distribution */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-light text-[#2B3D50]">
              Regional Auction Distribution
            </CardTitle>
            <p 
              className="text-sm text-gray-500"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              توزيع المزادات الإقليمي
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] flex flex-col justify-end gap-2 p-4">
              {regionalData.map((region, index) => {
                const percentage = (region.auctions / maxRegionalAuctions) * 100;
                return (
                  <div key={`region-${index}`} className="flex items-center gap-3">
                    <div className="w-16 text-xs text-gray-600 text-right">{region.region}</div>
                    <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden h-8">
                      <div 
                        className="h-full bg-[#47CCD0] rounded-lg flex items-center justify-end px-2 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      >
                        <span className="text-xs text-white font-medium">{region.auctions}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Package Distribution */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-light text-[#2B3D50]">
              Advertisement Package Sales
            </CardTitle>
            <p 
              className="text-sm text-gray-500"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              مبيعات باقات الإعلانات
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] flex flex-col items-center justify-center">
              {/* Custom Donut Chart */}
              <div className="relative" style={{ width: '220px', height: '220px' }}>
                <svg width="220" height="220" viewBox="0 0 220 220">
                  {packageDistribution.map((pkg, index) => {
                    const total = totalPackages;
                    let startAngle = 0;
                    for (let i = 0; i < index; i++) {
                      startAngle += (packageDistribution[i].value / total) * 360;
                    }
                    const sweepAngle = (pkg.value / total) * 360;
                    const endAngle = startAngle + sweepAngle;
                    
                    const startRad = (startAngle - 90) * Math.PI / 180;
                    const endRad = (endAngle - 90) * Math.PI / 180;
                    
                    const outerRadius = 100;
                    const innerRadius = 60;
                    
                    const x1 = 110 + outerRadius * Math.cos(startRad);
                    const y1 = 110 + outerRadius * Math.sin(startRad);
                    const x2 = 110 + outerRadius * Math.cos(endRad);
                    const y2 = 110 + outerRadius * Math.sin(endRad);
                    const x3 = 110 + innerRadius * Math.cos(endRad);
                    const y3 = 110 + innerRadius * Math.sin(endRad);
                    const x4 = 110 + innerRadius * Math.cos(startRad);
                    const y4 = 110 + innerRadius * Math.sin(startRad);
                    
                    const largeArc = sweepAngle > 180 ? 1 : 0;
                    
                    const pathData = [
                      `M ${x1} ${y1}`,
                      `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2}`,
                      `L ${x3} ${y3}`,
                      `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}`,
                      'Z'
                    ].join(' ');
                    
                    return (
                      <path
                        key={`slice-${index}`}
                        d={pathData}
                        fill={pkg.color}
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-light text-[#2B3D50]">{totalPackages}</div>
                    <div className="text-xs text-gray-500">Total Sales</div>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                {packageDistribution.map((pkg, index) => {
                  const percentage = ((pkg.value / totalPackages) * 100).toFixed(0);
                  return (
                    <div key={`legend-${index}`} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: pkg.color }}
                      ></div>
                      <span className="text-sm text-gray-600">{pkg.name}: {pkg.value} ({percentage}%)</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Geographical Heatmap */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-light text-[#2B3D50]">
            Geographical Heatmap - Saudi Arabia
          </CardTitle>
          <p 
            className="text-sm text-gray-500"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            الخريطة الحرارية الجغرافية - المملكة العربية السعودية
          </p>
        </CardHeader>
        <CardContent>
          <div className="relative bg-gradient-to-br from-blue-50 to-teal-50 rounded-lg p-8 min-h-[400px]">
            {/* Simplified Saudi Arabia Map Visualization */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {saudiRegions.map((region, index) => (
                <div 
                  key={`saudi-region-${index}`} 
                  className={`p-4 rounded-lg border-2 ${
                    region.intensity === "high" 
                      ? "bg-[#47CCD0]/20 border-[#47CCD0]" 
                      : region.intensity === "medium"
                      ? "bg-[#2B3D50]/10 border-[#2B3D50]/30"
                      : "bg-gray-100 border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin 
                      className={`w-4 h-4 ${
                        region.intensity === "high" 
                          ? "text-[#47CCD0]" 
                          : region.intensity === "medium"
                          ? "text-[#2B3D50]"
                          : "text-gray-400"
                      }`}
                    />
                    <span 
                      className="text-sm font-medium"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {region.name}
                    </span>
                  </div>
                  <div className="text-2xl font-light text-[#2B3D50]">{region.count}</div>
                  <p className="text-xs text-gray-500 mt-1">Active Auctions</p>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-8">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#47CCD0] rounded"></div>
                <span className="text-sm text-gray-600">High Activity (150+)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#2B3D50]/30 rounded"></div>
                <span className="text-sm text-gray-600">Medium Activity (50-150)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <span className="text-sm text-gray-600">Low Activity (&lt;50)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}