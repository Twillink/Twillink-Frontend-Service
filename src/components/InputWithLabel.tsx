import React, {ChangeEvent, FocusEvent, InputHTMLAttributes} from 'react';

interface InputWithLabelProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  label,
  value,
  onChange,
  onBlur,
  type = 'text',
  placeholder,
  autoComplete,
  ...rest
}) => (
  <label className="input input-bordered pr-0 rounded-lg flex items-center gap-1 text-general-med w-full bg-contras-high">
    {label && <span>{label}</span>}
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      autoComplete={autoComplete}
      className="grow text-primary h-full rounded-br-lg rounded-tr-lg px-2 placeholder:text-general-med"
      {...rest}
    />
  </label>
);

export default InputWithLabel;
