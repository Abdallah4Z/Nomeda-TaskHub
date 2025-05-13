// src/components/TextComponent.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  TextField, Box, Button, Stack, Typography, IconButton, 
  Menu, MenuItem, Dialog, DialogTitle, DialogContent, 
  DialogActions, Tooltip, Snackbar, Alert, Paper, Divider,
  Chip, Select, FormControl, InputLabel, SelectChangeEvent,
  Drawer, List, ListItem, ListItemText, ListItemIcon
} from '@mui/material';
import { 
  Undo, Redo, FormatBold, FormatItalic, FormatUnderlined,
  FormatColorText, FormatAlignLeft, FormatAlignCenter, 
  FormatAlignRight, FormatAlignJustify, FormatListBulleted,
  FormatListNumbered, Code, Save, InsertLink, Image, 
  FormatQuote, FormatClear, History, CloudUpload, Download,
  Fullscreen, FullscreenExit, Search, Settings, Timer,
  EmojiEmotions, FormatSize, Help, Delete, ContentCopy
} from '@mui/icons-material';
import debounce from 'lodash/debounce';

// Added interface for text formatting and editor settings
interface FormattingOptions {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  color: string;
  align: 'left' | 'center' | 'right' | 'justify';
  heading: string;
}

interface EditorSettings {
  autosave: boolean;
  autosaveInterval: number;
  darkMode: boolean;
  fontSize: number;
}

interface HistoryItem {
  content: string;
  timestamp: number;
  cursor?: number;
}

interface TextComponentProps {
  id: number;
  content: string;
  onChange: (id: number, content: string) => void;
  onDelete?: (id: number) => void;
}

