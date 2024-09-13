import React from 'react';

interface ErrorMessageProps {
  error?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({error}) => {
  if (!error) return null;

  return <div className="text-error">{error}</div>;
};

export default ErrorMessage;
