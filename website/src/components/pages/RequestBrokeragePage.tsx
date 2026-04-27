import React, { useState } from 'react';
import { ArrowLeft, Send, Upload, Building2, MapPin, User, FileText, ChevronDown } from 'lucide-react';

import { PhoneInput } from '../../components/ui/PhoneInput';

interface RequestBrokeragePageProps {
  onNavigate?: (page: string) => void;
}

export const RequestBrokeragePage: React.FC<RequestBrokeragePageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    propertyType: '',
    serviceType: '',
    city: '',
    district: '',
    details: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to the backend
    alert('تم استلام طلبك بنجاح! سيتواصل معك أحد وسطائنا قريباً.');
    onNavigate?.('home');
  };

  return (
    <div className="pt-36 pb-20 min-h-screen bg-[#F8FAFC]">
      <div className="container mx-auto px-4 max-w-3xl">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
              onClick={() => onNavigate?.('brokerage-guide')}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#47CCD0] hover:border-[#47CCD0] transition-all shadow-sm"
          >
              <ArrowLeft size={22} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">طلب خدمة وساطة</h1>
            <p className="text-gray-500 mt-1">سجل بيانات عقارك وسيقوم خبراؤنا بالتواصل معك</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 animate-fade-up">
           
           {/* Personal Info */}
           <div className="mb-8">
             <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                <User size={18} className="text-[#47CCD0]" /> بيانات التواصل
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] outline-none transition-all"
                    placeholder="محمد عبدالله"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">رقم الجوال</label>
                  <PhoneInput 
                    required
                    value={formData.phone}
                    onChange={(e: any) => setFormData({...formData, phone: e.target.value})}
                    containerClassName="h-12 bg-white border border-gray-200 rounded-xl focus-within:border-[#47CCD0] focus-within:ring-1 focus-within:ring-[#47CCD0]"
                    className="h-full bg-transparent outline-none rounded-xl"
                  />
                </div>
             </div>
           </div>

           {/* Property Info */}
           <div className="mb-8">
             <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                <Building2 size={18} className="text-[#47CCD0]" /> بيانات العقار
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">نوع العقار</label>
                  <select 
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] outline-none transition-all bg-white"
                    value={formData.propertyType}
                    onChange={(e) => setFormData({...formData, propertyType: e.target.value})}
                  >
                    <option value="">اختر نوع العقار</option>
                    <option value="land">أرض</option>
                    <option value="villa">فيلا</option>
                    <option value="apartment">شقة</option>
                    <option value="building">عمارة</option>
                    <option value="farm">مزرعة</option>
                    <option value="warehouse">مستودع</option>
                    <option value="office">مكتب</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">نوع الخدمة</label>
                  <select 
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] outline-none transition-all bg-white"
                    value={formData.serviceType}
                    onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                  >
                    <option value="">اختر نوع الخدمة</option>
                    <option value="sell">بيع</option>
                    <option value="rent">إيجار</option>
                    <option value="manage">إدارة أملاك</option>
                  </select>
                </div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">المدينة</label>
                   <div className="relative">
                      <MapPin size={18} className="absolute end-4 top-3.5 text-gray-400" />
                      <input 
                        type="text" 
                        className="w-full pe-12 ps-4 py-3 rounded-xl border border-gray-200 focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] outline-none transition-all"
                        placeholder="الرياض"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                      />
                   </div>
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">الحي</label>
                   <input 
                        type="text" 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] outline-none transition-all"
                        placeholder="الملقا"
                        value={formData.district}
                        onChange={(e) => setFormData({...formData, district: e.target.value})}
                      />
                </div>
             </div>

             <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">تفاصيل إضافية</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] outline-none transition-all"
                  placeholder="مساحة العقار، عمر العقار، الواجهة، الخ..."
                  value={formData.details}
                  onChange={(e) => setFormData({...formData, details: e.target.value})}
                ></textarea>
             </div>
           </div>

           <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
              <p className="text-xs text-gray-400 max-w-xs">
                * بإرسال هذا الطلب أنت توافق على سياسة الخصوصية وشر��ط الاستخدام الخاصة بالمنصة.
              </p>
              <button 
                type="submit"
                className="px-8 py-3 bg-[#47CCD0] text-white rounded-xl font-bold hover:bg-[#3bb1b7] transition-all shadow-lg shadow-teal-500/20 flex items-center gap-2"
              >
                <Send size={18} />
                إرسال الطلب
              </button>
           </div>

        </form>

      </div>
    </div>
  );
};
