import React, { useState } from 'react';
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

const GeneralSettings: React.FC = () => {
  const [toggleStates, setToggleStates] = useState({
    enableNotifications: false,
    startWeekOnMonday: false,
    TimeZone: false,
  });

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
      <Typography variant="h6" sx={{ fontSize:"3vh",fontWeight: 'bold', color: 'white', paddingLeft: 2,marginBottom: 2 }}>
        Prefrences
      </Typography>
      
      <Divider variant="middle" sx={{ borderColor: 'rgba(255,255,255,0.12)' }} />

      <List>
      <ListItem button>
          <ListItemText primary="Appearance" sx={{ color: 'white'}} />
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
          Choose the appearance of the website.
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 'bold',
         color: 'white', 
        paddingLeft: 2 ,marginTop: 6
        ,marginBottom: 2
        ,fontSize:"3vh"}}>
        Language & Time
      </Typography>
      <Divider variant="middle" sx={{ borderColor: 'rgba(255,255,255,0.12)' }} />

        <ListItem button>
          <ListItemText primary="Language" sx={{ color: 'white' }} />
          <DropDown
            themeSetting={LangSetting}
            handleThemeChange={handleLangChange}
            menuItems={themeLangItems}
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
          Choose the Language of the website.
        </Typography>
      
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
        <ListItem button>
          <ListItemText primary="TimeZone" sx={{ color: 'white' }} />
          <ListItemSecondaryAction>
            <IOSSwitchComponent
              edge="end"
              checked={toggleStates.TimeZone}
              onChange={handleToggleChange('TimeZone')}
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
          Reminders, notifications and emails are delivered based on your time zone
        </Typography>
        <Divider variant="middle" sx={{ borderColor: 'rgba(255,255,255,0.12)' }} />

        {/* Appearance Dropdown */}
        
      </List>
    </div>
  );
};

export default GeneralSettings;