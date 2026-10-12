import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('4slayers_token');
    const savedUser = localStorage.getItem('4slayers_user');

    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        // Verify in background
        api.getMe()
          .then(userData => {
            setUser(userData);
            localStorage.setItem('4slayers_user', JSON.stringify(userData));
          })
          .catch(() => {
            // Keep saved user unless token completely invalid
          })
          .finally(() => setLoading(false));
      } catch (e) {
        setUser(null);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const data = await api.login(email, password);
    localStorage.setItem('4slayers_token', data.access_token);
    localStorage.setItem('4slayers_user', JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const register = async (name, email, password) => {
    const data = await api.register(name, email, password);
    localStorage.setItem('4slayers_token', data.access_token);
    localStorage.setItem('4slayers_user', JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const demoLogin = async () => {
    const data = await api.demoLogin();
    localStorage.setItem('4slayers_token', data.access_token);
    localStorage.setItem('4slayers_user', JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('4slayers_token');
    localStorage.removeItem('4slayers_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, demoLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
