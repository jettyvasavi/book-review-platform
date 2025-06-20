
import api from './axiosConfig'; // RIGHT: Import the configured instance

const API_URL = '/users';

export const getUserById = (id) => api.get(`${API_URL}/${id}`);
export const updateUser = (id, userData) => api.put(`${API_URL}/${id}`, userData);
