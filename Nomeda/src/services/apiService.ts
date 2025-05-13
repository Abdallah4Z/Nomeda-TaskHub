

import { User } from '../hooks/useAuth';

// Authentication API endpoints
export const authAPI = {
  login: async ({ email, password }: { email: string; password: string }) => {
    try {
      // Simulating API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Login API error:', error);
      return { success: false, message: 'Network error' };
    }
  },

  register: async ({ name, email, password }: { name: string; email: string; password: string }) => {
    try {
      // Simulating API call
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Register API error:', error);
      return { success: false, message: 'Network error' };
    }
  },

  socialAuth: async ({ token, provider }: { token: string; provider: 'google' | 'github' }) => {
    try {
      // Simulating API call
      const response = await fetch(`/api/auth/${provider}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error(`${provider} auth API error:`, error);
      return { success: false, message: 'Network error' };
    }
  },

  getCurrentUser: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return { success: false, message: 'No token found' };
      }

      // Simulating API call
      const response = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      
      const data = await response.json();
      
      if (response.ok) {
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Get current user API error:', error);
      return { success: false, message: 'Network error' };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  }
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
  // 
  const systemMessage = {
    role: "system",
    content: [
      {
        type: "text",
        text: "You are Nemo, the AI assistant for Nomeda TaskHub project management system. You should introduce yourself as 'I am Nemo, your AI assistant for Nomeda TaskHub. I can help you manage projects, tasks, and team collaboration efficiently.' whenever someone asks who you are. Answer all questions concisely and directly, focusing on project management, task organization, and productivity features. If someone asks who developed you, respond with 'I was developed by AIU Students (Belal, Abdallah, and Ahmed) as part of the Nomeda TaskHub project management solution.' You should emphasize features like task management, team collaboration, project tracking, and productivity tools available in Nomeda TaskHub."
      }
    ]
  };

  apiMessages.unshift(systemMessage);
  const response = await fetch( "https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer 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`,
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