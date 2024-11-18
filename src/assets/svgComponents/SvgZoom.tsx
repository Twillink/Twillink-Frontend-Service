import React from 'react';

const SvgZoom: React.FunctionComponent<React.SVGProps<SVGSVGElement>> = ({
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
    <g clipPath="url(#clip0_449_14092)">
      <path
        d="M24 12C24 13.272 23.904 14.544 23.688 15.768C23.04 19.824 19.824 23.04 15.768 23.688C14.544 23.904 13.272 24 12 24C10.728 24 9.456 23.904 8.232 23.688C4.176 23.04 0.96 19.824 0.312 15.768C0.096 14.544 0 13.272 0 12C0 10.728 0.096 9.456 0.312 8.232C0.96 4.176 4.176 0.96 8.232 0.312C9.456 0.096 10.728 0 12 0C13.272 0 14.544 0.096 15.768 0.312C19.824 0.96 23.04 4.176 23.688 8.232C23.904 9.456 24 10.728 24 12Z"
        fill="url(#paint0_linear_449_14092)"
      />
      <path
        d="M19.128 19.488H7.03201C6.24001 19.488 5.47201 19.056 5.11201 18.36C4.68001 17.544 4.84801 16.56 5.49601 15.912L13.92 7.48804H7.87201C6.21601 7.48804 4.87201 6.14404 4.87201 4.48804H16.008C16.8 4.48804 17.568 4.92004 17.928 5.61604C18.36 6.43204 18.192 7.41604 17.544 8.06404L9.14401 16.512H16.128C17.784 16.512 19.128 17.832 19.128 19.488Z"
        fill="white"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_449_14092"
        x1="567.984"
        y1="2294.69"
        x2="1832.02"
        y2="105.312"
        gradientUnits="userSpaceOnUse">
        <stop stopColor="#0845BF" />
        <stop offset="0.1911" stopColor="#0950DE" />
        <stop offset="0.3823" stopColor="#0B59F6" />
        <stop offset="0.5" stopColor="#0B5CFF" />
        <stop offset="0.6732" stopColor="#0E5EFE" />
        <stop offset="0.7774" stopColor="#1665FC" />
        <stop offset="0.8633" stopColor="#246FF9" />
        <stop offset="0.9388" stopColor="#387FF4" />
        <stop offset="1" stopColor="#4F90EE" />
      </linearGradient>
      <clipPath id="clip0_449_14092">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgZoom;
