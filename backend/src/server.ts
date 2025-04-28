// Load environment variables first, before any other imports
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';

// Log environment variables for debugging
console.log('Environment variables check:');
console.log(`MONGO_URI: ${process.env.MONGO_URI ? '✓ Set' : '✗ Not set'}`);
console.log(`JWT_SECRET: ${process.env.JWT_SECRET ? '✓ Set' : '✗ Not set'}`);

// Connect to database
connectDB();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api/auth', authRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('Nomeda API is running...');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;