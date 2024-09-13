import React from 'react';
const SvgArrowLeft: React.FunctionComponent<React.SVGProps<SVGSVGElement>> = ({
  height = 32,
  width = 33,
  className,
}) => (
  <svg
    height={height}
    width={width}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M26.667 16.5H5.333m0 0 8-8m-8 8 8 8"
    />
  </svg>
);
export default SvgArrowLeft;
