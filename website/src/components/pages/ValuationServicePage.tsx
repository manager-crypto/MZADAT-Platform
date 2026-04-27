import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FileText, CheckCircle2, ChevronRight, Phone, Mail, MapPin, BadgeCheck, FileBarChart } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface ValuationServicePageProps {
  onNavigate?: (path: string) => void;
}

export const ValuationServicePage: React.FC<ValuationServicePageProps> = ({ onNavigate }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBack = () => {
    if (onNavigate) {
      onNavigate('/');
    } else {
      navigate('/');
    }
  };

  const partnerCompanies = [
    {
      id: 1,
      name: t('valuationService.partner1Name'),
      description: t('valuationService.partner1Desc'),
      logo: "https://images.unsplash.com/photo-1762599180260-deb643596e99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBidWlsZGluZyUyMGxvZ298ZW58MXx8fHwxNzczNjA4Njc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      phone: "+966 11 123 4567",
      email: "info@advanced-dev.sa",
      address: t('valuationService.partner1Address'),
      certifications: [t('valuationService.partner1Cert1'), t('valuationService.partner1Cert2')]
    },
    {
      id: 2,
      name: t('valuationService.partner2Name'),
      description: t('valuationService.partner2Desc'),
      logo: "https://images.unsplash.com/photo-1760636803392-85a2a18e562d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBidXNpbmVzcyUyMGxvZ28lMjBleHRlcmlvcnxlbnwxfHx8fDE3NzM2MDg2ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      phone: "+966 12 987 6543",
      email: "contact@assets-group.sa",
      address: t('valuationService.partner2Address'),
      certifications: [t('valuationService.partner2Cert1'), t('valuationService.partner2Cert2')]
    },
    {
      id: 3,
      name: t('valuationService.partner3Name'),
      description: t('valuationService.partner3Desc'),
      logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1080&auto=format&fit=crop",
      phone: "+966 13 456 7890",
      email: "support@afaq-val.sa",
      address: t('valuationService.partner3Address'),
      certifications: [t('valuationService.partner3Cert1')]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <button onClick={handleBack} className="hover:text-[#47CCD0] transition-colors">{t('valuationService.breadcrumbHome')}</button>
          <span>/</span>
          <span className="text-gray-900 font-medium">{t('valuationService.breadcrumbServices')}</span>
          <span>/</span>
          <span className="text-gray-900 font-medium">{t('valuationService.breadcrumbTitle')}</span>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
              <div className="absolute top-0 end-0 w-64 h-64 bg-[#47CCD0]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

              <div className="w-16 h-16 bg-[#F8FAFB] rounded-2xl flex items-center justify-center mb-6 text-[#47CCD0]">
                <FileText size={32} />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2B3D50] mb-6 leading-tight">
                {t('valuationService.heroTitle')}
              </h1>
              <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                {t('valuationService.heroDesc')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => document.getElementById('partners-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-[#47CCD0] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#3bbabb] transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  {t('valuationService.heroBtn')}
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="h-64 sm:h-80 lg:h-auto relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1760802136542-0cefb143f1f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwdmFsdWF0aW9uJTIwYmx1ZXByaW50JTIwbW9kZWx8ZW58MXx8fHwxNzczNjA4NjY2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt={t('valuationService.heroAlt')}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mb-16 bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
           <div className="w-16 h-16 bg-[#47CCD0]/10 rounded-2xl flex items-center justify-center shrink-0">
             <FileBarChart size={32} className="text-[#47CCD0]" />
           </div>
           <div>
             <h2 className="text-2xl font-bold text-[#2B3D50] mb-3">{t('valuationService.infoTitle')}</h2>
             <p className="text-gray-600 leading-relaxed max-w-4xl">
               {t('valuationService.infoDesc')}
             </p>
           </div>
        </div>

        {/* Partners Section */}
        <div id="partners-section" className="mb-12">
          <div className="flex flex-col items-center mb-10 text-center">
            <h2 className="text-3xl font-bold text-[#2B3D50] mb-4">{t('valuationService.partnersTitle')}</h2>
            <p className="text-gray-500 max-w-2xl">
              {t('valuationService.partnersSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partnerCompanies.map((company) => (
              <div key={company.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                <div className="h-40 overflow-hidden relative">
                  <ImageWithFallback
                    src={company.logo}
                    alt={company.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <h3 className="absolute bottom-4 end-4 text-white font-bold text-xl">{company.name}</h3>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-sm text-gray-600 mb-6 flex-1 leading-relaxed">
                    {company.description}
                  </p>

                  <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <Phone size={16} className="text-[#47CCD0]" />
                      <span dir="ltr" className="text-end">{company.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <Mail size={16} className="text-[#47CCD0]" />
                      <span>{company.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <MapPin size={16} className="text-[#47CCD0] shrink-0" />
                      <span>{company.address}</span>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <h4 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">{t('valuationService.certificationsLabel')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {company.certifications.map((cert, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 bg-[#47CCD0]/10 text-[#47CCD0] text-xs px-3 py-1.5 rounded-full font-medium">
                          <BadgeCheck size={14} />
                          {cert}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
