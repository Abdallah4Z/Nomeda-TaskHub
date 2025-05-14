import { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import jwt from 'jsonwebtoken';

// Extended Socket interface with user data
export interface SocketWithUser extends Socket {
  userId?: string;
  userName?: string;
}

// Room name formatter
export const formatProjectRoom = (projectId: string): string => 
  `project_${projectId}`;

// Socket.io singleton service
class SocketService {
  private io: Server | null = null;
  private userSockets: Map<string, string[]> = new Map(); // userId -> socketIds[]

  initialize(httpServer: HttpServer): Server {
    if (this.io) {
      return this.io;
    }    // Create Socket.IO server
    this.io = new Server(httpServer, {
      cors: {
        origin: process.env.CLIENT_URL || ["http://localhost:5173", "http://localhost:3000", "http://localhost:5173/"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
        allowedHeaders: ["Authorization", "Content-Type"]
      },
      transports: ['websocket', 'polling'],
      allowEIO3: true // Allow compatibility with Socket.IO v2 clients
    });

    console.log('Socket.IO server initialized with CORS origins:', 
      process.env.CLIENT_URL || ["http://localhost:5173", "http://localhost:3000"]);

    // Add authentication middleware
    this.io.use((socket: Socket, next) => {
      try {
        console.log('Socket auth attempt', socket.handshake.auth);
        const token = socket.handshake.auth?.token;
        
        if (!token) {
          console.log('No token provided in socket connection');
          return next(new Error('Authentication error: Token required'));
        }

        // Verify JWT token
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        const userId = decoded.userId; 
        console.log('Socket authenticated for user:', userId);
        
        // Attach user data to socket
        (socket as SocketWithUser).userId = userId;
        
        // Store socket connection for this user
        if (!this.userSockets.has(userId)) {
          this.userSockets.set(userId, []);
        }
        this.userSockets.get(userId)?.push(socket.id);

        next();
      } catch (error) {
        next(new Error('Authentication error: Invalid token'));
      }
    });

    // Set up connection handler
    this.io.on('connection', this.handleConnection.bind(this));

    return this.io;
  }

  // Handle new socket connections
  private handleConnection(socket: Socket): void {
    const userSocket = socket as SocketWithUser;
    console.log(`User connected: ${userSocket.userId}`);

    // Join project chat room
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
      this.io?.to(roomName).emit('receive_message', data.message);
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
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      const userId = userSocket.userId;
      if (userId) {
        // Remove this socket from userSockets
        const userSocketIds = this.userSockets.get(userId) || [];
        const updatedSocketIds = userSocketIds.filter(id => id !== socket.id);
        
        if (updatedSocketIds.length === 0) {
          this.userSockets.delete(userId);
        } else {
          this.userSockets.set(userId, updatedSocketIds);
        }
      }
      console.log(`User disconnected: ${userSocket.userId}`);
    });
  }

  // Public methods for sending messages
  sendToUser(userId: string, event: string, data: any): void {
    const socketIds = this.userSockets.get(userId);
    if (socketIds && this.io) {
      socketIds.forEach(socketId => {
        this.io?.to(socketId).emit(event, data);
      });
    }
  }

  sendToRoom(roomName: string, event: string, data: any): void {
    if (this.io) {
      this.io.to(roomName).emit(event, data);
    }
  }

  sendToProject(projectId: string, event: string, data: any): void {
    const roomName = formatProjectRoom(projectId);
    this.sendToRoom(roomName, event, data);
  }

  // Get instance of io
  getIO(): Server | null {
    return this.io;
  }
}

// Export singleton instance
export default new SocketService();