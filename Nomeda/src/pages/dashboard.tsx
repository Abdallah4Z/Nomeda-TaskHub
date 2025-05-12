import React from 'react'
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Chip,
  AvatarGroup,
} from '@mui/material'
import {
  Assignment as TaskIcon,
  CheckCircle as DoneIcon,
  Schedule as PendingIcon,
  People as TeamIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AccessTime as TimeIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Comment as CommentIcon,
} from '@mui/icons-material'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import StatCard from '../components/Home/Project/Overview/StatCard'
import MainLayout from '../components/Layout/MainLayout'

const mockData = {
  stats: {
    totalTasks: 48,
    completedTasks: 32,
    pendingTasks: 16,
    teamMembers: 8,
  },
  taskCompletion: {
    current: 75,
    previous: 65,
  },
  teamPerformance: {
    current: 88,
    previous: 82,
  },
  taskDistribution: [
    {name: 'High Priority', value: 15, color: '#f44336'},
    {name: 'Medium Priority', value: 20, color: '#ff9800'},
    {name: 'Low Priority', value: 13, color: '#4caf50'},
  ],
  weeklyProgress: [
    {day: 'Mon', tasks: 12},
    {day: 'Tue', tasks: 15},
    {day: 'Wed', tasks: 8},
    {day: 'Thu', tasks: 17},
    {day: 'Fri', tasks: 10},
  ],
  recentActivities: [
    {
      id: 1,
      user: 'John Doe',
      action: 'completed',
      task: 'Update dashboard UI',
      time: '2 hours ago',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: 2,
      user: 'Jane Smith',
      action: 'commented',
      task: 'API Integration',
      time: '4 hours ago',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    {
      id: 3,
      user: 'Mike Johnson',
      action: 'created',
      task: 'User Authentication',
      time: '6 hours ago',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
  ],
  activeProjects: [
    {
      name: 'Website Redesign',
      progress: 75,
      team: [
        'https://i.pravatar.cc/150?img=1',
        'https://i.pravatar.cc/150?img=2',
      ],
    },
    {
      name: 'Mobile App Development',
      progress: 45,
      team: [
        'https://i.pravatar.cc/150?img=3',
        'https://i.pravatar.cc/150?img=4',
        'https://i.pravatar.cc/150?img=5',
      ],
    },
  ],
}

const Dashboard = () => {
  return (
    <MainLayout>
      <Container maxWidth="xl">
        <Box sx={{py: 4}}>
          {/* Header */}
          <Typography variant="h4" gutterBottom fontWeight="500">
            Dashboard Overview
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{mb: 4}}>
            Track your team's performance and project progress
          </Typography>

          {/* Statistics Cards */}
          <Grid container spacing={7} sx={{mb: 4}}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Total Tasks"
                value={mockData.stats.totalTasks}
                icon={<TaskIcon />}
                color="#1976d2"
                change={{value: 12, isPositive: true}}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Completed"
                value={mockData.stats.completedTasks}
                icon={<DoneIcon />}
                color="#2e7d32"
                change={{value: 8, isPositive: true}}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Pending"
                value={mockData.stats.pendingTasks}
                icon={<PendingIcon />}
                color="#ed6c02"
                change={{value: 5, isPositive: false}}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Team Size"
                value={mockData.stats.teamMembers}
                icon={<TeamIcon />}
                color="#9c27b0"
                change={{value: 2, isPositive: true}}
              />
            </Grid>
          </Grid>

          {/* Progress Sections */}
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
                    {mockData.taskCompletion.current}%
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
                    {mockData.taskCompletion.current -
                      mockData.taskCompletion.previous}
                    %
                  </Box>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={mockData.taskCompletion.current}
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
                    {mockData.teamPerformance.current}%
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
                    {mockData.teamPerformance.current -
                      mockData.teamPerformance.previous}
                    %
                  </Box>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={mockData.teamPerformance.current}
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

          {/* Charts Section */}
          <Grid container spacing={3} sx={{mb: 4, mt: 2}}>
            {/* Task Distribution Chart */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  height: 400,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Task Distribution
                </Typography>
                <ResponsiveContainer height={300} width={'30vw'}>
                  <PieChart width="30vw">
                    <Pie
                      data={mockData.taskDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({name, percent}) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {mockData.taskDistribution.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Weekly Progress Chart */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  height: 400,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Weekly Progress
                </Typography>
                <ResponsiveContainer height={300} width={'30vw'}>
                  <BarChart data={mockData.weeklyProgress} width="30vw">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="tasks" fill="#1976d2" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>

          {/* Recent Activities and Active Projects */}
          <Grid container spacing={3}>
            {/* Recent Activities */}
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
                <Typography variant="h6" gutterBottom>
                  Recent Activities
                </Typography>
                <List>
                  {mockData.recentActivities.map((activity, index) => (
                    <React.Fragment key={activity.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar src={activity.avatar} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={activity.user}
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {activity.action}
                              </Typography>
                              {` — ${activity.task}`}
                              <Typography
                                component="div"
                                variant="caption"
                                color="text.secondary"
                                sx={{mt: 0.5}}
                              >
                                {activity.time}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      {index < mockData.recentActivities.length - 1 && (
                        <Divider variant="inset" component="li" />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Grid>

            {/* Active Projects */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  width: '43vw',
                  height: '100%',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Active Projects
                </Typography>
                <List>
                  {mockData.activeProjects.map((project, index) => (
                    <React.Fragment key={project.name}>
                      <ListItem
                        sx={{
                          flexDirection: 'column',
                          alignItems: 'stretch',
                          gap: 1,
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                          }}
                        >
                          <Typography variant="subtitle1">
                            {project.name}
                          </Typography>
                          <AvatarGroup max={3}>
                            {project.team.map((avatar, i) => (
                              <Avatar
                                key={i}
                                src={avatar}
                                sx={{width: 30, height: 30}}
                              />
                            ))}
                          </AvatarGroup>
                        </Box>
                        <Box sx={{width: '100%'}}>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              mb: 1,
                            }}
                          >
                            <Typography variant="body2" color="text.secondary">
                              Progress
                            </Typography>
                            <Typography variant="body2" color="text.primary">
                              {project.progress}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={project.progress}
                            sx={{height: 6, borderRadius: 5}}
                          />
                        </Box>
                      </ListItem>
                      {index < mockData.activeProjects.length - 1 && (
                        <Divider />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </MainLayout>
  )
}

export default Dashboard
