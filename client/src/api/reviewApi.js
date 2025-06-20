
import api from './axiosConfig';

// This API_URL is separate from the one in bookApi.js
const API_URL = '/reviews';

export const getReviewsByBookId = (bookId) => api.get(`${API_URL}/book/${bookId}`);

export const addReview = (reviewData) => api.post(API_URL, reviewData); 