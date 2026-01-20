import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Search, MapPin, Briefcase, GraduationCap, Mail } from 'lucide-react';
import { Badge } from '../components/ui/badge';

export default function AlumniListing() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const alumni = [
    {
      name: 'Ram Krishna',
      role: 'Senior ML Engineer',
      company: 'Cognizant',
      location: 'Hyderabad',
      graduation: '2015',
      department: 'Computer Science',
      expertise: ['Machine Learning', 'AI', 'Python'],
      image: 'RG'
    },
    {
      name: 'Rakesh',
      role: 'Product Manager',
      company: 'Innovatech',
      location: 'Bangalore',
      graduation: '2016',
      department: 'Computer Science',
      expertise: ['Product Strategy', 'UX Design', 'Agile'],
      image: 'RS'
    },
    {
      name: 'Priya',
      role: 'Full Stack Developer',
      company: 'Amazon India',
      location: 'Bangalore',
      graduation: '2017',
      department: 'Computer Science',
      expertise: ['React', 'Node.js', 'AWS'],
      image: 'PP'
    },
    {
      name: 'Raghu',
      role: 'Data Scientist',
      company: 'DataWorks',
      location: 'Chennai',
      graduation: '2014',
      department: 'Computer Science',
      expertise: ['Data Analysis', 'Statistics', 'R'],
      image: 'AS'
    },
    {
      name: 'Naveen Reddy',
      role: 'UX Designer',
      company: 'DesignHub',
      location: 'Hyderabad',
      graduation: '2018',
      department: 'Design',
      expertise: ['UI/UX', 'Figma', 'User Research'],
      image: 'NR'
    },
    {
      name: 'Neha',
      role: 'Cloud Architect',
      company: 'CloudServe',
      location: 'Noida',
      graduation: '2013',
      department: 'Computer Science',
      expertise: ['Cloud', 'DevOps', 'Kubernetes'],
      image: 'NS'
    },
  ];

  return (
    <DashboardLayout role="student" userName="Nikhil Satya">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl mb-2 text-slate-900">Alumni Directory</h1>
          <p className="text-slate-600">Connect with {alumni.length} alumni from your institution</p>
        </div>

        {/* Search and Filters */}
        <Card className="p-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search by name, company, or skills..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="cs">Computer Science</SelectItem>
                <SelectItem value="ee">Electrical Engineering</SelectItem>
                <SelectItem value="me">Mechanical Engineering</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Company" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Companies</SelectItem>
                <SelectItem value="google">Google</SelectItem>
                <SelectItem value="microsoft">Microsoft</SelectItem>
                <SelectItem value="amazon">Amazon</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Alumni Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alumni.map((person, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-teal-600 rounded-full flex items-center justify-center text-white text-xl">
                  {person.image}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{person.name}</h3>
                  <p className="text-sm text-slate-600">{person.role}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Briefcase className="w-4 h-4" />
                  <span>{person.company}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="w-4 h-4" />
                  <span>{person.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <GraduationCap className="w-4 h-4" />
                  <span>Class of {person.graduation}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {person.expertise.slice(0, 2).map((skill, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">{skill}</Badge>
                ))}
                {person.expertise.length > 2 && (
                  <Badge variant="outline" className="text-xs">+{person.expertise.length - 2}</Badge>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="w-full">View Profile</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
