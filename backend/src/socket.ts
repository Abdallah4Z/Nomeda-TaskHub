import { Server, Socket } from 'socket.io';
import http from 'http';
import jwt from 'jsonwebtoken';
import { Server as HttpServer } from 'http';

// Socket.IO interface with authentication
interface SocketWithUser extends Socket {
  userId?: string;
}

// Room format: project_{projectId}
const formatProjectRoom = (projectId: string) => `project_${projectId}`;

export default function initializeSocket(server: HttpServer) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5000",
      methods: ["GET", "POST"],
      credentials: true
    }
  });
  // Authentication middleware
  io.use((socket: Socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) {
        return next(new Error('Authentication error: Token required'));
      }

      // Verify JWT token
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      (socket as SocketWithUser).userId = decoded.userId;
      next();
    } catch (error) {
      next(new Error('Authentication error: Invalid token'));
    }
  });

  io.on('connection', (socket: Socket) => {
    const userSocket = socket as SocketWithUser;
    console.log(`User connected: ${userSocket.userId}`);    // Join project chat room
    socket.on('join_project_chat', (projectId: string) => {
      const roomName = formatProjectRoom(projectId);
      socket.join(roomName);
      console.log(`User ${userSocket.userId} joined room ${roomName}`);
    });

    // Leave project chat room
    socket.on('leave_project_chat', (projectId: string) => {
      const roomName = formatProjectRoom(projectId);
      socket.leave(roomName);
      console.log(`User ${userSocket.userId} left room ${roomName}`);
    });

    // Send message to project chat
    socket.on('send_message', (data: { 
      projectId: string; 
      message: {
        id: string;
        senderId: string;
        senderName: string;
        senderAvatar: string;
        text: string;
        timestamp: string;
        attachment?: string;
      }
    }) => {
      const roomName = formatProjectRoom(data.projectId);
      io.to(roomName).emit('receive_message', data.message);
    });

    // Handle typing events
    socket.on('typing', (data: { projectId: string; userId: string; userName: string }) => {
      const roomName = formatProjectRoom(data.projectId);
      socket.to(roomName).emit('user_typing', { 
        userId: data.userId, 
        userName: data.userName 
      });
    });

    socket.on('stop_typing', (data: { projectId: string; userId: string }) => {
      const roomName = formatProjectRoom(data.projectId);
      socket.to(roomName).emit('user_stop_typing', { userId: data.userId });
    });    // Disconnect event
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${userSocket.userId}`);
    });
  });

  return io;
}
