import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PasswordRequirements from './PasswordRequirements';

interface AuthInputProps {
  label: string;
  type: string;
  id: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  showPasswordRequirements?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

const AuthInput: React.FC<AuthInputProps> = ({
  label,
  type,
  id,
  value,
  placeholder,
  onChange,
  required = true,
  showPasswordRequirements = false,
  onFocus,
  onBlur,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  // Determine the input type (password toggle)
  const inputType = type === 'password' && showPassword ? 'text' : type;
  
  // Handle toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <div className="password-input-container">
        <input
          type={inputType}
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {type === 'password' && (
          <button
            type="button"
            className="password-toggle"
            onClick={togglePasswordVisibility}
            tabIndex={-1}
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </button>
        )}
      </div>
      
      {showPasswordRequirements && type === 'password' && (
        <PasswordRequirements password={value} visible={value.length > 0} />
      )}
    </div>  );
};

export default AuthInput;
