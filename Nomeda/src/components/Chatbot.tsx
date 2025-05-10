import React, {useState} from 'react'
import {
  Box,
  Paper,
  IconButton,
  Typography,
  TextField,
  Button,
  useTheme,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'
import SmartToyIcon from '@mui/icons-material/SmartToy'

interface ChatMessage {
  text: string
  isBot: boolean
  timestamp: Date
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      text: 'Hello! How can I help you today?',
      isBot: true,
      timestamp: new Date(),
    },
  ])

  const theme = useTheme()

  const handleSendMessage = () => {
    if (!message.trim()) return

    // Add user message
    const userMessage: ChatMessage = {
      text: message,
      isBot: false,
      timestamp: new Date(),
    }

    setChatHistory(prev => [...prev, userMessage])
    setMessage('')

    // Simulate bot response
    setTimeout(() => {
      const botMessage: ChatMessage = {
        text: 'Thank you for your message. This is a demo response.',
        isBot: true,
        timestamp: new Date(),
      }
      setChatHistory(prev => [...prev, botMessage])
    }, 1000)
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <IconButton
        onClick={toggleChat}
        sx={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          backgroundColor: theme.palette.primary.main,
          color: 'white',
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
          width: '60px',
          height: '60px',
          zIndex: 1000,
        }}
      >
        <SmartToyIcon fontSize="large" />
      </IconButton>

      {/* Chat Window */}
      <Paper
        sx={{
          position: 'fixed',
          right: isOpen ? '2rem' : '-100%',
          bottom: '2rem',
          width: '400px',
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          transition: 'right 0.3s ease-in-out',
          boxShadow: 3,
          overflow: 'hidden',
          zIndex: 1000,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 2,
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6">Chatbot</Typography>
          <IconButton onClick={toggleChat} sx={{color: 'white'}}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Chat Messages */}
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            backgroundColor: theme.palette.background.default,
          }}
        >
          {chatHistory.map((chat, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: chat.isBot ? 'flex-start' : 'flex-end',
              }}
            >
              <Paper
                sx={{
                  p: 1.5,
                  maxWidth: '80%',
                  backgroundColor: chat.isBot
                    ? theme.palette.grey[100]
                    : theme.palette.primary.main,
                  color: chat.isBot ? 'inherit' : 'white',
                  borderRadius: 2,
                }}
              >
                <Typography variant="body1">{chat.text}</Typography>
                <Typography
                  variant="caption"
                  sx={{opacity: 0.7, display: 'block', mt: 0.5}}
                >
                  {chat.timestamp.toLocaleTimeString()}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Box>

        {/* Input Area */}
        <Box
          sx={{
            p: 2,
            borderTop: 1,
            borderColor: 'divider',
            display: 'flex',
            gap: 1,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                handleSendMessage()
              }
            }}
            size="small"
          />
          <Button
            variant="contained"
            onClick={handleSendMessage}
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </Box>
      </Paper>
    </>
  )
}

export default Chatbot
