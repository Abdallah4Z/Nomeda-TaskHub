import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_LIFETIME = process.env.JWT_LIFETIME;

export const createToken = (user: IUser) => {
  const payload = { 
    userId: user._id, 
    name: user.name, 
    email: user.email 
  };
  
  const secret = String(JWT_SECRET);
  
  const options = { 
    expiresIn: JWT_LIFETIME 
  } as jwt.SignOptions;
  
  return jwt.sign(payload, secret, options);
};

// Register a new user
export const register = async (req: Request, res: Response) => {  try {
    const { name, email, password, phone } = req.body;    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ 
        success: false, 
        message: 'This email address is already registered.',
        errorType: 'email_exists'
      });
    } 
    // Create user
    const user = await User.create({ 
      name, 
      email, 
      password,
      phone: phone || undefined
    });

    // Generate token
    const token = createToken(user);

    // Return response
    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        photoUrl: user.photoUrl,
        joinedDate: user.joinedDate
      },
      token
    });  } catch (error: any) {
    console.error('Register error:', error);
    
    // Check if the error is a validation error
    if (error.name === 'ValidationError') {
      // Extract error message from Mongoose validation error
      const passwordError = error.errors?.password?.message;
      
      if (passwordError) {
        return res.status(400).json({ 
          success: false, 
          message: passwordError,
          errorType: 'invalid_password'
        });
      }
      
      // For other validation errors
      const errorMessage = Object.values(error.errors)
        .map((err: any) => err.message)
        .join(', ');
        
      return res.status(400).json({ 
        success: false, 
        message: errorMessage,
        errorType: 'validation_error'
      });
    }
    
    // Default server error
    res.status(500).json({ 
      success: false, 
      message: 'Registration failed. Please try again later or contact support.',
      errorType: 'server_error'
    });
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'User not found. Please check your email address.', 
        errorType: 'user_not_found'
      });
    }

    // Check if password is correct
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ 
        success: false, 
        message: 'Incorrect password. Please try again.',
        errorType: 'incorrect_password'
      });
    }

    // Generate token
    const token = createToken(user);

    // Return response
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        photoUrl: user.photoUrl,
        joinedDate: user.joinedDate
      },
      token
    });  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Login failed. Please try again later or contact support.',
      errorType: 'server_error'
    });
  }
};

// Get current user
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    // User is attached to req by auth middleware
    const userId = (req as any).user?.userId;
      if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication invalid. Please login again.',
        errorType: 'auth_invalid'
      });
    }

    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found. Account may have been deleted.',
        errorType: 'user_not_found'
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        photoUrl: user.photoUrl,
        joinedDate: user.joinedDate
      }
    });  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve user profile. Please try again.',
      errorType: 'server_error'
    });
  }
};