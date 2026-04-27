// src/app/services/authApi.ts
import { api, tokenStorage, ApiError } from './apiClient';

export interface AdminUser {
  token: string;
  role: string;
  full_name: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

const USER_KEY = 'mzadat_admin_user';

function saveUser(user: AdminUser) {
  try {
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch {
    /* ignore */
  }
}

function loadUser(): AdminUser | null {
  try {
    const raw = window.localStorage.getItem(USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AdminUser;
  } catch {
    return null;
  }
}

function clearUser() {
  try {
    window.localStorage.removeItem(USER_KEY);
  } catch {
    /* ignore */
  }
}

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AdminUser> {
    const response = await api.post<AdminUser>(
      '/api/admin/login',
      credentials,
      { skipAuth: true },
    );
    tokenStorage.set(response.token);
    saveUser(response);
    return response;
  },

  async logout(): Promise<void> {
    try {
      await api.post('/api/admin/logout');
    } catch (err) {
      // Ignore errors — we're logging out anyway
      console.warn('Logout request failed, clearing local state', err);
    } finally {
      tokenStorage.clear();
      clearUser();
    }
  },

  getCurrentUser(): AdminUser | null {
    // User is authenticated if both token AND user data exist
    const token = tokenStorage.get();
    const user = loadUser();
    if (!token || !user) return null;
    return user;
  },

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  },

  hasRole(requiredRole: string): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    // SUPER_ADMIN can do everything; other roles must match exactly
    return user.role === 'SUPER_ADMIN' || user.role === requiredRole;
  },
};

// Re-export
export { ApiError };
