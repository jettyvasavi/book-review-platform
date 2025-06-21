import axios from 'axios';

const getBaseURL = () => {
  
  if (window.location.hostname.includes('onrender.com')) {
  
    return 'https://book-review-platform-tiw8.onrender.com';
  } else {
    
    return 'http://localhost:5000';
  }
};

const api = axios.create({
  baseURL: getBaseURL(), 
});


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