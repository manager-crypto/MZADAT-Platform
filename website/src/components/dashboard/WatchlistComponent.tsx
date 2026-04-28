import React, { useState } from 'react';
import { 
 Search, 
 Filter,
 MoreVertical,
 Building2,
 Car,
 Heart,
 Gavel,
 Trash2,
 ExternalLink
} from 'lucide-react';
import { RiyalSymbol } from '../ui/RiyalSymbol';

const mockWatchlist = [
 {
 id: 1,
 title: 'فيلا سكنية فاخرة - حي الملقا',
 type: 'real-estate',
 image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80',
 currentBid: 2500000,
 status: 'active',
 biddersCount: 12,
 timeLeft: '2 يوم و 4 ساعات',
 location: 'الرياض',
 },
 {
 id: 2,
 title: 'سيارة مرسيدس S-Class 2023',
 type: 'vehicle',
 image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=400&q=80',
 currentBid: 450000,
 status: 'active',
 biddersCount: 8,
 timeLeft: '5 ساعات',
 location: 'جدة',
 },
 {
 id: 3,
 title: 'أرض تجارية - حي الصحافة',
 type: 'real-estate',
 image: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&w=400&q=80',
 currentBid: 5200000,
 status: 'upcoming',
 biddersCount: 0,
 timeLeft: 'يبدأ بعد 3 أيام',
 location: 'الرياض',
 }
];

export const WatchlistComponent: React.FC = () => {
 const [filter, setFilter] = useState<'all' | 'real-estate' | 'vehicle'>('all');
 const [searchQuery, setSearchQuery] = useState('');
 const [watchlistData, setWatchlistData] = useState(mockWatchlist);

 const filteredWatchlist = watchlistData.filter(item => {
 const matchesFilter = filter === 'all' || item.type === filter;
 const matchesSearch = item.title.includes(searchQuery) || item.location.includes(searchQuery);
 return matchesFilter && matchesSearch;
 });

 const removeFromWatchlist = (id: number) => {
 setWatchlistData(watchlistData.filter(item => item.id !== id));
 };

 const getStatusBadge = (status: string) => {
 switch (status) {
 case 'active':
 return (
 <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
 مزاد نشط
 </span>
 );
 case 'upcoming':
 return (
 <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
 قادم
 </span>
 );
 case 'ended':
 return (
 <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold border border-gray-200">
 منتهي
 </span>
 );
 default:
 return null;
 }
 };

 return (
 <div className="space-y-6">
 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
 <div>
 <h2 className="text-2xl font-bold text-gray-900 mb-2">المفضلة</h2>
 <p className="text-gray-500 text-sm">تتبع المزادات والأصول التي تهتم بها في مكان واحد.</p>
 </div>
 <div className="bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
 <Heart className="text-red-500" fill="currentColor" size={20} />
 <div>
 <p className="text-xs text-gray-500 font-medium">إجمالي المفضلة</p>
 <p className="font-bold text-[#2B3D50]">{watchlistData.length} عناصر</p>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
 {/* Filters & Search Header */}
 <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <div className="flex bg-gray-50 p-1 rounded-xl w-fit">
 {[
 { id: 'all', label: 'الكل' },
 { id: 'real-estate', label: 'عقارات' },
 { id: 'vehicle', label: 'مركبات' }
 ].map((tab) => (
 <button
 key={tab.id}
 onClick={() => setFilter(tab.id as any)}
 className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
 filter === tab.id 
 ? 'bg-white text-[#2B3D50] shadow-sm' 
 : 'text-gray-500 hover:text-gray-900'
 }`}
 >
 {tab.label}
 </button>
 ))}
 </div>

 <div className="flex items-center gap-3">
 <div className="relative">
 <Search className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
 <input 
 type="text" 
 placeholder="ابحث في المفضلة..." 
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

 {/* Watchlist Items */}
 <div className="p-5">
 {filteredWatchlist.length > 0 ? (
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
 {filteredWatchlist.map((item) => (
 <div key={item.id} className="bg-white rounded-xl border border-gray-100 hover:border-[#47CCD0] hover:shadow-md transition-all group overflow-hidden flex flex-col">
 {/* Image */}
 <div className="relative w-full h-48 overflow-hidden shrink-0">
 <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
 <div className="absolute top-3 end-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg text-[#2B3D50] shadow-sm">
 {item.type === 'real-estate' ? <Building2 size={18} /> : <Car size={18} />}
 </div>
 <button 
 onClick={() => removeFromWatchlist(item.id)}
 className="absolute top-3 start-3 bg-white/90 backdrop-blur-sm p-2 rounded-full text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors shadow-sm"
 title="إزالة من المفضلة"
 >
 <Heart size={18} fill="currentColor" />
 </button>
 </div>

 {/* Content */}
 <div className="p-4 flex-1 flex flex-col">
 <div className="flex items-center gap-2 mb-2">
 <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{item.location}</span>
 {getStatusBadge(item.status)}
 </div>
 <h3 className="font-bold text-lg text-[#2B3D50] leading-tight mb-4">{item.title}</h3>
 
 <div className="grid grid-cols-2 gap-3 mt-auto mb-4">
 <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100/50">
 <p className="text-[11px] text-gray-500 mb-0.5">أعلى مزايدة / السعر</p>
 <p className="font-mono font-bold text-[#2B3D50] flex items-center gap-1">{item.currentBid.toLocaleString()} <RiyalSymbol className="w-3 h-3 text-[#2B3D50]" /></p>
 </div>
 <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100/50">
 <p className="text-[11px] text-gray-500 mb-0.5">الوقت المتبقي</p>
 <p className={`font-bold text-sm ${item.status === 'active' ? 'text-amber-600' : 'text-[#47CCD0]'}`}>
 {item.timeLeft}
 </p>
 </div>
 </div>

 {/* Actions */}
 <div className="flex items-center gap-2 pt-4 border-t border-gray-100 mt-auto">
 <button className="flex-1 bg-[#2B3D50] hover:bg-[#1a2533] text-white text-sm font-bold py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2">
 {item.status === 'active' ? (
 <>
 <Gavel size={16} /> المزايدة الآن
 </>
 ) : (
 <>
 <ExternalLink size={16} /> عرض التفاصيل
 </>
 )}
 </button>
 </div>
 </div>
 </div>
 ))}
 </div>
 ) : (
 <div className="flex flex-col items-center justify-center py-16 text-center">
 <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-4">
 <Heart size={32} className="text-gray-300" />
 </div>
 <h4 className="text-lg font-bold text-gray-900 mb-2">قائمة المفضلة فارغة</h4>
 <p className="text-gray-500 text-sm max-w-sm">لم تقم بإضافة أي مزادات أو أصول إلى مفضلتك بعد. تصفح المزادات المتاحة وأضف ما يهمك هنا.</p>
 <button 
 onClick={() => { setFilter('all'); setSearchQuery(''); }}
 className="mt-6 px-6 py-2.5 bg-[#47CCD0] hover:bg-[#3bbabb] text-white text-sm font-bold rounded-xl transition-colors shadow-sm"
 >
 تصفح المزادات
 </button>
 </div>
 )}
 </div>
 </div>
 </div>
 );
};
