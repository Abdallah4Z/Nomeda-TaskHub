import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { FeedbackState } from './types';

interface FeedbackSnackbarProps {
  open: boolean;
  feedback: FeedbackState;
  onClose: () => void;
}

const FeedbackSnackbar: React.FC<FeedbackSnackbarProps> = ({
  open,
  feedback,
  onClose
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity={feedback.severity}
        sx={{ width: '100%' }}
      >
        {feedback.message}
      </Alert>
    </Snackbar>
  );
};

export default FeedbackSnackbar;
