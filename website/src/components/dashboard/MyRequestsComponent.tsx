import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
 FileText,
 Search,
 Filter,
 Clock,
 CheckCircle2,
 XCircle,
 Plus,
 Eye,
 MessageSquare,
 Building2,
 Car,
 ChevronLeft
} from 'lucide-react';
import { RiyalSymbol } from '../ui/RiyalSymbol';

export const MyRequestsComponent: React.FC = () => {
 const { t } = useTranslation();
 const [activeTab, setActiveTab] = useState<'requests' | 'offers'>('requests');
 const [searchQuery, setSearchQuery] = useState('');

 const mockRequests = [
 {
 id: 'REQ-1024',
 titleKey: 'myRequests.req1Title',
 typeKey: 'myRequests.req1Type',
 typeRaw: 'realestate',
 dateKey: 'myRequests.req1Date',
 status: 'active',
 offersCount: 3,
 budget: '2,000,000 - 2,500,000',
 detailsKey: 'myRequests.req1Details'
 },
 {
 id: 'REQ-1025',
 titleKey: 'myRequests.req2Title',
 typeKey: 'myRequests.req2Type',
 typeRaw: 'realestate',
 dateKey: 'myRequests.req2Date',
 status: 'completed',
 offersCount: 5,
 budget: t('myRequests.req2Budget'),
 detailsKey: 'myRequests.req2Details'
 },
 {
 id: 'REQ-1026',
 titleKey: 'myRequests.req3Title',
 typeKey: 'myRequests.req3Type',
 typeRaw: 'vehicles',
 dateKey: 'myRequests.req3Date',
 status: 'pending',
 offersCount: 0,
 budget: '150,000 - 200,000',
 detailsKey: 'myRequests.req3Details'
 }
 ];

 const mockOffers = [
 {
 id: 'OFF-2041',
 requestTitleKey: 'myRequests.off1Title',
 amount: '2,400,000',
 dateKey: 'myRequests.off1Date',
 status: 'pending',
 providerKey: 'myRequests.off1Provider',
 rating: 4.8
 },
 {
 id: 'OFF-2042',
 requestTitleKey: 'myRequests.off2Title',
 amount: '45,000',
 dateKey: 'myRequests.off2Date',
 status: 'rejected',
 providerKey: 'myRequests.off2Provider',
 rating: 4.2
 },
 {
 id: 'OFF-2043',
 requestTitleKey: 'myRequests.off3Title',
 amount: '280,000',
 dateKey: 'myRequests.off3Date',
 status: 'accepted',
 providerKey: 'myRequests.off3Provider',
 rating: 4.9
 }
 ];

 const stats = {
 requests: [
 { labelKey: 'myRequests.statTotalRequests', value: '12', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
 { labelKey: 'myRequests.statActiveRequests', value: '4', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
 { labelKey: 'myRequests.statCompletedRequests', value: '6', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
 { labelKey: 'myRequests.statPendingReview', value: '2', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
 ],
 offers: [
 { labelKey: 'myRequests.statTotalOffers', value: '28', icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-50' },
 { labelKey: 'myRequests.statAcceptedOffers', value: '5', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
 { labelKey: 'myRequests.statUnderStudy', value: '8', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
 { labelKey: 'myRequests.statRejectedOffers', value: '15', icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
 ]
 };

 const getStatusBadge = (status: string) => {
 switch (status) {
 case 'active':
 return <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">{t('myRequests.statusActive')}</span>;
 case 'completed':
 return <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">{t('myRequests.statusCompleted')}</span>;
 case 'pending':
 return <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-100">{t('myRequests.statusPending')}</span>;
 case 'accepted':
 return <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">{t('myRequests.statusAccepted')}</span>;
 case 'rejected':
 return <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold border border-red-100">{t('myRequests.statusRejected')}</span>;
 default:
 return null;
 }
 };

 const filteredRequests = mockRequests.filter(req =>
 t(req.titleKey).includes(searchQuery) || req.id.includes(searchQuery)
 );

 const filteredOffers = mockOffers.filter(offer =>
 t(offer.requestTitleKey).includes(searchQuery) || t(offer.providerKey).includes(searchQuery)
 );

 const filteredData = activeTab === 'requests' ? filteredRequests : filteredOffers;

 return (
 <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

 {/* Header and Add Button */}
 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
 <div>
 <h2 className="text-2xl font-bold text-[#2B3D50]">{t('myRequests.pageTitle')}</h2>
 <p className="text-gray-500 text-sm mt-1">{t('myRequests.pageSubtitle')}</p>
 </div>
 <button className="px-5 py-2.5 bg-[#47CCD0] hover:bg-[#3bb5b9] text-white text-sm font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2">
 <Plus size={18} /> {t('myRequests.newRequest')}
 </button>
 </div>

 {/* Tabs */}
 <div className="flex border-b border-gray-200">
 <button
 onClick={() => setActiveTab('requests')}
 className={`px-6 py-3 text-sm font-bold transition-all relative ${
 activeTab === 'requests' ? 'text-[#47CCD0]' : 'text-gray-500 hover:text-gray-800'
 }`}
 >
 {t('myRequests.tabRequests')}
 {activeTab === 'requests' && (
 <div className="absolute bottom-0 start-0 w-full h-0.5 bg-[#47CCD0] rounded-t-full" />
 )}
 </button>
 <button
 onClick={() => setActiveTab('offers')}
 className={`px-6 py-3 text-sm font-bold transition-all relative ${
 activeTab === 'offers' ? 'text-[#47CCD0]' : 'text-gray-500 hover:text-gray-800'
 }`}
 >
 {t('myRequests.tabOffers')}
 {activeTab === 'offers' && (
 <div className="absolute bottom-0 start-0 w-full h-0.5 bg-[#47CCD0] rounded-t-full" />
 )}
 </button>
 </div>

 {/* Stats Row */}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 {stats[activeTab].map((stat, idx) => (
 <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
 <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
 <stat.icon size={24} />
 </div>
 <div>
 <p className="text-sm text-gray-500 font-medium">{t(stat.labelKey)}</p>
 <h4 className="text-2xl font-bold text-[#2B3D50]">{stat.value}</h4>
 </div>
 </div>
 ))}
 </div>

 {/* Main Content Area */}
 <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
 {/* Search Header */}
 <div className="p-5 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
 <div className="relative flex-1 max-w-md">
 <Search className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
 <input
 type="text"
 placeholder={activeTab === 'requests' ? t('myRequests.searchRequestsPlaceholder') : t('myRequests.searchOffersPlaceholder')}
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="w-full ps-4 pe-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#47CCD0]/20 focus:border-[#47CCD0] transition-all"
 />
 </div>
 <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
 <Filter size={18} />
 </button>
 </div>

 {/* List */}
 <div className="p-5">
 {filteredData.length > 0 ? (
 <div className="space-y-4">
 {activeTab === 'requests' ? (
 // Requests List
 (filteredData as typeof filteredRequests).map((request) => (
 <div key={request.id} className="flex flex-col md:flex-row justify-between gap-5 p-5 rounded-xl border border-gray-100 hover:border-[#47CCD0] hover:shadow-md transition-all group bg-white">
 <div className="flex-1">
 <div className="flex items-center gap-3 mb-2">
 <span className="text-xs font-mono font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{request.id}</span>
 {getStatusBadge(request.status)}
 <span className="flex items-center gap-1 text-[11px] font-bold text-gray-500 bg-gray-50 px-2 py-0.5 rounded border border-gray-200">
 {request.typeRaw === 'realestate' ? <Building2 size={12} /> : <Car size={12} />} {t(request.typeKey)}
 </span>
 </div>
 <h3 className="font-bold text-lg text-[#2B3D50] mb-1">{t(request.titleKey)}</h3>
 <p className="text-sm text-gray-500 mb-4">{t(request.detailsKey)}</p>

 <div className="flex flex-wrap items-center gap-4 text-sm">
 <div className="flex items-center gap-1.5 text-gray-600">
 <Clock size={16} className="text-gray-400" />
 <span>{t(request.dateKey)}</span>
 </div>
 <div className="w-px h-4 bg-gray-200 hidden sm:block"></div>
 <div className="flex items-center gap-1.5 text-gray-600">
 <span className="text-gray-400 text-xs">{t('myRequests.proposedBudget')}</span>
 <span className="font-mono font-bold flex items-center gap-1">{request.budget} <RiyalSymbol className="w-3 h-3 text-gray-900" /></span>
 </div>
 </div>
 </div>

 <div className="flex md:flex-col items-center justify-between md:justify-center gap-3 md:border-e border-gray-100 md:pe-6 md:min-w-[160px]">
 <div className="text-center">
 <p className="text-[11px] text-gray-500 mb-1">{t('myRequests.receivedOffers')}</p>
 <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#47CCD0]/10 text-[#47CCD0] font-bold text-lg border border-[#47CCD0]/20">
 {request.offersCount}
 </div>
 </div>
 <button className="w-full md:w-auto px-4 py-2 bg-white border border-gray-200 hover:border-[#47CCD0] hover:text-[#47CCD0] text-gray-700 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2">
 <Eye size={16} /> {t('myRequests.details')}
 </button>
 </div>
 </div>
 ))
 ) : (
 // Offers List
 (filteredData as typeof filteredOffers).map((offer) => (
 <div key={offer.id} className="flex flex-col md:flex-row justify-between gap-5 p-5 rounded-xl border border-gray-100 hover:border-[#47CCD0] hover:shadow-md transition-all group bg-white">
 <div className="flex-1">
 <div className="flex items-center gap-3 mb-2">
 <span className="text-xs font-mono font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{offer.id}</span>
 {getStatusBadge(offer.status)}
 </div>
 <div className="mb-3">
 <p className="text-[11px] text-gray-500 mb-0.5">{t('myRequests.submittedOnRequest')}</p>
 <h3 className="font-bold text-md text-[#2B3D50]">{t(offer.requestTitleKey)}</h3>
 </div>

 <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
 <div className="w-8 h-8 rounded-full bg-[#2B3D50] flex items-center justify-center text-white text-xs font-bold">
 {t(offer.providerKey).charAt(0)}
 </div>
 <div>
 <p className="text-sm font-bold text-gray-900">{t(offer.providerKey)}</p>
 <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-0.5">
 <span className="text-yellow-500">★</span> {offer.rating} {t('myRequests.providerRating')}
 </div>
 </div>
 </div>
 </div>

 <div className="flex md:flex-col items-center justify-between md:justify-center gap-4 md:border-e border-gray-100 md:pe-6 md:min-w-[180px]">
 <div className="text-center w-full bg-[#F8FAFB] p-3 rounded-lg border border-gray-100">
 <p className="text-[11px] text-gray-500 mb-1">{t('myRequests.offerValue')}</p>
 <p className="font-mono font-bold text-[#47CCD0] text-lg flex items-center gap-1 justify-center sm:justify-start">{offer.amount} <RiyalSymbol className="w-4 h-4 text-gray-500" /></p>
 </div>
 <div className="flex gap-2 w-full">
 <button className="flex-1 px-3 py-2 bg-[#2B3D50] hover:bg-[#1a2533] text-white text-xs font-bold rounded-lg transition-all text-center">
 {t('myRequests.accept')}
 </button>
 <button className="flex-1 px-3 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-lg transition-all text-center">
 {t('myRequests.details')}
 </button>
 </div>
 </div>
 </div>
 ))
 )}
 </div>
 ) : (
 <div className="flex flex-col items-center justify-center py-16 text-center">
 <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-4">
 <Search size={32} />
 </div>
 <h4 className="text-lg font-bold text-gray-900 mb-2">{t('myRequests.noResults')}</h4>
 <p className="text-gray-500 text-sm max-w-sm">{t('myRequests.noResultsDesc')}</p>
 </div>
 )}
 </div>
 </div>
 </div>
 );
};
