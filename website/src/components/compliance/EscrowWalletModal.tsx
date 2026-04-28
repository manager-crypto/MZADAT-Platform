import React, { useState } from 'react';
import { Loader2, ShieldCheck, CheckCircle2, AlertCircle, Building2 } from 'lucide-react';
import { SamaCompliance } from '../../services/complianceApi';
import { logger } from '../../utils/logger';
import { RiyalSymbol } from '../ui/RiyalSymbol';

interface EscrowWalletModalProps {
 isOpen: boolean;
 onClose: () => void;
 bidAmount: number;
 auctionId: string;
 onConfirm: () => void;
}

export const EscrowWalletModal: React.FC<EscrowWalletModalProps> = ({ 
 isOpen, 
 onClose, 
 bidAmount, 
 auctionId, 
 onConfirm 
}) => {
 const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
 
 // Calculate 10% escrow hold per SAMA policy for auctions
 const escrowAmount = bidAmount * 0.10;

 const handleEscrowHold = async () => {
 setStatus('processing');
 try {
 // Simulate API call to SAMA compliance service
 await SamaCompliance.holdEscrow(escrowAmount, auctionId);
 
 setTimeout(() => {
 setStatus('success');
 logger.trackBidEvent(auctionId, bidAmount, true);
 setTimeout(() => {
 onConfirm();
 onClose();
 setStatus('idle');
 }, 2000);
 }, 1500);
 
 } catch (error) {
 console.error(error);
 setStatus('error');
 logger.trackBidEvent(auctionId, bidAmount, false, 'Escrow hold failed via SAMA API');
 }
 };

 if (!isOpen) return null;

 return (
 <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
 <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-fade-up">
 
 {/* Header */}
 <div className="bg-[#2B3D50] p-6 text-center relative">
 <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
 <Building2 size={32} className="text-[#47CCD0]" />
 </div>
 <h2 className="text-xl font-bold text-white">المحفظة الضامنة (Escrow)</h2>
 <p className="text-gray-300 text-sm mt-1">امتثالاً لسياسات البنك المركزي السعودي SAMA</p>
 </div>

 {/* Content */}
 <div className="p-6">
 {status === 'idle' && (
 <>
 <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex gap-3 items-start mb-6">
 <AlertCircle className="text-orange-500 shrink-0 mt-0.5" size={20} />
 <p className="text-sm text-orange-800 leading-relaxed">
 لإتمام عملية المزايدة، سيتم حجز <strong className="font-bold">10%</strong> من قيمة المزايدة في المحفظة الضامنة. سيتم استرداد المبلغ تلقائياً في حال عدم فوزك بالمزاد.
 </p>
 </div>

 <div className="space-y-3 mb-8">
 <div className="flex justify-between items-center py-2 border-b border-gray-100">
 <span className="text-gray-500">قيمة المزايدة:</span>
 <span className="font-bold font-mono text-lg flex items-center gap-1">{bidAmount.toLocaleString()} <RiyalSymbol className="w-4 h-4 text-gray-700" /></span>
 </div>
 <div className="flex justify-between items-center py-2 border-b border-gray-100">
 <span className="text-gray-500">المبلغ المطلوب حجزه (10%):</span>
 <span className="font-bold font-mono text-xl text-[#2B3D50] flex items-center gap-1">{escrowAmount.toLocaleString()} <RiyalSymbol className="w-5 h-5 text-[#2B3D50]" /></span>
 </div>
 </div>

 <div className="flex gap-3">
 <button 
 onClick={handleEscrowHold}
 className="flex-1 bg-[#47CCD0] hover:bg-[#3dbec2] text-white py-3 rounded-xl font-bold transition-colors shadow-lg flex justify-center items-center gap-2"
 >
 <ShieldCheck size={20} />
 تأكيد وحجز المبلغ
 </button>
 <button 
 onClick={onClose}
 className="px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-bold transition-colors"
 >
 إلغاء
 </button>
 </div>
 </>
 )}

 {status === 'processing' && (
 <div className="py-8 text-center animate-fade-in">
 <Loader2 size={48} className="animate-spin text-[#47CCD0] mx-auto mb-4" />
 <h3 className="font-bold text-lg mb-2">جاري التواصل مع المحفظة الضامنة</h3>
 <p className="text-gray-500 text-sm animate-pulse">يتم الآن حجز المبلغ بما يتوافق مع سياسات SAMA...</p>
 </div>
 )}

 {status === 'success' && (
 <div className="py-8 text-center animate-fade-in">
 <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
 <CheckCircle2 size={40} className="text-green-500" />
 </div>
 <h3 className="font-bold text-lg text-green-600 mb-2">تم حجز المبلغ بنجاح</h3>
 <p className="text-gray-500 text-sm mb-6">تم إتمام المزايدة وتأمين المبلغ في المحفظة الضامنة</p>
 </div>
 )}
 
 {status === 'error' && (
 <div className="py-8 text-center animate-fade-in">
 <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
 <h3 className="font-bold text-lg text-red-600 mb-2">فشل في حجز المبلغ</h3>
 <p className="text-gray-500 text-sm mb-6">الرصيد المتاح غير كافٍ أو حدث خطأ في النظام.</p>
 <button 
 onClick={() => setStatus('idle')}
 className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-bold transition-colors"
 >
 المحاولة مرة أخرى
 </button>
 </div>
 )}
 </div>
 </div>
 </div>
 );
};
