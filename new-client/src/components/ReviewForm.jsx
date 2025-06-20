import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { addReview } from '../api/reviewApi';
import ErrorMessage from './ErrorMessage';

const ReviewForm = ({ bookId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { user } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to write a review.');
      return;
    }
    setSubmitting(true);
    setError('');

    try {
      const reviewData = {
        bookId,
        userId: user._id,
        rating,
        comment,
      };
      await addReview(reviewData);
      setComment('');
      setRating(5);
      onReviewSubmitted(); // Notify parent to refetch reviews
    } catch (err) {
      setError('Failed to submit review. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) return <p>Please log in to leave a review.</p>

  return (
    <div className="review-form-container">
      <h3>Write a Review</h3>
      {error && <ErrorMessage message={error} />}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <select id="rating" value={rating} onChange={(e) => setRating(e.target.value)} required>
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Very Good</option>
            <option value="3">3 - Good</option>
            <option value="2">2 - Fair</option>
            <option value="1">1 - Poor</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment</label>
          <textarea
            id="comment"
            placeholder="What did you think?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;