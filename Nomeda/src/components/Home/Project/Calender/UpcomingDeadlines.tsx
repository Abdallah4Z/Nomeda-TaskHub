import React, {useState} from 'react'
import {Paper, Box, useTheme} from '@mui/material'
import PageContainer from '../Overview/PageContainer'
import {ViewType} from './types'
import {
  generateMockTasks,
  generateCalendarDays,
  getMonthYearDisplay,
} from './calendarUtils'
import CalendarHeader from './CalendarHeader'
import MonthViewGrid from './MonthViewGrid'
import WeekViewGrid from './WeekViewGrid'
import PlaceholderView from './PlaceholderView'
import CalendarFooter from './CalendarFooter'
import DayViewGrid from './DayViewGrid'

const UpcomingCalendarView: React.FC = () => {
  const theme = useTheme()
  const tasks = generateMockTasks()

  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewType, setViewType] = useState<ViewType>('month')

  // Priority and status color mappings
  const priorityColors = {
    high: theme.palette.error.main,
    medium: theme.palette.warning.main,
    low: theme.palette.success.main,
  }

  const statusColors = {
    completed: theme.palette.success.main,
    'in-progress': theme.palette.info.main,
    pending: theme.palette.grey[500],
  }

  // Generate full month calendar days (used for month view)
  const calendarDays = generateCalendarDays(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    tasks,
  )

  // Generate current week's days (Sunday to Saturday)
  const getCurrentWeekDays = (date: Date) => {
    const startOfWeek = new Date(date)
    const dayOfWeek = startOfWeek.getDay() // 0 (Sun) to 6 (Sat)
    startOfWeek.setDate(date.getDate() - dayOfWeek)
    const weekDays: ReturnType<typeof generateCalendarDays> = []

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)

      const matchedDay = generateCalendarDays(
        day.getFullYear(),
        day.getMonth(),
        tasks,
      ).find(d => new Date(d.date).toDateString() === day.toDateString())

      if (matchedDay) {
        weekDays.push(matchedDay)
      }
    }

    return weekDays
  }

  const weekDays = getCurrentWeekDays(currentDate)

  // Dynamic display based on view type
  const monthYearDisplay = getMonthYearDisplay(currentDate)

  // Navigation handlers
  const prevPeriod = () => {
    const newDate = new Date(currentDate)
    if (viewType === 'month') {
      newDate.setMonth(newDate.getMonth() - 1)
    } else if (viewType === 'week') {
      newDate.setDate(newDate.getDate() - 7)
    } else if (viewType === 'day') {
      newDate.setDate(newDate.getDate() - 1)
    }
    setCurrentDate(newDate)
  }

  const nextPeriod = () => {
    const newDate = new Date(currentDate)
    if (viewType === 'month') {
      newDate.setMonth(newDate.getMonth() + 1)
    } else if (viewType === 'week') {
      newDate.setDate(newDate.getDate() + 7)
    } else if (viewType === 'day') {
      newDate.setDate(newDate.getDate() + 1)
    }
    setCurrentDate(newDate)
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const handleViewChange = (
    event: React.SyntheticEvent,
    newValue: ViewType,
  ) => {
    setViewType(newValue)
  }
  const getCurrentDay = (date: Date) => {
    const fullMonth = generateCalendarDays(
      date.getFullYear(),
      date.getMonth(),
      tasks,
    )
    return fullMonth.find(
      d => new Date(d.date).toDateString() === date.toDateString(),
    )
  }

  const currentDay = getCurrentDay(currentDate)

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
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <CalendarHeader
          currentDate={currentDate}
          viewType={viewType}
          monthYearDisplay={monthYearDisplay}
          onPrevMonth={prevPeriod}
          onNextMonth={nextPeriod}
          onGoToday={goToToday}
          onViewChange={handleViewChange}
        />

        {/* Main Content */}
        <Box sx={{flex: 1, overflow: 'auto', p: 2}}>
          {viewType === 'month' && (
            <MonthViewGrid
              calendarDays={calendarDays}
              priorityColors={priorityColors}
              statusColors={statusColors}
            />
          )}

          {viewType === 'week' && (
            <WeekViewGrid
              weekDays={weekDays}
              priorityColors={priorityColors}
              statusColors={statusColors}
            />
          )}

          {viewType === 'day' && currentDay ? (
            <DayViewGrid
              day={currentDay}
              priorityColors={priorityColors}
              statusColors={statusColors}
            />
          ) : viewType === 'day' ? (
            <PlaceholderView
              title="No Tasks"
              description="There are no tasks scheduled for this day."
            />
          ) : null}
        </Box>

        {/* Footer */}
        <CalendarFooter
          priorityColors={priorityColors}
          statusColors={statusColors}
          taskCount={tasks.length}
          monthYearDisplay={monthYearDisplay}
        />
      </Paper>
    </PageContainer>
  )
}

export default UpcomingCalendarView
