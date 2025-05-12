import React from 'react'
import ChatToggleButton from './bot/ChatToggleButton'
import ChatContainer from './bot/ChatContainer'
import {useChatbot} from '../hooks/useChatbot'
import '../style/chatbot.css'

const Chatbot: React.FC = () => {
  const {
    isOpen,
    messages,
    inputText,
    imagePreview,
    chatDisplayRef,
    fileInputRef,
    voiceEnabled,
    isListening,
    interimTranscript,
    toggleChat,
    setInputText,
    handleImageChange,
    sendMessage,
    handleKeyPress,
    setImageFile,
    setImagePreview,
    toggleVoice,
    startListening,
    stopListening,
  } = useChatbot()

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
        voiceEnabled={voiceEnabled}
        isListening={isListening}
        toggleVoice={toggleVoice}
        startListening={startListening}
        stopListening={stopListening}
        interimTranscript={interimTranscript || ''}
      />
    </>
  )
}

// Export functions for compatibility with the original code
// eslint-disable-next-line react-refresh/only-export-components
export function initChatbot(): void {
  console.log('Pizza chatbot initialized through React component')
}

// eslint-disable-next-line react-refresh/only-export-components
export function removeChatbot(): void {
  console.log('Pizza chatbot removed through React unmounting')
}

export default Chatbot
