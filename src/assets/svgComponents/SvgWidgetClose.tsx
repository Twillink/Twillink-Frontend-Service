import React from 'react';
const SvgWidgetClose: React.FunctionComponent<
  React.SVGProps<SVGSVGElement>
> = ({height = 12, width, className}) => (
  <svg
    height={height}
    width={width}
    className={className}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.359 2.641 5.999 6m0 0L2.642 9.359M6 6l3.359 3.359M5.999 6 2.642 2.641"
    />
  </svg>
);
export default SvgWidgetClose;
