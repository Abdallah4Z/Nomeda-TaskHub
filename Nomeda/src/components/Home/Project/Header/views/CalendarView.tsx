import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  IconButton,
  Divider,
  Chip,
  Tabs,
  Tab,
  Badge,
  useTheme,
  alpha
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Today as TodayIcon,
  Event as EventIcon,
  ViewDay as ViewDayIcon,
  ViewWeek as ViewWeekIcon,
  ViewModule as ViewModuleIcon,
  FilterList as FilterListIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  CheckCircle as CheckCircleIcon,
  Flag as FlagIcon
} from '@mui/icons-material';
import PageContainer from '../../Overview/PageContainer';

// Interfaces
interface Task {
  id: number;
  title: string;
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
  status: 'completed' | 'in-progress' | 'pending';
  category?: string;
  assignee?: string;
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  tasks: Task[];
}

// Mock data - in a real app, this would come from your API/state management
const generateMockTasks = (): Task[] => {
  const today = new Date();
  const tasks: Task[] = [];
  
  // Generate tasks for the next 30 days
  for (let i = 0; i < 45; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i - 15); // Some tasks in the past, some in the future
    
    // Skip some days to make the calendar look more realistic
    if (Math.random() > 0.3) {
      const taskCount = Math.floor(Math.random() * 3) + 1; // 1-3 tasks per day
      
      for (let j = 0; j < taskCount; j++) {
        tasks.push({
          id: tasks.length + 1,
          title: `Task ${tasks.length + 1}`,
          dueDate: date,
          priority: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as 'high' | 'medium' | 'low',
          status: ['completed', 'in-progress', 'pending'][Math.floor(Math.random() * 3)] as 'completed' | 'in-progress' | 'pending',
          category: ['Development', 'Design', 'Marketing', 'Research'][Math.floor(Math.random() * 4)],
          assignee: ['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis'][Math.floor(Math.random() * 4)]
        });
      }
    }
  }
  
  return tasks;
};

// Function to generate calendar days for a month
const generateCalendarDays = (year: number, month: number, tasks: Task[]): CalendarDay[] => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  
  const calendarDays: CalendarDay[] = [];
  const today = new Date();
  
  // Add days from previous month to fill the first week
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevMonthYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = new Date(prevMonthYear, prevMonth + 1, 0).getDate();
  
  for (let i = 0; i < startingDayOfWeek; i++) {
    const date = new Date(prevMonthYear, prevMonth, daysInPrevMonth - startingDayOfWeek + i + 1);
    calendarDays.push({
      date,
      isCurrentMonth: false,
      isToday: false,
      tasks: tasks.filter(task => {
        const taskDate = new Date(task.dueDate);
        return taskDate.getDate() === date.getDate() &&
               taskDate.getMonth() === date.getMonth() &&
               taskDate.getFullYear() === date.getFullYear();
      })
    });
  }
  
  // Add days of current month
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    const isToday = 
      today.getDate() === date.getDate() &&
      today.getMonth() === date.getMonth() &&
      today.getFullYear() === date.getFullYear();
    
    calendarDays.push({
      date,
      isCurrentMonth: true,
      isToday,
      tasks: tasks.filter(task => {
        const taskDate = new Date(task.dueDate);
        return taskDate.getDate() === date.getDate() &&
               taskDate.getMonth() === date.getMonth() &&
               taskDate.getFullYear() === date.getFullYear();
      })
    });
  }
  
  // Add days from next month to complete the grid (always show 6 weeks)
  const remainingDays = 42 - calendarDays.length;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextMonthYear = month === 11 ? year + 1 : year;
  
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(nextMonthYear, nextMonth, i);
    calendarDays.push({
      date,
      isCurrentMonth: false,
      isToday: false,
      tasks: tasks.filter(task => {
        const taskDate = new Date(task.dueDate);
        return taskDate.getDate() === date.getDate() &&
               taskDate.getMonth() === date.getMonth() &&
               taskDate.getFullYear() === date.getFullYear();
      })
    });
  }
  
  return calendarDays;
};

