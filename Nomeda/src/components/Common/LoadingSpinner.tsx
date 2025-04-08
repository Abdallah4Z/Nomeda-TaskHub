import React from 'react';
import { ClipLoader } from 'react-spinners'; // Import the ClipLoader component

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
    slow: 1.8,
    normal: 1.2,
    fast: 0.6,
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`flex ${textPosition === 'bottom' ? 'flex-col space-y-2' : 'flex-row space-x-3'}`}>
        <ClipLoader
          size={sizeMapping[size]} // Apply size
          color={colorMapping[color]} // Apply color
          loading={true} // Spinner is always loading when this component is shown
          speedMultiplier={speedMapping[speed]} // Apply speed
        />

        {withText && (
          <span className={`text-${color.split('-')[0]}-600 text-${size === 'xs' ? 'xs' : size === 'sm' ? 'sm' : 'base'}`}>
            {text}
          </span>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;
