import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Users, MessageSquare, Calendar, Award, CheckCircle2, ArrowRight, AlertCircle, Trash } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { eventsAPI, jobAPI, EventItem, JobPost } from '../../api/endpoints';
import { handleAPIError } from '../../utils/errorHandler';
import { useAuth } from '../../hooks/useAuth';

export default function AlumniDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [events, setEvents] = useState<EventItem[]>([]);
  const [myJobs, setMyJobs] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    company: '',
    location: 'Remote',
    type: 'job' as JobPost['type'],
    employmentType: 'full-time' as JobPost['employmentType'],
    applicationUrl: '',
  });

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const [eventsRes, jobsRes] = await Promise.all([
          eventsAPI.list({ upcoming: true }),
          jobAPI.list({ status: 'open' }),
        ]);

        setEvents(eventsRes.data.events || []);
        const filtered = (jobsRes.data.jobs || []).filter(
          (job) => job.createdBy?._id === user?._id
        );
        setMyJobs(filtered);
      } catch (err) {
        const { message } = handleAPIError(err);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user?._id]);

  const stats = useMemo(
    () => [
      { label: 'Mentorship Requests', value: '—', icon: <MessageSquare className="w-6 h-6" />, color: 'bg-teal-500', path: '/mentorship' },
      { label: 'Active Postings', value: myJobs.length.toString(), icon: <Users className="w-6 h-6" />, color: 'bg-blue-500', path: '/mentorship' },
      { label: 'Upcoming Events', value: events.length.toString(), icon: <Calendar className="w-6 h-6" />, color: 'bg-purple-500', path: '/events' },
      { label: 'Profile Strength', value: 'Live', icon: <Award className="w-6 h-6" />, color: 'bg-orange-500', path: '/profile' },
    ],
    [events.length, myJobs.length]
  );

  const handleCreateJob = async () => {
    try {
      setError(null);
      await jobAPI.create(newJob);
      const refreshed = await jobAPI.list({ status: 'open' });
      const filtered = (refreshed.data.jobs || []).filter((job) => job.createdBy?._id === user?._id);
      setMyJobs(filtered);
      setNewJob({ title: '', description: '', company: '', location: 'Remote', type: 'job', employmentType: 'full-time', applicationUrl: '' });
    } catch (err) {
      const { message } = handleAPIError(err);
      setError(message);
    }
  };

  const handleCloseJob = async (id: string) => {
    try {
      await jobAPI.update(id, { status: 'closed' });
      setMyJobs((prev) => prev.map((job) => (job._id === id ? { ...job, status: 'closed' } : job)));
    } catch (err) {
      const { message } = handleAPIError(err);
      setError(message);
    }
  };

  const handleDeleteJob = async (id: string) => {
    try {
      await jobAPI.remove(id);
      setMyJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (err) {
      const { message } = handleAPIError(err);
      setError(message);
    }
  };

  const upcomingEvents = useMemo(() => events.slice(0, 3), [events]);

  return (
    <DashboardLayout role="alumni" userName={user?.name || 'Alumni'}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl mb-2 text-slate-900">Welcome Back, {user?.name || 'Alumni'}!</h1>
          <p className="text-slate-600">Post opportunities and engage with students</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

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
              <p className="text-sm text-slate-600">Keep your profile updated for better matches</p>
            </div>
          </Card>

          <Card className="p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl text-slate-900">Your Job & Internship Posts</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/mentorship')}>
                View Mentorship <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-3">
              {myJobs.map((job) => (
                <div key={job._id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-slate-900">{job.title}</h3>
                      <p className="text-sm text-slate-600">{job.company}</p>
                      <p className="text-xs text-slate-500">{job.location}</p>
                    </div>
                    <Badge variant={job.status === 'open' ? 'secondary' : 'outline'}>{job.status}</Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-3 line-clamp-2">{job.description}</p>
                  <div className="flex gap-2">
                    {job.status === 'open' && (
                      <Button size="sm" className="flex-1 bg-teal-600 hover:bg-teal-700" onClick={() => handleCloseJob(job._id)}>
                        Close Posting
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => navigate('/mentorship')}>
                      View Mentors
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDeleteJob(job._id)}>
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {!myJobs.length && (
                <p className="text-sm text-slate-500">No active postings yet. Create one below.</p>
              )}
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl mb-4 text-slate-900">Create a Job/Internship Posting</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-3">
            <input
              className="border rounded px-3 py-2"
              placeholder="Title"
              value={newJob.title}
              onChange={(e) => setNewJob((prev) => ({ ...prev, title: e.target.value }))}
            />
            <input
              className="border rounded px-3 py-2"
              placeholder="Company"
              value={newJob.company}
              onChange={(e) => setNewJob((prev) => ({ ...prev, company: e.target.value }))}
            />
            <input
              className="border rounded px-3 py-2"
              placeholder="Location"
              value={newJob.location}
              onChange={(e) => setNewJob((prev) => ({ ...prev, location: e.target.value }))}
            />
            <input
              className="border rounded px-3 py-2"
              placeholder="Application URL"
              value={newJob.applicationUrl}
              onChange={(e) => setNewJob((prev) => ({ ...prev, applicationUrl: e.target.value }))}
            />
          </div>
          <textarea
            className="border rounded px-3 py-2 w-full h-24"
            placeholder="Role description"
            value={newJob.description}
            onChange={(e) => setNewJob((prev) => ({ ...prev, description: e.target.value }))}
          />
          <div className="flex gap-3 mt-3">
            <Button onClick={handleCreateJob} disabled={loading || !newJob.title || !newJob.description || !newJob.company}>
              Post Opportunity
            </Button>
            <Button variant="outline" onClick={() => navigate('/events')}>
              Promote in Events
            </Button>
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl mb-4 text-slate-900">Upcoming Events</h2>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event._id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-slate-900">{event.title}</h3>
                      <p className="text-sm text-slate-500">{new Date(event.startDate).toLocaleDateString()}</p>
                    </div>
                    <Badge>{event.audience || 'all'}</Badge>
                  </div>
                </div>
              ))}
              {!upcomingEvents.length && <p className="text-sm text-slate-500">No upcoming events.</p>}
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
