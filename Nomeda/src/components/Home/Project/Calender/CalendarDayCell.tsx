import React from 'react';
import { Box, Typography, Paper, Badge, useTheme, alpha } from '@mui/material';
import { CalendarDay } from './types';
import TaskItem from './TaskItem';

interface CalendarDayCellProps {
  day: CalendarDay;
  priorityColors: Record<string, string>;
  statusColors: Record<string, string>;
}

const CalendarDayCell: React.FC<CalendarDayCellProps> = ({ day, priorityColors, statusColors }) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{ 
        p: 1.5,
        height: 150,
        bgcolor: day.isToday 
          ? alpha(theme.palette.primary.main, 0.05)
          : day.isCurrentMonth 
            ? 'background.paper'
            : alpha(theme.palette.action.disabledBackground, 0.3),
        border: '1px solid',
        borderColor: day.isToday 
          ? 'primary.main' 
          : 'divider',
        borderRadius: 2,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          transform: 'translateY(-2px)'
        }
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 1
      }}>
        <Typography 
          variant="subtitle2"
          sx={{ 
            fontWeight: day.isToday ? 600 : day.isCurrentMonth ? 500 : 400,
            color: !day.isCurrentMonth ? 'text.disabled' : 'text.primary',
            fontSize: '0.9rem'
          }}
        >
          {day.date.getDate()}
        </Typography>
        
        {day.tasks.length > 0 && (
          <Badge 
            badgeContent={day.tasks.length} 
            color="primary"
            sx={{ 
              '& .MuiBadge-badge': {
                fontSize: '0.7rem',
                height: 18,
                minWidth: 18
              }
            }}
          />
        )}
      </Box>
      
      <Box sx={{ 
        overflow: 'auto',
        flex: 1,
        '&::-webkit-scrollbar': { 
          width: 4 
        },
        '&::-webkit-scrollbar-thumb': { 
          backgroundColor: alpha(theme.palette.primary.main, 0.2),
          borderRadius: 2
        },
        '&::-webkit-scrollbar-track': { 
          backgroundColor: alpha(theme.palette.primary.main, 0.05)
        }
      }}>
        {day.tasks.slice(0, 3).map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            priorityColors={priorityColors} 
            statusColors={statusColors} 
          />
        ))}
        
        {day.tasks.length > 3 && (
          <Typography 
            variant="caption" 
            sx={{ 
              display: 'block',
              color: 'text.secondary',
              textAlign: 'center',
              mt: 0.5,
              fontSize: '0.75rem',
              fontWeight: 500
            }}
          >
            +{day.tasks.length - 3} more
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default CalendarDayCell;