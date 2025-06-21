import React, { createContext, useState, useEffect, useCallback } from 'react';
import { getBooks } from '../api/bookApi';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
 
  const [books, setBooks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const fetchBooks = useCallback(async () => {
    try {
     
      setLoading(true);
      setError(null);

      const res = await getBooks();
      setBooks(res.data); 
    } catch (err) {
      console.error("Error fetching books:", err); 
      setError('Failed to fetch books. The server might be down.'); 
    
    } finally {
      setLoading(false);
    }
  }, []); 
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]); 
  const value = {
    books,
    loading,
    error,
    fetchBooks 
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
};
