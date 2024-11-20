'use client';

import React from 'react';
import Image from 'next/image';
import {usePopup} from '@/libs/providers/PopupProvider';
import PopupImage from '@/components/Popup/PopupImage';

interface IWidgetImage {
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
  const {openPopup} = usePopup();

  const handleOpen = () => {
    openPopup('Image', <PopupImage url={url} />, 'xl:max-w-[40%]');
  };

  return (
    <div
      className="border-base-300 bg-primary-content border-2 rounded-2xl h-full w-full flex items-center "
      {...restProps}>
      <div className="flex justify-between items-center w-full gap-2 h-full rounded-2xl overflow-hidden relative">
        <p
          className={`text-center text-xs text-ellipsis line-clamp-3 overflow-hidden font-normal w-fit ${url || image ? 'w-1/2' : 'w-full'} z-[3] absolute bg-base-200 left-2 right-2 bottom-2 px-2 py-1 rounded-lg`}>
          {text}
        </p>
        {url && (
          <button onClick={handleOpen} className="w-full h-full relative">
            <Image
              src={url}
              alt={text}
              fill
              className="object-cover rounded-lg"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default WidgetImage;
