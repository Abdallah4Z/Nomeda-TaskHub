import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectService } from '../services/projectService';
import MainLayout from '../components/Layout/MainLayout';
import Project from '../components/Home/Project/Project';
import { Project as ProjectType } from '../types/project';
import { Box, CircularProgress, Typography, Alert } from '@mui/material';

const ProjectViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchProject = useCallback(async () => {
    if (!id) {
      setError('No project ID provided');
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      const data = await projectService.getProject(id);
      setProject(data);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching project:", err);
      setError(err.message || 'Failed to load project');
      // If project not found (404), redirect to home or projects list
      if (err.message?.includes('not found')) {
        setTimeout(() => navigate('/'), 3000); // Redirect after showing error briefly
      }
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const handleProjectUpdate = useCallback(async (updatedData: Partial<ProjectType>) => {
    if (!id || !project) return;
    
    try {
      await projectService.updateProject(id, updatedData);
      // Refetch project to get updated data
      fetchProject();
    } catch (err: any) {
      setError(err.message || 'Failed to update project');
    }
  }, [id, project, fetchProject]);

  if (loading) {
    return (
      <MainLayout>
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          minHeight="80vh"
          flexDirection="column"
        >
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading project...
          </Typography>
        </Box>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          minHeight="80vh"
        >
          <Alert severity="error" sx={{ maxWidth: 500 }}>
            {error}
          </Alert>
        </Box>
      </MainLayout>
    );
  }

  if (!project) {
    return (
      <MainLayout>
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          minHeight="80vh"
        >
          <Alert severity="warning" sx={{ maxWidth: 500 }}>
            No project data available
          </Alert>
        </Box>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Project 
        project={project} 
        onUpdate={handleProjectUpdate}
        refreshProject={fetchProject}
      />
    </MainLayout>
  );
};

export default ProjectViewPage;