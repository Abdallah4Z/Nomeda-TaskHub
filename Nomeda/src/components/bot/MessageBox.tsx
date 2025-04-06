import {Box} from '@mui/material'
import {Message} from '../../types'
import {formatText} from '../chatbot/services/apiService'
import '../../../style/chatbot.css'

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
    >
      <div dangerouslySetInnerHTML={{__html: formatText(text)}} />
      {imageUrl && (
        <img className="uploaded-image" src={imageUrl} alt="Uploaded content" />
      )}
    </Box>
  )
}

export default MessageBox
