import React from 'react'
import {
  Box,
  Grid,
  Paper,
  Typography,
  LinearProgress,
} from '@mui/material'
import {
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material'

interface ProgressSectionProps {
  taskCompletion: {
    current: number;
    previous: number;
  };
  teamPerformance: {
    current: number;
    previous: number;
  };
}

const ProgressSection: React.FC<ProgressSectionProps> = ({ 
  taskCompletion,
  teamPerformance 
}) => {
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
              {taskCompletion.current}%
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
              {taskCompletion.current - taskCompletion.previous}%
            </Box>
          </Box>
          <LinearProgress
            variant="determinate"
            value={taskCompletion.current}
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
