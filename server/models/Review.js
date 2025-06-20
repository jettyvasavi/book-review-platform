import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  // Changed from username to a linked user object
  user:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);
export default Review;

