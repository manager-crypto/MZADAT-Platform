import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthGuard } from '../components/auth/AuthGuard';

import { HomePage } from '../pages/HomePage';
import { AuctionsPage } from '../pages/AuctionsPage';
import { CarAuctionsPage } from '../pages/CarAuctionsPage';
import { CarDetailsPage } from '../pages/CarDetailsPage';
import { LiveCarAuctionPage } from '../pages/LiveCarAuctionPage';
import { BidNowPage } from '../pages/BidNowPage';
import { OtherAuctionsPage } from '../pages/OtherAuctionsPage';
import { CarPlatesAuctionsPage } from '../pages/CarPlatesAuctionsPage';
import { LuxuryRealEstateAuctionsPage } from '../pages/LuxuryRealEstateAuctionsPage';
import { LuxuryAuctionDetailsPage } from '../pages/LuxuryAuctionDetailsPage';
import { PlateDetailsPage } from '../pages/PlateDetailsPage';
import { AdvertisersPage } from '../pages/AdvertisersPage';
import { CitySalePage } from '../components/pages/CitySalePage';
import { PropertyDetailsPage } from '../components/pages/PropertyDetailsPage';
import { WalletPage } from '../pages/WalletPage';
import { TrainingPage } from '../pages/TrainingPage';
import { ConsultingPage } from '../pages/ConsultingPage';
import { CareersPage } from '../pages/CareersPage';
import { LoginPage } from '../pages/LoginPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { ResetPasswordPage } from '../pages/ResetPasswordPage';
import { BiometricLoginPage } from '../pages/BiometricLoginPage';
import { SignupPage } from '../pages/SignupPage';
import { ReportVulnerabilityPage } from '../pages/ReportVulnerabilityPage';
import { NafathLoginPage } from '../pages/NafathLoginPage';
import { NafathVerificationPage } from '../pages/NafathVerificationPage';
import { ReportAdIssuePage } from '../components/pages/ReportAdIssuePage';
import { ReportComplaintPage } from '../components/pages/ReportComplaintPage';
import { LiveAuctionPage } from '../pages/LiveAuctionPage';
import { AuctionDetailsPage } from '../pages/AuctionDetailsPage';
import { RegisterNowPage } from '../pages/RegisterNowPage';
import { RegistrationFlowPage } from '../pages/RegistrationFlowPage';
import { AddAdPage } from '../pages/AddAdPage';
import { SelectAdCategoryPage } from '../pages/SelectAdCategoryPage';
import { AddAuctionPage } from '../pages/AddAuctionPage';
import { DirectSalesPage } from '../components/direct-sales/DirectSalesPage';
import { DirectSaleDetailsPage } from '../components/direct-sales/DirectSaleDetailsPage';
import { FAQPage } from '../pages/FAQPage';
import { SupportPage } from '../pages/SupportPage';
import { PrivacyPolicyPage } from '../pages/PrivacyPolicyPage';
import { AdditionalServicesPage } from '../pages/AdditionalServicesPage';
import { ServiceProvidersDirectoryPage } from '../pages/ServiceProvidersDirectoryPage';
import { ResidentialRentPage } from '../pages/ResidentialRentPage';
import { RiyadhRentPage } from '../pages/RiyadhRentPage';
import { RentPropertyDetailsPage } from '../pages/RentPropertyDetailsPage';
import { TermsPage } from '../pages/TermsPage';
import { AuctionGuidePage } from '../components/pages/AuctionGuidePage';
import { BrokerageGuidePage } from '../components/pages/BrokerageGuidePage';
import { RequestBrokeragePage } from '../components/pages/RequestBrokeragePage';
import { AIEvaluationPage } from '../components/pages/AIEvaluationPage';
import { DashboardPage } from '../pages/DashboardPage';
import { RentalsPage } from '../pages/RentalsPage';
import { DailyRentListingPage } from '../components/pages/DailyRentListingPage';
import { BookingPage } from '../pages/BookingPage';
import { RequestsPage } from '../pages/RequestsPage';
import { CreateRequestPage } from '../pages/CreateRequestPage';
import { AboutPage } from '../components/pages/AboutPage';
import { SuggestionsPage } from '../components/pages/SuggestionsPage';
import { PlansPage } from '../pages/PlansPage';
import { PlanDetailsPage } from '../components/pages/PlanDetailsPage';
import { RealEstateSalePage } from '../components/wasata/RealEstateSalePage';
import { CommercialSalePage } from '../components/wasata/CommercialSalePage';
import { CommercialRentPage } from '../components/wasata/CommercialRentPage';
import { RealEstateRentPage } from '../components/wasata/RealEstateRentPage';
import { HotelApartmentsPage } from '../components/pages/HotelApartmentsPage';
import { PrivateVillasPage } from '../components/pages/PrivateVillasPage';
import { DesertCampsPage } from '../components/pages/DesertCampsPage';
import { CommercialOfficesPage } from '../components/pages/CommercialOfficesPage';
import { ShowroomsShopsPage } from '../components/pages/ShowroomsShopsPage';
import { FurnishedOfficesPage } from '../components/pages/FurnishedOfficesPage';
import { WarehousesPage } from '../components/pages/WarehousesPage';
import { AddCarPage } from '../pages/AddCarPage';
import { AddPlatePage } from '../pages/AddPlatePage';
import { AddOtherPage } from '../pages/AddOtherPage';
import { BrokerDashboardPage } from '../pages/BrokerDashboardPage';

