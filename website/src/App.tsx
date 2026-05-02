import React, { useState, useEffect, useRef, Suspense, ReactNode, useCallback, useMemo } from 'react';
import sarBlack from 'figma:asset/3f649d4624729213a9513bf0153522436e1f6f47.png';
import sarWhite from 'figma:asset/44873dcb1d284215652a5886cf5845ec0264eaac.png';
import { createBrowserRouter, RouterProvider, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SmartAdvisor } from './components/chat/SmartAdvisor';
import { CookieConsent } from './components/layout/CookieConsent';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { AppRoutes } from './routes/AppRoutes';

import { MobileSplash } from './components/splash/MobileSplash';
import { ErrorBoundary } from './components/error/ErrorBoundary';
import i18n from './i18n';
import { useTranslation } from 'react-i18next';

(window as any).__SAR_BLACK__ = sarBlack;
(window as any).__SAR_WHITE__ = sarWhite;

// ==================== TYPE DEFINITIONS ====================
interface Property {
 id: string;
 title: string;
 price: number;
 city: string;
 images?: string[];
 description?: string;
 location?: string;
 area?: number;
 rooms?: number;
 bathrooms?: number;
}

interface Auction {
 id: string;
 title: string;
 currentBid: number;
 imageUrl?: string;
 endDate?: string;
}

interface Car {
 id: string;
 make: string;
 model: string;
 year: number;
 price: number;
 imageUrl?: string;
}

interface DirectSaleItem {
 id: string;
 category: string;
 isPlate?: boolean;
 title?: string;
 price?: number;
 image?: string;
 location?: string;
 specs?: string[];
 seller?: { name: string; rating: number; verified: boolean; };
 postedAt?: string;
 plateNums?: string;
 plateChars?: string;
}

type Language = 'ar' | 'en';

// ==================== CONSTANTS ====================
// FIX: Use Set for O(1) lookups instead of array with .includes()
const PROTECTED_ROUTES = new Set([
 '/dashboard',
 '/wallet',
 '/my-requests',
 '/create-request',
 '/booking',
 '/add-ad',
 '/add-real-estate',
 '/add-auction',
 '/add-car',
 '/add-plate',
 '/add-other',
]);

// FIX: Extract auth-excluded paths as a constant
const AUTH_EXCLUDED_PATHS = new Set(['login', 'signup', 'nafath-login', 'nafath-verification', 'forgot-password', 'reset-password']);

// ==================== CUSTOM CURSOR COMPONENT ====================
// FIX: Memoize to prevent unnecessary re-renders from parent state changes
interface CustomCursorProps {
 position: { x: number; y: number };
 variant: string;
 enabled: boolean;
}

const CustomCursor: React.FC<CustomCursorProps> = React.memo(({ position, variant, enabled }) => {
 if (!enabled) return null;

 const isHover = variant === 'hover';

 return (
 <>
 <div
 className="fixed top-0 start-0 w-3 h-3 bg-[#47CCD0] rounded-full pointer-events-none z-[9999] transition-transform duration-100 ease-out mix-blend-difference"
 style={{
 transform: `translate(${position.x - 6}px, ${position.y - 6}px) scale(${isHover ? 0 : 1})`,
 }}
 />
 <div
 className={`fixed top-0 start-0 rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out border border-[#47CCD0] ${isHover ? 'w-12 h-12 bg-[#47CCD0]/10 border-[#47CCD0]' : 'w-8 h-8 border-[#47CCD0]/50'} mx-[0px] my-[18px]`}
 style={{
 transform: `translate(${position.x - (isHover ? 24 : 16)}px, ${position.y - (isHover ? 24 : 16)}px)`,
 }}
 />
 </>
 );
});

CustomCursor.displayName = 'CustomCursor';

// ==================== LOADING FALLBACK ====================
const LoadingFallback: React.FC = () => (
 <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#2B3D50]">
 <div className="w-16 h-16 border-4 border-[#47CCD0] border-t-transparent rounded-full animate-spin" />
 </div>
);

