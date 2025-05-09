import React from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';

interface TodoFiltersProps {
  filterStatus: 'all' | 'completed' | 'pending';
  setFilterStatus: React.Dispatch<React.SetStateAction<'all' | 'completed' | 'pending'>>;
  filterPriority: string;
  setFilterPriority: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const TodoFilters: React.FC<TodoFiltersProps> = ({
  filterStatus,
  setFilterStatus,
  filterPriority,
  setFilterPriority,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid sx={{ width: { xs: '100%', sm: '33.33%' } }}>
        <FormControl fullWidth>
          <InputLabel>Filter Status</InputLabel>
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'completed' | 'pending')}
            label="Filter Status"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid sx={{ width: { xs: '100%', sm: '33.33%' } }}>
        <FormControl fullWidth>
          <InputLabel>Filter Priority</InputLabel>
          <Select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            label="Filter Priority"
          >
            <MenuItem value="all">All Priorities</MenuItem>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid sx={{ width: { xs: '100%', sm: '33.33%' } }}>
        <TextField
          fullWidth
          placeholder="Search todos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1 }} />,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default TodoFilters;