import React from 'react';
const SvgClose: React.FunctionComponent<React.SVGProps<SVGSVGElement>> = ({
  height = 24,
  width,
  className,
}) => (
  <svg
    height={height}
    width={width}
    className={className}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18.718 5.282 12 12m0 0-6.718 6.718M12 12l6.718 6.718M12 12 5.282 5.282"
    />
  </svg>
);
export default SvgClose;
