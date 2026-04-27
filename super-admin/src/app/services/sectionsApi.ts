// src/app/services/sectionsApi.ts
import { api } from './apiClient';

export interface SiteSection {
  id: string;
  name_ar: string;
  name_en: string;
  page: string;
  route: string | null;
  icon: string | null;
  sort_order: number;
  is_visible: boolean;
  updated_at?: string;
}

export interface SectionsResponse {
  data: SiteSection[];
  total: number;
}

export const sectionsApi = {
  list: (page = 'home') =>
    api.get<SectionsResponse>(`/api/admin/sections?page=${encodeURIComponent(page)}`),

  toggleVisibility: (id: string) =>
    api.patch<{ ok: boolean; id: string; is_visible: boolean }>(
      `/api/admin/sections/${id}/toggle-visibility`,
    ),

  reorder: (items: Array<{ id: string; sort_order: number }>) =>
    api.post<{ ok: boolean; updated: number }>('/api/admin/sections/reorder', items),
};
