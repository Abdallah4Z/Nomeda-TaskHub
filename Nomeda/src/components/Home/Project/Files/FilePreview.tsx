import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { File } from './types';

interface FilePreviewProps {
  file: File;
}

const FilePreview: React.FC<FilePreviewProps> = ({ file }) => {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // For text-based files, fetch the content from the given path
    if (['text', 'json', 'html', 'xml'].includes(file.type)) {
      fetch(file.content)
        .then((res) => {
          if (!res.ok) throw new Error('Failed to load file content');
          return res.text();
        })
        .then(setContent)
        .catch((err) => setError(err.message));
    } else {
      setContent(null); // Not applicable for binary or embed files
    }
  }, [file]);

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', p: 4 }}>
        <Typography color="error">Error loading file: {error}</Typography>
      </Box>
    );
  }

  switch (file.type) {
    case 'image':
      return (
        <Box sx={{ textAlign: 'center' }}>
          <img src={file.content} alt={file.name} style={{ maxWidth: '100%', maxHeight: '600px' }} />
        </Box>
      );
    case 'pdf':
      return (
        <iframe
          src={file.content}
          title={file.name}
          style={{ width: '100%', height: 600, border: 'none' }}
        />
      );
    case 'text':
    case 'html':
    case 'xml':
      return (
        <pre style={{ whiteSpace: 'pre-wrap', padding: '16px' }}>
          {content ?? 'Loading...'}
        </pre>
      );
    case 'json':
      try {
        const parsed = content ? JSON.parse(content) : null;
        return (
          <pre style={{ whiteSpace: 'pre-wrap', padding: '16px' }}>
            {parsed ? JSON.stringify(parsed, null, 2) : 'Loading...'}
          </pre>
        );
      } catch (err) {
        return <Typography color="error">Invalid JSON</Typography>;
      }
    default:
      return (
        <Box sx={{ textAlign: 'center', p: 4 }}>
          <Typography variant="body1" color="text.secondary">
            Preview not available for this file type.
          </Typography>
        </Box>
      );
  }
};

export default FilePreview;
