import { useEffect, useMemo, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Search, MapPin, Briefcase, GraduationCap, AlertCircle } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { profileAPI, Profile } from '../../api/endpoints';
import { handleAPIError } from '../../utils/errorHandler';
import { useAuth } from '../../hooks/useAuth';

interface DirectoryRecord {
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
    collegeId: string;
    graduationYear?: number;
  };
  profile?: Profile;
}

export default function AlumniListing() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [records, setRecords] = useState<DirectoryRecord[]>([]);
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [companyFilter, setCompanyFilter] = useState('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setError(null);
        const res = await profileAPI.directory();
        setRecords(res.data.records || []);
      } catch (err) {
        const { message } = handleAPIError(err);
        setError(message);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return records.filter((record) => {
      const dept = record.profile?.department || '';
      const company = record.profile?.company || '';
      const skills = (record.profile?.skills || []).map((s) => s.name.toLowerCase());

      const matchesQuery =
        record.user.name.toLowerCase().includes(query) ||
        company.toLowerCase().includes(query) ||
        skills.some((s) => s.includes(query));

      const matchesDept = departmentFilter === 'all' || dept.toLowerCase() === departmentFilter;
      const matchesCompany = companyFilter === 'all' || company.toLowerCase() === companyFilter;

      return matchesQuery && matchesDept && matchesCompany;
    });
  }, [records, searchQuery, departmentFilter, companyFilter]);

  return (
    <DashboardLayout role={user?.role || 'student'} userName={user?.name || 'User'}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl mb-2 text-slate-900">Alumni Directory</h1>
          <p className="text-slate-600">Connect with {records.length} alumni from your institution</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

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
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="computer science">Computer Science</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="mechanical">Mechanical</SelectItem>
              </SelectContent>
            </Select>
            <Select value={companyFilter} onValueChange={setCompanyFilter}>
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
          {filtered.map((record) => {
            const initials = record.user.name
              .split(' ')
              .map((n) => n[0])
              .join('');
            const profile = record.profile;
            const skills = profile?.skills || [];
            return (
              <Card key={record.user._id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-teal-600 rounded-full flex items-center justify-center text-white text-xl">
                    {initials}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">{record.user.name}</h3>
                    <p className="text-sm text-slate-600">{profile?.currentRole || 'Alumni'}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Briefcase className="w-4 h-4" />
                    <span>{profile?.company || '—'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="w-4 h-4" />
                    <span>{profile?.location || '—'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <GraduationCap className="w-4 h-4" />
                    <span>Class of {record.user.graduationYear || '—'}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {skills.slice(0, 3).map((skill, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {skill.name}
                    </Badge>
                  ))}
                  {skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{skills.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="w-full">
                    View Profile
                  </Button>
                </div>
              </Card>
            );
          })}
          {!filtered.length && <p className="text-sm text-slate-500">No alumni found matching filters.</p>}
        </div>
      </div>
    </DashboardLayout>
  );
}
