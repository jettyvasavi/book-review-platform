import Review from '../models/Review.js';
import Book from '../models/Book.js'; 

export const getReviewsByBook = async (req, res, next) => {
  try {
    const reviews = await Review.find({ bookId: req.params.bookId })
      .populate('user', 'name');
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

export const addReview = async (req, res, next) => {
  const { bookId, comment, rating } = req.body;
  const userId = req.user.id; 

  try {
    if (!bookId || !comment || rating === undefined) {
      res.status(400);
      throw new Error('Book ID, comment, and rating are required');
    }

    const book = await Book.findById(bookId);
    if (!book) {
      res.status(404);
      throw new Error('Book not found');
    }

    const newReview = new Review({
      bookId,
      comment,
      rating,
      user: userId,
    });
    const savedReview = await newReview.save();

    const reviews = await Review.find({ bookId });
    
    const totalRating = reviews.reduce((acc, item) => item.rating + acc, 0);
    const averageRating = totalRating / reviews.length;

    book.rating = Math.round(averageRating * 10) / 10;
    
    book.numReviews = reviews.length; 
    
    await book.save();

    res.status(201).json(savedReview);

  } catch (error) {
    next(error);
  }
};
