import React from 'react';
import { Drawer, Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { HistoryItem } from './types';

interface TextEditorHistoryProps {
  history: HistoryItem[];
  historyIndex: number;
  historyDrawerOpen: boolean;
  onHistoryClose: () => void;
  onRestoreVersion: (index: number) => void;
}

const TextEditorHistory: React.FC<TextEditorHistoryProps> = ({
  history,
  historyIndex,
  historyDrawerOpen,
  onHistoryClose,
  onRestoreVersion,
}) => {
  return (
    <Drawer
      anchor="right"
      open={historyDrawerOpen}
      onClose={onHistoryClose}
    >
      <Box sx={{ width: 300, p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Version History</Typography>
        <List>
          {history.map((item, index) => (
            <ListItem 
              key={index}
              secondaryAction={
                <Button 
                  size="small" 
                  variant={index === historyIndex ? "contained" : "outlined"}
                  onClick={() => onRestoreVersion(index)}
                >
                  {index === historyIndex ? "Current" : "Restore"}
                </Button>
              }
            >
              <ListItemText 
                primary={`Version ${index + 1}`} 
                secondary={new Date(item.timestamp).toLocaleString()}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default TextEditorHistory;