import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import '../style/Login.css';
import googleLogo from '../assets/google.svg';
import githubLogo from '../assets/github.svg';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    console.log('Logging in with:', email, password);
    
    // TODO: Replace with actual authentication logic
    try {
      setTimeout(() => {
        navigate('/dashboard'); 
      }, 1000);
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: tokenResponse => {
      try {
        const decodedHeader = jwtDecode(tokenResponse.access_token);
        console.log(decodedHeader);
        navigate('/dashboard'); 
      } catch (error) {
        console.error('Error decoding token:', error);
        alert('Google login failed. Please try again.');
      }
    },
    onError: errorResponse => {
      console.error('Google login error:', errorResponse);
      alert('Google login failed. Please try again.');
    }
  });

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Log in to your account</h1>
        <p>Welcome back! Please enter your details</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="login-btn">
          Log In
        </button>
      </form>

      <div className="social-login">
        <div className="social-login-divider">or</div>
        <div className="social-buttons-container">
          <button
            className="social-btn"
            onClick={() => loginWithGoogle()}
          >
            <img src={googleLogo} alt="google" />
            Sign in with Google
          </button>
          <button className="social-btn">
            <img src={githubLogo} alt="github" />
            Continue with GitHub
          </button>
        </div>
      </div>

      <div className="account-prompt">
        Don't have an account? <Link to="/signup" className="account-link">Sign up</Link>
      </div>
    </div>
  );
};

export default Login;