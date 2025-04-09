import React from 'react';
import { Box } from '@mui/material';
import GeneralSettings from './content/GeneralSettings';
import AboutSettings from './content/AboutSettings';
import ServicesSettings from './content/ServicesSettings';
import ContactSettings from './content/ContactSettings';

interface SettingsContentProps {
  selectedItem: string | null;
}

const SettingsContent: React.FC<SettingsContentProps> = ({ selectedItem }) => {
  return (
    <Box className="content-container">
      {selectedItem === 'General' && <GeneralSettings />}
      {selectedItem === 'About' && <AboutSettings />}
      {selectedItem === 'Services' && <ServicesSettings />}
      {selectedItem === 'Contact' && <ContactSettings />}
    </Box>
  );
};

export default SettingsContent;