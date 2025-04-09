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
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
      Work in Progress
      </Typography>
      
      
      
      <Divider sx={{ marginY: 2, borderColor: 'grey', borderWidth: 1 }} />
    </div>
  );
};

export default ContactSettings;