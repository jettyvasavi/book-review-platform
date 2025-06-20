import Review from '../models/Review.js';

// Get all reviews for a specific book
export const getReviewsByBook = async (req, res, next) => {
  try {
    // This populates the 'user' field in each review with the 'name' from the User collection.
    // Without .populate(), the 'user' field would just be an ID string.
    const reviews = await Review.find({ bookId: req.params.bookId })
      .populate('user', 'name'); 

    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

// ... addReview function remains the same ...
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
