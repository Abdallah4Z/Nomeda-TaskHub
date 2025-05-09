import * as React from 'react'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  Collapse,
  IconButton,
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import SettingsIcon from '@mui/icons-material/Settings'
import FolderIcon from '@mui/icons-material/Folder'
import AddBoxIcon from '@mui/icons-material/AddBox'
import DashboardIcon from '@mui/icons-material/Dashboard'
import TaskIcon from '@mui/icons-material/Task'
import ChatIcon from '@mui/icons-material/Chat'
import PeopleIcon from '@mui/icons-material/People'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import StarIcon from '@mui/icons-material/Star'
import CenteredBox from './Settings/settings'
import MainLayout from '../Layout/MainLayout'

interface NavigationItemsProps {
  open: boolean
  onNavigate: (path: string) => void
}

const sampleProjects = [
  {id: '1', name: 'Project Alpha', starred: true},
  {id: '2', name: 'Project Beta', starred: false},
  {id: '3', name: 'Task Manager', starred: true},
  {id: '4', name: 'Website Redesign', starred: false},
]

const NavigationItems: React.FC<NavigationItemsProps> = ({
  open,
  onNavigate,
}) => {
  const [projectsExpanded, setProjectsExpanded] = React.useState(true)
  const [workspacesExpanded, setWorkspacesExpanded] = React.useState(false)

  const handleProjectsToggle = () => {
    setProjectsExpanded(!projectsExpanded)
  }

  const handleWorkspacesToggle = () => {
    setWorkspacesExpanded(!workspacesExpanded)
  }

  return (
    <List>
      {/* Home */}
      <ListItem disablePadding sx={{display: 'block'}}>
        <ListItemButton
          onClick={() => onNavigate('/Home')}
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
            '&:hover': {opacity: 0.8},
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" sx={{opacity: open ? 1 : 0}} />
        </ListItemButton>
      </ListItem>

      {/* Dashboard */}
      <ListItem disablePadding sx={{display: 'block'}}>
        <ListItemButton
          onClick={() => onNavigate('/dashboard')}
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
            '&:hover': {opacity: 0.8},
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" sx={{opacity: open ? 1 : 0}} />
        </ListItemButton>
      </ListItem>

      {/* Tasks */}
      <ListItem disablePadding sx={{display: 'block'}}>
        <ListItemButton
          onClick={() => onNavigate('/tasks')}
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
            '&:hover': {opacity: 0.8},
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <TaskIcon />
          </ListItemIcon>
          <ListItemText primary="My Tasks" sx={{opacity: open ? 1 : 0}} />
        </ListItemButton>
      </ListItem>

      {/* Chat */}
      <ListItem disablePadding sx={{display: 'block'}}>
        <ListItemButton
          onClick={() => onNavigate('/chat')}
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
            '&:hover': {opacity: 0.8},
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="Chat" sx={{opacity: open ? 1 : 0}} />
        </ListItemButton>
      </ListItem>

      {/* Team */}
      <ListItem disablePadding sx={{display: 'block'}}>
        <ListItemButton
          onClick={() => onNavigate('/team')}
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
            '&:hover': {opacity: 0.8},
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Team" sx={{opacity: open ? 1 : 0}} />
        </ListItemButton>
      </ListItem>

      <Divider sx={{my: 1}} />

      {/* Projects Section Header */}
      {open && (
        <ListItem sx={{px: 2.5, py: 0.5}}>
          <Typography
            variant="overline"
            sx={{fontWeight: 500, color: 'text.secondary'}}
          >
            Projects
          </Typography>
          <Box sx={{flex: 1}} />
          <IconButton size="small" onClick={handleProjectsToggle}>
            {projectsExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </ListItem>
      )}

      {/* Create New Project */}
      <ListItem disablePadding sx={{display: 'block'}}>
        <ListItemButton
          onClick={() => onNavigate('/create-project')}
          sx={{
            minHeight: 40,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
            '&:hover': {opacity: 0.8},
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <AddBoxIcon />
          </ListItemIcon>
          <ListItemText primary="New Project" sx={{opacity: open ? 1 : 0}} />
        </ListItemButton>
      </ListItem>

      {/* Projects List */}
      <Collapse in={projectsExpanded} timeout="auto" unmountOnExit>
        {sampleProjects.map(project => (
          <ListItem disablePadding key={project.id} sx={{display: 'block'}}>
            <ListItemButton
              onClick={() => onNavigate(`/project/${project.id}`)}
              sx={{
                minHeight: 40,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                '&:hover': {opacity: 0.8},
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <FolderIcon />
                {project.starred && open && (
                  <StarIcon
                    sx={{
                      position: 'absolute',
                      right: -8,
                      top: -8,
                      fontSize: '0.8rem',
                      color: 'warning.main',
                    }}
                  />
                )}
              </ListItemIcon>
              <ListItemText
                primary={project.name}
                sx={{opacity: open ? 1 : 0}}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </Collapse>

      <Divider sx={{my: 1}} />

      {/* Settings */}
      <ListItem disablePadding sx={{display: 'block'}}>
        <ListItemButton
          onClick={() => onNavigate('/Settings')}
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
            '&:hover': {opacity: 0.8},
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" sx={{opacity: open ? 1 : 0}} />
        </ListItemButton>
      </ListItem>

      {/* Theme Toggle */}
      <ListItem disablePadding sx={{display: 'block'}}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            mt: 2,
            mx: 2,
          }}
        >
          <CenteredBox />
        </Box>
      </ListItem>
    </List>
  )
}

export default NavigationItems
