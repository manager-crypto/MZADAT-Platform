import React from 'react';
import { Gavel } from 'lucide-react';

interface BiddingIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export const BiddingIcon: React.FC<BiddingIconProps> = ({ className, size = 24, color }) => {
  return (
    <Gavel 
      className={className} 
      size={size} 
      color={color}
      strokeWidth={2}
    />
  );
};
