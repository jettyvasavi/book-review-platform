import React, { createContext, useState, useEffect, useCallback } from 'react';
import { getBooks } from '../api/bookApi';

// 1. Create the context
export const BookContext = createContext();

// 2. Create the Provider component
export const BookProvider = ({ children }) => {
  // --- STATE MANAGEMENT ---
  
  // Initialize 'books' as an empty array []. This is CRITICAL.
  // If it's null or undefined, any component calling books.map() or books.slice() will crash.
  const [books, setBooks] = useState([]);

  // Set initial loading state to true because we fetch on mount.
  const [loading, setLoading] = useState(true);

  // Initialize error state to null.
  const [error, setError] = useState(null);

  // --- DATA FETCHING ---

  // Use useCallback to memoize the fetch function, preventing re-creation on every render.
  const fetchBooks = useCallback(async () => {
    try {
      // Reset states before fetching
      setLoading(true);
      setError(null);

      const res = await getBooks();
      setBooks(res.data); // Update state with the fetched books

    } catch (err) {
      console.error("Error fetching books:", err); // Log the actual error for debugging
      setError('Failed to fetch books. The server might be down.'); // Set a user-friendly error
    
    } finally {
      // This will run regardless of success or failure
      setLoading(false);
    }
  }, []); // Empty dependency array means the function is created only once.

  // ---LIFECYCLE HOOK ---

  // Use useEffect to call fetchBooks() once when the component mounts.
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]); // The dependency array ensures this runs only when fetchBooks changes (which is never).


  // --- PROVIDE VALUE TO CHILDREN ---
  
  // The value object contains all the state and functions that child components will need.
  const value = {
    books,
    loading,
    error,
    fetchBooks // Providing the function in case a component needs to trigger a refresh
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
};
