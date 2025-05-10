import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import UserAvatars from '../../../Common/UserAvatars';

const ProjectActions = ({ users }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px'}}>
    <UserAvatars users={users} size={25} />
    <Typography variant="body2" sx={{ fontWeight: 'bold', opacity: 0.5, fontSize: '20px' }}>
      |
    </Typography>
    <Button variant="outlined" size="small">
      Share
    </Button>
    <Button variant="outlined" size="small">
      Automation
    </Button>
  </Box>
);

export default ProjectActions;