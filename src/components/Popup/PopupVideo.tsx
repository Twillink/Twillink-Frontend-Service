import React from 'react';
import ReactPlayer from 'react-player';

interface IPopupImage {
  url: string;
  posterYoutube?: string;
}

const PopupVideo: React.FC<IPopupImage> = ({url, posterYoutube}) => {
  return (
    <div className={`modal-backdrop flex flex-col gap-5`}>
      <div className={'relative w-full h-[400px]'}>
        {url && !posterYoutube && (
          <video
            controls
            className="w-full h-full"
            /*{...(posterYoutube && {poster: posterYoutube})}*/
            // poster={posterYoutube ?? null}
          >
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {url && posterYoutube && (
          <ReactPlayer url={url} height={'100%'} width={'100%'} />
        )}
      </div>
    </div>
  );
};

export default PopupVideo;
