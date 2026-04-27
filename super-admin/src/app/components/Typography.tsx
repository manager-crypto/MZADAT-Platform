import { ReactNode } from 'react';
import { useTranslation } from '../context/TranslationContext';
import { useTheme } from '../context/ThemeContext';

interface TypographyProps {
  children: ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  numeric?: boolean;
}

/**
 * Typography Component
 * Automatically applies Mzadat typography styles with proper font selection
 */
export function Typography({ 
  children, 
  variant = 'body', 
  className = '', 
  as,
  numeric = false
}: TypographyProps) {
  const { language } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Determine the HTML element
  const Component = as || (
    variant === 'h1' ? 'h1' : 
    variant === 'h2' ? 'h2' : 
    variant === 'h3' ? 'h3' : 
    variant === 'caption' ? 'span' : 
    'p'
  );
  
  // Base classes for each variant
  const variantClasses = {
    h1: 'mzadat-h1',
    h2: 'mzadat-h2',
    h3: 'mzadat-h3',
    body: 'mzadat-body',
    caption: 'mzadat-caption'
  };
  
  const textColorClass = isDark ? 'text-[#F1F5F9]' : 'text-[#2B3D50]';
  
  return (
    <Component 
      lang={language}
      className={`${variantClasses[variant]} ${textColorClass} ${numeric ? 'numeric' : ''} ${className}`}
      data-numeric={numeric ? 'true' : undefined}
    >
      {children}
    </Component>
  );
}

// Helper components for convenience
export const H1 = (props: Omit<TypographyProps, 'variant'>) => <Typography variant="h1" {...props} />;
export const H2 = (props: Omit<TypographyProps, 'variant'>) => <Typography variant="h2" {...props} />;
export const H3 = (props: Omit<TypographyProps, 'variant'>) => <Typography variant="h3" {...props} />;
export const Body = (props: Omit<TypographyProps, 'variant'>) => <Typography variant="body" {...props} />;
export const Caption = (props: Omit<TypographyProps, 'variant'>) => <Typography variant="caption" {...props} />;
