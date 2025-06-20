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

// --- CORS CONFIGURATION FOR VERCEL ---
// When you deploy, Vercel will create a production URL for you.
// You should add it to the cors options to be secure.
const allowedOrigins = [
  'http://localhost:3000', // For local development
  // 'https://your-project-name.vercel.app' // <-- ADD YOUR VERCEL URL HERE LATER
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
// --- END CORS CONFIGURATION ---


app.use(express.json());

// A simple root route for the API to check if it's running
app.get('/api', (req, res) => {
  res.send('API is running...');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);

// Custom Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // Only listen if NOT on Vercel. Vercel handles the server listening part.
    if (process.env.NODE_ENV !== 'production') {
      app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
    }
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

// Export the app for Vercel's serverless environment
export default app;

