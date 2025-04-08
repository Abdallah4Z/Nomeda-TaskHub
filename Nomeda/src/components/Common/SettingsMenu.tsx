import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface Action {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

interface SettingsMenuProps {
  actions: Action[];
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ actions }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action: () => void) => {
    action();
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ padding: "3px" }}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            minWidth: 10,
            paddingX:0.5,
          },
        }}
      >
        {actions.map((action, index) => (
          <MenuItem
            key={index}
            onClick={() => handleAction(action.onClick)}
            sx={{ minHeight: "32px", paddingY: "3px", paddingX: "2px" }}
          >
            {action.icon && (
              <ListItemIcon sx={{ minWidth: "30px" }}>
                {action.icon}
              </ListItemIcon>
            )}
            <ListItemText
              primary={action.label}
              primaryTypographyProps={{ fontSize: 13 }}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default SettingsMenu;
