import React, { useState } from 'react';
import { Box, Typography, IconButton, Tooltip, CircularProgress } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileIcon from '../Files/FileIcon';
import FilePreviewDialog from '../Files/FilePreviewDialog';
import { File } from '../Files/types';

interface FileComponentProps {
  id: number;
  file: File;
}

const FileComponent: React.FC<FileComponentProps> = ({ id, file }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatFileSize = (size: number): string => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let value = size;
    let unitIndex = 0;

    while (value >= 1024 && unitIndex < units.length - 1) {
      value /= 1024;
      unitIndex++;
    }

    return `${value.toFixed(1)} ${units[unitIndex]}`;
  };

  const handlePreviewOpen = () => {
    setIsLoading(true);
    setTimeout(() => {
      setPreviewOpen(true);
      setIsLoading(false);
    }, 300); // Simulate loading delay
  };

  const handlePreviewClose = () => {
    setPreviewOpen(false);
  };

  const handleDownload = (file: File) => {
    try {
      const url = window.URL.createObjectURL(new Blob([file]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      // You might want to show a notification to the user here
    }
  };

  const handleDelete = (file: File, event: React.MouseEvent) => {
    event.stopPropagation();
    console.log('Delete file:', file.name);
    // Implement delete logic here
  };

  return (
    <Box
      sx={{
        textAlign: 'center',
        mt: 2,
        p: 2,
        borderRadius: 2,
        transition: 'all 0.2s',
        '&:hover': {
          backgroundColor: 'action.hover',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
        maxWidth: 300,
        mx: 'auto',
      }}
      role="region"
      aria-label={`File preview for ${file.name}`}
    >
      <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
        File
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, maxWidth: '100%' }}>
          <FileIcon type={file.type} />
          <Box sx={{ textAlign: 'left' }}>
            <Typography
              variant="body2"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: 200,
              }}
            >
              {file.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatFileSize(file.size)}
            </Typography>
          </Box>
        </Box>
        <Tooltip title="Preview file">
          <IconButton
            onClick={handlePreviewOpen}
            color="primary"
            disabled={isLoading}
            sx={{
              '&:hover': {
                transform: 'scale(1.1)',
                transition: 'transform 0.2s',
              },
            }}
            aria-label={`Preview ${file.name}`}
          >
            {isLoading ? <CircularProgress size={24} /> : <VisibilityIcon />}
          </IconButton>
        </Tooltip>
      </Box>

      <FilePreviewDialog
        file={previewOpen ? file : null}
        onClose={handlePreviewClose}
        onDownload={handleDownload}
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default FileComponent;