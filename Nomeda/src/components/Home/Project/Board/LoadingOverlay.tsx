import React from 'react';
import { CircularProgress } from '@mui/material';

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading, message = 'Loading...' }) => {
  if (!isLoading) return null;
  
  return (
    <div style={{ 
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10
    }}>
      <CircularProgress />
      <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>{message}</span>
    </div>
  );
};

export default LoadingOverlay;
