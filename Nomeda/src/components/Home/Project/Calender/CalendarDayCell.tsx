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
        p: 1,
        height: 150,
        width: '170px',
        bgcolor: day.isToday 
          ? alpha(theme.palette.primary.main, 0.05)
          : day.isCurrentMonth 
            ? 'background.paper'
            : alpha(theme.palette.action.disabledBackground, 0.5),
        border: '1px solid',
        borderColor: day.isToday 
          ? 'primary.main' 
          : 'divider',
        borderRadius: 1,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 0.5
      }}>
        <Typography 
          variant="subtitle2"
          sx={{ 
            fontWeight: day.isToday ? 'bold' : day.isCurrentMonth ? 'medium' : 'normal',
            color: !day.isCurrentMonth ? 'text.disabled' : 'text.primary'
          }}
        >
          {day.date.getDate()}
        </Typography>
        
        {day.tasks.length > 0 && (
          <Badge 
            badgeContent={day.tasks.length} 
            color="primary"
            variant="dot"
            sx={{ '.MuiBadge-dot': { right: 2, top: 2 } }}
          />
        )}
      </Box>
      
      <Box sx={{ 
        overflow: 'auto',
        flex: 1,
        '&::-webkit-scrollbar': { width: 4 },
        '&::-webkit-scrollbar-thumb': { backgroundColor: 'divider', borderRadius: 2 }
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
              textAlign: 'center'
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