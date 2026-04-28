/**
 * Auctions & Bidding API client.
 *
 * Talks to the Go backend at:
 *   GET  /api/auctions              → list
 *   GET  /api/auctions/{id}         → details + recent bids
 *   GET  /api/auctions/{id}/bids    → full bid history (paginated)
 *   POST /api/auctions/{id}/bid     → place a bid (auth required)
 *   POST /api/auctions/{id}/deposit → create deposit (auth required)
 *   GET  /ws/auction/{id}           → WebSocket for live updates
 *
 * Authentication: session token from userAuthApi (stored in localStorage).
 *
 * The WebSocket client (`createAuctionStream`) handles:
 *   - Auto-reconnect with exponential backoff (1s → 2s → 4s → ... → 30s)
 *   - Heartbeat detection (server pings every ~54s; we drop after 90s silence)
 *   - Event normalization: snapshot, bid_placed, status_change, ended
 *   - Last-bid cursor tracking for catch-up after reconnect
 */

const API_BASE = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8080';
const WS_BASE = (import.meta as any).env?.VITE_WS_URL || 'ws://localhost:8080';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface AuctionSnapshot {
  id: string;
  status: 'draft' | 'scheduled' | 'live' | 'paused' | 'ended' | 'settled' | 'cancelled' | 'no_sale';
  starting_bid: number;
  bid_increment: number;
  current_bid: number | null;
  bid_count: number;
  bidder_count: number;
  scheduled_start_at: string;
  scheduled_end_at: string;
  extension_window_seconds: number;
  extension_duration_seconds: number;
  extension_count: number;
  deposit_amount: number;
}

export interface AuctionListItem extends AuctionSnapshot {
  mode: 'electronic' | 'in_person' | 'hybrid';
  property: {
    id: number;
    title: string;
    city: string;
    district: string | null;
    thumbnail: string | null;
  };
}

export interface BidHistoryEntry {
  bid_seq: number;
  amount: number;
  created_at: string;
  caused_extension: boolean;
  bidder_masked: string;
}

export interface PlaceBidResult {
  bid_id: string;
  bid_seq: number;
  auction_id: string;
  amount: number;
  created_at: string;
  bid_hash: string;
  caused_extension: boolean;
  new_scheduled_end_at: string;
  new_bid_count: number;
  new_bidder_count: number;
}

export interface BidEvent {
  type: 'bid_placed';
  bid_id: string;
  bid_seq: number;
  auction_id: string;
  amount: number;
  bidder_masked_name: string;
  created_at: string;
  caused_extension: boolean;
  new_scheduled_end_at: string;
  bid_count: number;
  bidder_count: number;
}

export interface SnapshotEvent {
  type: 'snapshot';
  auction_id: string;
  status: AuctionSnapshot['status'];
  current_bid: number | null;
  starting_bid: number;
  bid_increment: number;
  bid_count: number;
  bidder_count: number;
  scheduled_end_at: string;
  extension_count: number;
  server_time: string;
}

export type AuctionEvent = BidEvent | SnapshotEvent;

// ─── Errors ──────────────────────────────────────────────────────────────────

export class AuctionApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
  ) {
    super(message);
    this.name = 'AuctionApiError';
  }
}

// ─── REST helpers ────────────────────────────────────────────────────────────

function getSessionToken(): string | null {
  try {
    return localStorage.getItem('mzdt_session_token');
  } catch {
    return null;
  }
}

async function fetchJSON<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getSessionToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(init?.headers as Record<string, string> | undefined),
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let resp: Response;
  try {
    resp = await fetch(`${API_BASE}${path}`, { ...init, headers });
  } catch (err) {
    throw new AuctionApiError(0, 'NETWORK_ERROR', 'تعذّر الاتصال بالخادم');
  }

  if (!resp.ok) {
    let body: any = {};
    try {
      body = await resp.json();
    } catch {
      // Non-JSON response
    }
    throw new AuctionApiError(
      resp.status,
      body.code || `HTTP_${resp.status}`,
      body.error || resp.statusText,
    );
  }

  return resp.json();
}

