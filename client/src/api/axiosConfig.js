import axios from 'axios';

// The 'process.env.REACT_APP_API_URL' will be injected by Vercel during the build.
// If it doesn't exist (like in local development), it will default to an empty string,
// making requests relative to the current host (e.g., /api/books).
const baseURL = process.env.REACT_APP_API_URL || '';

const api = axios.create({
  baseURL: baseURL, // Use the dynamic base URL
});

// Use an interceptor to add the token to every request
api.interceptors.request.use(
  (config) => {
    // Get user from localStorage
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      if (user.token) {
        // Add the Authorization header
        config.headers['Authorization'] = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;