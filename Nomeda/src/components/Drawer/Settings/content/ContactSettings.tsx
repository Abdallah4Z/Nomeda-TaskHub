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
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
      Contact
      </Typography>
      
      
      
      <Divider sx={{ marginY: 2, borderWidth: 1 }} />
      <Typography  sx={{ fontWeight: 'bold' }}>
      Work in Progress
      </Typography>
    </div>
  );
};

export default ContactSettings;