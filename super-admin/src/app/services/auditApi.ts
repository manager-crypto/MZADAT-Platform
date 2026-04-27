// src/app/services/auditApi.ts
import { api } from './apiClient';

export interface AuditLogEntry {
  id: string;
  admin_id: string | null;
  admin_email: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  details: Record<string, unknown> | null;
  ip_address: string | null;
  created_at: string;
}

export interface AuditLogResponse {
  data: AuditLogEntry[];
  total: number;
  page: number;
  page_size: number;
}

export interface AuditLogFilters {
  page?: number;
  pageSize?: number;
  action?: string;
  entityType?: string;
  adminId?: string;
}

export const auditApi = {
  list: (filters: AuditLogFilters = {}) => {
    const params = new URLSearchParams();
    if (filters.page) params.set('page', String(filters.page));
    if (filters.pageSize) params.set('pageSize', String(filters.pageSize));
    if (filters.action) params.set('action', filters.action);
    if (filters.entityType) params.set('entityType', filters.entityType);
    if (filters.adminId) params.set('adminId', filters.adminId);
    const qs = params.toString();
    return api.get<AuditLogResponse>(`/api/admin/audit-log${qs ? `?${qs}` : ''}`);
  },
};
