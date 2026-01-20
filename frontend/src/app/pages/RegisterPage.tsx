import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, User, Mail, Lock, AlertCircle, CheckCircle, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useAuth } from '../../hooks/useAuth';
import { handleAPIError } from '../../utils/errorHandler';

type UserRole = 'student' | 'alumni' | 'admin';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' as UserRole,
    collegeId: '',
    graduationYear: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value as UserRole }));
    setError(null);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Client-side validation
    if (!formData.name || !formData.email || !formData.password || !formData.collegeId) {
      setError('All fields are required');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate graduation year for alumni
    if (formData.role === 'alumni' && !formData.graduationYear) {
      setError('Graduation year is required for alumni');
      return;
    }

    try {
      // Prepare data for backend API
      const registerData: any = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        collegeId: formData.collegeId,
      };

      // Add graduation year if role is alumni
      if (formData.role === 'alumni' && formData.graduationYear) {
        registerData.graduationYear = parseInt(formData.graduationYear);
      }

      // Call register from AuthContext
      await register(registerData);
      
      setSuccess(true);
      
      // Show success message, then redirect
      setTimeout(() => {
        if (formData.role === 'alumni') {
          navigate('/pending-approval');
        } else {
          navigate('/login');
        }
      }, 2000);
    } catch (err) {
      const { message } = handleAPIError(err);
      setError(message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 py-12 px-4">
      <Card className="w-full max-w-xl mx-auto p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="w-10 h-10 text-blue-900" />
            <span className="font-semibold text-2xl text-slate-900">AlumniConnect</span>
          </div>
          <h1 className="text-3xl mb-2 text-slate-900">Create Account</h1>
          <p className="text-slate-600">Join the AlumniConnect community</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-green-700">
              Account created successfully! Redirecting...
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Role Selection */}
          <div className="space-y-2">
            <Label htmlFor="role">Select Role</Label>
            <Select value={formData.role} onValueChange={handleRoleChange} disabled={isLoading}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="alumni">Alumni</SelectItem>
                <SelectItem value="admin">Administrator</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-slate-500">
              {formData.role === 'alumni' && 'Alumni accounts require admin approval before access.'}
              {formData.role === 'student' && 'Students get immediate access to the platform.'}
              {formData.role === 'admin' && 'Admin accounts have full system access.'}
            </p>
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                className="pl-10"
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john.doe@example.com"
                className="pl-10"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>
          </div>

          {/* College ID */}
          <div className="space-y-2">
            <Label htmlFor="collegeId">
              {formData.role === 'student' ? 'Student ID' : 
               formData.role === 'alumni' ? 'Alumni ID' : 
               'Employee ID'}
            </Label>
            <Input
              id="collegeId"
              name="collegeId"
              placeholder={
                formData.role === 'student' ? 'STU2024001' :
                formData.role === 'alumni' ? 'ALM2020001' :
                'EMP001'
              }
              value={formData.collegeId}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>

          {/* Graduation Year - Only for Alumni */}
          {formData.role === 'alumni' && (
            <div className="space-y-2">
              <Label htmlFor="graduationYear">Graduation Year</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input
                  id="graduationYear"
                  name="graduationYear"
                  type="number"
                  placeholder="2023"
                  className="pl-10"
                  min="1950"
                  max={new Date().getFullYear()}
                  value={formData.graduationYear}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>
          )}

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                className="pl-10"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>
            <p className="text-xs text-slate-500">At least 8 characters</p>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="pl-10"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="mt-6">
            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" className="mt-1 rounded" required disabled={isLoading} />
              <span className="text-slate-600">
                I agree to the Terms of Service and Privacy Policy
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full mt-6 bg-blue-900 hover:bg-blue-800"
            disabled={isLoading || success}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span>
                Creating account...
              </span>
            ) : success ? (
              'Account created!'
            ) : (
              'Create Account'
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-900 hover:underline">
              Sign in here
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
