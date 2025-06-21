import axios from 'axios';

// We will no longer set a baseURL here. We will use full paths in our API calls.
const api = axios.create(); 

// The interceptor is still crucial for authentication.
api.interceptors.request.use(
  (config) => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      if (user.token) {
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
