import React, { useState } from 'react';
import {
 ArrowRight,
 Timer,
 Gavel,
 AlertCircle,
 CheckCircle2,
 History,
 ShieldCheck,
 CreditCard,
 User,
 Share2,
 Plus,
 Minus,
 Phone,
 MessageCircle,
 Building2
} from 'lucide-react';
import { BackButton } from '../components/ui/BackButton';
import { SaudiPlate } from '../components/auctions/SaudiPlate';
import sarCurrency from 'figma:asset/3f649d4624729213a9513bf0153522436e1f6f47.png';
import { RiyalSymbol } from '../components/ui/RiyalSymbol';
import { useTranslation } from 'react-i18next';

interface PlateDetailsPageProps {
 onNavigate?: (page: string) => void;
}

export const PlateDetailsPage: React.FC<PlateDetailsPageProps> = ({ onNavigate }) => {
 const { t } = useTranslation();
 const [bidAmount, setBidAmount] = useState<number>(2500000);
 const [activeTab, setActiveTab] = useState<'history' | 'details'>('history');

 // Mock Data for a specific plate
 const plate = {
 id: 1,
 letters: t('plateDetails.plateLetters'),
 numbers: t('plateDetails.plateNumbers'),
 type: 'private',
 currentPrice: 1800000,
 deposit: 100000,
 minIncrement: 10000,
 endTime: '2025-06-20T18:00:00',
 timeLeft: '02 d : 15 h : 30 m',
 bidsCount: 45,
 status: 'diamond'
 };

 const bidHistory = [
 { id: 1, bidder: t('plateDetails.bidder1'), amount: 250000, time: t('plateDetails.time1') },
 { id: 2, bidder: t('plateDetails.bidder2'), amount: 245000, time: t('plateDetails.time2') },
 { id: 3, bidder: t('plateDetails.bidder3'), amount: 240000, time: t('plateDetails.time3') },
 { id: 4, bidder: t('plateDetails.bidder4'), amount: 235000, time: t('plateDetails.time4') },
 { id: 5, bidder: t('plateDetails.bidder5'), amount: 230000, time: t('plateDetails.time5') },
 ];

 const handleIncrease = () => {
 setBidAmount(prev => prev + plate.minIncrement);
 };

 const handleDecrease = () => {
 if (bidAmount > Math.max(0, plate.currentPrice)) {
 setBidAmount(prev => Math.max(0, Math.max(plate.currentPrice, prev - plate.minIncrement)));
 }
 };

 // Calculations
 const vatRate = 0.15;
 const commissionRate = 0.025;
 const vatAmount = bidAmount * vatRate;
 const commissionAmount = bidAmount * commissionRate;
 const totalAmount = bidAmount + vatAmount + commissionAmount;

 return (
 <div className="pt-36 pb-20 min-h-screen bg-gray-50 font-sans">

 {/* Breadcrumbs & Header */}
 <div className="bg-white border-b border-gray-200">
 <div className="container mx-auto px-4 py-4">
 <div className="mb-4">
 <BackButton onClick={() => onNavigate?.('car-plates-auctions')} label={t('plateDetails.backBtn')} className="!px-0 hover:bg-transparent" />
 </div>

 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
 <span className="text-[#47CCD0]">#</span>
 {t('plateDetails.pageTitle')}: {plate.letters} {plate.numbers}
 </h1>
 <div className="flex items-center gap-3">
 <span className="px-3 py-1 bg-green-50 text-green-700 text-sm font-bold rounded-full border border-green-200 flex items-center gap-2">
 <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
 {t('plateDetails.statusLive')}
 </span>
 <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-bold rounded-full border border-blue-200">
 {t('plateDetails.plateDiamond')}
 </span>
 </div>
 </div>
 </div>
 </div>

 <div className="container mx-auto px-4 py-8">
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

 {/* RIGHT COLUMN: Plate Visualization & Details (8 cols) */}
 <div className="lg:col-span-8 space-y-6">

 {/* Visual Card */}
 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
 <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-12 flex flex-col items-center justify-center border-b border-gray-200 relative">
 <div className="scale-125 transform transition-transform hover:scale-150 duration-500">
 <SaudiPlate letters={plate.letters} numbers={plate.numbers} type={plate.type as any} size="lg" />
 </div>
 </div>

 {/* Key Stats Strip */}
 <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-x-reverse divide-gray-100 bg-white">
 <div className="p-6 text-center group hover:bg-gray-50 transition-colors">
 <div className="w-10 h-10 mx-auto bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
 <Gavel size={20} />
 </div>
 <p className="text-xs text-gray-500 mb-1">{t('plateDetails.bidsCount')}</p>
 <p className="font-bold text-lg text-gray-900">{plate.bidsCount}</p>
 </div>
 <div className="p-6 text-center group hover:bg-gray-50 transition-colors">
 <div className="w-10 h-10 mx-auto bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
 <CreditCard size={20} />
 </div>
 <p className="text-xs text-gray-500 mb-1">{t('plateDetails.nominalValue')}</p>
 <p className="font-bold text-lg text-gray-900 font-mono flex items-center justify-center gap-1">500 <RiyalSymbol className="w-4 h-4 text-gray-500" /></p>
 </div>
 <div className="p-6 text-center group hover:bg-gray-50 transition-colors">
 <div className="w-10 h-10 mx-auto bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
 <ShieldCheck size={20} />
 </div>
 <p className="text-xs text-gray-500 mb-1">{t('plateDetails.plateCondition')}</p>
 <p className="font-bold text-lg text-gray-900">{t('plateDetails.plateConditionValue')}</p>
 </div>
 <div className="p-6 text-center group hover:bg-gray-50 transition-colors">
 <div className="w-10 h-10 mx-auto bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
 <User size={20} />
 </div>
 <p className="text-xs text-gray-500 mb-1">{t('plateDetails.currentBidder')}</p>
 <p className="font-bold text-lg text-gray-900">{t('plateDetails.currentBidderValue')}</p>
 </div>
 </div>
 </div>

 {/* Info Tabs */}
 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
 <div className="flex border-b border-gray-200">
 <button
 onClick={() => setActiveTab('history')}
 className={`flex-1 py-4 font-bold text-sm relative ${activeTab === 'history' ? 'text-[#47CCD0]' : 'text-gray-500 hover:text-gray-700'}`}
 >
 <span className="flex items-center justify-center gap-2">
 <History size={18} />
 {t('plateDetails.tabHistory')}
 </span>
 {activeTab === 'history' && <div className="absolute bottom-0 start-0 w-full h-0.5 bg-[#47CCD0]"></div>}
 </button>
 <button
 onClick={() => setActiveTab('details')}
 className={`flex-1 py-4 font-bold text-sm relative ${activeTab === 'details' ? 'text-[#47CCD0]' : 'text-gray-500 hover:text-gray-700'}`}
 >
 <span className="flex items-center justify-center gap-2">
 <AlertCircle size={18} />
 {t('plateDetails.tabTerms')}
 </span>
 {activeTab === 'details' && <div className="absolute bottom-0 start-0 w-full h-0.5 bg-[#47CCD0]"></div>}
 </button>
 </div>

 <div className="p-6 min-h-[300px]">
 {activeTab === 'history' ? (
 <div className="overflow-x-auto">
 <table className="w-full text-end">
 <thead>
 <tr className="border-b border-gray-100">
 <th className="pb-4 text-xs text-gray-500 font-medium">{t('plateDetails.colBidder')}</th>
 <th className="pb-4 text-xs text-gray-500 font-medium">{t('plateDetails.colBidAmount')}</th>
 <th className="pb-4 text-xs text-gray-500 font-medium">{t('plateDetails.colTime')}</th>
 <th className="pb-4 text-xs text-gray-500 font-medium">{t('plateDetails.colStatus')}</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-50">
 {bidHistory.map((bid, index) => (
 <tr key={bid.id} className="group hover:bg-gray-50 transition-colors">
 <td className="py-4 text-sm font-bold text-gray-900">
 <div className="flex items-center gap-2">
 <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${index === 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>
 {bid.bidder.charAt(0)}
 </div>
 {bid.bidder}
 </div>
 </td>
 <td className="py-4 text-sm font-mono font-bold text-gray-900 flex items-center gap-1">{bid.amount.toLocaleString()} <RiyalSymbol className="w-3 h-3 text-gray-500" /></td>
 <td className="py-4 text-sm text-gray-500">{bid.time}</td>
 <td className="py-4">
 {index === 0 ? (
 <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-md">{t('plateDetails.statusLeading')}</span>
 ) : (
 <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md">{t('plateDetails.statusOutbid')}</span>
 )}
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 ) : (
 <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
 <p>{t('plateDetails.term1')}</p>
 <p className="flex items-center flex-wrap gap-1">{t('plateDetails.term2')} <RiyalSymbol className="w-3 h-3 text-gray-700" /> {t('plateDetails.term2Suffix')}</p>
 <p>{t('plateDetails.term3')}</p>
 <p>{t('plateDetails.term4')}</p>
 </div>
 )}
 </div>
 </div>
 </div>

 {/* LEFT COLUMN: Bidding Action (4 cols) */}
 <div className="lg:col-span-4">

 <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden sticky top-24">
 {/* Header Share */}
 <div className="py-3 text-center border-b border-gray-50">
 <button className="text-gray-500 flex items-center justify-center gap-2 text-sm font-medium hover:text-[#47CCD0] transition-colors">
 <Share2 size={16} />
 {t('plateDetails.share')}
 </button>
 </div>

 {/* Teal Banner - Timer */}
 <div className="bg-[#47CCD0] text-white p-5 text-center relative overflow-hidden">
 <div className="relative z-10">
 <p className="text-lg font-bold mb-1">{t('plateDetails.auctionEndsIn')}</p>
 <p className="text-3xl font-mono font-bold tracking-wider" dir="ltr">{plate.timeLeft}</p>
 <p className="text-xs text-white/80 mt-2">{t('plateDetails.timerNote')}</p>
 </div>
 {/* Decoration Circles */}
 <div className="absolute -start-4 -top-4 w-24 h-24 rounded-full border-4 border-white/20"></div>
 <div className="absolute -end-10 bottom-0 w-32 h-32 rounded-full bg-white/10"></div>
 </div>

 <div className="p-6">
 {/* Prices Row */}
 <div className="flex justify-between items-start mb-8">
 <div className="text-end">
 <p className="text-gray-500 text-xs mb-1">{t('plateDetails.depositAmount')}</p>
 <div className="flex items-center gap-1.5">
 <span className="text-xl font-bold text-gray-900 font-mono tracking-tight">{plate.deposit.toLocaleString()}</span>
 <RiyalSymbol className="w-5 h-5 text-gray-600" />
 </div>
 </div>
 <div className="text-start">
 <p className="text-gray-500 text-xs mb-1">{t('plateDetails.openingPrice')}</p>
 <div className="flex items-center gap-1.5 justify-end">
 <span className="text-xl font-bold text-gray-900 font-mono tracking-tight">{plate.currentPrice.toLocaleString()}</span>
 <RiyalSymbol className="w-5 h-5 text-gray-600" />
 </div>
 </div>
 </div>

 {/* Bidding Control */}
 <div className="bg-gray-50 rounded-2xl p-4 mb-6 border border-gray-100">
 <div className="flex justify-between items-center mb-3">
 <p className="text-sm font-bold text-gray-900">{t('plateDetails.submitBidNow')}</p>
 <div className="text-xs text-gray-500 flex items-center gap-1">
 <AlertCircle size={12} />
 <span className="font-mono flex items-center gap-1">({plate.minIncrement.toLocaleString()} <RiyalSymbol className="w-3 h-3 text-gray-500" /> {t('plateDetails.increment')})</span>
 </div>
 </div>

 <div className="flex items-center bg-white rounded-xl border border-gray-200 shadow-sm h-14 overflow-hidden">
 <button
 onClick={handleDecrease}
 disabled={bidAmount <= plate.currentPrice}
 className="w-14 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors border-s border-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
 >
 <Minus size={20} />
 </button>
 <div className="flex-1 h-full flex items-center justify-center font-bold text-xl text-gray-900 font-mono tracking-wide">
 {bidAmount.toLocaleString()}
 </div>
 <button
 onClick={handleIncrease}
 className="w-14 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors border-e border-gray-100"
 >
 <Plus size={20} />
 </button>
 </div>
 </div>

 {/* Action Button */}
 <button className="w-full py-4 bg-[#0f172a] text-white rounded-xl font-bold text-lg hover:bg-[#1e293b] transition-colors shadow-lg shadow-gray-200 mb-8">
 {t('plateDetails.registerNow')}
 </button>

 {/* Breakdown */}
 <div className="space-y-3 mb-8 border-t border-dashed border-gray-200 pt-6">
 <div className="flex justify-between items-center text-sm">
 <span className="text-gray-500">{t('plateDetails.vat15')}</span>
 <div className="flex items-center gap-1 font-mono font-medium text-gray-600">
 {vatAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} <RiyalSymbol className="w-3 h-3 text-gray-600" />
 </div>
 </div>
 <div className="flex justify-between items-center text-sm">
 <span className="text-gray-500">{t('plateDetails.sqmPrice')}</span>
 <div className="flex items-center gap-1 font-mono font-medium text-gray-600">
 - <RiyalSymbol className="w-3 h-3 text-gray-600" />
 </div>
 </div>
 <div className="flex justify-between items-center text-sm">
 <span className="text-gray-500">{t('plateDetails.commission25')}</span>
 <div className="flex items-center gap-1 font-mono font-medium text-gray-600">
 {commissionAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} <RiyalSymbol className="w-3 h-3 text-gray-600" />
 </div>
 </div>

 <div className="my-4 border-b border-gray-100"></div>

 <div className="flex justify-between items-center">
 <span className="font-bold text-gray-900 text-lg">{t('plateDetails.total')}</span>
 <div className="flex items-center gap-1.5 font-bold text-xl text-gray-900 font-mono">
 {totalAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} <RiyalSymbol className="w-5 h-5 text-gray-500" />
 </div>
 </div>
 </div>

 {/* Agent Info */}
 <div className="flex items-center justify-between border-t border-gray-100 pt-6 mb-6">
 <div className="text-end">
 <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded text-[10px] text-gray-500 mb-1">
 <span>{t('plateDetails.salesAgent')}</span>
 <ShieldCheck size={10} />
 </div>
 <h4 className="font-bold text-gray-900 text-sm">{t('plateDetails.platformName')}</h4>
 <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
 <AlertCircle size={10} />
 {t('plateDetails.faalLicense')}
 </p>
 <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
 <AlertCircle size={10} />
 {t('plateDetails.auctionLicense')}
 </p>
 </div>
 <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200 text-gray-400">
 <Building2 size={24} />
 </div>
 </div>

 {/* Contact Buttons */}
 <div className="flex gap-3">
 <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#eefcfc] text-[#47CCD0] rounded-xl font-bold text-sm hover:bg-[#dffafa] transition-colors">
 <MessageCircle size={18} />
 {t('plateDetails.whatsapp')}
 </button>
 <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors">
 <Phone size={18} />
 {t('plateDetails.call')}
 </button>
 </div>
 </div>
 </div>

 </div>
 </div>
 </div>
 </div>
 );
};
