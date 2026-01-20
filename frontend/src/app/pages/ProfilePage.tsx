import { useState } from 'react';
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
  CheckCircle
} from 'lucide-react';

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
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingEducation, setEditingEducation] = useState(false);
  const [editingSkills, setEditingSkills] = useState(false);
  const [editingCertifications, setEditingCertifications] = useState(false);
  const [editingExperience, setEditingExperience] = useState(false);

  const [personalData, setPersonalData] = useState({
    name: 'Nikhil Satya',
    email: '22bq1a42g8@vvit.net',
    phone: '+91 9812345678',
    location: 'Guntur, India',
    bio: 'Passionate computer science student with interests in machine learning and data science. Currently seeking mentorship to explore career paths in AI and software engineering.',
    linkedIn: 'https://linkedin.com/in/nikhilsatya',
    github: 'https://github.com/nikhilsatya'
  });

  const [educations, setEducations] = useState<Education[]>([
    { id: 1, degree: 'Bachelor of Technology - Computer Science', institution: 'Vasireddy Venkatadri Institute of Technology', startYear: '2022', endYear: '2026', cgpa: '8.5' }
  ]);

  const [skills, setSkills] = useState<Skill[]>([
    { id: 1, name: 'Python', level: 'Advanced' },
    { id: 2, name: 'JavaScript', level: 'Intermediate' },
    { id: 3, name: 'React', level: 'Advanced' },
    { id: 4, name: 'Node.js', level: 'Intermediate' },
    { id: 5, name: 'SQL', level: 'Intermediate' },
    { id: 6, name: 'Machine Learning', level: 'Beginner' }
  ]);

  const [certifications, setCertifications] = useState<Certification[]>([
    { id: 1, name: 'AWS Solutions Architect Associate', issuer: 'Amazon Web Services', date: '2024' },
    { id: 2, name: 'Google Cloud Professional Data Engineer', issuer: 'Google Cloud', date: '2023' },
    { id: 3, name: 'Python for Data Science', issuer: 'Coursera', date: '2024' }
  ]);

  const [experiences, setExperiences] = useState<Experience[]>([
    { id: 1, title: 'Frontend Developer', company: 'Tech Startup XYZ', type: 'Internship', startDate: 'Jun 2023', endDate: 'Aug 2023', description: 'Developed responsive web applications using React and Tailwind CSS' },
    { id: 2, title: 'Full Stack Developer', company: 'Freelance', type: 'Freelancing', startDate: 'Sep 2023', endDate: 'Present', description: 'Building custom web solutions for various clients' }
  ]);

  const [tempPersonal, setTempPersonal] = useState(personalData);

  const handlePersonalEdit = () => {
    setEditingPersonal(true);
    setTempPersonal(personalData);
  };

  const handlePersonalSave = () => {
    setPersonalData(tempPersonal);
    setEditingPersonal(false);
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

  return (
    <DashboardLayout role="student" userName="Nikhil Satya">
      <div className="space-y-6">
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
                      <p className="text-lg text-slate-600">B.Tech Computer Science • 3rd Year</p>
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
                    <Button onClick={handlePersonalSave}>Save Changes</Button>
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
      </div>
    </DashboardLayout>
  );
}
