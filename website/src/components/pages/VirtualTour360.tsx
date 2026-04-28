import React, { useState, useEffect } from 'react';
import { X, Navigation, MousePointer2, Smartphone, Move } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface VirtualTour360Props {
 image: string; // The base image to simulate the tour with
}

export const VirtualTour360: React.FC<VirtualTour360Props> = ({ image }) => {
 const { t } = useTranslation();
 const [isOpen, setIsOpen] = useState(false);
 const [currentRoom, setCurrentRoom] = useState(0);
 const [isDragging, setIsDragging] = useState(false);
 const [position, setPosition] = useState({ x: 0, y: 0 });

 // Simulated rooms for the virtual tour
 const tourRooms = [
 { id: 'living-room', name: t('virtualTour.livingRoom', 'غرفة المعيشة'), image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000' },
 { id: 'kitchen', name: t('virtualTour.kitchen', 'المطبخ'), image: 'https://images.unsplash.com/photo-1556910103-1c02745a872f?auto=format&fit=crop&q=80&w=2000' },
 { id: 'master-bedroom', name: t('virtualTour.masterBedroom', 'غرفة النوم الرئيسية'), image: 'https://images.unsplash.com/photo-1522771731478-4ea863261623?auto=format&fit=crop&q=80&w=2000' },
 ];
 
 const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
 setIsDragging(true);
 };

 const stopDrag = () => {
 setIsDragging(false);
 };

 const onDrag = (e: React.MouseEvent | React.TouchEvent) => {
 if (!isDragging) return;
 
 // Simulate panning effect
 let movementX = 0;
 if ('touches' in e) {
 // Very basic simulation for touch
 movementX = e.touches[0].clientX;
 } else {
 movementX = (e as React.MouseEvent).movementX;
 }

 setPosition(prev => ({
 ...prev,
 x: prev.x + (movementX * 2) // Multiply for more noticeable panning
 }));
 };

 useEffect(() => {
 if (isOpen) {
 document.body.style.overflow = 'hidden';
 } else {
 document.body.style.overflow = 'unset';
 }
 return () => {
 document.body.style.overflow = 'unset';
 };
 }, [isOpen]);

 const activeImage = tourRooms[currentRoom].image || image;

 return (
 <>
 {/* Trigger Button - Floating Action Button on the image */}
 <button
 onClick={(e) => {
 e.stopPropagation();
 setIsOpen(true);
 setPosition({ x: 0, y: 0 });
 }}
 className="absolute bottom-6 start-6 z-20 flex items-center justify-center gap-2 bg-white/90 backdrop-blur-md text-[#2B3D50] hover:text-[#47CCD0] px-4 py-2.5 rounded-full font-bold shadow-xl border-2 border-white/50 transition-all hover:scale-105 group"
 >
 <span className="relative flex h-4 w-4">
 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#47CCD0] opacity-75"></span>
 <span className="relative inline-flex rounded-full h-4 w-4 bg-[#47CCD0]"></span>
 </span>
 <span style={{ fontFamily: 'Helvetica, Arial, sans-serif' }} className="tracking-widest text-sm mt-1">360°</span>
 <span style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }} className="text-sm">{t('virtualTour.buttonTitle', 'جولة افتراضية')}</span>
 
 {/* Custom Thin-line 360 Icon */}
 <div className="w-6 h-6 border-2 border-current rounded-full flex items-center justify-center ms-1">
 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
 <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
 <path d="M3 3v5h5" />
 </svg>
 </div>
 </button>

 {/* Full-screen Overlay */}
 {isOpen && (
 <div className="fixed inset-0 z-50 bg-black flex flex-col" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
 {/* Header Bar */}
 <div className="absolute top-0 start-0 end-0 p-4 flex justify-between items-center z-30 bg-gradient-to-b from-black/80 to-transparent text-white">
 <div className="flex items-center gap-4">
 <button 
 onClick={() => setIsOpen(false)}
 className="w-10 h-10 bg-white/10 hover:bg-[#47CCD0] rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
 >
 <X size={20} />
 </button>
 <div>
 <h3 className="font-bold text-lg">{tourRooms[currentRoom].name}</h3>
 <p className="text-xs text-white/70 flex items-center gap-1" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
 360° VIRTUAL TOUR
 </p>
 </div>
 </div>
 
 {/* Guide Info */}
 <div className="hidden md:flex items-center gap-3 bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
 <MousePointer2 size={16} className="text-[#47CCD0]" />
 <span className="text-sm">{t('virtualTour.dragToPan', 'اسحب للتجول في الغرفة')}</span>
 <div className="w-px h-4 bg-white/20 mx-2"></div>
 <Smartphone size={16} className="text-[#47CCD0]" />
 <span className="text-sm">{t('virtualTour.movePhone', 'حرك هاتفك للمشاهدة')}</span>
 </div>
 </div>

 {/* 360 Viewer Canvas (Simulated) */}
 <div 
 className="flex-1 relative overflow-hidden bg-black cursor-move"
 onMouseDown={startDrag}
 onMouseUp={stopDrag}
 onMouseLeave={stopDrag}
 onMouseMove={onDrag}
 onTouchStart={startDrag}
 onTouchEnd={stopDrag}
 onTouchMove={onDrag}
 >
 <div 
 className="absolute inset-[-50%] transition-transform duration-75 ease-out will-change-transform"
 style={{
 backgroundImage: `url(${activeImage})`,
 backgroundSize: 'cover',
 backgroundPosition: 'center',
 transform: `translateX(${position.x * 0.1}px) scale(1.1)`,
 }}
 />

 {/* Navigation Hotspots */}
 <div 
 className="absolute inset-0 flex items-center justify-center transition-transform duration-75"
 style={{ transform: `translateX(${position.x * 0.1}px)` }}
 >
 {tourRooms.map((room, idx) => {
 if (idx === currentRoom) return null;
 
 // Position hotspots randomly but consistently for simulation
 const angle = (idx * 120 + 45) * (Math.PI / 180);
 const radius = 150; // pixels from center
 const left = `calc(50% + ${Math.cos(angle) * radius}px)`;
 const top = `calc(50% + ${Math.sin(angle) * radius}px)`;

 return (
 <button
 key={room.id}
 onClick={(e) => {
 e.stopPropagation();
 setCurrentRoom(idx);
 setPosition({ x: 0, y: 0 });
 }}
 style={{ left, top }}
 className="absolute z-20 group flex flex-col items-center gap-2 transform -translate-x-1/2 -translate-y-1/2"
 >
 <div className="relative">
 <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
 <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#2B3D50] group-hover:text-white group-hover:bg-[#47CCD0] transition-all shadow-lg border border-white/50">
 <Move size={20} className="rotate-45" />
 </div>
 </div>
 <span className="bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
 {t('virtualTour.goTo', 'الانتقال إلى')} {room.name}
 </span>
 </button>
 );
 })}
 </div>
 
 {/* Compass / Orientation indicator (Visual only) */}
 <div className="absolute bottom-24 end-6 w-16 h-16 border-2 border-white/20 rounded-full flex items-center justify-center pointer-events-none z-20 backdrop-blur-sm bg-black/20">
 <Navigation size={24} className="text-[#47CCD0] transition-transform duration-75" style={{ transform: `rotate(${-position.x * 0.1}deg)` }} />
 </div>
 </div>

 {/* Bottom Thumbnails / Room Selector */}
 <div className="absolute bottom-0 start-0 end-0 p-6 bg-gradient-to-t from-black/90 to-transparent z-30">
 <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar justify-center">
 {tourRooms.map((room, idx) => (
 <button
 key={room.id}
 onClick={() => {
 setCurrentRoom(idx);
 setPosition({ x: 0, y: 0 });
 }}
 className={`relative w-24 h-16 md:w-32 md:h-20 rounded-xl overflow-hidden shrink-0 transition-all border-2 ${
 currentRoom === idx ? 'border-[#47CCD0] scale-110' : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'
 }`}
 >
 <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center pb-2">
 <span className="text-white text-xs font-bold whitespace-nowrap">{room.name}</span>
 </div>
 </button>
 ))}
 </div>
 </div>
 </div>
 )}
 </>
 );
};
