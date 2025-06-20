import express from 'express';
import { getReviewsByBook, addReview } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// INCORRECT (Your likely current version): router.get('/:bookId', getReviewsByBook);
// CORRECT (The version needed):
router.get('/book/:bookId', getReviewsByBook);

router.post('/', protect, addReview);

export default router;
