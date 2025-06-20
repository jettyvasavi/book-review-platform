import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Your backend API base URL
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