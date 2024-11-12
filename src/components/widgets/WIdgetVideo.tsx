'use client';

import React from 'react';

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
  console.log(url);
  return (
    <div
      className="border-base-300 border-2 rounded-2xl h-full w-full flex items-center"
      {...restProps}>
      <div className="flex justify-center items-center w-full h-full relative rounded-2xl overflow-hidden">
        <p
          className={` text-center text-xs text-ellipsis line-clamp-3 overflow-hidden font-normal w-fit ${url || image ? 'w-1/2' : 'w-full'} z-10 absolute bg-base-200 left-2 bottom-2 px-2 py-1 rounded-lg`}>
          {text}
        </p>

        {url && (
          <video controls className="max-w-full h-auto">
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
};

export default WidgetVideo;
