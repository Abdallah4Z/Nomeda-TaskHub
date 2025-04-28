import { useState, useEffect } from 'react'
import { authAPI } from '../services/apiService';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  joinedDate: string;
  photoUrl?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsLoading(false);
          return;
        }

        const response = await authAPI.getCurrentUser();
        if (response.success && response.user) {
          setUser(response.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const updateUser = async (updatedUser: Partial<User>) => {
    try {
      // In a real implementation, we would have an API call here
      // For now, just update the local state
      setUser(prev => prev ? { ...prev, ...updatedUser } : null);
      return updatedUser;
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
    }
  };

  // Upload profile photo (would need a separate API endpoint)
  const uploadProfilePhoto = async (file: File) => {
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would upload to a server and get a URL
      // For demo, we'll use a blob URL
      const photoUrl = URL.createObjectURL(file);
      
      setUser(prev => prev ? {...prev, photoUrl} : null);
      return photoUrl;
    } catch (error) {
      console.error('Failed to upload photo:', error);
      throw error;
    }
  };

  // Login user
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await authAPI.login({ email, password });
      
      if (response.success && response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
        return response.user;
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register user
  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await authAPI.register({ name, email, password });
      
      if (response.success && response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
        return response.user;
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Social authentication (Google, GitHub)
  const socialAuth = async (token: string, provider: 'google' | 'github') => {
    try {
      setIsLoading(true);
      const response = await authAPI.socialAuth({ token, provider });
      
      if (response.success && response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
        return response.user;
      } else {
        throw new Error(`${provider.charAt(0).toUpperCase() + provider.slice(1)} authentication failed`);
      }
    } catch (error) {
      console.error(`${provider} auth error:`, error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    authAPI.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    updateUser,
    uploadProfilePhoto,
    login,
    register,
    socialAuth,
    logout,
  };
};