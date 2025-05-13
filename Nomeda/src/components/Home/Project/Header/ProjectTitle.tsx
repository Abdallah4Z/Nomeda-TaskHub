import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const ProjectTitle = ({ projectName, onEdit }) => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Typography variant="h5" sx={{ fontWeight: 'bold', display: 'inline-flex', alignItems: 'center' }}>
      <Box component="span" sx={{ fontSize: '40px', mr: 1 }}>
        {projectName}
      </Box>
      <IconButton onClick={onEdit} size="small">
        <EditIcon fontSize="medium" />
      </IconButton>
    </Typography>
  </Box>
);

export default ProjectTitle;