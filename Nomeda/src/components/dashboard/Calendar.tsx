import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import '../../style/dashboard.css'; 

interface CalendarProps {
  currentMonth: number;
  currentYear: number;
  onChangeMonth: (newMonth: number, newYear: number) => void;
}

function Calendar({ currentMonth, currentYear, onChangeMonth }: CalendarProps) {
  const getFirstDayOfMonth = (month: number, year: number): number => {
    return new Date(year, month, 1).getDay();
  };

  const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);

  const handlePrevMonth = () => {
    let newMonth, newYear;
    
    if (currentMonth === 0) { 
      newMonth = 11;
      newYear = currentYear - 1;
    } else {
      newMonth = currentMonth - 1;
      newYear = currentYear;
    }
    
    onChangeMonth(newMonth, newYear);
  };

  const handleNextMonth = () => {
    let newMonth, newYear;
    
    if (currentMonth === 11) { 
      newMonth = 0; 
      newYear = currentYear + 1;
    } else {
      newMonth = currentMonth + 1;
      newYear = currentYear;
    }
    
    onChangeMonth(newMonth, newYear);
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const renderCalendarDays = () => {
    const days = [];
    
    daysOfWeek.forEach(day => {
      days.push(
        <Typography key={`header-${day}`} className="calendar-day calendar-day-header">
          {day}
        </Typography>
      );
    });
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <Box key={`empty-${i}`} className="calendar-date" style={{ backgroundColor: 'transparent' }}>
          <Typography></Typography>
        </Box>
      );
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = 
        day === new Date().getDate() && 
        currentMonth === new Date().getMonth() && 
        currentYear === new Date().getFullYear();
      
      days.push(
        <Box 
          key={`day-${day}`} 
          className="calendar-date"
          style={isToday ? {border: '2px solid #762f2f' } : {}}
        >
          <Typography>{day}</Typography>
        </Box>
      );
    }
    
    return days;
  };

  console.log(`Current Month: ${currentMonth}, Current Year: ${currentYear}`);

  return (
    <Box className="calendar-container">
      <Box className="calendar-header">
        <IconButton onClick={handlePrevMonth} size="small">
          <ArrowBackIosIcon fontSize="small" />
        </IconButton>
        <Typography variant="h6">{`${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`}</Typography>
        <IconButton onClick={handleNextMonth} size="small">
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box className="calendar-grid">
        {renderCalendarDays()}
      </Box>
    </Box>
  );
}

export default Calendar;