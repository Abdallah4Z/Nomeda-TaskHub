import { RefObject, ChangeEvent, KeyboardEvent } from 'react';
import { Box, Button, Typography } from '@mui/material';
import InputContainer from './InputContainer';
import '../styles/chatbot.css';

interface BottomSectionProps {
  inputText: string;
  setInputText: (text: string) => void;
  sendMessage: () => void;
  handleKeyPress: (event: KeyboardEvent<HTMLInputElement>) => void;
  fileInputRef: RefObject<HTMLInputElement> | null;
  imagePreview: string | null;
  setImageFile: (file: File | null) => void;
  setImagePreview: (preview: string | null) => void;
  handleImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
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
  handleImageChange
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
      />

      {imagePreview && (
        <Box sx={{ padding: 1, textAlign: 'center', color:'black'}}>
          <Typography variant="caption">Image ready to send</Typography>
          <Button 
            size="small" 
            onClick={() => {
              setImageFile(null);
              setImagePreview(null);
            }}
          >
            Remove
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default BottomSection;