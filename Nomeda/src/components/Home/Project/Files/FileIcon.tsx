import React from 'react';
import ImageIcon from '@mui/icons-material/Image';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import CodeIcon from '@mui/icons-material/Code';
import ArticleIcon from '@mui/icons-material/Article';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import { SxProps, Theme } from '@mui/material';

interface FileIconProps {
  type: string;
  sx?: SxProps<Theme>;
}

const FileIcon: React.FC<FileIconProps> = ({ type, sx }) => {
  switch (type) {
    case 'image':
      return <ImageIcon color="primary" sx={sx} />;
    case 'text':
      return <TextSnippetIcon color="secondary" sx={sx} />;
    case 'json':
    case 'xml':
      return <CodeIcon sx={{ color: '#ff9800', ...sx }} />;
    case 'html':
      return <CodeIcon sx={{ color: '#2196f3', ...sx }} />;
    case 'pdf':
      return <PictureAsPdfIcon sx={{ color: '#f44336', ...sx }} />;
    case 'word':
    case 'excel':
      return <DescriptionIcon sx={{ color: '#4caf50', ...sx }} />;
    default:
      return <ArticleIcon sx={sx} />;
  }
};

export default FileIcon;