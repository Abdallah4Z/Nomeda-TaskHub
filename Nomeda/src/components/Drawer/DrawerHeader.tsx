import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';

// The header that holds the toggle icon
const StyledDrawerHeader = styled('div', {
  shouldForwardProp: prop => prop !== 'open',
})<{open?: boolean}>(({ theme, open }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: open ? 'flex-start' : 'center',
  width: '100%',
  padding: 0,
  margin: 0,
  backgroundColor: 'inherit',
}));

interface DrawerHeaderProps {
  open: boolean;
  handleToggle: () => void;
}

const DrawerHeader: React.FC<DrawerHeaderProps> = ({ open, handleToggle }) => {
  const theme = useTheme();

  return (
    <StyledDrawerHeader open={open}>
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
    </StyledDrawerHeader>
  );
};

export default DrawerHeader;