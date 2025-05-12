import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {
  Search as SearchIcon,
  List as LogsIcon,
  Notifications as NotificationsIcon,
  Menu as MenuIcon,
} from '@mui/icons-material'
import {
  Avatar,
  Box,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material'
import SearchBar from './SearchBar'
import ActionButton from './ActionButton'
import LogsPanel from '../../Logs/LogsPanel'
import NotificationsPanel from '../../Notifications/NotificationsPanel'

// Styled components
const HeaderContainer = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 24px',
  height: '44px',
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.background.paper : '#ffffff',
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 2px 4px rgba(0,0,0,0.2)'
      : '0 2px 4px rgba(0,0,0,0.05)',
  position: 'fixed',
  top: 0,
  left: 40,
  width: '98vw',
  boxSizing: 'border-box',
  zIndex: 1100,
  transition: 'background-color 0.3s, box-shadow 0.3s',
}))

const LogoWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
})

const Logo = styled(Link)(({theme}) => ({
  fontSize: '20px',
  fontWeight: 700,
  color: theme.palette.mode === 'dark' ? theme.palette.text.primary : 'gray',
  textDecoration: 'none',
  cursor: 'pointer',
  letterSpacing: '-0.5px',
  transition: 'color 0.3s, opacity 0.2s',
  '&:hover': {
    opacity: 0.7,
  },
}))

const ActionsContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
})

const UserAvatar = styled(Avatar)({
  width: '36px',
  height: '36px',
  cursor: 'pointer',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
})

const MobileHeaderContainer = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 16px',
  height: '40px',
  width: '100%',
  boxSizing: 'border-box',
  color: theme.palette.text.primary,
}))

const Header: React.FC = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  // State for user menu
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)

  // Add logs panel state
  const [isLogsOpen, setIsLogsOpen] = useState(false)
  const [isLogsFullscreen, setIsLogsFullscreen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isNotificationsFullscreen, setIsNotificationsFullscreen] =
    useState(false)

  // Notification count (simulated data)
  const notificationCount = 5

  const handleSearch = (query: string) => {
    console.log('Search query:', query)
    // Navigate to search results or filter content
  }

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget)
  }

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null)
  }

  const handleNavigate = (path: string) => {
    navigate(path)
    handleUserMenuClose()
    setMobileDrawerOpen(false)
  }

  const toggleMobileDrawer = () => {
    setMobileDrawerOpen(!mobileDrawerOpen)
  }

  const handleLogsToggle = () => {
    setIsLogsOpen(!isLogsOpen)
  }

  const handleLogsFullscreen = () => {
    setIsLogsFullscreen(!isLogsFullscreen)
  }

  const handleNotificationsToggle = () => {
    setIsNotificationsOpen(!isNotificationsOpen)
  }

  const handleNotificationsFullscreen = () => {
    setIsNotificationsFullscreen(!isNotificationsFullscreen)
  }

  // Mobile drawer content
  const drawerContent = (
    <Box sx={{width: 250, pt: 2, maxWidth: '20vw'}}>
      <List>
        {' '}
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              handleLogsToggle()
              setMobileDrawerOpen(false)
            }}
          >
            <ListItemIcon>
              <LogsIcon />
            </ListItemIcon>
            <ListItemText primary="View Logs" />
          </ListItemButton>
        </ListItem>{' '}
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigate('/dashboard')}>
            <ListItemIcon>
              <LogsIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>{' '}
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              handleNotificationsToggle()
              setMobileDrawerOpen(false)
            }}
          >
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigate('/account')}>
            <ListItemIcon>
              <Avatar sx={{width: 24, height: 24}} />
            </ListItemIcon>
            <ListItemText primary="My Account" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  // Add LogsPanel component to both mobile and desktop views
  const logsPanel = (
    <LogsPanel
      isOpen={isLogsOpen}
      isFullscreen={isLogsFullscreen}
      onClose={() => setIsLogsOpen(false)}
      onToggleFullscreen={handleLogsFullscreen}
    />
  )

  // Add NotificationsPanel component
  const notificationsPanel = (
    <NotificationsPanel
      isOpen={isNotificationsOpen}
      isFullscreen={isNotificationsFullscreen}
      onClose={() => setIsNotificationsOpen(false)}
      onToggleFullscreen={handleNotificationsFullscreen}
    />
  )

  // Render mobile view
  if (isMobile) {
    return (
      <>
        <HeaderContainer>
          <MobileHeaderContainer>
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleMobileDrawer}
            >
              <MenuIcon />
            </IconButton>

            <Logo to="/">Nomeda Task-Hub</Logo>

            <UserAvatar
              alt="User Avatar"
              src="https://i.pravatar.cc/190?img=70"
              onClick={handleUserMenuOpen}
            />
          </MobileHeaderContainer>
        </HeaderContainer>

        <Drawer
          anchor="left"
          open={mobileDrawerOpen}
          onClose={toggleMobileDrawer}
        >
          {drawerContent}
        </Drawer>

        <Menu
          anchorEl={userMenuAnchor}
          open={Boolean(userMenuAnchor)}
          onClose={handleUserMenuClose}
        >
          <MenuItem onClick={() => handleNavigate('/account')}>
            My Account
          </MenuItem>
          <MenuItem onClick={() => handleNavigate('/settings')}>
            Settings
          </MenuItem>
          <MenuItem onClick={() => handleNavigate('/logout')}>Logout</MenuItem>
        </Menu>
        {logsPanel}
        {notificationsPanel}
      </>
    )
  }

  // Render desktop view
  return (
    <>
      <HeaderContainer>
        <LogoWrapper>
          <Logo to="/">Nomeda Task-Hub</Logo>
        </LogoWrapper>

        <Box
          sx={{
            flexGrow: 1,
            mx: 4,
            maxWidth: '600px',
            '& .MuiInputBase-root': {
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.background.default
                  : theme.palette.background.paper,
              color: theme.palette.text.primary,
            },
          }}
        >
          <SearchBar placeholder="Search..." onSearch={handleSearch} />
        </Box>

        <ActionsContainer>
          <ActionButton
            icon={<LogsIcon fontSize="small" />}
            label="View logs"
            onClick={handleLogsToggle}
            sx={{
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 0, 0, 0.04)',
              },
            }}
          />

          <ActionButton
            icon={<NotificationsIcon fontSize="small" />}
            label="Notifications"
            badgeCount={notificationCount}
            onClick={handleNotificationsToggle}
            sx={{
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 0, 0, 0.04)',
              },
            }}
          />

          <UserAvatar
            alt="User Avatar"
            src="https://i.pravatar.cc/160?img=70"
            onClick={handleUserMenuOpen}
          />
        </ActionsContainer>

        <Menu
          anchorEl={userMenuAnchor}
          open={Boolean(userMenuAnchor)}
          onClose={handleUserMenuClose}
          transformOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          PaperProps={{
            sx: {
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.background.paper
                  : '#ffffff',
              color: theme.palette.text.primary,
              boxShadow:
                theme.palette.mode === 'dark'
                  ? '0 2px 8px rgba(0,0,0,0.3)'
                  : '0 2px 8px rgba(0,0,0,0.1)',
            },
          }}
        >
          <MenuItem
            onClick={() => handleNavigate('/account')}
            sx={{
              '&:hover': {
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            My Account
          </MenuItem>
          <MenuItem
            onClick={() => handleNavigate('/logout')}
            sx={{
              '&:hover': {
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </HeaderContainer>
      {logsPanel}
      {notificationsPanel}
    </>
  )
}

export default Header