const TextComponent: React.FC<TextComponentProps> = ({ id, content, onChange, onDelete }) => {
  const [textContent, setTextContent] = useState(content);
  const [history, setHistory] = useState<HistoryItem[]>([{ content, timestamp: Date.now() }]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isModified, setIsModified] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [replaceText, setReplaceText] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [colorMenuAnchor, setColorMenuAnchor] = useState<null | HTMLElement>(null);
  const [headingMenuAnchor, setHeadingMenuAnchor] = useState<null | HTMLElement>(null);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [historyDrawerOpen, setHistoryDrawerOpen] = useState(false);
  const [emojiMenuAnchor, setEmojiMenuAnchor] = useState<null | HTMLElement>(null);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [settings, setSettings] = useState<EditorSettings>({
    autosave: true,
    autosaveInterval: 30,
    darkMode: false,
    fontSize: 16,
  });
  const [formatting, setFormatting] = useState<FormattingOptions>({
    bold: false,
    italic: false,
    underline: false,
    color: '#000000',
    align: 'left',
    heading: 'paragraph'
  });

  const textFieldRef = useRef<HTMLInputElement>(null);
  const autosaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Common emojis for quick access
  const commonEmojis = ['😀', '👍', '❤️', '🎉', '🔥', '⭐', '🚀', '💡', '⚠️', '❓', '✅', '⏰'];

  // Load content and settings from localStorage on component mount
  useEffect(() => {
    const savedContent = localStorage.getItem(`textComponent-${id}`);
    if (savedContent) {
      setTextContent(savedContent);
      setHistory([{ content: savedContent, timestamp: Date.now() }]);
    }

    const savedSettings = localStorage.getItem(`textComponentSettings-${id}`);
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, [id]);

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem(`textComponentSettings-${id}`, JSON.stringify(settings));
  }, [settings, id]);

  // Set up autosave timer
  useEffect(() => {
    if (settings.autosave && isModified) {
      if (autosaveTimerRef.current) {
        clearTimeout(autosaveTimerRef.current);
      }
      
      autosaveTimerRef.current = setTimeout(() => {
        saveContent();
        setSnackbarMessage('Content autosaved');
        setShowSnackbar(true);
      }, settings.autosaveInterval * 1000);
    }

    return () => {
      if (autosaveTimerRef.current) {
        clearTimeout(autosaveTimerRef.current);
      }
    };
  }, [textContent, settings.autosave, settings.autosaveInterval, isModified]);

  // Calculate word count, character count, and reading time
  useEffect(() => {
    const words = textContent.trim() ? textContent.trim().split(/\s+/).length : 0;
    const chars = textContent.length;
    // Average reading speed: 200 words per minute
    const timeInMinutes = words / 200;
    
    setWordCount(words);
    setCharCount(chars);
    setReadingTime(timeInMinutes);
  }, [textContent]);

  // Debounced onChange handler to improve performance
  const debouncedOnChange = useCallback(
    debounce((id: number, content: string) => {
      onChange(id, content);
      setIsModified(true);
    }, 300),
    [onChange]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newContent = event.target.value;
    setTextContent(newContent);
    debouncedOnChange(id, newContent);
  };

  const addToHistory = (newContent: string) => {
    // Get cursor position if text field is focused
    const cursorPosition = textFieldRef.current?.selectionStart || undefined;
    
    if (historyIndex < history.length - 1) {
      // If we're in the middle of the history, truncate it
      setHistory(prevHistory => [
        ...prevHistory.slice(0, historyIndex + 1),
        { content: newContent, timestamp: Date.now(), cursor: cursorPosition }
      ]);
    } else {
      // Otherwise just append to the history
      setHistory(prevHistory => [
        ...prevHistory,
        { content: newContent, timestamp: Date.now(), cursor: cursorPosition }
      ]);
    }
    setHistoryIndex(prev => prev + 1);
  };

  // Add to history with debounce to avoid too many history entries
  const debouncedAddToHistory = useCallback(
    debounce((content: string) => {
      addToHistory(content);
    }, 1000),
    []
  );

  useEffect(() => {
    if (textContent !== history[historyIndex]?.content) {
      debouncedAddToHistory(textContent);
    }
  }, [textContent]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setTextContent(history[newIndex].content);
      onChange(id, history[newIndex].content);
      
      // Restore cursor position if available
      setTimeout(() => {
        if (history[newIndex].cursor !== undefined && textFieldRef.current) {
          textFieldRef.current.focus();
          textFieldRef.current.setSelectionRange(history[newIndex].cursor!, history[newIndex].cursor!);
        }
      }, 0);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setTextContent(history[newIndex].content);
      onChange(id, history[newIndex].content);
      
      // Restore cursor position if available
      setTimeout(() => {
        if (history[newIndex].cursor !== undefined && textFieldRef.current) {
          textFieldRef.current.focus();
          textFieldRef.current.setSelectionRange(history[newIndex].cursor!, history[newIndex].cursor!);
        }
      }, 0);
    }
  };

  const getSelectionInfo = () => {
    if (!textFieldRef.current) return { start: 0, end: 0, text: '' };
    
    const start = textFieldRef.current.selectionStart;
    const end = textFieldRef.current.selectionEnd;
    const selectedText = textContent.substring(start, end);
    
    return { start, end, text: selectedText };
  };

  const insertAtCursor = (before: string, after: string = '') => {
    if (!textFieldRef.current) return;
    
    const { start, end, text } = getSelectionInfo();
    const newContent = 
      textContent.substring(0, start) + 
      before + text + after + 
      textContent.substring(end);
    
    setTextContent(newContent);
    onChange(id, newContent);
    
    // Focus and set cursor position after insertion
    setTimeout(() => {
      if (textFieldRef.current) {
        textFieldRef.current.focus();
        const newPosition = start + before.length + text.length;
        textFieldRef.current.setSelectionRange(newPosition, newPosition);
      }
    }, 0);
    
    addToHistory(newContent);
  };

  const handleTextFormatting = (command: string) => {
    if (!textFieldRef.current) return;
    
    const { start, end, text } = getSelectionInfo();
    if (start === end && command !== 'color') {
      // No selection, just place the cursor in between tags
      insertAtCursor(`<${command}>`, `</${command}>`);
      return;
    }
    
    let formattedText;
    let updatedFormatting = { ...formatting };
    
    switch (command) {
      case 'bold':
        formattedText = `<b>${text}</b>`;
        updatedFormatting.bold = !formatting.bold;
        break;
      case 'italic':
        formattedText = `<i>${text}</i>`;
        updatedFormatting.italic = !formatting.italic;
        break;
      case 'underline':
        formattedText = `<u>${text}</u>`;
        updatedFormatting.underline = !formatting.underline;
        break;
      case 'align-left':
        formattedText = `<div style="text-align: left;">${text}</div>`;
        updatedFormatting.align = 'left';
        break;
      case 'align-center':
        formattedText = `<div style="text-align: center;">${text}</div>`;
        updatedFormatting.align = 'center';
        break;
      case 'align-right':
        formattedText = `<div style="text-align: right;">${text}</div>`;
        updatedFormatting.align = 'right';
        break;
      case 'align-justify':
        formattedText = `<div style="text-align: justify;">${text}</div>`;
        updatedFormatting.align = 'justify';
        break;
      case 'unordered-list':
        formattedText = `<ul>\n${text.split('\n').map(item => `  <li>${item}</li>`).join('\n')}\n</ul>`;
        break;
      case 'ordered-list':
        formattedText = `<ol>\n${text.split('\n').map(item => `  <li>${item}</li>`).join('\n')}\n</ol>`;
        break;
      case 'code':
        formattedText = `<pre><code>${text}</code></pre>`;
        break;
      case 'quote':
        formattedText = `<blockquote>${text}</blockquote>`;
        break;
      case 'clear':
        // Remove all HTML tags
        formattedText = text.replace(/<\/?[^>]+(>|$)/g, "");
        break;
      default:
        formattedText = text;
    }
    
    setFormatting(updatedFormatting);

    const newContent = 
      textContent.substring(0, start) + 
      formattedText + 
      textContent.substring(end);
    
    setTextContent(newContent);
    onChange(id, newContent);
    addToHistory(newContent);
  };

  const handleColorChange = (color: string) => {
    setColorMenuAnchor(null);
    setFormatting({ ...formatting, color });
    
    const { start, end, text } = getSelectionInfo();
    if (start === end) {
      // No selection, set up for the next typing
      insertAtCursor(`<span style="color: ${color}">`, `</span>`);
      return;
    }
    
    const formattedText = `<span style="color: ${color}">${text}</span>`;
    const newContent = 
      textContent.substring(0, start) + 
      formattedText + 
      textContent.substring(end);
    
    setTextContent(newContent);
    onChange(id, newContent);
    addToHistory(newContent);
  };

  const handleHeadingChange = (heading: string) => {
    setHeadingMenuAnchor(null);
    setFormatting({ ...formatting, heading });
    
    const { start, end, text } = getSelectionInfo();
    
    let formattedText;
    if (heading === 'paragraph') {
      formattedText = `<p>${text}</p>`;
    } else {
      formattedText = `<${heading}>${text}</${heading}>`;
    }
    
    const newContent = 
      textContent.substring(0, start) + 
      formattedText + 
      textContent.substring(end);
    
    setTextContent(newContent);
    onChange(id, newContent);
    addToHistory(newContent);
  };

  const handleInsertLink = () => {
    if (!linkUrl.trim()) {
      setSnackbarMessage('Please enter a valid URL');
      setShowSnackbar(true);
      return;
    }
    
    const linkHtml = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${linkText || linkUrl}</a>`;
    insertAtCursor(linkHtml);
    setLinkDialogOpen(false);
    setLinkUrl('');
    setLinkText('');
  };

  const handleInsertEmoji = (emoji: string) => {
    setEmojiMenuAnchor(null);
    insertAtCursor(emoji);
  };

  const saveContent = () => {
    localStorage.setItem(`textComponent-${id}`, textContent);
    setIsModified(false);
    setSnackbarMessage('Content saved successfully');
    setShowSnackbar(true);
  };

  const handleExport = (format: 'txt' | 'html' | 'md') => {
    let content = textContent;
    let mimeType = 'text/plain';
    let extension = 'txt';
    
    if (format === 'html') {
      // Add basic HTML structure
      content = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Exported Document</title>
</head>
<body>
${textContent}
</body>
</html>`;
      mimeType = 'text/html';
      extension = 'html';
    } else if (format === 'md') {
      // Convert HTML to Markdown (basic conversion)
      content = textContent
        .replace(/<b>(.*?)<\/b>/g, '**$1**')
        .replace(/<i>(.*?)<\/i>/g, '*$1*')
        .replace(/<u>(.*?)<\/u>/g, '__$1__')
        .replace(/<h1>(.*?)<\/h1>/g, '# $1\n')
        .replace(/<h2>(.*?)<\/h2>/g, '## $1\n')
        .replace(/<h3>(.*?)<\/h3>/g, '### $1\n')
        .replace(/<blockquote>(.*?)<\/blockquote>/g, '> $1\n')
        .replace(/<pre><code>(.*?)<\/code><\/pre>/g, '```\n$1\n```')
        .replace(/<a href="(.*?)".*?>(.*?)<\/a>/g, '[$2]($1)');
      mimeType = 'text/markdown';
      extension = 'md';
    }
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `document-${id}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSearch = () => {
    if (!searchText) return;
    
    
    const index = textContent.indexOf(searchText, textFieldRef.current?.selectionEnd || 0);
    if (index !== -1) {
      if (textFieldRef.current) {
        textFieldRef.current.focus();
        textFieldRef.current.setSelectionRange(index, index + searchText.length);
      }
    } else {
      // Try searching from beginning if not found from current position
      const fromStartIndex = textContent.indexOf(searchText);
      if (fromStartIndex !== -1) {
        if (textFieldRef.current) {
          textFieldRef.current.focus();
          textFieldRef.current.setSelectionRange(fromStartIndex, fromStartIndex + searchText.length);
        }
      } else {
        setSnackbarMessage('Text not found');
        setShowSnackbar(true);
      }
    }
  };

  const handleReplace = () => {
    if (!searchText) return;
    
    const { start, end, text } = getSelectionInfo();
    if (text === searchText) {
      // Replace the current selection
      const newContent = 
        textContent.substring(0, start) + 
        replaceText + 
        textContent.substring(end);
      
      setTextContent(newContent);
      onChange(id, newContent);
      
      setTimeout(() => {
        if (textFieldRef.current) {
          textFieldRef.current.focus();
          textFieldRef.current.setSelectionRange(start + replaceText.length, start + replaceText.length);
        }
      }, 0);
      
      addToHistory(newContent);
    } else {
      // First find the text, then replace
      handleSearch();
    }
  };

  const handleReplaceAll = () => {
    if (!searchText) return;
    
    const newContent = textContent.replaceAll(searchText, replaceText);
    setTextContent(newContent);
    onChange(id, newContent);
    addToHistory(newContent);
    
    const occurrences = (textContent.match(new RegExp(searchText, 'g')) || []).length;
    setSnackbarMessage(`Replaced ${occurrences} occurrences`);
    setShowSnackbar(true);
  };

  const handleAutosaveToggle = () => {
    setSettings({
      ...settings,
      autosave: !settings.autosave
    });
  };

  const handleAutosaveIntervalChange = (e: SelectChangeEvent<number>) => {
    setSettings({
      ...settings,
      autosaveInterval: Number(e.target.value)
    });
  };

  const handleFontSizeChange = (e: SelectChangeEvent<number>) => {
    setSettings({
      ...settings,
      fontSize: Number(e.target.value)
    });
  };

  const handleDarkModeToggle = () => {
    setSettings({
      ...settings,
      darkMode: !settings.darkMode
    });
  };

  const handleRestoreVersion = (index: number) => {
    const historyItem = history[index];
    setTextContent(historyItem.content);
    onChange(id, historyItem.content);
    setHistoryIndex(index);
    setHistoryDrawerOpen(false);
    
    setSnackbarMessage(`Restored version from ${new Date(historyItem.timestamp).toLocaleTimeString()}`);
    setShowSnackbar(true);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(textContent)
      .then(() => {
        setSnackbarMessage('Content copied to clipboard');
        setShowSnackbar(true);
      })
      .catch(() => {
        setSnackbarMessage('Failed to copy to clipboard');
        setShowSnackbar(true);
      });
  };

  const formattedReadingTime = () => {
    if (readingTime < 1) {
      return `${Math.round(readingTime * 60)} sec`;
    }
    const minutes = Math.floor(readingTime);
    const seconds = Math.round((readingTime - minutes) * 60);
    return `${minutes} min${seconds > 0 ? ` ${seconds} sec` : ''}`;
  };

  return (
    <Box sx={{ 
      mt: 2,
      transition: 'all 0.3s ease',
      ...(isFullScreen && {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1300,
        backgroundColor: settings.darkMode ? '#121212' : 'white',
        paddingTop: 2,
        paddingX: 4,
        overflow: 'auto'
      }),
      ...(settings.darkMode && {
        backgroundColor: '#121212',
        color: 'white'
      })
    }}>
      <Paper elevation={3} sx={{ 
        p: 3, 
        borderRadius: 2,
        ...(settings.darkMode && {
          backgroundColor: '#1e1e1e',
          color: 'white'
        })
      }}>
        {/* Header with title and action buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Text Editor
          </Typography>
          <Stack direction="row" spacing={1}>
            <Tooltip title="Copy content">
              <IconButton size="small" onClick={handleCopy}>
                <ContentCopy fontSize="small" />
              </IconButton>
            </Tooltip>
            {onDelete && (
              <Tooltip title="Delete editor">
                <IconButton size="small" onClick={handleDelete} color="error">
                  <Delete fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title={isFullScreen ? "Exit fullscreen" : "Fullscreen mode"}>
              <IconButton size="small" onClick={() => setIsFullScreen(!isFullScreen)}>
                {isFullScreen ? <FullscreenExit fontSize="small" /> : <Fullscreen fontSize="small" />}
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>

        {/* Main Toolbar */}
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
              onClick={handleUndo} 
              disabled={historyIndex <= 0}
              size="small"
            >
              <Undo fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Redo">
            <IconButton 
              onClick={handleRedo} 
              disabled={historyIndex >= history.length - 1}
              size="small"
            >
              <Redo fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
          
          <Tooltip title="Bold">
            <IconButton 
              onClick={() => handleTextFormatting('bold')}
              color={formatting.bold ? 'primary' : 'default'}
              size="small"
            >
              <FormatBold fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Italic">
            <IconButton 
              onClick={() => handleTextFormatting('italic')}
              color={formatting.italic ? 'primary' : 'default'}
              size="small"
            >
              <FormatItalic fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Underline">
            <IconButton 
              onClick={() => handleTextFormatting('underline')}
              color={formatting.underline ? 'primary' : 'default'}
              size="small"
            >
              <FormatUnderlined fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Text Color">
            <IconButton 
              onClick={(e) => setColorMenuAnchor(e.currentTarget)}
              size="small"
            >
              <FormatColorText fontSize="small" style={{ color: formatting.color }} />
            </IconButton>
          </Tooltip>
          
          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
          
          <Tooltip title="Heading Style">
            <IconButton 
              onClick={(e) => setHeadingMenuAnchor(e.currentTarget)}
              size="small"
            >
              <FormatSize fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Align Left">
            <IconButton 
              onClick={() => handleTextFormatting('align-left')}
              color={formatting.align === 'left' ? 'primary' : 'default'}
              size="small"
            >
              <FormatAlignLeft fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Align Center">
            <IconButton 
              onClick={() => handleTextFormatting('align-center')}
              color={formatting.align === 'center' ? 'primary' : 'default'}
              size="small"
            >
              <FormatAlignCenter fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Align Right">
            <IconButton 
              onClick={() => handleTextFormatting('align-right')}
              color={formatting.align === 'right' ? 'primary' : 'default'}
              size="small"
            >
              <FormatAlignRight fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Justify">
            <IconButton 
              onClick={() => handleTextFormatting('align-justify')}
              color={formatting.align === 'justify' ? 'primary' : 'default'}
              size="small"
            >
              <FormatAlignJustify fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
          
          <Tooltip title="Bulleted List">
            <IconButton 
              onClick={() => handleTextFormatting('unordered-list')}
              size="small"
            >
              <FormatListBulleted fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Numbered List">
            <IconButton 
              onClick={() => handleTextFormatting('ordered-list')}
              size="small"
            >
              <FormatListNumbered fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Code Block">
            <IconButton 
              onClick={() => handleTextFormatting('code')}
              size="small"
            >
              <Code fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Quote">
            <IconButton 
              onClick={() => handleTextFormatting('quote')}
              size="small"
            >
              <FormatQuote fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
          
          <Tooltip title="Insert Link">
            <IconButton 
              onClick={() => setLinkDialogOpen(true)}
              size="small"
            >
              <InsertLink fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Emojis">
            <IconButton 
              onClick={(e) => setEmojiMenuAnchor(e.currentTarget)}
              size="small"
            >
              <EmojiEmotions fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Remove Formatting">
            <IconButton 
              onClick={() => handleTextFormatting('clear')}
              size="small"
            >
              <FormatClear fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
          
          <Tooltip title="Save">
            <IconButton 
              onClick={saveContent}
              disabled={!isModified}
              size="small"
            >
              <Save fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Search & Replace">
            <IconButton 
              onClick={() => setSearchOpen(!searchOpen)}
              size="small"
            >
              <Search fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="History">
            <IconButton 
              onClick={() => setHistoryDrawerOpen(true)}
              size="small"
            >
              <History fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings">
            <IconButton 
              onClick={() => setSettingsOpen(true)}
              size="small"
            >
              <Settings fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>

        {/* Search & Replace Panel */}
        {searchOpen && (
          <Box sx={{ 
            mb: 2, 
            p: 2, 
            borderRadius: 1, 
            backgroundColor: settings.darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
          }}>
            <Stack spacing={1}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  size="small"
                  placeholder="Search text..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  variant="outlined"
                  fullWidth
                />
                <Button 
                  variant="contained" 
                  onClick={handleSearch}
                  disabled={!searchText}
                  size="small"
                >
                  Find
                </Button>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  size="small"
                  placeholder="Replace with..."
                  value={replaceText}
                  onChange={(e) => setReplaceText(e.target.value)}
                  variant="outlined"
                  fullWidth
                />
                <Button 
                  variant="outlined" 
                  onClick={handleReplace}
                  disabled={!searchText}
                  size="small"
                >
                  Replace
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={handleReplaceAll}
                  disabled={!searchText}
                  size="small"
                >
                  Replace All
                </Button>
              </Box>
            </Stack>
          </Box>
        )}

        {/* Export Options */}
        <Box sx={{ 
          mb: 2,
          display: 'flex',
          gap: 1,
          flexWrap: 'wrap'
        }}>
          <Button 
            variant="outlined" 
            size="small"
            startIcon={<Download />}
            onClick={() => handleExport('txt')}
          >
            Export as TXT
          </Button>
          <Button 
            variant="outlined" 
            size="small"
            startIcon={<Download />}
            onClick={() => handleExport('html')}
          >
            Export as HTML
          </Button>
          <Button 
            variant="outlined" 
            size="small"
            startIcon={<Download />}
            onClick={() => handleExport('md')}
          >
            Export as Markdown
          </Button>
        </Box>
        

        {/* Text Area */}
        <TextField
          inputRef={textFieldRef}
          fullWidth
          multiline
          minRows={10}
          variant="outlined"
          placeholder="Add text here..."
          value={textContent}
          onChange={handleChange}
          sx={{ 
            mb: 2,
            '& .MuiInputBase-root': {
              fontFamily: 'monospace',
              fontSize: `${settings.fontSize}px`,
              ...(settings.darkMode && {
                backgroundColor: '#2d2d2d',
                color: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255,255,255,0.2)'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255,255,255,0.3)'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main'
                }
              })
            }
          }}
        />

        {/* Status Bar */}
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
              label={`Reading time: ${formattedReadingTime()}`}
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

        {/* Preview Section */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>Preview</Typography>
        <Box
          sx={{
            backgroundColor: settings.darkMode ? '#2d2d2d' : '#f5f5f5',
            padding: 2,
            minHeight: 100,
            borderRadius: 1,
            border: '1px solid',
            borderColor: settings.darkMode ? 'rgba(255,255,255,0.1)' : '#ddd',
            mt: 1,
            overflow: 'auto',
            '& pre': {
              backgroundColor: settings.darkMode ? '#1a1a1a' : '#f0f0f0',
              padding: 1,
              borderRadius: 1,
              overflowX: 'auto'
            },
            '& blockquote': {
              borderLeft: '4px solid',
              borderColor: settings.darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
              paddingLeft: 2,
              margin: '8px 0',
              fontStyle: 'italic'
            }
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: textContent }} />
        </Box>

        {/* Color Menu */}
        <Menu
          anchorEl={colorMenuAnchor}
          open={Boolean(colorMenuAnchor)}
          onClose={() => setColorMenuAnchor(null)}
        >
          {['#000000', '#ff0000', '#0000ff', '#008000', '#ffa500', '#800080', '#ff00ff', '#00ffff'].map((color) => (
            <MenuItem key={color} onClick={() => handleColorChange(color)}>
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

        {/* Heading Menu */}
        <Menu
          anchorEl={headingMenuAnchor}
          open={Boolean(headingMenuAnchor)}
          onClose={() => setHeadingMenuAnchor(null)}
        >
          <MenuItem onClick={() => handleHeadingChange('h1')}>
            <Typography variant="h4">Heading 1</Typography>
          </MenuItem>
          <MenuItem onClick={() => handleHeadingChange('h2')}>
            <Typography variant="h5">Heading 2</Typography>
          </MenuItem>
          <MenuItem onClick={() => handleHeadingChange('h3')}>
            <Typography variant="h6">Heading 3</Typography>
          </MenuItem>
          <MenuItem onClick={() => handleHeadingChange('h4')}>
            <Typography variant="subtitle1">Heading 4</Typography>
          </MenuItem>
          <MenuItem onClick={() => handleHeadingChange('h5')}>
            <Typography variant="subtitle2">Heading 5</Typography>
          </MenuItem>
          <MenuItem onClick={() => handleHeadingChange('h6')}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Heading 6</Typography>
          </MenuItem>
          <MenuItem onClick={() => handleHeadingChange('paragraph')}>
            <Typography variant="body1">Normal Text</Typography>
          </MenuItem>
        </Menu>

        {/* Emoji Menu */}
        <Menu
          anchorEl={emojiMenuAnchor}
          open={Boolean(emojiMenuAnchor)}
          onClose={() => setEmojiMenuAnchor(null)}
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
                onClick={() => handleInsertEmoji(emoji)}
                size="small"
              >
                {emoji}
              </IconButton>
            ))}
          </Box>
        </Menu>

        {/* Insert Link Dialog */}
        <Dialog open={linkDialogOpen} onClose={() => setLinkDialogOpen(false)}>
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
              onChange={(e) => setLinkUrl(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Display Text (optional)"
              fullWidth
              variant="outlined"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setLinkDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleInsertLink} variant="contained">Insert</Button>
          </DialogActions>
        </Dialog>

        {/* Settings Dialog */}
        <Dialog open={settingsOpen} onClose={() => setSettingsOpen(false)}>
          <DialogTitle>Editor Settings</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ minWidth: 300, pt: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>Autosave</Typography>
                <Button 
                  variant={settings.autosave ? "contained" : "outlined"}
                  onClick={handleAutosaveToggle}
                >
                  {settings.autosave ? "On" : "Off"}
                </Button>
              </Box>
              
              <FormControl fullWidth>
                <InputLabel>Autosave Interval</InputLabel>
                <Select
                  value={settings.autosaveInterval}
                  label="Autosave Interval"
                  onChange={handleAutosaveIntervalChange}
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
                  onChange={handleFontSizeChange}
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
                  onClick={handleDarkModeToggle}
                >
                  {settings.darkMode ? "On" : "Off"}
                </Button>
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSettingsOpen(false)} variant="contained">Close</Button>
          </DialogActions>
        </Dialog>

        {/* History Drawer */}
        <Drawer
          anchor="right"
          open={historyDrawerOpen}
          onClose={() => setHistoryDrawerOpen(false)}
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
                      onClick={() => handleRestoreVersion(index)}
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

        {/* Notification Snackbar */}
        <Snackbar
          open={showSnackbar}
          autoHideDuration={3000}
          onClose={() => setShowSnackbar(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={() => setShowSnackbar(false)} 
            severity="success" 
            variant="filled"
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default TextComponent;