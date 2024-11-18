import React from 'react';

const SvgCopyLink: React.FunctionComponent<React.SVGProps<SVGSVGElement>> = ({
  height = 16,
  width,
  className,
}) => (
  <svg
    height={height}
    width={width}
    className={className}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.9441 24.4851L15.0584 26.3707C12.455 28.9742 8.23385 28.9742 5.63036 26.3707C3.02686 23.7672 3.02686 19.5461 5.63036 16.9426L7.51597 15.057M24.4865 16.9426L26.3722 15.057C28.9757 12.4535 28.9757 8.23239 26.3722 5.62889C23.7687 3.0254 19.5476 3.0254 16.9441 5.62889L15.0584 7.51451M11.3346 20.6664L20.6679 11.3331"
      stroke="#16171D"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgCopyLink;
