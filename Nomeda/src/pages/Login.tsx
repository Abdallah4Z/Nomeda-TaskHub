import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import AuthHeader from '../components/Auth/AuthHeader';
import AuthInput from '../components/Auth/AuthInput';
import AuthError from '../components/Auth/AuthError';
import SocialAuthButtons from '../components/Auth/SocialAuthButtons';
import { useAuth } from '../hooks/useAuth';
import '../style/Auth.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, socialAuth } = useAuth();
  const [errorType, setErrorType] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setErrorType('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      // Check if the error has a response with error type
      if (err.response?.data?.errorType) {
        setErrorType(err.response.data.errorType);
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async tokenResponse => {
      try {
        setIsLoading(true);
        console.log('Google login success, token:', tokenResponse);
        
        // Send the token to our backend
        await socialAuth(tokenResponse.access_token, 'google');
        navigate('/dashboard');
      } catch (err: any) {
        console.error('Google login error:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    onError: err => {
      console.error('Google login error:', err);
      setError('Google login failed. Please try again.');
    },
    scope: 'email profile'
  });

  const loginWithGithub = async () => {
    try {
      // GitHub OAuth flow - redirect to GitHub for authorization
      const githubClientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
      const redirectUri = `${window.location.origin}/github-callback`;
      const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${redirectUri}&scope=user:email`;
      
      window.location.href = githubAuthUrl;
    } catch (err: any) {
      setError('GitHub login failed. Please try again.');
    }
  };
  return (
    <div className="login-container">
      <AuthHeader title="Log in to your account" subtitle="Welcome back! Please enter your details" />
      <AuthError message={error} errorType={errorType} />
      
      <form onSubmit={handleSubmit}>        <AuthInput
          label="Email"
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />        <AuthInput
          label="Password"
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        <button 
          type="submit" 
          className="login-btn" 
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>
      </form>

      <div className="social-login">
        <div className="social-login-divider">or</div>
        <SocialAuthButtons 
          onGoogleClick={loginWithGoogle} 
          onGithubClick={loginWithGithub}
          isLoading={isLoading} 
        />
      </div>

      <div className="account-prompt">
        Don't have an account? <Link to="/signup" className="account-link">Sign up</Link>
      </div>
    </div>
  );
};

export default Login;
