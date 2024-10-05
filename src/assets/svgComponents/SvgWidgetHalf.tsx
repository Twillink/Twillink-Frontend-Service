import React from 'react';
const SvgWidgetHalf: React.FunctionComponent<React.SVGProps<SVGSVGElement>> = ({
  height = 12,
  width,
  className,
}) => (
  <svg
    height={height}
    width={width}
    className={className}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 1.5v9M11 6H7.75m0 0 2 2m-2-2 2-2M1 6h3.25m0 0-2 2m2-2-2-2"
    />
  </svg>
);
export default SvgWidgetHalf;
