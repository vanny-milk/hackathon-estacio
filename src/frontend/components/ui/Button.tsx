import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'alert' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  // Base styles: Fitts Law compliant (minimum 44px on md for mobile touch targets), smooth transitions, focus ring
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-lg';

  // Sizing scale
  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 min-h-[36px] gap-1.5',
    md: 'text-sm px-4 py-2.5 min-h-[44px] gap-2', // 44px min touch target
    lg: 'text-base px-6 py-3 min-h-[48px] gap-2.5 font-semibold',
  };

  // Color variants strictly aligned with PATA RADAR tokens
  const variantStyles = {
    primary:
      'bg-primary text-white hover:bg-primary-hover active:bg-primary-active shadow-sm',
    secondary:
      'bg-secondary text-primary font-semibold hover:bg-secondary-hover hover:text-white active:brightness-95 shadow-sm',
    alert:
      'bg-alert text-primary font-semibold hover:bg-alert-hover active:brightness-95 shadow-sm',
    danger:
      'bg-danger text-white hover:bg-danger-hover active:brightness-95 shadow-sm',
    outline:
      'border border-border bg-surface text-text hover:bg-surface-hover hover:border-border-hover',
    ghost:
      'text-text hover:bg-surface-hover active:bg-border/40',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-4 w-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      ) : (
        leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && (
        <span className="inline-flex shrink-0">{rightIcon}</span>
      )}
    </button>
  );
};
