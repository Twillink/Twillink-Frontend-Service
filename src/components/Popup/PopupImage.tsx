import React from 'react';
import Image from 'next/image';

interface IPopupImage {
  url: string;
}

const PopupImage: React.FC<IPopupImage> = ({url}) => {
  return (
    <div className={`modal-backdrop flex flex-col gap-5 mb-5`}>
      {url && (
        <div className={'relative w-full h-[400px]'}>
          <Image
            src={url}
            alt={'Image'}
            className="object-contain rounded-lg"
            fill
          />
        </div>
      )}
    </div>
  );
};

export default PopupImage;
