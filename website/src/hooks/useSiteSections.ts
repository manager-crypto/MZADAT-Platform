// src/hooks/useSiteSections.ts
// Fetches the public list of VISIBLE site sections from the Go backend.
// Used by HomePage to dynamically show/hide sections based on Super Admin settings.
//
// Sections are identified by their English name (which is stable across languages).
// The /api/sections endpoint returns ONLY sections where is_visible = true.

import { useState, useEffect } from 'react';

const env = (import.meta as any).env ?? {};
const API_URL = env.VITE_API_URL || 'http://localhost:8080';

export interface PublicSection {
  id: string;
  name_ar: string;
  name_en: string;
  page: string;
  route: string | null;
  icon: string | null;
  sort_order: number;
}

interface UseSiteSectionsResult {
  /** Returns true if a section identified by its English name should be visible. */
  isVisible: (sectionNameEn: string) => boolean;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

// Module-level cache, shared across all uses on the page
let cachedSections: PublicSection[] | null = null;
let cachedAt = 0;
const CACHE_MS = 30_000;

export function useSiteSections(page = 'home'): UseSiteSectionsResult {
  const [sections, setSections] = useState<PublicSection[] | null>(cachedSections);
  const [loading, setLoading] = useState(cachedSections === null);
  const [error, setError] = useState<Error | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const now = Date.now();

    if (cachedSections && now - cachedAt < CACHE_MS && tick === 0) {
      setSections(cachedSections);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`${API_URL}/api/sections?page=${encodeURIComponent(page)}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        const list = (data?.data ?? []) as PublicSection[];
        cachedSections = list;
        cachedAt = Date.now();
        setSections(list);
        setError(null);
      })
      .catch((err) => {
        if (cancelled) return;
        // Fail open: on error, allow all sections to show
        console.warn('useSiteSections: fetch failed, falling back to show-all', err);
        setError(err instanceof Error ? err : new Error(String(err)));
        setSections(null); // null means "no data" → show all
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page, tick]);

  // Build a Set of visible English names
  const visibleNames = new Set(sections?.map((s) => s.name_en.toLowerCase()) ?? []);
  const hasData = sections !== null && sections.length > 0;

  return {
    isVisible: (sectionNameEn: string) => {
      // No data (loading or backend down) → show everything
      if (!hasData) return true;
      return visibleNames.has(sectionNameEn.toLowerCase());
    },
    loading,
    error,
    refetch: () => {
      cachedSections = null;
      setTick((v) => v + 1);
    },
  };
}
