import React from 'react';
const SvgCheck: React.FC<React.SVGProps<SVGSVGElement>> = ({
  height = 24,
  width = 24,
  className,
}) => (
  <svg
    height={height}
    width={width}
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M20 6 9 17l-5-5"
    />
  </svg>
);
export default SvgCheck;
