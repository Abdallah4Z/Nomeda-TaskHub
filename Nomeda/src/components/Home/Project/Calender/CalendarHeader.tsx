// CalendarHeader.tsx
import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Button,
  useTheme,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Today as TodayIcon,
  ViewDay as ViewDayIcon,
  ViewWeek as ViewWeekIcon,
  ViewModule as ViewModuleIcon,
  FilterList as FilterListIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { ViewType } from './types';
import { getMonthYearDisplay } from './calendarUtils';

interface CalendarHeaderProps {
  currentDate: Date;
  viewType: ViewType;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onGoToday: () => void;
  onViewChange: (event: React.SyntheticEvent, newValue: ViewType) => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  viewType,
  onPrevMonth,
  onNextMonth,
  onGoToday,
  onViewChange,
}) => {
  const theme = useTheme();
  const monthYearDisplay = getMonthYearDisplay(currentDate);

  return (
    <Box 
      sx={{ 
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: theme.palette.background.default
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={onGoToday} size="small" sx={{ mr: 1 }}>
          <TodayIcon />
        </IconButton>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={onPrevMonth} size="small">
            <ChevronLeftIcon />
          </IconButton>
          
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 500, 
              mx: 2,
              minWidth: 180,
              textAlign: 'center' 
            }}
          >
            {monthYearDisplay}
          </Typography>
          
          <IconButton onClick={onNextMonth} size="small">
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tabs 
          value={viewType}
          onChange={onViewChange}
          sx={{ mr: 2 }}
        >
          <Tab 
            label="Month" 
            value="month"
            icon={<ViewModuleIcon fontSize="small" />}
            iconPosition="start"
          />
          <Tab 
            label="Week" 
            value="week"
            icon={<ViewWeekIcon fontSize="small" />}
            iconPosition="start"
          />
          <Tab 
            label="Day" 
            value="day"
            icon={<ViewDayIcon fontSize="small" />}
            iconPosition="start"
          />
        </Tabs>
        
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          size="small"
          sx={{ mr: 1 }}
        >
          Filter
        </Button>
        
        <IconButton size="small">
          <SearchIcon />
        </IconButton>
        
        <IconButton size="small">
          <MoreVertIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CalendarHeader;