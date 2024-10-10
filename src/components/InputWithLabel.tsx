import SvgResetField from '@/assets/svgComponents/SvgResetField';
import React, {ChangeEvent, FocusEvent, InputHTMLAttributes} from 'react';

interface IInputWithLabel extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  loading?: boolean;
  iconRight?: JSX.Element | undefined | false;
  handleClear?: () => void;
}

const InputWithLabel: React.FC<IInputWithLabel> = ({
  label,
  value,
  onChange,
  onBlur,
  type = 'text',
  placeholder,
  autoComplete,
  loading,
  iconRight,
  handleClear,
  ...rest
}) => {
  return (
    <label
      className={`relative input input-bordered pr-0 rounded-lg flex items-center gap-1 text-general-med w-full bg-contras-high`}>
      {label && <span>{label}</span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
        className={`w-full text-primary h-full rounded-br-lg rounded-tr-lg px-2 placeholder:text-general-med ${iconRight ? 'pr-12' : 'pr-8'}`}
        {...rest}
      />
      <div className="absolute flex items-center right-1">
        {value && (
          <span
            className="flex items-center cursor-pointer"
            onClick={handleClear}>
            <SvgResetField className="stroke-general-med" height={20} />
          </span>
        )}
        {loading ? (
          <span className="loading loading-ring w-[20px] text-general-med"></span>
        ) : (
          iconRight && <span className="flex items-center">{iconRight}</span>
        )}
      </div>
    </label>
  );
};

export default InputWithLabel;
