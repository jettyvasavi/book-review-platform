import axios from 'axios';

const api = axios.create({
  // By setting baseURL to just '/api', all requests will be sent to the same domain
  // that the frontend is hosted on.
  // e.g., on my-site.vercel.app, it will call my-site.vercel.app/api/...
  baseURL: '/api',
});

// The rest of the file stays the same
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