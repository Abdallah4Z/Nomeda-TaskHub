import {Box, Container, Grid, Typography} from '@mui/material'
import MainLayout from '../components/Layout/MainLayout'
import StatisticsSection from '../components/dashboard/StatisticsSection'
import ProgressSection from '../components/dashboard/ProgressSection'
import ChartsSection from '../components/dashboard/ChartsSection'
import ActivitiesSection from '../components/dashboard/ActivitiesSection'
import ProjectsSection from '../components/dashboard/ProjectsSection'
import DashboardHeader from '../components/dashboard/DashboardHeader'
import {mockDashboardData as mockData} from '../data/dashboardData'
import useDashboardStats from '../hooks/useDashboardStats'

const Dashboard = () => {
  // Get real stats from our custom hook
  const dashboardStats = useDashboardStats()

  return (
    <MainLayout>
      <Container maxWidth="xl">
        <Box sx={{py: 4}}>
          {/* Header */}
          <DashboardHeader />
          <Typography variant="subtitle1" color="text.secondary" sx={{mb: 4}}>
            Track your team's performance and project progress
          </Typography>
          {/* Statistics Cards - Using real data */}
          <StatisticsSection stats={dashboardStats} /> {/* Progress Sections */}
          <ProgressSection
            taskCompletion={mockData.taskCompletion}
            teamPerformance={mockData.teamPerformance}
            taskCompletionRate={dashboardStats.taskCompletionRate}
            loading={dashboardStats.loading}
            error={dashboardStats.error}
          />
          {/* Charts Section */}
          <ChartsSection
            taskDistribution={mockData.taskDistribution}
            weeklyProgress={mockData.weeklyProgress}
          />{' '}
          {/* Recent Activities and Active Projects */}
          <Grid container spacing={3} sx={{mt: 1}}>
            <ActivitiesSection recentActivities={mockData.recentActivities} />
            <ProjectsSection
              activeProjects={dashboardStats.activeProjects}
              loading={dashboardStats.loading}
              error={dashboardStats.error}
            />
          </Grid>
        </Box>
      </Container>
    </MainLayout>
  )
}

export default Dashboard
