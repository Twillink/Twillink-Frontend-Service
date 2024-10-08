import React from 'react';
const SvgOrderDown: React.FunctionComponent<React.SVGProps<SVGSVGElement>> = ({
  height = 24,
  width,
  className,
}) => (
  <svg
    height={height}
    width={width}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M17 4v11m0 0-4-4m4 4 4-4M7 4v16m0 0-4-4m4 4 4-4"
    />
  </svg>
);
export default SvgOrderDown;
