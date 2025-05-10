import React from 'react';
import { Box, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

interface SettingsButtonProps {
  onOpen: () => void;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ onOpen }) => {
  return (
    <Box
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
            backgroundColor: 'transparent',
          },
        }}
      >
        <SettingsIcon  />
      </IconButton>
    </Box>
  );
};

export default SettingsButton;