// Load environment variables first, before any other imports
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import fileRoutes from './routes/fileRoutes';

// Log environment variables for debugging
console.log('Environment variables check:');
console.log(`MONGO_URI: ${process.env.MONGO_URI ? '✓ Set' : '✗ Not set'}`);
console.log(`JWT_SECRET: ${process.env.JWT_SECRET ? '✓ Set' : '✗ Not set'}`);

// Connect to database
connectDB();

// Initialize express app
const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api', fileRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('Nomeda API is running...');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;