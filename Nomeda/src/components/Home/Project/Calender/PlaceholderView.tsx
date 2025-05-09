import React from 'react';
import { Box, Typography } from '@mui/material';
import { Event as EventIcon } from '@mui/icons-material';

interface PlaceholderViewProps {
  title: string;
  description: string;
}

const PlaceholderView: React.FC<PlaceholderViewProps> = ({ title, description }) => {
  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <EventIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Box>
  );
};

export default PlaceholderView;