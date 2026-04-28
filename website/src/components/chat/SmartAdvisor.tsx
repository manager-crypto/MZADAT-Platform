import React, { useState, useRef, useEffect } from 'react';
import { 
 Bot, 
 X, 
 Send, 
 Loader2, 
 Sparkles, 
 MessageCircle, 
 User, 
 ChevronDown,
 Headset,
 MessageSquareText,
 Bell
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Message {
 id: string;
 role: 'user' | 'model';
 text: string;
 timestamp: Date;
 type?: 'text' | 'options' | 'listing';
 options?: string[];
}

interface SmartAdvisorProps {
 isOpen: boolean;
 onClose: () => void;
 onOpen: () => void;
 isLoggedIn?: boolean;
 onOpenLogin?: () => void;
 isEnglish?: boolean; // Kept for backwards compatibility
}

export const SmartAdvisor: React.FC<SmartAdvisorProps> = ({ isOpen, onClose, onOpen, isLoggedIn = false, onOpenLogin = () => {}, isEnglish = false }) => {
 const { t, i18n } = useTranslation();
 
 const [messages, setMessages] = useState<Message[]>([]);
 const [inputValue, setInputValue] = useState('');
 const [isTyping, setIsTyping] = useState(false);
 const messagesEndRef = useRef<HTMLDivElement>(null);

 const scrollToBottom = () => {
 messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
 };

 useEffect(() => {
 scrollToBottom();
 }, [messages, isOpen]);

 // Update initial message when language changes
 useEffect(() => {
 setMessages([
 { 
 id: '1', 
 role: 'model', 
 text: t('smartAdvisor.welcome'), 
 timestamp: new Date(),
 type: 'options',
 options: [
 t('smartAdvisor.searchProp'), 
 t('smartAdvisor.auctionInq'), 
 t('smartAdvisor.howToReg'), 
 t('smartAdvisor.contactSupport')
 ]
 }
 ]);
 }, [t, i18n.language]);

 const generateResponse = (userText: string) => {
 setIsTyping(true);
 
 // Simple rule-based logic for demo purposes
 let responseText = '';
 let responseOptions: string[] | undefined = undefined;

 const lowerText = userText.toLowerCase();

 if (lowerText.includes('بحث') || lowerText.includes('عقار') || lowerText.includes('search') || lowerText.includes('property')) {
 responseText = t('smartAdvisor.helpSearch');
 responseOptions = [
 t('smartAdvisor.resLand'), 
 t('smartAdvisor.villas'), 
 t('smartAdvisor.commProps'), 
 t('smartAdvisor.apts')
 ];
 } else if (lowerText.includes('مزاد') || lowerText.includes('auction')) {
 responseText = t('smartAdvisor.activeAuctions');
 responseOptions = [t('smartAdvisor.howToPart'), t('smartAdvisor.showAuctions')];
 } else if (lowerText.includes('تسجيل') || lowerText.includes('حساب') || lowerText.includes('register') || lowerText.includes('account')) {
 responseText = t('smartAdvisor.regEasy');
 } else if (lowerText.includes('دعم') || lowerText.includes('مسعدة') || lowerText.includes('support') || lowerText.includes('help')) {
 responseText = t('smartAdvisor.supportAvail');
 } else {
 responseText = t('smartAdvisor.defaultResp');
 responseOptions = [t('smartAdvisor.searchProp'), t('smartAdvisor.auctionInq'), t('smartAdvisor.help')];
 }

 setTimeout(() => {
 const newMessage: Message = {
 id: Date.now().toString(),
 role: 'model',
 text: responseText,
 timestamp: new Date(),
 type: responseOptions ? 'options' : 'text',
 options: responseOptions
 };
 setMessages(prev => [...prev, newMessage]);
 setIsTyping(false);
 }, 1500);
 };

 const handleSend = () => {
 if (!inputValue.trim()) return;

 if (!isLoggedIn) {
 onOpenLogin();
 return;
 }

 const userMsg: Message = {
 id: Date.now().toString(),
 role: 'user',
 text: inputValue,
 timestamp: new Date()
 };

 setMessages(prev => [...prev, userMsg]);
 setInputValue('');
 generateResponse(inputValue);
 };

 const handleOptionClick = (option: string) => {
 if (!isLoggedIn) {
 onOpenLogin();
 return;
 }

 const userMsg: Message = {
 id: Date.now().toString(),
 role: 'user',
 text: option,
 timestamp: new Date()
 };
 setMessages(prev => [...prev, userMsg]);
 generateResponse(option);
 };

 // Render minimized state (Button)
 if (!isOpen) {
 return (
 <>
 <style>
 {`
 @keyframes bell-ring {
 0%, 100% { transform: rotate(0deg); }
 10%, 30%, 50% { transform: rotate(15deg); }
 20%, 40% { transform: rotate(-15deg); }
 60% { transform: rotate(0deg); }
 }
 .animate-bell-ring {
 animation: bell-ring 2s ease-in-out infinite;
 transform-origin: top center;
 }
 `}
 </style>
 <div className="fixed bottom-[110px] start-4 md:bottom-6 md:start-6 z-[100] flex flex-col items-start gap-3 md:gap-4" dir="ltr">
 <a 
 href="https://wa.me/966500000000"
 target="_blank"
 rel="noopener noreferrer"
 className="group flex flex-row-reverse items-center gap-2 md:gap-3 px-3 py-2 md:px-5 md:py-3 rounded-full shadow-xl bg-[#B54B48] text-white hover:bg-[#a04240] transition-all duration-300 animate-fade-up hover:-translate-y-1 min-h-[40px] min-w-[40px]"
 >
 <span className="text-xs md:text-sm font-bold hidden md:block">
 {t('smartAdvisor.chatWithUs')}
 </span>
 <MessageSquareText size={18} className="md:w-6 md:h-6" />
 </a>

 <button 
 onClick={onOpen}
 className="group flex flex-row-reverse items-center gap-2 md:gap-4 px-3 py-2.5 md:px-5 md:py-4 rounded-full shadow-2xl bg-[#47CCD0] text-white hover:bg-[#2daeb4] transition-all duration-300 animate-fade-up min-h-[40px]"
 >
 {/* Vibrating Bell Notification inside the button */}
 <div className="relative flex items-center justify-center bg-white/20 p-1.5 md:p-2 rounded-full backdrop-blur-sm">
 <Bell size={16} className="md:w-5 md:h-5 animate-bell-ring" />
 <span className="absolute top-0 end-0 w-2 h-2 md:w-2.5 md:h-2.5 bg-red-500 border border-[#47CCD0] md:border-2 rounded-full z-10"></span>
 </div>
 
 <span className="text-xs md:text-sm font-bold hidden md:block">
 {t('smartAdvisor.askAdvisor')}
 </span>
 
 <Sparkles size={18} className="md:w-6 md:h-6 animate-pulse" />
 </button>
 </div>
 </>
 );
 }

 // Render open state (Chat Window)
 return (
 <div className="fixed bottom-6 start-6 z-[100] w-[350px] md:w-[380px] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-slide-in flex flex-col max-h-[600px] h-[500px]">
 {/* Header */}
 <div className="bg-[#47CCD0] p-4 flex justify-between items-center text-white">
 <div className="flex items-center gap-3">
 <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
 <Bot size={24} />
 </div>
 <div>
 <h4 className="font-bold">{t('smartAdvisor.advisorName')}</h4>
 <div className="flex items-center gap-1.5 opacity-90">
 <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse border border-white/50"></span>
 <span className="text-xs">{t('smartAdvisor.onlineNow')}</span>
 </div>
 </div>
 </div>
 <button 
 onClick={onClose} 
 className="hover:bg-white/20 p-2 rounded-full transition-colors"
 >
 <ChevronDown size={20} />
 </button>
 </div>

 {/* Messages Area */}
 <div className="flex-1 p-4 overflow-y-auto bg-gray-50/50 space-y-4 scroll-smooth">
 {messages.map((msg) => (
 <div 
 key={msg.id} 
 className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
 >
 {msg.role === 'model' && (
 <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-[#47CCD0] ms-2 flex-shrink-0 border border-teal-200">
 <Bot size={16} />
 </div>
 )}
 
 <div className={`max-w-[80%] space-y-2`}>
 <div className={`p-3.5 text-sm leading-relaxed shadow-sm ${
 msg.role === 'user' 
 ? 'bg-gray-900 text-white rounded-2xl rounded-ee-none' 
 : 'bg-white text-gray-700 border border-gray-100 rounded-2xl rounded-es-none'
 }`}>
 {msg.text}
 </div>
 
 {/* Options Chips */}
 {msg.type === 'options' && msg.options && (
 <div className="flex flex-wrap gap-2 justify-end">
 {msg.options.map((opt, idx) => (
 <button
 key={idx}
 onClick={() => handleOptionClick(opt)}
 className="text-xs bg-white border border-[#47CCD0] text-[#47CCD0] px-3 py-1.5 rounded-full hover:bg-[#47CCD0] hover:text-white transition-colors"
 >
 {opt}
 </button>
 ))}
 </div>
 )}
 
 <span className="text-[10px] text-gray-400 block px-1 opacity-70">
 {msg.timestamp.toLocaleTimeString(i18n.language === 'en' ? 'en-US' : 'ar-SA', { hour: '2-digit', minute: '2-digit' })}
 </span>
 </div>

 {msg.role === 'user' && (
 <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 me-2 flex-shrink-0">
 <User size={16} />
 </div>
 )}
 </div>
 ))}
 
 {isTyping && (
 <div className="flex justify-end">
 <div className="bg-white p-4 rounded-2xl rounded-es-none shadow-sm border border-gray-100 flex items-center gap-1">
 <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
 <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
 <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
 </div>
 </div>
 )}
 <div ref={messagesEndRef} />
 </div>

 {/* Input Area */}
 <div className="p-4 bg-white border-t border-gray-100">
 <div className="relative flex items-center gap-2">
 <input 
 type="text" 
 value={inputValue}
 onChange={(e) => setInputValue(e.target.value)}
 onKeyPress={(e) => e.key === 'Enter' && handleSend()}
 placeholder={t('smartAdvisor.placeholder')}
 className="flex-1 bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] transition-all"
 />
 <button 
 onClick={handleSend}
 disabled={!inputValue.trim()}
 className="w-12 h-12 bg-[#47CCD0] text-white rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#35a3a8] transition-colors flex-shrink-0"
 >
 <Send size={18} />
 </button>
 </div>
 <p className="text-[10px] text-gray-400 text-center mt-3 flex items-center justify-center gap-1">
 <Sparkles size={10} className="text-[#47CCD0]" />
 {t('smartAdvisor.poweredBy')}
 </p>
 </div>
 </div>
 );
};
