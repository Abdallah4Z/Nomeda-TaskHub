import React from 'react';
import { 
  Paper, 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  Divider,
  Button,
  useTheme 
} from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FeedbackIcon from '@mui/icons-material/Feedback';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

interface ActivityItem {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  task: string;
  time: string;
  type: 'create' | 'update' | 'complete' | 'comment' | 'assign';
}

const RecentActivities: React.FC = () => {
  const theme = useTheme();
  
  // Mock data - in a real app, this would come from your state/API
  const activities: ActivityItem[] = [
    {
      id: 1,
      user: { name: 'Jane Smith', avatar: '/static/avatar1.jpg' },
      action: 'completed',
      task: 'Update dashboard UI components',
      time: '10 minutes ago',
      type: 'complete'
    },
    {
      id: 2,
      user: { name: 'John Doe', avatar: '/static/avatar2.jpg' },
      action: 'commented on',
      task: 'API integration with backend services',
      time: '1 hour ago',
      type: 'comment'
    },
    {
      id: 3,
      user: { name: 'Emily Davis', avatar: '/static/avatar4.jpg' },
      action: 'created',
      task: 'Implement authentication flow',
      time: '3 hours ago',
      type: 'create'
    },
    {
      id: 4,
      user: { name: 'Michael Wilson', avatar: '/static/avatar5.jpg' },
      action: 'updated',
      task: 'Fix cross-browser compatibility issues',
      time: '5 hours ago',
      type: 'update'
    },
    {
      id: 5,
      user: { name: 'Robert Johnson', avatar: '/static/avatar3.jpg' },
      action: 'assigned',
      task: 'Optimize database queries',
      time: 'Yesterday',
      type: 'assign'
    }
  ];

  // Map activity types to icons and colors
  const activityConfig = {
    create: { icon: <AddTaskIcon fontSize="small" />, color: theme.palette.info.main },
    update: { icon: <EditIcon fontSize="small" />, color: theme.palette.warning.main },
    complete: { icon: <CheckCircleIcon fontSize="small" />, color: theme.palette.success.main },
    comment: { icon: <FeedbackIcon fontSize="small" />, color: theme.palette.secondary.main },
    assign: { icon: <DoubleArrowIcon fontSize="small" />, color: theme.palette.primary.main }
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
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6">Recent Activities</Typography>
      </Box>

      <List sx={{ p: 0, overflow: 'auto', maxHeight: 350 }}>
        {activities.map((activity, index) => (
          <React.Fragment key={activity.id}>
            <ListItem alignItems="flex-start" sx={{ py: 2, px: 2 }}>
              <ListItemAvatar>
                <Avatar 
                  src={activity.user.avatar}
                  alt={activity.user.name}
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    border: '2px solid',
                    borderColor: activityConfig[activity.type].color
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0.5 }}>
                    <Typography variant="subtitle2" component="span">
                      {activity.user.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="span">
                      {activity.action}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      component="span"
                      sx={{ 
                        color: activityConfig[activity.type].color,
                        fontWeight: 500
                      }}
                    >
                      {activity.task}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                    <Chip
                      icon={activityConfig[activity.type].icon}
                      label={activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                      size="small"
                      sx={{ 
                        backgroundColor: `${activityConfig[activity.type].color}15`,
                        color: activityConfig[activity.type].color,
                        fontWeight: 500,
                        mr: 1
                      }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {activity.time}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
            {index < activities.length - 1 && (
              <Divider variant="inset" component="li" />
            )}
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
          View All Activities
        </Button>
      </Box>
    </Paper>
  );
};

export default RecentActivities;