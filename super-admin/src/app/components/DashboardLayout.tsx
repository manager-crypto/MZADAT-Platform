import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Shield, 
  Gavel, 
  TrendingUp, 
  DollarSign,
  Menu,
  Bell,
  User,
  LogOut,
  Headphones,
  Users,
  Brain,
  Settings as SettingsIcon,
  Briefcase,
  Moon,
  Sun,
  ChevronDown,
  Building2,
  FileText,
  Code,
  X,
  Zap,
  AlertTriangle,
  Tag,
  History,
  BellRing,
  Globe,
  Activity
} from "lucide-react";
import { useState, useEffect } from "react";
import logoMzadatFull from "figma:asset/c8819d3b5f3ea18704bb078e169c44ea993d6b53.png";
import logoMzadatIcon from "figma:asset/5d2928a5396710b8017c244462e8f5cef6b3686a.png";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "../context/TranslationContext";
import { useAuth } from "../context/AuthContext";

const navigation = [
  { key: "overview", path: "/", icon: LayoutDashboard, subtitle: "Overview & monitoring", subtitleAr: "نظرة عامة ومراقبة" },
  { key: "analytics", path: "/analytics", icon: TrendingUp, subtitle: "Data insights", subtitleAr: "تحليل البيانات" },
  { key: "compliance", path: "/compliance", icon: Shield, badge: 23, subtitle: "Regulatory rules", subtitleAr: "القواعد التنظيمية" },
  { key: "auctions", path: "/auctions", icon: Gavel, badge: 3, subtitle: "Live bids", subtitleAr: "المزايدات الحية" },
  { key: "property", path: "/property", icon: Building2, subtitle: "Assets management", subtitleAr: "إدارة الأصول" },
  { key: "categories", path: "/categories", icon: Tag, subtitle: "Classifications", subtitleAr: "التصنيفات" },
  { key: "financial", path: "/financial", icon: DollarSign, subtitle: "Transactions", subtitleAr: "المعاملات المالية" },
  { key: "disputes", path: "/disputes", icon: AlertTriangle, badge: 12, subtitle: "Dispute resolution", subtitleAr: "حل النزاعات" },
  { key: "services", path: "/services", icon: Briefcase, subtitle: "Operations", subtitleAr: "العمليات" },
  { key: "support", path: "/support", icon: Headphones, badge: 8, subtitle: "Help center", subtitleAr: "مركز المساعدة" },
  { key: "users", path: "/users", icon: Users, subtitle: "Account control", subtitleAr: "إدارة الحسابات" },
  { key: "notifications", path: "/notifications", icon: BellRing, badge: 4, subtitle: "Alerts & updates", subtitleAr: "التنبيهات والتحديثات" },
  { key: "audit", path: "/audit", icon: History, subtitle: "System log", subtitleAr: "سجل النظام" },
  { key: "ai", path: "/ai", icon: Brain, subtitle: "Smart insights", subtitleAr: "رؤى ذكية" },
  { key: "developer", path: "/developer", icon: Code, subtitle: "API & Tools", subtitleAr: "أدوات التطوير" },
  { key: "connection_status", path: "/connection-status", icon: Activity, subtitle: "Sync & monitoring", subtitleAr: "المزامنة والمراقبة" },
  { key: "website_sections", path: "/website-sections", icon: Globe, subtitle: "Website sections", subtitleAr: "أقسام الموقع" },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t, language, direction, toggleLanguage } = useTranslation();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isDark = theme === 'dark';
  const isRTL = direction === 'rtl';

  const showExpanded = sidebarOpen || isDesktopExpanded;

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  // Close user menu if sidebar collapses
  useEffect(() => {
    if (!showExpanded && userMenuOpen) {
      setUserMenuOpen(false);
    }
  }, [showExpanded, userMenuOpen]);

  return (
    <div className={`min-h-screen transition-colors ${isDark ? 'bg-[#0F1923]' : 'bg-[#F9FAFB]'}`}>
      <style>{`
        @keyframes wave {
          0%, 60%, 100% { transform: rotate(0deg); }
          10%, 30% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          40% { transform: rotate(-4deg); }
          50% { transform: rotate(10deg); }
        }
        .animate-wave {
          animation: wave 2.5s infinite;
          transform-origin: 70% 70%;
          display: inline-block;
        }
        /* Custom Scrollbar for Sidebar */
        .sidebar-scroll::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
        .sidebar-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>

      {/* Skip to Main Content Link - Accessibility */}
      <a
        href="#main-content"
        className={`sr-only focus:not-sr-only focus:absolute focus:top-4 ${isRTL ? 'focus:right-4' : 'focus:left-4'} focus:z-[60] focus:px-6 focus:py-3 focus:bg-[#5AC4BE] focus:text-[#1E293B] focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#5AC4BE] focus:ring-offset-2 font-bold transition-all`}
      >
        {language === 'ar' ? 'تخطي إلى المحتوى الرئيسي' : 'Skip to main content'}
      </a>

      {/* Hover-Expandable Sidebar */}
      <aside 
        onMouseEnter={() => setIsDesktopExpanded(true)}
        className={`fixed top-4 bottom-4 ${isRTL ? 'right-4' : 'left-4'} h-[calc(100vh-2rem)] flex flex-col bg-[#2B3D50] text-white transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] z-50 rounded-[2rem] ${ 
          sidebarOpen 
            ? 'translate-x-0' 
            : isRTL ? 'translate-x-[calc(100%+1rem)] lg:translate-x-0' : '-translate-x-[calc(100%+1rem)] lg:translate-x-0'
        } ${showExpanded ? 'w-[280px]' : 'w-[88px]'} shadow-2xl shadow-[#2B3D50]/30 overflow-visible`}
      >
        {/* Top Section (Logo & Brand) */}
        <div className={`shrink-0 pt-8 pb-6 flex flex-col items-center relative z-20`}>
          {/* Close button */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setSidebarOpen(false);
              setIsDesktopExpanded(false);
            }} 
            className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} text-white/50 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all duration-300 z-50 ${showExpanded ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-90'}`}
            title={language === 'ar' ? 'إغلاق القائمة' : 'Close menu'}
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex flex-col items-center w-full px-4">
            <div className={`flex items-center justify-center mb-4 transition-all duration-300`}>
               <img 
                 src={logoMzadatIcon} 
                 alt="Mzadat Logo" 
                 className={`object-contain transition-all duration-300 ${showExpanded ? 'w-20 h-20' : 'w-12 h-12'}`} 
               />
            </div>
            
            <div className={`text-center overflow-hidden transition-all duration-300 ease-in-out flex flex-col items-center ${showExpanded ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
              <h2 className="text-[17px] font-extrabold text-white tracking-wide whitespace-nowrap">
                {language === 'ar' ? 'مزادات كنترول' : 'MZADAT Control'}
              </h2>
              <p className="text-[12px] text-white/60 font-medium mt-1 whitespace-nowrap">
                {language === 'ar' ? 'إدارة النظام' : 'System Management'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Wrapper - Scrollable */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden sidebar-scroll mt-2 relative w-full">
          <nav className={`px-4 space-y-2.5 pb-8 flex flex-col items-center w-full`}>
            {navigation.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
              const subtitle = language === 'ar' ? item.subtitleAr : item.subtitle;
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  title={!showExpanded ? t(`navigation.${item.key}`) : undefined}
                  onClick={() => setSidebarOpen(false)} // Close on mobile
                  className={`relative flex items-center transition-all duration-300 ease-in-out group ${
                    showExpanded 
                      ? 'w-full px-4 py-3.5 rounded-2xl' 
                      : 'w-[52px] h-[52px] rounded-full justify-center px-0'
                  } ${
                    isActive
                      ? 'bg-[#5AC4BE] shadow-[0_4px_20px_rgba(90,196,190,0.4)]'
                      : 'hover:bg-white/10 bg-white/5'
                  }`}
                >
                  {/* Icon */}
                  <item.icon className={`shrink-0 transition-all duration-300 ${isActive ? 'text-[#1E293B]' : 'text-white/80'} ${showExpanded ? 'w-5 h-5' : 'w-[22px] h-[22px] group-hover:scale-110'}`} />
                  
                  {/* Expanded Content */}
                  <div className={`flex-1 flex items-center justify-between overflow-hidden transition-all duration-300 ${showExpanded ? (isRTL ? 'mr-4 opacity-100 w-auto' : 'ml-4 opacity-100 w-auto') : 'w-0 opacity-0 hidden'}`}>
                      <div className="flex flex-col items-start overflow-hidden">
                        <div className={`text-[14px] whitespace-nowrap truncate ${isActive ? 'font-extrabold text-[#1E293B]' : 'font-semibold text-white/90 group-hover:text-white'}`}>
                          {t(`navigation.${item.key}`)}
                        </div>
                        {subtitle && (
                           <div className={`text-[11px] whitespace-nowrap truncate mt-0.5 ${isActive ? 'font-semibold text-[#1E293B]/70' : 'font-medium text-white/40'}`}>
                              {subtitle}
                           </div>
                        )}
                      </div>

                      {/* Active Dot indicator on the right */}
                      {isActive && (
                        <div className={`w-2 h-2 rounded-full bg-[#1E293B]/60 shrink-0 ${isRTL ? 'mr-2' : 'ml-2'}`} />
                      )}

                      {/* Badge in expanded view (if not active to avoid clutter) */}
                      {item.badge && !isActive && (
                         <div className={`flex items-center justify-center px-2 py-0.5 rounded-full bg-white/10 text-white/90 text-[10px] font-bold shrink-0 ${isRTL ? 'mr-2' : 'ml-2'}`}>
                           {item.badge}
                         </div>
                      )}
                  </div>

                  {/* Badge dot for collapsed mode */}
                  {!showExpanded && item.badge && (
                    <div className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#2B3D50] flex items-center justify-center"></div>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Profile Footer */}
        <div className={`shrink-0 pt-6 pb-6 mt-auto transition-all duration-300 flex flex-col w-full px-4 gap-5 relative z-50`}>
          
          {/* User Info Row */}
          <div className={`flex items-center ${showExpanded ? 'justify-start gap-4' : 'justify-center'} w-full transition-all duration-300`}>
            {/* Avatar */}
            <div className="relative shrink-0">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className={`bg-[#5AC4BE] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(90,196,190,0.3)] hover:scale-105 hover:bg-[#68D391] transition-all duration-200 focus:outline-none border border-[#2B3D50]/50 ${showExpanded ? 'w-[52px] h-[52px]' : 'w-12 h-12'}`}
                title={language === 'ar' ? 'إعدادات الحساب' : 'Account Settings'}
              >
                <span className="text-[#1E293B] font-bold text-lg">
                  {language === 'ar' ? 'ل' : 'LG'}
                </span>
              </button>
            </div>

            {/* Text Info */}
            <div className={`flex flex-col items-start overflow-hidden transition-all duration-300 ${showExpanded ? 'w-full opacity-100' : 'w-0 opacity-0'}`}>
              <div className="text-[16px] font-bold text-white truncate whitespace-nowrap">
                {language === 'ar' ? 'فيصل القحطاني' : 'Faisal Alqahtani'}
              </div>
              <div className="text-[13px] text-gray-400 truncate whitespace-nowrap mt-0.5 font-medium">
                {language === 'ar' ? 'مدير النظام' : 'System Administrator'}
              </div>
            </div>
          </div>

          {/* Logout Button */}
          {showExpanded ? (
            <button
              onClick={() => {
                handleLogout();
              }}
              className="w-full bg-[#FFF0F0] hover:bg-[#FFE4E4] text-[#1E293B] flex items-center justify-between px-5 py-3.5 rounded-[14px] transition-all shadow-sm group border border-red-100/10"
            >
              <span className="font-bold text-[15px] tracking-wide">{language === 'ar' ? 'تسجيل الخروج' : 'Logout'}</span>
              <LogOut className="w-[22px] h-[22px] text-[#1E293B] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </button>
          ) : (
            <button
              onClick={() => {
                handleLogout();
              }}
              className="w-12 h-12 mx-auto bg-[#1E293B] hover:bg-red-500/20 text-white/70 hover:text-red-400 rounded-full flex items-center justify-center border border-white/10 transition-all shadow-lg"
              title={language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}

          {/* Dropdown Menu - Opens Upwards */}
            {userMenuOpen && (
              <div className={`absolute bottom-full mb-4 bg-[#1E293B] rounded-2xl shadow-2xl border border-white/10 overflow-hidden backdrop-blur-xl z-[70] min-w-[220px] transition-all animate-in fade-in slide-in-from-bottom-2 ${
                !showExpanded 
                  ? (isRTL ? 'right-0' : 'left-0') 
                  : 'left-1/2 -translate-x-1/2'
              }`}>
                <NavLink 
                  to="/users"
                  onClick={() => setUserMenuOpen(false)}
                  className="w-full px-5 py-4 text-start text-[13px] font-medium text-white/90 hover:bg-white/5 transition-colors flex items-center gap-3 border-b border-white/5"
                >
                  <User className="w-4 h-4 text-[#5AC4BE]" />
                  {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
                </NavLink>
                <NavLink 
                  to="/settings"
                  onClick={() => setUserMenuOpen(false)}
                  className="w-full px-5 py-4 text-start text-[13px] font-medium text-white/90 hover:bg-white/5 transition-colors flex items-center gap-3"
                >
                  <SettingsIcon className="w-4 h-4 text-[#5AC4BE]" />
                  {language === 'ar' ? 'الإعدادات' : 'Settings'}
                </NavLink>
                <div className="border-t border-white/5" />
                <button 
                  onClick={() => {
                    setUserMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full px-5 py-4 text-start text-[13px] font-bold text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-3"
                >
                  <LogOut className="w-4 h-4" />
                  {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
                </button>
              </div>
            )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] min-h-screen flex flex-col overflow-x-hidden ${isRTL ? (showExpanded ? 'lg:mr-[312px]' : 'lg:mr-[120px]') : (showExpanded ? 'lg:ml-[312px]' : 'lg:ml-[120px]')}`}>
        
        {/* Floating Top Bar */}
        <header className={`${isDark ? 'bg-[#0F1923]/90' : 'bg-[#F9FAFB]/90'} backdrop-blur-xl sticky top-0 z-40 transition-colors pt-6 pb-4 px-6 sm:px-8`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Left Section: Titles */}
            <div className={`flex items-start gap-4`}>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`lg:hidden mt-1 p-2 rounded-xl ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-[#2B3D50] border border-gray-200'} shadow-sm transition-colors`}
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <div className="flex flex-col">
                <h1 className={`text-xl sm:text-2xl font-extrabold ${isDark ? 'text-white' : 'text-[#1E293B]'} flex items-center gap-2 tracking-tight`}>
                  {language === 'ar' ? 'مرحباً، فيصل القحطاني!' : 'Hello, Faisal Alqahtani!'}
                  <span className="text-2xl animate-wave">👋</span>
                </h1>
                <p className={`text-[14px] ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1 font-medium`}>
                  {language === 'ar' ? 'ما الذي تبحث عنه اليوم؟' : 'What are you looking for today?'}
                </p>
              </div>
            </div>

            {/* Right Section: Badges and Actions */}
            <div className={`flex items-center gap-3 self-end sm:self-auto`}>
              {/* System Active Indicator */}
              <div 
                className={`hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-full shadow-sm ${
                  isDark 
                    ? 'bg-green-900/30 text-green-400 border border-green-800/50' 
                    : 'bg-[#EAF6ED] text-[#218F4B] border border-[#BCE4C8]'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-green-400' : 'bg-[#218F4B]'} animate-pulse`}></div>
                <span className="text-[13px] font-bold tracking-wide">
                  {language === 'ar' ? 'المراقبة الحية نشطة' : 'Real-time monitoring active'}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 rtl:mr-2 ltr:ml-2">
                <button
                  onClick={toggleTheme}
                  className={`w-11 h-11 rounded-full flex items-center justify-center ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white hover:bg-gray-50 text-[#1E293B] border border-gray-200'} transition-all shadow-sm`}
                  title={isDark ? 'Light Mode' : 'Dark Mode'}
                >
                  {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
                </button>
                <button
                  onClick={toggleLanguage}
                  className={`w-11 h-11 rounded-full flex items-center justify-center ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white hover:bg-gray-50 text-[#1E293B] border border-gray-200'} transition-all shadow-sm font-bold text-[13px]`}
                  title={language === 'ar' ? 'English' : 'العربية'}
                >
                  {language === 'ar' ? 'EN' : 'ع'}
                </button>
                <button 
                  className={`relative w-11 h-11 rounded-full flex items-center justify-center ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white hover:bg-gray-50 text-[#1E293B] border border-gray-200'} transition-all shadow-sm`}
                >
                  <Bell className="w-4.5 h-4.5" />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 sm:px-8 sm:pb-8 w-full mx-auto" id="main-content">
          <div className="max-w-[1600px] mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[#0F1923]/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}