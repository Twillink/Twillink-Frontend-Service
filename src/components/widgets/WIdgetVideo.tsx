'use client';

import React, {useRef} from 'react';

import isUrl from 'is-url';
import {DefaultUi, Player, Video} from '@vime/react';

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
  const player = useRef<HTMLVmPlayerElement>(null);

  const onPlaybackReady = () => {
    console.log(text, image);
    // ...
  };

  return (
    <a
      href={url}
      className="border-base-300 border-2 rounded-2xl h-full w-full p-2 flex items-center"
      {...restProps}>
      <div className="flex justify-between items-center w-full gap-2 rounded-sm overflow-hidden">
        {/* <p
          className={`text-center text-xs text-ellipsis line-clamp-3 overflow-hidden font-normal w-fit ${image ? 'w-1/2' : 'w-full'} z-10 absolute bg-base-200 left-2 bottom-2 px-2 py-2 rounded-full`}>
          {text}
        </p> */}
        {url && isUrl(url) && (
          <Player
            className="object-cover"
            playsinline
            ref={player}
            onVmPlaybackReady={onPlaybackReady}>
            <Video>
              <source
                data-src={url}
                // type="video/mp4"
              />
            </Video>

            <DefaultUi>
              {/* Custom UI Component. */}
              {/* <TapSidesToSeek /> */}
            </DefaultUi>
          </Player>
        )}
      </div>
    </a>
  );
};

export default WidgetVideo;
