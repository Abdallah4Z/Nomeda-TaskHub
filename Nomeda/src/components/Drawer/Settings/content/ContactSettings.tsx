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

const ContactSettings: React.FC = () => {
  const [toggleStates, setToggleStates] = useState({
    liveChat: false
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
        Contact Support
      </Typography>
      <Typography variant="body2" sx={{ color: 'gray', marginBottom: 2 }}>
        Get in touch with our support team for assistance.
      </Typography>
      
      <List>
        <ListItem button>
          <ListItemText primary="Email Support" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Live Chat" />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              checked={toggleStates.liveChat}
              onChange={handleToggleChange('liveChat')}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      
      <Divider sx={{ marginY: 2, borderColor: 'grey', borderWidth: 1 }} />
    </div>
  );
};

export default ContactSettings;