import axios from 'axios';
import { Project, Task } from '../types/project';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to handle errors
const handleError = (error: any) => {
  console.error('API Error:', error);
  if (error.response) {
    // Server responded with an error status
    throw new Error(error.response.data.message || 'An error occurred');
  } else if (error.request) {
    // Request was made but no response received
    throw new Error('No response from server. Please check your connection.');
  } else {
    // Error setting up request
    throw new Error('Error setting up request: ' + error.message);
  }
};

// Get auth token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const projectService = {
  async getUserProjects(): Promise<Project[]> {
    try {
      const response = await axios.get(`${API_URL}/projects`, {
        headers: {
          ...getAuthHeader()
        }
      });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  async createProject(data: { name: string; description?: string; members?: string[] }) {
    try {
      const response = await axios.post(`${API_URL}/projects`, data, {
        headers: {
          ...getAuthHeader()
        }
      });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  async getProject(id: string): Promise<Project> {
    try {
      const response = await axios.get(`${API_URL}/projects/${id}`, {
        headers: {
          ...getAuthHeader()
        }
      });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  async updateProject(id: string, data: Partial<Project>) {
    try {
      const response = await axios.put(`${API_URL}/projects/${id}`, data, {
        headers: {
          ...getAuthHeader()
        }
      });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  async createTask(projectId: string, taskData: Partial<Task>) {
    try {
      const response = await axios.post(`${API_URL}/projects/${projectId}/tasks`, taskData, {
        headers: {
          ...getAuthHeader()
        }
      });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  async updateTask(projectId: string, taskId: string, taskData: Partial<Task>) {
    try {
      const response = await axios.put(
        `${API_URL}/projects/${projectId}/tasks/${taskId}`,
        taskData,
        {
          headers: {
            ...getAuthHeader()
          }
        }
      );
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  async deleteTask(projectId: string, taskId: string) {
    try {
      const response = await axios.delete(
        `${API_URL}/projects/${projectId}/tasks/${taskId}`,
        {
          headers: {
            ...getAuthHeader()
          }
        }
      );
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  async uploadFile(projectId: string, file: File) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await axios.post(
        `${API_URL}/projects/${projectId}/files`,
        formData,
        {
          headers: {
            ...getAuthHeader(),
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  async deleteFile(projectId: string, fileId: string) {
    try {
      const response = await axios.delete(
        `${API_URL}/projects/${projectId}/files/${fileId}`,
        {
          headers: {
            ...getAuthHeader()
          }
        }
      );
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }
};