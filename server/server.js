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


app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the Book Review API. The server is responding.' });
});


app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;


console.log("--- Vercel Serverless Function Log ---");

console.log("Is this a Vercel environment?", !!process.env.VERCEL);

if (MONGO_URI) {
  
  console.log("MONGO_URI is PRESENT. Starts with:", MONGO_URI.substring(0, 20) + "...");
} else {
 
  console.error("CRITICAL RUNTIME ERROR: MONGO_URI environment variable is UNDEFINED.");
}

async function connectDB() {
  if (!MONGO_URI) {
    
    console.error('Halting: Cannot connect to DB without MONGO_URI.');
    return; 
  }
  try {
    
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB Connection Successful.');
  } catch (err) {
    
    console.error('❌ MongoDB Connection Error:', err.message);
    
    throw new Error('Database connection failed');
  }
}


connectDB();

export default app;
