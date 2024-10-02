import React from 'react';
const SvgArrowLeftThin: React.FunctionComponent<
  React.SVGProps<SVGSVGElement>
> = ({height = 24, width, className}) => (
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
      d="M20 12H4m0 0 6-6m-6 6 6 6"
    />
  </svg>
);
export default SvgArrowLeftThin;
