import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { jobAPI, JobPost } from '../../api/endpoints';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useAuth } from '../../hooks/useAuth';
import { MapPin, Briefcase, Building2, Calendar, ExternalLink, Plus, X, AlertCircle, CheckCircle } from 'lucide-react';
import { Badge } from '../components/ui/badge';

export default function JobsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'job' | 'internship'>('all');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: '',
    location: 'Remote',
    type: 'job' as 'job' | 'internship',
    employmentType: 'full-time' as 'full-time' | 'part-time' | 'contract' | 'internship',
    applicationUrl: '',
    tags: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState(false);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const response = await jobAPI.list({ status: 'open' });
      setJobs(response.data.jobs || []);
    } catch (err) {
      console.error('Failed to load jobs:', err);
      setError('Failed to load job postings. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim() || !formData.company.trim()) {
      setFormError('Title, description, and company are required');
      return;
    }

    try {
      setSubmitting(true);
      setFormError(null);
      
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      await jobAPI.create({
        title: formData.title.trim(),
        description: formData.description.trim(),
        company: formData.company.trim(),
        location: formData.location.trim(),
        type: formData.type,
        employmentType: formData.employmentType,
        applicationUrl: formData.applicationUrl.trim(),
        tags: tagsArray,
      });

      setFormSuccess(true);
      setFormData({
        title: '',
        description: '',
        company: '',
        location: 'Remote',
        type: 'job',
        employmentType: 'full-time',
        applicationUrl: '',
        tags: '',
      });

      await loadJobs();
      
      setTimeout(() => {
        setFormSuccess(false);
        setShowForm(false);
      }, 2000);
    } catch (err: any) {
      setFormError(err?.response?.data?.message || 'Failed to post job. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const userRole = (user?.role === 'admin' ? 'management' : user?.role || 'student') as 'student' | 'alumni' | 'management';

  const filteredJobs = filterType === 'all' 
    ? jobs 
    : jobs.filter(job => job.type === filterType);

  if (loading) {
    return (
      <DashboardLayout role={userRole} userName={user?.name || 'User'}>
        <div className="p-8 text-center text-slate-600">Loading job postings...</div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout role={userRole} userName={user?.name || 'User'}>
        <div className="p-8 text-center text-red-600">{error}</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role={userRole} userName={user?.name || 'User'}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2 text-slate-900">Job & Internship Opportunities</h1>
            <p className="text-slate-600">Explore career opportunities posted by our alumni</p>
          </div>
          {user?.role === 'alumni' && !showForm && (
            <Button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Post Job
            </Button>
          )}
        </div>

        {showForm && (
          <Card className="p-6 border-2 border-blue-200 bg-blue-50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-slate-900">Post a Job or Internship</h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setFormError(null);
                  setFormSuccess(false);
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {formError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700 mb-4">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {formSuccess && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-700 mb-4">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Job Posted Successfully!</p>
                  <p className="text-sm">Your job posting is now visible to students.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    placeholder="e.g., Senior Software Engineer"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleFormChange}
                    placeholder="e.g., Tech Corp"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                    placeholder="e.g., Bangalore"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Job Type */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  >
                    <option value="job">Job</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>

                {/* Employment Type */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Employment Type *
                  </label>
                  <select
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  >
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Job Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    placeholder="Describe the role, responsibilities, and requirements..."
                    rows={5}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    required
                  />
                </div>

                {/* Application URL */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Application URL
                  </label>
                  <input
                    type="url"
                    name="applicationUrl"
                    value={formData.applicationUrl}
                    onChange={handleFormChange}
                    placeholder="https://example.com/apply"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Tags */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Tags
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleFormChange}
                    placeholder="e.g., React, Node.js, Python (separate with commas)"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={submitting || formSuccess}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
                >
                  {submitting ? 'Posting...' : formSuccess ? 'Posted!' : 'Post Job'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setFormError(null);
                    setFormSuccess(false);
                  }}
                  disabled={submitting}
                  className="px-4 py-2"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}        {/* Filter Tabs */}
        <div className="flex gap-3">
          <Button
            onClick={() => setFilterType('all')}
            variant={filterType === 'all' ? 'default' : 'outline'}
            className={filterType === 'all' ? 'bg-blue-600' : ''}
          >
            All ({jobs.length})
          </Button>
          <Button
            onClick={() => setFilterType('job')}
            variant={filterType === 'job' ? 'default' : 'outline'}
            className={filterType === 'job' ? 'bg-blue-600' : ''}
          >
            Jobs ({jobs.filter(j => j.type === 'job').length})
          </Button>
          <Button
            onClick={() => setFilterType('internship')}
            variant={filterType === 'internship' ? 'default' : 'outline'}
            className={filterType === 'internship' ? 'bg-blue-600' : ''}
          >
            Internships ({jobs.filter(j => j.type === 'internship').length})
          </Button>
        </div>

        {/* Jobs List */}
        {filteredJobs.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-slate-600">No {filterType !== 'all' ? filterType : 'job'} postings available at the moment.</p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredJobs.map(job => (
              <Card key={job._id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Left Section: Main Info */}
                  <div className="md:col-span-3">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900">{job.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Building2 className="w-4 h-4 text-slate-600" />
                          <p className="text-slate-600">{job.company}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge 
                          variant="default"
                          className={
                            job.type === 'internship' 
                              ? 'bg-purple-100 text-purple-700 border-0' 
                              : 'bg-blue-100 text-blue-700 border-0'
                          }
                        >
                          {job.type === 'internship' ? 'Internship' : 'Job'}
                        </Badge>
                        <Badge 
                          variant="secondary"
                          className="bg-green-100 text-green-700 border-0"
                        >
                          {job.employmentType.replace('-', ' ')}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-slate-700 text-sm mb-4 line-clamp-2">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm">
                      {job.location && (
                        <div className="flex items-center gap-2 text-slate-600">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(job.createdAt || '').toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    {job.tags && job.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {job.tags.slice(0, 3).map((tag, index) => (
                          <span 
                            key={index} 
                            className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                        {job.tags.length > 3 && (
                          <span className="px-2 py-1 text-slate-500 text-xs">
                            +{job.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right Section: Apply Button */}
                  <div className="md:col-span-1 flex flex-col justify-between">
                    {job.createdBy && (
                      <div className="mb-4">
                        <p className="text-xs text-slate-500 mb-1">Posted by</p>
                        <p className="text-sm font-medium text-slate-900">
                          {typeof job.createdBy === 'string' ? job.createdBy : (job.createdBy as any)?.name}
                        </p>
                      </div>
                    )}
                    
                    {job.applicationUrl ? (
                      <Button
                        onClick={() => window.open(job.applicationUrl, '_blank')}
                        className="bg-blue-600 hover:bg-blue-700 text-white w-full flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Apply Now
                      </Button>
                    ) : (
                      <Button variant="outline" disabled className="w-full">
                        No Application Link
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
