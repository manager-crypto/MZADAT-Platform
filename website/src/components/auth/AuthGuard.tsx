import React from 'react';
import { AddAdIntroPage } from '../../pages/AddAdIntroPage';

interface AuthGuardProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
  onOpenLogin: () => void;
  onNavigate: (page: string) => void;
  mode?: 'ad' | 'auction' | 'transaction';
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  isLoggedIn, 
  onOpenLogin, 
  onNavigate,
  mode = 'transaction'
}) => {
  if (!isLoggedIn) {
    return (
      <AddAdIntroPage 
        onNavigate={onNavigate} 
        onOpenLogin={onOpenLogin}
        mode={mode} 
      />
    );
  }
  return <>{children}</>;
};
