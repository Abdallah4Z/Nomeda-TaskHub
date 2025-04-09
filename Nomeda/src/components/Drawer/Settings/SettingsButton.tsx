import React from 'react';
import { Box, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

interface SettingsButtonProps {
  onOpen: () => void;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ onOpen }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
      }}
    >
      <IconButton
        onClick={onOpen}
        disableRipple
        disableFocusRipple
        sx={{
          '&:focus': {
            outline: 'none',
            boxShadow: 'none',
          },
          '&:hover': {
            color: '#fff',
            backgroundColor: 'transparent',
          },
        }}
      >
        <SettingsIcon sx={{ color: '#fff' }} />
      </IconButton>
    </Box>
  );
};

export default SettingsButton;