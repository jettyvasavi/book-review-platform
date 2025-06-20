import express from 'express';
import { getBooks, getBookById, addBook } from '../controllers/bookController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', protect, addBook); // only logged-in users can add books

export default router;



