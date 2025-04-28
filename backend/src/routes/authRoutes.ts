import express, { Router } from 'express';
import { register, login, getCurrentUser } from '../controllers/authController';
import { googleAuth } from '../controllers/googleAuthController';
import { githubAuth, githubCallback } from '../controllers/githubAuthController';
import { authenticateUser } from '../middleware/authMiddleware';

const router: Router = express.Router();

// Auth routes
router.post('/register', register as express.RequestHandler);
router.post('/login', login as express.RequestHandler);
router.get('/me', authenticateUser as express.RequestHandler, getCurrentUser as express.RequestHandler);

// Social auth routes
router.post('/google', googleAuth as express.RequestHandler);
router.post('/github', githubAuth as express.RequestHandler);
router.post('/github/callback', githubCallback as express.RequestHandler);

export default router;