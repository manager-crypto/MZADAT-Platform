// src/contexts/UserAuthContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { userAuthApi, CurrentUser, UserAuthError } from '../services/userAuthApi';

interface UserAuthContextValue {
 user: CurrentUser | null;
 isAuthenticated: boolean;
 isLoading: boolean;
 login: (email: string, password: string) => Promise<void>;
 logout: () => Promise<void>;
 refresh: () => Promise<void>;
}

const UserAuthContext = createContext<UserAuthContextValue | undefined>(undefined);

export function UserAuthProvider({ children }: { children: ReactNode }) {
 const [user, setUser] = useState<CurrentUser | null>(null);
 const [isLoading, setIsLoading] = useState(true);

 // Rehydrate from localStorage on mount; verify with /me if a token exists
 useEffect(() => {
 const stored = userAuthApi.getCurrentUser();
 if (!stored) {
 setIsLoading(false);
 return;
 }
 setUser(stored);

 // Verify token is still valid by calling /me
 userAuthApi
 .me()
 .then((fresh) => setUser(fresh))
 .catch((err) => {
 // Token invalid → clear local state
 if (err instanceof UserAuthError && err.status === 401) {
 userAuthApi.clearSession();
 setUser(null);
 }
 })
 .finally(() => setIsLoading(false));
 }, []);

 const login = useCallback(async (email: string, password: string) => {
 await userAuthApi.login(email, password);
 const fresh = await userAuthApi.me();
 setUser(fresh);
 }, []);

 const logout = useCallback(async () => {
 await userAuthApi.logout();
 setUser(null);
 }, []);

 const refresh = useCallback(async () => {
 try {
 const fresh = await userAuthApi.me();
 setUser(fresh);
 } catch {
 setUser(null);
 }
 }, []);

 return (
 <UserAuthContext.Provider
 value={{
 user,
 isAuthenticated: !!user,
 isLoading,
 login,
 logout,
 refresh,
 }}
 >
 {children}
 </UserAuthContext.Provider>
 );
}

export function useUserAuth(): UserAuthContextValue {
 const ctx = useContext(UserAuthContext);
 if (!ctx) throw new Error('useUserAuth must be used inside UserAuthProvider');
 return ctx;
}
