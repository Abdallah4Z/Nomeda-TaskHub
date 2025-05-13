export interface File {
    id: string;
    name: string;
    type: string;
    size?: string;
    url: string;
    project: string;
    uploadedBy: string;
    date: string;
    content?: string;
  }