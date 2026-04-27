import React, { createContext, useState, useContext, useEffect } from 'react';
import { PeriodOption } from '../schema';

export type UserRole = 'student' | 'faculty' | null;

export interface StudentUser {
  type: 'student';
  name: string;
  rollNumber: string;
  phoneNumber: string;
}

export interface FacultyUser {
  type: 'faculty';
}

export type User = StudentUser | FacultyUser | null;

interface AuthContextType {
  user: User;
  role: UserRole;
  period: PeriodOption | null;
  login: (user: User, role: UserRole, period: PeriodOption) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'iqac_auth_state';
const AUTH_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

interface PersistedAuthState {
  user: User;
  role: UserRole;
  period: PeriodOption;
  expiresAt: number;
}

const readPersistedAuthState = (): { user: User; role: UserRole; period: PeriodOption | null } => {
  try {
    const rawState = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!rawState) {
      return { user: null, role: null, period: null };
    }

    const parsedState = JSON.parse(rawState) as PersistedAuthState;
    if (!parsedState || typeof parsedState.expiresAt !== 'number' || !parsedState.period) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return { user: null, role: null, period: null };
    }

    if (Date.now() > parsedState.expiresAt) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return { user: null, role: null, period: null };
    }

    return { user: parsedState.user, role: parsedState.role, period: parsedState.period };
  } catch (error) {
    console.error("Failed to read auth state from localStorage", error);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return { user: null, role: null, period: null };
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(() => readPersistedAuthState().user);
  const [role, setRole] = useState<UserRole>(() => readPersistedAuthState().role);
  const [period, setPeriod] = useState<PeriodOption | null>(() => readPersistedAuthState().period);

  const login = (user: User, role: UserRole, period: PeriodOption) => {
    setUser(user);
    setRole(role);
    setPeriod(period);
    try {
      const authState: PersistedAuthState = {
        user,
        role,
        period,
        expiresAt: Date.now() + AUTH_TTL_MS
      };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
    } catch (error) {
      console.error("Failed to persist auth state to localStorage", error);
    }
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setPeriod(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (error) {
      console.error("Failed to remove auth state from localStorage", error);
    }
  };

  const isAuthenticated = !!user;

  useEffect(() => {
    const { user: persistedUser, role: persistedRole, period: persistedPeriod } = readPersistedAuthState();
    if (persistedUser && persistedRole && persistedPeriod) {
      setUser(persistedUser);
      setRole(persistedRole);
      setPeriod(persistedPeriod);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, period, login, logout, isAuthenticated }}>
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
