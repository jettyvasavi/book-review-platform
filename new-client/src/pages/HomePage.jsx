import React, { useContext } from 'react';
import { BookContext } from '../context/BookContext';
import BookCard from '../components/BookCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const HomePage = () => {
  const { books, loading, error } = useContext(BookContext);

  const featuredBooks = books.slice(0, 4); // Show 4 featured books

  return (
    <div className="page-container">
      <h1>📚 Welcome to the Book Review Platform</h1>
      <p>Discover new books, share your thoughts, and connect with fellow readers.</p>
      
      <h2>Featured Books</h2>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <div className="book-grid">
          {featuredBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
