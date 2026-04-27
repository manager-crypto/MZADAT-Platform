import React, { useState } from 'react';
import { Flag, Upload, Send, CheckCircle, Hash, Calendar, Building, User, Info, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { BackButton } from '../ui/BackButton';
import { useTranslation } from 'react-i18next';

import { PhoneInput } from '../../components/ui/PhoneInput';

interface ReportComplaintPageProps {
  property?: any;
  onBack: () => void;
}

export const ReportComplaintPage = ({ property, onBack }: ReportComplaintPageProps) => {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    complaintType: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 animate-fade-up pt-36">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full text-center border border-gray-100">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('reportComplaint.successTitle')}</h2>
          <p className="text-gray-500 mb-8">
            {t('reportComplaint.successMsg')}
          </p>
          <BackButton
            onClick={onBack}
            label={t('reportComplaint.backToListing')}
            className="w-full justify-center bg-[#47CCD0] hover:bg-[#35a4a9] !text-white rounded-xl py-6 text-lg"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 pt-36">
      <div className="max-w-3xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-10 animate-fade-up">
          <div className="inline-flex items-center justify-center p-3 bg-red-50 rounded-2xl mb-4">
            <Flag size={32} className="text-red-600" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">{t('reportComplaint.pageTitle')}</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t('reportComplaint.pageSubtitle')}
          </p>
        </div>

        {/* Property Info Card */}
        {property && (
          <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100">{t('reportComplaint.adDetails')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                     <Hash size={20} />
                   </div>
                   <div>
                     <p className="text-xs text-gray-500 mb-1">{t('reportComplaint.adNumber')}</p>
                     <p className="font-mono font-bold text-gray-900 text-lg">7658291</p>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                     <Calendar size={20} />
                   </div>
                   <div>
                     <p className="text-xs text-gray-500 mb-1">{t('reportComplaint.adDate')}</p>
                     <p className="font-bold text-gray-900">{property.time || '2023/12/14'}</p>
                   </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                     <Building size={20} />
                   </div>
                   <div>
                     <p className="text-xs text-gray-500 mb-1">{t('reportComplaint.advertiser')}</p>
                     <p className="font-bold text-gray-900">{property.agent?.name || t('reportComplaint.notAvailable')}</p>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                     <User size={20} />
                   </div>
                   <div>
                     <p className="text-xs text-gray-500 mb-1">{t('reportComplaint.advertiserStatus')}</p>
                     <p className="font-bold text-gray-900 flex items-center gap-1">
                       {property.agent?.verified ? t('reportComplaint.verified') : t('reportComplaint.member')}
                       {property.agent?.verified && <CheckCircle size={14} className="text-[#47CCD0]" />}
                     </p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="h-2 bg-red-500 w-full"></div>
          <form onSubmit={handleSubmit} className="p-8 lg:p-10 space-y-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base">{t('reportComplaint.name')}</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder={t('reportComplaint.namePlaceholder')}
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-50 border-gray-200 h-12 rounded-xl focus:border-[#47CCD0] focus:ring-[#47CCD0]/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base">{t('reportComplaint.phone')}</Label>
                <PhoneInput
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  containerClassName="h-12 bg-gray-50 border border-gray-200 rounded-xl focus-within:border-[#47CCD0] focus-within:ring-1 focus-within:ring-[#47CCD0]/20"
                  className="h-full bg-transparent outline-none rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="complaintType" className="text-base">{t('reportComplaint.complaintType')}</Label>
              <select
                id="complaintType"
                name="complaintType"
                className="w-full bg-gray-50 border border-gray-200 h-12 rounded-xl focus:outline-none focus:border-[#47CCD0] focus:ring-4 focus:ring-[#47CCD0]/20 px-3 text-sm"
                required
                value={formData.complaintType}
                onChange={handleChange}
              >
                <option value="">{t('reportComplaint.selectType')}</option>
                <option value="fraud">{t('reportComplaint.typeFraud')}</option>
                <option value="misleading">{t('reportComplaint.typeMisleading')}</option>
                <option value="price">{t('reportComplaint.typePrice')}</option>
                <option value="duplicate">{t('reportComplaint.typeDuplicate')}</option>
                <option value="inappropriate">{t('reportComplaint.typeInappropriate')}</option>
                <option value="rights">{t('reportComplaint.typeRights')}</option>
                <option value="other">{t('reportComplaint.typeOther')}</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-base">{t('reportComplaint.description')}</Label>
              <Textarea
                id="description"
                name="description"
                placeholder={t('reportComplaint.descriptionPlaceholder')}
                required
                className="bg-gray-50 border-gray-200 min-h-[120px] rounded-xl focus:border-[#47CCD0] focus:ring-[#47CCD0]/20 resize-y"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-base">{t('reportComplaint.attachEvidence')}</Label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 hover:border-[#47CCD0] transition-all cursor-pointer group">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-[#47CCD0]/10 group-hover:text-[#47CCD0] transition-colors text-gray-400">
                  <Upload size={24} />
                </div>
                <p className="text-sm font-medium text-gray-900">{t('reportComplaint.attachClick')}</p>
                <p className="text-xs text-gray-500 mt-1">{t('reportComplaint.attachLimit')}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-500 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <Info size={18} className="text-gray-400" />
              <p className="text-sm">{t('reportComplaint.infoNote')}</p>
            </div>

            <div className="pt-4 flex gap-4">
              <Button
                type="button"
                onClick={onBack}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 h-14 rounded-xl text-lg font-bold"
              >
                {t('reportComplaint.cancel')}
              </Button>
              <Button
                type="submit"
                className="flex-[2] bg-red-600 hover:bg-red-700 text-white h-14 rounded-xl text-lg font-bold shadow-lg shadow-red-600/20 flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? <span className="animate-spin">⌛</span> : <Send size={20} />}
                {isLoading ? t('reportComplaint.sending') : t('reportComplaint.submit')}
              </Button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};
