import React from 'react';
const SvgWidgetEdit: React.FunctionComponent<React.SVGProps<SVGSVGElement>> = ({
  height = 12,
  width,
  className,
}) => (
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
      d="M9 5 7 3m-5.75 7.75 1.692-.188c.207-.023.31-.034.407-.066.086-.027.167-.067.242-.116.085-.056.159-.13.306-.277L10.5 3.5a1.414 1.414 0 1 0-2-2L1.897 8.103c-.147.147-.22.22-.277.306a1 1 0 0 0-.116.242c-.032.097-.043.2-.066.407L1.25 10.75Z"
    />
  </svg>
);
export default SvgWidgetEdit;
