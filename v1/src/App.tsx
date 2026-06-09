import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './components/ui/Toast';

// Auth pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { VerifyOTPPage } from './pages/auth/VerifyOTPPage';

// Dashboard pages
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { BillingPage } from './pages/dashboard/BillingPage';
import { EditorPage } from './pages/dashboard/EditorPage';
import { ProductsPage } from './pages/dashboard/ProductsPage';
import { DomainPage } from './pages/dashboard/DomainPage';
import { SettingsPage } from './pages/dashboard/SettingsPage';
import { TeamPage } from './pages/dashboard/TeamPage';

// Admin pages
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminTenantsPage } from './pages/admin/AdminTenantsPage';
import { AdminInvoicesPage } from './pages/admin/AdminInvoicesPage';
import { AdminSystemPage } from './pages/admin/AdminSystemPage';

// Public pages
import { LandingPage } from './pages/LandingPage';
import { StorefrontPage } from './pages/StorefrontPage';

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/loja/:slug" element={<StorefrontPage />} />
      <Route path="/demo-loja" element={<StorefrontPage />} />
      
      {/* Auth */}
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/auth/verify-otp" element={<VerifyOTPPage />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<DashboardPage />}>
        <Route path="billing" element={<BillingPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="domain" element={<DomainPage />} />
        <Route path="team" element={<TeamPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="site" element={<Navigate to="/dashboard/editor" replace />} />
      </Route>
      <Route path="/dashboard/editor" element={<EditorPage />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="tenants" element={<AdminTenantsPage />} />
        <Route path="invoices" element={<AdminInvoicesPage />} />
        <Route path="system" element={<AdminSystemPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </AuthProvider>
    </HashRouter>
  );
}
