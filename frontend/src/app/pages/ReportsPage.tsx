import DashboardLayout from '../components/DashboardLayout';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Download, FileText, Users, Calendar, TrendingUp } from 'lucide-react';

export default function ReportsPage() {
  const reports = [
    { title: 'Alumni Engagement Report', description: 'Comprehensive alumni activity and engagement metrics', icon: <Users className="w-6 h-6" />, format: 'PDF/CSV' },
    { title: 'Resume ATS Score Distribution', description: 'Student resume scores and improvement trends', icon: <FileText className="w-6 h-6" />, format: 'PDF/CSV' },
    { title: 'Event Participation Report', description: 'Event attendance and participation statistics', icon: <Calendar className="w-6 h-6" />, format: 'PDF/CSV' },
    { title: 'Mentorship Activity Report', description: 'Active mentorships and success metrics', icon: <TrendingUp className="w-6 h-6" />, format: 'PDF/CSV' },
  ];

  return (
    <DashboardLayout role="management" userName="Dr. Admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2 text-slate-900">Reports & Analytics</h1>
            <p className="text-slate-600">Generate and export institutional reports</p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {reports.map((report, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                  {report.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg mb-2 text-slate-900">{report.title}</h3>
                  <p className="text-sm text-slate-600 mb-4">{report.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Format: {report.format}</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Preview</Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
