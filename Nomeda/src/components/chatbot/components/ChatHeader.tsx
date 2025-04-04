import { Box, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import '../styles/chatbot.css';

interface ChatHeaderProps {
  toggleChat: () => void;
}

function ChatHeader({ toggleChat }: ChatHeaderProps) {
  return (
    <Box className="chat-header">
      <Typography variant="h6" component="h2">
        Pizza Chat
      </Typography>
      <Button 
        sx={{ color: 'white', p: 0, minWidth: 'auto' }} 
        onClick={toggleChat}
      >
        <CloseIcon />
      </Button>
    </Box>
  );
}

export default ChatHeader;