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
  // Size classes
  const sizeClasses = {
    xs: 'h-4 w-4 border-[1.5px]',
    sm: 'h-6 w-6 border-2',
    md: 'h-8 w-8 border-[2.5px]',
    lg: 'h-10 w-10 border-[3px]',
    xl: 'h-12 w-12 border-[4px]',
  };

  // Color classes
  const colorClasses = {
    primary: 'border-blue-500',
    secondary: 'border-gray-500',
    danger: 'border-red-500',
    success: 'border-green-500',
    custom: customColor || 'border-blue-500',
  };

  // Speed classes
  const speedClasses = {
    slow: 'animate-[spin_1.8s_linear_infinite]',
    normal: 'animate-[spin_1.2s_linear_infinite]',
    fast: 'animate-[spin_0.6s_linear_infinite]',
  };

  // Text position classes
  const textPositionClasses = {
    right: 'flex-row space-x-3',
    bottom: 'flex-col space-y-2',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`flex ${textPositionClasses[textPosition]}`}>
        <div
          className={`rounded-full ${sizeClasses[size]} ${colorClasses[color]} border-t-transparent ${speedClasses[speed]}`}
          aria-label="Loading"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
        
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