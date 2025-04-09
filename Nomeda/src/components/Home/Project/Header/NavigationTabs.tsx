import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ListIcon from '@mui/icons-material/List';
import FolderIcon from '@mui/icons-material/Folder';
import DashboardIcon from '@mui/icons-material/Dashboard';

const NavigationTabs = ({ tabValue, setTabValue }) => (
  <Tabs value={tabValue} onChange={(e, value) => setTabValue(value)} aria-label="project tabs" >
    <Tab 
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px'}}>
          <DashboardIcon fontSize="small" />
          <span>Overview</span>
        </Box>
      }
      value={0}
    
    />
    <Tab
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <ListIcon fontSize="small" />
          <span>List</span>
        </Box>
      }
      value={1}
    />
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
    <Tab
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <CalendarMonthIcon fontSize="small" />
          <span>Calendar</span>
        </Box>
      }
      value={3}
    />
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
);

export default NavigationTabs;