import React, { useState } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import DropDown from './DropDown';

const AboutSettings: React.FC = () => {
  const [themeSetting, setThemeSetting] = useState<string>('system');

  const handleThemeChange = (event: any) => {
    setThemeSetting(event.target.value);
  };

  const themeMenuItems = [
    { value: 'system', label: 'Use system setting' },
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'custom', label: 'Custom' },
  ];

  return (
    <div>
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black' }}>
        About
      </Typography>
      <Typography variant="body2" sx={{ color: 'gray', marginBottom: 2 }}>
        Learn more about the application and its developers.
      </Typography>
      
      <List>
        <ListItem button>
          <ListItemText primary="Version Info" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Privacy Policy" />
        </ListItem>
      </List>
      
      <Divider sx={{ marginY: 2, borderColor: 'grey', borderWidth: 1 }} />
      
      <DropDown
        themeSetting={themeSetting}
        handleThemeChange={handleThemeChange}
        menuItems={themeMenuItems}
      />
    </div>
  );
};

export default AboutSettings;