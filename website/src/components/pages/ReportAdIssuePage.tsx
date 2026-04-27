import React, { useState } from 'react';
import { AlertTriangle, Upload, Send, CheckCircle, Info, Hash, Calendar, Building, User, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { BackButton } from '../ui/BackButton';
import { useTranslation } from 'react-i18next';

import { PhoneInput } from '../../components/ui/PhoneInput';

interface ReportAdIssuePageProps {
  property?: any;
  onBack: () => void;
}

export const ReportAdIssuePage = ({ property, onBack }: ReportAdIssuePageProps) => {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    issueType: '',
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('reportAdIssue.successTitle')}</h2>
          <p className="text-gray-500 mb-8">
            {t('reportAdIssue.successMsg')}
          </p>
          <BackButton
            onClick={onBack}
            label={t('reportAdIssue.backToListing')}
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
          <div className="inline-flex items-center justify-center p-3 bg-orange-50 rounded-2xl mb-4">
            <AlertTriangle size={32} className="text-orange-500" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">{t('reportAdIssue.pageTitle')}</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t('reportAdIssue.pageSubtitle')}
          </p>
        </div>

        {/* Property Info Card */}
        {property && (
          <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100">{t('reportAdIssue.adDetails')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                     <Hash size={20} />
                   </div>
                   <div>
                     <p className="text-xs text-gray-500 mb-1">{t('reportAdIssue.adNumber')}</p>
                     <p className="font-mono font-bold text-gray-900 text-lg">7658291</p> {/* Using static ID as in mock data or property.id if available */}
                   </div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                     <Calendar size={20} />
                   </div>
                   <div>
                     <p className="text-xs text-gray-500 mb-1">{t('reportAdIssue.adDate')}</p>
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
                     <p className="text-xs text-gray-500 mb-1">{t('reportAdIssue.advertiser')}</p>
                     <p className="font-bold text-gray-900">{property.agent?.name || t('reportAdIssue.notAvailable')}</p>
                   </div>
                </div>
                {/* Additional advertiser info if needed */}
                <div className="flex items-center gap-3">
                   <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                     <User size={20} />
                   </div>
                   <div>
                     <p className="text-xs text-gray-500 mb-1">{t('reportAdIssue.advertiserStatus')}</p>
                     <p className="font-bold text-gray-900 flex items-center gap-1">
                       {property.agent?.verified ? t('reportAdIssue.verified') : t('reportAdIssue.member')}
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
          <div className="h-2 bg-orange-500 w-full"></div>
          <form onSubmit={handleSubmit} className="p-8 lg:p-10 space-y-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base">{t('reportAdIssue.name')}</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder={t('reportAdIssue.namePlaceholder')}
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-50 border-gray-200 h-12 rounded-xl focus:border-[#47CCD0] focus:ring-[#47CCD0]/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base">{t('reportAdIssue.phone')}</Label>
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
              <Label htmlFor="issueType" className="text-base">{t('reportAdIssue.issueType')}</Label>
              <select
                id="issueType"
                name="issueType"
                className="w-full bg-gray-50 border border-gray-200 h-12 rounded-xl focus:outline-none focus:border-[#47CCD0] focus:ring-4 focus:ring-[#47CCD0]/20 px-3 text-sm"
                required
                value={formData.issueType}
                onChange={handleChange}
              >
                <option value="">{t('reportAdIssue.selectType')}</option>
                <option value="images">{t('reportAdIssue.typeImages')}</option>
                <option value="location">{t('reportAdIssue.typeLocation')}</option>
                <option value="info">{t('reportAdIssue.typeInfo')}</option>
                <option value="contact">{t('reportAdIssue.typeContact')}</option>
                <option value="tech">{t('reportAdIssue.typeTech')}</option>
                <option value="other">{t('reportAdIssue.typeOther')}</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-base">{t('reportAdIssue.description')}</Label>
              <Textarea
                id="description"
                name="description"
                placeholder={t('reportAdIssue.descriptionPlaceholder')}
                required
                className="bg-gray-50 border-gray-200 min-h-[120px] rounded-xl focus:border-[#47CCD0] focus:ring-[#47CCD0]/20 resize-y"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-base">{t('reportAdIssue.attachments')}</Label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 hover:border-[#47CCD0] transition-all cursor-pointer group">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-[#47CCD0]/10 group-hover:text-[#47CCD0] transition-colors text-gray-400">
                  <Upload size={24} />
                </div>
                <p className="text-sm font-medium text-gray-900">{t('reportAdIssue.attachClick')}</p>
                <p className="text-xs text-gray-500 mt-1">{t('reportAdIssue.attachLimit')}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-500 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <Info size={18} className="text-gray-400" />
              <p className="text-sm">{t('reportAdIssue.infoNote')}</p>
            </div>

            <div className="pt-4 flex gap-4">
              <Button
                type="button"
                onClick={onBack}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 h-14 rounded-xl text-lg font-bold"
              >
                {t('reportAdIssue.cancel')}
              </Button>
              <Button
                type="submit"
                className="flex-[2] bg-orange-500 hover:bg-orange-600 text-white h-14 rounded-xl text-lg font-bold shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? <span className="animate-spin">⌛</span> : <Send size={20} />}
                {isLoading ? t('reportAdIssue.sending') : t('reportAdIssue.submit')}
              </Button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};
