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
  const SITE_NAME = typeof document !== 'undefined' ? document.title : "OurRepo";

  // Add system message
  const systemMessage = {
    role: "system",
    content: [
      {
        type: "text",
        text: "You are Pizza Chat, the assistant of the Project Repository System. You should introduce yourself as 'I am Pizza Chat, the assistant of the Project Repository System.' whenever someone asks who you are. Answer all questions concisely and directly. whenever someone asks who developed you should answer 'I developed by AIU & VT Student (Ahmed, Aiden, Belal, Martha, Merna)'."
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
          "Authorization": `Bearer ${process.env.VITE_OPENROUTER_API_KEY}`,
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