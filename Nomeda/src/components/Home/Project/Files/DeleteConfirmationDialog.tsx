import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from '@mui/material';
import { File } from './types';

interface DeleteConfirmationDialogProps {
  file: File | null;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({ file, onConfirm, onCancel }) => {
  if (!file) return null;

  return (
    <Dialog 
      open={Boolean(file)} 
      onClose={onCancel}
    >
      <DialogTitle>
        Delete File?
      </DialogTitle>
      
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete "{file.name}"? This action cannot be undone.
        </Typography>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          color="error" 
          variant="contained"
          onClick={onConfirm}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;