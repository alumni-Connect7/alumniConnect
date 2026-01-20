import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';

export default function ForgotPasswordPage() {
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSent(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="w-10 h-10 text-blue-900" />
            <span className="font-semibold text-2xl text-slate-900">AlumniConnect</span>
          </div>
          <h1 className="text-3xl mb-2 text-slate-900">Forgot Password?</h1>
          <p className="text-slate-600">
            {emailSent 
              ? "Check your email for reset instructions" 
              : "Enter your email to receive reset instructions"}
          </p>
        </div>

        {emailSent ? (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <div className="space-y-2">
              <p className="text-slate-700">
                Password reset instructions have been sent to your email address.
              </p>
              <p className="text-sm text-slate-500">
                Please check your inbox and follow the link to reset your password.
              </p>
            </div>
            <Link to="/login">
              <Button className="w-full bg-blue-900 hover:bg-blue-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
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
              <p className="text-xs text-slate-500">
                Enter the email address associated with your account
              </p>
            </div>

            <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800">
              Send Reset Instructions
            </Button>

            <Link to="/login">
              <Button type="button" variant="ghost" className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Button>
            </Link>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-slate-500 hover:text-slate-700">
            ← Back to home
          </Link>
        </div>
      </Card>
    </div>
  );
}
