import { useState } from 'react'

interface User {
  id: string
  name: string
  email: string
  phone?: string
  joinedDate: string
  photoUrl?: string
}

// Mock user data
const MOCK_USER: User = {
  id: 'user-123',
  name: 'Fierst User',
  email: 'user.mail@mail.co',
  phone: '+20 1551934703',
  joinedDate: new Date('2023-01-15').toISOString(),
  photoUrl: 'https://i.pravatar.cc/200?img=12' // Using a random avatar
}

export const useAuth = () => {
  // Initialize with mock user
  const [user, setUser] = useState<User | null>(MOCK_USER)
  const [isAuthenticated, setIsAuthenticated] = useState(true) // Set authenticated to true

  const updateUser = async (updatedUser: User) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))
    setUser(updatedUser)
    return updatedUser // Return the updated user
  }

  const uploadProfilePhoto = async (file: File) => {
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // In a real app, you would upload to a server and get a URL
    // For demo, we'll use a mock URL or create a blob URL
    const photoUrl = file 
      ? URL.createObjectURL(file) 
      : 'https://i.pravatar.cc/300?img=' + Math.floor(Math.random() * 70)
    
    setUser(prev => prev ? {...prev, photoUrl} : null)
    return photoUrl
  }

  // Mock login/logout if needed
  const login = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    setUser(MOCK_USER)
    setIsAuthenticated(true)
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  return {
    user,
    isAuthenticated,
    updateUser,
    uploadProfilePhoto,
    login,
    logout,
    // TODO: other auth methods as needed
  }
}