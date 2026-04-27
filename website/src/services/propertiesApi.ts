const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

export interface Property {
  id: number;
  createdAt: string;
  updatedAt: string;
  deedNumber: string;
  planNumber: string;
  blockNumber: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  cityCode: string;
  cityAr: string;
  cityEn: string;
  districtAr: string;
  districtEn: string;
  latitude: number;
  longitude: number;
  type: 'residential' | 'commercial' | 'land' | 'farm';
  status: 'active' | 'sold' | 'auction' | 'pending';
  areaSqm: number;
  bedrooms: number;
  bathrooms: number;
  floorNumber: number;
  totalFloors: number;
  priceTotal: number;
  pricePerSqm: number;
  auctionStart?: string;
  auctionEnd?: string;
  startingBid?: number;
  currentBid?: number;
  bidIncrement?: number;
  imageUrls: string[];
  videoUrl?: string;
  ownerId: number;
  isFeatured: boolean;
  viewCount: number;
}

export interface PropertyListResponse {
  data: Property[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PropertyFilters {
  page?: number;
  pageSize?: number;
  type?: string;
  status?: string;
  city?: string;
  featured?: boolean;
  minPrice?: number;
  maxPrice?: number;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? `HTTP ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export const propertiesApi = {
  /** Fetch paginated, filtered property listings */
  list(filters: PropertyFilters = {}): Promise<PropertyListResponse> {
    const params = new URLSearchParams();
    if (filters.page)      params.set('page',      String(filters.page));
    if (filters.pageSize)  params.set('pageSize',  String(filters.pageSize));
    if (filters.type)      params.set('type',      filters.type);
    if (filters.status)    params.set('status',    filters.status);
    if (filters.city)      params.set('city',      filters.city);
    if (filters.featured)  params.set('featured',  'true');
    if (filters.minPrice)  params.set('minPrice',  String(filters.minPrice));
    if (filters.maxPrice)  params.set('maxPrice',  String(filters.maxPrice));

    const qs = params.toString();
    return request<PropertyListResponse>(`/api/properties${qs ? `?${qs}` : ''}`);
  },

  /** Fetch a single property by ID */
  getById(id: number): Promise<Property> {
    return request<Property>(`/api/properties/${id}`);
  },
};
