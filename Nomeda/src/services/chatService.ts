import axios from 'axios';
import { getAuthHeader } from './apiService';
import { validateMessage } from '../utils/messageUtils';

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
    // Client-side validation using utility function
    const validationError = validateMessage(text, attachment);
    if (validationError) {
      throw new Error(validationError);
    }

    const response = await axios.post(`${API_URL}/chats/${projectId}`, 
      { text: text.trim(), attachment },
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      throw new Error(error.response.data.message || 'Invalid message');
    }
    throw new Error('Failed to send message');
  }
};

// Helper function to filter duplicate messages
export const filterUniqueMessages = (messages: ChatMessage[]): ChatMessage[] => {
  const seen = new Set<string>();
  return messages.filter(message => {
    const key = `${message.id}_${message.senderId}_${message.timestamp}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

// Helper function to merge new messages with existing ones while maintaining uniqueness
export const mergeMessages = (existingMessages: ChatMessage[], newMessages: ChatMessage[]): ChatMessage[] => {
  const allMessages = [...existingMessages, ...newMessages];
  return filterUniqueMessages(allMessages).sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
};

/**
 * Utility function to generate a unique client-side message ID
 * This helps prevent duplicate message rendering while waiting for server response
 */
export const generateClientMessageId = (): string => {
  return `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Utility function to check for duplicate messages in a message array
 */
export const isDuplicateMessage = (messages: ChatMessage[], newMessage: ChatMessage): boolean => {
  return messages.some(msg => 
    msg.text === newMessage.text && 
    msg.senderId === newMessage.senderId &&
    Math.abs(new Date(msg.timestamp).getTime() - new Date(newMessage.timestamp).getTime()) < 5000
  );
};