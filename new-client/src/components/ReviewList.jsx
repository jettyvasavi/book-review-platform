import React from 'react';

const ReviewList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p>No reviews yet. Be the first to write one!</p>;
  }

  return (
    <div className="review-list">
      <h3>Reviews</h3>
      {reviews.map((review) => (
        <div key={review._id} className="review-card">
          <p className="review-rating"><strong>Rating:</strong> {review.rating}/5</p>
          <p className="review-comment">{review.comment}</p>
          <p className="review-author"><em>- {review.user?.name || 'Anonymous'}</em></p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;