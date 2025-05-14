// Load environment variables first, before any other imports
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import http from 'http';
import connectDB from './config/db';
import socketService from './sockets/socketService';
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import fileRoutes from './routes/fileRoutes';
import chatRoutes from './routes/chatRoutes';

// Log environment variables for debugging
console.log('Environment variables check:');
console.log(`MONGO_URI: ${process.env.MONGO_URI ? '✓ Set' : '✗ Not set'}`);
console.log(`JWT_SECRET: ${process.env.JWT_SECRET ? '✓ Set' : '✗ Not set'}`);

// Connect to database
connectDB();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// Initialize socket.io with CORS settings
const io = socketService.initialize(server);

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Make socketService available in routes
app.use((req, res, next) => {
  (req as any).socketService = socketService;
  next();
});

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api', fileRoutes);
app.use('/api/chats', chatRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('Nomeda API is running...');
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;