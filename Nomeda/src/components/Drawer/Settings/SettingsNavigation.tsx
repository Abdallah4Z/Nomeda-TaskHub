import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import BuildIcon from '@mui/icons-material/Build';
import ContactMailIcon from '@mui/icons-material/ContactMail';

interface SettingsNavigationProps {
  selectedItem: string | null;
  onSelectItem: (item: string) => void;
}

const SettingsNavigation: React.FC<SettingsNavigationProps> = ({
  selectedItem,
  onSelectItem
}) => {
  // Define navigation sections
  const navigationSections = [
    {
      title: 'General Settings',
      items: [
        { id: 'General', icon: <SettingsIcon sx={{ color: '#ffffff' }} />, label: 'General' },
        { id: 'About', icon: <InfoIcon sx={{ color: '#ffffff' }} />, label: 'About' },
        { id: 'Services', icon: <BuildIcon sx={{ color: '#ffffff' }} />, label: 'Services' },
        { id: 'Contact', icon: <ContactMailIcon sx={{ color: '#ffffff' }} />, label: 'Contact' }
      ]
    }
    
  ];

  return (
    <Box className="nav-container">
      {navigationSections.map((section, sectionIndex) => (
        <React.Fragment key={`section-${sectionIndex}`}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: 'grey',
              marginBottom: -1,
              fontFamily: 'sans-serif',
              fontSize: 12,
              marginLeft: 2,
            }}
          >
            {section.title}
          </Typography>
          
          <List>
            {section.items.map((item) => (
              <ListItem
                key={`${sectionIndex}-${item.id}`}
                button
                selected={selectedItem === item.id}
                onClick={() => onSelectItem(item.id)}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
          
          {sectionIndex < navigationSections.length - 1 && (
            <Divider variant="middle" sx={{ borderColor: 'rgba(255,255,255,0.12)' }} />
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default SettingsNavigation;