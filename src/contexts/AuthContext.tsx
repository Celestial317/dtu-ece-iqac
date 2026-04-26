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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [role, setRole] = useState<UserRole>(null);

  const login = (newUser: User, newRole: UserRole) => {
    setUser(newUser);
    setRole(newRole);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, isAuthenticated: !!user }}>
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
