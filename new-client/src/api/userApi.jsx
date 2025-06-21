
import api from './axiosConfig';

// Use the full path for every call
export const getUserById = (id) => api.get(`/api/users/${id}`);

export const updateUser = (id, userData) => api.put(`/api/users/${id}`, userData);
