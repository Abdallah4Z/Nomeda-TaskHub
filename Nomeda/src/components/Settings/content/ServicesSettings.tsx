import React, { useState } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Divider
} from '@mui/material';

const ServicesSettings: React.FC = () => {
  const [toggleStates, setToggleStates] = useState({
    emailNotifications: false,
    dataSyncing: false
  });

  const handleToggleChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setToggleStates({
      ...toggleStates,
      [key]: event.target.checked,
    });
  };

  return (
    <div>
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black' }}>
        Services
      </Typography>
      <Typography variant="body2" sx={{ color: 'gray', marginBottom: 2 }}>
        Available services that you can configure.
      </Typography>
      
      <List>
        <ListItem button>
          <ListItemText primary="Email Notifications" />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              checked={toggleStates.emailNotifications}
              onChange={handleToggleChange('emailNotifications')}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button>
          <ListItemText primary="Data Syncing" />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              checked={toggleStates.dataSyncing}
              onChange={handleToggleChange('dataSyncing')}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      
      <Divider sx={{ marginY: 2, borderColor: 'grey', borderWidth: 1 }} />
    </div>
  );
};

export default ServicesSettings;