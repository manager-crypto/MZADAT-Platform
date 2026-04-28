import React, { useRef, useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gavel, Users, TrendingUp, ShieldCheck, Calendar, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { formatHijriDate, formatGregorianDate, formatTime } from '../../utils/dateUtils';

import heroImage from 'figma:asset/d28b4504d12b9c29ec591f1f578731428ec41f46.png';

const SB = "#47ccd0";
const DB = "#0B1118";
const DB_CARD = "#101920";

const slides = [
 {
 id: 'realestate',
 title: 'realEstateTitle', // i18n key
 subtitle: 'realEstateSubtitle', // i18n key
 desc: 'realEstateDesc', // i18n key
 },
 {
 id: 'cars',
 title: 'carsTitle',
 subtitle: 'carsSubtitle',
 desc: 'carsDesc',
 },
 {
 id: 'mixed',
 title: 'mixedTitle',
 subtitle: 'mixedSubtitle',
 desc: 'mixedDesc',
 },
];

// ═══════════════════════════════════════════════════
// PARTICLE SYSTEM
// ═══════════════════════════════════════════════════
function ParticleCanvas({ mouseRef }: { mouseRef: React.RefObject<{ x: number | null; y: number | null }> }) {
 const ref = useRef<HTMLCanvasElement>(null);
 const anim = useRef<number>(0);
 useEffect(() => {
 const c = ref.current; if (!c) return;
 const ctx = c.getContext("2d")!;
 let w: number, h: number;
 const resize = () => { const d = devicePixelRatio || 1; w = innerWidth; h = innerHeight; c.width = w * d; c.height = h * d; c.style.width = w + "px"; c.style.height = h + "px"; ctx.setTransform(d, 0, 0, d, 0, 0); };
 resize(); addEventListener("resize", resize);
 const N = 300, ps: any[] = [];
 class P {
 s: string; x: number = 0; y: number = 0; bvy: number = 0; vy: number = 0; vx: number = 0;
 sz: number = 0; al: number = 0; ml: number = 0; age: number = 0; lf: number = 1;
 ad: boolean = false; da: number = 0;
 constructor(s: string) { this.s = s; this.r(true); }
 r(init: boolean) {
 const bx = this.s === "u" ? w * 0.28 : w * 0.72;
 this.x = bx + (Math.random() - 0.5) * w * 0.5;
 this.y = init ? Math.random() * h : this.s === "u" ? h + Math.random() * 60 : -Math.random() * 60;
 this.bvy = this.s === "u" ? -(0.15 + Math.random() * 0.7) : (0.15 + Math.random() * 0.7);
 this.vy = this.bvy; this.vx = (Math.random() - 0.5) * 0.12;
 this.sz = 0.4 + Math.random() * 2; this.al = 0.08 + Math.random() * 0.45;
 this.ml = 250 + Math.random() * 600; this.age = init ? Math.random() * this.ml : 0; this.lf = 1;
 this.ad = Math.random() > 0.6; this.da = Math.random() > 0.5 ? Math.PI / 4 : -Math.PI / 4;
 }
 u(mx: number | null, my: number | null) {
 this.age++; const r = this.age / this.ml;
 this.lf = r < 0.08 ? r / 0.08 : r > 0.88 ? (1 - r) / 0.12 : 1;
 if (this.ad && this.age % 50 < 2) this.vx = Math.cos(this.da) * 0.5;
 if (mx !== null && my !== null) {
 const dx = this.x - mx, dy = this.y - my, dt = Math.sqrt(dx * dx + dy * dy);
 if (dt < 130) { const f = (130 - dt) / 130, a = Math.atan2(dy, dx); this.vx += Math.cos(a) * f * 2.5; this.vy += Math.sin(a) * f * 1.8; }
 }
 this.x += this.vx; this.y += this.vy; this.vx *= 0.95; this.vy += (this.bvy - this.vy) * 0.025;
 if ((this.s === "u" && this.y < -30) || (this.s !== "u" && this.y > h + 30) || this.age > this.ml) this.r(false);
 }
 d(ctx: CanvasRenderingContext2D) {
 const a = this.al * this.lf; if (a < 0.01) return;
 ctx.beginPath(); ctx.arc(this.x, this.y, this.sz, 0, Math.PI * 2); ctx.fillStyle = `rgba(71,204,208,${a})`; ctx.fill();
 if (this.sz > 1.2) { ctx.beginPath(); ctx.arc(this.x, this.y, this.sz * 3, 0, Math.PI * 2); ctx.fillStyle = `rgba(71,204,208,${a * 0.04})`; ctx.fill(); }
 }
 }
 for (let i = 0; i < N; i++) ps.push(new P(i < N / 2 ? "u" : "d"));
 function frame() {
 ctx.clearRect(0, 0, w, h);
 const mx = mouseRef.current?.x ?? null, my = mouseRef.current?.y ?? null;
 ps.forEach((p: any) => { p.u(mx, my); p.d(ctx); });
 for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) {
 const dx = ps[i].x - ps[j].x, dy = ps[i].y - ps[j].y, ds = dx * dx + dy * dy;
 if (ds < 5600) { const d = Math.sqrt(ds), a = (1 - d / 75) * 0.05 * ps[i].lf * ps[j].lf; ctx.beginPath(); ctx.moveTo(ps[i].x, ps[i].y); ctx.lineTo(ps[j].x, ps[j].y); ctx.strokeStyle = `rgba(71,204,208,${a})`; ctx.lineWidth = 0.3; ctx.stroke(); }
 }
 anim.current = requestAnimationFrame(frame);
 }
 frame();
 return () => { removeEventListener("resize", resize); cancelAnimationFrame(anim.current); };
 }, [mouseRef]);
 return <canvas ref={ref} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }} />;
}

