import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import AuthError from '../components/Auth/AuthError';
import '../style/Auth.css';

const GitHubCallback: React.FC = () => {
  const [error, setError] = useState<string>('');
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(true);
  const navigate = useNavigate();
  const { socialAuth } = useAuth();

  useEffect(() => {
    const fetchGitHubToken = async () => {
      try {
        // Get the authorization code from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        
        if (!code) {
          throw new Error('No authorization code found');
        }

        // Display code for debugging
        setDebugInfo(`Authorization code: ${code.substring(0, 6)}...`);
        console.log("GitHub callback with code:", code);

        const API_URL = import.meta.env.VITE_API_URL;
        setDebugInfo(prev => `${prev}\nAPI URL: ${API_URL}`);
        
        try {
          setDebugInfo(prev => `${prev}\nSending request to ${API_URL}/auth/github/callback...`);
          
          const response = await fetch(`${API_URL}/auth/github/callback`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
          });

          setDebugInfo(prev => `${prev}\nResponse status: ${response.status}`);
          console.log("GitHub callback response status:", response.status);
          
          if (!response.ok) {
            let errorData;
            let errorMessage;
            
            try {
              errorData = await response.json();
              errorMessage = errorData.message || `Server returned error ${response.status}`;
              setDebugInfo(prev => `${prev}\nServer error: ${errorMessage}`);
            } catch (e) {
              const textResponse = await response.text();
              setDebugInfo(prev => `${prev}\nRaw response: ${textResponse.substring(0, 100)}...`);
              errorMessage = `Server returned status ${response.status} with invalid JSON`;
            }
            
            throw new Error(errorMessage);
          }
          
          const data = await response.json();
          console.log("GitHub callback success:", data);
          setDebugInfo(prev => `${prev}\nReceived data with keys: ${Object.keys(data).join(', ')}`);

          if (!data.access_token) {
            setDebugInfo(prev => `${prev}\nNo access_token in response`);
            throw new Error('No access token received from server');
          }

          // Use the token from our backend to authenticate the user
          setDebugInfo(prev => `${prev}\nAuthenticating with token...`);
          await socialAuth(data.access_token, 'github');
          
          // Redirect to dashboard
          setDebugInfo(prev => `${prev}\nAuthentication successful, redirecting...`);
          navigate('/dashboard');
        } catch (fetchError: any) {
          console.error('Fetch error:', fetchError);
          setDebugInfo(prev => `${prev}\nFetch error: ${fetchError.message}`);
          throw fetchError;
        }
      } catch (err: any) {
        console.error('GitHub callback error:', err);
        setError(err.message || 'Failed to authenticate with GitHub');
        setIsProcessing(false);
      }
    };

    fetchGitHubToken();
  }, [navigate, socialAuth]);

  const retryLogin = () => {
    navigate('/login');
  };

  return (
    <div className="login-container auth-callback-container">
      <div className="auth-header">
        <h1>GitHub Authentication</h1>
        <p>{isProcessing ? 'Processing your login...' : 'Authentication Error'}</p>
      </div>
      
      {error ? (
        <div className="auth-error-container">
          <AuthError message={error} />
          <div className="debug-info">
            <details>
              <summary>Debug Information (Click to expand)</summary>
              <pre>{debugInfo}</pre>
            </details>
          </div>
          <p className="auth-help-text">
            This could be due to server issues or invalid GitHub credentials. 
            Please try again or contact support.
          </p>
          <button 
            onClick={retryLogin} 
            className="login-btn"
          >
            Back to Login
          </button>
        </div>
      ) : (
        <div className="auth-loading-container">
          <LoadingSpinner />
          <p>Authenticating with GitHub...</p>
          {debugInfo && (
            <div className="debug-info">
              <details>
                <summary>Debug Progress (Click to expand)</summary>
                <pre>{debugInfo}</pre>
              </details>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GitHubCallback;