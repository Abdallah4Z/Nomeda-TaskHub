import React from 'react';
import { Box, Typography, alpha } from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { Task } from './types';
import { truncateText } from './calendarUtils';

interface TaskItemProps {
  task: Task;
  priorityColors: Record<string, string>;
  statusColors: Record<string, string>;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, priorityColors, statusColors }) => {
  return (
    <Box
      sx={{ 
        mb: 0.5,
        p: 0.75,
        borderRadius: 1,
        bgcolor: alpha(statusColors[task.status], 0.1),
        borderLeft: '3px solid',
        borderColor: priorityColors[task.priority],
        cursor: 'pointer',
        '&:hover': {
          bgcolor: alpha(statusColors[task.status], 0.2)
        }
      }}
    >
      <Typography 
        variant="caption" 
        sx={{ 
          fontWeight: 500,
          display: 'block',
          lineHeight: 1.2
        }}
      >
        {truncateText(task.title, 20)}
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        mt: 0.5
      }}>
        {task.status === 'completed' && (
          <CheckCircleIcon 
            sx={{ 
              fontSize: 12, 
              color: statusColors[task.status],
              mr: 0.5
            }} 
          />
        )}
        <Typography 
          variant="caption" 
          sx={{ 
            color: 'text.secondary',
            fontSize: '0.7rem'
          }}
        >
          {task.category}
        </Typography>
      </Box>
    </Box>
  );
};

export default TaskItem;