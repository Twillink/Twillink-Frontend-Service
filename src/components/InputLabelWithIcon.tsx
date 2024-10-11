import React, {ChangeEvent, FocusEvent, InputHTMLAttributes} from 'react';

interface IInputWithLabel extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: JSX.Element;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}

const InputLabelWithIcon: React.FC<IInputWithLabel> = ({
  label,
  value,
  icon,
  onChange,
  onBlur,
  type = 'text',
  placeholder,
  autoComplete,
  ...rest
}) => (
  <div>
    {label && (
      <div>
        <span className="text-general-med text-sm">{label}</span>
      </div>
    )}
    <label className="input input-bordered pr-0 rounded-lg flex items-center gap-1 text-general-med w-full bg-contras-high">
      {icon && <span>{icon}</span>}
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
  </div>
);

export default InputLabelWithIcon;
