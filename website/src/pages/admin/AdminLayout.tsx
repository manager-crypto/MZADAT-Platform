import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
 LayoutDashboard,
 Users,
 Gavel,
 ShieldCheck,
 Wallet,
 LogOut,
 Menu,
 X,
 Bell,
 Image as ImageIcon,
 Activity,
 LayoutGrid
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
 const navigate = useNavigate();
 const location = useLocation();
 const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

 // ── Auth Guard ──────────────────────────────────────────────
 const token = localStorage.getItem('admin_token');
 const adminName = localStorage.getItem('admin_name') || 'مدير النظام';
 const adminRole = localStorage.getItem('admin_role') || '';
 React.useEffect(() => {
 if (!token) navigate('/admin/login', { replace: true });
 }, [token, navigate]);
 if (!token) return null;

 const handleLogout = () => {
 fetch('http://localhost:8080/api/admin/logout', {
 method: 'POST',
 headers: { Authorization: `Bearer ${token}` },
 }).catch(() => {});
 localStorage.removeItem('admin_token');
 localStorage.removeItem('admin_role');
 localStorage.removeItem('admin_name');
 localStorage.removeItem('admin_email');
 navigate('/admin/login', { replace: true });
 };
 // ────────────────────────────────────────────────────────────

 const menuItems = [
 { id: 'dashboard', label: 'لوحة القيادة', icon: <LayoutDashboard size={20} />, path: '/admin' },
 { id: 'users', label: 'إدارة المستخدمين', icon: <Users size={20} />, path: '/admin/users' },
 { id: 'auctions', label: 'المزادات والإعلانات', icon: <Gavel size={20} />, path: '/admin/auctions' },
 { id: 'kyc', label: 'مراجعة الهويات (KYC)', icon: <ShieldCheck size={20} />, path: '/admin/kyc' },
 { id: 'finance', label: 'الرقابة المالية', icon: <Wallet size={20} />, path: '/admin/finance' },
 { id: 'media', label: 'إدارة الوسائط', icon: <ImageIcon size={20} />, path: '/admin/media' },
 { id: 'system-health', label: 'صحة النظام', icon: <Activity size={20} />, path: '/admin/system-health' },
 { id: 'sections', label: 'أقسام الموقع', icon: <LayoutGrid size={20} />, path: '/admin/sections' },
 ];

 const handleNavigate = (path: string) => {
 navigate(path);
 setIsMobileMenuOpen(false);
 };

 return (
 <div className="min-h-screen bg-gray-50 flex">
 {/* Sidebar */}
 <aside className={`
 fixed lg:static top-0 end-0 h-full w-64 bg-[#2B3D50] text-white z-50 transform transition-transform duration-300 ease-in-out
 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
 `}>
 <div className="p-6 flex items-center justify-between border-b border-gray-700">
 <h2 className="text-2xl font-bold text-white flex items-center gap-2">
 <span className="text-[#47CCD0]">مزادات</span> أدمن
 </h2>
 <button className="lg:hidden text-gray-300 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
 <X size={24} />
 </button>
 </div>

 <nav className="p-4 space-y-2">
 {menuItems.map((item) => {
 const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
 return (
 <button
 key={item.id}
 onClick={() => handleNavigate(item.path)}
 className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
 isActive ? 'bg-[#47CCD0] text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
 }`}
 >
 {item.icon}
 <span className="font-bold">{item.label}</span>
 </button>
 );
 })}
 </nav>

 <div className="absolute bottom-0 w-full p-4 border-t border-gray-700 space-y-2">
 <button
 onClick={() => navigate('/')}
 className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-xl transition-colors text-sm"
 >
 <span className="font-bold">← الموقع الرئيسي</span>
 </button>
 <button
 onClick={handleLogout}
 className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-gray-800 hover:text-red-300 rounded-xl transition-colors"
 >
 <LogOut size={20} />
 <span className="font-bold">تسجيل الخروج</span>
 </button>
 </div>
 </aside>

 {/* Main Content */}
 <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
 {/* Top Header */}
 <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-40">
 <div className="flex items-center gap-4">
 <button className="lg:hidden text-gray-600" onClick={() => setIsMobileMenuOpen(true)}>
 <Menu size={24} />
 </button>
 <h1 className="text-xl font-bold text-gray-800 hidden sm:block">
 {menuItems.find(m => m.path === location.pathname)?.label || 'لوحة القيادة'}
 </h1>
 </div>

 <div className="flex items-center gap-4">
 <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
 <Bell size={20} />
 <span className="absolute top-1.5 end-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
 </button>
 <div className="flex items-center gap-3 border-e pe-4 border-gray-200">
 <div className="text-start hidden sm:block">
 <p className="text-sm font-bold text-gray-800">{adminName}</p>
 <p className="text-xs text-gray-500">{adminRole}</p>
 </div>
 <div className="w-10 h-10 bg-[#47CCD0] rounded-full flex items-center justify-center text-white font-bold">
 {adminName.charAt(0)}
 </div>
 </div>
 </div>
 </header>

 {/* Page Content */}
 <div className="flex-1 overflow-auto p-6">
 <Outlet />
 </div>
 </main>

 {/* Mobile Overlay */}
 {isMobileMenuOpen && (
 <div 
 className="fixed inset-0 bg-black/50 z-40 lg:hidden"
 onClick={() => setIsMobileMenuOpen(false)}
 />
 )}
 </div>
 );
};
