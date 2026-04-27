import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from './ui/dialog';
import {
  MapPin,
  Clock,
  Maximize,
  ChevronLeft,
  Share2,
  Heart,
  Building,
  X
} from 'lucide-react';
import { RiyalSymbol } from './ui/RiyalSymbol';
import { useTranslation } from 'react-i18next';

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  auction: any;
  onNavigate?: (page: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  isOpen,
  onClose,
  auction,
  onNavigate
}) => {
  const { t } = useTranslation();
  if (!auction) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white rounded-3xl border-0 gap-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full max-h-[90vh] lg:max-h-[600px] overflow-y-auto lg:overflow-hidden">

          {/* Image Side */}
          <div className="relative h-64 lg:h-full bg-gray-100">
            <img
              src={auction.image}
              alt={auction.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 end-4 z-10">
              <span className={`${auction.statusColor} text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5`}>
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                {auction.status}
              </span>
            </div>
          </div>

          {/* Details Side */}
          <div className="p-6 lg:p-8 flex flex-col h-full bg-white">

            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
                  <span className="bg-gray-100 px-2 py-0.5 rounded font-mono">{auction.code}</span>
                  <span className="text-[#47CCD0] font-bold">#{auction.type}</span>
                </div>
                <DialogTitle className="text-2xl font-bold text-gray-900 mb-2 leading-tight">{auction.title}</DialogTitle>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <MapPin size={16} className="text-[#47CCD0]" />
                  <span>{auction.location}</span>
                </div>
              </div>
              <DialogClose className="text-gray-400 hover:text-gray-600 transition-colors p-1 bg-gray-50 rounded-full">
                <X size={20} />
              </DialogClose>
            </div>

            {/* Price Box */}
            <div className="bg-[#F8F9FA] p-5 rounded-3xl mb-6 relative overflow-hidden border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    <span className="text-xs font-bold text-gray-700">{t('quickView.currentPrice')}</span>
                    <span className="text-[9px] bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded">{t('quickView.includesTax')}</span>
                  </div>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl lg:text-3xl font-black font-mono text-[#47CCD0] tracking-tight">{auction.currentBid.toLocaleString()}</span>
                    <RiyalSymbol className="w-4 h-4 text-gray-600" />
                  </div>
                </div>
                <div className="text-start">
                  <span className="text-[10px] font-bold text-gray-400 block mb-1">{t('quickView.openingPrice')}</span>
                  <div className="flex items-baseline gap-1 justify-end opacity-70">
                    <span className="text-sm font-bold font-mono text-gray-500 line-through decoration-red-400">{auction.openingBid?.toLocaleString() || (auction.currentBid * 0.8).toLocaleString()}</span>
                    <RiyalSymbol className="w-3 h-3 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-100 hover:border-[#47CCD0]/30 transition-colors bg-white shadow-sm">
                <Maximize size={20} className="text-[#47CCD0] mb-2" />
                <span className="text-sm font-bold text-gray-900">{auction.area.toLocaleString()}</span>
                <span className="text-xs text-gray-500">{t('quickView.sqm')}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-100 hover:border-[#47CCD0]/30 transition-colors bg-white shadow-sm">
                <Clock size={20} className="text-[#47CCD0] mb-2" />
                <span className="text-sm font-bold text-gray-900" dir="ltr">{auction.timeLeft.split(' ')[0]}</span>
                <span className="text-xs text-gray-500">{t('quickView.daysLeft')}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-100 hover:border-[#47CCD0]/30 transition-colors bg-white shadow-sm">
                <Building size={20} className="text-[#47CCD0] mb-2" />
                <span className="text-sm font-bold text-gray-900">{auction.type}</span>
                <span className="text-xs text-gray-500">{t('quickView.category')}</span>
              </div>
            </div>

            {/* Description Preview */}
            <DialogDescription className="text-gray-500 text-sm leading-relaxed mb-8 flex-1">
              {auction.description || t('quickView.descriptionPlaceholder')}
            </DialogDescription>

            {/* Action Buttons */}
            <div className="mt-auto space-y-3">
              <button className="w-full py-3.5 bg-[#47CCD0] text-white rounded-xl font-bold shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                {t('quickView.bidNow')}
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    onClose();
                    onNavigate?.('auction-details');
                  }}
                  className="flex-1 py-3 bg-white border border-gray-200 text-gray-900 rounded-xl font-bold hover:bg-gray-50 transition-all text-sm"
                >
                  {t('quickView.viewFullDetails')}
                </button>
                <button className="p-3 border border-gray-200 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 transition-all">
                  <Heart size={20} />
                </button>
                <button className="p-3 border border-gray-200 rounded-xl text-gray-400 hover:text-[#47CCD0] hover:bg-teal-50 hover:border-[#47CCD0] transition-all">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
