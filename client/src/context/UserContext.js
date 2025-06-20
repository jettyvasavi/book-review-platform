import React, { createContext, useState, useEffect } from 'react';
import { updateUser as updateUserApi } from '../api/userApi';
import axios from 'axios'; // We need axios here for login

export const UserContext = createContext();

// Get user data from localStorage if it exists
const storedUser = localStorage.getItem('user');
const initialUser = storedUser ? JSON.parse(storedUser) : null;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(false);

  // This effect will run whenever the user state changes
  useEffect(() => {
    if (user) {
      // Store user info and token in localStorage
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      // Remove user info from localStorage on logout
      localStorage.removeItem('user');
    }
  }, [user]);

  // --- AUTHENTICATION FUNCTIONS ---

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      setUser(data); // The backend should return { _id, name, email, token }
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
      const { data } = await updateUserApi(user._id, userData);
      // Update user state with new data, but keep the original token
      setUser({ ...data, token: user.token });
      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      return { success: false, message: error.response?.data?.message || 'Update failed' };
    }
  };

  // The value provided to consuming components
  const contextValue = {
    user,
    loading,
    login,
    logout,
    updateUser,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};