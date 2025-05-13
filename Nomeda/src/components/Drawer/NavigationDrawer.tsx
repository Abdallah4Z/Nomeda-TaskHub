import * as React from 'react';
import { Box, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { StyledDrawer } from './StyledDrawer';
import DrawerHeader from './DrawerHeader';
import NavigationItems from './NavigationItems';

const NavigationDrawer: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        height: '100vh',
      }}
    >
      <StyledDrawer variant="permanent" open={open}>
        <DrawerHeader open={open} handleToggle={handleToggle} />
        <NavigationItems 
          open={open} 
          onNavigate={handleNavigation}
        />
      </StyledDrawer>
    </Box>
  );
};

export default NavigationDrawer;
