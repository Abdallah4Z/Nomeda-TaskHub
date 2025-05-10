import React from 'react'
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  AvatarGroup,
  useTheme,
  Divider,
  LinearProgress,
  Tooltip,
  Button,
  IconButton,
} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'
import TaskIcon from '@mui/icons-material/Task'
import DoneIcon from '@mui/icons-material/Done'
import MainLayout from '../components/Layout/MainLayout'

interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
}

interface Project {
  id: string
  name: string
  description: string
  progress: number
  teamMembers: TeamMember[]
  tasksTotal: number
  tasksCompleted: number
}

// Mock data - replace with actual data from your backend
const projectsData: Project[] = [
  {
    id: 'p1',
    name: 'Task Hub Migration',
    description:
      'Migrating legacy tasks to the new Task Hub platform with improved features.',
    progress: 75,
    teamMembers: [
      {
        id: 'u1',
        name: 'Ahmed Islam',
        role: 'Lead Developer',
        avatar: 'https://robohash.org/ahmed?set=set5',
      },
      {
        id: 'u2',
        name: 'Belal Fathy',
        role: 'Backend Engineer',
        avatar: 'https://robohash.org/belal?set=set5',
      },
      {
        id: 'u3',
        name: 'Abdallah Zein',
        role: 'Frontend Developer',
        avatar: 'https://robohash.org/abdallah?set=set5',
      },
      {
        id: 'u4',
        name: 'Nourhan Ahmed',
        role: 'UI/UX Designer',
        avatar: 'https://robohash.org/nourhan?set=set5',
      },
      {
        id: 'u5',
        name: 'Remonda Rezq',
        role: 'Full Stack Developer',
        avatar: 'https://robohash.org/remonda?set=set5',
      },
    ],
    tasksTotal: 24,
    tasksCompleted: 18,
  },
  {
    id: 'p2',
    name: 'AI Integration',
    description:
      'Implementing AI-powered task suggestions and automation features.',
    progress: 45,
    teamMembers: [
      {
        id: 'u1',
        name: 'Ahmed Islam',
        role: 'AI Engineer',
        avatar: 'https://robohash.org/ahmed?set=set5',
      },
      {
        id: 'u3',
        name: 'Abdallah Zein',
        role: 'ML Engineer',
        avatar: 'https://robohash.org/abdallah?set=set5',
      },
      {
        id: 'u6',
        name: 'Abdallah Lasheen',
        role: 'Data Scientist',
        avatar: 'https://robohash.org/lasheen?set=set5',
      },
    ],
    tasksTotal: 18,
    tasksCompleted: 8,
  },
]

const TeamPage: React.FC = () => {
  const theme = useTheme()
  const navigate = useNavigate()

  const handleMemberClick = (memberId: string) => {
    // Navigate to member profile
    navigate(`/profile/${memberId}`)
  }

  const handleProjectClick = (projectId: string) => {
    // Navigate to project details
    navigate(`/project/${projectId}`)
  }

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{py: 8}}>
        <Box sx={{mb: 6}}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography variant="h4" component="h1">
              Project Teams
            </Typography>
            <Button
              variant="contained"
              startIcon={<PersonAddIcon />}
              onClick={() => navigate('/members/invite')}
            >
              Invite Member
            </Button>
          </Box>
          <Typography variant="body1" color="text.secondary">
            Overview of all project teams and their members
          </Typography>
        </Box>

        <Grid container component="div" spacing={4}>
          {projectsData.map(project => (
            <Grid key={project.id} component="div" item xs={12}>
              <Card
                sx={{
                  height: '100%',
                  backgroundColor:
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'background.paper',
                  '&:hover': {
                    boxShadow: theme.shadows[4],
                    transition: 'box-shadow 0.3s ease-in-out',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{mb: 3}}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mb: 2,
                      }}
                    >
                      <Box>
                        <Typography
                          variant="h5"
                          component="h2"
                          sx={{cursor: 'pointer'}}
                          onClick={() => handleProjectClick(project.id)}
                        >
                          {project.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{mt: 1}}
                        >
                          {project.description}
                        </Typography>
                      </Box>
                      <IconButton size="small">
                        <MoreVertIcon />
                      </IconButton>
                    </Box>

                    <Box sx={{mt: 3}}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          mb: 1,
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Progress
                        </Typography>
                        <Typography variant="body2" fontWeight="medium">
                          {project.progress}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={project.progress}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor:
                            theme.palette.mode === 'dark'
                              ? 'rgba(255, 255, 255, 0.1)'
                              : 'rgba(0, 0, 0, 0.05)',
                        }}
                      />
                    </Box>
                  </Box>

                  <Divider sx={{my: 2}} />

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box sx={{display: 'flex', gap: 3}}>
                      <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <PeopleOutlineIcon
                          sx={{color: 'primary.main', fontSize: 20}}
                        />
                        <Typography variant="body2">
                          {project.teamMembers.length} Members
                        </Typography>
                      </Box>
                      <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <TaskIcon sx={{color: 'warning.main', fontSize: 20}} />
                        <Typography variant="body2">
                          {project.tasksTotal} Tasks
                        </Typography>
                      </Box>
                      <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <DoneIcon sx={{color: 'success.main', fontSize: 20}} />
                        <Typography variant="body2">
                          {project.tasksCompleted} Completed
                        </Typography>
                      </Box>
                    </Box>

                    <AvatarGroup
                      max={5}
                      sx={{
                        '& .MuiAvatar-root': {
                          width: 35,
                          height: 35,
                          fontSize: '1rem',
                          cursor: 'pointer',
                          transition: 'transform 0.2s',
                          '&:hover': {
                            transform: 'scale(1.1)',
                          },
                        },
                      }}
                    >
                      {project.teamMembers.map(member => (
                        <Tooltip
                          key={member.id}
                          title={`${member.name} - ${member.role}`}
                          arrow
                        >
                          <Avatar
                            src={member.avatar}
                            alt={member.name}
                            onClick={() => handleMemberClick(member.id)}
                          />
                        </Tooltip>
                      ))}
                    </AvatarGroup>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </MainLayout>
  )
}

export default TeamPage
