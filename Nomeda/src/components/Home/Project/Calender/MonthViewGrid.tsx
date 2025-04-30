import React from 'react';
import { Grid, Typography } from '@mui/material';
import { CalendarDay } from './types';
import CalendarDayCell from './CalendarDayCell';
import { DAY_NAMES } from './calendarUtils';

interface MonthViewGridProps {
  calendarDays: CalendarDay[];
  priorityColors: Record<string, string>;
  statusColors: Record<string, string>;
}

const MonthViewGrid: React.FC<MonthViewGridProps> = ({
  calendarDays,
  priorityColors,
  statusColors
}) => {
  return (
    <>
      {/* Day Names */}
      <Grid container spacing={1} sx={{ mb: 1 }}>
        {DAY_NAMES.map((day, index) => (
          <Grid item key={index} xs={12/7}>
            <Typography 
              align="center" 
              variant="subtitle2" 
              sx={{ 
                color: 'text.main',
                fontWeight: 500
              }}
              width={170}
            >
              {day}
            </Typography>
          </Grid>
        ))}
      </Grid>
      
      {/* Calendar Days */}
      <Grid container spacing={1}>
        {calendarDays.map((day, index) => (
          <Grid item key={index} xs={12/7}>
            <CalendarDayCell 
              day={day} 
              priorityColors={priorityColors} 
              statusColors={statusColors} 
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default MonthViewGrid;