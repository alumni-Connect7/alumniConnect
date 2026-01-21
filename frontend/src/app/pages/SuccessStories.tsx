import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { successStoryAPI, SuccessStory } from '../../api/endpoints';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Clock, Briefcase, Building2, Plus, X, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function SuccessStories() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    role: '',
    company: '',
    graduationYear: user?.graduationYear || new Date().getFullYear(),
    tags: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState(false);

  const loadStories = async () => {
    try {
      setLoading(true);
      const response = await successStoryAPI.list();
      setStories(response.data.stories || []);
    } catch (err) {
      console.error('Failed to load success stories:', err);
      setError('Failed to load success stories.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStories();
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      setFormError('Title and content are required');
      return;
    }

    try {
      setSubmitting(true);
      setFormError(null);
      
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      await successStoryAPI.create({
        title: formData.title.trim(),
        summary: formData.summary.trim(),
        content: formData.content.trim(),
        role: formData.role.trim(),
        company: formData.company.trim(),
        graduationYear: formData.graduationYear,
        tags: tagsArray,
      });

      setFormSuccess(true);
      setFormData({
        title: '',
        summary: '',
        content: '',
        role: '',
        company: '',
        graduationYear: user?.graduationYear || new Date().getFullYear(),
        tags: '',
      });

      await loadStories();
      
      setTimeout(() => {
        setFormSuccess(false);
        setShowForm(false);
      }, 2000);
    } catch (err: any) {
      setFormError(err?.response?.data?.message || 'Failed to post success story. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const userRole = (user?.role === 'admin' ? 'management' : user?.role || 'student') as 'student' | 'alumni' | 'management';

  if (loading) return (
    <DashboardLayout role={userRole} userName={user?.name || 'User'}>
      <div className="p-8 text-center text-slate-600">Loading success stories...</div>
    </DashboardLayout>
  );
  if (error) return (
    <DashboardLayout role={userRole} userName={user?.name || 'User'}>
      <div className="p-8 text-center text-red-600">{error}</div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout role={userRole} userName={user?.name || 'User'}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2 text-slate-900">Success Stories</h1>
            <p className="text-slate-600">Inspiring journeys from our alumni community</p>
          </div>
          {user?.role === 'alumni' && !showForm && (
            <Button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Post Story
            </Button>
          )}
        </div>

        {showForm && (
          <Card className="p-6 border-2 border-blue-200 bg-blue-50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-slate-900">Share Your Success Story</h2>
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
                  <p className="font-semibold">Success Story Posted!</p>
                  <p className="text-sm">Your story has been published.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Story Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    placeholder="e.g., From Intern to Senior Engineer"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                {/* Summary */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Summary
                  </label>
                  <textarea
                    name="summary"
                    value={formData.summary}
                    onChange={handleFormChange}
                    placeholder="Brief summary of your story"
                    rows={2}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  />
                </div>

                {/* Content */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Full Story *
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleFormChange}
                    placeholder="Share your career journey, challenges, achievements, and lessons learned..."
                    rows={6}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    required
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Current Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleFormChange}
                    placeholder="e.g., Senior Engineer"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleFormChange}
                    placeholder="e.g., Tech Inc."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Graduation Year */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Graduation Year
                  </label>
                  <input
                    type="number"
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Tags
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleFormChange}
                    placeholder="separated by commas"
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
                  {submitting ? 'Publishing...' : formSuccess ? 'Published!' : 'Publish Story'}
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
        )}

        {stories.length === 0 ? (
          <div className="p-8 text-center text-slate-600">No success stories yet.</div>
        ) : (
          <div className="grid gap-6">
            {stories.map(story => (
              <Card key={story._id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/success-stories/${story._id}`)}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900 mb-2">{story.title}</h2>
                    {story.summary && <p className="text-slate-600 mb-4">{story.summary}</p>}
                  </div>
                </div>

                <div className="mb-4 text-slate-700 line-clamp-3">
                  {story.content}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                  {story.role && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <Briefcase className="w-4 h-4" />
                      <span>{story.role}</span>
                    </div>
                  )}
                  {story.company && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <Building2 className="w-4 h-4" />
                      <span>{story.company}</span>
                    </div>
                  )}
                  {story.graduationYear && (
                    <div className="text-slate-600">
                      <span>Batch {story.graduationYear}</span>
                    </div>
                  )}
                  {story.createdAt && (
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(story.createdAt).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                {story.tags && story.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {story.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}