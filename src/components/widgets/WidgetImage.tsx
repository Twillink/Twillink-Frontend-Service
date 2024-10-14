'use client';

import React from 'react';
import Image from 'next/image';

import isUrl from 'is-url';

interface IWidgetImage extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string;
  url: string;
  width?: string;
  image?: string | ArrayBuffer | null;
}

const WidgetImage: React.FC<IWidgetImage> = ({
  text,
  url,
  image,
  ...restProps
}) => {
  return (
    <a
      href={url}
      className="border-base-300 border-2 rounded-2xl h-full w-full p-2 flex items-center"
      {...restProps}>
      <div className="flex justify-between items-center w-full gap-2 rounded-sm overflow-hidden">
        <p
          className={`text-center text-xs text-ellipsis line-clamp-3 overflow-hidden font-normal w-fit ${image ? 'w-1/2' : 'w-full'} z-10 absolute bg-base-200 left-2 bottom-2 px-2 py-2 rounded-full`}>
          {text}
        </p>
        {url && isUrl(url) && (
          <Image
            src={url}
            alt={text}
            fill
            className="object-cover z-2 rounded-lg"
          />
        )}
      </div>
    </a>
  );
};

export default WidgetImage;
