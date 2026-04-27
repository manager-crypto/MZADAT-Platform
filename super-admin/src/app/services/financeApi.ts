// src/app/services/financeApi.ts
import { api } from './apiClient';

export interface FinanceSummary {
  total_properties: number;
  total_active_auctions: number;
  total_sold: number;
  total_pending: number;
  total_current_bids_sar: number;
  total_starting_bids_sar: number;
  avg_price_total_sar: number;
  featured_count: number;
  generated_at: string;
}

export const financeApi = {
  getSummary: () => api.get<FinanceSummary>('/api/admin/finance/summary'),
};
