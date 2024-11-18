import React from 'react';

interface IErrorMessage {
  error?: string;
  className?: string;
}

const ErrorMessage: React.FC<IErrorMessage> = ({error, className}) => {
  if (!error) return null;

  return <div className={`text-error ${className}`}>{error}</div>;
};

export default ErrorMessage;
