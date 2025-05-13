import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyOptions } from 'jsonwebtoken';

// JWT secret key - should be in environment variables in production
const JWT_SECRET = process.env.JWT_SECRET;

interface JwtPayload {
  userId: string;
  name: string;
  email: string;
}

// Middleware to authenticate user
export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  // Get token from header
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ 
      success: false, 
      message: 'Authentication invalid' 
    });
    return;
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    // Using explicit typing for verify method
    const secret = String(JWT_SECRET);
    const decoded = jwt.verify(token, secret) as JwtPayload;

    // Add user to request object
    (req as any).user = decoded;
    
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ 
      success: false, 
      message: 'Authentication invalid' 
    });
    return;
  }
};