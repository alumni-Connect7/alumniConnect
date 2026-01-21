import { useEffect, useMemo, useState } from 'react';
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
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import ChatbotWidget from '../components/ChatbotWidget';
import { eventsAPI, jobAPI, profileAPI, successStoryAPI, EventItem, JobPost, Profile, SuccessStory } from '../../api/endpoints';
import { handleAPIError } from '../../utils/errorHandler';
import { useAuth } from '../../hooks/useAuth';

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [directory, setDirectory] = useState<Array<{ user: any; profile?: Profile }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const [eventsRes, jobsRes, storiesRes, directoryRes] = await Promise.all([
          eventsAPI.list({ upcoming: true }),
          jobAPI.list({ status: 'open' }),
          successStoryAPI.list(),
          profileAPI.directory(),
        ]);

        setEvents(eventsRes.data.events || []);
        setJobs(jobsRes.data.jobs || []);
        setStories(storiesRes.data.stories || []);
        setDirectory(directoryRes.data.records || []);
      } catch (err) {
        const { message } = handleAPIError(err);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const stats = useMemo(
    () => [
      {
        label: 'Alumni',
        value: directory.length.toString(),
        icon: <Users className="w-6 h-6" />,
        color: 'bg-blue-500',
        path: '/alumni-listing',
      },
      {
        label: 'Upcoming Events',
        value: events.length.toString(),
        icon: <Calendar className="w-6 h-6" />,
        color: 'bg-purple-500',
        path: '/events',
      },
      {
        label: 'Open Opportunities',
        value: jobs.length.toString(),
        icon: <TrendingUp className="w-6 h-6" />,
        color: 'bg-orange-500',
        path: '/success-stories',
      },
    ],
    [directory.length, events.length, jobs.length]
  );

  const upcomingEvents = useMemo(() => events.slice(0, 3), [events]);
  const openJobs = useMemo(() => jobs.slice(0, 3), [jobs]);

  return (
    <DashboardLayout role="student" userName={user?.name || 'Student'}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl mb-2 text-slate-900">Welcome Back, {user?.name || 'Student'}!</h1>
          <p className="text-slate-600">Here's your dashboard overview and recommendations</p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

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
                  <div>Find Alumni</div>
                  <div className="text-xs text-slate-500">Browse approved alumni</div>
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
                  <div className="text-xs text-slate-500">See upcoming sessions</div>
                </div>
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl mb-4 text-slate-900">Recent Updates</h2>
            <div className="space-y-3">
              {stories.slice(0, 3).map((story) => (
                <div key={story._id} className="pb-3 border-b last:border-0 last:pb-0">
                  <p className="text-sm text-slate-700 mb-1">{story.title}</p>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    {new Date(story.createdAt || '').toLocaleDateString()}
                  </div>
                </div>
              ))}
              {!stories.length && <p className="text-sm text-slate-500">No success stories yet.</p>}
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upcoming Events */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl text-slate-900">Upcoming Events</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/events')}>
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event._id}
                  className="p-4 border rounded-lg hover:border-blue-600 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-slate-900">{event.title}</h3>
                      <p className="text-sm text-slate-500">
                        {new Date(event.startDate).toLocaleString()}
                      </p>
                    </div>
                    <Badge variant="outline">{event.audience || 'all'}</Badge>
                  </div>
                  <Button size="sm" variant="outline" className="w-full" onClick={() => navigate('/events')}>
                    Register
                  </Button>
                </div>
              ))}
              {!upcomingEvents.length && <p className="text-sm text-slate-500">No upcoming events.</p>}
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
                  {(directory[0]?.profile?.skills || []).slice(0, 6).map((skill, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-slate-700">{skill.name}</span>
                      <Badge
                        variant={
                          skill.level === 'advanced'
                            ? 'default'
                            : skill.level === 'intermediate'
                            ? 'secondary'
                            : 'outline'
                        }
                      >
                        {skill.level}
                      </Badge>
                    </div>
                  ))}
                  {!directory[0]?.profile?.skills?.length && (
                    <p className="text-sm text-slate-500">Add skills in your profile to see recommendations.</p>
                  )}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Certifications</h3>
                <div className="space-y-2">
                  {(directory[0]?.profile?.certifications || []).slice(0, 5).map((cert, index) => (
                    <div key={index} className="flex items-start gap-3 p-2 rounded border border-slate-200">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900">{cert.name}</p>
                        <p className="text-xs text-slate-500">
                          {cert.issuer || 'Certification'} {cert.year ? `• ${cert.year}` : ''}
                        </p>
                      </div>
                    </div>
                  ))}
                  {!directory[0]?.profile?.certifications?.length && (
                    <p className="text-sm text-slate-500">Add certifications in your profile to enrich recommendations.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Career Recommendations */}
            <div>
              <h2 className="text-xl mb-4 text-slate-900">Predicted Career Paths</h2>
              <div className="space-y-4">
                {openJobs.map((career) => (
                  <div key={career._id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-blue-600" />
                        <h3 className="font-semibold text-slate-900">{career.title}</h3>
                      </div>
                      <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 text-blue-600 fill-blue-600" />
                        <span className="text-sm font-medium text-blue-600">{career.type}</span>
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 mb-3">{career.company}</p>

                    <div className="mb-3">
                      <p className="text-xs font-semibold text-slate-700 mb-1">Location</p>
                      <Badge variant="outline" className="text-xs">
                        {career.location}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-xs text-slate-600">
                        {career.employmentType.replace('-', ' ')} • Status: {career.status}
                      </span>
                      {career.applicationUrl && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(career.applicationUrl, '_blank')}
                        >
                          Apply
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                {!openJobs.length && <p className="text-sm text-slate-500">No open roles right now.</p>}
              </div>
            </div>
          </div>
        </Card>
        <ChatbotWidget />
      </div>
    </DashboardLayout>
  );
}
