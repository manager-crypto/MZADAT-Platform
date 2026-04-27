// src/app/services/apiClient.ts
// Central API client for all Super Admin ↔ Go backend communication.
//
// Responsibilities:
//   - Attach Bearer token automatically
//   - Timeout requests (default 15s)
//   - Parse JSON errors consistently
//   - Throw typed ApiError
//   - Auto-redirect to /login on 401

const env = (import.meta as any).env ?? {};

const API_BASE = env.VITE_API_URL || 'http://localhost:8080';
const TOKEN_KEY = env.VITE_TOKEN_KEY || 'mzadat_admin_token';

// ─── Typed error ─────────────────────────────────────────────────────────────
export class ApiError extends Error {
  readonly status: number;
  readonly body: unknown;
  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

// ─── Token storage (safe) ────────────────────────────────────────────────────
function safeGetToken(): string | null {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function safeSetToken(token: string | null) {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    if (token) {
      window.localStorage.setItem(TOKEN_KEY, token);
    } else {
      window.localStorage.removeItem(TOKEN_KEY);
    }
  } catch {
    /* ignore */
  }
}

// ─── Session event bus ───────────────────────────────────────────────────────
// Components can listen for `auth:expired` to redirect to login
const authEvents = new EventTarget();

export function onAuthExpired(handler: () => void): () => void {
  const listener = () => handler();
  authEvents.addEventListener('expired', listener);
  return () => authEvents.removeEventListener('expired', listener);
}

// ─── Core fetch wrapper ──────────────────────────────────────────────────────
interface RequestOptions extends RequestInit {
  timeoutMs?: number;
  skipAuth?: boolean; // for /login, /logout
}

export async function apiFetch<T = unknown>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { timeoutMs = 15_000, skipAuth = false, ...rest } = options;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(rest.headers as Record<string, string> || {}),
  };

  if (!skipAuth) {
    const token = safeGetToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const url = path.startsWith('http') ? path : `${API_BASE}${path}`;

  try {
    const response = await fetch(url, {
      ...rest,
      headers,
      signal: controller.signal,
    });

    const text = await response.text();
    let body: unknown = null;
    if (text) {
      try {
        body = JSON.parse(text);
      } catch {
        body = text;
      }
    }

    if (!response.ok) {
      // Auto-handle expired sessions
      if (response.status === 401 && !skipAuth) {
        safeSetToken(null);
        authEvents.dispatchEvent(new Event('expired'));
      }
      const msg =
        (body && typeof body === 'object' && 'error' in (body as any) && (body as any).error) ||
        `Request failed with status ${response.status}`;
      throw new ApiError(String(msg), response.status, body);
    }

    return body as T;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    if ((err as Error).name === 'AbortError') {
      throw new ApiError('Request timed out', 408);
    }
    throw new ApiError((err as Error).message || 'Network error', 0);
  } finally {
    clearTimeout(timeout);
  }
}

// ─── Convenience wrappers ────────────────────────────────────────────────────
export const api = {
  get: <T = unknown>(path: string, opts?: RequestOptions) =>
    apiFetch<T>(path, { ...opts, method: 'GET' }),

  post: <T = unknown>(path: string, body?: unknown, opts?: RequestOptions) =>
    apiFetch<T>(path, {
      ...opts,
      method: 'POST',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),

  patch: <T = unknown>(path: string, body?: unknown, opts?: RequestOptions) =>
    apiFetch<T>(path, {
      ...opts,
      method: 'PATCH',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),

  put: <T = unknown>(path: string, body?: unknown, opts?: RequestOptions) =>
    apiFetch<T>(path, {
      ...opts,
      method: 'PUT',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),

  delete: <T = unknown>(path: string, opts?: RequestOptions) =>
    apiFetch<T>(path, { ...opts, method: 'DELETE' }),
};

// ─── Re-export token helpers ─────────────────────────────────────────────────
export const tokenStorage = {
  get: safeGetToken,
  set: safeSetToken,
  clear: () => safeSetToken(null),
};
