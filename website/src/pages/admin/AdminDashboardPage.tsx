import React from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Gavel, Wallet, ShieldCheck, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer
} from 'recharts';
import { RiyalSymbol } from '../../components/ui/RiyalSymbol';

export const AdminDashboardPage: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    { title: t('adminDashboard.totalUsers'), value: '12,450', change: '+12.5%', isUp: true, icon: <Users size={24} className="text-blue-500" />, bg: 'bg-blue-50' },
    { title: t('adminDashboard.activeAuctions'), value: '342', change: '+5.2%', isUp: true, icon: <Gavel size={24} className="text-purple-500" />, bg: 'bg-purple-50' },
    { title: t('adminDashboard.escrowWalletBalance'), value: <span className="flex items-center gap-1">45.2M <RiyalSymbol className="w-4 h-4 text-emerald-500" /></span>, change: '+18.1%', isUp: true, icon: <Wallet size={24} className="text-emerald-500" />, bg: 'bg-emerald-50' },
    { title: t('adminDashboard.pendingVerificationRequests'), value: '89', change: '-2.4%', isUp: false, icon: <ShieldCheck size={24} className="text-orange-500" />, bg: 'bg-orange-50' },
  ];

  const revenueData = [
    { name: t('adminDashboard.monthJanuary'), revenue: 4000, escrow: 24000 },
    { name: t('adminDashboard.monthFebruary'), revenue: 3000, escrow: 13980 },
    { name: t('adminDashboard.monthMarch'), revenue: 2000, escrow: 9800 },
    { name: t('adminDashboard.monthApril'), revenue: 2780, escrow: 39080 },
    { name: t('adminDashboard.monthMay'), revenue: 1890, escrow: 48000 },
    { name: t('adminDashboard.monthJune'), revenue: 2390, escrow: 38000 },
    { name: t('adminDashboard.monthJuly'), revenue: 3490, escrow: 43000 },
  ];

  const recentActivity = [
    { id: 1, action: t('adminDashboard.activityIdentityVerification'), user: t('adminDashboard.userName1'), time: t('adminDashboard.timeAgo10Min'), status: 'approved' },
    { id: 2, action: t('adminDashboard.activityAddRealEstateAuction'), user: t('adminDashboard.userName2'), time: t('adminDashboard.timeAgo45Min'), status: 'pending' },
    { id: 3, action: t('adminDashboard.activityWithdrawalRequest'), user: t('adminDashboard.userName3'), time: t('adminDashboard.timeAgo2Hours'), status: 'rejected' },
    { id: 4, action: t('adminDashboard.activityNewUserRegistration'), user: t('adminDashboard.userName4'), time: t('adminDashboard.timeAgo3Hours'), status: 'approved' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-sm font-bold ${stat.isUp ? 'text-green-500' : 'text-red-500'}`}>
                {stat.isUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">{t('adminDashboard.financialFlowsTitle')}</h3>
          <div className="h-[300px] w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#47CCD0" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#47CCD0" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorEscrow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <RechartsTooltip />
                <Area type="monotone" dataKey="escrow" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorEscrow)" name={t('adminDashboard.escrowWallet')} />
                <Area type="monotone" dataKey="revenue" stroke="#47CCD0" fillOpacity={1} fill="url(#colorRevenue)" name={t('adminDashboard.platformRevenue')} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">{t('adminDashboard.recentActivities')}</h3>
            <button className="text-sm text-[#47CCD0] font-bold hover:underline">{t('adminDashboard.viewAll')}</button>
          </div>
          <div className="space-y-6 flex-1">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex gap-4 items-start relative before:absolute before:end-[15px] before:top-8 before:bottom-[-24px] last:before:hidden before:w-px before:bg-gray-200">
                <div className={`w-8 h-8 rounded-full flex-shrink-0 z-10 border-2 border-white ${
                  activity.status === 'approved' ? 'bg-green-500' :
                  activity.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
                <div>
                  <p className="text-sm font-bold text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">{t('adminDashboard.byUser')}: {activity.user}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
