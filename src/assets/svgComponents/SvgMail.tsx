import React from 'react';
const SvgMail: React.FunctionComponent<React.SVGProps<SVGSVGElement>> = ({
  height = 24,
  width,
  className,
}) => (
  <svg
    height={height}
    width={width}
    className={className}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 8.33341L9.62732 10.6471C9.86193 10.7644 10.1381 10.7644 10.3727 10.6471L15 8.33341M5 15.8334H15C16.3807 15.8334 17.5 14.7141 17.5 13.3334V6.66675C17.5 5.28604 16.3807 4.16675 15 4.16675H5C3.61929 4.16675 2.5 5.28604 2.5 6.66675V13.3334C2.5 14.7141 3.61929 15.8334 5 15.8334Z"
      stroke="#94A3B8"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
export default SvgMail;
