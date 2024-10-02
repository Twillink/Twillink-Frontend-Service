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
    <rect width={22} height={22} x={1} y={1} strokeWidth={1.5} rx={6} />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M16.667 17.25c0-.814 0-1.221-.1-1.552a2.333 2.333 0 0 0-1.556-1.556c-.331-.1-.739-.1-1.553-.1h-2.916c-.814 0-1.221 0-1.553.1-.745.226-1.329.81-1.555 1.556-.1.33-.1.738-.1 1.552m7.291-7.875a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
    />
  </svg>
);
export default SvgLinkWidget;
