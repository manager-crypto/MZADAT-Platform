import React from 'react';
import { ArrowLeft, BookOpen, Award, Users, Calendar, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import headerLogoImage from 'figma:asset/70a549db43a3294ca041bd716e8022066cbe43be.png';
import attachedImage from 'figma:asset/26d809b5dd02276e7e11ba402fb597af465c9840.png';

export const TrainingPage = () => {
 const { t, i18n } = useTranslation();

 const courses = [
 {
 title: t('training.course1Title'),
 date: t('training.course1Date'),
 duration: t('training.course1Duration'),
 level: t('training.course1Level'),
 image: "https://images.unsplash.com/photo-1630585574982-aacb8afbf617?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXVkaSUyMG1lZXRpbmclMjByb29tfGVufDF8fHx8MTc3NTIyMzE1OXww&ixlib=rb-4.1.0&q=80&w=1080"
 },
 {
 title: t('training.course2Title'),
 date: t('training.course2Date'),
 duration: t('training.course2Duration'),
 level: t('training.course2Level'),
 image: "https://images.unsplash.com/photo-1721899311824-5b75161a82fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXVkaSUyMG9mZmljZSUyMG1lZXRpbmd8ZW58MXx8fHwxNzc1MjIzMzM0fDA&ixlib=rb-4.1.0&q=80&w=1080"
 },
 {
 title: t('training.course3Title'),
 date: t('training.course3Date'),
 duration: t('training.course3Duration'),
 level: t('training.course3Level'),
 image: "https://images.unsplash.com/photo-1744075436329-5b3e672be001?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMHNlbWluYXJ8ZW58MXx8fHwxNzc1MjIzMTc4fDA&ixlib=rb-4.1.0&q=80&w=1080"
 }
 ];

 const features = [
 t('training.feature1'),
 t('training.feature2'),
 t('training.feature3'),
 t('training.feature4'),
 ];

 return (
 <div dir={i18n.dir()} className="min-h-screen bg-gray-50 pt-[100px] lg:pt-36 pb-12">
 <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8">

 {/* Header */}
 <div className="text-center mb-16">
 <span className="text-[#47CCD0] font-bold tracking-wider uppercase mb-2 block">{t('training.academyBadge')}</span>
 <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t('training.heroTitle')}</h1>
 <p className="text-gray-500 max-w-2xl mx-auto text-lg">
 {t('training.heroDesc')}
 </p>
 </div>

 {/* Stats */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
 <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center group hover:border-[#47CCD0] transition-all">
 <div className="w-16 h-16 bg-teal-50 text-[#47CCD0] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
 <BookOpen size={32} />
 </div>
 <h3 className="text-3xl font-bold text-gray-900 mb-2">+50</h3>
 <p className="text-gray-500">{t('training.statCourses')}</p>
 </div>
 <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center group hover:border-[#47CCD0] transition-all">
 <div className="w-16 h-16 bg-teal-50 text-[#47CCD0] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
 <Users size={32} />
 </div>
 <h3 className="text-3xl font-bold text-gray-900 mb-2">+2000</h3>
 <p className="text-gray-500">{t('training.statGraduates')}</p>
 </div>
 <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center group hover:border-[#47CCD0] transition-all">
 <div className="w-16 h-16 bg-teal-50 text-[#47CCD0] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
 <Award size={32} />
 </div>
 <h3 className="text-3xl font-bold text-gray-900 mb-2">100%</h3>
 <p className="text-gray-500">{t('training.statCertifications')}</p>
 </div>
 </div>

 {/* Upcoming Courses */}
 <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
 <Calendar className="text-[#47CCD0] shrink-0" /> {t('training.upcomingCourses')}
 </h2>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
 {courses.map((course, idx) => (
 <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all group">
 <div className="h-48 overflow-hidden relative">
 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10"></div>
 <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
 <span className="absolute top-4 end-4 bg-white/90 backdrop-blur text-gray-900 text-xs font-bold px-3 py-1 rounded-full z-20">
 {course.level}
 </span>
 </div>
 <div className="p-6">
 <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#47CCD0] transition-colors">{course.title}</h3>
 <div className="space-y-3 mb-6">
 <div className="flex items-center gap-2 text-sm text-gray-500">
 <Calendar size={16} className="text-[#47CCD0] shrink-0" />
 <span>{course.date}</span>
 </div>
 <div className="flex items-center gap-2 text-sm text-gray-500">
 <Clock size={16} className="text-[#47CCD0] shrink-0" />
 <span>{course.duration}</span>
 </div>
 </div>
 <button className="w-full py-3 border border-[#47CCD0] text-[#47CCD0] rounded-xl font-bold hover:bg-[#47CCD0] hover:text-white transition-all flex items-center justify-center gap-2">
 {t('training.registerNow')} <ArrowLeft size={18} />
 </button>
 </div>
 </div>
 ))}
 </div>

 {/* Features */}
 <div className="bg-[#111] text-white rounded-3xl p-12 relative overflow-hidden">
 <div className="absolute top-0 end-0 w-96 h-96 bg-[#47CCD0] rounded-full blur-[150px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>

 <div className="relative z-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-12 items-center text-center md:text-start">
 <div className="w-full">
 <h2 className="text-3xl font-bold mb-6">{t('training.whyTitle')}</h2>
 <div className="space-y-4 max-w-sm mx-auto md:mx-0">
 {features.map((feature, i) => (
 <div key={i} className="flex items-center gap-3 justify-center md:justify-start">
 <div className="w-6 h-6 shrink-0 rounded-full bg-[#47CCD0]/20 flex items-center justify-center text-[#47CCD0]">
 <CheckCircle2 size={14} />
 </div>
 <span className="text-gray-300 text-start">{feature}</span>
 </div>
 ))}
 </div>
 <button className="mt-8 bg-[#47CCD0] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#35a4a9] transition-colors w-full sm:w-auto">
 {t('training.contactUs')}
 </button>
 </div>
 <div className="relative h-[450px] md:h-[600px] w-full rounded-2xl overflow-hidden flex items-center justify-center">
 {/* Background Logo */}
 <img
 src={headerLogoImage}
 alt="Mzadat Background Logo"
 className="absolute inset-0 w-[80%] h-[80%] m-auto object-contain opacity-[0.08]"
 />
 <img
 src={attachedImage}
 alt="Digital Marketing and E-Commerce"
 className="absolute inset-0 w-full h-full object-cover scale-[1.25] md:scale-[1.1] origin-bottom z-0"
 />
 </div>
 </div>
 </div>

 </div>
 </div>
 );
};

// Helper Icon
const Clock = ({ size, className }: { size: number, className?: string }) => (
 <svg
 xmlns="http://www.w3.org/2000/svg"
 width={size}
 height={size}
 viewBox="0 0 24 24"
 fill="none"
 stroke="currentColor"
 strokeWidth="2"
 strokeLinecap="round"
 strokeLinejoin="round"
 className={className}
 >
 <circle cx="12" cy="12" r="10" />
 <polyline points="12 6 12 12 16 14" />
 </svg>
);
