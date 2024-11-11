import React from 'react';

const SvgMail: React.FunctionComponent<React.SVGProps<SVGSVGElement>> = ({
  height = 24,
  width,
  className,
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 14 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 4.16683L6.70186 6.01776C6.88954 6.1116 7.11046 6.1116 7.29814 6.01776L11 4.16683M3 10.1668H11C12.1046 10.1668 13 9.2714 13 8.16683V2.8335C13 1.72893 12.1046 0.833496 11 0.833496H3C1.89543 0.833496 1 1.72893 1 2.8335V8.16683C1 9.2714 1.89543 10.1668 3 10.1668Z"
      stroke="white"
      strokeLinecap="round"
    />
  </svg>
);
export default SvgMail;
