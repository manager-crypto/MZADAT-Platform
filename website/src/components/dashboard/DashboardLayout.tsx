import React, { useState } from 'react';
import {
 LayoutDashboard,
 Users,
 Gavel,
 Wallet,
 Settings,
 FileText,
 Menu,
 X,
 LogOut,
 Building2,
 PieChart,
 ShieldCheck,
 HelpCircle,
 Brain,
 Code2,
 Printer,
 ChevronLeft,
 ChevronRight,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface DashboardSidebarProps {
 role: 'admin' | 'individual' | 'corporate' | 'broker';
 activeTab: string;
 onTabChange: (tab: string) => void;
 isOpen: boolean;
 onClose: () => void;
 onSwitchRole: (role: 'admin' | 'individual' | 'corporate' | 'broker') => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
 role,
 activeTab,
 onTabChange,
 isOpen,
 onClose,
 onSwitchRole,
}) => {
 const { t, i18n } = useTranslation();
 const isRtl = i18n.language === 'ar';
 const [isDesktop, setIsDesktop] = useState(() => {
 if (typeof window === 'undefined') return false;
 // Use matchMedia — more reliable than innerWidth during initial render
 return window.matchMedia('(min-width: 1024px)').matches;
 });
 React.useEffect(() => {
 const mq = window.matchMedia('(min-width: 1024px)');
 const onChange = (e: MediaQueryListEvent | MediaQueryList) => setIsDesktop(e.matches);
 // Run once on mount to sync
 onChange(mq);
 // Listen for changes
 mq.addEventListener('change', onChange);
 return () => mq.removeEventListener('change', onChange);
 }, []);

 // Auto-close mobile sidebar when resizing to desktop, and vice-versa
 React.useEffect(() => {
 if (isDesktop && isOpen) {
 // No-op: sidebar is always visible on desktop anyway
 }
 }, [isDesktop, isOpen]);

 const getMenuItems = () => {
 switch (role) {
 case 'admin':
 return [
 { id: 'overview', label: t('sidebar.overview'), icon: <LayoutDashboard size={20} /> },
 { id: 'users', label: t('sidebar.users'), icon: <Users size={20} /> },
 { id: 'auctions', label: t('sidebar.manageAuctions'), icon: <Gavel size={20} /> },
 { id: 'financials', label: t('sidebar.financials'), icon: <Wallet size={20} /> },
 { id: 'reports', label: t('sidebar.reports'), icon: <PieChart size={20} /> },
 { id: 'settings', label: t('sidebar.settings'), icon: <Settings size={20} /> },
 { id: 'smart-management', label: t('sidebar.smartMgmt'), icon: <Brain size={20} /> },
 ];
 case 'individual':
 return [
 { id: 'overview', label: t('sidebar.dashboard'), icon: <LayoutDashboard size={20} /> },
 { id: 'my-bids', label: t('sidebar.myBids'), icon: <Gavel size={20} /> },
 { id: 'wallet', label: t('sidebar.wallet'), icon: <Wallet size={20} /> },
 { id: 'watchlist', label: t('sidebar.watchlist'), icon: <ShieldCheck size={20} /> },
 { id: 'my-requests', label: t('sidebar.myRequests'), icon: <FileText size={20} /> },
 { id: 'asset-management', label: t('sidebar.assetMgmt'), icon: <Building2 size={20} /> },
 { id: 'printed-reports', label: t('sidebar.printedReports'), icon: <Printer size={20} /> },
 { id: 'api-developer', label: t('sidebar.devPortal'), icon: <Code2 size={20} /> },
 { id: 'settings', label: t('sidebar.accountSettings'), icon: <Settings size={20} /> },
 { id: 'smart-management', label: t('sidebar.smartMgmt'), icon: <Brain size={20} /> },
 ];
 case 'corporate':
 case 'broker':
 return [
 { id: 'overview', label: t('sidebar.mainDashboard'), icon: <LayoutDashboard size={20} /> },
 { id: 'asset-management', label: t('sidebar.assetMgmt'), icon: <Building2 size={20} /> },
 { id: 'printed-reports', label: t('sidebar.printedReports'), icon: <Printer size={20} /> },
 { id: 'api-developer', label: t('sidebar.devPortal'), icon: <Code2 size={20} /> },
 { id: 'settings', label: t('sidebar.settings'), icon: <Settings size={20} /> },
 { id: 'smart-management', label: t('sidebar.smartMgmt'), icon: <Brain size={20} /> },
 ];
 default:
 return [];
 }
 };

 /* Active indicator arrow flips with dir */
 const ActiveArrow = isRtl ? ChevronLeft : ChevronRight;

 return (
 <>
 {/* Mobile Overlay */}
 {isOpen && (
 <div
 className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden transition-opacity"
 onClick={onClose}
 />
 )}

 {/* Sidebar — permanently visible on lg+, slides in on mobile */}
 <aside
 style={{
 display: 'flex',
 flexDirection: 'column',
 transform: isDesktop || isOpen
 ? 'translateX(0)'
 : isRtl ? 'translateX(100%)' : 'translateX(-100%)',
 }}
 className="fixed top-[80px] lg:top-32 h-[calc(100vh-80px)] lg:h-[calc(100vh-8rem)]
 bg-white shadow-2xl z-50 w-[280px]
 transition-transform duration-300 ease-in-out
 rtl:right-0 ltr:left-0
 rtl:border-l ltr:border-r border-gray-100
 rtl:rounded-tl-2xl ltr:rounded-tr-2xl
 pb-16 lg:pb-0"
 >
 {/* Sidebar Header */}
 <div className="p-6 pt-6 flex items-center justify-between border-b border-gray-100/50">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 bg-[#2B3D50] rounded-xl flex items-center justify-center text-[#47CCD0] shadow-lg shadow-gray-900/10 border border-[#1e293b]">
 <LayoutDashboard size={20} />
 </div>
 <div>
 <h2 className="text-lg font-black text-[#2B3D50] leading-tight font-serif tracking-wide">Mzadat</h2>
 <p className="text-[10px] text-[#47CCD0] font-bold uppercase tracking-widest">Premium Auctions</p>
 </div>
 </div>
 <button
 onClick={onClose}
 className="lg:hidden text-gray-400 hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-red-50"
 >
 <X size={20} />
 </button>
 </div>

 {/* Navigation */}
 <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5 scrollbar-thin scrollbar-thumb-gray-200">
 <p className="px-4 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
 {t('sidebar.mainMenu')}
 </p>
 {getMenuItems().map((item) => (
 <button
 key={item.id}
 onClick={() => { onTabChange(item.id); onClose(); }}
 className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-bold transition-all group ${
 activeTab === item.id
 ? 'bg-[#2B3D50] text-[#47CCD0] shadow-lg shadow-gray-900/20 border border-[#1e293b]'
 : 'text-gray-500 hover:bg-gray-50 hover:text-[#2B3D50]'
 }`}
 >
 <div className="flex items-center gap-3">
 {React.cloneElement(item.icon as React.ReactElement, {
 className: activeTab === item.id ? 'text-[#47CCD0]' : 'text-gray-400 group-hover:text-[#2B3D50]',
 })}
 {item.label}
 </div>
 {activeTab === item.id && <ActiveArrow size={16} className="text-[#47CCD0]" />}
 </button>
 ))}

 <div className="pt-6 mt-6 border-t border-gray-100">
 <p className="px-4 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
 {t('sidebar.other')}
 </p>
 <button
 onClick={() => { onTabChange('support'); onClose(); }}
 className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group ${
 activeTab === 'support'
 ? 'bg-white border-2 border-[#2B3D50] text-[#2B3D50] shadow-sm'
 : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 border-2 border-transparent'
 }`}
 >
 <HelpCircle size={20} className={activeTab === 'support' ? 'text-[#2B3D50]' : ''} />
 {t('sidebar.helpSupport')}
 </button>
 </div>
 </nav>

 {/* User Mini Profile Footer */}
 <div className="p-4 border-t border-gray-100 bg-gray-50/50">
 <div className="flex items-center gap-3 mb-3 p-2 rounded-xl hover:bg-white transition-colors cursor-pointer">
 <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
 <img
 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
 alt="User"
 className="w-full h-full object-cover"
 />
 </div>
 <div className="flex-1 min-w-0">
 <p className="text-sm font-bold text-gray-900 truncate">{t('sidebar.userName')}</p>
 <p className="text-xs text-gray-500 truncate">mohamed@example.com</p>
 </div>
 </div>
 <button
 onClick={() => (window.location.href = '/')}
 className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-red-500 bg-red-50 hover:bg-red-100 transition-all"
 >
 <LogOut size={16} />
 {t('sidebar.logout')}
 </button>
 </div>
 </aside>
 </>
 );
};

interface DashboardLayoutProps {
 children: React.ReactNode;
 role: 'admin' | 'individual' | 'corporate' | 'broker';
 activeTab: string;
 onTabChange: (tab: string) => void;
 onNavigate: (page: string) => void;
 onSwitchRole: (role: 'admin' | 'individual' | 'corporate' | 'broker') => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
 children,
 role,
 activeTab,
 onTabChange,
 onNavigate,
 onSwitchRole,
}) => {
 const { t, i18n } = useTranslation();
 const [isSidebarOpen, setIsSidebarOpen] = useState(false);

 return (
 <div dir={i18n.dir()} className="min-h-screen bg-[#F8FAFC] pt-[80px] lg:pt-36 overflow-x-hidden">
 <DashboardSidebar
 role={role}
 activeTab={activeTab}
 onTabChange={onTabChange}
 isOpen={isSidebarOpen}
 onClose={() => setIsSidebarOpen(false)}
 onSwitchRole={onSwitchRole}
 />

 {/* Main Content — margin clears the fixed sidebar on the correct side */}
 <main className="rtl:lg:mr-[280px] ltr:lg:ml-[280px] min-h-screen">
 {/* Mobile Header */}
 <div className="lg:hidden fixed top-[80px] start-0 end-0 z-30 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
 <button
 onClick={() => setIsSidebarOpen(true)}
 className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
 >
 <Menu size={20} />
 </button>
 <span className="font-bold text-gray-800 text-sm">{t('sidebar.dashboard')}</span>
 <div className="w-9" />
 </div>

 <div className="p-4 md:p-6 lg:p-8 pt-16 lg:pt-0">
 {children}
 </div>
 </main>
 </div>
 );
};
