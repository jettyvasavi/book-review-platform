import React, { useState, useContext } from 'react';
import { BookContext } from '../context/BookContext';
import BookCard from '../components/BookCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const BookListPage = () => {
  const { books, loading, error } = useContext(BookContext);
  const [search, setSearch] = useState('');

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-container">
      <h1>All Books</h1>
      <div className="search-bar">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <div className="book-grid">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => <BookCard key={book._id} book={book} />)
          ) : (
            <p>No books found matching your search.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BookListPage;


