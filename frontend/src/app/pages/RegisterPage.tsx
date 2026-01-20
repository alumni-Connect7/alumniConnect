import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, User, Mail, Lock, Phone, Building } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('student');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 py-12 px-4">
      <Card className="w-full max-w-2xl mx-auto p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="w-10 h-10 text-blue-900" />
            <span className="font-semibold text-2xl text-slate-900">AlumniConnect</span>
          </div>
          <h1 className="text-3xl mb-2 text-slate-900">Create Account</h1>
          <p className="text-slate-600">Join the AlumniConnect community</p>
        </div>

        <Tabs value={selectedRole} onValueChange={setSelectedRole} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="alumni">Alumni</TabsTrigger>
            <TabsTrigger value="management">Management</TabsTrigger>
          </TabsList>

          <form onSubmit={handleRegister}>
            {/* Common Fields */}
            <div className="space-y-4 mb-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <Input id="firstName" placeholder="John" className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input id="email" type="email" placeholder="john.doe@example.com" className="pl-10" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="pl-10" required />
                </div>
              </div>
            </div>

            {/* Role-Specific Fields */}
            <TabsContent value="student" className="space-y-4 mt-0">
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input id="studentId" placeholder="STU-2024-001" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cs">Computer Science</SelectItem>
                    <SelectItem value="ee">Electrical Engineering</SelectItem>
                    <SelectItem value="me">Mechanical Engineering</SelectItem>
                    <SelectItem value="ce">Civil Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year of Study</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">First Year</SelectItem>
                    <SelectItem value="2">Second Year</SelectItem>
                    <SelectItem value="3">Third Year</SelectItem>
                    <SelectItem value="4">Fourth Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="alumni" className="space-y-4 mt-0">
              <div className="space-y-2">
                <Label htmlFor="graduationYear">Graduation Year</Label>
                <Input id="graduationYear" type="number" placeholder="2020" min="1950" max="2024" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Current Company</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input id="company" placeholder="Tech Corp Inc." className="pl-10" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Current Position</Label>
                <Input id="position" placeholder="Software Engineer" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expertise">Area of Expertise</Label>
                <Input id="expertise" placeholder="Machine Learning, Cloud Computing" required />
              </div>
            </TabsContent>

            <TabsContent value="management" className="space-y-4 mt-0">
              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input id="employeeId" placeholder="EMP-2024-001" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="designation">Designation</Label>
                <Input id="designation" placeholder="Dean / HOD / Administrator" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="officeDepartment">Department/Office</Label>
                <Input id="officeDepartment" placeholder="Student Affairs" required />
              </div>
            </TabsContent>

            {/* Password Fields */}
            <div className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input id="password" type="password" placeholder="••••••••" className="pl-10" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input id="confirmPassword" type="password" placeholder="••••••••" className="pl-10" required />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="flex items-start gap-2 text-sm">
                <input type="checkbox" className="mt-1 rounded" required />
                <span className="text-slate-600">
                  I agree to the Terms of Service and Privacy Policy
                </span>
              </label>
            </div>

            <Button type="submit" className="w-full mt-6 bg-blue-900 hover:bg-blue-800">
              Create Account
            </Button>
          </form>
        </Tabs>

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
