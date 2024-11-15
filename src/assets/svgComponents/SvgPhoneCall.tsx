import React from 'react';

const SvgPhoneCall: React.FunctionComponent<React.SVGProps<SVGSVGElement>> = ({
  height = 32,
  width = 32,
  className,
}) => (
  <svg
    height={height}
    width={width}
    className={className}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_1849_1770)">
      <path
        d="M9.36636 4C10.0175 4.12705 10.616 4.44551 11.0851 4.91463C11.5542 5.38374 11.8726 5.98218 11.9997 6.63334M9.36636 1.33334C10.7192 1.48363 11.9808 2.08945 12.9439 3.05134C13.907 4.01323 14.5144 5.27401 14.6664 6.62667M6.81768 9.24205C6.01663 8.441 5.3841 7.53524 4.9201 6.56882C4.88019 6.4857 4.86024 6.44413 4.84491 6.39154C4.79042 6.20464 4.82956 5.97513 4.9429 5.81684C4.97479 5.7723 5.0129 5.7342 5.0891 5.65799C5.32217 5.42492 5.43871 5.30838 5.5149 5.1912C5.80223 4.74927 5.80223 4.17955 5.5149 3.73762C5.43871 3.62044 5.32218 3.5039 5.0891 3.27083L4.95919 3.14092C4.6049 2.78662 4.42775 2.60948 4.23749 2.51325C3.85912 2.32187 3.41228 2.32187 3.0339 2.51325C2.84365 2.60948 2.6665 2.78662 2.31221 3.14092L2.20712 3.24601C1.85403 3.59909 1.67749 3.77563 1.54266 4.01565C1.39305 4.28199 1.28547 4.69565 1.28638 5.00113C1.2872 5.27643 1.3406 5.46458 1.44741 5.84088C2.02139 7.86314 3.10437 9.77138 4.69636 11.3634C6.28835 12.9554 8.19659 14.0383 10.2189 14.6123C10.5951 14.7191 10.7833 14.7725 11.0586 14.7733C11.3641 14.7743 11.7777 14.6667 12.0441 14.5171C12.2841 14.3822 12.4606 14.2057 12.8137 13.8526L12.9188 13.7475C13.2731 13.3932 13.4503 13.2161 13.5465 13.0258C13.7379 12.6475 13.7379 12.2006 13.5465 11.8222C13.4503 11.632 13.2731 11.4548 12.9188 11.1005L12.7889 10.9706C12.5558 10.7376 12.4393 10.621 12.3221 10.5448C11.8802 10.2575 11.3105 10.2575 10.8685 10.5448C10.7513 10.621 10.6348 10.7376 10.4017 10.9706C10.3255 11.0468 10.2874 11.0849 10.2429 11.1168C10.0846 11.2302 9.85509 11.2693 9.66819 11.2148C9.6156 11.1995 9.57403 11.1795 9.49091 11.1396C8.52449 10.6756 7.61873 10.0431 6.81768 9.24205Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1849_1770">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgPhoneCall;
