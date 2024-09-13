import React, {ChangeEvent, FocusEvent, InputHTMLAttributes} from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  onBlur,
  type = 'text',
  placeholder,
  autoComplete,
  className,
  ...rest
}) => (
  <input
    type={type}
    className={`input input-bordered rounded-lg p-3 w-full text-primary bg-contras-high ${className}`}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    autoComplete={autoComplete}
    {...rest}
  />
);

export default Input;
