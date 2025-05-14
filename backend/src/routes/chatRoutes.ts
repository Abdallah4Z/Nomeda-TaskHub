import express, { Router } from 'express';
import { 
  getUserChats, 
  getChatMessages, 
  sendMessage 
} from '../controllers/chatController';
import { authenticateUser } from '../middleware/authMiddleware';

const router: Router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateUser as express.RequestHandler);

// Get all chats for the authenticated user
router.get('/', getUserChats as express.RequestHandler);

// Get messages for a specific project chat
router.get('/:projectId', getChatMessages as express.RequestHandler);

// Send a new message to a project chat
router.post('/:projectId', sendMessage as express.RequestHandler);

export default router;