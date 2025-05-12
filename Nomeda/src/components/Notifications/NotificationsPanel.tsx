import React from 'react'
import {Box, IconButton, Typography, styled, Divider} from '@mui/material'
import {
  Close as CloseIcon,
  Fullscreen as FullscreenIcon,
} from '@mui/icons-material'

interface NotificationsPanelProps {
  isOpen: boolean
  isFullscreen: boolean
  onClose: () => void
  onToggleFullscreen: () => void
}

const NotificationsPanelContainer = styled(Box)<{isFullscreen: boolean}>(
  ({theme, isFullscreen}) => ({
    position: 'fixed',
    right: 0,
    top: isFullscreen ? '44px' : '44px',
    height: isFullscreen ? '100vh' : 'calc(100vh - 44px)',
    width: isFullscreen ? '90vw' : '20vw',
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.background.paper
        : '#ffffff',
    boxShadow:
      theme.palette.mode === 'dark'
        ? '-2px 0 4px rgba(0,0,0,0.2)'
        : '-2px 0 4px rgba(0,0,0,0.05)',
    transition: 'all 0.3s ease',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
  }),
)

const NotificationsHeader = styled(Box)(({theme}) => ({
  padding: '12px 16px',
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}))

const NotificationsContent = styled(Box)({
  padding: '16px',
  overflowY: 'auto',
  flex: 1,
})

const NotificationItem = styled(Box)(({theme}) => ({
  padding: '12px',
  marginBottom: '8px',
  borderRadius: '8px',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(0, 0, 0, 0.02)',
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.08)'
        : 'rgba(0, 0, 0, 0.04)',
  },
}))

// Sample notifications data - replace with actual data
const sampleNotifications = [
  {
    id: 1,
    title: 'New Task Assigned',
    message: 'You have been assigned a new task: "Update documentation"',
    timestamp: '2 hours ago',
    type: 'task',
  },
  {
    id: 2,
    title: 'Meeting Reminder',
    message: 'Team meeting starts in 30 minutes',
    timestamp: '30 minutes ago',
    type: 'reminder',
  },
  {
    id: 3,
    title: 'Project Update',
    message: 'Project "Website Redesign" has been updated',
    timestamp: 'Just now',
    type: 'update',
  },
]

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({
  isOpen,
  isFullscreen,
  onClose,
  onToggleFullscreen,
}) => {
  if (!isOpen) return null

  return (
    <NotificationsPanelContainer isFullscreen={isFullscreen}>
      <NotificationsHeader>
        <Typography variant="h6">Notifications</Typography>
        <Box>
          <IconButton onClick={onToggleFullscreen} size="small">
            <FullscreenIcon />
          </IconButton>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </NotificationsHeader>
      <NotificationsContent>
        {sampleNotifications.map(notification => (
          <NotificationItem key={notification.id}>
            <Typography variant="subtitle2" sx={{fontWeight: 600}}>
              {notification.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{mt: 0.5}}>
              {notification.message}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{mt: 1, display: 'block'}}
            >
              {notification.timestamp}
            </Typography>
          </NotificationItem>
        ))}
      </NotificationsContent>
    </NotificationsPanelContainer>
  )
}

export default NotificationsPanel
