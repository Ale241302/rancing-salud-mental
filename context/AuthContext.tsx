// context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { profile, clearToken } from '../services/auth';
import type { User } from '../App';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('rancing_auth_token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await profile();
        if (response.success && response.data?.user) {
          const u = response.data.user;
          setUser({
            name: `${u.first_name || ''} ${u.last_name || ''}`.trim(),
            email: u.email,
          });
        } else {
          clearToken();
        }
      } catch (error) {
        clearToken();
        console.error('Auth init error:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const logout = () => {
    clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
