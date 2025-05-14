import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  CardMedia,
  Fade,
  Zoom,
  Divider,
  useMediaQuery,
} from '@mui/material'
import {useTheme} from '@mui/material/styles'
import TaskIcon from '@mui/icons-material/Task'
import ChatIcon from '@mui/icons-material/Chat'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import AddTaskIcon from '@mui/icons-material/AddTask'
import ForumIcon from '@mui/icons-material/Forum'
import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'

// Import images
import dashboardImage from '../assets/dashboard.png'
import tasksImage from '../assets/tasks.png'
import chatbotImage from '../assets/chatbot.png'
import MainLayout from '../components/Layout/MainLayout'

export default function Homepage() {
  const theme = useTheme()
  const navigate = useNavigate()
  const [loaded, setLoaded] = useState(false)
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    setLoaded(true)
  }, [])

  const features = [
    {
      title: 'Tasks Management',
      description:
        'Organize and track your tasks efficiently with our intuitive interface',
      icon: <TaskIcon sx={{fontSize: 50, color: theme.palette.primary.main}} />,
      image: tasksImage,
      path: '/tasks',
    },
    {
      title: 'Smart Chatbot',
      description:
        'Get instant help and insights with our AI-powered conversational assistant',
      icon: <ChatIcon sx={{fontSize: 50, color: theme.palette.primary.main}} />,
      image: chatbotImage,
      path: '/chat',
    },
    {
      title: 'Dashboard',
      description:
        'View all your activities and metrics at a glance with customizable widgets',
      icon: (
        <DashboardIcon sx={{fontSize: 50, color: theme.palette.primary.main}} />
      ),
      image: dashboardImage,
      path: '/dashboard',
    },
  ]

  return (
    <MainLayout>
      <Box
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          bgcolor: 'background.default',
          overflow: 'hidden',
        }}
      >
        {/* Hero Section with gradient background */}
        <Box
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
            color: 'primary.contrastText',
            py: {xs: 3, md: 6},
            mb: {xs: 4, md: 8},
            position: 'relative',
            borderRadius: {xs: '0 0 0 0', md: '0 0 30px 30px'},
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          }}
        >
          <Container maxWidth="lg">
            <Fade in={loaded} timeout={1000}>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={7}>
                  <Typography
                    variant="h2"
                    component="h1"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      fontSize: {xs: '2.5rem', md: '3.5rem'},
                      textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    }}
                  >
                    Welcome to Nomeda TaskHub
                  </Typography>
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                      mb: 4,
                      fontWeight: 400,
                      opacity: 0.9,
                      maxWidth: '600px',
                    }}
                  >
                    Your all-in-one solution for task management and
                    productivity enhancement
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => navigate('/dashboard')}
                    sx={{
                      py: 1.5,
                      px: 4,
                      fontWeight: 600,
                      borderRadius: '10px',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                    endIcon={<ArrowForwardIcon />}
                  >
                    Go to Dashboard
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={5}
                  sx={{display: {xs: 'none', md: 'block'}}}
                ></Grid>
              </Grid>
            </Fade>
          </Container>
        </Box>

        {/* Features Section */}
        <Container maxWidth="lg">
          <Box sx={{textAlign: 'center', mb: 5}}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 1,
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '60px',
                  height: '4px',
                  bgcolor: 'secondary.main',
                  bottom: '-8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                },
              }}
            >
              Key Features
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 3,
                mb: 5,
                color: 'text.secondary',
                maxWidth: '700px',
                mx: 'auto',
              }}
            >
              Discover how Nomeda TaskHub can transform your workflow
            </Typography>
          </Box>

          <Grid container spacing={4} sx={{mb: 8}}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Fade in={loaded} style={{transitionDelay: `${index * 200}ms`}}>
                  <Card
                    sx={{
                      height: '100%',
                      width: '20vw',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      border: '1px solid rgba(0,0,0,0.08)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme.shadows[10],
                      },
                    }}
                    elevation={3}
                  >
                    <CardMedia
                      component="img"
                      height="220"
                      image={feature.image}
                      alt={feature.title}
                      sx={{
                        transition: 'transform 0.5s ease',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    />
                    <CardContent sx={{flexGrow: 1, p: 3}}>
                      <Box
                        sx={{
                          mb: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Box
                          sx={{
                            p: 1.5,
                            borderRadius: '50%',
                            bgcolor: 'rgba(25, 118, 210, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {feature.icon}
                        </Box>
                      </Box>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h3"
                        sx={{
                          fontWeight: 600,
                          textAlign: 'center',
                          mb: 1,
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        color="text.secondary"
                        sx={{
                          textAlign: 'center',
                          mb: 3,
                          lineHeight: 1.6,
                        }}
                      >
                        {feature.description}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          mt: 'auto',
                        }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{
                            borderRadius: '30px',
                            px: 3,
                            py: 1,
                            fontWeight: 500,
                            '&:hover': {
                              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            },
                          }}
                          onClick={() => navigate(feature.path)}
                          endIcon={<ArrowForwardIcon />}
                        >
                          Explore
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>

          {/* Recent Activity Section */}
          <Paper
            sx={{
              p: {xs: 3, md: 5},
              mb: 6,
              width: '64vw',
              borderRadius: '12px',
              boxShadow: '0 6px 24px rgba(0,0,0,0.05)',
              background: `linear-gradient(to right, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
              border: '1px solid rgba(0,0,0,0.05)',
            }}
            elevation={0}
          >
            <Box sx={{mb: 4, display: 'flex', alignItems: 'center'}}>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: 600,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '40px',
                    height: '3px',
                    bgcolor: 'secondary.main',
                    bottom: '-8px',
                    left: 0,
                  },
                }}
              >
                Recent Activity
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 3,
                    bgcolor: 'background.paper',
                    borderRadius: '12px',
                    height: '100%',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    },
                  }}
                  elevation={1}
                >
                  <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                    <AddTaskIcon
                      sx={{color: theme.palette.primary.main, mr: 1.5}}
                    />
                    <Typography variant="h6" fontWeight={600}>
                      Latest Tasks
                    </Typography>
                  </Box>
                  <Divider sx={{mb: 3}} />
                  {/* Add your tasks component here */}
                  <Typography
                    color="text.secondary"
                    sx={{
                      mb: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100px',
                    }}
                  >
                    No recent tasks found. Create a new task to get started.
                  </Typography>
                  <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        mt: 2,
                        borderRadius: '30px',
                        textTransform: 'none',
                        fontWeight: 500,
                      }}
                      onClick={() => navigate('/tasks')}
                      endIcon={<ArrowForwardIcon fontSize="small" />}
                    >
                      View All Tasks
                    </Button>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 3,
                    bgcolor: 'background.paper',
                    borderRadius: '12px',
                    height: '100%',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    },
                  }}
                  elevation={1}
                >
                  <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                    <ForumIcon
                      sx={{color: theme.palette.primary.main, mr: 1.5}}
                    />
                    <Typography variant="h6" fontWeight={600}>
                      Recent Chats
                    </Typography>
                  </Box>
                  <Divider sx={{mb: 3}} />
                  {/* Add your chat preview component here */}
                  <Typography
                    color="text.secondary"
                    sx={{
                      mb: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100px',
                    }}
                  >
                    No recent chats found. Start a conversation with our
                    chatbot.
                  </Typography>
                  <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        mt: 2,
                        borderRadius: '30px',
                        textTransform: 'none',
                        fontWeight: 500,
                      }}
                      onClick={() => navigate('/chat')}
                      endIcon={<ArrowForwardIcon fontSize="small" />}
                    >
                      Open Chatbot
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </MainLayout>
  )
}
