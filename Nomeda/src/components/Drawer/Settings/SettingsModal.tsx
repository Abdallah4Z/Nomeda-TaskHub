// Redesigned SettingsModal with full dark/light mode support, responsive and simplified
import React, { useState, useContext } from 'react';
import {
  Modal,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  Typography,
  IconButton,
  Drawer,
  useMediaQuery,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import BuildIcon from '@mui/icons-material/Build';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import CloseIcon from '@mui/icons-material/Close';
import { ColorModeContext } from '../../Layout/MainLayout'; // Assuming you use a context for theme

import GeneralSettings from './content/GeneralSettings';
import AboutSettings from './content/AboutSettings';
import ServicesSettings from './content/ServicesSettings';
import ContactSettings from './content/ContactSettings';

const settingsItems = [
  { id: 'General', label: 'General', icon: <SettingsIcon /> },
  { id: 'About', label: 'About', icon: <InfoIcon /> },
  { id: 'Services', label: 'Services', icon: <BuildIcon /> },
  { id: 'Contact', label: 'Contact', icon: <ContactMailIcon /> },
];

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ open, onClose }) => {
  const [selected, setSelected] = useState('General');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const colorMode = useContext(ColorModeContext);

  const renderContent = () => {
    switch (selected) {
      case 'General': return <GeneralSettings />;
      case 'About': return <AboutSettings />;
      case 'Services': return <ServicesSettings />;
      case 'Contact': return <ContactSettings />;
      default: return null;
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        display="flex"
        flexDirection={isMobile ? 'column' : 'row'}
        width={isMobile ? '100%' : 800}
        maxHeight="90vh"
        mx="auto"
        mt={5}
        bgcolor={theme.palette.background.paper}
        borderRadius={2}
        overflow="hidden"
        boxShadow={24}
      >
        <Box
          sx={{
            minWidth: isMobile ? '100%' : 200,
            bgcolor: theme.palette.mode === 'dark' ? '#111' : '#f5f5f5',
            p: 2,
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle2" fontWeight="bold">
              Settings
            </Typography>
            <IconButton size="small" onClick={onClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          <List>
            {settingsItems.map((item) => (
              <ListItem
                button
                key={item.id}
                selected={selected === item.id}
                onClick={() => setSelected(item.id)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box
          sx={{
            flex: 1,
            p: 3,
            bgcolor: theme.palette.background.default,
            overflowY: 'auto',
          }}
        >
          {renderContent()}
        </Box>
      </Box>
    </Modal>
  );
};

export default SettingsModal;
