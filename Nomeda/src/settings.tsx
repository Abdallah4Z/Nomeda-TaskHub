import React, { useState } from 'react'; // Import React and the useState hook
import { Box, Button, Modal, Typography, List, ListItem, ListItemSecondaryAction , ListItemText, ListItemIcon ,Divider } from '@mui/material'; // Import necessary MUI components
import './settings.css'; // Import the external CSS file
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info'; // Import icon for About
import BuildIcon from '@mui/icons-material/Build'; // Import icon for Services
import ContactMailIcon from '@mui/icons-material/ContactMail'; // Import icon for Contact


//MAKE COMPONENT
const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

const CenteredBox = () => {
  const [open, setOpen] = useState(false); // State to control whether the modal is open or not
  const [selectedItem, setSelectedItem] = useState<string | null>(null); // Explicitly type the selectedItem as string or null
  const [toggleStates, setToggleStates] = useState({
    enableNotifications: false,
    darkMode: false,
    versionInfo: false,
    privacyPolicy: false,
    emailNotifications: false,
    dataSyncing: false,
    emailSupport: false,
    liveChat: false,
  });

  const handleToggleChange = (key: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setToggleStates({
      ...toggleStates,
      [key]: event.target.checked,
    });
  };
  // Function to toggle the modal open/close
  const handleOpen = () => setOpen(true); // Opens the modal
  const handleClose = () => setOpen(false); // Closes the modal
  const handleSelectItem = (item:string) => {
    setSelectedItem(item); // Update the selected item state
  };
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {/* Main container to center content (height 100vh means full screen height) */}
      
      {/* Button that triggers opening the modal */}
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Open Box
      </Button>

      {/* Modal component for the box that appears in the middle */}
      <Modal
        open={open} // Whether the modal is open or not
        onClose={handleClose} // Function to call when the modal is closed
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className="modal-box" >
        
        
            <Box className="nav-container">
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'grey' ,
                marginBottom:-1,fontFamily:'sans-serif',fontSize:12,
                marginLeft:2}}>
              General Settings
            </Typography>
              <List>
                <ListItem 
                button 
                selected={selectedItem === 'General'} 

                onClick={() => handleSelectItem('General')}>
                <ListItemIcon>
                    <SettingsIcon sx={{ color: '#ffffff' }} />
                  </ListItemIcon>
                  <ListItemText primary="General" />
                </ListItem>
                <ListItem 
                button 
                selected={selectedItem === 'About'} 
                onClick={() => handleSelectItem('About')}>
                <ListItemIcon>
                    <InfoIcon sx={{ color: '#ffffff' }} />
                  </ListItemIcon>
                  <ListItemText primary="About" />
                </ListItem>
                <ListItem
                 button
                 selected={selectedItem === 'Services'} 

                 onClick={() => handleSelectItem('Services')}>
                  <ListItemText primary="Services" />
                </ListItem>
                <ListItem 
                button 
                selected={selectedItem === 'Contact'} 

                onClick={() => handleSelectItem('Contact')}>
                <ListItemIcon >
                    <ContactMailIcon sx={{ color: '#ffffff' }} />
                  </ListItemIcon>
                  <ListItemText primary="Contact" />
                </ListItem>
              </List>
            </Box>
          {/* Content inside the modal */}
          <Box className="content-container">
          {selectedItem === 'General' && (
              <div>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black' }}>
                  General Settings
                </Typography>
                <Typography variant="body2" sx={{ color: 'gray', marginBottom: 2 }}>
                  Configure general options for the application.
                </Typography>
                <List>
                  <ListItem button>
                    <ListItemText primary="Enable Notifications" />
                    <ListItemSecondaryAction>
                    <IOSSwitch
                        edge="end"
                        checked={toggleStates.enableNotifications}
                        onChange={handleToggleChange('enableNotifications')}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Dark Mode" />
                  </ListItem>
                </List>
                <Divider sx={{ marginY: 2,borderColor:'grey',borderWidth:1}} /> {/* Divider between sections */}

              </div>
            )}

            {selectedItem === 'About' && (
              <div>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black' }}>
                  About
                </Typography>
                <Typography variant="body2" sx={{ color: 'gray', marginBottom: 2 }}>
                  Learn more about the application and its developers.
                </Typography>
                <List>
                  <ListItem button>
                    <ListItemText primary="Version Info" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Privacy Policy" />
                  </ListItem>
                </List>
                <Divider sx={{ marginY: 2,borderColor:'grey',borderWidth:1}} /> {/* Divider between sections */}

              </div>
            )}

            {selectedItem === 'Services' && (
              <div>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black' }}>
                  Services
                </Typography>
                <Typography variant="body2" sx={{ color: 'gray', marginBottom: 2 }}>
                  Available services that you can configure.
                </Typography>
                <List>
                  <ListItem button>
                    <ListItemText primary="Email Notifications" />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={toggleStates.emailNotifications}
                        onChange={handleToggleChange('emailNotifications')}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Data Syncing" />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={toggleStates.dataSyncing}
                        onChange={handleToggleChange('dataSyncing')}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
                <Divider sx={{ marginY: 2,borderColor:'grey',borderWidth:1}} /> {/* Divider between sections */}

              </div>
            )}

            {selectedItem === 'Contact' && (
              <div>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black' }}>
                  Contact Support
                </Typography>
                <Typography variant="body2" sx={{ color: 'gray', marginBottom: 2 }}>
                  Get in touch with our support team for assistance.
                </Typography>
                <List>
                  <ListItem button>
                    <ListItemText primary="Email Support" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Live Chat" />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={toggleStates.liveChat}
                        onChange={handleToggleChange('liveChat')}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
                <Divider sx={{ marginY: 2,borderColor:'grey',borderWidth:1}} /> {/* Divider between sections */}

              </div>
            )}
            </Box>
        </Box>
    </Modal>
</Box>
  );
};

export default CenteredBox;
