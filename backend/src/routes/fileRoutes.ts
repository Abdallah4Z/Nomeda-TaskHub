import express, { Router } from 'express';
import { authenticateUser } from '../middleware/authMiddleware';
import { upload, getProjectFiles, uploadFile, deleteFile, getFile } from '../controllers/fileController';

const router: Router = express.Router();

// Require authentication for all file routes
router.use(authenticateUser as express.RequestHandler);

// File routes
router.get('/projects/:projectId/files', getProjectFiles as express.RequestHandler);
router.post('/projects/:projectId/files', upload.single('file'), uploadFile as express.RequestHandler);
router.delete('/projects/:projectId/files/:fileId', deleteFile as express.RequestHandler);
router.get('/projects/:projectId/files/:fileId', getFile as express.RequestHandler);

export default router;
