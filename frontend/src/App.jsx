import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import AppLayout from './components/AppLayout';

// Pages
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import ScannerPage from './pages/ScannerPage';
import HistoryPage from './pages/HistoryPage';
import AnalysisPage from './pages/AnalysisPage';
import ScamDNAExplorerPage from './pages/ScamDNAExplorerPage';
import FraudNetworkPage from './pages/FraudNetworkPage';
import ReportsPage from './pages/ReportsPage';
import IntelligencePage from './pages/IntelligencePage';
import AnalyticsPage from './pages/AnalyticsPage';
import NotificationsPage from './pages/NotificationsPage';
import SettingsPage from './pages/SettingsPage';

function LegacyAnalysisRedirect() {
  const { id } = useParams();
  return <Navigate to={`/app/scans/${id}`} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<AuthPage mode="login" />} />
            <Route path="/register" element={<AuthPage mode="register" />} />
            <Route path="/auth" element={<AuthPage />} />

            {/* Application Workspace Routes with Collapsible Multi-tier Sidebar */}
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="scan" element={<ScannerPage />} />
              <Route path="scans" element={<HistoryPage />} />
              <Route path="scans/:scanId" element={<AnalysisPage />} />
              <Route path="scam-dna" element={<ScamDNAExplorerPage />} />
              <Route path="network" element={<FraudNetworkPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="intelligence" element={<IntelligencePage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* Backwards-compatibility redirects */}
            <Route path="/dashboard" element={<Navigate to="/app" replace />} />
            <Route path="/scan" element={<Navigate to="/app/scan" replace />} />
            <Route path="/scan/analysis/:id" element={<LegacyAnalysisRedirect />} />
            <Route path="/history" element={<Navigate to="/app/scans" replace />} />
            <Route path="/reports" element={<Navigate to="/app/reports" replace />} />
            <Route path="/intelligence" element={<Navigate to="/app/intelligence" replace />} />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
