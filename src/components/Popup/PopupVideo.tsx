import React from 'react';
import ReactPlayer from 'react-player';

interface IPopupImage {
  url: string;
  posterYoutube?: string;
}

const PopupVideo: React.FC<IPopupImage> = ({url, posterYoutube}) => {
  const isYoutube = posterYoutube?.includes('youtu');
  return (
    <div className={`modal-backdrop flex flex-col gap-5`}>
      <div className={'relative w-full h-[400px]'}>
        {url && !isYoutube && (
          <video controls className="w-full h-full">
            <source src={url} type="video/mp4" />
            <source src={url} type="video/mov" />
            <source src={url} type="video/webm" />
            <source src={url} type="video/ogv" />
            <source src={url} type="video/ogg" />
            Your browser does not support the video tag.
          </video>
        )}

        {url && isYoutube && (
          <ReactPlayer url={url} height={'100%'} width={'100%'} />
        )}
      </div>
    </div>
  );
};

export default PopupVideo;
