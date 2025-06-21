import api from './axiosConfig';

export const getBooks = () => api.get('/api/books');

export const getBookById = (id) => api.get(`/api/books/${id}`);

export const addBook = (bookData) => api.post('/api/books', bookData);