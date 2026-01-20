import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Users, MessageSquare, Calendar, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';

export default function AlumniDashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Mentorship Requests', value: '8', icon: <MessageSquare className="w-6 h-6" />, color: 'bg-teal-500', path: '/mentorship' },
    { label: 'Active Mentees', value: '3', icon: <Users className="w-6 h-6" />, color: 'bg-blue-500', path: '/mentorship' },
    { label: 'Events Hosted', value: '5', icon: <Calendar className="w-6 h-6" />, color: 'bg-purple-500', path: '/events' },
    { label: 'Impact Score', value: '92%', icon: <Award className="w-6 h-6" />, color: 'bg-orange-500', path: '/profile' },
  ];

  const mentorshipRequests = [
    { name: 'Rahul Sharma', program: 'B.Tech CS', year: '3rd Year', interest: 'Machine Learning' },
    { name: 'Priya Singh', program: 'B.Tech EE', year: '2nd Year', interest: 'Product Management' },
    { name: 'Amit Kumar', program: 'M.Tech CS', year: '1st Year', interest: 'Cloud Architecture' },
  ];

  const upcomingEvents = [
    { title: 'Alumni Meet 2025', date: 'Feb 10, 2025', role: 'Speaker' },
    { title: 'Career Guidance Session', date: 'Feb 15, 2025', role: 'Mentor' },
  ];

  return (
    <DashboardLayout role="alumni" userName="Sarah Johnson">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl mb-2 text-slate-900">Welcome Back, Sarah!</h1>
          <p className="text-slate-600">Continue making an impact on student careers</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(stat.path)}>
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                  <div className={`${stat.color.replace('bg-', 'text-')}`}>{stat.icon}</div>
                </div>
              </div>
              <div className="text-3xl mb-1 text-slate-900">{stat.value}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <h2 className="text-xl mb-4 text-slate-900">Profile Completeness</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-sm text-slate-700">Basic Information</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-sm text-slate-700">Work Experience</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-sm text-slate-700">Skills & Expertise</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-slate-300 rounded-full" />
                <span className="text-sm text-slate-500">Availability Preferences</span>
              </div>
              <Progress value={75} className="h-2" />
              <p className="text-sm text-slate-600">75% Complete</p>
            </div>
          </Card>

          <Card className="p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl text-slate-900">Pending Mentorship Requests</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/mentorship')}>
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-3">
              {mentorshipRequests.map((request, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-slate-900">{request.name}</h3>
                      <p className="text-sm text-slate-600">{request.program} • {request.year}</p>
                    </div>
                    <Badge variant="secondary">{request.interest}</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-teal-600 hover:bg-teal-700">Accept</Button>
                    <Button size="sm" variant="outline" className="flex-1">Decline</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl mb-4 text-slate-900">Upcoming Events</h2>
            <div className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-slate-900">{event.title}</h3>
                      <p className="text-sm text-slate-500">{event.date}</p>
                    </div>
                    <Badge>{event.role}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl mb-4 text-slate-900">Resume Analysis Summary</h2>
            <p className="text-slate-600 mb-4">Help students improve their resumes and career prospects</p>
            <Button className="w-full bg-teal-600 hover:bg-teal-700" onClick={() => navigate('/resume-analysis')}>
              View Analysis Tools
            </Button>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
