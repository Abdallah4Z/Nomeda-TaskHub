import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UserAvatars from '../../../Common/UserAvatars';

interface ProjectActionsProps {
  users: any[];
  onAddTask?: () => void;
}

const ProjectActions: React.FC<ProjectActionsProps> = ({ users, onAddTask }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px'}}>
    <UserAvatars users={users} size={25} />
    <Typography variant="body2" sx={{ fontWeight: 'bold', opacity: 0.5, fontSize: '20px' }}>
      |
    </Typography>
    <Button 
      variant="contained" 
      size="small" 
      startIcon={<AddIcon />} 
      onClick={onAddTask}
      sx={{ mr: 1 }}
    >
      Add Task
    </Button>
    <Button variant="outlined" size="small">
      Share
    </Button>
    <Button variant="outlined" size="small">
      Automation
    </Button>
  </Box>
);

export default ProjectActions;