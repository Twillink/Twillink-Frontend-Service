import React from 'react';

interface IErrorMessage {
  error?: string;
}

const ErrorMessage: React.FC<IErrorMessage> = ({error}) => {
  if (!error) return null;

  return <div className="text-error">{error}</div>;
};

export default ErrorMessage;
