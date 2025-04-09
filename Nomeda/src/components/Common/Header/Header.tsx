import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search as SearchIcon, 
  List as LogsIcon, 
  Notifications as NotificationsIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
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
  ListItemText
} from '@mui/material';
import SearchBar from './SearchBar';
import ActionButton from './ActionButton';

// Styled components
const HeaderContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 24px',
  height: '44px',
  backgroundColor: '#ffffff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  boxSizing: 'border-box',
  zIndex: 1100,
});

const LogoWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

const Logo = styled(Link)({
  fontSize: '20px',
  fontWeight: 700,
  color: 'gray',
  textDecoration: 'none',
  cursor: 'pointer',
  letterSpacing: '-0.5px',
  '&:hover': {
    opacity: 0.7,
  },
});

const ActionsContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

const UserAvatar = styled(Avatar)({
  width: '36px',
  height: '36px',
  cursor: 'pointer',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const MobileHeaderContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 16px',
  height: '40px',
  width: '100%',
  boxSizing: 'border-box',
});

const Header: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // State for user menu
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Notification count (simulated data)
  const notificationCount = 5;

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // Navigate to search results or filter content
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    handleUserMenuClose();
    setMobileDrawerOpen(false);
  };

  const toggleMobileDrawer = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  // Mobile drawer content
  const drawerContent = (
    <Box sx={{ width: 250, pt: 2 }}>
      <List>
        <ListItem button onClick={() => handleNavigate('/dashboard')}>
          <ListItemIcon><LogsIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => handleNavigate('/notifications')}>
          <ListItemIcon><NotificationsIcon /></ListItemIcon>
          <ListItemText primary="Notifications" />
        </ListItem>
        <ListItem button onClick={() => handleNavigate('/account')}>
          <ListItemIcon><Avatar sx={{ width: 24, height: 24 }} /></ListItemIcon>
          <ListItemText primary="My Account" />
        </ListItem>
      </List>
    </Box>
  );

  // Render mobile view
  if (isMobile) {
    return (
      <>
        <HeaderContainer>
          <MobileHeaderContainer>
            <IconButton edge="start" color="inherit" onClick={toggleMobileDrawer}>
              <MenuIcon />
            </IconButton>
            
            <Logo to="/">MyApp</Logo>
            
            <UserAvatar 
              alt="User Avatar" 
              src="https://i.pravatar.cc/150?img=70" 
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
          <MenuItem onClick={() => handleNavigate('/account')}>My Account</MenuItem>
          <MenuItem onClick={() => handleNavigate('/settings')}>Settings</MenuItem>
          <MenuItem onClick={() => handleNavigate('/logout')}>Logout</MenuItem>
        </Menu>
      </>
    );
  }

  // Render desktop view
  return (
    <HeaderContainer>
      <LogoWrapper>
        <Logo to="/">MyApp</Logo>
      </LogoWrapper>

      <Box sx={{ flexGrow: 1, mx: 4, maxWidth: '600px' }}>
        <SearchBar placeholder="Search..." onSearch={handleSearch} />
      </Box>

      <ActionsContainer>
        <ActionButton 
          icon={<LogsIcon fontSize="small" />} 
          label="View logs"
          onClick={() => navigate('/logs')}
        />
        
        <ActionButton 
          icon={<NotificationsIcon fontSize="small" />} 
          label="Notifications"
          badgeCount={notificationCount}
          onClick={() => navigate('/notifications')}
        />
        
        <UserAvatar 
          alt="User Avatar" 
          src="https://i.pravatar.cc/150?img=70" 
          onClick={handleUserMenuOpen}
        />
      </ActionsContainer>
      
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => handleNavigate('/account')}>My Account</MenuItem>
        <MenuItem onClick={() => handleNavigate('/settings')}>Settings</MenuItem>
        <MenuItem onClick={() => handleNavigate('/logout')}>Logout</MenuItem>
      </Menu>
    </HeaderContainer>
  );
};

export default Header;