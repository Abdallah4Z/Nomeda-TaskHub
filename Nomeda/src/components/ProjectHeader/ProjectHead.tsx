import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
  IconButton,
  Tooltip,
  SelectChangeEvent,
  Divider,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ListIcon from '@mui/icons-material/List';
import FolderIcon from '@mui/icons-material/Folder';
import DashboardIcon from '@mui/icons-material/Dashboard';
interface ProjectHeaderProps {
  projectName: string;
  onEdit: () => void;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ projectName, onEdit }) => {
  // State to manage filter values
  const [dueDateFilter, setDueDateFilter] = useState('all');
  const [assigneeFilter, setAssigneeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Handler for filter changes
  const handleFilterChange = (event: SelectChangeEvent, setState: (value: string) => void) => {
    setState(event.target.value);
  };

  // Tabs state
  const [tabValue, setTabValue] = useState(2); // "Board" tab is active by default

  return (
    <Box sx={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px',width:"100%"}}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginRight: '8px' }}>
            <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
              <Box component="span" sx={{ marginRight: '4px' }}>
                <Box component="span" sx={{ fontSize: '16px', color: '#000' }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' ,marginRight: '8px',marginLeft: '8px' ,fontSize:"25px"}}>
                Design Project
                </Typography>
                </Box>
              </Box>
              <IconButton onClick={onEdit} size="small">
                <EditIcon fontSize="medium" />
              </IconButton>
            </Box>
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tooltip title="User" sx={{ marginRight: '-30px'}}>
            <Avatar alt="Profile" src="https://source.unsplash.com/random/30x30/?avatar" />
          </Tooltip>
          <Tooltip title="Profile">
            <Avatar alt="User Profile" src="https://source.unsplash.com/random/30x30/?avatar" />
          </Tooltip>
          <Typography variant="body2" sx={{ fontWeight: 'bold' ,color:"grey",marginRight: '8px',marginLeft: '8px' ,opacity:0.5,fontSize:"25px"}}>
          |
          </Typography>
          <Button variant="outlined" size="small">
            Share
          </Button>
          <Button variant="outlined" size="small">
            Automation
          </Button>
        </Box>
      </Box>

      <Box sx={{marginBottom: '15px'}}>
      <Tabs value={tabValue} onChange={(e, value) => setTabValue(value)} aria-label="basic tabs example">
          {/* Overview Tab */}
          <Tab
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <DashboardIcon fontSize="small" />
                <span>Overview</span>
              </Box>
            }
            value={0}
          />

          {/* List Tab */}
          <Tab
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ListIcon fontSize="small" />
                <span>List</span>
              </Box>
            }
            value={1}
          />

          {/* Board Tab */}
          <Tab
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ViewModuleIcon fontSize="small" />
                <span>Board</span>
              </Box>
            }
            value={2}
            sx={{ color: tabValue === 2 ? '#007bff' : undefined }}
          />

          {/* Calendar Tab */}
          <Tab
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CalendarMonthIcon fontSize="small" />
                <span>Calendar</span>
              </Box>
            }
            value={3}
          />

          {/* Files Tab */}
          <Tab
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <FolderIcon fontSize="small" />
                <span>Files</span>
              </Box>
            }
            value={4}
          />
        </Tabs>

      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px' }}>
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
    </Box>
  );
};

export default ProjectHeader;