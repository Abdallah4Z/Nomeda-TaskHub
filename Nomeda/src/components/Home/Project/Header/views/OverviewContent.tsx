import React from 'react';
import { Box, Typography } from '@mui/material';

const OverviewContent = () => (
  <Box sx={{ height: '100%' }}>
    <Typography variant="h6">Overview Content</Typography>
    <Typography paragraph>
      This is the overview of the project. Here you can see general
      project information, statistics, and the overall progress.
    </Typography>
  </Box>
);

export default OverviewContent;