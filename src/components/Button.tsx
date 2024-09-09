import React from 'react';

interface IButton {
  title: string;
  onClick?: () => void;
  icon?: object;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  type?: 'primary' | 'error' | 'success';
  size?: 'lg' | 'md' | 'sm' | 'xs';
  outline?: boolean;
}

const colorVariants = {
  primary: 'btn-primary',
  error: 'btn-error',
  success: 'btn-success',
};

const sizeVariants = {
  lg: 'btn-lg text-xl h-13 p-4 rounded-large',
  md: 'btn-md text-base h-10 p-medium rounded-medium',
  sm: 'btn-sm text-base h-8 p-small rounded-lg',
  xs: 'btn-xs text-xs h-6 px-2 px-1 rounded-lg',
};

export default function Button(props: IButton) {
  const {
    title,
    onClick,
    icon,
    iconPosition = 'right',
    disabled = false,
    loading = false,
    type = 'primary',
    size = 'md',
    outline = false,
    ...restProps
  } = props;

  return (
    <button
      className={`btn font-normal text-base ${outline && 'btn-outline'} ${colorVariants[type]} ${sizeVariants[size]} hover:outline hover:outline-1 hover:outline-offset-2`}
      onClick={onClick}
      disabled={disabled}
      {...restProps}>
      {iconPosition === 'left' && (
        <>{loading ? <span className="loading loading-spinner" /> : icon}</>
      )}
      {title}
      {iconPosition === 'right' && (
        <>{loading ? <span className="loading loading-spinner" /> : icon}</>
      )}
    </button>
  );
}

interface ILinkButtonProps {
  title: string;
  onClick?: () => void;
  icon?: object;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  size?: 'xl' | 'base' | 'sm' | 'xs' | 'tiny';
}

export function LinkButton(props: ILinkButtonProps) {
  const {
    title,
    onClick,
    icon,
    iconPosition = 'right',
    disabled = false,
    loading = false,
    size = 'md',
    ...restProps
  } = props;
  return (
    <button
      className={`font-normal btn-link  `}
      onClick={onClick}
      disabled={disabled}
      {...restProps}>
      {iconPosition === 'left' && (
        <>{loading ? <span className="loading loading-spinner" /> : icon}</>
      )}
      <p className={`text-${size}`}>{title}</p>
      {iconPosition === 'right' && (
        <>{loading ? <span className="loading loading-spinner" /> : icon}</>
      )}
    </button>
  );
}
