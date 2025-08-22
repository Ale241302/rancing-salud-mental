// context/AuthContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import { profile as apiProfile } from '../services/auth';

export interface User { name: string; email: string; }

interface AuthCtx {
  user: User | null;
  setUser: (u: User | null) => void;
}

export const AuthContext = createContext<AuthCtx>(null!);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // al montar la app intenta cargar la sesión
  useEffect(() => {
    (async () => {
      try {
        const res = await apiProfile();   // GET /auth/profile
        if (res.success) setUser(res.data.user);
      } catch {
        /* sin sesión */
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
