import { useEffect, useMemo, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Calendar, MapPin, Users, Clock, AlertCircle } from 'lucide-react';
import { eventsAPI, EventItem } from '../../api/endpoints';
import { handleAPIError } from '../../utils/errorHandler';
import { useAuth } from '../../hooks/useAuth';

export default function EventsPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    startDate: '',
    location: '',
    audience: 'all',
  });

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await eventsAPI.list();
        setEvents(res.data.events || []);
      } catch (err) {
        const { message } = handleAPIError(err);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const upcomingEvents = useMemo(() => events.filter((e) => new Date(e.startDate) >= new Date()), [events]);
  const pastEvents = useMemo(() => events.filter((e) => new Date(e.startDate) < new Date()), [events]);

  const handleCreate = async () => {
    try {
      await eventsAPI.create(newEvent);
      const refreshed = await eventsAPI.list();
      setEvents(refreshed.data.events || []);
      setNewEvent({ title: '', description: '', startDate: '', location: '', audience: 'all' });
    } catch (err) {
      const { message } = handleAPIError(err);
      setError(message);
    }
  };

  return (
    <DashboardLayout role={user?.role || 'student'} userName={user?.name || 'User'}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl mb-2 text-slate-900">Events</h1>
          <p className="text-slate-600">Discover and participate in alumni and college events</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        {user?.role === 'admin' && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-slate-900">Post a New Event</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-3">
              <input
                className="border rounded px-3 py-2"
                placeholder="Title"
                value={newEvent.title}
                onChange={(e) => setNewEvent((prev) => ({ ...prev, title: e.target.value }))}
              />
              <input
                className="border rounded px-3 py-2"
                placeholder="Location"
                value={newEvent.location}
                onChange={(e) => setNewEvent((prev) => ({ ...prev, location: e.target.value }))}
              />
              <input
                type="datetime-local"
                className="border rounded px-3 py-2"
                value={newEvent.startDate}
                onChange={(e) => setNewEvent((prev) => ({ ...prev, startDate: e.target.value }))}
              />
              <select
                className="border rounded px-3 py-2"
                value={newEvent.audience}
                onChange={(e) => setNewEvent((prev) => ({ ...prev, audience: e.target.value }))}
              >
                <option value="all">All</option>
                <option value="student">Students</option>
                <option value="alumni">Alumni</option>
              </select>
            </div>
            <textarea
              className="border rounded px-3 py-2 w-full h-24"
              placeholder="Description"
              value={newEvent.description}
              onChange={(e) => setNewEvent((prev) => ({ ...prev, description: e.target.value }))}
            />
            <div className="flex justify-end mt-3">
              <Button onClick={handleCreate} disabled={!newEvent.title || !newEvent.description || !newEvent.startDate || !newEvent.location}>
                Create Event
              </Button>
            </div>
          </Card>
        )}

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4 mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event._id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <Badge>{event.audience || 'all'}</Badge>
                  </div>
                  <h3 className="text-xl mb-3 text-slate-900">{event.title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(event.startDate).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Users className="w-4 h-4" />
                      <span>Hosted by {event.createdBy?.name || 'Admin'}</span>
                    </div>
                  </div>
                  <Button className="w-full">Register Now</Button>
                </Card>
              ))}
              {!upcomingEvents.length && <p className="text-sm text-slate-500">No upcoming events.</p>}
            </div>
          </TabsContent>

          <TabsContent value="past" className="space-y-4 mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {pastEvents.map((event) => (
                <Card key={event._id} className="p-6">
                  <Badge variant="secondary">{event.audience || 'all'}</Badge>
                  <h3 className="text-xl my-3 text-slate-900">{event.title}</h3>
                  <p className="text-sm text-slate-600 mb-2">Date: {new Date(event.startDate).toLocaleDateString()}</p>
                  <p className="text-sm text-slate-600 mb-4">Location: {event.location}</p>
                  <Button variant="outline" className="w-full">View Summary</Button>
                </Card>
              ))}
              {!pastEvents.length && <p className="text-sm text-slate-500">No past events yet.</p>}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
