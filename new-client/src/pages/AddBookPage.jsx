import React, { useState, useContext } from 'react'; // 1. Import useContext
import { useNavigate } from 'react-router-dom';
import { addBook } from '../api/bookApi';
import { toast } from 'react-toastify';
import { BookContext } from '../context/BookContext'; // 2. Import the BookContext

const AddBookPage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  
  // 3. Get the fetchBooks function from the context
  const { fetchBooks } = useContext(BookContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!title || !author || !description) {
      toast.error("Title, Author, and Description are required.");
      setSubmitting(false);
      return;
    }

    try {
      const newBook = { title, author, description, coverImage };
      // This adds the book to the database
      await addBook(newBook);

      // --- THIS IS THE FIX ---
      // 4. After success, immediately re-fetch the global list of books
      await fetchBooks(); 
      // --------------------

      toast.success('Book added successfully!');
      
      // 5. Now navigate. The context is already updated.
      navigate('/books'); 

    } catch (err) {
      console.error("Add Book Error:", err);
      const errorMessage = err.response?.data?.message || 'Failed to add book. Please try again.';
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <h1>Add a New Book</h1>
      <p style={{ color: 'var(--color-text-light)', marginTop: '-10px', marginBottom: '2rem' }}>
        Add a new title to the platform for users to review.
      </p>

      <form onSubmit={handleSubmit} className="form form-stacked">
        {/* ... form inputs remain the same ... */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input id="title" type="text" placeholder="e.g., The Alchemist" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input id="author" type="text" placeholder="e.g., Paulo Coelho" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" placeholder="A brief, engaging summary of the book..." value={description} onChange={(e) => setDescription(e.target.value)} rows="5" required />
        </div>
        <div className="form-group">
          <label htmlFor="coverImage">Cover Image URL (Optional)</label>
          <input id="coverImage" type="text" placeholder="https://example.com/cover.jpg" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Adding Book...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
};

export default AddBookPage;
