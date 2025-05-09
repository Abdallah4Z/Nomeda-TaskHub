import { Request, Response } from 'express';
import axios from 'axios';
import User from '../models/User';
import { createToken } from './authController';

// Google Authentication
export const googleAuth = async (req: Request, res: Response) => {
  try {
    console.log('Google auth request received:', req.body);
    const { token } = req.body;
    
    if (!token) {
      console.error('Google auth error: No token provided');
      return res.status(400).json({
        success: false,
        message: 'Google authentication failed: No token provided'
      });
    }
    
    try {
      // Verify the token with Google
      console.log('Verifying Google token...');
      const googleResponse = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      console.log('Google API response successful');
      const { email, name, picture } = googleResponse.data;
      console.log('Google user data:', { 
        email: email ? 'Found' : 'Not found',
        name: name ? 'Found' : 'Not found',
        picture: picture ? 'Found' : 'Not found'
      });
      
      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Google authentication failed: Email not provided'
        });
      }
      
      // Check if user exists
      console.log('Looking for existing user with email:', email);
      let user = await User.findOne({ email });
      console.log('User exists:', !!user);
      
      if (!user) {
        console.log('Creating new user with Google data');
        // Create a new user if they don't exist
        // Generate a random password since we won't use it
        const randomPassword = Math.random().toString(36).slice(-8);
        
        user = await User.create({
          name: name || email.split('@')[0],
          email,
          password: randomPassword,
          photoUrl: picture || undefined,
          provider: 'google'
        });
        console.log('New user created with ID:', user._id);
      } else {
        // Update user's photo if it exists and user doesn't have one
        if (picture && !user.photoUrl) {
          user.photoUrl = picture;
          await user.save();
          console.log('Updated user photo with Google profile picture');
        }
      }
      
      // Generate token
      const jwtToken = createToken(user);
      
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
        token: jwtToken
      });
    } catch (apiError: any) {
      console.error('Google API error:', apiError.response?.data || apiError.message);
      return res.status(401).json({
        success: false,
        message: 'Google authentication failed: Invalid token or API error'
      });
    }
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({
      success: false,
      message: 'Google authentication failed'
    });
  }
};