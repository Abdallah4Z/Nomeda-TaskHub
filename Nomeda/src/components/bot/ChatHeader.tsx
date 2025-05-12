import {
  Box,
  Button,
  Typography,
  Avatar,
  IconButton,
  useTheme,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import MicIcon from '@mui/icons-material/Mic'
import {keyframes} from '@emotion/react'
import {styled} from '@mui/material/styles'

interface ChatHeaderProps {
  toggleChat: () => void
  voiceEnabled?: boolean
  isListening?: boolean
}

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`

const StyledHeader = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 20px',
  borderRadius: '20px 20px 0 0',
  backgroundColor: 'var(--chat-primary)',
  color: 'var(--chat-message-user-text)',
  boxShadow: 'var(--chat-shadow)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'var(--chat-hover)',
  },
}))

const HeaderContent = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
})

const OnlineIndicator = styled('div')({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: '#4CAF50',
  marginLeft: '4px',
  animation: `${pulseAnimation} 2s infinite`,
})

const StatusText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.9,
})

const VoiceIndicator = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '0.75rem',
  opacity: 0.9,
  '& .voice-icon': {
    fontSize: '1rem',
  },
  '&.listening': {
    color: '#4CAF50',
    animation: `${pulseAnimation} 1.5s infinite`,
  },
})

function ChatHeader({
  toggleChat,
  voiceEnabled = false,
  isListening = false,
}: ChatHeaderProps) {
  const theme = useTheme()

  return (
    <StyledHeader>
      <HeaderContent>
        <Avatar
          sx={{
            bgcolor: 'transparent',
            width: 32,
            height: 32,
          }}
        >
          <SmartToyIcon sx={{color: 'white'}} />
        </Avatar>
        <Box>
          <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontSize: '1.1rem',
                fontWeight: 600,
                letterSpacing: '0.5px',
              }}
            >
              Nemo
            </Typography>
            <OnlineIndicator />
          </Box>
          <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
            <StatusText variant="caption">Online and ready to help</StatusText>
            {voiceEnabled && (
              <VoiceIndicator className={isListening ? 'listening' : ''}>
                <MicIcon className="voice-icon" />
                {isListening ? 'Listening...' : 'Voice ready'}
              </VoiceIndicator>
            )}
          </Box>
        </Box>
      </HeaderContent>
      <IconButton
        onClick={toggleChat}
        sx={{
          color: 'white',
          '&:hover': {
            transform: 'scale(1.1)',
            bgcolor: 'rgba(255, 255, 255, 0.1)',
          },
          transition: 'all 0.2s ease',
        }}
      >
        <CloseIcon />
      </IconButton>
    </StyledHeader>
  )
}

export default ChatHeader
