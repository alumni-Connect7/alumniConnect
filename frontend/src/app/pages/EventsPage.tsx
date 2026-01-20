import DashboardLayout from '../components/DashboardLayout';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';

export default function EventsPage() {
  const upcomingEvents = [
    { title: 'Tech Career Fair 2025', date: 'Jan 15, 2025', time: '10:00 AM', location: 'Main Auditorium', attendees: 234, type: 'Career' },
    { title: 'Alumni Networking Night', date: 'Jan 20, 2025', time: '6:00 PM', location: 'Student Center', attendees: 156, type: 'Networking' },
    { title: 'Resume Workshop', date: 'Jan 25, 2025', time: '2:00 PM', location: 'Room 301', attendees: 89, type: 'Workshop' },
    { title: 'Industry Panel Discussion', date: 'Feb 5, 2025', time: '4:00 PM', location: 'Conference Hall', attendees: 198, type: 'Panel' },
  ];

  const pastEvents = [
    { title: 'Annual Alumni Meet 2024', date: 'Dec 15, 2024', attendees: 450, type: 'Social' },
    { title: 'Coding Bootcamp', date: 'Nov 20, 2024', attendees: 120, type: 'Workshop' },
  ];

  return (
    <DashboardLayout role="student" userName="Nikhil Satya">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl mb-2 text-slate-900">Events</h1>
          <p className="text-slate-600">Discover and participate in alumni and college events</p>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4 mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingEvents.map((event, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <Badge>{event.type}</Badge>
                  </div>
                  <h3 className="text-xl mb-3 text-slate-900">{event.title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Users className="w-4 h-4" />
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>
                  <Button className="w-full">Register Now</Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past" className="space-y-4 mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {pastEvents.map((event, index) => (
                <Card key={index} className="p-6">
                  <Badge variant="secondary">{event.type}</Badge>
                  <h3 className="text-xl my-3 text-slate-900">{event.title}</h3>
                  <p className="text-sm text-slate-600 mb-2">Date: {event.date}</p>
                  <p className="text-sm text-slate-600 mb-4">Attendees: {event.attendees}</p>
                  <Button variant="outline" className="w-full">View Summary</Button>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
