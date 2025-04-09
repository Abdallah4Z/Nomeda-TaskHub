import React, { useState } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemSecondaryAction
} from '@mui/material';
import DropDown from './DropDown';
import IOSSwitchComponent from '../../../IOS';

const AboutSettings: React.FC = () => {
  const [themeSetting, setThemeSetting] = useState<string>('system');

  const handleThemeChange = (event: any) => {
    setThemeSetting(event.target.value);
  };
const [toggleStates, setToggleStates] = useState({
    enableNotifications: false,
    startWeekOnMonday: false,
    TimeZone: false,
  });

  const themeMenuItems = [
    { value: 'V.1', label: 'V1   (Early access)' },
    { value: 'V.2', label: 'V1.1 (Early access)' },
    { value: 'V.3', label: 'V1.2 (Early access)' },
    { value: 'V.4', label: 'V1.3 (Early access)' },
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
        General Information
      </Typography>
      
      <Divider variant="middle" sx={{ borderColor: 'rgba(255,255,255,0.12)' }} />

      <List>
        <Typography sx={{ fontSize:"3vh",fontWeight: 'bold', color: 'white', paddingLeft: 2,marginBottom: 2 }}
        >        Nomeda Task Manager
          </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'gray',
            marginBottom: 2,
            marginTop: -2,
            paddingLeft: 2,
          }}
        >
        This is the real time editor for our company Nomeda it is designed to help you 
        manage your tasks efficiently, collaborate with teams, and stay organized while 
        utilizing advanced AI Features to enhance your productivity.
        </Typography>
      <ListItem button>
          <ListItemText primary="Version" sx={{ color: 'white'}} />
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
          Choose the Version of the website (Task Management, Dashboard , Ai features).
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

export default AboutSettings;