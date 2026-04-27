import React, { createContext, useState, useContext } from 'react';

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
  login: (user: User, role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'iqac_auth_state';
const AUTH_TTL_MS = 7 * 24 * 60 * 60 * 1000;

interface PersistedAuthState {
  user: User;
  role: UserRole;
  expiresAt: number;
}

const readPersistedAuthState = (): { user: User; role: UserRole } => {
  try {
    const rawState = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!rawState) {
      return { user: null, role: null };
    }

    const parsedState = JSON.parse(rawState) as PersistedAuthState;
    if (!parsedState || typeof parsedState.expiresAt !== 'number') {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return { user: null, role: null };
    }

    if (Date.now() > parsedState.expiresAt) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return { user: null, role: null };
    }

    return {
      user: parsedState.user ?? null,
      role: parsedState.role ?? null
    };
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return { user: null, role: null };
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [{ user, role }, setAuthState] = useState<{ user: User; role: UserRole }>(() => readPersistedAuthState());

  const persistAuthState = (nextUser: User, nextRole: UserRole) => {
    if (!nextUser || !nextRole) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return;
    }

    const payload: PersistedAuthState = {
      user: nextUser,
      role: nextRole,
      expiresAt: Date.now() + AUTH_TTL_MS
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(payload));
  };

  const login = (newUser: User, newRole: UserRole) => {
    setAuthState({ user: newUser, role: newRole });
    persistAuthState(newUser, newRole);
  };

  const logout = () => {
    setAuthState({ user: null, role: null });
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, isAuthenticated: !!user && !!role }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
