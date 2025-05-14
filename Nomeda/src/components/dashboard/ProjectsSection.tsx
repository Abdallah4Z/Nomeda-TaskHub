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
} from '@mui/material'

interface Project {
  name: string;
  progress: number;
  team: string[];
}

interface ProjectsSectionProps {
  activeProjects: Project[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ activeProjects }) => {
  return (
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
          {activeProjects.map((project, index) => (
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
              {index < activeProjects.length - 1 && (
                <Divider />
              )}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Grid>
  )
}

export default ProjectsSection
