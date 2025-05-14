import axios from 'axios';

// API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Interface for user registration data
interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

// Interface for user login data
interface LoginData {
  email: string;
  password: string;
}

// Interface for social authentication data
interface SocialAuthData {
  token: string;
  provider: 'google' | 'github';
}

// Authentication endpoints
export const authAPI = {  // Register a new user
  register: async (userData: RegisterData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);

      const data = response.data;

      // Save token to local storage
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      return data;
    } catch (error) {
      // Axios automatically throws errors for non-2xx responses
      console.error('Registration error:', error);
      
      // Format the error for consistency with our error handling
      if (axios.isAxiosError(error) && error.response) {
        const data = error.response.data;
        const customError = new Error(data.message) as Error & {
          response?: { data: { message: string; errorType?: string; success: boolean } }
        };
        customError.response = { data };
        throw customError;
      }
      
      throw error;
    }
  },  // Login a user
  login: async (loginData: LoginData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, loginData);
      // Success! The data is directly available in response.data
      const data = response.data;
      
      // Save token to local storage
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      return data;
    } catch (error) {
      // Axios automatically throws errors for non-2xx responses
      console.error('Login error:', error);
      
      // Format the error for consistency with our error handling
      if (axios.isAxiosError(error) && error.response) {
        const data = error.response.data;
        const customError = new Error(data.message || 'Login failed') as Error & {
          response?: { data: { message: string; errorType?: string; success: boolean } }
        };
        customError.response = { data };
        throw customError;
      }
      
      throw error;
    }
  },
  // Social authentication (Google, GitHub)
  socialAuth: async (authData: SocialAuthData) => {
    try {
      const endpoint = `${API_BASE_URL}/auth/${authData.provider}`;
      
      console.log(`Authenticating with ${authData.provider}`, { token: authData.token && 'Token provided' });
      
      const response = await axios.post(endpoint, { token: authData.token },);
      
      const data = response.data;
      console.log(`${authData.provider} auth response:`, data);
      
      // Save token to local storage
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      return data;
    } catch (error) {
      console.error('Social authentication error:', error);
      
      // Handle axios errors
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          // Network error
          throw new Error(`${authData.provider} authentication failed: Network error`);
        }
        
        if (error.response.status === 401 || error.response.status === 403) {
          throw new Error(`${authData.provider} authentication failed: Invalid token`);
        }
        
        if (error.response.data) {
          throw new Error(error.response.data.message || `${authData.provider} authentication failed`);
        }
      }
      
      throw error;
    }
  },
  // Get current user profile
  getCurrentUser: async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No auth token found');
      }
      
      const response = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      
      if (axios.isAxiosError(error) && error.response) {
        const data = error.response.data;
        throw new Error(data.message || 'Failed to get user data');
      }
      
      throw error;
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
  },
};

// Function to get auth header for protected routes
export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const getAuthHeader = () => {
  const token = getAuthToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Function to fetch project data
export const fetchProjectData = async (): Promise<any[]> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return [];
    }
    
    const response = await axios.get(`${API_BASE_URL}/projects`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching project data:', error);
    return [];
  }
};

// Function to search for projects by name or description
export const searchProjects = async (searchTerm: string): Promise<any[]> => {
  try {
    const allProjects = await fetchProjectData();
    
    if (!searchTerm || !allProjects || allProjects.length === 0) {
      return allProjects;
    }
    
    // Case-insensitive search in name and description
    const searchTermLower = searchTerm.toLowerCase();
    return allProjects.filter(project => 
      project.name.toLowerCase().includes(searchTermLower) || 
      (project.description && project.description.toLowerCase().includes(searchTermLower))
    );
  } catch (error) {
    console.error('Error searching projects:', error);
    return [];
  }
};