const UpcomingCalendarView: React.FC = () => {
  const theme = useTheme();
  const tasks = generateMockTasks();
  
  // State for date management
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState<'month' | 'week' | 'day'>('month');
  
  // Generate calendar data
  const calendarDays = generateCalendarDays(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    tasks
  );
  
  // Priority color mapping
  const priorityColors = {
    high: theme.palette.error.main,
    medium: theme.palette.warning.main,
    low: theme.palette.success.main
  };
  
  // Status color mapping
  const statusColors = {
    completed: theme.palette.success.main,
    'in-progress': theme.palette.info.main,
    pending: theme.palette.grey[500]
  };
  
  // Navigate months
  const prevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };
  
  const nextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };
  
  const goToToday = () => {
    setCurrentDate(new Date());
  };
  
  // Handle view change
  const handleViewChange = (event: React.SyntheticEvent, newValue: 'month' | 'week' | 'day') => {
    setViewType(newValue);
  };
  
  // Get month and year display
  const monthYearDisplay = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });
  
  // Day names
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Helper function to truncate text
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };
  
  return (
    <PageContainer title="Upcoming Tasks Calendar">
      <Paper 
        elevation={0}
        sx={{ 
          p: 0,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Calendar Header */}
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
            <IconButton onClick={goToToday} size="small" sx={{ mr: 1 }}>
              <TodayIcon />
            </IconButton>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={prevMonth} size="small">
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
              
              <IconButton onClick={nextMonth} size="small">
                <ChevronRightIcon />
              </IconButton>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tabs 
              value={viewType}
              onChange={handleViewChange}
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
        
        {/* Calendar Grid */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
          {viewType === 'month' && (
            <>
              {/* Day Names */}
              <Grid container spacing={1} sx={{ mb: 1 }}>
                {dayNames.map((day, index) => (
                  <Grid item key={index} xs={12/7}>
                    <Typography 
                      align="center" 
                      variant="subtitle2" 
                      sx={{ 
                        color: 'text.secondary',
                        fontWeight: 500
                      }}
                    >
                      {day}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
              
              {/* Calendar Days */}
              <Grid container spacing={1}>
                {calendarDays.map((day, index) => (
                  <Grid item key={index} xs={12/7}>
                    <Paper
                      elevation={0}
                      sx={{ 
                        p: 1,
                        height: 150,
                        bgcolor: day.isToday 
                          ? alpha(theme.palette.primary.main, 0.05)
                          : day.isCurrentMonth 
                            ? 'background.paper'
                            : alpha(theme.palette.action.disabledBackground, 0.5),
                        border: '1px solid',
                        borderColor: day.isToday 
                          ? 'primary.main' 
                          : 'divider',
                        borderRadius: 1,
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        mb: 0.5
                      }}>
                        <Typography 
                          variant="subtitle2"
                          sx={{ 
                            fontWeight: day.isToday ? 'bold' : day.isCurrentMonth ? 'medium' : 'normal',
                            color: !day.isCurrentMonth ? 'text.disabled' : 'text.primary'
                          }}
                        >
                          {day.date.getDate()}
                        </Typography>
                        
                        {day.tasks.length > 0 && (
                          <Badge 
                            badgeContent={day.tasks.length} 
                            color="primary"
                            variant="dot"
                            sx={{ '.MuiBadge-dot': { right: 2, top: 2 } }}
                          />
                        )}
                      </Box>
                      
                      <Box sx={{ 
                        overflow: 'auto',
                        flex: 1,
                        '&::-webkit-scrollbar': { width: 4 },
                        '&::-webkit-scrollbar-thumb': { backgroundColor: 'divider', borderRadius: 2 }
                      }}>
                        {day.tasks.slice(0, 3).map(task => (
                          <Box
                            key={task.id}
                            sx={{ 
                              mb: 0.5,
                              p: 0.75,
                              borderRadius: 1,
                              bgcolor: alpha(statusColors[task.status], 0.1),
                              borderLeft: '3px solid',
                              borderColor: priorityColors[task.priority],
                              cursor: 'pointer',
                              '&:hover': {
                                bgcolor: alpha(statusColors[task.status], 0.2)
                              }
                            }}
                          >
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                fontWeight: 500,
                                display: 'block',
                                lineHeight: 1.2
                              }}
                            >
                              {truncateText(task.title, 20)}
                            </Typography>
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center',
                              mt: 0.5
                            }}>
                              {task.status === 'completed' && (
                                <CheckCircleIcon 
                                  sx={{ 
                                    fontSize: 12, 
                                    color: statusColors[task.status],
                                    mr: 0.5
                                  }} 
                                />
                              )}
                              <Typography 
                                variant="caption" 
                                sx={{ 
                                  color: 'text.secondary',
                                  fontSize: '0.7rem'
                                }}
                              >
                                {task.category}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                        
                        {day.tasks.length > 3 && (
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              display: 'block',
                              color: 'text.secondary',
                              textAlign: 'center'
                            }}
                          >
                            +{day.tasks.length - 3} more
                          </Typography>
                        )}
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
          
          {viewType === 'week' && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <EventIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6">Week View</Typography>
              <Typography variant="body2" color="text.secondary">
                Weekly view will show tasks organized by days of the current week
              </Typography>
            </Box>
          )}
          
          {viewType === 'day' && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <EventIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6">Day View</Typography>
              <Typography variant="body2" color="text.secondary">
                Daily view will show tasks organized by hours of the selected day
              </Typography>
            </Box>
          )}
        </Box>
        
        {/* Summary Footer */}
        <Box sx={{ 
          p: 2, 
          borderTop: '1px solid', 
          borderColor: 'divider',
          bgcolor: theme.palette.background.default,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ 
                width: 12, 
                height: 12, 
                borderRadius: '50%', 
                bgcolor: priorityColors.high,
                mr: 1
              }} />
              <Typography variant="caption">High Priority</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ 
                width: 12, 
                height: 12, 
                borderRadius: '50%', 
                bgcolor: statusColors.completed,
                mr: 1
              }} />
              <Typography variant="caption">Completed</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ 
                width: 12, 
                height: 12, 
                borderRadius: '50%', 
                bgcolor: statusColors['in-progress'],
                mr: 1
              }} />
              <Typography variant="caption">In Progress</Typography>
            </Box>
          </Box>
          
          <Typography variant="caption" color="text.secondary">
            Showing {tasks.length} tasks for {monthYearDisplay}
          </Typography>
        </Box>
      </Paper>
    </PageContainer>
  );
};

export default UpcomingCalendarView;