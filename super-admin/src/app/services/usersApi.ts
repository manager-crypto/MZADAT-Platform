// src/app/services/usersApi.ts
import { api } from './apiClient';

export interface AdminUserRow {
  id: string;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
  last_login: string | null;
  created_at: string;
}

export const usersApi = {
  list: () => api.get<{ data: AdminUserRow[]; total: number }>('/api/admin/users'),

  toggleActive: (id: string) =>
    api.patch<{ ok: boolean; id: string; is_active: boolean }>(
      `/api/admin/users/${id}/toggle-active`,
    ),
};
