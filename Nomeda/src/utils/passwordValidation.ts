export interface PasswordValidationResult {
  isValid: boolean;
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
  errorMessage?: string;
}

/**
 * Validates a password against security requirements
 * @param password - The password string to validate
 * @returns Object containing validation results
 */
export const validatePassword = (password: string): PasswordValidationResult => {
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[#@!%^&*()=\-+_/]/.test(password);
  
  const isValid = hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
  
  // Generate appropriate error message based on the first failed requirement
  let errorMessage: string | undefined;
  if (!isValid) {
    if (!hasMinLength) {
      errorMessage = 'Password must be at least 8 characters long.';
    } else if (!hasUppercase) {
      errorMessage = 'Password must include at least one uppercase letter.';
    } else if (!hasLowercase) {
      errorMessage = 'Password must include at least one lowercase letter.';
    } else if (!hasNumber) {
      errorMessage = 'Password must include at least one number.';
    } else if (!hasSpecialChar) {
      errorMessage = 'Password must include at least one special character (#@!%^&*()=-+_/).';
    }
  }
  
  return {
    isValid,
    hasMinLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecialChar,
    errorMessage
  };
};

/**
 * Gets the full error message for invalid passwords
 * @returns Full error message string for documentation/display
 */
export const getPasswordRequirementsMessage = (): string => {
  return 'Password must be at least 8 characters and contain uppercase, lowercase, number, and special character (#@!%^&*()=-+_/)';
};