import React from 'react';

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'danger' | 'success' | 'custom';
  customColor?: string; // Only used when color='custom'
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
  withText?: boolean;
  text?: string;
  textPosition?: 'right' | 'bottom';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  customColor = '',
  speed = 'normal',
  className = '',
  withText = false,
  text = 'Loading...',
  textPosition = 'right',
}) => {
  // Size mapping for the spinner
  const sizeMapping = {
    xs: 12,
    sm: 18,
    md: 24,
    lg: 36,
    xl: 48,
  };

  // Color mapping for the spinner
  const colorMapping = {
    primary: '#1D4ED8', // blue
    secondary: '#6B7280', // gray
    danger: '#EF4444', // red
    success: '#10B981', // green
    custom: customColor || '#1D4ED8', // Default to blue if no custom color provided
  };

  // Speed mapping for the spinner
  const speedMapping = {
    slow: '1.8s',
    normal: '1.2s',
    fast: '0.6s',
  };

  const spinnerSize = sizeMapping[size];
  const spinnerColor = colorMapping[color];
  const spinnerSpeed = speedMapping[speed];

  // CSS for the spinner
  const spinnerStyle = {
    width: `${spinnerSize}px`,
    height: `${spinnerSize}px`,
    borderRadius: '50%',
    border: `2px solid ${spinnerColor}`,
    borderTopColor: 'transparent',
    animation: `spin ${spinnerSpeed} linear infinite`,
  };

  // Add keyframes for the animation
  const keyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <style>{keyframes}</style>
      <div className={`flex ${textPosition === 'bottom' ? 'flex-col space-y-2' : 'flex-row space-x-3'} items-center`}>
        <div style={spinnerStyle} />
        
        {withText && (
          <span 
            className={`text-${size === 'xs' ? 'xs' : size === 'sm' ? 'sm' : 'base'}`}
            style={{ color: spinnerColor }}
          >
            {text}
          </span>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;
