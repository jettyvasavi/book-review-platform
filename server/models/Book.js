import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: String,
  coverImage: String,
  rating: Number
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

export default Book;

