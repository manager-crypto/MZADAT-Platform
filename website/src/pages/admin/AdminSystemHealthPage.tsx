import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Server, 
  Cpu, 
  Database, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  TerminalSquare,
  RefreshCw,
  Zap,
  Globe
} from 'lucide-react';
import { logger, LogEntry } from '../../utils/logger';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Mock performance data generator for charts
const generatePerfData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    time: `${i}m`,
    cpu: 30 + Math.random() * 40,
    memory: 50 + Math.random() * 20,
    latency: 100 + Math.random() * 150,
    requests: 500 + Math.random() * 500,
    errors: Math.floor(Math.random() * 10)
  }));
};

export const AdminSystemHealthPage = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [errorRate, setErrorRate] = useState(0);
  const [perfData, setPerfData] = useState(generatePerfData());
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [isLive, setIsLive] = useState(true);

  // Sync with logger
  useEffect(() => {
    const updateState = () => {
      setLogs(logger.getLogs());
      setErrorRate(logger.getErrorRate());
    };

    updateState(); // initial load
    const unsubscribe = logger.subscribe(updateState);
    
    return () => unsubscribe();
  }, []);

  // Simulate live charting
  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      setPerfData(prev => {
        const newData = [...prev.slice(1)];
        newData.push({
          time: 'now',
          cpu: 30 + Math.random() * 40,
          memory: 50 + Math.random() * 20,
          latency: 100 + Math.random() * 200, // Spike occasionally
          requests: 500 + Math.random() * 600,
          errors: Math.floor(Math.random() * 5)
        });
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  const filteredLogs = logs.filter(l => filterLevel === 'all' || l.level === filterLevel);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'text-red-500 bg-red-50 border-red-100';
      case 'fatal': return 'text-white bg-red-600 border-red-700';
      case 'warn': return 'text-orange-600 bg-orange-50 border-orange-100';
      case 'info': return 'text-blue-600 bg-blue-50 border-blue-100';
      default: return 'text-gray-600 bg-gray-50 border-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Activity className="text-[#47CCD0]" />
            مراقبة صحة النظام (APM)
          </h2>
          <p className="text-gray-500 text-sm mt-1">تتبع الأداء والأخطاء في الوقت الفعلي</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all border ${
              isLive 
                ? 'bg-green-50 text-green-700 border-green-200' 
                : 'bg-gray-50 text-gray-600 border-gray-200'
            }`}
          >
            {isLive ? <RefreshCw size={16} className="animate-spin" /> : <Clock size={16} />}
            {isLive ? 'تحديث تلقائي مفعل' : 'تحديث تلقائي متوقف'}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 end-0 w-2 h-full bg-green-500"></div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-500 text-sm font-bold">حالة النظام</h3>
            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
              <Server size={20} />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">مستقر</p>
          <div className="flex items-center gap-1 text-green-600 text-xs mt-2 font-bold">
            <CheckCircle2 size={14} /> جميع الخدمات تعمل
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className={`absolute top-0 end-0 w-2 h-full ${errorRate > 5 ? 'bg-red-500' : errorRate > 1 ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-500 text-sm font-bold">معدل الأخطاء</h3>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <AlertTriangle size={20} />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900" dir="ltr">{errorRate.toFixed(2)}%</p>
          <div className="text-gray-400 text-xs mt-2">من إجمالي الطلبات (آخر ساعة)</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 end-0 w-2 h-full bg-purple-500"></div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-500 text-sm font-bold">زمن الاستجابة</h3>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <Zap size={20} />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900" dir="ltr">{Math.round(perfData[perfData.length-1]?.latency || 0)} ms</p>
          <div className="text-gray-400 text-xs mt-2">متوسط (P95)</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 end-0 w-2 h-full bg-indigo-500"></div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-500 text-sm font-bold">الطلبات النشطة</h3>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Globe size={20} />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{Math.round(perfData[perfData.length-1]?.requests || 0)}</p>
          <div className="text-gray-400 text-xs mt-2">طلب / الدقيقة</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Cpu size={20} className="text-gray-400" /> استهلاك الموارد (CPU & Memory)
          </h3>
          <div className="h-[250px] w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={perfData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  labelStyle={{ color: '#6B7280', marginBottom: '4px' }}
                />
                <Line type="monotone" dataKey="cpu" stroke="#3B82F6" strokeWidth={3} dot={false} activeDot={{ r: 6 }} name="CPU %" />
                <Line type="monotone" dataKey="memory" stroke="#8B5CF6" strokeWidth={3} dot={false} activeDot={{ r: 6 }} name="Memory %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Zap size={20} className="text-gray-400" /> زمن الاستجابة (Latency)
          </h3>
          <div className="h-[250px] w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={perfData}>
                <defs>
                  <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Area type="monotone" dataKey="latency" stroke="#10B981" fillOpacity={1} fill="url(#colorLatency)" strokeWidth={2} name="Latency (ms)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Log Stream */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-[500px]">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <TerminalSquare size={20} className="text-gray-500" />
            سجل أحداث النظام (Log Stream)
          </h3>
          <div className="flex gap-2">
            {['all', 'error', 'warn', 'info'].map(level => (
              <button
                key={level}
                onClick={() => setFilterLevel(level)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterLevel === level 
                    ? 'bg-[#2B3D50] text-white shadow-md' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {level === 'all' ? 'الكل' : level.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 bg-[#0F172A] font-mono text-sm">
          {filteredLogs.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-500">
              لا توجد سجلات مطابقة
            </div>
          ) : (
            <div className="space-y-2">
              {filteredLogs.map((log) => (
                <div key={log.id} className={`p-3 rounded border border-transparent hover:bg-white/5 transition-colors ${
                  log.level === 'error' || log.level === 'fatal' ? 'border-red-500/30 bg-red-500/10' : ''
                }`}>
                  <div className="flex items-start gap-3">
                    <span className="text-gray-500 text-xs shrink-0 mt-0.5">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${getLevelColor(log.level)}`}>
                      {log.level.toUpperCase()}
                    </span>
                    {log.component && (
                      <span className="text-purple-400 text-xs shrink-0 mt-0.5">
                        [{log.component}]
                      </span>
                    )}
                    <div className="flex-1 min-w-0">
                      <span className={
                        log.level === 'error' || log.level === 'fatal' ? 'text-red-400 font-bold' :
                        log.level === 'warn' ? 'text-yellow-400' : 'text-gray-300'
                      }>
                        {log.message}
                      </span>
                      {log.context && (
                        <pre className="mt-2 p-2 bg-black/50 rounded text-gray-400 text-xs overflow-x-auto">
                          {JSON.stringify(log.context, null, 2)}
                        </pre>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};