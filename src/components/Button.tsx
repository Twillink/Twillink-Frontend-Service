import React from 'react';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  color?: 'primary' | 'error' | 'success' | 'outline';
  size?: 'lg' | 'md' | 'sm' | 'xs';
  outline?: boolean;
  className?: string;
}

type ColorVariant = 'primary' | 'error' | 'success' | 'outline';
type SizeVariant = 'lg' | 'md' | 'sm' | 'xs';

const colorVariants: Record<ColorVariant, string> = {
  primary: 'btn-primary',
  error: 'btn-error',
  success: 'btn-success',
  outline: 'btn-outline',
};

const sizeVariants: Record<SizeVariant, string> = {
  lg: 'btn-lg text-xl h-13 min-h-13 p-4 rounded-large',
  md: 'btn-md text-base h-10 min-h-10 p-medium rounded-medium',
  sm: 'btn-sm text-base h-8 min-h-8 p-small rounded-lg',
  xs: 'btn-xs text-xs h-6 min-h-6 px-2 px-1 rounded-lg',
};

const Button: React.FC<IButton> = ({
  title,
  icon,
  iconPosition = 'right',
  loading = false,
  color = 'primary',
  size = 'md',
  outline = false,
  disabled = false,
  className,
  ...restProps
}) => {
  const baseClasses = 'btn font-normal text-base';
  const colorClass = colorVariants[color];
  const sizeClass = sizeVariants[size];
  const outlineClass = outline ? 'btn-outline' : '';
  const disabledClass = disabled
    ? 'disabled:bg-primary-disable disabled:text-primary-content disabled:cursor-not-allowed'
    : 'hover:outline hover:outline-1 hover:outline-offset-2';

  return (
    <button
      className={`${baseClasses} ${colorClass} ${sizeClass} ${outlineClass} ${disabledClass} ${className}`}
      disabled={disabled}
      {...restProps}>
      {iconPosition === 'left' &&
        (loading ? <span className="loading loading-spinner" /> : icon)}
      {title}
      {iconPosition === 'right' &&
        (loading ? <span className="loading loading-spinner" /> : icon)}
    </button>
  );
};

export default Button;
