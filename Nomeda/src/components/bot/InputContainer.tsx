import { RefObject, ChangeEvent, KeyboardEvent as ReactKeyboardEvent } from 'react';
import { Box, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';

interface InputContainerProps {
  inputText: string;
  setInputText: (text: string) => void;
  sendMessage: () => void;
  handleKeyPress: (event: ReactKeyboardEvent<HTMLInputElement>) => void;
  fileInputRef: RefObject<HTMLInputElement>;
  handleImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function InputContainer({ 
  inputText, 
  setInputText, 
  sendMessage, 
  handleKeyPress, 
  fileInputRef,
  handleImageChange
}: InputContainerProps) {
  return (
    <Box className="input-container">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type your message..."
        style={{
          flex: 1,
          border: 'none',
          padding: '3px',
          fontSize: '13px',
          outline: 'none',
          backgroundColor: 'transparent',
          color: 'black'
        }}
      />
      
      <Button 
        sx={{ color: '#333', padding: 1, minWidth: 'auto' }}
        onClick={() => fileInputRef.current?.click()}
      >
        <AttachFileIcon />
      </Button>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
      
      <Button
        className="send-button"
        onClick={sendMessage}
      >
        <SendIcon />
      </Button>
    </Box>
  );
}

export default InputContainer;
