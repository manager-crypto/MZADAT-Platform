import { useTranslation } from '../context/TranslationContext';

/**
 * Hook for generating accessible aria-labels for icon-only buttons
 * Follows MZADAT accessibility guidelines
 */
export function useAriaLabels() {
  const { language } = useTranslation();

  const labels = {
    ar: {
      // Common actions
      edit: 'تعديل',
      delete: 'حذف',
      view: 'عرض',
      close: 'إغلاق',
      save: 'حفظ',
      cancel: 'إلغاء',
      search: 'بحث',
      filter: 'تصفية',
      sort: 'ترتيب',
      more: 'المزيد',
      menu: 'القائمة',
      
      // Specific actions
      exclude: 'استبعاد',
      block: 'حظر',
      approve: 'موافقة',
      reject: 'رفض',
      download: 'تحميل',
      upload: 'رفع',
      refresh: 'تحديث',
      expand: 'توسيع',
      collapse: 'طي',
      
      // Navigation
      next: 'التالي',
      previous: 'السابق',
      back: 'رجوع',
      forward: 'إلى الأمام',
      
      // Notifications
      notifications: 'الإشعارات',
      alerts: 'التنبيهات',
      
      // User actions
      profile: 'الملف الشخصي',
      settings: 'الإعدادات',
      logout: 'تسجيل الخروج',
    },
    en: {
      // Common actions
      edit: 'Edit',
      delete: 'Delete',
      view: 'View',
      close: 'Close',
      save: 'Save',
      cancel: 'Cancel',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      more: 'More',
      menu: 'Menu',
      
      // Specific actions
      exclude: 'Exclude',
      block: 'Block',
      approve: 'Approve',
      reject: 'Reject',
      download: 'Download',
      upload: 'Upload',
      refresh: 'Refresh',
      expand: 'Expand',
      collapse: 'Collapse',
      
      // Navigation
      next: 'Next',
      previous: 'Previous',
      back: 'Back',
      forward: 'Forward',
      
      // Notifications
      notifications: 'Notifications',
      alerts: 'Alerts',
      
      // User actions
      profile: 'Profile',
      settings: 'Settings',
      logout: 'Logout',
    },
  };

  const getLabel = (key: keyof typeof labels.ar): string => {
    return labels[language][key] || key;
  };

  return { getLabel };
}

/**
 * Hook for screen reader announcements
 */
export function useAnnouncer() {
  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcer = document.createElement('div');
    announcer.setAttribute('role', 'status');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = message;
    
    document.body.appendChild(announcer);
    
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  };

  return { announce };
}
