import React from 'react';
import sarBlack from 'figma:asset/3f649d4624729213a9513bf0153522436e1f6f47.png';
import sarWhite from 'figma:asset/44873dcb1d284215652a5886cf5845ec0264eaac.png';

interface RiyalSymbolProps {
  className?: string;
  theme?: 'dark' | 'light' | 'auto';
}

export const RiyalSymbol: React.FC<RiyalSymbolProps> = ({ className = 'w-5 h-5', theme = 'auto' }) => {
  if (theme === 'light') {
    return <img src={sarWhite} alt="ر.س" className={`inline-block object-contain ${className}`} />;
  }
  
  if (theme === 'dark') {
    return <img src={sarBlack} alt="ر.س" className={`inline-block object-contain ${className}`} />;
  }

  // Auto mode uses CSS mask to inherit text color
  return (
    <span 
      className={`inline-block bg-current ${className}`}
      style={{
        maskImage: `url(${sarBlack})`,
        WebkitMaskImage: `url(${sarBlack})`,
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center'
      }}
    />
  );
};
