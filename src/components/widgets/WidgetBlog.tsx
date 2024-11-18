'use client';

import React, {useContext, useEffect, useMemo, useState} from 'react';
import Image from 'next/image';
import SvgGlobe from '@/assets/svgComponents/SvgGlobe';
import Button from '@/components/Button';
import {
  PreviewContext,
  PreviewTypeEnum,
} from '@/libs/providers/PreviewProvider';
import PopupDetailBlog from '@/components/Popup/PopupDetailBlog';

interface IWidgetBlog {
  title: string;
  url: string;
  width?: string;
  image?: string | ArrayBuffer | null;
  urlThumbnail?: string;
}

const WidgetBlog: React.FC<IWidgetBlog> = ({
  title,
  url,
  image,

  ...restProps
}) => {
  const [isDivWideEnough, setIsDivWideEnough] = useState(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {preview, isMobileScreen} = useContext(PreviewContext);

  const isDesktop = useMemo(
    () => preview === PreviewTypeEnum.DESKTOP && !isMobileScreen,
    [preview, isMobileScreen],
  );

  useEffect(() => {
    const handleResize = () => {
      if (document) {
        const imageDiv = document?.getElementById(`image-div-${url}`);
        if (imageDiv) {
          setIsDivWideEnough(imageDiv.offsetWidth >= 100);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window, document]);

  const handleClosePopup = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <div
      className="border-base-300 border-2 bg-primary-content rounded-2xl h-full w-full p-2 flex items-center relative"
      {...restProps}>
      <div className="flex justify-between items-start h-full w-full ">
        <div
          className={'flex flex-col justify-between items-start h-full gap-2'}>
          <div>
            <SvgGlobe width={32} height={32} className={'stroke-base-300'} />
            <div>
              <p
                className={`text-start text-xs mt-1 text-ellipsis ${isDivWideEnough ? 'line-clamp-3' : 'line-clamp-2'}  overflow-hidden font-normal w-full ${image ? 'w-1/2' : 'w-full'}`}>
                {title}
              </p>
            </div>
          </div>
          <div>
            <Button title={'View Blog'} size={'xs'} onClick={handleOpen} />
          </div>
        </div>
        <div
          id={`image-div-${url}`}
          className={` ${isDesktop ? 'h-[120px] w-full' : 'w-[200px] h-[88px]'} ${isDivWideEnough ? 'relative max-w-[50%]' : 'hidden'} rounded-lg overflow-hidden`}>
          {url && (
            <Image
              src={url}
              alt={title}
              className="object-cover rounded-lg"
              fill
            />
          )}
        </div>
      </div>
      <PopupDetailBlog isOpen={isOpen} onClose={handleClosePopup} />
    </div>
  );
};

export default WidgetBlog;
