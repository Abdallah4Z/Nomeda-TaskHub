import { Box, Container, Grid, Typography, Paper, Button, Card, CardContent, CardMedia } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TaskIcon from '@mui/icons-material/Task';
import ChatIcon from '@mui/icons-material/Chat';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router-dom';

// Import images
import dashboardImage from '../assets/dashboard.png';
import tasksImage from '../assets/tasks.png';
import chatbotImage from '../assets/chatbot.png';

export default function Homepage() {
  const theme = useTheme();
  const navigate = useNavigate();

  const features = [
    {
      title: 'Tasks Management',
      description: 'Organize and track your tasks efficiently',
      icon: <TaskIcon sx={{ fontSize: 40 }} />,
      image: tasksImage,
      path: '/tasks'
    },
    {
      title: 'Smart Chatbot',
      description: 'Get instant help with our AI-powered chatbot',
      icon: <ChatIcon sx={{ fontSize: 40 }} />,
      image: chatbotImage,
      path: '/chat'
    },
    {
      title: 'Dashboard',
      description: 'View all your activities at a glance',
      icon: <DashboardIcon sx={{ fontSize: 40 }} />,
      image: dashboardImage,
      path: '/dashboard'
    }
  ];

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          py: 8,
          mb: 6
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Nomeda TaskHub
          </Typography>
          <Typography variant="h5" component="h2" sx={{ mb: 4 }}>
            Your all-in-one solution for task management and productivity
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/dashboard')}
          >
            Go to Dashboard
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[8]
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={feature.image}
                  alt={feature.title}
                />
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography gutterBottom variant="h5" component="h3">
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => navigate(feature.path)}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Recent Activity Section */}
        <Paper sx={{ p: 4, mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Recent Activity
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, bgcolor: 'background.paper' }}>
                <Typography variant="h6" gutterBottom>
                  Latest Tasks
                </Typography>
                {/* Add your tasks component here */}
                <Typography color="text.secondary">
                  No recent tasks found. Create a new task to get started.
                </Typography>
                <Button
                  variant="text"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => navigate('/tasks')}
                >
                  View All Tasks
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, bgcolor: 'background.paper' }}>
                <Typography variant="h6" gutterBottom>
                  Recent Chats
                </Typography>
                {/* Add your chat preview component here */}
                <Typography color="text.secondary">
                  No recent chats found. Start a conversation with our chatbot.
                </Typography>
                <Button
                  variant="text"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => navigate('/chat')}
                >
                  Open Chatbot
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}