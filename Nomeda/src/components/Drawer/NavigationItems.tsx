import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import Box from '@mui/material/Box'
import CenteredBox from './Settings/settings' // Import your Settings component

interface NavigationItemsProps {
  open: boolean
  onNavigate: (path: string) => void
}

const NavigationItems: React.FC<NavigationItemsProps> = ({
  open,
  onNavigate,
}) => {
  return (
    <List>
      {/* Settings navigation item */}
      <ListItem disablePadding sx={{display: 'block'}}>
        <ListItemButton
          onClick={() => onNavigate('/Settings')}
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
          <ListItemText primary="Settings" sx={{opacity: open ? 1 : 0}} />
        </ListItemButton>
      </ListItem>

      {/* Divider below first item */}
      <Divider sx={{borderColor: 'rgba(255,255,255,0.12)'}} />

      {/* Home navigation item */}
      <ListItem disablePadding sx={{display: 'block'}}>
        <ListItemButton
          onClick={() => onNavigate('/Home')}
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

      {/* CenteredBox (Settings) as another ListItem */}
      <ListItem disablePadding sx={{display: 'block'}}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            mt: 2,
          }}
        >
          <CenteredBox />
        </Box>
      </ListItem>
    </List>
  )
}

export default NavigationItems
