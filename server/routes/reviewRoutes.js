import express from 'express';
import { getReviewsByBook, addReview } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/book/:bookId', getReviewsByBook);

router.post('/', protect, addReview);

export default router;
