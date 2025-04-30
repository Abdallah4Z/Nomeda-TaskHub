import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

interface CalendarFooterProps {
  priorityColors: Record<string, string>;
  statusColors: Record<string, string>;
  taskCount: number;
  monthYearDisplay: string;
}

const CalendarFooter: React.FC<CalendarFooterProps> = ({
  priorityColors,
  statusColors,
  taskCount,
  monthYearDisplay
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ 
      p: 2, 
      borderTop: '1px solid', 
      borderColor: 'divider',
      bgcolor: theme.palette.background.default,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ 
            width: 12, 
            height: 12, 
            borderRadius: '50%', 
            bgcolor: priorityColors.high,
            mr: 1
          }} />
          <Typography variant="caption">High Priority</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ 
            width: 12, 
            height: 12, 
            borderRadius: '50%', 
            bgcolor: statusColors.completed,
            mr: 1
          }} />
          <Typography variant="caption">Completed</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ 
            width: 12, 
            height: 12, 
            borderRadius: '50%', 
            bgcolor: statusColors['in-progress'],
            mr: 1
          }} />
          <Typography variant="caption">In Progress</Typography>
        </Box>
      </Box>
      
      <Typography variant="caption" color="text.secondary">
        Showing {taskCount} tasks for {monthYearDisplay}
      </Typography>
    </Box>
  );
};

export default CalendarFooter;