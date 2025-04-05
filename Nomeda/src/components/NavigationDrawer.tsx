import * as React from 'react'
import {styled, useTheme, Theme, CSSObject} from '@mui/material/styles'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
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
import CenteredBox from './settings' // Import your Settings component
import {Navigate} from 'react-router-dom'
import {useNavigate, Link} from 'react-router-dom'

const drawerWidth = 200
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  backgroundColor: '#212121',
  color: '#fff',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

// Closed drawer (mini) styles
const closedMixin = (theme: Theme): CSSObject => ({
  backgroundColor: '#212121',
  color: '#fff',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(5)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
})

// The header that holds the toggle icon
// - Center the icon if closed, align it right if open
// - Remove padding to avoid leftover space
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

const NavigationDrawer: React.FC = () => {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }
  const navigate = useNavigate()
  const handleInboxClick = () => {
    navigate('/Settings') // or navigate to "/home" if that's your intended route
  }
  const handleInboxClickHome = () => {
    navigate('/Home') // or navigate to "/home" if that's your intended route
  }
  return (
    <Box sx={{display: 'flex'}}>
      <Drawer variant="permanent" open={open}>
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

        {/* Inbox item */}
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
              <ListItemText primary="Inbox" sx={{opacity: open ? 1 : 0}} />
            </ListItemButton>
          </ListItem>
          {/* Divider below Inbox */}
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
              <ListItemText primary="Inbox" sx={{opacity: open ? 1 : 0}} />
            </ListItemButton>
          </ListItem>
          {/* CenteredBox (Settings) as another ListItem */}
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
    </Box>
  )
}
export default NavigationDrawer
