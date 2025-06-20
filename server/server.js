import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import bookRoutes from './routes/bookRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Simple API check route
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the Book Review API. The server is responding.' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// --- A more robust connection setup ---
async function connectDB() {
  if (!MONGO_URI) {
    console.error('FATAL ERROR: MONGO_URI environment variable is not defined.');
    process.exit(1);
  }
  try {
    // Modern Mongoose connection options
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB Connected Successfully.');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    // This will cause the Vercel function to fail with a clear error in the logs
    process.exit(1);
  }
}

connectDB().then(() => {
  // Only start listening if not on Vercel
  if (!process.env.VERCEL) {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  }
});
// ------------------------------------

export default app;
