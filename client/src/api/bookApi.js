import api from './axiosConfig';

const API_URL = '/books';

export const getBooks = () => api.get(API_URL);

export const getBookById = (id) => api.get(`${API_URL}/${id}`);

export const addBook = (bookData) => api.post(API_URL, bookData);