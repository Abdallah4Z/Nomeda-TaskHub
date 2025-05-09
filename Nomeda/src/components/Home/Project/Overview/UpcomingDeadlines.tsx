import React from 'react';
import { 
  Paper, 
  Box, 
  Typography, 
  List,
  ListItem,
  ListItemText,
  Chip,
  LinearProgress,
  IconButton,
  Divider,
  Button,
  Tooltip,
  useTheme
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface DeadlineTask {
  id: number;
  title: string;
  dueDate: string;
  progress: number;
  priority: 'high' | 'medium' | 'low';
  daysLeft: number;
}

const UpcomingDeadlines: React.FC = () => {
  const theme = useTheme();
  
  // Mock data - in a real app, this would come from your state/API
  const deadlines: DeadlineTask[] = [
    {
      id: 1,
      title: 'Complete backend integration',
      dueDate: 'May 5, 2025',
      progress: 75,
      priority: 'high',
      daysLeft: 5
    },
    {
      id: 2,
      title: 'Finalize UI design system',
      dueDate: 'May 7, 2025',
      progress: 60,
      priority: 'medium',
      daysLeft: 7
    },
    {
      id: 3,
      title: 'User testing and feedback',
      dueDate: 'May 10, 2025',
      progress: 25,
      priority: 'high',
      daysLeft: 10
    },
    {
      id: 4,
      title: 'Documentation update',
      dueDate: 'May 15, 2025',
      progress: 10,
      priority: 'low',
      daysLeft: 15
    }
  ];
  
  // Map priority to colors
  const priorityColors = {
    high: theme.palette.error.main,
    medium: theme.palette.warning.main,
    low: theme.palette.success.main
  };
  
  return (
    <Paper
      elevation={0}
      sx={{
        p: 0,
        borderRadius: 2,
        height: '100%',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden'
      }}
    >
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid', 
        borderColor: 'divider'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CalendarTodayIcon 
            fontSize="small" 
            sx={{ color: theme.palette.primary.main, mr: 1 }} 
          />
          <Typography variant="h6">Upcoming Deadlines</Typography>
        </Box>
        <Chip 
          label={`${deadlines.length} tasks`} 
          size="small" 
          color="primary" 
          variant="outlined"
        />
      </Box>
      
      <List sx={{ p: 0, overflow: 'auto', maxHeight: 350 }}>
        {deadlines.map((task, index) => (
          <React.Fragment key={task.id}>
            <ListItem
              sx={{ 
                py: 2, 
                px: 2,
                '&:hover': {
                  bgcolor: 'action.hover'
                }
              }}
            >
              <ListItemText
                disableTypography
                primary={
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    mb: 1
                  }}>
                    <Box>
                      <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                        {task.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Tooltip title="Due date">
                          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                            <AccessTimeIcon 
                              fontSize="small" 
                              sx={{ color: 'text.secondary', fontSize: 16, mr: 0.5 }} 
                            />
                            <Typography variant="caption" color="text.secondary">
                              {task.dueDate}
                            </Typography>
                          </Box>
                        </Tooltip>
                        <Chip
                          label={`${task.priority} priority`}
                          size="small"
                          sx={{
                            bgcolor: `${priorityColors[task.priority]}15`,
                            color: priorityColors[task.priority],
                            fontWeight: 500,
                            textTransform: 'capitalize'
                          }}
                        />
                      </Box>
                    </Box>
                    
                    <IconButton size="small">
                      <MoreHorizIcon fontSize="small" />
                    </IconButton>
                  </Box>
                }
                secondary={
                  <Box>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      mb: 0.5
                    }}>
                      <Typography variant="caption" color="text.secondary">
                        Progress ({task.progress}%)
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: task.daysLeft <= 3 ? 'error.main' : 'text.secondary',
                          fontWeight: task.daysLeft <= 3 ? 'bold' : 'normal'
                        }}
                      >
                        {task.daysLeft} days left
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={task.progress} 
                      sx={{ 
                        height: 6, 
                        borderRadius: 3,
                        bgcolor: theme.palette.grey[200]
                      }}
                    />
                  </Box>
                }
              />
            </ListItem>
            {index < deadlines.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
      
      <Box sx={{ 
        p: 2, 
        borderTop: '1px solid', 
        borderColor: 'divider',
        mt: 'auto',
        textAlign: 'center'
      }}>
        <Button 
          variant="text" 
          color="primary"
          sx={{ fontWeight: 500 }}
        >
          View All Deadlines
        </Button>
      </Box>
    </Paper>
  );
};

export default UpcomingDeadlines;