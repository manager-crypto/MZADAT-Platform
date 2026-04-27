import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Gavel,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  Search,
  Filter,
  MoreVertical,
  Building2,
  Car,
  ChevronLeft,
  X,
  AlertCircle
} from 'lucide-react';
import { RiyalSymbol } from '../ui/RiyalSymbol';

export const MyAuctionsComponent: React.FC = () => {
  const { t } = useTranslation();

  const mockAuctions = [
    {
      id: 1,
      titleKey: 'myAuctions.auc1Title',
      type: 'real-estate',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80',
      currentBid: 2500000,
      myBid: 2500000,
      status: 'active',
      biddersCount: 12,
      timeLeftKey: 'myAuctions.auc1TimeLeft',
      locationKey: 'myAuctions.auc1Location',
      isHighestBidder: true
    },
    {
      id: 2,
      titleKey: 'myAuctions.auc2Title',
      type: 'vehicle',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=400&q=80',
      currentBid: 450000,
      myBid: 440000,
      status: 'active',
      biddersCount: 8,
      timeLeftKey: 'myAuctions.auc2TimeLeft',
      locationKey: 'myAuctions.auc2Location',
      isHighestBidder: false
    },
    {
      id: 3,
      titleKey: 'myAuctions.auc3Title',
      type: 'real-estate',
      image: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&w=400&q=80',
      currentBid: 5200000,
      myBid: 5200000,
      status: 'won',
      biddersCount: 24,
      timeLeftKey: 'myAuctions.auc3TimeLeft',
      locationKey: 'myAuctions.auc3Location',
      isHighestBidder: true
    },
    {
      id: 4,
      titleKey: 'myAuctions.auc4Title',
      type: 'real-estate',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80',
      currentBid: 850000,
      myBid: 800000,
      status: 'lost',
      biddersCount: 15,
      timeLeftKey: 'myAuctions.auc4TimeLeft',
      locationKey: 'myAuctions.auc4Location',
      isHighestBidder: false
    }
  ];

  const [filter, setFilter] = useState<'all' | 'active' | 'won' | 'lost'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedAuctionDetails, setSelectedAuctionDetails] = useState<any>(null);
  const [selectedAuctionBid, setSelectedAuctionBid] = useState<any>(null);
  const [bidAmount, setBidAmount] = useState<string>('');

  const [auctionsData, setAuctionsData] = useState(mockAuctions);

  const filteredAuctions = auctionsData.filter(auction => {
    const matchesFilter = filter === 'all' || auction.status === filter;
    const matchesSearch = t(auction.titleKey).includes(searchQuery) || t(auction.locationKey).includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  const stats = [
    { label: t('dashboard.totalBids'), value: '15', icon: Gavel, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: t('dashboard.activeAuctions2'), value: '4', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: t('dashboard.wonAuctions'), value: '3', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: t('dashboard.lostAuctions'), value: '8', icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  const filterTabs = [
    { id: 'all', labelKey: 'myAuctions.filterAll' },
    { id: 'active', labelKey: 'myAuctions.filterActive' },
    { id: 'won', labelKey: 'myAuctions.filterWon' },
    { id: 'lost', labelKey: 'myAuctions.filterLost' },
  ];

  const handleRaiseBid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAuctionBid) return;

    const amountNum = parseInt(bidAmount.replace(/,/g, ''));
    if (isNaN(amountNum) || amountNum <= selectedAuctionBid.currentBid) {
      alert(t('myAuctions.bidAlertMsg'));
      return;
    }

    const updatedAuctions = auctionsData.map(auction => {
      if (auction.id === selectedAuctionBid.id) {
        return {
          ...auction,
          currentBid: amountNum,
          myBid: amountNum,
          isHighestBidder: true,
          biddersCount: auction.biddersCount + 1
        };
      }
      return auction;
    });

    setAuctionsData(updatedAuctions);
    setSelectedAuctionBid(null);
    setBidAmount('');
  };

  const getStatusBadge = (status: string, isHighest: boolean) => {
    switch (status) {
      case 'active':
        return isHighest ? (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
            <CheckCircle2 size={12} /> {t('myAuctions.statusHighestBidder')}
          </span>
        ) : (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-100">
            <Clock size={12} /> {t('myAuctions.statusOutbid')}
          </span>
        );
      case 'won':
        return (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
            <CheckCircle2 size={12} /> {t('myAuctions.statusWon')}
          </span>
        );
      case 'lost':
        return (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold border border-gray-200">
            <XCircle size={12} /> {t('myAuctions.statusEnded')}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <h4 className="text-2xl font-bold text-[#2B3D50]">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Filters & Search Header */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex bg-gray-50 p-1 rounded-xl w-fit">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  filter === tab.id
                    ? 'bg-white text-[#2B3D50] shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {t(tab.labelKey)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder={t('myAuctions.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 ps-4 pe-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#47CCD0]/20 focus:border-[#47CCD0] transition-all"
              />
            </div>
            <button className="p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Auctions List */}
        <div className="p-5">
          {filteredAuctions.length > 0 ? (
            <div className="space-y-4">
              {filteredAuctions.map((auction) => (
                <div key={auction.id} className="flex flex-col md:flex-row gap-5 p-4 rounded-xl border border-gray-100 hover:border-[#47CCD0] hover:shadow-md transition-all group bg-white">
                  {/* Image */}
                  <div className="relative w-full md:w-48 h-32 rounded-lg overflow-hidden shrink-0">
                    <img src={auction.image} alt={t(auction.titleKey)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2 end-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-md text-[#2B3D50]">
                      {auction.type === 'real-estate' ? <Building2 size={16} /> : <Car size={16} />}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{t(auction.locationKey)}</span>
                          {getStatusBadge(auction.status, auction.isHighestBidder)}
                        </div>
                        <h3 className="font-bold text-lg text-[#2B3D50] leading-tight">{t(auction.titleKey)}</h3>
                      </div>
                      <button className="text-gray-400 hover:text-[#47CCD0] transition-colors p-1">
                        <MoreVertical size={18} />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                      <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100/50">
                        <p className="text-[11px] text-gray-500 mb-0.5">{t('myAuctions.colHighestBid')}</p>
                        <p className="font-mono font-bold text-gray-900 flex items-center gap-1 justify-center sm:justify-start">{auction.currentBid.toLocaleString()} <RiyalSymbol className="w-3 h-3 text-gray-900" /></p>
                      </div>
                      <div className={`p-2.5 rounded-lg border ${auction.isHighestBidder && auction.status === 'active' ? 'bg-[#47CCD0]/10 border-[#47CCD0]/30' : 'bg-gray-50 border-gray-100/50'}`}>
                        <p className="text-[11px] text-gray-500 mb-0.5">{t('myAuctions.colMyBid')}</p>
                        <p className={`font-mono font-bold flex items-center gap-1 justify-center sm:justify-start ${auction.isHighestBidder && auction.status === 'active' ? 'text-[#47CCD0]' : 'text-gray-900'}`}>{auction.myBid.toLocaleString()} <RiyalSymbol className={`w-3 h-3 ${auction.isHighestBidder && auction.status === 'active' ? 'text-[#47CCD0]' : 'text-gray-900'}`} /></p>
                      </div>
                      <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100/50">
                        <p className="text-[11px] text-gray-500 mb-0.5">{t('myAuctions.colBidders')}</p>
                        <p className="font-bold text-gray-900 flex items-center gap-1">
                          <Gavel size={14} className="text-gray-400" /> {auction.biddersCount}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100/50">
                        <p className="text-[11px] text-gray-500 mb-0.5">{t('myAuctions.colTimeLeft')}</p>
                        <p className={`font-bold text-sm ${auction.status === 'active' ? 'text-amber-600' : 'text-gray-500'}`}>
                          {t(auction.timeLeftKey)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex md:flex-col items-center justify-center gap-2 md:border-e border-gray-100 md:pe-5">
                    {auction.status === 'active' && !auction.isHighestBidder ? (
                      <button
                        onClick={() => setSelectedAuctionBid(auction)}
                        className="w-full md:w-auto px-6 py-2.5 bg-[#2B3D50] hover:bg-[#1a2533] text-white text-sm font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                      >
                        <ArrowUpRight size={16} /> {t('myAuctions.raiseBid')}
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectedAuctionDetails(auction)}
                        className="w-full md:w-auto px-6 py-2.5 bg-white border border-gray-200 hover:border-[#47CCD0] hover:text-[#47CCD0] text-gray-700 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                      >
                        {t('myAuctions.auctionDetails')}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-4">
                <Search size={32} />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">{t('myAuctions.noResults')}</h4>
              <p className="text-gray-500 text-sm max-w-sm">{t('myAuctions.noResultsDesc')}</p>
              <button
                onClick={() => { setFilter('all'); setSearchQuery(''); }}
                className="mt-6 px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold rounded-xl transition-colors"
              >
                {t('myAuctions.resetFilters')}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {selectedAuctionDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">{t('myAuctions.modalDetailsTitle')}</h3>
              <button
                onClick={() => setSelectedAuctionDetails(null)}
                className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="w-full h-48 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 relative">
                <img src={selectedAuctionDetails.image} alt={t(selectedAuctionDetails.titleKey)} className="w-full h-full object-cover" />
                <div className="absolute top-3 end-3 bg-white/90 backdrop-blur-sm p-2 rounded-lg text-[#2B3D50]">
                  {selectedAuctionDetails.type === 'real-estate' ? <Building2 size={20} /> : <Car size={20} />}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">{t(selectedAuctionDetails.locationKey)}</span>
                    {getStatusBadge(selectedAuctionDetails.status, selectedAuctionDetails.isHighestBidder)}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 leading-tight">{t(selectedAuctionDetails.titleKey)}</h4>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">{t('myAuctions.colHighestBid')}</p>
                      <p className="font-bold text-gray-900 text-lg flex items-center justify-center gap-1">{selectedAuctionDetails.currentBid.toLocaleString()} <RiyalSymbol className="w-4 h-4 text-gray-900" /></p>
                   </div>
                   <div className={`p-4 rounded-xl border ${selectedAuctionDetails.isHighestBidder && selectedAuctionDetails.status === 'active' ? 'bg-[#47CCD0]/10 border-[#47CCD0]/30' : 'bg-gray-50 border-gray-100'}`}>
                      <p className="text-xs text-gray-500 mb-1">{t('myAuctions.colMyBid')}</p>
                      <p className={`font-bold text-lg flex items-center justify-center gap-1 ${selectedAuctionDetails.isHighestBidder && selectedAuctionDetails.status === 'active' ? 'text-[#47CCD0]' : 'text-gray-900'}`}>{selectedAuctionDetails.myBid.toLocaleString()} <RiyalSymbol className={`w-4 h-4 ${selectedAuctionDetails.isHighestBidder && selectedAuctionDetails.status === 'active' ? 'text-[#47CCD0]' : 'text-gray-900'}`} /></p>
                   </div>
                   <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">{t('myAuctions.modalBiddersCount')}</p>
                      <p className="font-bold text-gray-900 flex items-center gap-2">
                        <Gavel size={16} className="text-gray-400" /> {selectedAuctionDetails.biddersCount} {t('myAuctions.modalBidder')}
                      </p>
                   </div>
                   <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">{t('myAuctions.colTimeLeft')}</p>
                      <p className={`font-bold ${selectedAuctionDetails.status === 'active' ? 'text-amber-600' : 'text-gray-500'}`}>
                        {t(selectedAuctionDetails.timeLeftKey)}
                      </p>
                   </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedAuctionDetails(null)}
                className="px-6 py-2.5 rounded-xl text-sm font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                {t('myAuctions.close')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Raise Bid Modal */}
      {selectedAuctionBid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">{t('myAuctions.modalRaiseBidTitle')}</h3>
              <button
                onClick={() => setSelectedAuctionBid(null)}
                className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleRaiseBid} className="p-6 space-y-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">{t('myAuctions.biddingOn')}</p>
                <h4 className="font-bold text-gray-900">{t(selectedAuctionBid.titleKey)}</h4>
              </div>

              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3">
                <AlertCircle className="text-amber-600 shrink-0" size={20} />
                <div>
                  <p className="text-sm font-bold text-amber-800 mb-1">{t('myAuctions.outbidWarningTitle')}</p>
                  <p className="text-xs text-amber-700 flex items-center gap-1">{t('myAuctions.outbidWarningDesc')} <span className="font-bold">{selectedAuctionBid.currentBid.toLocaleString()}</span> <RiyalSymbol className="w-3 h-3 text-amber-700" /></p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 block">{t('myAuctions.quickRaiseLabel')}</label>
                <div className="flex gap-2">
                  {[1, 2, 5, 10].map(percent => (
                    <button
                      key={percent}
                      type="button"
                      onClick={() => {
                        const increase = selectedAuctionBid.currentBid * (percent / 100);
                        const newAmount = selectedAuctionBid.currentBid + increase;
                        setBidAmount(Math.round(newAmount).toLocaleString());
                      }}
                      className="flex-1 py-2 bg-gray-50 hover:bg-[#47CCD0]/10 border border-gray-200 hover:border-[#47CCD0] text-gray-700 hover:text-[#47CCD0] rounded-xl text-sm font-bold transition-all"
                    >
                      +{percent}%
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-1">{t('myAuctions.manualBidLabel')} (<RiyalSymbol className="w-3 h-3 text-gray-700" />)</label>
                <div className="relative">
                  <span className="absolute end-4 top-1/2 -translate-y-1/2"><RiyalSymbol className="w-4 h-4 text-gray-400" /></span>
                  <input
                    type="text"
                    required
                    value={bidAmount}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^\d,]/g, '');
                      const num = parseInt(val.replace(/,/g, ''));
                      if (!isNaN(num)) {
                        setBidAmount(num.toLocaleString());
                      } else {
                        setBidAmount('');
                      }
                    }}
                    placeholder={`${t('myAuctions.bidPlaceholderPrefix')} ${selectedAuctionBid.currentBid.toLocaleString()}`}
                    className="w-full pe-14 ps-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-lg font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#47CCD0]/20 focus:border-[#47CCD0] transition-all dir-ltr text-start"
                    dir="ltr"
                  />
                </div>
                <p className="text-xs text-gray-500">{t('myAuctions.bidNote')}</p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedAuctionBid(null)}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  {t('myAuctions.cancel')}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-[#2B3D50] hover:bg-[#1a2533] shadow-md transition-all flex items-center gap-2"
                >
                  <ArrowUpRight size={18} />
                  {t('myAuctions.confirmBid')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
