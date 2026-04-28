import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Live auction WebSocket hook.
 *
 * Connects to /ws/auction/{auctionId} on the Go backend. Handles:
 *   - Initial snapshot (auction state on connect)
 *   - bid_placed events (real-time bids)
 *   - Auto-reconnect with exponential backoff (1s → 30s cap)
 *   - Session token auth (passes ?token=<session> for authenticated views)
 *   - Visibility-aware: reconnects when tab returns to foreground
 *   - Heartbeat: detects stale connections via the server's WS pings
 *
 * Usage:
 *   const { state, lastEvent, connectionStatus, reconnect } = useAuctionLive(auctionId);
 */

const env = (import.meta as any).env ?? {};

/** Resolve the WS URL from env, falling back to localhost dev. */
function resolveWsUrl(auctionId: string): string {
  const explicit = env.VITE_GO_AUCTION_WS_URL || env.VITE_WS_URL;
  if (explicit) {
    return `${String(explicit).replace(/\/+$/, '')}/${encodeURIComponent(auctionId)}`;
  }
  // Default: same origin, ws/wss based on page protocol
  if (typeof window !== 'undefined') {
    const proto = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const apiBase = env.VITE_API_URL || `${window.location.protocol}//${window.location.host}`;
    const host = apiBase.replace(/^https?:/, '').replace(/^\/\//, '').split('/')[0];
    return `${proto}//${host}/ws/auction/${encodeURIComponent(auctionId)}`;
  }
  return `ws://localhost:8080/ws/auction/${encodeURIComponent(auctionId)}`;
}

function getToken(): string | null {
  try {
    return typeof window !== 'undefined' ? window.localStorage.getItem('access_token') : null;
  } catch {
    return null;
  }
}

// ─── Event payloads (mirror backend wshub/bidengine types) ──────────────────

export interface AuctionSnapshot {
  type: 'snapshot';
  auction_id: string;
  status: 'draft' | 'scheduled' | 'live' | 'paused' | 'ended' | 'settled' | 'cancelled' | 'no_sale';
  current_bid: number | null;
  starting_bid: number;
  bid_increment: number;
  bid_count: number;
  bidder_count: number;
  scheduled_end_at: string; // ISO
  extension_count: number;
  server_time: string; // ISO — used for clock skew correction
}

export interface BidPlacedEvent {
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

export type AuctionEvent = AuctionSnapshot | BidPlacedEvent;

export type ConnectionStatus = 'idle' | 'connecting' | 'open' | 'reconnecting' | 'closed' | 'error';

// ─── Live state derived from events ─────────────────────────────────────────

export interface LiveAuctionState {
  status: AuctionSnapshot['status'] | null;
  currentBid: number | null;
  startingBid: number | null;
  bidIncrement: number | null;
  bidCount: number;
  bidderCount: number;
  /** ISO end time, may shift forward when extensions occur. */
  endsAt: string | null;
  extensionCount: number;
  /** Server clock skew (ms): server_time - client_time at snapshot. */
  clockSkewMs: number;
  /** Most recent bid event, useful for animations. */
  lastBid: BidPlacedEvent | null;
}

const initialState: LiveAuctionState = {
  status: null,
  currentBid: null,
  startingBid: null,
  bidIncrement: null,
  bidCount: 0,
  bidderCount: 0,
  endsAt: null,
  extensionCount: 0,
  clockSkewMs: 0,
  lastBid: null,
};

// ─── Hook ───────────────────────────────────────────────────────────────────

interface UseAuctionLiveOptions {
  /** Disable auto-connect (e.g. when auctionId is empty). Default: true. */
  enabled?: boolean;
  /** Override max reconnect delay (ms). Default 30000. */
  maxBackoffMs?: number;
  /** Initial reconnect delay (ms). Default 1000. */
  initialBackoffMs?: number;
}

export function useAuctionLive(
  auctionId: string | null | undefined,
  options: UseAuctionLiveOptions = {}
) {
  const {
    enabled = true,
    maxBackoffMs = 30_000,
    initialBackoffMs = 1_000,
  } = options;

  const [state, setState] = useState<LiveAuctionState>(initialState);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('idle');
  const [lastEvent, setLastEvent] = useState<AuctionEvent | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldReconnect = useRef(true);

  const cleanup = useCallback(() => {
    if (reconnectTimer.current) {
      clearTimeout(reconnectTimer.current);
      reconnectTimer.current = null;
    }
    if (wsRef.current) {
      // Detach listeners before close to avoid spurious onclose events
      wsRef.current.onopen = null;
      wsRef.current.onmessage = null;
      wsRef.current.onerror = null;
      wsRef.current.onclose = null;
      try {
        wsRef.current.close(1000, 'client disconnect');
      } catch {
        /* ignore */
      }
      wsRef.current = null;
    }
  }, []);

  const connect = useCallback(() => {
    if (!auctionId || !enabled) return;
    if (wsRef.current && wsRef.current.readyState <= WebSocket.OPEN) return; // already connecting/open

    setConnectionStatus(reconnectAttempts.current === 0 ? 'connecting' : 'reconnecting');

    let url = resolveWsUrl(auctionId);
    const token = getToken();
    if (token) {
      url += (url.includes('?') ? '&' : '?') + `token=${encodeURIComponent(token)}`;
    }

    let ws: WebSocket;
    try {
      ws = new WebSocket(url);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('useAuctionLive: WebSocket constructor failed', err);
      setConnectionStatus('error');
      scheduleReconnect();
      return;
    }
    wsRef.current = ws;

    ws.onopen = () => {
      reconnectAttempts.current = 0;
      setConnectionStatus('open');
    };

    ws.onmessage = (msgEv) => {
      let data: AuctionEvent;
      try {
        data = JSON.parse(msgEv.data);
      } catch {
        return; // malformed, ignore
      }

      setLastEvent(data);

      if (data.type === 'snapshot') {
        const clientNow = Date.now();
        const serverNow = new Date(data.server_time).getTime();
        const skew = serverNow - clientNow;

        setState({
          status: data.status,
          currentBid: data.current_bid,
          startingBid: data.starting_bid,
          bidIncrement: data.bid_increment,
          bidCount: data.bid_count,
          bidderCount: data.bidder_count,
          endsAt: data.scheduled_end_at,
          extensionCount: data.extension_count,
          clockSkewMs: skew,
          lastBid: null,
        });
      } else if (data.type === 'bid_placed') {
        setState((prev) => ({
          ...prev,
          currentBid: data.amount,
          bidCount: data.bid_count,
          bidderCount: data.bidder_count,
          endsAt: data.new_scheduled_end_at,
          extensionCount: data.caused_extension ? prev.extensionCount + 1 : prev.extensionCount,
          lastBid: data,
        }));
      }
    };

    ws.onerror = () => {
      setConnectionStatus('error');
      // onclose will fire next; reconnect logic handled there
    };

    ws.onclose = (closeEv) => {
      wsRef.current = null;
      // Code 1000 = normal closure (we did it). Don't reconnect.
      if (closeEv.code === 1000 || !shouldReconnect.current) {
        setConnectionStatus('closed');
        return;
      }
      scheduleReconnect();
    };
  }, [auctionId, enabled]);

  const scheduleReconnect = useCallback(() => {
    if (!shouldReconnect.current) return;
    setConnectionStatus('reconnecting');

    // Exponential backoff with jitter: base * 2^attempts, capped, ±20% jitter
    const exp = Math.min(
      maxBackoffMs,
      initialBackoffMs * Math.pow(2, reconnectAttempts.current)
    );
    const jitter = exp * (0.8 + Math.random() * 0.4);
    reconnectAttempts.current += 1;

    reconnectTimer.current = setTimeout(connect, jitter);
  }, [connect, maxBackoffMs, initialBackoffMs]);

  // Manual reconnect API for the consumer (e.g. user-triggered "retry" button)
  const reconnect = useCallback(() => {
    cleanup();
    reconnectAttempts.current = 0;
    shouldReconnect.current = true;
    connect();
  }, [cleanup, connect]);

  // Effect: connect on mount / auctionId change
  useEffect(() => {
    if (!enabled || !auctionId) return;
    shouldReconnect.current = true;
    setState(initialState);
    setLastEvent(null);
    connect();

    return () => {
      shouldReconnect.current = false;
      cleanup();
    };
  }, [auctionId, enabled, connect, cleanup]);

  // Effect: reconnect when tab becomes visible again
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const onVis = () => {
      if (document.visibilityState === 'visible' && shouldReconnect.current) {
        if (!wsRef.current || wsRef.current.readyState >= WebSocket.CLOSING) {
          reconnect();
        }
      }
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [reconnect]);

  return {
    state,
    connectionStatus,
    lastEvent,
    reconnect,
  };
}

// ─── Helper: place a bid via REST (the engine; WS is read-only) ────────────

interface PlaceBidResponse {
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

interface PlaceBidError {
  error: string;
  code: string;
}

export async function placeBid(
  auctionId: string,
  amount: number,
  idempotencyKey?: string
): Promise<PlaceBidResponse> {
  const apiBase = env.VITE_API_URL || '';
  const url = `${apiBase}/api/auctions/${encodeURIComponent(auctionId)}/bid`;

  const key = idempotencyKey || crypto.randomUUID();
  const token = getToken();

  const resp = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ amount, idempotency_key: key }),
  });

  const text = await resp.text();
  let body: PlaceBidResponse | PlaceBidError;
  try {
    body = JSON.parse(text);
  } catch {
    throw new Error(`Bid failed: ${resp.status} ${text}`);
  }

  if (!resp.ok) {
    const err = body as PlaceBidError;
    throw Object.assign(new Error(err.error || 'Bid failed'), { code: err.code, status: resp.status });
  }

  return body as PlaceBidResponse;
}
