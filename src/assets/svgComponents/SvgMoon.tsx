import React from 'react';
const SvgMoon: React.FunctionComponent<React.SVGProps<SVGSVGElement>> = ({
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
      d="M21 14.1494C19.7348 15.2983 18.0452 16 16.1892 16C12.267 16 9.08734 12.866 9.08734 9C9.08734 6.45911 10.4608 4.23441 12.516 3.00785C12.3883 3.00263 12.26 3 12.131 3C7.0881 3 3 7.02944 3 12C3 16.9706 7.0881 21 12.131 21C16.4224 21 20.0223 18.0821 21 14.1494Z"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgMoon;
