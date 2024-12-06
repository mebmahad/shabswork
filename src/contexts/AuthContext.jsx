import React, { createContext, useState, useContext, useEffect } from 'react';
import { account } from '../lib/appwrite';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkUserStatus();
  }, []);

  async function checkUserStatus() {
    try {
      const session = await account.get();
      setUser(session);
    } catch (error) {
      console.error('User is not logged in');
    }
  }

  async function login(email, password) {
    try {
      await account.createEmailPasswordSession(email, password);
      await checkUserStatus();
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  }

  async function logout() {
    try {
      await account.deleteSession('current');
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  }

  const contextValue = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

