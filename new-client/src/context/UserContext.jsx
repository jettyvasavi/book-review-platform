import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'; // UserContext uses its own axios instance for auth
import api from '../api/axiosConfig.js'; // Use the configured api for updateUser

export const UserContext = createContext();

const storedUser = localStorage.getItem('user');
const initialUser = storedUser ? JSON.parse(storedUser) : null;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser);
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
      // --- THIS IS THE LINE TO UPDATE ---
      // Use the full path for the login request
      const { data } = await axios.post('/api/auth/login', { email, password });
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
      // updateUser uses the 'api' instance which has the auth token interceptor
      const { data } = await api.put(`/api/users/${user._id}`, userData);
      setUser({ ...data, token: user.token });
      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      return { success: false, message: error.response?.data?.message || 'Update failed' };
    }
  };

  const contextValue = { user, loading, login, logout, updateUser };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};