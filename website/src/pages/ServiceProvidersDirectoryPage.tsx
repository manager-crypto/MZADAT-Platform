import React, { useState } from 'react';
import { Search, MapPin, Star, BadgeCheck, Briefcase, Filter, ChevronDown, ArrowRight, Phone, MessageCircle, Info, X, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RiyalSymbol } from '../components/ui/RiyalSymbol';

// Types — using English slugs for filter state comparisons
type Specialization = 'propertyManagement' | 'legalConsultancy' | 'appraisal' | 'architecturalDesign' | 'professionalPhotography';
type Region = 'all' | 'riyadh' | 'jeddah' | 'dammam' | 'makkah' | 'madinah' | 'khobar';

interface Provider {
  id: string;
  nameKey: string;
  avatar: string;
  verified: boolean;
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  region: Region;
  addressKey: string;
  specializations: Specialization[];
  descriptionKey: string;
  bioKey?: string;
  portfolioImages?: string[];
  portfolioLink?: string;
  professionalExperienceKeys?: string[];
  clientKeys?: string[];
}

// Mock Data — all Arabic text replaced with translation keys
const MOCK_PROVIDERS: Provider[] = [
  {
    id: '1',
    nameKey: 'serviceProviders.provider1Name',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    verified: true,
    rating: 4.8,
    reviewsCount: 124,
    experienceYears: 10,
    region: 'riyadh',
    addressKey: 'serviceProviders.provider1Address',
    specializations: ['propertyManagement', 'appraisal'],
    descriptionKey: 'serviceProviders.provider1Description',
    bioKey: 'serviceProviders.provider1Bio',
    professionalExperienceKeys: [
      'serviceProviders.provider1Exp1',
      'serviceProviders.provider1Exp2',
      'serviceProviders.provider1Exp3',
    ],
    clientKeys: [
      'serviceProviders.provider1Client1',
      'serviceProviders.provider1Client2',
      'serviceProviders.provider1Client3',
      'serviceProviders.provider1Client4',
    ],
    portfolioImages: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1460472178825-e5240623afd5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    ]
  },
  {
    id: '2',
    nameKey: 'serviceProviders.provider2Name',
    avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    verified: true,
    rating: 4.9,
    reviewsCount: 89,
    experienceYears: 15,
    region: 'jeddah',
    addressKey: 'serviceProviders.provider2Address',
    specializations: ['legalConsultancy'],
    descriptionKey: 'serviceProviders.provider2Description',
    bioKey: 'serviceProviders.provider2Bio',
    professionalExperienceKeys: [
      'serviceProviders.provider2Exp1',
      'serviceProviders.provider2Exp2',
      'serviceProviders.provider2Exp3',
    ],
    clientKeys: [
      'serviceProviders.provider2Client1',
      'serviceProviders.provider2Client2',
      'serviceProviders.provider2Client3',
    ],
    portfolioLink: 'https://example.com'
  },
  {
    id: '3',
    nameKey: 'serviceProviders.provider3Name',
    avatar: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    verified: false,
    rating: 4.6,
    reviewsCount: 45,
    experienceYears: 5,
    region: 'dammam',
    addressKey: 'serviceProviders.provider3Address',
    specializations: ['professionalPhotography'],
    descriptionKey: 'serviceProviders.provider3Description',
    bioKey: 'serviceProviders.provider3Bio',
    clientKeys: [
      'serviceProviders.provider3Client1',
      'serviceProviders.provider3Client2',
    ],
    portfolioImages: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1600607687931-cebf5871f008?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    ]
  },
  {
    id: '4',
    nameKey: 'serviceProviders.provider4Name',
    avatar: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    verified: true,
    rating: 4.7,
    reviewsCount: 210,
    experienceYears: 12,
    region: 'riyadh',
    addressKey: 'serviceProviders.provider4Address',
    specializations: ['architecturalDesign', 'propertyManagement'],
    descriptionKey: 'serviceProviders.provider4Description',
  },
  {
    id: '5',
    nameKey: 'serviceProviders.provider5Name',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    verified: true,
    rating: 5.0,
    reviewsCount: 340,
    experienceYears: 8,
    region: 'makkah',
    addressKey: 'serviceProviders.provider5Address',
    specializations: ['appraisal'],
    descriptionKey: 'serviceProviders.provider5Description',
  }
];

