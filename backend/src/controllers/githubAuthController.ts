import { Request, Response } from 'express';
import axios from 'axios';
import User from '../models/User';
import { createToken } from './authController';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

// GitHub Callback - exchange code for token
export const githubCallback = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Authorization code is required'
      });
    }

    console.log('GitHub callback with code:', code);
    console.log('Using GitHub credentials - ID:', GITHUB_CLIENT_ID ? 'Found' : 'Missing');

    // Exchange the code for an access token
    try {
      // Create URL encoded form data
      const params = new URLSearchParams();
      params.append('client_id', GITHUB_CLIENT_ID || '');
      params.append('client_secret', GITHUB_CLIENT_SECRET || '');
      params.append('code', code);
      
      console.log('Sending GitHub token request with params:', {
        client_id: GITHUB_CLIENT_ID ? 'Present' : 'Missing',
        client_secret: GITHUB_CLIENT_SECRET ? 'Present' : 'Missing',
        code: code ? 'Present' : 'Missing'
      });

      const tokenResponse = await axios.post(
        'https://github.com/login/oauth/access_token',
        params.toString(),
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      console.log('GitHub token response status:', tokenResponse.status);
      console.log('GitHub token response data structure:', Object.keys(tokenResponse.data));
      
      const { access_token } = tokenResponse.data;
      
      if (!access_token) {
        console.error('No access token received from GitHub', tokenResponse.data);
        return res.status(400).json({
          success: false,
          message: 'Failed to get access token from GitHub',
          error: tokenResponse.data.error_description || tokenResponse.data.error || 'Unknown error'
        });
      }

      console.log('Successfully received GitHub access token');
      
      // Return the access token to the client
      res.status(200).json({
        success: true,
        access_token
      });
    } catch (apiError: any) {
      console.error('GitHub API error:', apiError);
      console.error('Error details:', apiError.response?.data);
      return res.status(500).json({
        success: false,
        message: 'Failed to get access token from GitHub',
        error: apiError.message
      });
    }
  } catch (error: any) {
    console.error('GitHub callback error:', error);
    res.status(500).json({
      success: false,
      message: 'GitHub authentication failed',
      error: error.message
    });
  }
};

// GitHub Authentication
export const githubAuth = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    console.log('GitHub auth with token:', token ? 'Token provided' : 'No token');
    
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'GitHub authentication failed: No token provided'
      });
    }
    
    try {
      // Get user data from GitHub
      const githubResponse = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `token ${token}`
        }
      });
      
      const { login, name, avatar_url } = githubResponse.data;
      console.log('GitHub user data:', { login, name, avatar_url: avatar_url ? 'Found' : 'Not found' });
      
      // Get user email from GitHub (emails are not included in the user data)
      const emailResponse = await axios.get('https://api.github.com/user/emails', {
        headers: {
          Authorization: `token ${token}`
        }
      });
      
      // Find primary email
      const primaryEmail = emailResponse.data.find((email: any) => email.primary)?.email;
      console.log('GitHub primary email found:', !!primaryEmail);
      
      if (!primaryEmail) {
        return res.status(400).json({
          success: false,
          message: 'GitHub authentication failed: Email not provided'
        });
      }
      
      // Check if user exists
      let user = await User.findOne({ email: primaryEmail });
      console.log('User exists:', !!user);
      
      if (!user) {
        // Create a new user if they don't exist
        // Generate a random password
        const randomPassword = Math.random().toString(36).slice(-8);
        
        user = await User.create({
          name: name || login || primaryEmail.split('@')[0],
          email: primaryEmail,
          password: randomPassword,
          photoUrl: avatar_url || undefined,
          provider: 'github'
        });
        
        console.log('Created new user with GitHub data');
      } else {
        // Update user's photo if it exists and user doesn't have one
        if (avatar_url && !user.photoUrl) {
          user.photoUrl = avatar_url;
          await user.save();
          console.log('Updated user photo with GitHub avatar');
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
      console.error('GitHub API error:', apiError.response?.data || apiError.message);
      return res.status(401).json({
        success: false,
        message: 'GitHub authentication failed: Invalid token or API error'
      });
    }
  } catch (error) {
    console.error('GitHub auth error:', error);
    res.status(500).json({
      success: false,
      message: 'GitHub authentication failed'
    });
  }
};