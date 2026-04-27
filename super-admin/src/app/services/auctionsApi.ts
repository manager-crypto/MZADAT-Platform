// src/app/services/auctionsApi.ts
import { api } from './apiClient';

export interface AuctionRow {
  id: number;
  title_ar: string;
  title_en: string;
  status: 'active' | 'sold' | 'auction' | 'pending';
  type: 'residential' | 'commercial' | 'land' | 'farm';
  city_ar: string;
  city_en: string;
  current_bid: number;
  starting_bid: number;
  auction_end: string | null;
  owner_id: string | null;
  created_at: string;
}

export interface AuctionsResponse {
  data: AuctionRow[];
  total: number;
}

export const auctionsApi = {
  list: () => api.get<AuctionsResponse>('/api/admin/auctions'),

  approve: (id: number | string) =>
    api.patch<{ ok: boolean; id: string; status: string }>(
      `/api/admin/auctions/${id}/approve`,
    ),

  reject: (id: number | string) =>
    api.patch<{ ok: boolean; id: string; status: string }>(
      `/api/admin/auctions/${id}/reject`,
    ),

  delete: (id: number | string) =>
    api.delete<{ ok: boolean; id: string }>(`/api/admin/auctions/${id}`),
};
