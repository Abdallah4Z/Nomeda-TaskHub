import React, { useState, useContext, useEffect } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider
} from '@mui/material';
import IOSSwitchComponent from '../../../IOS';
import DropDown from './DropDown';
import { ColorModeContext } from '../../../Layout/MainLayout'; // Adjust if your context is elsewhere

const GeneralSettings: React.FC = () => {
  const { mode, setMode } = useContext(ColorModeContext);

  const [toggleStates, setToggleStates] = useState({
    enableNotifications: false,
    startWeekOnMonday: false,
    TimeZone: false,
  });

  const [themeSetting, setThemeSetting] = useState<string>(mode); // Sync with current mode

  const handleThemeChange = (event: any) => {
    const selectedMode = event.target.value;
    setThemeSetting(selectedMode);

    // If it's light or dark, change immediately
    if (selectedMode === 'light' || selectedMode === 'dark') {
      setMode(selectedMode);
    } else if (selectedMode === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(prefersDark ? 'dark' : 'light');
    }
    // "custom" can be implemented later with a different theme object
  };

  const themeMenuItems = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
  ];

  const [LangSetting, setLangSetting] = useState<string>('system');
  const handleLangChange = (event: any) => {
    setLangSetting(event.target.value);
  };

  const themeLangItems = [
    { value: 'system', label: 'Use system setting' },
    { value: 'english', label: 'English' },
    { value: 'arabic', label: 'Arabic' },
    { value: 'spanish', label: 'Spanish' },
  ];

  const handleToggleChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setToggleStates({
      ...toggleStates,
      [key]: event.target.checked,
    });
  };

  return (
    <div>
      <Typography variant="h6" sx={{ fontSize: "3vh", fontWeight: 'bold', paddingLeft: 2, marginBottom: 2 }}>
        Preferences
      </Typography>

      <Divider variant="middle" />

      <List>
        <ListItem button>
          <ListItemText primary="Appearance" />
          <DropDown
            themeSetting={themeSetting}
            handleThemeChange={handleThemeChange}
            menuItems={themeMenuItems}
          />
        </ListItem>
        <Typography variant="body2" sx={{ marginBottom: 2, marginTop: -2, paddingLeft: 2 }}>
          Choose the appearance of the website.
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 'bold', paddingLeft: 2, marginTop: 6, marginBottom: 2, fontSize: "3vh" }}>
          Language & Time
        </Typography>

        <Divider variant="middle" />

        <ListItem button>
          <ListItemText primary="Language"  />
          <DropDown
            themeSetting={LangSetting}
            handleThemeChange={handleLangChange}
            menuItems={themeLangItems}
          />
        </ListItem>
        <Typography variant="body2" sx={{ marginBottom: 2, marginTop: -2, paddingLeft: 2 }}>
          Choose the Language of the website.
        </Typography>

        <ListItem button>
          <ListItemText primary="Start Week On Monday"  />
          <ListItemSecondaryAction>
            <IOSSwitchComponent
              edge="end"
              checked={toggleStates.startWeekOnMonday}
              onChange={handleToggleChange('startWeekOnMonday')}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <Typography variant="body2" sx={{marginBottom: 2, marginTop: -2, paddingLeft: 2 }}>
          This will make your calendar start on Monday instead of Sunday.
        </Typography>

        <ListItem button>
          <ListItemText primary="TimeZone" />
          <ListItemSecondaryAction>
            <IOSSwitchComponent
              edge="end"
              checked={toggleStates.TimeZone}
              onChange={handleToggleChange('TimeZone')}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <Typography variant="body2" sx={{  marginBottom: 2, marginTop: -2, paddingLeft: 2 }}>
          Reminders, notifications and emails are delivered based on your time zone.
        </Typography>

        <Divider variant="middle" />
      </List>
    </div>
  );
};

export default GeneralSettings;
