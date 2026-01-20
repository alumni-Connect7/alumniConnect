import { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { GraduationCap, Mail, Lock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState<string>('student');
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const r = params.get('role');
    const redirect = params.get('redirect');
    if (r) setRole(r);
    if (redirect) setRedirectTo(redirect);
  }, [location.search]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // After successful login, navigate to redirect param if present, otherwise go by role
    if (redirectTo) {
      navigate(redirectTo);
      return;
    }

    if (role === 'student') {
      navigate('/student/dashboard');
    } else if (role === 'alumni') {
      navigate('/alumni/dashboard');
    } else {
      navigate('/management/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="w-10 h-10 text-blue-900" />
            <span className="font-semibold text-2xl text-slate-900">AlumniConnect</span>
          </div>
          <h1 className="text-3xl mb-2 text-slate-900">Welcome Back</h1>
          <p className="text-slate-600">Sign in to access your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="role">Select Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="alumni">Alumni</SelectItem>
                <SelectItem value="management">College Management</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <Input 
                id="email" 
                type="email" 
                placeholder="your.email@example.com" 
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded" />
              <span className="text-slate-600">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-sm text-blue-900 hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800">
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-900 hover:underline">
              Register here
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-sm text-slate-500 hover:text-slate-700">
            ← Back to home
          </Link>
        </div>
      </Card>
    </div>
  );
}
