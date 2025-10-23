import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { STORAGE_KEYS } from '../constants';

// Auth Context để quản lý trạng thái đăng nhập
const AuthContext = createContext();

// Auth Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          username: decoded.sub || decoded.username,
          role: decoded.role || 'USER',
          email: decoded.email
        });
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
      }
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = (token) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    try {
      const decoded = jwtDecode(token);
      setUser({
        username: decoded.sub || decoded.username,
        role: decoded.role || 'USER',
        email: decoded.email
      });
    } catch (error) {
      console.error('Invalid token:', error);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    setUser(null);
  };

  // Check if user is admin
  const isAdmin = user?.role === 'ADMIN';

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook để sử dụng auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
