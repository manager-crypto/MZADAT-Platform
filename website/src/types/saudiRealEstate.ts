export interface SaudiPropertyCompliance {
  titleDeedNumber?: string; // رقم الصك
  titleDeedDate?: string; // تاريخ الصك
  ejarIntegration?: { // ربط نظام إيجار
    isLinked: boolean;
    contractNumber?: string;
  };
  buildingPermit?: { // رخصة بناء
    permitNumber: string;
    issueDate: string;
    status: 'active' | 'expired';
  };
  wafiLicense?: { // نظام وافي (للبيع على الخارطة)
    licenseNumber: string;
    projectStatus: string;
    escrowAccountNumber?: string;
  };
  landSurvey?: { // الرفع المساحي
    surveyNumber: string;
    surveyDate: string;
    documentUrl?: string; // رابط الوثيقة المساحية
  };
  brokerageLicense?: string; // ترخيص فال للوساطة
  falLicenseNumber?: string; // رقم ترخيص فال
  adLicenseNumber?: string; // رقم الترخيص الإعلاني (الهيئة العامة للعقار)
}

export interface DetailedSaudiProperty {
  id: string | number;
  title: string;
  price: number;
  address: string;
  type: string;
  isOffPlan?: boolean; // هل هو بيع على الخارطة؟
  complianceData?: SaudiPropertyCompliance;
  // Other potential fields
}
