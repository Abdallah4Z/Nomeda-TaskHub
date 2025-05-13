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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  CircularProgress
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
import { useNavigate } from 'react-router-dom'
import { projectService } from '../../services/projectService'
import NavigationItem from './NavigationItem'
import ColorModeIconDropdown from '../../themes/ColorModeIconDropdown'

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
  const navigate = useNavigate();
  const [projectsExpanded, setProjectsExpanded] = React.useState(true);
  const [workspacesExpanded, setWorkspacesExpanded] = React.useState(false);
  const [newProjectDialog, setNewProjectDialog] = React.useState(false);
  const [newProjectName, setNewProjectName] = React.useState('');
  const [newProjectDesc, setNewProjectDesc] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [showSnackbar, setShowSnackbar] = React.useState(false);

  const handleProjectsToggle = () => {
    setProjectsExpanded(!projectsExpanded);
  };

  const handleWorkspacesToggle = () => {
    setWorkspacesExpanded(!workspacesExpanded);
  };
  
  const handleNewProjectClick = () => {
    setNewProjectDialog(true);
    setNewProjectName('New Project');
    setNewProjectDesc('');
    setError(null);
  };
  
  const handleCloseDialog = () => {
    setNewProjectDialog(false);
  };
  
  const handleCreateProject = async () => {
    if (!newProjectName.trim()) {
      setError('Project name is required');
      return;
    }
    
    setLoading(true);
    try {
      const newProject = await projectService.createProject({
        name: newProjectName,
        description: newProjectDesc
      });
      
      setNewProjectDialog(false);
      navigate(`/projects/${newProject._id}`);
    } catch (err: any) {
      console.error('Error creating project:', err);
      setError(err.message || 'Failed to create project');
      setShowSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

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
      )}      {/* Create New Project */}
      <ListItem disablePadding sx={{display: 'block'}}>
        <ListItemButton
          onClick={handleNewProjectClick}
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
      
      {/* New Project Dialog */}
      <Dialog open={newProjectDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <TextField
            autoFocus
            margin="dense"
            label="Project Name"
            fullWidth
            variant="outlined"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            margin="dense"
            label="Description (optional)"
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            value={newProjectDesc}
            onChange={(e) => setNewProjectDesc(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleCreateProject} 
            variant="contained" 
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Error Snackbar */}
      <Snackbar 
        open={showSnackbar} 
        autoHideDuration={6000} 
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowSnackbar(false)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      {/* Projects List */}
      <Collapse in={projectsExpanded} timeout="auto" unmountOnExit>
        {sampleProjects.map(project => (
          <ListItem disablePadding key={project.id} sx={{display: 'block'}}>
            <ListItemButton              onClick={() => onNavigate(`/projects/${project.id}`)}
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
      <ListItem disablePadding sx={{display: 'block'}}>        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            mt: 2,
            mx: 2,
          }}
        >
          <ColorModeIconDropdown />
        </Box>
      </ListItem>
    </List>
  )
}

export default NavigationItems