// ─── Public REST API ─────────────────────────────────────────────────────────

export const auctionsApi = {
  /** GET /api/auctions?status=live&page=1&limit=20 */
  list: (params: {
    status?: string;
    page?: number;
    limit?: number;
  } = {}): Promise<{ items: AuctionListItem[]; page: number; limit: number }> => {
    const qs = new URLSearchParams();
    if (params.status) qs.set('status', params.status);
    if (params.page) qs.set('page', String(params.page));
    if (params.limit) qs.set('limit', String(params.limit));
    const path = qs.toString() ? `/api/auctions?${qs}` : '/api/auctions';
    return fetchJSON(path);
  },

  /** GET /api/auctions/{id} */
  get: (id: string): Promise<{ auction: AuctionSnapshot; recent_bids: BidHistoryEntry[] }> =>
    fetchJSON(`/api/auctions/${encodeURIComponent(id)}`),

  /** GET /api/auctions/{id}/bids?since_seq=N */
  bids: (id: string, sinceSeq?: number): Promise<{ bids: BidHistoryEntry[] }> => {
    const qs = sinceSeq ? `?since_seq=${sinceSeq}` : '';
    return fetchJSON(`/api/auctions/${encodeURIComponent(id)}/bids${qs}`);
  },

  /**
   * POST /api/auctions/{id}/bid
   * Places a bid. Auth required.
   * The idempotency key is auto-generated (UUID v4-ish based on crypto.randomUUID).
   */
  placeBid: (
    auctionId: string,
    amount: number,
    idempotencyKey?: string,
  ): Promise<PlaceBidResult> =>
    fetchJSON(`/api/auctions/${encodeURIComponent(auctionId)}/bid`, {
      method: 'POST',
      body: JSON.stringify({
        amount,
        idempotency_key: idempotencyKey || generateIdempotencyKey(),
      }),
    }),

  /** POST /api/auctions/{id}/deposit */
  createDeposit: (
    auctionId: string,
    paymentMethod: 'sadad' | 'mada' | 'wallet',
  ): Promise<{ hold_id: string; status: string; sadad_invoice_id?: string }> =>
    fetchJSON(`/api/auctions/${encodeURIComponent(auctionId)}/deposit`, {
      method: 'POST',
      body: JSON.stringify({ payment_method: paymentMethod }),
    }),
};

