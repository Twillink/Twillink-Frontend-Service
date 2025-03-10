import React from 'react';

const SvgTelegram: React.FunctionComponent<React.SVGProps<SVGSVGElement>> = ({
  height = 24,
  width = 24,
  className,
}) => (
  <svg
    height={height}
    width={width}
    className={className}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_5227_17244)">
      <path
        d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
        fill="url(#paint0_linear_5227_17244)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.24334 15.8309C11.9077 13.7988 15.0179 12.459 16.5742 11.8117C21.0176 9.96359 21.9408 9.64255 22.5426 9.63195C22.675 9.62962 22.9709 9.66242 23.1626 9.81797C23.3245 9.94931 23.369 10.1267 23.3904 10.2513C23.4117 10.3758 23.4382 10.6595 23.4171 10.8811C23.1763 13.4111 22.1344 19.5507 21.6044 22.3843C21.3801 23.5833 20.9385 23.9853 20.5109 24.0247C19.5818 24.1102 18.8762 23.4106 17.9763 22.8207C16.5681 21.8976 15.7725 21.323 14.4056 20.4222C12.8259 19.3812 13.85 18.8091 14.7503 17.874C14.9859 17.6293 19.0797 13.9056 19.1589 13.5678C19.1689 13.5256 19.1781 13.3681 19.0845 13.285C18.9909 13.2018 18.8529 13.2302 18.7532 13.2529C18.612 13.2849 16.3624 14.7718 12.0043 17.7136C11.3658 18.1521 10.7874 18.3657 10.2692 18.3545C9.69792 18.3422 8.599 18.0315 7.78206 17.766C6.78006 17.4403 5.98369 17.2681 6.05304 16.7149C6.08916 16.4268 6.48592 16.1321 7.24334 15.8309Z"
        fill="white"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_5227_17244"
        x1="16"
        y1="0"
        x2="16"
        y2="31.7627"
        gradientUnits="userSpaceOnUse">
        <stop stopColor="#2AABEE" />
        <stop offset="1" stopColor="#229ED9" />
      </linearGradient>
      <clipPath id="clip0_5227_17244">
        <rect width="32" height="32" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgTelegram;
