import * as React from 'react'
import {styled, useTheme, Theme, CSSObject} from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import CenteredBox from './Settings/settings' // Import your Settings component
import {useNavigate, Link} from 'react-router-dom'

const drawerWidth = 200
const drawerColor = '#212121'

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  backgroundColor: drawerColor,
  color: '#fff',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

// Closed drawer (mini) styles
const closedMixin = (theme: Theme): CSSObject => ({
  backgroundColor: drawerColor,
  color: '#fff',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(4)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(5)} + 1px)`,
  },
})

// The header that holds the toggle icon
const DrawerHeader = styled('div', {
  shouldForwardProp: prop => prop !== 'open',
})<{open?: boolean}>(({theme, open}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: open ? 'flex-end' : 'center',
  width: '100%',
  padding: 0,
  margin: 0,
  backgroundColor: 'inherit',
}))

// Main content area that adjusts based on drawer state
const Main = styled('main', {
  shouldForwardProp: prop => prop !== 'open',
})<{open?: boolean}>(({theme, open}) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: open ? 0 : `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}))

interface DrawerProps {
  open?: boolean
}

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})<DrawerProps>(({theme, open}) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

interface NavigationDrawerProps {
  children?: React.ReactNode // Add children prop to render content
}

const NavigationDrawer: React.FC<NavigationDrawerProps> = ({children}) => {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleInboxClick = () => {
    navigate('/login')
  }

  const handleInboxClickHome = () => {
    navigate('/Home')
  }

  return (
    <Box sx={{display: 'flex'}}>
      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{
          sx: {
            marginY: '45px',
            overflow: 'auto',
          },
        }}
      >
        <DrawerHeader open={open}>
          <IconButton
            onClick={handleToggle}
            sx={{
              color: '#fff',
              '&:focus': {
                outline: 'none',
                boxShadow: 'none',
              },
            }}
          >
            {open ? (
              theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )
            ) : (
              <MenuIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <List>
          <ListItem disablePadding sx={{display: 'block'}}>
            <ListItemButton
              onClick={handleInboxClick}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                '&:hover': {backgroundColor: 'rgba(255,255,255,0.1)'},
              }}
            >
              <ListItemIcon
                sx={{
                  color: '#fff',
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Login" sx={{opacity: open ? 1 : 0}} />
            </ListItemButton>
          </ListItem>

          <Divider sx={{borderColor: 'rgba(255,255,255,0.12)'}} />

          <ListItem disablePadding sx={{display: 'block'}}>
            <ListItemButton
              onClick={handleInboxClickHome}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                '&:hover': {backgroundColor: 'rgba(255,255,255,0.1)'},
              }}
            >
              <ListItemIcon
                sx={{
                  color: '#fff',
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Home" sx={{opacity: open ? 1 : 0}} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{display: 'block'}}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                mt: 2,
              }}
            ></Box>
            <CenteredBox />
          </ListItem>
        </List>
      </Drawer>

      {/* Content area that adjusts based on drawer state */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
          marginLeft: open
            ? `${drawerWidth}px`
            : `calc(${theme.spacing(5)} + 1px)`,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default NavigationDrawer
