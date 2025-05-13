import apiService from './axiosClient';

export interface FileUploadResponse {
  id: string;
  name: string;
  type: string;
  url: string;
  project: string;
  uploadedBy: string;
  date: string;
}

class FileService {
  async uploadFile(projectId: string, file: File): Promise<FileUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiService.post(`/projects/${projectId}/files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async getFiles(projectId: string): Promise<FileUploadResponse[]> {
    const response = await apiService.get(`/projects/${projectId}/files`);
    return response.data;
  }

  async deleteFile(projectId: string, fileId: string): Promise<void> {
    await apiService.delete(`/projects/${projectId}/files/${fileId}`);
  }

  async downloadFile(fileUrl: string): Promise<Blob> {
    const response = await apiService.get(fileUrl, { responseType: 'blob' });
    return response.data;
  }
}

export const fileService = new FileService();
