import React from 'react';
interface IComingSoon {
  className?: string;
}

const ComingSoon: React.FC<IComingSoon> = ({className = ''}) => {
  return (
    <span
      className={`font-normal text-tiny bg-contras-med px-2 rounded-full text-general-med ${className}`}>
      PRO
    </span>
  );
};

export default ComingSoon;