// ═══════════════════════════════════════════════════
// MAIN HERO
// ═══════════════════════════════════════════════════
interface HeroSectionProps {
 onNavigate?: (page: string) => void;
 onOpenChat?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
 const { t, i18n } = useTranslation();
 const mouseRef = useRef({ x: null as number | null, y: null as number | null });
 const onMM = useCallback((e: React.MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; }, []);
 const [currentSlide, setCurrentSlide] = useState(0);
 const [currentTime, setCurrentTime] = useState(new Date());
 const [isMobile, setIsMobile] = useState(false);

 useEffect(() => {
 const check = () => setIsMobile(window.innerWidth < 1024);
 check();
 window.addEventListener('resize', check);
 return () => window.removeEventListener('resize', check);
 }, []);

 useEffect(() => {
 const timer = setInterval(() => {
 setCurrentSlide(prev => (prev + 1) % slides.length);
 }, 5000);
 return () => clearInterval(timer);
 }, []);

 useEffect(() => {
 const timer = setInterval(() => setCurrentTime(new Date()), 1000);
 return () => clearInterval(timer);
 }, []);

 const slide = slides[currentSlide];

 return (
 <section
 onMouseMove={onMM}
 dir={i18n.dir()}
 className="relative w-full overflow-hidden"
 style={{
 height: isMobile ? "100svh" : "100vh",
 minHeight: isMobile ? 680 : 700,
 background: DB,
 fontFamily: "'Noto Kufi Arabic', sans-serif",
 }}
 >
 <style>{`
 @keyframes fu{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
 @keyframes gp{0%,100%{box-shadow:0 0 20px rgba(71,204,208,.15)}50%{box-shadow:0 0 40px rgba(71,204,208,.3)}}
 @keyframes subtleFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
 `}</style>

 {/* Particle Background */}
 <ParticleCanvas mouseRef={mouseRef} />

 {/* Ambient Gradients - Enhanced */}
 <div className="absolute inset-0 z-0" style={{
 background: `
 radial-gradient(ellipse 80% 60% at 50% 0%, rgba(71,204,208,.04) 0%, transparent 60%),
 radial-gradient(ellipse 60% 50% at 20% 70%, rgba(71,204,208,.025) 0%, transparent 50%),
 radial-gradient(ellipse 50% 60% at 80% 30%, rgba(71,204,208,.02) 0%, transparent 50%),
 linear-gradient(180deg, ${DB} 0%, rgba(11,17,24,.92) 50%, ${DB} 100%)
 `
 }} />

 {/* ═══ DESKTOP LAYOUT ═══ */}
 <div className="hidden lg:flex container mx-auto h-full items-center justify-between px-8 z-10 relative pointer-events-none pb-24 pt-20">
 {/* Right Side (Text & Info) */}
 <div className="w-1/2 flex flex-col items-start justify-center h-full text-start pointer-events-none z-20">

 {/* Date/Time Bar */}
 <motion.div
 initial={{ opacity: 0, y: -20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.7, delay: 0.2 }}
 className="pointer-events-auto mb-8 flex items-center gap-5 px-5 py-2.5 rounded-2xl border border-white/[0.06] backdrop-blur-xl"
 style={{ background: "rgba(255,255,255,0.03)" }}
 >
 <div className="flex items-center gap-2">
 <Calendar className="w-4 h-4 text-[#47ccd0]/70" />
 <span className="text-sm text-white/50 font-medium">{formatHijriDate(currentTime)}</span>
 </div>
 <div className="w-px h-4 bg-white/10" />
 <div className="flex items-center gap-2">
 <span className="text-sm text-white/50 font-medium">{formatGregorianDate(currentTime)}</span>
 </div>
 <div className="w-px h-4 bg-white/10" />
 <div className="flex items-center gap-2" dir="ltr">
 <Clock className="w-4 h-4 text-[#47ccd0]/70" />
 <span className="text-sm text-[#47ccd0] font-bold font-mono tabular-nums">{formatTime(currentTime)}</span>
 </div>
 </motion.div>

 {/* Headline */}
 <AnimatePresence mode="wait">
 <motion.div
 key={slide.id}
 initial={{ opacity: 0, x: 40 }}
 animate={{ opacity: 1, x: 0 }}
 exit={{ opacity: 0, x: -40 }}
 transition={{ duration: 0.5, ease: "easeOut" }}
 className="max-w-2xl text-start"
 >
 <h1 className="text-6xl xl:text-7xl font-black leading-[1.2] tracking-tight mb-6">
 <span className="text-white">{t(`hero.${slide.title}`)}</span>
 <br />
 <span className="text-[#47ccd0]">{t(`hero.${slide.subtitle}`)}</span>
 </h1>
 <p className="text-lg xl:text-xl text-white/40 leading-relaxed font-normal max-w-lg">
 {t(`hero.${slide.desc}`)}
 </p>
 </motion.div>
 </AnimatePresence>

 {/* CTA Button */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.5, duration: 0.6 }}
 className="mt-10 pointer-events-auto"
 >
 <button
 onClick={() => onNavigate?.('auctions')}
 className="group relative px-10 py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 hover:-translate-y-1"
 style={{
 background: `linear-gradient(135deg, ${SB}, #38b2b6)`,
 boxShadow: "0 4px 30px rgba(71,204,208,.2)",
 animation: "gp 3s ease-in-out infinite",
 }}
 >
 <span className="flex items-center gap-2">
 {t('hero.exploreAuctions')}
 <span className="group-hover:-translate-x-1 transition-transform inline-block">&lsaquo;</span>
 </span>
 </button>
 </motion.div>

