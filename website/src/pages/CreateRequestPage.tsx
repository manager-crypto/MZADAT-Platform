import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
 ArrowRight,
 CheckCircle2,
 Package,
 Home,
 Car,
 LayoutGrid,
 User,
 Phone,
 MessageSquare,
 DollarSign,
 Tag,
 Key,
 Calendar,
 Building2,
 MapPin,
 Map as MapIcon,
 ChevronDown
} from 'lucide-react';
import { BackButton } from '../components/ui/BackButton';

import { PhoneInput } from '../components/ui/PhoneInput';

interface CreateRequestPageProps {
 onNavigate: (page: string) => void;
}

export const CreateRequestPage: React.FC<CreateRequestPageProps> = ({ onNavigate }) => {
 const { t } = useTranslation();

 const [activeCategory, setActiveCategory] = useState('real-estate');
 const [realEstateType, setRealEstateType] = useState('residential-sale');
 const [activePropertyType, setActivePropertyType] = useState<string>('');
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [showSuccess, setShowSuccess] = useState(false);

 // States for location
 const [city, setCity] = useState('');
 const [district, setDistrict] = useState('');

 // States for Car Filters
 const [carBrand, setCarBrand] = useState('');
 const [carModel, setCarModel] = useState('');
 const [carYearFrom, setCarYearFrom] = useState('');
 const [carYearTo, setCarYearTo] = useState('');
 const [carOfferType, setCarOfferType] = useState('direct'); // direct, transfer
 const [carCondition, setCarCondition] = useState('used'); // new, used
 const [carGear, setCarGear] = useState('');
 const [carFuel, setCarFuel] = useState('');
 const [carRegionalSpec, setCarRegionalSpec] = useState('');

 // States for Plate Filters
 const [plateType, setPlateType] = useState('private');
 const [plateLetterCount, setPlateLetterCount] = useState<string>('');
 const [plateNumberCount, setPlateNumberCount] = useState<string>('');
 const [plateLetters, setPlateLetters] = useState('');
 const [plateNumbers, setPlateNumbers] = useState('');

 // States for Other Category
 const [otherItemName, setOtherItemName] = useState('');
 const [otherItemCondition, setOtherItemCondition] = useState('new'); // new, used

 // States for Real Estate Specific Filters
 const [propertyAge, setPropertyAge] = useState('');
 const [propertyDirection, setPropertyDirection] = useState('');
 const [streetWidth, setStreetWidth] = useState('');
 const [roomsCount, setRoomsCount] = useState('');
 const [floorNumber, setFloorNumber] = useState('');

 const categories = [
 { id: 'real-estate', label: t('createRequest.categoryRealEstate'), icon: Home },
 { id: 'car', label: t('createRequest.categoryCar'), icon: Car },
 { id: 'plate', label: t('createRequest.categoryPlate'), icon: LayoutGrid },
 { id: 'other', label: t('createRequest.categoryOther'), icon: Package },
 ];

 const cities = [
 { id: 'riyadh', name: t('createRequest.cityRiyadh') },
 { id: 'jeddah', name: t('createRequest.cityJeddah') },
 { id: 'makkah', name: t('createRequest.cityMakkah') },
 { id: 'madinah', name: t('createRequest.cityMadinah') },
 { id: 'dammam', name: t('createRequest.cityDammam') },
 { id: 'khobar', name: t('createRequest.cityKhobar') },
 ];

 const realEstateOptions = [
 // Residential
 {
 id: 'residential-sale',
 label: t('createRequest.residentialSaleLabel'),
 type: 'residential',
 action: 'sale',
 icon: Tag,
 description: t('createRequest.saleDescription'),
 propertyTypes: [
 { id: 'villa', label: t('createRequest.ptVilla') },
 { id: 'apartment', label: t('createRequest.ptApartment') },
 { id: 'land', label: t('createRequest.ptLand') },
 { id: 'building', label: t('createRequest.ptBuilding') },
 { id: 'duplex', label: t('createRequest.ptDuplex') },
 { id: 'floor', label: t('createRequest.ptFloor') },
 { id: 'chalet', label: t('createRequest.ptChalet') },
 { id: 'warehouse', label: t('createRequest.ptWarehouse') }
 ]
 },
 {
 id: 'residential-rent',
 label: t('createRequest.residentialRentLabel'),
 type: 'residential',
 action: 'rent',
 icon: Key,
 description: t('createRequest.rentDescription'),
 propertyTypes: [
 { id: 'apartment', label: t('createRequest.ptApartment') },
 { id: 'floor', label: t('createRequest.ptFloor') },
 { id: 'villa', label: t('createRequest.ptVilla') },
 { id: 'studio', label: t('createRequest.ptStudio') },
 { id: 'chalet', label: t('createRequest.ptChalet') },
 { id: 'warehouse', label: t('createRequest.ptWarehouse') }
 ]
 },
 {
 id: 'residential-daily',
 label: t('createRequest.residentialDailyLabel'),
 type: 'residential',
 action: 'daily',
 icon: Calendar,
 description: t('createRequest.dailyDescription'),
 propertyTypes: [
 { id: 'chalet', label: t('createRequest.ptChalet') },
 { id: 'rest-house', label: t('createRequest.ptRestHouse') },
 { id: 'camp', label: t('createRequest.ptCamp') },
 { id: 'farm', label: t('createRequest.ptFarm') },
 { id: 'resort', label: t('createRequest.ptResort') }
 ]
 },
 // Commercial
 {
 id: 'commercial-sale',
 label: t('createRequest.commercialSaleLabel'),
 type: 'commercial',
 action: 'sale',
 icon: Tag,
 description: t('createRequest.saleDescription'),
 propertyTypes: [
 { id: 'office', label: t('createRequest.ptOffice') },
 { id: 'shop', label: t('createRequest.ptShop') },
 { id: 'warehouse', label: t('createRequest.ptWarehouse') },
 { id: 'chalet', label: t('createRequest.ptChalet') },
 { id: 'land-commercial', label: t('createRequest.ptLandCommercial') },
 { id: 'building-commercial', label: t('createRequest.ptBuildingCommercial') }
 ]
 },
 {
 id: 'commercial-rent',
 label: t('createRequest.commercialRentLabel'),
 type: 'commercial',
 action: 'rent',
 icon: Key,
 description: t('createRequest.rentDescription'),
 propertyTypes: [
 { id: 'office', label: t('createRequest.ptOffice') },
 { id: 'shop', label: t('createRequest.ptShop') },
 { id: 'warehouse', label: t('createRequest.ptWarehouse') },
 { id: 'chalet', label: t('createRequest.ptChalet') },
 { id: 'showroom', label: t('createRequest.ptShowroom') }
 ]
 }
 ];

 const carBrands = [
 { id: 'toyota', name: t('createRequest.brandToyota'), models: [t('createRequest.modelLandcruiser'), t('createRequest.modelCamry'), t('createRequest.modelCorolla'), t('createRequest.modelHilux'), t('createRequest.modelYaris'), t('createRequest.modelFortunер')] },
 { id: 'mercedes', name: t('createRequest.brandMercedes'), models: ['S-Class', 'E-Class', 'C-Class', 'G-Class', 'GLE', 'CLA'] },
 { id: 'hyundai', name: t('createRequest.brandHyundai'), models: [t('createRequest.modelElantra'), t('createRequest.modelSonata'), t('createRequest.modelAccent'), t('createRequest.modelTucson'), t('createRequest.modelSantafe')] },
 { id: 'ford', name: t('createRequest.brandFord'), models: [t('createRequest.modelTaurus'), t('createRequest.modelExplorer'), t('createRequest.modelExpedition'), t('createRequest.modelMustang'), t('createRequest.modelRanger')] },
 { id: 'nissan', name: t('createRequest.brandNissan'), models: [t('createRequest.modelPatrol'), t('createRequest.modelAltima'), t('createRequest.modelMaxima'), t('createRequest.modelSunny'), t('createRequest.modelXtrail')] },
 { id: 'lexus', name: t('createRequest.brandLexus'), models: ['LX', 'ES', 'LS', 'RX', 'NX'] },
 ];

 const carRegionalSpecs = [
 { id: 'saudi', label: t('createRequest.specSaudi') },
 { id: 'gulf', label: t('createRequest.specGulf') },
 { id: 'american', label: t('createRequest.specAmerican') },
 { id: 'imported', label: t('createRequest.specImported') },
 ];

 const carGears = [
 { id: 'automatic', label: t('createRequest.gearAutomatic') },
 { id: 'manual', label: t('createRequest.gearManual') },
 ];

 const carFuels = [
 { id: 'gasoline', label: t('createRequest.fuelGasoline') },
 { id: 'diesel', label: t('createRequest.fuelDiesel') },
 { id: 'hybrid', label: t('createRequest.fuelHybrid') },
 ];

 const years = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() + 1) - i);

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 setIsSubmitting(true);
 // Simulate API call
 setTimeout(() => {
 setIsSubmitting(false);
 setShowSuccess(true);
 // Reset after 2 seconds and go back
 setTimeout(() => {
 onNavigate('my-requests');
 }, 2000);
 }, 1500);
 };

 const getActivePropertyTypes = () => {
 const option = realEstateOptions.find(opt => opt.id === realEstateType);
 return option ? option.propertyTypes : [];
 };

 const getCarModels = () => {
 const brand = carBrands.find(b => b.id === carBrand);
 return brand ? brand.models : [];
 };

 if (showSuccess) {
 return (
 <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
 <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-xl animate-in zoom-in duration-300">
 <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
 <CheckCircle2 size={40} />
 </div>
 <h2 className="text-2xl font-black text-gray-900 mb-2">{t('createRequest.successTitle')}</h2>
 <p className="text-gray-500 mb-6">{t('createRequest.successMessage')}</p>
 <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
 <div className="h-full bg-green-500 animate-[width_2s_linear_forwards] w-0"></div>
 </div>
 </div>
 </div>
 );
 }

 return (
 <div className="min-h-screen bg-[#F8FAFC] pb-20 pt-36">
 {/* Header */}
 <div className="bg-white border-b border-gray-200 pb-6 pt-6 sticky top-[80px] z-20 shadow-sm">
 <div className="max-w-3xl mx-auto px-4 md:px-8">
 <div className="mb-4">
 <BackButton onClick={() => onNavigate('my-requests')} label={t('createRequest.backButton')} className="!px-0 hover:bg-transparent" />
 </div>
 <h1 className="text-2xl md:text-3xl font-black text-gray-900">{t('createRequest.pageTitle')}</h1>
 <p className="text-gray-500 font-medium mt-1">{t('createRequest.pageSubtitle')}</p>
 </div>
 </div>

 <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
 <form onSubmit={handleSubmit} className="space-y-8">

 {/* Section 1: Request Options */}
 <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
 <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
 <Package className="text-[#2B3D50]" size={20} />
 {t('createRequest.section1Title')}
 </h3>

 <div className="space-y-6">
 {/* Category Selection */}
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-3">{t('createRequest.requestType')}</label>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
 {categories.map((cat) => (
 <button
 type="button"
 key={cat.id}
 onClick={() => setActiveCategory(cat.id)}
 className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
 activeCategory === cat.id
 ? 'border-[#2B3D50] bg-[#2B3D50]/5 text-[#2B3D50]'
 : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200'
 }`}
 >
 <cat.icon size={24} />
 <span className="font-bold text-sm">{cat.label}</span>
 </button>
 ))}
 </div>
 </div>

 {/* REAL ESTATE SPECIFIC OPTIONS */}
 {activeCategory === 'real-estate' && (
 <div className="animate-in fade-in slide-in-from-top-4 duration-300 space-y-6 border-t border-gray-100 pt-6 mt-6">

 {/* Sub-Category Selection (Residential/Commercial) */}
 <div className="grid md:grid-cols-2 gap-8">
 {/* Residential Column */}
 <div>
 <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
 <Home size={18} className="text-[#2B3D50]" />
 {t('createRequest.residential')}
 </h4>
 <div className="space-y-2">
 {realEstateOptions.filter(opt => opt.type === 'residential').map(option => (
 <button
 type="button"
 key={option.id}
 onClick={() => {
 setRealEstateType(option.id);
 setActivePropertyType('');
 }}
 className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-end group ${
 realEstateType === option.id
 ? 'border-[#2B3D50] bg-[#2B3D50]/5'
 : 'border-gray-100 bg-white hover:border-gray-200'
 }`}
 >
 <div className="flex items-center gap-3">
 <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
 realEstateType === option.id ? 'bg-[#2B3D50] text-white' : 'bg-gray-100 text-gray-500'
 }`}>
 <option.icon size={18} />
 </div>
 <div>
 <div className={`font-bold text-sm ${realEstateType === option.id ? 'text-[#2B3D50]' : 'text-gray-900'}`}>
 {option.label.split(' - ')[1] || option.label}
 </div>
 <div className="text-[10px] text-gray-400 mt-0.5">{option.description}</div>
 </div>
 </div>
 <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
 realEstateType === option.id ? 'border-[#2B3D50]' : 'border-gray-300'
 }`}>
 {realEstateType === option.id && <div className="w-2 h-2 rounded-full bg-[#2B3D50]" />}
 </div>
 </button>
 ))}
 </div>
 </div>

 {/* Commercial Column */}
 <div>
 <div className="mb-3 flex items-center justify-between">
 <h4 className="font-bold text-gray-900 flex items-center gap-2">
 <Building2 size={18} className="text-[#2B3D50]" />
 {t('createRequest.commercial')}
 </h4>
 <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold">{t('createRequest.newBadge')}</span>
 </div>
 <div className="space-y-2">
 {realEstateOptions.filter(opt => opt.type === 'commercial').map(option => (
 <button
 type="button"
 key={option.id}
 onClick={() => {
 setRealEstateType(option.id);
 setActivePropertyType('');
 }}
 className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-end group ${
 realEstateType === option.id
 ? 'border-[#2B3D50] bg-[#2B3D50]/5'
 : 'border-gray-100 bg-white hover:border-gray-200'
 }`}
 >
 <div className="flex items-center gap-3">
 <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
 realEstateType === option.id ? 'bg-[#2B3D50] text-white' : 'bg-gray-100 text-gray-500'
 }`}>
 <option.icon size={18} />
 </div>
 <div>
 <div className={`font-bold text-sm ${realEstateType === option.id ? 'text-[#2B3D50]' : 'text-gray-900'}`}>
 {option.label.split(' - ')[1] || option.label}
 </div>
 <div className="text-[10px] text-gray-400 mt-0.5">{option.description}</div>
 </div>
 </div>
 <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
 realEstateType === option.id ? 'border-[#2B3D50]' : 'border-gray-300'
 }`}>
 {realEstateType === option.id && <div className="w-2 h-2 rounded-full bg-[#2B3D50]" />}
 </div>
 </button>
 ))}
 </div>
 </div>
 </div>

 {/* Property Type Selection */}
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-3">{t('createRequest.propertyTypeLabel')}</label>
 <div className="flex flex-wrap gap-2">
 {getActivePropertyTypes().map((type) => (
 <button
 type="button"
 key={type.id}
 onClick={() => setActivePropertyType(type.id)}
 className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${
 activePropertyType === type.id
 ? 'bg-[#2B3D50] text-white border-[#2B3D50]'
 : 'bg-white text-gray-600 border-gray-200 hover:border-[#2B3D50] hover:text-[#2B3D50]'
 }`}
 >
 {type.label}
 </button>
 ))}
 </div>
 </div>

 {/* Property Specific Fields (Villa, Land, Apartment) */}
 {activePropertyType && (
 <div className="animate-in fade-in slide-in-from-top-2 duration-300 grid md:grid-cols-2 gap-4 border-t border-gray-100 pt-4 mt-2">

 {/* Fields for Villa & Land & Warehouse & Chalet: Direction & Street Width */}
 {(activePropertyType === 'villa' || activePropertyType === 'land' || activePropertyType === 'building' || activePropertyType === 'warehouse' || activePropertyType === 'land-commercial' || activePropertyType === 'building-commercial' || activePropertyType === 'chalet') && (
 <>
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-2">{t('createRequest.directionLabel')}</label>
 <select
 value={propertyDirection}
 onChange={(e) => setPropertyDirection(e.target.value)}
 className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:border-[#2B3D50] transition-all appearance-none cursor-pointer"
 >
 <option value="">{t('createRequest.directionPlaceholder')}</option>
 <option value="north">{t('createRequest.dirNorth')}</option>
 <option value="south">{t('createRequest.dirSouth')}</option>
 <option value="east">{t('createRequest.dirEast')}</option>
 <option value="west">{t('createRequest.dirWest')}</option>
 <option value="northeast">{t('createRequest.dirNorthEast')}</option>
 <option value="northwest">{t('createRequest.dirNorthWest')}</option>
 <option value="southeast">{t('createRequest.dirSouthEast')}</option>
 <option value="southwest">{t('createRequest.dirSouthWest')}</option>
 <option value="3_streets">{t('createRequest.dir3Streets')}</option>
 <option value="4_streets">{t('createRequest.dir4Streets')}</option>
 </select>
 </div>
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-2">{t('createRequest.streetWidthLabel')}</label>
 <select
 value={streetWidth}
 onChange={(e) => setStreetWidth(e.target.value)}
 className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:border-[#2B3D50] transition-all appearance-none cursor-pointer"
 >
 <option value="">{t('createRequest.streetWidthPlaceholder')}</option>
 <option value="10">{t('createRequest.sw10')}</option>
 <option value="15">{t('createRequest.sw15')}</option>
 <option value="20">{t('createRequest.sw20')}</option>
 <option value="25">{t('createRequest.sw25')}</option>
 <option value="30">{t('createRequest.sw30')}</option>
 <option value="30+">{t('createRequest.sw30plus')}</option>
 </select>
 </div>
 </>
 )}

 {/* Fields for Villa & Building & Apartment & Warehouse & Chalet: Age */}
 {(activePropertyType === 'villa' || activePropertyType === 'building' || activePropertyType === 'apartment' || activePropertyType === 'floor' || activePropertyType === 'warehouse' || activePropertyType === 'building-commercial' || activePropertyType === 'chalet') && (
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-2">{t('createRequest.propertyAgeLabel')}</label>
 <select
 value={propertyAge}
 onChange={(e) => setPropertyAge(e.target.value)}
 className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:border-[#2B3D50] transition-all appearance-none cursor-pointer"
 >
 <option value="">{t('createRequest.propertyAgePlaceholder')}</option>
 <option value="new">{t('createRequest.ageNew')}</option>
 <option value="less_5">{t('createRequest.ageLess5')}</option>
 <option value="less_10">{t('createRequest.ageLess10')}</option>
 <option value="less_20">{t('createRequest.ageLess20')}</option>
 <option value="old">{t('createRequest.ageOld')}</option>
 </select>
 </div>
 )}

 {/* Fields for Apartment & Floor: Rooms & Floor Number */}
 {(activePropertyType === 'apartment' || activePropertyType === 'floor') && (
 <>
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-2">{t('createRequest.roomsCountLabel')}</label>
 <select
 value={roomsCount}
 onChange={(e) => setRoomsCount(e.target.value)}
 className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:border-[#2B3D50] transition-all appearance-none cursor-pointer"
 >
 <option value="">{t('createRequest.roomsCountPlaceholder')}</option>
 <option value="1">{t('createRequest.rooms1')}</option>
 <option value="2">{t('createRequest.rooms2')}</option>
 <option value="3">{t('createRequest.rooms3')}</option>
 <option value="4">{t('createRequest.rooms4')}</option>
 <option value="5">{t('createRequest.rooms5')}</option>
 <option value="5+">{t('createRequest.rooms5plus')}</option>
 </select>
 </div>
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-2">{t('createRequest.floorNumberLabel')}</label>
 <select
 value={floorNumber}
 onChange={(e) => setFloorNumber(e.target.value)}
 className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:border-[#2B3D50] transition-all appearance-none cursor-pointer"
 >
 <option value="">{t('createRequest.floorNumberPlaceholder')}</option>
 <option value="ground">{t('createRequest.floorGround')}</option>
 <option value="1">{t('createRequest.floor1')}</option>
 <option value="2">{t('createRequest.floor2')}</option>
 <option value="3">{t('createRequest.floor3')}</option>
 <option value="upper">{t('createRequest.floorUpper')}</option>
 </select>
 </div>
 </>
 )}
 </div>
 )}

 {/* Location Fields */}
 <div className="grid md:grid-cols-2 gap-4">
 {/* City */}
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-2">{t('createRequest.cityLabel')}</label>
 <div className="relative">
 <select
 value={city}
 onChange={(e) => setCity(e.target.value)}
 className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:border-[#2B3D50] transition-all appearance-none cursor-pointer"
 >
 <option value="">{t('createRequest.cityPlaceholder')}</option>
 {cities.map(c => (
 <option key={c.id} value={c.id}>{c.name}</option>
 ))}
 </select>
 <MapPin className="absolute top-1/2 start-3 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
 </div>
 </div>

 {/* District */}
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-2">{t('createRequest.districtLabel')}</label>
 <div className="relative">
 <input
 type="text"
 value={district}
 onChange={(e) => setDistrict(e.target.value)}
 placeholder={t('createRequest.districtPlaceholder')}
 className="w-full h-12 pe-4 ps-10 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:border-[#2B3D50] transition-all"
 />
 <MapIcon className="absolute top-1/2 start-3 -translate-y-1/2 text-gray-400" size={18} />
 </div>
 </div>
 </div>

 </div>
 )}

 {/* CAR SPECIFIC OPTIONS */}
 {activeCategory === 'car' && (
 <div className="animate-in fade-in slide-in-from-top-4 duration-300 space-y-6 border-t border-gray-100 pt-6 mt-6">
 {/* Offer Type */}
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-3">{t('createRequest.offerTypeLabel')}</label>
 <div className="flex gap-4">
 <button
 type="button"
 onClick={() => setCarOfferType('direct')}
 className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all font-bold ${
 carOfferType === 'direct'
 ? 'border-[#2B3D50] bg-[#2B3D50]/5 text-[#2B3D50]'
 : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'
 }`}
 >
 <CheckCircle2 size={18} className={carOfferType === 'direct' ? 'opacity-100' : 'opacity-0'} />
 {t('createRequest.offerDirect')}
 </button>
 <button
 type="button"
 onClick={() => setCarOfferType('transfer')}
 className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all font-bold ${
 carOfferType === 'transfer'
 ? 'border-[#2B3D50] bg-[#2B3D50]/5 text-[#2B3D50]'
 : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'
 }`}
 >
 <CheckCircle2 size={18} className={carOfferType === 'transfer' ? 'opacity-100' : 'opacity-0'} />
 {t('createRequest.offerTransfer')}
 </button>
 </div>
 </div>

 {/* Brand & Model */}
 <div className="grid md:grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-2">{t('createRequest.brandLabel')}</label>
 <div className="relative">
 <select
 value={carBrand}
 onChange={(e) => {
 setCarBrand(e.target.value);
 setCarModel('');
 }}
 className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:border-[#2B3D50] transition-all appearance-none cursor-pointer"
 >
 <option value="">{t('createRequest.brandPlaceholder')}</option>
 {carBrands.map(b => (
 <option key={b.id} value={b.id}>{b.name}</option>
 ))}
 </select>
 <Car className="absolute top-1/2 start-3 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
 </div>
 </div>

 <div>
 <label className="block text-sm font-bold text-gray-700 mb-2">{t('createRequest.modelLabel')}</label>
 <div className="relative">
 <select
 value={carModel}
 onChange={(e) => setCarModel(e.target.value)}
 disabled={!carBrand}
 className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:border-[#2B3D50] transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
 >
 <option value="">{t('createRequest.modelPlaceholder')}</option>
 {getCarModels().map(m => (
 <option key={m} value={m}>{m}</option>
 ))}
 </select>
 </div>
 </div>
 </div>

 {/* Year Range */}
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-2">{t('createRequest.yearLabel')}</label>
 <div className="flex gap-4">
 <div className="flex-1">
 <select
 value={carYearFrom}
 onChange={(e) => setCarYearFrom(e.target.value)}
 className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:border-[#2B3D50] transition-all appearance-none cursor-pointer"
 >
 <option value="">{t('createRequest.yearFrom')}</option>
 {years.map(y => (
 <option key={y} value={y}>{y}</option>
 ))}
 </select>
 </div>
 <div className="flex-1">
 <select
 value={carYearTo}
 onChange={(e) => setCarYearTo(e.target.value)}
 className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:border-[#2B3D50] transition-all appearance-none cursor-pointer"
 >
 <option value="">{t('createRequest.yearTo')}</option>
 {years.map(y => (
 <option key={y} value={y}>{y}</option>
 ))}
 </select>
 </div>
 </div>
 </div>

 {/* City Selection */}
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-2">{t('createRequest.cityLabel')}</label>
 <div className="relative">
 <select
 value={city}
 onChange={(e) => setCity(e.target.value)}
 className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:border-[#2B3D50] transition-all appearance-none cursor-pointer"
 >
 <option value="">{t('createRequest.allCities')}</option>
 {cities.map(c => (
 <option key={c.id} value={c.id}>{c.name}</option>
 ))}
 </select>
 <MapPin className="absolute top-1/2 start-3 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
 </div>
 </div>

 {/* Regional Specs */}
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-2">{t('createRequest.regionalSpecsLabel')}</label>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
 {carRegionalSpecs.map((spec) => (
 <button
 key={spec.id}
 type="button"
 onClick={() => setCarRegionalSpec(spec.id)}
 className={`py-2 px-3 rounded-lg text-sm border transition-all ${
 carRegionalSpec === spec.id
 ? 'bg-[#2B3D50] text-white border-[#2B3D50]'
 : 'bg-white text-gray-600 border-gray-200 hover:border-[#2B3D50]'
 }`}
 >
 {spec.label}
 </button>
 ))}
 </div>
 </div>

 {/* Additional Options (Collapsible or just grid) */}
 <div className="grid md:grid-cols-2 gap-4">
 {/* Gear */}
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-2">{t('createRequest.gearLabel')}</label>
 <div className="flex gap-2">
 {carGears.map((gear) => (
 <button
 key={gear.id}
 type="button"
 onClick={() => setCarGear(gear.id)}
 className={`flex-1 py-2 px-3 rounded-lg text-sm border transition-all ${
 carGear === gear.id
 ? 'bg-[#2B3D50] text-white border-[#2B3D50]'
 : 'bg-white text-gray-600 border-gray-200 hover:border-[#2B3D50]'
 }`}
 >
 {gear.label}
 </button>
 ))}
 </div>
 </div>

 {/* Fuel */}
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-2">{t('createRequest.fuelLabel')}</label>
 <div className="flex gap-2">
 {carFuels.map((fuel) => (
 <button
 key={fuel.id}
 type="button"
 onClick={() => setCarFuel(fuel.id)}
 className={`flex-1 py-2 px-3 rounded-lg text-sm border transition-all ${
 carFuel === fuel.id
 ? 'bg-[#2B3D50] text-white border-[#2B3D50]'
 : 'bg-white text-gray-600 border-gray-200 hover:border-[#2B3D50]'
 }`}
 >
 {fuel.label}
 </button>
 ))}
 </div>
 </div>
 </div>
 </div>
 )}

 {/* PLATE SPECIFIC OPTIONS */}
 {activeCategory === 'plate' && (
 <div className="animate-in fade-in slide-in-from-top-4 duration-300 space-y-6 border-t border-gray-100 pt-6 mt-6">
 {/* Plate Type */}
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-3">{t('createRequest.plateTypeLabel')}</label>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
 {[
 { id: 'private', label: t('createRequest.platePrivate') },
 { id: 'transport', label: t('createRequest.plateTransport') },
 { id: 'motorcycle', label: t('createRequest.plateMotorcycle') },
 { id: 'other', label: t('createRequest.plateOther') }
 ].map((type) => (
 <button
 key={type.id}
 type="button"
 onClick={() => setPlateType(type.id)}
 className={`py-3 px-3 rounded-xl text-sm font-bold border transition-all ${
 plateType === type.id
 ? 'bg-[#2B3D50] text-white border-[#2B3D50]'
 : 'bg-white text-gray-600 border-gray-200 hover:border-[#2B3D50]'
 }`}
 >
 {type.label}
 </button>
 ))}
 </div>
 </div>

 {/* Plate Structure */}
 <div className="grid md:grid-cols-2 gap-4">
 {/* Letter Count */}
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-2">{t('createRequest.letterCountLabel')}</label>
 <select
 value={plateLetterCount}
 onChange={(e) => setPlateLetterCount(e.target.value)}
 className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:border-[#2B3D50] transition-all appearance-none cursor-pointer"
 >
 <option value="">{t('createRequest.notSpecified')}</option>
 <option value="1">{t('createRequest.letter1')}</option>
 <option value="2">{t('createRequest.letter2')}</option>
 <option value="3">{t('createRequest.letter3')}</option>
 <option value="distinct">{t('createRequest.letterDistinct')}</option>
 </select>
 </div>

 {/* Number Count */}
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-2">{t('createRequest.numberCountLabel')}</label>
 <select
 value={plateNumberCount}
 onChange={(e) => setPlateNumberCount(e.target.value)}
 className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:border-[#2B3D50] transition-all appearance-none cursor-pointer"
 >
 <option value="">{t('createRequest.notSpecified')}</option>
 <option value="1">{t('createRequest.number1')}</option>
 <option value="2">{t('createRequest.number2')}</option>
 <option value="3">{t('createRequest.number3')}</option>
 <option value="4">{t('createRequest.number4')}</option>
 </select>
 </div>
 </div>

 {/* Specific Preferences */}
 <div className="grid md:grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-2">{t('createRequest.preferredLettersLabel')}</label>
 <input
 type="text"
 value={plateLetters}
 onChange={(e) => setPlateLetters(e.target.value)}
 placeholder={t('createRequest.preferredLettersPlaceholder')}
 className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:border-[#2B3D50] transition-all"
 />
 </div>
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-2">{t('createRequest.preferredNumbersLabel')}</label>
 <input
 type="text"
 value={plateNumbers}
 onChange={(e) => setPlateNumbers(e.target.value)}
 placeholder={t('createRequest.preferredNumbersPlaceholder')}
 className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:border-[#2B3D50] transition-all text-start dir-ltr"
 />
 </div>
 </div>

 {/* City Selection */}
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-2">{t('createRequest.cityLabel')}</label>
 <div className="relative">
 <select
 value={city}
 onChange={(e) => setCity(e.target.value)}
 className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:border-[#2B3D50] transition-all appearance-none cursor-pointer"
 >
 <option value="">{t('createRequest.allCities')}</option>
 {cities.map(c => (
 <option key={c.id} value={c.id}>{c.name}</option>
 ))}
 </select>
 <MapPin className="absolute top-1/2 start-3 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
 </div>
 </div>
 </div>
 )}

 {/* OTHER SPECIFIC OPTIONS */}
 {activeCategory === 'other' && (
 <div className="animate-in fade-in slide-in-from-top-4 duration-300 space-y-6 border-t border-gray-100 pt-6 mt-6">
 {/* Item Name */}
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-2">{t('createRequest.itemNameLabel')}</label>
 <div className="relative">
 <input
 type="text"
 value={otherItemName}
 onChange={(e) => setOtherItemName(e.target.value)}
 placeholder={t('createRequest.itemNamePlaceholder')}
 className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:border-[#2B3D50] transition-all"
 />
 <Package className="absolute top-1/2 start-3 -translate-y-1/2 text-gray-400" size={18} />
 </div>
 </div>

 {/* Condition & City */}
 <div className="grid md:grid-cols-2 gap-4">
 {/* Condition */}
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-2">{t('createRequest.conditionLabel')}</label>
 <div className="flex gap-2">
 {[{id: 'new', label: t('createRequest.conditionNew')}, {id: 'used', label: t('createRequest.conditionUsed')}].map((cond) => (
 <button
 key={cond.id}
 type="button"
 onClick={() => setOtherItemCondition(cond.id)}
 className={`flex-1 py-3 px-3 rounded-xl text-sm font-bold border transition-all ${
 otherItemCondition === cond.id
 ? 'bg-[#2B3D50] text-white border-[#2B3D50]'
 : 'bg-white text-gray-600 border-gray-200 hover:border-[#2B3D50]'
 }`}
 >
 {cond.label}
 </button>
 ))}
 </div>
 </div>

 {/* City Selection */}
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-2">{t('createRequest.cityLabel')}</label>
 <div className="relative">
 <select
 value={city}
 onChange={(e) => setCity(e.target.value)}
 className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:border-[#2B3D50] transition-all appearance-none cursor-pointer"
 >
 <option value="">{t('createRequest.allCities')}</option>
 {cities.map(c => (
 <option key={c.id} value={c.id}>{c.name}</option>
 ))}
 </select>
 <MapPin className="absolute top-1/2 start-3 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
 </div>
 </div>
 </div>
 </div>
 )}

 {/* Price Range */}
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-3">{t('createRequest.budgetLabel')}</label>
 <div className="flex items-center gap-4">
 <div className="relative flex-1">
 <span className="absolute top-1/2 end-3 -translate-y-1/2 text-gray-400">
 <DollarSign size={16} />
 </span>
 <input
 type="number"
 min="0"
 placeholder={t('createRequest.minPrice')}
 className="w-full h-12 pe-10 ps-4 bg-gray-50 border border-gray-200 rounded-xl font-bold focus:outline-none focus:border-[#2B3D50] focus:ring-2 focus:ring-[#2B3D50]/20 transition-all"
 onKeyDown={(e) => { if (e.key === '-' || e.key === 'e') e.preventDefault(); }}
 />
 </div>
 <span className="text-gray-400 font-bold">-</span>
 <div className="relative flex-1">
 <span className="absolute top-1/2 end-3 -translate-y-1/2 text-gray-400">
 <DollarSign size={16} />
 </span>
 <input
 type="number"
 min="0"
 placeholder={t('createRequest.maxPrice')}
 className="w-full h-12 pe-10 ps-4 bg-gray-50 border border-gray-200 rounded-xl font-bold focus:outline-none focus:border-[#2B3D50] focus:ring-2 focus:ring-[#2B3D50]/20 transition-all"
 onKeyDown={(e) => { if (e.key === '-' || e.key === 'e') e.preventDefault(); }}
 />
 </div>
 </div>
 </div>

 {/* Additional Specs */}
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-3">{t('createRequest.additionalSpecsLabel')}</label>
 <div className="relative">
 <textarea
 rows={5}
 placeholder={t('createRequest.additionalSpecsPlaceholder')}
 className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:border-[#2B3D50] focus:ring-2 focus:ring-[#2B3D50]/20 transition-all resize-none"
 ></textarea>
 <MessageSquare className="absolute top-4 start-4 text-gray-300" size={20} />
 </div>
 </div>
 </div>
 </div>

 {/* Section 2: Customer Info */}
 <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
 <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
 <User className="text-[#2B3D50]" size={20} />
 {t('createRequest.section2Title')}
 </h3>

 <div className="grid md:grid-cols-2 gap-6">
 <div>
 <label className="block text-sm font-bold text-gray-700 mb-2">{t('createRequest.fullNameLabel')}</label>
 <input
 type="text"
 placeholder={t('createRequest.fullNamePlaceholder')}
 className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:border-[#2B3D50] transition-all"
 />
 </div>

 <div>
 <label className="block text-sm font-bold text-gray-700 mb-2">{t('createRequest.phoneLabel')}</label>
 <PhoneInput
 containerClassName="h-12 bg-gray-50 border border-gray-200 rounded-xl focus-within:border-[#2B3D50] transition-all"
 className="h-full bg-transparent outline-none rounded-xl"
 />
 </div>
 </div>
 </div>

 {/* Submit Button */}
 <div className="flex justify-end pt-4">
 <button
 type="submit"
 disabled={isSubmitting}
 className={`w-full md:w-auto px-12 py-4 bg-[#2B3D50] text-white rounded-xl font-black text-lg shadow-lg shadow-slate-800/20 hover:bg-[#1a2530] hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
 >
 {isSubmitting ? (
 <>
 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
 {t('createRequest.submitting')}
 </>
 ) : (
 <>
 <span>{t('createRequest.submitButton')}</span>
 <CheckCircle2 size={20} />
 </>
 )}
 </button>
 </div>

 </form>
 </div>
 </div>
 );
};
