import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, MessageSquare, Lightbulb, ThumbsUp, CheckCircle2, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const SuggestionsPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
 const { t } = useTranslation();
 const [formData, setFormData] = useState({
 name: '',
 email: '',
 type: 'general',
 message: ''
 });
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [isSuccess, setIsSuccess] = useState(false);

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 setIsSubmitting(true);

 // Simulate API call
 setTimeout(() => {
 setIsSubmitting(false);
 setIsSuccess(true);
 setFormData({ name: '', email: '', type: 'general', message: '' });
 }, 1500);
 };

 const reasons = [
 { title: t('suggestionsPage.reason1Title'), desc: t('suggestionsPage.reason1Desc') },
 { title: t('suggestionsPage.reason2Title'), desc: t('suggestionsPage.reason2Desc') },
 { title: t('suggestionsPage.reason3Title'), desc: t('suggestionsPage.reason3Desc') },
 ];

 const suggestionTypes = [
 { id: 'feature', label: t('suggestionsPage.typeFeature') },
 { id: 'improvement', label: t('suggestionsPage.typeImprovement') },
 { id: 'design', label: t('suggestionsPage.typeDesign') },
 { id: 'other', label: t('suggestionsPage.typeOther') },
 ];

 return (
 <div className="min-h-screen bg-[#F8FAFB] pt-36 pb-16">

 {/* Hero Section */}
 <div className="bg-[#2B3D50] text-white py-20 relative overflow-hidden">
 <div className="absolute top-0 start-0 w-full h-full overflow-hidden z-0">
 <div className="absolute top-10 end-10 w-64 h-64 bg-[#47CCD0] rounded-full blur-[100px] opacity-20"></div>
 <div className="absolute bottom-10 start-10 w-48 h-48 bg-[#47CCD0] rounded-full blur-[80px] opacity-10"></div>
 </div>

 <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6 }}
 >
 <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/10">
 <Lightbulb size={18} className="text-[#47CCD0]" />
 <span className="text-sm font-medium">{t('suggestionsPage.heroBadge')}</span>
 </div>
 <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('suggestionsPage.heroTitle')}</h1>
 <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
 {t('suggestionsPage.heroSubtitle')}
 </p>
 </motion.div>
 </div>
 </div>

 <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

 {/* Info Cards (Left Side) */}
 <div className="lg:col-span-1 space-y-6">
 <motion.div
 initial={{ opacity: 0, x: 20 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ delay: 0.2 }}
 className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full"
 >
 <h3 className="text-xl font-bold text-[#2B3D50] mb-6 flex items-center gap-2">
 <ThumbsUp className="text-[#47CCD0]" />
 {t('suggestionsPage.whyShareTitle')}
 </h3>

 <ul className="space-y-6">
 {reasons.map((item, idx) => (
 <li key={idx} className="flex gap-4">
 <div className="w-10 h-10 rounded-full bg-[#F8FAFB] flex items-center justify-center text-[#47CCD0] shrink-0 border border-gray-100">
 <CheckCircle2 size={20} />
 </div>
 <div>
 <h4 className="font-bold text-[#2B3D50] mb-1">{item.title}</h4>
 <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
 </div>
 </li>
 ))}
 </ul>

 <div className="mt-8 pt-8 border-t border-gray-100">
 <div className="bg-[#F8FAFB] p-4 rounded-xl border border-[#47CCD0]/20">
 <p className="text-sm text-[#2B3D50] leading-relaxed flex gap-3">
 <MessageSquare className="text-[#47CCD0] shrink-0 mt-1" size={20} />
 {t('suggestionsPage.reviewNote')}
 </p>
 </div>
 </div>
 </motion.div>
 </div>

 {/* Form Section (Right Side) */}
 <div className="lg:col-span-2">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.3 }}
 className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100"
 >
 {isSuccess ? (
 <div className="text-center py-16">
 <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
 <CheckCircle2 className="w-10 h-10 text-green-500" />
 </div>
 <h3 className="text-2xl font-bold text-[#2B3D50] mb-4">{t('suggestionsPage.successTitle')}</h3>
 <p className="text-gray-500 mb-8 max-w-md mx-auto">
 {t('suggestionsPage.successMsg')}
 </p>
 <button
 onClick={() => setIsSuccess(false)}
 className="bg-[#2B3D50] text-white px-8 py-3 rounded-xl hover:bg-[#2B3D50]/90 transition-colors"
 >
 {t('suggestionsPage.sendAnother')}
 </button>
 </div>
 ) : (
 <form onSubmit={handleSubmit} className="space-y-6">
 <div className="flex items-center gap-3 mb-2">
 <h3 className="text-xl font-bold text-[#2B3D50]">{t('suggestionsPage.formTitle')}</h3>
 <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded-md border border-red-100">{t('suggestionsPage.allRequired')}</span>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className="space-y-2">
 <label className="text-sm font-medium text-gray-700">{t('suggestionsPage.name')}</label>
 <input
 type="text"
 required
 value={formData.name}
 onChange={(e) => setFormData({...formData, name: e.target.value})}
 className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#47CCD0] focus:ring-4 focus:ring-[#47CCD0]/10 outline-none transition-all"
 placeholder={t('suggestionsPage.namePlaceholder')}
 />
 </div>
 <div className="space-y-2">
 <label className="text-sm font-medium text-gray-700">{t('suggestionsPage.email')}</label>
 <input
 type="email"
 required
 value={formData.email}
 onChange={(e) => setFormData({...formData, email: e.target.value})}
 className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#47CCD0] focus:ring-4 focus:ring-[#47CCD0]/10 outline-none transition-all"
 placeholder="example@mail.com"
 />
 </div>
 </div>

 <div className="space-y-2">
 <label className="text-sm font-medium text-gray-700">{t('suggestionsPage.suggestionType')}</label>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
 {suggestionTypes.map((type) => (
 <button
 key={type.id}
 type="button"
 onClick={() => setFormData({...formData, type: type.id})}
 className={`py-3 px-4 rounded-xl text-sm font-medium border transition-all ${
 formData.type === type.id
 ? 'bg-[#47CCD0]/10 border-[#47CCD0] text-[#47CCD0]'
 : 'border-gray-200 text-gray-600 hover:border-gray-300'
 }`}
 >
 {type.label}
 </button>
 ))}
 </div>
 </div>

 <div className="space-y-2">
 <label className="text-sm font-medium text-gray-700">{t('suggestionsPage.details')}</label>
 <textarea
 required
 value={formData.message}
 onChange={(e) => setFormData({...formData, message: e.target.value})}
 rows={6}
 className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#47CCD0] focus:ring-4 focus:ring-[#47CCD0]/10 outline-none transition-all resize-none"
 placeholder={t('suggestionsPage.detailsPlaceholder')}
 />
 </div>

 <button
 type="submit"
 disabled={isSubmitting}
 className="w-full bg-[#2B3D50] hover:bg-[#2B3D50]/90 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
 >
 {isSubmitting ? (
 <span className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
 ) : (
 <>
 {t('suggestionsPage.submit')} <Send size={20} className="rtl:rotate-180" />
 </>
 )}
 </button>
 </form>
 )}
 </motion.div>
 </div>
 </div>
 </div>
 </div>
 );
};
