import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById } from '../api/bookApi';
import { getReviewsByBookId } from '../api/reviewApi';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';

const BookDetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBookAndReviews = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const [bookRes, reviewsRes] = await Promise.all([
        getBookById(id),
        getReviewsByBookId(id),
      ]);
      setBook(bookRes.data);
      setReviews(reviewsRes.data);
    } catch (err) {
      console.error("Failed on detail page:", err); 
      setError('Failed to load book details and reviews');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBookAndReviews();
  }, [fetchBookAndReviews]); 

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!book) return <p>Book not found.</p>;

  return (
    <div className="book-detail-page">
      <div className="book-detail-header">
        <img 
          src={book.coverImage || 'https://placehold.co/200x300?text=No+Cover'} 
          alt={book.title} 
          className="book-detail-cover" 
        />
        <div className="book-detail-info">
          <h1>{book.title}</h1>
          <h2>by {book.author}</h2>
          <p className="book-detail-rating"><strong>Average Rating:</strong> {book.rating || 'N/A'} / 5</p>
          <p><strong>Description:</strong> {book.description}</p>
        </div>
      </div>
      <hr />
      <div className="book-detail-reviews-section">
        <ReviewList reviews={reviews} />
        <ReviewForm bookId={id} onReviewSubmitted={fetchBookAndReviews} />
      </div>
    </div>
  );
};

export default BookDetailPage;