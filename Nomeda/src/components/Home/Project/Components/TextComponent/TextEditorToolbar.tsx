import React from 'react';
import { 
  IconButton, Tooltip, Divider, Stack, Chip, Box, Typography
} from '@mui/material';
import { 
  Undo, Redo, FormatBold, FormatItalic, FormatUnderlined,
  FormatColorText, FormatAlignLeft, FormatAlignCenter, 
  FormatAlignRight, FormatAlignJustify, FormatListBulleted,
  FormatListNumbered, Code, FormatQuote, FormatClear,
  InsertLink, EmojiEmotions, FormatSize, Search, History, 
  Settings, Save, ContentCopy, Delete, Fullscreen, FullscreenExit,
  Timer, Add
} from '@mui/icons-material';
import { EditorSettings, FormattingOptions } from './types';

interface TextEditorToolbarProps {
  formatting: FormattingOptions;
  settings: EditorSettings;
  isFullScreen: boolean;
  historyIndex: number;
  historyLength: number;
  isModified: boolean;
  wordCount: number;
  charCount: number;
  formattedReadingTime: string;
  onUndo: () => void;
  onRedo: () => void;
  onTextFormatting: (command: string) => void;
  onColorMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  onHeadingMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  onLinkDialogOpen: () => void;
  onEmojiMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  onSearchToggle: () => void;
  onHistoryOpen: () => void;
  onSettingsOpen: () => void;
  onSave: () => void;
  onCopy: () => void;
  onDelete?: () => void;
  onFullScreenToggle: () => void;
}

const TextEditorToolbar: React.FC<TextEditorToolbarProps> = ({
  formatting,
  settings,
  isFullScreen,
  historyIndex,
  historyLength,
  isModified,
  wordCount,
  charCount,
  formattedReadingTime,
  onUndo,
  onRedo,
  onTextFormatting,
  onColorMenuOpen,
  onHeadingMenuOpen,
  onLinkDialogOpen,
  onEmojiMenuOpen,
  onSearchToggle,
  onHistoryOpen,
  onSettingsOpen,
  onSave,
  onCopy,
  onDelete,
  onFullScreenToggle,
}) => {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Text Editor
        </Typography>
        <Stack direction="row" spacing={1}>
          <Tooltip title="Copy content">
            <IconButton size="small" onClick={onCopy}>
              <ContentCopy fontSize="small" />
            </IconButton>
          </Tooltip>
          {onDelete && (
            <Tooltip title="Delete editor">
              <IconButton size="small" onClick={onDelete} color="error">
                <Delete fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Save and exit edit mode">
            <IconButton 
              size="small" 
              onClick={onSave} 
            >
                <Add fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title={isFullScreen ? "Exit fullscreen" : "Fullscreen mode"}>
            <IconButton size="small" onClick={onFullScreenToggle}>
              {isFullScreen ? <FullscreenExit fontSize="small" /> : <Fullscreen fontSize="small" />}
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      <Stack 
        direction="row" 
        spacing={0.5} 
        sx={{ 
          mb: 2, 
          flexWrap: 'wrap',
          '& .MuiIconButton-root': {
            border: '1px solid',
            borderColor: settings.darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
          }
        }}
      >
        <Tooltip title="Undo">
          <IconButton 
            onClick={onUndo} 
            disabled={historyIndex <= 0}
            size="small"
          >
            <Undo fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Redo">
          <IconButton 
            onClick={onRedo} 
            disabled={historyIndex >= historyLength - 1}
            size="small"
          >
            <Redo fontSize="small" />
          </IconButton>
        </Tooltip>
        
        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
        
        <Tooltip title="Bold">
          <IconButton 
            onClick={() => onTextFormatting('bold')}
            color={formatting.bold ? 'primary' : 'default'}
            size="small"
          >
            <FormatBold fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Italic">
          <IconButton 
            onClick={() => onTextFormatting('italic')}
            color={formatting.italic ? 'primary' : 'default'}
            size="small"
          >
            <FormatItalic fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Underline">
          <IconButton 
            onClick={() => onTextFormatting('underline')}
            color={formatting.underline ? 'primary' : 'default'}
            size="small"
          >
            <FormatUnderlined fontSize="small" />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Text Color">
          <IconButton 
            onClick={onColorMenuOpen}
            size="small"
          >
            <FormatColorText fontSize="small" style={{ color: formatting.color }} />
          </IconButton>
        </Tooltip>
        
        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
        
        <Tooltip title="Heading Style">
          <IconButton 
            onClick={onHeadingMenuOpen}
            size="small"
          >
            <FormatSize fontSize="small" />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Align Left">
          <IconButton 
            onClick={() => onTextFormatting('align-left')}
            color={formatting.align === 'left' ? 'primary' : 'default'}
            size="small"
          >
            <FormatAlignLeft fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Align Center">
          <IconButton 
            onClick={() => onTextFormatting('align-center')}
            color={formatting.align === 'center' ? 'primary' : 'default'}
            size="small"
          >
            <FormatAlignCenter fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Align Right">
          <IconButton 
            onClick={() => onTextFormatting('align-right')}
            color={formatting.align === 'right' ? 'primary' : 'default'}
            size="small"
          >
            <FormatAlignRight fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Justify">
          <IconButton 
            onClick={() => onTextFormatting('align-justify')}
            color={formatting.align === 'justify' ? 'primary' : 'default'}
            size="small"
          >
            <FormatAlignJustify fontSize="small" />
          </IconButton>
        </Tooltip>
        
        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
        
        <Tooltip title="Bulleted List">
          <IconButton 
            onClick={() => onTextFormatting('unordered-list')}
            size="small"
          >
            <FormatListBulleted fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Numbered List">
          <IconButton 
            onClick={() => onTextFormatting('ordered-list')}
            size="small"
          >
            <FormatListNumbered fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Code Block">
          <IconButton 
            onClick={() => onTextFormatting('code')}
            size="small"
          >
            <Code fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Quote">
          <IconButton 
            onClick={() => onTextFormatting('quote')}
            size="small"
          >
            <FormatQuote fontSize="small" />
          </IconButton>
        </Tooltip>
        
        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
        
        <Tooltip title="Insert Link">
          <IconButton 
            onClick={onLinkDialogOpen}
            size="small"
          >
            <InsertLink fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Emojis">
          <IconButton 
            onClick={onEmojiMenuOpen}
            size="small"
          >
            <EmojiEmotions fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Remove Formatting">
          <IconButton 
            onClick={() => onTextFormatting('clear')}
            size="small"
          >
            <FormatClear fontSize="small" />
          </IconButton>
        </Tooltip>
        
        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
        
        <Tooltip title="Save">
          <IconButton 
            onClick={onSave}
            disabled={!isModified}
            size="small"
          >
            <Save fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Search & Replace">
          <IconButton 
            onClick={onSearchToggle}
            size="small"
          >
            <Search fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="History">
          <IconButton 
            onClick={onHistoryOpen}
            size="small"
          >
            <History fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Settings">
          <IconButton 
            onClick={onSettingsOpen}
            size="small"
          >
            <Settings fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 1,
        mb: 2
      }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Chip 
            label={`${wordCount} words`}
            size="small"
            variant="outlined"
          />
          <Chip 
            label={`${charCount} characters`}
            size="small"
            variant="outlined"
          />
          <Chip 
            label={`Reading time: ${formattedReadingTime}`}
            size="small"
            variant="outlined"
            icon={<Timer fontSize="small" />}
          />
        </Box>
        <Box>
          {isModified && settings.autosave && (
            <Typography variant="caption" color="text.secondary">
              Autosave in progress...
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default TextEditorToolbar;