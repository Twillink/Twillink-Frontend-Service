import React from 'react';
const SvgSun: React.FunctionComponent<React.SVGProps<SVGSVGElement>> = ({
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
    <path d="M18 18v.75h.75V18H18ZM6 18h-.75v.75H6V18Zm13 .75a.75.75 0 0 0 0-1.5v1.5Zm-14-1.5a.75.75 0 0 0 0 1.5v-1.5Zm8.768 2.518-.53-.53.53.53Zm-3.536 0-.53.53.53-.53ZM12.75 3a.75.75 0 0 0-1.5 0h1.5Zm4.5 8v7h1.5v-7h-1.5Zm.75 6.25H6v1.5h12v-1.5ZM6.75 18v-7h-1.5v7h1.5ZM12 5.75c2.9 0 5.25 2.35 5.25 5.25h1.5A6.75 6.75 0 0 0 12 4.25v1.5Zm0-1.5A6.75 6.75 0 0 0 5.25 11h1.5c0-2.9 2.35-5.25 5.25-5.25v-1.5Zm7 13H5v1.5h14v-1.5Zm-5.25.75c0 .464-.184.91-.513 1.237l1.061 1.061A3.25 3.25 0 0 0 15.25 18h-1.5Zm-.513 1.237A1.75 1.75 0 0 1 12 19.75v1.5a3.25 3.25 0 0 0 2.298-.952l-1.06-1.06ZM12 19.75a1.75 1.75 0 0 1-1.237-.513l-1.061 1.061A3.25 3.25 0 0 0 12 21.25v-1.5Zm-1.237-.513A1.75 1.75 0 0 1 10.25 18h-1.5c0 .862.342 1.689.952 2.298l1.06-1.06ZM12.75 5V3h-1.5v2h1.5Z" />
  </svg>
);
export default SvgSun;
