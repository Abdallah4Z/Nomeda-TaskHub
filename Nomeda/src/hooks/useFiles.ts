import { useState, useCallback } from 'react';
import { fileService, FileUploadResponse } from '../services/fileService';

export const useFiles = (projectId?: string) => {
  const [files, setFiles] = useState<FileUploadResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFiles = useCallback(async () => {
    if (!projectId) {
      setFiles([]);
      return;
    }
    
    setLoading(true);
    try {
      const fileList = await fileService.getFiles(projectId);
      setFiles(Array.isArray(fileList) ? fileList : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching files:', err);
      setError('Failed to load files');
      setFiles([]);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  const uploadFile = async (file: File) => {
    if (!projectId) return null;
    
    setLoading(true);
    try {
      const uploadedFile = await fileService.uploadFile(projectId, file);
      if (uploadedFile) {
        setFiles(prev => [...prev, uploadedFile]);
      }
      return uploadedFile;
    } catch (err) {
      console.error('Error uploading file:', err);
      setError('Failed to upload file');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteFile = async (fileId: string) => {
    if (!projectId) return false;
    
    setLoading(true);
    try {
      await fileService.deleteFile(projectId, fileId);
      setFiles(prev => prev.filter(file => file.id !== fileId));
      return true;
    } catch (err) {
      console.error('Error deleting file:', err);
      setError('Failed to delete file');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { files, loading, error, fetchFiles, uploadFile, deleteFile };
};
