import React from 'react';
const SvgLinkWidget: React.FunctionComponent<React.SVGProps<SVGSVGElement>> = ({
  height = 24,
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
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 5 3 7v12l6-2M9 5v12M9 5l6 2M9 17l6 2m0-12 6-2v12l-6 2m0-12v12"
    />
  </svg>
);
export default SvgLinkWidget;
