import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, Grid, CircularProgress, Alert, Snackbar } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SearchSortBar from './SearchSortBar';
import FileCard from './FileCard';
import FilePreviewDialog from './FilePreviewDialog';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import { useParams } from 'react-router-dom';
import { useFiles } from '../../../../hooks/useFiles';
import { File } from './types';

interface Props {
  projectId?: string;
}

const FilesView: React.FC<Props> = ({ projectId }) => {
  const params = useParams();
  const id = projectId || params.id;
  const { files: rawFiles, loading, error, fetchFiles, uploadFile, deleteFile } = useFiles(id);
  
  // Ensure files is always an array
  const files = Array.isArray(rawFiles) ? rawFiles : [];
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<File | null>(null);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  // Handle sort change
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  // Handle file selection
  const handleFileClick = (file: File) => {
    setSelectedFile(file);
  };

  // Close file preview
  const handleClosePreview = () => {
    setSelectedFile(null);
  };

  // Handle file upload
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    try {
      const uploadedFile = await uploadFile(files[0]);
      if (uploadedFile) {
        setNotification({ message: 'File uploaded successfully', type: 'success' });
      }
    } catch (error) {
      console.error('Upload error:', error);
      setNotification({ message: 'Failed to upload file', type: 'error' });
    }

    // Clear the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle file download
  const handleDownload = async (file: File, event?: React.MouseEvent) => {
    if (event) event.stopPropagation();
    
    try {
      const response = await fetch(file.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      setNotification({ message: 'Failed to download file', type: 'error' });
    }
  };

  // Show delete confirmation
  const handleDeleteClick = (file: File, event: React.MouseEvent) => {
    event.stopPropagation();
    setDeleteConfirmation(file);
  };

  // Confirm file deletion
  const handleConfirmDelete = async () => {
    if (!deleteConfirmation) return;

    try {
      const success = await deleteFile(deleteConfirmation.id);
      if (success) {
        setNotification({ message: 'File deleted successfully', type: 'success' });
        if (selectedFile?.id === deleteConfirmation.id) {
          setSelectedFile(null);
        }
      }
    } catch (error) {
      console.error('Delete error:', error);
      setNotification({ message: 'Failed to delete file', type: 'error' });
    }
    
    setDeleteConfirmation(null);
  };

  // Cancel file deletion
  const handleCancelDelete = () => {
    setDeleteConfirmation(null);
  };

  // Filter and sort files
  const filteredAndSortedFiles = files
    .filter(file => 
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.project.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type);
          break;
        case 'project':
          comparison = a.project.localeCompare(b.project);
          break;
        default:
          comparison = 0;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%', p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>Files</Typography>
      
      {/* Search and Sort Bar */}
      <SearchSortBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortChange={handleSort}
      />
      
      {/* Upload Button and Hidden Input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />
      <Button 
        variant="contained" 
        fullWidth 
        startIcon={<UploadFileIcon />}
        onClick={handleUploadClick}
        disabled={loading}
        sx={{ 
          py: 2, 
          mb: 3,
          bgcolor: 'primary.main',
          '&:hover': {
            bgcolor: 'primary.dark',
          }
        }}
      >
        Upload New File
      </Button>
      
      {/* Loading State */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}
      
      {/* Files Grid */}
      {!loading && (
        <Grid container spacing={3}>
          {filteredAndSortedFiles.map(file => (
            <Grid key={file.id} spacing={3} style={{ padding: '12px' }}>
              <FileCard 
                file={file}
                onFileClick={handleFileClick}
                onDownload={handleDownload}
                onDelete={handleDeleteClick}
              />
            </Grid>
          ))}
        </Grid>
      )}
      
      {/* Empty state */}
      {!loading && filteredAndSortedFiles.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No files found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try changing your search or upload new files
          </Typography>
        </Box>
      )}
      
      {/* File Preview Dialog */}
      <FilePreviewDialog 
        file={selectedFile}
        onClose={handleClosePreview}
        onDownload={handleDownload}
        onDelete={handleDeleteClick}
      />
      
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog 
        file={deleteConfirmation}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      {/* Notification Snackbar */}
      <Snackbar
        open={!!notification}
        autoHideDuration={6000}
        onClose={() => setNotification(null)}
      >
        <Alert 
          onClose={() => setNotification(null)} 
          severity={notification?.type || 'info'}
          sx={{ width: '100%' }}
        >
          {notification?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FilesView;