import { Request, Response } from 'express';
import Project from '../models/Project';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    // Create uploads directory if it doesn't exist
    const dir = './uploads';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
  }
});

export const upload = multer({ storage });

/**
 * Get all projects for the authenticated user
 */
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    
    // Find all projects where the user is either the owner or a member
    const projects = await Project.find({
      $or: [
        { owner: userId },
        { members: userId }
      ]
    });
    
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: 'Error fetching projects', error });
  }
};

/**
 * Create a new project
 */
export const createProject = async (req: Request, res: Response) => {
  try {
    // Create a default project structure
    const project = new Project({
      name: req.body.name || "New Project",
      description: req.body.description || "",
      owner: (req as any).user.userId, // User attached by auth middleware
      members: req.body.members || [],
      tasks: [],
      blocks: [],
      calendarEvents: [],
      files: [],
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(400).json({ message: 'Error creating project', error });
  }
};

/**
 * Get project by ID with all related data
 */
export const getProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('owner', 'name email avatar')
      .populate('members', 'name email avatar')
      .populate('tasks.assignees', 'name email avatar');
    
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }    // Calculate project stats for the Overview tab
    const stats = {
      totalTasks: project.tasks.length,
      completedTasks: project.tasks.filter(task => task.status === 'done').length,
      pendingTasks: project.tasks.filter(task => task.status !== 'done').length,
      totalMembers: (project.members?.length || 0) + 1, // +1 for owner
      upcomingDeadlines: project.tasks
        .filter(task => task.dueDate && new Date(String(task.dueDate)) > new Date())
        .sort((a, b) => {
          if (a.dueDate && b.dueDate) {
            return new Date(String(a.dueDate)).getTime() - new Date(String(b.dueDate)).getTime();
          }
          return 0;
        })
        .slice(0, 5) // Get the 5 nearest upcoming deadlines
    };

    // Format tasks for frontend consumption
    const formattedTasks = project.tasks.map(task => {
      const dueDate = task.dueDate ? new Date(task.dueDate) : null;
      const formattedDueDate = dueDate ? 
        `${dueDate.toLocaleString('default', { month: 'long' })} ${dueDate.getDate()} - ${dueDate.getHours()}:${String(dueDate.getMinutes()).padStart(2, '0')}${dueDate.getHours() >= 12 ? 'PM' : 'AM'}` : 
        null;
      
      return {
        id: task._id,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        assignedAt: formattedDueDate,
        dueDate: task.dueDate,        users: task.assignees.map(user => {
          const userObj = typeof user === 'object' ? user : { _id: user };
          return {
            name: (userObj as any).name || 'Unknown',
            avatar: (userObj as any).avatar || `https://robohash.org/${(userObj as any).name || 'user'}?set=set5&size=200x200` // Default avatar if none exists
          };
        }),
        labels: task.labels,
        actions: [
          { label: 'Edit', onClick: () => {} }, // Actions will be handled on frontend
          { label: 'Delete', onClick: () => {} }
        ]
      };
    });

    res.json({
      ...project.toObject(),
      stats,
      formattedTasks
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(400).json({ message: 'Error fetching project', error });
  }
};

/**
 * Update an entire project
 */
export const updateProject = async (req: Request, res: Response) => {
  try {
    // Prevent updating sensitive fields
    const { owner, ...updateData } = req.body;
    
    // Add updated timestamp
    updateData.updatedAt = new Date();
      const project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }

    res.json(project);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(400).json({ message: 'Error updating project', error });
  }
};

