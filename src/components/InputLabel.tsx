import React, {ChangeEvent, FocusEvent, InputHTMLAttributes} from 'react';

interface InputLabelProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
}

const InputLabel: React.FC<InputLabelProps> = ({
  value,
  onChange,
  onBlur,
  type = 'text',
  placeholder,
  autoComplete,
  className,
  label,
  ...rest
}) => (
  <div className="flex flex-col">
    <label className="mb-1 text-general-med text-sm">{label}</label>
    <input
      type={type}
      className={`input input-bordered rounded-lg p-3 w-full text-primary font-normal text-base bg-contras-high ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      autoComplete={autoComplete}
      {...rest}
    />
  </div>
);

export default InputLabel;
