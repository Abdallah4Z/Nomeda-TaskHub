import { useState, useEffect, useCallback, useRef } from 'react';
import { getUserChats, getChatMessages, sendMessage, Chat, ChatMessage, ChatDetails } from '../services/chatService';
import socketService from '../services/socketService';

interface UseChatReturn {
  chats: Chat[];
  loading: boolean;
  error: string | null;
  selectedChat: Chat | null;
  currentMessages: ChatMessage[];
  projectName: string;
  message: string;
  typingUsers: { [key: string]: string };
  setMessage: (message: string) => void;
  setSelectedChat: (chat: Chat | null) => void;
  fetchChats: () => Promise<void>;
  fetchMessages: (projectId: string) => Promise<void>;
  handleSendMessage: () => Promise<void>;
  handleKeyPress: (event: React.KeyboardEvent) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const useChat = (): UseChatReturn => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [currentMessages, setCurrentMessages] = useState<ChatMessage[]>([]);
  const [projectName, setProjectName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [typingUsers, setTypingUsers] = useState<{ [key: string]: string }>({});
  
  const typingTimeoutRef = useRef<{ [key: string]: NodeJS.Timeout }>({});
  const currentUserRef = useRef<{ id: string; name: string } | null>(null);

  // Set up the current user information
  useEffect(() => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        currentUserRef.current = { 
          id: user.id,
          name: user.name || 'User'
        };
      }
    } catch (err) {
      console.error("Error parsing user from localStorage:", err);
    }
  }, []);

  const fetchChats = useCallback(async () => {
    try {
      setLoading(true);
      const chatData = await getUserChats();
      setChats(chatData);
      setError(null);
    } catch (err) {
      setError('Failed to load chats');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMessages = useCallback(async (projectId: string) => {
    try {
      setLoading(true);
      const chatDetails: ChatDetails = await getChatMessages(projectId);
      setCurrentMessages(chatDetails.messages);
      setProjectName(chatDetails.projectName);
      setError(null);
    } catch (err) {
      setError('Failed to load messages');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load chats on initial render and set up socket connection
  useEffect(() => {
    fetchChats();
    socketService.connect();

    return () => {
      // Clean up socket connection on unmount
      socketService.disconnect();
    };
  }, [fetchChats]);

  // Handle real-time message reception
  useEffect(() => {
    socketService.onReceiveMessage((newMessage: ChatMessage) => {
      // Add new message to current messages if it belongs to the selected chat
      if (selectedChat && newMessage.senderId !== currentUserRef.current?.id) {
        setCurrentMessages(prev => [...prev, newMessage]);
        
        // Update the chat list with the new message
        setChats(prevChats => prevChats.map(chat => 
          chat.projectId === selectedChat.projectId
            ? { 
                ...chat, 
                lastMessage: newMessage.text, 
                timestamp: newMessage.timestamp,
                sender: {
                  id: newMessage.senderId,
                  name: newMessage.senderName,
                  avatar: newMessage.senderAvatar
                }
              } 
            : chat
        ));
      }
    });

    // Handle typing indicators
    socketService.onUserTyping(({ userId, userName }) => {
      if (userId !== currentUserRef.current?.id) {
        setTypingUsers(prev => ({ ...prev, [userId]: userName }));
      }
    });

    socketService.onUserStopTyping(({ userId }) => {
      setTypingUsers(prev => {
        const newState = { ...prev };
        delete newState[userId];
        return newState;
      });
    });

    return () => {
      // Clean up event listeners
      socketService.removeListener('receive_message');
      socketService.removeListener('user_typing');
      socketService.removeListener('user_stop_typing');
    };
  }, [selectedChat]);

  // Join/leave project chat room when selected chat changes
  useEffect(() => {
    if (selectedChat) {
      // Leave any previous chat room
      if (selectedChat.projectId) {
        socketService.joinProjectChat(selectedChat.projectId);
      }
    }

    return () => {
      if (selectedChat?.projectId) {
        socketService.leaveProjectChat(selectedChat.projectId);
      }
    };
  }, [selectedChat?.projectId]);

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedChat) return;

    try {
      const newMessage = await sendMessage(selectedChat.projectId, message);
      setCurrentMessages(prev => [...prev, newMessage]);
      setMessage('');
      
      // Update the last message in the chat list
      setChats(prevChats => prevChats.map(chat => 
        chat.id === selectedChat.id 
          ? { 
              ...chat, 
              lastMessage: message, 
              timestamp: new Date().toISOString(),
              sender: {
                id: currentUserRef.current?.id || '',
                name: currentUserRef.current?.name || 'User',
                avatar: ''
              }
            } 
          : chat
      ));

      // Send stop typing event
      if (currentUserRef.current && selectedChat.projectId) {
        socketService.sendStopTyping(selectedChat.projectId, currentUserRef.current.id);
      }
    } catch (err) {
      setError('Failed to send message');
      console.error(err);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    // Handle typing events with debounce
    if (selectedChat?.projectId && currentUserRef.current) {
      const userId = currentUserRef.current.id;
      const userName = currentUserRef.current.name;

      // Send typing event
      socketService.sendTyping(selectedChat.projectId, userId, userName);

      // Clear any existing timeout
      if (typingTimeoutRef.current[userId]) {
        clearTimeout(typingTimeoutRef.current[userId]);
      }

      // Set a new timeout to send stop typing event after 2 seconds
      typingTimeoutRef.current[userId] = setTimeout(() => {
        socketService.sendStopTyping(selectedChat.projectId, userId);
      }, 2000);
    }
  };

  return {
    chats,
    loading,
    error,
    selectedChat,
    currentMessages,
    projectName,
    message,
    typingUsers,
    setMessage,
    setSelectedChat,
    fetchChats,
    fetchMessages,
    handleSendMessage,
    handleKeyPress,
    handleInputChange
  };
};