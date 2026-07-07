import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'user' | 'admin';

interface AuthUser {
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// Hardcoded credentials — local-storage auth only
const CREDENTIALS: Record<string, { password: string; user: AuthUser }> = {
  'user@upcyclestl.com': {
    password: 'shopper123',
    user: { name: 'Jordan Lee', email: 'user@upcyclestl.com', role: 'user' },
  },
  'admin@upcyclestl.com': {
    password: 'admin2026',
    user: { name: 'Studio Admin', email: 'admin@upcyclestl.com', role: 'admin' },
  },
};

const STORAGE_KEY = 'upcyclestl_auth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as AuthUser) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = (email: string, password: string) => {
    const match = CREDENTIALS[email.toLowerCase()];
    if (!match) return { success: false, error: 'No account found for that email.' };
    if (match.password !== password) return { success: false, error: 'Incorrect password.' };
    setUser(match.user);
    return { success: true };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
