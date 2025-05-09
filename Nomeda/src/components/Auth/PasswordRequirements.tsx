import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { validatePassword } from '../../utils/passwordValidation';

interface PasswordRequirementsProps {
  password: string;
  visible: boolean;
}

const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({ password, visible }) => {  if (!visible) return null;
  
  // Check requirements using the shared validation utility
  const { hasMinLength, hasUppercase, hasLowercase, hasNumber, hasSpecialChar } = validatePassword(password);
  
  const requirementStyle = (met: boolean) => ({
    color: met ? '#4caf50' : '#d32f2f',
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.85rem',
    margin: '4px 0',
  });
  
  return (
    <div className="password-requirements">
      <p className="requirements-title">Password must:</p>
      <ul className="requirements-list">
        <li style={requirementStyle(hasMinLength)}>
          {hasMinLength ? 
            <CheckCircleIcon style={{ fontSize: '16px', marginRight: '8px' }} /> : 
            <CancelIcon style={{ fontSize: '16px', marginRight: '8px' }} />} 
          Be at least 8 characters long
        </li>
        <li style={requirementStyle(hasUppercase)}>
          {hasUppercase ? 
            <CheckCircleIcon style={{ fontSize: '16px', marginRight: '8px' }} /> : 
            <CancelIcon style={{ fontSize: '16px', marginRight: '8px' }} />} 
          Include at least one uppercase letter (A-Z)
        </li>
        <li style={requirementStyle(hasLowercase)}>
          {hasLowercase ? 
            <CheckCircleIcon style={{ fontSize: '16px', marginRight: '8px' }} /> : 
            <CancelIcon style={{ fontSize: '16px', marginRight: '8px' }} />} 
          Include at least one lowercase letter (a-z)
        </li>
        <li style={requirementStyle(hasNumber)}>
          {hasNumber ? 
            <CheckCircleIcon style={{ fontSize: '16px', marginRight: '8px' }} /> : 
            <CancelIcon style={{ fontSize: '16px', marginRight: '8px' }} />} 
          Include at least one number (0-9)
        </li>
        <li style={requirementStyle(hasSpecialChar)}>
          {hasSpecialChar ? 
            <CheckCircleIcon style={{ fontSize: '16px', marginRight: '8px' }} /> : 
            <CancelIcon style={{ fontSize: '16px', marginRight: '8px' }} />} 
          Include at least one special character (#@!%^&*()=-+_/)
        </li>
      </ul>
    </div>
  );
};

export default PasswordRequirements;
