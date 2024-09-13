import React from 'react';
interface ComingSoonProps {
  className?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({className = ''}) => {
  return (
    <span
      className={`font-normal text-tiny bg-contras-med px-2 rounded-full text-general-med ${className}`}>
      Coming Soon
    </span>
  );
};

export default ComingSoon;
