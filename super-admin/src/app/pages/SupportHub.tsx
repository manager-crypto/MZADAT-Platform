import { 
  Headphones, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  MessageSquare,
  User,
  TrendingUp,
  Filter,
  Search
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

const slaMetrics = [
  {
    category: "Technical",
    categoryAr: "تقنية",
    count: 34,
    avgResponse: "8h",
    status: "good",
    color: "#47CCD0"
  },
  {
    priority: "Critical",
    priorityAr: "حرج",
    count: 3,
    targetResponse: "1h",
    avgResponse: "45m",
    status: "good",
    color: "#DC2626"
  },
  {
    priority: "Urgent",
    priorityAr: "عاجل",
    count: 12,
    targetResponse: "4h",
    avgResponse: "2.5h",
    status: "good",
    color: "#F59E0B"
  },
  {
    priority: "Normal",
    priorityAr: "عادي",
    count: 47,
    targetResponse: "24h",
    avgResponse: "8h",
    status: "good",
    color: "#47CCD0"
  }
];

const tickets = [
  {
    id: "TKT-2026-0847",
    user: "أحمد المطيري",
    userType: "Bidder",
    subject: "فشل في إكمال عملية الدفع",
    subjectEn: "Payment processing failure",
    priority: "Critical",
    status: "In-Progress",
    createdAt: "2026-03-17 14:23",
    responseTime: "32m",
    assignedTo: "محمد السالم",
    slaStatus: "on-track"
  },
  {
    id: "TKT-2026-0846",
    user: "فاطمة الخليفة",
    userType: "Broker",
    subject: "طلب تحديث رخصة FAL",
    subjectEn: "FAL license update request",
    priority: "Urgent",
    status: "New",
    createdAt: "2026-03-17 13:45",
    responseTime: "1h 8m",
    assignedTo: "سارة العتيبي",
    slaStatus: "on-track"
  },
  {
    id: "TKT-2026-0845",
    user: "عبدالله التميمي",
    userType: "Service Provider",
    subject: "استفسار عن حالة المزاد",
    subjectEn: "Auction status inquiry",
    priority: "Normal",
    status: "Resolved",
    createdAt: "2026-03-17 10:15",
    responseTime: "3h 22m",
    assignedTo: "خالد الدوسري",
    slaStatus: "resolved"
  },
  {
    id: "TKT-2026-0844",
    user: "نورة السديري",
    userType: "Bidder",
    subject: "خطأ في عرض تفاصيل العقار",
    subjectEn: "Property details display error",
    priority: "Urgent",
    status: "In-Progress",
    createdAt: "2026-03-17 09:30",
    responseTime: "2h 15m",
    assignedTo: "محمد السالم",
    slaStatus: "on-track"
  },
  {
    id: "TKT-2026-0843",
    user: "سلطان الحربي",
    userType: "Broker",
    subject: "طلب دعم فني - تكامل API",
    subjectEn: "Technical support - API integration",
    priority: "Normal",
    status: "New",
    createdAt: "2026-03-17 08:00",
    responseTime: "6h 30m",
    assignedTo: "Unassigned",
    slaStatus: "on-track"
  }
];

const liveChatSessions = [
  {
    id: "CHAT-2847",
    user: "ريم القحطاني",
    agent: "سارة العتيبي",
    topic: "Auction bid confirmation",
    duration: "12m 34s",
    status: "active",
    messages: 18
  },
  {
    id: "CHAT-2846",
    user: "خالد المنصور",
    agent: "محمد السالم",
    topic: "Payment verification",
    duration: "8m 12s",
    status: "active",
    messages: 12
  },
  {
    id: "CHAT-2845",
    user: "لطيفة الشمري",
    agent: "خالد الدوسري",
    topic: "License renewal",
    duration: "23m 45s",
    status: "waiting",
    messages: 31
  }
];

export default function SupportHub() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-light text-[#2B3D50]">Customer Support & Help Desk</h1>
        <p 
          className="text-2xl font-light text-gray-600 mt-2"
          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
        >
          مركز الدعم وإدارة الشكاوى
        </p>
      </div>

      {/* SLA Performance Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {slaMetrics.map((metric, index) => (
          <Card key={`sla-${index}`} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: metric.color }}
                    ></div>
                    <p 
                      className="text-sm font-medium text-gray-700"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {metric.categoryAr}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">{metric.category} Category</p>
                  <div className="text-4xl font-light text-[#2B3D50] mb-1">
                    {metric.count}
                  </div>
                  <p className="text-xs text-gray-500">Active Tickets</p>
                </div>
                <AlertCircle className="w-5 h-5" style={{ color: metric.color }} />
              </div>

              <div className="space-y-2 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Target Response:</span>
                  <span className="text-xs font-medium text-[#2B3D50]">{metric.targetResponse}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Avg Response:</span>
                  <span className="text-xs font-medium text-[#47CCD0]">{metric.avgResponse}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mt-3">
                  <div 
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: '75%',
                      backgroundColor: metric.color 
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 text-center mt-1">SLA Compliance: 75%</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Live Chat Oversight */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-light text-[#2B3D50] flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#47CCD0]" />
            Live Chat Oversight
          </CardTitle>
          <p 
            className="text-sm text-gray-500"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            مراقبة المحادثات المباشرة
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {liveChatSessions.map((session, index) => (
              <div 
                key={`chat-${index}`}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-3 flex-1 w-full sm:w-auto">
                  <div className={`shrink-0 mt-1.5 sm:mt-0 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${
                    session.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p 
                        className="font-bold text-[#2B3D50] text-sm sm:text-base"
                        style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                      >
                        {session.user}
                      </p>
                      <span className="text-xs text-gray-500 shrink-0">↔</span>
                      <p className="text-xs sm:text-sm font-medium text-gray-600">{session.agent}</p>
                    </div>
                    <p className="text-[10px] sm:text-xs text-gray-500 truncate">{session.topic} • {session.id}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 mt-1 sm:mt-0 border-t sm:border-0 border-gray-200">
                  <div className="flex items-center gap-4 sm:gap-6 text-sm">
                    <div className="text-start">
                      <p className="text-[10px] sm:text-xs text-gray-500">Duration</p>
                      <p className="font-bold text-[#2B3D50] text-xs sm:text-sm">{session.duration}</p>
                    </div>
                    <div className="text-start">
                      <p className="text-[10px] sm:text-xs text-gray-500">Messages</p>
                      <p className="font-bold text-[#47CCD0] text-xs sm:text-sm">{session.messages}</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-[#2B3D50] hover:bg-[#1f2d3d] text-white shrink-0 text-xs sm:text-sm h-8 sm:h-9 px-4"
                  >
                    Monitor
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ticket Management Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-light text-[#2B3D50]">
                Active Tickets & Complaints
              </CardTitle>
              <p 
                className="text-sm text-gray-500 mt-1"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                التذاكر والشكاوى النشطة
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Search className="w-4 h-4" />
                Search
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
           <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Response Time</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>SLA</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket, index) => (
                <TableRow key={`ticket-${index}`}>
                  <TableCell className="font-medium text-[#2B3D50]">
                    {ticket.id}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p 
                        className="font-medium text-sm"
                        style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                      >
                        {ticket.user}
                      </p>
                      <p className="text-xs text-gray-500">{ticket.userType}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p 
                        className="text-sm mb-1"
                        style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                      >
                        {ticket.subject}
                      </p>
                      <p className="text-xs text-gray-500">{ticket.subjectEn}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        ticket.priority === "Critical" ? "destructive" :
                        ticket.priority === "Urgent" ? "default" : "secondary"
                      }
                      className={
                        ticket.priority === "Urgent" 
                          ? "bg-orange-500 hover:bg-orange-600" 
                          : ""
                      }
                    >
                      {ticket.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        ticket.status === "Resolved" ? "default" :
                        ticket.status === "In-Progress" ? "secondary" : "outline"
                      }
                      className={
                        ticket.status === "Resolved" 
                          ? "bg-green-500 hover:bg-green-600" 
                          : ticket.status === "In-Progress"
                          ? "bg-blue-500 hover:bg-blue-600 text-white"
                          : ""
                      }
                    >
                      {ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-sm">{ticket.responseTime}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p 
                      className="text-sm"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {ticket.assignedTo}
                    </p>
                  </TableCell>
                  <TableCell>
                    {ticket.slaStatus === "resolved" ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-gray-600">On Track</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-[#47CCD0] border-[#47CCD0] hover:bg-[#47CCD0] hover:text-white"
                    >
                      View
                    </Button>
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