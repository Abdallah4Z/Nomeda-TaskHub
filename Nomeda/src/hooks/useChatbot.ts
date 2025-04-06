import { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { Message } from '../types';
import { sendMessageToAPI } from '../services/apiService';

export const useChatbot = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const chatDisplayRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    if (chatDisplayRef.current) {
      chatDisplayRef.current.scrollTop = chatDisplayRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImagePreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim() && !imageFile) return;

    // Add user message to the UI
    const newUserMessage: Message = {
      text: inputText,
      isUser: true,
      imageUrl: imagePreview || undefined
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    // Reset input fields
    setInputText('');
    setImageFile(null);
    setImagePreview(null);

    try {
      const aiResponse = await sendMessageToAPI(inputText, imagePreview);
      
      // Add bot response
      setMessages(prev => [...prev, {
        text: aiResponse,
        isUser: false
      }]);
    } catch (error) {
      console.error("Error sending message to API:", error);
      setMessages(prev => [...prev, {
        text: "Sorry, I encountered an error. Please try again later.",
        isUser: false
      }]);
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  };

  return {
    isOpen,
    messages,
    inputText,
    imagePreview,
    chatDisplayRef,
    fileInputRef,
    toggleChat,
    setInputText,
    handleImageChange,
    sendMessage,
    handleKeyPress,
    setImageFile,
    setImagePreview
  };
};