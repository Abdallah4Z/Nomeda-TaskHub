import {RefObject} from 'react'
import {Box} from '@mui/material'
import MessageBox from './MessageBox'
import {Message} from '../../types'

interface ChatDisplayProps {
  messages: Message[]
  chatDisplayRef: RefObject<HTMLDivElement> | null
}

function ChatDisplay({messages, chatDisplayRef}: ChatDisplayProps) {
  return (
    <Box className="chat-display" ref={chatDisplayRef}>
      {messages.map((msg, index) => (
        <MessageBox key={index} message={msg} />
      ))}
    </Box>
  )
}

export default ChatDisplay
