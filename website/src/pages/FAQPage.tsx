import React, { useState } from 'react';
import {
  Search,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Gavel,
  ShoppingBag,
  Wallet,
  User,
  ShieldCheck
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FAQPageProps {
  onNavigate: (page: string) => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', nameKey: 'faqPage.catAll', icon: HelpCircle },
    { id: 'auctions', nameKey: 'faqPage.catAuctions', icon: Gavel },
    { id: 'direct-sales', nameKey: 'faqPage.catDirectSales', icon: ShoppingBag },
    { id: 'payments', nameKey: 'faqPage.catPayments', icon: Wallet },
    { id: 'account', nameKey: 'faqPage.catAccount', icon: User },
  ];

  const faqs = [
    {
      category: 'auctions',
      questionKey: 'faqPage.q1',
      answerKey: 'faqPage.a1'
    },
    {
      category: 'auctions',
      questionKey: 'faqPage.q2',
      answerKey: 'faqPage.a2'
    },
    {
      category: 'direct-sales',
      questionKey: 'faqPage.q3',
      answerKey: 'faqPage.a3'
    },
    {
      category: 'payments',
      questionKey: 'faqPage.q4',
      answerKey: 'faqPage.a4'
    },
    {
      category: 'account',
      questionKey: 'faqPage.q5',
      answerKey: 'faqPage.a5'
    },
    {
      category: 'auctions',
      questionKey: 'faqPage.q6',
      answerKey: 'faqPage.a6'
    },
    {
      category: 'direct-sales',
      questionKey: 'faqPage.q7',
      answerKey: 'faqPage.a7'
    },
    {
      category: 'account',
      questionKey: 'faqPage.q8',
      answerKey: 'faqPage.a8'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const question = t(faq.questionKey);
    const answer = t(faq.answerKey);
    const matchesSearch = question.includes(searchQuery) || answer.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const toggleQuestion = (index: number) => {
    setOpenQuestionIndex(openQuestionIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-40">
      <div className="container mx-auto px-4 max-w-4xl">

        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-gray-900 mb-4">{t('faqPage.pageTitle')}</h1>
          <div className="relative max-w-lg mx-auto">
            <input
              type="text"
              placeholder={t('faqPage.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full ps-4 pe-12 py-3.5 rounded-2xl border-none shadow-md focus:ring-2 focus:ring-[#47CCD0] text-end"
            />
            <Search className="absolute end-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#47CCD0] text-white shadow-lg shadow-teal-500/20'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <cat.icon size={18} /> {t(cat.nameKey)}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full flex items-center justify-between p-5 text-end hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-gray-800 text-lg">{t(faq.questionKey)}</span>
                  {openQuestionIndex === index ? (
                    <ChevronUp className="text-[#47CCD0]" size={20} />
                  ) : (
                    <ChevronDown className="text-gray-400" size={20} />
                  )}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openQuestionIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-50 mt-2">
                    {t(faq.answerKey)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <HelpCircle size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 font-bold">{t('faqPage.noResults')}</p>
            </div>
          )}
        </div>

        <div className="mt-12 bg-[#47CCD0]/5 rounded-3xl p-8 text-center border border-[#47CCD0]/10">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{t('faqPage.notFoundTitle')}</h3>
          <p className="text-gray-600 mb-6">{t('faqPage.notFoundDesc')}</p>
          <button
            onClick={() => onNavigate('support')}
            className="px-8 py-3 bg-[#47CCD0] text-white rounded-xl font-bold shadow-lg shadow-teal-500/20 hover:bg-[#35a4a9] transition-all"
          >
            {t('faqPage.contactUs')}
          </button>
        </div>

      </div>
    </div>
  );
};
