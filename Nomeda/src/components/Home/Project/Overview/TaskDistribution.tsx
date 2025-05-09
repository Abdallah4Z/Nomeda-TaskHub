import React from 'react';
import { 
  Paper, 
  Box, 
  Typography, 
  useTheme,
  IconButton,
  Divider,
  Grid
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ScheduleIcon from '@mui/icons-material/Schedule';

interface TaskDistributionProps {
  distribution: {
    completed: number;
    inProgress: number;
    pending: number;
  };
}

const TaskDistribution: React.FC<TaskDistributionProps> = ({ distribution }) => {
  const theme = useTheme();
  const total = distribution.completed + distribution.inProgress + distribution.pending;
  
  // Calculate percentages
  const completedPercentage = Math.round((distribution.completed / total) * 100);
  const inProgressPercentage = Math.round((distribution.inProgress / total) * 100);
  const pendingPercentage = Math.round((distribution.pending / total) * 100);
  
  // Colors for the status
  const statusColors = {
    completed: theme.palette.success.main,
    inProgress: theme.palette.warning.main,
    pending: theme.palette.grey[400]
  };

  // Status data for rendering
  const statusData = [
    {
      label: 'Completed',
      value: distribution.completed,
      percentage: completedPercentage,
      color: statusColors.completed,
      icon: <CheckCircleOutlineIcon fontSize="small" />
    },
    {
      label: 'In Progress',
      value: distribution.inProgress,
      percentage: inProgressPercentage,
      color: statusColors.inProgress,
      icon: <HourglassEmptyIcon fontSize="small" />
    },
    {
      label: 'Pending',
      value: distribution.pending,
      percentage: pendingPercentage,
      color: statusColors.pending,
      icon: <ScheduleIcon fontSize="small" />
    }
  ];
  
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
        borderColor: 'divider'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Task Distribution</Typography>
        <IconButton size="small">
          <MoreVertIcon />
        </IconButton>
      </Box>
      
      {/* Progress Bar */}
      <Box sx={{ display: 'flex', height: 20, borderRadius: 1, overflow: 'hidden', mb: 3 }}>
        {statusData.map((status, index) => (
          <Box 
            key={index}
            sx={{ 
              width: `${status.percentage}%`, 
              bgcolor: status.color,
              transition: 'width 0.5s ease'
            }}
          />
        ))}
      </Box>
      
      <Grid container spacing={2}>
        {statusData.map((status, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Box sx={{ textAlign: 'center', p: 1 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mb: 1 
              }}>
                <Box sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
                  bgcolor: `${status.color}20`,
                  color: status.color,
                  borderRadius: '50%',
                  mr: 1
                }}>
                  {status.icon}
                </Box>
                <Typography variant="subtitle2">{status.label}</Typography>
              </Box>
              
              <Typography variant="h4" sx={{ fontWeight: 600, color: status.color }}>
                {status.value}
              </Typography>
              
              <Typography variant="body2" color="text.secondary">
                {status.percentage}% of total
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      
      <Divider sx={{ my: 2 }} />
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Task Distribution Analysis
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {completedPercentage > 50 
            ? 'Great progress! More than half of the tasks are completed.' 
            : 'Still working on it. Less than half of the tasks are completed.'}
          {inProgressPercentage > 30 && ' Many tasks are actively being worked on.'}
        </Typography>
      </Box>
    </Paper>
  );
};

export default TaskDistribution;