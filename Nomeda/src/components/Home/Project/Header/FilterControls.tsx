import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import TaskDialog from './TaskDialog';
import useTasks from '../../../../hooks/useTasks';

const FilterControls = ({
  dueDateFilter,
  assigneeFilter,
  priorityFilter,
  setDueDateFilter,
  setAssigneeFilter,
  setPriorityFilter,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const { tasks, loading } = useTasks();
  const [localTasks, setLocalTasks] = useState(tasks);

  const handleFilterChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleAddTask = (newTask) => {
    setLocalTasks((prev) => [...prev, newTask]);
  };

  return (
    <Box sx={{ pb: 2, pt: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Due Date</InputLabel>
          <Select
            value={dueDateFilter}
            onChange={handleFilterChange(setDueDateFilter)}
            label="Due Date"
          >
            <MenuItem value="all">All Dates</MenuItem>
            <MenuItem value="upcoming">Upcoming</MenuItem>
            <MenuItem value="overdue">Overdue</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Assignee</InputLabel>
          <Select
            value={assigneeFilter}
            onChange={handleFilterChange(setAssigneeFilter)}
            label="Assignee"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="john">John</MenuItem>
            <MenuItem value="jane">Jane</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={priorityFilter}
            onChange={handleFilterChange(setPriorityFilter)}
            label="Priority"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="normal">Normal</MenuItem>
            <MenuItem value="low">Low</MenuItem>
          </Select>
        </FormControl>

        <Button variant="outlined" size="small">
          Advanced Filters
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Add New
        </Button>
      </Stack>

      <TaskDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onAddTask={handleAddTask}
      />
    </Box>
  );
};

export default FilterControls;
