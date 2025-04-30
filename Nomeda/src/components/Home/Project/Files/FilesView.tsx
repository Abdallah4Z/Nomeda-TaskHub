import React, { useState } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SearchSortBar from './SearchSortBar';
import FileCard from './FileCard';
import FilePreviewDialog from './FilePreviewDialog';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import { mockFiles } from './mockData';
import { File } from './types';
import { Start } from '@mui/icons-material';

const FilesView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<File | null>(null);

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

  // Handle file download
  const handleDownload = (file: File, event?: React.MouseEvent) => {
    if (event) event.stopPropagation();
    if (file.content) {
      const link = document.createElement('a');
      link.href = file.content;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  

  // Show delete confirmation
  const handleDeleteClick = (file: File, event: React.MouseEvent) => {
    event.stopPropagation();
    setDeleteConfirmation(file);
  };

  // Confirm file deletion
  const handleConfirmDelete = () => {
    if (deleteConfirmation) {
      // In a real app, this would delete the file
      alert(`Deleted ${deleteConfirmation.name}`);
      
      // If the deleted file is currently being previewed, close the preview
      if (selectedFile && selectedFile.id === deleteConfirmation.id) {
        setSelectedFile(null);
      }
      
      setDeleteConfirmation(null);
    }
  };

  // Cancel file deletion
  const handleCancelDelete = () => {
    setDeleteConfirmation(null);
  };

  // Filter and sort files
  const filteredAndSortedFiles = mockFiles
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
      
      {/* Upload Button */}
      <Button 
        variant="contained" 
        fullWidth 
        startIcon={<UploadFileIcon />}
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
      
      {/* Files Grid */}
      <Grid container spacing={3} justifyContent={'center'}>
        {filteredAndSortedFiles.map(file => (
          <Grid item xs={12} sm={6} md={4} key={file.id}>
            <FileCard 
              file={file}
              onFileClick={handleFileClick}
              onDownload={handleDownload}
              onDelete={handleDeleteClick}
            />
          </Grid>
        ))}
      </Grid>
      
      {/* Empty state */}
      {filteredAndSortedFiles.length === 0 && (
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
    </Box>
  );
};

export default FilesView;