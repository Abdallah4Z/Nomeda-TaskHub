import React from 'react'
import { Grid, CircularProgress, Box, Alert } from '@mui/material'
import {
  Assignment as TaskIcon,
  CheckCircle as DoneIcon,
  Schedule as PendingIcon,
  Apps as ProjectsIcon,
} from '@mui/icons-material'
import StatCard from '../../components/Home/Project/Overview/StatCard'

interface StatisticsSectionProps {
  stats: {
    totalTasks: number;
    completedTasks: number;
    pendingTasks: number;
    totalProjects: number;
    loading: boolean;
    error: string | null;
  }
}

const StatisticsSection: React.FC<StatisticsSectionProps> = ({ stats }) => {
  if (stats.loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ py: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (stats.error) {
    return (
      <Box sx={{ mb: 4 }}>
        <Alert severity="error">{stats.error}</Alert>
      </Box>
    );
  }

  return (
    <Grid container spacing={7} sx={{ mb: 4 }}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Total Tasks"
          value={stats.totalTasks}
          icon={<TaskIcon />}
          color="#1976d2"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Completed"
          value={stats.completedTasks}
          icon={<DoneIcon />}
          color="#2e7d32"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Pending"
          value={stats.pendingTasks}
          icon={<PendingIcon />}
          color="#ed6c02"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Projects"
          value={stats.totalProjects}
          icon={<ProjectsIcon />}
          color="#9c27b0"
        />
      </Grid>
    </Grid>
  )
}

export default StatisticsSection
