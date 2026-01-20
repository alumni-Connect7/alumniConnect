import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
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
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/alumni/dashboard" element={<AlumniDashboard />} />
        <Route path="/management/dashboard" element={<ManagementDashboard />} />
        <Route path="/alumni-listing" element={<AlumniListing />} />
        <Route path="/mentorship" element={<MentorshipPage />} />
        <Route path="/resume-analysis" element={<ResumeAnalysisPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/career-recommendation" element={<CareerRecommendationPage />} />
      </Routes>
    </Router>
  );
}
