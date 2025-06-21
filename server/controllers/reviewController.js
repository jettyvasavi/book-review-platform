import Review from '../models/Review.js';

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
    const review = await Review.create({ bookId, comment, rating, user: userId });
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};
