import React from 'react';
const SvgBurgerMenu: React.FunctionComponent<React.SVGProps<SVGSVGElement>> = ({
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
    <path d="M4 4H20M4 12H20M4 20H20" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
export default SvgBurgerMenu;
