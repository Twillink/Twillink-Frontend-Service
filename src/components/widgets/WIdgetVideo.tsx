'use client';

import React, {useMemo} from 'react';
import {usePopup} from '@/libs/providers/PopupProvider';
import PopupVideo from '@/components/Popup/PopupVideo';
import {removeStringByIndex} from '@/utils/formater';
import {Play} from 'lucide-react';

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
  const posterYoutube = useMemo(() => {
    const isYoutube = url?.includes('youtu');
    let youtubeId = isYoutube ? url?.split('v=')[1] : '';
    if (youtubeId && youtubeId.includes('&')) {
      const index = youtubeId.indexOf('&');
      const length = youtubeId.length;
      if (index !== -1) {
        youtubeId = removeStringByIndex(youtubeId, index, length - 1);
      }
    }

    return youtubeId
      ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
      : '';
  }, [url]);

  const {openPopup} = usePopup();

  const handleOpenVideo = () => {
    openPopup(
      'Video',
      <PopupVideo url={url ?? ''} posterYoutube={posterYoutube} />,
      'xl:max-w-[40%]',
    );
  };

  return (
    <div
      className="border-base-300 bg-primary-content border-2 rounded-2xl h-full w-full flex items-center"
      {...restProps}>
      <div className="flex justify-center items-center w-full h-full relative rounded-2xl overflow-hidden">
        <p
          className={` text-center text-xs text-ellipsis line-clamp-3 overflow-hidden font-normal w-fit ${url || image ? 'w-1/2' : 'w-full'} z-10 absolute bg-base-200 left-2 bottom-2 px-2 py-1 rounded-lg`}>
          {text}
        </p>

        {url && (
          <Play
            onClick={handleOpenVideo}
            size={48}
            className={'absolute stroke-white fill-white z-10 cursor-pointer'}
          />
        )}
        <div className={'cursor-pointer'} onClick={handleOpenVideo}>
          {url && (
            <video
              className="max-w-full h-auto z-0"
              {...(posterYoutube && {poster: posterYoutube})}
              // poster={posterYoutube ?? null}
            >
              <source src={url} type="video/mp4" />
              <source src={url} type="video/mov" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
    </div>
  );
};

export default WidgetVideo;
