import React from 'react';

interface BidiTextProps {
 text: string | number;
 dir?: 'ltr' | 'rtl' | 'auto';
 className?: string;
}

/**
 * BidiText component handles bidirectional text correctly.
 * Useful for displaying phone numbers, license plates, order IDs, or prices
 * in an RTL context without having them flip un-intuitively.
 */
export const BidiText: React.FC<BidiTextProps> = ({ text, dir = 'ltr', className = '' }) => {
 return (
 <bdi dir={dir} className={className}>
 {text}
 </bdi>
 );
};
