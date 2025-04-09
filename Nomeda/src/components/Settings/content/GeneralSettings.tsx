import React, { useState } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider
} from '@mui/material';
import IOSSwitchComponent from '../../IOS';
import DropDown from './DropDown';

const GeneralSettings: React.FC = () => {
  const [toggleStates, setToggleStates] = useState({
    enableNotifications: false,
    startWeekOnMonday: false
  });

  const [themeSetting, setThemeSetting] = useState<string>('system');
  
  const handleToggleChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setToggleStates({
      ...toggleStates,
      [key]: event.target.checked,
    });
  };

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
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', paddingLeft: 2 }}>
        General Settings
      </Typography>
      <Typography variant="body2" sx={{ color: 'gray', marginBottom: 2, paddingLeft: 2 }}>
        Configure general options for the application.
      </Typography>
      <Divider variant="middle" sx={{ borderColor: 'rgba(255,255,255,0.12)' }} />

      <List>
        {/* Notifications Toggle */}
        <ListItem button>
          <ListItemText primary="Enable Notifications" sx={{ color: 'white' }} />
          <ListItemSecondaryAction>
            <IOSSwitchComponent
              edge="end"
              checked={toggleStates.enableNotifications}
              onChange={handleToggleChange('enableNotifications')}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <Typography
          variant="body2"
          sx={{
            color: 'gray',
            marginBottom: 2,
            marginTop: -2,
            paddingLeft: 2,
          }}
        >
          Enable or disable notifications for the application.
        </Typography>

        {/* Start Week on Monday Toggle */}
        <ListItem button>
          <ListItemText primary="Start Week On Monday" sx={{ color: 'white' }} />
          <ListItemSecondaryAction>
            <IOSSwitchComponent
              edge="end"
              checked={toggleStates.startWeekOnMonday}
              onChange={handleToggleChange('startWeekOnMonday')}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <Typography
          variant="body2"
          sx={{
            color: 'gray',
            marginBottom: 2,
            marginTop: -2,
            paddingLeft: 2,
          }}
        >
          This will make your calendar start on Monday instead of Sunday.
        </Typography>
        
        <Divider variant="middle" sx={{ borderColor: 'rgba(255,255,255,0.12)' }} />

        {/* Appearance Dropdown */}
        <ListItem button>
          <ListItemText primary="Appearance" sx={{ color: 'white' }} />
          <DropDown
            themeSetting={themeSetting}
            handleThemeChange={handleThemeChange}
            menuItems={themeMenuItems}
          />
        </ListItem>
        <Typography
          variant="body2"
          sx={{
            color: 'gray',
            marginBottom: 2,
            marginTop: -2,
            paddingLeft: 2,
          }}
        >
          Choose the appearance of the application.
        </Typography>
      </List>
    </div>
  );
};

export default GeneralSettings;