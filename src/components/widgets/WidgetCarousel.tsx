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
    <div
      className="border-base-300 border-2 rounded-2xl h-full bg-primary-content w-full mb-2 "
      {...restProps}>
      <div className="w-full rounded-box space-x-2 overflow-hidden">
        <p
          className={`text-start text-sm truncate line-clamp-1 max-w-[90%] overflow-hidden font-normal w-fit ${text ? 'w-1/2' : 'w-full'} z-10 px-2 pt-2 pb-1`}>
          {text}
        </p>

        <div className={'w-full h-full'}>
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