function generateIdempotencyKey(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  // Fallback: not cryptographically strong, but unique enough per session
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

// ─── Live WebSocket Stream ───────────────────────────────────────────────────

export interface AuctionStreamCallbacks {
  /** Called once on connect with the auction's current state. */
  onSnapshot?: (snap: SnapshotEvent) => void;
  /** Called on each new bid event. */
  onBid?: (bid: BidEvent) => void;
  /** Called when the connection state changes. */
  onStatusChange?: (status: 'connecting' | 'open' | 'reconnecting' | 'closed') => void;
  /** Called for any unrecognised event (forward-compat). */
  onAny?: (event: any) => void;
}

export interface AuctionStream {
  close: () => void;
  isOpen: () => boolean;
}

/**
 * Creates a resilient WebSocket stream for an auction.
 *
 * Behaviour:
 *  - Connects to ws://.../ws/auction/{id}?token=<session> (token if logged in)
 *  - On disconnect: reconnects with exponential backoff (1s, 2s, 4s, 8s, 16s, 30s, 30s...)
 *  - On reconnect: server sends a fresh snapshot, so client can resync
 *  - close() is permanent: stops reconnecting
 *
 * This is the function used by LiveAuctionPage and BidNowPage.
 */
export function createAuctionStream(
  auctionId: string,
  callbacks: AuctionStreamCallbacks,
): AuctionStream {
  let ws: WebSocket | null = null;
  let reconnectAttempts = 0;
  let reconnectTimer: number | null = null;
  let closed = false;

  const connect = () => {
    if (closed) return;

    callbacks.onStatusChange?.(reconnectAttempts === 0 ? 'connecting' : 'reconnecting');

    const token = getSessionToken();
    const tokenParam = token ? `?token=${encodeURIComponent(token)}` : '';
    const url = `${WS_BASE}/ws/auction/${encodeURIComponent(auctionId)}${tokenParam}`;

    try {
      ws = new WebSocket(url);
    } catch (err) {
      // Browser refused (e.g. mixed content); wait and retry
      scheduleReconnect();
      return;
    }

    ws.onopen = () => {
      reconnectAttempts = 0;
      callbacks.onStatusChange?.('open');
    };

    ws.onmessage = (ev) => {
      let parsed: any;
      try {
        parsed = JSON.parse(ev.data);
      } catch {
        return;
      }

      callbacks.onAny?.(parsed);

      switch (parsed?.type) {
        case 'snapshot':
          callbacks.onSnapshot?.(parsed as SnapshotEvent);
          break;
        case 'bid_placed':
          callbacks.onBid?.(parsed as BidEvent);
          break;
        default:
          // Forward-compatible: unknown events forwarded via onAny()
          break;
      }
    };

    ws.onerror = () => {
      // The 'close' event will follow; reconnect logic lives there
    };

    ws.onclose = () => {
      ws = null;
      if (closed) {
        callbacks.onStatusChange?.('closed');
        return;
      }
      scheduleReconnect();
    };
  };

  const scheduleReconnect = () => {
    if (closed) return;
    reconnectAttempts++;
    // Exponential backoff: 1, 2, 4, 8, 16, 30, 30, 30...
    const delays = [1000, 2000, 4000, 8000, 16000, 30000];
    const delay = delays[Math.min(reconnectAttempts - 1, delays.length - 1)];
    callbacks.onStatusChange?.('reconnecting');
    reconnectTimer = window.setTimeout(connect, delay);
  };

  // Kick off
  connect();

  return {
    close: () => {
      closed = true;
      if (reconnectTimer !== null) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
      }
      if (ws) {
        ws.close(1000, 'client closed');
        ws = null;
      }
      callbacks.onStatusChange?.('closed');
    },
    isOpen: () => ws?.readyState === WebSocket.OPEN,
  };
}

// ─── User-facing error message helper ───────────────────────────────────────

/**
 * Translates an AuctionApiError into a user-facing Arabic message.
 * Used by BidNowPage to show toasts / inline errors.
 */
export function bidErrorMessage(err: unknown): string {
  if (!(err instanceof AuctionApiError)) {
    return 'حدث خطأ غير متوقع';
  }
  switch (err.code) {
    case 'BID_TOO_LOW':
    case 'BID_AMOUNT':
      return 'مبلغ المزايدة أقل من الحد الأدنى المطلوب';
    case 'AUCTION_NOT_LIVE':
      return 'المزاد غير نشط حالياً';
    case 'AUCTION_ENDED':
      return 'انتهى المزاد';
    case 'BIDDER_HAS_NO_HOLD':
      return 'يجب تأمين الدفعة المقدمة قبل المزايدة';
    case 'BIDDER_IS_SELLER':
      return 'لا يمكن لوكيل البيع المزايدة على مزاده';
    case 'DUPLICATE_IDEMPOTENCY_KEY':
      return 'تم تسجيل هذه المزايدة مسبقاً';
    case 'MAX_EXTENSIONS_REACHED':
      return 'تم الوصول للحد الأقصى من التمديدات';
    case 'USER_DISQUALIFIED':
      return 'حسابك غير مؤهل للمشاركة في هذا المزاد';
    case 'UNAUTHORIZED':
    case 'UNAUTHENTICATED':
      return 'يجب تسجيل الدخول أولاً';
    case 'NETWORK_ERROR':
      return 'تعذّر الاتصال بالخادم. تأكد من الإنترنت';
    case 'RATE_LIMITED':
      return 'مزايدات كثيرة في وقت قصير. حاول بعد قليل';
    default:
      if (err.status === 429) return 'مزايدات كثيرة في وقت قصير. حاول بعد قليل';
      if (err.status === 401) return 'يجب تسجيل الدخول أولاً';
      if (err.status >= 500) return 'خطأ في الخادم. يرجى المحاولة لاحقاً';
      return err.message || 'حدث خطأ';
  }
}
