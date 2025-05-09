import React from 'react';
import { 
  Paper, 
  Box, 
  Typography, 
  CircularProgress,
  Divider,
  Avatar,
  AvatarGroup,
  IconButton,
  useTheme
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ScheduleIcon from '@mui/icons-material/Schedule';

interface ProjectProgressProps {
  completionPercentage: number;
}

const ProjectProgress: React.FC<ProjectProgressProps> = ({ 
  completionPercentage 
}) => {
  const theme = useTheme();
  
  // Mock data - in a real app, this would come from your state/API
  const teamMembers = [
    { id: 1, name: 'Jane Smith', avatar: '/static/avatar1.jpg' },
    { id: 2, name: 'John Doe', avatar: '/static/avatar2.jpg' },
    { id: 3, name: 'Robert Johnson', avatar: '/static/avatar3.jpg' },
    { id: 4, name: 'Emily Davis', avatar: '/static/avatar4.jpg' },
    { id: 5, name: 'Michael Wilson', avatar: '/static/avatar5.jpg' },
  ];
  
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 14);
  
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        height: '100%',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid',
        borderColor: 'divider', 
        width: '850px',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Project Progress</Typography>
        <IconButton size="small">
          <MoreVertIcon />
        </IconButton>
      </Box>
      
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: { xs: 'wrap', sm: 'nowrap' },
        gap: 3,
        my: 2 
      }}>
        <Box sx={{ 
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <CircularProgress
            variant="determinate"
            value={100}
            size={140}
            thickness={4}
            sx={{ 
              color: theme.palette.grey[200],
              position: 'absolute'
            }}
          />
          <CircularProgress
            variant="determinate"
            value={completionPercentage}
            size={140}
            thickness={4}
            sx={{ color: theme.palette.primary.main }}
          />
          <Box
            sx={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h4"
              component="div"
              sx={{ fontWeight: 'bold' }}
            >
              {completionPercentage}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Completed
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            Task Hub Migration
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            The project involves migrating all tasks from the legacy system to the new Task Hub platform with improved features and interface.
          </Typography>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PeopleOutlineIcon 
                fontSize="small" 
                sx={{ color: 'text.secondary', mr: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                Team ({teamMembers.length})
              </Typography>
            </Box>
            
            <AvatarGroup max={4}>
              {teamMembers.map(member => (
                <Avatar 
                  key={member.id} 
                  alt={member.name} 
                  src={member.avatar}
                  sx={{ width: 30, height: 30 }}
                />
              ))}
            </AvatarGroup>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <ScheduleIcon 
              fontSize="small" 
              sx={{ color: 'text.secondary', mr: 1 }} 
            />
            <Typography variant="body2" color="text.secondary">
              Due date: {dueDate.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProjectProgress;