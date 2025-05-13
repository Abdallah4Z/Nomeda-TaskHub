import React from 'react';
import { 
  Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Box, Typography, IconButton, Stack, FormControl,
  InputLabel, Select, SelectChangeEvent
} from '@mui/material';
import { EditorSettings } from './types';

interface TextEditorDialogsProps {
  colorMenuAnchor: HTMLElement | null;
  headingMenuAnchor: HTMLElement | null;
  emojiMenuAnchor: HTMLElement | null;
  linkDialogOpen: boolean;
  settingsOpen: boolean;
  linkUrl: string;
  linkText: string;
  settings: EditorSettings;
  onColorMenuClose: () => void;
  onHeadingMenuClose: () => void;
  onEmojiMenuClose: () => void;
  onLinkDialogClose: () => void;
  onSettingsClose: () => void;
  onColorChange: (color: string) => void;
  onHeadingChange: (heading: string) => void;
  onInsertEmoji: (emoji: string) => void;
  onLinkUrlChange: (value: string) => void;
  onLinkTextChange: (value: string) => void;
  onInsertLink: () => void;
  onAutosaveToggle: () => void;
  onAutosaveIntervalChange: (e: SelectChangeEvent<number>) => void;
  onFontSizeChange: (e: SelectChangeEvent<number>) => void;
  onDarkModeToggle: () => void;
}

const commonEmojis = ['😀', '👍', '❤️', '🎉', '🔥', '⭐', '🚀', '💡', '⚠️', '❓', '✅', '⏰'];

const TextEditorDialogs: React.FC<TextEditorDialogsProps> = ({
  colorMenuAnchor,
  headingMenuAnchor,
  emojiMenuAnchor,
  linkDialogOpen,
  settingsOpen,
  linkUrl,
  linkText,
  settings,
  onColorMenuClose,
  onHeadingMenuClose,
  onEmojiMenuClose,
  onLinkDialogClose,
  onSettingsClose,
  onColorChange,
  onHeadingChange,
  onInsertEmoji,
  onLinkUrlChange,
  onLinkTextChange,
  onInsertLink,
  onAutosaveToggle,
  onAutosaveIntervalChange,
  onFontSizeChange,
  onDarkModeToggle,
}) => {
  return (
    <>
      <Menu
        anchorEl={colorMenuAnchor}
        open={Boolean(colorMenuAnchor)}
        onClose={onColorMenuClose}
      >
        {['#000000', '#ff0000', '#0000ff', '#008000', '#ffa500', '#800080', '#ff00ff', '#00ffff'].map((color) => (
          <MenuItem key={color} onClick={() => onColorChange(color)}>
            <Box sx={{ width: 20, height: 20, backgroundColor: color, mr: 1, borderRadius: '50%' }} />
            {color === '#000000' ? 'Black' : 
             color === '#ff0000' ? 'Red' : 
             color === '#0000ff' ? 'Blue' : 
             color === '#008000' ? 'Green' : 
             color === '#ffa500' ? 'Orange' : 
             color === '#800080' ? 'Purple' : 
             color === '#ff00ff' ? 'Pink' : 
             color === '#00ffff' ? 'Cyan' : color}
          </MenuItem>
        ))}
      </Menu>

      <Menu
        anchorEl={headingMenuAnchor}
        open={Boolean(headingMenuAnchor)}
        onClose={onHeadingMenuClose}
      >
        <MenuItem onClick={() => onHeadingChange('h1')}>
          <Typography variant="h4">Heading 1</Typography>
        </MenuItem>
        <MenuItem onClick={() => onHeadingChange('h2')}>
          <Typography variant="h5">Heading 2</Typography>
        </MenuItem>
        <MenuItem onClick={() => onHeadingChange('h3')}>
          <Typography variant="h6">Heading 3</Typography>
        </MenuItem>
        <MenuItem onClick={() => onHeadingChange('h4')}>
          <Typography variant="subtitle1">Heading 4</Typography>
        </MenuItem>
        <MenuItem onClick={() => onHeadingChange('h5')}>
          <Typography variant="subtitle2">Heading 5</Typography>
        </MenuItem>
        <MenuItem onClick={() => onHeadingChange('h6')}>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Heading 6</Typography>
        </MenuItem>
        <MenuItem onClick={() => onHeadingChange('paragraph')}>
          <Typography variant="body1">Normal Text</Typography>
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={emojiMenuAnchor}
        open={Boolean(emojiMenuAnchor)}
        onClose={onEmojiMenuClose}
      >
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: 1,
          p: 1
        }}>
          {commonEmojis.map((emoji) => (
            <IconButton 
              key={emoji} 
              onClick={() => onInsertEmoji(emoji)}
              size="small"
            >
              {emoji}
            </IconButton>
          ))}
        </Box>
      </Menu>

      <Dialog open={linkDialogOpen} onClose={onLinkDialogClose}>
        <DialogTitle>Insert Link</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="URL"
            type="url"
            fullWidth
            variant="outlined"
            value={linkUrl}
            onChange={(e) => onLinkUrlChange(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Display Text (optional)"
            fullWidth
            variant="outlined"
            value={linkText}
            onChange={(e) => onLinkTextChange(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onLinkDialogClose}>Cancel</Button>
          <Button onClick={onInsertLink} variant="contained">Insert</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={settingsOpen} onClose={onSettingsClose}>
        <DialogTitle>Editor Settings</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ minWidth: 300, pt: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography>Autosave</Typography>
              <Button 
                variant={settings.autosave ? "contained" : "outlined"}
                onClick={onAutosaveToggle}
              >
                {settings.autosave ? "On" : "Off"}
              </Button>
            </Box>
            
            <FormControl fullWidth>
              <InputLabel>Autosave Interval</InputLabel>
              <Select
                value={settings.autosaveInterval}
                label="Autosave Interval"
                onChange={onAutosaveIntervalChange}
                disabled={!settings.autosave}
              >
                <MenuItem value={10}>10 seconds</MenuItem>
                <MenuItem value={30}>30 seconds</MenuItem>
                <MenuItem value={60}>1 minute</MenuItem>
                <MenuItem value={300}>5 minutes</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth>
              <InputLabel>Font Size</InputLabel>
              <Select
                value={settings.fontSize}
                label="Font Size"
                onChange={onFontSizeChange}
              >
                <MenuItem value={12}>12px</MenuItem>
                <MenuItem value={14}>14px</MenuItem>
                <MenuItem value={16}>16px</MenuItem>
                <MenuItem value={18}>18px</MenuItem>
                <MenuItem value={20}>20px</MenuItem>
                <MenuItem value={24}>24px</MenuItem>
              </Select>
            </FormControl>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography>Dark Mode</Typography>
              <Button 
                variant={settings.darkMode ? "contained" : "outlined"}
                onClick={onDarkModeToggle}
              >
                {settings.darkMode ? "On" : "Off"}
              </Button>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onSettingsClose} variant="contained">Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TextEditorDialogs;