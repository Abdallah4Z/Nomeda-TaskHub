// API base URL
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:5000/api';

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
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (!response.ok) {
        // Create an error object with the response data for better error handling
        const error = new Error(data.message) as Error & {
          response?: { data: { message: string; errorType?: string; success: boolean } }
        };
        error.response = { data };
        throw error;
      }
      
      // Save token to local storage
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  // Login a user
  login: async (loginData: LoginData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      if (!response.ok) {
        // Create an error object with the response data for better error handling
        const error = new Error(data.message) as Error & {
          response?: { data: { message: string; errorType?: string; success: boolean } }
        };
        error.response = { data };
        throw error;
      }
      
      // Save token to local storage
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Social authentication (Google, GitHub)
  socialAuth: async (authData: SocialAuthData) => {
    try {
      const endpoint = `${API_BASE_URL}/auth/${authData.provider}`;
      
      console.log(`Authenticating with ${authData.provider}`, { token: authData.token && 'Token provided' });
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: authData.token }),
      });

      // Check if content type is JSON before trying to parse
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error(`Server returned non-JSON response: ${contentType}`);
        const text = await response.text();
        console.error('Raw response:', text.substring(0, 500) + (text.length > 500 ? '...' : ''));
        throw new Error(`${authData.provider} authentication failed: Server returned non-JSON response`);
      }
      
      const data = await response.json();
      console.log(`${authData.provider} auth response:`, data);
      
      if (!response.ok) {
        throw new Error(data.message || `${authData.provider} authentication failed`);
      }
      
      // Save token to local storage
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      return data;
    } catch (error) {
      console.error('Social authentication error:', error);
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
      
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to get user data');
      }
      
      return data;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
  },
};

// Function to get auth header for protected routes
export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const sendMessageToAPI = async (inputText: string, imagePreview: string | null): Promise<string> => {
  // Prepare API message format
  const apiMessages: any[] = [{ 
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
  const response = await fetch( "https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer API_KEY`,
      "HTTP-Referer": SITE_URL,
      "X-Title": SITE_NAME,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "qwen/qwen2.5-vl-72b-instruct:free",
      messages: apiMessages
    })
  });

  const data = await response.json();
  return data.choices ? data.choices[0].message.content : "Error: No response";
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