import {RefObject, ChangeEvent, KeyboardEvent} from 'react'
import {Box} from '@mui/material'
import ChatHeader from './ChatHeader'
import ChatDisplay from './ChatDisplay'
import BottomSection from './BottomSection'
import {Message} from '../../types'

interface ChatContainerProps {
  isOpen: boolean
  toggleChat: () => void
  messages: Message[]
  inputText: string
  setInputText: (text: string) => void
  sendMessage: () => void
  handleKeyPress: (event: KeyboardEvent<HTMLInputElement>) => void
  fileInputRef: RefObject<HTMLInputElement | null>
  chatDisplayRef: RefObject<HTMLDivElement | null>
  imagePreview: string | null
  setImageFile: (file: File | null) => void
  setImagePreview: (preview: string | null) => void
  handleImageChange: (event: ChangeEvent<HTMLInputElement>) => void
  voiceEnabled?: boolean
  isListening?: boolean
  toggleVoice?: () => void
  startListening?: () => void
  stopListening?: () => void
  interimTranscript?: string
}

function ChatContainer({
  isOpen,
  toggleChat,
  messages,
  inputText,
  setInputText,
  sendMessage,
  handleKeyPress,
  fileInputRef,
  chatDisplayRef,
  imagePreview,
  setImageFile,
  setImagePreview,
  handleImageChange,
  voiceEnabled,
  isListening,
  toggleVoice,
  startListening,
  stopListening,
  interimTranscript,
}: ChatContainerProps) {
  return (
    <Box className={`chat-container ${isOpen ? 'open' : ''}`}>
      <ChatHeader
        toggleChat={toggleChat}
        voiceEnabled={voiceEnabled}
        isListening={isListening}
      />

      <ChatDisplay messages={messages} chatDisplayRef={chatDisplayRef} />

      <BottomSection
        inputText={inputText}
        setInputText={setInputText}
        sendMessage={sendMessage}
        handleKeyPress={handleKeyPress}
        fileInputRef={fileInputRef}
        imagePreview={imagePreview}
        setImageFile={setImageFile}
        setImagePreview={setImagePreview}
        handleImageChange={handleImageChange}
        voiceEnabled={voiceEnabled}
        isListening={isListening}
        toggleVoice={toggleVoice}
        startListening={startListening}
        stopListening={stopListening}
        interimTranscript={interimTranscript}
      />
    </Box>
  )
}

export default ChatContainer
