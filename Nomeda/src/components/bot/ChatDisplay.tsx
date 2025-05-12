import {RefObject, useEffect, useState} from 'react'
import {
  Box,
  CircularProgress,
  Fade,
  Typography,
  styled,
  useTheme,
} from '@mui/material'
import MessageBox from './MessageBox'
import {Message} from '../../types'

interface ChatDisplayProps {
  messages: Message[]
  chatDisplayRef: RefObject<HTMLDivElement> | null
}

const StyledChatDisplay = styled(Box)(({}) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  transition: 'all 0.3s ease',
  position: 'relative',

  '& .message-group': {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    width: '100%',
  },
  '& .message-wrapper': {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-start',
    maxWidth: '90%',
    wordWrap: 'break-word',
    wordBreak: 'break-word',
    margin: '0 auto',

    '&.user-message-wrapper': {
      justifyContent: 'flex-end',
      marginLeft: 'auto',
      marginRight: '0',
    },

    '&:not(.user-message-wrapper)': {
      marginRight: 'auto',
      marginLeft: '0',
    },
  },

  '& .message-timestamp': {
    fontSize: '0.75rem',
    color: 'var(--chat-text)',
    opacity: 0.7,
    textAlign: 'center',
    margin: '16px 0 8px',
    position: 'relative',

    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      width: '68px',
      height: '1px',
      background: 'var(--chat-border)',
    },
    '&::before': {
      left: '24px',
    },
    '&::after': {
      right: '24px',
    },
  },

  '& .typing-indicator': {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    borderRadius: '18px',
    backgroundColor: 'var(--chat-message-bot-bg)',
    alignSelf: 'flex-start',
    maxWidth: '100px',
    animation: 'fadeIn 0.3s ease forwards',
  },
}))

const TypingDot = styled('span')({
  width: '8px',
  height: '8px',
  backgroundColor: 'var(--chat-primary)',
  borderRadius: '50%',
  opacity: 0.6,
  animation: 'typingAnimation 1.4s infinite',
  '&:nth-of-type(2)': {
    animationDelay: '0.2s',
  },
  '&:nth-of-type(3)': {
    animationDelay: '0.4s',
  },
  '@keyframes typingAnimation': {
    '0%, 100%': {
      transform: 'translateY(0)',
    },
    '50%': {
      transform: 'translateY(-4px)',
      opacity: 0.8,
    },
  },
})

function ChatDisplay({messages, chatDisplayRef}: ChatDisplayProps) {
  const [isTyping, setIsTyping] = useState(false)
  const theme = useTheme()

  // Simulate bot typing when new message arrives
  useEffect(() => {
    if (messages.length > 0 && !messages[messages.length - 1].isUser) {
      setIsTyping(false)
    } else if (messages.length > 0 && messages[messages.length - 1].isUser) {
      setIsTyping(true)
      const timer = setTimeout(() => setIsTyping(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [messages])

  // Group messages by date
  const groupMessagesByDate = () => {
    const groups: {date: string; messages: Message[]}[] = []
    let currentDate = ''
    let currentGroup: Message[] = []

    messages.forEach(msg => {
      const messageDate = new Date(
        msg.timestamp || Date.now(),
      ).toLocaleDateString()

      if (messageDate !== currentDate) {
        if (currentGroup.length > 0) {
          groups.push({date: currentDate, messages: currentGroup})
        }
        currentDate = messageDate
        currentGroup = [msg]
      } else {
        currentGroup.push(msg)
      }
    })

    if (currentGroup.length > 0) {
      groups.push({date: currentDate, messages: currentGroup})
    }

    return groups
  }

  const messageGroups = groupMessagesByDate()

  return (
    <StyledChatDisplay className="chat-display" ref={chatDisplayRef}>
      {messageGroups.map((group, groupIndex) => (
        <Box key={group.date} className="message-group">
          <Typography className="message-timestamp">
            {new Date(group.date).toLocaleDateString(undefined, {
              weekday: 'long',
              month: 'short',
              day: 'numeric',
            })}
          </Typography>
          {group.messages.map((msg, index) => (
            <Fade
              key={index}
              in={true}
              timeout={300}
              style={{
                transitionDelay: `${index * 50}ms`,
                transformOrigin: msg.isUser ? 'right' : 'left',
              }}
            >
              <div
                className={`message-wrapper ${
                  msg.isUser ? 'user-message-wrapper' : ''
                }`}
              >
                <MessageBox message={msg} />
              </div>
            </Fade>
          ))}
        </Box>
      ))}

      {isTyping && (
        <Fade in={true} timeout={200}>
          <Box className="typing-indicator">
            <TypingDot />
            <TypingDot />
            <TypingDot />
          </Box>
        </Fade>
      )}
    </StyledChatDisplay>
  )
}

export default ChatDisplay
