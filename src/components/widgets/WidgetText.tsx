'use client';

import React from 'react';

interface WidgetTextProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string;
}

const WidgetText: React.FC<WidgetTextProps> = ({text}) => {
  return (
    <div className="border-contras-low border-2 rounded-2xl h-full w-full p-2 flex items-center">
      <p
        className={`text-center text-base text-ellipsis line-clamp-2 overflow-hidden font-semibold w-full`}>
        {text}
      </p>
    </div>
  );
};

export default WidgetText;
