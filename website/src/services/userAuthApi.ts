// src/services/userAuthApi.ts
// API client for customer authentication (not admin).
// Talks to the Go backend at /api/auth/*

const env = (import.meta as any).env ?? {};
const API_URL = env.VITE_API_URL || 'http://localhost:8080';
const TOKEN_KEY = 'mzadat_user_token';
const USER_KEY = 'mzadat_user';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CurrentUser {
  id: string;
  email: string;
  phone: string;
  full_name: string;
  role: string;
  account_type: string;
  phone_verified: boolean;
  email_verified: boolean;
  kyc_status: string;
}

export interface RegisterPayload {
  email: string;
  phone: string;
  password: string;
  full_name: string;
  id_number?: string;
  nationality?: string;
  residence_city?: string;
  account_type?: 'individual' | 'broker' | 'company';
}

export interface RegisterResponse {
  ok: true;
  user_id: string;
  next: 'verify_phone';
  phone: string;
  message: string;
}

export interface LoginResponse {
  token: string;
  user_id: string;
  email: string;
  full_name: string;
  role: string;
  phone_verified: boolean;
  expires_at: string;
}

/** Field-level API error (from backend) */
export class UserAuthError extends Error {
  readonly status: number;
  readonly code: string;
  readonly field: string;
  constructor(message: string, status: number, code: string, field: string) {
    super(message);
    this.name = 'UserAuthError';
    this.status = status;
    this.code = code;
    this.field = field;
  }
}

// ─── Token / user storage ────────────────────────────────────────────────────

function safeGetToken(): string | null {
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function safeSetToken(token: string | null) {
  try {
    if (token) {
      window.localStorage.setItem(TOKEN_KEY, token);
    } else {
      window.localStorage.removeItem(TOKEN_KEY);
    }
  } catch {
    /* ignore */
  }
}

function safeGetUser(): CurrentUser | null {
  try {
    const raw = window.localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function safeSetUser(user: CurrentUser | null) {
  try {
    if (user) {
      window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(USER_KEY);
    }
  } catch {
    /* ignore */
  }
}

// ─── Core fetch wrapper ─────────────────────────────────────────────────────

async function authFetch<T>(path: string, init: RequestInit = {}, auth = false): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(init.headers as Record<string, string> || {}),
  };

  if (auth) {
    const token = safeGetToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...init,
      headers,
      signal: controller.signal,
    });

    const text = await res.text();
    let body: any = null;
    if (text) {
      try {
        body = JSON.parse(text);
      } catch {
        body = text;
      }
    }

    if (!res.ok) {
      const message = (body && typeof body === 'object' && body.error) || `HTTP ${res.status}`;
      const code = (body && body.code) || '';
      const field = (body && body.field) || '';
      throw new UserAuthError(String(message), res.status, code, field);
    }

    return body as T;
  } catch (err) {
    if (err instanceof UserAuthError) throw err;
    if ((err as Error).name === 'AbortError') {
      throw new UserAuthError('Request timed out', 408, 'TIMEOUT', '');
    }
    throw new UserAuthError((err as Error).message || 'Network error', 0, 'NETWORK', '');
  } finally {
    clearTimeout(timeout);
  }
}

// ─── Public API ─────────────────────────────────────────────────────────────

export const userAuthApi = {
  async register(payload: RegisterPayload): Promise<RegisterResponse> {
    return authFetch<RegisterResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async login(email: string, password: string): Promise<LoginResponse> {
    const resp = await authFetch<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    // Save token + user snapshot locally
    safeSetToken(resp.token);
    safeSetUser({
      id: resp.user_id,
      email: resp.email,
      phone: '',
      full_name: resp.full_name,
      role: resp.role,
      account_type: '',
      phone_verified: resp.phone_verified,
      email_verified: false,
      kyc_status: 'pending',
    });
    return resp;
  },

  async logout(): Promise<void> {
    try {
      await authFetch('/api/auth/logout', { method: 'POST' }, true);
    } catch {
      /* ignore — we're logging out anyway */
    }
    safeSetToken(null);
    safeSetUser(null);
  },

  async me(): Promise<CurrentUser> {
    const u = await authFetch<CurrentUser>('/api/auth/me', { method: 'GET' }, true);
    safeSetUser(u);
    return u;
  },

  async otpSend(phone: string, purpose: 'phone_verify' | 'password_reset' = 'phone_verify') {
    return authFetch<{ ok: true; phone: string; expires_in: number }>('/api/auth/otp/send', {
      method: 'POST',
      body: JSON.stringify({ phone, purpose }),
    });
  },

  async otpVerify(phone: string, code: string, purpose: 'phone_verify' | 'password_reset' = 'phone_verify') {
    return authFetch<{ ok: true; verified?: boolean; reset_token?: string }>(
      '/api/auth/otp/verify',
      {
        method: 'POST',
        body: JSON.stringify({ phone, code, purpose }),
      },
    );
  },

  async passwordResetRequest(phone: string) {
    return authFetch<{ ok: true }>('/api/auth/password/reset-request', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    });
  },

  async passwordResetConfirm(resetToken: string, newPassword: string) {
    return authFetch<{ ok: true }>('/api/auth/password/reset-confirm', {
      method: 'POST',
      body: JSON.stringify({ reset_token: resetToken, new_password: newPassword }),
    });
  },

  // ─── Synchronous helpers for React ─────────────────────────────────────
  getCurrentUser(): CurrentUser | null {
    const token = safeGetToken();
    const user = safeGetUser();
    return token && user ? user : null;
  },

  isAuthenticated(): boolean {
    return !!(safeGetToken() && safeGetUser());
  },

  clearSession() {
    safeSetToken(null);
    safeSetUser(null);
  },
};