 {/* Slide Indicators */}
 <div className="flex items-center gap-2.5 mt-12">
 {slides.map((_, idx) => (
 <button
 key={idx}
 onClick={() => setCurrentSlide(idx)}
 className="pointer-events-auto transition-all duration-500 rounded-full"
 style={{
 width: currentSlide === idx ? 32 : 8,
 height: 8,
 background: currentSlide === idx ? SB : "rgba(255,255,255,0.15)",
 boxShadow: currentSlide === idx ? `0 0 12px ${SB}` : "none",
 border: "none",
 cursor: "pointer",
 }}
 />
 ))}
 </div>
 </div>

 {/* Left Side (Static Image) */}
 <div className="w-1/2 h-full flex items-center justify-center relative pointer-events-none">
 <motion.div
 initial={{ opacity: 0, scale: 0.9 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ duration: 0.8, ease: "easeOut" }}
 className="absolute inset-0 flex items-center justify-center"
 >
 {/* Glow behind image */}
 <div className="absolute w-[400px] h-[400px] rounded-full opacity-30" style={{ background: `radial-gradient(circle, rgba(71,204,208,0.15), transparent 70%)` }} />
 <img
 src={heroImage}
 alt={t('hero.mzadatAlt')}
 className="max-w-[90%] max-h-[85%] object-contain relative z-10 transition-transform duration-500 hover:scale-[1.05] cursor-pointer pointer-events-auto"
 />
 </motion.div>
 </div>
 </div>

