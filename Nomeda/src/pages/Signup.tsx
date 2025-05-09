import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'

import AuthHeader from '../components/Auth/AuthHeader'
import AuthInput from '../components/Auth/AuthInput'
import AuthError from '../components/Auth/AuthError'
import SocialAuthButtons from '../components/Auth/SocialAuthButtons'
// PasswordRequirements is used by AuthInput component
import { useAuth } from '../hooks/useAuth'
import { validatePassword } from '../utils/passwordValidation'

import '../style/Auth.css'

const Signup: React.FC = () => {
  const [name, setName] = useState('');  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [errorType, setErrorType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register, socialAuth } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setErrorType('');
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setErrorType('invalid_password');
      return;
    }    // Validate password requirements on client side before sending to server
    const validationResult = validatePassword(password);

    if (!validationResult.isValid) {
      setError(validationResult.errorMessage || 'Your password does not meet the requirements');
      setErrorType('invalid_password');
      return;
    }

    try {
      setIsLoading(true)
      await register(name, email, password)
      navigate('/dashboard')
    } catch (err) {
      const error = err as { message?: string; response?: { data?: { message?: string; errorType?: string } } };
      // Check if the error has a response with error message
      if (error.response?.data?.message) {
        setError(error.response.data.message);

        // Set error type if available
        if (error.response.data.errorType) {
          setErrorType(error.response.data.errorType);
        }        // Focus back on password field if it's a password validation error
        if (error.response.data.errorType === 'invalid_password') {
          document.getElementById('password')?.focus();
        }
      } else if (error.message) {
        setError(error.message);
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false)
    }
  }

  const signupWithGoogle = useGoogleLogin({
    onSuccess: async tokenResponse => {
      try {
        setIsLoading(true)
        console.log('Google signup success, token:', tokenResponse);

        // Send the token to our backend
        await socialAuth(tokenResponse.access_token, 'google')
        navigate('/dashboard')
      } catch (err) {
        const error = err as { message?: string };
        console.error('Google signup error:', error);
        setError(error.message || 'Google signup failed. Please try again.');
      } finally {
        setIsLoading(false)
      }
    },
    onError: err => {
      console.error('Google signup error:', err);
      setError('Google signup failed. Please try again.')
    },
    scope: 'email profile'
  })

  const signupWithGithub = async () => {
    try {
      // GitHub OAuth flow - redirect to GitHub for authorization
      const githubClientId = import.meta.env.VITE_GITHUB_CLIENT_ID
      const redirectUri = `${window.location.origin}/github-callback`
      const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${redirectUri}&scope=user:email`

      window.location.href = githubAuthUrl
    } catch (err) {
      console.error('GitHub signup error:', err);
      setError('GitHub signup failed. Please try again.');
    }
  }

  return (
    <div className="login-container signup-container">
      <AuthHeader
        title="Create an account"
        subtitle="Please fill in the details below to sign up"
      />
      <AuthError message={error} errorType={errorType} />

      <form onSubmit={handleSubmit}>
        <AuthInput
          label="Full Name"
          type="text"
          id="name"
          placeholder="Enter your full name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
        <AuthInput
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
          placeholder="Create a password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          showPasswordRequirements={true}
        />
        <AuthInput
          label="Confirm Password"
          type="password"
          id="confirm-password" placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
        />
        <button
          type="submit"
          className="login-btn"
          disabled={isLoading}
        >
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>

      <div className="social-login">
        <div className="social-login-divider">or</div>
        <SocialAuthButtons
          onGoogleClick={signupWithGoogle}
          onGithubClick={signupWithGithub}
          isLoading={isLoading}
        />
      </div>

      <div className="account-prompt">
        Already have an account?{' '}
        <Link to="/login" className="account-link">
          Log in
        </Link>
      </div>
    </div>
  )
}

export default Signup
