import React from 'react'
import {Box, Grid, Paper, Typography, LinearProgress} from '@mui/material'
import {TrendingUp as TrendingUpIcon} from '@mui/icons-material'

interface ProgressSectionProps {
  taskCompletion: {
    current: number
    previous: number
  }
  teamPerformance: {
    current: number
    previous: number
  }
  taskCompletionRate?: number
  loading?: boolean
  error?: string | null
}

const ProgressSection: React.FC<ProgressSectionProps> = ({
  taskCompletion,
  teamPerformance,
  taskCompletionRate,
  loading,
  error,
}) => {
  // If we have real data from the database, use it instead of mock data
  const actualTaskCompletionRate =
    taskCompletionRate !== undefined
      ? taskCompletionRate
      : taskCompletion.current
  return (
    <Grid container spacing={3}>
      {/* Task Completion Progress */}
      <Grid item xs={12} md={6}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{mb: 2}}>
            <Typography variant="h6" gutterBottom>
              Task Completion Rate
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Overall completion rate of assigned tasks
            </Typography>
          </Box>
          <Box sx={{mb: 1, display: 'flex', alignItems: 'center'}}>
            <Typography variant="h4" sx={{mr: 1}}>
              {actualTaskCompletionRate}%
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'success.main',
                typography: 'body2',
              }}
            >
              <TrendingUpIcon sx={{mr: 0.5, fontSize: '1.2rem'}} />+
              {taskCompletionRate !== undefined
                ? 5
                : taskCompletion.current - taskCompletion.previous}
              %
            </Box>
          </Box>
          {loading && (
            <Typography color="text.secondary">
              Loading statistics...
            </Typography>
          )}
          {error && <Typography color="error">Error: {error}</Typography>}
          <LinearProgress
            variant="determinate"
            value={actualTaskCompletionRate}
            sx={{height: 8, borderRadius: 2}}
          />
        </Paper>
      </Grid>

      {/* Team Performance */}
      <Grid item xs={12} md={6}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{mb: 2, width: '43vw'}}>
            <Typography variant="h6" gutterBottom>
              Team Performance
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Average team productivity score
            </Typography>
          </Box>
          <Box sx={{mb: 1, display: 'flex', alignItems: 'center'}}>
            <Typography variant="h4" sx={{mr: 1}}>
              {teamPerformance.current}%
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'success.main',
                typography: 'body2',
              }}
            >
              <TrendingUpIcon sx={{mr: 0.5, fontSize: '1.2rem'}} />+
              {teamPerformance.current - teamPerformance.previous}%
            </Box>
          </Box>
          <LinearProgress
            variant="determinate"
            value={teamPerformance.current}
            sx={{
              height: 8,
              borderRadius: 2,
              '& .MuiLinearProgress-bar': {
                bgcolor: '#9c27b0',
              },
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default ProgressSection
