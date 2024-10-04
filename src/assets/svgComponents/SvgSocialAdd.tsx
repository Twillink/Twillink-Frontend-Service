import React from 'react';
const SvgSocialAdd: React.FunctionComponent<React.SVGProps<SVGSVGElement>> = ({
  height = 26,
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
      fill="none"
      d="M1 13C1 6.373 6.373 1 13 1s12 5.373 12 12-5.373 12-12 12S1 19.627 1 13Z"
    />
    <path
      stroke="#ECEDF2"
      strokeDasharray="2 2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M1 13C1 6.373 6.373 1 13 1s12 5.373 12 12-5.373 12-12 12S1 19.627 1 13Z"
    />
    <g clipPath="url(#a)">
      <path
        stroke="#B2B6C7"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M13 8.25V13m0 0v4.75M13 13h4.75M13 13H8.25"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="none" d="M7 7h12v12H7z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgSocialAdd;
