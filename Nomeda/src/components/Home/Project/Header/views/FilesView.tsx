import React from 'react';
import { Box, Typography } from '@mui/material';

const FilesView = () => (
  <Box sx={{ height: '100%' }}>
    <Typography variant="h6">Files</Typography>
    <Typography paragraph>
      Here you can access all files and documents related to this project.
    </Typography>
  </Box>
);

export default FilesView;