 {/* ═══ MOBILE LAYOUT ═══ */}
 <div className="flex lg:hidden flex-col h-full z-10 relative pointer-events-none" style={{ paddingBottom: 140 }}>

 {/* Top Section: Date/Time - clearly below the header, pushed down for breathing room */}
 <div className="pt-28 px-4">
 <motion.div
 initial={{ opacity: 0, y: -10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.3 }}
 className="flex items-center justify-center gap-3 pointer-events-auto"
 >
 <div className="flex items-center gap-1.5">
 <Calendar className="w-3 h-3 text-[#47ccd0]/60" />
 <span className="text-[11px] text-white/40 font-medium">{formatHijriDate(currentTime)}</span>
 </div>
 <div className="w-px h-3 bg-white/10" />
 <div className="flex items-center gap-1.5">
 <span className="text-[11px] text-white/40 font-medium">{formatGregorianDate(currentTime)}</span>
 </div>
 <div className="w-px h-3 bg-white/10" />
 <div className="flex items-center gap-1.5" dir="ltr">
 <Clock className="w-3 h-3 text-[#47ccd0]/60" />
 <span className="text-[11px] text-[#47ccd0]/80 font-bold font-mono tabular-nums">{formatTime(currentTime)}</span>
 </div>
 </motion.div>
 </div>

