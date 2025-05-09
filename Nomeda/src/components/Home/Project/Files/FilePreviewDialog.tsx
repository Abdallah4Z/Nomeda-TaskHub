import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Typography, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import FileIcon from './FileIcon';
import FilePreview from './FilePreview';
import { File } from './types';

interface FilePreviewDialogProps {
  file: File | null;
  onClose: () => void;
  onDownload: (file: File) => void;
  onDelete: (file: File, event: React.MouseEvent) => void;
}

const FilePreviewDialog: React.FC<FilePreviewDialogProps> = ({ file, onClose, onDownload, onDelete }) => {
  if (!file) return null;

  return (
    <Dialog 
      open={Boolean(file)} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FileIcon type={file.type} />
          <Typography variant="h6" sx={{ ml: 1 }}>
            {file.name}
          </Typography>
        </Box>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers>
        <FilePreview file={file} />
      </DialogContent>
      
      <DialogActions>
        <Button 
          startIcon={<DownloadIcon />}
          onClick={() => onDownload(file)}
        >
          Download
        </Button>
        <Button 
          color="error" 
          startIcon={<DeleteIcon />}
          onClick={(e) => onDelete(file, e)}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilePreviewDialog;