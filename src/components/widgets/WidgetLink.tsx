'use client';

import React from 'react';
import Image from 'next/image';

interface IWidgetLink extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string;
  url: string;
  width: string;
  image?: string | ArrayBuffer | null;
}

const WidgetLink: React.FC<IWidgetLink> = ({
  text,
  url,
  image,
  width,
  ...restProps
}) => {
  return (
    <a
      href={url}
      className="border-contras-low border-2 rounded-2xl h-full w-full p-2 flex items-center"
      {...restProps}>
      <div className="flex justify-between items-center w-full gap-2">
        <p
          className={`text-center text-base text-ellipsis line-clamp-2 overflow-hidden font-normal w-full ${image ? 'w-1/2' : 'w-full'}`}>
          {text}
        </p>
        {image && width === '100%' && (
          <Image
            src={typeof image === 'string' ? image : ''}
            alt={text}
            className="w-1/2 object-cover h-[90px] rounded-lg"
            width={100}
            height={100}
          />
        )}
      </div>
    </a>
  );
};

export default WidgetLink;
