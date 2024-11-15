import React from 'react';

const SvgGlobe: React.FunctionComponent<React.SVGProps<SVGSVGElement>> = ({
  height = 24,
  width,
  className,
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 32 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <rect y="0.5" width="32" height="32" rx="8" fill="#F6F7F9" />
    <path
      d="M15.9993 8.1665C18.0837 10.4485 19.2683 13.4099 19.3327 16.4998C19.2683 19.5898 18.0837 22.5512 15.9993 24.8332M15.9993 8.1665C13.9149 10.4485 12.7304 13.4099 12.666 16.4998C12.7304 19.5898 13.9149 22.5512 15.9993 24.8332M15.9993 8.1665C11.397 8.1665 7.66602 11.8975 7.66602 16.4998C7.66602 21.1022 11.397 24.8332 15.9993 24.8332M15.9993 8.1665C20.6017 8.1665 24.3327 11.8975 24.3327 16.4998C24.3327 21.1022 20.6017 24.8332 15.9993 24.8332M8.0827 13.9998H23.916M8.08268 18.9998H23.916"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgGlobe;
