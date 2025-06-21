import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import api from '../api/axiosConfig.js'; // Use our configured instance for authenticated requests

export const UserContext = createContext();

// A function to get the initial user state from localStorage
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

  // This effect synchronizes the user state with localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // --- AUTHENTICATION FUNCTIONS ---

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Use axios directly for login, as we don't have a token yet.
      // Make sure the baseURL is correct for the environment.
      const loginUrl = (import.meta.env.VITE_API_URL || '') + '/api/auth/login';
      const { data } = await axios.post(loginUrl, { email, password });
      
      // THIS IS THE CRITICAL STEP: Update the state with the user data from the backend
      setUser(data); 
      
      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const logout = () => {
    // Setting user to null will trigger the useEffect to clear localStorage
    setUser(null); 
  };

  // updateUser uses the 'api' instance which has the auth token interceptor
  const updateUser = async (userData) => {
    setLoading(true);
    try {
      // We need user._id to make the request
      if (!user?._id) throw new Error("No user to update");
      
      const { data } = await api.put(`/api/users/${user._id}`, userData);
      // Update state with new data, but preserve the token from the previous state
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
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};