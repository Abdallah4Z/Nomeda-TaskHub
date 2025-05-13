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
      <Typography variant="h6" sx={{ fontWeight: 'bold'}}>
        Services
      </Typography>
      
      
      <Divider sx={{ marginY: 2, borderWidth: 1 }} />

      <Typography  sx={{ fontWeight: 'bold' }}>
      Work in Progress
      </Typography>
    </div>
  );
};

export default ServicesSettings;