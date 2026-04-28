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
} from 'lucide-react';
import { BackButton } from '../components/ui/BackButton';
import { PhoneInput } from '../components/ui/PhoneInput';
import { useTranslation } from 'react-i18next';

interface SupportPageProps {
 onNavigate: (page: string) => void;
}

export const SupportPage: React.FC<SupportPageProps> = ({ onNavigate }) => {
 const { t } = useTranslation();
 const [ticketStep, setTicketStep] = useState(1);
 const [activeTab, setActiveTab] = useState('new-ticket');
 const [ticketId, setTicketId] = useState('');

 const [formData, setFormData] = useState({
 name: '',
 email: '',
 phone: '',
 category: '',
 subject: '',
 description: ''
 });

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 setTimeout(() => setTicketStep(2), 1000);
 };

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
 setFormData({ ...formData, [e.target.name]: e.target.value });
 };

 return (
 <div className="min-h-screen bg-gray-50 pb-20 pt-40">
 <div className="container mx-auto px-4 max-w-5xl">

 <div className="text-center mb-10">
 <h1 className="text-3xl font-black text-gray-900 mb-2">{t('support.title')}</h1>
 <p className="text-gray-500">{t('support.subtitle')}</p>
 </div>

 {/* Contact Cards */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:border-[#47CCD0] transition-all group">
 <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
 <Phone size={24} />
 </div>
 <h3 className="font-bold text-gray-900 mb-1">{t('support.callUs')}</h3>
 <p className="text-sm text-gray-400 mb-3">{t('support.callHours')}</p>
 <a href="tel:920000000" className="text-blue-600 font-bold font-mono text-lg" dir="ltr">9200 00000</a>
 </div>

 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:border-[#47CCD0] transition-all group">
 <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors">
 <MessageCircle size={24} />
 </div>
 <h3 className="font-bold text-gray-900 mb-1">{t('support.whatsapp')}</h3>
 <p className="text-sm text-gray-400 mb-3">{t('support.whatsappHours')}</p>
 <a href="#" className="text-green-600 font-bold font-mono text-lg" dir="ltr">+966 55 123 4567</a>
 </div>

 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:border-[#47CCD0] transition-all group">
 <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
 <Mail size={24} />
 </div>
 <h3 className="font-bold text-gray-900 mb-1">{t('support.email')}</h3>
 <p className="text-sm text-gray-400 mb-3">{t('support.emailHours')}</p>
 <a href="mailto:support@mzadat.sa" className="text-orange-600 font-bold font-mono text-lg">support@mzadat.sa</a>
 </div>
 </div>

 {/* Main Content Area */}
 <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
 {/* Tabs */}
 <div className="flex border-b border-gray-100">
 <button
 onClick={() => setActiveTab('new-ticket')}
 className={`flex-1 py-4 text-center font-bold text-sm flex items-center justify-center gap-2 transition-colors ${activeTab === 'new-ticket' ? 'text-[#47CCD0] bg-teal-50 border-b-2 border-[#47CCD0]' : 'text-gray-500 hover:bg-gray-50'}`}
 >
 <FileText size={18} /> {t('support.newTicket')}
 </button>
 <button
 onClick={() => setActiveTab('track-ticket')}
 className={`flex-1 py-4 text-center font-bold text-sm flex items-center justify-center gap-2 transition-colors ${activeTab === 'track-ticket' ? 'text-[#47CCD0] bg-teal-50 border-b-2 border-[#47CCD0]' : 'text-gray-500 hover:bg-gray-50'}`}
 >
 <Search size={18} /> {t('support.trackTicket')}
 </button>
 </div>

 <div className="p-6 md:p-10">
 {/* New Ticket Form */}
 {activeTab === 'new-ticket' && (
 <>
 {ticketStep === 1 ? (
 <form onSubmit={handleSubmit} className="space-y-6">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className="space-y-2">
 <label className="text-sm font-bold text-gray-700 block text-end">{t('support.fullName')}</label>
 <input
 required
 name="name"
 value={formData.name}
 onChange={handleChange}
 type="text"
 className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] outline-none transition-all text-end"
 placeholder={t('support.fullNamePlaceholder')}
 />
 </div>
 <div className="space-y-2">
 <label className="text-sm font-bold text-gray-700 block text-end">{t('support.phone')}</label>
 <PhoneInput
 required
 name="phone"
 value={formData.phone}
 onChange={handleChange}
 containerClassName="h-[50px] bg-white border border-gray-200 rounded-xl focus-within:border-[#47CCD0] focus-within:ring-1 focus-within:ring-[#47CCD0] transition-all"
 className="h-full bg-transparent outline-none rounded-xl"
 />
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className="space-y-2">
 <label className="text-sm font-bold text-gray-700 block text-end">{t('support.emailLabel')}</label>
 <input
 required
 name="email"
 value={formData.email}
 onChange={handleChange}
 type="email"
 className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] outline-none transition-all text-start"
 placeholder="example@mail.com"
 dir="ltr"
 />
 </div>
 <div className="space-y-2">
 <label className="text-sm font-bold text-gray-700 block text-end">{t('support.issueType')}</label>
 <select
 required
 name="category"
 value={formData.category}
 onChange={handleChange}
 className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] outline-none transition-all bg-white text-end"
 >
 <option value="">{t('support.selectCategory')}</option>
 <option value="auction">{t('support.catAuction')}</option>
 <option value="payment">{t('support.catPayment')}</option>
 <option value="account">{t('support.catAccount')}</option>
 <option value="complaint">{t('support.catComplaint')}</option>
 <option value="other">{t('support.catOther')}</option>
 </select>
 </div>
 </div>

 <div className="space-y-2">
 <label className="text-sm font-bold text-gray-700 block text-end">{t('support.subject')}</label>
 <input
 required
 name="subject"
 value={formData.subject}
 onChange={handleChange}
 type="text"
 className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] outline-none transition-all text-end"
 placeholder={t('support.subjectPlaceholder')}
 />
 </div>

 <div className="space-y-2">
 <label className="text-sm font-bold text-gray-700 block text-end">{t('support.description')}</label>
 <textarea
 required
 name="description"
 value={formData.description}
 onChange={handleChange}
 rows={5}
 className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] outline-none transition-all resize-none text-end"
 placeholder={t('support.descriptionPlaceholder')}
 />
 </div>

 <div className="border border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
 <Paperclip className="mx-auto text-gray-400 mb-2" />
 <p className="text-sm text-gray-500">{t('support.attachFiles')}</p>
 <p className="text-xs text-gray-400 mt-1">{t('support.attachLimit')}</p>
 </div>

 <button type="submit" className="w-full py-4 bg-[#47CCD0] text-white rounded-xl font-bold shadow-lg shadow-teal-500/20 hover:bg-[#35a4a9] transition-all flex items-center justify-center gap-2 text-lg">
 <Send size={20} />
 {t('support.submitTicket')}
 </button>
 </form>
 ) : (
 <div className="text-center py-10 animate-fade-up">
 <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
 <CheckCircle2 size={48} />
 </div>
 <h2 className="text-2xl font-black text-gray-900 mb-2">{t('support.successTitle')}</h2>
 <p className="text-gray-500 mb-6">{t('support.successMsg')} <span className="font-mono font-bold text-gray-900">#TK-88592</span>. {t('support.successReply')}</p>

 <div className="flex justify-center gap-4">
 <BackButton
 onClick={() => onNavigate('home')}
 label={t('support.backHome')}
 className="border border-gray-300 !text-gray-700 hover:bg-gray-50 bg-white"
 />
 <button
 onClick={() => { setTicketStep(1); setFormData({ name: '', email: '', phone: '', category: '', subject: '', description: '' }); }}
 className="px-6 py-2.5 bg-[#47CCD0] text-white rounded-xl font-bold shadow-md shadow-teal-500/10 hover:bg-[#35a4a9] transition-colors"
 >
 {t('support.anotherTicket')}
 </button>
 </div>
 </div>
 )}
 </>
 )}

 {/* Track Ticket */}
 {activeTab === 'track-ticket' && (
 <div className="max-w-md mx-auto py-10">
 <div className="text-center mb-6">
 <Search size={48} className="mx-auto text-gray-300 mb-4" />
 <h3 className="text-xl font-bold text-gray-900">{t('support.trackTitle')}</h3>
 <p className="text-gray-500 text-sm">{t('support.trackSubtitle')}</p>
 </div>

 <div className="space-y-4">
 <input
 type="text"
 value={ticketId}
 onChange={(e) => setTicketId(e.target.value)}
 className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] outline-none transition-all text-center font-mono placeholder:font-sans"
 placeholder={t('support.trackPlaceholder')}
 />
 <button className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all">
 {t('support.search')}
 </button>
 </div>

 {ticketId && (
 <div className="mt-8 bg-gray-50 rounded-xl p-4 border border-gray-200 animate-fade-in">
 <div className="flex items-center justify-between mb-2">
 <span className="font-bold text-gray-900">{t('support.ticketStatus')}</span>
 <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-md font-bold">{t('support.statusProcessing')}</span>
 </div>
 <p className="text-sm text-gray-500 mb-4">{t('support.statusDesc')}</p>
 <div className="flex items-center gap-2 text-xs text-gray-400">
 <Clock size={14} />
 <span>{t('support.lastUpdate')}</span>
 </div>
 </div>
 )}
 </div>
 )}
 </div>
 </div>
 </div>
 </div>
 );
};
