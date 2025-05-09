import React from 'react';
import { Grid } from '@mui/material';
import PageContainer from './PageContainer';
import OverviewHeader from './OverviewHeader';
import StatCard from './StatCard';
import ProjectProgress from './ProjectProgress';
import TaskDistribution from './TaskDistribution';
import RecentActivities from './RecentActivities';
import UpcomingDeadlines from './UpcomingDeadlines';

// Icons
import AssignmentIcon from '@mui/icons-material/Assignment';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const OverviewPage: React.FC = () => {
  // In a real app, this data would come from your state management (Redux, Context, etc.)
  const taskStats = {
    total: 120,
    inProgress: 45,
    completed: 65,
    overdue: 8,
    growthRate: 15,
    highPriority: 12
  };

  const completionPercentage = Math.round((taskStats.completed / taskStats.total) * 100);
  
  return (
    <PageContainer title="Task Hub Overview">
      <OverviewHeader 
        totalTasks={taskStats.total} 
        completedTasks={taskStats.completed}
      />
      
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {/* Task Stats Cards */}
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Total Tasks"
            value={taskStats.total}
            icon={<AssignmentIcon />}
            color="#3f51b5"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="In Progress"
            value={taskStats.inProgress}
            icon={<PendingIcon />}
            color="#ff9800"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Completed"
            value={taskStats.completed}
            icon={<CheckCircleIcon />}
            color="#4caf50"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Overdue Tasks"
            value={taskStats.overdue}
            icon={<ErrorIcon />}
            color="#f44336"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="High Priority"
            value={taskStats.highPriority}
            icon={<PriorityHighIcon />}
            color="#e91e63"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Monthly Growth"
            value={`+${taskStats.growthRate}%`}
            icon={<TrendingUpIcon />}
            color="#2196f3"
          />
        </Grid>
        
        {/* Project Progress */}
        <Grid item xs={12} md={6}>
          <ProjectProgress completionPercentage={completionPercentage} />
        </Grid>
        
        {/* Task Distribution */}
        <Grid item xs={12} md={6}>
          <TaskDistribution 
            distribution={{
              completed: taskStats.completed,
              inProgress: taskStats.inProgress,
              pending: taskStats.total - taskStats.completed - taskStats.inProgress
            }}
          />
        </Grid>
        
        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <RecentActivities />
        </Grid>
        
        {/* Upcoming Deadlines */}
        <Grid item xs={12} md={6}>
          <UpcomingDeadlines />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default OverviewPage;