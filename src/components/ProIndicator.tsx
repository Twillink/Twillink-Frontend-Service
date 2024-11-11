import React from 'react';

interface IProIndicator {
  className?: string;
}

const ProIndicator: React.FC<IProIndicator> = ({className = ''}) => {
  return (
    <span
      className={`font-bold text-sm bg-secondary px-1.5 rounded-md text-primary-content ${className}`}>
      Pro
    </span>
  );
};

export default ProIndicator;
