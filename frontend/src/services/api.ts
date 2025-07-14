import axios from 'axios';

interface ContentCreateUpdate {
  title: string;
  content_html: string;
}

interface ContentInDB {
  id: number;
  title: string;
  content_html: string;
  owner_id: number;
  created_at: string; // ISO string
  updated_at: string; // ISO string
}

interface AIGenerationRequest {
  prompt: string;
  max_tokens?: number;
  temperature?: number;
}

export const contentService = {
  createContent: (data: ContentCreateUpdate) => api.post<ContentInDB>('/content/', data),
  getContents: () => api.get<ContentInDB[]>('/content/'),
  getContentById: (id: number) => api.get<ContentInDB>(`/content/${id}`),
  updateContent: (id: number, data: ContentCreateUpdate) => api.put<ContentInDB>(`/content/${id}`, data),
  deleteContent: (id: number) => api.delete(`/content/${id}`),
  generateAiText: (request: AIGenerationRequest) => api.post<string>('/content/generate-ai-text', request, {
    headers: { 'Content-Type': 'application/json' } // Ensure JSON for AI endpoint
  }),
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token JWT à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;