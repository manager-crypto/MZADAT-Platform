// src/services/apiClient.ts
// Architecture Configuration: Connecting Frontend to Go & Python Microservices
//
// According to the Mzadat Platform Architecture:
//   1. Auth & Identity (Go) is accessed via REST
//   2. Auction Engine (Go) is accessed via WebSocket for real-time bidding
//   3. Admin API & ML Pipeline (Python) is accessed via REST
//   4. Payment Gateway (Go) handles SADAD/Mada processing via REST

const env = (import.meta as any).env ?? {};

const GO_AUTH_URL        = env.VITE_GO_AUTH_URL        || 'https://api.mzadat.com/auth';
const GO_AUCTION_WS_URL  = env.VITE_GO_AUCTION_WS_URL  || 'wss://ws.mzadat.com/auction';
const PYTHON_ADMIN_URL   = env.VITE_PYTHON_ADMIN_URL   || 'https://admin.mzadat.com/api';
const GO_PAYMENT_URL     = env.VITE_GO_PAYMENT_URL     || 'https://api.mzadat.com/payment';

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

// Safe localStorage access (SSR / blocked storage environments)
function safeGetToken(): string | null {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    return window.localStorage.getItem('access_token');
  } catch {
    return null;
  }
}

// ─── Generic REST fetcher ────────────────────────────────────────────────────
interface RequestOptions extends RequestInit {
  timeoutMs?: number;
}

async function fetchREST<T = unknown>(url: string, options: RequestOptions = {}): Promise<T> {
  const { timeoutMs = 15_000, ...rest } = options;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  const token = safeGetToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(rest.headers ?? {}),
  };

  try {
    const response = await fetch(url, {
      ...rest,
      headers,
      signal: controller.signal,
    });

    // Attempt to parse JSON regardless; many APIs return JSON error bodies.
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
      const msg =
        (body && typeof body === 'object' && 'error' in (body as any) && (body as any).error) ||
        `API Error: ${response.status}`;
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

// ─── Go Microservices Integrations ───────────────────────────────────────────

export const AuthServices = {
  login: (data: unknown) =>
    fetchREST(`${GO_AUTH_URL}/login`, { method: 'POST', body: JSON.stringify(data) }),
  verifyNafath: (data: unknown) =>
    fetchREST(`${GO_AUTH_URL}/nafath/verify`, { method: 'POST', body: JSON.stringify(data) }),
  checkSession: () => fetchREST(`${GO_AUTH_URL}/session`),
};

export const PaymentServices = {
  initiateSadad: (invoiceData: unknown) =>
    fetchREST(`${GO_PAYMENT_URL}/sadad/init`, { method: 'POST', body: JSON.stringify(invoiceData) }),
  verifyPayment: (transactionId: string) =>
    fetchREST(`${GO_PAYMENT_URL}/verify/${encodeURIComponent(transactionId)}`),
};

// ─── Auction WebSocket (with error handling + reconnect hook) ────────────────

export interface AuctionWsCallbacks {
  onMessage: (msg: unknown) => void;
  onError?: (err: Event) => void;
  onClose?: (ev: CloseEvent) => void;
  onOpen?: () => void;
}

export const AuctionWebsocket = {
  /**
   * Connects to the Go Auction Engine via WebSocket for real-time bids.
   * Returns the WebSocket instance so the caller can manage lifecycle.
   */
  connect(auctionId: string, callbacks: AuctionWsCallbacks): WebSocket {
    const id = encodeURIComponent(auctionId);
    const ws = new WebSocket(`${GO_AUCTION_WS_URL}/${id}`);

    ws.onopen = () => {
      callbacks.onOpen?.();
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        callbacks.onMessage(data);
      } catch (err) {
        // Never crash on malformed message
        // eslint-disable-next-line no-console
        console.warn('AuctionWS: dropped malformed message', err);
      }
    };

    ws.onerror = (err) => {
      callbacks.onError?.(err);
    };

    ws.onclose = (ev) => {
      callbacks.onClose?.(ev);
    };

    return ws;
  },
};

// ─── Python Services Integrations ────────────────────────────────────────────

export const AdminServices = {
  getAnalytics: () => fetchREST(`${PYTHON_ADMIN_URL}/analytics`),
  getMLValuation: (propertyData: unknown) =>
    fetchREST(`${PYTHON_ADMIN_URL}/valuation`, {
      method: 'POST',
      body: JSON.stringify(propertyData),
    }),
};
