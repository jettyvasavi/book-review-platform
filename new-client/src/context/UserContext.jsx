import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import api from '../api/axiosConfig.js';

export const UserContext = createContext();

const getInitialUser = () => {
  try {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Failed to parse user from localStorage", error);
    return null;
  }
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const loginUrl = (import.meta.env.VITE_API_URL || '') + '/api/auth/login';
      const { data } = await axios.post(loginUrl, { email, password });
      setUser(data);
      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = async (userData) => {
    setLoading(true);
    try {
      if (!user?._id) throw new Error("No user to update");
      const { data } = await api.put(`/api/users/${user._id}`, userData);
      setUser({ ...user, name: data.name, email: data.email, bio: data.bio });
      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      return { success: false, message: error.response?.data?.message || 'Update failed' };
    }
  };

  const contextValue = {
    user,
    loading,
    login,
    logout,
    updateUser,
    setUser,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};