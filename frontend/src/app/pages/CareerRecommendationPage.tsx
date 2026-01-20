import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  Briefcase,
  CheckCircle,
  Star,
  TrendingUp,
  Brain,
  ArrowRight
} from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';

export default function CareerRecommendationPage() {
  const navigate = useNavigate();

  const studentSkills = [
    { name: 'Python', level: 'Advanced' },
    { name: 'JavaScript', level: 'Intermediate' },
    { name: 'React', level: 'Advanced' },
    { name: 'Machine Learning', level: 'Beginner' },
    { name: 'Data Analysis', level: 'Intermediate' },
    { name: 'Problem Solving', level: 'Advanced' },
    { name: 'SQL', level: 'Intermediate' },
    { name: 'Cloud Platforms', level: 'Beginner' },
  ];

  const certifications = [
    { name: 'AWS Solutions Architect Associate', issuer: 'Amazon Web Services', date: '2024' },
    { name: 'Google Cloud Professional Data Engineer', issuer: 'Google Cloud', date: '2023' },
    { name: 'Python for Data Science', issuer: 'Coursera', date: '2024' },
  ];

  const careerRecommendations = [
    { 
      title: 'Full Stack Developer', 
      matchScore: 92, 
      description: 'Excellent match based on your JavaScript, React, and Python skills. This role combines frontend and backend development.',
      requiredSkills: ['JavaScript', 'React', 'Node.js', 'Database Design'],
      currentSkills: ['Python', 'JavaScript', 'React'],
      missingSkills: ['Node.js', 'Database Design'],
      averageSalary: '12-18 LPA',
      jobOutlook: '15% growth',
      topCompanies: ['Google', 'Amazon', 'Microsoft', 'TechSolutions Pvt Ltd']
    },
    { 
      title: 'Data Scientist', 
      matchScore: 85, 
      description: 'Strong potential with your Python and Data Analysis background. High demand in the market with excellent growth prospects.',
      requiredSkills: ['Python', 'Machine Learning', 'Statistics', 'SQL'],
      currentSkills: ['Python', 'Data Analysis', 'SQL'],
      missingSkills: ['Advanced Machine Learning', 'Statistics'],
      averageSalary: '15-22 LPA',
      jobOutlook: '36% growth',
      topCompanies: ['Google', 'Facebook', 'Amazon India', 'Innovatech']
    },
    { 
      title: 'Cloud Solutions Architect', 
      matchScore: 78, 
      description: 'Your AWS certification and technical skills align well with this role. Growing demand for cloud expertise.',
      requiredSkills: ['Cloud Platforms', 'System Design', 'DevOps', 'Networking'],
      currentSkills: ['Cloud Platforms'],
      missingSkills: ['System Design', 'DevOps', 'Advanced Networking'],
      averageSalary: '18-28 LPA',
      jobOutlook: '12% growth',
      topCompanies: ['Microsoft Azure', 'AWS', 'Google Cloud', 'IBM']
    },
    { 
      title: 'ML Engineer', 
      matchScore: 72, 
      description: 'Good foundation with Python knowledge and Machine Learning skills. Requires deeper expertise in ML frameworks.',
      requiredSkills: ['Python', 'TensorFlow', 'PyTorch', 'Deep Learning'],
      currentSkills: ['Python', 'Machine Learning'],
      missingSkills: ['TensorFlow', 'PyTorch', 'Advanced Deep Learning'],
      averageSalary: '16-25 LPA',
      jobOutlook: '21% growth',
      topCompanies: ['OpenAI', 'Google AI', 'DeepMind', 'TechSolutions Pvt Ltd']
    },
  ];

  const getSkillLevelBadgeVariant = (level: string) => {
    switch(level) {
      case 'Advanced': return 'default';
      case 'Intermediate': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <DashboardLayout role="student" userName="Nikhil Satya">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-slate-900">AI Career Recommendation System</h1>
          </div>
          <p className="text-slate-600 text-lg">
            Discover personalized career paths based on your skills, certifications, and experience
          </p>
        </div>

        {/* Skills Overview */}
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">Your Profile Analysis</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Skills */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Technical Skills ({studentSkills.length})
              </h3>
              <div className="space-y-3">
                {studentSkills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-900">{skill.name}</span>
                      <Badge variant={getSkillLevelBadgeVariant(skill.level)}>
                        {skill.level}
                      </Badge>
                    </div>
                    <Progress 
                      value={skill.level === 'Advanced' ? 90 : skill.level === 'Intermediate' ? 60 : 30} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Certifications ({certifications.length})
              </h3>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div key={index} className="p-3 bg-white rounded-lg border border-slate-200">
                    <p className="text-sm font-semibold text-slate-900">{cert.name}</p>
                    <p className="text-xs text-slate-600">{cert.issuer}</p>
                    <p className="text-xs text-slate-500 mt-1">Issued: {cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Career Recommendations */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">Recommended Career Paths</h2>
          <div className="space-y-6">
            {careerRecommendations.map((career, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Left: Career Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <Briefcase className="w-6 h-6 text-blue-600 mt-1" />
                        <div>
                          <h3 className="text-xl font-bold text-slate-900">{career.title}</h3>
                          <p className="text-sm text-slate-600 mt-1">{career.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-blue-100 px-4 py-2 rounded-full">
                        <Star className="w-5 h-5 text-blue-600 fill-blue-600" />
                        <span className="text-lg font-bold text-blue-600">{career.matchScore}%</span>
                      </div>
                    </div>

                    {/* Match Score Progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-slate-700">Career Match Score</span>
                      </div>
                      <Progress value={career.matchScore} className="h-3" />
                    </div>

                    {/* Skills Section */}
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs font-semibold text-green-700 mb-2">Your Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {career.currentSkills.map((skill, i) => (
                            <Badge key={i} variant="default" className="bg-green-100 text-green-800 border-0">
                              ✓ {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-amber-700 mb-2">Skills to Develop</p>
                        <div className="flex flex-wrap gap-2">
                          {career.missingSkills.map((skill, i) => (
                            <Badge key={i} variant="outline" className="border-amber-300 text-amber-700">
                              📚 {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Required Skills */}
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-slate-900 mb-2">All Required Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {career.requiredSkills.map((skill, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Stats */}
                  <div className="lg:col-span-1 space-y-4">
                    <Card className="p-4 bg-slate-50">
                      <p className="text-xs text-slate-600 uppercase tracking-wide font-semibold">Average Salary</p>
                      <p className="text-2xl font-bold text-slate-900 mt-1">{career.averageSalary}</p>
                    </Card>

                    <Card className="p-4 bg-slate-50">
                      <p className="text-xs text-slate-600 uppercase tracking-wide font-semibold">Job Outlook</p>
                      <p className="text-2xl font-bold text-green-600 mt-1">{career.jobOutlook}</p>
                    </Card>

                    <div>
                      <p className="text-xs font-semibold text-slate-700 mb-2">Top Hiring Companies</p>
                      <div className="space-y-1">
                        {career.topCompanies.map((company, i) => (
                          <p key={i} className="text-xs text-slate-600 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                            {company}
                          </p>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Explore Role <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Learning Path Recommendation */}
        <Card className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="flex items-start gap-3 mb-4">
            <Brain className="w-6 h-6 text-purple-600" />
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Personalized Learning Path</h3>
              <p className="text-sm text-slate-600 mt-1">Based on your career goals and current skills</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <p className="text-sm font-semibold text-slate-900">1. Master Advanced Backend Development</p>
              <p className="text-xs text-slate-600 mt-1">Learn Node.js, Express, and database optimization</p>
              <p className="text-xs text-purple-600 font-semibold mt-2">Estimated Time: 3-4 months</p>
            </div>

            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <p className="text-sm font-semibold text-slate-900">2. Deepen Machine Learning Knowledge</p>
              <p className="text-xs text-slate-600 mt-1">Advanced ML algorithms, TensorFlow, and Deep Learning</p>
              <p className="text-xs text-purple-600 font-semibold mt-2">Estimated Time: 4-5 months</p>
            </div>

            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <p className="text-sm font-semibold text-slate-900">3. Cloud Architecture & DevOps</p>
              <p className="text-xs text-slate-600 mt-1">Kubernetes, Docker, and AWS/GCP advanced services</p>
              <p className="text-xs text-purple-600 font-semibold mt-2">Estimated Time: 2-3 months</p>
            </div>
          </div>

          <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
            Start Learning Journey
          </Button>
        </Card>
      </div>
    </DashboardLayout>
  );
}
