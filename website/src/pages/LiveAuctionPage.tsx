import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Timer,
  Gavel,
  User,
  Clock,
  Maximize,
  Info,
  FileText,
  ChevronLeft,
  ShieldCheck,
  Eye,
  Send,
  Heart,
  Share2,
  Volume2,
  VolumeX,
  Radio
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RiyalSymbol } from '../components/ui/RiyalSymbol';
import { useTranslation } from 'react-i18next';

interface LiveAuctionPageProps {
  onNavigate: (page: string) => void;
}

export const LiveAuctionPage: React.FC<LiveAuctionPageProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const [currentBid, setCurrentBid] = useState(2500000);
  const [isMuted, setIsMuted] = useState(true);
  const [activeTab, setActiveTab] = useState('details');
  const [bidAmount, setBidAmount] = useState<string>('');

  // Fake chat/log
  const [logs, setLogs] = useState([
    { id: 1, type: 'bid', user: t('liveAuction.user1'), amount: 2450000, time: '10:45:10' },
    { id: 2, type: 'system', message: t('liveAuction.auctionOpenedMsg'), time: '10:30:00' },
    { id: 3, type: 'bid', user: t('liveAuction.user2'), amount: 2500000, time: '10:46:22' },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  // Simulate incoming bids
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newBid = currentBid + 50000;
        setCurrentBid(newBid);
        setLogs(prev => [...prev, {
          id: Date.now(),
          type: 'bid',
          user: `${t('liveAuction.bidderPrefix')} ${Math.floor(Math.random() * 1000)}`,
          amount: newBid,
          time: new Date().toLocaleTimeString('ar-SA')
        }]);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentBid]);

  const handleBid = (amount: number) => {
    const newBid = currentBid + amount;
    setCurrentBid(newBid);
    setLogs(prev => [...prev, {
      id: Date.now(),
      type: 'bid',
      user: t('liveAuction.you'),
      amount: newBid,
      time: new Date().toLocaleTimeString('ar-SA')
    }]);
  };

  return (
    <div className="pt-36 min-h-screen bg-gray-50 pb-20">

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200 py-4 mb-6">
        <div className="w-full max-w-[1440px] mx-auto px-4 flex items-center gap-2 text-sm text-gray-500">
           <span className="cursor-pointer hover:text-[#47CCD0]" onClick={() => onNavigate('home')}>{t('liveAuction.breadcrumbHome')}</span>
           <ChevronLeft size={14} />
           <span className="cursor-pointer hover:text-[#47CCD0]" onClick={() => onNavigate('auctions')}>{t('liveAuction.breadcrumbAuctions')}</span>
           <ChevronLeft size={14} />
           <span className="text-gray-900 font-bold">{t('liveAuction.breadcrumbCurrent')}</span>
        </div>
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* --- LEFT COLUMN (Video & Info) --- */}
          <div className="lg:col-span-8 space-y-6">

            {/* Video Player */}
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden group shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1726087163038-2910e4de29e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwbGFuZCUyMGNvbnN0cnVjdGlvbiUyMHNpdGUlMjByaXlhZGglMjBzYXVkaSUyMGFyYWJpYXxlbnwxfHx8fDE3NjQ2MzUyNDd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Live Stream"
                className="w-full h-full object-cover opacity-80"
              />

              {/* Overlays */}
              <div className="absolute top-4 end-4 flex items-center gap-2 z-10">
                <div className="bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-2 animate-pulse">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  {t('liveAuction.liveBadge')}
                </div>
                <div className="bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs flex items-center gap-2">
                  <Eye size={14} /> {t('liveAuction.viewerCount')}
                </div>
              </div>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="absolute bottom-4 start-4 bg-black/50 hover:bg-black/70 backdrop-blur-md text-white p-2 rounded-lg transition-colors z-10"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 {/* Play Button Placeholder if needed, but for "Live" it usually auto-plays */}
              </div>
            </div>

            {/* Property Header Info */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 start-0 w-full h-1 bg-gradient-to-r from-[#47CCD0] to-transparent"></div>

               <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                 <div>
                   <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                     <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-mono">MZ-1024</span>
                     <span>•</span>
                     <span className="text-[#47CCD0]">{t('liveAuction.propertyType')}</span>
                   </div>
                   <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('liveAuction.propertyTitle')}</h1>
                   <p className="text-gray-500 flex items-center gap-2">
                     <MapPin size={16} className="text-[#47CCD0]" /> {t('liveAuction.propertyLocation')}
                   </p>
                 </div>

                 <div className="flex gap-2">
                   <button className="p-3 bg-gray-50 rounded-xl text-gray-600 hover:bg-[#47CCD0] hover:text-white transition-colors">
                     <Share2 size={20} />
                   </button>
                   <button className="p-3 bg-gray-50 rounded-xl text-gray-600 hover:text-red-500 transition-colors">
                     <Heart size={20} />
                   </button>
                 </div>
               </div>

               {/* Key Specs */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-gray-100">
                  <div className="text-center">
                     <p className="text-gray-400 text-xs mb-1">{t('liveAuction.specArea')}</p>
                     <p className="font-bold text-lg flex items-center justify-center gap-1">
                        2,500 <span className="text-xs font-normal text-gray-500">{t('liveAuction.sqm')}</span>
                     </p>
                  </div>
                  <div className="text-center border-e border-gray-100">
                     <p className="text-gray-400 text-xs mb-1">{t('liveAuction.specDeedType')}</p>
                     <p className="font-bold text-lg">{t('liveAuction.specDeedValue')}</p>
                  </div>
                  <div className="text-center border-e border-gray-100">
                     <p className="text-gray-400 text-xs mb-1">{t('liveAuction.specUsage')}</p>
                     <p className="font-bold text-lg">{t('liveAuction.specUsageValue')}</p>
                  </div>
                  <div className="text-center border-e border-gray-100">
                     <p className="text-gray-400 text-xs mb-1">{t('liveAuction.specFacing')}</p>
                     <p className="font-bold text-lg">{t('liveAuction.specFacingValue')}</p>
                  </div>
               </div>

               {/* Tabs */}
               <div className="mt-6">
                  <div className="flex border-b border-gray-200 mb-4">
                    {['details', 'files', 'location'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-3 text-sm font-bold relative ${activeTab === tab ? 'text-[#47CCD0]' : 'text-gray-500 hover:text-gray-800'}`}
                      >
                        {tab === 'details' && t('liveAuction.tabDetails')}
                        {tab === 'files' && t('liveAuction.tabFiles')}
                        {tab === 'location' && t('liveAuction.tabLocation')}
                        {activeTab === tab && (
                          <motion.div layoutId="activeTab" className="absolute bottom-0 start-0 end-0 h-0.5 bg-[#47CCD0]" />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="min-h-[200px] text-gray-600 text-sm leading-relaxed">
                    {activeTab === 'details' && (
                      <p>
                        {t('liveAuction.detailsText')}
                      </p>
                    )}
                    {activeTab === 'files' && (
                      <div className="space-y-3">
                         <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <div className="flex items-center gap-3">
                               <FileText size={20} className="text-[#47CCD0]" />
                               <span>{t('liveAuction.file1Name')}</span>
                            </div>
                            <button className="text-xs text-[#47CCD0] font-bold">{t('liveAuction.download')}</button>
                         </div>
                         <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <div className="flex items-center gap-3">
                               <FileText size={20} className="text-[#47CCD0]" />
                               <span>{t('liveAuction.file2Name')}</span>
                            </div>
                            <button className="text-xs text-[#47CCD0] font-bold">{t('liveAuction.download')}</button>
                         </div>
                      </div>
                    )}
                  </div>
               </div>
            </div>

          </div>

          {/* --- RIGHT COLUMN (Bidding Panel) --- */}
          <div className="lg:col-span-4 space-y-4">

            {/* 1. Timer & Status */}
            <div className="bg-[#1a1a1a] text-white p-4 rounded-xl flex items-center justify-between shadow-lg">
               <div className="flex items-center gap-2">
                 <Radio size={18} className="text-red-500 animate-pulse" />
                 <span className="font-bold">{t('liveAuction.onAirLabel')}</span>
               </div>
               <div className="flex items-center gap-2 font-mono text-xl text-[#47CCD0]">
                 <Clock size={18} />
                 <span>00:45:20</span>
               </div>
            </div>

            {/* 2. Current Price */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center">
               <div className="flex flex-col items-center gap-1 mb-2">
                 <p className="text-gray-400 text-xs line-through decoration-red-400 flex items-center gap-1">{t('liveAuction.openingPrice')} <RiyalSymbol className="w-3 h-3 text-gray-400" /></p>
                 <div className="flex items-center gap-2">
                   <p className="text-gray-500 text-sm font-bold">{t('liveAuction.currentPriceLabel')}</p>
                   <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{t('liveAuction.vatIncluded')}</span>
                 </div>
               </div>
               <div className="text-4xl font-black text-[#47CCD0] flex items-center justify-center gap-2 mt-3 mb-3 font-mono tracking-tight">
                 {currentBid.toLocaleString()}
                 <RiyalSymbol className="w-5 h-5 text-gray-600" />
               </div>
               <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-600">
                 <span className="flex items-center gap-1">{t('liveAuction.minBidLabel')} <RiyalSymbol className="w-2.5 h-2.5 text-gray-500" /></span>
               </div>
            </div>

            {/* 3. Bid Log (Chat style) */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[400px]">
               <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-sm flex justify-between items-center">
                 <span>{t('liveAuction.bidLogTitle')}</span>
                 <span className="text-xs font-normal text-gray-500">{logs.length} {t('liveAuction.operations')}</span>
               </div>

               <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                 {logs.map((log) => (
                   <motion.div
                     key={log.id}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className={`flex items-start gap-3 ${log.type === 'system' ? 'justify-center' : ''}`}
                   >
                     {log.type === 'system' ? (
                       <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-1 rounded-full">{log.message}</span>
                     ) : (
                       <>
                         <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${log.user === t('liveAuction.you') ? 'bg-[#47CCD0] text-white' : 'bg-gray-200 text-gray-600'}`}>
                           {log.user === t('liveAuction.you') ? <User size={14}/> : log.user.charAt(0)}
                         </div>
                         <div className="flex-1">
                           <div className="flex items-center justify-between">
                             <span className="text-xs font-bold text-gray-900">{log.user}</span>
                             <span className="text-[10px] text-gray-400" dir="ltr">{log.time}</span>
                           </div>
                           <div className="text-sm font-mono text-[#47CCD0] font-bold flex items-center justify-end gap-1">
                             {log.amount?.toLocaleString()} <RiyalSymbol className="w-3 h-3" />
                           </div>
                         </div>
                       </>
                     )}
                   </motion.div>
                 ))}
                 <div ref={messagesEndRef} />
               </div>
            </div>

            {/* 4. Controls */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm sticky bottom-4">
              <div className="grid grid-cols-2 gap-2 mb-3">
                 <button onClick={() => handleBid(10000)} className="py-2 bg-gray-50 hover:bg-gray-100 text-[#47CCD0] font-bold rounded-lg border border-gray-200 hover:border-[#47CCD0] transition-all text-sm">
                   + 10,000
                 </button>
                 <button onClick={() => handleBid(50000)} className="py-2 bg-gray-50 hover:bg-gray-100 text-[#47CCD0] font-bold rounded-lg border border-gray-200 hover:border-[#47CCD0] transition-all text-sm">
                   + 50,000
                 </button>
              </div>

              <div className="flex gap-2 mb-3">
                 <input
                   type="number"
                   min="0"
                   placeholder={t('liveAuction.customAmountPlaceholder')}
                   value={bidAmount}
                   onChange={(e) => {
                     let val = Number(e.target.value);
                     if (val < 0) val = 0;
                     setBidAmount(val ? val.toString() : '');
                   }}
                   className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#47CCD0]"
                 />
              </div>

              <button
                onClick={() => { if(bidAmount) handleBid(Number(bidAmount)); setBidAmount(''); }}
                className="w-full bg-[#47CCD0] text-white py-3 rounded-xl font-bold shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
              >
                <Gavel size={20} />
                {t('liveAuction.confirmBid')}
              </button>

              <p className="text-[10px] text-gray-400 text-center mt-3">
                {t('liveAuction.bidDisclaimer')}
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
