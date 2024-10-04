import React from 'react';

interface IErrorMessageField {
  error?: string;
  touched?: boolean;
}

const ErrorMessageField: React.FC<IErrorMessageField> = ({error, touched}) => {
  if (!error || !touched) return null;

  return <div className="text-error text-sm">{error}</div>;
};

export default ErrorMessageField;
