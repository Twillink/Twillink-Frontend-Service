import React, {ChangeEvent, FocusEvent, InputHTMLAttributes} from 'react';

interface IInputLabel extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  label: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  error?: string;
}

const InputLabel: React.FC<IInputLabel> = ({
  value,
  onChange,
  onBlur,
  type = 'text',
  placeholder,
  autoComplete,
  className,
  label,
  error,
  ...rest
}) => (
  <div className="flex flex-col">
    <label className="mb-1 text-general-med text-sm">{label}</label>
    <input
      type={type}
      className={`input input-bordered h-10 rounded-lg p-3 w-full text-primary font-normal text-base bg-contras-high ${className} ${error ? 'border-red-500' : ''}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      autoComplete={autoComplete}
      {...rest}
    />
    {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
  </div>
);

export default InputLabel;
