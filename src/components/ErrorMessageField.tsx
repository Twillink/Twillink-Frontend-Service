import React from 'react';

interface IErrorMessageField {
  error?: string | null;
  touched?: boolean;
  className?: string;
}

const ErrorMessageField: React.FC<IErrorMessageField> = ({
  error,
  touched,
  className,
}) => {
  if (!error || !touched) return null;

  return (
    <div className={`text-error text-sm mt-2 ${className}`}>
      {Array.isArray(error) ? (
        error.map((msg, index) => <div key={index}>{msg}</div>)
      ) : (
        <div>{error}</div>
      )}
    </div>
  );
};

export default ErrorMessageField;
