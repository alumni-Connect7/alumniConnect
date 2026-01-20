import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users, Building2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto w-full px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-blue-900" />
            <span className="font-semibold text-xl text-slate-900">AlumniConnect</span>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button onClick={() => navigate('/register')}>
              Register
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-poppins font-semibold text-4xl md:text-5xl mb-6 text-slate-900 leading-tight">
            Digital platform for centralized alumni data management and engagement
          </h1>
          <p className="text-lg text-slate-600 mb-4">
            SIH25017 — connecting students, alumni, and institutions
          </p>
          <p className="text-base text-slate-500 mb-10 max-w-2xl mx-auto">
            A comprehensive platform for managing alumni data, facilitating mentorship,
            analyzing career progression, and fostering meaningful connections.
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16">
              <Card className="p-8 hover:shadow-xl transition-transform transform hover:-translate-y-1 cursor-pointer rounded-xl" 
                onClick={() => navigate(`/login?role=student&redirect=${encodeURIComponent('/student/dashboard')}`)}>
            <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-blue-700" />
            </div>
            <h3 className="text-2xl mb-3 text-slate-900">Student</h3>
            <p className="text-slate-600 mb-6">
              Connect with alumni mentors, get career guidance, and improve your resume
            </p>
            <Button className="w-full bg-gradient-to-r from-[#0b5fff] to-[#06b6d4] text-white hover:opacity-95">
              Access Student Portal
            </Button>
          </Card>

              <Card className="p-8 hover:shadow-xl transition-transform transform hover:-translate-y-1 cursor-pointer rounded-xl" 
                onClick={() => navigate(`/login?role=alumni&redirect=${encodeURIComponent('/alumni/dashboard')}`)}>
            <div className="w-16 h-16 bg-gradient-to-br from-teal-50 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-2xl mb-3 text-slate-900">Alumni</h3>
            <p className="text-slate-600 mb-6">
              Give back to your alma mater, mentor students, and stay connected with your network
            </p>
            <Button className="w-full bg-gradient-to-r from-[#06b6d4] to-[#0ea5a4] text-white hover:opacity-95">
              Access Alumni Portal
            </Button>
          </Card>

              <Card className="p-8 hover:shadow-xl transition-transform transform hover:-translate-y-1 cursor-pointer rounded-xl" 
                onClick={() => navigate(`/login?role=management&redirect=${encodeURIComponent('/management/dashboard')}`)}>
            <div className="w-16 h-16 bg-gradient-to-br from-green-50 to-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl mb-3 text-slate-900">College Management</h3>
            <p className="text-slate-600 mb-6">
              Track alumni engagement, generate reports, and manage institutional data
            </p>
            <Button className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] text-white hover:opacity-95">
              Access Management Portal
            </Button>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="w-6 h-6" />
            <span className="font-semibold text-lg">AlumniConnect</span>
          </div>
          <p className="text-slate-400 mb-2">Smart India Hackathon 2025 - Problem Statement SIH25017</p>
          <p className="text-slate-500 text-sm">
            © 2025 AlumniConnect. All rights reserved. | Built for educational institutions
          </p>
        </div>
      </footer>
    </div>
  );
}
