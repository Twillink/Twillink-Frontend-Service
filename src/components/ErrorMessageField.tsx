import React from 'react';

interface IErrorMessageField {
  error?: string;
  touched?: boolean;
  className?: string;
}

const ErrorMessageField: React.FC<IErrorMessageField> = ({
  error,
  touched,
  className,
}) => {
  if (!error || !touched) return null;

  return <div className={`text-error text-sm ${className}`}>{error}</div>;
};

export default ErrorMessageField;
