import React, { useState } from 'react';
import { 
  Share2, 
  Timer, 
  Minus, 
  Plus, 
  AlertCircle, 
  ShieldCheck, 
  Building2, 
  MessageCircle, 
  Phone,
  ArrowRight,
  Hash,
  Calendar,
  AlertTriangle,
  Flag
} from 'lucide-react';
import { BackButton } from '../components/ui/BackButton';
import sarCurrency from 'figma:asset/3f649d4624729213a9513bf0153522436e1f6f47.png';
import { RiyalSymbol } from '../components/ui/RiyalSymbol';

interface RegisterNowPageProps {
  onNavigate?: (page: string) => void;
}

export const RegisterNowPage: React.FC<RegisterNowPageProps> = ({ onNavigate }) => {
  const [bidAmount, setBidAmount] = useState<number>(2500000);
  const currentPrice = 1800000;
  const deposit = 100000;
  const minIncrement = 10000;
  
  // Constants
  const vatRate = 0.15;
  const commissionRate = 0.025;
  
  // Calculations
  const vatAmount = bidAmount * vatRate;
  const commissionAmount = bidAmount * commissionRate;
  const totalAmount = bidAmount + vatAmount + commissionAmount;

  const handleIncrease = () => {
    setBidAmount(prev => prev + minIncrement);
  };

  const handleDecrease = () => {
    if (bidAmount > Math.max(0, currentPrice)) {
      setBidAmount(prev => Math.max(0, Math.max(currentPrice, prev - minIncrement)));
    }
  };

  return (
    <div className="pt-36 pb-20 min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-4">
        
        {/* Back Button (Optional) */}
        <div className="mb-6">
          <BackButton onClick={() => onNavigate?.('auction-details')} label="العودة" className="!px-0 hover:bg-transparent" />
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative mb-6">
           
           {/* Share Header */}
           <div className="py-4 px-6 flex justify-end border-b border-gray-50">
              <button className="text-gray-500 flex items-center gap-2 text-sm font-medium hover:text-[#47CCD0] transition-colors">
                 <Share2 size={18} />
                 مشاركة
              </button>
           </div>

           {/* Teal Banner - Timer */}
           <div className="bg-[#47CCD0] text-white p-8 text-center relative overflow-hidden">
              <div className="relative z-10">
                 <p className="text-lg font-bold mb-2 text-white/90">ينتهي المزاد بعد</p>
                 <div className="flex items-center justify-center gap-4 text-3xl font-mono font-bold tracking-wider" dir="ltr">
                    <div className="flex flex-col items-center">
                       <span>02</span>
                       <span className="text-xs font-normal opacity-80 mt-1">يوم</span>
                    </div>
                    <span>:</span>
                    <div className="flex flex-col items-center">
                       <span>15</span>
                       <span className="text-xs font-normal opacity-80 mt-1">س</span>
                    </div>
                    <span>:</span>
                    <div className="flex flex-col items-center">
                       <span>30</span>
                       <span className="text-xs font-normal opacity-80 mt-1">د</span>
                    </div>
                 </div>
                 <p className="text-[10px] text-white/80 mt-4">قد يختلف وقت انتهاء الأصل عن وقت انتهاء المجموعة</p>
              </div>
              
              {/* Decoration Circles */}
              <div className="absolute -start-10 -top-10 w-40 h-40 rounded-full border-[6px] border-white/10"></div>
              <div className="absolute -end-16 -bottom-16 w-56 h-56 rounded-full bg-white/10"></div>
           </div>

           <div className="p-6">
              {/* Prices Row */}
              <div className="flex justify-between items-start mb-8">
                 <div className="text-end">
                    <p className="text-gray-500 text-xs mb-1.5 font-medium">مبلغ العربون</p>
                    <div className="flex items-center justify-end gap-1.5 font-mono">
                       <span className="text-2xl font-bold text-gray-900">{deposit.toLocaleString()}</span>
                       <RiyalSymbol className="w-5 h-5 text-gray-400" />
                    </div>
                 </div>
                 <div className="text-start">
                    <p className="text-gray-500 text-xs mb-1.5 font-medium">السعر الافتتاحي</p>
                    <div className="flex items-center justify-end gap-1.5 font-mono">
                       <span className="text-2xl font-bold text-gray-900">{currentPrice.toLocaleString()}</span>
                       <RiyalSymbol className="w-5 h-5 text-gray-400" />
                    </div>
                 </div>
              </div>

              {/* Bidding Control */}
              <div className="bg-gray-50 rounded-2xl p-5 mb-8 border border-gray-100/80">
                 <div className="flex justify-between items-center mb-4">
                    <p className="text-sm font-bold text-gray-900">قدم العرض الآن</p>
                    <div className="text-xs text-gray-400 flex items-center gap-1.5 font-medium">
                       <AlertCircle size={12} />
                       <span className="font-mono flex items-center gap-1">({minIncrement.toLocaleString()} <RiyalSymbol className="w-3 h-3 text-gray-500" /> الزيادة)</span>
                    </div>
                 </div>
                 
                 <div className="flex items-center bg-white rounded-xl shadow-sm h-16 overflow-hidden border border-gray-200">
                    <button 
                       onClick={handleDecrease}
                       disabled={bidAmount <= currentPrice}
                       className="w-16 h-full flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-colors border-s border-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-2xl"
                    >
                       <Minus size={24} />
                    </button>
                    <div className="flex-1 h-full flex items-center justify-center font-bold text-2xl text-gray-900 font-mono tracking-wide">
                       {bidAmount.toLocaleString()}
                    </div>
                    <button 
                       onClick={handleIncrease}
                       className="w-16 h-full flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-colors border-e border-gray-100 text-2xl"
                    >
                       <Plus size={24} />
                    </button>
                 </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => {
                  alert('تم تقديم العرض بنجاح!');
                  onNavigate?.('auction-details');
                }}
                className="w-full py-4 bg-[#1e293b] text-white rounded-xl font-bold text-lg hover:bg-[#0f172a] transition-all shadow-lg shadow-gray-200 mb-8 active:scale-[0.99]"
              >
                 تأكيد المزايدة
              </button>

              {/* Breakdown */}
              <div className="space-y-4 mb-8 border-t border-dashed border-gray-200 pt-8">
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">(الضريبة 15%)</span>
                    <div className="flex items-center gap-1 font-mono font-bold text-gray-700">
                       {vatAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} <RiyalSymbol className="w-4 h-4 text-gray-400" />
                    </div>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">سعر المتر المربع</span>
                    <div className="flex items-center gap-1 font-mono font-bold text-gray-700">
                       - <RiyalSymbol className="w-4 h-4 text-gray-400" />
                    </div>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">السعي 2.5%</span>
                    <div className="flex items-center gap-1 font-mono font-bold text-gray-700">
                       {commissionAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} <RiyalSymbol className="w-4 h-4 text-gray-400" />
                    </div>
                 </div>
                 
                 <div className="my-6 border-b border-gray-100"></div>

                 <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900 text-xl">الإجمالي</span>
                    <div className="flex items-center gap-2 font-bold text-2xl text-gray-900 font-mono">
                       {totalAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} <RiyalSymbol className="w-5 h-5 text-gray-500 mt-1" />
                    </div>
                 </div>
              </div>

              {/* Agent Info */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-6 mb-6">
                 <div className="text-end">
                     <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded text-[10px] text-gray-500 mb-1.5 font-medium">
                       <span>وكيل البيع</span>
                       <ShieldCheck size={12} className="text-gray-400" />
                     </div>
                     <h4 className="font-bold text-gray-900 text-sm mb-1">منصة المزادات الرسمية</h4>
                     <p className="text-[10px] text-gray-400 flex items-center gap-1.5 font-medium">
                       <AlertCircle size={10} />
                       فال رخصة رقم 1200003456
                     </p>
                     <p className="text-[10px] text-gray-400 flex items-center gap-1.5 font-medium mt-0.5">
                       <AlertCircle size={10} />
                       ترخيص المزاد رقم 7200012345
                     </p>
                 </div>
                 <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 text-gray-400">
                    <Building2 size={24} />
                 </div>
              </div>

              {/* Contact Buttons */}
              <div className="flex gap-4">
                 <button className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#eefcfc] text-[#47CCD0] rounded-xl font-bold text-sm hover:bg-[#dffafa] transition-colors">
                    <MessageCircle size={18} />
                    واتساب
                 </button>
                 <button className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gray-100 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors">
                    <Phone size={18} />
                    اتصال
                 </button>
              </div>
           </div>
        </div>

        {/* Safety Tips Card */}
        <div className="bg-[#eff6ff] rounded-3xl p-6 mb-6 border border-blue-100/50">
           <h4 className="font-bold text-[#1e3a8a] mb-4 flex items-center justify-end gap-2 text-lg">
             نصائح للتعامل الآمن
             <ShieldCheck size={22} className="text-[#1e3a8a]" />
           </h4>
           <ul className="space-y-3 text-sm text-[#1e40af] font-medium">
             <li className="flex items-start gap-3">
               <span className="w-2 h-2 bg-[#ef4444]/80 rounded-full mt-1.5 flex-shrink-0 shadow-sm"></span>
               لا تقم بتحويل أي مبالغ مالية قبل المعاينة.
             </li>
             <li className="flex items-start gap-3">
               <span className="w-2 h-2 bg-[#3b82f6]/80 rounded-full mt-1.5 flex-shrink-0 shadow-sm"></span>
               تأكد من صفة المعلن قبل التعامل.
             </li>
             <li className="flex items-start gap-3">
               <span className="w-2 h-2 bg-[#3b82f6]/80 rounded-full mt-1.5 flex-shrink-0 shadow-sm"></span>
               وثّق جميع الاتفاقات بعقود رسمية.
             </li>
           </ul>
        </div>

        {/* Ad Info Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
           <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-50">
              <div className="text-center flex-1 border-s border-gray-100">
                <p className="text-xs text-gray-400 mb-1.5 flex items-center justify-center gap-1 font-medium">
                  <Hash size={12} /> رقم الإعلان
                </p>
                <p className="font-bold text-gray-900 font-mono text-lg tracking-wide">7658291</p>
              </div>
              <div className="text-center flex-1">
                <p className="text-xs text-gray-400 mb-1.5 flex items-center justify-center gap-1 font-medium">
                  <Calendar size={12} /> تاريخ الإعلان
                </p>
                <p className="font-bold text-gray-900 font-mono text-lg tracking-wide">2023/12/14</p>
              </div>
           </div>

           <div className="space-y-3">
             <button 
               className="w-full py-3.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all border border-gray-100"
             >
               <AlertTriangle size={16} className="text-orange-500" />
               <span>التبليغ عن مشكلة تقنية</span>
             </button>
             <button 
               className="w-full py-3.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all border border-red-100"
             >
               <Flag size={16} />
               <span>إرسال شكوى</span>
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};
