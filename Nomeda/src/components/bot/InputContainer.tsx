import {ChangeEvent, KeyboardEvent, RefObject} from 'react'
import {Box, IconButton, TextField, Tooltip} from '@mui/material'
import {styled} from '@mui/material/styles'
import SendIcon from '@mui/icons-material/Send'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import MicIcon from '@mui/icons-material/Mic'
import MicOffIcon from '@mui/icons-material/MicOff'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'

const VoiceButton = styled(IconButton)(({theme}) => ({
  color: theme.palette.text.primary,
  transition: 'all 0.2s ease',
  '&.listening': {
    color: theme.palette.primary.main,
    animation: 'pulse 1.5s infinite',
  },
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.1)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
}))

interface InputContainerProps {
  inputText: string
  setInputText: (text: string) => void
  sendMessage: () => void
  handleKeyPress: (event: KeyboardEvent<HTMLInputElement>) => void
  fileInputRef: RefObject<HTMLInputElement> | null
  handleImageChange: (event: ChangeEvent<HTMLInputElement>) => void
  voiceEnabled?: boolean
  isListening?: boolean
  toggleVoice?: () => void
  startListening?: () => void
  stopListening?: () => void
  interimTranscript?: string
}

function InputContainer({
  inputText,
  setInputText,
  sendMessage,
  handleKeyPress,
  fileInputRef,
  handleImageChange,
  voiceEnabled = false,
  isListening = false,
  toggleVoice,
  startListening,
  stopListening,
  interimTranscript = '',
}: InputContainerProps) {
  return (
    <Box className="input-container">
      <input
        type="file"
        accept="image/*"
        style={{display: 'none'}}
        ref={fileInputRef}
        onChange={handleImageChange}
      />
      <IconButton
        onClick={() => fileInputRef?.current?.click()}
        className="attach-button"
        size="small"
      >
        <AttachFileIcon />
      </IconButton>

      <TextField
        fullWidth
        placeholder="Type your message..."
        value={inputText}
        onChange={e => setInputText(e.target.value)}
        onKeyPress={handleKeyPress}
        variant="standard"
        sx={{
          '& .MuiInput-underline:before': {borderBottom: 'none'},
          '& .MuiInput-underline:hover:before': {borderBottom: 'none'},
          '& .MuiInput-underline:after': {borderBottom: 'none'},
        }}
      />

      {interimTranscript && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '100%',
            left: 0,
            right: 0,
            padding: '8px',
            backgroundColor: 'background.paper',
            borderRadius: '4px',
            boxShadow: 1,
            opacity: 0.8,
          }}
        >
          {interimTranscript}
        </Box>
      )}

      <Box sx={{display: 'flex', gap: 1}}>
        <Tooltip
          title={voiceEnabled ? 'Disable voice output' : 'Enable voice output'}
        >
          <IconButton onClick={toggleVoice} size="small">
            {voiceEnabled ? <VolumeUpIcon /> : <VolumeOffIcon />}
          </IconButton>
        </Tooltip>

        <Tooltip title={isListening ? 'Stop listening' : 'Start voice input'}>
          <VoiceButton
            onClick={isListening ? stopListening : startListening}
            className={isListening ? 'listening' : ''}
            size="small"
          >
            {isListening ? <MicIcon /> : <MicOffIcon />}
          </VoiceButton>
        </Tooltip>

        <IconButton
          onClick={sendMessage}
          disabled={!inputText.trim()}
          className="send-button"
          size="small"
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default InputContainer
