import React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import WarningIcon from '@mui/icons-material/Warning';

interface AuthErrorProps {
  message: string;
  errorType?: string;
}

const AuthError: React.FC<AuthErrorProps> = ({ message, errorType }) => {
  if (!message) return null;
    const getIconByErrorType = () => {
    switch(errorType) {
      case 'user_not_found':
        return <EmailIcon fontSize="small" />;
      case 'incorrect_password':
      case 'invalid_password':
        return <LockIcon fontSize="small" />;
      case 'email_exists':
        return <EmailIcon fontSize="small" />;
      case 'server_error':
        return <WarningIcon fontSize="small" />;
      default:
        return <ErrorOutlineIcon fontSize="small" />;
    }
  };
  // Determine CSS class based on error type
  const getErrorClass = () => {
    switch(errorType) {
      case 'user_not_found':
        return 'user-not-found';
      case 'incorrect_password':
      case 'invalid_password':
        return 'incorrect-password';
      case 'email_exists':
        return 'user-not-found';
      case 'server_error':
        return 'server-error';
      default:
        return '';
    }
  };
  
  return (
    <div className={`auth-error-box ${getErrorClass()}`}>
      <div className="auth-error-icon">{getIconByErrorType()}</div>
      <div className="auth-error-content">
        <div className="auth-error-message">{message}</div>
      </div>
    </div>
  );
};

export default AuthError;
