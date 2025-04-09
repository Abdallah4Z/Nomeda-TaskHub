import React, { useState } from 'react';
import SettingsButton from './SettingsButton';
import SettingsModal from './SettingsModal';

const Settings: React.FC = () => {
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <SettingsButton onOpen={handleOpen} />
      <SettingsModal open={open} onClose={handleClose} />
    </>
  );
};

export default Settings;