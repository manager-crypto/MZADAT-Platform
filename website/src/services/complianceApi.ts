// src/services/complianceApi.ts
// Compliance Architecture Layer for Absher/Nafath, SAMA, and CITC (CST) integrations.
//
// Nafath calls hit the real Go backend at /api/auth/nafath/*.
// SAMA / CITC routes are not yet implemented server-side; they fall back to a
// mocked response only when VITE_ENABLE_MOCK_FALLBACK is explicitly enabled.

const env = (import.meta as any).env ?? {};
const API_URL: string = env.VITE_API_URL || 'http://localhost:8080';
const ENABLE_MOCK_FALLBACK: boolean = String(env.VITE_ENABLE_MOCK_FALLBACK) === 'true';

interface FetchOptions extends RequestInit {
  timeoutMs?: number;
}

async function backendFetch<T = any>(path: string, options: FetchOptions = {}): Promise<T> {
  const { timeoutMs = 15_000, ...rest } = options;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  const token = (() => {
    try {
      return typeof window !== 'undefined' ? window.localStorage.getItem('access_token') : null;
    } catch {
      return null;
    }
  })();

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(rest.headers ?? {}),
  };

  try {
    const response = await fetch(`${API_URL}${path}`, { ...rest, headers, signal: controller.signal });
    const text = await response.text();
    const body = text ? safeJSON(text) : null;
    if (!response.ok) {
      const msg =
        (body && typeof body === 'object' && 'error' in body && (body as any).error) ||
        `API Error: ${response.status}`;
      throw new Error(String(msg));
    }
    return body as T;
  } finally {
    clearTimeout(timer);
  }
}

function safeJSON(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

// Used for SAMA/CITC routes that don't have a real backend yet.
async function mockableFetch<T = any>(path: string, options: FetchOptions = {}): Promise<T> {
  try {
    return await backendFetch<T>(path, options);
  } catch (error) {
    if (ENABLE_MOCK_FALLBACK) {
      console.warn(`[Compliance mock fallback] ${path}:`, (error as Error).message);
      return { success: true, mocked: true, timestamp: new Date().toISOString() } as T;
    }
    throw error;
  }
}

// ─── Absher / Nafath ────────────────────────────────────────────────────────

export const AbsherIntegration = {
  /** POST /api/auth/nafath/initiate — returns { request_id, random_number, expires_at, mode }. */
  requestVerification: (nationalId: string) =>
    backendFetch<{
      request_id: string;
      random_number: number;
      expires_at: string;
      mode: 'mock' | 'live';
    }>('/api/auth/nafath/initiate', {
      method: 'POST',
      body: JSON.stringify({ national_id: nationalId }),
    }),

  /** GET /api/auth/nafath/status/{request_id}. */
  checkStatus: (requestId: string) =>
    backendFetch<{
      request_id: string;
      status: 'WAITING' | 'APPROVED' | 'REJECTED' | 'EXPIRED';
      national_id?: string;
      full_name?: string;
      birth_date?: string;
      user_id?: string;
      token?: string;
      updated_at: string;
    }>(`/api/auth/nafath/status/${encodeURIComponent(requestId)}`),
};

// ─── SAMA (no backend yet — falls back to mock when flag is on) ─────────────

export const SamaCompliance = {
  checkAmlStatus: (userId: string) =>
    mockableFetch(`/api/compliance/sama/aml/check/${encodeURIComponent(userId)}`),

  logTransaction: (transactionDetails: any) =>
    mockableFetch('/api/compliance/sama/transactions/log', {
      method: 'POST',
      body: JSON.stringify(transactionDetails),
    }),

  holdEscrow: (amount: number, auctionId: string) =>
    mockableFetch('/api/compliance/sama/escrow/hold', {
      method: 'POST',
      body: JSON.stringify({ amount, auctionId }),
    }),
};

// ─── CITC / CST (no backend yet — falls back to mock when flag is on) ───────

export const CitcCompliance = {
  logUserConsent: (userId: string, consentVersion: string) =>
    mockableFetch('/api/compliance/citc/consent/log', {
      method: 'POST',
      body: JSON.stringify({ userId, consentVersion }),
    }),

  submitPerformanceReport: (metrics: any) =>
    mockableFetch('/api/compliance/citc/reports/performance', {
      method: 'POST',
      body: JSON.stringify(metrics),
    }),
};
