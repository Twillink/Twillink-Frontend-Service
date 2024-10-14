import React, {ChangeEvent, FocusEvent, InputHTMLAttributes} from 'react';

interface CountryOption {
  value: string | null | undefined;
  label: string;
  emoji: string;
}

interface IInputLabel extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  options: CountryOption[];
  error?: string;
}

const InputPhoneCountries: React.FC<IInputLabel> = ({
  value,
  onChange,
  onBlur,
  type = 'tel',
  placeholder,
  autoComplete,
  className,
  label,
  options,
  error,
  ...rest
}) => {
  const currentCountryCode =
    options.find(option => option.value && value.startsWith(option.value))
      ?.value || '';

  const phoneNumber = value.replace(currentCountryCode, '');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPhoneNumber = e.target.value;

    const filteredPhoneNumber = newPhoneNumber.replace(/[^0-9]/g, '');

    const newValue = currentCountryCode + filteredPhoneNumber;
    onChange({
      target: {name: e.target.name, value: newValue},
    } as ChangeEvent<HTMLInputElement>);
  };

  const handleCountryCodeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCountryCode = e.target.value;
    const newValue = selectedCountryCode + phoneNumber;
    onChange({
      target: {name: rest.name, value: newValue},
    } as ChangeEvent<HTMLInputElement>);
  };

  const selectedCountry =
    options.find(option => option.value === currentCountryCode) || options[0];

  const selectedCountryValue = selectedCountry.value || '';

  return (
    <div className="flex flex-col w-full">
      <label className="mb-1 text-general-med text-sm">{label}</label>
      <div className="relative">
        <div className="absolute top-0 left-0 h-10 p-[1px]">
          <select
            className="h-full flex items-center rounded-l-lg bg-contras-low text-primary border-r-2 border-general-low outline-none"
            value={selectedCountryValue}
            onChange={handleCountryCodeChange}>
            {options.map(option => (
              <option key={option.value || ''} value={option.value || ''}>
                {option.emoji} {option.label}
              </option>
            ))}
          </select>
        </div>
        <input
          type={type}
          className={`w-full input input-bordered h-10 rounded-l-lg pl-20 text-primary font-normal text-base bg-transparent ${className}`}
          placeholder={placeholder}
          value={phoneNumber}
          onChange={handleInputChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          {...rest}
        />
      </div>
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};

export default InputPhoneCountries;
