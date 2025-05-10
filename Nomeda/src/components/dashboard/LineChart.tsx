import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Select, MenuItem, Typography } from '@mui/material';

const TaskCompletionChart = () => {
  const [duration, setDuration] = useState<string>('month');
  
  // Mocked task data for the sake of this example
  const [tasksData, setTasksData] = useState<any>([
    { name: 'Jan', completedTasks: 10 },
    { name: 'Feb', completedTasks: 12 },
    { name: 'Mar', completedTasks: 9 },
    { name: 'Apr', completedTasks: 15 },
    { name: 'May', completedTasks: 22 },
    { name: 'Jun', completedTasks: 18 },
    { name: 'Jul', completedTasks: 23 },
    { name: 'Aug', completedTasks: 26 },
    { name: 'Sep', completedTasks: 30 },
    { name: 'Oct', completedTasks: 27 },
    { name: 'Nov', completedTasks: 33 },
    { name: 'Dec', completedTasks: 40 },
  ]);

  const handleDurationChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedDuration = event.target.value as string;
    setDuration(selectedDuration);

    if (selectedDuration === 'week') {
      setTasksData([
        { name: 'Sun', completedTasks: 3 },
        { name: 'Mon', completedTasks: 2 },
        { name: 'Tue', completedTasks: 5 },
        { name: 'Wed', completedTasks: 4 },
        { name: 'Thu', completedTasks: 6 },
        { name: 'Fri', completedTasks: 7 },
        { name: 'Sat', completedTasks: 3 },
      ]);
    } else if (selectedDuration === 'month') {
      setTasksData([
        { name: 'Jan', completedTasks: 10 },
        { name: 'Feb', completedTasks: 12 },
        { name: 'Mar', completedTasks: 9 },
        { name: 'Apr', completedTasks: 15 },
        { name: 'May', completedTasks: 22 },
        { name: 'Jun', completedTasks: 18 },
        { name: 'Jul', completedTasks: 23 },
        { name: 'Aug', completedTasks: 26 },
        { name: 'Sep', completedTasks: 30 },
        { name: 'Oct', completedTasks: 27 },
        { name: 'Nov', completedTasks: 33 },
        { name: 'Dec', completedTasks: 40 },
      ]);
    } else if (selectedDuration === '6months') {
      setTasksData([
        { name: 'Jan', completedTasks: 15 },
        { name: 'Feb', completedTasks: 18 },
        { name: 'Mar', completedTasks: 25 },
        { name: 'Apr', completedTasks: 30 },
        { name: 'May', completedTasks: 20 },
        { name: 'Jun', completedTasks: 35 },
      ]);
    } else if (selectedDuration === 'year') {
      setTasksData([
        { name: '2023', completedTasks: 150 },
        { name: '2024', completedTasks: 200 },
      ]);
    }
  };

  return (
    <Box className="linechart-container">
      <Typography variant="h6">
        Task Completion Over Time
      </Typography>

      <Select size='small' value={duration} onChange={handleDurationChange} fullWidth>
        <MenuItem value="week">This Week</MenuItem>
        <MenuItem value="month">This Month</MenuItem>
        <MenuItem value="6months">Last 6 Months</MenuItem>
        <MenuItem value="year">Last Year</MenuItem>
      </Select>
      <Box className="chart-container">

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={tasksData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="completedTasks"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default TaskCompletionChart;
