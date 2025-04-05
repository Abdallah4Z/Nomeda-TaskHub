import React, { useState } from 'react'; // Import React and the useState hook
import { Box, Button, Modal,
   Typography, List, ListItem,
    ListItemSecondaryAction , 
    ListItemText, ListItemIcon ,
    Divider,Select,
  MenuItem,FormControl ,
  InputLabel} from '@mui/material'; // Import necessary MUI components
import '../style/settings.css'; // Import the external CSS file
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info'; // Import icon for About
import BuildIcon from '@mui/icons-material/Build'; // Import icon for Services
import ContactMailIcon from '@mui/icons-material/ContactMail'; // Import icon for Contact
import IOSSwitchComponent from './IOS';
import DropDown from './DropDown'; // Import the new ThemeSelect component
import { IconButton } from '@mui/material';

interface CenteredBoxProps {
  open: boolean;
  handleClose: () => void;
}

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

  const [themeSetting, setThemeSetting] = useState<string>('system');
  const handleThemeChange = (event: any) => {
    setThemeSetting(event.target.value);
  };
  const [LangSetting, setLangSetting] = useState<string>('system');
  const handleLangChange = (event: any) => {
    setLangSetting(event.target.value);
  };

  // Function to toggle the modal open/close
  const handleOpen = () => setOpen(true); // Opens the modal
  const handleClose = () => setOpen(false); // Closes the modal
  const handleSelectItem = (item:string) => {
    setSelectedItem(item); // Update the selected item state
  };
  const themeMenuItems = [
    { value: 'system', label: 'Use system setting' },
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'custom', label: 'Custom' },
  ];


  const LangMenuItems = [
    { value: 'system', label: 'Use system setting' },
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'arabic', label: 'Arabic' },
  ];

  const [TimeSetting, setTimeSetting] = useState<string>('system');
  const handleTimeChange = (event: any) => {
    setTimeSetting(event.target.value);
  };

  const TimeMenuItems = [
    { value: 'system', label: 'Use current Timezone' },
    { value: 'cairo', label: 'Cairo' },
    { value: 'london', label: 'London' },
    { value: 'NYC', label: 'New York City' },
    { value: 'beijing', label: 'beijing' },
    { value: 'moscow', label: 'moscow' },
    { value: 'LA', label: 'Los Angeles' },
  ];
  return (
<Box
  sx={{
    position: 'fixed',          // Fixed position relative to the viewport
    bottom: 0,                  // At the bottom
    width: '100%',              // Make it full width if desired (or adjust as needed)
  }}
>
  <IconButton
    onClick={handleOpen}       // Function to call when the button is clicked
    disableRipple              // Disables the ripple on click
    disableFocusRipple         // Disables the ripple when focused
    sx={{
      // Remove outline on focus
      '&:focus': {
        outline: 'none',
        boxShadow: 'none',
      },
      '&:hover': {
        color: '#fff',                // Change text/icon color on hover
        backgroundColor: 'fff', // Set backgroundColor to transparent (or any desired color)
      },
    }}
  >
    <SettingsIcon sx={{ color: '#fff' }} />
  </IconButton>

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
                selected={selectedItem === 'Contact'} 
                onClick={() => handleSelectItem('Contact')}>
                <ListItemIcon >
                    <ContactMailIcon sx={{ color: '#ffffff' }} />
                  </ListItemIcon>
                  <ListItemText primary="Contact" />
                </ListItem>
              </List>
              <Divider variant="middle" sx={{ borderColor: 'rgba(255,255,255,0.12)' }}/>
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
                selected={selectedItem === 'Contact'} 
                onClick={() => handleSelectItem('Contact')}>
                <ListItemIcon >
                    <ContactMailIcon sx={{ color: '#ffffff' }} />
                  </ListItemIcon>
                  <ListItemText primary="Contact" />
                </ListItem>
              </List>
              <Divider variant="middle" sx={{ borderColor: 'rgba(255,255,255,0.12)' }}/>
            </Box>






























          {/* Content inside the modal */}
          <Box className="content-container">
          {selectedItem === 'General' && (
              <div>
                <List>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'white', paddingLeft: 2,paddingBottom: 2}}>
                  Prefrences
                </Typography>
                <Divider variant="middle" sx={{ borderColor: 'rgba(255,255,255,0.12)' }}/>

                <ListItem >
                    <ListItemText primary="Appearance" sx={{color:'white'}}/>
                    <DropDown themeSetting={themeSetting} handleThemeChange={handleThemeChange} menuItems={themeMenuItems} /> {/* Use dynamic menu items */}

                  </ListItem>
                  <Typography variant="body2" sx={{ color: 'gray', marginBottom: 6,marginTop:-2, paddingLeft: 2 }}>
                  Choose the appearance of the application.
                </Typography>
                {/* <Typography variant="body2" sx={{ color: 'gray', marginBottom: 2, paddingLeft: 2 }}>
                  Configure general options for the application.
                </Typography> */}
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'white', paddingtop:1,paddingLeft: 2,paddingBottom: 2}}>
                  Language & Time
                </Typography>
                <Divider variant="middle" sx={{ borderColor: 'rgba(255,255,255,0.12)' }}/>
                <ListItem button>
                    <ListItemText primary="Language" sx={{color:'white'}}/>
                    <DropDown themeSetting={LangSetting} handleThemeChange={handleLangChange} menuItems={LangMenuItems} /> {/* Use dynamic menu items */}

                  </ListItem>
                  <Typography variant="body2" sx={{ color: 'gray', marginBottom: 2,marginTop:-2, paddingLeft: 2 }}>
                  Let Users select their preferred language.
                </Typography>
                <ListItem button>
                    <ListItemText primary="Start Week On Monday" sx={{color:'white'}}/>
                    <ListItemSecondaryAction>
                    <IOSSwitchComponent
                        edge="end"
                        checked={toggleStates.darkMode}
                        onChange={handleToggleChange('darkMode')}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Typography variant="body2" sx={{ color: 'gray', marginBottom: 2,marginTop:-2, paddingLeft: 2 }}>
                  this will make your calendar start on Monday instead of Sunday.
                </Typography>
                  <ListItem button>
                    <ListItemText primary="Set Time Zone Automatically Using Your Location" sx={{color:'white'}}/>
                    <ListItemSecondaryAction>
                    <IOSSwitchComponent
                        edge="end"
                        checked={toggleStates.enableNotifications}
                        onChange={handleToggleChange('enableNotifications')}
                      />
                    </ListItemSecondaryAction>
                    
                  </ListItem>
                  <Typography variant="body2" sx={{ color: 'gray', marginBottom: 2,marginTop:-2, paddingLeft: 2 }}>
                  Reminders, notifications and emails are delivered based on your time zone.
                </Typography>
                <ListItem button>
                    <ListItemText primary="Timezone" sx={{color:'white'}}/>
                    <DropDown themeSetting={TimeSetting} handleThemeChange={handleTimeChange} menuItems={TimeMenuItems} /> {/* Use dynamic menu items */}

                  </ListItem>
                  <Typography variant="body2" sx={{ color: 'gray', marginBottom: 2,marginTop:-2, paddingLeft: 2 }}>
                  Current timezone setting.
                </Typography>

                <ListItem button>
                    <ListItemText primary="TimeFormat" sx={{color:'white'}}/>
                    <ListItemSecondaryAction>
                    <IOSSwitchComponent
                        edge="end"
                        checked={toggleStates.liveChat}
                        onChange={handleToggleChange('liveChat')}
                      />
                    </ListItemSecondaryAction>
                    
                  </ListItem>
                  <Typography variant="body2" sx={{ color: 'gray', marginBottom: 2,marginTop:-2, paddingLeft: 2 }}>
                  12-hour or 24-hour clock, or regional date/time formats.
                </Typography>
                <Divider variant="middle" sx={{ borderColor: 'rgba(255,255,255,0.12)' }}/>

                

                



                </List>

                

              </div>
            )}

            {selectedItem === 'About' && (
              <div>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', paddingLeft: 2}}>
                  About
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey', marginBottom: 2 ,paddingLeft: 2}}>
                  Learn more about the application and its developers.
                </Typography>
                <List>
                  <ListItem button>
                    <ListItemText primary="Version Info"  sx={{color:'white'}}/>
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Privacy Policy" />
                  </ListItem>
                </List>
                <Divider sx={{ marginY: 2,borderColor:'grey',borderWidth:1}} /> {/* Divider between sections */}
                <DropDown themeSetting={themeSetting} handleThemeChange={handleThemeChange} menuItems={themeMenuItems} /> {/* Use dynamic menu items */}

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