'use client';

import React from 'react';

interface IWidgetText extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string;
}

const WidgetText: React.FC<IWidgetText> = ({text}) => {
  return (
    <div className="border-base-300 border-2 rounded-2xl h-full w-full p-2 flex items-center">
      <p
        className={`text-center text-[14px] text-ellipsis line-clamp-2 overflow-hidden font-semibold w-full`}>
        {text}
      </p>
    </div>
  );
};

export default WidgetText;
