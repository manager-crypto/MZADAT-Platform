import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
 Calendar, Clock, User, Phone, Mail, MapPin, CheckCircle2,
 ChevronRight, ChevronLeft, ShieldCheck, MessageCircle,
 ArrowLeft, Info, X, Sun, Sunset, Moon, CalendarDays
} from 'lucide-react';
import { RiyalSymbol } from '../components/ui/RiyalSymbol';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { PhoneInput } from '../components/ui/PhoneInput';
import { motion, AnimatePresence } from 'motion/react';

interface BookingPageProps {
 onNavigate: (page: string) => void;
 property?: any;
}

export const BookingPage: React.FC<BookingPageProps> = ({ onNavigate, property }) => {
 const { t } = useTranslation();

 const DAYS_AR = [
 t('bookingPage.days_0'),
 t('bookingPage.days_1'),
 t('bookingPage.days_2'),
 t('bookingPage.days_3'),
 t('bookingPage.days_4'),
 t('bookingPage.days_5'),
 t('bookingPage.days_6'),
 ];

 const MONTHS_AR = [
 t('bookingPage.months_0'),
 t('bookingPage.months_1'),
 t('bookingPage.months_2'),
 t('bookingPage.months_3'),
 t('bookingPage.months_4'),
 t('bookingPage.months_5'),
 t('bookingPage.months_6'),
 t('bookingPage.months_7'),
 t('bookingPage.months_8'),
 t('bookingPage.months_9'),
 t('bookingPage.months_10'),
 t('bookingPage.months_11'),
 ];

 const TIME_SLOTS = [
 { id: 'morning-1', label: '09:00', period: t('bookingPage.periodAM'), value: '09:00', type: 'morning' },
 { id: 'morning-2', label: '10:00', period: t('bookingPage.periodAM'), value: '10:00', type: 'morning' },
 { id: 'morning-3', label: '11:00', period: t('bookingPage.periodAM'), value: '11:00', type: 'morning' },
 { id: 'afternoon-1', label: '01:00', period: t('bookingPage.periodPM'), value: '13:00', type: 'afternoon' },
 { id: 'afternoon-2', label: '02:00', period: t('bookingPage.periodPM'), value: '14:00', type: 'afternoon' },
 { id: 'afternoon-3', label: '04:00', period: t('bookingPage.periodPM'), value: '16:00', type: 'afternoon' },
 { id: 'evening-1', label: '05:00', period: t('bookingPage.periodPM'), value: '17:00', type: 'evening' },
 { id: 'evening-2', label: '06:00', period: t('bookingPage.periodPM'), value: '18:00', type: 'evening' },
 { id: 'evening-3', label: '07:00', period: t('bookingPage.periodPM'), value: '19:00', type: 'evening' },
 ];

 const TIME_GROUPS = [
 { title: t('bookingPage.groupMorning'), icon: Sun, slots: TIME_SLOTS.filter(s => s.type === 'morning') },
 { title: t('bookingPage.groupAfternoon'), icon: Sunset, slots: TIME_SLOTS.filter(s => s.type === 'afternoon') },
 { title: t('bookingPage.groupEvening'), icon: Moon, slots: TIME_SLOTS.filter(s => s.type === 'evening') },
 ];

 const [step, setStep] = useState(1);
 const [selectedDate, setSelectedDate] = useState<Date | null>(null);
 const [selectedTime, setSelectedTime] = useState('');
 const [currentMonth, setCurrentMonth] = useState(new Date());
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [notes, setNotes] = useState('');
 const [showConfirmModal, setShowConfirmModal] = useState(false);

 const propertyData = {
 title: t('bookingPage.defaultTitle'),
 location: t('bookingPage.defaultLocation'),
 price: 2500000,
 image: "https://images.unsplash.com/photo-1700085060165-1ac17cf08286?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjB2aWxsYSUyMFNhdWRpJTIwQXJhYmlhJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzc0NzQ2NjI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
 ref: "REF-2024-8859",
 deposit: 5000,
 agent: t('bookingPage.defaultAgent'),
 agentPhone: "+966501234567",
 rooms: 5,
 area: 450,
 ...property,
 };
 if (typeof propertyData.price !== 'number' || isNaN(propertyData.price)) propertyData.price = 0;
 if (typeof propertyData.deposit !== 'number' || isNaN(propertyData.deposit)) propertyData.deposit = 0;

 // Calendar logic
 const calendarDays = useMemo(() => {
 const year = currentMonth.getFullYear();
 const month = currentMonth.getMonth();
 const firstDay = new Date(year, month, 1).getDay();
 const daysInMonth = new Date(year, month + 1, 0).getDate();
 const days: (number | null)[] = [];
 for (let i = 0; i < firstDay; i++) days.push(null);
 for (let i = 1; i <= daysInMonth; i++) days.push(i);
 return days;
 }, [currentMonth]);

 const today = new Date();
 today.setHours(0, 0, 0, 0);

 const isDateDisabled = (day: number) => {
 const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
 return date < today;
 };

 const isDateSelected = (day: number) => {
 if (!selectedDate) return false;
 return selectedDate.getDate() === day && selectedDate.getMonth() === currentMonth.getMonth() && selectedDate.getFullYear() === currentMonth.getFullYear();
 };

 const isToday = (day: number) => {
 const now = new Date();
 return day === now.getDate() && currentMonth.getMonth() === now.getMonth() && currentMonth.getFullYear() === now.getFullYear();
 };

 const handleSelectDate = (day: number) => {
 if (isDateDisabled(day)) return;
 setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
 };

 const prevMonth = () => {
 setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
 };
 const nextMonth = () => {
 setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
 };

 const canGoBack = currentMonth.getFullYear() > today.getFullYear() || currentMonth.getMonth() > today.getMonth();

 const formatSelectedDate = () => {
 if (!selectedDate) return '';
 return `${selectedDate.getDate()} ${MONTHS_AR[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;
 };

 const handleConfirm = () => {
 setShowConfirmModal(false);
 setStep(2);
 };

 const canSubmit = selectedDate && selectedTime && name.trim();

 // SUCCESS PAGE
 if (step === 2) {
 return (
 <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
 {/* Background glow for success */}
 <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#47CCD0]/10 rounded-full blur-[100px] pointer-events-none" />

 <motion.div
 initial={{ scale: 0.9, opacity: 0, y: 40 }}
 animate={{ scale: 1, opacity: 1, y: 0 }}
 transition={{ duration: 0.5, type: 'spring', damping: 25 }}
 className="bg-white/90 backdrop-blur-2xl rounded-[2rem] p-8 sm:p-12 max-w-lg w-full text-center shadow-xl shadow-slate-200/50 border border-gray-100 relative z-10"
 >
 <motion.div
 initial={{ scale: 0, rotate: -180 }}
 animate={{ scale: 1, rotate: 0 }}
 transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
 className="w-24 h-24 bg-[#47CCD0] rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg relative"
 >
 <div className="absolute inset-0 border-2 border-[#47CCD0] rounded-full animate-ping opacity-30" />
 <CheckCircle2 size={48} className="text-white" strokeWidth={2.5} />
 </motion.div>

 <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">{t('bookingPage.successTitle')}</h2>
 <p className="text-gray-500 mb-8 leading-relaxed text-sm">
 {t('bookingPage.successDesc', { name })}
 </p>

 {/* Ticket-like Receipt */}
 <div className="bg-gray-50 rounded-3xl p-6 mb-8 text-end space-y-4 border border-gray-200 relative overflow-hidden shadow-inner">
 {/* Ticket notches */}
 <div className="absolute top-1/2 -start-3 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-e border-gray-200" />
 <div className="absolute top-1/2 -end-3 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-s border-gray-200" />

 <div className="border-b border-dashed border-gray-300 pb-4 mb-4 flex justify-between items-center">
 <div>
 <p className="text-gray-500 text-xs mb-1">{t('bookingPage.bookingNumber')}</p>
 <p className="font-bold text-slate-900 font-mono tracking-wider text-lg">#BKG-{Math.floor(1000 + Math.random() * 9000)}</p>
 </div>
 <div className="text-start">
 <p className="text-gray-500 text-xs mb-1">{t('bookingPage.requestStatus')}</p>
 <p className="font-bold text-[#47CCD0] bg-[#47CCD0]/10 px-3 py-1 rounded-full text-xs">{t('bookingPage.confirmedStatus')}</p>
 </div>
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div>
 <p className="text-gray-500 text-xs mb-1">{t('bookingPage.inspectionDate')}</p>
 <p className="font-bold text-slate-900 text-sm">{formatSelectedDate()}</p>
 </div>
 <div>
 <p className="text-gray-500 text-xs mb-1">{t('bookingPage.timeLabel')}</p>
 <p className="font-bold text-slate-900 text-sm">{TIME_SLOTS.find(s => s.id === selectedTime)?.label || ''}</p>
 </div>
 <div className="col-span-2 mt-2">
 <p className="text-gray-500 text-xs mb-1">{t('bookingPage.propertyLabel')}</p>
 <p className="font-bold text-slate-900 text-sm truncate">{propertyData.title}</p>
 </div>
 </div>
 </div>

 <div className="flex flex-col sm:flex-row gap-4">
 <button
 onClick={() => onNavigate('dashboard')}
 className="flex-1 bg-[#47CCD0] text-white font-bold h-14 rounded-2xl shadow-md hover:shadow-lg hover: hover:-translate-y-0.5 transition-all"
 >
 {t('bookingPage.viewBookings')}
 </button>
 <button
 onClick={() => onNavigate('home')}
 className="flex-1 bg-white border border-gray-200 text-gray-700 font-bold h-14 rounded-2xl hover:bg-gray-50 hover:text-slate-900 transition-all"
 >
 {t('bookingPage.backHome')}
 </button>
 </div>
 </motion.div>
 </div>
 );
 }

 return (
 <div className="min-h-screen bg-slate-50 pb-32 lg:pb-20 pt-32 lg:pt-36">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

 {/* Header Breadcrumb */}
 <motion.div
 initial={{ opacity: 0, y: -10 }}
 animate={{ opacity: 1, y: 0 }}
 className="flex items-center gap-2 text-sm text-gray-500 mb-8 bg-white w-fit px-5 py-2.5 rounded-full border border-gray-200 shadow-sm"
 >
 <button onClick={() => onNavigate('home')} className="hover:text-[#47CCD0] transition-colors">{t('bookingPage.breadcrumbHome')}</button>
 <ChevronLeft size={14} className="text-gray-400" />
 <button onClick={() => onNavigate('city-sale')} className="hover:text-[#47CCD0] transition-colors">{t('bookingPage.breadcrumbProperties')}</button>
 <ChevronLeft size={14} className="text-gray-400" />
 <span className="text-[#47CCD0] font-bold">{t('bookingPage.breadcrumbBook')}</span>
 </motion.div>

 {/* Page Title */}
 <motion.div
 initial={{ y: 20, opacity: 0 }}
 animate={{ y: 0, opacity: 1 }}
 transition={{ delay: 0.1 }}
 className="mb-10"
 >
 <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3 flex items-center gap-3">
 <div className="w-12 h-12 rounded-2xl bg-[#47CCD0]/10 flex items-center justify-center">
 <Calendar className="text-[#47CCD0]" size={24} />
 </div>
 {t('bookingPage.pageTitle')}
 </h1>
 <p className="text-gray-500 max-w-xl leading-relaxed">{t('bookingPage.pageSubtitle')}</p>
 </motion.div>

 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

 {/* Right Column: Booking Form */}
 <div className="lg:col-span-8 space-y-8">

 {/* Step 1: Calendar */}
 <motion.section
 initial={{ y: 20, opacity: 0 }}
 animate={{ y: 0, opacity: 1 }}
 transition={{ delay: 0.2 }}
 className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm relative overflow-hidden"
 >
 <div className="absolute top-0 end-0 w-64 h-64 bg-[#47CCD0]/5 rounded-full blur-3xl -z-10" />

 <div className="flex items-center gap-4 mb-8">
 <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-200 text-slate-900 font-bold text-sm">1</div>
 <div>
 <h2 className="text-xl font-bold text-slate-900">{t('bookingPage.step1Title')}</h2>
 <p className="text-sm text-gray-500 mt-1">{t('bookingPage.step1Subtitle')}</p>
 </div>
 </div>

 <div className="bg-gray-50 rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-inner">
 {/* Month Navigation */}
 <div className="flex items-center justify-between mb-6">
 <button
 onClick={prevMonth}
 disabled={!canGoBack}
 className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${canGoBack ? 'bg-white border border-gray-200 hover:bg-gray-100 text-slate-700 shadow-sm' : 'text-gray-400 bg-gray-100 cursor-not-allowed border border-gray-200'}`}
 >
 <ChevronRight size={20} />
 </button>
 <span className="font-bold text-slate-900 text-lg tracking-wide">
 {MONTHS_AR[currentMonth.getMonth()]} {currentMonth.getFullYear()}
 </span>
 <button
 onClick={nextMonth}
 className="w-10 h-10 rounded-xl bg-white border border-gray-200 hover:bg-gray-100 flex items-center justify-center text-slate-700 shadow-sm transition-colors"
 >
 <ChevronLeft size={20} />
 </button>
 </div>

 {/* Day Headers */}
 <div className="grid grid-cols-7 gap-2 mb-3">
 {DAYS_AR.map(day => (
 <div key={day} className="text-center text-xs font-bold text-gray-500 py-2">{day}</div>
 ))}
 </div>

 {/* Day Grid */}
 <div className="grid grid-cols-7 gap-2">
 {calendarDays.map((day, idx) => (
 <div key={idx} className="aspect-square flex items-center justify-center relative">
 {day ? (
 <button
 onClick={() => handleSelectDate(day)}
 disabled={isDateDisabled(day)}
 className={`w-full h-full rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-300 relative group
 ${isDateSelected(day)
 ? 'bg-[#47CCD0] text-white shadow-md scale-105 z-10'
 : isToday(day)
 ? 'bg-[#47CCD0]/10 text-[#47CCD0] border border-[#47CCD0]/30'
 : isDateDisabled(day)
 ? 'text-gray-400 bg-gray-100/50 cursor-not-allowed'
 : 'text-slate-700 bg-white hover:bg-gray-50 hover:text-[#47CCD0] border border-gray-200 hover:border-gray-300 shadow-sm'
 }`}
 >
 {day}
 {isToday(day) && !isDateSelected(day) && (
 <span className="absolute bottom-1.5 w-1 h-1 rounded-full bg-[#47CCD0]" />
 )}
 </button>
 ) : null}
 </div>
 ))}
 </div>
 </div>
 </motion.section>

 {/* Step 2: Time Slots Section */}
 <motion.section
 initial={{ y: 20, opacity: 0 }}
 animate={{ y: 0, opacity: 1 }}
 transition={{ delay: 0.3 }}
 className={`bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm transition-all duration-500 ${!selectedDate ? 'opacity-50 pointer-events-none grayscale-[0.5]' : ''}`}
 >
 <div className="flex items-center gap-4 mb-8">
 <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-200 text-slate-900 font-bold text-sm">2</div>
 <div>
 <h2 className="text-xl font-bold text-slate-900">{t('bookingPage.step2Title')}</h2>
 <p className="text-sm text-gray-500 mt-1">{t('bookingPage.step2Subtitle')}</p>
 </div>
 </div>

 <div className="space-y-8">
 {TIME_GROUPS.map((group, idx) => (
 <div key={idx}>
 <h3 className="text-sm font-bold text-gray-500 mb-4 flex items-center gap-2">
 <group.icon size={16} className="text-gray-400" />
 {group.title}
 </h3>
 <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
 {group.slots.map(slot => (
 <button
 key={slot.id}
 onClick={() => setSelectedTime(slot.id)}
 className={`py-4 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all duration-300 border
 ${selectedTime === slot.id
 ? 'bg-[#47CCD0]/10 border-[#47CCD0] text-[#47CCD0] shadow-sm scale-[1.02] z-10'
 : 'bg-white border-gray-200 text-slate-600 hover:border-[#47CCD0]/50 hover:bg-gray-50 shadow-sm'
 }`}
 >
 <span className="text-lg font-bold">{slot.label}</span>
 <span className={`text-xs ${selectedTime === slot.id ? 'text-[#47CCD0]/80' : 'text-gray-500'}`}>{slot.period}</span>
 </button>
 ))}
 </div>
 </div>
 ))}
 </div>
 </motion.section>

 {/* Step 3: Personal Info Section */}
 <motion.section
 initial={{ y: 20, opacity: 0 }}
 animate={{ y: 0, opacity: 1 }}
 transition={{ delay: 0.4 }}
 className={`bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm transition-all duration-500 ${(!selectedDate || !selectedTime) ? 'opacity-50 pointer-events-none grayscale-[0.5]' : ''}`}
 >
 <div className="flex items-center gap-4 mb-8">
 <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-200 text-slate-900 font-bold text-sm">3</div>
 <div>
 <h2 className="text-xl font-bold text-slate-900">{t('bookingPage.step3Title')}</h2>
 <p className="text-sm text-gray-500 mt-1">{t('bookingPage.step3Subtitle')}</p>
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className="space-y-2">
 <label className="text-sm font-bold text-slate-700 ms-1">{t('bookingPage.labelFullName')} <span className="text-[#47CCD0]">*</span></label>
 <div className="relative group">
 <div className="absolute inset-y-0 end-0 flex items-center pe-4 pointer-events-none text-gray-400 group-focus-within:text-[#47CCD0] transition-colors">
 <User size={18} />
 </div>
 <input
 type="text"
 value={name}
 onChange={(e) => setName(e.target.value)}
 placeholder={t('bookingPage.placeholderName')}
 className="w-full h-14 bg-gray-50 border border-gray-200 rounded-2xl px-4 pe-12 text-slate-900 placeholder-gray-400 focus:outline-none focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] transition-all hover:border-gray-300"
 />
 </div>
 </div>

 <div className="space-y-2">
 <label className="text-sm font-bold text-slate-700 ms-1">{t('bookingPage.labelPhone')} <span className="text-[#47CCD0]">*</span></label>
 <PhoneInput
 containerClassName="h-14 bg-gray-50 border border-gray-200 rounded-2xl focus-within:border-[#47CCD0] focus-within:ring-1 focus-within:ring-[#47CCD0] transition-all hover:border-gray-300"
 className="h-full bg-transparent outline-none rounded-2xl text-slate-900"
 />
 </div>

 <div className="space-y-2 md:col-span-2">
 <label className="text-sm font-bold text-slate-700 ms-1">{t('bookingPage.labelEmail')} <span className="text-gray-400 font-normal text-xs">{t('bookingPage.labelOptional')}</span></label>
 <div className="relative group">
 <div className="absolute inset-y-0 end-0 flex items-center pe-4 pointer-events-none text-gray-400 group-focus-within:text-[#47CCD0] transition-colors">
 <Mail size={18} />
 </div>
 <input
 type="email"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 placeholder="name@example.com"
 className="w-full h-14 bg-gray-50 border border-gray-200 rounded-2xl px-4 pe-12 text-slate-900 placeholder-gray-400 focus:outline-none focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] transition-all hover:border-gray-300 text-end dir-ltr-placeholder"
 dir="ltr"
 />
 </div>
 </div>

 <div className="space-y-2 md:col-span-2">
 <label className="text-sm font-bold text-slate-700 ms-1">{t('bookingPage.labelNotes')} <span className="text-gray-400 font-normal text-xs">{t('bookingPage.labelOptional')}</span></label>
 <div className="relative group">
 <div className="absolute top-4 end-0 flex items-start pe-4 pointer-events-none text-gray-400 group-focus-within:text-[#47CCD0] transition-colors">
 <MessageCircle size={18} />
 </div>
 <textarea
 value={notes}
 onChange={(e) => setNotes(e.target.value)}
 placeholder={t('bookingPage.placeholderNotes')}
 rows={3}
 className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 pe-12 text-slate-900 placeholder-gray-400 focus:outline-none focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] transition-all hover:border-gray-300 resize-none"
 />
 </div>
 </div>
 </div>
 </motion.section>
 </div>

 {/* Left Column: Property Summary + Actions */}
 <div className="lg:col-span-4 space-y-6">
 <motion.div
 initial={{ opacity: 0, x: -20 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ delay: 0.3 }}
 className="sticky top-28 bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-xl shadow-slate-200/50"
 >
 <div className="relative h-56 w-full group">
 <ImageWithFallback src={propertyData.image} alt="Property" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
 <div className="absolute bottom-5 end-5 start-5">
 <span className="bg-white/90 text-[#47CCD0] px-2.5 py-1 rounded-md text-xs font-bold backdrop-blur-md shadow-sm inline-block mb-2">{propertyData.ref}</span>
 <h3 className="text-white font-bold text-xl leading-snug">{propertyData.title}</h3>
 </div>
 </div>

 <div className="p-6 space-y-6">
 {/* Price */}
 <div className="flex items-end gap-2">
 <span className="text-3xl font-black text-[#47CCD0]">{propertyData.price.toLocaleString()}</span>
 <RiyalSymbol className="w-6 h-6 text-[#47CCD0]/70 mb-1" />
 </div>

 <div className="w-full h-px bg-gray-100" />

 {/* Details Grid */}
 <div className="space-y-4">
 <div className="flex items-center justify-between">
 <span className="text-gray-500 text-sm flex items-center gap-2"><CalendarDays size={16}/> {t('bookingPage.dateLabel')}</span>
 <span className={`text-sm ${selectedDate ? 'text-slate-900 font-bold' : 'text-gray-400'}`}>
 {selectedDate ? formatSelectedDate() : t('bookingPage.notSet')}
 </span>
 </div>
 <div className="flex items-center justify-between">
 <span className="text-gray-500 text-sm flex items-center gap-2"><Clock size={16}/> {t('bookingPage.timeLabel')}</span>
 <span className={`text-sm ${selectedTime ? 'text-slate-900 font-bold' : 'text-gray-400'}`}>
 {selectedTime ? TIME_SLOTS.find(s => s.id === selectedTime)?.label : t('bookingPage.notSet')}
 </span>
 </div>
 </div>

 <div className="w-full h-px bg-gray-100" />

 {/* Agent */}
 <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
 <div className="w-12 h-12 rounded-full bg-[#47CCD0] flex items-center justify-center text-white font-bold text-lg shadow-md">
 {typeof propertyData.agent === 'object' ? propertyData.agent.name[0] : propertyData.agent[0]}
 </div>
 <div>
 <p className="text-slate-900 text-sm font-bold mb-1">{typeof propertyData.agent === 'object' ? propertyData.agent.name : propertyData.agent}</p>
 <p className="text-xs text-[#47CCD0] flex items-center gap-1"><ShieldCheck size={14}/> {t('bookingPage.certifiedMarketer')}</p>
 </div>
 </div>

 {/* Action Buttons */}
 <div className="pt-2">
 <button
 disabled={!canSubmit}
 onClick={() => setShowConfirmModal(true)}
 className={`w-full py-4 rounded-2xl font-bold flex justify-center items-center gap-2 transition-all duration-300 shadow-md ${canSubmit ? 'bg-[#47CCD0] text-white hover:shadow-lg hover: hover:-translate-y-1' : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none border border-gray-200'}`}
 >
 {t('bookingPage.reviewAndConfirm')}
 <ArrowLeft size={18} className={canSubmit ? "animate-pulse" : ""} />
 </button>
 </div>
 </div>
 </motion.div>

 {/* Trust Badge below summary */}
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ delay: 0.5 }}
 className="flex items-start gap-3 text-xs text-gray-500 leading-relaxed bg-white p-4 rounded-2xl border border-gray-100 shadow-sm"
 >
 <Info size={16} className="shrink-0 text-gray-400 mt-0.5" />
 <span>{t('bookingPage.trustNote')}</span>
 </motion.div>
 </div>
 </div>
 </div>

 {/* Confirmation Modal */}
 <AnimatePresence>
 {showConfirmModal && (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
 onClick={() => setShowConfirmModal(false)}
 >
 <motion.div
 initial={{ scale: 0.95, y: 20, opacity: 0 }}
 animate={{ scale: 1, y: 0, opacity: 1 }}
 exit={{ scale: 0.95, y: 20, opacity: 0 }}
 className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-gray-100 shadow-2xl relative overflow-hidden"
 onClick={e => e.stopPropagation()}
 >
 <div className="absolute top-0 end-0 w-full h-1 bg-[#47CCD0]" />

 <div className="flex items-center justify-between mb-8">
 <div>
 <h3 className="text-2xl font-black text-slate-900">{t('bookingPage.modalTitle')}</h3>
 <p className="text-sm text-gray-500 mt-1">{t('bookingPage.modalSubtitle')}</p>
 </div>
 <button onClick={() => setShowConfirmModal(false)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:text-slate-900 hover:bg-gray-100 transition-colors border border-gray-200">
 <X size={20} />
 </button>
 </div>

 <div className="bg-gray-50 rounded-2xl p-5 space-y-4 mb-8 border border-gray-200">
 <div className="flex justify-between items-center text-sm">
 <span className="text-gray-500 flex items-center gap-2"><MapPin size={16}/> {t('bookingPage.propertyLabel')}</span>
 <span className="font-bold text-slate-900 text-start max-w-[180px] truncate">{propertyData.title}</span>
 </div>
 <div className="w-full h-px bg-gray-200" />
 <div className="flex justify-between items-center text-sm">
 <span className="text-gray-500 flex items-center gap-2"><Calendar size={16}/> {t('bookingPage.dateLabel')}</span>
 <span className="font-bold text-[#47CCD0]">{formatSelectedDate()}</span>
 </div>
 <div className="w-full h-px bg-gray-200" />
 <div className="flex justify-between items-center text-sm">
 <span className="text-gray-500 flex items-center gap-2"><Clock size={16}/> {t('bookingPage.timeLabel')}</span>
 <span className="font-bold text-[#47CCD0]">{TIME_SLOTS.find(s => s.id === selectedTime)?.label}</span>
 </div>
 <div className="w-full h-px bg-gray-200" />
 <div className="flex justify-between items-center text-sm">
 <span className="text-gray-500 flex items-center gap-2"><User size={16}/> {t('bookingPage.nameLabel')}</span>
 <span className="font-bold text-slate-900">{name}</span>
 </div>
 </div>

 <div className="flex gap-4">
 <button
 onClick={() => setShowConfirmModal(false)}
 className="flex-1 h-14 rounded-2xl bg-white border border-gray-200 text-slate-700 font-bold hover:bg-gray-50 transition-colors shadow-sm"
 >
 {t('bookingPage.editBtn')}
 </button>
 <button
 onClick={handleConfirm}
 className="flex-1 h-14 rounded-2xl bg-[#47CCD0] text-white font-bold hover:shadow-lg hover: transition-all flex items-center justify-center gap-2"
 >
 {t('bookingPage.finalConfirm')}
 <CheckCircle2 size={20} />
 </button>
 </div>
 </motion.div>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 );
};
