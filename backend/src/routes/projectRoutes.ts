import express from 'express';
import { 
  createProject,
  getAllProjects,
  getProject, 
  updateProject, 
  createTask,
  updateTask,
  deleteTask,
  uploadFile, 
  deleteFile,
  upload,
  getUserProjects
} from '../controllers/projectController';
import { authenticateUser } from '../middleware/authMiddleware';

const router = express.Router();

// Project routes
router.get('/', authenticateUser, getUserProjects);
router.post('/', authenticateUser, createProject);
router.get('/', authenticateUser, getAllProjects);
router.get('/:id', authenticateUser, getProject);
router.put('/:id', authenticateUser, updateProject);

// Task routes
router.post('/:id/tasks', authenticateUser, createTask);
router.put('/:id/tasks/:taskId', authenticateUser, updateTask);
router.delete('/:id/tasks/:taskId', authenticateUser, deleteTask);

// File routes
router.post('/:id/files', authenticateUser, upload.single('file'), uploadFile);
router.delete('/:id/files/:fileId', authenticateUser, deleteFile);

export default router;