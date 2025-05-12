import React, {useState, useEffect} from 'react'
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
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import SearchIcon from '@mui/icons-material/Search'
import {Message} from '../types'
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

interface Chat {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unread: number
  type: 'project' | 'direct'
}

interface ChatMessage {
  id: string
  senderId: string
  text: string
  timestamp: string
  attachment?: string
}

const ChatPage: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [message, setMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])

  // Mock data for chats
  const mockChats: Chat[] = [
    {
      id: '1',
      name: 'Project Alpha',
      avatar: 'https://robohash.org/project-alpha',
      lastMessage: 'Latest updates on the project',
      timestamp: '10:30 AM',
      unread: 2,
      type: 'project',
    },
    {
      id: '2',
      name: 'John Doe',
      avatar: 'https://robohash.org/john-doe',
      lastMessage: 'When is the next meeting?',
      timestamp: '09:15 AM',
      unread: 0,
      type: 'direct',
    },
  ]

  const [chats] = useState<Chat[]>(mockChats)

  const handleSendMessage = () => {
    if (!message.trim() || !selectedChat) return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'currentUser',
      text: message,
      timestamp: new Date().toLocaleTimeString(),
    }

    setMessages(prev => [...prev, newMessage])
    setMessage('')
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSendMessage()
    }
  }

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <MainLayout>
      <Box sx={{height: 'calc(100vh - 64px)', display: 'flex', width:'80vw'}}>
        {/* Chat List */}
        <Paper sx={{width: 320, borderRadius: 0}}>
          <Box sx={{p: 2}}>
            <TextField
              fullWidth
              placeholder="Search chats..."
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
          <List sx={{overflowY: 'auto', height: 'calc(100vh - 130px)'}}>
            {filteredChats.map(chat => (
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
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={chat.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box
                        sx={{display: 'flex', justifyContent: 'space-between'}}
                      >
                        <Typography variant="subtitle2">{chat.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {chat.timestamp}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box
                        sx={{display: 'flex', justifyContent: 'space-between'}}
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
                          {chat.lastMessage}
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
            ))}
          </List>
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
                  <Avatar src={selectedChat.avatar} />
                  <Box>
                    <Typography variant="h6">{selectedChat.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {selectedChat.type === 'project'
                        ? 'Project Chat'
                        : 'Direct Message'}
                    </Typography>
                  </Box>
                </Box>
              </Paper>

              {/* Messages Area */}
              <ChatMessageArea>
                {messages.map(msg => (
                  <Box
                    key={msg.id}
                    sx={{
                      display: 'flex',
                      justifyContent:
                        msg.senderId === 'currentUser'
                          ? 'flex-end'
                          : 'flex-start',
                      mb: 2,
                    }}
                  >
                    <MessageBubble
                      sx={{
                        bgcolor:
                          msg.senderId === 'currentUser'
                            ? 'primary.main'
                            : 'background.paper',
                        color:
                          msg.senderId === 'currentUser'
                            ? 'primary.contrastText'
                            : 'text.primary',
                      }}
                    >
                      <Typography variant="body1">{msg.text}</Typography>
                      <Typography
                        variant="caption"
                        sx={{opacity: 0.7, display: 'block', mt: 0.5}}
                      >
                        {msg.timestamp}
                      </Typography>
                    </MessageBubble>
                  </Box>
                ))}
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
                    <IconButton color="primary">
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
                      onChange={e => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      variant="outlined"
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
                      endIcon={<SendIcon />}
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                    >
                      Send
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </>
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                bgcolor: 'grey.100',
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Select a chat to start messaging
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </MainLayout>
  )
}

export default ChatPage