 {/* Middle: Text Content + Image side by side feel */}
 <div className="flex flex-col justify-start px-4 pt-4 shrink-0">
 <AnimatePresence mode="wait">
 <motion.div
 key={slide.id}
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -20 }}
 transition={{ duration: 0.45, ease: "easeOut" }}
 className="text-center"
 >
 <h1 className="text-[26px] sm:text-[30px] font-black leading-[1.35] tracking-tight mb-4">
 <span className="text-white">{t(`hero.${slide.title}`)}</span>
 <br />
 <span className="text-[#47ccd0]">{t(`hero.${slide.subtitle}`)}</span>
 </h1>
 <p className="text-[13px] sm:text-sm text-white/35 leading-relaxed font-normal max-w-xs mx-auto">
 {t(`hero.${slide.desc}`)}
 </p>
 </motion.div>
 </AnimatePresence>

 {/* CTA Button - Compact */}
 <motion.div
 initial={{ opacity: 0, y: 15 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.4, duration: 0.5 }}
 className="mt-3 flex justify-center pointer-events-auto"
 >
 <button
 onClick={() => onNavigate?.('auctions')}
 className="group px-7 py-3 rounded-xl text-white font-bold text-[15px] transition-all duration-300 active:scale-95"
 style={{
 background: `linear-gradient(135deg, ${SB}, #3bb8bc)`,
 boxShadow: "0 4px 24px rgba(71,204,208,.2)",
 }}
 >
 <span className="flex items-center gap-2">
 {t('hero.exploreAuctions')}
 <span className="inline-block">&lsaquo;</span>
 </span>
 </button>
 </motion.div>

 {/* Slide Indicators - Mobile */}
 <div className="flex items-center justify-center gap-2 mt-2">
 {slides.map((_, idx) => (
 <button
 key={idx}
 onClick={() => setCurrentSlide(idx)}
 className="pointer-events-auto transition-all duration-400 rounded-full"
 style={{
 width: currentSlide === idx ? 24 : 6,
 height: 6,
 background: currentSlide === idx ? SB : "rgba(255,255,255,0.12)",
 boxShadow: currentSlide === idx ? `0 0 10px rgba(71,204,208,.4)` : "none",
 border: "none",
 cursor: "pointer",
 }}
 />
 ))}
 </div>
 </div>

 {/* Hero Image - Mobile, pushed up to fill available space */}
 <div className="relative flex justify-center items-center flex-1 min-h-0 px-2 -mb-2">
 {/* Glow effect behind image */}
 <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(71,204,208,0.15), transparent 70%)' }} />

 <motion.img
 src={heroImage}
 alt={t('hero.mzadatAlt')}
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.7, delay: 0.2 }}
 className="relative z-10 w-auto h-full max-h-full max-w-[460px] sm:max-w-[520px] object-contain cursor-pointer transition-transform duration-500 hover:scale-[1.05] pointer-events-auto"
 style={{
 filter: "drop-shadow(0 0 50px rgba(71,204,208,0.18))",
 }}
 />

 {/* Bottom gradient mask for smooth transition to stats */}
 <div className="absolute bottom-0 start-0 end-0 h-12 z-20" style={{ background: `linear-gradient(to top, ${DB_CARD}, transparent)` }} />
 </div>
 </div>

 {/* ═══ BOTTOM STATS BAR ═══ */}
 <motion.div
 initial={{ y: 60, opacity: 0 }}
 animate={{ y: 0, opacity: 1 }}
 transition={{ delay: 0.8, type: "spring", damping: 22 }}
 className="absolute start-0 end-0 z-30 bottom-0"
 >
 {/* Top accent line */}
 <div className="h-px w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(71,204,208,0.3), transparent)' }} />

 <div
 className="relative overflow-hidden"
 style={{
 background: isMobile ? "rgba(16,25,32,0.95)" : "rgba(71,204,208,0.05)",
 backdropFilter: "blur(20px)",
 }}
 >
 <div className="container mx-auto px-4 py-4 lg:py-4">
 {/* All 4 stats - responsive grid */}
 <div className={`grid ${isMobile ? 'grid-cols-2 gap-x-6 gap-y-3' : 'grid-cols-4 gap-8'}`}>
 {[
 { icon: Users, value: "10K+", label: t('hero.registeredUsers') },
 { icon: Gavel, value: "250+", label: t('hero.activeAuctions') },
 { icon: TrendingUp, value: "500+", label: t('hero.realEstatePartners') },
 { icon: ShieldCheck, value: "%100", label: t('hero.securityRate') },
 ].map((stat, i) => (
 <div key={i} className="text-center group transition-transform duration-300">
 <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1">
 <stat.icon className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-[#47ccd0] opacity-60`} />
 <span
 className={`${isMobile ? 'text-sm sm:text-base' : 'text-xl md:text-2xl'} font-black text-[#47ccd0] tabular-nums`}
 dir="ltr"
 >
 {stat.value}
 </span>
 </div>
 <p className={`${isMobile ? 'text-[9px] sm:text-[11px]' : 'text-xs md:text-sm'} text-white/35 font-medium`}>
 {stat.label}
 </p>
 </div>
 ))}
 </div>
 </div>
 </div>
 </motion.div>

 {/* Corner Brackets - Desktop only */}
 <div className="hidden lg:block">
 <div className="absolute top-[15%] start-[5%] w-[50px] h-[50px] border-t-2 border-s-2 border-[#47ccd0]/20 rounded-tl z-[6]" />
 <div className="absolute top-[15%] end-[5%] w-[50px] h-[50px] border-t-2 border-e-2 border-[#47ccd0]/20 rounded-tr z-[6]" />
 <div className="absolute bottom-[15%] start-[5%] w-[50px] h-[50px] border-b-2 border-s-2 border-[#47ccd0]/20 rounded-bl z-[6]" />
 <div className="absolute bottom-[15%] end-[5%] w-[50px] h-[50px] border-b-2 border-e-2 border-[#47ccd0]/20 rounded-br z-[6]" />
 </div>

 {/* Scroll Indicator - Desktop only */}
 <div className="hidden lg:block absolute bottom-[100px] start-1/2 -translate-x-1/2 z-[31]">
 <div className="w-[22px] h-[36px] rounded-[11px] border border-[#47ccd0]/15 flex justify-center pt-2">
 <div className="w-[2.5px] h-[7px] rounded-sm bg-[#47ccd0]" style={{ animation: "fu 1.5s ease-in-out infinite" }} />
 </div>
 </div>
 </section>
 );
};