// Import new service pages
import { AuctionsServicePage } from '../components/pages/AuctionsServicePage';
import { BrokerageServicePage } from '../components/pages/BrokerageServicePage';
import { ValuationServicePage } from '../components/pages/ValuationServicePage';
import { LuxuryServicePage } from '../components/pages/LuxuryServicePage';
import { ComplianceDashboardPage } from '../pages/ComplianceDashboardPage';

// Admin Imports
import { AdminLoginPage } from '../pages/admin/AdminLoginPage';
import { AdminPropertyDetailsPage } from '../pages/admin/AdminPropertyDetailsPage';
import { AdminLayout } from '../pages/admin/AdminLayout';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { AdminUsersPage } from '../pages/admin/AdminUsersPage';
import { AdminAuctionsPage } from '../pages/admin/AdminAuctionsPage';
import { AdminKYCPage } from '../pages/admin/AdminKYCPage';
import { AdminFinancePage } from '../pages/admin/AdminFinancePage';
import { AdminMediaPage } from '../pages/admin/AdminMediaPage';
import { AdminSystemHealthPage } from '../pages/admin/AdminSystemHealthPage';
import { AdminSectionsPage } from '../pages/admin/AdminSectionsPage';

// Types passed from App
export interface AppRoutesProps {
 handleNavigate: (page: string) => void;
 handleOpenChat: () => void;
 cursorPosition: { x: number; y: number };
 handleCitySelect: (cityId: string) => void;
 handleDirectSaleItemClick: (item: any) => void;
 handlePropertyClick: (property: any) => void;
 handleAuctionClick: (auction: any) => void;
 isLoggedIn: boolean;
 handleOpenLogin: () => void;
 selectedAuction: any;
 handleCarClick: (car: any) => void;
 selectedCar: any;
 selectedDirectSaleItem: any;
 handleDirectSaleBack: () => void;
 selectedProperty: any;
 handleBackToRiyadhRent: () => void;
 handleGoBack: () => void;
 selectedCity: string;
 handleLogin: () => void;
}

