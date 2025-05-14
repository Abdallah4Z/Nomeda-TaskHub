import React from 'react'
import { Box, Container, Grid, Typography } from '@mui/material'
import StatisticsSection from './StatisticsSection'
import ProgressSection from './ProgressSection'
import ChartsSection from './ChartsSection'
import ActivitiesSection from './ActivitiesSection'
import ProjectsSection from './ProjectsSection'
import DashboardHeader from './DashboardHeader'
import { mockDashboardData as mockData } from '../../data/dashboardData'

const DashboardMain: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <DashboardHeader />
        
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          Track your team's performance and project progress
        </Typography>

        {/* Statistics Cards */}
        <StatisticsSection stats={mockData.stats} />

        {/* Progress Sections */}
        <ProgressSection 
          taskCompletion={mockData.taskCompletion}
          teamPerformance={mockData.teamPerformance}
        />

        {/* Charts Section */}
        <ChartsSection 
          taskDistribution={mockData.taskDistribution}
          weeklyProgress={mockData.weeklyProgress}
        />

        {/* Recent Activities and Active Projects */}
        <Grid container spacing={3}>
          <ActivitiesSection recentActivities={mockData.recentActivities} />
          <ProjectsSection activeProjects={mockData.activeProjects} />
        </Grid>
      </Box>
    </Container>
  )
}

export default DashboardMain
