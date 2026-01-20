import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { ProtectedRoute } from '../components/routing/ProtectedRoute';
import UnauthorizedPage from '../pages/error/UnauthorizedPage';
import PendingApprovalPage from '../pages/error/PendingApprovalPage';

// Public pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

// Protected pages
import StudentDashboard from './pages/StudentDashboard';
import AlumniDashboard from './pages/AlumniDashboard';
import ManagementDashboard from './pages/ManagementDashboard';
import AlumniListing from './pages/AlumniListing';
import MentorshipPage from './pages/MentorshipPage';
import ResumeAnalysisPage from './pages/ResumeAnalysisPage';
import EventsPage from './pages/EventsPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import CareerRecommendationPage from './pages/CareerRecommendationPage';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Error pages */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/pending-approval" element={<PendingApprovalPage />} />

          {/* Student-only routes */}
          <Route
            path="/student/dashboard"
            element={<ProtectedRoute element={<StudentDashboard />} allowedRoles={['student']} />}
          />
          <Route
            path="/alumni-listing"
            element={<ProtectedRoute element={<AlumniListing />} allowedRoles={['student']} />}
          />
          <Route
            path="/resume-analysis"
            element={
              <ProtectedRoute element={<ResumeAnalysisPage />} allowedRoles={['student']} />
            }
          />
          <Route
            path="/career-recommendation"
            element={
              <ProtectedRoute
                element={<CareerRecommendationPage />}
                allowedRoles={['student']}
              />
            }
          />

          {/* Alumni-only routes */}
          <Route
            path="/alumni/dashboard"
            element={
              <ProtectedRoute
                element={<AlumniDashboard />}
                allowedRoles={['alumni']}
                requiredApproval={true}
              />
            }
          />

          {/* Shared authenticated routes (any authenticated user) */}
          <Route
            path="/mentorship"
            element={<ProtectedRoute element={<MentorshipPage />} />}
          />
          <Route path="/events" element={<ProtectedRoute element={<EventsPage />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
          <Route path="/settings" element={<ProtectedRoute element={<SettingsPage />} />} />

          {/* Admin-only routes */}
          <Route
            path="/management/dashboard"
            element={
              <ProtectedRoute element={<ManagementDashboard />} allowedRoles={['admin']} />
            }
          />
          <Route
            path="/reports"
            element={<ProtectedRoute element={<ReportsPage />} allowedRoles={['admin']} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
