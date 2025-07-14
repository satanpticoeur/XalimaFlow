import api from './api';

interface GenerateAiTextPayload {
  prompt: string;
}

interface ContentCreatePayload {
  title: string;
  content_html?: string;
  content_markdown?: string;
  status?: string;
}

interface ContentUpdatePayload {
  title?: string;
  content_html?: string;
  content_markdown?: string;
  status?: string;
  slug?: string;
}

export interface ContentResponse {
  id: number;
  title: string;
  slug: string;
  content_html: string;
  content_markdown: string;
  status: string;
  owner_id: number;
  created_at: string;
  updated_at: string;
}


const contentService = {
  generateAiText: (payload: GenerateAiTextPayload) => {
    return api.post('/content/generate-ai-text', payload);
  },
  createContent: (payload: ContentCreatePayload) => {
    return api.post('/content/', payload);
  },
  getContentById: (contentId: number) => {
    return api.get<ContentResponse>(`/content/${contentId}`);
  },
  updateContent: (contentId: number, payload: ContentUpdatePayload) => {
    return api.put<ContentResponse>(`/content/${contentId}`, payload);
  },
  getUserContents: () => {
    return api.get<ContentResponse[]>('/content/me/');
  },
};

export default contentService;