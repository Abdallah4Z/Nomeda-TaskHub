import React from 'react'
import {
  Grid,
  Paper,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  AvatarGroup,
  Box,
  LinearProgress,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {User} from '../../types/project'

interface ActiveProject {
  _id: string
  name: string
  progress: number
  owner: User | string
  members: (User | string)[]
}

interface ProjectsSectionProps {
  activeProjects?: ActiveProject[]
  loading?: boolean
  error?: string | null
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  activeProjects = [],
  loading = false,
  error = null,
}) => {
  const navigate = useNavigate()

  const handleProjectClick = (projectId: string) => {
    navigate(`/projects/${projectId}`)
  }
  return (
    <Grid item md={6} xs={12}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          height: '400px', // Set fixed height
          width: '45vw', // Make it wider
        }}
      >
        <Typography variant="h6" gutterBottom>
          Active Projects
        </Typography>
        {loading && (
          <Box sx={{display: 'flex', justifyContent: 'center', py: 4}}>
            <CircularProgress size={40} />
          </Box>
        )}
        {error && (
          <Alert severity="error" sx={{mb: 2}}>
            {error}
          </Alert>
        )}
        {!loading && !error && activeProjects.length === 0 && (
          <Alert severity="info">No projects found.</Alert>
        )}{' '}
        {!loading && !error && activeProjects.length > 0 && (
          <List
            sx={{
              maxHeight: '260px', // Leave room for the heading and padding
              overflow: 'auto', // Enable scrolling
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0,0.2)',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'rgba(0,0,0,0.05)',
              },
            }}
          >
            {activeProjects.map((project, index) => (
              <React.Fragment key={project._id}>
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
                    <Typography variant="subtitle1">{project.name}</Typography>
                    <AvatarGroup max={3}>
                      {project.members.map((member, i) => {
                        const userMember =
                          typeof member === 'object' ? member : null
                        return (
                          <Avatar
                            key={i}
                            src={userMember?.avatar}
                            alt={userMember?.name || 'Team member'}
                            sx={{width: 30, height: 30}}
                          >
                            {userMember?.name ? userMember.name.charAt(0) : '?'}
                          </Avatar>
                        )
                      })}
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
                  <Box sx={{mt: 2, alignSelf: 'flex-end'}}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleProjectClick(project._id)}
                    >
                      View Project
                    </Button>
                  </Box>
                </ListItem>
                {index < activeProjects.length - 1 && <Divider />}
              </React.Fragment>
            ))}{' '}
          </List>
        )}
      </Paper>
    </Grid>
  )
}

export default ProjectsSection
