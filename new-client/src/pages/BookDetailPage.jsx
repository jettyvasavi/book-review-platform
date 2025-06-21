import React, { useState, useEffect, useCallback, useContext } from 'react'; 
import { useParams } from 'react-router-dom';
import { getBookById } from '../api/bookApi.js';
import { getReviewsByBookId } from '../api/reviewApi.js';
import { BookContext } from '../context/BookContext.jsx'; 
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import ReviewList from '../components/ReviewList.jsx';
import ReviewForm from '../components/ReviewForm.jsx';
import StarRating from '../components/StarRating.jsx';


const BookDetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { fetchBooks } = useContext(BookContext);

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
      setError('Failed to load book details and reviews.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBookAndReviews();
  }, [id, fetchBookAndReviews]);


  const handleReviewSubmitted = async () => {
    await fetchBookAndReviews();
    await fetchBooks();
  };


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
          <div className="book-detail-rating">
            <StarRating rating={book.rating} />
            <span style={{ marginLeft: '10px', color: '#777' }}>
              ({book.numReviews || 0} reviews)
            </span>
          </div>
          <p><strong>Description:</strong> {book.description}</p>
        </div>
      </div>
      <hr />
      <div className="book-detail-reviews-section">
        <ReviewList reviews={reviews} />
        <ReviewForm bookId={id} onReviewSubmitted={handleReviewSubmitted} />
      </div>
    </div>
  );
};

export default BookDetailPage;