import axios from 'axios';
import { getAuthHeader } from './apiService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface Chat {
  id: string;
  projectId: string;
  projectName: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  } | null;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  attachment?: string;
}

export interface ChatDetails {
  chatId: string;
  projectName: string;
  messages: ChatMessage[];
}

// Get all chats for the current user
export const getUserChats = async (): Promise<Chat[]> => {
  try {
    const response = await axios.get(`${API_URL}/chats`, {
      headers: getAuthHeader()
    });
    return response.data.chats;
  } catch (error) {
    console.error('Error fetching chats:', error);
    throw new Error('Failed to fetch chats');
  }
};

// Get messages for a specific project chat
export const getChatMessages = async (projectId: string): Promise<ChatDetails> => {
  try {
    const response = await axios.get(`${API_URL}/chats/${projectId}`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    throw new Error('Failed to fetch chat messages');
  }
};

// Send a message to a project chat
export const sendMessage = async (projectId: string, text: string, attachment?: string): Promise<ChatMessage> => {
  try {
    const response = await axios.post(`${API_URL}/chats/${projectId}`, 
      { text, attachment },
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw new Error('Failed to send message');
  }
};