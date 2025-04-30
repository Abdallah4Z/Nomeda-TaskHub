// src/components/Calendar/DayViewGrid.tsx
import React from 'react';
import { Box, Typography, Stack, Chip, Avatar, Grid } from '@mui/material';
import { CalendarDay } from './types';

interface DayViewGridProps {
  day: CalendarDay;
  priorityColors: Record<string, string>;
  statusColors: Record<string, string>;
}

const DayViewGrid: React.FC<DayViewGridProps> = ({
  day,
  priorityColors,
  statusColors,
}) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {new Date(day.date).toDateString()}
      </Typography>

      <Grid container spacing={2}>
        {day.tasks.length === 0 ? (
          <Typography color="text.secondary" sx={{ gridColumn: 'span 4' }}>
            No tasks for this day.
          </Typography>
        ) : (
          day.tasks.map((task) => (
            <Grid item xs={3} key={task.id}>
              <Box
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  bgcolor: '#ededed',
                  borderLeft: `4px solid ${priorityColors[task.priority]}`,
                  height: 150, // fixed height for square shape
                  justifyContent: 'space-between',
                  boxSizing: 'border-box',
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold" noWrap>
                  {task.title}
                </Typography>

                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip
                    label={task.status}
                    size="small"
                    sx={{
                      bgcolor: statusColors[task.status],
                      color: '#fff',
                    }}
                  />
                  <Chip label={task.category} size="small" />
                </Stack>

                {task.assignee && (
                  <Stack direction="row" spacing={1} alignItems="center">
                    {task.assignee.avatarUrl && (
                      <Avatar
                        src={task.assignee.avatarUrl}
                        alt={task.assignee.name}
                        sx={{ width: 24, height: 24 }}
                      />
                    )}
                    <Typography variant="body2" noWrap>
                      {task.assignee.name}
                    </Typography>
                  </Stack>
                )}
              </Box>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default DayViewGrid;
