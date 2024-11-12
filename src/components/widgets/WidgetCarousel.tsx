'use client';

import React from 'react';
import CustomCarousel from '@/components/CustomCarousel/CustomCarousel';

interface IWidgetCarousel {
  text: string;
  url?: string;
  width?: string;
  images?: string[];
  attachmentIds?: string[];
}

const WidgetCarousel: React.FC<IWidgetCarousel> = ({
  text,
  images,
  attachmentIds,
  ...restProps
}) => {
  return (
    <div className="w-full mb-2" {...restProps}>
      <div className="w-full  bg-red rounded-box space-x-2">
        <p
          className={` hidden text-center text-xs text-ellipsis line-clamp-3 overflow-hidden font-normal w-fit ${text ? 'w-1/2' : 'w-full'} z-10 absolute bg-base-200 left-2 bottom-2 px-2 py-2 rounded-full`}>
          {text}
        </p>

        <div className={'w-full'}>
          <CustomCarousel
            slides={images ?? attachmentIds}
            attachmentIds={attachmentIds}
          />
        </div>
      </div>
    </div>
  );
};

export default WidgetCarousel;
