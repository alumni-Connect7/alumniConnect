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
