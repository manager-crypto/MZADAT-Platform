import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { propertiesApi, Property, PropertyListResponse, PropertyFilters } from '../services/propertiesApi';

interface UsePropertiesState {
  data: Property[];
  total: number;
  page: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  isLive: boolean; // true = data from API, false = mock fallback
}

const INITIAL_STATE: UsePropertiesState = {
  data: [],
  total: 0,
  page: 1,
  totalPages: 1,
  isLoading: true,
  error: null,
  isLive: false,
};

/**
 * useProperties — fetches property listings from the Go backend API.
 * Falls back gracefully to an empty array when the backend is offline
 * so the frontend remains usable during local development without Docker.
 */
export function useProperties(filters: PropertyFilters = {}) {
  const [state, setState] = useState<UsePropertiesState>(INITIAL_STATE);

  const fetchProperties = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const result: PropertyListResponse = await propertiesApi.list(filters);
      setState({
        data: result.data,
        total: result.total,
        page: result.page,
        totalPages: result.totalPages,
        isLoading: false,
        error: null,
        isLive: true,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setState({
        data: [],
        total: 0,
        page: 1,
        totalPages: 1,
        isLoading: false,
        error: message,
        isLive: false,
      });
    }
  }, [JSON.stringify(filters)]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return { ...state, refetch: fetchProperties };
}

/**
 * useFeaturedProperties — convenience hook for hero/featured sections.
 */
export function useFeaturedProperties(limit = 4) {
  return useProperties({ featured: true, pageSize: limit });
}

/**
 * usePropertyTitle — returns the correct bilingual title/city for a property
 * based on the active language. Automatically reacts to language switches.
 *
 * Usage:
 *   const { getTitle, getCity, getDescription } = usePropertyTitle();
 *   <h2>{getTitle(property)}</h2>
 */
export function usePropertyTitle() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const getTitle = (p: Property): string =>
    isArabic ? p.titleAr || p.titleEn : p.titleEn || p.titleAr;

  const getCity = (p: Property): string =>
    isArabic ? p.cityAr || p.cityEn : p.cityEn || p.cityAr;

  const getDistrict = (p: Property): string =>
    isArabic ? p.districtAr || p.districtEn : p.districtEn || p.districtAr;

  const getDescription = (p: Property): string =>
    isArabic ? p.descriptionAr || p.descriptionEn : p.descriptionEn || p.descriptionAr;

  return { getTitle, getCity, getDistrict, getDescription, isArabic };
}
