import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  UserCircle, 
  ArrowRight,
  Star,
  Clock,
  Briefcase,
  CheckCircle
} from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import ChatbotWidget from '../components/ChatbotWidget';

export default function StudentDashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Mentors Available', value: '245', icon: <Users className="w-6 h-6" />, color: 'bg-blue-500', path: '/alumni-listing' },
    { label: 'Upcoming Events', value: '12', icon: <Calendar className="w-6 h-6" />, color: 'bg-purple-500', path: '/events' },
    { label: 'Career Matches', value: '8', icon: <TrendingUp className="w-6 h-6" />, color: 'bg-orange-500', path: '/mentorship' },
  ];

  const recommendedMentors = [
    { name: 'Dr. Seema Nair', role: 'Senior ML Engineer', company: 'TechSolutions Pvt Ltd', expertise: 'Machine Learning, AI', matchScore: 95 },
    { name: 'Manish Mehta', role: 'Product Manager', company: 'Innovatech', expertise: 'Product Strategy, UX', matchScore: 88 },
    { name: 'Priya', role: 'Full Stack Developer', company: 'Amazon India', expertise: 'Web Development, Cloud', matchScore: 82 },
  ];

  const upcomingEvents = [
    { title: 'Tech Career Fair 2025', date: 'Jan 15, 2025', type: 'Career' },
    { title: 'Alumni Networking Night', date: 'Jan 20, 2025', type: 'Networking' },
    { title: 'Resume Workshop', date: 'Jan 25, 2025', type: 'Workshop' },
  ];

  const notifications = [
    { text: 'New mentor match found based on your profile', time: '2 hours ago', type: 'success' },
    { text: 'Resume analysis completed - ATS score improved!', time: '5 hours ago', type: 'info' },
    { text: 'Event registration deadline approaching', time: '1 day ago', type: 'warning' },
  ];

  const studentSkills = [
    { name: 'Python', level: 'Advanced' },
    { name: 'JavaScript', level: 'Intermediate' },
    { name: 'React', level: 'Advanced' },
    { name: 'Machine Learning', level: 'Beginner' },
    { name: 'Data Analysis', level: 'Intermediate' },
    { name: 'Problem Solving', level: 'Advanced' },
  ];

  const certifications = [
    { name: 'AWS Solutions Architect Associate', issuer: 'Amazon Web Services', date: '2024' },
    { name: 'Google Cloud Professional Data Engineer', issuer: 'Google Cloud', date: '2023' },
    { name: 'Python for Data Science', issuer: 'Coursera', date: '2024' },
  ];

  const careerRecommendations = [
    { 
      title: 'Full Stack Developer', 
      matchScore: 92, 
      description: 'Excellent match based on your JavaScript, React, and Python skills',
      requiredSkills: ['JavaScript', 'React', 'Node.js', 'Database Design'],
      averageSalary: '12-18 LPA'
    },
    { 
      title: 'Data Scientist', 
      matchScore: 85, 
      description: 'Strong potential with your Python and Data Analysis background',
      requiredSkills: ['Python', 'Machine Learning', 'Statistics', 'SQL'],
      averageSalary: '15-22 LPA'
    },
    { 
      title: 'Cloud Solutions Architect', 
      matchScore: 78, 
      description: 'Your AWS certification and technical skills align well with this role',
      requiredSkills: ['Cloud Platforms', 'System Design', 'DevOps', 'Networking'],
      averageSalary: '18-28 LPA'
    },
  ];

  return (
    <DashboardLayout role="student" userName="Nikhil Satya">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl mb-2 text-slate-900">Welcome Back, Nikhil!</h1>
          <p className="text-slate-600">Here's your dashboard overview and recommendations</p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(stat.path)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                  <div className={`${stat.color.replace('bg-', 'text-')}`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
              <div className="text-3xl mb-1 text-slate-900">{stat.value}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="p-6 lg:col-span-2">
            <h2 className="text-xl mb-4 text-slate-900">Quick Actions</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="justify-start h-auto py-4"
                onClick={() => navigate('/alumni-listing')}
              >
                <UserCircle className="w-5 h-5 mr-3 text-blue-600" />
                <div className="text-left">
                  <div>Find a Mentor</div>
                  <div className="text-xs text-slate-500">Browse 245 alumni</div>
                </div>
              </Button>
              

              <Button 
                variant="outline" 
                className="justify-start h-auto py-4"
                onClick={() => navigate('/alumni-listing')}
              >
                <Users className="w-5 h-5 mr-3 text-purple-600" />
                <div className="text-left">
                  <div>View Alumni</div>
                  <div className="text-xs text-slate-500">Connect with alumni</div>
                </div>
              </Button>
              
              <Button 
                variant="outline" 
                className="justify-start h-auto py-4"
                onClick={() => navigate('/events')}
              >
                <Calendar className="w-5 h-5 mr-3 text-orange-600" />
                <div className="text-left">
                  <div>Browse Events</div>
                  <div className="text-xs text-slate-500">12 upcoming</div>
                </div>
              </Button>
            </div>
          </Card>

          {/* Notifications Panel */}
          <Card className="p-6">
            <h2 className="text-xl mb-4 text-slate-900">Recent Updates</h2>
            <div className="space-y-3">
              {notifications.map((notif, index) => (
                <div key={index} className="pb-3 border-b last:border-0 last:pb-0">
                  <p className="text-sm text-slate-700 mb-1">{notif.text}</p>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    {notif.time}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recommended Mentors */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl text-slate-900">Recommended Mentors</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/mentorship')}>
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-4">
              {recommendedMentors.map((mentor, index) => (
                <div key={index} className="p-4 border rounded-lg hover:border-blue-600 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-900">{mentor.name}</h3>
                      <p className="text-sm text-slate-600">{mentor.role}</p>
                      <p className="text-sm text-slate-500">{mentor.company}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium text-slate-900">{mentor.matchScore}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">{mentor.expertise.split(',')[0]}</Badge>
                    <Button size="sm" onClick={() => navigate('/mentorship')}>Connect</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming Events */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl text-slate-900">Upcoming Events</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/events')}>
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="p-4 border rounded-lg hover:border-blue-600 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-slate-900">{event.title}</h3>
                      <p className="text-sm text-slate-500">{event.date}</p>
                    </div>
                    <Badge variant="outline">{event.type}</Badge>
                  </div>
                  <Button size="sm" variant="outline" className="w-full" onClick={() => navigate('/events')}>
                    Register
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Progress Section */}
        <Card className="p-6">
          <h2 className="text-xl mb-4 text-slate-900">Your Career Progress</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-700">Profile Completeness</span>
                <span className="text-sm text-slate-600">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-700">Mentorship Engagement</span>
                <span className="text-sm text-slate-600">60%</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
          </div>
        </Card>

        {/* Career Recommendations Section */}
        <Card className="p-6">
          <div className="grid lg:grid-cols-2 gap-8 mb-6">
            {/* Skills and Certifications */}
            <div>
              <h2 className="text-xl mb-4 text-slate-900">Your Skills & Certifications</h2>
              
              {/* Skills */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Technical Skills</h3>
                <div className="space-y-2">
                  {studentSkills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-slate-700">{skill.name}</span>
                      <Badge variant={skill.level === 'Advanced' ? 'default' : skill.level === 'Intermediate' ? 'secondary' : 'outline'}>
                        {skill.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Certifications</h3>
                <div className="space-y-2">
                  {certifications.map((cert, index) => (
                    <div key={index} className="flex items-start gap-3 p-2 rounded border border-slate-200">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900">{cert.name}</p>
                        <p className="text-xs text-slate-500">{cert.issuer} • {cert.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Career Recommendations */}
            <div>
              <h2 className="text-xl mb-4 text-slate-900">Predicted Career Paths</h2>
              <div className="space-y-4">
                {careerRecommendations.map((career, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-blue-600" />
                        <h3 className="font-semibold text-slate-900">{career.title}</h3>
                      </div>
                      <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 text-blue-600 fill-blue-600" />
                        <span className="text-sm font-medium text-blue-600">{career.matchScore}%</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-600 mb-3">{career.description}</p>
                    
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-slate-700 mb-1">Required Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {career.requiredSkills.map((skill, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-xs text-slate-600">
                        <span className="font-semibold text-slate-900">{career.averageSalary}</span> (Avg.)
                      </span>
                      <Button size="sm" variant="outline" onClick={() => navigate('/career-recommendation')}>Learn More</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
        <ChatbotWidget />
      </div>
    </DashboardLayout>
  );
}