export const AppRoutes: React.FC<AppRoutesProps> = ({
 handleNavigate,
 handleOpenChat,
 cursorPosition,
 handleCitySelect,
 handleDirectSaleItemClick,
 handlePropertyClick,
 handleAuctionClick,
 isLoggedIn,
 handleOpenLogin,
 selectedAuction,
 handleCarClick,
 selectedCar,
 selectedDirectSaleItem,
 handleDirectSaleBack,
 selectedProperty,
 handleBackToRiyadhRent,
 handleGoBack,
 selectedCity,
 handleLogin,
}) => {
 return (
 <Routes>
 {/* ==================== PUBLIC ROUTES ==================== */}
 <Route
 path="/"
 element={
 <HomePage
 onOpenChat={handleOpenChat}
 cursorPosition={cursorPosition}
 onCitySelect={handleCitySelect}
 onNavigate={handleNavigate}
 onItemClick={handleDirectSaleItemClick}
 onPropertyClick={handlePropertyClick}
 onAuctionClick={handleAuctionClick}
 isLoggedIn={isLoggedIn}
 onOpenLogin={handleOpenLogin}
 />
 }
 />
 <Route path="/auctions" element={<AuctionsPage onNavigate={handleNavigate} onAuctionClick={handleAuctionClick} isLoggedIn={isLoggedIn} onOpenLogin={handleOpenLogin} />} />
 <Route path="/live-auction" element={<LiveAuctionPage onNavigate={handleNavigate} />} />
 <Route path="/auction-details" element={<AuctionDetailsPage onNavigate={handleNavigate} auction={selectedAuction} />} />
 <Route path="/car-auctions" element={<CarAuctionsPage onNavigate={handleNavigate} onCarClick={handleCarClick} />} />
 <Route path="/car-details" element={<CarDetailsPage onNavigate={handleNavigate} car={selectedCar} />} />
 <Route path="/bid-now" element={<BidNowPage onNavigate={handleNavigate} />} />
 <Route path="/live-car-auction" element={<LiveCarAuctionPage onNavigate={handleNavigate} />} />
 <Route path="/car-plates-auctions" element={<CarPlatesAuctionsPage onNavigate={handleNavigate} />} />
 <Route path="/luxury-real-estate-auctions" element={<LuxuryRealEstateAuctionsPage onNavigate={handleNavigate} />} />
 <Route path="/luxury-auction-details" element={<LuxuryAuctionDetailsPage onNavigate={handleNavigate} />} />
 <Route path="/plate-details" element={<PlateDetailsPage onNavigate={handleNavigate} />} />
 <Route path="/register-now" element={<RegisterNowPage onNavigate={handleNavigate} />} />
 <Route path="/registration-flow" element={<RegistrationFlowPage onNavigate={handleNavigate} />} />
 <Route path="/auction-guide" element={<AuctionGuidePage onNavigate={handleNavigate} />} />
 <Route path="/brokerage-guide" element={<BrokerageGuidePage onNavigate={handleNavigate} />} />
 <Route path="/commercial-sale" element={<CommercialSalePage onPropertyClick={handlePropertyClick} onNavigate={handleNavigate} />} />
 <Route path="/commercial-rent" element={<CommercialRentPage onPropertyClick={handlePropertyClick} onNavigate={handleNavigate} />} />
 <Route path="/real-estate-for-sale" element={<RealEstateSalePage onPropertyClick={handlePropertyClick} onNavigate={handleNavigate} />} />
 <Route path="/real-estate-for-rent" element={<RealEstateRentPage onPropertyClick={handlePropertyClick} onNavigate={handleNavigate} />} />
 <Route path="/request-brokerage" element={<RequestBrokeragePage onNavigate={handleNavigate} />} />
 <Route path="/rentals" element={<RentalsPage onNavigate={handleNavigate} />} />
 <Route path="/daily-rent" element={<DailyRentListingPage onNavigate={handleNavigate} />} />
 <Route path="/hotel-apartments" element={<HotelApartmentsPage />} />
 <Route path="/private-villas" element={<PrivateVillasPage />} />
 <Route path="/desert-camps" element={<DesertCampsPage />} />
 <Route path="/commercial-offices" element={<CommercialOfficesPage />} />
 <Route path="/showrooms-shops" element={<ShowroomsShopsPage />} />
 <Route path="/furnished-offices" element={<FurnishedOfficesPage />} />
 <Route path="/warehouses" element={<WarehousesPage />} />
 <Route path="/other-auctions" element={<OtherAuctionsPage onNavigate={handleNavigate} />} />
 <Route path="/faq" element={<FAQPage onNavigate={handleNavigate} />} />
 <Route path="/support" element={<SupportPage onNavigate={handleNavigate} />} />
 <Route path="/privacy-policy" element={<PrivacyPolicyPage onNavigate={handleNavigate} />} />
 <Route path="/additional-services" element={<AdditionalServicesPage onNavigate={handleNavigate} />} />
 <Route path="/service-providers" element={<ServiceProvidersDirectoryPage onNavigate={handleNavigate} />} />
 <Route path="/residential-rent" element={<ResidentialRentPage onNavigate={handleNavigate} />} />
 <Route path="/riyadh-rent" element={<RiyadhRentPage onNavigate={handleNavigate} onPropertyClick={handlePropertyClick} />} />
 <Route path="/terms" element={<TermsPage onNavigate={handleNavigate} />} />
 <Route path="/advertisers" element={<AdvertisersPage />} />
 <Route path="/city-sale" element={<CitySalePage cityId={selectedCity} onPropertyClick={handlePropertyClick} onNavigate={handleNavigate} />} />
 <Route path="/riyadh-sale" element={<CitySalePage cityId="riyadh" onPropertyClick={handlePropertyClick} onNavigate={handleNavigate} />} />
 <Route path="/about" element={<AboutPage onNavigate={handleNavigate} />} />
 <Route path="/suggestions" element={<SuggestionsPage onNavigate={handleNavigate} />} />
 <Route path="/plans" element={<PlansPage onNavigate={handleNavigate} />} />
 <Route path="/plan-details/:id" element={<PlanDetailsPage onNavigate={handleNavigate} />} />
 <Route path="/careers" element={<CareersPage />} />
 <Route path="/services/auctions" element={<AuctionsServicePage onNavigate={handleNavigate} />} />
 <Route path="/services/brokerage" element={<BrokerageServicePage onNavigate={handleNavigate} />} />
 <Route path="/services/valuation" element={<ValuationServicePage onNavigate={handleNavigate} />} />
 <Route path="/services/luxury" element={<LuxuryServicePage onNavigate={handleNavigate} />} />
 <Route path="/login" element={<LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />} />
 <Route path="/forgot-password" element={<ForgotPasswordPage onNavigate={handleNavigate} />} />
 <Route path="/reset-password" element={<ResetPasswordPage onNavigate={handleNavigate} />} />
 <Route path="/biometric-login" element={<BiometricLoginPage onNavigate={handleNavigate} onLogin={handleLogin} />} />
 <Route path="/signup" element={<SignupPage onNavigate={handleNavigate} />} />
 <Route path="/nafath-login" element={<NafathLoginPage onNavigate={handleNavigate} />} />
 <Route path="/nafath-verification" element={<NafathVerificationPage onNavigate={handleNavigate} />} />
 <Route path="/compliance-dashboard" element={<ComplianceDashboardPage onNavigate={handleNavigate} />} />
 <Route path="/report-vulnerability" element={<ReportVulnerabilityPage />} />
 <Route path="/training" element={<TrainingPage />} />
 <Route path="/consulting" element={<ConsultingPage />} />
 <Route path="/services/consultation" element={<ConsultingPage />} />

 {/* ==================== DIRECT SALES ROUTES ==================== */}
 <Route path="/direct-sale-real-estate" element={<DirectSalesPage category="real-estate" onNavigate={handleNavigate} onItemClick={handleDirectSaleItemClick} />} />
 <Route path="/direct-sale-cars" element={<DirectSalesPage category="cars" onNavigate={handleNavigate} onItemClick={handleDirectSaleItemClick} />} />
 <Route path="/direct-sale-plates" element={<DirectSalesPage category="plates" onNavigate={handleNavigate} onItemClick={handleDirectSaleItemClick} />} />
 <Route path="/direct-sale-other" element={<DirectSalesPage category="other" onNavigate={handleNavigate} onItemClick={handleDirectSaleItemClick} />} />
 <Route
 path="/direct-sale-details"
 element={
 <DirectSaleDetailsPage
 item={selectedDirectSaleItem}
 onNavigate={handleNavigate}
 onBack={handleDirectSaleBack}
 />
 }
 />

 {/* ==================== PROPERTY / DETAIL ROUTES ==================== */}
 <Route
 path="/rent-property-details"
 element={
 <RentPropertyDetailsPage
 property={selectedProperty}
 onBack={handleBackToRiyadhRent}
 onNavigate={handleNavigate}
 />
 }
 />
 <Route
 path="/property-details"
 element={
 <PropertyDetailsPage
 property={selectedProperty}
 onBack={handleGoBack}
 onNavigate={handleNavigate}
 />
 }
 />
 <Route
 path="/ai-evaluation"
 element={
 <AIEvaluationPage
 propertyTitle={selectedProperty?.title}
 onBack={handleGoBack}
 />
 }
 />
 <Route
 path="/report-ad-issue"
 element={
 <ReportAdIssuePage
 property={selectedProperty}
 onBack={handleGoBack}
 onNavigate={handleNavigate}
 />
 }
 />
 <Route
 path="/report-complaint"
 element={
 <ReportComplaintPage
 property={selectedProperty}
 onBack={handleGoBack}
 onNavigate={handleNavigate}
 />
 }
 />

 {/* ==================== PROTECTED ROUTES ==================== */}
 <Route
 path="/dashboard"
 element={
 <AuthGuard isLoggedIn={isLoggedIn} onOpenLogin={handleOpenLogin} onNavigate={handleNavigate}>
 <DashboardPage onNavigate={handleNavigate} />
 </AuthGuard>
 }
 />
 <Route
 path="/add-ad"
 element={
 <AuthGuard isLoggedIn={isLoggedIn} onOpenLogin={handleOpenLogin} onNavigate={handleNavigate} mode="ad">
 <SelectAdCategoryPage onNavigate={handleNavigate} />
 </AuthGuard>
 }
 />
 <Route
 path="/add-real-estate"
 element={
 <AuthGuard isLoggedIn={isLoggedIn} onOpenLogin={handleOpenLogin} onNavigate={handleNavigate} mode="ad">
 <AddAdPage onNavigate={handleNavigate} />
 </AuthGuard>
 }
 />
 <Route
 path="/add-auction"
 element={
 <AuthGuard isLoggedIn={isLoggedIn} onOpenLogin={handleOpenLogin} onNavigate={handleNavigate} mode="auction">
 <AddAuctionPage onNavigate={handleNavigate} />
 </AuthGuard>
 }
 />
 <Route
 path="/add-car"
 element={
 <AuthGuard isLoggedIn={isLoggedIn} onOpenLogin={handleOpenLogin} onNavigate={handleNavigate} mode="ad">
 <AddCarPage onNavigate={handleNavigate} />
 </AuthGuard>
 }
 />
 <Route
 path="/add-plate"
 element={
 <AuthGuard isLoggedIn={isLoggedIn} onOpenLogin={handleOpenLogin} onNavigate={handleNavigate} mode="ad">
 <AddPlatePage onNavigate={handleNavigate} />
 </AuthGuard>
 }
 />
 <Route
 path="/add-other"
 element={
 <AuthGuard isLoggedIn={isLoggedIn} onOpenLogin={handleOpenLogin} onNavigate={handleNavigate} mode="ad">
 <AddOtherPage onNavigate={handleNavigate} />
 </AuthGuard>
 }
 />
 <Route path="/broker-dashboard" element={<BrokerDashboardPage />} />
 <Route
 path="/wallet"
 element={
 <AuthGuard isLoggedIn={isLoggedIn} onOpenLogin={handleOpenLogin} onNavigate={handleNavigate}>
 <WalletPage onNavigate={handleNavigate} />
 </AuthGuard>
 }
 />
 <Route
 path="/my-requests"
 element={
 <AuthGuard isLoggedIn={isLoggedIn} onOpenLogin={handleOpenLogin} onNavigate={handleNavigate}>
 <RequestsPage onNavigate={handleNavigate} />
 </AuthGuard>
 }
 />
 <Route
 path="/create-request"
 element={
 <AuthGuard isLoggedIn={isLoggedIn} onOpenLogin={handleOpenLogin} onNavigate={handleNavigate}>
 <CreateRequestPage onNavigate={handleNavigate} />
 </AuthGuard>
 }
 />
 <Route
 path="/booking"
 element={
 <AuthGuard isLoggedIn={isLoggedIn} onOpenLogin={handleOpenLogin} onNavigate={handleNavigate}>
 <BookingPage onNavigate={handleNavigate} />
 </AuthGuard>
 }
 />

 {/* ==================== ADMIN ROUTES ==================== */}
 <Route path="/admin/login" element={<AdminLoginPage />} />
 <Route path="/admin" element={<AdminLayout />}>
 <Route index element={<AdminDashboardPage />} />
 <Route path="users" element={<AdminUsersPage />} />
 <Route path="auctions" element={<AdminAuctionsPage />} />
 <Route path="properties/:id" element={<AdminPropertyDetailsPage />} />
 <Route path="kyc" element={<AdminKYCPage />} />
 <Route path="finance" element={<AdminFinancePage />} />
 <Route path="media" element={<AdminMediaPage />} />
 <Route path="system" element={<AdminSystemHealthPage />} />
 <Route path="sections" element={<AdminSectionsPage />} />
 </Route>
 </Routes>
 );
};
