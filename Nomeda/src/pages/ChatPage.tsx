import React, {useState} from 'react'
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Grid,
  IconButton,
  TextField,
  Button,
  InputAdornment,
  styled,
  CircularProgress,
  Alert,
  AlertTitle,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import SearchIcon from '@mui/icons-material/Search'
import ForumIcon from '@mui/icons-material/Forum'
import {format} from 'date-fns'
import {useChat} from '../hooks/useChat'
import {Chat as ChatType} from '../services/chatService'
import MainLayout from '../components/Layout/MainLayout'

// Styled components
const MessageBubble = styled(Paper)(({theme}) => ({
  padding: theme.spacing(2),
  maxWidth: '70%',
  borderRadius: theme.shape.borderRadius * 2,
}))

const ChatMessageArea = styled(Box)(({theme}) => ({
  flexGrow: 1,
  overflowY: 'auto',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[100],
}))

const UnreadBadge = styled(Box)(({theme}) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: '50%',
  minWidth: '20px',
  height: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.75rem',
}))

// We're using the types from chatService.ts now

const ChatPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const {
    chats,
    loading,
    error,
    selectedChat,
    currentMessages,
    projectName,
    message,
    typingUsers,
    setMessage,
    setSelectedChat,
    handleSendMessage,
    handleKeyPress,
    handleInputChange,
  } = useChat()

  const formatTimestamp = (timestamp: string) => {
    if (!timestamp) return ''
    try {
      return format(new Date(timestamp), 'h:mm a')
    } catch (err) {
      console.error('Invalid date format:', timestamp)
      return timestamp
    }
  }

  const filteredChats = chats.filter(chat =>
    chat.projectName.toLowerCase().includes(searchQuery.toLowerCase()),
  )
  return (
    <MainLayout>
      <Box sx={{height: 'calc(100vh - 64px)', display: 'flex', width: '80vw'}}>
        {/* Chat List */}
        <Paper sx={{width: 320, borderRadius: 0}}>
          <Box sx={{p: 2}}>
            <TextField
              fullWidth
              placeholder="Search project chats..."
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
          </Box>

          {loading && !chats.length ? (
            <Box sx={{display: 'flex', justifyContent: 'center', p: 4}}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box sx={{p: 2}}>
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {error}
              </Alert>
            </Box>
          ) : (
            <List sx={{overflowY: 'auto', height: 'calc(100vh - 130px)'}}>
              {filteredChats.length > 0 ? (
                filteredChats.map(chat => (
                  <React.Fragment key={chat.id}>
                    <ListItem
                      onClick={() => setSelectedChat(chat)}
                      selected={selectedChat?.id === chat.id}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'action.hover',
                        },
                        '&.Mui-selected': {
                          backgroundColor: 'primary.light',
                        },
                        cursor: 'pointer',
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar src={chat.avatar} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Typography variant="subtitle2">
                              {chat.projectName}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {formatTimestamp(chat.timestamp)}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                maxWidth: '180px',
                              }}
                            >
                              {chat.sender
                                ? `${chat.sender.name}: ${chat.lastMessage}`
                                : chat.lastMessage || 'No messages yet'}
                            </Typography>
                            {chat.unread > 0 && (
                              <UnreadBadge>{chat.unread}</UnreadBadge>
                            )}
                          </Box>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))
              ) : (
                <Box sx={{p: 3, textAlign: 'center'}}>
                  <ForumIcon
                    sx={{fontSize: 40, color: 'text.secondary', mb: 1}}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {searchQuery
                      ? 'No matching projects found'
                      : 'No project chats available'}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{mt: 1, display: 'block'}}
                  >
                    {searchQuery
                      ? 'Try a different search term'
                      : 'Create or join a project to start chatting'}
                  </Typography>
                </Box>
              )}
            </List>
          )}
        </Paper>

        {/* Chat Area */}
        <Box sx={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  borderRadius: 0,
                  borderBottom: 1,
                  borderColor: 'divider',
                }}
              >
                <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                  <Avatar
                    src={
                      selectedChat.avatar ||
                      `https://robohash.org/${projectName}`
                    }
                  />
                  <Box>
                    <Typography variant="h6">
                      {projectName || selectedChat.projectName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Project Chat
                    </Typography>
                  </Box>
                </Box>
              </Paper>
              {/* Messages Area */}
              <ChatMessageArea>
                {loading && !currentMessages.length ? (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                    }}
                  >
                    <CircularProgress />
                  </Box>
                ) : error ? (
                  <Box sx={{p: 2}}>
                    <Alert severity="error">
                      <AlertTitle>Error</AlertTitle>
                      {error}
                    </Alert>
                  </Box>
                ) : currentMessages.length === 0 ? (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                    }}
                  >
                    <ForumIcon
                      sx={{fontSize: 60, color: 'text.secondary', mb: 2}}
                    />
                    <Typography variant="h6" color="text.secondary">
                      No messages yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Be the first to send a message in this project chat!
                    </Typography>
                  </Box>
                ) : (
                  <>
                    {currentMessages.map(msg => {
                      // Get user data from backend or localStorage for "currentUser" id
                      const currentUserId = JSON.parse(
                        localStorage.getItem('user') || '{}',
                      )?.id
                      const isCurrentUser = msg.senderId === currentUserId

                      return (
                        <Box
                          key={msg.id}
                          sx={{
                            display: 'flex',
                            justifyContent: isCurrentUser
                              ? 'flex-end'
                              : 'flex-start',
                            mb: 2,
                          }}
                        >
                          {!isCurrentUser && (
                            <Avatar
                              src={
                                msg.senderAvatar ||
                                `https://robohash.org/${msg.senderId}`
                              }
                              sx={{mr: 1, width: 32, height: 32, mt: 1}}
                            />
                          )}
                          <Box sx={{maxWidth: '70%'}}>
                            {!isCurrentUser && (
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ml: 1}}
                              >
                                {msg.senderName}
                              </Typography>
                            )}
                            <MessageBubble
                              sx={{
                                bgcolor: isCurrentUser
                                  ? 'primary.main'
                                  : 'background.paper',
                                color: isCurrentUser
                                  ? 'primary.contrastText'
                                  : 'text.primary',
                                boxShadow: 1,
                              }}
                            >
                              <Typography variant="body1">
                                {msg.text}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  opacity: 0.7,
                                  display: 'block',
                                  mt: 0.5,
                                  textAlign: isCurrentUser ? 'right' : 'left',
                                }}
                              >
                                {formatTimestamp(msg.timestamp)}
                              </Typography>
                              {msg.attachment && (
                                <Box sx={{mt: 1}}>
                                  <Button
                                    size="small"
                                    variant="outlined"
                                    startIcon={<AttachFileIcon />}
                                    href={msg.attachment}
                                    target="_blank"
                                  >
                                    Attachment
                                  </Button>
                                </Box>
                              )}
                            </MessageBubble>
                          </Box>
                          {isCurrentUser && (
                            <Avatar
                              src={
                                msg.senderAvatar ||
                                `https://robohash.org/${msg.senderId}`
                              }
                              sx={{ml: 1, width: 32, height: 32, mt: 1}}
                            />
                          )}
                        </Box>
                      )
                    })}

                    {/* Typing indicators */}
                    {Object.keys(typingUsers).length > 0 && (
                      <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            bgcolor: 'background.paper',
                            borderRadius: 2,
                            p: 1,
                            boxShadow: 1,
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              '&::after': {
                                content: '"..."',
                                animation: 'typing 1.5s infinite',
                                '@keyframes typing': {
                                  '0%': {content: '"."'},
                                  '33%': {content: '".."'},
                                  '66%': {content: '"..."'},
                                },
                              },
                            }}
                          >
                            <Typography variant="body2" color="text.secondary">
                              {Object.keys(typingUsers).length === 1
                                ? `${Object.values(typingUsers)[0]} is typing`
                                : `${
                                    Object.keys(typingUsers).length
                                  } people are typing`}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </>
                )}
              </ChatMessageArea>
              {/* Message Input */}
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  borderRadius: 0,
                  borderTop: 1,
                  borderColor: 'divider',
                }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <IconButton color="primary" disabled>
                      <AttachFileIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs>
                    <TextField
                      fullWidth
                      multiline
                      maxRows={4}
                      placeholder="Type your message..."
                      value={message}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      variant="outlined"
                      disabled={loading}
                      sx={{
                        width: '45vw',
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: 'primary.main',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      endIcon={
                        loading ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <SendIcon />
                        )
                      }
                      onClick={handleSendMessage}
                      disabled={!message.trim() || loading}
                    >
                      Send
                    </Button>
                  </Grid>
                </Grid>
              </Paper>{' '}
            </>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                bgcolor: 'grey.100',
              }}
            >
              <ForumIcon sx={{fontSize: 80, color: 'text.secondary', mb: 2}} />
              <Typography variant="h6" color="text.secondary">
                Select a project chat to start messaging
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{mt: 1}}>
                Chat with your team members in project-specific conversations
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </MainLayout>
  )
}

export default ChatPage
