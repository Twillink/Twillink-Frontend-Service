import React from 'react';
const SvgWidgetHalfHeight: React.FunctionComponent<
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
      d="M1.5 6H10.5M6 1V4.25M6 4.25L8 2.25M6 4.25L4 2.25M6 11V7.75M6 7.75L8 9.75M6 7.75L4 9.75"
      stroke="white"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
export default SvgWidgetHalfHeight;
