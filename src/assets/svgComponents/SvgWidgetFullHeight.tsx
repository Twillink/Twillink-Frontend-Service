import React from 'react';
const SvgWidgetFullHeight: React.FunctionComponent<
  React.SVGProps<SVGSVGElement>
> = ({height = 12, width, className}) => (
  <svg
    height={height}
    width={width}
    className={className}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10.5 1.5H1.5M10.5 10.5H1.5M6 8.75002L6 3.25002M7.50004 3.25001L4.5 3.25M7.50004 8.75001L4.5 8.75"
      stroke="white"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
export default SvgWidgetFullHeight;
