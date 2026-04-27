import React, { useState } from 'react';
import { Building2, Car, Ticket, Shapes, ArrowRight } from 'lucide-react';
import personImage from 'figma:asset/12e4927068bfa4d6d7d02d08e05baa6297fe91f3.png';

interface SelectAdCategoryPageProps {
  onNavigate?: (page: string) => void;
}

export const SelectAdCategoryPage: React.FC<SelectAdCategoryPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const categories = [
    {
      id: 'real-estate',
      title: 'العقارات',
      description: 'أضف إعلان لبيع أو تأجير عقارك',
      icon: <Building2 size={24} />,
      path: 'add-real-estate',
    },
    {
      id: 'cars',
      title: 'السيارات',
      description: 'أضف إعلان لبيع أو تنازل عن سيارتك',
      icon: <Car size={24} />,
      path: 'add-car',
    },
    {
      id: 'plates',
      title: 'لوحات السيارات',
      description: 'أضف إعلان لبيع لوحة سيارة مميزة',
      icon: <Ticket size={24} />,
      path: 'add-plate',
    },
    {
      id: 'others',
      title: 'أخرى',
      description: 'أضف إعلانات لفئات أخرى',
      icon: <Shapes size={24} />,
      path: 'add-other',
    },
  ];

  return (
    <div className="pt-40 pb-10 md:pt-48 md:pb-20 min-h-screen bg-[#F8FAFC]">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4 md:mb-8">
           <div className="flex items-center gap-4">
            <button 
                onClick={() => onNavigate?.('home')}
                className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#47CCD0] hover:border-[#47CCD0] transition-all shadow-sm"
            >
                <ArrowRight size={22} />
            </button>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 font-['Noto_Kufi_Arabic']">إضافة إعلان جديد</h1>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10 animate-fade-up min-h-[400px] flex flex-col">
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 font-['Noto_Kufi_Arabic']">ماذا تريد أن تعلن عنه؟</h2>
              <p className="text-gray-500 font-['Noto_Kufi_Arabic']">اختر الفئة المناسبة لإعلانك للبدء في خطوات النشر</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left side - Image Section with Animation */}
              <div className="hidden md:block relative">
                <div className="relative bg-white rounded-3xl p-6">
                  <img 
                    src={personImage} 
                    alt="اختر الفئة" 
                    className="w-full h-auto relative z-10 drop-shadow-xl"
                  />
                  
                  {/* Floating Icons with Animation */}
                  <div className="absolute top-12 start-8 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-float">
                    <Building2 size={28} className="text-[#47CCD0]" />
                  </div>
                  
                  <div className="absolute top-24 end-8 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-float-delay-1">
                    <Car size={28} className="text-[#47CCD0]" />
                  </div>
                  
                  <div className="absolute bottom-32 start-12 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-float-delay-2">
                    <Ticket size={28} className="text-[#47CCD0]" />
                  </div>
                  
                  <div className="absolute bottom-24 end-12 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-float-delay-3">
                    <Shapes size={28} className="text-[#47CCD0]" />
                  </div>
                </div>
              </div>

              {/* Right side - Options */}
              <div className="space-y-4">
                 <div className="grid grid-cols-1 gap-4">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setTimeout(() => {
                            onNavigate?.(category.path);
                          }, 300);
                        }}
                        className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-end group ${
                          selectedCategory === category.id
                            ? 'border-[#47CCD0] bg-teal-50/50 ring-2 ring-[#47CCD0]/20'
                            : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className={`w-14 h-14 flex-shrink-0 rounded-full flex items-center justify-center transition-colors ${
                          selectedCategory === category.id ? 'bg-[#47CCD0] text-white' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {category.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-bold transition-colors font-['Noto_Kufi_Arabic'] ${
                             selectedCategory === category.id ? 'text-[#47CCD0]' : 'text-gray-900 group-hover:text-[#47CCD0]'
                          }`}>
                            {category.title}
                          </h4>
                          <p className="text-sm text-gray-400 font-['Noto_Kufi_Arabic'] mt-1">{category.description}</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedCategory === category.id ? 'border-[#47CCD0]' : 'border-gray-300'
                        }`}>
                            {selectedCategory === category.id && <div className="w-3 h-3 bg-[#47CCD0] rounded-full" />}
                        </div>
                      </button>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
