import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating.jsx';

const BookCard = ({ book }) => (
  <div className="book-card">
    <img 
      src={book.coverImage || 'https://placehold.co/200x300?text=No+Cover'} 
      alt={`${book.title} cover`}
      className="book-card-img" 
    />
    <div className="book-card-body">
      <h3 className="book-card-title">{book.title}</h3>
      <p className="book-card-author">by {book.author}</p>
      
      <div className="book-card-rating">
        {book.rating > 0 && <StarRating rating={book.rating} />}
      </div>
      
      <Link to={`/books/${book._id}`} className="btn btn-primary">
        View Details
      </Link>
    </div>
  </div>
);

export default BookCard;