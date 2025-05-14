import { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { Message } from '../types';
import { sendMessageToAPI, fetchProjectData, fetchTasksForProject } from '../services/apiService';
import { VoiceService } from '../services/voiceService';

export const useChatbot = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [interimTranscript, setInterimTranscript] = useState<string>('');
  const chatDisplayRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const voiceService = useRef<VoiceService>(new VoiceService());

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatDisplayRef.current) {
      chatDisplayRef.current.scrollTop = chatDisplayRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
  };

  const startListening = () => {
    if (!voiceService.current.isVoiceSupported()) {
      console.error('Voice input is not supported in this browser');
      return;
    }

    setIsListening(true);
    voiceService.current.startListening(
      (finalText) => {
        setInputText((prev) => prev + finalText);
        setInterimTranscript('');
      },
      (interimText) => {
        setInterimTranscript(interimText);
      }
    );
  };

  const stopListening = () => {
    setIsListening(false);
    voiceService.current.stopListening();
    setInterimTranscript('');
  };

  const speakMessage = (text: string) => {
    if (voiceEnabled) {
      voiceService.current.speak(text);
    }
  };

  // Add voice output when bot responds
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && !lastMessage.isUser && voiceEnabled) {
      speakMessage(lastMessage.text);
    }
  }, [messages, voiceEnabled]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Please upload an image smaller than 5MB');
      return;
    }

    setImageFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImagePreview(e.target.result as string);
      }
    };
    reader.onerror = () => {
      alert('Error reading file');
      setImageFile(null);
      setImagePreview(null);
    };
    reader.readAsDataURL(file);
  };

  const resetInputs = () => {
    setInputText('');
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const sendMessage = async () => {
    const trimmedText = inputText.trim();
    
    if (!trimmedText && !imageFile) {
      return;
    }

    // Add user message to the UI
    const newUserMessage: Message = {
      text: trimmedText,
      isUser: true,
      imageUrl: imagePreview || undefined,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    resetInputs();
    setIsLoading(true);

    try {
      // The sendMessageToAPI function now handles project data fetching internally
      const aiResponse = await sendMessageToAPI(trimmedText, imagePreview);
      
      setMessages(prev => [...prev, {
        text: aiResponse,
        isUser: false,
        timestamp: new Date().toISOString()
      }]);
    } catch (error) {
      console.error("Error sending message to API:", error);
      setMessages(prev => [...prev, {
        text: "I apologize, but I encountered an error. Please try again later.",
        isUser: false,
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return {
    isOpen,
    messages,
    inputText,
    imagePreview,
    isLoading,
    chatDisplayRef,
    fileInputRef,
    toggleChat,
    setInputText,
    handleImageChange,
    sendMessage,
    handleKeyPress,
    setImageFile,
    setImagePreview,
    resetInputs,
    voiceEnabled,
    isListening,
    interimTranscript,
    toggleVoice,
    startListening,
    stopListening
  };
};