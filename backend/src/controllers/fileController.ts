import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import mongoose from 'mongoose';
import Project, { IFile } from '../models/Project';

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create project files directory if it doesn't exist
    const dir = path.join(__dirname, '../../uploads');
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    // Create unique filename
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

export const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Get all files for a project
export const getProjectFiles = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId).populate('files');
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      files: project.files
    });

  } catch (error) {
    console.error('Error getting project files:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving files'
    });
  }
};

// Upload file to a project
export const uploadFile = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const file = req.file;
    
    if (!file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      // Delete uploaded file if project doesn't exist
      fs.unlinkSync(file.path);
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Create file entry in project
    const fileId = new mongoose.Types.ObjectId();
    const fileEntry: Partial<IFile> = {
      id: fileId,
      name: file.originalname,
      url: `/uploads/${file.filename}`,
      type: path.extname(file.originalname).substring(1),
      size: file.size,
      createdAt: new Date(),
      updatedBy: new mongoose.Types.ObjectId((req as any).user.userId) // From auth middleware
    };

    project.files = project.files || [];
    project.files.push(fileEntry as IFile);
    await project.save();

    res.status(201).json({
      success: true,
      file: fileEntry
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading file'
    });
  }
};

// Delete a file from a project
export const deleteFile = async (req: Request, res: Response) => {
  try {
    const { projectId, fileId } = req.params;
    
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Find file entry by converting fileId string to ObjectId for comparison
    const targetFileId = new mongoose.Types.ObjectId(fileId);
    const fileIndex = project.files.findIndex(f => f.id.equals(targetFileId));
    if (fileIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }

    // Delete file from disk
    const file = project.files[fileIndex];
    // Extract original filename from url
    const filename = file.url.split('/').pop();
    if (filename) {
      const filePath = path.join(__dirname, '../../uploads', filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Remove file from project
    project.files.splice(fileIndex, 1);
    await project.save();

    res.status(200).json({
      success: true,
      message: 'File deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting file'
    });
  }
};

// Get a single file
export const getFile = async (req: Request, res: Response) => {
  try {
    const { projectId, fileId } = req.params;
    
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const targetFileId = new mongoose.Types.ObjectId(fileId);
    const file = project.files.find(f => f.id.equals(targetFileId));
    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }

    // Extract original filename from url
    const filename = file.url.split('/').pop();
    if (!filename) {
      return res.status(404).json({
        success: false,
        message: 'Invalid file URL'
      });
    }

    const filePath = path.join(__dirname, '../../uploads', filename);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'File not found on server'
      });
    }

    res.sendFile(filePath);

  } catch (error) {
    console.error('Error retrieving file:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving file'
    });
  }
};
