import { ChatMessage } from '../services/chatService';

/**
 * Utility functions for handling chat messages and ensuring uniqueness
 */

/**
 * Generate a unique message key for deduplication
 */
export const generateMessageKey = (message: ChatMessage): string => {
  return `${message.id}_${message.senderId}_${message.timestamp}`;
};

/**
 * Check if a message is considered a duplicate based on content and timing
 */
export const isDuplicateMessage = (
  messages: ChatMessage[], 
  newMessage: ChatMessage, 
  timeWindow: number = 5000
): boolean => {
  const newMessageTime = new Date(newMessage.timestamp).getTime();
  
  return messages.some(existingMessage => 
    existingMessage.text.trim() === newMessage.text.trim() &&
    existingMessage.senderId === newMessage.senderId &&
    Math.abs(new Date(existingMessage.timestamp).getTime() - newMessageTime) < timeWindow
  );
};

/**
 * Remove duplicate messages from an array while preserving order
 */
export const removeDuplicateMessages = (messages: ChatMessage[]): ChatMessage[] => {
  const seen = new Set<string>();
  const uniqueMessages: ChatMessage[] = [];
  
  // Process messages in reverse order to keep the latest version of duplicates
  for (let i = messages.length - 1; i >= 0; i--) {
    const message = messages[i];
    const key = generateMessageKey(message);
    
    if (!seen.has(key)) {
      seen.add(key);
      uniqueMessages.unshift(message); // Add to beginning to maintain order
    }
  }
  
  return uniqueMessages;
};

/**
 * Merge and sort messages while ensuring uniqueness
 */
export const mergeAndSortMessages = (
  existingMessages: ChatMessage[], 
  newMessages: ChatMessage[]
): ChatMessage[] => {
  const allMessages = [...existingMessages, ...newMessages];
  const uniqueMessages = removeDuplicateMessages(allMessages);
  
  // Sort by timestamp
  return uniqueMessages.sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
};

/**
 * Validate message content before sending
 */
export const validateMessage = (text: string, attachment?: string): string | null => {
  const trimmedText = text.trim();
  
  if (!trimmedText && !attachment) {
    return 'Message cannot be empty';
  }
  
  if (trimmedText.length > 5000) {
    return 'Message is too long (maximum 5000 characters)';
  }
  
  return null; // No validation errors
};

/**
 * Format timestamp for display
 */
export const formatMessageTime = (timestamp: string): string => {
  try {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      // Show time if message is from today
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) {
      // Show day and time if message is from this week
      return date.toLocaleDateString([], { weekday: 'short', hour: '2-digit', minute: '2-digit' });
    } else {
      // Show date if message is older
      return date.toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
  } catch (error) {
    console.error('Error formatting message time:', error);
    return timestamp;
  }
};

/**
 * Check if user can edit/delete a message
 */
export const canUserModifyMessage = (message: ChatMessage, currentUserId: string): boolean => {
  return message.senderId === currentUserId;
};

/**
 * Create a temporary message for optimistic UI updates
 */
export const createTemporaryMessage = (
  text: string, 
  senderId: string, 
  senderName: string, 
  senderAvatar: string,
  attachment?: string
): ChatMessage => {
  return {
    id: `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    senderId,
    senderName,
    senderAvatar,
    text: text.trim(),
    timestamp: new Date().toISOString(),
    attachment
  };
};
