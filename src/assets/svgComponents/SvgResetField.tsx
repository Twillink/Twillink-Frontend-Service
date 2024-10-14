import React from 'react';
const SvgResetField: React.FunctionComponent<React.SVGProps<SVGSVGElement>> = ({
  height = 24,
  width,
  className,
}) => (
  <svg
    height={height}
    width={width}
    className={className}
    viewBox={`0 0 ${height} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <circle cx={10} cy={10} r={9.167} strokeWidth={1.5} />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13.265 6.735 10 10m0 0-3.265 3.265M10 10l3.265 3.266M10 10 6.735 6.735"
    />
  </svg>
);
export default SvgResetField;
