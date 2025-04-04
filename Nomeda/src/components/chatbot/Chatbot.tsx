import React from 'react';
import ChatToggleButton from './components/ChatToggleButton';
import ChatContainer from './components/ChatContainer';
import { useChatbot } from './hooks/useChatbot';
import './styles/chatbot.css';

const Chatbot: React.FC = () => {
  const {
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
  } = useChatbot();

  return (
    <>
      <ChatToggleButton toggleChat={toggleChat} />

      <ChatContainer
        isOpen={isOpen}
        toggleChat={toggleChat}
        messages={messages}
        inputText={inputText}
        setInputText={setInputText}
        sendMessage={sendMessage}
        handleKeyPress={handleKeyPress}
        fileInputRef={fileInputRef}
        chatDisplayRef={chatDisplayRef}
        imagePreview={imagePreview}
        setImageFile={setImageFile}
        setImagePreview={setImagePreview}
        handleImageChange={handleImageChange}
      />
    </>
  );
};

// Export functions for compatibility with the original code
// eslint-disable-next-line react-refresh/only-export-components
export function initChatbot(): void {
  console.log("Pizza chatbot initialized through React component");
}

// eslint-disable-next-line react-refresh/only-export-components
export function removeChatbot(): void {
  console.log("Pizza chatbot removed through React unmounting");
}

export default Chatbot;