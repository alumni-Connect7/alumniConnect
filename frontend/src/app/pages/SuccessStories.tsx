import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { successStoryAPI, SuccessStory } from '../../api/endpoints';
import { Card } from '../components/ui/card';
import { Clock, User, Briefcase, Building2 } from 'lucide-react';

export default function SuccessStories() {
  const navigate = useNavigate();
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStories = async () => {
      try {
        const response = await successStoryAPI.list();
        setStories(response.data.stories || []);
      } catch (err) {
        console.error('Failed to load success stories:', err);
        setError('Failed to load success stories.');
      } finally {
        setLoading(false);
      }
    };

    loadStories();
  }, []);

  if (loading) return <div className="p-8 text-center text-slate-600">Loading success stories...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!stories || stories.length === 0) return <div className="p-8 text-center text-slate-600">No success stories yet.</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2 text-slate-900">Success Stories</h1>
        <p className="text-slate-600">Inspiring journeys from our alumni community</p>
      </div>

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
    </div>
  );
}