// ==================== GLOBAL STYLES ====================
// FIX: Extract static styles outside component to avoid re-creation on every render
const GlobalStyles: React.FC<{ enableCustomCursor: boolean }> = React.memo(({ enableCustomCursor }) => (
 <style>
 {`
 @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@100..900&display=swap');

 :root {
 --font-arabic: 'Noto Kufi Arabic', sans-serif;
 }

 body, h1, h2, h3, h4, h5, h6, p, span, div, a, button, input, textarea {
 font-family: 'Noto Kufi Arabic', 'Helvetica', 'Arial', sans-serif !important;
 }

 /* Custom Scrollbar */
 ::-webkit-scrollbar { width: 8px; }
 ::-webkit-scrollbar-track { background: #f1f1f1; }
 ::-webkit-scrollbar-thumb { background: #94a3b8; border-radius: 4px; }
 ::-webkit-scrollbar-thumb:hover { background: #47CCD0; }

 @keyframes fadeUp {
 from { opacity: 0; transform: translateY(20px); }
 to { opacity: 1; transform: translateY(0); }
 }
 .animate-fade-up {
 animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
 }

 @keyframes slideIn {
 from { opacity: 0; transform: translateY(20px) scale(0.95); }
 to { opacity: 1; transform: translateY(0) scale(1); }
 }
 .animate-slide-in {
 animation: slideIn 0.3s ease-out forwards;
 }

 @keyframes scroll {
 0% { transform: translateX(0); }
 100% { transform: translateX(-50%); }
 }
 .animate-scroll {
 animation: scroll 30s linear infinite;
 }

 .ltr-track {
 direction: ltr;
 }

 a, button, input, select, .cursor-pointer {
 cursor: ${enableCustomCursor ? 'none' : 'pointer'};
 }

 .skip-link {
 position: absolute;
 top: -40px;
 left: 0;
 background: #47CCD0;
 color: white;
 padding: 8px 16px;
 z-index: 100;
 transition: top 0.3s;
 }
 .skip-link:focus {
 top: 0;
 }
 `}
 </style>
));

GlobalStyles.displayName = 'GlobalStyles';

