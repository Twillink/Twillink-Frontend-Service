import React from 'react';
const SvgWidgetFull: React.FunctionComponent<React.SVGProps<SVGSVGElement>> = ({
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
      d="M10.5 10.5v-9m-9 9v-9M3.25 6h5.5m0 1.5v-3m-5.5 3v-3"
    />
  </svg>
);
export default SvgWidgetFull;
