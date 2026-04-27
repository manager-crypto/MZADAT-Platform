import { useTranslation } from '../context/TranslationContext';

/**
 * Custom hook for handling RTL/LTR specific logic
 * Provides utility functions for common i18n patterns
 */
export function useDirection() {
  const { direction, language } = useTranslation();
  const isRTL = direction === 'rtl';
  const isArabic = language === 'ar';

  return {
    direction,
    isRTL,
    isArabic,
    
    // Text alignment utilities
    textAlign: isRTL ? 'text-right' : 'text-left',
    textAlignOpposite: isRTL ? 'text-left' : 'text-right',
    
    // Flexbox utilities
    flexRow: isRTL ? 'flex-row-reverse' : 'flex-row',
    flexRowOpposite: isRTL ? 'flex-row' : 'flex-row-reverse',
    
    // Positioning utilities
    start: isRTL ? 'right' : 'left',
    end: isRTL ? 'left' : 'right',
    
    // Margin utilities (logical properties)
    ms: (size: string) => isRTL ? `mr-${size}` : `ml-${size}`, // margin-start
    me: (size: string) => isRTL ? `ml-${size}` : `mr-${size}`, // margin-end
    ps: (size: string) => isRTL ? `pr-${size}` : `pl-${size}`, // padding-start
    pe: (size: string) => isRTL ? `pl-${size}` : `pr-${size}`, // padding-end
    
    // Border utilities
    borderStart: isRTL ? 'border-r' : 'border-l',
    borderEnd: isRTL ? 'border-l' : 'border-r',
    
    // Rounding utilities
    roundedStart: isRTL ? 'rounded-r' : 'rounded-l',
    roundedEnd: isRTL ? 'rounded-l' : 'rounded-r',
  };
}

/**
 * Format number with proper locale
 */
export function useNumberFormat() {
  const { language } = useTranslation();
  
  return {
    formatNumber: (value: number, options?: Intl.NumberFormatOptions) => {
      const locale = language === 'ar' ? 'ar-SA' : 'en-US';
      return new Intl.NumberFormat(locale, options).format(value);
    },
    
    formatCurrency: (value: number, currency: string = 'SAR') => {
      const locale = language === 'ar' ? 'ar-SA' : 'en-US';
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
      }).format(value);
    },
    
    formatPercent: (value: number, decimals: number = 1) => {
      const locale = language === 'ar' ? 'ar-SA' : 'en-US';
      return new Intl.NumberFormat(locale, {
        style: 'percent',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value / 100);
    },
  };
}

/**
 * Format dates with proper locale
 */
export function useDateFormat() {
  const { language } = useTranslation();
  
  return {
    formatDate: (date: Date | string, options?: Intl.DateTimeFormatOptions) => {
      const locale = language === 'ar' ? 'ar-SA' : 'en-US';
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return new Intl.DateTimeFormat(locale, options).format(dateObj);
    },
    
    formatHijriDate: (date: Date | string) => {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(dateObj);
    },
    
    formatRelativeTime: (date: Date | string) => {
      const locale = language === 'ar' ? 'ar-SA' : 'en-US';
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
      
      if (diffInSeconds < 60) {
        return language === 'ar' ? 'الآن' : 'Just now';
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return language === 'ar' 
          ? `منذ ${minutes} دقيقة` 
          : `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return language === 'ar' 
          ? `منذ ${hours} ساعة` 
          : `${hours} hour${hours > 1 ? 's' : ''} ago`;
      } else {
        const days = Math.floor(diffInSeconds / 86400);
        return language === 'ar' 
          ? `منذ ${days} يوم` 
          : `${days} day${days > 1 ? 's' : ''} ago`;
      }
    },
  };
}

/**
 * Get localized property type labels
 */
export function usePropertyTypes() {
  const { t } = useTranslation();
  
  return {
    residential: t('propertyTypes.residential'),
    commercial: t('propertyTypes.commercial'),
    industrial: t('propertyTypes.industrial'),
    agricultural: t('propertyTypes.agricultural'),
    land: t('propertyTypes.land'),
    villa: t('propertyTypes.villa'),
    apartment: t('propertyTypes.apartment'),
    building: t('propertyTypes.building'),
    warehouse: t('propertyTypes.warehouse'),
    office: t('propertyTypes.office'),
    shop: t('propertyTypes.shop'),
  };
}

/**
 * Get localized auction terminology
 */
export function useAuctionTerms() {
  const { t } = useTranslation();
  
  return {
    saey: t('auctions.terms.saey'),
    tarsiya: t('auctions.terms.tarsiya'),
    mozayada: t('auctions.terms.mozayada'),
    startingPrice: t('auctions.terms.starting_price'),
    reservePrice: t('auctions.terms.reserve_price'),
    winningBid: t('auctions.terms.winning_bid'),
    increment: t('auctions.terms.increment'),
    registrationFee: t('auctions.terms.registration_fee'),
    earnestMoney: t('auctions.terms.earnest_money'),
    deposit: t('auctions.terms.deposit'),
  };
}
