import React, { useState } from 'react';
import {
  Wallet,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  History,
  Building2,
  Plus,
  Download,
  AlertCircle,
  ChevronLeft,
  Search,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { BackButton } from '../components/ui/BackButton';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { RiyalSymbol } from '../components/ui/RiyalSymbol';
import { useTranslation } from 'react-i18next';

interface WalletPageProps {
  onNavigate?: (page: string) => void;
}

export const WalletPage = ({ onNavigate }: WalletPageProps) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'overview' | 'deposit' | 'withdraw' | 'transactions'>('overview');
  const [isWithdrawSuccess, setIsWithdrawSuccess] = useState(false);

  // Mock Transactions Data
  const transactions = [
    { id: 'TRX-99281', type: 'deposit', amount: 50000, date: '2025-02-15', status: 'completed', desc: t('walletPage.trx1Desc') },
    { id: 'TRX-99282', type: 'block', amount: 25000, date: '2025-02-14', status: 'pending', desc: t('walletPage.trx2Desc') },
    { id: 'TRX-99283', type: 'withdraw', amount: 10000, date: '2025-02-10', status: 'completed', desc: t('walletPage.trx3Desc') },
    { id: 'TRX-99284', type: 'deposit', amount: 100000, date: '2025-02-01', status: 'completed', desc: t('walletPage.trx4Desc') },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-36 pb-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div className="p-2 bg-[#47CCD0]/10 rounded-xl text-[#47CCD0]">
                <Wallet size={32} />
              </div>
              {t('walletPage.title')}
            </h1>
            <p className="text-gray-500 mt-2 text-sm">{t('walletPage.subtitle')}</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setActiveTab('deposit')}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#47CCD0] text-white rounded-xl font-bold shadow-lg shadow-teal-500/20 hover:bg-[#35a4a9] transition-all"
            >
              <Plus size={18} /> {t('walletPage.chargeWallet')}
            </button>
            <button
              onClick={() => setActiveTab('withdraw')}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 hover:border-[#47CCD0] hover:text-[#47CCD0] transition-all"
            >
              <ArrowDownLeft size={18} /> {t('walletPage.withdrawBalance')}
            </button>
          </div>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Balance */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-gray-400 text-sm font-medium mb-1">{t('walletPage.totalBalance')}</p>
              <h2 className="text-4xl font-bold mb-4 flex items-center justify-center sm:justify-start gap-2" dir="ltr">115,000 <RiyalSymbol className="w-5 h-5 text-gray-400" /></h2>
              <div className="flex items-center gap-2 text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-lg w-fit">
                <ArrowUpRight size={14} />
                <span>{t('walletPage.lastUpdate')}</span>
              </div>
            </div>
            <div className="absolute top-0 start-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-x-10 -translate-y-10"></div>
            <div className="absolute bottom-0 end-0 w-32 h-32 bg-[#47CCD0]/20 rounded-full blur-3xl translate-x-10 translate-y-10"></div>
          </div>

          {/* Available Balance */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                <CreditCard size={24} />
              </div>
            </div>
            <p className="text-gray-500 text-sm font-medium mb-1">{t('walletPage.availableBalance')}</p>
            <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-center sm:justify-start gap-1" dir="ltr">90,000 <RiyalSymbol className="w-4 h-4 text-gray-400" /></h2>
            <p className="text-xs text-gray-400 mt-2">{t('walletPage.availableBalanceDesc')}</p>
          </div>

          {/* Blocked Balance */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
             <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                <Building2 size={24} />
              </div>
            </div>
            <p className="text-gray-500 text-sm font-medium mb-1">{t('walletPage.blockedBalance')}</p>
            <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-center sm:justify-start gap-1" dir="ltr">25,000 <RiyalSymbol className="w-4 h-4 text-gray-400" /></h2>
            <p className="text-xs text-gray-400 mt-2">{t('walletPage.blockedBalanceDesc')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1 space-y-2">
            {[
              { id: 'overview', label: t('walletPage.tabOverview'), icon: Wallet },
              { id: 'transactions', label: t('walletPage.tabTransactions'), icon: History },
              { id: 'deposit', label: t('walletPage.tabDeposit'), icon: Plus },
              { id: 'withdraw', label: t('walletPage.tabWithdraw'), icon: ArrowDownLeft },
              { id: 'accounts', label: t('walletPage.tabAccounts'), icon: Building2 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-[#47CCD0] shadow-sm border border-gray-100'
                    : 'text-gray-500 hover:bg-white hover:text-gray-700'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[400px]">

              {/* Transactions Tab */}
              {(activeTab === 'overview' || activeTab === 'transactions') && (
                <div className="p-6">
                   <div className="flex items-center justify-between mb-6">
                     <h3 className="text-lg font-bold text-gray-900">{t('walletPage.recentTransactions')}</h3>
                     <div className="flex gap-2">
                       <button className="p-2 text-gray-400 hover:text-[#47CCD0] hover:bg-gray-50 rounded-lg transition-colors">
                         <Filter size={18} />
                       </button>
                       <button className="p-2 text-gray-400 hover:text-[#47CCD0] hover:bg-gray-50 rounded-lg transition-colors">
                         <Download size={18} />
                       </button>
                     </div>
                   </div>

                   <div className="overflow-x-auto">
                     <table className="w-full text-end">
                       <thead className="bg-gray-50 text-gray-500 text-sm">
                         <tr>
                           <th className="px-4 py-3 rounded-e-xl">{t('walletPage.colType')}</th>
                           <th className="px-4 py-3">{t('walletPage.colAmount')}</th>
                           <th className="px-4 py-3">{t('walletPage.colDate')}</th>
                           <th className="px-4 py-3">{t('walletPage.colDetails')}</th>
                           <th className="px-4 py-3 rounded-s-xl">{t('walletPage.colStatus')}</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-50">
                         {transactions.map((trx) => (
                           <tr key={trx.id} className="hover:bg-gray-50/50 transition-colors">
                             <td className="px-4 py-4">
                               <div className="flex items-center gap-3">
                                 <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                   trx.type === 'deposit' ? 'bg-green-100 text-green-600' :
                                   trx.type === 'withdraw' ? 'bg-red-100 text-red-600' :
                                   'bg-orange-100 text-orange-600'
                                 }`}>
                                   {trx.type === 'deposit' ? <ArrowDownLeft size={16} /> :
                                    trx.type === 'withdraw' ? <ArrowUpRight size={16} /> :
                                    <CreditCard size={16} />}
                                 </div>
                                 <span className="font-medium text-gray-900">
                                   {trx.type === 'deposit' ? t('walletPage.typeDeposit') :
                                    trx.type === 'withdraw' ? t('walletPage.typeWithdraw') : t('walletPage.typeBlock')}
                                 </span>
                               </div>
                             </td>
                             <td className="px-4 py-4 font-bold flex items-center justify-end md:justify-start gap-1" dir="ltr">
                               {trx.amount.toLocaleString()} <RiyalSymbol className="w-3 h-3 text-gray-700" />
                             </td>
                             <td className="px-4 py-4 text-gray-500 text-sm">
                               {trx.date}
                             </td>
                             <td className="px-4 py-4 text-gray-500 text-sm">
                               {trx.desc}
                             </td>
                             <td className="px-4 py-4">
                               <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                 trx.status === 'completed' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                               }`}>
                                 {trx.status === 'completed' ? t('walletPage.statusCompleted') : t('walletPage.statusProcessing')}
                               </span>
                             </td>
                           </tr>
                         ))}
                       </tbody>
                     </table>
                   </div>
                </div>
              )}

              {/* Deposit Tab */}
              {activeTab === 'deposit' && (
                <div className="p-8 max-w-2xl mx-auto text-center">
                  <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t('walletPage.depositTitle')}</h3>
                  <p className="text-gray-500 mb-8">{t('walletPage.depositDesc')}</p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <button className="border-2 border-[#47CCD0] bg-teal-50 p-4 rounded-xl flex flex-col items-center gap-2">
                       <Building2 className="text-[#47CCD0]" size={24} />
                       <span className="font-bold text-[#47CCD0]">{t('walletPage.bankTransfer')}</span>
                    </button>
                    <button className="border border-gray-200 p-4 rounded-xl flex flex-col items-center gap-2 hover:border-gray-300 transition-colors">
                       <CreditCard className="text-gray-400" size={24} />
                       <span className="font-medium text-gray-600">{t('walletPage.cardPayment')}</span>
                    </button>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl text-end mb-6">
                    <h4 className="font-bold text-sm mb-3">{t('walletPage.platformAccounts')}</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200">
                         <div className="flex items-center gap-2">
                           <div className="w-8 h-8 bg-blue-900 rounded-md"></div>
                           <span className="font-medium text-sm">{t('walletPage.bankRajhi')}</span>
                         </div>
                         <button className="text-xs text-[#47CCD0] font-bold">{t('walletPage.copyIban')}</button>
                      </div>
                      <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200">
                         <div className="flex items-center gap-2">
                           <div className="w-8 h-8 bg-green-700 rounded-md"></div>
                           <span className="font-medium text-sm">{t('walletPage.bankAhli')}</span>
                         </div>
                         <button className="text-xs text-[#47CCD0] font-bold">{t('walletPage.copyIban')}</button>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-[#47CCD0] text-white py-3 rounded-xl font-bold hover:bg-[#35a4a9] transition-all">
                    {t('walletPage.attachReceipt')}
                  </button>
                </div>
              )}

              {/* Withdraw Tab */}
              {activeTab === 'withdraw' && (
                isWithdrawSuccess ? (
                  <div className="p-8 max-w-2xl mx-auto text-center animate-in fade-in zoom-in duration-300">
                     <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <CheckCircle2 size={40} />
                     </div>
                     <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('walletPage.withdrawSuccess')}</h3>
                     <p className="text-gray-500 mb-8 max-w-md mx-auto">{t('walletPage.withdrawSuccessDesc')}</p>

                     <div className="space-y-3 max-w-md mx-auto">
                        <BackButton
                           onClick={() => onNavigate?.('auction-details')}
                           label={t('walletPage.backToAuction')}
                           className="w-full justify-center bg-[#47CCD0] !text-white py-3.5 rounded-xl font-bold hover:bg-[#35a4a9] transition-all shadow-lg shadow-teal-500/20"
                        />

                        <button
                           onClick={() => onNavigate?.('live-auction')}
                           className="w-full bg-white border border-gray-200 text-gray-700 py-3.5 rounded-xl font-bold hover:bg-gray-50 hover:text-[#47CCD0] transition-all"
                        >
                           {t('walletPage.followLiveAuctions')}
                        </button>
                     </div>
                  </div>
                ) : (
                  <div className="p-8 max-w-2xl mx-auto text-center">
                    <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ArrowDownLeft size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t('walletPage.withdrawTitle')}</h3>
                    <p className="text-gray-500 mb-8">{t('walletPage.withdrawDesc')}</p>

                    <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl text-end mb-6 flex items-start gap-3">
                      <AlertCircle className="text-orange-500 shrink-0 mt-0.5" size={18} />
                      <p className="text-sm text-orange-700">{t('walletPage.withdrawWarning')}</p>
                    </div>

                    <div className="text-end space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">{t('walletPage.amountLabel')}</label>
                        <div className="relative">
                          <input
                            type="number"
                            min="0"
                            placeholder="0.00"
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] outline-none"
                            onKeyDown={(e) => { if (e.key === '-' || e.key === 'e') e.preventDefault(); }}
                          />
                          <span className="absolute start-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"><RiyalSymbol className="w-4 h-4" /></span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1 justify-center sm:justify-start">{t('walletPage.availableForWithdraw')} <span dir="ltr" className="flex items-center gap-1">90,000 <RiyalSymbol className="w-3 h-3 text-gray-400" /></span></p>
                      </div>

                      <div>
                         <label className="block text-sm font-bold text-gray-700 mb-2">{t('walletPage.selectBankAccount')}</label>
                         <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] outline-none text-gray-600">
                           <option>{t('walletPage.bankRajhiOption')}</option>
                           <option>{t('walletPage.bankAhliOption')}</option>
                         </select>
                      </div>

                      <button
                        onClick={() => {
                          setIsWithdrawSuccess(true);
                          import('../utils/logger').then(({ logger }) => {
                            logger.info('Withdrawal request initiated', { amount: 'input_value', bankId: 'selected_bank' }, 'WalletSystem');
                          });
                        }}
                        className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-all mt-4"
                      >
                        {t('walletPage.confirmWithdraw')}
                      </button>
                    </div>
                  </div>
                )
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
