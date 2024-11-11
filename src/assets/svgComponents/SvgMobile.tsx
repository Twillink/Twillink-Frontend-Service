import React from 'react';

const SvgMobile: React.FunctionComponent<React.SVGProps<SVGSVGElement>> = ({
  height = 24,
  width,
  className,
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11 17H13"
      // stroke={className === 'text-primary' ? 'white' : 'black'}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M6 6C6 4.34315 7.34315 3 9 3H15C16.6569 3 18 4.34315 18 6V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V6Z"
      // stroke={className === 'text-primary' ? 'white' : 'black'}
      strokeWidth="1.5"
    />
  </svg>
);
export default SvgMobile;
