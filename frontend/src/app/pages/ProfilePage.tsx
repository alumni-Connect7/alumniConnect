import { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Mail, 
  Phone, 
  Linkedin, 
  Github,
  Edit2,
  X,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { profileAPI, Profile } from '../../api/endpoints';
import { handleAPIError } from '../../utils/errorHandler';

interface Education {
  id: number;
  degree: string;
  institution: string;
  startYear: string;
  endYear: string;
  cgpa: string;
}

interface Skill {
  id: number;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
}

interface Experience {
  id: number;
  title: string;
  company: string;
  type: 'Internship' | 'Freelancing' | 'Full-time' | 'Part-time';
  startDate: string;
  endDate: string;
  description: string;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingEducation, setEditingEducation] = useState(false);
  const [editingSkills, setEditingSkills] = useState(false);
  const [editingCertifications, setEditingCertifications] = useState(false);
  const [editingExperience, setEditingExperience] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [personalData, setPersonalData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    location: '',
    bio: '',
    linkedIn: '',
    github: '',
    headline: '',
  });

  const [educations, setEducations] = useState<Education[]>([]);

  const [skills, setSkills] = useState<Skill[]>([
    { id: 1, name: 'Python', level: 'Advanced' },
  ]);

  const [certifications, setCertifications] = useState<Certification[]>([
    { id: 1, name: '', issuer: '', date: '' },
  ]);

  const [experiences, setExperiences] = useState<Experience[]>([
    { id: 1, title: '', company: '', type: 'Internship', startDate: '', endDate: '', description: '' },
  ]);

  const [tempPersonal, setTempPersonal] = useState(personalData);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await profileAPI.getMe();
        const profile: Profile | undefined = res.data.profile;
        setPersonalData((prev) => ({
          ...prev,
          name: res.data.user.name,
          email: res.data.user.email,
          location: profile?.location || '',
          bio: profile?.bio || '',
          linkedIn: profile?.socials?.linkedin || '',
          github: profile?.socials?.github || '',
          phone: profile?.phone || '',
          headline: profile?.headline || '',
        }));
        setSkills(
          (profile?.skills || []).map((s, idx) => ({
            id: idx + 1,
            name: s.name,
            level:
              s.level === 'advanced'
                ? 'Advanced'
                : s.level === 'intermediate'
                ? 'Intermediate'
                : 'Beginner',
          }))
        );
        setCertifications(
          (profile?.certifications || []).map((c, idx) => ({
            id: idx + 1,
            name: c.name,
            issuer: c.issuer || '',
            date: c.year || '',
          }))
        );
        setExperiences(
          (profile?.experience || []).map((exp, idx) => ({
            id: idx + 1,
            title: exp.title || '',
            company: exp.company || '',
            type:
              exp.type === 'freelancing'
                ? 'Freelancing'
                : exp.type === 'full-time'
                ? 'Full-time'
                : exp.type === 'part-time'
                ? 'Part-time'
                : 'Internship',
            startDate: exp.startDate || '',
            endDate: exp.endDate || '',
            description: exp.description || '',
          }))
        );
      } catch (err) {
        const { message } = handleAPIError(err);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user?.email, user?.name]);

  const handlePersonalEdit = () => {
    setEditingPersonal(true);
    setTempPersonal(personalData);
  };

  const handlePersonalSave = () => {
    setPersonalData(tempPersonal);
    setEditingPersonal(false);
    handleSaveProfile();
  };

  const handlePersonalCancel = () => {
    setEditingPersonal(false);
  };

  const deleteEducation = (id: number) => {
    setEducations(educations.filter(e => e.id !== id));
  };

  const deleteSkill = (id: number) => {
    setSkills(skills.filter(s => s.id !== id));
  };

  const deleteCertification = (id: number) => {
    setCertifications(certifications.filter(c => c.id !== id));
  };

  const deleteExperience = (id: number) => {
    setExperiences(experiences.filter(e => e.id !== id));
  };

  const addSkill = () => {
    const newSkill: Skill = { id: Date.now(), name: '', level: 'Beginner' };
    setSkills([...skills, newSkill]);
  };

  const addCertification = () => {
    const newCert: Certification = { id: Date.now(), name: '', issuer: '', date: '' };
    setCertifications([...certifications, newCert]);
  };

  const addExperience = () => {
    const newExp: Experience = { id: Date.now(), title: '', company: '', type: 'Internship', startDate: '', endDate: '', description: '' };
    setExperiences([...experiences, newExp]);
  };

  const handleSaveProfile = async () => {
    try {
      setError(null);
      setSuccess(null);
      const payload: Partial<Profile> = {
        headline: personalData.headline,
        bio: personalData.bio,
        location: personalData.location,
        phone: personalData.phone,
        socials: {
          linkedin: personalData.linkedIn,
          github: personalData.github,
        },
        skills: skills.map((skill) => ({
          name: skill.name,
          level: skill.level.toLowerCase() as 'beginner' | 'intermediate' | 'advanced',
        })),
        certifications: certifications
          .filter((c) => c.name)
          .map((cert) => ({ name: cert.name, issuer: cert.issuer, year: cert.date })),
        experience: experiences
          .filter((e) => e.title || e.company)
          .map((exp) => ({
            title: exp.title,
            company: exp.company,
            type: exp.type.toLowerCase(),
            startDate: exp.startDate,
            endDate: exp.endDate,
            description: exp.description,
          })),
      };

      await profileAPI.updateMe(payload);
      setSuccess('Profile updated successfully');
    } catch (err) {
      const { message } = handleAPIError(err);
      setError(message);
    }
  };

  return (
    <DashboardLayout role={user?.role || 'student'} userName={user?.name || 'User'}>
      <div className="space-y-6">
        {error && (
          <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="p-3 bg-green-50 text-green-700 border border-green-200 rounded flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{success}</span>
          </div>
        )}
        {/* Personal Details Card */}
        <Card className="p-8">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-900 to-teal-600 rounded-full flex items-center justify-center text-white text-3xl">
              {personalData.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              {!editingPersonal ? (
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl mb-2 text-slate-900">{personalData.name}</h1>
                      <p className="text-lg text-slate-600">{personalData.headline || 'Update your headline'}</p>
                    </div>
                    <Button onClick={handlePersonalEdit} className="gap-2">
                      <Edit2 className="w-4 h-4" />
                      Edit Personal Details
                    </Button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Mail className="w-4 h-4" />
                      <span>{personalData.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Phone className="w-4 h-4" />
                      <span>{personalData.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span>{personalData.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <GraduationCap className="w-4 h-4" />
                      <span>Expected Graduation: 2026</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Full Name</label>
                      <Input value={tempPersonal.name} onChange={(e) => setTempPersonal({...tempPersonal, name: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <Input value={tempPersonal.email} onChange={(e) => setTempPersonal({...tempPersonal, email: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone</label>
                      <Input value={tempPersonal.phone} onChange={(e) => setTempPersonal({...tempPersonal, phone: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Location</label>
                      <Input value={tempPersonal.location} onChange={(e) => setTempPersonal({...tempPersonal, location: e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Bio</label>
                    <Textarea value={tempPersonal.bio} onChange={(e) => setTempPersonal({...tempPersonal, bio: e.target.value})} rows={3} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">LinkedIn</label>
                      <Input value={tempPersonal.linkedIn} onChange={(e) => setTempPersonal({...tempPersonal, linkedIn: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">GitHub</label>
                      <Input value={tempPersonal.github} onChange={(e) => setTempPersonal({...tempPersonal, github: e.target.value})} />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handlePersonalSave} disabled={loading}>Save Changes</Button>
                    <Button variant="outline" onClick={handlePersonalCancel}>Cancel</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Education Details */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-900">Education Details</h2>
            <Button variant="outline" size="sm" onClick={() => setEditingEducation(!editingEducation)}>
              <Edit2 className="w-4 h-4 mr-2" />
              {editingEducation ? 'Done' : 'Edit'}
            </Button>
          </div>
          <div className="space-y-4">
            {educations.map((edu) => (
              <div key={edu.id} className="flex items-start gap-4 p-4 border rounded-lg">
                <GraduationCap className="w-5 h-5 text-blue-900 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-medium text-slate-900">{edu.degree}</h3>
                  <p className="text-sm text-slate-600">{edu.institution}</p>
                  <p className="text-sm text-slate-500">{edu.startYear} - {edu.endYear}</p>
                  <p className="text-sm text-slate-600 mt-1">CGPA: {edu.cgpa}/10</p>
                </div>
                {editingEducation && (
                  <Button variant="ghost" size="sm" onClick={() => deleteEducation(edu.id)}>
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                )}
              </div>
            ))}
            {editingEducation && (
              <Button variant="outline" className="w-full" onClick={() => {}}>
                <Plus className="w-4 h-4 mr-2" />
                Add Education
              </Button>
            )}
          </div>
        </Card>

        {/* Skills */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-900">Skills</h2>
            <Button variant="outline" size="sm" onClick={() => setEditingSkills(!editingSkills)}>
              <Edit2 className="w-4 h-4 mr-2" />
              {editingSkills ? 'Done' : 'Edit'}
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div key={skill.id} className="flex items-center gap-2">
                <Badge 
                  variant={skill.level === 'Advanced' ? 'default' : skill.level === 'Intermediate' ? 'secondary' : 'outline'}
                  className="cursor-pointer hover:bg-opacity-80"
                >
                  {skill.name} - {skill.level}
                </Badge>
                {editingSkills && (
                  <button onClick={() => deleteSkill(skill.id)} className="text-red-600 hover:text-red-800">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          {editingSkills && (
            <Button variant="outline" className="w-full mt-4" onClick={addSkill}>
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </Button>
          )}
        </Card>

        {/* Certifications */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-900">Certifications</h2>
            <Button variant="outline" size="sm" onClick={() => setEditingCertifications(!editingCertifications)}>
              <Edit2 className="w-4 h-4 mr-2" />
              {editingCertifications ? 'Done' : 'Edit'}
            </Button>
          </div>
          <div className="space-y-3">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex items-start gap-3 p-3 border rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{cert.name}</p>
                  <p className="text-sm text-slate-600">{cert.issuer}</p>
                  <p className="text-xs text-slate-500 mt-1">Issued: {cert.date}</p>
                </div>
                {editingCertifications && (
                  <Button variant="ghost" size="sm" onClick={() => deleteCertification(cert.id)}>
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          {editingCertifications && (
            <Button variant="outline" className="w-full mt-4" onClick={addCertification}>
              <Plus className="w-4 h-4 mr-2" />
              Add Certification
            </Button>
          )}
        </Card>

        {/* Experience (Internships & Freelancing) */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-900">Experience (Internships & Freelancing)</h2>
            <Button variant="outline" size="sm" onClick={() => setEditingExperience(!editingExperience)}>
              <Edit2 className="w-4 h-4 mr-2" />
              {editingExperience ? 'Done' : 'Edit'}
            </Button>
          </div>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="flex items-start gap-4 p-4 border rounded-lg">
                <Briefcase className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-medium text-slate-900">{exp.title}</h3>
                    <Badge variant="outline">{exp.type}</Badge>
                  </div>
                  <p className="text-sm text-slate-600">{exp.company}</p>
                  <p className="text-sm text-slate-500">{exp.startDate} - {exp.endDate}</p>
                  <p className="text-sm text-slate-700 mt-2">{exp.description}</p>
                </div>
                {editingExperience && (
                  <Button variant="ghost" size="sm" onClick={() => deleteExperience(exp.id)}>
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          {editingExperience && (
            <Button variant="outline" className="w-full mt-4" onClick={addExperience}>
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          )}
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSaveProfile} disabled={loading}>
            Save Profile
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