const SPECIALIZATIONS: Specialization[] = [
  'propertyManagement',
  'legalConsultancy',
  'appraisal',
  'architecturalDesign',
  'professionalPhotography'
];

const REGIONS: Region[] = ['all', 'riyadh', 'jeddah', 'dammam', 'makkah', 'madinah', 'khobar'];

interface ServiceProvidersDirectoryPageProps {
  onNavigate?: (page: string) => void;
}

export const ServiceProvidersDirectoryPage: React.FC<ServiceProvidersDirectoryPageProps> = ({ onNavigate }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<Region>('all');
  const [selectedSpecializations, setSelectedSpecializations] = useState<Specialization[]>([]);
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

  // Filter Logic — compare against translated strings for search, use English slugs for region/spec
  const filteredProviders = MOCK_PROVIDERS.filter(provider => {
    const providerName = t(provider.nameKey);
    const providerDescription = t(provider.descriptionKey);
    const matchesSearch = providerName.includes(searchQuery) || providerDescription.includes(searchQuery);
    const matchesRegion = selectedRegion === 'all' || provider.region === selectedRegion;
    const matchesSpecialization = selectedSpecializations.length === 0 ||
      selectedSpecializations.some(spec => provider.specializations.includes(spec));

    return matchesSearch && matchesRegion && matchesSpecialization;
  });

  const toggleSpecialization = (spec: Specialization) => {
    setSelectedSpecializations(prev =>
      prev.includes(spec) ? prev.filter(s => s !== spec) : [...prev, spec]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-['Noto_Kufi_Arabic']">
      <main className="flex-grow">
        {/* Page Title & Breadcrumbs */}
        <div className="bg-[#2B3D50] text-white pt-36 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors w-fit"
            >
              <ArrowRight size={20} />
              <span>{t('serviceProviders.back')}</span>
            </button>
            <h1 className="text-3xl font-bold mb-4">{t('serviceProviders.pageTitle')}</h1>
            <p className="text-gray-300 text-lg max-w-2xl">
              {t('serviceProviders.pageSubtitle')}
            </p>
          </div>
        </div>

        {/* Smart Filter Header - Sticky with Glassmorphism */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
          <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-2xl p-4 sm:p-6 border border-white/20">
            <div className="flex flex-col lg:flex-row gap-4 items-center">

              {/* Search Bar */}
              <div className="relative w-full lg:flex-1">
                <input
                  type="text"
                  placeholder={t('serviceProviders.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 ps-4 pe-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#47CCD0] focus:ring-1 focus:ring-[#47CCD0] transition-colors text-sm"
                />
                <Search className="absolute end-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>

              {/* Region Filter Dropdown */}
              <div className="relative w-full lg:w-48 shrink-0">
                <button
                  onClick={() => setIsRegionDropdownOpen(!isRegionDropdownOpen)}
                  className="w-full h-12 flex items-center justify-between px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium hover:border-[#47CCD0] transition-colors"
                >
                  <div className="flex items-center gap-2 text-[#2B3D50]">
                    <MapPin size={18} className="text-[#47CCD0]" />
                    <span>{t(`serviceProviders.region.${selectedRegion}`)}</span>
                  </div>
                  <ChevronDown size={16} className={`text-gray-400 transition-transform ${isRegionDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isRegionDropdownOpen && (
                  <div className="absolute top-full mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-xl z-50 py-2">
                    {REGIONS.map(region => (
                      <button
                        key={region}
                        onClick={() => {
                          setSelectedRegion(region);
                          setIsRegionDropdownOpen(false);
                        }}
                        className={`w-full text-end px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                          selectedRegion === region ? 'text-[#47CCD0] font-bold bg-[#47CCD0]/5' : 'text-gray-600'
                        }`}
                      >
                        {t(`serviceProviders.region.${region}`)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Specialization Chips */}
            <div className="mt-4 flex flex-wrap gap-2 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-500 ms-2">
                <Filter size={16} />
                <span>{t('serviceProviders.specializationsLabel')}</span>
              </div>
              {SPECIALIZATIONS.map(spec => {
                const isSelected = selectedSpecializations.includes(spec);
                return (
                  <button
                    key={spec}
                    onClick={() => toggleSpecialization(spec)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-[#47CCD0] text-white shadow-sm'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {t(`serviceProviders.spec.${spec}`)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Provider Cards Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {filteredProviders.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#2B3D50] mb-2">{t('serviceProviders.noResults')}</h3>
              <p className="text-gray-500">{t('serviceProviders.noResultsHint')}</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedRegion('all');
                  setSelectedSpecializations([]);
                }}
                className="mt-6 px-6 py-2 bg-[#47CCD0]/10 text-[#47CCD0] font-medium rounded-lg hover:bg-[#47CCD0]/20 transition-colors"
              >
                {t('serviceProviders.clearFilters')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProviders.map(provider => (
                <div key={provider.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col">

                  {/* Card Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={provider.avatar}
                      alt={t(provider.nameKey)}
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-50 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <h3 className="font-bold text-[#2B3D50] text-lg truncate" title={t(provider.nameKey)}>
                          {t(provider.nameKey)}
                        </h3>
                        {provider.verified && (
                          <BadgeCheck size={18} className="text-[#47CCD0] shrink-0" />
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          <span>{t(`serviceProviders.region.${provider.region}`)}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1.5 truncate" title={t(provider.addressKey)}>
                        {t(provider.addressKey)}
                      </p>
                    </div>
                  </div>

                  {/* Rating & Experience */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                      <Briefcase size={16} className="text-[#47CCD0]" />
                      <span>{t('serviceProviders.experience', { years: provider.experienceYears })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-amber-400 fill-amber-400" />
                      <span className="font-bold text-gray-700">{provider.rating}</span>
                      <span className="text-gray-500 text-sm">({provider.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-6 line-clamp-2 flex-grow">
                    {t(provider.descriptionKey)}
                  </p>

                  {/* Specialization Mini-tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {provider.specializations.map(spec => (
                      <span key={spec} className="px-2 py-1 bg-[#47CCD0]/10 text-[#2B3D50] text-xs font-medium rounded-md border border-[#47CCD0]/20">
                        {t(`serviceProviders.spec.${spec}`)}
                      </span>
                    ))}
                  </div>

                  {/* Profile/Bio Button */}
                  <button
                    onClick={() => setSelectedProvider(provider)}
                    className="w-full py-2 mb-4 bg-gray-50 text-gray-700 border border-gray-200 rounded-xl font-medium hover:bg-gray-100 hover:text-[#47CCD0] hover:border-[#47CCD0]/30 transition-all duration-300 flex justify-center items-center gap-2 text-sm"
                  >
                    <Info size={16} />
                    <span>{t('serviceProviders.viewProfile')}</span>
                  </button>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
                    <button className="flex-1 py-2.5 bg-[#47CCD0] text-white rounded-xl font-bold hover:bg-[#3ba8ab] transition-all duration-300 flex justify-center items-center gap-2 text-sm group">
                      <Phone size={18} className="transition-transform group-hover:scale-110" />
                      <span>{t('serviceProviders.call')}</span>
                    </button>
                    <button className="flex-1 py-2.5 bg-[#25D366] text-white rounded-xl font-bold hover:bg-[#20b858] transition-all duration-300 flex justify-center items-center gap-2 text-sm group">
                      <MessageCircle size={18} className="transition-transform group-hover:scale-110" />
                      <span>{t('serviceProviders.whatsapp')}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Provider Details Modal */}
      {selectedProvider && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProvider(null)}
              className="absolute top-4 start-4 p-2 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full transition-colors z-10"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex items-center gap-4 bg-gray-50/50">
              <img
                src={selectedProvider.avatar}
                alt={t(selectedProvider.nameKey)}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-sm"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-[#2B3D50]">{t(selectedProvider.nameKey)}</h2>
                  {selectedProvider.verified && (
                    <BadgeCheck size={20} className="text-[#47CCD0]" />
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><MapPin size={14}/> {t(`serviceProviders.region.${selectedProvider.region}`)}</span>
                  <span className="flex items-center gap-1"><Star size={14} className="text-amber-400 fill-amber-400"/> {selectedProvider.rating}</span>
                  <span className="flex items-center gap-1"><Briefcase size={14}/> {t('serviceProviders.experience', { years: selectedProvider.experienceYears })}</span>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto">
              {/* Bio Section */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-[#2B3D50] mb-3 border-b-2 border-[#47CCD0]/20 pb-2 inline-block">{t('serviceProviders.modalBio')}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {selectedProvider.bioKey ? t(selectedProvider.bioKey) : t(selectedProvider.descriptionKey)}
                </p>
              </div>

              {/* Specializations */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-[#2B3D50] mb-3 border-b-2 border-[#47CCD0]/20 pb-2 inline-block">{t('serviceProviders.modalSpecializations')}</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProvider.specializations.map(spec => (
                    <span key={spec} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg">
                      {t(`serviceProviders.spec.${spec}`)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Professional Experience */}
              {selectedProvider.professionalExperienceKeys && selectedProvider.professionalExperienceKeys.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-[#2B3D50] mb-3 border-b-2 border-[#47CCD0]/20 pb-2 inline-block">{t('serviceProviders.modalExperience')}</h3>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 pe-4">
                    {selectedProvider.professionalExperienceKeys.map((expKey, idx) => (
                      <li key={idx}>{t(expKey)}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Clients / Companies */}
              {selectedProvider.clientKeys && selectedProvider.clientKeys.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-[#2B3D50] mb-3 border-b-2 border-[#47CCD0]/20 pb-2 inline-block">{t('serviceProviders.modalClients')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProvider.clientKeys.map((clientKey, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm rounded-lg shadow-sm">
                        {t(clientKey)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Portfolio Section */}
              {(selectedProvider.portfolioImages || selectedProvider.portfolioLink) && (
                <div>
                  <h3 className="text-lg font-bold text-[#2B3D50] mb-4 border-b-2 border-[#47CCD0]/20 pb-2 inline-block">{t('serviceProviders.modalPortfolio')}</h3>

                  {selectedProvider.portfolioImages && selectedProvider.portfolioImages.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                      {selectedProvider.portfolioImages.map((img, idx) => (
                        <div key={idx} className="aspect-square rounded-xl overflow-hidden shadow-sm border border-gray-100 group">
                          <img
                            src={img}
                            alt={t('serviceProviders.portfolioImageAlt', { number: idx + 1 })}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedProvider.portfolioLink && (
                    <a
                      href={selectedProvider.portfolioLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[#2B3D50] hover:border-[#47CCD0] hover:text-[#47CCD0] transition-colors text-sm font-medium w-fit"
                    >
                      <ExternalLink size={16} />
                      <span>{t('serviceProviders.visitPortfolio')}</span>
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer (Actions) */}
            <div className="p-4 border-t border-gray-100 flex gap-3 bg-gray-50">
              <button className="flex-1 py-3 bg-[#47CCD0] text-white rounded-xl font-bold hover:bg-[#3ba8ab] transition-colors flex justify-center items-center gap-2">
                <Phone size={18} />
                <span>{t('serviceProviders.call')}</span>
              </button>
              <button className="flex-1 py-3 bg-[#25D366] text-white rounded-xl font-bold hover:bg-[#20b858] transition-colors flex justify-center items-center gap-2">
                <MessageCircle size={18} />
                <span>{t('serviceProviders.whatsapp')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
