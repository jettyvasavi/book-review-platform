import Book from '../models/Book.js';

// Get all books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch books' });
  }
};

// Get book by ID
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch book details' });
  }
};

// Add a new book
export const addBook = async (req, res) => {
  const { title, author, description, coverImage, rating } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: 'Title and Author are required' });
  }

  try {
    const newBook = new Book({ title, author, description, coverImage, rating });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add book' });
  }
};


