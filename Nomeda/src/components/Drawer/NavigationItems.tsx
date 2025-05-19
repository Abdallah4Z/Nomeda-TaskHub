import * as React from 'react';
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
  CircularProgress,
  Skeleton,
  useTheme,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import CenteredBox from './Settings/settings'
import FolderIcon from '@mui/icons-material/Folder';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TaskIcon from '@mui/icons-material/Task';
import ChatIcon from '@mui/icons-material/Chat';
import PeopleIcon from '@mui/icons-material/People';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';
import { projectService } from '../../services/projectService';
import { useAuth } from '../../hooks/useAuth';
import {ColorModeContext} from '../Layout/MainLayout'


interface NavigationItemsProps {
  open: boolean
  onNavigate: (path: string) => void
}

interface Project {
  _id: string;
  name: string;
  description?: string;
  owner: string | { id?: string; name?: string; [key: string]: unknown };
  members?: Array<string | { id?: string; name?: string; [key: string]: unknown }>;
  createdAt?: string;
  updatedAt?: string;
  isOwner?: boolean;
}


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
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = React.useState(false);
  const { user } = useAuth();
  const theme = useTheme()
  const colorMode = React.useContext(ColorModeContext)

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
    try {      const newProject = await projectService.createProject({
        name: newProjectName,
        description: newProjectDesc
      });
      
      setNewProjectDialog(false);
      fetchProjects(); // Refresh projects list after creating a new one
      navigate(`/projects/${newProject._id}`);
    } catch (err) {
      console.error('Error creating project:', err);
      setError(err instanceof Error ? err.message : 'Failed to create project');
      setShowSnackbar(true);
    } finally {
      setLoading(false);
    }
  };
    // Fetch user projects from the API
  const fetchProjects = React.useCallback(async () => {
    setProjectsLoading(true);
    try {
      const userProjects = await projectService.getProjects();
      // Add isOwner property to each project based on user authentication
      const projectsWithOwnership = userProjects.map(project => {
        // Handle both string IDs and object IDs with an id property
        const ownerId = typeof project.owner === 'string' ? project.owner : (project.owner as any)?.id;
        return {
          ...project,
          isOwner: ownerId === user?.id
        };
      });
      setProjects(projectsWithOwnership as Project[]);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err instanceof Error ? err.message : 'Failed to load projects');
      setShowSnackbar(true);
    } finally {
      setProjectsLoading(false);
    }
  }, [user?.id, setError, setProjectsLoading, setProjects, setShowSnackbar]);
  
  // Fetch projects when component mounts
  React.useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

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
      </Snackbar>      {/* Projects List */}
      <Collapse in={projectsExpanded} timeout="auto" unmountOnExit>
        {projectsLoading ? (
          <Box sx={{ p: 2 }}>
            <Skeleton variant="text" height={32} />
            <Skeleton variant="text" height={32} />
            <Skeleton variant="text" height={32} />
          </Box>
        ) : error ? (
          <Box sx={{ p: 2, color: 'error.main', fontSize: '0.875rem' }}>
            Failed to load projects
          </Box>
        ) : projects.length === 0 ? (
          <Box sx={{ p: 2, color: 'text.secondary', fontSize: '0.875rem' }}>
            No projects found
          </Box>
        ) : (
          projects.map(project => (
            <ListItem disablePadding key={project._id} sx={{display: 'block'}}>
              <ListItemButton 
                onClick={() => onNavigate(`/projects/${project._id}`)}
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
                  {project.isOwner && open && (
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
          ))
        )}
      </Collapse>

      <Divider sx={{my: 1}} />

      {/* Settings */}
      <ListItem disablePadding sx={{display: 'block'}}>
        <ListItemButton
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
            <CenteredBox />
          </ListItemIcon>
          <ListItemText primary="Settings" sx={{opacity: open ? 1 : 0}} />
        </ListItemButton>
      </ListItem>
      {/* Theme Toggle */}
      <ListItem disablePadding sx={{display: 'block'}}>
        <ListItemButton
          onClick={colorMode.toggleColorMode}
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
            '&:hover': {opacity: 0.8},
          }}
          aria-label={`Switch to ${
            theme.palette.mode === 'dark' ? 'light' : 'dark'
          } mode`}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            {theme.palette.mode === 'dark' ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </ListItemIcon>
          <ListItemText
            primary={`${theme.palette.mode === 'dark' ? 'Light' : 'Dark'} Mode`}
            sx={{opacity: open ? 1 : 0}}
          />
        </ListItemButton>
      </ListItem>
    </List>
  )
}

export default NavigationItems
