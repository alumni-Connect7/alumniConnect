import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { mentorshipAPI } from '../api/endpoints';
import { handleAPIError } from '../utils/errorHandler';

interface Post {
  _id: string;
  title: string;
  description: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  createdAt: string;
}

/**
 * Example Mentorship Page Implementation
 * Demonstrates:
 * - Student viewing alumni posts
 * - Alumni creating posts
 * - Fetching and displaying data
 */
export const MentorshipPageExample: React.FC = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await mentorshipAPI.listPosts();
      setPosts(data.posts);
    } catch (err) {
      const { message } = handleAPIError(err);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      setError('Title and description are required');
      return;
    }

    setIsSubmitting(true);
    try {
      await mentorshipAPI.createPost({
        title: formData.title,
        description: formData.description,
      });
      setFormData({ title: '', description: '' });
      await fetchPosts();
    } catch (err) {
      const { message } = handleAPIError(err);
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mentorship Network</h1>

      {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">{error}</div>}

      {/* Alumni Post Creation Form */}
      {user?.role === 'alumni' && user?.isApproved && (
        <div className="mb-8 p-6 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Share Your Expertise</h2>
          <form onSubmit={handleSubmitPost} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Tips for Career Growth"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
                maxLength={140}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Share your insights..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                disabled={isSubmitting}
                maxLength={2000}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </button>
          </form>
        </div>
      )}

      {/* Posts List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Latest Posts</h2>
        {loading ? (
          <div>Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="p-4 bg-gray-50 rounded-lg text-gray-600">No posts yet</div>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="p-6 bg-white border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-700 mb-4">{post.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>
                  By <strong>{post.createdBy.name}</strong> ({post.createdBy.role})
                </span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MentorshipPageExample;
