import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TranslationProvider } from './context/TranslationContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';

// Pages
import Overview from './pages/Overview';
import ComplianceMonitor from './pages/ComplianceMonitor';
import AuctionControl from './pages/AuctionControl';
import BidAuditLog from './pages/BidAuditLog';
import PropertyRegistry from './pages/PropertyRegistry';
import Analytics from './pages/Analytics';
import FinancialOversight from './pages/FinancialOversight';
import SupportHub from './pages/SupportHub';
import UserManagement from './pages/UserManagement';
import AIIntelligence from './pages/AIIntelligence';
import RegulatoryReports from './pages/RegulatoryReports';
import Settings from './pages/Settings';
import ServicesManagement from './pages/ServicesManagement';
import DeveloperHub from './pages/DeveloperHub';
import DisputeManagement from './pages/DisputeManagement';
import CategoryManagement from './pages/CategoryManagement';
import AuditLog from './pages/AuditLog';
import NotificationCenter from './pages/NotificationCenter';
import WebsiteSectionsManager from './pages/WebsiteSectionsManager';
import ConnectionStatus from './pages/ConnectionStatus';
import Login from './pages/Login';

export default function App() {
  return (
    <TranslationProvider>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public route — login */}
              <Route path="/login" element={<Login />} />

              {/* Protected routes — all wrapped in DashboardLayout */}
              <Route
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/" element={<Overview />} />
                <Route path="/compliance" element={<ComplianceMonitor />} />
                <Route path="/compliance/reports" element={<RegulatoryReports />} />
                <Route path="/auctions" element={<AuctionControl />} />
                <Route path="/auctions/bids" element={<BidAuditLog />} />
                <Route path="/property" element={<PropertyRegistry />} />
                <Route path="/categories" element={<CategoryManagement />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/financial" element={<FinancialOversight />} />
                <Route path="/disputes" element={<DisputeManagement />} />
                <Route path="/support" element={<SupportHub />} />
                <Route path="/users" element={<UserManagement />} />
                <Route path="/notifications" element={<NotificationCenter />} />
                <Route path="/audit" element={<AuditLog />} />
                <Route path="/ai" element={<AIIntelligence />} />
                <Route path="/developer" element={<DeveloperHub />} />
                <Route path="/services" element={<ServicesManagement />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/website-sections" element={<WebsiteSectionsManager />} />
                <Route path="/connection-status" element={<ConnectionStatus />} />
              </Route>

              {/* Catch-all — redirect unknown paths to root */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </TranslationProvider>
  );
}
