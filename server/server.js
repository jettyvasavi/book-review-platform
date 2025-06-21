import express from 'express';
import mongoose from 'mongoose';
// No longer need to import 'cors'
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import bookRoutes from './routes/bookRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

// --- MANUAL CORS MIDDLEWARE IMPLEMENTATION ---
// This block replaces the app.use(cors(corsOptions))
app.use((req, res, next) => {
  // Define the list of origins that are allowed to access this API
  const allowedOrigins = [
    'http://localhost:5173',                         // Your local frontend for development
    'https://book-review-platform-1-1wz2.onrender.com' // Your live frontend on Render
  ];
  const origin = req.headers.origin;

  // Check if the incoming request's origin is in our allowed list
  if (allowedOrigins.includes(origin)) {
    // If it is, set the Access-Control-Allow-Origin header to that specific origin.
    // This is the most important header for CORS.
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  // Set other necessary CORS headers that browsers will look for
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Browsers send a "preflight" OPTIONS request for complex requests (e.g., with auth headers).
  // We need to handle it by sending a successful (200) response.
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // If it's not a preflight request, move on to the next middleware/route handler.
  next();
});
// --- END OF MANUAL CORS MIDDLEWARE ---


app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);

// A simple root route for health checks
app.get('/', (req, res) => {
    res.send('API is running successfully.');
});

// Custom Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 10000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  });
