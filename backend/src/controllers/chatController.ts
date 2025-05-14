import { Request, Response } from 'express';
import Chat from '../models/Chat';
import Project from '../models/Project';
import mongoose from 'mongoose';

/**
 * Get all chats for a user
 * Returns chats for projects where the user is an owner or member
 */
export const getUserChats = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    
    // Find all projects where user is owner or member
    const projects = await Project.find({
      $or: [
        { owner: userId },
        { members: userId }
      ]
    }).select('_id name');

    if (!projects || projects.length === 0) {
      return res.json({ chats: [] });
    }

    const projectIds = projects.map(project => project._id);
    
    // Find chats for these projects and populate sender information for the last message
    const chats = await Chat.aggregate([
      {
        $match: { projectId: { $in: projectIds } }
      },
      {
        $project: {
          projectId: 1,
          participants: 1,
          lastMessage: { $arrayElemAt: ['$messages', -1] },
          messageCount: { $size: '$messages' },
          updatedAt: 1
        }
      },
      {
        $lookup: {
          from: 'projects',
          localField: 'projectId',
          foreignField: '_id',
          as: 'project'
        }
      },
      {
        $unwind: '$project'
      },
      {
        $project: {
          projectId: 1,
          'project.name': 1,
          'project.description': 1,
          lastMessage: 1,
          messageCount: 1,
          updatedAt: 1
        }
      },
      {
        $sort: { updatedAt: -1 }
      }
    ]);

    // Format the chats for frontend
    const formattedChats = await Promise.all(chats.map(async chat => {
      // Get sender info for last message if it exists
      let sender = null;
      if (chat.lastMessage && chat.lastMessage.sender) {
        const User = mongoose.model('User');
        sender = await User.findById(chat.lastMessage.sender).select('name photoUrl');
      }
      
      return {
        id: chat._id,
        projectId: chat.projectId,
        projectName: chat.project.name,
        lastMessage: chat.lastMessage ? chat.lastMessage.text : '',
        timestamp: chat.lastMessage ? chat.lastMessage.timestamp : chat.updatedAt,
        unread: 0, // This would need a separate tracking mechanism
        avatar: `https://robohash.org/${chat.project.name}`,
        sender: sender ? {
          id: sender._id,
          name: sender.name,
          avatar: sender.photoUrl || `https://robohash.org/${sender.name}`
        } : null
      };
    }));

    res.json({ chats: formattedChats });
  } catch (error) {
    console.error('Error getting user chats:', error);
    res.status(500).json({ message: 'Error retrieving chats' });
  }
};

/**
 * Get messages for a specific chat
 */
export const getChatMessages = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const userId = (req as any).user.userId;

    // Check if user has access to this project
    const project = await Project.findOne({
      _id: projectId,
      $or: [
        { owner: userId },
        { members: userId }
      ]
    });

    if (!project) {
      return res.status(403).json({ message: 'You do not have access to this chat' });
    }    // Get or create the chat for this project
    let chat = await Chat.findOne({ projectId })
      .populate({
        path: 'messages.sender',
        select: 'name photoUrl'
      });

    if (!chat) {
      // Create a new chat for this project
      chat = await Chat.create({
        projectId,
        participants: [project.owner, ...project.members],
        messages: []
      });
    }

    // Format messages for frontend with null check and safe access
    const messages = chat.messages.map(msg => {
      const sender = msg.sender as any;
      return {
        id: msg._id,
        senderId: sender?._id || 'unknown',
        senderName: sender?.name || 'Unknown User',
        senderAvatar: sender?.photoUrl || `https://robohash.org/${sender?.name || 'unknown'}`,
        text: msg.text,
        timestamp: msg.timestamp,
        attachment: msg.attachment
      };
    });

    res.json({ 
      chatId: chat._id,
      projectName: project.name,
      messages 
    });
  } catch (error) {
    console.error('Error getting chat messages:', error);
    res.status(500).json({ message: 'Error retrieving messages' });
  }
};

/**
 * Send a new message to a chat
 */
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const { text, attachment } = req.body;
    const userId = (req as any).user.userId;

    // Check if user has access to this project
    const project = await Project.findOne({
      _id: projectId,
      $or: [
        { owner: userId },
        { members: userId }
      ]
    });

    if (!project) {
      return res.status(403).json({ message: 'You do not have access to this chat' });
    }

    // Get or create chat for this project
    let chat = await Chat.findOne({ projectId });
    
    if (!chat) {
      chat = await Chat.create({
        projectId,
        participants: [project.owner, ...project.members],
        messages: []
      });
    }    // Add new message
    const newMessage = {
      sender: new mongoose.Types.ObjectId(userId),
      text: text || '',  // Ensure text is never null/undefined
      timestamp: new Date(),
      attachment: attachment || undefined  // Make sure attachment is undefined if not provided
    };

    // Add message to chat document
    chat.messages.push(newMessage as any);  // Type assertion to avoid strict type checking issues
    chat.updatedAt = new Date();
    
    try {
      await chat.save();
    } catch (saveError) {
      console.error('Error saving chat:', saveError);
      throw saveError;  // Re-throw to be caught by the outer catch block
    }    // Get the newly created message with populated sender
    // Safely access the last message
    const createdMessage = chat.messages[chat.messages.length - 1];
    
    // Get user info with error handling
    const User = mongoose.model('User');
    const sender = await User.findById(userId).select('name photoUrl');
    
    if (!sender) {
      return res.status(404).json({ message: 'Sender not found' });
    }

    // Format the message response with proper null checks
    const messageResponse = {
      id: createdMessage._id || new mongoose.Types.ObjectId(),
      senderId: userId,
      senderName: sender?.name || 'Unknown User',
      senderAvatar: sender?.photoUrl || `https://robohash.org/${sender?.name || 'unknown'}`,
      text: createdMessage.text || '',
      timestamp: createdMessage.timestamp || new Date(),
      attachment: createdMessage.attachment || undefined
    };    // Emit socket event if available
    try {
      if ((req as any).socketService) {
        const socketService = (req as any).socketService;
        socketService.sendToProject(projectId, 'receive_message', messageResponse);
      }
    } catch (socketError) {
      console.error('Socket error:', socketError);
      // Continue with response even if socket emitting fails
    }

    // Send response to client
    res.status(201).json(messageResponse);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ 
      message: 'Error sending message', 
      error: error instanceof Error ? error.message : String(error)
    });
  }
};