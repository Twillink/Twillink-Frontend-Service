'use client';

import React from 'react';

import isUrl from 'is-url';
import ReactPlayer from 'react-player';
import Link from 'next/link';

interface IWidgetVideo extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string;
  url: string;
  width?: string;
  image?: string | ArrayBuffer | null;
}

const WidgetVideo: React.FC<IWidgetVideo> = ({
  text,
  url,
  image,
  ...restProps
}) => {
  return (
    <Link
      href={url}
      className="border-base-300 border-2 rounded-2xl h-full w-full flex items-center"
      {...restProps}>
      <div className="flex justify-center items-center w-full h-full relative rounded-2xl overflow-hidden">
        <p
          className={` text-center text-xs text-ellipsis line-clamp-3 overflow-hidden font-normal w-fit ${url || image ? 'w-1/2' : 'w-full'} z-10 absolute bg-base-200 left-2 bottom-2 px-2 py-1 rounded-lg`}>
          {text}
        </p>
        {url && isUrl(url) && (
          <ReactPlayer url={url} height={'100%'} width={'100%'} light />
        )}
      </div>
    </Link>
  );
};

export default WidgetVideo;
