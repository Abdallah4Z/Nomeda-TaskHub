import {RefObject, ChangeEvent, KeyboardEvent} from 'react'
import {Box, Button, Typography, Fade, IconButton, styled} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ImageIcon from '@mui/icons-material/Image'
import InputContainer from './InputContainer'

const PreviewContainer = styled(Box)(({}) => ({
  padding: '8px 12px',
  borderRadius: '8px',
  margin: '4px 12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px',
  transition: 'all 0.2s ease',
  border: '1px solid var(--chat-border)',

  '&:hover': {
    borderColor: 'var(--chat-primary)',
  },
}))

const ImagePreviewThumb = styled('img')({
  width: '32px',
  height: '32px',
  borderRadius: '4px',
  objectFit: 'cover',
})

interface BottomSectionProps {
  inputText: string
  setInputText: (text: string) => void
  sendMessage: () => void
  handleKeyPress: (event: KeyboardEvent<HTMLInputElement>) => void
  fileInputRef: RefObject<HTMLInputElement> | null
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

function BottomSection({
  inputText,
  setInputText,
  sendMessage,
  handleKeyPress,
  fileInputRef,
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
}: BottomSectionProps) {
  return (
    <Box className="bottom-section">
      <InputContainer
        inputText={inputText}
        setInputText={setInputText}
        sendMessage={sendMessage}
        handleKeyPress={handleKeyPress}
        fileInputRef={fileInputRef}
        handleImageChange={handleImageChange}
        voiceEnabled={voiceEnabled}
        isListening={isListening}
        toggleVoice={toggleVoice}
        startListening={startListening}
        stopListening={stopListening}
        interimTranscript={interimTranscript}
      />{' '}
      {imagePreview && (
        <Fade in={true} timeout={200}>
          <PreviewContainer>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 1.5}}>
              <ImagePreviewThumb src={imagePreview} alt="Preview" />
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block',
                    fontWeight: 500,
                  }}
                >
                  Image ready to send
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    opacity: 0.7,
                    fontSize: '0.7rem',
                  }}
                >
                  Click to preview
                </Typography>
              </Box>
            </Box>
            <IconButton
              size="small"
              onClick={() => {
                setImageFile(null)
                setImagePreview(null)
              }}
              sx={{
                padding: '4px',
                opacity: 0.7,
                '&:hover': {
                  opacity: 1,
                },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </PreviewContainer>
        </Fade>
      )}
    </Box>
  )
}

export default BottomSection
