import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search as SearchIcon, List as LogsIcon, Notifications as NotificationsIcon, AccountCircle as AccountIcon } from '@mui/icons-material';
import { Avatar, Box, IconButton, InputBase, styled } from '@mui/material';

// Styled components for better customization
const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 20px', // Horizontal padding
  height: '60px', // Fixed height
  backgroundColor: '#ffffff', // Background color
  borderBottom: '1px solid #e0e0e0', // Bottom border
  position: 'fixed', // Fix the header at the top
  top: 0, // Stick to the top of the viewport
  left: 0, // Align to the left edge
  width: '100vw', // Span the full viewport width
  boxSizing: 'border-box', // Include padding in the width calculation
  zIndex: 1000, // Ensure it stays above other content
}));

const Logo = styled(Link)(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 600,
  color: '#333',
  textDecoration: 'none',
  cursor: 'pointer',
}));

const SearchBar = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#f5f5f5',
  borderRadius: '20px',
  padding: '0 15px',
  flexGrow: 1,
  marginLeft: '20px',
  maxWidth: '400px',
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  marginLeft: '10px',
  flex: 1,
}));

const CircularIconButton = styled(IconButton)(({ theme }) => ({
  borderRadius: '50%',
  width: '40px',
  height: '40px',
}));

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      {/* Left Section: Logo */}
      <Logo to="/">MyApp</Logo>

      {/* Middle Section: Search Bar */}
      <SearchBar>
        <SearchIcon />
        <StyledInput placeholder="Search..." />
      </SearchBar>

      {/* Right Section: Icons */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* Logs/Activity Button */}
        <CircularIconButton>
          <LogsIcon />
        </CircularIconButton>

        {/* Notifications Button */}
        <CircularIconButton>
          <NotificationsIcon />
        </CircularIconButton>

        {/* Account Button */}
        <CircularIconButton onClick={() => navigate('/account')}>
          <Avatar alt="User Avatar" src="https://i.pravatar.cc/150?img=70" />
        </CircularIconButton>
      </Box>
    </HeaderContainer>
  );
};

export default Header;