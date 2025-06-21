
import api from './axiosConfig';

// Use the full path for every call
export const getReviewsByBookId = (bookId) => api.get(`/api/reviews/book/${bookId}`);

export const addReview = (reviewData) => api.post('/api/reviews', reviewData);