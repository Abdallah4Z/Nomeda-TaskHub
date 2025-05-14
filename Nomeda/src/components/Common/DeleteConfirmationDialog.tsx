import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';

interface DeleteConfirmationDialogProps {
  title: string;
  itemName?: string;
  message?: string;
  isOpen: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  title,
  itemName,
  message = 'Are you sure you want to delete this item? This action cannot be undone.',
  isOpen,
  isDeleting,
  onClose,
  onConfirm,
}) => {
  const handleConfirm = async () => {
    await onConfirm();
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={() => !isDeleting && onClose()}
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          minWidth: '350px'
        }
      }}
    >
      <DialogTitle sx={{ 
        borderBottom: '1px solid rgba(0,0,0,0.07)', 
        pb: 1.5,
        fontWeight: 600 
      }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ 
          pt: 3, 
          pb: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5
        }}>
          {itemName && <Box sx={{ fontWeight: 500 }}>"{itemName}"</Box>}
          <Box sx={{ color: 'text.secondary' }}>
            {message}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button 
          onClick={onClose} 
          disabled={isDeleting}
          sx={{ 
            textTransform: 'none',
            fontWeight: 500 
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleConfirm} 
          color="error" 
          variant="contained"
          disabled={isDeleting}
          startIcon={isDeleting ? <CircularProgress size={20} color="inherit" /> : null}
          sx={{ 
            textTransform: 'none',
            fontWeight: 500,
            px: 2
          }}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
