import React from 'react';
import { Box, Typography } from '@mui/material';

const CalendarView = () => (
  <Box sx={{ height: '100%' }}>
    <Typography variant="h6">Calendar View</Typography>
    <Typography paragraph>
      This is the calendar view. You can see tasks organized by dates and
      deadlines.
    </Typography>
  </Box>
);

export default CalendarView;