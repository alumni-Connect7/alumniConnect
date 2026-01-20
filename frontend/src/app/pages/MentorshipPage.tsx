import DashboardLayout from '../components/DashboardLayout';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { UserCircle, Star, CheckCircle2, Clock, XCircle } from 'lucide-react';

export default function MentorshipPage() {
  const recommendedMentors = [
    { name: 'Dr. Seema Nair', role: 'Senior ML Engineer', company: 'TechSolutions Pvt Ltd', match: 95, availability: 'Available' },
    { name: 'Manish Mehta', role: 'Product Manager', company: 'Innovatech', match: 88, availability: 'Limited' },
    { name: 'Priya', role: 'Full Stack Developer', company: 'Amazon India', match: 82, availability: 'Available' },
  ];

  const activeMentorships = [
    { mentor: 'Dr. Seema Nair', started: 'Dec 1, 2024', sessions: 3, nextSession: 'Jan 5, 2025' },
    { mentor: 'Amit Sharma', started: 'Nov 15, 2024', sessions: 5, nextSession: 'Jan 3, 2025' },
  ];

  const pendingRequests = [
    { mentor: 'Kavya Iyer', requestedOn: 'Dec 20, 2024', status: 'pending' },
    { mentor: 'Rakesh', requestedOn: 'Dec 22, 2024', status: 'pending' },
  ];

  return (
    <DashboardLayout role="student" userName="Nikhil Satya">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl mb-2 text-slate-900">Mentorship Hub</h1>
          <p className="text-slate-600">Connect with experienced alumni for career guidance</p>
        </div>

        <Tabs defaultValue="recommended" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="active">Active ({activeMentorships.length})</TabsTrigger>
            <TabsTrigger value="requests">Requests ({pendingRequests.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="recommended" className="space-y-4 mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedMentors.map((mentor, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-900 to-teal-600 rounded-full flex items-center justify-center text-white text-lg">
                      {mentor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{mentor.match}%</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1">{mentor.name}</h3>
                  <p className="text-sm text-slate-600 mb-1">{mentor.role}</p>
                  <p className="text-sm text-slate-500 mb-4">{mentor.company}</p>
                  <Badge className={mentor.availability === 'Available' ? 'bg-green-100 text-green-700 border-0' : 'bg-yellow-100 text-yellow-700 border-0'}>
                    {mentor.availability}
                  </Badge>
                  <Button className="w-full mt-4">Request Mentorship</Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active" className="space-y-4 mt-6">
            {activeMentorships.map((mentorship, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-teal-600 rounded-full flex items-center justify-center text-white">
                      <UserCircle className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">{mentorship.mentor}</h3>
                      <div className="grid sm:grid-cols-3 gap-4 mt-3 text-sm">
                        <div>
                          <p className="text-slate-500">Started</p>
                          <p className="text-slate-900">{mentorship.started}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Sessions</p>
                          <p className="text-slate-900">{mentorship.sessions}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Next Session</p>
                          <p className="text-slate-900">{mentorship.nextSession}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="requests" className="space-y-4 mt-6">
            {pendingRequests.map((request, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Clock className="w-10 h-10 text-yellow-600" />
                    <div>
                      <h3 className="font-semibold text-slate-900">{request.mentor}</h3>
                      <p className="text-sm text-slate-600">Requested on {request.requestedOn}</p>
                    </div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-700 border-0">Pending</Badge>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