// ==================== MAIN APP CONTENT ====================
export const AppContent: React.FC = () => {
 const navigate = useNavigate();
 const location = useLocation();
 const { t } = useTranslation();

 // ==================== STATE ====================
 // Force HMR invalidation comment v2
 const [lang, setLang] = useState<Language>(() => {
 // FIX: Validate i18n.language to ensure it's a valid Language type
 const currentLang = i18n.language;
 return currentLang === 'en' ? 'en' : 'ar';
 });
 const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
 const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);
 const [selectedCar, setSelectedCar] = useState<Car | null>(null);
 const [selectedDirectSaleItem, setSelectedDirectSaleItem] = useState<DirectSaleItem | null>(null);
 const [selectedCity, setSelectedCity] = useState<string>('riyadh');
 const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
 const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
 // FIX: Removed unused `showLogin` state — was set but never read for rendering
 const [enableCustomCursor, setEnableCustomCursor] = useState<boolean>(() => {
 if (typeof window !== 'undefined') {
 return window.innerWidth > 768;
 }
 return true;
 });

 useEffect(() => {
 if (typeof window === 'undefined') return;
 const handleResize = () => {
 setEnableCustomCursor(window.innerWidth > 768);
 };
 window.addEventListener('resize', handleResize);
 return () => window.removeEventListener('resize', handleResize);
 }, []);

 // Cursor state
 const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
 const [cursorVariant, setCursorVariant] = useState<string>('default');

 // Mobile Splash state
 const [showSplash, setShowSplash] = useState<boolean>(() => {
 if (typeof window !== 'undefined') {
 const isMobile = window.innerWidth <= 768;
 const hasSeenSplash = sessionStorage.getItem('mzadat_splash_shown');
 return isMobile && !hasSeenSplash;
 }
 return false;
 });

 const handleSplashComplete = useCallback(() => {
 setShowSplash(false);
 sessionStorage.setItem('mzadat_splash_shown', 'true');
 }, []);

 // FIX: Set document lang/dir once on mount (no dependencies needed)
 useEffect(() => {
 document.documentElement.lang = 'ar';
 document.documentElement.dir = 'rtl';
 document.documentElement.classList.remove('dark');
 document.documentElement.classList.add('light'); // Default to light mode

 if (!document.querySelector('meta[name="google"]')) {
 const meta = document.createElement('meta');
 meta.setAttribute('name', 'google');
 meta.setAttribute('content', 'notranslate');
 document.head.appendChild(meta);
 }
 }, []);

 // FIX: Memoize callbacks to prevent child re-renders
 const toggleLanguage = useCallback(() => {
 setLang((prev) => {
 const newLang = prev === 'ar' ? 'en' : 'ar';
 i18n.changeLanguage(newLang);
 // Sync document root direction and language attribute
 document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
 document.documentElement.lang = newLang;
 return newLang;
 });
 }, [i18n]);

 // FIX: Use requestAnimationFrame for smoother cursor tracking, removed unused ref
 useEffect(() => {
 let rafId: number | null = null;

 const mouseMove = (e: MouseEvent) => {
 if (rafId !== null) cancelAnimationFrame(rafId);

 rafId = requestAnimationFrame(() => {
 setCursorPosition({ x: e.clientX, y: e.clientY });

 const target = e.target as HTMLElement;
 const isClickable = target.closest(
 'a, button, input, select, [role="button"], .cursor-pointer'
 );
 setCursorVariant(isClickable ? 'hover' : 'default');
 });
 };

 window.addEventListener('mousemove', mouseMove);
 return () => {
 window.removeEventListener('mousemove', mouseMove);
 if (rafId !== null) cancelAnimationFrame(rafId);
 };
 }, []);

 // FIX: Memoize navigation handlers to stabilize child props
 const handleNavigate = useCallback(
 (page: string) => {
 window.scrollTo({ top: 0, behavior: 'smooth' });
 navigate(page === 'home' ? '/' : `/${page}`);
 },
 [navigate]
 );

 const handleCitySelect = useCallback(
 (cityId: string) => {
 setSelectedCity(cityId);
 window.scrollTo({ top: 0, behavior: 'smooth' });
 navigate('/city-sale');
 },
 [navigate]
 );

 const handlePropertyClick = useCallback(
 (property: Property) => {
 setSelectedProperty(property);
 window.scrollTo({ top: 0, behavior: 'smooth' });

 // FIX: Read location.pathname directly via the closure; safe because
 // useCallback is recreated when `navigate` changes and location is read
 // at call-time, not capture-time.
 const path = window.location.pathname.substring(1);
 if (path === 'riyadh-rent' || path === 'residential-rent') {
 navigate('/rent-property-details');
 } else {
 navigate('/property-details');
 }
 },
 [navigate]
 );

 const handleAuctionClick = useCallback(
 (auction: Auction) => {
 setSelectedAuction(auction);
 window.scrollTo({ top: 0, behavior: 'smooth' });
 navigate('/auction-details');
 },
 [navigate]
 );

 const handleCarClick = useCallback(
 (car: Car) => {
 setSelectedCar(car);
 window.scrollTo({ top: 0, behavior: 'smooth' });
 navigate('/car-details');
 },
 [navigate]
 );

 const handleDirectSaleItemClick = useCallback(
 (item: DirectSaleItem) => {
 setSelectedDirectSaleItem(item);
 window.scrollTo({ top: 0, behavior: 'smooth' });
 navigate('/direct-sale-details');
 },
 [navigate]
 );

 const handleOpenLogin = useCallback(() => {
 // Store current path to redirect back after login
 const currentPath = window.location.pathname;
 if (!AUTH_EXCLUDED_PATHS.has(currentPath.replace('/', '')) && currentPath !== '/login') {
 sessionStorage.setItem('redirectAfterLogin', currentPath);
 }
 handleNavigate('login');
 }, [handleNavigate]);

 const handleLogin = useCallback(() => {
 setIsLoggedIn(true);
 const redirectTo = sessionStorage.getItem('redirectAfterLogin');
 sessionStorage.removeItem('redirectAfterLogin');
 navigate(redirectTo || '/dashboard');
 }, [navigate]);

 const handleOpenChat = useCallback(() => {
 setIsChatOpen(true);
 }, []);

 const handleCloseChat = useCallback(() => {
 setIsChatOpen(false);
 }, []);

 // FIX: Compute derived values with useMemo to avoid recalculation
 const currentPath = useMemo(
 () => (location.pathname === '/' ? 'home' : location.pathname.substring(1)),
 [location.pathname]
 );

 const showHeaderFooter = useMemo(
 () => !AUTH_EXCLUDED_PATHS.has(currentPath) && !location.pathname.startsWith('/admin'),
 [currentPath, location.pathname]
 );

 // FIX: Memoize the direct-sale back handler to avoid inline function recreation
 const handleDirectSaleBack = useCallback(() => {
 if (
 selectedDirectSaleItem?.category === 'real-estate' ||
 selectedDirectSaleItem?.id.startsWith('re')
 ) {
 navigate('/direct-sale-real-estate');
 } else if (
 selectedDirectSaleItem?.category === 'cars' ||
 selectedDirectSaleItem?.id.startsWith('car')
 ) {
 navigate('/direct-sale-cars');
 } else if (
 selectedDirectSaleItem?.category === 'plates' ||
 selectedDirectSaleItem?.isPlate
 ) {
 navigate('/direct-sale-plates');
 } else {
 navigate('/direct-sale-other');
 }
 }, [selectedDirectSaleItem, navigate]);

 const handleGoBack = useCallback(() => {
 // بدلاً من navigate(-1) المباشر [cite: 102]
 const prevPath = sessionStorage.getItem('prevPath');
 if (prevPath) {
 navigate(prevPath); // يعود للمسار مع فلاتره المحفوظة [cite: 113]
 } else {
 navigate(-1);
 }
 }, [navigate]);

 const handleBackToRiyadhRent = useCallback(() => {
 navigate('/riyadh-rent');
 }, [navigate]);

 if (showSplash) {
 return <MobileSplash onComplete={handleSplashComplete} />;
 }

 return (
 <div
 dir={lang === 'ar' ? 'rtl' : 'ltr'}
 className={`min-h-screen bg-white dark:bg-[#2B3D50] text-gray-900 dark:text-gray-100 selection:bg-[#47CCD0] selection:text-white font-sans transition-colors duration-300`}
 style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}

 >
 <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:end-4 z-[9999] bg-[#47CCD0] text-white px-6 py-3 rounded-lg font-bold shadow-xl">
 {lang === 'en' ? 'Skip to main content' : t('app.skipToMain')}
 </a>
 <GlobalStyles enableCustomCursor={enableCustomCursor} />

 {/* Skip to main content link for accessibility */}
 <a href="#main-content" className="skip-link">
 {lang === 'ar' ? t('app.skipToMain') : 'Skip to main content'}
 </a>

 <CustomCursor
 position={cursorPosition}
 variant={cursorVariant}
 enabled={enableCustomCursor}
 />

 {showHeaderFooter && (
 <Header
 onNavigate={handleNavigate}
 lang={lang}
 toggleLanguage={toggleLanguage}
 onOpenLogin={handleOpenLogin}
 isLoggedIn={isLoggedIn}
 />
 )}

 <main id="main-content" className="lg:pb-0 pb-16">
 <Suspense fallback={<LoadingFallback />}>
 <AppRoutes
 handleNavigate={handleNavigate}
 handleOpenChat={handleOpenChat}
 cursorPosition={cursorPosition}
 handleCitySelect={handleCitySelect}
 handleDirectSaleItemClick={handleDirectSaleItemClick}
 handlePropertyClick={handlePropertyClick}
 handleAuctionClick={handleAuctionClick}
 isLoggedIn={isLoggedIn}
 handleOpenLogin={handleOpenLogin}
 selectedAuction={selectedAuction}
 handleCarClick={handleCarClick}
 selectedCar={selectedCar}
 selectedDirectSaleItem={selectedDirectSaleItem}
 handleDirectSaleBack={handleDirectSaleBack}
 selectedProperty={selectedProperty}
 handleBackToRiyadhRent={handleBackToRiyadhRent}
 handleGoBack={handleGoBack}
 selectedCity={selectedCity}
 handleLogin={handleLogin}
 />
 </Suspense>
 </main>

 {showHeaderFooter && <Footer onNavigate={handleNavigate} />}

 {showHeaderFooter && (
 <MobileBottomNav
 onNavigate={handleNavigate}
 onOpenLogin={handleOpenLogin}
 isLoggedIn={isLoggedIn}
 />
 )}

 {/* AI Assistant Widget */}
 <SmartAdvisor
 isOpen={isChatOpen}
 onOpen={handleOpenChat}
 onClose={handleCloseChat}
 isLoggedIn={isLoggedIn}
 onOpenLogin={handleOpenLogin}
 isEnglish={lang === 'en'}
 />

 <CookieConsent />
 </div>
 );
};

// ==================== ROUTER SETUP ====================
const router = createBrowserRouter(
 [
 {
 path: '*',
 Component: AppContent,
 },
 ],
 {
 future: {
 v7_relativeSplatPath: true,
 },
 },
);

// ==================== MAIN APP ====================
const App: React.FC = () => {
 return (
 <ErrorBoundary>
 <RouterProvider router={router} future={{ v7_startTransition: true }} />
 </ErrorBoundary>
 );
};

export default App;