import * as React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import FolderIcon from '@mui/icons-material/Folder';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CenteredBox from './Settings/settings';

interface NavigationItemsProps {
  open: boolean;
  onNavigate: (path: string) => void;
}

const sampleProjects = [
  { id: '1', name: 'Project Alpha' },
  { id: '2', name: 'Project Beta' },
];

const NavigationItems: React.FC<NavigationItemsProps> = ({
  open,
  onNavigate,
}) => {
  return (
    <List>
      {/* Home */}
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          onClick={() => onNavigate('/Home')}
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
            '&:hover': { opacity: 0.8 },
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
          <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>

      {/* Settings */}
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          onClick={() => onNavigate('/Settings')}
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
            '&:hover': { opacity: 0.8 },
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
          <ListItemText primary="Settings" sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>

      {/* Divider */}
      <Divider sx={{ my: 1 }} />

      {/* Create New Project */}
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          onClick={() => onNavigate('/create-project')}
          sx={{
            minHeight: 40,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
            '&:hover': { opacity: 0.8 },
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
          <ListItemText primary="New Project" sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>

      {/* Projects Section */}
      {sampleProjects.map((project) => (
        <ListItem disablePadding key={project.id} sx={{ display: 'block' }}>
          <ListItemButton
            onClick={() => onNavigate(`/project/${project.id}`)}
            sx={{
              minHeight: 40,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
              '&:hover': { opacity: 0.8 },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary={project.name} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      ))}

      {/* Bottom Settings Toggle or Custom Component */}
      <ListItem disablePadding sx={{ display: 'block' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            mt: 2,
          }}
        >
          <CenteredBox />
        </Box>
      </ListItem>
    </List>
  );
};

export default NavigationItems;
