import React, {ChangeEvent, FocusEvent, TextareaHTMLAttributes} from 'react';

interface ITextAreaLabel extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (event: FocusEvent<HTMLTextAreaElement>) => void;
}

const TextAreaLabel: React.FC<ITextAreaLabel> = ({
  value,
  onChange,
  onBlur,
  placeholder,
  autoComplete,
  className,
  label,
  ...rest
}) => (
  <div className="flex flex-col">
    <label className="mb-1 text-general-med text-sm">{label}</label>
    <textarea
      className={`textarea textarea-bordered rounded-lg p-3 w-full text-primary font-normal text-base bg-contras-high ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      autoComplete={autoComplete}
      {...rest}
    />
  </div>
);

export default TextAreaLabel;
