
import api from './axiosConfig';
export const getReviewsByBookId = (bookId) => api.get(`/api/reviews/book/${bookId}`);

export const addReview = (reviewData) => api.post('/api/reviews', reviewData);