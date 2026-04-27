import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import arTranslations from '../../locales/ar.json';
import enTranslations from '../../locales/en.json';

type Language = 'ar' | 'en';
type Direction = 'rtl' | 'ltr';

interface TranslationContextType {
  language: Language;
  direction: Direction;
  t: (key: string, params?: Record<string, any>) => string;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const translations = {
  ar: arTranslations,
  en: enTranslations,
};

const defaultTranslationContext: TranslationContextType = {
  language: 'ar',
  direction: 'rtl',
  t: (key: string) => key,
  setLanguage: () => {},
  toggleLanguage: () => {},
};

const TranslationContext = createContext<TranslationContextType>(defaultTranslationContext);

interface TranslationProviderProps {
  children: ReactNode;
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  const [language, setLanguageState] = useState<Language>('ar');

  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';

  // Apply direction and language to document
  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
    
    // Apply font family based on language
    if (language === 'ar') {
      document.documentElement.style.setProperty('--font-primary', "'Noto Kufi Arabic', sans-serif");
    } else {
      document.documentElement.style.setProperty('--font-primary', "'Helvetica Neue', Helvetica, Arial, sans-serif");
    }
  }, [language, direction]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState(prev => prev === 'ar' ? 'en' : 'ar');
  };

  // Translation function with nested key support (e.g., "common.save")
  const t = (key: string, params?: Record<string, any>): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    if (typeof value !== 'string') {
      return key;
    }

    // Replace parameters in translation (e.g., {{count}})
    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey]?.toString() || match;
      });
    }

    return value;
  };

  const value = {
    language,
    direction,
    t,
    setLanguage,
    toggleLanguage,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation(): TranslationContextType {
  return useContext(TranslationContext);
}