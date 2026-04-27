import React from 'react';
import { FileText, ShieldCheck, MapIcon, Building2, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { SaudiPropertyCompliance } from '../../types/saudiRealEstate';
import { BidiText } from '../common/BidiText';

interface SaudiRealEstateComplianceBadgeProps {
  data: SaudiPropertyCompliance;
  isOffPlan?: boolean;
}

export const SaudiRealEstateComplianceBadge: React.FC<SaudiRealEstateComplianceBadgeProps> = ({ data, isOffPlan }) => {
  if (!data) return null;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 overflow-hidden mt-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <ShieldCheck size={24} className="text-[#47CCD0]" />
        بيانات الاعتماد العقاري (الهيئة العامة للعقار)
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title Deed */}
        {data.titleDeedNumber && (
          <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-gray-100 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#47CCD0]/10 flex items-center justify-center flex-shrink-0">
              <FileText size={20} className="text-[#47CCD0]" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">رقم الصك</p>
              <div className="flex items-center gap-2">
                <BidiText text={data.titleDeedNumber} className="font-bold text-gray-900 font-mono" />
                <CheckCircle2 size={14} className="text-green-500" />
              </div>
              {data.titleDeedDate && (
                <p className="text-xs text-gray-400 mt-1">تاريخ الإصدار: {data.titleDeedDate}</p>
              )}
            </div>
          </div>
        )}

        {/* Ad License */}
        {data.adLicenseNumber && (
          <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-gray-100 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#47CCD0]/10 flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={20} className="text-[#47CCD0]" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">رقم الترخيص الإعلاني</p>
              <div className="flex items-center gap-2">
                <BidiText text={data.adLicenseNumber} className="font-bold text-gray-900 font-mono" />
                <CheckCircle2 size={14} className="text-green-500" />
              </div>
            </div>
          </div>
        )}

        {/* Fal License */}
        {data.falLicenseNumber && (
          <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-gray-100 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#47CCD0]/10 flex items-center justify-center flex-shrink-0">
              <Building2 size={20} className="text-[#47CCD0]" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">رقم رخصة فال (للوساطة)</p>
              <div className="flex items-center gap-2">
                <BidiText text={data.falLicenseNumber} className="font-bold text-gray-900 font-mono" />
                <CheckCircle2 size={14} className="text-green-500" />
              </div>
            </div>
          </div>
        )}

        {/* Ejar Integration (Rentals) */}
        {data.ejarIntegration?.isLinked && (
          <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-gray-100 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              <FileText size={20} className="text-blue-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">شبكة إيجار</p>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900">موثق في إيجار</span>
                <CheckCircle2 size={14} className="text-blue-500" />
              </div>
              {data.ejarIntegration.contractNumber && (
                <p className="text-xs text-gray-400 mt-1">رقم العقد: <BidiText text={data.ejarIntegration.contractNumber} dir="ltr" /></p>
              )}
            </div>
          </div>
        )}

        {/* Building Permit */}
        {data.buildingPermit && (
          <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-gray-100 flex items-start gap-4">
            <div className={`w-10 h-10 rounded-full ${data.buildingPermit.status === 'active' ? 'bg-green-50' : 'bg-red-50'} flex items-center justify-center flex-shrink-0`}>
              <FileText size={20} className={data.buildingPermit.status === 'active' ? 'text-green-600' : 'text-red-500'} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">رخصة البناء</p>
              <div className="flex items-center gap-2">
                <BidiText text={data.buildingPermit.permitNumber} className="font-bold text-gray-900 font-mono" />
                {data.buildingPermit.status === 'active' ? (
                  <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">سارية</span>
                ) : (
                  <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <AlertCircle size={10} /> منتهية
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-1">تاريخ الإصدار: {data.buildingPermit.issueDate}</p>
            </div>
          </div>
        )}

        {/* Wafi License (Off-plan) */}
        {isOffPlan && data.wafiLicense && (
          <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-[#47CCD0]/30 flex items-start gap-4 col-span-1 md:col-span-2">
            <div className="w-10 h-10 rounded-full bg-[#47CCD0]/10 flex items-center justify-center flex-shrink-0">
              <Building2 size={20} className="text-[#47CCD0]" />
            </div>
            <div className="w-full">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1">رخصة وافي (البيع على الخارطة)</p>
                  <div className="flex items-center gap-2">
                    <BidiText text={data.wafiLicense.licenseNumber} className="font-bold text-gray-900 font-mono" />
                    <CheckCircle2 size={14} className="text-[#47CCD0]" />
                  </div>
                </div>
                <span className="bg-[#47CCD0]/10 text-[#47CCD0] text-xs px-3 py-1 rounded-full font-bold">
                  {data.wafiLicense.projectStatus}
                </span>
              </div>
              {data.wafiLicense.escrowAccountNumber && (
                <div className="mt-3 p-3 bg-white rounded-xl border border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500">حساب الضمان (الإسكرو):</span>
                  <BidiText text={data.wafiLicense.escrowAccountNumber} className="font-mono text-sm font-bold text-gray-700" />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Land Survey */}
        {data.landSurvey && (
          <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-gray-100 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#47CCD0]/10 flex items-center justify-center flex-shrink-0">
              <MapIcon size={20} className="text-[#47CCD0]" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">الرفع المساحي</p>
              <div className="flex items-center gap-2">
                <BidiText text={data.landSurvey.surveyNumber} className="font-bold text-gray-900 font-mono" />
              </div>
              <p className="text-xs text-gray-400 mt-1">التاريخ: {data.landSurvey.surveyDate}</p>
              {data.landSurvey.documentUrl && (
                <a href={data.landSurvey.documentUrl} target="_blank" rel="noreferrer" className="text-[#47CCD0] text-xs font-bold mt-2 inline-block hover:underline">
                  عرض الوثيقة المساحية
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 bg-blue-50/50 border border-blue-100 rounded-xl p-3 flex items-start gap-3">
        <Info size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-blue-700 leading-relaxed">
          جميع البيانات الواردة في هذا القسم موثقة ومرتبطة بمركز المعلومات الوطني والهيئة العامة للعقار لضمان الشفافية والموثوقية في منصة مزادات.
        </p>
      </div>
    </div>
  );
};