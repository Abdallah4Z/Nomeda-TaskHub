import {Box} from '@mui/material'
import {Message} from '../../types'
import {formatText} from '../../services/apiService'

interface MessageBoxProps {
  message: Message
}

function MessageBox({message}: MessageBoxProps) {
  const {text, isUser, imageUrl} = message

  return (
    <Box
      className={
        isUser ? 'message-box user-message' : 'message-box bot-message'
      }
      sx={{
        maxWidth: '100%',
        width: 'fit-content',
        wordBreak: 'break-word',
        whiteSpace: 'pre-wrap',
        overflowWrap: 'break-word',
      }}
    >
      <div
        style={{width: '100%'}}
        dangerouslySetInnerHTML={{__html: formatText(text)}}
      />
      {imageUrl && (
        <img
          className="uploaded-image"
          src={imageUrl}
          alt="Uploaded content"
          style={{maxWidth: '100%', height: 'auto'}}
        />
      )}
    </Box>
  )
}

export default MessageBox