// Function to fetch task data for a specific project
export const fetchTasksForProject = async (projectId: string): Promise<any[]> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return [];
    }
    
    const response = await axios.get(`${API_BASE_URL}/projects/${projectId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return response.data.tasks || response.data.formattedTasks || [];
  } catch (error) {
    console.error(`Error fetching tasks for project ${projectId}:`, error);
    return [];
  }
};

export const sendMessageToAPI = async (inputText: string, imagePreview: string | null): Promise<string> => {
  // Define types for the message structure
  type MessageContent = { type: string; text?: string; image_url?: { url: string } };
  type APIMessage = { role: string; content: MessageContent[] };
  
  // Prepare API message format
  const apiMessages: APIMessage[] = [{ 
    role: "user", 
    content: [{ type: "text", text: inputText }] 
  }];

  // Add image to message if present
  if (imagePreview) {
    const base64Image = imagePreview.split(',')[1];
    apiMessages[0].content.push({
      type: "image_url",
      image_url: { url: `data:image/jpeg;base64,${base64Image}` }
    });
  }

  // Site info
  const SITE_URL = typeof window !== 'undefined' ? window.location.origin : '';
  const SITE_NAME = typeof document !== 'undefined' ? document.title : "Nomeda TaskHub";
    // Check if the query is about projects or tasks
  const isProjectQuery = /project|task|assignee|deadline|progress|status|milestone|due date|team|priority/i.test(inputText);
  
  // Extract specific project name if mentioned
  const projectNameMatch = inputText.match(/(?:about|for|on|related to|in|the project|project named?)\s+["']?([^"'.,?!]+)["']?/i);
  let specificProjectName = projectNameMatch ? projectNameMatch[1].trim() : null;
  
  // Prepare context data if it's a project-related query
  let contextData = "";
  if (isProjectQuery) {
    try {
      let projects = await fetchProjectData();
      
      // If a specific project is mentioned, filter to just that project
      if (specificProjectName && projects.length > 0) {
        const filteredProjects = await searchProjects(specificProjectName);
        if (filteredProjects.length > 0) {
          projects = filteredProjects;
          contextData = `Information about project "${specificProjectName}":\n`;
        } else {
          contextData = `No project found matching "${specificProjectName}". Here are other projects:\n`;
        }
      } else {
        contextData = "Project Information:\n";
      }
      
      if (projects && projects.length > 0) {
        // Limit to 5 most recent projects to avoid context length issues
        const limitedProjects = projects.slice(0, 5);
        
        for (const project of limitedProjects) {
          contextData += `- Project Name: ${project.name}\n`;
          contextData += `  Description: ${project.description || 'No description'}\n`;
          contextData += `  Created: ${new Date(project.createdAt).toLocaleDateString()}\n`;
          
          if (project.members && project.members.length > 0) {
            contextData += `  Team Members: ${project.members.length}\n`;
          }
          
          // Fetch tasks for this project
          const tasks = await fetchTasksForProject(project._id);
          if (tasks && tasks.length > 0) {
            // Calculate task statistics
            const completedTasks = tasks.filter(task => task.status === 'done').length;
            const progress = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;
            
            contextData += `  Progress: ${progress}% (${completedTasks}/${tasks.length} tasks completed)\n`;
            contextData += `  Tasks (${tasks.length} total):\n`;
            
            // Limit to 5 tasks per project to avoid context length issues
            const limitedTasks = tasks.slice(0, 5);
            for (const task of limitedTasks) {
              contextData += `    - ${task.title} (Status: ${task.status || 'Unknown'}${task.priority ? ', Priority: ' + task.priority : ''})\n`;
              if (task.dueDate) {
                contextData += `      Due: ${new Date(task.dueDate).toLocaleDateString()}\n`;
              }
              if (task.description) {
                // Truncate description to keep context manageable
                const shortDesc = task.description.length > 50 
                  ? task.description.substring(0, 50) + '...' 
                  : task.description;
                contextData += `      Description: ${shortDesc}\n`;
              }
            }
            if (tasks.length > 5) {
              contextData += `    - ... and ${tasks.length - 5} more tasks\n`;
            }
          } else {
            contextData += `  No tasks found for this project.\n`;
          }
        }
        
        if (projects.length > 5) {
          contextData += `- ... and ${projects.length - 5} more projects\n`;
        }
      } else {
        contextData += "No projects found.\n";
      }
    } catch (error) {
      console.error("Error fetching project data for context:", error);
    }
  }
  // Add system message with Nomeda TaskHub specific instructions
  const systemMessage = {
    role: "system",
    content: [
      {
        type: "text",
        text: `You are Pizza Chat, the intelligent assistant of Nomeda TaskHub project management system. You should introduce yourself as 'I am Pizza Chat, the assistant of Nomeda TaskHub.' whenever someone asks who you are. Answer all questions concisely and directly. When someone asks who developed you, answer 'I was developed by AIU & VT Student (Ahmed, Aiden, Belal, Martha, Merna)'.

Nomeda TaskHub is a comprehensive project management platform that helps teams organize tasks, track progress, and collaborate effectively. The system allows users to create and manage projects, assign tasks to team members, track deadlines, upload files, and communicate through a built-in chat system.

${contextData ? `Use this data to answer any project or task related questions: ${contextData}` : ''}

You help users with:
1. Project and task information - providing details about projects, tasks, deadlines, and progress
2. Suggestions for improving productivity and project management
3. Guidelines on how to use Nomeda TaskHub features effectively
4. Best practices for project management and team collaboration

If asked about a specific project or task that isn't in your context data, suggest that the user may need to create it first or check if they have proper permissions to access it.`
      }
    ]
  };
  apiMessages.unshift(systemMessage);
  
  try {
    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", 
      {
        model: "qwen/qwen2.5-vl-72b-instruct:free",
        messages: apiMessages
      },
      {
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "HTTP-Referer": SITE_URL,
          "X-Title": SITE_NAME,
          "Content-Type": "application/json"
        }
      }
    );
    
    return response.data.choices ? response.data.choices[0].message.content : "Error: No response";
  } catch (error) {
    console.error("Chat API error:", error);
    if (axios.isAxiosError(error) && error.response) {
      console.error("API error response:", error.response.data);
    }
    return "Sorry, I couldn't process your request at the moment.";
  }
};

export const formatText = (text: string): string => {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/^### (.*?)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*?)$/gm, "<h2>$1</h2>")
    .replace(/^# (.*?)$/gm, "<h1>$1</h1>")
    .replace(/\n- (.*?)$/gm, "<ul><li>$1</li></ul>")
    .replace(/\n/g, "<br>");
};