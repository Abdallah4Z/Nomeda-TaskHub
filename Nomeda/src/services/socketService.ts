import { io, Socket } from 'socket.io-client';
import { getAuthToken } from './apiService';

interface SocketOptions {
  autoConnect?: boolean;
}

class SocketService {
  private socket: Socket | null = null;  private API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  private SOCKET_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/api$/, '');

  constructor() {
    this.initializeSocket();
  }

  private initializeSocket(options: SocketOptions = { autoConnect: true }) {
    const token = getAuthToken();
    
    if (!token) {
      console.error('Authentication token not found. Socket connection aborted.');
      return;
    }

    console.log('Connecting to socket server:', this.SOCKET_URL);
    
    this.socket = io(this.SOCKET_URL, {
      autoConnect: options.autoConnect,
      auth: {
        token
      },
      transports: ['websocket', 'polling']
    });

    this.socket.on('connect', () => {
      console.log('Socket connected');
    });

    this.socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err.message);
    });

    this.socket.on('disconnect', (reason) => {
      console.log(`Socket disconnected: ${reason}`);
    });
  }

  // Connect to socket server
  connect() {
    if (!this.socket) {
      this.initializeSocket();
    } else if (!this.socket.connected) {
      this.socket.connect();
    }
  }

  // Disconnect from socket server
  disconnect() {
    if (this.socket && this.socket.connected) {
      this.socket.disconnect();
    }
  }

  // Join a project chat room
  joinProjectChat(projectId: string) {
    if (this.socket && this.socket.connected) {
      this.socket.emit('join_project_chat', projectId);
    }
  }

  // Leave a project chat room
  leaveProjectChat(projectId: string) {
    if (this.socket && this.socket.connected) {
      this.socket.emit('leave_project_chat', projectId);
    }
  }

  // Listen for new messages
  onReceiveMessage(callback: (message: any) => void) {
    if (this.socket) {
      this.socket.on('receive_message', callback);
    }
  }

  // Listen for typing events
  onUserTyping(callback: (data: { userId: string; userName: string }) => void) {
    if (this.socket) {
      this.socket.on('user_typing', callback);
    }
  }

  // Listen for stop typing events
  onUserStopTyping(callback: (data: { userId: string }) => void) {
    if (this.socket) {
      this.socket.on('user_stop_typing', callback);
    }
  }

  // Send typing event
  sendTyping(projectId: string, userId: string, userName: string) {
    if (this.socket && this.socket.connected) {
      this.socket.emit('typing', { projectId, userId, userName });
    }
  }

  // Send stop typing event
  sendStopTyping(projectId: string, userId: string) {
    if (this.socket && this.socket.connected) {
      this.socket.emit('stop_typing', { projectId, userId });
    }
  }

  // Remove event listeners
  removeListener(event: string) {
    if (this.socket) {
      this.socket.off(event);
    }
  }

  // Remove all listeners
  removeAllListeners() {
    if (this.socket) {
      this.socket.removeAllListeners();
    }
  }
}

// Create a singleton instance
const socketService = new SocketService();

export default socketService;
