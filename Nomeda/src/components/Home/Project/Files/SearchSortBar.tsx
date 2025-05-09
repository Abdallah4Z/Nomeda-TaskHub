import React from 'react';
import { Box, TextField, Button, Menu, MenuItem, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';

interface SearchSortBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  sortBy: string;
  sortDirection: string;
  onSortChange: (field: string) => void;
}

const SearchSortBar: React.FC<SearchSortBarProps> = ({ 
  searchTerm, 
  onSearchChange, 
  sortBy, 
  sortDirection, 
  onSortChange 
}) => {
  const [sortAnchorEl, setSortAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleSortClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  const handleSort = (field: string) => {
    onSortChange(field);
    handleSortClose();
  };

  return (
    <Box sx={{ display: 'flex', mb: 3 }}>
      <TextField
        fullWidth
        placeholder="Search files or projects..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
        size="small"
        sx={{ mr: 2 }}
      />
      
      <Button 
        variant="outlined" 
        startIcon={<SortIcon />}
        onClick={handleSortClick}
      >
        Sort
      </Button>
      
      <Menu
        anchorEl={sortAnchorEl}
        open={Boolean(sortAnchorEl)}
        onClose={handleSortClose}
      >
        <MenuItem onClick={() => handleSort('name')}>
          Name {sortBy === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
        </MenuItem>
        <MenuItem onClick={() => handleSort('date')}>
          Date {sortBy === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
        </MenuItem>
        <MenuItem onClick={() => handleSort('type')}>
          Type {sortBy === 'type' && (sortDirection === 'asc' ? '↑' : '↓')}
        </MenuItem>
        <MenuItem onClick={() => handleSort('project')}>
          Project {sortBy === 'project' && (sortDirection === 'asc' ? '↑' : '↓')}
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default SearchSortBar;