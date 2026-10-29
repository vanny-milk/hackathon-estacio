import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'alert' | 'danger' | 'neutral' | 'primary';
  size?: 'sm' | 'md';
  withDot?: boolean;
  pulsing?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  withDot = false,
  pulsing = false,
  className = '',
  ...props
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  };

  const variantStyles = {
    // Secondary green - active radar, success
    success: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    // Alert amber - pending, scrapers running
    alert: 'bg-amber-50 text-amber-900 border-amber-300',
    // Danger red - errors
    danger: 'bg-red-50 text-red-800 border-red-300',
    // Neutral slate
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    // Primary navy
    primary: 'bg-primary text-white border-primary',
  };

  const dotColors = {
    success: 'bg-secondary',
    alert: 'bg-alert',
    danger: 'bg-danger',
    neutral: 'bg-slate-400',
    primary: 'bg-white',
  };

  return (
    <span
      className={`inline-flex items-center font-medium border rounded-full select-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {withDot && (
        <span className="relative flex h-2 w-2">
          {pulsing && (
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColors[variant]}`}
            />
          )}
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${dotColors[variant]}`}
          />
        </span>
      )}
      {children}
    </span>
  );
};
