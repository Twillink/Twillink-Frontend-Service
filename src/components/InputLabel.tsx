import React, {ChangeEvent, FocusEvent, InputHTMLAttributes} from 'react';

interface IInputLabel extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  label: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  error?: string;
  showLength?: boolean;
  showOptional?: boolean;
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
  showLength = false,
  showOptional = false,
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
    {(showOptional || showLength) && (
      <div className={'flex justify-between mt-1'}>
        <div>
          <span
            className={`${showOptional ? 'block' : 'hidden'} text-xs text-general-med`}>
            Optional
          </span>
        </div>
        <div>
          <span
            className={`${showLength ? 'block' : 'hidden'} text-xs text-general-med`}>
            {value.length} / {rest?.maxLength ? rest.maxLength : 100}
          </span>
        </div>
      </div>
    )}

    {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
  </div>
);

export default InputLabel;
