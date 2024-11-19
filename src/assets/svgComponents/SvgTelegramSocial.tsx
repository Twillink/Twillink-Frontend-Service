import React from 'react';

const SvgTelegramSocial: React.FunctionComponent<
  React.SVGProps<SVGSVGElement>
> = ({height = 24, width = 24, className}) => (
  <svg
    height={height}
    width={width}
    className={className}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_5385_13267)">
      <path
        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
        fill="url(#paint0_linear_5385_13267)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.5266 9.89446C7.4418 8.62435 9.38573 7.78702 10.3584 7.38246C13.1355 6.22737 13.7125 6.02672 14.0887 6.02009C14.1714 6.01863 14.3563 6.03913 14.4762 6.13635C14.5773 6.21844 14.6052 6.32934 14.6185 6.40717C14.6318 6.485 14.6484 6.6623 14.6352 6.80083C14.4847 8.38207 13.8335 12.2193 13.5022 13.9903C13.3621 14.7397 13.0861 14.991 12.8188 15.0155C12.2381 15.069 11.7972 14.6318 11.2347 14.2631C10.3546 13.6861 9.85735 13.327 9.00303 12.764C8.01572 12.1134 8.65575 11.7558 9.21842 11.1714C9.36567 11.0184 11.9243 8.69115 11.9739 8.48002C11.98 8.45362 11.9858 8.3552 11.9273 8.30323C11.8689 8.25125 11.7826 8.26903 11.7203 8.28316C11.632 8.3032 10.226 9.23252 7.50222 11.0711C7.10313 11.3452 6.74164 11.4787 6.41776 11.4717C6.06071 11.464 5.37388 11.2698 4.8633 11.1039C4.23705 10.9003 3.73932 10.7927 3.78266 10.4469C3.80524 10.2669 4.05321 10.0827 4.5266 9.89446Z"
        fill="white"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_5385_13267"
        x1="10"
        y1="0"
        x2="10"
        y2="19.8517"
        gradientUnits="userSpaceOnUse">
        <stop stopColor="#2AABEE" />
        <stop offset="1" stopColor="#229ED9" />
      </linearGradient>
      <clipPath id="clip0_5385_13267">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgTelegramSocial;
