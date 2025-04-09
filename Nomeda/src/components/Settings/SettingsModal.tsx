import React, { useState } from 'react';
import { Modal, Box } from '@mui/material';
import SettingsNavigation from './SettingsNavigation';
import SettingsContent from './SettingsContent';
import '../../style/settings.css';

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ open, onClose }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>('General');

  const handleSelectItem = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box className="modal-box">
        <SettingsNavigation
          selectedItem={selectedItem}
          onSelectItem={handleSelectItem}
        />
        <SettingsContent selectedItem={selectedItem} />
      </Box>
    </Modal>
  );
};

export default SettingsModal;