import React from 'react';
const SvgPlus: React.FunctionComponent<React.SVGProps<SVGSVGElement>> = ({
  height = 24,
  width = 24,
  className,
}) => (
  <svg
    height={height}
    width={width}
    className={className}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 2.5V12m0 0v9.5m0-9.5h9.5M12 12H2.5"
    />
  </svg>
);
export default SvgPlus;
