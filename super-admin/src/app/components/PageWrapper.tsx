import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  icon?: LucideIcon;
  actions?: ReactNode;
}

/**
 * Page Wrapper Component
 * - Applies language attribute for proper font rendering
 * - Optional header with title/subtitle/icon/actions
 * - Responsive padding
 */
export default function PageWrapper({
  children,
  className = '',
  title,
  subtitle,
  icon: Icon,
  actions,
}: PageWrapperProps) {
  const { language } = useTranslation();

  return (
    <div lang={language} className={`p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto ${className}`}>
      {(title || actions) && (
        <header className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            {Icon && (
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#5AC4BE]/20 to-[#47CCD0]/5 flex items-center justify-center">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#5AC4BE]" />
              </div>
            )}
            <div className="min-w-0">
              {title && (
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-1">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
          </div>
          {actions && (
            <div className="flex-shrink-0 flex gap-2 flex-wrap">{actions}</div>
          )}
        </header>
      )}
      {children}
    </div>
  );
}

// Named export for backward compatibility
export { PageWrapper };
