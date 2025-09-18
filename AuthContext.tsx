
import React, { createContext, useState, useContext, ReactNode, useMemo } from 'react';
import { User, Role } from '../types';
import { USERS } from '../constants';

interface AuthContextType {
  user: User | null;
  verifyCredentials: (email: string, password: string) => Promise<User | null>;
  completeLogin: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isUser: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const verifyCredentials = async (email: string, password: string): Promise<User | null> => {
    console.log(`Verifying credentials for: ${email}`);
    const foundUser = USERS.find(u => u.email === email && u.password === password);
    if (foundUser) {
      console.log('Credentials valid for:', foundUser.name);
      return foundUser;
    }
    console.log('Invalid credentials');
    return null;
  };
  
  const completeLogin = (userToLogin: User) => {
      console.log('Completing login for:', userToLogin.name);
      setUser(userToLogin);
  }

  const logout = () => {
    setUser(null);
  };
  
  const isAuthenticated = !!user;
  const isAdmin = user?.role === Role.ADMIN;
  const isUser = user?.role === Role.USER;

  const value = useMemo(() => ({
    user,
    verifyCredentials,
    completeLogin,
    logout,
    isAuthenticated,
    isAdmin,
    isUser
  }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};