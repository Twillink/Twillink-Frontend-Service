import React from 'react';
const SvgWidgetDelete: React.FunctionComponent<
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
      d="M4.5 1.5h3M1.5 3h9m-1 0-.35 5.26c-.053.789-.08 1.183-.25 1.482a1.5 1.5 0 0 1-.65.608c-.309.15-.704.15-1.495.15h-1.51c-.79 0-1.186 0-1.496-.15a1.5 1.5 0 0 1-.649-.607c-.17-.3-.197-.694-.25-1.483L2.5 3M5 5.25v2.5m2-2.5v2.5"
    />
  </svg>
);
export default SvgWidgetDelete;
