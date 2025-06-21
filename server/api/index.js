import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
// Note the path change: ../middleware/...
import { notFound, errorHandler } from '../middleware/errorMiddleware.js';

// Note the path changes: ../routes/...
import bookRoutes from '../routes/bookRoutes.js';
import reviewRoutes from '../routes/reviewRoutes.js';
import userRoutes from '../routes/userRoutes.js';
import authRoutes from '../routes/authRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// API Routes - NO CHANGE HERE
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);

// Error Middleware - NO CHANGE HERE
app.use(notFound);
app.use(errorHandler);

const MONGO_URI = process.env.MONGO_URI;

async function connectDB() {
  if (!MONGO_URI) {
    console.error('FATAL ERROR: MONGO_URI is not defined.');
    process.exit(1);
  }
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB Connected.');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  }
}

connectDB();

// Export the app for Vercel
export default app;
