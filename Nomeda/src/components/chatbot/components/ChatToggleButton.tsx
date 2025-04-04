import Button from '@mui/material/Button';
import ChatIcon from '@mui/icons-material/TextsmsRounded';
import '../styles/chatbot.css';

interface ChatToggleButtonProps {
  toggleChat: () => void;
}

function ChatToggleButton({ toggleChat }: ChatToggleButtonProps) {
  return (
    <Button 
      className="chat-toggle-button"
      onClick={toggleChat} 
      aria-label="Open chat"
    >
      <ChatIcon fontSize="large" />
    </Button>
  );
}

export default ChatToggleButton;