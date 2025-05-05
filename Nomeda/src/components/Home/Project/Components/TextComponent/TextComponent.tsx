import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Box, Button, Stack, Typography, Paper, Snackbar, Alert, TextField 
} from '@mui/material';
import { Download, Timer } from '@mui/icons-material';
import debounce from 'lodash/debounce';
import TextEditorToolbar from './TextEditorToolbar';
import TextEditorDialogs from './TextEditorDialogs';
import TextEditorHistory from './TextEditorHistory';
import DropdownMenu from './DropdownMenu';
import { FormattingOptions, EditorSettings, HistoryItem, TextComponentProps } from './types';

const TextComponent: React.FC<TextComponentProps> = ({ id, content, onChange, onDelete, dropdownMenuItems = [] }) => {
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
  const [isSavedMode, setIsSavedMode] = useState(false);
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

  useEffect(() => {
    localStorage.setItem(`textComponentSettings-${id}`, JSON.stringify(settings));
  }, [settings, id]);

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

  useEffect(() => {
    const words = textContent.trim() ? textContent.trim().split(/\s+/).length : 0;
    const chars = textContent.length;
    const timeInMinutes = words / 200;
    
    setWordCount(words);
    setCharCount(chars);
    setReadingTime(timeInMinutes);
  }, [textContent]);

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
    setIsSavedMode(false);
  };

  const addToHistory = (newContent: string) => {
    const cursorPosition = textFieldRef.current?.selectionStart || undefined;
    
    if (historyIndex < history.length - 1) {
      setHistory(prevHistory => [
        ...prevHistory.slice(0, historyIndex + 1),
        { content: newContent, timestamp: Date.now(), cursor: cursorPosition }
      ]);
    } else {
      setHistory(prevHistory => [
        ...prevHistory,
        { content: newContent, timestamp: Date.now(), cursor: cursorPosition }
      ]);
    }
    setHistoryIndex(prev => prev + 1);
  };

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
    setIsSavedMode(true);
    setSnackbarMessage('Content saved successfully');
    setShowSnackbar(true);
  };

  const handleExport = (format: 'txt' | 'html' | 'md') => {
    let content = textContent;
    let mimeType = 'text/plain';
    let extension = 'txt';
    
    if (format === 'html') {
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

  const handleAutosaveIntervalChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSettings({
      ...settings,
      autosaveInterval: Number(e.target.value)
    });
  };

  const handleFontSizeChange = (e: React.ChangeEvent<{ value: unknown }>) => {
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
    setIsSavedMode(false);
    
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
    <>
      {isSavedMode ? (
        <Box sx={{ mt: 2 }}>
          <div
            style={{
              '& pre': {
                backgroundColor: settings.darkMode ? '#1a1a1a' : '#f0f0f0',
                padding: '8px',
                borderRadius: '4px',
                overflowX: 'auto'
              },
              '& blockquote': {
                borderLeft: '4px solid',
                borderColor: settings.darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                paddingLeft: '16px',
                margin: '8px 0',
                fontStyle: 'italic'
              }
            }}
            dangerouslySetInnerHTML={{ __html: textContent }}
          />
          <DropdownMenu
            menuItems={[
              { label: 'Edit', action: () => setIsSavedMode(false) },
              ...dropdownMenuItems
            ]}
          />
        </Box>
      ) : (
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
            <TextEditorToolbar
              formatting={formatting}
              settings={settings}
              isFullScreen={isFullScreen}
              historyIndex={historyIndex}
              historyLength={history.length}
              isModified={isModified}
              wordCount={wordCount}
              charCount={charCount}
              formattedReadingTime={formattedReadingTime()}
              onUndo={handleUndo}
              onRedo={handleRedo}
              onTextFormatting={handleTextFormatting}
              onColorMenuOpen={(e) => setColorMenuAnchor(e.currentTarget)}
              onHeadingMenuOpen={(e) => setHeadingMenuAnchor(e.currentTarget)}
              onLinkDialogOpen={() => setLinkDialogOpen(true)}
              onEmojiMenuOpen={(e) => setEmojiMenuAnchor(e.currentTarget)}
              onSearchToggle={() => setSearchOpen(!searchOpen)}
              onHistoryOpen={() => setHistoryDrawerOpen(true)}
              onSettingsOpen={() => setSettingsOpen(true)}
              onSave={saveContent}
              edited= {saveContent}
              onCopy={handleCopy}
              onDelete={onDelete ? handleDelete : undefined}
              onFullScreenToggle={() => setIsFullScreen(!isFullScreen)}
            />

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

            <TextEditorDialogs
              colorMenuAnchor={colorMenuAnchor}
              headingMenuAnchor={headingMenuAnchor}
              emojiMenuAnchor={emojiMenuAnchor}
              linkDialogOpen={linkDialogOpen}
              settingsOpen={settingsOpen}
              linkUrl={linkUrl}
              linkText={linkText}
              settings={settings}
              onColorMenuClose={() => setColorMenuAnchor(null)}
              onHeadingMenuClose={() => setHeadingMenuAnchor(null)}
              onEmojiMenuClose={() => setEmojiMenuAnchor(null)}
              onLinkDialogClose={() => setLinkDialogOpen(false)}
              onSettingsClose={() => setSettingsOpen(false)}
              onColorChange={handleColorChange}
              onHeadingChange={handleHeadingChange}
              onInsertEmoji={handleInsertEmoji}
              onLinkUrlChange={setLinkUrl}
              onLinkTextChange={setLinkText}
              onInsertLink={handleInsertLink}
              onAutosaveToggle={handleAutosaveToggle}
              onAutosaveIntervalChange={handleAutosaveIntervalChange}
              onFontSizeChange={handleFontSizeChange}
              onDarkModeToggle={handleDarkModeToggle}
            />

            <TextEditorHistory
              history={history}
              historyIndex={historyIndex}
              historyDrawerOpen={historyDrawerOpen}
              onHistoryClose={() => setHistoryDrawerOpen(false)}
              onRestoreVersion={handleRestoreVersion}
            />

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
      )}
    </>
  );
};

export default TextComponent;