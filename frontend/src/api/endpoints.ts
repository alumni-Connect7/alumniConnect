import apiClient from './client';

export interface AuthResponse {
  success: boolean;
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: 'student' | 'alumni' | 'admin';
    collegeId: string;
    graduationYear?: number;
    isApproved: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Profile {
  _id?: string;
  user: string;
  headline?: string;
  bio?: string;
  department?: string;
  graduationYear?: number;
  currentRole?: string;
  company?: string;
  location?: string;
  phone?: string;
  socials?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  skills?: Array<{ name: string; level: 'beginner' | 'intermediate' | 'advanced' }>;
  certifications?: Array<{ name: string; issuer?: string; year?: string }>;
  experience?: Array<{
    title?: string;
    company?: string;
    type?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
  }>;
  interests?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface EventItem {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  tags?: string[];
  audience?: 'all' | 'student' | 'alumni';
  isPublished?: boolean;
  createdBy?: AuthResponse['user'];
  createdAt?: string;
}

export interface JobPost {
  _id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  type: 'job' | 'internship';
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  status: 'open' | 'closed';
  applicationUrl?: string;
  tags?: string[];
  createdBy?: AuthResponse['user'];
  createdAt?: string;
}

export interface SuccessStory {
  _id: string;
  title: string;
  summary?: string;
  content: string;
  role?: string;
  company?: string;
  graduationYear?: number;
  tags?: string[];
  featured?: boolean;
  author?: AuthResponse['user'];
  createdAt?: string;
}

export interface AdminStatsResponse {
  students: number;
  alumni: number;
  pendingAlumni: number;
  events: { total: number; upcoming: number };
  jobs: { open: number; closed: number };
  alumniByCompany: Array<{ _id: string; count: number }>;
}

export const authAPI = {
  register: (data: {
    name: string;
    email: string;
    password: string;
    role?: 'student' | 'alumni' | 'admin';
    collegeId: string;
    graduationYear?: number;
  }) => apiClient.post<AuthResponse>('/auth/register', data),

  login: (data: { email: string; password: string }) =>
    apiClient.post<AuthResponse>('/auth/login', data),

  getMe: () => apiClient.get<{ success: boolean; user: AuthResponse['user'] }>('/auth/me'),
};

export const userAPI = {
  getAllUsers: () =>
    apiClient.get<{ success: boolean; count: number; users: AuthResponse['user'][] }>('/users'),

  approveAlumni: (userId: string) =>
    apiClient.patch<{ success: boolean; user: AuthResponse['user'] }>(`/users/${userId}/approve`),

  getApprovedAlumni: () =>
    apiClient.get<{ success: boolean; count: number; alumni: AuthResponse['user'][] }>(
      '/users/alumni/approved'
    ),
};

export const mentorshipAPI = {
  createPost: (data: { title: string; description: string }) =>
    apiClient.post('/mentorship', data),

  listPosts: () => apiClient.get('/mentorship'),
};

export const eventsAPI = {
  list: (params?: { upcoming?: boolean }) =>
    apiClient.get<{ success: boolean; count: number; events: EventItem[] }>('/events', {
      params: params?.upcoming !== undefined ? { upcoming: params.upcoming } : undefined,
    }),
  create: (payload: Partial<EventItem>) => apiClient.post('/events', payload),
  update: (id: string, payload: Partial<EventItem>) => apiClient.patch(`/events/${id}`, payload),
  remove: (id: string) => apiClient.delete(`/events/${id}`),
};

export const jobAPI = {
  list: (params?: { status?: 'open' | 'closed'; type?: 'job' | 'internship' }) =>
    apiClient.get<{ success: boolean; count: number; jobs: JobPost[] }>('/jobs', { params }),
  create: (payload: Partial<JobPost>) => apiClient.post('/jobs', payload),
  update: (id: string, payload: Partial<JobPost>) => apiClient.patch(`/jobs/${id}`, payload),
  remove: (id: string) => apiClient.delete(`/jobs/${id}`),
};

export const profileAPI = {
  getMe: () =>
    apiClient.get<{ success: boolean; profile: Profile; user: AuthResponse['user'] }>('/profiles/me'),
  updateMe: (payload: Partial<Profile>) =>
    apiClient.put<{ success: boolean; profile: Profile }>('/profiles/me', payload),
  directory: () =>
    apiClient.get<{ success: boolean; count: number; records: Array<{ user: AuthResponse['user']; profile?: Profile }> }>(
      '/profiles/directory'
    ),
  getById: (userId: string) =>
    apiClient.get<{ success: boolean; user: AuthResponse['user']; profile?: Profile }>(`/profiles/${userId}`),
};

export const successStoryAPI = {
  list: () => apiClient.get<{ success: boolean; count: number; stories: SuccessStory[] }>('/stories'),
  create: (payload: Partial<SuccessStory>) => apiClient.post('/stories', payload),
  update: (id: string, payload: Partial<SuccessStory>) => apiClient.patch(`/stories/${id}`, payload),
  remove: (id: string) => apiClient.delete(`/stories/${id}`),
};

export const adminAPI = {
  getStats: () => apiClient.get<{ success: boolean; stats: AdminStatsResponse }>('/admin/stats'),
};
