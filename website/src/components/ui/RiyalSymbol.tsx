import React from 'react';

interface RiyalSymbolProps {
 className?: string;
 theme?: 'dark' | 'light' | 'auto';
}

/**
 * Saudi Riyal Symbol — official 2024 redesigned currency mark.
 *
 * Renders an inline SVG (no external asset dependency, no figma asset).
 * - theme='dark' → black fill (for light backgrounds)
 * - theme='light' → white fill (for dark backgrounds)
 * - theme='auto' → currentColor (inherits parent text color)
 *
 * Replaces the legacy "ر.س" text marker per brand guideline (Identity 2025).
 */
export const RiyalSymbol: React.FC<RiyalSymbolProps> = ({
 className = 'w-5 h-5',
 theme = 'auto',
}) => {
 const fill =
 theme === 'light' ? '#FFFFFF' : theme === 'dark' ? '#000000' : 'currentColor';

 return (
 <svg
 viewBox="0 0 1124.14 1256.39"
 xmlns="http://www.w3.org/2000/svg"
 className={`inline-block ${className}`}
 role="img"
 aria-label="ريال سعودي"
 fill={fill}
 >
 <path d="M699.62,1113.02h0c-20.06,44.48-33.31,92.75-38.81,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.81-143.37l-424.51,90.24Z" />
 <path d="M1085.73,895.8c20.06-44.47,33.31-92.75,38.81-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.31-92.75,38.81-143.37l-330.68,70.27V66.13c-50.78,28.45-95.31,66.62-130.91,112.24v403.92l-188.25,40.01V0c-50.78,28.45-95.31,66.62-130.91,112.24v554.56l-292.27,62.11c-20.06,44.47-33.31,92.75-38.81,143.37l331.08-70.35v131.81l-292.27,62.11c-20.06,44.47-33.31,92.75-38.81,143.37l331.08-70.35v272.39c50.78-28.45,95.31-66.62,130.91-112.24v-187.99l188.25-40.01v172.927c0,0,0,0.01,0,0.01,30.93-7.14,61.25-16.69,90.45-28.79,20.06-44.47,33.31-92.75,38.81-143.37l-129.26,27.48v-130.96l292.27-62.11Z" />
 </svg>
 );
};
