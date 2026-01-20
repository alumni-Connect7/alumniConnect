import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Users, TrendingUp, Calendar, FileText, Download } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ManagementDashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Alumni', value: '5,234', change: '+12%', icon: <Users className="w-6 h-6" />, color: 'bg-green-500' },
    { label: 'Active Alumni', value: '2,156', change: '+8%', icon: <TrendingUp className="w-6 h-6" />, color: 'bg-blue-500' },
    { label: 'Events This Year', value: '48', change: '+5', icon: <Calendar className="w-6 h-6" />, color: 'bg-purple-500' },
    { label: 'Avg ATS Score', value: '76%', change: '+4%', icon: <FileText className="w-6 h-6" />, color: 'bg-orange-500' },
  ];

  const engagementData = [
    { month: 'Jul', alumni: 1850, students: 2100 },
    { month: 'Aug', alumni: 1920, students: 2240 },
    { month: 'Sep', alumni: 2010, students: 2420 },
    { month: 'Oct', alumni: 2080, students: 2520 },
    { month: 'Nov', alumni: 2120, students: 2600 },
    { month: 'Dec', alumni: 2156, students: 2680 },
  ];

  const departmentData = [
    { name: 'Computer Science', value: 1840, color: '#3b82f6' },
    { name: 'Electrical Engineering', value: 1245, color: '#14b8a6' },
    { name: 'Mechanical Engineering', value: 1028, color: '#8b5cf6' },
    { name: 'Civil Engineering', value: 821, color: '#f59e0b' },
    { name: 'Others', value: 300, color: '#6b7280' },
  ];

  const atsScoreData = [
    { range: '0-20', count: 45 },
    { range: '21-40', count: 128 },
    { range: '41-60', count: 342 },
    { range: '61-80', count: 856 },
    { range: '81-100', count: 423 },
  ];

  return (
    <DashboardLayout role="management" userName="Dr. Admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2 text-slate-900">Management Dashboard</h1>
            <p className="text-slate-600">Comprehensive alumni engagement analytics</p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700" onClick={() => navigate('/reports')}>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                  <div className={`${stat.color.replace('bg-', 'text-')}`}>{stat.icon}</div>
                </div>
                <Badge className="bg-green-100 text-green-700 border-0">{stat.change}</Badge>
              </div>
              <div className="text-3xl mb-1 text-slate-900">{stat.value}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl mb-4 text-slate-900">Alumni Engagement Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="alumni" stroke="#14b8a6" strokeWidth={2} name="Active Alumni" />
                <Line type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={2} name="Active Students" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl mb-4 text-slate-900">Alumni by Department</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl mb-4 text-slate-900">Resume ATS Score Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={atsScoreData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#16a34a" name="Number of Students" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="font-medium mb-2 text-slate-900">Mentorship Activity</h3>
            <div className="text-3xl mb-1 text-slate-900">342</div>
            <p className="text-sm text-slate-600">Active mentorship connections</p>
            <Button variant="link" className="p-0 mt-2" onClick={() => navigate('/mentorship')}>View Details →</Button>
          </Card>

          <Card className="p-6">
            <h3 className="font-medium mb-2 text-slate-900">Event Participation</h3>
            <div className="text-3xl mb-1 text-slate-900">89%</div>
            <p className="text-sm text-slate-600">Average attendance rate</p>
            <Button variant="link" className="p-0 mt-2" onClick={() => navigate('/events')}>View Events →</Button>
          </Card>

          <Card className="p-6">
            <h3 className="font-medium mb-2 text-slate-900">Career Outcomes</h3>
            <div className="text-3xl mb-1 text-slate-900">94%</div>
            <p className="text-sm text-slate-600">Placement success rate</p>
            <Button variant="link" className="p-0 mt-2" onClick={() => navigate('/reports')}>View Report →</Button>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Badge({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <span className={`px-2 py-1 rounded text-xs ${className}`}>{children}</span>;
}
