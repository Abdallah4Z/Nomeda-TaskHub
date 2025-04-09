import React from 'react';
import { Box, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const FilterControls = ({ 
  dueDateFilter, 
  assigneeFilter, 
  priorityFilter, 
  setDueDateFilter, 
  setAssigneeFilter, 
  setPriorityFilter 
}) => {
  const handleFilterChange = (event, setState) => {
    setState(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', pb: 2, pt:2 }}>
      <FormControl size="small">
        <InputLabel>Due Date</InputLabel>
        <Select
          value={dueDateFilter}
          onChange={(event) => handleFilterChange(event, setDueDateFilter)}
          label="Due Date"
          sx={{ minWidth: '120px' }}
        >
          <MenuItem value="all">All Dates</MenuItem>
          <MenuItem value="upcoming">Upcoming</MenuItem>
          <MenuItem value="overdue">Overdue</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small">
        <InputLabel>Assignee</InputLabel>
        <Select
          value={assigneeFilter}
          onChange={(event) => handleFilterChange(event, setAssigneeFilter)}
          label="Assignee"
          sx={{ minWidth: '120px' }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="john">John</MenuItem>
          <MenuItem value="jane">Jane</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small">
        <InputLabel>Priority</InputLabel>
        <Select
          value={priorityFilter}
          onChange={(event) => handleFilterChange(event, setPriorityFilter)}
          label="Priority"
          sx={{ minWidth: '120px' }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="normal">Normal</MenuItem>
        </Select>
      </FormControl>

      <Button variant="outlined" size="small">
        Advanced Filters
      </Button>

      <Button variant="contained" color="primary" sx={{ marginLeft: 'auto' }}>
        <AddIcon fontSize="small" /> Add New
      </Button>
    </Box>
  );
};

export default FilterControls;