import React from 'react';

interface ErrorMessageFieldProps {
  error?: string;
  touched?: boolean;
}

const ErrorMessageField: React.FC<ErrorMessageFieldProps> = ({
  error,
  touched,
}) => {
  if (!error || !touched) return null;

  return <div className="text-error text-sm">{error}</div>;
};

export default ErrorMessageField;
