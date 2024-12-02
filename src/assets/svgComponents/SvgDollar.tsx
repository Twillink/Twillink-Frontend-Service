import React from 'react';

const SvgDollar: React.FunctionComponent<React.SVGProps<SVGSVGElement>> = ({
  height = 16,
  width,
  className,
}) => (
  <svg
    height={height}
    width={width}
    className={className}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4 10.6666C4 12.1393 5.19391 13.3333 6.66667 13.3333H9.33333C10.8061 13.3333 12 12.1393 12 10.6666C12 9.19383 10.8061 7.99992 9.33333 7.99992H6.66667C5.19391 7.99992 4 6.80601 4 5.33325C4 3.86049 5.19391 2.66659 6.66667 2.66659H9.33333C10.8061 2.66659 12 3.86049 12 5.33325M8 1.33325V14.6666"
      stroke="#16171D"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
export default SvgDollar;
