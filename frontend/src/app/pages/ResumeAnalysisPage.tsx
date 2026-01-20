import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Upload, FileText, CheckCircle2, XCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';

export default function ResumeAnalysisPage() {
  const [uploadedResume, setUploadedResume] = useState(true); // Demo: already uploaded

  const atsScore = 78;
  const skillsMatched = ['Python', 'Machine Learning', 'Data Analysis', 'SQL'];
  const skillsMissing = ['Cloud Computing', 'Docker', 'Kubernetes'];
  const improvements = [
    'Add more quantifiable achievements with numbers and metrics',
    'Include relevant keywords from job descriptions',
    'Improve formatting for better ATS compatibility',
    'Add a professional summary at the top',
  ];
  const careerSuggestions = [
    { role: 'Data Scientist', match: 92 },
    { role: 'ML Engineer', match: 85 },
    { role: 'Data Analyst', match: 78 },
  ];

  return (
    <DashboardLayout role="student" userName="Nikhil Satya">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl mb-2 text-slate-900">Resume Analysis</h1>
          <p className="text-slate-600">Get AI-powered feedback and ATS score for your resume</p>
        </div>

        {!uploadedResume ? (
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-10 h-10 text-blue-900" />
              </div>
              <h2 className="text-2xl mb-3 text-slate-900">Upload Your Resume</h2>
              <p className="text-slate-600 mb-6">
                Upload your resume to get instant ATS score analysis and career suggestions
              </p>
              <Button className="bg-blue-900 hover:bg-blue-800">
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </Button>
              <p className="text-sm text-slate-500 mt-4">Supported formats: PDF, DOCX (Max 5MB)</p>
            </div>
          </Card>
        ) : (
          <>
            {/* ATS Score Card */}
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="p-6 lg:col-span-1">
                <div className="text-center">
                  <h3 className="text-lg mb-4 text-slate-900">ATS Score</h3>
                  <div className="relative w-40 h-40 mx-auto mb-4">
                    <svg className="transform -rotate-90 w-40 h-40">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="#e2e8f0"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="#16a34a"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 70}`}
                        strokeDashoffset={`${2 * Math.PI * 70 * (1 - atsScore / 100)}`}
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl text-slate-900">{atsScore}%</div>
                        <div className="text-sm text-slate-600">Good</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600">
                    Your resume is well-optimized for Applicant Tracking Systems
                  </p>
                  <Button className="w-full mt-4" variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload New Resume
                  </Button>
                </div>
              </Card>

              <Card className="p-6 lg:col-span-2">
                <h3 className="text-lg mb-4 text-slate-900">Skills Analysis</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-slate-900">Matched Skills</h4>
                      <Badge className="bg-green-100 text-green-700 border-0">
                        {skillsMatched.length} skills
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillsMatched.map((skill, index) => (
                        <Badge key={index} className="bg-green-50 text-green-700 border-green-200">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-slate-900">Missing Skills</h4>
                      <Badge className="bg-orange-100 text-orange-700 border-0">
                        {skillsMissing.length} skills
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillsMissing.map((skill, index) => (
                        <Badge key={index} className="bg-orange-50 text-orange-700 border-orange-200">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Improvement Tips */}
            <Card className="p-6">
              <h3 className="text-lg mb-4 text-slate-900">Improvement Suggestions</h3>
              <div className="space-y-3">
                {improvements.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                    <p className="text-sm text-slate-700">{tip}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Career Suggestions */}
            <Card className="p-6">
              <h3 className="text-lg mb-4 text-slate-900">AI-Based Career Suggestions</h3>
              <div className="space-y-4">
                {careerSuggestions.map((career, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-slate-900">{career.role}</h4>
                      <Badge className="bg-blue-100 text-blue-700 border-0">{career.match}% Match</Badge>
                    </div>
                    <Progress value={career.match} className="h-2 mb-2" />
                    <Button size="sm" variant="outline">View Recommendations</Button>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