/**
 * Create a new task in a project
 */
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, status, priority, dueDate, assignees, labels } = req.body;
    
    const taskId = new mongoose.Types.ObjectId();    const newTask = {
      _id: taskId,
      title,
      description,
      status: status || 'todo',
      priority: priority || 'Normal',
      assignees: assignees || [], // Now storing assignee names as strings
      dueDate: dueDate ? new Date(dueDate) : null,
      labels: labels || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Add task to project
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { 
        $push: { tasks: newTask },
        updatedAt: new Date()
      },
      { new: true }
    );
      if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    
    // If task has a due date, also create a calendar event
    if (dueDate) {
      const calendarEvent = {
        title: title,
        start: new Date(dueDate),
        end: new Date(dueDate),
        allDay: false,
        description: description,
        taskId: taskId,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      await Project.findByIdAndUpdate(
        req.params.id,
        { $push: { calendarEvents: calendarEvent } }
      );
    }
    
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(400).json({ message: 'Error creating task', error });
  }
};

/**
 * Update a task in a project
 */
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { title, description, status, priority, dueDate, assignees, labels } = req.body;
    
    // Find the project and update the specific task
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, "tasks._id": taskId },
      { 
        $set: {
          "tasks.$.title": title,
          "tasks.$.description": description,
          "tasks.$.status": status,
          "tasks.$.priority": priority,
          "tasks.$.dueDate": dueDate ? new Date(dueDate) : null,
          "tasks.$.assignees": assignees || [],
          "tasks.$.labels": labels || [],
          "tasks.$.updatedAt": new Date(),
          updatedAt: new Date()
        }
      },
      { new: true }
    );
      if (!project) {
      res.status(404).json({ message: 'Project or task not found' });
      return;
    }
    
    // Also update any associated calendar event
    if (dueDate) {
      await Project.findOneAndUpdate(
        { _id: req.params.id, "calendarEvents.taskId": taskId },
        {
          $set: {
            "calendarEvents.$.title": title,
            "calendarEvents.$.start": new Date(dueDate),
            "calendarEvents.$.end": new Date(dueDate),
            "calendarEvents.$.description": description,
            "calendarEvents.$.updatedAt": new Date()
          }
        }
      );
    }
    
    const updatedTask = project.tasks.find(task => (task._id as mongoose.Types.ObjectId).toString() === taskId);
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(400).json({ message: 'Error updating task', error });
  }
};

/**
 * Delete a task from a project
 */
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    
    // Remove task from project
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { 
        $pull: { tasks: { _id: taskId } },
        updatedAt: new Date()
      },
      { new: true }
    );
      if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    
    // Also remove any associated calendar event
    await Project.findByIdAndUpdate(
      req.params.id,
      { $pull: { calendarEvents: { taskId: taskId } } }
    );
    
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(400).json({ message: 'Error deleting task', error });
  }
};

/**
 * Upload and attach a file to a project
 */
export const uploadFile = async (req: Request & { file?: any }, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    const fileItem = {
      _id: new mongoose.Types.ObjectId(),
      name: file.originalname,
      url: `/uploads/${file.filename}`,
      type: file.mimetype,
      size: file.size,
      createdAt: new Date(),
      updatedBy: (req as any).user.userId
    };

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { 
        $push: { files: fileItem },
        updatedAt: new Date()
      },
      { new: true }
    );
      if (!project) {
      // Delete the uploaded file if project not found
      fs.unlinkSync(path.join('./uploads', file.filename));
      res.status(404).json({ message: 'Project not found' });
      return;
    }

    res.json(fileItem);
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(400).json({ message: 'Error uploading file', error });
  }
};

/**
 * Delete a file from a project
 */
export const deleteFile = async (req: Request, res: Response) => {
  try {
    const { fileId } = req.params;
    
    // Find the project and get the file information
    const project = await Project.findById(req.params.id);
      if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    
    const file = project.files.find(f => (f._id as mongoose.Types.ObjectId).toString() === fileId);
    
    if (!file) {
      res.status(404).json({ message: 'File not found' });
      return;
    }
      // Extract filename from URL
    const filename = file.url.split('/').pop();
    
    // Remove file from project
    await Project.findByIdAndUpdate(
      req.params.id,
      { 
        $pull: { files: { _id: fileId } },
        updatedAt: new Date()
      }
    );
    
    // Delete physical file
    const filePath = filename ? path.join('./uploads', filename) : './uploads/unknown';
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(400).json({ message: 'Error deleting file', error });
  }
};