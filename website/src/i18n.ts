import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import ar from './locales/ar';

const LANG_KEY = 'mzadat_lang';

// Safe localStorage read
function savedLang(): 'ar' | 'en' {
  try {
    if (typeof window === 'undefined') return 'ar';
    const v = window.localStorage.getItem(LANG_KEY);
    return v === 'en' ? 'en' : 'ar';
  } catch {
    return 'ar';
  }
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: savedLang(),
  fallbackLng: 'ar',
  interpolation: {
    escapeValue: false, // React already escapes
  },
  returnNull: false,
});

// Apply dir + lang attributes on <html>; leave styling to CSS (index.css).
function applyDirection(lng: string) {
  if (typeof document === 'undefined') return;
  const isAr = lng.startsWith('ar');
  document.documentElement.lang = isAr ? 'ar' : 'en';
  document.documentElement.dir = isAr ? 'rtl' : 'ltr';
}

i18n.on('languageChanged', (lng) => {
  applyDirection(lng);
  try {
    window.localStorage.setItem(LANG_KEY, lng);
  } catch {
    /* ignore */
  }
});

// Initial application
applyDirection(i18n.language || 'ar');

export default i18n;
