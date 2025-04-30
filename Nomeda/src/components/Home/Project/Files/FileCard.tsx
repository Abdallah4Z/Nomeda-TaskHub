import React from 'react';
import { Card, CardContent, CardActions, Typography, Box, IconButton, Divider } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import FileIcon from './FileIcon';
import { File } from './types';

interface FileCardProps {
  file: File;
  onFileClick: (file: File) => void;
  onDownload: (file: File, event: React.MouseEvent) => void;
  onDelete: (file: File, event: React.MouseEvent) => void;
}

const FileCard: React.FC<FileCardProps> = ({ file, onFileClick, onDownload, onDelete }) => {
  return (
    <Card 
      sx={{ 
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3
        }, 
        width: 250,
      }}
      onClick={() => onFileClick(file)}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <FileIcon type={file.type} />
          <Typography variant="subtitle1" sx={{ ml: 1, fontWeight: 500, flexGrow: 1 }} noWrap>
            {file.name}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'text.secondary' }}>
          <Typography variant="body2">{file.size}</Typography>
          <Typography variant="body2">{file.date}</Typography>
        </Box>
        
        <Typography 
          variant="body2" 
          sx={{ 
            mt: 1, 
            bgcolor: 'action.hover', 
            px: 1, 
            py: 0.5, 
            borderRadius: 1,
            display: 'inline-block'
          }}
        >
          {file.project}
        </Typography>
      </CardContent>
      
      <Divider />
      
      <CardActions>
        <IconButton 
          size="small" 
          onClick={(e) => onDownload(file, e)}
        >
          <DownloadIcon fontSize="small" />
        </IconButton>
        
        <IconButton 
          size="small" 
          color="error"
          onClick={(e) => onDelete(file, e)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default FileCard;