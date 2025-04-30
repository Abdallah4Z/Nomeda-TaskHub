import { Task, CalendarDay } from './types';

export const generateMockTasks = (): Task[] => {
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

const filterTasksByDate = (tasks: Task[], date: Date): Task[] => {
  return tasks.filter(task => {
    const taskDate = new Date(task.dueDate);
    return taskDate.getDate() === date.getDate() &&
           taskDate.getMonth() === date.getMonth() &&
           taskDate.getFullYear() === date.getFullYear();
  });
};

export const generateCalendarDays = (year: number, month: number, tasks: Task[]): CalendarDay[] => {
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
      tasks: filterTasksByDate(tasks, date)
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
      tasks: filterTasksByDate(tasks, date)
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
      tasks: filterTasksByDate(tasks, date)
    });
  }
  
  return calendarDays;
};

export const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

export const getMonthYearDisplay = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });
};

export const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];