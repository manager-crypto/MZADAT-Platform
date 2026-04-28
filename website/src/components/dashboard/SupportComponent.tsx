import React, { useState } from 'react';
import {
 Phone,
 Mail,
 MessageCircle,
 Send,
 FileText,
 Paperclip,
 CheckCircle2,
 Clock,
 Search,
 ChevronDown
} from 'lucide-react';

import { PhoneInput } from '../ui/PhoneInput';
import { useTranslation } from 'react-i18next';

export const SupportComponent = () => {
 const { t } = useTranslation();
 const [activeTab, setActiveTab] = useState('new-ticket'); // 'new-ticket' or 'track-ticket'
 const [ticketStep, setTicketStep] = useState(1);
 const [openFaq, setOpenFaq] = useState<number | null>(null);

 const faqs = [
 { id: 1, q: t('support.faq1Q'), a: t('support.faq1A') },
 { id: 2, q: t('support.faq2Q'), a: t('support.faq2A') },
 { id: 3, q: t('support.faq3Q'), a: t('support.faq3A') }
 ];

 return (
 <div className="space-y-6 animate-fade-up">
 {/* Contact Cards */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:border-[#47CCD0] transition-colors">
 <div className="w-14 h-14 bg-[#F8FAFB] rounded-2xl flex items-center justify-center mb-4 text-[#2B3D50] group-hover:bg-[#2B3D50] group-hover:text-white transition-colors">
 <Phone size={24} />
 </div>
 <h3 className="font-bold text-[#2B3D50] mb-2">{t('support.callUs')}</h3>
 <p className="text-sm text-gray-500 mb-4">{t('support.callHours')}</p>
 <a href="tel:920000000" className="text-lg font-black text-[#47CCD0] dir-ltr" dir="ltr">9200 00000</a>
 </div>

 <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:border-[#25D366] transition-colors">
 <div className="w-14 h-14 bg-[#F8FAFB] rounded-2xl flex items-center justify-center mb-4 text-[#2B3D50] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
 <MessageCircle size={24} />
 </div>
 <h3 className="font-bold text-[#2B3D50] mb-2">{t('support.whatsapp')}</h3>
 <p className="text-sm text-gray-500 mb-4">{t('support.whatsappDesc')}</p>
 <a href="#" className="text-lg font-black text-[#25D366] dir-ltr" dir="ltr">+966 55 000 0000</a>
 </div>

 <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:border-[#47CCD0] transition-colors">
 <div className="w-14 h-14 bg-[#F8FAFB] rounded-2xl flex items-center justify-center mb-4 text-[#2B3D50] group-hover:bg-[#2B3D50] group-hover:text-white transition-colors">
 <Mail size={24} />
 </div>
 <h3 className="font-bold text-[#2B3D50] mb-2">{t('support.email')}</h3>
 <p className="text-sm text-gray-500 mb-4">{t('support.emailDesc')}</p>
 <a href="mailto:support@mzadat.sa" className="text-lg font-bold text-[#47CCD0]">support@mzadat.sa</a>
 </div>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 {/* Ticket System */}
 <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
 <div className="flex border-b border-gray-100">
 <button
 onClick={() => setActiveTab('new-ticket')}
 className={`flex-1 py-4 text-center font-bold text-sm flex items-center justify-center gap-2 transition-colors ${activeTab === 'new-ticket' ? 'text-[#47CCD0] bg-[#47CCD0]/5 border-b-2 border-[#47CCD0]' : 'text-gray-500 hover:bg-gray-50'}`}
 >
 <FileText size={18} /> {t('support.newTicket')}
 </button>
 <button
 onClick={() => setActiveTab('track-ticket')}
 className={`flex-1 py-4 text-center font-bold text-sm flex items-center justify-center gap-2 transition-colors ${activeTab === 'track-ticket' ? 'text-[#47CCD0] bg-[#47CCD0]/5 border-b-2 border-[#47CCD0]' : 'text-gray-500 hover:bg-gray-50'}`}
 >
 <Search size={18} /> {t('support.trackTicket')}
 </button>
 </div>

 <div className="p-6 flex-1">
 {activeTab === 'new-ticket' && (
 <>
 {ticketStep === 1 ? (
 <form onSubmit={(e) => { e.preventDefault(); setTicketStep(2); }} className="space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-bold text-[#2B3D50] mb-2">{t('support.fullName')}</label>
 <input type="text" className="w-full bg-[#F8FAFB] border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#47CCD0]" placeholder={t('support.fullNamePlaceholder')} required />
 </div>
 <div>
 <label className="block text-sm font-bold text-[#2B3D50] mb-2">{t('support.mobileNumber')}</label>
 <PhoneInput
 required
 containerClassName="h-[50px] bg-[#F8FAFB] border border-gray-200 rounded-xl focus-within:border-[#47CCD0] transition-colors"
 className="h-full bg-transparent outline-none rounded-xl"
 />
 </div>
 </div>

 <div>
 <label className="block text-sm font-bold text-[#2B3D50] mb-2">{t('support.requestType')}</label>
 <select className="w-full bg-[#F8FAFB] border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#47CCD0]">
 <option>{t('support.requestTypeLogin')}</option>
 <option>{t('support.requestTypeDeposit')}</option>
 <option>{t('support.requestTypeTechnical')}</option>
 <option>{t('support.requestTypeGeneral')}</option>
 <option>{t('support.requestTypeComplaint')}</option>
 </select>
 </div>

 <div>
 <label className="block text-sm font-bold text-[#2B3D50] mb-2">{t('support.requestDetails')}</label>
 <textarea rows={4} className="w-full bg-[#F8FAFB] border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#47CCD0] resize-none" placeholder={t('support.requestDetailsPlaceholder')} required></textarea>
 </div>

 <div className="flex items-center gap-4">
 <button type="button" className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-colors">
 <Paperclip size={18} />
 {t('support.attachFile')}
 </button>
 <button type="submit" className="flex-1 flex items-center justify-center gap-2 bg-[#2B3D50] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#34495E] transition-colors">
 <Send size={18} />
 {t('support.sendTicket')}
 </button>
 </div>
 </form>
 ) : (
 <div className="flex flex-col items-center justify-center h-full text-center py-10 space-y-4">
 <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-2">
 <CheckCircle2 size={40} />
 </div>
 <h3 className="text-2xl font-black text-[#2B3D50]">{t('support.ticketSuccess')}</h3>
 <p className="text-gray-500 max-w-md">
 {t('support.ticketSuccessDesc', { ticketNumber: '#TCK-8923' })}
 </p>
 <button
 onClick={() => { setTicketStep(1); setActiveTab('track-ticket'); }}
 className="mt-4 bg-[#2B3D50] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#34495E] transition-colors"
 >
 {t('support.trackTicketBtn')}
 </button>
 </div>
 )}
 </>
 )}

 {activeTab === 'track-ticket' && (
 <div className="space-y-6">
 <div className="relative">
 <input
 type="text"
 placeholder={t('support.trackPlaceholder')}
 className="w-full bg-[#F8FAFB] border border-gray-200 rounded-xl ps-12 pe-4 py-3 outline-none focus:border-[#47CCD0]"
 />
 <Search className="absolute start-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
 </div>

 <div className="border border-gray-100 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
 <div className="flex items-start gap-3">
 <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 shrink-0">
 <Clock size={20} />
 </div>
 <div>
 <div className="flex items-center gap-2 mb-1">
 <span className="font-bold text-[#2B3D50]">#TCK-8854</span>
 <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-bold">{t('support.statusProcessing')}</span>
 </div>
 <p className="text-sm text-gray-500">{t('support.sampleTicketDesc')}</p>
 </div>
 </div>
 <div className="text-start w-full md:w-auto">
 <p className="text-xs text-gray-400 mb-1">{t('support.creationDate')}</p>
 <p className="text-sm font-bold text-[#2B3D50]">{t('support.sampleTicketDate')}</p>
 </div>
 </div>
 </div>
 )}
 </div>
 </div>

 {/* FAQs */}
 <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
 <h3 className="font-black text-[#2B3D50] text-lg mb-6 flex items-center gap-2">
 <span className="w-1 h-6 bg-[#47CCD0] rounded-full"></span>
 {t('support.faqTitle')}
 </h3>
 <div className="space-y-3">
 {faqs.map((faq) => (
 <div key={faq.id} className="border border-gray-100 rounded-xl overflow-hidden">
 <button
 onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
 className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-end"
 >
 <span className="font-bold text-[#2B3D50] text-sm">{faq.q}</span>
 <ChevronDown size={16} className={`text-gray-400 transition-transform ${openFaq === faq.id ? 'rotate-180' : ''}`} />
 </button>
 {openFaq === faq.id && (
 <div className="p-4 bg-white text-sm text-gray-600 leading-relaxed border-t border-gray-100">
 {faq.a}
 </div>
 )}
 </div>
 ))}
 </div>
 <button className="w-full mt-4 text-[#47CCD0] font-bold text-sm hover:underline flex items-center justify-center gap-1">
 {t('support.viewAllFaqs')}
 </button>
 </div>
 </div>
 </div>
 );
};
