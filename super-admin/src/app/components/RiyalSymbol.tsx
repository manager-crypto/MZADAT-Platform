import React from 'react';

interface RiyalSymbolProps {
  className?: string;
  /** 'auto' inherits color, 'dark' = black, 'light' = white */
  theme?: 'auto' | 'dark' | 'light';
}

/**
 * Saudi Riyal Symbol — official SAMA 2024 redesigned currency mark.
 * Sized via 1em to scale with parent font-size.
 * Inherits parent text color by default for automatic contrast adaptation.
 */
export const RiyalSymbol: React.FC<RiyalSymbolProps> = ({
  className = 'inline-block w-[0.9em] h-[0.9em] align-[-0.08em]',
  theme = 'auto',
}) => {
  const fill =
    theme === 'dark'  ? '#000000' :
    theme === 'light' ? '#FFFFFF' :
    'currentColor';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 162 159.1"
      className={className}
      fill={fill}
      role="img"
      aria-label="ريال سعودي"
    >
      <path d="M76.1,10.1v68.8l14.8-3.1c.2-11.2-.2-22.4,0-33.6s.2-1.1.3-1.7c0-2.9-.4-7.6,0-10.2s9-9.6,12.1-11.4,2.3-1.4,3.7-1.7v54.9l37.9-6.3-4.1,15.2-33.8,7.2v15.8l37.9-7.9-4.1,15.8-49.9,10.1v-29.7l-14.7,3c-1.2,5.6.2,11.3-.2,17s-2.6,6.5-4.6,9.5c-4.5,6.8-6,9.6-14.2,12.2-13.7,4.3-28.6,4.2-42.2,9l4.2-16.8,41.7-8.1v-19.9l-38.8,7.4v-.6c0,0,4.8-15.5,4.8-15.5l33.4-7.4.6-59.7c.5-2.4,7.1-8,9.2-9.5s3.7-2.6,5.8-2.7Z"/>
      <path d="M145,126.8l-4.8,16.5-48.2,9.6c-.9-.6.7-7,1.1-8.1s2.3-7.2,3.5-7.8l48.5-10.2Z"/>
    </svg>
  );
};
