import React, { useState } from 'react';
import { Menu, MenuItem, IconButton, Box } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { DropdownMenuItem } from './types';

interface DropdownMenuProps {
  menuItems: DropdownMenuItem[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ menuItems }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action: () => void) => {
    action();
    handleClose();
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <IconButton
        aria-label="Open component actions menu"
        aria-controls={open ? 'dropdown-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          position: 'absolute',
          right: -8,
          top: -8,
          bgcolor: 'primary.contrastText',
        }}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'dropdown-button',
        }}
        PaperProps={{
          sx: {
            minWidth: 150,
          },
        }}
      >
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => handleMenuItemClick(item.action)}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default DropdownMenu;