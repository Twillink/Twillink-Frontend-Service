'use client';

import React from 'react';

import isUrl from 'is-url';
import ReactPlayer from 'react-player';

interface IWidgetVideo {
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
    <div
      className="border-base-300 border-2 rounded-2xl h-full w-full flex items-center"
      {...restProps}>
      <div className="flex justify-center items-center w-full p-2 rounded-sm overflow-hidden">
        <p
          className={`hidden text-center text-xs text-ellipsis line-clamp-3 overflow-hidden font-normal w-fit ${image ? 'w-1/2' : 'w-full'} z-10 absolute bg-base-200 left-2 bottom-2 px-2 py-2 rounded-full`}>
          {text}
        </p>
        {url && isUrl(url) && (
          <ReactPlayer url={url} height={90} width={'100%'} light />
        )}
      </div>
    </div>
  );
};

export default WidgetVideo;
