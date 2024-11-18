import React from 'react';

const SvgGoogleMeet: React.FunctionComponent<React.SVGProps<SVGSVGElement>> = ({
  height = 16,
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
    <g clipPath="url(#clip0_449_14082)">
      <path
        d="M13.577 12.0302L15.9167 14.7046L19.0632 16.7151L19.6105 12.0471L19.0632 7.48438L15.8565 9.25053L13.577 12.0302Z"
        fill="#00832D"
      />
      <path
        d="M0 16.2806V20.2584C0 21.1667 0.73725 21.9041 1.64569 21.9041H5.6235L6.44719 18.8986L5.6235 16.2806L2.89444 15.4569L0 16.2806Z"
        fill="#0066DA"
      />
      <path
        d="M5.6235 2.15625L0 7.77975L2.89462 8.60147L5.6235 7.77975L6.43219 5.19741L5.6235 2.15625Z"
        fill="#E94235"
      />
      <path
        d="M0.00012207 16.2824H5.62353V7.77966H0.00012207V16.2824Z"
        fill="#2684FC"
      />
      <path
        d="M22.6555 4.53735L19.0631 7.48447V16.7151L22.6703 19.6737C23.2103 20.0967 24.0003 19.7112 24.0003 19.0247V5.17316C24.0003 4.47913 23.1915 4.0955 22.6554 4.53744"
        fill="#00AC47"
      />
      <path
        d="M13.5771 12.0302V16.2806H5.62354V21.9041H17.4177C18.3261 21.9041 19.0633 21.1667 19.0633 20.2584V16.715L13.5771 12.0302Z"
        fill="#00AC47"
      />
      <path
        d="M17.4177 2.15625H5.62354V7.77975H13.5771V12.0302L19.0633 7.48425V3.80203C19.0633 2.89359 18.3261 2.15634 17.4177 2.15634"
        fill="#FFBA00"
      />
    </g>
    <defs>
      <clipPath id="clip0_449_14082">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgGoogleMeet;
