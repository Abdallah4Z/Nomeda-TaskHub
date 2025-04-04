// MiniDrawerWithToggle.tsx
import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const drawerWidth = 240;

// Open drawer styles
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  backgroundColor: '#212121',
  color: '#fff',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

// Closed drawer (mini) styles
const closedMixin = (theme: Theme): CSSObject => ({
  backgroundColor: '#212121',
  color: '#fff',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

// The header that holds the toggle icon
// - Center the icon if closed, align it right if open
// - Remove padding to avoid leftover space
const DrawerHeader = styled('div', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: open ? 'flex-end' : 'center',
  width: '100%',
  padding: 0,
  margin: 0,
  backgroundColor: 'inherit',
}));

interface DrawerProps {
  open?: boolean;
}
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<DrawerProps>(({ theme, open }) => ({
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
}));

export default function MiniDrawerWithToggle() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  // Toggle the drawer open/closed
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const primaryItems = ['Inbox', 'Starred', 'Send email', 'Drafts'];
  const secondaryItems = ['All mail', 'Trash', 'Spam'];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Drawer variant="permanent" open={open}>
        <DrawerHeader open={open}>
          <IconButton onClick={handleToggle} sx={{ color: '#fff' }}>
            {open
              ? theme.direction === 'rtl'
                ? <ChevronRightIcon />
                : <ChevronLeftIcon />
              : <MenuIcon />
            }
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }} />

        {/* First group of navigation items */}
        <List>
          {primaryItems.map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
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
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }} />

        {/* Second group of navigation items */}
        <List>
          {secondaryItems.map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
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
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Optional main content */}
     
    </Box>
  );
}
