import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, ListItem, ListItemSecondaryAction, ListItemText } from '@mui/material';

interface MenuItemType {
  value: string;
  label: string;
}

interface ThemeSelectProps {
  themeSetting: string;
  handleThemeChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  menuItems: MenuItemType[]; // Accept menu items as a prop
}

const DropDown: React.FC<ThemeSelectProps> = ({ themeSetting, handleThemeChange, menuItems }) => {
  return (
    <ListItem button>
      <ListItemText/>
      <ListItemSecondaryAction>
        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <Select
            labelId="theme-select-label"
            id="theme-select"
            value={themeSetting}
            onChange={handleThemeChange}
            sx={{ color: 'white',
            left:30
             }} // optional styling
            displayEmpty
          >
            {menuItems.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default DropDown;
