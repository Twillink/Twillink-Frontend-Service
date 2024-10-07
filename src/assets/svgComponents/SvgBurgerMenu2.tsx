import React from 'react';
const SvgBurgerMenu2: React.FunctionComponent<
  React.SVGProps<SVGSVGElement>
> = ({height = 24, width, className}) => (
  <svg
    height={height}
    width={width}
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg">
    <path
      strokeWidth={1.5}
      d="M3 5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5ZM3 16a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3ZM14 5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2V5ZM14 16a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-3Z"
    />
  </svg>
);
export default SvgBurgerMenu2;
